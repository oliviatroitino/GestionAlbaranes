'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SideBar({ onStateChange }) {
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
                className="fixed top-20 left-4 z-50 text-gray-600 bg-white border border-gray-200 
                         p-2 rounded-md hover:bg-gray-50 flex items-center justify-center w-8 h-8 
                         transition-colors duration-200"
            >
                {isOpen ? '←' : '→'}
            </button>
            <nav className={`bg-gray-50 border-r border-gray-200 h-screen fixed left-0 top-16 
                           transition-all duration-300 ${isOpen ? 'w-64' : 'w-14'}`}>
                <div className={`flex flex-col p-4 ${!isOpen && 'hidden'}`}>
                    <div className="text-gray-900 font-light text-xl mb-8 mt-10">
                        DeliveryNotes
                    </div>
                    <div className="flex flex-col space-y-2">
                        {['Home', 'Clients', 'Projects', 'Delivery Notes'].map((item) => (
                            <Link
                                key={item}
                                href={`/home${item === 'Home' ? '' : `/${item.toLowerCase().replace(' ', '-')}`}`}
                                className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded 
                                         text-left transition-colors duration-200"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}
