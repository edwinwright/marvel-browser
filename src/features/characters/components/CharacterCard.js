// Import CSS
import '../styles/CharacterCard.scss'

// Import JS
import React, { PropTypes } from 'react'

const CharacterCard = ({ name, imgUrl }) => (
	<div className="CharacterCard">
		<div className="CharacterCard__thumb" style={{backgroundImage: 'url(' + imgUrl + ')'}}></div>
		<div className="CharacterCard__name">{name}</div>
	</div>
)

CharacterCard.propTypes = {
	name: PropTypes.string,
	imgUrl: PropTypes.string
}

export default CharacterCard
