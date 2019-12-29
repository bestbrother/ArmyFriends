import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

// SCSS
import './PopUp.scss';

import alert1 from '../../assets/alert1.png';

@inject('popUpStore')
@observer
class PopUp extends Component{
	render(){
		const { popUpStore } = this.props;
		const {
			show,
			click,
			
			title,
			content,
			content2,
			
			handleShow,
			handleClick,
			getClick,
		} = popUpStore;

		if(!show) return null;
		if(click) {
			handleClick(false);
			handleShow(false);
			return <Redirect to = "/login"/>
		};
		
		return(
			<div className = "PopUpContainer">
				<div className = "PopUp fade in">
					<p className = "popup-header">
						{
							title !==null ? title : ''
						}
					</p>
					
					<div className = "popup-content">
						<img
							className = "alert-img"
							src = {alert1}
							alt = "경고창"
							/>
						<div className = "textWrapper">
							<p className = "popup-text">
								{
									content !==null ? content : ''
								}
							</p>
							<p className = "popup-text">
								{
									content2 !==null ? content2 : ''
								}
							</p>
						</div>
					</div>
					
					<div className = "buttonWrapper">
						<button
							className = "uk-button button primary"
							onClick = {()=>handleClick(true)}
							>
							확인
						</button>
						<button
							className = "uk-button button cancel"
							onClick = {()=>handleShow(false)}
							>
							취소
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default observer(PopUp);