
import React, { useState } from 'react';

const Messages = () => {
  const [messages] = useState([
    {
      id: 1,
      sender: 'Dr. Sarah Johnson',
      subject: 'Patient Follow-up',
      content: 'Please review the latest test results for patient John Doe.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      sender: 'Dr. Michael Brown',
      subject: 'Schedule Update',
      content: 'My afternoon schedule has been updated. Please check availability.',
      time: '4 hours ago',
      read: true
    },
    {
      id: 3,
      sender: 'Admin',
      subject: 'System Maintenance',
      content: 'Scheduled maintenance will occur this weekend from 2-4 AM.',
      time: '1 day ago',
      read: true
    }
  ]);

  return (
    <div className="animate-fade-in">
      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-gray-600 mt-2">Stay connected with your medical team</p>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-lg border bg-white p-6 shadow-sm transition-colors hover:bg-gray-50 ${
              !message.read ? 'border-l-4 border-l-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`font-semibold ${!message.read ? 'text-gray-900' : 'text-gray-700'}`}>
                    {message.sender}
                  </h3>
                  {!message.read && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      New
                    </span>
                  )}
                </div>
                <h4 className={`font-medium mb-2 ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                  {message.subject}
                </h4>
                <p className="text-gray-600 mb-3">{message.content}</p>
                <p className="text-sm text-gray-500">{message.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
