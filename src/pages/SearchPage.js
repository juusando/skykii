import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocationSearch from '../components/LocationSearch';
import SvgIcon from './SvgIcon';
import '../styles/search.scss';
import '../styles/main.scss';

const SearchPage = () => {
    const navigate = useNavigate();

    return (
        <div className="search-page">
            <header className="search-header">
                <button className="back" onClick={() => navigate(-1)}>
                    <SvgIcon name="back" />
                </button>
                <h1>Search Location</h1>
            </header>
            <div className="search-container">
                <LocationSearch />
            </div>        
        </div>
    );
};

export default SearchPage;