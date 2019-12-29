import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import queryString from 'query-string';

// SCSS
import './scss/JobBoard.scss';

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
class JobBoardPost extends Component{
	
	componentDidMount(){
		const { jobStore, match } = this.props;
		
		const jobId = match.params.jobId;
		jobStore.getPosts(jobId);
	}
	
	render(){
		const { postStore, jobStore } = this.props;
		const {
			posts,
			handleInput, 
			
			// 페이지네이션
			activePage,
			handleActivePage,
			
			// 검색
			inputSearch,
			getSearchJobs,
		} = jobStore;
		
		const PAGEPERCOUNT = 20;
		const firstIndex = (activePage - 1) * PAGEPERCOUNT;
		const lastIndex = (activePage) * PAGEPERCOUNT;
		
		
		const JOBNAME = localStorage.getItem('uploadJobName');
		
		const postList = posts.map(post=>{
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
		
		return(
			<Container 
				className = "PostList"
				header = {{view : false, active : 'job'}}>
				
				<div className = "PostListHeader">
					<p className = "Title">
						{`${JOBNAME} TIP 게시판`}
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
					
					{
						/*
							<Search
							type = "text"
							name = "search"
							input = {inputSearch}
							handleInput = {handleInput}
							handleSelect = {handleSelect}
							search = {getSearch}
							/>
						*/
					}
					

				</div>
				
			</Container>
		)
	}
}

export default observer(JobBoardPost);