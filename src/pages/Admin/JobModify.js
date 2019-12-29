import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';

// basic
import JobModifyView from './JobModifyView';
import JobModifyList from './JobModifyList';

// css
import './css/modify.css';

@inject('adminJobStore')
@observer
class JobModify extends Component{
	
	constructor(props){
		super(props);
		
		this.state = {
			id : 0,
			view : false,
		};
	}
	
	componentDidMount(){
		const { adminJobStore } = this.props;
		
		adminJobStore.getJobs();
		adminJobStore.getJobSlices();
	}

	render(){
		const { id, view } = this.state;
		const { adminJobStore } = this.props;
		const { jobs } = adminJobStore;
		
		let slices = [];
		const size = 4;
		if(jobs.length >= size){
			for(let i=0;i<jobs.length / size; i++){
				slices.push(jobs.slice(i * size, (i+1) * size));
			}	
		}else{
			slices[0] = jobs;
		}	
		
		return(
			<div>
				
				
				{ 
					view 
						? 
							<JobModifyView id = {id} handleView = {this.handleView} /> 
						:
							<Fragment>
								<div className = "page-title">
									보직 - 수정
								</div>

								<JobModifyList slices = {slices} handleView = {this.handleView} />
							</Fragment>
				} 
				
			</div>
		)
	}
	
	handleView = (id, flag) => {
		this.setState({
			id,
			view : flag,
		});
	}
	
	
	
}

export default observer(JobModify);