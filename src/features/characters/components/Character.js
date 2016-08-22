// Import CSS
// import '../styles/Character.scss'

// Import JS
import React, { PropTypes } from 'react';

const Character = ({ name, description, thumbnail }) => (
	<section className="Character">
    <h1 className="Character__name">{name}</h1>
		<div className="Character__description">{description}</div>
    <img className="Character__thumb" src={thumbnail} />
	</section>
);

export default Character;
