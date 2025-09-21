import React, { useState, useEffect } from 'react';
import { resourceService } from '../services/resourceService';

const ResourceHubPage = () => {
  const [resources, setResources] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);

  const categories = [
    { id: 'all', label: 'All Resources', icon: '📚' },
    { id: 'breathing', label: 'Breathing & Relaxation', icon: '🧘‍♀️' },
    { id: 'meditation', label: 'Meditation', icon: '🕯️' },
    { id: 'coping', label: 'Coping Skills', icon: '🛠️' },
    { id: 'anxiety', label: 'Anxiety Support', icon: '😰' },
    { id: 'depression', label: 'Depression Support', icon: '💙' },
    { id: 'stress', label: 'Stress Management', icon: '📈' },
    { id: 'cultural', label: 'Cultural Wellness', icon: '🕉️' }
  ];

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const resourceData = await resourceService.getResources();
      setResources(resourceData);
    } catch (error) {
      console.error('Error loading resources:', error);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const BreathingExercise = () => {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState('inhale');
    const [count, setCount] = useState(4);

    useEffect(() => {
      let interval;
      if (isActive) {
        interval = setInterval(() => {
          setCount(prev => {
            if (prev === 1) {
              setPhase(current => {
                if (current === 'inhale') return 'hold';
                if (current === 'hold') return 'exhale';
                return 'inhale';
              });
              return 4;
            }
            return prev - 1;
          });
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [isActive]);

    const phaseText = {
      inhale: 'Breathe In',
      hold: 'Hold',
      exhale: 'Breathe Out'
    };

    return (
      <div className="card text-center">
        <h3 className="text-2xl font-semibold text-calm-800 mb-4">4-4-4 Breathing Exercise</h3>
        <div className="mb-6">
          <div className={`w-32 h-32 mx-auto rounded-full border-4 transition-all duration-1000 ${
            phase === 'inhale' ? 'border-green-400 bg-green-100 scale-110' :
            phase === 'hold' ? 'border-yellow-400 bg-yellow-100' :
            'border-blue-400 bg-blue-100 scale-90'
          }`}>
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-3xl font-bold text-calm-800">{count}</div>
                <div className="text-sm text-calm-600">{phaseText[phase]}</div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`btn-primary ${isActive ? 'bg-red-500 hover:bg-red-600' : ''}`}
        >
          {isActive ? 'Stop' : 'Start'} Exercise
        </button>
        <p className="text-sm text-calm-600 mt-4">
          Follow the circle: Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-calm-50 py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-calm-800 mb-4">Resource Hub</h1>
            <p className="text-xl text-calm-600">Tools, techniques, and resources for your mental wellness journey</p>
          </div>

          <div className="mb-8">
            <BreathingExercise />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="card">
                <h3 className="text-lg font-semibold text-calm-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                        activeCategory === category.id
                          ? 'bg-primary-100 text-primary-700 border border-primary-300'
                          : 'hover:bg-calm-50 text-calm-700'
                      }`}
                    >
                      <span className="mr-3">{category.icon}</span>
                      <span className="text-sm">{category.label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredResources.map(resource => (
                  <div key={resource.id} className="card hover:shadow-xl transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{resource.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-calm-800">{resource.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            resource.category === 'breathing' ? 'bg-green-100 text-green-700' :
                            resource.category === 'meditation' ? 'bg-purple-100 text-purple-700' :
                            resource.category === 'coping' ? 'bg-blue-100 text-blue-700' :
                            resource.category === 'anxiety' ? 'bg-yellow-100 text-yellow-700' :
                            resource.category === 'depression' ? 'bg-indigo-100 text-indigo-700' :
                            resource.category === 'stress' ? 'bg-red-100 text-red-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {categories.find(c => c.id === resource.category)?.label}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-calm-500">{resource.duration}</span>
                    </div>
                    
                    <p className="text-calm-600 text-sm mb-4">{resource.description}</p>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedResource(resource)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        {resource.type === 'video' ? 'Watch' : 
                         resource.type === 'audio' ? 'Listen' : 'Read'}
                      </button>
                      {resource.downloadable && (
                        <button className="bg-calm-200 text-calm-700 hover:bg-calm-300 text-sm px-4 py-2 rounded-lg transition-colors duration-200">
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-calm-800 mb-2">No resources found</h3>
                  <p className="text-calm-600">Try adjusting your search or category filter</p>
                </div>
              )}
            </div>
          </div>

          {selectedResource && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-calm-800">{selectedResource.title}</h2>
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="text-calm-500 hover:text-calm-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm text-calm-600">Duration: {selectedResource.duration}</span>
                </div>
                
                <div className="prose prose-sm text-calm-700">
                  <div dangerouslySetInnerHTML={{ __html: selectedResource.content }} />
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <button className="btn-primary">
                    {selectedResource.type === 'video' ? 'Watch Full Video' : 
                     selectedResource.type === 'audio' ? 'Play Audio' : 'Read More'}
                  </button>
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="bg-calm-200 text-calm-700 hover:bg-calm-300 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-xl">🌱</span>
              <div className="text-green-800">
                <p className="font-medium">Wellness Tip:</p>
                <p className="text-sm">
                  Try to practice one mindfulness or breathing exercise daily. Even 2-3 minutes can make a significant difference in your mental state.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceHubPage;