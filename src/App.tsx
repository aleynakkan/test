import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import NutritionTracker from './components/NutritionTracker';
import ActivityTracker from './components/ActivityTracker';
import SocialHub from './components/SocialHub';
import DogProfile from './components/DogProfile';
import Settings from './components/Settings';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="app-container">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/nutrition" element={<NutritionTracker />} />
              <Route path="/activity" element={<ActivityTracker />} />
              <Route path="/social" element={<SocialHub />} />
              <Route path="/profile" element={<DogProfile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Navigation />
        </div>
      </div>
    </Router>
  );
}

export default App;