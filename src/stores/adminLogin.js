import { observable, action } from 'mobx';
import RequestStore from './RequestStore';

import * as config from './config';
import * as local from './localStorage';

export default class AdminLoginStore{
	constructor(root){
		this.root = root;	
	}
	
	// http Request & Response
	@observable state = 'start'; // start, done, pending, error
	@observable error = null;
	@observable loginStatus = false;
	
	@observable inputId = '';
	@observable inputPassword = '';

	@action.bound
	handleId = (event) => {
		this.inputId = event.target.value;
	}
	
	@action.bound
	handlePassword = (event) => {
		this.inputPassword = event.target.value;
	}
	
	@action.bound
	login = async() => {
		console.log(`로그인 시도중,,,`);
		
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		const url = `${config.API_URL}/auth/login?role=admin`;
		
		const response = await requestPOST(url, {
			id : this.inputId,
			password : this.inputPassword
		});
		
		if(response[0] === 200){
			local.saveAccessToken(response[1].accessToken);
			
			this.loginStatus = true;
			console.log(`관리자 로그인 성공!`);
		}
	}
	
	@action.bound
	getLogged = async() => {
		const accessToken = local.getAccessToken();
		
		if(accessToken === null){
			this.loginStatus = false;
		}else{
			this.loginStatus = true;
		}
	}
	
}

