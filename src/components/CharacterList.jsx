import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CharacterCard from './CharacterCard';
import LoadingIcon from './LoadingIcon';
import './CharacterList.scss';

const propTypes = {
  characters: PropTypes.array,
  isFetching: PropTypes.bool,
};

function CharacterList({ characters, isFetching }) {
  const loader = isFetching ? <LoadingIcon /> : null;

  if (!characters) {
    return <div>{loader}</div>;
  }

  const listItems = characters.map(({ id, name, thumbnail }) => (
    <li key={id} className="CharacterList__item">
      <Link to={`/characters/${id}`}>
        <CharacterCard
          name={name}
          thumbURL={`${thumbnail.path}.${thumbnail.extension}`}
        />
      </Link>
    </li>
  ));

  return (
    <ul className="CharacterList">
      {listItems}
    </ul>
  );
}

CharacterList.propTypes = propTypes;

export default CharacterList;
