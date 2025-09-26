import { useState, useEffect } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { checkPasscode } from '../services/authService'
import Swal from "sweetalert2"
import moment from 'moment'

export default function useFormInput(setLoading) {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleChangePassword = (e) => setPassword(e.target.value);
    const handleClickShowHidePassword = () => setIsShowPassword(!isShowPassword);

    const setSessionLocalStorage = () => {
        const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
        localStorage.setItem('session_data', currentDate);
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (!password.length) {
            Swal.fire({ icon: 'error', text: 'Masukkan kode keamanan terlebih dahulu!' });
            return;
        }

        Swal.fire({
            title: 'Proses...',
            text: 'Silakan tunggu',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => { Swal.showLoading(); }
        });

        try {
            const checkAuth = await checkPasscode(password);
            if (!checkAuth) {
                Swal.close();
                Swal.fire({ icon: 'error', text: 'Kode yang Anda masukkan salah!' });
                return;
            }

            Swal.close();
            Swal.fire({
                icon: 'success',
                html: '<h3>Kode Valid</h3><small>Sedang mengalihkan ke halaman dashboard...</small>',
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                timerProgressBar: true,
                timer: 1500
            }).then(() => {
                setSessionLocalStorage();
                navigate('/dashboard');
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (location.state) {
            Swal.fire({
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showCancelButton: true,
                cancelButtonText: 'Tutup',
                icon: 'error',
                text: location.state.alert,
            });
        }
    }, []);

    return { password, isShowPassword, handleChangePassword, handleClickShowHidePassword, handleSubmitForm };
}