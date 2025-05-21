// Mock data for the chat application
export const mockThreads = [
  {
    id: 1,
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    lastMessage: 'I need help with my order',
    timestamp: new Date('2023-09-01T10:30:00'),
    unread: true
  },
  {
    id: 2,
    customer: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    lastMessage: 'When will my refund be processed?',
    timestamp: new Date('2023-09-01T09:45:00'),
    unread: false
  },
  {
    id: 3,
    customer: {
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    lastMessage: 'Thanks for your help!',
    timestamp: new Date('2023-08-31T15:20:00'),
    unread: false
  }
];

export const mockConversation = [
  {
    id: 1,
    sender: 'John Doe',
    message: 'Hello, I need help with my account',
    timestamp: new Date('2023-09-01T10:30:00'),
    isUser: false
  },
  {
    id: 2,
    sender: 'Support Agent',
    message: 'Hi John, I\'d be happy to help. What seems to be the issue?',
    timestamp: new Date('2023-09-01T10:31:00'),
    isUser: true
  },
  {
    id: 3,
    sender: 'John Doe',
    message: 'I can\'t reset my password.',
    timestamp: new Date('2023-09-01T10:32:00'),
    isUser: false
  },
  {
    id: 4,
    sender: 'Support Agent',
    message: 'I understand. Let me guide you through the password reset process.',
    timestamp: new Date('2023-09-01T10:33:00'),
    isUser: true
  }
];

export const suggestedQuestions = [
  "How do I reset my password?",
  "Where is my order?",
  "How can I request a refund?",
  "What are your business hours?",
  "How do I contact customer support?"
];

export const conversations = {
  1: [
    {
      id: 1,
      sender: 'John Doe',
      message: 'Hello, I need help with my order.',
      timestamp: new Date('2023-09-01T10:30:00'),
      isUser: false
    },
    {
      id: 2,
      sender: 'Support Agent',
      message: 'Hi John, I\'d be happy to help. What seems to be the issue?',
      timestamp: new Date('2023-09-01T10:31:00'),
      isUser: true
    }
  ],
  2: [
    {
      id: 1,
      sender: 'Jane Smith',
      message: 'When will my refund be processed?',
      timestamp: new Date('2023-09-01T09:45:00'),
      isUser: false
    },
    {
      id: 2,
      sender: 'Support Agent',
      message: 'Your refund will be processed within 3-5 business days.',
      timestamp: new Date('2023-09-01T09:46:00'),
      isUser: true
    }
  ],
  3: [
    {
      id: 1,
      sender: 'Robert Johnson',
      message: 'Thanks for your help!',
      timestamp: new Date('2023-08-31T15:20:00'),
      isUser: false
    },
    {
      id: 2,
      sender: 'Support Agent',
      message: 'You\'re welcome, Robert!',
      timestamp: new Date('2023-08-31T15:21:00'),
      isUser: true
    }
  ]
}; 