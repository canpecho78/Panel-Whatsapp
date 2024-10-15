import { Chat, Message } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchChats = async (): Promise<Chat[]> => {
  const response = await fetch(`${API_URL}/api/chats`);
  return response.json();
};

export const fetchMessages = async (chatId: number): Promise<Message[]> => {
  const response = await fetch(`${API_URL}/api/messages/${chatId}`);
  return response.json();
};

export const sendMessage = async (chatId: number, content: string, sender: 'user' | 'contact'): Promise<Message> => {
  const response = await fetch(`${API_URL}/api/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chatId, content, sender }),
  });
  return response.json();
};