import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// CSS
import './css/job.css';

// basic
import JobHomeList from './JobHomeList';

@inject('adminFeatureStore')
@observer
class JobHome extends Component{
	
	componentDidMount(){
		const { adminFeatureStore } = this.props;
		
		adminFeatureStore.getFeatures();
	}


	render(){
		const { adminFeatureStore } = this.props;
		const { 
			features, 
			handleFeature, 
			handleOptions, 
			handleHide,
			addSmall, 
			addBig, 
			compareFeatures, 
			deleteFeatures 
		} = adminFeatureStore;
		
		return(
			<div className = "jobHome">
				<div className = "page-title">
					보직분류 관리
				</div>
				
				<div className = "btn-container">
					<button className = "uk-button uk-button-primary btn" onClick = {compareFeatures} >저장</button>
					<button className = "uk-button uk-button-danger btn" onClick = { deleteFeatures } >삭제</button>
				</div>
				
				<div className = "admin-info">
					<ul>
						<li>저장 : 대항목, 소항목을 추가 또는 수정한 항목들을 모두 저장합니다.</li>
						<li className = "info-delete">
							삭제 : [주의] 서버(데이터베이스)에 있는 자료들만 삭제합니다.
							<br/>
							공란으로 두신 상태로 삭제버튼을 누르면 삭제가 되며, 대항목을 삭제할 경우 그 곳에 딸려오는 소항목들은 자연스럽게 삭제됩니다.
							<br/>
							숨기기 기능 : 추가를 할 때 이름만 먼저 추가하는 형식이기 때문에 추가와 숨기기기능 체크가 동시에 안됩니다.
							<br/>
							추가하신 경우에는 추가를 한 후 저장을 하고, 그 다음 숨기기 체크한 후 저장해주세요.
						</li>
					</ul>
				</div>
				
				<table className="uk-table uk-table-divider table">
					<thead>
						<tr>
							<th className = "uk-width-small">대항목</th>
							<th className = "uk-width-small">소항목 추가</th>
							<th>소항목</th>
							<th>숨기기</th>
						</tr>
					</thead>
					<tbody>
						<JobHomeList 
							features = {features}
							handleFeature = {handleFeature}
							handleOptions = {handleOptions}
							handleHide = {handleHide}
							addSmall = {addSmall}
							/>
						<tr>
							<td>
								<button 
									className = "uk-button uk-button-primary"
									onClick = {addBig}
									>
									대항목 추가
								</button>
							</td>
						</tr>
						
					</tbody>
				</table>
			</div>
		)
	}
	

	
	
}

export default observer(JobHome);