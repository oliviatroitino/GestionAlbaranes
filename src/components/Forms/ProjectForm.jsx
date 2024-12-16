'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import React from 'react'
import { useRouter } from 'next/navigation'
import useClients from '@/app/utils/useClients'

const SignSquema = yup.object().shape({
    name: yup.string().required('Project name is required'),
    projectCode: yup.string().required('Project identifier is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    address: yup.object().shape({
        street: yup.string().required('Street is required'),
        number: yup.number().required('Number is required').positive('Number must be positive'),
        postal: yup.number().required('Postal code is required'),
        city: yup.string().required('City is required'),
        province: yup.string().required('Province is required')
    }),
    code: yup.string().required('Internal project code is required'),
    clientId: yup.string().required('Client ID is required')
})

export default function ProjectForm({url = 'project', method = 'POST', project = null, onSuccessfulSubmit}) {
    const router = useRouter()
    const { clients } = useClients()
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
            if(response.ok){
                console.log('Project added successfully')
                alert('Project added successfully')
                if (onSuccessfulSubmit) {
                    onSuccessfulSubmit()
                }
                if (!project) {
                    router.push('/home/projects')
                }
            }
        } catch (error) {
            console.error('Error with POST project request:', error);
            alert('Error submitting form')
        }
    }

    return (
        <div className="container mx-auto px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-500">
                        Name
                    </label>
                    <input
                        {...register('name')}
                        type="text"
                        defaultValue={project?.name}
                        placeholder="Enter project name"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="projectCode" className="block text-sm font-medium text-gray-500">
                        Project Code
                    </label>
                    <input
                        {...register('projectCode')}
                        type="text"
                        defaultValue={project?.projectCode}
                        placeholder="Enter project code"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    />
                    {errors.projectCode && (
                        <p className="mt-1 text-sm text-red-500">{errors.projectCode.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                        Email
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        defaultValue={project?.email}
                        placeholder="Enter email"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-500">
                        Project Address
                    </label>
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-3">
                            <input
                                {...register('address.street')}
                                type="text"
                                placeholder="Street"
                                defaultValue={project?.address.street}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                            />
                            {errors.address?.street && (
                                <p className="mt-1 text-sm text-red-500">{errors.address.street.message}</p>
                            )}
                        </div>
                        <div className="col-span-1">
                            <input
                                {...register('address.number')}
                                type="number"
                                placeholder="Number"
                                defaultValue={project?.address.number}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                            />
                            {errors.address?.number && (
                                <p className="mt-1 text-sm text-red-500">{errors.address.number.message}</p>
                            )}
                        </div>
                        <div className="col-span-2">
                            <input
                                {...register('address.postal')}
                                type="number"
                                placeholder="Postal Code"
                                defaultValue={project?.address.postal}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                            />
                            {errors.address?.postal && (
                                <p className="mt-1 text-sm text-red-500">{errors.address.postal.message}</p>
                            )}
                        </div>
                        <div className="col-span-3">
                            <input
                                {...register('address.city')}
                                type="text"
                                placeholder="City"
                                defaultValue={project?.address.city}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                            />
                            {errors.address?.city && (
                                <p className="mt-1 text-sm text-red-500">{errors.address.city.message}</p>
                            )}
                        </div>
                        <div className="col-span-3">
                            <input
                                {...register('address.province')}
                                type="text"
                                placeholder="Province"
                                defaultValue={project?.address.province}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                            />
                            {errors.address?.province && (
                                <p className="mt-1 text-sm text-red-500">{errors.address.province.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-500">
                        Internal Project Code
                    </label>
                    <input
                        {...register('code')}
                        type="text"
                        defaultValue={project?.code}
                        placeholder="Enter internal code"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    />
                    {errors.code && (
                        <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="clientId" className="block text-sm font-medium text-gray-500">
                        Client ID
                    </label>
                    <select
                        {...register('clientId')}
                        defaultValue={project?.clientId}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    >
                        <option value="">{project ? "Current: " + (clients?.find(client => client._id === project.clientId)?.name || 'Client not found'): 'Select a client'}</option>
                        {clients?.map((client) => (
                            <option key={client._id} value={client._id}>
                                {client.name} - {client._id}
                            </option>
                        ))}
                    </select>
                    {errors.clientId && (
                        <p className="mt-1 text-sm text-red-500">{errors.clientId.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full"
                >
                    Save Project
                </button>
            </form>
        </div>
    )
}