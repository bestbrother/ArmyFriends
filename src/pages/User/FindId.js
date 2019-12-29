import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

// pages
import FindIdDone from './FindIdDone';

// basic
import Header2 from '../../basic/Header/Header2';

// SCSS
import './Find.scss';

// local
import * as local from '../../stores/localStorage';

@inject('userStore')
@observer
class FindId extends Component{
	
	componentDidMount(){
		this.props.userStore.setDefault();
	}
	
	render(){
		const { userStore } = this.props;
		const {
			api, 
			status,
			
			inputId,
			inputName,
			inputEmail,
			handleInput,
			
			findId,
			
			errorLog_findId,
			user
		} = userStore;
		
		if(api === "findId" && user !== null){
			return <FindIdDone id = {user && user.id ? user.id : ''} />;
		}
		return(
			<div className = "ContainerWrapper">
				<Header2/>
				
				<div className = "Find Container">
					<div className = "topWrapper">
						<div className = "title-wrapper">
							<p className = "title">
								아이디 찾기
							</p>
						</div>
						
						<div className = "info-wrapper">
							<p className = "info info-1">
								회원가입시 입력한 이름과 이메일 정보를 입력해 주시기 바랍니다.
							</p>
							<p className = "info info-2">
								회원가입시 실명이 아닌 다른 이름으로 가입했을 경우, 해당 가입시 입력한 이름을 입력해야 합니다.
							</p>
						</div>
					</div>
					
					<div className = "bottomWrapper">
						<div className = "input-wrapper">
							<div className = "input-label">
								<div className = "input-text">
									이름
								</div>
							</div>
							<div className = "input-box">
								<input 
									type = "text"
									className = "uk-input input"
									name = "name"
									value = {inputName}
									onChange = {handleInput}
									/>
							</div>
						</div>
						<div className = "input-wrapper email-wrapper">
							<div className = "input-label">
								<div className = "input-text">
									이메일 주소
								</div>
							</div>
							<div className = "input-box">
								<input 
									type = "text"
									className = "uk-input input"
									name = "email"
									value = {inputEmail}
									onChange = {handleInput}
									/>
							</div>
						</div>
						
						<p className = "errorLog">
							{errorLog_findId}
						</p>
						
						<div className = "input-wrapper">
							<div className = "input-label">
								<div className = "input-text">
								</div>
							</div>
							<div className = "input-box">
								<button
									className ="uk-button button"
									onClick = {findId}
									>
									확인
								</button>
							</div>
						</div>
						
						<div className = "link-wrapper">
							<Link to = "/find/id" style = {{'textDecoration' : 'none'}}>
								<p className = "link-id">
									아이디 찾기
								</p>
							</Link>
							<Link to = "/find/password" style = {{'textDecoration' : 'none'}}>
								<p className = "link-password">
									비밀번호 찾기
								</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default observer(FindId);