import React from 'react';

const JobHomeList = ({features, handleFeature, handleOptions, handleHide, addSmall}) => {
	{/* Object 변경될때 어떻게 해야하는가? How to track nested object  => 값은 변경되는데 값 변경되는걸 track 하지 못하고 rendering 하지 못하고 있음.*/}
	
	return features.map((feature, index)=>(
		<tr key = {index}>
			<td>
				<input
					className = "uk-input input-big"
					type = "text" 
					placeholder = "대항목"
					name = {index}
					value = {feature.name}
					onChange = {handleFeature}
					/>
			</td>
			<td>
				<button
					className = "uk-button uk-button-default"
					onClick = {()=>addSmall(index)}
					>
					추가
				</button>
			</td>
			<td>
				{
					feature.options.map((option, option_index)=>(
						<input
							key = {option_index}
							className = "uk-input input-small"
							type = "text"
							placeholder = "소항목"
							name = {index}
							value = {option.name}
							onChange = {(e)=>handleOptions(option_index, e)}
							/>
					))
				}
				
			</td>
			<td>
				<input
					className = "uk-checkbox"
					type = "checkbox"
					name = {index}
					value = {feature.isHide}
					defaultChecked = {feature.isHide}
					onChange = {handleHide}
					/>
			</td>
		</tr>
	));
};

export default JobHomeList;