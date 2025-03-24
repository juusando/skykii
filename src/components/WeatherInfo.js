import React from 'react';

const WeatherInfo = ({ weather }) => {
    if (!weather) return null;

    return (
        <>

            <div className="weather-details">
                <div>Humidity: {weather.humidity}%</div>
                <div>Precipitation: {weather.precipitation}%</div>
                <div>Wind: {weather.windspeed} km/h</div>
                <div>Wind Direction: {weather.windDirection}°</div>
                <div>Sunrise: {weather.sunrise}</div>
                <div>Sunset: {weather.sunset}</div>
            </div>
        </>
    );
};

export default WeatherInfo;