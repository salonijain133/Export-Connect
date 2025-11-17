import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Home, Package, ShoppingCart, User, LogOut, Menu, X, Globe, Settings, HelpCircle } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { cn } from "../../lib/utils"

const Sidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const navItems = [
    {
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/dashboard",
      show: true,
    },
    {
      label: "My Products",
      icon: <Package className="h-5 w-5" />,
      href: "/dashboard/exporter/products",
      show: user?.role === "exporter",
    },
    {
      label: "Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      href: user?.role === "exporter" ? "/dashboard/exporter/orders" : "/dashboard/shipper/orders",
      show: user?.role === "exporter" || user?.role === "shipper",
    },
    {
      label: "My Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      href: "/dashboard/buyer/orders",
      show: user?.role === "buyer",
    },
    {
      label: "Products",
      icon: <Package className="h-5 w-5" />,
      href: "/products",
      show: user?.role === "buyer",
    },
    {
      label: "Profile",
      icon: <User className="h-5 w-5" />,
      href: "/dashboard/profile",
      show: true,
    },
    {
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/dashboard/settings",
      show: true,
    },
    {
      label: "Help & Support",
      icon: <HelpCircle className="h-5 w-5" />,
      href: "/dashboard/help",
      show: true,
    },
  ]

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden bg-white/80 backdrop-blur-sm hover:bg-white border-slate-200 shadow-sm" 
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-72 bg-white/95 backdrop-blur-sm border-r border-slate-200 transition-transform duration-300 ease-in-out shadow-lg",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                XportConnect
              </span>
            </Link>
          </div>

          <div className="p-6 border-b border-slate-100 bg-gradient-to-br from-blue-50 to-indigo-50/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white font-medium shadow-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-slate-900">{user?.name}</span>
                <span className="text-sm capitalize text-slate-500">{user?.role}</span>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              if (!item.show) return null
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm"
                      : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl py-3"
              onClick={() => {
                logout()
                navigate("/login")
              }}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
