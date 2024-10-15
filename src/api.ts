import { Chat, Message } from './types';

// Mock data
const mockChats: Chat[] = [
  { id: 1, name: 'John Doe', lastMessage: 'Hello there!' },
  { id: 2, name: 'Jane Smith', lastMessage: 'How are you?' },
  { id: 3, name: 'Bob Johnson', lastMessage: 'See you later' },
];

const mockMessages: { [key: number]: Message[] } = {
  1: [
    { id: 1, content: 'Hi John!', sender: 'user', timestamp: '2023-04-01T10:00:00Z' },
    { id: 2, content: 'Hello there!', sender: 'contact', timestamp: '2023-04-01T10:05:00Z' },
  ],
  2: [
    { id: 1, content: 'Hey Jane', sender: 'user', timestamp: '2023-04-01T11:00:00Z' },
    { id: 2, content: 'How are you?', sender: 'contact', timestamp: '2023-04-01T11:05:00Z' },
  ],
  3: [
    { id: 1, content: 'Hi Bob', sender: 'user', timestamp: '2023-04-01T12:00:00Z' },
    { id: 2, content: 'See you later', sender: 'contact', timestamp: '2023-04-01T12:05:00Z' },
  ],
};

// Mock API functions
export const fetchChats = (): Promise<Chat[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockChats), 500);
  });
};

export const fetchMessages = (chatId: number): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMessages[chatId] || []), 500);
  });
};