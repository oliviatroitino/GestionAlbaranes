'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useProjects from '@/app/utils/getProjects'

export default function ProjectList() {
    const router = useRouter()
    const projects = useProjects()

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Project List</h2>
            <div className="overflow-x-auto">
                {projects.length > 0 ? (
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">Project Identifier</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">Internal Project Code</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-900 uppercase tracking-wider">Client ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr 
                                    key={project._id}
                                    onClick={() => router.push(`/home/projects/${project._id}`)}
                                    className="hover:bg-gray-50 cursor-pointer"
                                >
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-gray-500">
                                        {project.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-gray-500">
                                        {project.projectCode}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-gray-500">
                                        {project.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-gray-500">
                                        {`${project.address.street} ${project.address.number}, ${project.address.postal} ${project.address.city}, ${project.address.province}`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-gray-500">
                                        {project.code}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-gray-500">
                                        {project.clientId}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg">No projects found</p>
                        <p className="text-gray-400 mt-2">Click the button below to add your first project</p>
                    </div>
                )}
                <button
                    onClick={() => router.push('/home/projects/add-project')}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Project
                </button>
            </div>
        </div>
    )
}
