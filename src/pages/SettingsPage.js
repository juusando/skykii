import React from 'react';
import { useNavigate } from 'react-router-dom';
import SvgIcon from './SvgIcon';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [tempUnit, setTempUnit] = React.useState(localStorage.getItem('tempUnit') || '°C');
    const [windUnit, setWindUnit] = React.useState(localStorage.getItem('windUnit') || 'km/h');

    const handleTempUnitChange = () => {
        const newUnit = tempUnit === '°C' ? '°F' : '°C';
        setTempUnit(newUnit);
        localStorage.setItem('tempUnit', newUnit);
    };

    const handleWindUnitChange = () => {
        const newUnit = windUnit === 'km/h' ? 'mph' : 'km/h';
        setWindUnit(newUnit);
        localStorage.setItem('windUnit', newUnit);
    };

    return (
        <div className="settings-page">

            <header className="search-header">
                <h1>Settings</h1>
                <button className="back top" onClick={() => navigate(-1)}>
                    <SvgIcon name="back" />
                </button>
            </header>

                <div className="settings-section">
                                
                <div className="settings-item">
                        <span>Current Location</span>
                        <label className="toggle">
                            <input type="checkbox" defaultChecked />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="settings-item">
                        <span>Temperature Unit</span>
                        <div className="button-group">
                            <button 
                                className={`temp-unit-btn ${tempUnit === '°C' ? 'active' : ''}`}
                                onClick={handleTempUnitChange}
                                aria-pressed={tempUnit === '°C'}
                            >
                                °C
                            </button>
                            <button 
                                className={`temp-unit-btn ${tempUnit === '°F' ? 'active' : ''}`}
                                onClick={handleTempUnitChange}
                                aria-pressed={tempUnit === '°F'}
                            >
                                °F
                            </button>
                        </div>
                    </div>
                    <div className="settings-item">
                        <span>Wind Speed Unit</span>
                        <div className="button-group">
                            <button 
                                className={`temp-unit-btn ${windUnit === 'km/h' ? 'active' : ''}`}
                                onClick={handleWindUnitChange}
                                aria-pressed={windUnit === 'km/h'}
                            >
                                km/h
                            </button>
                            <button 
                                className={`temp-unit-btn ${windUnit === 'mph' ? 'active' : ''}`}
                                onClick={handleWindUnitChange}
                                aria-pressed={windUnit === 'mph'}
                            >
                                mph
                            </button>
                        </div>
                    </div>
            
                </div>
        </div>
    );
};

export default SettingsPage;