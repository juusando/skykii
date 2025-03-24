import './App.css';
import SavedLocations from './components/SavedLocations';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SvgIcon from './pages/SvgIcon';
import WeatherPage from './pages/WeatherPage';
import SearchPage from './pages/SearchPage';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <SvgIcon name="skyki" className={"logo"} />
        SKYKI
      </header>
      <button className="back" onClick={() => navigate('/search')}>
        <SvgIcon name="search" />
      </button>
      <SavedLocations />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/weather/:latitude/:longitude/:city" element={<WeatherPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
