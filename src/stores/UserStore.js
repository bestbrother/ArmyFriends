import { observable, action, toJS } from 'mobx';

// axios
import axios from 'axios';

// RequestStore
import RequestStore from './RequestStore';

// config
import * as config from './config';
import * as local from './localStorage';

export default class UserStore{
	
	@observable status = null;
	@observable api = null;

	// VALUE
	@observable user = null;

	@observable inputId = '';
	@observable inputName = '';
	@observable inputPassword = '';
	@observable inputPassword2 = '';
	@observable inputEmail = '';

	@observable errorLog = '';
	@observable errorLog_findId = '';
	@observable errorLog_findPassword = '';

	// View
	@observable show = false;

	// Register
	@observable checkbox1 = false;
	@observable checkbox2 = false;
	@observable checkbox3 = false;

	@observable input_Id = '';
	@observable input_Password = '';
	@observable input_Password2 = '';
	@observable input_Email = '';
	@observable input_Name = '';
	@observable input_Nickname = '';
	@observable input_Auth = '';

	@observable errorLog1 = '';
	@observable errorLog2 = '';
	@observable errorLog2_id = '';
	@observable errorLog2_password = '';
	@observable errorLog2_password2 = '';
	@observable errorLog2_name = '';
	@observable errorLog2_nickname = '';
	@observable errorLog2_email = '';
	@observable errorLog2_emailAuth = '';
	@observable errorLog2_emailAuthSuccess = '';

	@observable errorLog_login = '';
	@observable errorLog_login_id = '';
	@observable errorLog_login_password = '';

	@observable auth_view = false;
	@observable auth = false; // 이메일 인증
	@observable code = null;

	@action.bound
	setDefault = () => {
		this.inputId = '';
		this.inputPassword = '';
		this.inputPassword2 = '';
		this.inputEmail = '';
		this.inputName = '';
		
		this.api = null;
	}

	@action.bound
	handleRegisterInput = e => {
		const name = e.target.name;
		const value = e.target.value;
		
		switch(name){
			case "id":
				this.input_Id = value;
				break;
			case "password":
				this.input_Password = value;
				break;
			case "password2":
				this.input_Password2 = value;
				break;
			case "email":
				this.input_Email = value;
				break;
			case "name":
				this.input_Name = value;
				break;
			case "nickname":
				this.input_Nickname = value;
				break;
			case "auth":
				this.input_Auth = value;
				break;
		}
	}

	@action.bound
	handleInput = e => {
		const name = e.target.name;
		const value = e.target.type !== 'checkbox' ? e.target.value : e.target.checked;
		
		switch(name){
			case "id":
				this.inputId = value;
				break;
			case "name":
				this.inputName = value;
				break;
			case "password":
				this.inputPassword = value;
				break;
			case "password2":
				this.inputPassword2 = value;
				break;
			case "email":
				this.inputEmail = value;
				break;
			case "checkbox1":
				this.checkbox1 = value;
				break;
			case "checkbox2":
				this.checkbox2 = value;
				break;
			case "checkbox3":
				this.checkbox3 = value;
				break;
		}
	}
	
	@action.bound
	handleErrorLog = (index, error) => {
		if(index === 1){
			this.errorLog1 = error;
		}else if(index === 2){
			this.errorLog2 = error;
		}
	};
	
	@action.bound
	handleShow = show => {
		this.show = show;
	};
	
	@action.bound
	login = async(history) => {
		let login_index = false;
		
		if(this.inputId === ''){
			this.errorLog_login_id = '필수 정보입니다.';
			login_index = true;
		}else{
			this.errorLog_login_id = '';
		}
		if(this.inputPassword === ''){
			this.errorLog_login_password = '필수 정보입니다.';
			login_index = true;
		}else{
			this.errorLog_login_password = '';
		}
		
		if(login_index){
			return;
		}
		
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		const url = `${config.API_URL}/auth/login`;
		const params = {
			id : this.inputId,
			password : this.inputPassword,
		}
		const response = await requestPOST(url, params, null, "Login Error");
		
		if(response[0] === 200){			
			this.status = response[0];
			this.api = "login";
			this.errorLog_login = '';
			this.errorLog_login_id = '';
			this.errorLog_login_password = '';
			
			// 아이디 저장
			local.saveUserId(this.inputId);
			// 로그인 했다는걸 저장
			local.saveLogged("1");
			// 토큰 저장
			local.saveAccessToken(response[1].accessToken);
			// 정보 전체 저장
			local.saveUser(response[1].user);
			
			// Redirect to Home
			history.replace('/');
		}else if(response[0] === 401){
			// 패스워드가 옳지 않음
			this.errorLog_login = '아이디 또는 패스워드를 확인해주세요.';
		}else if(response[0] === 404){
			// 사용자가 없음
			this.errorLog_login = '사용자가 존재하지 않습니다.';
		}
		
	};

