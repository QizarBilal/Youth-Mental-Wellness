import React, { useState, useEffect } from 'react';
import { communityService } from '../services/communityService';

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');

  const categories = [
    { id: 'general', label: 'General Support', icon: '💬', color: 'bg-blue-100 text-blue-700' },
    { id: 'anxiety', label: 'Anxiety & Worry', icon: '😰', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'depression', label: 'Depression & Sadness', icon: '💙', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'stress', label: 'Academic Stress', icon: '📚', color: 'bg-red-100 text-red-700' },
    { id: 'relationships', label: 'Relationships', icon: '💕', color: 'bg-pink-100 text-pink-700' },
    { id: 'success', label: 'Success Stories', icon: '🌟', color: 'bg-green-100 text-green-700' }
  ];

  const filters = [
    { id: 'all', label: 'All Posts' },
    { id: 'recent', label: 'Recent' },
    { id: 'popular', label: 'Most Supported' }
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const postsData = await communityService.getPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;

    try {
      const postData = {
        content: newPost,
        category: selectedCategory,
        anonymous: true,
        timestamp: new Date()
      };

      await communityService.createPost(postData);
      setNewPost('');
      setShowCreatePost(false);
      loadPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleSupport = async (postId) => {
    try {
      await communityService.supportPost(postId);
      loadPosts();
    } catch (error) {
      console.error('Error supporting post:', error);
    }
  };

  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const getFilteredPosts = () => {
    let filtered = posts;
    
    if (activeFilter === 'recent') {
      filtered = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else if (activeFilter === 'popular') {
      filtered = posts.sort((a, b) => b.supportCount - a.supportCount);
    }
    
    return filtered;
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-calm-50 py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-calm-800 mb-4">Community Support</h1>
            <p className="text-xl text-calm-600">Connect with others who understand your journey</p>
          </div>

          <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <span className="text-purple-600 text-xl">🛡️</span>
              <div className="text-purple-800">
                <p className="font-medium">Community Guidelines:</p>
                <ul className="text-sm list-disc list-inside mt-1 space-y-1">
                  <li>Be kind and supportive - we're all here to help each other</li>
                  <li>Respect privacy - posts are anonymous for your safety</li>
                  <li>No personal information sharing or meetup requests</li>
                  <li>If someone is in crisis, encourage them to seek professional help</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="card space-y-6">
                <div>
                  <h3 className="font-semibold text-calm-800 mb-3">Post Filters</h3>
                  <div className="space-y-2">
                    {filters.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                          activeFilter === filter.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'hover:bg-calm-50 text-calm-700'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-calm-800 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category.id} className={`px-3 py-2 rounded-lg text-sm ${category.color}`}>
                        <span className="mr-2">{category.icon}</span>
                        {category.label}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowCreatePost(true)}
                  className="w-full btn-primary"
                >
                  Share Your Story
                </button>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              {getFilteredPosts().map(post => {
                const categoryInfo = getCategoryInfo(post.category);
                return (
                  <div key={post.id} className="card">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold">
                          A
                        </div>
                        <div>
                          <div className="font-medium text-calm-800">Anonymous User</div>
                          <div className="flex items-center space-x-2 text-sm text-calm-500">
                            <span>{getTimeAgo(post.timestamp)}</span>
                            <span>•</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${categoryInfo.color}`}>
                              {categoryInfo.icon} {categoryInfo.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-calm-700 mb-4 whitespace-pre-wrap">{post.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleSupport(post.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                          post.userSupported
                            ? 'bg-pink-100 text-pink-700'
                            : 'bg-calm-100 text-calm-600 hover:bg-pink-100 hover:text-pink-700'
                        }`}
                      >
                        <span>💜</span>
                        <span className="text-sm">Support ({post.supportCount})</span>
                      </button>
                      
                      <div className="flex items-center space-x-4 text-sm text-calm-500">
                        <span>💬 {post.commentCount} responses</span>
                      </div>
                    </div>
                    
                    {post.responses && post.responses.length > 0 && (
                      <div className="mt-4 space-y-3 border-t border-calm-200 pt-4">
                        {post.responses.slice(0, 2).map((response, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              A
                            </div>
                            <div className="flex-1">
                              <p className="text-calm-700 text-sm">{response.content}</p>
                              <div className="text-xs text-calm-500 mt-1">{getTimeAgo(response.timestamp)}</div>
                            </div>
                          </div>
                        ))}
                        {post.responses.length > 2 && (
                          <button className="text-primary-600 text-sm hover:text-primary-700">
                            View all {post.responses.length} responses
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {posts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-xl font-semibold text-calm-800 mb-2">Welcome to the Community</h3>
                  <p className="text-calm-600 mb-4">Be the first to share your story and connect with others</p>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="btn-primary"
                  >
                    Share Your Story
                  </button>
                </div>
              )}
            </div>
          </div>

          {showCreatePost && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-calm-800">Share Your Story</h2>
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className="text-calm-500 hover:text-calm-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-calm-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input-field"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-calm-700 mb-2">Your Message</label>
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thoughts, experiences, or ask for support. Remember, you're posting anonymously..."
                    className="input-field"
                    rows="6"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                    className={`btn-primary ${!newPost.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Share Anonymously
                  </button>
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className="bg-calm-200 text-calm-700 hover:bg-calm-300 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
                
                <div className="mt-4 text-xs text-calm-500">
                  Your post will be completely anonymous. No personal information is stored or shared.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;