const express = require('express');
const router = express.Router();

let moodHistory = [
  {
    id: 1,
    mood: 'good',
    note: 'Had a nice day with friends',
    journalEntry: 'Today was really good. I hung out with my friends and we had so much fun. It reminded me that there are people who care about me.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 2,
    mood: 'okay',
    note: 'Feeling neutral today',
    journalEntry: '',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 3,
    mood: 'bad',
    note: 'Stressed about upcoming exams',
    journalEntry: 'I have so many exams coming up and I feel like I\'m not prepared. The pressure is getting to me.',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000)
  }
];

router.get('/history', (req, res) => {
  try {
    const sortedHistory = moodHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json(sortedHistory);
  } catch (error) {
    console.error('Error fetching mood history:', error);
    res.status(500).json({ error: 'Failed to fetch mood history' });
  }
});

router.post('/save', (req, res) => {
  try {
    const { mood, note, journalEntry } = req.body;
    
    if (!mood) {
      return res.status(400).json({ error: 'Mood is required' });
    }
    
    const newMoodEntry = {
      id: moodHistory.length + 1,
      mood,
      note: note || '',
      journalEntry: journalEntry || '',
      timestamp: new Date()
    };
    
    moodHistory.push(newMoodEntry);
    
    res.json({ 
      message: 'Mood saved successfully', 
      entry: newMoodEntry 
    });
  } catch (error) {
    console.error('Error saving mood:', error);
    res.status(500).json({ error: 'Failed to save mood' });
  }
});

router.get('/stats', (req, res) => {
  try {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const recentMoods = moodHistory.filter(entry => 
      new Date(entry.timestamp) >= weekAgo
    );
    
    const moodValues = { excellent: 5, good: 4, okay: 3, bad: 2, awful: 1 };
    
    const stats = {
      totalEntries: moodHistory.length,
      weeklyEntries: recentMoods.length,
      averageMood: recentMoods.length > 0 ? 
        recentMoods.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / recentMoods.length : 0,
      moodDistribution: {
        excellent: moodHistory.filter(m => m.mood === 'excellent').length,
        good: moodHistory.filter(m => m.mood === 'good').length,
        okay: moodHistory.filter(m => m.mood === 'okay').length,
        bad: moodHistory.filter(m => m.mood === 'bad').length,
        awful: moodHistory.filter(m => m.mood === 'awful').length
      }
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching mood stats:', error);
    res.status(500).json({ error: 'Failed to fetch mood statistics' });
  }
});

module.exports = router;