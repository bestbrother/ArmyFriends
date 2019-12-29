import React from 'react';
import BoardListItem from './BoardListItem';
import { Pagination } from 'antd';

const BoardList = ({posts, currentPage, handleChecked, handlePostView, handlePage}) => {
	
	const COUNT = 20;
	let first_index = (currentPage - 1) * COUNT;
	let last_index = (currentPage) * COUNT;
	
	return(
		<div className = "BoardList">
			<table className = "uk-table uk-table-middle uk-table-divider">
				<thead>
					<tr>
						<th className="uk-table-shrink">선택</th>
						<th className="uk-width-small">번호</th>
						<th>제목 및 내용</th>
						<th className="uk-width-small">정보</th>
					</tr>
				</thead>
					{ 
						posts.length !== 0 					
							? 
								<BoardListItem
									posts = {posts.slice(first_index, last_index)}
									handleChecked = {handleChecked}
									handlePostView = {handlePostView}
									/>
							: 
								null 
					}
			</table>

			<Pagination 
				showQuickJumper 
				defaultCurrent={1} 
				pageSize={COUNT} 
				total={posts.length} 
				onChange={(pageNumber)=>handlePage(pageNumber)} />
		</div>
	);
};


export default BoardList;