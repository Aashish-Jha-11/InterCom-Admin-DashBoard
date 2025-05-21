import React from 'react';
import { cn } from '../../lib/utils';

const Tabs = ({ 
  tabs, 
  activeTab, 
  onChange, 
  className 
}) => {
  return (
    <div className={cn('border-b border-surface-200', className)}>
      <div className="flex space-x-8">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'py-2 px-1 font-medium text-sm border-b-2 transition-all duration-200',
                isActive
                  ? 'border-brand-600 text-brand-700'
                  : 'border-transparent text-surface-500 hover:text-surface-700 hover:border-surface-300'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;