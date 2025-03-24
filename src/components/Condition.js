import React from 'react';
import SvgIcon from '../pages/SvgIcon';
import { getWeatherIcon } from '../utils/weatherUtils';

const Condition = ({ weather }) => {
    if (!weather) return null;

    return (
        <>
            <div className="condition-box">
                <SvgIcon name={getWeatherIcon(weather.weathercode)} className="weather-icon" />
                <div>{weather.condition}</div>
            </div>
        </>
    );
};

export default Condition;