import React, { useState, useEffect, useRef } from 'react';
import { chatService } from '../services/chatService';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      text: "Hi there! I'm here to listen and support you. How are you feeling today? Remember, this is a safe space where you can share anything on your mind. 💙",
      isBot: true,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await chatService.sendMessage(inputMessage);
      
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: response,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
      
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment. In the meantime, remember that you're not alone and your feelings are valid. 💜",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    "I'm feeling anxious",
    "I had a good day",
    "I'm struggling with stress",
    "I need motivation",
    "I feel lonely"
  ];

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-calm-50">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">AI Support Companion</h1>
                  <p className="text-primary-100">Always here to listen, never here to judge</p>
                </div>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-calm-100 text-calm-800 rounded-bl-none'
                      : 'bg-primary-500 text-white rounded-br-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isBot ? 'text-calm-500' : 'text-primary-200'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-calm-100 text-calm-800 px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-calm-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-calm-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-calm-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-calm-200 p-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm hover:bg-primary-200 transition-colors duration-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind... Press Enter to send"
                  className="flex-1 px-4 py-2 border border-calm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
                  rows="2"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    inputMessage.trim() && !isLoading
                      ? 'btn-primary'
                      : 'bg-calm-300 text-calm-500 cursor-not-allowed'
                  }`}
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <span className="text-yellow-600 text-xl">⚠️</span>
              <div className="text-yellow-800">
                <p className="font-medium">Important Reminder:</p>
                <p className="text-sm">If you're having thoughts of self-harm or suicide, please reach out for immediate help. Contact KIRAN (1800-599-0019) or visit your nearest emergency room.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;