'use client'
import { useEffect, useState } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import ProjectForm from '@/components/Forms/ProjectForm'
import Link from 'next/link'
import useClients from '@/app/utils/useClients'

export default function ProjectPage({ params }) {
    const resolvedParams = use(params)
    const [project, setProject] = useState(null)
    const [deliveryNotes, setDeliveryNotes] = useState([])
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const { clients } = useClients()
    
    function handleEdit() {
        setIsEditing(!isEditing)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/one/${resolvedParams.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                const data = await response.json()
                setProject(data)

                const deliveryNotesResponse = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/project/${resolvedParams.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                const deliveryNotesData = await deliveryNotesResponse.json()
                setDeliveryNotes(deliveryNotesData)
                setIsEditing(false)
            } catch (err) {
                console.log('Error fetching data:', err)
            }
        }
        
        fetchData()
    }, [resolvedParams.id])

    async function deleteProject() {
        const token = localStorage.getItem('token')
        const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/${resolvedParams.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.ok){
            router.push('/home/projects')
        }
    }

    if (!project) return <div>Loading...</div>

    return (
        <div className="container mx-auto px-4">
            <button 
                onClick={() => router.push('/home/projects')}
                className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800"
            >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Projects
            </button>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Project Details</h2>
                    <button
                        onClick={handleEdit}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isEditing ? 'Cancel' : 'Edit Details'}
                    </button>
                </div>
                {isEditing ? (
                    <div className="space-y-6">
                        <p className="text-lg font-bold mb-4 text-gray-900">Edit Project</p>
                        <ProjectForm 
                            url={`project/${project._id}`} 
                            method='PUT' 
                            project={project} 
                            onSuccessfulSubmit={() => setIsEditing(false)} 
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{project.name}</h3>
                            <p className="text-gray-500">
                                {project.address.street} {project.address.number}, {project.address.postal} {project.address.city}, {project.address.province}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Project Code</p>
                            <p className="text-gray-900">{project.projectCode}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="text-gray-900">{project.email}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Internal Code</p>
                            <p className="text-gray-900">{project.code}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Client ID</p>
                            <div className="flex items-center gap-2">
                                <img
                                    src={clients?.find(client => client._id === project.clientId)?.logo || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'}
                                    alt={`${clients?.find(client => client._id === project.clientId)?.name} logo`}
                                    className="h-6 w-6 rounded-full object-cover"
                                />
                                <p className="text-gray-900">
                                    <Link href={`/home/clients/${project.clientId}`} className="hover:text-indigo-600">
                                        {clients?.find(client => client._id === project.clientId)?.name || 'Client not found'} - {project.clientId}
                                    </Link>
                                </p>
                            </div>
                        </div>
                        {project.notes && (
                            <div>
                                <p className="text-sm font-medium text-gray-500">Notes</p>
                                <p className="text-gray-900">{project.notes}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Delivery Notes</h2>
                <div className="overflow-x-auto">
                    {deliveryNotes?.length > 0 ? (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">Format</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">Work Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deliveryNotes.map((note) => (
                                    <tr 
                                        key={note._id}
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() => router.push(`/home/delivery-notes/${note._id}`)}
                                    >
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-gray-500">
                                            {note.format === 'material' ? `Material: ${note.material}` : `Hours: ${note.hours}`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-gray-500">
                                            {note.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-gray-500">
                                            {new Date(note.workdate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">No delivery notes found for this project.</p>
                    )}
                </div>
            </div>
            <button onClick={deleteProject} className="bg-red-500 text-white px-4 py-2 rounded-md mt-6">Delete Project</button>
        </div>
    )
}