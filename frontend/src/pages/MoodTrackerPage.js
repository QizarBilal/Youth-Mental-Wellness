import React, { useState, useEffect } from 'react';
import { moodService } from '../services/moodService';

const MoodTrackerPage = () => {
  const [currentMood, setCurrentMood] = useState('');
  const [moodNote, setMoodNote] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [showJournal, setShowJournal] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');

  const moods = [
    { value: 'excellent', emoji: '😄', label: 'Excellent', color: 'bg-green-500' },
    { value: 'good', emoji: '😊', label: 'Good', color: 'bg-green-400' },
    { value: 'okay', emoji: '😐', label: 'Okay', color: 'bg-yellow-400' },
    { value: 'bad', emoji: '😔', label: 'Bad', color: 'bg-orange-400' },
    { value: 'awful', emoji: '😢', label: 'Awful', color: 'bg-red-400' }
  ];

  useEffect(() => {
    loadMoodHistory();
  }, []);

  const loadMoodHistory = async () => {
    try {
      const history = await moodService.getMoodHistory();
      setMoodHistory(history);
    } catch (error) {
      console.error('Error loading mood history:', error);
    }
  };

  const handleMoodSubmit = async () => {
    if (!currentMood) return;

    try {
      const moodData = {
        mood: currentMood,
        note: moodNote,
        journalEntry: journalEntry,
        timestamp: new Date()
      };

      await moodService.saveMood(moodData);
      await loadMoodHistory();
      
      setCurrentMood('');
      setMoodNote('');
      setJournalEntry('');
      setShowJournal(false);
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  const getMoodEmoji = (mood) => {
    const moodObj = moods.find(m => m.value === mood);
    return moodObj ? moodObj.emoji : '😐';
  };

  const getMoodLabel = (mood) => {
    const moodObj = moods.find(m => m.value === mood);
    return moodObj ? moodObj.label : 'Unknown';
  };

  const getMoodColor = (mood) => {
    const moodObj = moods.find(m => m.value === mood);
    return moodObj ? moodObj.color : 'bg-gray-400';
  };

  const getWeeklyAverage = () => {
    if (moodHistory.length === 0) return 0;
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const recentMoods = moodHistory.filter(entry => 
      new Date(entry.timestamp) >= weekAgo
    );
    
    if (recentMoods.length === 0) return 0;
    
    const moodValues = { excellent: 5, good: 4, okay: 3, bad: 2, awful: 1 };
    const total = recentMoods.reduce((sum, entry) => sum + moodValues[entry.mood], 0);
    return Math.round((total / recentMoods.length) * 10) / 10;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-calm-50 py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-calm-800 mb-4">Mood Tracker</h1>
            <p className="text-xl text-calm-600">Check in with yourself and track your emotional journey</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-2xl font-semibold text-calm-800 mb-6">How are you feeling right now?</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setCurrentMood(mood.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        currentMood === mood.value
                          ? 'border-primary-500 bg-primary-50 transform scale-105'
                          : 'border-calm-200 hover:border-primary-300 hover:bg-primary-25'
                      }`}
                    >
                      <div className="text-4xl mb-2">{mood.emoji}</div>
                      <div className="text-sm font-medium text-calm-700">{mood.label}</div>
                    </button>
                  ))}
                </div>

                {currentMood && (
                  <div className="space-y-4">
                    <textarea
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                      placeholder="What's contributing to this mood? (optional)"
                      className="input-field"
                      rows="3"
                    />
                    
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setShowJournal(!showJournal)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          showJournal
                            ? 'bg-secondary-500 text-white'
                            : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                        }`}
                      >
                        📝 Add Journal Entry
                      </button>
                      
                      <button
                        onClick={handleMoodSubmit}
                        className="btn-primary"
                      >
                        Save Mood
                      </button>
                    </div>

                    {showJournal && (
                      <textarea
                        value={journalEntry}
                        onChange={(e) => setJournalEntry(e.target.value)}
                        placeholder="Write about your day, thoughts, or feelings... This is your private space."
                        className="input-field"
                        rows="6"
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-calm-800 mb-4">Weekly Insights</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{getWeeklyAverage()}/5</div>
                    <div className="text-sm text-primary-700">Average Mood</div>
                  </div>
                  <div className="text-center p-4 bg-secondary-50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary-600">{moodHistory.length}</div>
                    <div className="text-sm text-secondary-700">Total Check-ins</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-calm-800 mb-6">Recent Mood History</h3>
              
              {moodHistory.length === 0 ? (
                <div className="text-center py-8 text-calm-500">
                  <div className="text-4xl mb-4">📊</div>
                  <p>Start tracking your mood to see patterns and insights!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {moodHistory.slice(0, 10).map((entry, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-calm-50 rounded-lg">
                      <div className="text-2xl">{getMoodEmoji(entry.mood)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-calm-800">{getMoodLabel(entry.mood)}</span>
                          <div className={`w-3 h-3 rounded-full ${getMoodColor(entry.mood)}`}></div>
                        </div>
                        <div className="text-sm text-calm-600">
                          {new Date(entry.timestamp).toLocaleDateString()} at{' '}
                          {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {entry.note && (
                          <p className="text-sm text-calm-700 mt-2">{entry.note}</p>
                        )}
                        {entry.journalEntry && (
                          <div className="mt-2 p-2 bg-white rounded border-l-4 border-secondary-300">
                            <p className="text-sm text-calm-700 italic">"{entry.journalEntry.substring(0, 100)}..."</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 text-xl">💡</span>
              <div className="text-blue-800">
                <p className="font-medium">Mood Tracking Tips:</p>
                <ul className="text-sm list-disc list-inside mt-1 space-y-1">
                  <li>Check in regularly - even when you feel neutral</li>
                  <li>Notice patterns between your mood and activities, sleep, or events</li>
                  <li>Use the journal feature to explore deeper thoughts and feelings</li>
                  <li>Remember that all feelings are valid and temporary</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTrackerPage;