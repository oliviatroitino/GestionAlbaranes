'use client'
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [userEmail, setUserEmail] = useState('');
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const userData = await response.json();
                setUserEmail(userData.email);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        fetchUserData();
    }, []);

    const getPageTitle = () => {
        const path = pathname.substring(1).split('/');
        if (!path[0]) return 'Home';
        return path.map(segment => {
            return segment.split('-')
                         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                         .join(' ');
        }).join(' > ');
    };

    return (
        <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center px-4">
                        <h1 className="text-xl tracking-tight text-gray-900 font-light">
                            {getPageTitle()}
                        </h1>
                    </div>
                    <div className="flex items-center px-4">
                        <span className="text-sm text-gray-500 font-light">
                            Logged in as <span className="text-gray-800">{userEmail}</span>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
