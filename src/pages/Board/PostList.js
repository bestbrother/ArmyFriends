import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import queryString from 'query-string';

// SCSS
import './scss/PostList.scss';

// Image
import writeImg from '../../assets/write.png';
import viewImg from '../../assets/views.png';

// basic
import Container from '../../basic/Container/Container';
import Href from '../../basic/Href/Href';
import Pagination1 from '../../basic/Pagination/Pagination1';
import Search from '../../basic/Search/Search';


@inject('postStore', 'jobStore')
@observer
class PostList extends Component{
	
	componentDidMount(){
		const { postStore, jobStore, location } = this.props;
		const query = queryString.parse(location.search);
		
		// 보직 Tip 게시판인지 아닌지?
		const jobId = this.props.jobId;
		
		if(Object.keys(query).length === 0){
			if(jobId) jobStore.getPosts(jobId);
			else postStore.getPosts();
			
		}
		else postStore.getSearchPosts(query.title ? query.title : null, query.content ? query.content : null);	
	}
	
	render(){
		const { postStore, jobStore } = this.props;
		const {
			posts,
			
			// 페이지네이션
			activePage,
			handleActivePage,
			
			// 검색
			inputSearch,
			handleInput,
			handleSelect, // 제목, 내용, 제목 + 내용
			getSearch,
		} = postStore;
		
		let postList = [];
		let loading = false;
		
		if(posts){
			postList = posts.map(post=>{
				let user = post.userId ? post.userId : ``;
				if(post.isAnonymous) user = "익명";
				let job = false;
				let URL = job ? `/job/board/${post.id}` : `/board/${post.id}`;
				
				return(
					<Href 
						key = {post.id}
						className = "PostItem" 
						url = {URL}>
						<p className = "topWrapper">
							<span className = "title">{post.title}
								<span className = "comment">[{post && post.comments ? post.comments.length : 0}]</span>
							</span>
							<span className = "writer">{user}</span>
						</p>
						<p className = "bottomWrapper">
							<span className = "content">
								{post.content ? post.content.replace(/(<([^>]+)>)/ig,"") : ""}
							</span>
							<span className = "views">
								<img 
									className = "ImageViews"
									src = {viewImg} 
									alt = "ImageViews" />
								{post.views}
							</span>
							<span className = "date">
								{post.createdAt ? post.createdAt : ""}
							</span>
						</p>
					</Href>
				)
			});
		}else{
			loading = true;
		}
		
		const PAGEPERCOUNT = 20;
		const firstIndex = (activePage - 1) * PAGEPERCOUNT;
		const lastIndex = (activePage) * PAGEPERCOUNT;
		
		const headerView = this.props.header === 'PostDetail' ? false : true;
		
		return(
			<Container 
				className = "PostList"
				header = {{view : headerView, active : 'board'}}
				loading = {loading} >
				
				<div className = "PostListHeader">
					<p className = "Title">
						{`자유게시판`}
					</p>
					<p className = "Subtitle">
						자유롭게 글을 쓰는 게시판입니다.
					</p>
					
					<Href url = "/board/upload" className = "ImageWrite">
						<img
							src = {writeImg} 
							alt = "ImageWrite"/>
					</Href>
					
					<span className = "info" onClick = {()=>this.showInfo()}>
						이용안내
					</span>
				</div>
				
				<div className = "PostListBox">
					{postList.slice(firstIndex, lastIndex)}
				</div>
				
				<div className = "PostListBottom">
					<Pagination1
						length = {posts.length}
						activePage={activePage}
						handleActivePage = {handleActivePage}
						PagePerCount={PAGEPERCOUNT}
					/>
					
					<Search
						type = "text"
						name = "search"
						input = {inputSearch}
						handleInput = {handleInput}
						handleSelect = {handleSelect}
						search = {getSearch}
						/>

				</div>
				
			</Container>
		)
	}
}

export default observer(PostList);