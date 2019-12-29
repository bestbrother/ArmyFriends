import React from 'react';
import { Link } from 'react-router-dom';

// basic
import Href from '../../basic/Href/Href';

// local
import * as localStorage from '../../stores/localStorage';

const RecommendJobList = ({jobId}) => {
	if(!jobId) return null;
	
	const jobs = localStorage.getJobs();
	let jobElements = [];
	
	if(jobs && jobs.length !== 0){
		jobElements = jobs.map(job=>{
			const nowJob = `${jobId}` === `${job.id}` ? true : false;
			
			return(
				<div className = {`RecommendJobItem ${nowJob ? "active" : ""}`} key = {job.id}>
					<Href url = {`/jobs/${job.id}`}>
						<p className = "name">{job.name}</p>
					</Href>
				</div>
			);
		});
	}
	
	return(
		<div className = "RecommendJobList">
			<p className = "RecommendHeader">
				추천받은 보직
			</p>
			<div className = "scroll">
				{jobElements}
			</div>
		</div>
	);
}

export default RecommendJobList;