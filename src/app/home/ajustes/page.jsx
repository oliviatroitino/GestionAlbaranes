'use client'

export default function AjustesPage() {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Ajustes</h2>
            <div className="bg-white shadow rounded-lg p-6">
                <div className="space-y-6">
                    {/* 1. User Data */}
                    <div>
                        <h3 className="text-lg font-medium">Datos del usuario</h3>
                        <p className="text-gray-500 text-sm">
                            Administra los datos del usuario
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
