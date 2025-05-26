
import React, { useState } from "react";
import { Search, Send, MoreVertical, Phone, Video } from "lucide-react";

// Inline utility function
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Inline UI Components
const Button = ({ className, variant = "default", size = "default", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};

const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

const Card = ({ className, ...props }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6", className)} {...props} />
);

const ScrollArea = ({ className, children, ...props }) => (
  <div className={cn("relative overflow-auto", className)} {...props}>
    {children}
  </div>
);

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  // Mock data
  const conversations = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      lastMessage: "Patient appointment confirmed for tomorrow",
      time: "2 min ago",
      unread: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      isOnline: true,
    },
    {
      id: 2,
      name: "Dr. Michael Brown",
      lastMessage: "Lab results are ready for review",
      time: "15 min ago",
      unread: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      isOnline: false,
    },
    {
      id: 3,
      name: "Nurse Emma Wilson",
      lastMessage: "Medication schedule updated",
      time: "1 hour ago",
      unread: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      isOnline: true,
    },
    {
      id: 4,
      name: "Dr. David Chen",
      lastMessage: "Emergency consultation needed",
      time: "2 hours ago",
      unread: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      isOnline: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      content: "Good morning! I wanted to confirm the appointment for Mrs. Thompson tomorrow at 10 AM.",
      time: "09:15",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Yes, that's confirmed. I've already prepared her file and the necessary tests.",
      time: "09:18",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      content: "Perfect! Also, please make sure to have her latest blood work results ready.",
      time: "09:20",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content: "Already done. The results are in her file and everything looks normal.",
      time: "09:22",
      isOwn: true,
    },
    {
      id: 5,
      sender: "Dr. Sarah Johnson",
      content: "Excellent work as always. See you tomorrow!",
      time: "09:25",
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="h-full">
      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .online-indicator {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 12px;
          height: 12px;
          background-color: #10b981;
          border: 2px solid white;
          border-radius: 50%;
        }
        
        .message-bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 16px;
          word-wrap: break-word;
        }
        
        .message-own {
          background-color: #274D60;
          color: white;
          margin-left: auto;
        }
        
        .message-other {
          background-color: #f3f4f6;
          color: #111827;
        }
        
        .unread-badge {
          background-color: #274D60;
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Communicate with your healthcare team</p>
      </div>

      <Card className="h-[700px]">
        <div className="flex h-full">
          {/* Conversation List */}
          <div className="w-80 border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-9" />
              </div>
            </div>
            
            <ScrollArea className="h-full">
              <div className="p-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedChat(conversation.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedChat === conversation.id
                        ? "bg-[#274D60] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {conversation.isOnline && <div className="online-indicator"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conversation.name}</p>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="unread-badge">{conversation.unread}</div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={conversations.find(c => c.id === selectedChat)?.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">
                    {conversations.find(c => c.id === selectedChat)?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {conversations.find(c => c.id === selectedChat)?.isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`message-bubble ${message.isOwn ? "message-own" : "message-other"}`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? "text-white/70" : "text-gray-500"}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#274D60] hover:bg-[#1A3A4A] text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Messages;
