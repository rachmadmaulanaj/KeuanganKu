// src/routes/PublicRoute.js
import { Navigate } from 'react-router-dom'
import moment from 'moment'

export default function PublicRoute({ children }) {
    const checkSessionLocalStorage = () => {
        const sessionData = localStorage.getItem('session_data');
        const sessionDataFormat = moment(sessionData, "YYYY-MM-DD HH:mm:ss");

        if (!sessionDataFormat.isValid()) {
            localStorage.removeItem('session_data');
            return children;
        }

        const now = moment();
        const diffInHours = now.diff(sessionDataFormat, 'hours');

        if (diffInHours >= 24) {
            localStorage.removeItem('session_data');
            return children;
        }

        localStorage.setItem('session_data', now.format("YYYY-MM-DD HH:mm:ss"));
        return <Navigate to="/dashboard" replace />;
    };

    return checkSessionLocalStorage();
}