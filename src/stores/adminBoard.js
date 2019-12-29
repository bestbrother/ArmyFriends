import { observable, action, toJS } from 'mobx';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';

// TOKEN
import { getAccessToken } from './localStorage';

// RequestStore
import RequestStore from './RequestStore';

// config
import * as config from './config';
import * as local from './localStorage';

export default class AdminBoardStore{
	constructor(root){
		this.root = root;	
	}
	// http state
	@observable state = "start"; // start, done, pending, error
	@observable error = null;

	// INDEX
	@observable reload = false;

	// VIEW
	@observable post_id = 0;
	@observable post_view= false;
	@observable tip_id = 0;
	@observable tip_view = false;
	@observable upload_view = false;
	@observable checked = [];

	@observable currentPage = 1;
	@observable posts = [];
	@observable tip_posts = [];
	@observable post = null
	@observable comments = [];
	@observable jobs = [];

	// UPLOAD
	@observable title = '';
	@observable content = EditorState.createEmpty();

	// SEARCH
	@observable select_value = 'title';
	@observable input_search = '';

	@action.bound
	handleSelect = (event) => {
		console.log(`선택 : ${event.target.value}`);
		
		this.select_value = event.target.value;
	}

	@action.bound	
	handleSearch = (event) => {
		this.input_search = event.target.value;
	}
	
	@action.bound
	getSearchPosts = async(page) => {
		let URL = ``;
		let search_query = ``;
		
		if(this.select_value === "title"){
			search_query = `?title=${this.input_search}`;
		}else if(this.select_value === "content"){
			search_query = `?&content=${this.input_search}`;
		}else if(this.select_value === "both"){
			search_query = `?title=${this.input_search}&content=${this.input_search}`;
		}
		
		if(page === 4){
			// 자유 게시판
			URL = `https://api.armyfriend.co.kr/posts${search_query}&type=post`;
		}else if(page === 5){
			// TIP 게시판
			URL = `https://api.armyfriend.co.kr/jobs/${this.tip_id}/posts${search_query}`;
		}else if(page === 6){
			// 공지 사항
			URL = `https://api.armyfriend.co.kr/posts${search_query}&type=notice`;
		}
		
		console.log(URL);
		
		try{
			const response = await axios.get(URL);
			const status = await response.status;
			const res = await response.data;
			
			if(status === 200){
				if(page===5){
					this.tip_posts = res.posts;
					console.log(res.posts);
				}else{
					this.posts = res.posts;
					console.log(res.posts);
				}	
			}else{
				throw new Error(`getSearchPosts error`);
			}
			
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
		
	}
	
	@action.bound
	inputReset = () => {
		this.title = '';
	}
	

	@action.bound
	handleReload = (reload) => {
		this.reload = reload;
	};

	@action.bound
	handlePostView = (id, view) => {
		this.post_id = id;
		this.post_view = view;
	};
	
	@action.bound
	handleTipView = (id, view) => {
		this.tip_id = id;
		this.tip_view = view;
		this.getTipPosts(id);
	};

	@action.bound
	handleUploadView = (view) => {
		this.upload_view = view;
	};

	@action.bound
	handlePage = (page) => {
		this.currentPage = page;
	};

	@action.bound
	handleContentInput = (content) => {
		this.content = content;
	}

	@action.bound
	handleInput = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		
		if(name === "title") this.title = value;
	}
	
