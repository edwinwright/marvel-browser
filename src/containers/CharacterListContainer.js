import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCharacters } from '../actions/characters';
import CharacterList from '../components/CharacterList';


class CharacterListContainer extends Component {
	componentDidMount() {
    if (!this.props.characters) {
      this.props.fetchCharacters();
    }
	}

	render() {
    const { characters, isFetching } = this.props;
		return (
			<CharacterList
        characters={characters}
        isFetching={isFetching} />
		)
	}
}

function mapStateToProps(state) {
  return {
    characters: state.characters.all,
    isFetching: state.characters.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCharacters }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterListContainer);
