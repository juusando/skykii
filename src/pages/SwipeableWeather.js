import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { getSavedLocations } from '../utils/locationStorage';
import WeatherPage from './WeatherPage';
import '../styles/main.scss';
import SvgIcon from './SvgIcon';

const SwipeableWeather = () => {
    const navigate = useNavigate();
    const { latitude, longitude } = useParams();
    const [locations, setLocations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const savedLocations = getSavedLocations();
        setLocations(savedLocations);
        
        // If latitude and longitude are provided, find the index of the location
        if (latitude && longitude) {
            const index = savedLocations.findIndex(
                loc => loc.latitude === parseFloat(latitude) && loc.longitude === parseFloat(longitude)
            );
            if (index !== -1) {
                setCurrentIndex(index);
            }
        }
    }, [latitude, longitude]);

    const handleChangeIndex = (index) => {
        setCurrentIndex(index);
    };

    if (locations.length === 0) {
        return <div>No saved locations</div>;
    }

    return (
        <div className="swipeable-container">
            <SwipeableViews
                index={currentIndex}
                onChangeIndex={handleChangeIndex}
                enableMouseEvents
                resistance
            >
                {locations.map((location, index) => (
                    <div key={`${location.latitude}-${location.longitude}`} className="swipe-slide">
                        <WeatherPage
                            isSwipeable={true}
                            swipeableProps={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                name: location.name
                            }}
                        />
                    </div>
                ))}
            </SwipeableViews>

            <div className="pagination-dots">
                {locations.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => handleChangeIndex(index)}
                    />
                ))}
                <button className="back" onClick={() => navigate(-1)}>
                    <SvgIcon name="back" />
                </button>
            </div>
        </div>
    );
};

export default SwipeableWeather;