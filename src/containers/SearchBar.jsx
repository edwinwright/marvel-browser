import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const propTypes = {
  placeholder: PropTypes.string,
  isFetching: PropTypes.bool,
  onFormSubmit: PropTypes.func.isRequired,
};


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  handleInputChange(event) {
    this.setState({ term: event.target.value });
  }

  handleFormSubmit(event) {
    const { term } = this.state;
    event.preventDefault();
    if (term.length) {
      this.props.onFormSubmit(term);
      this.setState({ term: '' });
    }
  }

  render() {
    const { placeholder, isFetching } = this.props;
    return (
      <form onSubmit={event => this.handleFormSubmit(event)}>
        <input
          placeholder={placeholder}
          value={this.state.term}
          onChange={(event) => this.handleInputChange(event)} />
        <button
          type="submit"
          className="button"
          disabled={isFetching}>
          Search
        </button>
      </form>
    );
  }
}

SearchBar.propTypes = propTypes;

export default SearchBar;
