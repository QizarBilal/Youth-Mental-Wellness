import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const hideNavigation = location.pathname === '/' || location.pathname === '/onboarding';
  
  if (hideNavigation) return null;

  const navItems = [
    { path: '/chatbot', label: 'AI Chat', icon: '💬' },
    { path: '/mood-tracker', label: 'Mood Tracker', icon: '😊' },
    { path: '/resources', label: 'Resources', icon: '📚' },
    { path: '/community', label: 'Community', icon: '👥' },
    { path: '/professional-help', label: 'Get Help', icon: '🆘' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-calm-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/chatbot" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">MindSpace</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-calm-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-calm-600 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-current"></div>
                <div className="w-6 h-0.5 bg-current"></div>
                <div className="w-6 h-0.5 bg-current"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-calm-200">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-calm-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;