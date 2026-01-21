import { AppSidebar } from "~/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { Outlet } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="w-full flex justify-end">
            <Avatar className="w-9 h-9 ">
              <AvatarImage src="/kantigo_logo.png" />
              <AvatarFallback className="bg-white text-blue-600 text-xl font-bold">
                KantiGo Logo
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
