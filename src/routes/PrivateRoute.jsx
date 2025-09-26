// src/routes/PrivateRoute.js
import { Navigate } from 'react-router-dom'
import moment from 'moment'

export default function PrivateRoute({ children }) {
    const checkSessionLocalStorage = () => {
        const sessionData = localStorage.getItem('session_data');
        const sessionDataFormat = moment(sessionData, "YYYY-MM-DD HH:mm:ss");

        if (!sessionDataFormat.isValid()) {
            localStorage.removeItem('session_data');
            return <Navigate to="/" replace />;
        }

        const now = moment();
        const diffInHours = now.diff(sessionDataFormat, 'hours');

        if (diffInHours >= 24) {
            localStorage.removeItem('session_data');
            return <Navigate to="/" replace state={{ alert: "Sesi anda telah habis" }} />;
        }

        localStorage.setItem('session_data', now.format("YYYY-MM-DD HH:mm:ss"));
        return children;
    };

    return checkSessionLocalStorage()
}