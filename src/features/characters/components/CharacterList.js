// Import CSS
import '../styles/CharacterList.scss';

// Import JS
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CharacterCard from './CharacterCard';

const CharacterList = ({ characters }) => (
	<ul className="CharacterList">
    {characters.map(({ id, name, thumbnail }) =>
      <li key={id} className="CharacterList__item">
        <Link to={'/characters/' + id}>
          <CharacterCard
            name={name}
            imgUrl={thumbnail.path + '.' + thumbnail.extension}
          />
        </Link>
      </li>
    )}
	</ul>
);

CharacterList.propTypes = {
  characters: React.PropTypes.array
};

export default CharacterList;
