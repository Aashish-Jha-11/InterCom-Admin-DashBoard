// Format timestamp to display time in a readable format
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Other utility functions
export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

export const formatDate = (date) => {
  const now = new Date();
  const messageDate = new Date(date);
  
  if (now.toDateString() === messageDate.toDateString()) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (yesterday.toDateString() === messageDate.toDateString()) {
    return 'Yesterday';
  }
  
  return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
};