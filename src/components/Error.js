import React from 'react'

function Error(props) {
    return (
        <div className="error">
            <i className="ri-error-warning-line error-icon"></i>
            <h1>Error</h1><br />
            <h3>{props.error}</h3>
        </div>
    )
}

export default Error