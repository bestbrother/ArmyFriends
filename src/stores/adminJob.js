import { observable, action, toJS } from 'mobx';
import RequestStore from './RequestStore';
import axios from 'axios';

// config
import * as config from './config';

// TOKEN
import { getAccessToken } from './localStorage';

export default class AdminJobStore{
	
	constructor(root){
		this.root = root;	
	}
	
	// 입력	
	@observable inputJob = '';

	// HTTP STATUS
	@observable state = 'start'; // pending, done, error
	@observable error = null;
	@observable render = false;

	// VALUE
	@observable jobs = [];
	@observable job = null;
	@observable jobSlices = [];
	@observable checked = [];

	// FEATURE LINK JOB
	@observable features = [];
	@observable job_options = [];
	@observable options_checked = [];
	@observable web_links = [];
	@observable video_links = [];

	@action.bound
	addLink = (type) => {
		if(type === "web"){
			this.web_links.push({
				url : '',
				name : '',
				type : "web"
			});
			
			console.log(toJS(this.web_links));
		}
		else if(type === "video"){
			this.video_links.push({
				url : '',
				name : '',
				type : "video"
			});
			
			console.log(toJS(this.video_links));
		}
	};

	@action.bound
	handleLink = (event, type, loc) => {
		const index = event.target.name;
		const value = event.target.value;
		
		if(type === "web"){
			if(loc === "name"){
				const web_copy = this.web_links.slice();
				web_copy[index].name = value;
				
				this.web_links = web_copy;
			}else if(loc === "url"){
				const web_copy = this.web_links.slice();
				web_copy[index].url = value;
				
				this.web_links = web_copy;
			}
			
			// console.log(toJS(this.web_links));
		}else if(type === "video"){
			if(loc === "name"){
				const video_copy = this.video_links.slice();
				video_copy[index].name = value;
				
				this.video_links = video_copy;
			}else if(loc === "url"){
				const video_copy = this.video_links.slice();
				video_copy[index].url = value;
				
				this.video_links = video_copy;
			}
			// console.log(toJS(this.video_links));
		}
		
		// console.log(`${type}${index} : ${value}`);
	};

	@action.bound
	getAll = async(id) => {
		this.state = "pending";
		
		this.job = null;
		this.job_options = [];
		this.options_checked = [];
		this.web_links = [];
		this.video_links = [];
		
		await Promise.all([
			this.getJob(id),
			this.getFeatures(),
		]);
		
		this.state = "done";
	};

	@action.bound
	getJobs = async() => {
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url = `https://api.armyfriend.co.kr/jobs`;
		
		const response = await requestGET(url, null, "getJobs Error");
		
		if(response[0] === 200){
			this.jobs = response[1].jobs;
			this.jobs_copy = response[1].jobs;
		}
	};

	@action.bound
	getJob = async(id) => {
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url = `https://api.armyfriend.co.kr/jobs/${id}`;
		
		const response = await requestGET(url, null, "getJob Error");
		
		if(response[0] === 200){
			this.job = response[1].job;
			this.job_options = response[1].job.options;
			// 체크박스 추가
			response[1].job.options.map(option=>this.options_checked.push(`${option.id}`));

			// 링크 추가
			response[1].job.links.filter(link=>{
				if(link.type === "web"){
					this.web_links.push(link);
				}
				if(link.type === "video"){
					this.video_links.push(link);
				}
			});
		}
	};

	@action.bound
	getFeatures = async() => {
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url = `https://api.armyfriend.co.kr/features`;
		const response = await requestGET(url);
		
		if(response[0] === 200){
			this.features = response[1].features;
		}
	};


	@action.bound
	uploadImage = async(event) => {
		const name = event.target.name;
		const file = event.target.files[0];
		
		// URL 
		const URL = `https://api.armyfriend.co.kr/uploads`;
		// Token
		const accessToken = getAccessToken();
		let config = {
			headers: {'Authorization': "Bearer " + accessToken}
		};
		
		// 데이터 FormData
		const data = new FormData();
		data.append('file', file);
		
		try{
			const response = await axios.post(URL, data, config);
			const status = await response.status;
			const res = await response.data;
			
			if(status === 200){
				if(name === "image"){
					const job_copy = { ...this.job };
					job_copy.image = `https://api.armyfriend.co.kr/${res.path}`;
					this.job = job_copy;
				}else if(name === "thumbnail"){
					const job_copy = { ...this.job };
					job_copy.thumbnail = `https://api.armyfriend.co.kr/${res.path}`;
					this.job = job_copy;
				}
			}else{
				throw new Error(`uploadImage error`);
			}
			
		}catch(error){
			console.log(error.response);
			this.state ="error";
			this.error = error;
		}
	};

	

