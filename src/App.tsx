import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import { Chat, Message } from './types';
import { fetchChats, fetchMessages, sendMessage } from './api';

const socket = io(import.meta.env.VITE_SOCKET_URL);

function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchChats().then(setChats);

    socket.on('newMessage', ({ chatId, message }) => {
      if (selectedChat && selectedChat.id === parseInt(chatId)) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
      // Update last message in chat list
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === parseInt(chatId) ? { ...chat, lastMessage: message.content } : chat
        )
      );
    });

    return () => {
      socket.off('newMessage');
    };
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id).then(setMessages);
    }
  }, [selectedChat]);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = async (content: string) => {
    if (selectedChat) {
      const newMessage = await sendMessage(selectedChat.id, content, 'user');
      setMessages([...messages, newMessage]);
      // Update the last message in the chat list
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChat.id ? { ...chat, lastMessage: content } : chat
        )
      );
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