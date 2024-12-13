import { useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

const SignSquema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must contain at least 8 characters')
                        .max(20, 'Password must contain less than 20 characters')
                        .matches(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, 'Password must contain a special character')
                        .required('Password is required')
})

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(SignSquema)});
    const router = useRouter();

    async function onSubmit(data) {
        console.log(data);

        // Previous version with token check first
        // const token = localStorage.getItem('token');
        // if(token){ // if there is a saved token, log in
        //     try {
        //         const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/login", {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `Bearer ${token}`
        //             },
        //             body: JSON.stringify(data)
        //         });
        //         if(response.ok){
        //             console.log('User logged in successfully. Send to home.');
        //             localStorage.setItem('login', true);
        //             router.push('/home');
        //         } else {
        //             console.error('Error with POST user request:', response.status, '. Send to register.');
        //             localStorage.setItem('login', false);
        //             router.push('/register');
        //         }
        //     } catch (error) {
        //         console.error('Error with GET user request:', error);
        //     }
        // }else{ // if there is no saved token, send to register
        //     console.error('No available token. Send to register.');
        //     router.push('/register');
        // }

        try {
            const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if(response.ok){
                const result = await response.json();
                localStorage.setItem('token', `Bearer ${result.token}`);
                localStorage.setItem('login', true);
                console.log('User logged in successfully. Send to home.');
                router.push('/home');
            } else {
                console.error('Error with login POST request:', response.status, '. Send to register.');
                localStorage.setItem('login', false);
                router.push('/register');
            }
        } catch (error) {
            console.error('Error with login request:', error);
            router.push('/register');
        }
    }

    return(
        <div class="w-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input {...register('email')} placeholder='Introduce email' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input {...register('password')} placeholder='Introduce password' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Accept</button>
                </div>
            </form>
        </div>
    )
}