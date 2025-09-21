import api from './api';

export const resourceService = {
  getResources: async () => {
    try {
      const response = await api.get('/resources');
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
  },

  getResourceById: async (id) => {
    try {
      const response = await api.get(`/resources/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resource:', error);
      throw error;
    }
  },

  searchResources: async (query, category) => {
    try {
      const params = {};
      if (query) params.q = query;
      if (category) params.category = category;
      
      const response = await api.get('/resources/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching resources:', error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/resources/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};