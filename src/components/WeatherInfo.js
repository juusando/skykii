import React from 'react';
import SvgIcon from '../pages/SvgIcon';

const WeatherInfo = ({ weather }) => {
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
                <div className='name-box'>{weather.windspeed}<span>km/h</span></div>
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