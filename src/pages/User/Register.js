/* eslint-disable */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// pages
import Register1 from './Register1';
import Register2 from './Register2';
import Register3 from './Register3';

// SCSS
import './Register.scss';

export default class Register extends Component{
	render(){
		return(
			<div className = "Register">
				<Switch>
					<Route path = "/register/1" component = {Register1}/>
					<Route path = "/register/2" component = {Register2}/>
					<Route path = "/register/3" component = {Register3}/>
					<Route path = "/register" render = {()=>this.props.history.push('/register/1')}/>
				</Switch>
			</div>
		);
	}
}