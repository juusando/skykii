import './App.css';
import SavedLocations from './pages/SavedLocations';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SvgIcon from './pages/SvgIcon';
import WeatherPage from './pages/WeatherPage';
import SearchPage from './pages/SearchPage';
import SwipeableWeather from './pages/SwipeableWeather';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/weather/:latitude/:longitude/:city" element={<SwipeableWeather />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
