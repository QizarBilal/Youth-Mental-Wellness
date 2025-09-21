import api from './api';

export const moodService = {
  getMoodHistory: async () => {
    try {
      const response = await api.get('/mood/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching mood history:', error);
      throw error;
    }
  },

  saveMood: async (moodData) => {
    try {
      const response = await api.post('/mood/save', moodData);
      return response.data;
    } catch (error) {
      console.error('Error saving mood:', error);
      throw error;
    }
  },

  getMoodStats: async () => {
    try {
      const response = await api.get('/mood/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching mood stats:', error);
      throw error;
    }
  }
};