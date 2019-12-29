import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// CSS & SCSS
import './style/default.scss';
import './style/normalize.css'; // normalize => 웹 표준에 따른 CSS
import './style/fonts.css'; // fonts CSS

// MobX
import { Provider } from 'mobx-react'; // store 주입
import RootStore from './stores/root'; // 스토어 불러오기

// pages
import Admin from './pages/Admin/Admin';
import Upload from './pages/Upload/Upload';
import UploadEdit from './pages/UploadEdit/UploadEdit';

import Login from './pages/User/Login';
import Register from './pages/User/Register';

import Job from './pages/Job/Job';
import JobDetail from './pages/Job/JobDetail';
import JobBoard from './pages/Job/JobBoard';

import PostList from './pages/Board/PostList';
import PostDetail from './pages/Board/PostDetail';

import My from './pages/My/My';
import FindId from './pages/User/FindId';
import FindPassword from './pages/User/FindPassword';

import PopUp from './pages/PopUp/PopUp';
import PopUp2 from './pages/PopUp/PopUp2';

// rootStore
const root = new RootStore();

// Google Analytics
const ReactGA = require('react-ga');
ReactGA.initialize('UA-146901294-1');

const logPageView = () =>{
	ReactGA.set({ page: window.location.pathname });
	ReactGA.pageview(window.location.pathname);
}


const Root = () => {
	useEffect(()=>{
		console.log(`Goolgle Analytics Setting,,,`);
		
		logPageView();
	},[]);
	
	return(
		<Provider {...root} >
			<BrowserRouter>
				<Router/>
			</BrowserRouter>
		</Provider>
	);
};

const Router = () => (
	<React.Fragment>
		<Switch>
			<Route path = "/admin" component = {Admin} />

			<Route path = "/login" component = {Login} />
			<Route path = "/register" component = {Register} />

			<Route path = "/my/:page" component= {My} />
			<Route path = "/find/id" component = {FindId}/>
			<Route path = "/find/password" component = {FindPassword}/>

			<Route path = "/board/upload" component = {Upload}/>
			<Route path = "/board/:id/edit" render = {(props)=><UploadEdit {...props} edit = "board"/>} />
			<Route path = "/board/:id" component = {PostDetail} />
			<Route path = "/board" component = {PostList} />

			<Route path = "/jobs/:jobId/upload" component = {Upload} />
			<Route path = "/jobs/board/:id/edit"  render = {(props)=><UploadEdit {...props} edit = "job"/>} />
			<Route path = "/jobs/:jobId/board/:id" component = {JobBoard} />
			<Route path = "/jobs/:jobId" component = {JobDetail} />

			<Route path = "/" component = { Job } />
		</Switch>
		
		<PopUp/>
		<PopUp2/>
	</React.Fragment>
);


export default Root;