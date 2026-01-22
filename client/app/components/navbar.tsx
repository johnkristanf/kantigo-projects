import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '~/components/ui/dropdown-menu';
  import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { ChevronDown, User } from 'lucide-react';

export const NavBar = () => {
    return (
        <nav className="bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600 text-white px-6 py-4 shadow-xl backdrop-blur-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">

          <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10 ">
                  <AvatarImage src={`/kantigo_logo.png`} />
                  <AvatarFallback className="bg-white text-blue-600 text-xl font-bold">
                    KantigGo Projects Logo
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold tracking-tight">KantiGo Projects</h1>

          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-white/20 px-4 py-2 rounded-xl transition-all focus:outline-none backdrop-blur-sm">
              <div className="w-9 h-9 bg-linear-to-br from-white to-blue-50 rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-semibold">John Doe</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    )
}