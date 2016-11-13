import React, { PropTypes } from 'react';
import './CharacterCard.scss';

const propTypes = {
  name: PropTypes.string,
  thumbURL: PropTypes.string,
};

const CharacterCard = ({ name, thumbURL }) => (
  <div className="CharacterCard">
    <div className="CharacterCard__thumb" style={{ backgroundImage: `url(${thumbURL})` }} />
    <div className="CharacterCard__name">{name}</div>
  </div>
);

CharacterCard.propTypes = propTypes;

export default CharacterCard;
