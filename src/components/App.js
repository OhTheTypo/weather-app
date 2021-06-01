import React, { useState, useEffect } from 'react'
import SearchParams from './SearchParams'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'
import Error from './Error'

function App() {

	const [ location, setLocation ] = useState('London')
	const [ unit, setUnit ] = useState('metric')
	const [ error, setError ] = useState(null)

	useEffect(() => {

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getResult, showError)
		} else {
			setError('Geolocation is not supported by this browser')
		}

		function getResult(position) {
			setError(null)
			const coords = {
				lat: position.coords.latitude,
				lon: position.coords.longitude
			}
			setLocation(coords)
		}

		function showError(error) {
			setError(error.message)
		}

	}, [])

    function setParams(location, unit) {
		setError(null)
		setLocation(location)
		setUnit(unit)
	}

	function displayUnit(unit) {
		return unit === 'metric' ? '°C' : '°F'
	}

	if (error) {
		return (
			<div>
				<SearchParams setParams={setParams} />
				<Error error={error} />
			</div>
		)
	} else {
		return (
			<div>
				<SearchParams setParams={setParams} />
				<div className="container">
					<CurrentWeather params={{ location, unit }} displayUnit={displayUnit} error={error} />
					<Forecast params={{ location, unit }} displayUnit={displayUnit} />
				</div>
			</div>
		);
	}

}

export default App
