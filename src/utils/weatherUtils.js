// Weather condition codes mapping
export const weatherConditions = {
  0: { text: 'Clear sky', icon: '0' },
  1: { text: 'Mainly clear', icon: '1' },
  2: { text: 'Partly cloudy', icon: '2' },
  3: { text: 'Overcast', icon: '3' },
  45: { text: 'Foggy', icon: '45' },
  48: { text: 'Depositing rime fog', icon: '48' },
  51: { text: 'Light drizzle', icon: '51' },
  53: { text: 'Moderate drizzle', icon: '53' },
  55: { text: 'Dense drizzle', icon: '55' },
  61: { text: 'Slight rain', icon: '61' },
  63: { text: 'Moderate rain', icon: '63' },
  65: { text: 'Heavy rain', icon: '65' },
  71: { text: 'Slight snow', icon: '71' },
  73: { text: 'Moderate snow', icon: '73' },
  75: { text: 'Heavy snow', icon: '75' },
  95: { text: 'Thunderstorm', icon: '95' },
  96: { text: 'Thunderstorm with slight hail', icon: '96' },
  99: { text: 'Thunderstorm with heavy hail', icon: '99' }
};

export const getWeatherCondition = (code) => weatherConditions[code]?.text || 'Unknown';
export const getWeatherIcon = (code) => weatherConditions[code]?.icon || '0';

// Format current weather data
export const formatCurrentWeather = (weatherData) => {
  if (!weatherData) return null;
  
  const currentTime = weatherData.current_weather.time;
  const currentDate = new Date(currentTime);
  const currentHourIndex = currentDate.getHours();

  return {
    temperature: Math.round(weatherData.hourly.temperature_2m[currentHourIndex]),
    humidity: weatherData.hourly.relativehumidity_2m[currentHourIndex],
    precipitation: weatherData.hourly.precipitation_probability[currentHourIndex],
    windspeed: weatherData.hourly.windspeed_10m[currentHourIndex],
    windDirection: weatherData.hourly.winddirection_10m[currentHourIndex],
    condition: getWeatherCondition(weatherData.hourly.weathercode[currentHourIndex]),
    maxTemp: Math.round(weatherData.daily.temperature_2m_max[0]),
    minTemp: Math.round(weatherData.daily.temperature_2m_min[0]),
    sunrise: new Date(weatherData.daily.sunrise[0]).toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false,
      timeZone: 'Asia/Tokyo'
    }),
    sunset: new Date(weatherData.daily.sunset[0]).toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false,
      timeZone: 'Asia/Tokyo'
    }),
    currentDate: new Date(currentTime).toLocaleString('en-GB', { 
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      timeZone: 'Asia/Tokyo'
    }),
    currentTime: new Date(currentTime).toLocaleTimeString('en-GB', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Tokyo'
    })
  };
};