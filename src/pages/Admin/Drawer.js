import React from 'react';

const Drawer = ({page, handlePage}) => {
	
	return(
		<div className = "drawer">
			<div className = "drawer-box">
				<p className = "drawer-title" onClick = {()=>handlePage(1)}>보직 분류 관리</p>
				<p className = "drawer-title">보직</p>
				<p className = "drawer-item" onClick = {()=>handlePage(2)}>추가, 삭제</p>
				<p className = "drawer-item" onClick = {()=>handlePage(3)}>수정</p>
			</div>
			
			<div className = "drawer-box">
				<p className = "drawer-title">게시판 관리</p>
				<p className = "drawer-item" onClick = {()=>handlePage(4)}>자유게시판</p>
				<p className = "drawer-item" onClick = {()=>handlePage(5)}>TIP 게시판</p>
				<p className = "drawer-item" onClick = {()=>handlePage(6)}>게시판 공지사항</p>
			</div>
			
			
			<div className = "drawer-box">
				<p className = "drawer-title" onClick = {()=>handlePage(7)}>회원 관리</p>
			</div>
			
			<div className = "drawer-box">
				<p className = "drawer-title" onClick = {()=>handlePage(0)}>로그아웃</p>
			</div>
		</div>
	);
}

export default Drawer;