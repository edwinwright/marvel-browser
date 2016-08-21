// Import CSS
import '../styles/CharacterList.scss';

// Import JS
import React, { PropTypes } from 'react';
import CharacterListItem from './CharacterListItem';

const CharacterList = ({ children }) => (
	<ul className="CharacterList">
		{children}
	</ul>
);

CharacterList.propTypes = {
  children: function (props, propName, componentName) {
    const prop = props[propName];

    // At last one component
    if (React.Children.count(prop) === 0) {
      return new Error(`'${componentName}' should have at least one child.`);
    }

    // Test component type
    React.Children.forEach(prop, (child) => {
      if (child.type !== CharacterListItem) {
        return new Error(`'${componentName}' children should all be 'CharacterListItem' components.`);
      }
    })
  }
};

CharacterList.Item = CharacterListItem;
export default CharacterList;
