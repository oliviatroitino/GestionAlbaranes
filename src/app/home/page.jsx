'use client'
import { useState, useEffect } from 'react'
import useProjects from '@/app/utils/useProjects'
import useClients from '@/app/utils/useClients'
import Link from 'next/link'

export default function HomePage() {
    const [deliveryNotes, setDeliveryNotes] = useState([])
    const { projects } = useProjects()
    const { clients } = useClients()
    const [recentActivity, setRecentActivity] = useState([])

    useEffect(() => {
        const fetchDeliveryNotes = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('https://bildy-rpmaya.koyeb.app/api/deliverynote', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                const data = await response.json()
                setDeliveryNotes(data)
            } catch (err) {
                console.error('Error fetching delivery notes:', err)
            }
        }

        fetchDeliveryNotes()
    }, [])

    return (
        <div className="max-w-5xl mx-auto px-4">
            {/* Main Hero Section */}
            <div className="text-center py-12 mb-8">
                <h1 className="text-5xl font-normal text-gray-800 tracking-tight mb-2">
                    Welcome to GestionAlbaranes.
                </h1>
                <p className="text-xl text-gray-600 tracking-wide">
                    Manage your projects efficiently.
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <Link href="/home/projects" 
                    className="bg-white border border-gray-100 
                             rounded p-6 text-center
                             transition-all hover:shadow-sm">
                    <h3 className="text-lg text-gray-800 mb-2">Projects</h3>
                    <p className="text-4xl font-light text-gray-900">{projects?.length || 0}</p>
                </Link>
                
                <Link href="/home/clients" 
                    className="bg-white border border-gray-100 
                             rounded p-6 text-center
                             transition-all hover:shadow-sm">
                    <h3 className="text-lg text-gray-800 mb-2">Clients</h3>
                    <p className="text-4xl font-light text-gray-900">{clients?.length || 0}</p>
                </Link>
                
                <Link href="/home/delivery-notes" 
                    className="bg-white border border-gray-100 
                             rounded p-6 text-center
                             transition-all hover:shadow-sm">
                    <h3 className="text-lg text-gray-800 mb-2">Delivery Notes</h3>
                    <p className="text-4xl font-light text-gray-900">{deliveryNotes?.length || 0}</p>
                </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-100 rounded-lg p-8">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                    {deliveryNotes.slice(0, 5).map((note) => (
                        <div key={note._id} 
                             className="flex items-center justify-between py-3 border-b border-gray-100 
                                        last:border-b-0">
                            <div>
                                <Link href={`/home/delivery-notes/${note._id}`}>
                                    <p className="text-gray-800 hover:text-blue-600">{note.description}</p>
                                </Link>
                                <p className="text-sm text-gray-500">
                                    {note.projectId?.name} - {clients.find(client => 
                                        client._id === note.clientId || 
                                        client._id === Number(note.clientId))?.name || 'Unknown Client'}
                                </p>
                            </div>
                            <span className="text-sm text-gray-400">
                                {new Date(note.workdate).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
