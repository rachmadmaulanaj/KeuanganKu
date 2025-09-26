import { Routes, Route } from 'react-router-dom'

import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import AuthPage from '../features/auth/Page'
import DashboardPage from '../features/dashboard/Page'
import ChartPage from '../features/chart/Page'
import FormPage from '../features/form/Page'
import CobaPage from '../features/coba/Page'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/" element={<PublicRoute><AuthPage /></PublicRoute>} />
            </Route>
            <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                <Route path="/chart" element={<PrivateRoute><ChartPage /></PrivateRoute>} />
                <Route path="/form" element={<PrivateRoute><FormPage /></PrivateRoute>} />
                <Route path="/coba" element={<PrivateRoute><CobaPage /></PrivateRoute>} />
            </Route>
        </Routes>
    )
}