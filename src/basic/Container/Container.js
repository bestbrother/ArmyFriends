import React from 'react';

// basic
import Header from '../Header/Header';
import Loading from '../Loading/Loading';

// SCSS
import './Container.scss';

const Container = (props) => {
	
	const className = props.className;
	const className2 = props.className2;
	const header = props.header;
	const view = header && header.view ? header.view : false;
	const active = header && header.active ? header.active : '';
	
	return(
		<div className = {`ContainerWrapper ${className2}`}>
			{ view ? <Header position = {active}/> : null}
			<Loading loading = {props.loading ? props.loading : false} />
			
			<div className = {`Container` + `${className ? " "+className : ""}`}>
				{props.children}
			</div>
		</div>
	)
};

export default Container;