	@action.bound
	getPosts = async(id) => {
		this.reload = false;
		
		const URL = `https://api.armyfriend.co.kr/posts`;
		
		try{
			this.state = "pending";
			this.posts = [];
			this.post_view = false;
			this.tip_view = false;
			
			const response = await axios.get(URL);
			const res = await response.data;
			const status = await response.status;
			
			if(status === 200){
				console.log(res.posts);
				this.posts = res.posts;
				this.state = "done";
			}else{
				throw new Error(`getPosts error`);
			}
			
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
	};
	
	@action.bound
	getTipPosts = async() => {
		this.reload = false;
		if(this.tip_id === 0) return null;
		
		const URL = `https://api.armyfriend.co.kr/jobs/${this.tip_id}/posts`;
		
		try{
			this.state = "pending";
			this.posts = [];
			this.post_view = false;
			
			const response = await axios.get(URL);
			const res = await response.data;
			const status = await response.status;
			
			if(status === 200){
				console.log(res.posts);
				this.tip_posts = res.posts;
				this.state = "done";
			}else{
				throw new Error(`getTipPosts error`);
			}
			
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
		
	};

	@action.bound
	getNoticePosts = async(id) => {
		this.reload = false;
		
		const URL = `https://api.armyfriend.co.kr/posts?type=notice`;
		
		try{
			this.state = "pending";
			this.posts = [];
			this.post_view = false;
			this.tip_view = false;
			
			const response = await axios.get(URL);
			const res = await response.data;
			const status = await response.status;
			
			if(status === 200){
				console.log(res.posts);
				this.posts = res.posts;
				this.state = "done";
			}else{
				throw new Error(`getNoticePosts error`);
			}
			
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
	};
	
	@action.bound
	getPost = async() => {
		this.reload = false;
		
		const URL = `https://api.armyfriend.co.kr/posts/${this.post_id}`;
		const accessToken = getAccessToken();
		let config = {
			headers: {'Authorization': "Bearer " + accessToken}
		};
		
		try{
			this.state = "pending";
			this.post = null;
			
			const response = await axios.get(URL, config);
			const res = await response.data;
			const status = await response.status;
			
			if(status === 200){
				console.log(res.post);
				this.post = res.post;
				this.state = "done";
			}else{
				throw new Error(`getPost error`);
			}
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
		
	};
	
	@action.bound
	getComments = async() => {
		this.reload = false;
		
		const URL = `https://api.armyfriend.co.kr/posts/${this.post_id}/comments`;
		
		const accessToken = getAccessToken();
		let config = {
			headers: {'Authorization': "Bearer " + accessToken}
		};
		
		try{
			this.state = "pending";
			this.comments = [];
			
			const response = await axios.get(URL, config);
			const res = await response.data;
			const status = await response.status;
			
			if(status === 200){
				console.log(res.comments);
				this.comments = res.comments;
				this.state = "done";
			}else{
				throw new Error(`getComments error`);
			}
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
	};
	
	@action.bound
	getJobPosts = async(jobId) => {
		this.reload = false;
		
		const URL = `https://api.armyfriend.co.kr/jobs/${jobId}/posts`;
		
		try{
			this.state = "pending";
			this.post_view = false;
			
			const response = await axios.get(URL);
			const res = await response.data;
			const status = await response.status;
			
			if(status === 200){
				console.log(res.posts);
				this.posts = res.posts;
				this.state = "done";
			}else{
				throw new Error(`getJobPosts error`);
			}
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
	};

	@action.bound
	getJobs = async() => {
		this.reload = false;
		
		const URL = `https://api.armyfriend.co.kr/jobs`;
		
		try{
			this.tip_posts = [];
			this.state = "pending";
			this.post_view = false;
			this.tip_view = false;
			
			const response = await axios.get(URL);
			const status = await response.status;
			const res = await response.data;
			if(status === 200){
				console.log(res.jobs);
				
				this.jobs = res.jobs;
				this.state = "done";
			}else{
				throw new Error(`getJobs error`);
			}
		}catch(error){
			console.log(`getJobs : ${error.response}`);
			this.state = "error";
			this.error = error;
		}
	};

	@action.bound
	deletePosts = async() => {
		const result = window.confirm("정말로 삭제하시겠습니까?");
		if(!result) return null;
		
		const URL = `https://api.armyfriend.co.kr/posts`;
		const accessToken = getAccessToken();
		let config = {
			headers: {'Authorization': "Bearer " + accessToken}
		};
		
		let ids = [];
		this.checked.map((check)=>{
			ids.push(check.id);
		});
		
		try{
			const response = await axios({
				url : URL,
				method : 'delete',
				data : { id : ids },
				headers: {'Authorization': "Bearer " + accessToken}
			});
			const status = await response.status;
			
			if(status === 204){
				alert(`게시글 삭제 성공!`);
				this.getNoticePosts();
				this.state = "done";
			}else{
				alert(`게시글 삭제 실패!`);
				throw new Error(`deleteJob error`);
			}
			
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
	};

	@action.bound
	deleteComment = async(id) => {
		const result = window.confirm("댓글을 정말 삭제하시겠습니까?");
		if(!result) return null;
	
		const URL = `https://api.armyfriend.co.kr/comments/${id}`;
		const accessToken = getAccessToken();
		let config = {
			headers: {'Authorization': "Bearer " + accessToken}
		};
		
		try{
			const response = await axios({
				url:URL,
				method:'delete',
				data : { commentId : id },
				headers: {'Authorization': "Bearer " + accessToken}
			});
			const status = await response.status;
			
			if(status === 204){
				alert(`댓글을 삭제 완료했습니다`);
				this.getComments();
			}else{
				throw new Error(`deleteComment error`);
			}
		}catch(error){
			console.log(error.response);
			this.state = "error";
			this.error = error;
		}
	};

	@action.bound
	uploadNotice = async() => {
		if(this.inputTitle === '' || editorHtml === ''){
			alert(`제목과 내용 모두 입력해주세요.`);
			return;
		}
		
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		const editorHtml = draftToHtml(convertToRaw(this.content.getCurrentContent()));
		const url = `${config.API_URL}/posts`;
		const params = {
			title : this.title,
			content : editorHtml,
			isAnonymous : this.unknown,
  			isNotice : true
		};
		const headers = local.getHeader();
		
		const response = await requestPOST(url, params, headers, "uploadNotice Error");
		
		if(response[0] === 201){
			this.title = '';
			this.content = EditorState.createEmpty();
			
			alert(`게시글 공지사항 작성 완료!`);
		}
	}


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
		
		console.log(toJS(this.checked));
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

