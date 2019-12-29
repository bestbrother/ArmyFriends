import { observable, action, toJS } from 'mobx';
import axios from 'axios';

// RequestStore
import RequestStore from './RequestStore';

// config
import * as config from './config';
import * as local from './localStorage';

export default class PostStore{
	
	@observable status = null;
	@observable api = null;
	
	@observable posts = [];
	@observable post = null;
	@observable comments = [];

	// VIEW
	@observable activePage = 1;
	@observable COMMENT_WHERE = -1;

	// INPUT
	@observable inputComment = '';
	@observable unknown = false;

	// Search
	@observable inputSearch = '';
	@observable inputSelect = 'title'; // 제목, 내용, 제목+내용

	// Edit Comment
	@observable editState = false;
	@observable editCommentId = -1;

	constructor(root){
		this.root = root;	
	}
	

	@action.bound
	handleActivePage = (activePage) => {
		this.activePage = activePage;
	}
	
	@action.bound
	handleQuery = (query) => {
		if(query){
			this.query = query;
			
			if(query.title){
				console.log("title : "+ query.title);
				this.searchQuery = true;
			}
			if(query.content){
				console.log("content : "+ query.content);	
				this.searchQuery = true;
			}
		}
		if(!query.title & !query.content && this.searchQuery){
			this.searchQuery = false;
			this.getPosts();
		}
	}
	
	@action.bound
	handleInput = e => {
		const name = e.target.name;
		const value = e.target.type !== 'checkbox' ? e.target.value : e.target.checked;

		switch(name){
			case "comment":
				this.inputComment = value;
				break;
			case "unknown":
				this.unknown = value;
				break;
			case "search":
				this.inputSearch = value;
				break;
		}
	}
	
	@action.bound
	handleSelect = e => {
		this.inputSelect = e.target.value;
	}

	@action.bound
	handleCommentWhere = (COMMENT_WHERE) => {
		if(this.COMMENT_WHERE !== COMMENT_WHERE){
			// 기초값 세팅
			this.inputComment = '';
			this.unknown = false;
			
			this.COMMENT_WHERE = COMMENT_WHERE;
		}
	}
	
	@action.bound
	getPosts = async() => {	
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url = `${config.API_URL}/posts`;
		
		const response = await requestGET(url);
		
		if(response[0] === 200){
			this.status = response[0];
			this.api = "getPosts";
			
			this.posts = response[1].posts;
		}
	}
	
	@action.bound
	getSearch = () => {
		let query = '';
		if(this.inputSelect === "title"){
			// 제목 검색
			query = query + `?title=${this.inputSearch}`;
		}else if(this.inputSelect === "content"){
			query = query + `?content=${this.inputSearch}`;
		}else if(this.inputSelect === "both"){
			query = query + `?title=${this.inputSearch}&content=${this.inputSearch}`;
		}
		
		window.location.assign(`/board${query}`);
	}
	
	
	@action.bound
	getSearchPosts = async(title = null, content = null) => {
		this.activePage = 1;
		
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		let query = '';
		if(title && content){
			// 제목 검색
			query = query + `?title=${title}&content=${content}`;
			this.inputSearch = title;
		}else if(title){
			query = query + `?title=${title}`;
			this.inputSearch = title;
		}else if(content){
			query = query + `?content=${content}`;
			this.inputSearch = content;
		}
		
		const url = `${config.API_URL}/posts${query}`;	
		const response = await requestGET(url);
		
		if(response[0] === 200){
			this.status = response[0];
			this.api = "getPosts";
			
			this.posts = response[1].posts;
		}
	}
	
	@action.bound
	getPost = async(id) => {
		// default
		this.COMMENT_WHERE = -1;
		this.inputComment = '';
		
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url1 = `${config.API_URL}/posts/${id}`;
		const url2 = `${config.API_URL}/posts/${id}/comments`;
		
		const response1 = await requestGET(url1);
		const response2 = await requestGET(url2);
		
		console.log(response1, response2);
		
		if(response1[0] === 200 && response2[0] === 200){
			this.api = "getPost";
			
			this.post = response1[1].post;
			this.comments = response2[1].comments;
		}
	}
	
