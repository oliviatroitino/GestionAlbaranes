'use client'
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    
    // Convert path to title
    const getPageTitle = () => {
        // Remove leading slash and split into segments
        const path = pathname.substring(1).split('/');
        
        // If path is empty (root), return Home
        if (!path[0]) return 'Home';
        
        // Convert path segments to title case and join with spaces
        return path.map(segment => {
            // Convert kebab-case to space separated and capitalize each word
            return segment.split('-')
                         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                         .join(' ');
        }).join(' > ');
    };

    return (
        <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <h1 className="text-xl font-bold text-gray-800">
                            {getPageTitle()}
                        </h1>
                    </div>
                </div>
            </div>
        </nav>
    );
}
