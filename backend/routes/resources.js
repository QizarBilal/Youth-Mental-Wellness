const express = require('express');
const router = express.Router();

const resources = [
  {
    id: 1,
    title: '4-7-8 Breathing Technique',
    description: 'A simple breathing exercise that can help reduce anxiety and promote relaxation',
    category: 'breathing',
    type: 'article',
    duration: '5 minutes',
    icon: '🫁',
    downloadable: false,
    content: `
      <h3>How to Practice 4-7-8 Breathing:</h3>
      <ol>
        <li><strong>Exhale completely</strong> through your mouth, making a whoosh sound</li>
        <li><strong>Close your mouth</strong> and inhale quietly through your nose for 4 counts</li>
        <li><strong>Hold your breath</strong> for 7 counts</li>
        <li><strong>Exhale completely</strong> through your mouth for 8 counts, making a whoosh sound</li>
        <li><strong>Repeat the cycle</strong> 3-4 times</li>
      </ol>
      <p><strong>Benefits:</strong> This technique helps activate your body's relaxation response and can be particularly helpful before sleep or during stressful moments.</p>
      <p><strong>Tips:</strong> Start slowly and don't worry if you feel lightheaded at first. With practice, this becomes easier and more effective.</p>
    `
  },
  {
    id: 2,
    title: 'Progressive Muscle Relaxation',
    description: 'Learn to release physical tension by systematically tensing and relaxing muscle groups',
    category: 'meditation',
    type: 'video',
    duration: '15 minutes',
    icon: '💪',
    downloadable: true,
    content: `
      <h3>Progressive Muscle Relaxation Guide:</h3>
      <p>This technique involves tensing and then relaxing different muscle groups in your body.</p>
      <h4>Steps:</h4>
      <ol>
        <li>Find a quiet, comfortable place to sit or lie down</li>
        <li>Start with your toes - tense them for 5 seconds, then relax</li>
        <li>Move up to your calves, thighs, abdomen, hands, arms, shoulders, and face</li>
        <li>Hold tension for 5 seconds, then release and notice the relaxation</li>
        <li>End by taking a few deep breaths and enjoying the feeling of relaxation</li>
      </ol>
      <p><strong>Benefits:</strong> Helps reduce physical symptoms of stress and anxiety, improves sleep quality, and increases body awareness.</p>
    `
  },
  {
    id: 3,
    title: 'Grounding Techniques for Anxiety',
    description: 'Practical strategies to help you stay present during anxious moments',
    category: 'anxiety',
    type: 'article',
    duration: '3 minutes',
    icon: '⚓',
    downloadable: true,
    content: `
      <h3>5-4-3-2-1 Grounding Technique:</h3>
      <p>When feeling anxious or overwhelmed, use your senses to ground yourself:</p>
      <ul>
        <li><strong>5 things you can see:</strong> Look around and name 5 objects you can see</li>
        <li><strong>4 things you can touch:</strong> Feel the texture of 4 different objects</li>
        <li><strong>3 things you can hear:</strong> Listen for 3 different sounds</li>
        <li><strong>2 things you can smell:</strong> Notice 2 scents around you</li>
        <li><strong>1 thing you can taste:</strong> Focus on 1 taste in your mouth</li>
      </ul>
      <h3>Other Grounding Techniques:</h3>
      <ul>
        <li>Hold an ice cube or splash cold water on your face</li>
        <li>Count backwards from 100 by 7s</li>
        <li>Name all the animals you can think of that start with 'B'</li>
        <li>Describe your surroundings in detail</li>
      </ul>
    `
  },
  {
    id: 4,
    title: 'Mindful Journaling for Mental Health',
    description: 'Use writing as a tool for emotional processing and self-reflection',
    category: 'coping',
    type: 'article',
    duration: '10 minutes',
    icon: '📝',
    downloadable: true,
    content: `
      <h3>How to Start Mindful Journaling:</h3>
      <p>Journaling can be a powerful tool for understanding and processing your emotions.</p>
      <h4>Prompts to Get Started:</h4>
      <ul>
        <li>How am I feeling right now, both emotionally and physically?</li>
        <li>What thoughts keep coming up for me today?</li>
        <li>What am I grateful for, even if it's something small?</li>
        <li>What challenged me today, and how did I handle it?</li>
        <li>What do I need right now to feel more balanced?</li>
      </ul>
      <h4>Tips for Effective Journaling:</h4>
      <ul>
        <li>Write without censoring yourself - let thoughts flow freely</li>
        <li>Don't worry about grammar or spelling</li>
        <li>Set aside 5-10 minutes daily for consistency</li>
        <li>Consider keeping your journal private and safe</li>
      </ul>
    `
  },
  {
    id: 5,
    title: 'Understanding Depression in Youth',
    description: 'Learn about depression symptoms, myths, and pathways to healing',
    category: 'depression',
    type: 'article',
    duration: '8 minutes',
    icon: '💙',
    downloadable: false,
    content: `
      <h3>Recognizing Depression in Young People:</h3>
      <p>Depression affects many young people and is a real medical condition, not a personal weakness.</p>
      <h4>Common Signs:</h4>
      <ul>
        <li>Persistent sadness or emptiness</li>
        <li>Loss of interest in activities you used to enjoy</li>
        <li>Changes in sleep patterns (too much or too little)</li>
        <li>Difficulty concentrating or making decisions</li>
        <li>Feelings of hopelessness or worthlessness</li>
        <li>Physical symptoms like headaches or fatigue</li>
      </ul>
      <h4>Myths vs. Facts:</h4>
      <ul>
        <li><strong>Myth:</strong> "You can just snap out of it" → <strong>Fact:</strong> Depression is a medical condition that requires proper support</li>
        <li><strong>Myth:</strong> "Asking for help means you're weak" → <strong>Fact:</strong> Seeking help takes courage and strength</li>
        <li><strong>Myth:</strong> "Only adults get real depression" → <strong>Fact:</strong> Depression can affect people of all ages</li>
      </ul>
      <h4>Steps Toward Healing:</h4>
      <ul>
        <li>Talk to someone you trust</li>
        <li>Consider professional counseling</li>
        <li>Maintain routine and self-care</li>
        <li>Stay connected with supportive people</li>
        <li>Remember that recovery is possible</li>
      </ul>
    `
  },
  {
    id: 6,
    title: 'Academic Stress Management',
    description: 'Strategies for managing school pressure and exam anxiety',
    category: 'stress',
    type: 'article',
    duration: '7 minutes',
    icon: '📚',
    downloadable: true,
    content: `
      <h3>Managing Academic Pressure:</h3>
      <p>School stress is common, but there are effective ways to manage it.</p>
      <h4>Time Management Strategies:</h4>
      <ul>
        <li>Break large tasks into smaller, manageable chunks</li>
        <li>Use a planner or app to track assignments and deadlines</li>
        <li>Prioritize tasks using the urgent/important matrix</li>
        <li>Build in buffer time for unexpected challenges</li>
      </ul>
      <h4>Study Techniques for Less Stress:</h4>
      <ul>
        <li>Use the Pomodoro Technique (25 minutes study, 5 minute break)</li>
        <li>Create a dedicated study space</li>
        <li>Form study groups with classmates</li>
        <li>Practice active recall instead of just re-reading</li>
      </ul>
      <h4>Exam Anxiety Tips:</h4>
      <ul>
        <li>Practice relaxation techniques before exams</li>
        <li>Get adequate sleep before test days</li>
        <li>Eat nutritious meals to fuel your brain</li>
        <li>Arrive early to settle in calmly</li>
        <li>Read instructions carefully and manage your time</li>
      </ul>
    `
  },
  {
    id: 7,
    title: 'Yoga Nidra for Deep Relaxation',
    description: 'A guided meditation practice for profound rest and stress relief',
    category: 'meditation',
    type: 'audio',
    duration: '20 minutes',
    icon: '🧘‍♀️',
    downloadable: true,
    content: `
      <h3>What is Yoga Nidra?</h3>
      <p>Yoga Nidra, or "yogic sleep," is a meditation practice that induces deep relaxation while maintaining awareness.</p>
      <h4>Benefits:</h4>
      <ul>
        <li>Reduces stress and anxiety</li>
        <li>Improves sleep quality</li>
        <li>Enhances emotional regulation</li>
        <li>Boosts immune system function</li>
        <li>Increases self-awareness</li>
      </ul>
      <h4>How to Practice:</h4>
      <ol>
        <li>Lie down comfortably on your back</li>
        <li>Close your eyes and focus on your breath</li>
        <li>Follow the guided instructions</li>
        <li>Stay awake but deeply relaxed</li>
        <li>Allow yourself to receive the benefits</li>
      </ol>
      <p><strong>Best Time:</strong> Before sleep, during study breaks, or when feeling overwhelmed.</p>
    `
  },
  {
    id: 8,
    title: 'Ayurvedic Wellness for Youth',
    description: 'Traditional Indian approaches to mental and physical balance',
    category: 'cultural',
    type: 'article',
    duration: '12 minutes',
    icon: '🕉️',
    downloadable: false,
    content: `
      <h3>Ayurvedic Principles for Mental Wellness:</h3>
      <p>Ayurveda offers time-tested wisdom for maintaining balance in mind, body, and spirit.</p>
      <h4>Understanding Your Constitution (Dosha):</h4>
      <ul>
        <li><strong>Vata:</strong> Air element - tends toward anxiety when imbalanced</li>
        <li><strong>Pitta:</strong> Fire element - tends toward anger/irritability when imbalanced</li>
        <li><strong>Kapha:</strong> Earth element - tends toward lethargy/depression when imbalanced</li>
      </ul>
      <h4>Daily Practices (Dinacharya):</h4>
      <ul>
        <li>Wake up early (around sunrise)</li>
        <li>Practice tongue scraping and oil pulling</li>
        <li>Eat meals at regular times</li>
        <li>Include all six tastes in your diet</li>
        <li>Practice pranayama (breathing exercises)</li>
        <li>Go to bed by 10 PM when possible</li>
      </ul>
      <h4>Herbs for Mental Clarity:</h4>
      <ul>
        <li><strong>Brahmi:</strong> Enhances memory and reduces anxiety</li>
        <li><strong>Ashwagandha:</strong> Helps manage stress and improves sleep</li>
        <li><strong>Shankhpushpi:</strong> Supports cognitive function</li>
        <li><strong>Jatamansi:</strong> Calms the nervous system</li>
      </ul>
      <p><em>Note: Always consult with a qualified Ayurvedic practitioner before using herbs.</em></p>
    `
  }
];

