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
        <div className="container mx-auto px-4">
            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Link href="/home/projects" className="bg-white rounded-lg shadow-sm p-6 border border-gray-300 hover:border-indigo-600">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Total Projects</h3>
                    <p className="text-3xl font-bold text-indigo-600">{projects?.length || 0}</p>
                </Link>
                <Link href="/home/clients" className="bg-white rounded-lg shadow-sm p-6 border border-gray-300 hover:border-indigo-600">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Clients</h3>
                    <p className="text-3xl font-bold text-indigo-600">{clients?.length || 0}</p>
                </Link>
                <Link href="/home/delivery-notes" className="bg-white rounded-lg shadow-sm p-6 border border-gray-300 hover:border-indigo-600">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Delivery Notes</h3>
                    <p className="text-3xl font-bold text-indigo-600">{deliveryNotes?.length || 0}</p>
                </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-300">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {deliveryNotes.slice(0, 5).map((note) => (
                        <div key={note._id} className="flex items-center justify-between border-b border-gray-300 pb-4">
                            <div>
                                <Link href={`/home/delivery-notes/${note._id}`}>
                                    <p className="font-medium text-gray-800 hover:text-indigo-600 cursor-pointer">{note.description}</p>
                                </Link>
                                <p className="text-sm text-gray-500">
                                    {note.projectId?.name} - {clients.find(client => client._id === note.clientId || client._id === Number(note.clientId))?.name || 'Unknown Client'}
                                </p>
                            </div>
                            <span className="text-sm text-gray-500">
                                {new Date(note.workdate).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
