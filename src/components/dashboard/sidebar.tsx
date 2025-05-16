
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Book,
  Calendar,
  Layout,
  MessageSquare,
  Users,
  Star,
  Video,
  LogOut,
  Settings,
} from "lucide-react";

export function DashboardSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper functions
  const isActive = (path: string) => currentPath.startsWith(path);
  const isGroupExpanded = (groupPaths: string[]) => groupPaths.some(path => isActive(path));
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground";
  
  return (
    <Sidebar
      className={`${!open ? "w-16" : "w-64"} transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent>
        <div className="p-2">
          <SidebarTrigger className="w-full h-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {!open ? (
                <path d="m9 18 6-6-6-6"/>
              ) : (
                <path d="m15 18-6-6 6-6"/>
              )}
            </svg>
          </SidebarTrigger>
        </div>
        
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/dashboard" end className={getNavCls}>
                <Layout className="mr-2 h-5 w-5" />
                {open && <span>Dashboard</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/dashboard/ai-chatbox" className={getNavCls}>
                <MessageSquare className="mr-2 h-5 w-5" />
                {open && <span>AI Chatbox</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/dashboard/study-plan" className={getNavCls}>
                <Calendar className="mr-2 h-5 w-5" />
                {open && <span>Study Plan</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/dashboard/learning-games" className={getNavCls}>
                <Star className="mr-2 h-5 w-5" />
                {open && <span>Learning Games</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/dashboard/groups" className={getNavCls}>
                <Users className="mr-2 h-5 w-5" />
                {open && <span>Study Groups</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/dashboard/video-chat" className={getNavCls}>
                <Video className="mr-2 h-5 w-5" />
                {open && <span>Video Chat</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/dashboard/resources" className={getNavCls}>
                <Book className="mr-2 h-5 w-5" />
                {open && <span>Resources</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <div className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/dashboard/settings" className={getNavCls}>
                  <Settings className="mr-2 h-5 w-5" />
                  {open && <span>Settings</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/logout" className={getNavCls}>
                  <LogOut className="mr-2 h-5 w-5" />
                  {open && <span>Logout</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
