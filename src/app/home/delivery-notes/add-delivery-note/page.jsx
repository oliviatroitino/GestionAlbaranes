'use client'

import DeliveryNoteForm from '@/components/Forms/DeliveryNoteForm'

export default function AddDeliveryNotePage() {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Add Delivery Note</h2>
            <div className="bg-white shadow rounded-lg p-6">
                <DeliveryNoteForm />
            </div>
        </div>
    )
}
