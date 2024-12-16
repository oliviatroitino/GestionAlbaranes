'use client'
import { useState } from 'react';
import NavBar from '@/components/layout/NavBar';
import SideBar from '@/components/layout/SideBar';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="layout min-h-screen bg-gray-50">
            <NavBar className="fixed top-0 w-full z-50" />
            <div className="layout-body relative pt-[64px]">
                <SideBar onStateChange={setIsSidebarOpen} />
                <main className={`main-content p-4 transition-all duration-300 bg-gray-50 ${
                    isSidebarOpen ? 'ml-64' : 'ml-14'
                }`}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;