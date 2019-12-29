import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('myStore')
@observer
class CheckPassword extends Component{

	componentDidMount(){
		
	}
	
	render(){
		const { myStore } = this.props;
		const { 
			inputPassword,
			handleInput,
			login,
			errorLog_login
		} = myStore;
		
		return(
			<div className = "CheckPassword">
				<div className = "header">
					<p className = "header-title">
						회원정보 수정
					</p>
				</div>

				<p className = "info">
					개인정보 보호를 위해 비밀번호를 입력해 주세요.
				</p>

				<form onSubmit = {e=>e.preventDefault()}>
					<div className = "input-item">
						<div className = "input-label">
							<p className = "title">비밀번호</p>
						</div>
						<input
							type = "password"
							className = "input-box"
							name = "password"
							value = {inputPassword}
							onChange = {handleInput}
							/>
					</div>
					
					<p className = "errorLog">
						{errorLog_login}
					</p>

					<div className = "buttonWrapper">
						<button
							className = "uk-button login-btn"
							onClick = {login}
							>
							확인
						</button>
					</div>  
				</form>
			</div>
		)
	}
	
}

export default observer(CheckPassword);