import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// basic
import Href from '../../basic/Href/Href';
import Pagination1 from '../../basic/Pagination/Pagination1';

// Image
import writeImg from '../../assets/write.png';
import viewImg from '../../assets/views.png';

@inject('myStore')
@observer
class MyComments extends Component{
	
	componentDidMount(){
		const { myStore } = this.props;
		const { getMyComments } = myStore;
		
		getMyComments();
	}
	
	render(){
		const { myStore } = this.props;
		const {
			posts_comment,
			
			activePage,
			handleActivePage
		} = myStore;
		
		const PAGEPERCOUNT = 20;
		let firstIndex = (activePage - 1) * PAGEPERCOUNT;
		let lastIndex = (activePage) * PAGEPERCOUNT;
		
		let myPostList = posts_comment.map(post=>{
			let user = post.userId ? post.userId : ``;
			if(post.isAnonymous) user = "익명";
			
			let URL = post.jobId ? `/jobs/board/${post.id}` : `/board/${post.id}`;

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
					<p className = "from">
						{/**/}
					</p>
				</Href>
			)
		});
		
		
		
		return(
			<div className="MyPosts">
				<div className = "MyPostsHeader">
					<p className = "HeaderTitle">
						게시판 이용내역
					</p>
					<p className = "HeaderSubtitle">
						댓글 단 글
					</p>
				</div>
				
				<div className = "MyPostList">
					{myPostList}
				</div>
			</div>
		)
	}
}


export default observer(MyComments);