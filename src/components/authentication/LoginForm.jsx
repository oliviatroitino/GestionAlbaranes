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
                localStorage.setItem('token', `${result.token}`);
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
        <div className="max-w-sm mx-auto px-4">
            <form className="bg-white border border-gray-100 rounded-lg p-8" 
                  onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-500 mb-2" 
                           htmlFor="email">
                        Email
                    </label>
                    <input 
                        {...register('email')} 
                        placeholder='Enter your email'
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg 
                                 text-gray-800 focus:outline-none focus:border-gray-400 
                                 transition-colors duration-200"
                    />
                    {errors.email && 
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    }
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-500 mb-2" 
                           htmlFor="password">
                        Password
                    </label>
                    <input 
                        {...register('password')} 
                        type="password"
                        placeholder='Enter your password'
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg 
                                 text-gray-800 focus:outline-none focus:border-gray-400 
                                 transition-colors duration-200"
                    />
                    {errors.password && 
                        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                    }
                </div>

                <div className="flex items-center justify-between">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    )
}