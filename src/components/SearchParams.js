import React, { useState } from 'react'

function SearchParams(params) {

    const [ value, setValue ] = useState('')
    const [ unit, setUnit ] = useState('metric')

    function setParams(e) {
        e.preventDefault()
        params.setParams(value, unit)
    }

    return (
        <form onSubmit={(e) => setParams(e)}>
            <div className="search-input">
                <i class="ri-search-line"></i>
                <input 
                    type="text" 
                    placeholder="Search for any city..." 
                    onChange={(e) => setValue(e.target.value)}
                    value={value}>
                </input>
            </div>
            <label htmlFor="metric">Metric</label>
            <input 
                type="radio" 
                name="metric" 
                value="metric" 
                checked={unit === 'metric'}
                onChange={(e) => setUnit(e.target.value)}>
            </input>
            <label htmlFor="imperial">Imperial</label>
            <input 
                type="radio" 
                name="imperial"
                value="imperial"
                checked={unit === 'imperial'}
                onChange={(e) => setUnit(e.target.value)}>
            </input>
        </form>
    )
}

export default SearchParams