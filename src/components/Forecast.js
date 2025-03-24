import React from 'react';
import { getWeatherCondition } from '../utils/weatherUtils';

const Forecast = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="forecast-container">
      {weatherData.daily.temperature_2m_max.map((maxTemp, index) => (
        <div key={index} className="forecast-item">
          <div className="forecast-day">
            {new Date(weatherData.daily.time[index]).toLocaleDateString('en-GB', { 
              weekday: 'short',
              timeZone: 'Asia/Tokyo'
            })}
          </div>
          <div className="forecast-condition">
            {getWeatherCondition(weatherData.daily.weathercode[index])}
          </div>
          <div className="forecast-temp">
            {Math.round(maxTemp)}°
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;