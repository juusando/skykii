import React from 'react';
import '../styles/main.scss';

const DateTime = ({ weather }) => {
    if (!weather) return null;

    return (
        <>
            <div className="date-box">
                <div>{weather.currentDate}</div>
                <div>{weather.currentTime}</div>
            </div>
        </>
    );
};

export default DateTime;