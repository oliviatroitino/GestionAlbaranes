'use client'

import DeliveryNotesList from '@/components/fetchData/DeliveryNotesList'

export default function DeliveryNotesPage() {
    return (
        <div className="max-w-5xl mx-auto px-6">
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <DeliveryNotesList />
            </div>
        </div>
    )
}