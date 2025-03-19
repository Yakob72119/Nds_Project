'use client';
import { useState } from 'react';

export default function AdminChat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [users] = useState([
    { id: 1, name: 'John Doe', unread: 2 },
    { id: 2, name: 'Jane Smith', unread: 0 },
  ]);
  const [chats] = useState({
    1: [
      { id: 1, sender: 'user', message: 'Hello, I need help with my service', time: '10:00' },
      { id: 2, sender: 'admin', message: 'Hi! How can I help you today?', time: '10:01' },
    ],
    2: [
      { id: 1, sender: 'user', message: 'Is my payment processed?', time: '09:30' },
    ],
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() && selectedUser) {
      // Add message handling logic here
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow h-[calc(100vh-8rem)]">
      <div className="flex h-full">
        {/* Users List */}
        <div className="w-1/4 border-r">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Chats</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {users.map(user => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 flex justify-between items-center ${
                  selectedUser === user.id ? 'bg-gray-50' : ''
                }`}
              >
                <span>{user.name}</span>
                {user.unread > 0 && (
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {user.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <div className="p-4 border-b">
                <h3 className="font-semibold">
                  {users.find(u => u.id === selectedUser)?.name}
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chats[selectedUser]?.map(chat => (
                  <div
                    key={chat.id}
                    className={`flex ${chat.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      chat.sender === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}>
                      <p>{chat.message}</p>
                      <span className="text-xs opacity-70">{chat.time}</span>
                    </div>
                  </div>
                ))}
              </div>
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
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 