import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        
        {/* Header */}
        <header className="app-header">
          <h1>🌤 Weather App</h1>
        </header>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Current Weather</Link>
          <Link to="/forecast">5-Day Forecast</Link>
        </nav>

        {/* Main Content */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Weather />} />
            <Route path="/forecast" element={<Forecast />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>© 2026 Weather App | Made by Riya Bhati</p>
        </footer>

      </div>
    </Router>
  );
}

export default App;


  

