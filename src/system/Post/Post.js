/* eslint-disable */

import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import view_img from '../../assets/views.png';
import comment_img from '../../assets/comment.png';

// CSS
import './Post.scss';

// Image
import write_img from '../../assets/write.png';

// basic
import Container from '../../basic/Container/Container';
import CommentList from '../../basic/CommentList/CommentList';
import CommentUpload from '../../basic/CommentList/CommentUpload';
import Loading from '../../basic/Loading/Loading';

import PostList from '../../basic/PostList/PostList';
import Pagination1 from '../../basic/Pagination/Pagination1';
import Search from '../../basic/Search/Search';

// local
import * as local from '../../stores/localStorage';

@inject('postStore')
@observer
class Post extends React.Component{
	
	componentDidMount(){
		const { postStore, match } = this.props;
		const id = match.params.id;
		
		postStore.getPost(id);
		postStore.getPosts();
	}
	
	render(){
		const { postStore, match} = this.props;
		const {
			status,
			api,
			
			post, 
			comments, 
			
			COMMENT_WHERE, 
			handleCommentWhere,
			inputComment,
			unknown,
			handleInput,
			handleCancel,
			uploadComment,
			deletePost,
			
			posts,
			activePage, 
			handlePage,
			inputSearch,
			handleSelect,
		} = postStore;
		
		// 포스트 아이디
		const pageId = match.params.id; 
		if(post === null) return <Loading loading = {api === null} />;
		
		// 유저 정보
		const USER = local.getUser();
		const IS_USER = USER && USER.id === post.userId ? true : false;
		
		// 밑에 포스트
		const PagePerCount = 20;
		const first_index = (activePage-1) * PagePerCount;
		const last_index = (activePage) * PagePerCount;
		
		return (
			<React.Fragment>
			<Container 
				className = "Post Container"
				position = "board"
				loading = {post===null}>
				
				<div className = "header">
					<div className = "title">
						<p className = "title-text">{post.title}</p>
						<div className = {`buttonWrapper ${IS_USER ? "" : "none"}`}>
							<button 
								className = "button editBtn"
								onClick = {()=>IS_USER ? this.props.history.push(`/board/${pageId}/edit`) : null}>
								수정
							</button>
							<button 
								className = "button deleteBtn" 
								onClick = {()=>deletePost(post.id, this.props.history)}>
								삭제
							</button>
						</div>
					</div>
					<div className ="info">
						<span className = "user">{post.userId ? post.userId : "(탈퇴된 회원)"}</span>
						<span className = "date">{post.createdAt}</span>
						<p className = "views">
							<img 
								className = "views_img"
								src = {view_img} 
								alt = "view_img" 
								/>
							{post.views}
						</p>
						<p className = "comments-count">
							<img 
								className = "comment_img"
								src = {comment_img} 
								alt = "comment_img" 
								/>
							{comments.length}
						</p>
					</div>
				</div>

				<div className = "contentWrapper">
					<div
						className = "content"
						dangerouslySetInnerHTML={ {__html: post.content} }/>	
				</div>

				<div className = "post-comments">
					<div className = "header" onClick = {()=>handleCommentWhere(-1)}>
						<span>전체 댓글 <span className = "comment-length">{comments.length}</span>개</span>
					</div>

					<CommentList comments = {comments} pageId = {pageId}/>

					{
						COMMENT_WHERE === -1 
						?
							<CommentUpload
								pageId = {pageId}
								handleInput = {handleInput}
								inputComment = {inputComment}
								uploadComment = {uploadComment}
								handleCancel = {handleCancel}
								/>
						: null
					}
				</div>
			</Container>
			
			<div className = "BottomPostWrapper">
			<div className = "BottomPostList">
				<div className = "bottomHeader">
					<span className = "title">
						{`자유게시판`}
					</span>

					<span className = "subtitle">
						자유롭게 글을 쓰는 게시판입니다.
					</span>

					<span className = "write">
						<img
							onClick = {this.redirectUpload}
							className = "write_img"
							src = {write_img} 
							alt = "write_img"/>
					</span>

					<span className = "info" onClick = {()=>this.showInfo()}>
						이용안내
					</span>
				</div>

				<PostList 
					posts={posts.slice(first_index, last_index)} 
					history={this.props.history}
					/>

				<div className = "bottomWrapper">
					<Pagination1
						length = {posts.length}
						activePage={activePage}
						handleActivePage = {handlePage}
						PagePerCount={PagePerCount}
					/>

					<Search
						type = "text"
						name = "search"
						input = {inputSearch}
						handleInput = {handleInput}
						handleSelect = {handleSelect}
						search = {()=>getSearchPosts(this.props.history)}
						/>
				</div>
			</div>
			</div>
			
			</React.Fragment>
		);
	}	
}

export default observer(Post);