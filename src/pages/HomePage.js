import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocationList from './LocationList';
import SvgIcon from './SvgIcon';
import '../styles/main.scss';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="App">
            <header className="App-header">
                <SvgIcon name="skyki" className="logo" />
                Skyki
            </header>
            <button className="back" onClick={() => navigate('/search')}>
                <SvgIcon name="add" />
            </button>
            <LocationList />
        </div>
    );
};

export default HomePage;