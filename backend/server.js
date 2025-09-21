const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const chatRoutes = require('./routes/chat');
const moodRoutes = require('./routes/mood');
const resourceRoutes = require('./routes/resources');
const communityRoutes = require('./routes/community');

app.use('/api/chat', chatRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/community', communityRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Youth Mental Wellness API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});