'use client'
import RegisterForm from "@/components/authentication/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-light text-gray-800 tracking-tight mb-2">
                        GestionAlbaranes
                    </h1>
                    <p className="text-gray-500">
                        Create your account to get started
                    </p>
                </div>

                <RegisterForm />

                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link 
                            href="/login" 
                            className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}