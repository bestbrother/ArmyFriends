import React, { Component } from 'react';


// PropTypes
import PropTypes from 'prop-types';

// SCSS
import './Search.scss';

// img
import search_icon from '../../assets/search_icon.png';


export default class Search extends Component{
	
	render(){
		const {
			type,
			className,
			name,
			input,
			handleInput,
			handleSelect,
			search,
		} = this.props;
		
		return(
			<div className = {className ? className : "SearchWrapper"}>
				<form className = "Search" onSubmit = {e=>e.preventDefault()}>
					<input
						className = {className ? "SearchInput SearchInput2" : "SearchInput"}
						type={type}
						value={input}
						name={name}
						onChange={handleInput}
						/>
					
					{
						className 
						?
							<div className = "SelectInput2">
								보직검색
							</div>
						:
							<select className="SelectInput" onChange = {handleSelect}>
								<option className = "item" value = {"title"}>제목</option>
								<option className = "item" value = {"both"} >제목+내용</option>
								<option className = "item" value = {"content"}>내용</option>
							</select>	
					}

					<img
						className = "img"
						src = {search_icon}
						alt = "search"
						onClick = {search}
						/>
					
					<button
						className = "search-btn"
						onClick = {search}
						/>
				</form>
			</div>
		)
	}
}

Search.propTypes = {
	type : PropTypes.string,
	className : PropTypes.string,
	name : PropTypes.string,
	input : PropTypes.string,
	handleInput : PropTypes.func,
	handleSelect : PropTypes.func,
	search : PropTypes.func,	
};