	@action.bound
	register = async(history) => {
		let fail_index = false;
		
		this.errorLog2_id = '';
		this.errorLog2_password = '';
		this.errorLog2_password2 = '';
		this.errorLog2_name = '';
		this.errorLog2_nickname = '';
		this.errorLog2_email = '';
		
		if(!/^[a-zA-Z0-9]{5,20}$/.test(this.input_Id)){
			this.errorLog2_id = '5~20자 영문, 숫자로 입력해 주세요.';	
			fail_index = true;
		}
		if(!/^(?=.*[a-zA-Z!@#$%^*+=-_])(?=.*[0-9]).{6,20}$/.test(this.input_Password)){
			this.errorLog2_password = '6-20자, 영문/숫자를 모두 입력해주세요.';
			fail_index = true;
		}
		if(this.input_Password !== this.input_Password2){
			this.errorLog2_password2 = '비밀번호가 일치하지 않습니다.';
			fail_index = true;
		}
		if(!/^[가-힣a-zA-Z]{2,15}$/.test(this.input_Name)){
			this.errorLog2_name = '두 글자 이상의 이름을 정확히 입력해 주세요.'
		}
		if(!/^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,15}$/.test(this.input_Nickname)){
			this.errorLog2_nickname = '2~15자의 한글, 영문, 숫자로만 입력해주세요.';
		}
		if(!/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/.test(this.input_Email)){
			this.errorLog2_email = '이메일 주소를 다시 확인해주세요.';
		}
		if(this.input_Id === ''){
			this.errorLog2_id = '필수 정보입니다.';
		}
		if(this.input_Password === ''){
			this.errorLog2_password = '필수 정보입니다.';
		}
		if(this.input_Password2 === ''){
			this.errorLog2_password2 = '필수 정보입니다.';
		}
		if(this.input_Name === ''){
			this.errorLog2_name = '필수 정보입니다.';
		}
		if(this.input_Nickname === ''){
			this.errorLog2_nickname = '필수 정보입니다.';
		}
		if(this.input_Email === ''){
			this.errorLog2_email = '필수 정보입니다.';
		}
		
		if(!this.auth){
			this.errorLog2 = '이메일 인증을 해주세요';
			fail_index = true;
		}
		
		if(fail_index) return null;	
		
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		const url = `${config.API_URL}/auth/register`;
		const params = {
			id : this.input_Id,
			password : this.input_Password,
			name : this.input_Name,
			nickname : this.input_Nickname,
			email : this.input_Email,
			mailAccept : this.checkbox3,
		};
		
		const response = await requestPOST(url, params, null, "Register Error");
		
		if(response[0] === 204){
			this.inputId = this.input_Id;
			this.inputPassword = this.inputPassword;
			
			// await this.login(history);
			
			history.push('/register/3');
		}else{
			this.errorLog2 = '아이디 또는 이메일이 중복되었습니다.';
		}
	};
	
	@action.bound
	findId = async() => {
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		if(this.inputEmail === '' && this.inputName === ''){
			this.errorLog_findId = '이름과 이메일을 모두 입력해주세요.';
			return;
		}else if(this.inputEmail === ''){
			this.errorLog_findId = '이메일을 입력해주세요.';
			return;
		}else if(this.inputName === ''){
			this.errorLog_findId = '이메일을 입력해주세요.';
			return;
		}
		
		
		const url = `${config.API_URL}/auth/findId`;
		const params = {
			email : this.inputEmail,
			name : this.inputName,
		};
		
		const response = await requestPOST(url, params, null, "findId Error");
		if(response[0] === 200){
			this.status = response[0];
			this.api = "findId";
			
			this.user = response[1].user;
		}else{
			this.errorLog_findId = '이름과 이메일을 확인해주세요';
		}
	};

	@action.bound
	findPassword = async() => {
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		if(this.inputId === '' || this.inputName === '' || this.inputEmail === ''){
			this.errorLog_findPassword = '아이디, 이름, 이메일 주소를 모두 입력해주세요.';
			return;
		}
		
		const url = `${config.API_URL}/auth/resetPassword`;
		const params = {
			email : this.inputEmail,
			name : this.inputName,
			id : this.inputId,
		};
		
		const response = await requestPOST(url, params, null, "findPassword Error");
		if(response[0] === 204){
			this.status = response[0];
			this.api = "findPassword";
			
			this.show = true;
		}else{
			this.errorLog_findPassword = '아이디, 이름, 이메일을 확인해주세요.';
		}
	};

	@action.bound
	getAuthCode = async() => {
		if(!/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/.test(this.input_Email)){
			return null;
		}
		
		this.auth_view = true;
		
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url = `${config.API_URL}/auth/code?email=${this.input_Email}`;
		
		const response = await requestGET(url, null, "getAuthCode Error");
		if(response[0] === 200){
			this.code = response[1].code + '';
		}
		
	};

	@action.bound
	checkAuthCode = () => {		
		if(this.code === this.input_Auth){
			this.errorLog2_emailAuthSuccess = '메일인증이 완료되었습니다.';
			this.errorLog2_emailAuth = '';
			this.auth = true;
		}else{
			this.errorLog2_emailAuthSuccess = '';
			this.errorLog2_emailAuth = '올바르지 않은 인증코드입니다.'
			this.auth = false;
		}
	}

	checkPassword =(id,password) =>{
		if(!/^[a-zA-Z0-9]{10,15}$/.test(password)){
			alert('숫자와 영문자 조합으로 10~15자리를 사용해야 합니다.');
			return false;
		}
		var checkNumber = password.search(/[0-9]/g);
		var checkEnglish = password.search(/[a-z]/ig);
		
		if(checkNumber < 0 || checkEnglish < 0){
			alert("숫자와 영문자를 혼용하여야 합니다.");
			return false;
		}

		if(/(\w)\1\1\1/.test(password)){
			alert('444같은 문자를 4번 이상 사용하실 수 없습니다.');
			return false;
		}
		if(password.search(id) > -1){
			alert("비밀번호에 아이디가 포함되었습니다.");
			return false;
		}
		
		return true;
	}

}