// Import CSS
import '../styles/CharacterListContainer.scss';

// Import JS
import React, { createClass } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import classNames from 'classnames';
import ImagePreloader from 'shared/utils/ImagePreloader';
import FilterList from '../components/FilterList';
import CharacterList from '../components/CharacterList';
import LoadingIcon from '../components/LoadingIcon';

import * as actions from '../actions/characters';

/**
 * CharacterListContainer
 */
const CharacterListContainer = createClass({

	getInitialState() {
		return {
			status: 'LOADING',
			attributionText: ''
		}
	},

	componentDidMount() {
    this.props.getCharacters();

		// getCharacters()
		// 	.then(this.onDataLoaded)
		// 	.catch(this.onDataError)
	},

	onFilterClick(value) {
		// Set status to loading and clear the data
		this.setState({
			status: 'LOADING',
			characters: []
		})

		// Request the resource
		getCharacters({ nameStartsWith: value })
			.then(this.onDataLoaded)
			.catch(this.onDataError);
	},

	onDataLoaded(response) {
		const { attributionText, data } = response;

		// Create a preloader and queue each image
		const ip = new ImagePreloader()
		ip.queue(data.results.map(({ thumbnail }) => (
			thumbnail.path + '.' + thumbnail.extension
		)))

		// Call preload and update the state when fulfilled
		ip.preload()
			.then(() => {
				this.setState({
					status: 'LOADED',
					characters: data.results,
					attributionText
				})
			})
	},

	onDataError() {
		this.setState({
			status: 'ERROR'
		})
	},

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

		const filters = []
		for (let i = 97; i <= 122; i++) {
			filters.push({
				label: String.fromCharCode(i).toUpperCase(),
				value: String.fromCharCode(i),
			})
		}

		return (
			<div className={classes.component}>
				<div className="CharacterBrowser__filter">
					<FilterList>
						{filters.map(({ label, value }) =>
							<FilterList.Item key={value}>
								<FilterList.Link
									onClick={(e) => {
										e.preventDefault()
										this.onFilterClick(value)
									}}
								>
									{label}
								</FilterList.Link>
							</FilterList.Item>
						)}
					</FilterList>
				</div>
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

});

console.log(actions);


export default connect(
  (state) => ({ characters: state.characters }),
  { getCharacters: actions.getCharacters }
)(CharacterListContainer);
