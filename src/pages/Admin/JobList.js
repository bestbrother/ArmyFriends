import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

// CSS
import './scss/JobList.scss';

// basic
import JobListItem from './JobListItem';


@inject('adminJobStore')
@observer
class JobList extends Component{
	
	componentDidMount(){
		const { adminJobStore } = this.props;
		
		adminJobStore.getJobs();
		adminJobStore.getJobSlices();
	}
	
	
	render(){
		const { adminJobStore } = this.props;
		const {
			jobs,
			inputJob,
			handleJob,
			uploadJob,
			deleteJobs,
			handleChecked
		} = adminJobStore;
		
		let slices = [];
		const size = 4;
		if(jobs.length >= size){
			for(let i=0;i<jobs.length / size; i++){
				slices.push(jobs.slice(i * size, (i+1) * size));
			}	
		}else{
			slices[0] = jobs;
		}
		
		return (
			<div className = "JobList">
				<div className = "page-title">
					보직 - 추가, 삭제
				</div>
				<div className = "job-settings">
					<form onSubmit = {e=>e.preventDefault()}>
						<input 
							className = "uk-input job-add-input"
							type = "text"
							placeholder = "보직 입력"
							value = {inputJob}
							onChange = {handleJob}
							/>

						<button className = "uk-button uk-button-default job-add-btn" onClick = {uploadJob}>추가</button>
						<button className = "uk-button uk-button-danger job-delete-btn" onClick = {deleteJobs} >선택한 항목 삭제</button>
					</form>
				</div>
				
				<div className = "job-content">
					<table className="uk-table uk-table-divider">
						<tbody>
							{
								slices.map((slice, index)=>(
									<JobListItem 
										key = {index} 
										slices = {slice} 
										onChange = {handleChecked}
										/>
								))
							}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default observer(JobList);