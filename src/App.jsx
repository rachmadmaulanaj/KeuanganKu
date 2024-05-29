import React from "react";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";

class App extends React.Component {
	constructor() {
		super();
		this.state = { page: 'dashboard' };
	}

	handleChangePage = (page) => {
		this.setState({ page: page });
	}

	componentDidUpdate() {
		console.log('page', this.state.page)
	}

	render() {
		return (
			<>
				{this.state.page === 'dashboard' ? <Dashboard onChangePage={this.handleChangePage} /> : ''}
				{this.state.page === 'detail' ? <Detail onChangePage={this.handleChangePage} /> : ''}
			</>
		)
	}
}

export default App;