'use client'
import { useEffect, useState } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'

export default function ProjectPage({ params }) {
    const resolvedParams = use(params)
    const [project, setProject] = useState(null)
    const router = useRouter()
    
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/one/${resolvedParams.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                const data = await response.json()
                setProject(data)
            } catch (err) {
                console.log('Error fetching project:', err)
            }
        }
        
        fetchClient()
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
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Project Details</h2>
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
                        <p className="text-gray-900">{project.clientId}</p>
                    </div>
                    {project.notes && (
                        <div>
                            <p className="text-sm font-medium text-gray-500">Notes</p>
                            <p className="text-gray-900">{project.notes}</p>
                        </div>
                    )}
                </div>
            </div>
            <button onClick={deleteProject} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete Project</button>
        </div>
    )
}