const express = require('express');
const router = express.Router();

const empathethicResponses = [
  "I hear you, and what you're feeling is completely valid. Many young people go through similar experiences.",
  "Thank you for sharing that with me. It takes courage to express your feelings, and I'm here to support you.",
  "That sounds really challenging. You're not alone in feeling this way, and it's okay to have these emotions.",
  "I can understand why that would be difficult for you. Your feelings matter, and it's important that you're reaching out.",
  "It's completely normal to feel overwhelmed sometimes. You're being very brave by talking about this.",
  "I want you to know that what you're experiencing is real and important. How are you taking care of yourself right now?",
  "Thank you for trusting me with your feelings. Remember, seeking support is a sign of strength, not weakness.",
  "That must be really hard to deal with. Have you found anything that helps you feel a bit better during tough times?",
  "Your emotions are valid, and it's okay to not be okay sometimes. What's one small thing that might help you today?",
  "I appreciate you sharing this with me. You deserve support and care. What would feel most helpful for you right now?"
];

const anxietyResponses = [
  "Anxiety can feel overwhelming, but remember that you're stronger than you know. Let's try a quick breathing exercise together.",
  "I understand that anxiety can make everything feel intense. One thing that might help is grounding yourself - can you name 5 things you can see around you?",
  "Feeling anxious is your mind's way of trying to protect you, even when there might not be immediate danger. You're safe right now.",
  "When anxiety hits, it can help to remind yourself: this feeling will pass. You've gotten through difficult moments before.",
  "Anxiety often makes us worry about the future, but right now, in this moment, you're okay. Let's focus on what you can control today."
];

const depressionResponses = [
  "Depression can make everything feel heavy and difficult. Please know that you matter, and these feelings won't last forever.",
  "I want you to know that depression is not your fault, and it doesn't define who you are. You're much more than what you're going through.",
  "Even small steps count when you're dealing with depression. Have you been able to do anything today that felt good, even something tiny?",
  "Depression often tells us lies about ourselves and our worth. You are valuable, and your life has meaning.",
  "It's okay if today was a hard day. Tomorrow is a new opportunity, and you don't have to carry today's weight into it."
];

const stressResponses = [
  "Stress can feel overwhelming, especially with everything you're managing. Remember, you don't have to handle everything at once.",
  "It sounds like you have a lot on your plate. What's one thing you could prioritize today that would make the biggest difference?",
  "Stress is your body's response to challenges, and it shows you care about doing well. Let's think about ways to manage it together.",
  "When stress builds up, it can help to break things down into smaller, manageable pieces. What feels most urgent right now?",
  "You're dealing with a lot, and it's understandable that you feel stressed. What usually helps you feel more grounded?"
];

const generateEmpathethicResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('anxiety') || message.includes('anxious') || message.includes('worried') || message.includes('panic')) {
    return anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
  }
  
  if (message.includes('sad') || message.includes('depressed') || message.includes('hopeless') || message.includes('empty')) {
    return depressionResponses[Math.floor(Math.random() * depressionResponses.length)];
  }
  
  if (message.includes('stress') || message.includes('overwhelmed') || message.includes('pressure') || message.includes('exam') || message.includes('school')) {
    return stressResponses[Math.floor(Math.random() * stressResponses.length)];
  }
  
  if (message.includes('good') || message.includes('happy') || message.includes('better') || message.includes('great')) {
    return "I'm so glad to hear that you're feeling good! It's wonderful when we can appreciate positive moments. What's contributing to this good feeling?";
  }
  
  if (message.includes('tired') || message.includes('exhausted') || message.includes('sleep')) {
    return "Being tired can affect everything - your mood, your ability to cope, and your perspective. Have you been able to get enough rest lately? Sometimes our minds need rest just as much as our bodies do.";
  }
  
  if (message.includes('lonely') || message.includes('alone') || message.includes('isolated')) {
    return "Feeling lonely can be really painful, especially when you're young and building connections feels so important. You're not alone right now - I'm here with you, and there are people who care about you.";
  }
  
  if (message.includes('family') || message.includes('parents') || message.includes('home')) {
    return "Family relationships can be complex, especially during times of growth and change. It's normal for there to be tension sometimes. What's going on at home that's affecting you?";
  }
  
  if (message.includes('friends') || message.includes('social') || message.includes('relationship')) {
    return "Friendships and relationships can bring so much joy, but they can also be a source of stress. It sounds like something is weighing on your mind about your connections with others.";
  }
  
  return empathethicResponses[Math.floor(Math.random() * empathethicResponses.length)];
};

router.post('/send', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    setTimeout(() => {
      const response = generateEmpathethicResponse(message);
      res.json({ response });
    }, 1000);
    
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;