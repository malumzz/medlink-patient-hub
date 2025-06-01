
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Mail, MailOpen, Archive } from 'lucide-react';
import ComposeMessage from '../components/ComposeMessage';
import MessageDetails from '../components/MessageDetails';
import { useToast } from '@/hooks/use-toast';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageDetails, setShowMessageDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('inbox');
  const { toast } = useToast();

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      setMessages(parsedMessages);
      setFilteredMessages(parsedMessages);
    } else {
      // Default messages
      const defaultMessages = [
        {
          id: 1,
          sender: 'Dr. Sarah Johnson',
          subject: 'Patient Follow-up',
          content: 'Please review the latest test results for patient John Doe. The blood work shows some concerning values that we need to discuss.',
          time: '2 hours ago',
          read: false,
          type: 'received'
        },
        {
          id: 2,
          sender: 'Dr. Michael Brown',
          subject: 'Schedule Update',
          content: 'My afternoon schedule has been updated. Please check availability for the emergency surgery planned for tomorrow.',
          time: '4 hours ago',
          read: true,
          type: 'received'
        },
        {
          id: 3,
          sender: 'Admin',
          subject: 'System Maintenance',
          content: 'Scheduled maintenance will occur this weekend from 2-4 AM. Please save all important work before this time.',
          time: '1 day ago',
          read: true,
          type: 'received'
        }
      ];
      setMessages(defaultMessages);
      setFilteredMessages(defaultMessages);
      localStorage.setItem('messages', JSON.stringify(defaultMessages));
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  // Filter messages based on search term and active tab
  useEffect(() => {
    let filtered = messages;

    // Filter by tab
    if (activeTab === 'sent') {
      filtered = filtered.filter(message => message.type === 'sent');
    } else if (activeTab === 'unread') {
      filtered = filtered.filter(message => !message.read && message.type === 'received');
    } else {
      // inbox - show received messages
      filtered = filtered.filter(message => message.type === 'received');
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, activeTab]);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setShowMessageDetails(true);
    
    // Mark as read if it's unread
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  const markAsRead = (messageId) => {
    setMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === messageId ? { ...message, read: true } : message
      )
    );
  };

  const markAsUnread = (messageId) => {
    setMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === messageId ? { ...message, read: false } : message
      )
    );
  };

  const deleteMessage = (messageId) => {
    setMessages(prevMessages =>
      prevMessages.filter(message => message.id !== messageId)
    );
  };

  const handleMessageSent = (newMessage) => {
    setMessages(prevMessages => [newMessage, ...prevMessages]);
  };

  const handleReply = (replyMessage) => {
    setMessages(prevMessages => [replyMessage, ...prevMessages]);
  };

  const unreadCount = messages.filter(message => !message.read && message.type === 'received').length;
  const sentCount = messages.filter(message => message.type === 'sent').length;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-gray-600 mt-2">Stay connected with your medical team</p>
          </div>
          <ComposeMessage onMessageSent={handleMessageSent} />
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inbox" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Inbox
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            Sent
            {sentCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {sentCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex items-center gap-2">
            <MailOpen className="h-4 w-4" />
            Unread
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="mt-4">
          <MessageList 
            messages={filteredMessages}
            onMessageClick={handleMessageClick}
            onMarkAsRead={markAsRead}
            onMarkAsUnread={markAsUnread}
            onDeleteMessage={deleteMessage}
          />
        </TabsContent>

        <TabsContent value="sent" className="mt-4">
          <MessageList 
            messages={filteredMessages}
            onMessageClick={handleMessageClick}
            onMarkAsRead={markAsRead}
            onMarkAsUnread={markAsUnread}
            onDeleteMessage={deleteMessage}
            showSentIndicator={true}
          />
        </TabsContent>

        <TabsContent value="unread" className="mt-4">
          <MessageList 
            messages={filteredMessages}
            onMessageClick={handleMessageClick}
            onMarkAsRead={markAsRead}
            onMarkAsUnread={markAsUnread}
            onDeleteMessage={deleteMessage}
          />
        </TabsContent>
      </Tabs>

      <MessageDetails
        message={selectedMessage}
        isOpen={showMessageDetails}
        onClose={() => setShowMessageDetails(false)}
        onReply={handleReply}
        onDelete={deleteMessage}
      />
    </div>
  );
};

const MessageList = ({ messages, onMessageClick, onMarkAsRead, onMarkAsUnread, onDeleteMessage, showSentIndicator = false }) => {
  if (messages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>No messages found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`rounded-lg border bg-white p-4 shadow-sm transition-colors hover:bg-gray-50 cursor-pointer ${
            !message.read && !showSentIndicator ? 'border-l-4 border-l-blue-500' : ''
          }`}
          onClick={() => onMessageClick(message)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`font-semibold ${!message.read && !showSentIndicator ? 'text-gray-900' : 'text-gray-700'}`}>
                  {showSentIndicator ? `To: ${message.recipient}` : message.sender}
                </h3>
                {!message.read && !showSentIndicator && (
                  <Badge variant="secondary" className="text-xs">
                    New
                  </Badge>
                )}
                {showSentIndicator && (
                  <Badge variant="outline" className="text-xs">
                    Sent
                  </Badge>
                )}
              </div>
              <h4 className={`font-medium mb-2 ${!message.read && !showSentIndicator ? 'text-gray-900' : 'text-gray-600'}`}>
                {message.subject}
              </h4>
              <p className="text-gray-600 mb-3 line-clamp-2">{message.content}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{message.time}</p>
                <div className="flex items-center space-x-2">
                  {!showSentIndicator && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        message.read ? onMarkAsUnread(message.id) : onMarkAsRead(message.id);
                      }}
                    >
                      {message.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
