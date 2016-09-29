// import './CharacterContainer.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { getCharacter } from '../services/api/characters';
import ImagePreloader from '../services/utils/ImagePreloader';
import Character from '../components/Character';
import LoadingIcon from '../components/LoadingIcon';


class CharacterContainer extends Component {
  constructor(props) {
    super(props);
  }

	componentDidMount() {
		getCharacter(this.props.params.id)
			.then(this.onDataLoaded)
			.catch(this.onDataError)
	}

	onDataLoaded(response) {
		const { data } = response;
		this.setState({
			status: 'LOADED',
			character: data.results[0]
		});
	}

	onDataError() {
		this.setState({
			status: 'ERROR'
		})
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

export default CharacterContainer;
