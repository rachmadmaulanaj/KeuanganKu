import { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"

import { FaBars, FaBarsStaggered, FaHouse, FaChartArea, FaFileCirclePlus, FaShapes } from "react-icons/fa6"
import TooltipC from './TooltipC'

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const locationPage = useLocation();

    const handleSetIsSidebarOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, [isSidebarOpen]);

    return (
        <aside className="p-3 h-100 d-none d-md-block">
            <aside className={`sidebar card bg-primary bg-gradient border-0 shadow text-white rounded-4 h-100 ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
                <div className={`card-body ${isSidebarOpen ? "p-3" : "p-2"}`}>
                    {
                        isSidebarOpen ? (
                            <>
                                <div className="d-flex justify-content-between">
                                    <h4 className="mb-4">KeuanganKu</h4>
                                    <span role="button" onClick={() => handleSetIsSidebarOpen()}>
                                        <FaBars size={20} />
                                    </span>
                                </div>
                                <ul className="nav flex-column">
                                    <li className={`nav-item my-1 ${locationPage.pathname === '/dashboard' && "bg-white rounded-4"}`}>
                                        <Link to="/dashboard" className={`nav-link d-flex ${locationPage.pathname === '/dashboard' ? "text-primary" : "text-white"}`}>
                                            <FaHouse size={20} />
                                            <span className="ms-2 align-align-items-center">Dashboard</span>
                                        </Link>
                                    </li>
                                    <li className={`nav-item my-1 ${locationPage.pathname === '/chart' && "bg-white rounded-4"}`}>
                                        <Link to="/chart" className={`nav-link d-flex ${locationPage.pathname === '/chart' ? "text-primary" : "text-white"}`}>
                                            <FaChartArea size={20} />
                                            <span className="ms-2 align-align-items-center">Grafik</span>
                                        </Link>
                                    </li>
                                    <li className={`nav-item my-1 ${locationPage.pathname === '/form' && "bg-white rounded-4"}`}>
                                        <Link to="/form" className={`nav-link d-flex ${locationPage.pathname === '/form' ? "text-primary" : "text-white"}`}>
                                            <FaFileCirclePlus size={20} />
                                            <span className="ms-2 align-align-items-center">Form</span>
                                        </Link>
                                    </li>
                                    {/*
                                    <li className={`nav-item my-1 ${locationPage.pathname === '/category' && "bg-white rounded-4"}`}>
                                        <Link to="/category" className={`nav-link d-flex ${locationPage.pathname === '/category' ? "text-primary" : "text-white"}`}>
                                            <FaShapes size={20} />
                                            <span className="ms-2 align-align-items-center">Category</span>
                                        </Link>
                                    </li>
                                    */}
                                </ul>
                            </>
                        ) : (
                            <>
                                <div className="text-center">
                                    <span role="button" onClick={() => handleSetIsSidebarOpen()}>
                                        <FaBarsStaggered size={20} />
                                    </span>
                                </div>
                                <ul className="nav flex-column my-3">
                                    <li className={`nav-item my-2 text-center ${locationPage.pathname === '/dashboard' && "bg-white p-1 rounded"}`}>
                                        <TooltipC title="Dashboard">
                                            <Link to="/dashboard" className={locationPage.pathname === '/dashboard' ? "text-primary" : "text-white"}>
                                                <FaHouse size={20} />
                                            </Link>
                                        </TooltipC>
                                    </li>
                                    <li className={`nav-item my-2 text-center ${locationPage.pathname === '/chart' && "bg-white p-1 rounded"}`}>
                                        <TooltipC title="Chart">
                                            <Link to="/chart" className={locationPage.pathname === '/chart' ? "text-primary" : "text-white"}>
                                                <FaChartArea size={20} />
                                            </Link>
                                        </TooltipC>
                                    </li>
                                    <li className={`nav-item my-2 text-center ${locationPage.pathname === '/form' && "bg-white p-1 rounded"}`}>
                                        <TooltipC title="Form">
                                            <Link to="/form" className={locationPage.pathname === '/form' ? "text-primary" : "text-white"}>
                                                <FaFileCirclePlus size={20} />
                                            </Link>
                                        </TooltipC>
                                    </li>
                                    {/*
                                    <li className={`nav-item my-2 text-center ${locationPage.pathname === '/category' && "bg-white p-1 rounded"}`}>
                                        <TooltipC title="Category">
                                            <Link to="/category" className={locationPage.pathname === '/category' ? "text-primary" : "text-white"}>
                                                <FaShapes size={20} />
                                            </Link>
                                        </TooltipC>
                                    </li>
                                    */}
                                </ul>
                            </>
                        )
                    }
                </div>
            </aside>
        </aside>
    )
}