import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getSavedLocations } from '../utils/locationStorage';
import SvgIcon from '../pages/SvgIcon';

const SavedLocations = () => {
    const navigate = useNavigate();
    const savedLocations = getSavedLocations();

    if (savedLocations.length === 0) {
        return null;
    }

    return (
        <div className="saved-locations">
            <h2>Saved Locations</h2>
            <div className="location-grid">
                {savedLocations.map((location) => (
                    <div 
                        key={location.id} 
                        className="location-card"
                        onClick={() => navigate(`/weather/${location.latitude}/${location.longitude}/${encodeURIComponent(location.name)}`)}
                    >
                        <div className="location-info">
                            <h3>{location.name}</h3>
                            <p>{location.country}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedLocations;