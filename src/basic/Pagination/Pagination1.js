import React, { Component } from 'react';
import Pagination from "react-js-pagination";

import PropTypes from 'prop-types';

// img 
import left_arrow from '../../assets/pagination/left.png';
import right_arrow from '../../assets/pagination/right.png';

// SCSS
import './Pagination.scss';

export default class Pagination1 extends Component{
	
	render(){
		const{
			length,
			activePage,
			handleActivePage,
			PagePerCount
		} = this.props;
		
		let left = <img className = "arrow arrow-left" src = {left_arrow} alt = "left"/>;
		let right = <img className = "arrow arrow-right" src = {right_arrow} alt = "right"/>;
		
		
		return(
			<div className = "PaginationWrapper">
				<div className = "Pagination Pagination1">
					<Pagination
							activePage={activePage}
							itemsCountPerPage={PagePerCount}
							totalItemsCount={length}
							onChange={handleActivePage}
						
							activeClass = "page-number-active"
						
							itemClass = "page-number"
							hideFirstLastPages = {true}
						
							prevPageText = {left}
							nextPageText = {right}
						/>
				</div>
			</div>
		);
	}
}

Pagination1.propTypes = {
	length : PropTypes.number,
	activePage : PropTypes.number,
	handleActivePage : PropTypes.func,
	PagePerCount : PropTypes.number,
}