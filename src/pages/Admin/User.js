import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// CSS
import './scss/User.scss';

// basic
import UserList from './UserList';
import UserDetail from './UserDetail';

@inject('adminUserStore')
@observer
class User extends Component{
	
	componentDidMount(){
		document.addEventListener("keydown", this.escFunction, false);
		
		const { adminUserStore } = this.props;
		adminUserStore.getUsers();
	}
	
	componentWillUnmount(){
		document.removeEventListener("keydown", this.escFunction, false);
	}
	
	
	render(){
		const { adminUserStore } = this.props;
		const { users, user_view, handleUserView } = adminUserStore;
		
		if(user_view) return <UserDetail/>;
		 
		return(
			<div className = "AdminUser">
				<div className = "search">
					<form onSubmit = {e=>e.preventDefault()} className = "form">
						<select className="uk-select select">
							<option>이름</option>
							<option>아이디</option>
						</select>
						<input
							className = "uk-input input"
							type = "text" 
							placeholder = "검색할 내용을 입력하세요"
							/>
						<div className="uk-margin uk-grid-small uk-child-width-auto uk-grid mail">
							<label><input className="uk-checkbox" type="checkbox"/>메일 수신 허용</label>
							<label><input className="uk-checkbox" type="checkbox"/>메일 수신 거부</label>
						</div>
						<button 
							className = "uk-button uk-button-default button"
							>
							검색
						</button>
					</form>
				</div>
				
				<table className="uk-table uk-table-striped uk-overflow-auto">
					<thead>
						<tr>
							<th>선택</th>
							<th>번호</th>
							<th>가입일(년-월-일)</th>
							<th>아이디</th>
							<th>닉네임</th>
							<th>방문수</th>
							<th>메일 수신 여부</th>
						</tr>
					</thead>
					<tbody>
						<UserList users = {users} handleUserView = {handleUserView} />
					</tbody>
				</table>
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

export default observer(User);