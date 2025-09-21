import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-calm-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-calm-800 mb-4">
            MindSpace
          </h1>
          <p className="text-xl text-calm-600 mb-8 max-w-2xl mx-auto">
            A safe, confidential space for young minds to find support, share experiences, and build emotional resilience
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card text-center">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-2xl font-semibold text-calm-800 mb-3">Safe & Confidential</h3>
              <p className="text-calm-600">
                Your privacy is our priority. Chat anonymously with AI and connect with peers in a judgment-free environment.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-2xl font-semibold text-calm-800 mb-3">AI-Powered Support</h3>
              <p className="text-calm-600">
                Get instant, empathetic responses from our advanced AI trained to understand and support youth mental health.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold text-calm-800 mb-3">Track Your Journey</h3>
              <p className="text-calm-600">
                Monitor your emotional well-being with personalized mood tracking and insightful progress reports.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-6xl mb-4">🌟</div>
              <h3 className="text-2xl font-semibold text-calm-800 mb-3">Culturally Aware</h3>
              <p className="text-calm-600">
                Resources and support tailored specifically for Indian youth, understanding our unique cultural context.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="card max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-calm-800 mb-4">Ready to Begin?</h2>
              <p className="text-calm-600 mb-6">
                Take the first step towards better mental health. Everything you share is completely confidential and secure.
              </p>
              <button
                onClick={() => navigate('/onboarding')}
                className="btn-primary text-lg px-8 py-3"
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-calm-500 text-sm">
              If you're experiencing a mental health emergency, please contact:
            </p>
            <div className="flex justify-center space-x-8 mt-2">
              <span className="text-calm-600 font-semibold">KIRAN: 1800-599-0019</span>
              <span className="text-calm-600 font-semibold">Vandrevala Foundation: 1860-266-2345</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;