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
                    <h1 className="text-2xl font-bold text-gray-700">No client selected</h1>
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
