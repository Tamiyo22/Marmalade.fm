import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => (
	<header className="black mb5 pt5">
		<h1 className="ttu f3 tracked-mega anton tc mt0 mb3">Mel's Mix State 2019!</h1>
		<ul className="list flex justify-center p10">
			<li className="mh2">
				{/* we use NavLink to give us active styles when we are on the current page */}
				<NavLink exact to="/" className="nav-link link  biryani-black f6 ttu gray">
					Current Mixes{' '}
				</NavLink>
			</li>
			<li className="mh2">
				<NavLink to="/archive" className="nav-link link  biryani-black f6 ttu gray">
					Archive{' '}
				</NavLink>
			</li>
			<li className="mh2">
				<NavLink to="/about" className="nav-link link  biryani-black f6 ttu gray">
					About{' '}
				</NavLink>
			</li>
		</ul>
	</header>
);

export default Header;
