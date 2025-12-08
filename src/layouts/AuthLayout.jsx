import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <div className="vh-100 w-100 d-flex overflow-hidden bg-light">
            <main className='w-100 h-100 p-3'>
                <Outlet />
            </main>
        </div>
    )
}