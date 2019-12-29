import { observable, action } from 'mobx';
import axios from 'axios';

// RequestStore
import RequestStore from './RequestStore';

// config
import * as config from './config';
import * as local from './localStorage';

export default class MyStore{
	
	@observable status = null;
	@observable api = null;

	@observable user = null;
	@observable posts = [];
	@observable posts_comment = [];

	@observable activePage = 1;
	@observable logged = false;
	@observable inputPassword = '';

	// DeleteUser
	@observable user = null;
	@observable inputDeleteId = '';
	@observable inputDeleteName = '';
	@observable inputDeletePassword = '';

	@observable show = false;

	@observable errorLog_login = '';
	@observable errorLog_changePassword = '';
	@observable errorLog = '';
	
	// Change Password & Nickname
	@observable inputNewNickname = '';
	@observable input_Password = '';
	@observable inputNewPassword = '';
	@observable inputNewPassword2 = '';
	
	@observable OVERLAP_nickname = true;
	@observable OVERLAP_nickname_errorLog = '';

	@action.bound
	handleShow = (show) => {
		this.show = show;
	}
	
	constructor(root){
		this.root = root;
	}

	@action.bound
	getLogged = () => {
		return local.getLogged();
	};

	@action.bound
	handleActivePage = (activePage) => {
		this.activePage = activePage;
	};
	
	@action.bound
	handleInput = e => {
		const name = e.target.name;
		const value = e.target.value;
		
		switch(name){
			case "password":
				this.inputPassword = value;
				break;
			case "id":
				this.inputId = value;
				break;
			case "name":
				this.inputName = value;
				break;
			case "password_":
				this.input_Password = value;
				break;
			case "new_password":
				this.inputNewPassword = value;
				break;
			case "new_password2":
				this.inputNewPassword2 = value;
				break;
			case "nickname":
				this.inputNewNickname = value;
				break;
			case "deleteId":
				this.inputDeleteId = value;
				break;
			case "deleteName":
				this.inputDeleteName = value;
				break;
			case "deletePassword":
				this.inputDeletePassword = value;
				break;
		}
	};
	
	@action.bound
	login = async() => {
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		const userId = local.getUserId();
		if(!local.getLogged()){
			// 로그인이 되어있지 않음
			this.root.popUpStore.handleShow(true);
			return null;
		}
		
		const url = `${config.API_URL}/auth/login`;
		const params = {
			id : userId,
			password : this.inputPassword,
		};
		
		const response = await requestPOST(url, params, null, "CheckPassword Login Error");
		if(response[0] === 200){
			this.logged = true;
			this.api = "getMyUser";
		}else{
			this.errorLog_login = `비밀번호를 확인해주세요`;
		}
	};
	
	@action.bound
	changePassword = async() => {
		const requestStore = new RequestStore();
		const { requestPATCH } = requestStore;
		
		const userId = local.getUserId();
		if(!local.getLogged()){
			// 로그인이 되어있지 않음
			this.root.popUpStore.handleShow(true);
			return null;
		}
		
		if(!/^(?=.*[a-zA-Z!@#$%^*+=-_])(?=.*[0-9]).{6,20}$/.test(this.inputNewPassword)){
			this.errorLog_changePassword = '6-20자, 영문/숫자를 모두 입력해주세요.';
			return;
		}
		
		if(this.inputPassword === this.inputNewPassword){
			this.errorLog_changePassword = '이전 비밀번호와 일치합니다.';
			return;
		}
		
		if(this.inputNewPassword !== this.inputNewPassword2){
			this.errorLog_changePassword = '비밀번호와 비밀번호 재입력이 일치하지 않습니다.';
			return null;
		}
		const url = `${config.API_URL}/users/${userId}`;
		const params = {
			password : this.inputNewPassword,
		};
		
		const response = await requestPATCH(url, params, {
			headers:{
				'Authorization' : 'Bearer ' + local.getAccessToken(),
			}
		}, "changePassword Error");
		
		if(response[0] === 204){
			alert(`패스워드 변경 완료`);
			
			this.input_Password = '';
			this.inputNewPassword = '';
			this.inputNewPassword2 = '';
		}
	}
	
	
	@action.bound
	changeNickname = async() => {
		const requestStore = new RequestStore();
		const { requestPATCH } = requestStore;
		
		if(this.OVERLAP_nickname){
			this.OVERLAP_nickname_errorLog = '닉네임 중복체크가 되어있지 않습니다.';
			return null;
		}
		
		if(!/^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,15}$/.test(this.inputNewNickname)){
			this.OVERLAP_nickname_errorLog = '2~15자의 한글, 영문, 숫자로만 입력해주세요.';
			return null;
		}
		
		const userId = local.getUserId();
		if(!local.getLogged()){
			// 로그인이 되어있지 않음
			this.root.popUpStore.handleShow(true);
			return null;
		}
		
		const url = `${config.API_URL}/users/${userId}`;
		const params = {
			nickname : this.inputNewNickname
		};
		
		const response = await requestPATCH(url, params, {
			headers:{
				'Authorization' : 'Bearer ' + local.getAccessToken(),
			}
		}, "changePassword Error");
		
		if(response[0] === 204){
			alert(`닉네임 변경 완료`);
			
			this.inputNewNickname = '';
		}
	}
	
	@action.bound
	checkNickname = async() => {
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		if(!/^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,15}$/.test(this.inputNewNickname)){
			this.OVERLAP_nickname_errorLog = '2~15자의 한글, 영문, 숫자로만 입력해주세요.';
			return null;
		}
		
		const user = local.getUser();
		const userNickname = user.nickname;
		
		const url = `${config.API_URL}/users?nickname=${this.inputNewNickname}`;
		const response = await requestGET(url, null, "checkNickname Error");
		
		if(response[1].users.length === 0){
			this.OVERLAP_nickname = false;
			this.OVERLAP_nickname_errorLog = '중복 체크 완료.';
		}else{
			this.OVERLAP_nickname_errorLog = '중복된 닉네임입니다.';
		}
	}
	
