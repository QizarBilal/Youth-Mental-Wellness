const express = require('express');
const router = express.Router();

let posts = [
  {
    id: 1,
    content: "Starting college soon and feeling really nervous about making friends. Anyone else feeling this way? How did you handle the transition?",
    category: 'general',
    anonymous: true,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    supportCount: 12,
    commentCount: 8,
    userSupported: false,
    responses: [
      {
        content: "I felt the same way! What helped me was joining clubs related to my interests. You'll find people who share similar passions.",
        timestamp: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000),
        supportCount: 5
      },
      {
        content: "College was scary at first but turned out to be amazing. Just be yourself and don't be afraid to start conversations. Most people are friendly!",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        supportCount: 7
      }
    ]
  },
  {
    id: 2,
    content: "Been struggling with exam anxiety lately. Every time I sit down to study, my heart starts racing and I can't focus. It's affecting my performance and I don't know what to do.",
    category: 'anxiety',
    anonymous: true,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    supportCount: 18,
    commentCount: 12,
    userSupported: false,
    responses: [
      {
        content: "Try the 4-7-8 breathing technique before studying. It really helps calm my nerves. Also, breaking study sessions into smaller chunks works for me.",
        timestamp: new Date(Date.now() - 1.8 * 24 * 60 * 60 * 1000),
        supportCount: 9
      },
      {
        content: "I used to have the same problem. What helped was creating a study routine and sticking to it. Also, talking to a counselor at school made a huge difference.",
        timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
        supportCount: 6
      }
    ]
  },
  {
    id: 3,
    content: "Family expectations are overwhelming me. They want me to pursue engineering, but I'm more interested in arts. Feeling torn between following my passion and making them happy.",
    category: 'stress',
    anonymous: true,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    supportCount: 25,
    commentCount: 15,
    userSupported: false,
    responses: [
      {
        content: "This is such a common struggle for Indian students. Maybe try having an honest conversation with your family about your interests? Sometimes they surprise you with their understanding.",
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
        supportCount: 11
      },
      {
        content: "I was in a similar situation. I chose to study both - engineering as major and arts as minor. It's possible to find a middle ground that satisfies everyone.",
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
        supportCount: 8
      },
      {
        content: "Remember that it's your life and your career. While family approval is important, your happiness and fulfillment matter too. Consider seeking guidance from a career counselor.",
        timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
        supportCount: 13
      }
    ]
  },
  {
    id: 4,
    content: "Wanted to share a small victory - I finally talked to someone about my depression and started therapy. It was scary but I'm glad I did it. To anyone hesitating, please reach out for help.",
    category: 'success',
    anonymous: true,
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    supportCount: 34,
    commentCount: 10,
    userSupported: false,
    responses: [
      {
        content: "So proud of you! Taking that first step is always the hardest. You're inspiring others to seek help too.",
        timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000),
        supportCount: 12
      },
      {
        content: "This gives me hope. I've been thinking about therapy but was scared. How did you find the right therapist?",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        supportCount: 7
      }
    ]
  },
  {
    id: 5,
    content: "Feeling really lonely lately. All my friends seem to have their lives figured out while I'm still struggling with basic things. Social media makes it worse because everyone looks so happy.",
    category: 'depression',
    anonymous: true,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    supportCount: 16,
    commentCount: 9,
    userSupported: false,
    responses: [
      {
        content: "Social media is really misleading. People only post their best moments, not their struggles. You're definitely not alone in feeling this way.",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        supportCount: 14
      },
      {
        content: "I've been there. What helped me was taking a break from social media and focusing on my own journey. Comparison really is the thief of joy.",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        supportCount: 10
      }
    ]
  }
];

router.get('/posts', (req, res) => {
  try {
    const { category, filter } = req.query;
    let filteredPosts = posts;
    
    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }
    
    if (filter === 'recent') {
      filteredPosts = filteredPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else if (filter === 'popular') {
      filteredPosts = filteredPosts.sort((a, b) => b.supportCount - a.supportCount);
    }
    
    res.json(filteredPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.post('/posts', (req, res) => {
  try {
    const { content, category } = req.body;
    
    if (!content || !category) {
      return res.status(400).json({ error: 'Content and category are required' });
    }
    
    const newPost = {
      id: posts.length + 1,
      content,
      category,
      anonymous: true,
      timestamp: new Date(),
      supportCount: 0,
      commentCount: 0,
      userSupported: false,
      responses: []
    };
    
    posts.unshift(newPost);
    
    res.json({
      message: 'Post created successfully',
      post: newPost
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.post('/posts/:id/support', (req, res) => {
  try {
    const { id } = req.params;
    const postIndex = posts.findIndex(post => post.id === parseInt(id));
    
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (posts[postIndex].userSupported) {
      posts[postIndex].supportCount -= 1;
      posts[postIndex].userSupported = false;
    } else {
      posts[postIndex].supportCount += 1;
      posts[postIndex].userSupported = true;
    }
    
    res.json({
      message: 'Support updated successfully',
      supportCount: posts[postIndex].supportCount,
      userSupported: posts[postIndex].userSupported
    });
  } catch (error) {
    console.error('Error updating support:', error);
    res.status(500).json({ error: 'Failed to update support' });
  }
});

router.post('/posts/:id/respond', (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Response content is required' });
    }
    
    const postIndex = posts.findIndex(post => post.id === parseInt(id));
    
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const newResponse = {
      content,
      timestamp: new Date(),
      supportCount: 0
    };
    
    posts[postIndex].responses.push(newResponse);
    posts[postIndex].commentCount += 1;
    
    res.json({
      message: 'Response added successfully',
      response: newResponse
    });
  } catch (error) {
    console.error('Error adding response:', error);
    res.status(500).json({ error: 'Failed to add response' });
  }
});

router.get('/categories', (req, res) => {
  try {
    const categories = [
      { id: 'general', name: 'General Support', count: posts.filter(p => p.category === 'general').length },
      { id: 'anxiety', name: 'Anxiety & Worry', count: posts.filter(p => p.category === 'anxiety').length },
      { id: 'depression', name: 'Depression & Sadness', count: posts.filter(p => p.category === 'depression').length },
      { id: 'stress', name: 'Academic Stress', count: posts.filter(p => p.category === 'stress').length },
      { id: 'relationships', name: 'Relationships', count: posts.filter(p => p.category === 'relationships').length },
      { id: 'success', name: 'Success Stories', count: posts.filter(p => p.category === 'success').length }
    ];
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.get('/stats', (req, res) => {
  try {
    const stats = {
      totalPosts: posts.length,
      totalSupports: posts.reduce((sum, post) => sum + post.supportCount, 0),
      totalResponses: posts.reduce((sum, post) => sum + post.commentCount, 0),
      categoriesDistribution: {
        general: posts.filter(p => p.category === 'general').length,
        anxiety: posts.filter(p => p.category === 'anxiety').length,
        depression: posts.filter(p => p.category === 'depression').length,
        stress: posts.filter(p => p.category === 'stress').length,
        relationships: posts.filter(p => p.category === 'relationships').length,
        success: posts.filter(p => p.category === 'success').length
      }
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching community stats:', error);
    res.status(500).json({ error: 'Failed to fetch community statistics' });
  }
});

module.exports = router;