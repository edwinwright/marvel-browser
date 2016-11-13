import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadCharacters } from '../actions/characters';
import SearchBar from '../containers/SearchBar';
import SearchResults from '../containers/SearchResults';


const propTypes = {
  pagination: PropTypes.object,
  characters: PropTypes.array,
};

const defaultProps = {};

const contextTypes = {
  router: React.PropTypes.object
}


class SearchPage extends Component {
  componentWillMount() {
    this.props.loadCharacters(this.props.params.term);
  }

  handleFormSubmit(term) {
    this.context.router.push(`/search/${term}`);
    this.props.loadCharacters(term);
  }

  handleLoadMoreClick() {
    this.props.loadCharacters(this.props.params.term, true);
  }

  render() {
    const { characters, pagination} = this.props;
    if (!pagination) return <div>Loading...</div>;
    return (
      <section className="SearchPage">
        <div className="container">
          <SearchBar
            placeholder="Name begins with..."
            isFetching={pagination.isFetching}
            onFormSubmit={term => this.handleFormSubmit(term)} />
          <SearchResults
            characters={characters}
            total={pagination.total}
            isFetching={pagination.isFetching}
            onLoadMoreClick={() => this.handleLoadMoreClick()} />
        </div>
      </section>
    );
  }
}

SearchPage.propTypes = propTypes;
SearchPage.contextTypes = contextTypes;


function selectCharactersByTerm(state, term) {
  const {
    pagination: { charactersByTerm },
    entities: { characters }
  } = state;
  return charactersByTerm[term] &&
    charactersByTerm[term].ids.map(id => characters[id]);
}

function mapStateToProps(state, ownProps) {
  const { term } = ownProps.params;
  return {
    pagination: state.pagination.charactersByTerm[term],
    characters: selectCharactersByTerm(state, term),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadCharacters }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
