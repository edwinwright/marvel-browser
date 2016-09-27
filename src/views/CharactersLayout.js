import React from 'react';
import CharacterListContainer from '../containers/CharacterListContainer';

const CharactersLayout = () => (
	<section className="CharactersLayout">
    <div className="container">
  		<h1>Marvel Characters</h1>
  		<CharacterListContainer/>
    </div>
	</section>
);

export default CharactersLayout;
