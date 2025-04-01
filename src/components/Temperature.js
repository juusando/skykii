import React from 'react';
import '../styles/main.scss';

const Temperature = ({ weather }) => {
    const unit = localStorage.getItem('tempUnit') || '°C';
    
    const convertTemp = (temp) => {
        if (unit === '°F') {
            return Math.round((temp * 9/5) + 32);
        }
        return Math.round(temp);
    };
    if (!weather) return null;

    return (
            <div className="temperature-box">
                <div className='temp'>
                    <div className='small hide'>°</div>
                    {convertTemp(weather.temperature)}°
                    {/* <div className='small'>{unit}</div> */}
                </div>
                <div className='max-min'>
                    <div className='max'>{convertTemp(weather.maxTemp)}°</div>
                    <div className='min'>{convertTemp(weather.minTemp)}°</div>
                </div>
            </div>
    );
};

export default Temperature;