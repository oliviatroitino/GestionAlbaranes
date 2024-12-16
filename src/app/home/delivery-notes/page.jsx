'use client'

import DeliveryNotesList from '@/components/fetchData/DeliveryNotesList'

export default function DeliveryNotesPage() {
    return (
        <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <DeliveryNotesList />
            </div>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
                <p>To create a new delivery note, please navigate to the project you want to associate it with.</p>
            </div>
        </div>
    )
}