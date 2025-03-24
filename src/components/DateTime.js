import React from 'react';
import '../styles/main.scss';

const DateTime = ({ weather }) => {
    if (!weather) return null;

    return (
        <>
            <div className="date-box">
                <div className='date'>{weather.currentDate}</div>
                <div className='time'>{weather.currentTime}</div>
            </div>
        </>
    );
};

export default DateTime;