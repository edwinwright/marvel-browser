import '../styles/FilterList.scss';
import React, { PropTypes } from 'react';

const FilterList = ({ children }) => (
	<ul className="FilterList">
		{children}
	</ul>
);

const FilterListItem = ({ children }) => (
	<li className="FilterList__item">
		{children}
	</li>
);

const FilterListLink = ({ active, children, onClick }) => {
	if (active) {
		return <span>{children}</span>
	}
	return (
		<a href="#"
			className="FilterList__link"
			onClick={onClick}>
			{children}
		</a>
	);
};

FilterList.propTypes = {
  children: function (props, propName, componentName) {
    const prop = props[propName];

    // At last one component
    if (React.Children.count(prop) === 0) {
      return new Error(`'${componentName}' should have at least one child.`)
    }

    // Test component type
    React.Children.forEach(prop, (child) => {
      if (child.type !== FilterListItem) {
        return new Error(`'${componentName}' children should all be 'FilterListItem' components.`)
      }
    })
  }
};

FilterListItem.propTypes = {
  children: function (props, propName, componentName) {
    const prop = props[propName];

    // At last one component
    if (React.Children.count(prop) !== 1) {
      return new Error(`'${componentName}' should have exactly one child.`)
    }

    // Test component type
    if (React.Children.only(prop).type !== FilterListLink) {
      return new Error(`'${componentName}' child should be a 'FilterListLink' component.`)
    }
  }
};

FilterListLink.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func
};

FilterList.Item = FilterListItem;
FilterList.Link = FilterListLink;
export default FilterList;
