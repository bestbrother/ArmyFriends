import React from 'react';
import { Link } from 'react-router-dom';
import * as local from '../../stores/localStorage';

// image
import logo from '../../assets/logo.png';

// SCSS
import './Header.scss';

const Header2 = ({position, logged}) => (
	<div className = "Header Header2">
		<div className = "topWrapper">
			<Link to="/" style={{ textDecoration: 'none', color : 'white' }}>
				<img
					className = "logo"
					src = {logo}
					alt = "logo"
					/>
			</Link>
			
			<div className = "menu-list">
				<p className = "menu">
					<Link to="/" style={{ textDecoration: 'none', color : 'white' }}>
						보직분류
					</Link>
				</p>
				<p className = "menu">
					<Link to="/board" style={{ textDecoration: 'none', color : 'white' }}>
						커뮤니티
					</Link>
				</p>
				<p className = "menu">
					<Link to="/my/1" style={{ textDecoration: 'none', color : 'white' }}>
						나의 Army Friend
					</Link>
				</p>
				<p className = "menu menu-last">
					{
						local.getLogged() 
						?
							<button
								className = "uk-button uk-button-small menu-btn"
								onClick = {()=>local.logout(this.props.history, this.forceUpdateHandler)}
								>
								{`로그아웃`}
							</button>
						:
							<Link to={`/login`} style={{ textDecoration: 'none', color : 'white' }}>
								<button
									className = "uk-button uk-button-small menu-btn"
									>
									{`로그인`}
								</button>
							</Link>
						
					}
				</p>
			</div>
		</div>
	</div>
);

export default Header2;