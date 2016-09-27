import './CharacterCard.scss';
import React, { PropTypes } from 'react';

const CharacterCard = ({ name, thumbURL }) => (
	<div className="CharacterCard">
		<div className="CharacterCard__thumb" style={{backgroundImage: 'url(' + thumbURL + ')'}}></div>
		<div className="CharacterCard__name">{name}</div>
	</div>
);

CharacterCard.propTypes = {
	name: PropTypes.string,
	thumbURL: PropTypes.string
};

export default CharacterCard;
