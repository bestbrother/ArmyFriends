import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

// SCSS
import './scss/Jobs.scss';

// localStorage
import { saveJobs } from '../../stores/localStorage';

// basic
import Href from '../../basic/Href/Href';
import Pagination1 from '../../basic/Pagination/Pagination1';

@inject('jobStore')
@observer
class JobContainer extends Component{
	
	componentDidMount(){
		const { jobStore } = this.props;
		jobStore.getJobs();
	}
	
	render(){
		const { jobStore } = this.props;
		const { 
			jobs,
			jobSelected,
			
			// 가나다순, 조회순, 낮은경쟁률 순 정렬
			SORT,
			handleSort,
			compareMethod, // 정렬 메소드
			
			// pagination
			activePage,
			handleActivePage,
			
			// 체크됨
			checked,
		} = jobStore;
		
		// 정렬 시작 - 아무것도 없을시에는 View에서 보여지지 말아야함
		let jobSorted = [];
		
		if(jobSelected.length !== 0) jobSorted = jobSelected.slice().sort(compareMethod);
		else if(jobSelected.length === 0 && checked.length !== 0) jobSorted = jobSelected.slice().sort(compareMethod);
		else jobSorted = jobs.slice().sort(compareMethod);
		
		// 페이지
		const PAGEPERCOUNT = 40;
		const firstIndex = (activePage - 1) * PAGEPERCOUNT;
		const lastIndex = (activePage) * PAGEPERCOUNT;
		
		// 대항목, 소항목을 통해 체크항목으로 분류된 보직들을 저장
		saveJobs(jobSorted);
		
		const jobList = jobs && jobs.length !== 0 ?
			  jobSorted.slice(firstIndex, lastIndex).map((job, index)=>{
				return(
					<Href
						key = {job.id}
						className = "JobItem"
						url = {`/jobs/${job.id}`}>
					
						<div className = "topWrapper">
							<img 
								src = {job.thumbnail}
								className = "thumbnail"
								/>
						</div>
						
						<div className = "bottomWrapper">
							<p className = "title">
								{job.name ? job.name : ""}
							</p>
							<p className = "description">
								{/*job.description*/}
							</p>
							<div className = "info">
								<p className = "views">
									조회수<br/>{job.views}
								</p>
								<p className = "rate">
									경쟁률<br/>{job.rate} : 1
								</p>	
							</div>
						</div>
					</Href>
				);
			  })
		: null;
		
		
		
		return(
			<div className = "JobContainer">
				<div className = "JobContainerHeader">
					<span 
						className ={`SortingButton ${SORT === 1 ? "active" : ""}`}
						onClick = {()=>handleSort(1)}>
						가나다순
					</span>
					<span 
						className ={`SortingButton ${SORT === 2 ? "active" : ""}`}
						onClick = {()=>handleSort(2)}>
						조회순
					</span>
					<span 
						className ={`SortingButton ${SORT === 3 ? "active" : ""}`}
						onClick = {()=>handleSort(3)}>
						낮은 경쟁률 순
					</span>
				</div>
				
				<div className = "JobList">
					{jobList}
				</div>
			
				<div className = "JobContainerBottom">
					<Pagination1
						length = {jobSorted.length}
						activePage = {activePage}
						handleActivePage = {handleActivePage}
						PagePerCount = {PAGEPERCOUNT}
						/>
				</div>
			</div>
		);
	}
}

export default observer(JobContainer);