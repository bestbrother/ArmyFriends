import React, { Component } from 'react';
import * as local from '../../stores/localStorage';

// SCSS
import './scss/History.scss';

// basic
import Href from '../../basic/Href/Href';
import Pagination2 from '../../basic/Pagination/Pagination2';

class History extends Component{
	
	render(){
		const { activePage, handleActivePage } = this.props;
		const historyJobs = local.getMyJobs() || [];
		
		const PAGEPERCOUNT = 12;
		const firstIndex = (activePage -1) * PAGEPERCOUNT;
		const lastIndex = (activePage) * PAGEPERCOUNT;
		
		const historyJobList = historyJobs.slice(firstIndex, lastIndex).reverse().map(job=>(
			<Href url = {`/jobs/${job.id}`}>
				<div className = "JobItem">
					<div className = "topWrapper">
						<img 
							src = {job.thumbnail}
							className = "image"
							/>
					</div>
					<div className = "bottomWrapper">
						<p className = "title">
							{job.name}
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
				</div>
			</Href>
		));
		
		return(
			<div className = "History">
				<div className = "HistoryHeader">
					<p className = "HeaderTitle">
						추천받은 정보
					</p>
					
					<p className = "HeaderSubtitle">
						열어본 정보
					</p>
				</div>
				
				<div className = "HistoryJobList">
					{historyJobList}
				</div>
				
				{
					historyJobList.length !== 0 
					?
						<Pagination2
							length = {historyJobList.length}
							activePage={activePage}
							handleActivePage = {handleActivePage}
							PagePerCount={PAGEPERCOUNT}/>
					: null
				}
				
			</div>
		)
	}
}

export default History;