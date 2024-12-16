'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useClients from '@/app/utils/useClients'
import useProjects from '@/app/utils/useProjects'

const SignSquema = yup.object().shape({
    clientId: yup.string().required('Client ID is required'),
    projectId: yup.string().required('Project ID is required'),
    format: yup.string().oneOf(['material', 'hours'], 'Format must be either material or hours').required('Format is required'),
    material: yup.string().required('Material type is required'),
    hours: yup.number().required('Hours are required').positive('Hours must be positive'),
    description: yup.string().required('Description is required'),
    workdate: yup.string()
        .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/, 'Please enter a valid date in DD/MM/YYYY format')
        .required('Work date is required')
})

export default function DeliveryNoteForm({url = 'deliverynote', method = 'POST', deliveryNote = null, onSuccessfulSubmit}) {
    const router = useRouter()
    const { clients = [] } = useClients() || {}
    const { projects = [] } = useProjects() || {}
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(SignSquema)
    })

    async function onSubmit(data) {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/${url}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })

            console.log('Sending delivery note data:', data)
            
            if(response.ok){
                console.log('Delivery note added successfully')
                alert('Delivery note added successfully')
                if (onSuccessfulSubmit) {
                    onSuccessfulSubmit()
                }
            }
        } catch (error) {
            console.error(`Error with ${method} delivery note request:`, error)
            alert('Error submitting form')
        }
    }

    return (
        <div className="container mx-auto px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <div>
                    <label htmlFor="clientId" className="block text-sm font-medium text-gray-500">
                        Client
                    </label>
                    <select
                        {...register('clientId')}
                        defaultValue={deliveryNote?.clientId}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    >
                        <option value="">Select client</option>
                        {clients.map((client) => (
                            <option key={client._id} value={client._id}>{client.name}</option>
                        ))}
                    </select>
                    {errors.clientId && (
                        <p className="mt-1 text-sm text-red-500">{errors.clientId.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="projectId" className="block text-sm font-medium text-gray-500">
                        Project
                    </label>
                    <select
                        {...register('projectId')}
                        defaultValue={deliveryNote?.projectId}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    >
                        <option value="">Select project</option>
                        {projects.map((project) => (
                            <option key={project._id} value={project._id}>{project.name}</option>
                        ))}
                    </select>
                    {errors.projectId && (
                        <p className="mt-1 text-sm text-red-500">{errors.projectId.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="format" className="block text-sm font-medium text-gray-500">
                        Format
                    </label>
                    <select
                        {...register('format')}
                        defaultValue={deliveryNote?.format}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    >
                        <option value="">Select format</option>
                        <option value="material">Material</option>
                        <option value="hours">Hours</option>
                    </select>
                    {errors.format && (
                        <p className="mt-1 text-sm text-red-500">{errors.format.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="material" className="block text-sm font-medium text-gray-500">
                        Material Type
                    </label>
                    <input
                        {...register('material')}
                        type="text"
                        defaultValue={deliveryNote?.material}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    />
                    {errors.material && (
                        <p className="mt-1 text-sm text-red-500">{errors.material.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="hours" className="block text-sm font-medium text-gray-500">
                        Hours
                    </label>
                    <input
                        {...register('hours')}
                        type="number"
                        defaultValue={deliveryNote?.hours}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    />
                    {errors.hours && (
                        <p className="mt-1 text-sm text-red-500">{errors.hours.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="workdate" className="block text-sm font-medium text-gray-500">
                        Work Date
                    </label>
                    <input
                        {...register('workdate')}
                        type="text"
                        placeholder="DD/MM/YYYY"
                        defaultValue={deliveryNote?.workdate}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    />
                    {errors.workdate && (
                        <p className="mt-1 text-sm text-red-500">{errors.workdate.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-500">
                        Description
                    </label>
                    <textarea
                        {...register('description')}
                        defaultValue={deliveryNote?.description}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full"
                >
                    {method === 'POST' ? 'Create Delivery Note' : 'Update Delivery Note'}
                </button>
            </form>
        </div>
    )
}