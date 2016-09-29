import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/characters';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' }
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          placeholder="Character name begins with..."
          value={this.term}
          onChange={this.onInputChange} />
        <button type="submit">Search</button>
      </form>
    );
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    const { term } = this.state;
    event.preventDefault();
    if (term.length) {
      this.props.fetchCharacters(term);
      this.setState({ term: '' });
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCharacters: actions.fetchCharacters
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
