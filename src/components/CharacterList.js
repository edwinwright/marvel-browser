import './CharacterList.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CharacterCard from './CharacterCard';

const CharacterList = ({ characters }) => {
  if (!characters) {
    return <div>Loading...</div>
  }
  return (
  	<ul className="CharacterList">
      {characters.map(({ id, name, thumbnail }) =>
        <li key={id} className="CharacterList__item">
          <Link to={'/characters/' + id}>
            <CharacterCard
              name={name}
              thumbURL={thumbnail.path + '.' + thumbnail.extension}
            />
          </Link>
        </li>
      )}
  	</ul>
  )
};

CharacterList.propTypes = {
  characters: React.PropTypes.array
};

export default CharacterList;
