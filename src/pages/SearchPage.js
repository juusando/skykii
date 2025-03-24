import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocationSearch from '../components/LocationSearch';
import SvgIcon from './SvgIcon';
import '../styles/search.scss';

const SearchPage = () => {
    const navigate = useNavigate();

    return (
        <div className="search-page">
            <header className="search-header">
                <button className="back" onClick={() => navigate(-1)}>
                    <SvgIcon name="home" className="icon" />
                </button>
                <h1>Search Location</h1>
            </header>
            <div className="search-container">
                <LocationSearch />
            </div>

            <button className="back" onClick={() => navigate('/')}>
                <SvgIcon name="home" className="icon" />
            </button>
        
        </div>
    );
};

export default SearchPage;