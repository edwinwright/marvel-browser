import './Character.scss';
import React, { PropTypes } from 'react';

export const cssClass = {
  name: 'Character__name',
  description: 'Character__description',
  thumbnail: 'Character__thumb'
};

const Character = ({ name, description, thumbnail }) => (
	<section className="Character">
    <h1 className="Character__name">{name}</h1>
		<div className="Character__description">{description}</div>
    <img className="Character__thumb" src={thumbnail} />
	</section>
);

export default Character;
