import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// SCSS
import './scss/DeleteUser.scss';

// basic
import DeletePopUp from './DeletePopUp';

@inject('myStore')
@observer
class DeleteUser extends Component{		
	render(){
		const { myStore } = this.props;
		const {
			inputDeleteId, 
			inputDeletePassword,
			inputDeleteName,
			handleInput,
			
			errorLog,
			deleteUser1,
			deleteUser2,
			logged,
			
			show,
			handleShow,
		} = myStore;
		
		return(
			<div className = "DeleteUser">
				
				<DeletePopUp 
					show = {show}
					handleShow = {handleShow}
					deleteUser = {deleteUser2}
					/>
				
				<div className = "header">
					<p className = "header-title">
						회원탈퇴
					</p>
				</div>

				<div className = "deleteUser">
					<form className = "Form" onSubmit = {e=>e.preventDefault()}>
						<div className = "input-item">
							<div className = "input-label">
								<p className = "title">아이디</p>
							</div>
							<input
								type = "text"
								className = "input-box"
								name = "deleteId"
								value = {inputDeleteId}
								onChange = {handleInput}
								/>
						</div>
						<div className = "input-item">
							<div className = "input-label">
								<p className = "title">이름</p>
							</div>
							<input
								type = "text"
								className = "input-box"
								name = "deleteName"
								value = {inputDeleteName}
								onChange = {handleInput}
								/>
						</div>
						<div className = "input-item">
							<div className = "input-label">
								<p className = "title">비밀번호</p>
							</div>
							<input
								type = "password"
								className = "input-box"
								name = "deletePassword"
								value = {inputDeletePassword}
								onChange = {handleInput}
								/>
						</div>
						
						<p className = "errorLog">
							{errorLog}
						</p>
						<div className = "buttonWrapper">
							<button
								className = "uk-button delete-button"
								onClick = {deleteUser1}
								>
								탈퇴하기
							</button>
						</div>
					</form>
					
					

				</div>
			</div>
		);
	}
	
}

export default observer(DeleteUser);