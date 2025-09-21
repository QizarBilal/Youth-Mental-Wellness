import React, { useState } from 'react';

const ProfessionalHelpPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const emergencyContacts = [
    { name: 'KIRAN National Helpline', number: '1800-599-0019', description: '24/7 mental health support', available: '24/7' },
    { name: 'Vandrevala Foundation', number: '1860-266-2345', description: 'Suicide prevention helpline', available: '24/7' },
    { name: 'Sneha India', number: '044-2464-0050', description: 'Emotional support helpline', available: '24/7' },
    { name: 'iCall Helpline', number: '022-2556-3291', description: 'Psychological support', available: '10 AM - 8 PM' }
  ];

  const professionalServices = [
    {
      id: 1,
      name: 'Mindpeers',
      type: 'Online Therapy Platform',
      description: 'Affordable online counseling with licensed therapists',
      features: ['Video/Chat Sessions', 'Qualified Therapists', 'Student Discounts'],
      cost: '₹500-1500 per session',
      website: 'mindpeers.co',
      rating: 4.5
    },
    {
      id: 2,
      name: 'BetterHelp India',
      type: 'Online Counseling',
      description: 'Global platform with India-specific therapists',
      features: ['24/7 Messaging', 'Video Calls', 'Specialized for Youth'],
      cost: '₹1000-2000 per session',
      website: 'betterhelp.com',
      rating: 4.3
    },
    {
      id: 3,
      name: 'Talkspace',
      type: 'Digital Therapy',
      description: 'Text, voice, and video therapy sessions',
      features: ['Flexible Scheduling', 'Multiple Communication Options', 'Licensed Counselors'],
      cost: '₹800-1800 per session',
      website: 'talkspace.com',
      rating: 4.2
    },
    {
      id: 4,
      name: 'Local College Counseling',
      type: 'Campus Support',
      description: 'Free counseling services at educational institutions',
      features: ['Free Service', 'Campus-based', 'Academic Integration'],
      cost: 'Free',
      website: 'Contact your institution',
      rating: 4.0
    }
  ];

  const resourceCenters = [
    {
      name: 'NIMHANS Bangalore',
      address: 'Hosur Road, Bangalore, Karnataka',
      specialties: ['Depression', 'Anxiety', 'Youth Mental Health'],
      contact: '080-2699-5000'
    },
    {
      name: 'IHBAS Delhi',
      address: 'Dilshad Garden, Delhi',
      specialties: ['Psychiatric Services', 'Counseling', 'Crisis Intervention'],
      contact: '011-2258-5446'
    },
    {
      name: 'LOKMANYA TILAK Municipal Medical College',
      address: 'Sion, Mumbai, Maharashtra',
      specialties: ['Psychiatry', 'Psychology', 'Youth Services'],
      contact: '022-2407-6666'
    }
  ];

  const selfHelpSteps = [
    {
      title: 'Recognize the Signs',
      description: 'Notice when you need help - persistent sadness, anxiety, or thoughts of self-harm',
      icon: '🔍'
    },
    {
      title: 'Reach Out',
      description: 'Contact a trusted adult, helpline, or counselor - you don\'t have to face this alone',
      icon: '🤝'
    },
    {
      title: 'Be Honest',
      description: 'Share your true feelings with your therapist or counselor for the best support',
      icon: '💬'
    },
    {
      title: 'Stay Consistent',
      description: 'Regular sessions and following treatment plans lead to better outcomes',
      icon: '📅'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-calm-50 py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-calm-800 mb-4">Professional Help & Resources</h1>
            <p className="text-xl text-calm-600">Connect with qualified mental health professionals</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="card bg-red-50 border-red-200">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">🆘</span>
                  <h2 className="text-2xl font-bold text-red-800">Crisis Support</h2>
                </div>
                <p className="text-red-700 mb-4">
                  If you're having thoughts of self-harm or suicide, please reach out immediately. Help is available 24/7.
                </p>
                <button
                  onClick={() => setShowCrisisModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Get Immediate Help
                </button>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold text-calm-800 mb-6">Professional Counseling Services</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {professionalServices.map(service => (
                    <div key={service.id} className="border border-calm-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-calm-800">{service.name}</h3>
                          <p className="text-sm text-primary-600">{service.type}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-sm text-calm-600">{service.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-calm-600 text-sm mb-3">{service.description}</p>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-calm-800 mb-1">Features:</h4>
                        <ul className="text-xs text-calm-600 space-y-1">
                          {service.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium text-calm-800">{service.cost}</div>
                          <div className="text-xs text-calm-500">{service.website}</div>
                        </div>
                        <button
                          onClick={() => setSelectedService(service)}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold text-calm-800 mb-6">Mental Health Centers in India</h2>
                <div className="space-y-4">
                  {resourceCenters.map((center, index) => (
                    <div key={index} className="border border-calm-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-calm-800 mb-2">{center.name}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-calm-600">
                        <div>
                          <p><strong>Address:</strong> {center.address}</p>
                          <p><strong>Contact:</strong> {center.contact}</p>
                        </div>
                        <div>
                          <p><strong>Specialties:</strong></p>
                          <ul className="list-disc list-inside">
                            {center.specialties.map((specialty, idx) => (
                              <li key={idx}>{specialty}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-semibold text-calm-800 mb-4">Steps to Get Help</h3>
                <div className="space-y-4">
                  {selfHelpSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm">{step.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-calm-800">{step.title}</h4>
                        <p className="text-sm text-calm-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card bg-blue-50 border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Did You Know?</h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• 1 in 4 young people experience mental health challenges</li>
                  <li>• Seeking help is a sign of strength, not weakness</li>
                  <li>• Most mental health conditions are treatable</li>
                  <li>• Early intervention leads to better outcomes</li>
                </ul>
              </div>

              <div className="card bg-green-50 border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">🎯 What to Expect</h3>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Initial assessment of your needs</li>
                  <li>• Confidential and safe environment</li>
                  <li>• Personalized treatment approach</li>
                  <li>• Regular progress monitoring</li>
                  <li>• Support for your specific concerns</li>
                </ul>
              </div>
            </div>
          </div>

          {showCrisisModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-red-800">🆘 Crisis Support</h2>
                  <button
                    onClick={() => setShowCrisisModal(false)}
                    className="text-calm-500 hover:text-calm-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="mb-6">
                  <p className="text-calm-700 mb-4">
                    If you're in immediate danger or having thoughts of self-harm, please contact one of these helplines right away:
                  </p>
                  
                  <div className="space-y-3">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-red-800">{contact.name}</h3>
                            <p className="text-sm text-red-700">{contact.description}</p>
                            <p className="text-xs text-red-600">Available: {contact.available}</p>
                          </div>
                          <div className="text-right">
                            <a
                              href={`tel:${contact.number}`}
                              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                              {contact.number}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Remember:</strong> You are not alone. These feelings are temporary. Professional help is available and effective.
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowCrisisModal(false)}
                    className="bg-calm-200 text-calm-700 hover:bg-calm-300 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedService && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-calm-800">{selectedService.name}</h2>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-calm-500 hover:text-calm-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="mb-4">
                  <p className="text-primary-600 font-medium">{selectedService.type}</p>
                  <p className="text-calm-700 mt-2">{selectedService.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-calm-800 mb-2">Features:</h3>
                    <ul className="text-sm text-calm-600 space-y-1">
                      {selectedService.features.map((feature, index) => (
                        <li key={index}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-calm-800 mb-2">Pricing:</h3>
                    <p className="text-sm text-calm-600">{selectedService.cost}</p>
                    <h3 className="font-semibold text-calm-800 mb-2 mt-4">Website:</h3>
                    <p className="text-sm text-primary-600">{selectedService.website}</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button className="btn-primary">
                    Visit Website
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="bg-calm-200 text-calm-700 hover:bg-calm-300 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalHelpPage;