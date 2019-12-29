import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

// basic
import Header2 from '../../basic/Header/Header2';

@inject('userStore')
@observer
class FindIdDone extends Component{
	
	render(){
		const { id } = this.props;
		
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
						<div className = "idWrapper">
							<p className = "id-info">
								고객님의 ID는 <span className = "id">{id}</span> 입니다.
							</p>
						</div>
						
						<div className = "loginWrapper">
							<Link to = "/login" style = {{'textDecoration' : 'none'}}>
								<button
									className ="uk-button button"
									>
									로그인 하기
								</button>
							</Link>
						</div>
						
						<div className = "linkWrapper">
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

export default observer(FindIdDone);