import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// header img
import header_3 from '../../assets/register/register-header-3.png';


@inject('userStore')
@observer
class Register3 extends Component{
	
	render(){
		const { userStore } = this.props;
		const {
			input_Id,
		} = userStore;
		
		return(
			<React.Fragment>
			<div className = "RegisterHeader">
				<img
					className = "header-img"
					src = {header_3} 
					alt = "header"/>
			</div>
			<div className = "Register3">
				<div className = "register-header">
					<p className = "title">
						회원가입
					</p>
					<div className = "info-wrapper">
						<p className = "info">
							회원가입이 완료되었습니다.
						</p>
					</div>
				</div>
				
				<div className = "user-info">
					<p className = "title">
						환영합니다!
					</p>
					<p className = "content">
						고객님의 ID는 <span className = "point">{input_Id}</span>입니다.
					</p>
				</div>
				
				<div className = "buttonWrapper">
					<button
						className = "uk-button return-button"
						onClick = {()=>this.handlePage("home")}
						>
						홈으로 가기
					</button>
				</div>
			</div>
			</React.Fragment>
		)
	}
	
	handlePage = (index) => {
		if(index === "home"){
			this.props.history.push('/');
		}
	}
}

export default observer(Register3);