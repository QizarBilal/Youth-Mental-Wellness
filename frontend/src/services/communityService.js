import api from './api';

export const communityService = {
  getPosts: async (category, filter) => {
    try {
      const params = {};
      if (category) params.category = category;
      if (filter) params.filter = filter;
      
      const response = await api.get('/community/posts', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  createPost: async (postData) => {
    try {
      const response = await api.post('/community/posts', postData);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  supportPost: async (postId) => {
    try {
      const response = await api.post(`/community/posts/${postId}/support`);
      return response.data;
    } catch (error) {
      console.error('Error supporting post:', error);
      throw error;
    }
  },

  respondToPost: async (postId, content) => {
    try {
      const response = await api.post(`/community/posts/${postId}/respond`, { content });
      return response.data;
    } catch (error) {
      console.error('Error responding to post:', error);
      throw error;
    }
  },

  getCommunityStats: async () => {
    try {
      const response = await api.get('/community/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching community stats:', error);
      throw error;
    }
  }
};