import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Settings, Users, HelpCircle, Bell } from 'lucide-react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import CopilotPanel from './CopilotPanel';
import { mockThreads } from '../../data/constants';
import { cn } from '../../lib/utils';

const Layout = () => {
  const [threads, setThreads] = useState(mockThreads);
  const [activeThread, setActiveThread] = useState(null);
  const [mobileView, setMobileView] = useState('sidebar');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = threads.filter(thread => thread.unread).length;
    setUnreadCount(count);
  }, [threads]);

  const handleSelectThread = (thread) => {
    setActiveThread(thread);
    setMobileView('chat');
    setShowMobileSidebar(false);
  };

  const handleThreadUpdate = (threadId, updates) => {
    setThreads(prevThreads =>
      prevThreads.map(thread =>
        thread.id === threadId
          ? { ...thread, ...updates }
          : thread
      )
    );
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="h-14 border-b border-surface-200 bg-white flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="lg:hidden p-2 hover:bg-surface-100 rounded-lg"
          >
            {showMobileSidebar ? (
              <X className="h-5 w-5 text-surface-600" />
            ) : (
              <Menu className="h-5 w-5 text-surface-600" />
            )}
          </button>
          <h1 className="text-lg font-semibold text-surface-900">Inbox</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-surface-100 rounded-lg relative">
            <MessageSquare className="h-5 w-5 text-surface-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button className="p-2 hover:bg-surface-100 rounded-lg">
            <Settings className="h-5 w-5 text-surface-600" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className={cn(
          'fixed inset-0 bg-white z-20 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0',
          showMobileSidebar ? 'translate-x-0' : '-translate-x-full',
          'lg:w-80'
        )}>
          <Sidebar
            threads={threads}
            activeThread={activeThread}
            onSelectThread={handleSelectThread}
          />
        </div>

        <div className="flex-1 flex lg:flex-row min-h-0">
          <div className={cn(
            'flex-1 flex flex-col min-w-0 h-full',
            mobileView === 'chat' ? 'block' : 'hidden lg:flex'
          )}>
            <ChatWindow
              activeThread={activeThread}
              onThreadUpdate={handleThreadUpdate}
            />
          </div>
          <div className="w-80 border-l border-surface-200 hidden lg:block h-full bg-white">
            <CopilotPanel activeThread={activeThread} />
          </div>
        </div>

        {mobileView === 'copilot' && (
          <div className="fixed inset-0 bg-white z-20 lg:hidden">
            <CopilotPanel activeThread={activeThread} />
          </div>
        )}
      </div>

      <div className="h-14 border-t border-surface-200 bg-white flex items-center justify-around lg:hidden">
        <button
          onClick={() => setMobileView('sidebar')}
          className={cn(
            'flex-1 h-full flex flex-col items-center justify-center',
            mobileView === 'sidebar' && 'text-brand-500'
          )}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Chats</span>
        </button>
        <button
          onClick={() => setMobileView('copilot')}
          className={cn(
            'flex-1 h-full flex flex-col items-center justify-center',
            mobileView === 'copilot' && 'text-brand-500'
          )}
        >
          <Bell className="h-5 w-5" />
          <span className="text-xs mt-1">Copilot</span>
        </button>
      </div>
    </div>
  );
};

export default Layout;