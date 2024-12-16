'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SideBar({ onStateChange }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        onStateChange?.(isOpen);
    }, [isOpen, onStateChange]);

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="fixed top-20 left-4 z-50 text-white bg-gray-800 p-2 rounded-md hover:bg-gray-700 flex items-center justify-center w-8 h-8"
            >
                {isOpen ? '←' : '→'}
            </button>
            <nav className={`bg-gray-800 h-screen fixed left-0 top-16 transition-all duration-300 ${
                isOpen ? 'w-64' : 'w-14'
            }`}>
                <div className={`flex flex-col p-4 ${!isOpen && 'hidden'}`}>
                    <div className="text-white font-bold text-xl mb-8 mt-10">
                        DeliveryNotes
                    </div>
                    <div className="flex flex-col space-y-2">
                        <button 
                            onClick={() => router.push('/home')}
                            className={`text-white hover:bg-gray-700 px-3 py-2 rounded text-left ${!isOpen && 'w-16'}`}
                        >
                            Home
                        </button>
                        <button 
                            onClick={() => router.push('/home/clients')}
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded text-left"
                        >
                            Clients
                        </button>
                        <button 
                            onClick={() => router.push('/home/projects')}
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded text-left"
                        >
                            Projects
                        </button>
                        <button 
                            onClick={() => router.push('/home/delivery-notes')}
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded text-left"
                        >
                            Delivery Notes
                        </button>
                        <button 
                            onClick={() => router.push('/home/settings')}
                            className="text-white hover:bg-gray-700 px-3 py-2 rounded text-left"
                        >
                            Settings
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
