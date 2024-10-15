export interface Chat {
  id: number;
  name: string;
  lastMessage: string;
}

export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'contact';
  timestamp: string;
}