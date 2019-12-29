import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

// pages
import Login from './Login';
import Drawer from './Drawer';
import JobHome from './JobHome'
import JobList from './JobList';
import JobModify from './JobModify';
import Board from './Board';
import User from './User';

// CSS
import '../../assets/uikit.css';
import './css/home.css';

@inject('adminLoginStore')
@observer
class Admin extends Component{
	
	constructor(props){
		super(props);
		
		this.state = {
			page : 1,	
		};
	}
	componentDidMount(){
		const { adminLoginStore } = this.props;
		const { getLogged, loginStatus} = adminLoginStore;
		
		getLogged();
	};
	
	render(){
		const { adminLoginStore } = this.props;
		const { loginStatus } = adminLoginStore;
		if(!loginStatus) return <Login/>;
		
		const { page } = this.state;
		
		return(
			<div className = "admin-home">
				<div className = "navbar"> 
					<h1 className = "navbar-title">ArmyFriend Admin</h1>
				</div>
				
				<Drawer handlePage = {this.handlePage} />
				<div className = "content">
					{ page === 0 ? <Login/> : null }
					{ page === 1 ? <JobHome/> : null }
					{ page === 2 ? <JobList/> : null }
					{ page === 3 ? <JobModify/> : null }
					{ page === 4 ? <Board page = {page}/> : null }
					{ page === 5 ? <Board page = {page}/> : null }
					{ page === 6 ? <Board page = {page}/> : null }
					{ page === 7 ? <User/> : null }
				</div>
			</div>
		)	
	}

	handlePage = (page) => {
		console.log(`페이지 변경 : ${page}`);
		
		this.setState({
			page,
		});
	}

	
}

export default observer(Admin);
