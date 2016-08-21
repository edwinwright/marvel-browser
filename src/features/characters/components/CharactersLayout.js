// Import JS
import React from 'react';
import CharacterBrowser from './CharacterBrowser';

const CharactersLayout = () => (
	<section className="CharactersLayout">
    <div className="container">
  		<h1>Marvel Characters</h1>
  		<CharacterBrowser/>
    </div>
	</section>
);

export default CharactersLayout;
