'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SideBar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="fixed top-20 left-4 z-50 text-white bg-gray-800 p-2 rounded-md hover:bg-gray-700 flex items-center justify-center w-8 h-8"
            >
                {isOpen ? '←' : '→'}
            </button>
            <nav className={`bg-gray-800 h-screen fixed left-0 top-16 transition-all duration-300 ${
                isOpen ? 'w-50' : 'w-14'
            }`}>
                <div className={`flex flex-col p-4 ${!isOpen && 'hidden'}`}>
                    <div className="text-white font-bold text-xl mb-8 mt-10">
                        GestionAlbaranes
                    </div>
                    <div className="flex flex-col space-y-2">
                        <button 
                            onClick={() => router.push('/home')}
                            className={`text-white hover:bg-gray-700 px-3 py-2 rounded text-left ${!isOpen && 'w-16'}`}
                        >
                            Resumen
                        </button>
                        <button 
                            onClick={() => router.push('/home/clientes')}
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded text-left"
                        >
                            Clientes
                        </button>
                        <button 
                            onClick={() => router.push('/home/proyectos')}
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded text-left"
                        >
                            Proyectos
                        </button>
                        <button 
                            onClick={() => router.push('/home/albaranes')}
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded text-left"
                        >
                            Albaranes
                        </button>
                        <button 
                            onClick={() => router.push('/home/proveedores')}
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded text-left"
                        >
                            Proveedores
                        </button>
                        <button 
                            onClick={() => router.push('/home/ajustes')}
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded text-left"
                        >
                            Ajustes
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
