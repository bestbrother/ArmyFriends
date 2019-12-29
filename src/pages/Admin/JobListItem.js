import React from 'react';

const JobListItem = ({slices, onChange}) => {
	
	return(
		<tr>
			{
				slices.map((slice, index)=>(
					<td key = {slice.id}>
						<label>
							<input 
								className="uk-checkbox checkbox" 
								type="checkbox"
								onChange = {onChange}
								name = {slice.id}
								/>
							{slice.name}
						</label>
					</td>
				))
			}
		</tr>
	);
};

export default JobListItem;