router.get('/', (req, res) => {
  try {
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

router.get('/categories', (req, res) => {
  try {
    const categories = [
      { id: 'breathing', name: 'Breathing & Relaxation', count: resources.filter(r => r.category === 'breathing').length },
      { id: 'meditation', name: 'Meditation', count: resources.filter(r => r.category === 'meditation').length },
      { id: 'coping', name: 'Coping Skills', count: resources.filter(r => r.category === 'coping').length },
      { id: 'anxiety', name: 'Anxiety Support', count: resources.filter(r => r.category === 'anxiety').length },
      { id: 'depression', name: 'Depression Support', count: resources.filter(r => r.category === 'depression').length },
      { id: 'stress', name: 'Stress Management', count: resources.filter(r => r.category === 'stress').length },
      { id: 'cultural', name: 'Cultural Wellness', count: resources.filter(r => r.category === 'cultural').length }
    ];
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.get('/search', (req, res) => {
  try {
    const { q, category } = req.query;
    let filteredResources = resources;
    
    if (category && category !== 'all') {
      filteredResources = filteredResources.filter(resource => resource.category === category);
    }
    
    if (q) {
      const searchTerm = q.toLowerCase();
      filteredResources = filteredResources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm) ||
        resource.description.toLowerCase().includes(searchTerm) ||
        resource.category.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json(filteredResources);
  } catch (error) {
    console.error('Error searching resources:', error);
    res.status(500).json({ error: 'Failed to search resources' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const resource = resources.find(r => r.id === parseInt(id));
    
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    
    res.json(resource);
  } catch (error) {
    console.error('Error fetching resource:', error);
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
});

module.exports = router;