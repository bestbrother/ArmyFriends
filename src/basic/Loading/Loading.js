import React from 'react';

// SCSS
import './Loading.scss';

const Loading = ({loading}) => {
	
	if(!loading) return null;
	
	return(
		<div className = "LoadingContainer">
			<div className = "Loading">
				<div className="lds-ring">
					<div>
					</div>
					<div>
					</div>
					<div>
					</div>
					<div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Loading;