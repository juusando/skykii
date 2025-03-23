import React from 'react';

const CurrentWeather = ({ weather }) => {
    if (!weather) return null;

    return (
        <>

            <div className="weather-details">
                <div>{weather.currentDate}</div>
                <div>{weather.currentTime}</div>
                <div>{weather.condition}</div>
                <div>{weather.temperature}°</div>
                <div>H: {weather.maxTemp}°</div>
                <div>L: {weather.minTemp}°</div>
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

export default CurrentWeather;