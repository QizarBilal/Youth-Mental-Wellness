import api from './api';

export const chatService = {
  sendMessage: async (message) => {
    try {
      const response = await api.post('/chat/send', { message });
      return response.data.response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
};