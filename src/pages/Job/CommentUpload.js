import React from 'react';

// SCSS
import './scss/CommentUpload.scss';

const CommentUpload = ({postStore, POSTID}) => {
	const{
		handleInput,
		inputComment,
		
		uploadComment,
		handleCommentCancel,
		
		// 댓글 수정
		editState,
		editCommentId,
		editComment,
	} = postStore;
	
	return(
		<div className = "CommentUploadContainer">
			<div className = "CommentUpload">
				
				<form 
					onSubmit = {e=>e.preventDefault()} 
					className = "submit">
					
					<div className = "unknown">
						<input 
							className = "uk-checkbox unknown-checkbox"
							type = "checkbox"
							name = "unknown"
							value = {inputComment}
							onChange = {handleInput}
							>
						</input>
						<label className = "unknown-label">익명</label>
					</div>

					<textarea
						className = "uk-input UploadInput"
						type = "text"
						name = "comment"
						value = {inputComment}
						onChange = {handleInput}
						/>
					
				</form>
				
				<div className = "CommentButton">
					<button
						className = "uk-button uk-button-small Button UploadButton"
						onClick = {
							editState 
								? ()=>editComment(editCommentId, inputComment, POSTID)
								: ()=>uploadComment(POSTID)
						}
						>
						{!editState ? "등록" : "수정"}
					</button>

					<button
						className = "uk-button uk-button-small Button CancelButton"
						onClick = {handleCommentCancel}
						>
						취소
					</button>
				</div>
			</div>
		</div>
	)
}

export default CommentUpload;