import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SvgIcon from './SvgIcon';
import CityCountry from '../components/CityCountry';
import { saveLocation, removeLocation, isLocationSaved, getSavedLocations } from '../utils/locationStorage';
import Temperature from '../components/Temperature';
import Condition from '../components/Condition';
import WeatherInfo from '../components/WeatherInfo';
import Forecast from '../components/Forecast';
import DateTime from '../components/DateTime';
import { formatCurrentWeather } from '../utils/weatherUtils';

const WeatherPage = ({ isSwipeable = false, swipeableProps = null }) => {
    const params = useParams();
    const navigate = useNavigate();
    
    // Use either swipeable props or URL params
    const latitude = swipeableProps?.latitude || params.latitude;
    const longitude = swipeableProps?.longitude || params.longitude;
    const city = swipeableProps?.name || params.city;
    
    const [weatherData, setWeatherData] = useState(null);
    const [formattedWeather, setFormattedWeather] = useState(null);
    const [cityCountry, setCityCountry] = useState(() => {
        const savedLocation = getSavedLocations().find(
            loc => loc.latitude === parseFloat(latitude) && loc.longitude === parseFloat(longitude)
        );
        return {
            city: city || 'Unknown',
            country: savedLocation?.country || 'Unknown'
        };
    });


    useEffect(() => {
        saveLocation({
            name: cityCountry.city,
            country: cityCountry.country,
            latitude,
            longitude
        });
        const fetchLocationAndWeather = async () => {
            try {
                // Check cache first
                const cacheKey = `weather_${latitude}_${longitude}`;
                const cachedData = localStorage.getItem(cacheKey);
                
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    const now = new Date().getTime();
                    
                    // Use cached data if it's less than 10 minutes old
                    if (now - parsedData.timestamp < 600000) {
                        setWeatherData(parsedData.data);
                        setFormattedWeather(formatCurrentWeather(parsedData.data));
                        return;
                    }
                }

                // Use the same endpoint as search but with city name
                const geoResponse = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
                );
                const geoData = await geoResponse.json();
                const countryName = geoData.results?.[0]?.country || geoData.results?.[0]?.country_code || 'Unknown';

                // Fetch weather data
                const weatherResponse = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m,winddirection_10m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto`
                );
                const data = await weatherResponse.json();
                
                // Cache the data with timestamp
                localStorage.setItem(cacheKey, JSON.stringify({
                    data,
                    timestamp: new Date().getTime()
                }));
                
                setWeatherData(data);
                const formatted = formatCurrentWeather(data);
                setFormattedWeather(formatted);

                setCityCountry({ 
                    city: geoData.results?.[0]?.name || city || 'Unknown', 
                    country: countryName 
                });
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

            <div className='info-header'>
                <CityCountry city={cityCountry.city} country={cityCountry.country} />
                <DateTime weather={formattedWeather}/>
            </div>
            <Condition weather={formattedWeather} />
            <Temperature weather={formattedWeather} />
            <WeatherInfo weather={formattedWeather} />
            <Forecast weatherData={weatherData} />

            <div className="action-buttons">
                {!isSwipeable && (
                    <button onClick={() => navigate('/')} className='back left'>
                        <SvgIcon name="home" />
                    </button>
                )}
            </div>
            
        </div>
    );
};

export default WeatherPage;