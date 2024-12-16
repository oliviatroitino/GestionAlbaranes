'use client'

import DeliveryNotesList from '@/components/fetchData/DeliveryNotesList'

export default function DeliveryNotesPage() {
    return (
        <div className="max-w-5xl mx-auto px-6">
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <DeliveryNotesList />
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 flex items-center border border-gray-200">
                <div className="w-1 h-12 bg-gray-400 rounded-full mr-4"></div>
                <p className="text-gray-700 text-sm font-medium">
                    To create a new delivery note, please navigate to the project you want to associate it with.
                </p>
            </div>
        </div>
    )
}