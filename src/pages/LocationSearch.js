import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import { saveLocation } from '../utils/locationStorage';
import '../styles/search.scss';
import SvgIcon from './SvgIcon';

const LocationSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (searchQuery) => {
        if (!searchQuery.trim() || searchQuery.trim().length < 2) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=10`
            );
            const data = await response.json();
            setResults(data.results || []);
        } catch (error) {
            console.error('Error searching locations:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    // Debounce the search to avoid too many API calls
    const debouncedSearch = React.useCallback(
        debounce((searchQuery) => handleSearch(searchQuery), 150),
        []
    );

    // Update query and trigger search on input change
    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        debouncedSearch(newQuery);
    };

    const handleSelectLocation = (location) => {
        // Save the location to localStorage
        saveLocation({
            name: location.name,
            country: location.country,
            latitude: location.latitude,
            longitude: location.longitude
        });
        // Navigate to the swipeable weather view
        navigate(`/weather/${location.latitude}/${location.longitude}/${encodeURIComponent(location.name)}`);
    };

    return (
        <div className="location-search">
            <form className='form-box' onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for a city..."
                    className="search-input"
                />
            </form>
            
            {loading && <div className="loading">Searching...</div>}
            
            {results.length > 0 && (
                <div className="search-results">
                    {results.map((result) => (
                        <div
                            key={`${result.latitude}-${result.longitude}`}
                            className="result-item"
                            onClick={() => handleSelectLocation(result)}
                        >
                            <div className="location-info">
                            <div className="city">{result.name}</div>
                            <div className="country">{result.country}</div>
                            </div>

                            <SvgIcon name="add" className={"icon"}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSearch;