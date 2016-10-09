import React from 'react';
import CharacterContainer from '../containers/CharacterContainer';

const CharacterPage = (props) => (
	<section className="CharacterPage">
    <div className="container">
      <CharacterContainer {...props} />
    </div>
	</section>
);

export default CharacterPage;
