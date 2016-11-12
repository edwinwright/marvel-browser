import './Character.scss';
import React, { PropTypes } from 'react';


function Character({ name, description, thumbnail }) {
  return (
  	<section className="Character">
      <img className="Character__thumb" src={thumbnail} />
      <h1 className="Character__name">{name}</h1>
  		<div className="Character__description">{description}</div>
  	</section>
  )
};

export default Character;
