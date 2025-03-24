import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LocationSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const searchLocations = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=5&language=en&format=json`
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

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        searchLocations(value);
    };

    const handleLocationSelect = (location) => {
        navigate(`/weather/${location.latitude}/${location.longitude}/${encodeURIComponent(location.name)}`);
    };

    return (
        <div className="location-search">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search for a location..."
                className="search-input"
            />
            {loading && <div className="loading">Searching...</div>}
            {results.length > 0 && (
                <ul className="search-results">
                    {results.map((result) => (
                        <li
                            key={`${result.latitude}-${result.longitude}`}
                            onClick={() => handleLocationSelect(result)}
                            className="result-item"
                        >
                            {result.name}, {result.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LocationSearch;