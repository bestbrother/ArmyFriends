import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// system
import FeatureContainer from './FeatureContainer';
import JobContainer from './JobContainer';

// basic
import Container from '../../basic/Container/Container';
import Footer from '../../basic/Footer/Footer';

export default class Job extends Component{
	render(){
		return(
			<Container 
				className = "Job"
				header = {{view : true, active : 'job'}}>
				
				<FeatureContainer />
				<JobContainer />
				<Footer/>
				
			</Container>
		);
	}
}