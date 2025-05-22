
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, UserRound, MessageSquare, FileText } from "lucide-react";

const Sidebar = () => {
  const navigation = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      title: "Patients",
      icon: Users,
      path: "/patients",
    },
    {
      title: "Doctors",
      icon: UserRound,
      path: "/doctors",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      path: "/messages",
    },
    {
      title: "Records",
      icon: FileText,
      path: "/records",
    },
  ];

  return (
    <SidebarContainer>
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-medical">
            <span className="text-lg font-bold text-white">M</span>
          </div>
          <span className="ml-2 text-xl font-bold text-medical">MediCare</span>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">Healthcare Dashboard</div>
        <SidebarTrigger className="absolute right-4 top-5 md:hidden" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 ${isActive ? "text-medical font-medium" : ""}`
                      }
                    >
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
