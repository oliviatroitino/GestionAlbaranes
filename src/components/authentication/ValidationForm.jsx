import { useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

const SignSquema = Yup.object({
    code: Yup.string()
        .matches(/^\d{6}$/, 'Code must be exactly 6 numbers')
        .required('Code is required')
})

export default function ValidationForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(SignSquema)});
    const router = useRouter();

    async function onSubmit(data) {
        console.log(data);
        try {
            const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/validate", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                console.log('User validated successfully. Send to login.');
                router.push('/home/login');
            } else {
                console.error('Error with PUT user request:', response);
                // TODO: send to error page or register page
            }
        } catch (error) {
            console.error('Error with PUT user request:', error);
        }
    }

    return (
        <div class="w-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="code">
                        Validation Code
                    </label>
                    <input {...register('code')} placeholder='Input code' type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                    {errors.code && <p>{errors.code.message}</p>}
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </div>
            </form>
        </div>
    )
}