	@action.bound
	deletePost = async(id, history) => {
		const result = window.confirm("정말로 삭제하시겠습니까?");
		if(!result) return null;
		
		const URL = `https://api.armyfriend.co.kr/posts`;
		const accessToken = local.getAccessToken();
		let config = {
			headers: {'Authorization': "Bearer " + accessToken}
		};
		
		let ids = [`${id}`,];
		
		try{
			const response = await axios({
				url : URL,
				method : 'delete',
				data : { id : ids },
				headers: {'Authorization': "Bearer " + accessToken}
			});
			const status = await response.status;
			
			if(status === 204){
				alert(`보직 삭제 성공!`);	
				history.goBack();
			}else{
				alert(`보직 삭제 실패!`);
				throw new Error(`deleteJob error`);
			}
			
		}catch(error){
			console.log(error.response);
		}
	}
	
	@action.bound
	getComments = async(id) => {
		// default
		this.inputComment = '';
		
		const requestStore = new RequestStore();
		const { requestGET } = requestStore;
		
		const url = `${config.API_URL}/posts/${id}/comments`;
		
		const response = await requestGET(url, null, "getComments Error");
		
		if(response[0] === 200){
			this.status = response[0];
			this.api = "getComments";
			
			this.comments = response[1].comments;
		}
	}
	
	@action.bound
	uploadComment = async(postId) => {	
		if(!local.getLogged()){
			this.root.popUpStore.handleShow(true);
			return null;
		}
		if(this.inputComment === ''){
			alert(`내용을 입력해주세요`);
			return;
		}
		
		const requestStore = new RequestStore();
		const { requestPOST } = requestStore;
		
		// console.log(this.COMMENT_WHERE);
		
		let url = ``;
		if(this.COMMENT_WHERE === -1) url = `${config.API_URL}/posts/${postId}/comments`;
		else url = `${config.API_URL}/comments/${this.COMMENT_WHERE}/comments`;
		
		const params = {
			content : this.inputComment,
			isAnonymous : this.unknown,
		};
		let headers = {
			headers: {'Authorization': "Bearer " + local.getAccessToken()}
		};

		const response = await requestPOST(url, params, headers, "uploadComment Error");
		console.log(response);
		
		if(response[0] === 201 || response[0] === 204){
			this.status = response[0];
			this.api = "uploadComment";
			
			this.inputComment = '';
			this.COMMENT_WHERE = -1;
			
			this.getComments(postId);
			
			alert(`댓글 업로드 성공!`);
		}else{
			alert(`댓글 업로드 실패!`);
		}
	}
	
	@action.bound
	editHandleState = async(editState, editCommentId, beforeContent) => {
		this.editState = editState;
		this.editCommentId = editCommentId;
		this.inputComment = await beforeContent;
		this.COMMENT_WHERE = -1;
	}
	
	@action.bound
	editComment = async(id, afterContent, postId) => {
		if(!local.getLogged()){
			this.root.popUpStore.handleShow(true);
			return null;
		}
		const requestStore = new RequestStore();
		const { requestPATCH } = requestStore;
		
		const url = `${config.API_URL}/comments/${id}`;
		let headers = {
			headers: {'Authorization': "Bearer " + local.getAccessToken()}
		};
		
		const response = await requestPATCH(url, {content : afterContent}, headers, 'Edit Comment Error');
		
		if(response[0] === 204){
			alert(`댓글 수정 완료!`);
			this.editState = false;
			
			this.getComments(postId);
			this.inputComment = '';
			this.COMMENT_WHERE = -1;	
		}
		
	}
	
	@action.bound
	deleteComment = async(id, postId) => {
		if(!local.getLogged()){
			this.root.popUpStore.handleShow(true);
			return null;
		}
		const requestStore = new RequestStore();
		const { requestDELETE } = requestStore;
		
		const url = `${config.API_URL}/comments/${id}`;
		let headers = {
			headers: {'Authorization': "Bearer " + local.getAccessToken()}
		};
		const response = await requestDELETE(url, null, headers, 'Delete Comment Error');
		
		if(response[0] === 204){
			alert(`댓글 삭제 완료!`);
			
			this.getComments(postId);
			this.inputComment = '';
			this.COMMENT_WHERE = -1;
		}else{
			alert(`댓글 삭제 실패!`);
		}
	}
	
	@action.bound
	handleCommentCancel = () => {
		this.inputComment = '';
		this.editState = false;
		this.unknown = false;
	}
}