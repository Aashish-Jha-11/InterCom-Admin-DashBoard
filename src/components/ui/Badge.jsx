import React from 'react';
import { cn } from '../../lib/utils';

const variantClasses = {
  default: 'bg-brand-100 text-brand-700',
  secondary: 'bg-surface-100 text-surface-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  error: 'bg-red-100 text-red-700',
};

const Badge = ({ 
  children, 
  variant = 'default', 
  className 
}) => {
  return (
    <span 
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;