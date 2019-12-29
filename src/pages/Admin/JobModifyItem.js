import React from 'react';

const JobModifyItem = ({slices, handleView}) => {
	
	return(
		<tr>
			{
				slices.map((slice)=>(
					<td key = {slice.id} onClick = {()=>handleView(slice.id, true)}>
						{slice.name}
					</td>
				))
			}
		</tr>
	);
};


export default JobModifyItem;