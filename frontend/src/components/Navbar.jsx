import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu, Globe, User, LogOut, LayoutDashboard, LogIn, UserPlus } from "lucide-react"

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Track scrolling to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if link is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header 
      className={`sticky px-4 md:px-6 top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200" 
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
              XportConnect
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link 
              to="/" 
              className={`transition-all duration-200 hover:text-blue-600 relative py-2 ${
                isActive("/") ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              {isActive("/") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
              )}
              Home
            </Link>
            <Link 
              to="/products" 
              className={`transition-all duration-200 hover:text-blue-600 relative py-2 ${
                isActive("/products") ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              {isActive("/products") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
              )}
              Products
            </Link>
            <Link 
              to="/about" 
              className={`transition-all duration-200 hover:text-blue-600 relative py-2 ${
                isActive("/about") ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              {isActive("/about") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
              )}
              About
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={logout}
                className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 font-medium transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <UserPlus className="h-4 w-4" />
                Register
              </Button>
            </>
          )}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-10 w-10 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
            >
              <Menu className="h-5 w-5 text-blue-700" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="border-r border-gray-200 bg-white">
            <div className="flex flex-col items-center mt-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <span className="text-xl font-bold mt-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
                XportConnect
              </span>
            </div>
            <div className="flex flex-col gap-2 mt-8">
              <Link 
                to="/" 
                className={`text-lg font-medium flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 ${
                  isActive("/") ? "text-blue-700 bg-blue-50/70" : "text-gray-700"
                }`} 
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </Link>
              <Link 
                to="/products" 
                className={`text-lg font-medium flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 ${
                  isActive("/products") ? "text-blue-700 bg-blue-50/70" : "text-gray-700"
                }`} 
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Products
              </Link>
              <Link 
                to="/about" 
                className="text-lg font-medium flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 text-gray-700" 
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                About
              </Link>
              <div className="h-px bg-blue-100 my-4" />
              {isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate("/dashboard")
                      setIsOpen(false)
                    }}
                    className="text-lg font-medium flex items-center justify-start gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 transition-all duration-200"
                  >
                    <LayoutDashboard className="h-5 w-5 text-blue-600" />
                    Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="text-lg font-medium flex items-center justify-start gap-3 px-4 py-3 rounded-lg border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5 text-blue-600" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate("/login")
                      setIsOpen(false)
                    }}
                    className="text-lg font-medium flex items-center justify-start gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 transition-all duration-200"
                  >
                    <LogIn className="h-5 w-5 text-blue-600" />
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/register")
                      setIsOpen(false)
                    }}
                    className="text-lg font-medium flex items-center justify-start gap-3 mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-200"
                  >
                    <UserPlus className="h-5 w-5" />
                    Register
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Navbar