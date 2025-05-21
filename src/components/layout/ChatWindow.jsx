import React, { useRef, useState, useEffect } from 'react';
import { Send, Paperclip, Smile, Clock, MoreVertical, Phone, Video, Info } from 'lucide-react';
import Message from '../ui/Message';
import Button from '../ui/Button';
import { mockConversation } from '../../data/constants';
import { cn } from '../../lib/utils';

const ChatWindow = ({ activeThread, onThreadUpdate }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [conversation, setConversation] = useState(mockConversation);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (activeThread?.id) {
      // Update conversation based on active thread
      if (activeThread.id in conversations) {
        setConversation(conversations[activeThread.id]);
      } else {
        setConversation(mockConversation);
      }
    }
    scrollToBottom();
  }, [activeThread?.id, conversation]);

  useEffect(() => {
    if (activeThread?.unread) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        if (onThreadUpdate) {
          onThreadUpdate(activeThread.id, { unread: false });
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeThread?.id, activeThread?.unread, onThreadUpdate]);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'agent',
        message: inputValue.trim(),
        timestamp: new Date(),
        isUser: true
      };
      
      setConversation(prev => [...prev, newMessage]);
      
      if (onThreadUpdate) {
        onThreadUpdate(activeThread.id, {
          lastMessage: inputValue.trim(),
          timestamp: new Date()
        });
      }
      
      setInputValue('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  };
  
  const textareaRef = useRef(null);
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);
  
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-4 border-b border-surface-200">
        <div className="flex items-center space-x-3">
          {activeThread?.customer?.avatar ? (
            <img
              src={activeThread.customer.avatar}
              alt={activeThread?.customer?.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            activeThread?.customer?.name && (
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                <span className="text-brand-600 font-medium">
                  {activeThread.customer.name.charAt(0)}
                </span>
              </div>
            )
          )}
          <h2 className="text-lg font-semibold text-surface-900">
            {activeThread?.customer?.name || 'Chat'}
          </h2>
          {isTyping && (
            <span className="text-sm text-surface-500">typing...</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" title="Call">
            <Phone className="h-4 w-4 text-surface-500" />
          </Button>
          <Button variant="ghost" size="sm" title="Video">
            <Video className="h-4 w-4 text-surface-500" />
          </Button>
          <Button variant="ghost" size="sm" title="Info">
            <Info className="h-4 w-4 text-surface-500" />
          </Button>
          <Button variant="ghost" size="sm" title="More">
            <MoreVertical className="h-4 w-4 text-surface-500" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {conversation?.map((message) => (
            <Message
              key={message.id}
              message={message}
              userName={message.isUser ? 'You' : activeThread?.customer?.name}
              userAvatar={message.isUser ? null : activeThread?.customer?.avatar}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-surface-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className={cn(
            'flex items-end rounded-lg border border-surface-300 bg-white overflow-hidden transition-shadow focus-within:ring-2 focus-within:ring-brand-300 focus-within:border-brand-400',
            inputValue.length > 0 && 'border-brand-400'
          )}>
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              rows={1}
              placeholder="Write a reply..."
              className="flex-1 px-4 py-3 resize-none focus:outline-none text-sm"
            />
            <div className="flex items-center p-2 space-x-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                variant="icon" 
                size="sm" 
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button 
                variant="icon" 
                size="sm" 
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="h-4 w-4" />
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                type="submit" 
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-2 text-xs text-surface-500">
            Use ⌘K for shortcuts
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;