import * as React from "react"

import { SearchForm } from "~/components/search-form"
import { VersionSwitcher } from "~/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Link } from "react-router"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Dashboard",
          to: "/admin/dashboard",
          isActive: false
        },
        {
          title: "Projects",
          to: "admin/projects",
          isActive: true
        },
        {
          title: "Users",
          to: "admin/users",
        },
      ],
    },
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
      <div className="flex items-center gap-1">
          <Avatar className="w-9 h-9 ">
            <AvatarImage src="/kantigo_logo.png" />
            <AvatarFallback className="bg-white text-blue-600 text-xl font-bold">
              KantiGo Logo
            </AvatarFallback>
          </Avatar>

          <h1 className="text-lg font-bold tracking-tight">KantiGo Projects</h1>
      </div>

      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <Link to={item.to}>
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <p>{item.title}</p>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
