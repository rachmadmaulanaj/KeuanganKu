import { useState } from 'react'
import { Link, useLocation } from "react-router-dom"

import { FaBars, FaX, FaHouse, FaChartArea, FaFileCirclePlus } from "react-icons/fa6"

export default function FloatingButton() {
    const locationPage = useLocation();
    const [isOpen, setIsOpen] = useState(false)

    const handleClickButtonToggle = () => {
        setIsOpen(!isOpen);
    }
    const handleAutoClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <button
                type="button"
                className={`p-3 btn btn-primary rounded-4 position-fixed z-3 d-flex justify-content-center align-items-center ${isOpen ? 'active' : ''}`}
                style={{ bottom: '50px', right: '10px', width: '60px', height: '60px' }}
                onClick={handleClickButtonToggle}
            >
                {isOpen ? <FaX size={30} /> : <FaBars size={30} />}
            </button>
            <div className={`fab-container ${isOpen ? 'open' : ''}`}>
                <Link
                    to="/dashboard"
                    className={`fab-item ${locationPage.pathname === '/dashboard' ? 'active' : ''}`}
                    style={{ bottom: '130px', right: '10px' }}
                    onClick={handleAutoClose}
                >
                    <FaHouse size={25} />
                </Link>
                <Link
                    to="/chart"
                    className={`fab-item ${locationPage.pathname === '/chart' ? 'active' : ''}`}
                    style={{ bottom: '115px', right: '75px' }}
                    onClick={handleAutoClose}
                >
                    <FaChartArea size={25} />
                </Link>
                <Link
                    to="/form"
                    className={`fab-item ${locationPage.pathname === '/form' ? 'active' : ''}`}
                    style={{ bottom: '50px', right: '90px' }}
                    onClick={handleAutoClose}
                >
                    <FaFileCirclePlus size={25} />
                </Link>
            </div>
        </>
    )
}