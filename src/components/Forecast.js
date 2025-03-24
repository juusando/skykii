import React from 'react';
import { getWeatherCondition, getWeatherIcon } from '../utils/weatherUtils';
import SvgIcon from '../pages/SvgIcon';

const Forecast = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="forecast-box">
      {weatherData.daily.temperature_2m_max.map((maxTemp, index) => (
        <div key={index} className="item">
          <div className="day">
            {new Date(weatherData.daily.time[index]).toLocaleDateString('en-GB', { 
              weekday: 'short',
            })}
          </div>
          <div className="condition">
            <SvgIcon name={getWeatherIcon(weatherData.daily.weathercode[index])} className="weather-icon" />
            {/* {getWeatherCondition(weatherData.daily.weathercode[index])} */}
          </div>
          <div className="temp">
            {Math.round(maxTemp)}°
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;