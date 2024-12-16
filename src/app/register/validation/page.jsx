'use client'
import { useRouter } from "next/navigation";
import ValidationForm from "@/components/authentication/ValidationForm";
import Link from "next/link";

export default function ValidationPage() {
    const router = useRouter();

    async function checkValidation() {
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.log('No token found, redirecting to register');
            router.push('/register');
            return;
        }

        try {
            const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/validate", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log('User validated successfully');
                router.push('/home');
            } else {
                console.error('Validation failed');
                localStorage.removeItem('token');
                router.push('/register');
            }
        } catch (error) {
            console.error('Error checking validation:', error);
            localStorage.removeItem('token');
            router.push('/register');
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-light text-gray-800 tracking-tight mb-2">
                        Validate Your Account
                    </h1>
                    <p className="text-gray-500">
                        Please check your email to validate your account
                    </p>
                </div>

                <ValidationForm />

                {/* <div className="bg-white border border-gray-100 rounded-lg p-8 text-center">
                    <button
                        onClick={checkValidation}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                        Check Validation Status
                    </button>
                </div> */}

                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Want to try again?{' '}
                        <Link 
                            href="/register" 
                            className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
