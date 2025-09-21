import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    ageGroup: '',
    concerns: [],
    goals: []
  });

  const steps = [
    {
      title: "Welcome to MindSpace",
      content: (
        <div className="text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold text-calm-800 mb-4">Your Privacy is Sacred</h2>
          <div className="text-left max-w-2xl mx-auto space-y-4 text-calm-600">
            <p>✅ <strong>100% Anonymous:</strong> No personal information required</p>
            <p>✅ <strong>End-to-End Secure:</strong> Your conversations are encrypted</p>
            <p>✅ <strong>No Judgment Zone:</strong> Safe space for all thoughts and feelings</p>
            <p>✅ <strong>Professional Backup:</strong> Easy access to real help when needed</p>
          </div>
          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <p className="text-primary-700 font-medium">
              Remember: This is a supportive tool, not a replacement for professional mental health care.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Tell Us About You",
      content: (
        <div>
          <h2 className="text-2xl font-bold text-calm-800 mb-6 text-center">What's your age group?</h2>
          <div className="grid gap-4">
            {['13-15 years', '16-18 years', '19-21 years', '22-25 years'].map((age) => (
              <button
                key={age}
                onClick={() => setUserInfo({...userInfo, ageGroup: age})}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  userInfo.ageGroup === age
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-calm-200 hover:border-primary-300 hover:bg-primary-25'
                }`}
              >
                <span className="text-lg">{age}</span>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "What's on Your Mind?",
      content: (
        <div>
          <h2 className="text-2xl font-bold text-calm-800 mb-6 text-center">
            What would you like support with? (Select all that apply)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Anxiety & Worry', emoji: '😰' },
              { label: 'Sadness & Depression', emoji: '😢' },
              { label: 'Academic Stress', emoji: '📚' },
              { label: 'Family Issues', emoji: '👨‍👩‍👧‍👦' },
              { label: 'Friend Problems', emoji: '👥' },
              { label: 'Self-Esteem', emoji: '💪' },
              { label: 'Relationship Issues', emoji: '💔' },
              { label: 'Future Worries', emoji: '🔮' }
            ].map((concern) => (
              <button
                key={concern.label}
                onClick={() => {
                  const concerns = userInfo.concerns.includes(concern.label)
                    ? userInfo.concerns.filter(c => c !== concern.label)
                    : [...userInfo.concerns, concern.label];
                  setUserInfo({...userInfo, concerns});
                }}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  userInfo.concerns.includes(concern.label)
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-calm-200 hover:border-primary-300 hover:bg-primary-25'
                }`}
              >
                <span className="text-2xl mr-3">{concern.emoji}</span>
                <span className="text-lg">{concern.label}</span>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Your Goals",
      content: (
        <div>
          <h2 className="text-2xl font-bold text-calm-800 mb-6 text-center">
            What are you hoping to achieve? (Select all that apply)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Better Coping Skills', emoji: '🛠️' },
              { label: 'Improved Mood', emoji: '😊' },
              { label: 'Stress Management', emoji: '🧘' },
              { label: 'Better Sleep', emoji: '😴' },
              { label: 'Increased Confidence', emoji: '🌟' },
              { label: 'Better Relationships', emoji: '🤝' },
              { label: 'Academic Success', emoji: '🎓' },
              { label: 'General Support', emoji: '💙' }
            ].map((goal) => (
              <button
                key={goal.label}
                onClick={() => {
                  const goals = userInfo.goals.includes(goal.label)
                    ? userInfo.goals.filter(g => g !== goal.label)
                    : [...userInfo.goals, goal.label];
                  setUserInfo({...userInfo, goals});
                }}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  userInfo.goals.includes(goal.label)
                    ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                    : 'border-calm-200 hover:border-secondary-300 hover:bg-secondary-25'
                }`}
              >
                <span className="text-2xl mr-3">{goal.emoji}</span>
                <span className="text-lg">{goal.label}</span>
              </button>
            ))}
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('userProfile', JSON.stringify(userInfo));
      navigate('/chatbot');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return userInfo.ageGroup !== '';
      case 2: return userInfo.concerns.length > 0;
      case 3: return userInfo.goals.length > 0;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-calm-50 to-secondary-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-calm-600">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-calm-600">{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-calm-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="card min-h-[500px] flex flex-col">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-calm-800 mb-8 text-center">
                {steps[currentStep].title}
              </h1>
              {steps[currentStep].content}
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t border-calm-200">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentStep === 0
                    ? 'text-calm-400 cursor-not-allowed'
                    : 'text-calm-600 hover:text-calm-800 hover:bg-calm-100'
                }`}
              >
                Back
              </button>
              
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-8 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  canProceed()
                    ? 'btn-primary'
                    : 'bg-calm-300 text-calm-500 cursor-not-allowed'
                }`}
              >
                {currentStep === steps.length - 1 ? 'Start Your Journey' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;