import React from 'react'

function Spinner() {
    return (
        <div>
            <div className='container'>
                <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </div>
    )
}

export default Spinner