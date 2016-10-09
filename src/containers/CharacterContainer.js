import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCharacter } from '../services/api/characters';
import Character from '../components/Character';

class CharacterContainer extends Component {
	componentDidMount() {
		this.props.fetchCharacter(this.props.params.id);
	}

	render() {
		const { status, character: {
			name, description, thumbnail
		}} = this.state;

		console.log(this.state)

		// Determine class names
		const isLoading = () => status === 'LOADING';
		const classes = {
			component: classNames('Character', {
				'is-loading': isLoading()
			})
		};

		const content = (isLoading()) ? (
			<LoadingIcon />
		) : (
			<Character
				name={name}
				description={description}
				thumbnail={thumbnail.path + '.' + thumbnail.extension}
			/>
		)

		return (
			<div className={classes.component}>
				{content}
			</div>
		);
	}
}

function mapStateToProps(state) {
  return { character: state.character };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCharacter }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterContainer);
