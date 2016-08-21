// Import CSS
import '../styles/GlobalNav.scss'

// Import JS
import React from 'react'
import GlobalNavLink from './GlobalNavLink'

const GlobalNav = () => (
	<nav className="GlobalNav">
		<ul className="GlobalNav__list">
			<li className="GlobalNav__item">
				<GlobalNavLink to="/characters">Characters</GlobalNavLink>
			</li>
		</ul>
	</nav>
)

export default GlobalNav
