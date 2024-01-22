import React from 'react'

function Loder() {
    return (
        <div>
            <div className='container text-center' >
            <div className="spinner-border text-dark position-absolute top-50 start-50" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>
        </div>
    )
}

export default Loder