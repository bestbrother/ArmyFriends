import { observable, action } from 'mobx';

// RequestStore
import RequestStore from './RequestStore';

// config
import * as config from './config';
import * as local from './localStorage';

export default class UploadStore{
	
	@observable inputTitle = '';
	@observable unknown = false;

	@action.bound
	inputReset = () => {
		this.inputTitle = '';
		this.unknown = false;
	}
	
	@action.bound
	getTextLength = (str) =>{
		let len = 0;
		for (let i = 0; i < str.length; i++) {
			if (escape(str.charAt(i)).length == 6) {
				len++;
			}
			len++;
		}
		return len;
	}

	@action.bound
	handleInput = e => {
		const name = e.target.name;
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		
		switch(name){
			case "title":
				if(this.getTextLength(this.inputTitle) >= 20 * 2) break;
				this.inputTitle = value;
				break;
			case "unknown":
				this.unknown = value;
				break;
		}
	}
	
	@action.bound
	handleHtml = (html) => {
		this.editorHtml = html;
	}
	
	@action.bound
	handleCancel = (history, jobId) => {
		this.inputTitle = '';
		this.editorHtml = '';
		
		if(jobId) history.replace(`/job/${jobId}`);
		else history.replace('/board');
	}
	
	@action.bound
	upload = async(editorHtml) => {
		if(this.inputTitle === '' || editorHtml === ''){
			alert(`제목과 내용 모두 입력해주세요.`);
			return;
		}
		
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		const url = `${config.API_URL}/posts`;
		const params = {
			title : this.inputTitle,
			content : editorHtml,
			isAnonymous : this.unknown,
  			isNotice : false
		};
		const headers = local.getHeader();
		
		const response = await requestPOST(url, params, headers, "upload Error");
		
		if(response[0] === 201){
			this.inputTitle = '';
			alert(`작성 완료!`);
			
			window.history.back();
		}
	}
	
	@action.bound
	jobUpload = async(jobId, editorHtml) => {
		if(this.inputTitle === '' || editorHtml === '') {
			alert(`제목과 내용 모두 입력해주세요.`);
			return;
		}
		
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		const url = `${config.API_URL}/jobs/${jobId}/posts`;
		const params = {
			title : this.inputTitle,
			content : editorHtml,
			isAnonymous : this.unknown,
		};
		const headers = local.getHeader();
		
		const response = await requestPOST(url, params, headers, "jobUpload Error");
		
		if(response[0] === 204){
			this.inputTitle = '';
			alert(`작성 완료!`);
			
			window.history.back();
		}
	};

	@action.bound
	uploadImage = async(event) => {
		event.preventDefault();
		
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		const url = `${config.API_URL}/uploads`;
		const header = {
			headers: {
				'Authorization': `Token ${local.getAccessToken()}`,
				'content-type': 'multipart/form-data'
			}	
		};
		const params = new FormData();
		let files = event.target.files;
		for(let i=0;i<files.length;i++){
			params.append('file', files[i]);
		}
		
		const response = await requestPOST(url, params, header, "uploadImage Error");
		if(response[0] === 200){
			console.log(response);
			this.editorHtml = this.editorHtml + `<img src ="${config.API_URL}/${response[1].path}" />`;
		}
	}
	
	
	
}