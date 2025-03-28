import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocationSearch from './LocationSearch';
import SvgIcon from './SvgIcon';
import '../styles/search.scss';
import '../styles/main.scss';

const SearchPage = () => {
    const navigate = useNavigate();

    return (
        <div className="search-page">
            <header className="search-header">
            <h1>Search</h1>
                <button className="back top" onClick={() => navigate(-1)}>
                    <SvgIcon name="back" />
                </button>

            </header>
            <div className="search-container">
                <LocationSearch />
            </div>        
        </div>
    );
};

export default SearchPage;