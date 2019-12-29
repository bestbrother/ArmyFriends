import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import alert1 from '../../assets/alert1.png';

export default class DeletePopUp extends Component{
	
	render(){
		const {
			show,
			handleShow,
			deleteUser
		} = this.props;
		
		if(!show) return null;
		
		return(
			<div className = "DeletePopUpContainer">
				<div className = "DeletePopUp">
					<p className = "popup-header">
						회원 탈퇴 확인
					</p>
					
					<div className = "popup-content">
						<div className = "imgWrapper">
							<img
								className = "alert-img"
								src = {alert1}
								alt = "경고창"
								/>
						</div>
						<div className = "textWrapper">
							<p className = "popup-text">
								회원 탈퇴를 하면 Army Friend의 개인 서비스를 활용할 수 없으며<br/>일부 기능이 제한될 수 있습니다.
							</p>
							<p className = "popup-text popup-text2">
								정말 탈퇴하시겠습니까?
							</p>
						</div>
					</div>
					
					<div className = "buttonWrapper">
						<button
							className = "uk-button button primary"
							onClick = {()=>handleShow(false)}
							>
							취소
						</button>
						<button
							className = "uk-button button cancel"
							onClick = {deleteUser}
							>
							탈퇴하기
						</button>
					</div>
				</div>
			</div>
		)
	}
}