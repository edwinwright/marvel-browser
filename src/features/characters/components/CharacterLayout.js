// Import JS
import React from 'react';
import CharacterContainer from '../containers/CharacterContainer';

const CharacterLayout = (props) => (
	<section className="CharacterLayout">
    <div className="container">
      <CharacterContainer {...props} />
    </div>
	</section>
);

export default CharacterLayout;
