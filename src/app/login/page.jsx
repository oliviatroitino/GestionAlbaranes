'use client'
import LoginForm from "@/components/authentication/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-light text-gray-800 tracking-tight mb-2">
                        GestionAlbaranes
                    </h1>
                    <p className="text-gray-500">
                        Sign in to your account
                    </p>
                </div>

                <LoginForm />

                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link 
                            href="/register" 
                            className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}