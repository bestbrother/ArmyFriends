import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// CSS
import './css/login.css';

@inject('adminLoginStore')
@observer
class Login extends Component{
	
	render(){
		const { adminLoginStore } = this.props;
		const { inputId, inputPassword } = adminLoginStore;
		const { handleId, handlePassword } = adminLoginStore;
		
		return(
			<div className = "uk-container uk-container-xsmall admin-login">
				
				<div className = "login-container">
					<div className = "title-container">
						<h1 className = "title">Admin Login</h1>
					</div>

					<form onSubmit = {e=>e.preventDefault()}>
						<input 
							className ="uk-input input-box"
							value = {inputId}
							onChange = {handleId}
							type="text"
							placeholder = "아이디를 입력해주세요"
							/>

						<input 
							className = "uk-input input-box"
							value = {inputPassword}
							onChange = {handlePassword}
							type="password"
							placeholder = "비밀번호를 입력해주세요"
							/>
						
						<button 
							className = "uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom"
							onClick = {adminLoginStore.login}
							>
							로그인
						</button>
					</form>
				</div>
			</div>
		);
		
	}
}

export default observer(Login);