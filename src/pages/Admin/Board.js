import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { Pagination } from 'antd';

// CSS
// import './css/board.css';
import './scss/Board.scss';

// basic
import Post from './Post';
import BoardList from './BoardList';
import BoardUpload from './BoardUpload';
import JobModifyList from './JobModifyList';

@inject('adminBoardStore')
@observer
class Board extends Component{
	
	componentDidMount(){
		document.addEventListener("keydown", this.escFunction, false);
		
		const { page, adminBoardStore } = this.props;
		const { getPosts, getJobPosts, getJobs, getNoticePosts } = adminBoardStore;
		const { handleChecked } = adminBoardStore;
		
		if(page===4){
			// 자유게시판
			getPosts();
		}else if(page===5){
			getJobs();
		}else if(page===6){
			getNoticePosts();
		}
	}
	
	componentWillUnmount(){
		document.removeEventListener("keydown", this.escFunction, false);
	}
	
	
	handleView = () => {
		const { page, adminBoardStore } = this.props;
		const { 
			reload,
			posts,
			tip_posts,
			jobs, 
			currentPage, 
			handlePage,
			deletePosts,
			deleteComment,
			handleChecked, 
			handlePostView,
			handleTipView,
			handleUploadView,
			post_view,
			tip_view,
			upload_view,
			getPosts, getJobPosts, getJobs, getNoticePosts
		} = adminBoardStore;
		
		const {
			input_search,
			handleSearch,
			getSearchPosts,
			select_value,
			handleSelect,
		} = adminBoardStore;
		
		if(reload){
			if(page===4){
				// 자유게시판
				getPosts();
			}else if(page===5){
				getJobs();
			}else if(page===6){
				getNoticePosts();
			}
		}
		
		console.log(`page : ${page}, post_view : ${post_view}, tip_view : ${tip_view}, upload_view : ${upload_view}`)
		
		// 글 - 자세히 보기
		if(post_view) return <Post/>;
		if(upload_view) return <BoardUpload/>;	
		
		// TIP 게시판
		if(page === 5){
			let slices = [];
			const size = 4;
			if(jobs.length >= size){
				for(let i=0;i<jobs.length / size; i++){
					slices.push(jobs.slice(i * size, (i+1) * size));
				}	
			}else{
				slices[0] = jobs;
			}
			if(!tip_view){
				return(
					<Fragment>
						<div className = "page-title">
							TIP 게시판 - 보직 선택
						</div>
						<JobModifyList
							slices = {slices}
							handleView = {handleTipView}
							/>	
					</Fragment>
					
				);
			}else{
				return(
					<Fragment>
						<div className = "page-title">
							TIP 게시판
						</div>
						
						<div className = "board-search">
							<form onSubmit = {e=>e.preventDefault()}>
								<select 
									className="uk-select form-select"
									value = {select_value}
									onChange = {handleSelect}
									>
									<option value = "title">제목</option>
									<option value = "content">내용</option>
									<option value = "both">제목 + 내용</option>
								</select>
								<input
									className = "uk-input form-input"
									type = "text" 
									placeholder = "검색할 내용을 입력하세요"
									value = {input_search}
									onChange = {handleSearch}
									/>
								<button 
									className = "uk-button uk-button-default form-btn"
									onClick = {() => getSearchPosts(page)}
									>
									검색
								</button>
								<button 
									className = "uk-button uk-button-danger form-delete"
									onClick = {deletePosts}
									>
									선택한 항목 삭제
								</button>
							</form>
						</div>
						
						<BoardList 
							posts = {tip_posts}
							currentPage = {currentPage}
							handleChecked = {handleChecked}
							handlePostView = {handlePostView}
							handlePage = {handlePage}
							/>
					</Fragment>
					
				);
			}	
			
			
		}
		
		// 자유게시판, 공지 게시판
		return(
			<div className = "AdminBoard">
				<div className = "title">
					{page === 4 ? "자유게시판" : null}
					{page === 5 ? "TIP 게시판" : null}
					{page === 6 ? "게시판 공지사항" : null}
				</div>
				
				<div className = "search">
					<form onSubmit = {e=>e.preventDefault()} className = "search-form">
						<select 
							className="uk-select select"
							value = {select_value}
							onChange = {handleSelect}
							>
							<option value = "title">제목</option>
							<option value = "content">내용</option>
							<option value = "both">제목 + 내용</option>
						</select>
						<input
							className = "uk-input input"
							type = "text" 
							placeholder = "검색할 내용을 입력하세요"
							value = {input_search}
							onChange = {handleSearch}
							/>
						<button 
							className = "uk-button uk-button-default button"
							onClick = {() => getSearchPosts(page)}
							>
							검색
						</button>
						<button 
							className = "uk-button uk-button-danger delete"
							onClick = {deletePosts}
							>
							선택한 항목 삭제
						</button>
						
						
								{
									page === 6 ? 
										(
											<button 
												className = "uk-button uk-button-primary form-upload"
												onClick = {()=>handleUploadView(true)}
												>
												공지사항 글쓰기
											</button>
										)
									:
										null
								}
					</form>
				</div>
				
				<BoardList 
					posts = {posts}
					currentPage = {currentPage}
					handleChecked = {handleChecked}
					handlePostView = {handlePostView}
					handlePage = {handlePage}
					/>
			</div>
				
		);
	};
	
	render(){
		return this.handleView();
	}

	escFunction = (event) => {
		const { page, adminBoardStore } = this.props;
		const { post_view, tip_view, upload_view, handleReload } = adminBoardStore;
		
    	if(event.keyCode === 27) {
    		//Do whatever when esc is pressed
			handleReload(true);
			
			if(page !== 5){
				adminBoardStore.handlePostView(0, false);
				adminBoardStore.handleTipView(0, false);
				
				if(page === 6 && upload_view){
					let result = window.confirm("정말 글 목록으로 돌아가시겠습니까?");
					if(result) adminBoardStore.handleUploadView(false);
				}
			}else{
				if(post_view){
					adminBoardStore.handlePostView(0, false);
				}else{
					adminBoardStore.handleTipView(0, false);
				}
			}
			
		}
	};
}

export default observer(Board);