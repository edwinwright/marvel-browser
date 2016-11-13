import React, { PropTypes } from 'react';
import './Character.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

function Character({ name, description, thumbnail }) {
  return (
    <section className="Character">
      <img className="Character__thumb" src={thumbnail} alt="" />
      <h1 className="Character__name">{name}</h1>
      <div className="Character__description">{description}</div>
    </section>
  );
}

Character.propTypes = propTypes;

export default Character;
