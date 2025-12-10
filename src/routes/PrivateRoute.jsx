// src/routes/PrivateRoute.js
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import supabase from '../lib/supabaseClient'
import moment from 'moment'

export default function PrivateRoute({ children }) {
    const [isChecking, setIsChecking] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [redirectState, setRedirectState] = useState(null);

    useEffect(() => {
        const checkSessionLocalStorage = async () => {
            const sessionData = localStorage.getItem('session_data');
            const sessionDataFormat = moment(sessionData, "YYYY-MM-DD HH:mm:ss");

            if (!sessionDataFormat.isValid()) {
                localStorage.removeItem('session_data');
                localStorage.removeItem('user_id');
                await supabase.auth.signOut();
                setShouldRedirect(true);
                setIsChecking(false);
                return;
            }

            const now = moment();
            const diffInHours = now.diff(sessionDataFormat, 'hours');

            if (diffInHours >= 24) {
                localStorage.removeItem('session_data');
                localStorage.removeItem('user_id');
                await supabase.auth.signOut();
                setShouldRedirect(true);
                setRedirectState({ alert: "Sesi anda telah habis" });
                setIsChecking(false);
                return;
            }

            localStorage.setItem('session_data', now.format("YYYY-MM-DD HH:mm:ss"));
            setIsChecking(false);
        };

        checkSessionLocalStorage();
    }, []);

    if (isChecking) {
        return null; // atau loading spinner
    }

    if (shouldRedirect) {
        return <Navigate to="/" replace state={redirectState} />;
    }

    return children;
}