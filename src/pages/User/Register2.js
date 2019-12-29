import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// header img
import header_2 from '../../assets/register/register-header-2.png';

@inject('userStore')
@observer
class Register2 extends Component{
	render(){
		const { userStore } = this.props;
		const {
			handleRegisterInput,
			register,
			
			auth_view,
			auth,
			getAuthCode,
			checkAuthCode,
			
			errorLog2,
			errorLog2_id,
			errorLog2_password,
			errorLog2_password2,
			errorLog2_email,
			errorLog2_nickname,
			errorLog2_name,
			errorLog2_emailAuth,
			errorLog2_emailAuthSuccess
		} = userStore;
		
		return(
			<React.Fragment>
			<div className = "RegisterHeader">
				<img
					className = "header-img"
					src = {header_2} 
					alt = "header"/>
			</div>
			<div className = "Register2">
				<div className = "register-header">
					<p className = "title">
						회원가입
					</p>
					<div className = "info-wrapper">
						<p className = "info">
							ArmyFriend 회원 이용약관과 개인정보 수집 및 이용에 동의하셔야 회원가입이 가능합니다.
						</p>
					</div>
				</div>
				
				<div className = "input">
					<div className = "input-items">
						<div className = "input-item">
							<div className = "input-title">
								<p className = "title">
									아이디
								</p>
							</div>
							<div className = "input-content">
								<input
									type = "text"
									className = "uk-input"
									name = "id"
									onChange = {handleRegisterInput}
									/>
							</div>
							
						</div>
						
						<p className = "errorLog2">
							{errorLog2_id}
						</p>

						<div className = "input-item">
							<div className = "input-title">
								<p className = "title">
									비밀번호
								</p>
							</div>
							<div className = "input-content">
								<input
									type = "password"
									className = "uk-input"
									name = "password"
									onChange = {handleRegisterInput}
									/>
							</div>
							
						</div>

						<p className = "errorLog2">
							{errorLog2_password}
						</p>
						
						<div className = "input-item">
							<div className = "input-title">
								<p className = "title">
									비밀번호 확인
								</p>
							</div>
							<div className = "input-content">
								<input
									type = "password"
									className = "uk-input"
									name = "password2"
									onChange = {handleRegisterInput}
									/>
							</div>
						</div>
						
						<p className = "errorLog2">
							{errorLog2_password2}
						</p>

						<div className = "input-item">
							<div className = "input-title">
								<p className = "title">
									이름
								</p>
							</div>
							<div className = "input-content">
								<input
									type = "text"
									className = "uk-input"
									name = "name"
									onChange = {handleRegisterInput}
									/>
							</div>
						</div>
						
						<p className = "errorLog2">
							{errorLog2_name}
						</p>

						<div className = "input-item">
							<div className = "input-title">
								<p className = "title">
									닉네임
								</p>
							</div>
							<div className = "input-content">
								<input
									type = "text"
									className = "uk-input"
									name = "nickname"
									onChange = {handleRegisterInput}
									/>
							</div>
						</div>
						
						<p className = {`errorLog2`}>
							{errorLog2_nickname}
						</p>

						<div className = "input-item">
							<div className = "input-title">
								<p className = "title">
									이메일 주소
								</p>
							</div>
							<div className = "input-content">
								<input
									type = "text"
									className = "uk-input"
									name = "email"
									onChange = {handleRegisterInput}
									/>

								<button 
									className = {`uk-button email-btn ${auth_view ? "email-sent-btn" : ""}`}
									onClick = {getAuthCode}
									>
									인증메일 보내기
								</button>
							</div>
						</div>
						
						<p className = "errorLog2">
							{errorLog2_email}
						</p>
						
						{
							auth_view
							?
								<React.Fragment>
								<div className = "input-item">
									<div className = "input-title">
										<p className = "title">
											인증번호 입력
										</p>
									</div>
									<div className = "input-content">
										<input
											type = "text"
											className = "uk-input"
											name = "auth"
											onChange = {handleRegisterInput}
											/>

										<button 
											className = "uk-button email-btn"
											onClick = {checkAuthCode}
											>
											메일인증 완료
										</button>
									</div>
									
									
								</div>
								
								<p className = "errorLog2">
									{errorLog2_emailAuth}
									{errorLog2_emailAuthSuccess}
								</p>
								</React.Fragment>
							: null
						}
						
						<p className = "errorLog2">
							{errorLog2}
						</p>
						
					</div>
				</div>
				
				<div className = "buttonWrapper">
					<button
						className = "uk-button return-button"
						onClick = {()=>this.handlePage("home")}
						>
						처음으로
					</button>
					<button
						className = "uk-button register-button"
						onClick = {()=>register(this.props.history)}
						>
						가입하기
					</button>
				</div>
			</div>
			</React.Fragment>
		)
	}
	
	handlePage = (index) => {		
		if(index === "home"){
			this.props.history.push('/login');
		}
	}
}

export default observer(Register2);