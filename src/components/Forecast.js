import React from 'react';
import { getWeatherCondition } from '../utils/weatherUtils';

const Forecast = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
      <div >
        {weatherData.daily.temperature_2m_max.map((maxTemp, index) => (
          <div key={index}>
      
              {new Date(weatherData.daily.time[index] * 1000).toLocaleDateString('en-GB', { 
                weekday: 'short',
                timeZone: 'Europe/London'
              })}
          
            {getWeatherCondition(weatherData.hourly.weathercode[index * 24])}
            {Math.round(maxTemp)}°
          </div>
        ))}
      </div>

  );
};

export default Forecast;