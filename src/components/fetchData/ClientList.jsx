'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useClients from '@/app/utils/useClients'
import Link from 'next/link'

export default function ClientList() {
    const router = useRouter()
    const { clients } = useClients()

    return (
        <div>
            <div className="overflow-hidden">
                {clients.length > 0 ? (
                    <div className="space-y-4">
                        {clients.map((client) => (
                            <Link
                                key={client._id}
                                href={`/home/clients/${client._id}`}
                                className="block bg-white border border-gray-100 rounded-lg p-4 
                                         hover:shadow-sm transition-all duration-200"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={client.logo || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'}
                                        alt={`${client.name} logo`}
                                        className="h-12 w-12 rounded-full object-cover border border-gray-100"
                                    />
                                    <div>
                                        <h2 className="text-lg font-normal text-gray-800">
                                            {client.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {client.cif}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg font-normal">No clients found</p>
                        <p className="text-gray-400 mt-2">Add your first client to get started</p>
                    </div>
                )}
                
                <button
                    onClick={() => router.push('/home/clients/add-client')}
                    className="mt-6 w-full bg-white border border-gray-200 text-gray-800 
                             font-normal py-2 px-4 rounded-lg hover:bg-gray-50 
                             transition-colors duration-200"
                >
                    Add Client
                </button>
            </div>
        </div>
    )
}
