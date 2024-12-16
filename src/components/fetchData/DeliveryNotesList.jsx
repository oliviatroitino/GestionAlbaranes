'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import useClients from '@/app/utils/useClients'
import useProjects from '@/app/utils/useProjects'

export default function DeliveryNotesList() {
    const [deliveryNotes, setDeliveryNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { clients } = useClients()
    console.log('Clients:', clients)
    const { projects } = useProjects()

    useEffect(() => {
        const fetchDeliveryNotes = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('https://bildy-rpmaya.koyeb.app/api/deliverynote', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch delivery notes')
                }
                const data = await response.json()
                setDeliveryNotes(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchDeliveryNotes()

        // Refresh list when new delivery note is added
        window.addEventListener('deliveryNoteAdded', fetchDeliveryNotes)
        return () => window.removeEventListener('deliveryNoteAdded', fetchDeliveryNotes)
    }, [])

    if (loading) {
        return <div className="text-center p-4">Loading...</div>
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">Error: {error}</div>
    }

    return (
        <div className="container mx-auto px-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {deliveryNotes.map((note) => {
                            console.log('Note clientId:', note.clientId)
                            console.log('Client found:', clients.find(client => client._id === note.clientId))
                            console.log('Note projectId:', note.projectId)
                            console.log('Project found:', note.projectId.name)
                            return (
                                <tr key={note.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {clients.find(client => client._id === note.clientId || client._id === Number(note.clientId))?.name || 'Unknown Client'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {note.projectId?.name || 'Unknown Project'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {note.format === 'material' ? `Material: ${note.material}` : `Hours: ${note.hours}`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link 
                                            href={`/home/delivery-notes/${note.id}`}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
