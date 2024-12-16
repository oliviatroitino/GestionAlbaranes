'use client'

import ClientList from '@/components/fetchData/ClientList'

export default function ClientesPage() {
    return (
        <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white border border-gray-100 rounded-lg p-8">
                <h1 className="text-3xl font-normal text-gray-800 tracking-tight mb-6">
                    Clients
                </h1>
                <ClientList />
            </div>
        </div>
    )
}
