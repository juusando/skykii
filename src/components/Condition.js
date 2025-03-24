import React from 'react';

const Condition = ({ weather }) => {
    if (!weather) return null;

    return (
        <>

            <div className="weather-details">
                <div>{weather.condition}</div>
            </div>
        </>
    );
};

export default Condition;