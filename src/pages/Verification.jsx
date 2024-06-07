import React from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertBorder: false,
            passcode: '',
            showPasscode: false,
        }
    }

    handlePasscodeChange = (e) => {
        this.setState({
            passcode: e.target.value,
            alertBorder: false,
        });
    }
    togglePasscodeVisibility = () => {
        this.setState((prevState) => ({ showPasscode: !prevState.showPasscode }));
    }
    handleInputEnter = (e) => {
        if (e.key === 'Enter') this.verificationProcess();
    }

    verificationProcess = async () => {
        const docRef = doc(db, "passcode", "security_code");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.code === this.state.passcode) {
                Swal.fire({
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    timer: 2000,
                    timerProgressBar: true,
                    icon: 'success',
                    html: '<h2>Kode Valid</h2><small>Sedang mengalihkan ke halaman dashboard...</small>'
                }).then(() => {
                    this.props.setSession();
                })
            } else {
                let text_err = this.state.passcode ? 'Kode yang Anda masukkan salah!' : 'Kode masih kosong!'
                Swal.fire({
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showCancelButton: true,
                    cancelButtonText: 'Tutup',
                    icon: 'error',
                    text: text_err,
                });
                this.setState({ alertBorder: true });
            }
        } else {
            Swal.fire({
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showCancelButton: true,
                cancelButtonText: 'Tutup',
                icon: 'error',
                text: 'Ada yang salah!',
            });
            this.setState({ alertBorder: true });
        }
    }

    render() {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <div className="bg-white p-6 rounded-lg shadow-lg sm:mx-0 mx-3">
                    <h2 className="text-2xl font-bold mb-2">Akses Keamanan</h2>
                    <div className="relative w-full">
                        <input
                            className={`shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${this.state.alertBorder ? 'border-red-300' : 'border-gray-300'}`}
                            type={this.state.showPasscode ? 'text' : 'password'}
                            value={this.state.passcode}
                            onChange={this.handlePasscodeChange}
                            placeholder="Masukkan Kode Keamanan"
                            onKeyDown={this.handleInputEnter}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <button
                                type="button"
                                onClick={this.togglePasscodeVisibility}
                                className="text-gray-500 focus:outline-none focus:text-gray-700"
                            >
                                {this.state.showPasscode ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <small className="text-gray-700">Masukkan kode keamanan untuk membuka halaman</small>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline w-full mt-5"
                        type="submit"
                        onClick={this.verificationProcess}
                    >
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}

export default Verification;