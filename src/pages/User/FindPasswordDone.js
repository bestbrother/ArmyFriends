import React, {Component} from 'react';

// SCSS
import './Find.scss';

// img
import alert1 from '../../assets/alert1.png';

export default class FindPasswordDone extends Component{
	
	render(){
		
		const{
			show,
			handleShow
		} = this.props;
		
		if(!show) return null;
		
		return(
			<div className = "FindPasswordDone">
				<div className = "PopUp fade in">
					<p className = "popup-header">
						이메일 발송 확인 
					</p>
					
					<div className = "popup-content">
						<img
							className = "alert-img"
							src = {alert1}
							alt = "경고창"
							/>
						<div className = "textWrapper">
							<p className = "popup-text">
								이메일로 임시 비밀번호를 보내드렸습니다.
							</p>
						</div>
					</div>
					
					<div className = "buttonWrapper">
						<button
							className = "uk-button button ok-btn"
							onClick = {()=>handleShow(false)}
							>
							확인
						</button>
					</div>
				</div>
			</div>
		)
	}
}