	@action.bound
	cancelChangePassword = () => {
		this.inputNewPassword = '';
		this.inputNewPassword2 = '';
	}
	
	@action.bound
	cancelChangeNickname = () => {
		this.inputNewNickname = '';
	}
	
	
	@action.bound
	deleteUser1 = async() => {
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		if(!local.getLogged()){
			// 로그인이 되어있지 않음
			this.root.popUpStore.handleShow(true);
			return null;
		}
		
		// 로그인 우선
		const url = `${config.API_URL}/auth/login`;
		const params = {
			id : this.inputDeleteId,
			password : this.inputDeletePassword,
		};
		
		const response = await requestPOST(url, params, null, "deleteUser Login Error");
		
		if(response[0] === 200){
			if(this.inputDeleteName !== response[1].user.name){
				this.errorLog = '아이디, 비밀번호, 이름 모두 입력을 확인해주세요.';
				return;
			}else{
				this.show = true;	
			}
		}else if(response[0] === 404){
			this.errorLog = '아이디, 비밀번호를 확인해주세요.';
			return;
		}
	}

	@action.bound
	deleteUser2 = async() => {
		if(!this.show) return null;
		
		const requestStore = new RequestStore();
		const { requestDELETE } = requestStore;
		
		const userId = local.getUserId();
		const url = `${config.API_URL}/users/${userId}`;		
		
		const response = await requestDELETE(url, null, {
			headers:{
				'Authorization' : 'Bearer ' + local.getAccessToken(),
			}
		}, "deleteUser Error");
		
		if(response[0] === 204){
			alert(`탈퇴완료!`);
			this.status = response[0];
			this.api = "deleteUser";
			
			// 로그아웃
			local.logout();
			
			// 팝업창 닫기
			this.show = false;
			
			window.location.replace('/');
		}
	}
	
	@action.bound
	getMyUser = async() => {
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const userId = local.getUserId();
		if(!local.getLogged()){
			// 로그인이 되어있지 않음
			this.root.popUpStore.handleShow(true);
			return null;
		}
		
		const url = `${config.API_URL}/users/${userId}`;
		const header = local.getHeader();
		
		const response = await requestGET(url, header, "getMyUser Error");
		if(response[0] === 200){
			this.status = response[0];
			this.api = "getMyUser";
			
			this.user = response[1].user;
		}
	};


	@action.bound
	getMyPosts = async() => {
		this.posts = [];
		
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const userId = local.getUserId();
		if(!local.getLogged()){
			// 로그인이 되어있지 않음
			this.root.popUpStore.handleShow(true);
			return null;
		}
		
		const url = `${config.API_URL}/users/${userId}/posts`;
		
		const response = await requestGET(url, null, "getMyPosts Error");
		if(response[0] === 200){
			this.status = response[0];
			this.api = "getMyPosts";
			
			this.posts = response[1].posts;
		}
		
	};
	
	@action.bound
	getMyComments = async() => {
		this.posts_comment = [];
		
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const userId = local.getUserId();
		if(!local.getLogged()){
			// 로그인이 되어있지 않음
			this.root.popUpStore.handleShow(true);
			return null;
		}
		
		const url = `${config.API_URL}/users/${userId}/comments`;
		
		const response = await requestGET(url, null, "getMyComments Error");
		if(response[0] === 200){
			this.status = response[0];
			this.api = "getMyComments";
			
			let post_array = [];
			response[1].comments.map(comment=>{
				if(comment.post !== null){
					post_array.push(comment.post);
				}
			});
			this.remove_duplicates(post_array);
			this.posts_comment = post_array;
		}
		
	};
	
	remove_duplicates = (objectsArray) => {
		// 객체 배열 중복 제거 함수
		let usedObjects = {};

		for (let i=objectsArray.length - 1;i>=0;i--) {
			let so = JSON.stringify(objectsArray[i]);

			if(usedObjects[so]) {
				objectsArray.splice(i, 1);

			}else{
				usedObjects[so] = true;          
			}
		}

		return objectsArray;
	};
}