import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// SCSS
import './scss/EditUser.scss';

// pages
import CheckPassword from './CheckPassword';

// basic
import Loading from '../../basic/Loading/Loading';


@inject('myStore')
@observer
class EditUser extends Component{
	
	componentDidMount(){
		const { myStore } = this.props;
		const { getMyUser } = myStore;
		
		getMyUser();
	}
	
	constructor(props){
		super(props);
		
		this.state = {
			nickname : false,
			password : false,
		};
	}
	
	handleValue = (name) => {
		switch(name){
			case "nickname":
				this.setState({nickname : true, password : false});
				break;
			case "password":
				this.setState({password : true, nickname : false});
				break;
		}
	}
	
	render(){
		const { myStore } = this.props;
		const {
			status,
			api,
			
			logged,
			user,
			
			input_Password,
			inputNewNickname,
			inputNewPassword,
			inputNewPassword2,
			handleInput,
			changePassword,
			changeNickname,
			checkNickname,
			cancelChangeNickname,
			cancelChangePassword,
			
			OVERLAP_nickname,
			OVERLAP_nickname_errorLog,
			
			errorLog_changePassword,
		} = myStore;
		
		const { nickname, password } = this.state;
		
		if(!logged) return <CheckPassword/>;
		
		return(
			<div className="EditUser">
				<Loading loading = {api !== "getMyUser"} />
				
				<div className = "header">
					<p className = "header-title">
						회원정보 수정
					</p>
				</div>

				<div className = "editUser">
					<div className = "items">
						<div className = "item">
							<p className = "edit-title">
								이름
							</p>
							<p className = "edit-content">
								{user && user.name ? user.name : ""}
							</p>
						</div>
						<div className = "item">
							<p className = "edit-title">
								닉네임
							</p>
							<div className = "edit-content">
								{user && user.nickname ? user.nickname : ""}

								{
									nickname 
									?
										(
										<div className = "nickname-check">
											<p className = "input-label">새로운 닉네임</p>
											<input 
												type = "text"
												className = "uk-input input-box"
												name = "nickname"
												onChange = {handleInput}
												/>
											<button
												className = "uk-button normal-button overlap-btn"
												onClick = {()=>checkNickname()}
												>
												중복확인
											</button>
											<p className = "errorLog">{OVERLAP_nickname_errorLog}</p>
											<div className = "buttonWrapper">
												<button
													className = "uk-button normal-button"
													onClick = {()=>{
														cancelChangeNickname();
														this.setState({nickname : false});
													}}
													>
													수정취소
												</button>
												<button
													className = "uk-button done-button"
													onClick = {changeNickname}
													>
													수정완료
												</button>
											</div>	
										</div>	
										)
									:
									<button
										className = "uk-button uk-button-small nickname-btn"
										onClick = {()=>this.handleValue("nickname")}
										>
										수정
									</button>
								}
							</div>
						</div>
						<div className = "item">
							<p className = "edit-title">
								비밀번호
							</p>
							<div className = "edit-content">

								{
									password 
									?
										<div>
											<div className = "input-container">
												<div className = "label-container">
													<p className = "label">현재 비밀번호</p>
												</div>
												<input 
													type = "password"
													className = "uk-input input-box"
													name = "password_"
													onChange = {handleInput}
													value = {input_Password}
													/>
											</div>
											<div className = "input-container">
												<div className = "label-container">
													<p className = "label">새 비밀번호</p>
												</div>
												<input 
													type = "password"
													className = "uk-input input-box"
													name = "new_password"
													onChange = {handleInput}
													value = {inputNewPassword}
													/>
											</div>
											<div className = "input-container">
												<div className = "label-container">
													<p className = "label">새 비밀번호 확인</p>
												</div>
												<input 
													type = "password"
													className = "uk-input input-box"
													name = "new_password2"
													onChange = {handleInput}
													value = {inputNewPassword2}
													/>
											</div>
											
											<p className = "errorLog">{errorLog_changePassword}</p>

											<div className = "buttonWrapper">
												<button
													className = "uk-button normal-button"
													onClick = {()=>{
														cancelChangePassword();
														this.setState({password : false});
													}}
													>
													수정취소
												</button>
												<button
													className = "uk-button done-button"
													onClick = {changePassword}
													>
													수정완료
												</button>
											</div>	
										</div>
									:
										<button
											className = "uk-button uk-button-small password-btn"
											onClick = {()=>this.handleValue("password")}
											>
												수정
										</button>
								}
							</div>
						</div>
						<div className = "item">
							<p className = "edit-title">
								이메일
							</p>
							<p className = "edit-content">
								{user && user.email ? user.email : ""}
							</p>
						</div>
					</div>
				</div>	
			</div>
		);
	}
}

export default observer(EditUser);