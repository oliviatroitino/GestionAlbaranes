'use client'

import ClientList from '@/components/fetchData/ClientList'
import { usePathname } from 'next/navigation'

export default function ClientLayout({ children }) {
    const pathname = usePathname()
    const isRootPath = pathname === '/home/clients'

    return (
        <div className="flex">
            <main className="flex-1 p-8">
                {isRootPath ? (
                    <div className="text-center py-12">
                        <svg 
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <h1 className="mt-4 text-2xl font-normal text-gray-800">Select a Client</h1>
                        <p className="mt-2 text-gray-500">Choose a client from the list to view their details and projects</p>
                    </div>
                ) : (
                    children
                )}
            </main>
            <div className="w-64 flex-shrink-0">
                <ClientList />
            </div>
        </div>
    )
}
