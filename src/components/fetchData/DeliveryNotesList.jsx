'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import useClients from '@/app/utils/useClients'
import useProjects from '@/app/utils/useProjects'
import { useRouter } from 'next/navigation'

export default function DeliveryNotesList() {
    const router = useRouter()
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
        <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-light text-gray-800 tracking-tight">Delivery Notes</h2>
                <button
                    onClick={() => router.push('/home/delivery-notes/add-delivery-note')}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-800 
                             rounded-lg hover:bg-gray-50 transition-colors duration-200 
                             font-light"
                >
                    Add Delivery Note
                </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                {deliveryNotes?.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-left 
                                               text-xs font-medium text-gray-500 uppercase 
                                               tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left 
                                               text-xs font-medium text-gray-500 uppercase 
                                               tracking-wider">
                                        Project
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left 
                                               text-xs font-medium text-gray-500 uppercase 
                                               tracking-wider">
                                        Client
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left 
                                               text-xs font-medium text-gray-500 uppercase 
                                               tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {deliveryNotes.map((note) => (
                                    <tr 
                                        key={note._id}
                                        onClick={() => router.push(`/home/delivery-notes/${note._id}`)}
                                        className="hover:bg-gray-50 cursor-pointer 
                                                 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(note.workdate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {note.projectId.name || 'Unknown Project'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {clients.find(client => 
                                                client._id === note.clientId)?.name || 'Unknown Client'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {note.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <svg 
                            className="mx-auto h-12 w-12 text-gray-400 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <p className="text-gray-500 text-lg font-light mb-2">No delivery notes found</p>
                        <p className="text-sm text-gray-400">
                            Click the button above to add your first delivery note
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
