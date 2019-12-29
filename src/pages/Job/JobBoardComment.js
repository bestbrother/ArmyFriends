import React from 'react';
import { inject, observer } from 'mobx-react';

// local
import * as local from '../../stores/localStorage';

// basic
import CommentUpload from './CommentUpload';


const JobBoardComment = inject("postStore")(observer(({postStore, match}) => {
	
	const {
		// 댓글
		comments,
		
		// 댓글 입력
		inputComment,
		
		// 댓글이 어디에 있고, 댓글을 관리 (업로드, 취소)
		COMMENT_WHERE,
		handleCommentWhere,
		uploadComment,
		handleCommentCancel,
		
		// 댓글 삭제
		deleteComment,
		
		// 댓글 수정
		editState,
		editHandleState,
		editComment,
	} = postStore;
	
	// 포스트 아이디
	const POSTID = match.params.id; 
	const JOBID = match.params.jobId;
	
	const commentList = comments.map((comment, index)=>(
		<div 
			className = "CommentItem" 
			key = {comment.id} 
			onClick = {()=>handleCommentWhere(comment.id)}>
			
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
	));
	
	return commentList;
  
}));
	
export default JobBoardComment;