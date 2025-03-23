import './App.css';
import SvgIcon from './components/SvgIcon';
import DesignSys from './components/DesignSys';
import WeatherPage from './components/WeatherPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/design-system" element={<DesignSys />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/" element={
          <div className="App">
            <header className="App-header">
              <div className="icon-examples">
                <SvgIcon name="skyki" className={"logo"} />
              </div>
              SKYKI
              <div className="nav-buttons">
                <button 
                  onClick={() => window.location.href = '/weather'}
                  className="design-sys-button"
                >
                  Weather
                </button>
                <button 
                  onClick={() => window.location.href = '/design-system'}
                  className="design-sys-button"
                >
                  Design System
                </button>
              </div>
            </header>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
