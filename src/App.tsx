import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import { Chat, Message } from './types';
import { fetchChats, fetchMessages } from './api';

function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchChats().then(setChats);
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id).then(setMessages);
    }
  }, [selectedChat]);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (content: string) => {
    if (selectedChat) {
      const newMessage: Message = {
        id: Date.now(),
        content,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      // Here you would typically send the message to your backend
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatList chats={chats} onSelectChat={handleChatSelect} selectedChat={selectedChat} />
      {selectedChat ? (
        <ChatWindow
          chat={selectedChat}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
}

export default App;