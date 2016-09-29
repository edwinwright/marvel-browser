import './CharacterListContainer.scss';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import ImagePreloader from 'services/utils/ImagePreloader';
import FilterList from '../components/FilterList';
import CharacterList from '../components/CharacterList';
import LoadingIcon from '../components/LoadingIcon';
import * as actions from '../actions/characters';


class CharacterListContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			status: 'LOADING',
			attributionText: ''
		};
	}

	componentDidMount() {
    this.props.fetchCharacters();
	}

	render() {
    const { characters } = this.props;
		const { status, attributionText } = this.state;

		// Determine class names
		const isLoading = () => status === 'LOADING'
		const classes = {
			component: classNames('CharacterBrowser', {
				'is-loading': isLoading()
			})
		}

		return (
			<div className={classes.component}>
				<div className="CharacterBrowser__list">
					<CharacterList characters={characters} />
				</div>
				<div className="CharacterBrowser__loader">
					<LoadingIcon/>
				</div>
				<p>{attributionText}</p>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    characters: state.characters
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCharacters: actions.fetchCharacters
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterListContainer);
