import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

// SCSS
import './PopUp.scss';

@inject('popUpStore')
@observer
class PopUp2 extends Component{
	render(){
		const { popUpStore } = this.props;
		const {
			show2,
			click2,
			
			title2,
			content3,
			
			handleShow2,
			handleClick2,
			getClick,
		} = popUpStore;

		if(!show2) return null;
		
		return(
			<div className = "PopUpContainer">
				<div className = "PopUp PopUp2 fade in">
					<p className = "popup-header">
						{
							title2 !==null ? title2 : ''
						}
					</p>
					
					<div className = "popup-content">
						<div className = "textWrapper">
							<p className = "popup-text">
								{
									content3 !==null ? content3 : ''
								}
							</p>
						</div>
					</div>
					
					<div className = "buttonWrapper">
						<button
							className = "uk-button button primary"
							onClick = {()=>handleShow2(false)}
							>
							확인
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default observer(PopUp2);