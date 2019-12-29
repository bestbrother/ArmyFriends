import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// SCSS
import './scss/PostDetail.scss';

// local
import * as local from '../../stores/localStorage';

// Image
import writeImg from '../../assets/write.png';
import viewImg from '../../assets/views.png';
import commentImg from '../../assets/comment.png';

// pages
import PostList from './PostList';

// basic
import Container from '../../basic/Container/Container';
import Href from '../../basic/Href/Href';
import CommentUpload from './CommentUpload';

import RecommendJobList from '../Job/RecommendJobList';
import Pagination1 from '../../basic/Pagination/Pagination1';
import Search from '../../basic/Search/Search';


@inject('postStore')
@observer
class PostDetail extends Component{
	
	componentDidMount(){
		const { postStore, match } = this.props;
		const id = match.params.id;
		
		postStore.getPost(id);
	}
	
	render(){
		const { postStore, match } = this.props;
		const { 
			post,
			comments,
			
			// 페이지네이션
			activePage, 
			handleActivePage,
			
			// 댓글 업로드
			COMMENT_WHERE,
			handleCommentWhere,
			inputComment,
			handleInput,
			uploadComment,
			handleCommentCancel,
			
			// 글 삭제
			deletePost,
			// 댓글 삭제
			deleteComment,
			
			// 댓글 수정
			editState,
			editHandleState,
			editComment,
		} = postStore;
		
		if(post === null) return null;
		
		// 포스트 아이디
		const POSTID = match.params.id; 
		const JOBID = match.params.jobId;
		
		// 페이지네이션
		const PAGEPERCOUNT = 20;
		const firstIndex = (activePage -1) * PAGEPERCOUNT;
		const lastIndex = (activePage) * PAGEPERCOUNT;
		
		const commentList = comments.map((comment, index)=>{
			return(
				<div className = "CommentItem" key = {comment.id} onClick = {()=>handleCommentWhere(comment.id)}>
					<div className = "Comment">
						<p className = "user">{comment.isAnonymous ? "익명" : comment.userId}</p>
						<p className = "content">{comment.content}</p>
						
						<div className = {`editComment ${local.isMatchUserId(comment.userId) ? "" : "none"}`}>
							<p className = {`edit ${editState ? "none" : ""}`} onClick = {()=>editHandleState(true, comment.id, comment.content)}>
								수정
							</p>
							<p className = "delete" onClick = {()=>deleteComment(comment.id, POSTID)}>
								삭제
							</p>
						</div>
					</div>
					<div className = "ReplyList">
						{comment.replies && comment.replies.length !== 0 
							? comment.replies.map((reply, idx)=>{
								return(
									<div className = "ReplyItem" key = {reply.id}>
										<span className = "replyUser">{reply.userId !== null ? reply.userId : ""}</span>
										<span className = "replyContent">{reply.content !== null ? reply.content : ""}</span>
										<div className = {`editComment ${local.isMatchUserId(comment.userId) ? "" : "none"}`}>
											<p className = {`edit ${editState ? "none" : ""}`} onClick = {()=>editHandleState(true, reply.id, reply.content)}>
												수정
											</p>
											<p className = "delete" onClick = {()=>deleteComment(reply.id, POSTID)}>
												삭제
											</p>
										</div>
									</div>
								)
							})
						: null
						}
					</div>
					{
						COMMENT_WHERE === comment.id ?
							<CommentUpload 
								POSTID = {POSTID}
								postStore = {postStore}/> 
						: null
					}
				</div>
			)
		});
		
		return(
			<React.Fragment>
			<Container
				className = "PostDetail"
				header = {{view : true, active : JOBID ? 'job' : 'board'}}>
				
				<div className = "PostDetailHeader">
					<div className = "TopWrapper">
						<p className = "Title">{post.title}</p>
						<div className = {`buttonWrapper ${local.isMatchUserId(post.userId) ? "" : "none"}`}>
							<button 
								className = "Button editButton"
								>
								수정
							</button>
							<button 
								className = "Button deleteButton" 
								onClick = {()=>deletePost(POSTID, this.props.history)}>
								삭제
							</button>
						</div>
					</div>
					
					<div className ="BottomWrapper">
						<span className = "User">{post.userId ? post.userId : "(탈퇴된 회원)"}</span>
						<span className = "Date">{post.createdAt}</span>
						<p className = "Views">
							<img 
								className = "ImageView"
								src = {viewImg} 
								alt = "ImageView" 
								/>
							{post.views}
						</p>
						<p className = "CommentCount">
							<img 
								className = "ImageComment"
								src = {commentImg} 
								alt = "ImageComment" 
								/>
							{comments.length}
						</p>
					</div>
				</div>
				
				<div className = "ContentWrapper">
					<div
						className = "Content"
						dangerouslySetInnerHTML={ {__html: post.content ? post.content : ""} }/>
					<RecommendJobList 
						jobId = {JOBID}
						/>
				</div>
				
				<div className = "CommentList">
					<div className = "CommentListHeader" onClick = {()=>handleCommentWhere(-1)}>
						<span>전체 댓글 <span className = "CommentCountText">{comments.length}</span>개</span>
					</div>

					{commentList}
					
					{COMMENT_WHERE === -1 
						? <CommentUpload 
								POSTID = {POSTID}
								postStore = {postStore}/> 
						: null
					}
				</div>
			
			</Container>
				
			<div className = "PostDetailList">
				<PostList
					location = {this.props.location}
					jobId = {JOBID}
					header = {'PostDetail'}/>
			</div>
				
			</React.Fragment>
		)
	}
}

export default observer(PostDetail);