import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import ChatbotPage from './pages/ChatbotPage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import ResourceHubPage from './pages/ResourceHubPage';
import CommunityPage from './pages/CommunityPage';
import ProfessionalHelpPage from './pages/ProfessionalHelpPage';
import Navigation from './components/Navigation';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/mood-tracker" element={<MoodTrackerPage />} />
          <Route path="/resources" element={<ResourceHubPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/professional-help" element={<ProfessionalHelpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;