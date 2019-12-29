import React from 'react';
import { Link } from 'react-router-dom';

// basic
import Href from '../../basic/Href/Href'

const MyDrawer = ({page}) => {
	return(
		<div className = "MyDrawer">
			<p className = "DrawerHeader">
				나의 Army Friend
			</p>
			<div className = "Menu">
				<p className = "MenuTitle">
					보직 추천 정보
				</p>
				<Link to={`/my/1`} style={{ textDecoration: 'none'}}>
					<p className = {`MenuContent MenuLast ${page==="1" ? "active" : ""}`}>
						열어본 보직
					</p>
				</Link>
			</div>
			<div className = "Menu">
				<p className = "MenuTitle">
					게시판 이용 내역
				</p>
				<Link to={`/my/2`} style={{ textDecoration: 'none'}}>
					<p className = {`MenuContent ${page==="2" ? "active" : ""}`}>
						내가 쓴 글
					</p>
				</Link>
				<Link to={`/my/3`} style={{ textDecoration: 'none'}}>
					<p className = {`MenuContent menu-last-item ${page==="3" ? "active" : ""}`}>
						댓글 단 글
					</p>
				</Link>
				<Href url={`/my/4`}>
					<p className = {`MenuContent ${page==="4" ? "active" : ""}`}>
						회원 정보 수정
					</p>
				</Href>
				<Href url={`/my/5`}>
					<p className = {`MenuContent menu-last ${page==="5" ? "active" : ""}`}>
						회원 탈퇴
					</p>
				</Href>
			</div>
		</div>
	)
};

export default MyDrawer;