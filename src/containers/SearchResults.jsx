import React, { Component, PropTypes } from 'react';
import CharacterList from '../components/CharacterList';

const propTypes = {
  characters: PropTypes.array,
  total: PropTypes.number,
  isFetching: PropTypes.bool,
  onLoadMoreClick: PropTypes.func.isRequired,
};

class SearchResults extends Component {
  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props;
    return (
      <button
        className="button"
        onClick={onLoadMoreClick}
        disabled={isFetching}
      >
        {isFetching ? 'Loading...' : 'Load More'}
      </button>
    );
  }

  render() {
    const { characters, total, isFetching } = this.props;
    const loadMore = characters.length < total ? this.renderLoadMore() : null;
    return (
      <div>
        <CharacterList
          characters={characters}
          isFetching={isFetching}
        />
        {loadMore}
      </div>
    );
  }
}

SearchResults.propTypes = propTypes;

export default SearchResults;
