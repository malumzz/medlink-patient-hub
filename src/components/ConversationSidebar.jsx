import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ConversationSidebar = ({ conversations, selectedConversationId, onSelectConversation, searchTerm, onSearchChange }) => {
  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return messageTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return messageTime.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getLastMessage = (messages) => {
    if (!messages || messages.length === 0) return 'No messages';
    const lastMessage = messages[messages.length - 1];
    return lastMessage.content.length > 50 
      ? lastMessage.content.substring(0, 50) + '...'
      : lastMessage.content;
  };

  const getUnreadCount = (messages) => {
    return messages.filter(msg => !msg.read && msg.sender !== 'You').length;
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-80 bg-white border-r flex flex-col">
      {/* Header */}
      <div className="p-3 md:p-4 border-b">
        <h1 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => {
          const unreadCount = getUnreadCount(conversation.messages);
          const lastMessage = conversation.messages[conversation.messages.length - 1];
          
          return (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`p-3 md:p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversationId === conversation.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                    {conversation.participant.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate text-sm md:text-base">
                      {conversation.participant}
                    </h3>
                    {lastMessage && (
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {formatTime(lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 mb-1 truncate">{conversation.role}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs md:text-sm text-gray-500 truncate flex-1">
                      {getLastMessage(conversation.messages)}
                    </p>
                    {unreadCount > 0 && (
                      <Badge variant="default" className="ml-2 bg-blue-500 text-xs flex-shrink-0">
                        {unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationSidebar;
