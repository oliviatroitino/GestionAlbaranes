'use client'
import { useEffect, useState } from 'react'
import { useClientProjects } from '@/app/utils/useClientProjects'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import ClientForm from '@/components/Forms/ClientForm'

export default function ClientPage({ params }) {
    const resolvedParams = use(params)
    const [client, setClient] = useState(null)
    const [projects, setProjects] = useState([])
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

    function handleEdit() {
        setIsEditing(!isEditing)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${resolvedParams.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                const data = await response.json()
                setClient(data)

                const projectsData = await useClientProjects(resolvedParams.id)
                setProjects(projectsData)
                setIsEditing(false)
            } catch (err) {
                console.log('Error fetching data:', err)
            }
        }
        
        fetchData()
    }, [resolvedParams.id])

    async function deleteClient() {
        const token = localStorage.getItem('token')
        const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${resolvedParams.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.ok){
            router.push('/home/clients')
        }
    }

    if (!client) return <div className="text-center py-8 text-gray-500">Loading...</div>

    return (
        <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white border border-gray-100 rounded-lg p-8 mb-6">                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-normal text-gray-800 tracking-tight">
                        {client.name}
                    </h2>
                    <button
                        onClick={handleEdit}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-800 
                                 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                        {isEditing ? 'Cancel' : 'Edit Details'}
                    </button>
                </div>

                {isEditing ? (
                    <div className="space-y-6">
                        <ClientForm 
                            url={`client/${client._id}`} 
                            method='PUT' 
                            client={client} 
                            onSuccessfulSubmit={() => setIsEditing(false)} 
                        />
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <p className="mt-1 text-gray-800">{client.name}</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-500">CIF</label>
                            <p className="mt-1 text-gray-800">{client.cif}</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-500">Tax Address</label>
                            <div className="grid grid-cols-6 gap-4 mt-1">
                                <div className="col-span-3">
                                    <p className="text-gray-800">{client.address.street}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-gray-800">{client.address.number}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-gray-800">{client.address.postal}</p>
                                </div>
                                <div className="col-span-3">
                                    <p className="text-gray-800">{client.address.city}</p>
                                </div>
                                <div className="col-span-3">
                                    <p className="text-gray-800">{client.address.province}</p>
                                </div>
                            </div>
                        </div>

                        {client.notes && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Notes</label>
                                <p className="mt-1 text-gray-800">{client.notes}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-8 mb-6">
                <h2 className="text-2xl font-normal text-gray-800 tracking-tight">Client Projects</h2>
                <div className="overflow-x-auto">
                    {projects?.length > 0 ? (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">Project Name</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">Project Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr 
                                        key={project._id}
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() => router.push(`/home/projects/${project._id}`)}
                                    >
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-gray-500">
                                            {project.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-gray-500">
                                            {project.projectCode}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">No projects found for this client.</p>
                    )}
                </div>
            </div>
            <button onClick={deleteClient} className="bg-red-500 text-white px-4 py-2 rounded-md mt-6">Delete Client</button>
        </div>
    )
}