import React from 'react';
import { cn } from '../../lib/utils';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500',
    secondary: 'bg-surface-100 text-surface-900 hover:bg-surface-200 focus:ring-surface-500',
    ghost: 'hover:bg-surface-100 focus:ring-surface-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    icon: 'hover:bg-surface-100 focus:ring-surface-500'
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm rounded-md',
    md: 'h-10 px-4 text-sm rounded-md',
    lg: 'h-12 px-6 text-base rounded-lg',
    icon: 'h-8 w-8 p-0 rounded-md'
  };
  
  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;