
import React, { useState } from "react";
import { Menu, Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TopBar = ({ onMenuClick }) => {
  const [notifications] = useState([
    { id: 1, title: "New patient registered", time: "5 min ago", unread: true },
    { id: 2, title: "Appointment scheduled", time: "15 min ago", unread: true },
    { id: 3, title: "Lab results available", time: "1 hour ago", unread: false },
    { id: 4, title: "System maintenance scheduled", time: "2 hours ago", unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="flex h-16 items-center justify-between bg-white border-b px-4 md:px-6">
      {/* Left side - Menu button and search */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="p-2"
        >
          <Menu size={20} />
        </Button>
        
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 min-w-[300px]">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search patients, doctors, records..."
            className="bg-transparent border-none outline-none text-sm flex-1"
          />
        </div>
      </div>

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center gap-2">
        {/* Search button for mobile */}
        <Button variant="ghost" size="sm" className="md:hidden p-2">
          <Search size={20} />
        </Button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell size={20} />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    notification.unread ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <Button variant="ghost" className="w-full text-sm">
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-[#274D60] text-white">
                  DR
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Dr. Sarah Johnson</p>
                <p className="text-xs leading-none text-muted-foreground">
                  sarah.johnson@hospital.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
