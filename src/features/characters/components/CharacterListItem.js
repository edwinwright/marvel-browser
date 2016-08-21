// Import JS
import React, { PropTypes } from 'react'

const CharacterListItem = ({ children }) => (
  <li className="CharacterList__item">
    {children}
  </li>
);

CharacterListItem.propTypes = {
  children: PropTypes.node
};

export default CharacterListItem;
