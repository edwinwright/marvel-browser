import './CharacterList.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CharacterCard from './CharacterCard';
import LoadingIcon from './LoadingIcon';

function CharacterList({ characters, isFetching }) {
  const loader = isFetching ? <LoadingIcon/> : null;

  if (!characters) {
    return <div>{loader}</div>
  }

  return (
    <div>
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
      {loader}
    </div>
  )
};

CharacterList.propTypes = {
  characters: React.PropTypes.array
};

export default CharacterList;
