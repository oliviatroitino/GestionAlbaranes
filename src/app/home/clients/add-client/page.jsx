'use client'
import ClientForm from '@/components/addData/ClientForm'

export default function AddClientPage() {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <ClientForm url='client' method='POST' />
        </div>
    )
}
