import React from 'react';
import { cn, getInitials } from '../../lib/utils';

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

const Avatar = ({ 
  name, 
  src, 
  size = 'md', 
  className 
}) => {
  const initials = getInitials(name);
  
  return (
    <div 
      className={cn(
        'flex items-center justify-center rounded-full bg-brand-200 text-brand-700 font-medium',
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img 
          src={src} 
          alt={name} 
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;