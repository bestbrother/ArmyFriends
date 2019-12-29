import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import queryString from 'query-string';

import Header from '../../basic/Header/Header';
import Footer from '../../basic/Footer/Footer';
import Search from '../../basic/Search/Search';

@observer
@inject('jobStore')
class JobSearch extends Component{
	
	componentDidMount(){
		const { jobStore, history, query } = this.props;
		const {
			getSearchJobs
		} = jobStore;
		
		if(query && query.title) getSearchJobs(history, query.title);
	}
	
	render(){
		const { jobStore, history, query } = this.props;
		const {
			handleInput, 
			inputSearch,
			handleSearchBar,
			
			jobSearched,
		} = jobStore;
		
		let jobSearchedElements = [];
		if(jobSearched && jobSearched.length !== 0){
			jobSearchedElements = jobSearched.map(job=>(
				<div className = "JobSearchItem" key = {job.id} onClick = {()=>history.push(`/job/${job.id}`)}>
					<div className = "topWrapper">
						<p className = "name">{job.name}</p>
					</div>
					<div className = "bottomWrapper">
						<p className = "description">{job.description}</p>
					</div>
				</div>
			));
		}
		
		return(
			<div className = "JobSearch">
				<Header position = "job" />
				
				<div className = "JobSearchList">
					<div className = "JobSearchHeader">
						<p className = "title">보직 정보</p>
						
						<Search
							type = "text"
							className = "JobSearchBar"
							name = "search"
							input = {inputSearch}
							handleInput = {handleInput}
							search = {()=>handleSearchBar(this.props.history)}
							/>
					</div>
					
					{jobSearchedElements}
				</div>
			</div>
		);
	}
}

export default observer(JobSearch);