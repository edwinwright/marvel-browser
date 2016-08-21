// Import CSS
import '../styles/CharacterBrowser.scss'

// Import JS
import React, { createClass } from 'react'
import { Link } from 'react-router'
import { MARVEL_PUBLIC_KEY } from 'config/config'
import classNames from 'classnames'
import { getJSON } from 'shared/utils/XHR'
import ImagePreloader from 'shared/utils/ImagePreloader'
import FilterList from './FilterList'
import CharacterList from './CharacterList'
import CharacterCard from './CharacterCard'
import LoadingIcon from './LoadingIcon'


const BASE_URL = 'https://gateway.marvel.com/v1/public/characters'

/**
 * CharacterBrowser
 */
const CharacterBrowser = createClass({

  // displayName: 'Character Browser',

	getDefaultProps() {
		return {}
	},

	getInitialState() {
		return {
			status: 'LOADING',
			characters: [],
			attributionText: ''
		}
	},

	componentDidMount() {
		const url = `${BASE_URL}?orderBy=name&apikey=${MARVEL_PUBLIC_KEY}`
		getJSON(url)
			.then(this.onDataLoaded)
			.catch(this.onDataError)
	},

	onFilterClick(value) {
		const url = `${BASE_URL}?nameStartsWith=${value}&orderBy=name&apikey=${MARVEL_PUBLIC_KEY}`

		// Set status to loading and clear the data
		this.setState({
			status: 'LOADING',
			characters: []
		})

		// Request the resource
		getJSON(url)
			.then(this.onDataLoaded)
			.catch(this.onDataError)
	},

	onDataLoaded(response) {
		const { attributionText, data } = response

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
		const { status, characters, attributionText } = this.state

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
					<CharacterList>
						{characters.map(({ id, name, thumbnail }) =>
							<CharacterList.Item key={id}>
								<CharacterCard
									name={name}
									imgUrl={thumbnail.path + '.' + thumbnail.extension}
								/>
							</CharacterList.Item>
						)}
					</CharacterList>
				</div>
				<div className="CharacterBrowser__loader">
					<LoadingIcon/>
				</div>
				<p>{attributionText}</p>
			</div>
		)
	}

})

export default CharacterBrowser
