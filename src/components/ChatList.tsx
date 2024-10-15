import React from 'react';
import { Chat } from '../types';
import { MessageSquare } from 'lucide-react';

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  selectedChat: Chat | null;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, selectedChat }) => {
  return (
    <div className="w-1/4 bg-white border-r border-gray-300 overflow-y-auto">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-300">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`p-4 hover:bg-gray-100 cursor-pointer ${
              selectedChat?.id === chat.id ? 'bg-blue-100' : ''
            }`}
            onClick={() => onSelectChat(chat)}
          >
            <div className="flex items-center">
              <MessageSquare className="w-10 h-10 text-gray-500 mr-3" />
              <div>
                <h3 className="font-semibold">{chat.name}</h3>
                <p className="text-sm text-gray-500">{chat.lastMessage}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;