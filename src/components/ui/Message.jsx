import React from 'react';
import { formatTime } from '../../lib/utils';
import Avatar from './Avatar';

const Message = ({ 
  message, 
  userAvatar, 
  userName 
}) => {
  const isAgent = message.isUser;
  
  return (
    <div className={`flex ${isAgent ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isAgent ? 'flex-row-reverse' : 'flex-row'} max-w-[85%] items-end`}>
        {!isAgent && (
          <div className="mr-3 flex-shrink-0">
            <Avatar 
              name={userName} 
              src={userAvatar} 
              size="sm" 
              className="border-2 border-white shadow-sm"
            />
          </div>
        )}
        
        <div className="flex flex-col">
          {!isAgent && (
            <span className="text-xs text-surface-500 mb-1">{userName}</span>
          )}
          <div 
            className={`rounded-2xl px-4 py-2.5 ${
              isAgent 
                ? 'bg-brand-100 text-surface-800' 
                : 'bg-surface-100 text-surface-800'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
          </div>
          
          <div className={`flex items-center mt-1 text-xs text-surface-500 ${
            isAgent ? 'justify-end' : 'justify-start'
          }`}>
            <span className="mr-1">{formatTime(message.timestamp)}</span>
            {isAgent && message.seen && (
              <span className="text-xs text-surface-400">· Seen</span>
            )}
          </div>
        </div>
        
        {isAgent && (
          <div className="ml-3 flex-shrink-0">
            <Avatar 
              name="Agent" 
              size="sm" 
              className="bg-green-100 text-green-700 border-2 border-white shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;