import React from 'react';

const PostReplyList = ({replies, deleteComment}) => {
	return replies.map((reply)=>(
		<div className = "ReplyItem" key = {reply.id} >
			<div className = "topWrapper2">
				<p className = "name">{reply.userId}</p>
				<p className = "date">{reply.createdAt}</p>
				<p className = "delete" onClick = {()=>deleteComment(reply.id)}>삭제</p>
			</div>
			<div className = "bottomWrapper2">
				<p className = "content">{reply.content}</p>
			</div>
		</div>
	));
};

export default PostReplyList;