'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useProjects from '@/app/utils/useProjects'
import Link from 'next/link'

export default function ProjectList() {
    const router = useRouter()
    const { projects } = useProjects()

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-light text-gray-800 tracking-tight">Projects</h2>
                <Link href="/home/projects/add-project" 
                      className="px-4 py-2 bg-white border border-gray-200 text-gray-800 
                                rounded-lg hover:bg-gray-50 transition-colors duration-200 
                                font-light">
                    Add Project
                </Link>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                {projects?.length > 0 ? (
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-100 text-left 
                                           text-sm font-medium text-gray-500">
                                    Project Name
                                </th>
                                <th className="px-6 py-3 border-b border-gray-100 text-left 
                                           text-sm font-medium text-gray-500">
                                    Project Code
                                </th>
                                <th className="px-6 py-3 border-b border-gray-100 text-left 
                                           text-sm font-medium text-gray-500">
                                    Client
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr 
                                    key={`${project._id}-${project.projectCode}`}
                                    onClick={() => router.push(`/home/projects/${project._id}`)}
                                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                                >
                                    <td className="px-6 py-4 border-b border-gray-100 text-gray-800">
                                        {project.name}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-gray-500">
                                        {project.projectCode}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-gray-500">
                                        {project.clientId}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12">
                        <svg 
                            className="mx-auto h-12 w-12 text-gray-400 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                        </svg>
                        <p className="text-gray-500 text-lg font-light mb-2">No projects found</p>
                        <p className="text-sm text-gray-400">
                            Click the button above to add your first project
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
