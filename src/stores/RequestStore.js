import { observable, action } from 'mobx';
import axios from 'axios';

export default class RequestStore{
	constructor(root) {
		this.root = root;
	}
	
	@observable state = null; // start, pending, done, error
	@observable error = null;

	@action.bound
	requestGET = async(URL, headers, errorLog) => {
		try{
			const response = await axios.get(URL, headers);
			const res = await Promise.all([
				response.status,
				response.data,
			]);
			
			// console.log
			console.log(res);
			
			return res;
		}catch(error){
			console.log(errorLog); // 에러로그 - 커스텀
			console.log(error.response); // 서버 에러체크
			this.state = "error";
			this.error = error;
			
			return [error.response.status, error.response.data];
		}
	};
	
	@action.bound
	requestPOST = async(URL, params, headers, errorLog) => {
		try{
			const response = await axios.post(URL, params, headers);
			const res = await Promise.all([
				response.status,
				response.data,
			]);
			
			// console.log
			console.log(res);
			
			return res;
		}catch(error){
			console.log(errorLog); // 에러로그 - 커스텀
			console.log(error.response); // 서버 에러체크
			this.state = "error";
			this.error = error;
			
			return [error.response.status, error.response.data];
		}
		
	};
	
	@action.bound
	requestDELETE = async(URL, params, headers, errorLog) => {
		try{
			const response = await axios({
				url : URL,
				method:'delete',
				data : params,
				headers: headers.headers,
			});
			
			const res = await Promise.all([
				response.status,
				response.data,
			]);
			
			// console.log
			console.log(res);
			
			return res;
		}catch(error){
			console.log(errorLog); // 에러로그 - 커스텀
			console.log(error.response); // 서버 에러체크
			this.state = "error";
			this.error = error;
			
			return [error.response.status, error.response.data];
		}
		
	};

	@action.bound
	requestPATCH = async(URL, params, headers, errorLog) => {
		try{
			const response = await axios({
				url : URL,
				method : 'patch',
				data : params,
				headers : headers.headers,
			});
			
			const res = await Promise.all([
				response.status,
				response.data,
			]);
			
			// console.log
			console.log(res);
			
			return res;
		}catch(error){
			console.log(errorLog);
			console.log(error.response);
			this.state = "error";
			this.error = error;
			
			return [error.response.status, error.response.data];
		}
	}
	
	@action.bound
	requestPUT = async(URL, params, headers, errorLog) => {
		try{
			const response = await axios({
				url : URL,
				method : 'put',
				data : params,
				headers : headers.headers,
			});
			
			const res = await Promise.all([
				response.status,
				response.data,
			]);
			
			// console.log
			console.log(res);
			
			return res;
		}catch(error){
			console.log(errorLog);
			console.log(error.response);
			this.state = "error";
			this.error = error;
			
			return [error.response.status, error.response.data];
		}
	}
}