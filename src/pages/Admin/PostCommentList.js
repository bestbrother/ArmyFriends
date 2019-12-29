import React from 'react';
import PostReplyList from './PostReplyList';

const PostCommentList = ({comments, deleteComment}) => {
	
	return comments.map(comment=>(
		<div className = "CommentItem" key = {comment.id} >
			<div className = "topWrapper">
				<p className = "name">{comment.user !== null ? comment.user : ""}</p>
				<p className = "date">{comment.createdAt}</p>
				
				<p className = "delete" onClick = {()=>deleteComment(comment.id)}>
					삭제
				</p>
			</div>
			<div className = "bottomWrapper">
				<p className = "content">
					{comment.content}
				</p>
			</div>
			
			{ comment.replies.length !== 0 ? <PostReplyList replies = {comment.replies} deleteComment = {deleteComment} /> : null}
			
		</div>
	));	
};

export default PostCommentList;