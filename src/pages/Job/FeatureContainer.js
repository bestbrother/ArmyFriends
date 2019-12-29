import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

// SCSS
import './scss/Feature.scss';

// img
import arrow_up from '../../assets/arrow_up.png';
import arrow_down from '../../assets/arrow_down.png';

@inject('jobStore') @observer
class FeatureContainer extends Component{
	
	componentDidMount(){
		const { jobStore } = this.props;
		jobStore.getFeatures();
	}
	
	render(){
		const { jobStore } = this.props;
		const {
			features,
			
			// 더보기, 숨기기 (전체)
			isHide,
			handleIsHide,
			
			// Feature 더보기, 숨기기
			hide,
			handleHide,
			
			// Option 체크
			checked,
			handleChecked,
		} = jobStore;
		
		const featureList = features && features.length !== 0 ?
			features.map((feature, index)=>{
				
				const featureHidePlus = feature.options.length >= 15 ? hide[feature.id] === true ? "" : "none" : "none";
				const featureHideMinus = feature.options.length >= 15 ? hide[feature.id]===false ? "" : "none" : "none";
				
				return(
					<div className = "FeatureItem" key = {feature.id}>
						<div className = "FeatureItemText">
							<span>
								{feature.name ? feature.name : ""}
							</span>
							<span className = {`hide ${featureHidePlus}`} onClick = {()=>handleHide(feature.id)} key = {`1`}>
								+
							</span>
							<span className = {`hide ${featureHideMinus}`} onClick = {()=>handleHide(feature.id)} key = {`2`}>
								-
							</span>
						</div>

						<div className = "OptionList">
							{
								feature.options && feature.options.map((option, index)=>{
									const featureId = feature.id;
									const optionId = option.id;
									
									return(
										<div 
											key = {option.id} 
											className = {`OptionItem ${index > 15  && hide[feature.id] === true ? " none" : ""}`}
											
											>
											<input 
												className = "uk-checkbox OptionCheckbox"
												type = "checkbox"
												name = {option.id}
												onChange = {(e)=>handleChecked(e, {feature : featureId, option : optionId})}
												/>
											<span className = "OptionItemText">
												{option.name ? option.name : ""}
											</span>
										</div>
									);
								})
							}
						</div>
					</div>
				);
			})
		: null;
		
		return(
			<div className = "FeatureContainer">
				<div className = "HeaderContainer">
					<p className ="HeaderTitle">
						보직 분류
					</p>

					<p className = "HeaderSubtitle">
						자신에게 맞는 보직을 찾아보세요!
					</p>
				</div>

				<div className = "FeatureList">
					{featureList}
				</div>
				
				<div className = "isHide" onClick = {handleIsHide}>
					<p className ="isHideText">
						{isHide ? "더보기" : "숨기기"}
					</p>
					<div className = "isHideImageContainer">
						<img
							className = "isHideImage"
							src = {isHide ? arrow_down : arrow_up} 
							alt = "arrow_up_down" />
					</div>
				</div>

			</div>
		)
	}
}

export default observer(FeatureContainer);