'use client'
import { useEffect, useState } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import DeliveryNoteForm from '@/components/Forms/DeliveryNoteForm'
import Link from 'next/link'

export default function DeliveryNotePage({ params }) {
    const resolvedParams = use(params)
    const [deliveryNote, setDeliveryNote] = useState(null)
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    
    function handleEdit() {
        setIsEditing(!isEditing)
    }

    useEffect(() => {
        const fetchDeliveryNote = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/${resolvedParams.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                const data = await response.json()
                setDeliveryNote(data)
                setIsEditing(false)
            } catch (err) {
                console.log('Error fetching delivery note:', err)
            }
        }
        
        fetchDeliveryNote()
    }, [resolvedParams.id])

    async function deleteDeliveryNote() {
        const token = localStorage.getItem('token')
        const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/${resolvedParams.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            router.push('/home/delivery-notes')
        }
    }

    if (!deliveryNote) return <div>Loading...</div>

    return (
        <div className="container mx-auto px-4">
            <button 
                onClick={() => router.push('/home/delivery-notes')}
                className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800"
            >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Delivery Notes
            </button>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Delivery Note Details</h2>
                    <button
                        onClick={handleEdit}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isEditing ? 'Cancel' : 'Edit Details'}
                    </button>
                </div>
                {isEditing ? (
                    <div className="space-y-6">
                        <p className="text-lg font-bold mb-4 text-gray-900">Edit Delivery Note</p>
                        <DeliveryNoteForm
                            url={`deliverynote/${resolvedParams.id}`}
                            method="PUT"
                            deliveryNote={deliveryNote}
                            onSuccessfulSubmit={() => setIsEditing(false)}
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Format</p>
                            <p className="text-gray-900">{deliveryNote.format}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Description</p>
                            <p className="text-gray-900">{deliveryNote.description}</p>
                        </div>
                        {deliveryNote.format === 'material' && (
                            <div>
                                <p className="text-sm font-medium text-gray-500">Material</p>
                                <p className="text-gray-900">{deliveryNote.material}</p>
                            </div>
                        )}
                        {deliveryNote.format === 'hours' && (
                            <div>
                                <p className="text-sm font-medium text-gray-500">Hours</p>
                                <p className="text-gray-900">{deliveryNote.hours}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-medium text-gray-500">Work Date</p>
                            <p className="text-gray-900">{new Date(deliveryNote.workdate).toLocaleDateString()}</p>
                        </div>
                    </div>
                )}
            </div>
            <button 
                onClick={deleteDeliveryNote} 
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-red-600"
            >
                Delete Delivery Note
            </button>
        </div>
    )
}
