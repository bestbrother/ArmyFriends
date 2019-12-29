import React from 'react';
import JobModifyItem from './JobModifyItem';

const JobModifyList = ({slices, handleView}) => {
	
	return(
		<table className="uk-table uk-table-divider">
			<tbody>
				{
					slices.map((slices, index)=>(
						<JobModifyItem key = {index} slices = {slices} handleView = {handleView}/>
					))
				}
			</tbody>
		</table>
	);
	
};

export default JobModifyList;