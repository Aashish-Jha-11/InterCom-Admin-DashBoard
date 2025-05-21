import React, { useState } from 'react';
import { ChevronDown, Filter, Search } from 'lucide-react';
import ChatThread from '../ui/ChatThread';
import Button from '../ui/Button';

const Sidebar = ({ 
  threads = [], 
  activeThreadId, 
  onSelectThread 
}) => {
  const [filterLabel, setFilterLabel] = useState("All Messages");
  
  return (
    <div className="flex flex-col h-full border-r border-surface-200">
      <div className="p-4 border-b border-surface-200">
        <h1 className="text-lg font-semibold text-surface-900">Your inbox</h1>
      </div>
      
      <div className="flex items-center px-4 py-2 border-b border-surface-200">
        <div className="flex-1">
          <Button 
            variant="ghost" 
            rightIcon={<ChevronDown className="h-4 w-4" />}
            size="sm"
          >
            {filterLabel}
          </Button>
        </div>
        
        <div className="flex space-x-1">
          <Button variant="icon" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="icon" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {threads.map((thread) => (
          <ChatThread
            key={thread.id}
            thread={thread}
            isActive={thread.id === activeThreadId}
            onClick={() => onSelectThread(thread.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;