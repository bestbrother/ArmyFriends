/* eslint-disable */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';

//CSS
import './User.scss';

// basic
import Container from '../../basic/Container/Container';
import Footer from '../../basic/Footer/Footer';

import army from '../../assets/army.png';
import friend from '../../assets/friend.png';


@inject('userStore')
@observer
class Login extends Component{
	render(){
		const { userStore } = this.props;
		const {
			status,
			api,
			
			inputId,
			inputPassword,
			handleInput,
			
			login,
			
			errorLog_login,
			errorLog_login_id,
			errorLog_login_password,
		} = userStore;
		
		return(
			<Container className = "Login" className2 = "LoginWrapper">
				<form className = "form" onSubmit = {e=>e.preventDefault()}>
					<div className="input-container">
						<Link to = "/">
							<div className = "logo">
								<img
									className = "logo-header"
									src = {army}
									/>
								<img
									className = "logo-footer"
									src = {friend}
									/>
							</div>
						</Link>
						<input 
							className="uk-input input-id" 
							onChange = {handleInput}
							type="text"
							name = "id"
							placeholder="아이디"
							/>
						<p className = "errorLog-login">
							{errorLog_login_id}
						</p>
						<input 
							className="uk-input input-password" 
							onChange = {handleInput}
							name = "password"
							type="password"
							placeholder="비밀번호"
							/>
						<p className = "errorLog-login">
							{errorLog_login_password}
						</p>

						<p className = "errorLog">
							{errorLog_login}
						</p>

						<button
							className = "uk-button login-btn"
							onClick = {()=>login(this.props.history)}
							>
							로그인
						</button>



						<div className = "buttonWrapper">
							<Link to = "/find/id" style = {{'textDecoration' : 'none', 'color' : '#333'}}>
								<p className = "btn-1">아이디 찾기</p>
							</Link>
							<Link to = "/find/password" style = {{'textDecoration' : 'none', 'color' : '#333'}}>
								<p className = "btn-2">비밀번호 찾기</p>
							</Link>
							<Link to = "/register/1" style = {{'textDecoration' : 'none', 'color' : '#333'}}>
								<p className = "btn-3">회원가입</p>
							</Link>
						</div>
					</div>
				</form>
				<Footer/>
			</Container>
		);
	}
}

export default observer(Login);