import React from 'react';

const Temperature = ({ weather }) => {
    if (!weather) return null;

    return (
        <>

            <div className="weather-details">
                <div>{weather.temperature}°</div>
                <div>H: {weather.maxTemp}°</div>
                <div>L: {weather.minTemp}°</div>
            </div>
        </>
    );
};

export default Temperature;