'use client';
import { useState } from 'react';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements([
        {
          id: Date.now(),
          ...newAnnouncement,
          date: new Date().toLocaleDateString(),
        },
        ...announcements,
      ]);
      setNewAnnouncement({ title: '', content: '' });
    }
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Create Announcement Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Create Announcement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({
                ...newAnnouncement,
                title: e.target.value
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Announcement Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={newAnnouncement.content}
              onChange={(e) => setNewAnnouncement({
                ...newAnnouncement,
                content: e.target.value
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Announcement Content"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Post Announcement
          </button>
        </form>
      </div>

      {/* Announcements List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Recent Announcements</h2>
        <div className="space-y-4">
          {announcements.map(announcement => (
            <div key={announcement.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{announcement.title}</h3>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-600 mb-2">{announcement.content}</p>
              <span className="text-sm text-gray-500">{announcement.date}</span>
            </div>
          ))}
          {announcements.length === 0 && (
            <p className="text-gray-500 text-center py-4">No announcements yet</p>
          )}
        </div>
      </div>
    </div>
  );
} 