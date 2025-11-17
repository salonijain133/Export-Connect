import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Loader2, Globe, User, Building2, Globe2, Mail, Lock } from "lucide-react"

const demoUsers = {
  buyer: {
    email: "demobuyer@gmail.com",
    password: "12345678",
  },
  exporter: {
    email: "demoexporter@gmail.com",
    password: "12345678",
  },
  shipper: {
    email: "demoshipper@gmail.com",
    password: "12345678",
  },
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const { login, isLoading } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleDemoLogin = (role) => {
    setFormData(demoUsers[role])
    setErrors({})
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"

    if (!formData.password) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      await login(formData.email, formData.password)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-custom">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
              <Globe className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Sign in to your XportConnect account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Demo role buttons */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-gray-700 text-center">
              Login as Demo User
            </div>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleDemoLogin("buyer")}
                className="p-4 rounded-lg border-2 transition-all duration-200 border-gray-200 hover:border-blue-500 hover:bg-blue-50"
              >
                <div className="flex flex-col items-center">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">Buyer</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("exporter")}
                className="p-4 rounded-lg border-2 transition-all duration-200 border-gray-200 hover:border-blue-500 hover:bg-blue-50"
              >
                <div className="flex flex-col items-center">
                  <Building2 className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">Exporter</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("shipper")}
                className="p-4 rounded-lg border-2 transition-all duration-200 border-gray-200 hover:border-blue-500 hover:bg-blue-50"
              >
                <div className="flex flex-col items-center">
                  <Globe2 className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">Shipper</span>
                </div>
              </button>
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="h-4 w-4 text-gray-500" />
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Create one here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
