import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// SCSS
import './scss/JobDetail.scss';

// image
import viewImage from '../../assets/views.png';

// basic
import Container from '../../basic/Container/Container';
import Href from '../../basic/Href/Href';
import RecommendJobList from './RecommendJobList';


@inject('jobStore')
@observer
class JobDetail extends Component{
	componentDidMount(){
		const { jobStore, match } = this.props;
		const jobId = match.params.jobId;
		
		jobStore.getJob(jobId);
		jobStore.getPosts(jobId);
	}
	
	render(){
		const { jobStore, match } = this.props;
		const JOBID = match.params.jobId;
		
		const {
			job,
			posts,
			
			// 어디를 보여주고 있는지 (직업 설명)
			VIEW,
			handleView,
			
			// 페이지 네이션
			activePage,
			handleActivePage,
		} = jobStore;
		
		// 페이지 네이션
		const PAGEPERCOUNT = 20;
		const firstIndex = (activePage - 1) * PAGEPERCOUNT;
		const lastIndex = (activePage) * PAGEPERCOUNT;
		
		// Tip게시판
		const postList = posts && posts.length !== 0 ? posts.map(post=>(
			<Href url = {`/jobs/${JOBID}/board/${post.id}`} key = {post.id} >
				<div className = "PostItem">
					<div className = "topWrapper">
						<p className = "title">{post.title}</p>
						<p className = "count"></p>
						<p className = "writer"></p>
					</div>
					<div className = "bottomWrapper">
						<p className = "content">{post.content.replace(/(<([^>]+)>)/ig,"")}</p>
						<p className = "views"><img className = "viewImage" src = {viewImage} alt = "views"/>{post.views}</p>
						<p className = "date">{post.createdAt}</p>
					</div>
				</div>
			</Href>
		)) : null;
		
		// 인터넷 자료 & 동영상 자료
		let webLinks = job ? job.links.filter(link=>link.type.includes('web')) : [];
		let videoLinks = job ? job.links.filter(link=>link.type.includes('video')) : [];
		
		const webLinkElements = webLinks.map(link=>(
			<a
				href = {link.url} 
				className = "LinkItem" 
				key = {link.id}
				target="_blank"
				>
				<div className = "Link">
					<p className = "LinkContent">{link.name}</p>
				</div>
			</a>
		));
		const videoLinkElements = videoLinks.map(link=>(
			<a 
				href = {link.url} 
				className = "LinkItem" 
				key = {link.id}
				target="_blank">
				<div className = "Link">
					<img
						className = "thumbnail"
						src = {`https://img.youtube.com/vi/${this.getYoutubeId(link.url)}/sddefault.jpg`}
						alt = "thumbnail"
						/>
					<p className = "LinkContent">{link.name}</p>
				</div>
			</a>
		));
		
		return(
			<Container
				className = "JobDetail"
				header = {{view : true, active : 'job'}}>
					
				<div className = "JobDetailHeader">
					<p className = "HeaderText">
						{job ? job.name : ""}
					</p>
				</div>

				<div className = "JobInfo">
					<img 
						src = {job ? job.image : ""}
						className = "JobImage"
						/>

					<RecommendJobList jobId = {JOBID} />
				</div>
				
				<div className = "JobContent">
					<div className = "View">
						<p className = {`item ${VIEW === 1 ? "active" : ""}`} onClick = {()=>handleView(1)}>
							직무 개요 및 임무
						</p>
						<p className = {`item ${VIEW === 2 ? "active" : ""}`} onClick = {()=>handleView(2)}>
							관련분야(직접)
						</p>
						<p className = {`item ${VIEW === 3 ? "active" : ""}`} onClick = {()=>handleView(3)}>
							관련분야(간접)
						</p>
						<p className = {`item ${VIEW === 4 ? "active" : ""}`} onClick = {()=>handleView(4)}>
							신체사항
						</p>
						<p className = {`item ${VIEW === 5 ? "active" : ""}`} onClick = {()=>handleView(5)}>
							지원자격
						</p>
						<p className = {`item ${VIEW === 6 ? "active" : ""}`} onClick = {()=>handleView(6)}>
							지원부터 배치까지
						</p>
					</div>

					<div className = "ViewContent">
						<p className = "JobDisplay">
							{VIEW === 1 ? job ? job.description : "" : ""}
							{VIEW === 2 ? job ? job.directField : "" : ""}
							{VIEW === 3 ? job ? job.indirectField : "" : ""}
							{VIEW === 4 ? job ? job.physical : "" : ""}
							{VIEW === 5 ? job ? job.requirement : "" : ""}
							{VIEW === 6 ? job ? job.process : "" : ""}
						</p>
					</div>
				</div>
				
				<div className = "LinkWrapper">
					<h1 className = "LinkTitle WebLinkTitle">
						인터넷 자료
					</h1>
					
					{webLinkElements}
				</div>
				
				<div className = "LinkWrapper">
					<h1 className = "LinkTitle VideoLinkTitle">
						동영상 자료
					</h1>
					
					{videoLinkElements}
				</div>
				
				<div className = "TipPostList">
					<div className = "TipHeader">
						<p className = "HeaderText">TIP 게시판</p>
						
						<button
							className = "uk-button uk-button-small writeButton"
							onClick = {()=>{
								localStorage.setItem('uploadJobName', job.name);
								window.location.assign(`/jobs/${JOBID}/upload`);
							}}
							>
							TIP 글쓰기
						</button>
					</div>
					
					{postList}
				</div>
			</Container>
		);
	}
	
	getYoutubeId = (url) => {
		let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		let match = url.match(regExp);
		return (match && match[7].length==11)? match[7] : false;
	}
}

export default observer(JobDetail);