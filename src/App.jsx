import React from "react";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Verification from "./pages/Verification";
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			session: false,
			page: 'verification',
			isLoading: true
		};
		this.session_data = 'session_data';
	}

	checkSessionLocalStorage = () => {
		const sessionData = localStorage.getItem(this.session_data);
		const sessionDate = sessionData ? new Date(sessionData) : 'Invalid Date';
		let state_data;

		if (sessionData && sessionDate !== 'Invalid Date') {
			const currentDate = new Date();
			const sessionDatePlus1Day = sessionDate.setDate(sessionDate.getDate() + 1);
			if (sessionDatePlus1Day < currentDate.getTime()) {
				Swal.fire({
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showCancelButton: true,
                    cancelButtonText: 'Tutup',
                    icon: 'error',
                    text: 'Sesi anda habis',
                });
				localStorage.removeItem(this.session_data);
				state_data = { session: false, page: 'verification', isLoading: true };
			} else {
				localStorage.setItem(this.session_data, currentDate.toISOString());
				const page = this.state.page === 'verification' ? 'dashboard' : this.state.page;
				state_data = { session: true, page: page, isLoading: true };
			}
		} else {
			state_data = { session: false, page: 'verification', isLoading: true };
		}

		this.setState(state_data);
	}
	setSessionLocalStorage = () => {
		const currentDate = new Date();
		localStorage.setItem(this.session_data, currentDate.toISOString());
		this.setState({ session: true, page: 'dashboard', isLoading: true });
	}
	handleChangePage = (page) => {
		this.setState({ page: page, isLoading: true });
	}

	componentDidMount() {
		this.checkSessionLocalStorage();
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 1000);
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.page !== this.state.page) {
			setTimeout(() => {
				this.setState({ isLoading: false });
			}, 1000);
		}
	}

	render() {
		return (
			<>
				{
					this.state.isLoading ? (
						<div className='fixed inset-0 w-full h-screen z-10 flex items-center justify-center' style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
							<ReactLoading type='spinningBubbles' height='10%' width='10%' color="#0f172a" />
						</div>
					) : ''
				}
				{this.state.page === 'verification' ? <Verification onChangePage={this.handleChangePage} setSession={this.setSessionLocalStorage} /> : ''}
				{this.state.page === 'dashboard' ? <Dashboard onChangePage={this.handleChangePage} checkSession={this.checkSessionLocalStorage} /> : ''}
				{this.state.page === 'detail' ? <Detail onChangePage={this.handleChangePage} checkSession={this.checkSessionLocalStorage} /> : ''}
			</>
		)
	}
}

export default App;