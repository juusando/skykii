import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSavedLocations, removeLocation } from '../utils/locationStorage';
import SvgIcon from './SvgIcon';

const LocationList = () => {
    const navigate = useNavigate();
    const [locations, setLocations] = useState(getSavedLocations());
    const [swipedId, setSwipedId] = useState(null);
    const [touchStart, setTouchStart] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // Mouse event handlers for browser support
    const handleMouseDown = (e) => {
        setTouchStart(e.clientX);
        setIsDragging(true);
    };

    const handleMouseMove = (e, locationKey) => {
        if (!touchStart || !isDragging) return;
        
        const currentX = e.clientX;
        const diff = touchStart - currentX;

        if (diff > 50) {
            setSwipedId(locationKey);
        } else if (diff < -50) {
            setSwipedId(null);
        }
    };

    const handleMouseUp = () => {
        setTouchStart(null);
        setIsDragging(false);
    };

    // Touch handlers remain the same
    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e, locationKey) => {
        if (!touchStart) return;
        
        const currentTouch = e.touches[0].clientX;
        const diff = touchStart - currentTouch;

        if (diff > 50) {
            setSwipedId(locationKey);
        } else if (diff < -50) {
            setSwipedId(null);
        }
    };

    const handleDelete = (locationKey) => {
        removeLocation(locationKey);
        setLocations(getSavedLocations());
        setSwipedId(null);
        setIsDragging(false);
    };

    return (
        <div className="location-grid">
            {locations.map((location) => {
                const locationKey = `${location.latitude}-${location.longitude}`;
                return (
                    <div
                        key={locationKey}
                        className="location-card"
                        onMouseDown={handleMouseDown}
                        onMouseMove={(e) => handleMouseMove(e, locationKey)}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={(e) => handleTouchMove(e, locationKey)}
                        onTouchEnd={handleMouseUp}
                        onClick={() => {
                            if (!isDragging && swipedId !== locationKey) {
                                navigate(`/weather/${location.latitude}/${location.longitude}/${encodeURIComponent(location.name)}`);
                            }
                        }}
                    >
                        <div 
                            className="location-info"
                            style={{
                                transform: `translateX(${swipedId === locationKey ? '-72px' : '0px'})`,
                            }}
                        >
                            <div className="city">{location.name}</div>
                            <div className="country">{location.country}</div>
                        </div>
                        {swipedId === locationKey && (
                            <div 
                                className="delete-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(locationKey);
                                }}
                            >
                                {/* <SvgIcon name="trash" /> */}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default LocationList;