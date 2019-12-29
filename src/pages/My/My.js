/* eslint-disable */

import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

// CSS
import './scss/My.scss';

// pages
import History from './History';
import MyDrawer from './MyDrawer';
import MyPosts from './MyPosts';
import MyComments from './MyComments';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

// basic
import Container from '../../basic/Container/Container';

@inject('popUpStore')
@inject('myStore')
@observer
class My extends Component{
	
	render(){
		const { myStore, match } = this.props;
		const PAGE = match.params.page;
		
		return(
			<Container 
				className = "My" 
				className2 = "MyContainer"
				header = {{view : true, active : ''}}>
				
				<MyDrawer page = {PAGE} />
				{this.renderPage()}
				
			</Container>
		)
	}
	
	renderPage = () => {
		const { myStore, popUpStore, match } = this.props;
		const page = match.params.page;
		const {
			posts,
			user,
			
			handleInput,
			login,
			
			getLogged,
			
			activePage,
			handleActivePage,
		} = myStore;
		
		if(!getLogged()) this.props.history.push('/login');
		const PAGE = match.params.page;
	
		switch(PAGE){
			case "1":
				return <History
						   activePage = {activePage}
						   handleActivePage = {handleActivePage}
						   />;
			case "2":	
				return <MyPosts/>;
			case "3":
				return <MyComments/>;
			case "4":
				return <EditUser/>;
			case "5":
				return <DeleteUser/>;
		}
	}
	
}

export default My;