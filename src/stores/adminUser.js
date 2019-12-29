import { observable, action, toJS } from 'mobx';
import RequestStore from './RequestStore';
import axios from 'axios';

// config
import * as config from './config';

// TOKEN
import { getAccessToken } from './localStorage';

export default class AdminUserStore{
	constructor(root){
		this.root = root;	
	}
	
	
	// http Request & Response
	@observable state = 'start'; // start, done, pending, error
	@observable error = null;
	@observable users = [];
	@observable user = null;

	// VIEW
	@observable user_view = false;
	@observable user_id = 0;

	@action.bound
	handleUserView = (id, view) => {
		this.user_id = id;
		this.user_view = view;
	}	

	@action.bound
	getUsers = async() => {
		const URL = `https://api.armyfriend.co.kr/users`;
		
		try{
			this.state = "pending";
			
			const response = await axios.get(URL);
			const status = await response.status;
			const res = await response.data;
			
			if(status === 200){
				console.log(res.users);
				this.users = res.users;
				this.state = "done";
			}else{
				throw new Error(`getUsers error`);
			}
			
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = null;
		}
	}
	
	@action.bound
	getUser = async() => {
		const URL = `https://api.armyfriend.co.kr/users/${this.user_id}`;
		const accessToken = getAccessToken ();
		let config = {
			headers: {'Authorization': "Bearer " + accessToken}
		};
		
		try{
			this.state = "pending";
			
			const response = await axios.get(URL, config);
			const status = await response.status;
			const res = await response.data;
			
			if(status === 200){
				console.log(res.user);
				this.user = res.user;
				this.state = "done";
			}else{
				throw new Error(`getUsers error`);
			}
			
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
	};

	@action.bound
	deleteUser = async(id) => {
		const URL = `https://api.armyfriend.co.kr/users/${id}`;
		const accessToken = getAccessToken ();
		
		let result = window.confirm("정말로 회원을 탈퇴시키겠습니까?");
		if(!result) return null;
		
		try{
			console.log(`회원 탈퇴 시도중,,,`);
			
			this.state = "pending";
			
			const response = await axios({
				url : URL,
				method : 'delete',
				headers: {'Authorization': "Bearer " + accessToken}
			})
			const status = await response.status;
			
			if(status === 204){
				alert(`회원 탈퇴 완료!`);
			}else{
				throw new Error(`회원 탈퇴 오류!`);
			}
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
	}

	
	
}

