import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CityCountry from '../components/CityCountry';
import Temperature from '../components/Temperature';
import Condition from '../components/Condition';
import WeatherInfo from '../components/WeatherInfo';
import Forecast from '../components/Forecast';
import { formatCurrentWeather } from '../utils/weatherUtils';

const WeatherPage = () => {
    const { latitude, longitude, city } = useParams();
    const [weatherData, setWeatherData] = useState(null);
    const [formattedWeather, setFormattedWeather] = useState(null);
    const [cityCountry, setCityCountry] = useState({ city: city || 'Unknown', country: 'Unknown' });

    useEffect(() => {
        const fetchLocationAndWeather = async () => {
            try {
                // Use the same endpoint as search but with city name
                const geoResponse = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
                );
                const geoData = await geoResponse.json();
                const countryName = geoData.results?.[0]?.country || 'Unknown';

                // Rest of the weather fetching code remains the same
                const weatherResponse = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m,winddirection_10m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto`
                );
                const data = await weatherResponse.json();
                setWeatherData(data);
                const formatted = formatCurrentWeather(data);
                setFormattedWeather(formatted);

                setCityCountry({ city: city || 'Unknown', country: countryName });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (latitude && longitude) {
            fetchLocationAndWeather();
        }
    }, [latitude, longitude, city]);

    if (!weatherData || !formattedWeather) {
        return <div>Loading weather data...</div>;
    }

    return (
        <div className="weather-page">
           <CityCountry city={cityCountry.city} country={cityCountry.country} />
            <div className="weather-grid">
                <Temperature weather={formattedWeather} />
                <Condition weather={formattedWeather} />
                <WeatherInfo weather={formattedWeather} />
                <Forecast weatherData={weatherData} />
            </div>
        </div>
    );
};

export default WeatherPage;