	@action.bound
	patchModify = async(id) => {
		const requestStore = new RequestStore();
		const { requestPOST, requestPUT, requestPATCH } = requestStore;
		
		const URL = `https://api.armyfriend.co.kr/jobs/${this.job.id}`;
		const PUT_URL = `https://api.armyfriend.co.kr/jobs/${this.job.id}/options`;
		
		let config = {
			headers: {'Authorization': "Bearer " + getAccessToken()}
		};
		
		const response1 = await requestPATCH(URL,{
			name : this.job.name,
			description : this.job.description,
			image : this.job.image,
			thumbnail : this.job.thumbnail,
			directField : this.job.directField,
			indirectField : this.job.indirectField,
			physical : this.job.physical,
			requirement : this.job.requirement,
			process : this.job.process,
			rate : this.job.rate,
		}, config);
		
		const response2 = await requestPUT(PUT_URL,{
			id : this.options_checked,
		}, config);
		
		// link 새로 만들어진것과, 수정한것을 구분한다.
		// name 과 url 이 모두 존재해야 CREATE OR MODIFY 된다.
		// name 또는 url 이 하나라도 공백이면 DELETE 된다.
		let links_modify = [];
		let links_new = [];
		let links_delete = [];

		this.web_links.filter(link=>link.id).map(modify_link=>links_modify.push(toJS(modify_link)));
		this.video_links.filter(link=>link.id).map(modify_link=>links_modify.push(toJS(modify_link)));
		this.web_links.filter(link=>!link.id).map(new_link=>links_new.push(toJS(new_link)));
		this.video_links.filter(link=>!link.id).map(new_link=>links_new.push(toJS(new_link)));
		
		const responses1 = await Promise.all(
			links_modify.map(link=>(
				requestPUT(`https://api.armyfriend.co.kr/links/${link.id}`,{
					name : link.name,
					url : link.url,
					type : link.type,
				}, config)
			))
		);
		
		const responses2 = await Promise.all(
			links_new.map(link=>(
				requestPOST(`https://api.armyfriend.co.kr/jobs/${this.job.id}/links`,{
					name : link.name,
					url : link.url,
					type : link.type,
				}, config)
			))
		);
		
		let responses1_FLAG = true;
		let responses2_FLAG = true;
		
		responses1.map(response=>{
			if(response[0] !== 204) responses1_FLAG = false;
		});
		responses2.map(response=>{
			if(response[0] !== 204) responses2_FLAG = false;
		})
		
		if(responses1_FLAG && responses2_FLAG && response1[0] === 204 && response2[0] === 204){
			alert(`수정완료!`);
		}else{
			alert(`수정실패!`);
		}
	};

	@action.bound
	deleteLinks = async(id) => {
		const requestStore = new RequestStore();
		const { requestDELETE } = requestStore;
		
		let config = {
			headers: {'Authorization': "Bearer " + getAccessToken()}
		};
		
		let delete_links = [];
			
		this.web_links.filter(link=>link.id && (link.name === "" || link.url === "")).map(d_link=>delete_links.push(toJS(d_link)));
		this.video_links.filter(link=>link.id && (link.name === "" || link.url === "")).map(d_link=>delete_links.push(toJS(d_link)));
		
		const responses = await Promise.all(
			delete_links.map(link=> (
				requestDELETE(`https://api.armyfriend.co.kr/links/${link.id}`, null, config)
			))
		);
		
		let DELETE_FLAG = true;
		responses.map(response=>{
			if(response[0] !== 204) DELETE_FLAG = false;
		});
		
		if(DELETE_FLAG){
			alert(`삭제 완료!`);
		}else{
			alert(`삭제 실패!`);
		}
	};

	@action.bound
	handleJob = event =>{
		this.inputJob = event.target.value;
	};

	@action.bound
	uploadJob = async() => {
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		const url = `https://api.armyfriend.co.kr/jobs`;
		let config = {
			headers: {'Authorization': "Bearer " + getAccessToken() }
		};
		let params = {
			name : this.inputJob,
		};
		
		const response = await requestPOST(url, params, config, "uploadJob Error");
		if(response[0] === 204){
			alert(`보직추가 성공`);
			this.getJobs();
		}else{
			alert(`보직추가 실패`);
		}
	};

	@action.bound
	deleteJobs = async() => {
		const requestStore = new RequestStore();
		const { requestDELETE } = requestStore;
		
		const url = `https://api.armyfriend.co.kr/jobs`;
		let config = {
			headers: {'Authorization': "Bearer " + getAccessToken() }
		};
		
		let ids = [];
		this.checked.map((check)=>{
			ids.push(check.id);
		});
		
		const response = await requestDELETE(url, { id : ids }, config);
		
		if(response[0] === 204){
			alert(`보직삭제 성공!`);
			this.getJobs();
		}else{
			alert(`보직삭제 실패!`);
		}
	};

	@action.bound
	getJobSlices = () => {
		// View 를 위해서
		
		this.jobSlices = [];
		let i = 0;
		let page = 0;
		const size = 4;
		
		for(i=0; i < this.jobs.length / size; i++){
			this.jobSlices.push(this.jobs.slice(page * size, (page+1) * size));	
		}
		
		// console.log(this.jobSlices);
	};
	
	@action.bound
	handleChecked = e => {
		// 체크 되었을 때
		if(e.target.checked){
			this.checked.push({
				"id" : e.target.name,
				"checked" : e.target.value,
			});
		}else{
			// 체크 해지할때
			let index = this.checked.indexOf(e.target.value);
			this.checked.splice(index, 1);
		}
		
		//console.log(toJS(this.checked));
	};

	@action.bound
	handleOptionChecked = e => {
		// 체크 되었을 때
		if(e.target.checked){
			this.options_checked.push(e.target.name);
		}else{
			let index = this.options_checked.indexOf(e.target.name);
			this.options_checked.splice(index, 1);
		}
		
		// console.log(toJS(this.options_checked));
	};

	@action.bound
	handleModify = event => {
		const name = event.target.name;
		const value = event.target.value;
		const job_copy = { ...this.job };
		switch(name){
			case "name":
				job_copy.name = value;
				break;
			case "description":
				job_copy.description = value;
				break;
			case "directField":
				job_copy.directField = value;
				break;
			case "indirectField":
				job_copy.indirectField = value;
				break;
			case "process":
				job_copy.process = value;
				break;
			case "physical":
				job_copy.physical = value;
				break;
			case "requirement":
				job_copy.requirement = value;
				break;
			case "rate":
				job_copy.rate = value;
				break;
		}
		
		this.job = job_copy;
		
		// console.log(toJS(this.job));
	};
	
}

