// import '../styles/CharacterContainer.scss';
import React, { createClass, PropTypes } from 'react';
import classNames from 'classnames';
import ImagePreloader from 'shared/utils/ImagePreloader';
import Character from '../components/Character';
import LoadingIcon from '../components/LoadingIcon';

import { getCharacter } from '../api/Characters';


const CharacterContainer = createClass({

	getDefaultProps() {
		return {}
	},

	getInitialState() {
		return {
			status: 'LOADING',
			character: {}
		}
	},

	componentDidMount() {
		getCharacter(this.props.params.id)
			.then(this.onDataLoaded)
			.catch(this.onDataError)
	},

	onDataLoaded(response) {
		const { data } = response;
		this.setState({
			status: 'LOADED',
			character: data.results[0]
		});
	},

	onDataError() {
		this.setState({
			status: 'ERROR'
		})
	},

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

});

export default CharacterContainer;
