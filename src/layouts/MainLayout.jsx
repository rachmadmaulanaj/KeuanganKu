import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import FloatingButton from '../components/FloatingButton'
import Footer from '../components/Footer'

export default function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, [isSidebarOpen]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="h-main w-100 d-flex bg-light">
            {
                isMobile ? (
                    <FloatingButton />
                ) : (
                    <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                )
            }
            <main className="w-100 h-100 p-2 mb-5 mb-md-0 overflow-auto">
                <Outlet />
            </main>
            <Footer isSidebarOpen={isSidebarOpen} isMobile={isMobile} />
        </div>
    )
}