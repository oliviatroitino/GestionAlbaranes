import { useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

const SignSquema = Yup.object({
    code: Yup.string()
        .matches(/^\d{6}$/, 'Code must be exactly 6 numbers')
        .required('Code is required')
})

export default function ValidationForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(SignSquema)});
    const router = useRouter();

    async function onSubmit(data) {
        console.log("Validation form submitted with data:", data);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/validation", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to validate user');
            }
            const result = await response.json();
            localStorage.setItem('token', `${result.token}`);
            router.push('/login');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="max-w-sm mx-auto px-4">
            <form className="bg-white border border-gray-100 rounded-lg p-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="code">
                        Validation Code
                    </label>
                    <input 
                        {...register('code')} 
                        placeholder='Enter 6-digit code'
                        type="text"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    />
                    {errors.code && 
                        <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>
                    }
                </div>
                <div className="flex items-center justify-between">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        Validate Account
                    </button>
                </div>
            </form>
        </div>
    )
}