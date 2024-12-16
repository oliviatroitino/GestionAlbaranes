'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useClients from '@/app/utils/useClients'

export default function ClientList() {
    const router = useRouter()
    const { clients, refetch } = useClients()

    useEffect(() => {
        const handleClientAdded = () => {
            refetch()
        }

        window.addEventListener('clientAdded', handleClientAdded)
        return () => window.removeEventListener('clientAdded', handleClientAdded)
    }, [refetch])

    return (
        <div className="w-64 bg-gray-800 h-screen">
            <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-4">Clients</h2>
                <div className="space-y-1">
                    {clients.length > 0 ? (
                        clients.map((client) => (
                            <div
                                key={client._id}
                                onClick={() => router.push(`/home/clients/${client._id}`)}
                                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 cursor-pointer text-gray-300 hover:text-white"
                            >
                                <img
                                    src={client.logo || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'}
                                    alt={`${client.name} logo`}
                                    className="h-6 w-6 rounded-full object-cover"
                                />
                                <span className="text-sm truncate">
                                    {client.name}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-400">No clients found</p>
                            <p className="text-gray-500 text-sm mt-1">Add your first client</p>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => router.push('/home/clients/add-client')}
                    className="mt-4 w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-600"
                >
                    Add Client
                </button>
            </div>
        </div>
    )
}
