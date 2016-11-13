import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Character from '../components/Character';
import { loadCharacter } from '../actions/characters';

class CharacterPage extends Component {
  componentWillMount() {
    this.props.loadCharacter(this.props.params.id);
  }

  render() {
    if (!this.props.character) {
      return <div>Loading...</div>
    }

    const { name, description, thumbnail } = this.props.character;
    return (
      <div>
        <Character
          name={name}
          description={description}
          thumbnail={`${thumbnail.path}.${thumbnail.extension}`}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { character: state.entities.characters[ownProps.params.id] };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadCharacter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterPage);
