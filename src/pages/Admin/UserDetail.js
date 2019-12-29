import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';


@inject('adminUserStore')
@observer
class UserDetail extends Component{	
	componentDidMount(){
		document.addEventListener("keydown", this.escFunction, false);
		
		const { adminUserStore, id } = this.props;
		adminUserStore.getUser(id);
	}
	
	componentWillUnmount(){
		document.removeEventListener("keydown", this.escFunction, false);
	}
	
	render(){
		const { adminUserStore } = this.props;
		const { user, deleteUser } = adminUserStore;
		
		if(user === null) return <h1>Loading</h1>;
		
		return(
			<div className = "AdminUserDetail">
				<div className = "user-box">
					<span className = "title">이름</span>
					<span className = "user-content">{user.name}</span>
				</div>
				
				<div className = "user-box">
					<span className = "title">아이디</span>
					<span className = "user-content">{user.id}</span>
				</div>
				
				<div className = "user-box">
					<span className = "title">닉네임</span>
					<span className = "user-content">{user.nickname}</span>
				</div>
				
				<div className = "user-box">
					<span className = "title">이메일</span>
					<span className = "user-content">{user.email}</span>
				</div>
				
				<div className = "user-box">
					<span className = "title">메일 수신 여부</span>
					<span className = "user-content">{user.mailAccept ? "O" : "X"}</span>
				</div>
				
				<div className = "user-box">
					<span className = "title">가입일</span>
					<span className = "user-content">{user.createdAt}</span>
				</div>
				
				<button 
					className = "uk-button uk-button-danger"
					onClick = {()=>deleteUser(user.id)}
					>회원탈퇴
				</button>
			</div>
		)	
		
	}
	
	escFunction =(event) => {
		const { adminUserStore } = this.props;
		
    	if(event.keyCode === 27) {
    		//Do whatever when esc is pressed
			adminUserStore.handleUserView(0, false);
		}
	};
}

export default observer(UserDetail);