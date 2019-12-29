import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// SCSS
import './scss/Post.scss';

// baisc
import PostCommentList from './PostCommentList';

@inject('adminBoardStore')
@observer
class Post extends Component{
	
	componentDidMount(){
		document.addEventListener("keydown", this.escFunction, false);
		
		const { adminBoardStore } = this.props;
		const { post_id } = adminBoardStore;
		
		adminBoardStore.getPost(post_id);
		adminBoardStore.getComments(post_id);
	}

	componentWillUnmount(){
		document.removeEventListener("keydown", this.escFunction, false);
	}
	
	render(){
		const { adminBoardStore } = this.props;
		const { post, comments, deleteComment } = adminBoardStore;
		
		if(post === null) return <h1>Loading</h1>;
		
		return(
			<div className = "AdminPost">
				<ul className="uk-list uk-list-divider">
					<li className = "post-title">{post.title}</li>
					<li className = "post-info">{post.updatedAt} | 조회수 : {post.views}</li>
					<li 
						className = "post-content" 
						dangerouslySetInnerHTML={ {__html: post.content} }></li>
					<li className = "post-comments">
						<PostCommentList 
							comments = {comments} 
							deleteComment = {deleteComment}
							/>
					</li>
				</ul>
			</div>
		);
	}
	
	escFunction =(event) => {
		const { adminBoardStore } = this.props;
		
    	if(event.keyCode === 27) {
    		//Do whatever when esc is pressed
			adminBoardStore.handlePostView(0, false);
		}
	};
}

export default observer(Post);