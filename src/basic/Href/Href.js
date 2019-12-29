import React from 'react';

const Href = (props) => {
	const URL = props.url;
	const className = props.className;
	
	return(
		<div className = {className} onClick = {()=>window.location.assign(URL)}>
			{props.children}
		</div>
	)
};

export default Href;