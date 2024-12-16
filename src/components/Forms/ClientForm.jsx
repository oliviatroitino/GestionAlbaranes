'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import React from 'react'
import { useRouter } from 'next/navigation'

const SignSquema = yup.object().shape({
    name: yup.string().required('Name of Client or Company is required'),
    cif: yup.string().required('CIF is required')
        .matches(/^[A-Z]\d{8}$/, 'Invalid CIF format'),
    address: yup.object().shape({
        street: yup.string().required('Street is required'),
        number: yup.number().required('Number is required').positive('Number must be positive'),
        postal: yup.number().required('Postal code is required'),
        city: yup.string().required('City is required'),
        province: yup.string().required('Province is required')
    }),
    notes: yup.string().optional(),
    logo: yup.string().optional().default('https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg')
})

export default function ClientForm({url = 'client', method = 'POST', client = null, onSuccessfulSubmit}) {
    const router = useRouter()
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
                console.log('Client added successfully')
                alert('Client added successfully')
                window.dispatchEvent(new Event('clientAdded'))
                if (onSuccessfulSubmit) {
                    onSuccessfulSubmit()
                }
                if (!client) {
                    router.push('/home/clients')
                }
            }
        } catch (error) {
            console.error(`Error with ${method} client request:`, error);
            alert('Error submitting form')
        }
    }

    return (
        <div className="container mx-auto px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-800">
                        Name
                    </label>
                    <input
                        {...register('name')}
                    type="text"
                    defaultValue={client?.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-500"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="cif" className="block text-sm font-medium text-gray-800">
                    CIF
                </label>
                <input
                    {...register('cif')}
                    type="text"
                    defaultValue={client?.cif}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-500"
                />
                {errors.cif && (
                    <p className="mt-1 text-sm text-red-600">{errors.cif.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-800">
                    Tax Address
                </label>
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-3">
                        <input
                            {...register('address.street')}
                            type="text"
                            placeholder="Street"
                            defaultValue={client?.address?.street}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-500"
                        />
                        {errors.address?.street && (
                            <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
                        )}
                    </div>
                    <div className="col-span-1">
                        <input
                            {...register('address.number')}
                            type="number"
                            placeholder="Number"
                            defaultValue={client?.address?.number}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-500"
                        />
                        {errors.address?.number && (
                            <p className="mt-1 text-sm text-red-600">{errors.address.number.message}</p>
                        )}
                    </div>
                    <div className="col-span-2">
                        <input
                            {...register('address.postal')}
                            type="number"
                            placeholder="Postal Code"
                            defaultValue={client?.address?.postal}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-500"
                        />
                        {errors.address?.postal && (
                            <p className="mt-1 text-sm text-red-600">{errors.address.postal.message}</p>
                        )}
                    </div>
                    <div className="col-span-3">
                        <input
                            {...register('address.city')}
                            type="text"
                            placeholder="City"
                            defaultValue={client?.address?.city}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-500"
                        />
                        {errors.address?.city && (
                            <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
                        )}
                    </div>
                    <div className="col-span-3">
                        <input
                            {...register('address.province')}
                            type="text"
                            placeholder="Province"
                            defaultValue={client?.address?.province}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-500"
                        />
                        {errors.address?.province && (
                            <p className="mt-1 text-sm text-red-600">{errors.address.province.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-800">
                    Logo URL
                </label>
                <p className="text-sm text-gray-500">URL of the company logo (optional)</p>
                <input
                    {...register('logo')}
                    type="text"
                    defaultValue={client?.logo}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-500"
                />
                {errors.logo && (
                    <p className="mt-1 text-sm text-red-600">{errors.logo.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-800">
                    Notes
                </label>
                <p className="text-sm text-gray-500">Additional information about the client</p>
                <textarea
                    {...register('notes')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-500"
                    defaultValue={client?.notes}
                />
            </div>

            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save Client
                </button>
            </form>
        </div>
    )
}