'use client'

import ProjectList from '@/components/fetchData/ProjectList'

export default function ProjectsPage() {
    return (
        <div>
            <div className="bg-white rounded-lg shadow p-6">
                <ProjectList />
            </div>
        </div>
    )
}
