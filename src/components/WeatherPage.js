import React, { useState, useEffect } from 'react';
import './WeatherPage.css';
import { formatCurrentWeather } from '../utils/weatherUtils';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&timezone=Europe%2FLondon&timeformat=unixtime'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load weather data. Please try again later.');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="weather-page loading">
        <div className="loading-spinner">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-page error">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  const currentWeather = weatherData ? formatCurrentWeather(weatherData) : null;

  return (
    <div className="weather-page">
      <h1>London, United Kingdom</h1>
      <CurrentWeather weather={currentWeather} />
      <Forecast weatherData={weatherData} />
    </div>
  );
};

export default WeatherPage;