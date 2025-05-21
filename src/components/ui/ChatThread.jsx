import React from 'react';
import { formatTime, truncateText } from '../../utils/utils';
import { cn } from '../../lib/utils';

const ChatThread = ({ thread, isActive, onClick }) => {
  const { customer, lastMessage, timestamp, unread } = thread;

  return (
    <div
      onClick={() => onClick(thread)}
      className={cn(
        'p-4 cursor-pointer transition-colors hover:bg-surface-50',
        isActive && 'bg-surface-50'
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          {customer.avatar ? (
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
              <span className="text-brand-600 font-medium">
                {customer.name.charAt(0)}
              </span>
            </div>
          )}
          {unread && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-surface-900 truncate">
              {customer.name}
            </h3>
            <span className="text-xs text-surface-500">
              {formatTime(timestamp)}
            </span>
          </div>
          <p className="text-sm text-surface-600 truncate">
            {truncateText(lastMessage, 50)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatThread;