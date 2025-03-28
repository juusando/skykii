import React from 'react';
import '../styles/main.scss';

const Temperature = ({ weather }) => {
    if (!weather) return null;

    return (
            <div className="temperature-box">
                <div className='temp'>
         
                    <div className='small hide'>°</div>
                    {weather.temperature}
                    <div className='small'>°</div>
                    </div>
                <div className='max-min'>
                <div className='max'>{weather.maxTemp}°</div>
                <div className='min'>{weather.minTemp}°</div>
                </div>
            </div>
    );
};

export default Temperature;