import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DesignSys.css';

const DesignSys = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <header className="design-sys-header">
        <button onClick={handleBack} className="design-sys-back-button">
          Back
        </button>
        <h1>Design System</h1>
      </header>
      <main className="design-sys-content">
        <section className="design-sys-section">
          <h2>Components</h2>
          <div className="component-grid">
            {/* Add component examples here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DesignSys;