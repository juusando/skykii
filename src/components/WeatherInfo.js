import React from 'react';
import SvgIcon from '../pages/SvgIcon';

const WeatherInfo = ({ weather }) => {
    const unit = localStorage.getItem('windUnit') || 'km/h';
    
    const convertSpeed = (speed) => {
        if (unit === 'mph') {
            return Math.round(speed * 0.621371);
        }
        return Math.round(speed);
    };
    
    if (!weather) return null;

    return (
        <>
            <div className="weather-info-box">

                <div className='info-box'>
                <SvgIcon name="humidity" className={"icon"} /> 
                <div className='name-box'>{weather.humidity}<span>%</span></div>
                </div>

                <div className='info-box'>
                <SvgIcon name="prec" className={"icon"} /> 
                <div className='name-box'>{weather.precipitation}<span>%</span></div>
                </div>

                <div className='info-box'>
                <SvgIcon name="wind-speed" className={"icon"} /> 
                <div className='name-box'>{convertSpeed(weather.windspeed)}<span>{unit}</span></div>
                </div>

                <div className='info-box'>
                <SvgIcon name="wind-direction" className={"icon"} /> 
                <div className='name-box'>{weather.windDirection}<span>°</span></div>
                </div>

                <div className='info-box'>
                <SvgIcon name="sunrise" className={"icon"} /> 
                <div className='name-box'>{weather.sunrise}</div>
                </div>

                <div className='info-box'>
                <SvgIcon name="sunset" className={"icon"} /> 
                <div className='name-box'>{weather.sunset}</div>
                </div>

            </div>
        </>
    );
};

export default WeatherInfo;