import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getSavedLocations } from '../utils/locationStorage';
import SvgIcon from './SvgIcon';

const LocationList = () => {
    const navigate = useNavigate();
    const savedLocations = getSavedLocations();

    if (savedLocations.length === 0) {
        return null;
    }

    return (
        <div className="location-grid">
            {savedLocations.map((location) => (
                <div
                    key={`${location.latitude}-${location.longitude}`}
                    className="location-card"
                    onClick={() => navigate(`/weather/${location.latitude}/${location.longitude}/${encodeURIComponent(location.name)}`)}
                >
                    <div className="location-info">
                        <div className='city'>{location.name}</div>
                        <div className='country'>{location.country}</div>
                    </div>
                    <SvgIcon name="add" className={"icon"}/>
                </div>
            ))}
        </div>
    );
};

export default LocationList;