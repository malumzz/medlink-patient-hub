
import React, { useState } from "react";
import { Search, Send, PaperclipIcon } from "lucide-react";

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

const Avatar = ({ className, children, ...props }) => (
  <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props}>
    {children}
  </div>
);

const AvatarImage = ({ className, ...props }) => (
  <img className={cn("aspect-square h-full w-full", className)} {...props} />
);

const AvatarFallback = ({ className, ...props }) => (
  <div className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)} {...props} />
);

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState("DR001");
  const [message, setMessage] = useState("");

  // Mock user data (active user)
  const currentUser = {
    id: "USR001",
    name: "Nurse Amanda",
    role: "Head Nurse",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
  };

  // Mock conversations
  const conversations = [
    {
      id: "DR001",
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      unread: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      lastMessage: "I'll check the patient's records and update you.",
      time: "10:45 AM",
      online: true,
    },
    {
      id: "DR002",
      name: "Dr. David Wilson",
      role: "Neurologist",
      unread: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      lastMessage: "The MRI results are in. We need to discuss them.",
      time: "Yesterday",
      online: false,
    },
    {
      id: "DR003",
      name: "Dr. Emily Davis",
      role: "Pediatrician",
      unread: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      lastMessage: "Can you prepare room 302 for the next patient?",
      time: "Yesterday",
      online: true,
    },
    {
      id: "NR001",
      name: "Nurse Rachel",
      role: "ER Nurse",
      unread: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
      lastMessage: "Emergency case coming in. Need assistance.",
      time: "2 days ago",
      online: true,
    },
  ];

  // Mock messages for the selected chat
  const mockMessages = {
    DR001: [
      {
        id: "m1",
        sender: "DR001",
        text: "Hello Nurse Amanda, how are the patients in ward 3 doing today?",
        time: "10:30 AM",
      },
      {
        id: "m2",
        sender: "USR001",
        text: "Good morning Dr. Johnson! All stable. Mr. Peterson's blood pressure has improved since yesterday.",
        time: "10:32 AM",
      },
      {
        id: "m3",
        sender: "DR001",
        text: "That's great news. What about Mrs. Rodriguez? Has she taken her medication?",
        time: "10:35 AM",
      },
      {
        id: "m4",
        sender: "USR001",
        text: "Yes, she's taken all scheduled medications. Her temperature is now normal.",
        time: "10:38 AM",
      },
      {
        id: "m5",
        sender: "DR001",
        text: "Perfect. I'll be making rounds after lunch. Please prepare their charts.",
        time: "10:40 AM",
      },
      {
        id: "m6",
        sender: "USR001",
        text: "Will do. Anything specific you want to check with any patient?",
        time: "10:42 AM",
      },
      {
        id: "m7",
        sender: "DR001",
        text: "I'll check the patient's records and update you.",
        time: "10:45 AM",
      },
    ],
  };

  // Get messages for selected chat
  const getMessages = (chatId) => {
    return mockMessages[chatId] || [];
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      // In a real app, this would send to API
      console.log(`Sending message to ${selectedChat}: ${message}`);
      setMessage("");
    }
  };

  // Get selected conversation details
  const selectedConversation = selectedChat
    ? conversations.find((conv) => conv.id === selectedChat)
    : null;

  return (
    <div className="animate-fade-in">
      {/* Inline styles for this component */}
      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <h1 className="mb-6 text-3xl font-bold">Messages</h1>

      <div className="grid h-[75vh] grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <div className="border-b p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
            </div>
            <div className="h-[calc(75vh-130px)] overflow-auto">
              {conversations.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex cursor-pointer items-center border-b p-4 hover:bg-muted/50 ${
                    selectedChat === chat.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{chat.role}</p>
                    <p className="mt-1 truncate text-sm">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#274D60] text-xs text-white">
                      {chat.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2">
          <CardContent className="flex h-full flex-col p-0">
            {selectedChat && selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center border-b p-4">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                      <AvatarFallback>{selectedConversation.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {selectedConversation.online && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{selectedConversation.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedConversation.role}</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-auto p-4">
                  <div className="space-y-4">
                    {getMessages(selectedChat).map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === currentUser.id ? "justify-end" : ""}`}
                      >
                        {msg.sender !== currentUser.id && (
                          <Avatar className="mr-2 h-8 w-8">
                            <AvatarImage
                              src={selectedConversation.avatar}
                              alt={selectedConversation.name}
                            />
                            <AvatarFallback>{selectedConversation.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.sender === currentUser.id
                              ? "bg-[#274D60] text-white"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`mt-1 text-right text-xs ${
                              msg.sender === currentUser.id
                                ? "text-white/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {msg.time}
                          </p>
                        </div>
                        {msg.sender === currentUser.id && (
                          <Avatar className="ml-2 h-8 w-8">
                            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                            <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" className="mr-2">
                      <PaperclipIcon className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                      className="flex-1"
                    />
                    <Button
                      className="ml-2 bg-[#274D60] hover:bg-[#1A3A4A] text-white"
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
