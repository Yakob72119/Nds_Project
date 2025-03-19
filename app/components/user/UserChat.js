'use client';
import { useState } from 'react';

export default function UserChat() {
  const [message, setMessage] = useState('');
  const [chats] = useState([
    { id: 1, sender: 'user', message: 'Hello, I need help with my service', time: '10:00' },
    { id: 2, sender: 'admin', message: 'Hi! How can I help you today?', time: '10:01' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add message handling logic here
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow h-[calc(100vh-8rem)]">
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Chat with Admin</h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] rounded-lg p-3 ${
                chat.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}>
                <p>{chat.message}</p>
                <span className="text-xs opacity-70">{chat.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSend} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 