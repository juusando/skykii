// Weather condition codes mapping
export const weatherConditions = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail'
};

// Get weather condition from code
export const getWeatherCondition = (code) => weatherConditions[code] || 'Unknown';

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
      timeZone: 'Europe/London'
    }),
    sunset: new Date(weatherData.daily.sunset[0]).toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false,
      timeZone: 'Europe/London'
    }),
    currentDate: new Date(currentTime).toLocaleString('en-GB', { 
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      timeZone: 'Europe/London'
    }),
    currentTime: new Date(currentTime).toLocaleTimeString('en-GB', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/London'
    })
  };
};