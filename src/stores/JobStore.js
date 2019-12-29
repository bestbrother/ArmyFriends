import { observable, action, toJS } from 'mobx';

// RequestStore
import RequestStore from './RequestStore';

// config
import * as config from './config';
import * as local from './localStorage';

export default class JobStore{
	// VALUE
	@observable features = [];
	@observable jobs = [];
	@observable job = null;
	@observable jobSearched = [];
	@observable jobSelected = []; // option클릭해 가려내진 값들
	@observable posts = [];

	// VIEW
	@observable activePage = 1;

	@observable isHide = true; // 더보기 숨기기
	@observable hide = {}; // Feature Hide
	@observable checked = []; // Option Checked (view 전용)
	@observable checkedObject = {}; // Feature, Option 정보가 모두 담겨져있음. key는 feature, value(array)는 option들의 집합이다.

	// SORT
	@observable SORT = 1;

	// Search
	@observable inputSearch = '';
	@observable pastSearch = false;

	// JobDetail View
	@observable VIEW = 1;

	constructor(root){
		this.root = root;	
	}

	@action.bound
	handleInput = e => {
		this.inputSearch = e.target.value;
	}

	@action.bound
	handleActivePage = activePage => {
		this.activePage = activePage;
	}
	
	@action.bound
	handleSelect = e => {
		this.inputSelect = e.target.value;
	}
	
	@action.bound
	handleHide = (id) => {
		let hide_copy = this.hide;
		
		if(!this.hide[id] || this.hide[id] === false){
			hide_copy[id] = true;
		}
		else if(this.hide[id] === true){
			hide_copy[id] = false;
		}
		
		this.hide = hide_copy;
	}
	
	@action.bound
	handleChecked = (e, obj) => {
		this.activePage = 1;
		
		// 체크 되었을 때
		if(e.target.checked){
			this.checked.push(e.target.name);
		}else{
			let index = this.checked.indexOf(e.target.name);
			this.checked.splice(index, 1);
		}
		
		// 체크 되었을 때, feature & option
		if(e.target.checked){
			let copyedObject = this.checkedObject;
			if(this.checkedObject[obj.feature]){
				copyedObject[obj.feature].push(obj.option);
			}else{
				copyedObject[obj.feature] = [obj.option];
			}
			this.checkedObject = copyedObject;
			
		}else{
			let copyedObject = this.checkedObject;
			if(copyedObject[obj.feature]){
				let idx = copyedObject[obj.feature].indexOf(obj.option);
				
				if(idx > -1) copyedObject[obj.feature].splice(idx, 1); // 찾으면 지우기
				if(copyedObject[obj.feature].length === 0) delete copyedObject[obj.feature]; // object[feature] 배열길이가 0일경우 삭제
				
				this.checkedObject = copyedObject;
			}
		}
		
		// 선택된 직업 골라내기 => 일단 모두 합집합으로 해결.
		Object.keys(this.checkedObject).map((feature, idx)=>{
			let temp = [];
			this.checkedObject[feature].map((option, index)=>{
				this.jobs.map(job=>{
					if(job.options.some(jobOption=>jobOption.id === option)) temp.push(JSON.stringify(job));
				})
			});
			
			if(idx === 0){
				this.jobSelected = temp;
			}else{
				this.jobSelected = this.intersect(this.jobSelected, temp);
			}
			
			this.jobSelected = this.intersect(this.jobSelected, temp);
		});
		
		this.jobSelected = this.jobSelected.map(job=>JSON.parse(job));
		this.jobSelected = this.removeDuplicates(this.jobSelected);
	
		console.log(toJS(this.jobSelected));
	};

	@action.bound
	removeDuplicates = (objectsArray) =>{
		let usedObjects = {};
		
		for (let i = objectsArray.length - 1; i >= 0; i--) {
			let so = JSON.stringify(objectsArray[i]);
			
			if (usedObjects[so]) {
				objectsArray.splice(i, 1);
			}else {
				usedObjects[so] = true;
			}
		}
		return objectsArray;
	}
	
	@action.bound
	intersect = (a, b) =>{
		let tmp={}, res=[];
		for(let i=0;i<a.length;i++) tmp[a[i]]=1;
		for(let i=0;i<b.length;i++) if(tmp[b[i]]) res.push(b[i]);
		return res;
	}

	
	@action.bound
	handleIsHide = () => {
		this.isHide = !this.isHide;
	};
	
	@action.bound
	handleSort = sort => {
		this.SORT = sort;
	};

	
	@action.bound
	getFeatures = async() => {
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url = `${config.API_URL}/features`;
		
		const response = await requestGET(url, null, "getFeatures Error");
		
		if(response[0] === 200){
			this.features = response[1].features;
			this.features.map(feature=>{
				this.hide[feature.id] = true;
			});
		}
	};

	@action.bound
	getJobs = async() => {
		this.pastSearch = false;
		
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url = `${config.API_URL}/jobs`;
		
		const response = await requestGET(url, null, "getJobs Error");
		if(response[0] === 200){
			this.jobs = response[1].jobs;
		}
	};

	@action.bound
	handleSearchBar = (history) => {
		history.push(`/?title=${this.inputSearch}`);
		
		window.location.reload();
	}

	@action.bound
	getSearchJobs = async(history, title) => {
		history.push(`/?title=${title}`);
		
		this.inputSearch = title;
		this.activePage = 1;
		this.pastSearch = true;
		
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url = `${config.API_URL}/jobs?name=${title}`;
		
		const response = await requestGET(url, null, "getSearchJobs Error");
		if(response[0] === 200){
			this.jobSearched = response[1].jobs;
		}
	}
	
	@action.bound
	getJob = async(id) => {
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url = `${config.API_URL}/jobs/${id}`;
		
		const response = await requestGET(url, null, "getJob Error");
		if(response[0] === 200){
			this.status = response[0];
			this.api = "getJob";
			
			this.job = response[1].job;
			
			local.saveMyJob(response[1].job);
		}
	}
	
	@action.bound
	getPosts = async(id) => {
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url = `${config.API_URL}/jobs/${id}/posts`;
		
		const response = await requestGET(url, null, "jobStore getPosts Error");
		if(response[0] === 200){
			this.status = response[0];
			this.api = "getPosts";
			
			this.posts = response[1].posts;
		}
	}
	
	@action.bound
	compareMethod = (A, B) => {
		let nameA = A.name;
		let nameB = B.name;

		let viewA = parseInt(A.views);
		let viewB = parseInt(B.views);
		
		let rateA = parseFloat(A.rate);
		let rateB = parseFloat(B.rate);
		
		if(isNaN(rateA)) rateA = 0.0;
		if(isNaN(rateB)) rateB = 0.0;
		
		switch(this.SORT){
			case 1:
				return A.name < B.name ? -1 : A.name > B.name ? 1 : 0;
			case 2:
				return viewB - viewA;
			case 3:
				return rateA - rateB;
		}
	}
	
	@action.bound
	handleView = view => {
		this.VIEW = view;
	}
}