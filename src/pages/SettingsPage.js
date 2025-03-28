import React from 'react';
import { useNavigate } from 'react-router-dom';
import SvgIcon from './SvgIcon';

const SettingsPage = () => {
    const navigate = useNavigate();

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
                        <span>Unit</span>
                        <select defaultValue="celsius">
                            <option value="celsius">Celsius</option>
                            <option value="fahrenheit">Fahrenheit</option>
                        </select>
                    </div>
                    <div className="settings-item">
                        <span>Speed Unit</span>
                        <select defaultValue="en">
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                        </select>
                    </div>
            
                </div>
        </div>
    );
};

export default SettingsPage;