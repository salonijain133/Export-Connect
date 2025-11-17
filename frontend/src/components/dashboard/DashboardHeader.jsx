import { useAuth } from "../../contexts/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { User, LogOut, Bell, Settings, HelpCircle, Search, Menu } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { cn } from "../../lib/utils"

const DashboardHeader = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section - Logo and Search */}
        <div className="flex items-center gap-4 flex-1">
          <h1 className="-ml-4 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700 hidden md:block">
          </h1>
          
          {/* Search Bar - Responsive */}
          <div className={cn(
            "relative flex-1 max-w-2xl transition-all duration-300",
            showSearch ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full md:opacity-100 md:translate-x-0"
          )}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-blue-50 hover:text-blue-600 transition-colors"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-80 bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl p-2" 
              align="end"
            >
              <div className="flex items-center justify-between px-2 py-1.5">
                <h3 className="text-sm font-medium text-slate-900">Notifications</h3>
                <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  Mark all as read
                </Button>
              </div>
              <DropdownMenuSeparator className="bg-slate-100" />
              <div className="max-h-[300px] overflow-y-auto">
                {/* Sample Notifications - Replace with actual notifications */}
                <div className="p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                  <p className="text-sm text-slate-900">New order received</p>
                  <p className="text-xs text-slate-500">2 minutes ago</p>
                </div>
                <div className="p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                  <p className="text-sm text-slate-900">Product status updated</p>
                  <p className="text-xs text-slate-500">1 hour ago</p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-slate-100" />
              <Button variant="ghost" className="w-full justify-center text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                View all notifications
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-9 w-9 rounded-full hover:bg-blue-500 bg-blue-700 text-white transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full font-medium shadow-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl" 
              align="end" 
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-slate-900">{user?.name}</p>
                  <p className="text-xs leading-none text-slate-500">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem 
                onClick={() => navigate("/dashboard/profile")}
                className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/dashboard/settings")}
                className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/help")}
                className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem 
                onClick={logout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
