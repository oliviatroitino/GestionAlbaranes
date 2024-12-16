'use client'
import LoginForm from "@/components/authentication/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome Back</h1>
                <div className="w-full max-w-md mx-auto">
                    <LoginForm />
                    <p className="text-sm text-gray-600">
                        Need help? Contact support
                    </p>
                </div>
            </div>
        </div>
    )
}