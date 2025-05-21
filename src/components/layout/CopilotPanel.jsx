import React, { useRef, useState, useEffect } from 'react';
import Tabs from '../ui/Tab';
import Button from '../ui/Button';
import { BookOpen, Sparkles, Send, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { sendMessageToAI } from '../../utils/api';
import { suggestedQuestions } from '../../data/constants';

const CopilotPanel = () => {
  const [activeTab, setActiveTab] = useState('copilot');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);
  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = query.trim();
    setQuery('');
    setIsLoading(true);
    setError(null);

    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await sendMessageToAI(userMessage);
      setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setError('Failed to get response from AI. Please try again.');
      console.error('Error:', err);
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
  
  const tabs = [
    { id: 'copilot', label: (
      <div className="flex items-center">
        <Sparkles className="h-4 w-4 mr-1.5" />
        <span>AI Copilot</span>
      </div>
    )},
    { id: 'details', label: 'Details' },
  ];
  
  return (
    <div className="flex flex-col h-full border-l border-surface-200 bg-white">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={handleTabChange}
        className="px-4"
      />
      
      {activeTab === 'copilot' && (
        <div className="flex flex-col h-full">
          <div className="bg-surface-50 rounded-lg p-4 m-4 animate-fade-in">
            <div className="flex items-center mb-2">
              <div className="p-1.5 bg-black rounded-md mr-2">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold">Hi, I'm Fin AI Copilot</span>
            </div>
            <p className="text-sm text-surface-600">
              Ask me anything about this conversation.
            </p>
          </div>
          
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 space-y-4 min-h-0"
            style={{ maxHeight: 'calc(100vh - 400px)' }}
          >
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'p-3 rounded-lg max-w-[85%] break-words',
                  message.role === 'user' 
                    ? 'bg-brand-100 ml-auto' 
                    : 'bg-surface-100'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
              </div>
            )}
            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                {error}
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-surface-200 bg-white">
            <div className="mb-4">
              <h3 className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-2">
                Suggested Questions
              </h3>
              <div className="space-y-2">
                {suggestedQuestions?.map((question, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-2 p-2 bg-surface-50 rounded-md text-sm cursor-pointer hover:bg-surface-100 transition-colors"
                    onClick={() => {
                      setQuery(question);
                      handleSendMessage();
                    }}
                  >
                    <BookOpen className="h-4 w-4 text-surface-500" />
                    <span>{question}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={cn(
              'flex items-center rounded-lg border border-surface-300 bg-white transition-shadow focus-within:ring-2 focus-within:ring-brand-300 focus-within:border-brand-400',
              query.length > 0 && 'border-brand-400'
            )}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 focus:outline-none text-sm"
                disabled={isLoading}
              />
              <div className="pr-2">
                <Button 
                  variant="icon" 
                  size="sm" 
                  type="button"
                  disabled={!query.trim() || isLoading}
                  onClick={handleSendMessage}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'details' && (
        <div className="p-4">
          <h3 className="font-medium mb-2">User Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-surface-500">Name:</span>
              <span>Aashish Jha</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Company:</span>
              <span>Github</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">First seen:</span>
              <span>May 20, 2025</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopilotPanel;