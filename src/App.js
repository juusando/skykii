import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SvgIcon from './pages/SvgIcon';
import LocationSearch from './components/LocationSearch';
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/weather/:latitude/:longitude/:city" element={<WeatherPage />} />
        <Route path="/" element={
          <div className="App">
            <header className="App-header">
              <div className="icon-examples">
                <SvgIcon name="skyki" className={"logo"} />
              </div>
              SKYKI
              <div className="nav-buttons">
                <LocationSearch />
              </div>
            </header>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
