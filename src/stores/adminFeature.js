import { observable, action, toJS } from 'mobx';
import RequestStore from './RequestStore';
import axios from 'axios';

// config
import * as config from './config';
import * as local from './localStorage';


// TOKEN
import { getAccessToken } from './localStorage';

export default class AdminFeatureStore{
	constructor(root){
		this.root = root;	
	}
	
	
	// http Request & Response
	@observable state = 'start'; // start, done, pending, error
	@observable error = null;

	// VALUE
	@observable features = [];
	@observable features_copy = [];

	
	
	@action.bound
	compareFeatures = async() => {
		let f = this.features.slice();
		let f_copy = this.features_copy.slice();
		
		// 수정 사항
		let edit_feature = [];
		let add_feature = [];
		let edit_option = [];
		let add_option = [];
		
		for(let i=0;i<f_copy.length;i++){
			// 대항목 이름 변경사항
			if((f[i].name !== f_copy[i].name) || (f[i].isHide !== f_copy[i].isHide) ){
				edit_feature.push({id : f[i].id, name : f[i].name, isHide : f[i].isHide});
			}
			
			// 소항목 변경사항
			for(let j=0;j<f_copy[i].options.length;j++){
				if(f[i].options[j].name !== f_copy[i].options[j].name){
					edit_option.push({id : f[i].options[j].id, name : f[i].options[j].name});
				}
			}
			
			// 소항목 추가사항
			if(f[i].options.length > f_copy[i].options.length){
				console.log(`${f[i].id}에서 소항목 추가되었음을 확인함`);
				
				for(let j=f_copy[i].options.length;j<f[i].options.length;j++){
					add_option.push({name : f[i].options[j].name, featureId : f[i].id});
				}
			}
		}
		
		if(f.length > f_copy.length){
			// 대항목이 추가됐음
			console.log(`대항목이 추가되었음을 확인함`);
			
			for(let i=f_copy.length;i<f.length;i++){
				add_feature.push(f[i].name);
			}
		}
		
		console.log(edit_feature);
		console.log(edit_option);
		console.log(add_feature);
		
		const accessToken = local.getAccessToken();
		let config = {
			headers: { 'Authorization': "Bearer " + accessToken }
		};
		const URL_FEATURE = `https://api.armyfriend.co.kr/features`;
		const URL_OPTION = `https://api.armyfriend.co.kr/options`
		
		try{
			// feature 항목 저장
			const response1 = await axios.patch(URL_FEATURE, { features : edit_feature}, config);	
			const status1 = await response1.status;
			// feature 항목 추가
			const response2 = await axios.post(URL_FEATURE, { names : add_feature },config);
			const status2 = await response2.status;
			const res2 = await response2.data;
			// option 항목 저장
			const response3 = await axios.patch(URL_OPTION, { options : edit_option }, config);
			const status3 = await response3.status;
			
			
			console.log(`status1 : ${status1}, status2 : ${status2}, status3 : ${status3}`);
			
			
			// 새로 생성된 feature 항목
			add_feature = res2.features;
			
			// 새로 생성된 feature에 딸려오는 options 추가
			let x = 0;
			if(f.length > f_copy.length){
				for(let i=f_copy.length;i<f.length;i++){
					for(let j=0;j<f[i].options.length;j++){
						add_option.push({name : f[i].options[j].name, featureId : add_feature[x].id});
					}
					x++;
				}
			}
			console.log(add_option);
			//  ERROR MAP
			// option 항목 저장
			const responses4 = await Promise.all(add_option.map(option=>(
				axios.post(`https://api.armyfriend.co.kr/features/${option.featureId}/options`,{
					names : [option.name],
				}, config)
			)));
			
			console.log(responses4);
			
			this.getFeatures();
			
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
	};

	@action.bound
	deleteFeatures = async() => {
		let f = this.features.slice();
		
		let d_Feature = [];
		let d_Option = [];
		
		for(let i=0;i<f.length;i++){
			if(f[i].name === ""){
				d_Feature.push(f[i].id);
			}

			for(let j=0;j<f[i].options.length;j++){
				if(f[i].options[j].name === ""){
					d_Option.push(f[i].options[j].id);
				}
			}
		}
		
		console.log(d_Feature);
		console.log(d_Option);
		
		const URL_FEATURE = `https://api.armyfriend.co.kr/features`;
		const URL_OPTION = `https://api.armyfriend.co.kr/options`;
		const accessToken = local.getAccessToken();
		let config = {
			headers: {'Authorization': "Bearer " + accessToken}
		};
		
		try{
			const responses = await Promise.all([
				axios({
					url : URL_FEATURE,
					method : 'delete',
					data : { id : d_Feature },
					headers: {'Authorization': "Bearer " + accessToken}
				}),
				axios({
					url : URL_OPTION,
					method : 'delete',
					data : { id : d_Option },
					headers : {'Authorization': "Bearer " + accessToken}
				})
			]);
			
			const status1 = await responses[0].status;
			const status2 = await responses[1].status;
			
			if(status1 === 204 && status2 === 204){
				alert(`삭제 완료!`);
				this.getFeatures();
			}else{
				throw new Error(`deleteFeatures error`);
			}
			
			
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
	};
	

	@action.bound
	handleFeature = e => {
		let features_copy = this.features.slice();
		features_copy[e.target.name].name = e.target.value;
		this.features = features_copy;
		
		console.log(toJS(this.features[e.target.name]));	
	};


	@action.bound
	handleOptions = (option_index, e) => {
		let features_copy = this.features.slice();
		features_copy[e.target.name].options[option_index].name = e.target.value;
		this.features = features_copy;
		
		console.log(toJS(this.features[e.target.name]));	
	};

	@action.bound
	handleHide = e => {
		let features_copy = this.features.slice();
		features_copy[e.target.name].isHide = e.target.checked;
		this.features = features_copy;
		
		console.log(toJS(this.features[e.target.name]));
	};

	@action.bound
	addBig = () =>{
		let features_copy = this.features.slice();
		let newObject = {
			name : '',
			options : [],
			isHide : false,
		};
		
		features_copy.push(newObject);
		this.features = features_copy;
		
		console.log(toJS(this.features));
	};

	@action.bound
	addSmall = (feature) => {
		let features_copy = this.features.slice();
		features_copy[feature].options.push({name : '', featureId : features_copy[feature].id});
		
		this.features = features_copy;
		
		console.log(toJS(this.features[feature]));	
	};


	@action.bound
	getFeatures = async() => {
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url = `https://api.armyfriend.co.kr/features`;
		const response = await requestGET(url);
		
		if(response[0] === 200){
			this.features = response[1].features;
			this.features_copy = response[1].features;
			this.state = "done";
		}
	};
}

