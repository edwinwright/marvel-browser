import React from 'react';
import SearchBar from '../containers/SearchBar';
import CharacterListContainer from '../containers/CharacterListContainer';

const CharactersLayout = () => (
	<section className="CharactersLayout">
    <div className="container">
  		<h1>Marvel Characters</h1>
      <SearchBar />
  		<CharacterListContainer/>
    </div>
	</section>
);

export default CharactersLayout;
