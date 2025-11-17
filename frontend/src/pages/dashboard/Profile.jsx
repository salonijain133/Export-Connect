import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import api from "../../services/api"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { useToast } from "../../components/ui/use-toast"
import { Loader2, User, Mail, Shield, Lock, LogOut, Save, AlertCircle } from "lucide-react"

const Profile = () => {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        name: user.name || "",
        email: user.email || "",
      }))
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate passwords match if changing password
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "New password and confirmation must match.",
      })
      return
    }

    try {
      setLoading(true)

      // Only include password fields if user is changing password
      const updateData = {
        name: formData.name,
      }

      if (formData.currentPassword && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword
        updateData.newPassword = formData.newPassword
      }

      await api.put("/auth/profile", updateData)

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })

      // Clear password fields
      setFormData((prevState) => ({
        ...prevState,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to update profile.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
              Your Profile
            </h1>
            <p className="text-slate-600 mt-1">Manage your account settings and preferences</p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">Account Information</CardTitle>
                  <CardDescription className="text-slate-500">Update your account details and password</CardDescription>
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <User className="h-4 w-4" />
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="h-4 w-4" />
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-500"
                  />
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Email cannot be changed
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Shield className="h-4 w-4" />
                    <label htmlFor="role" className="text-sm font-medium">
                      Account Type
                    </label>
                  </div>
                  <input
                    id="role"
                    value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ""}
                    disabled
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-500"
                  />
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-700 mb-4">
                    <Lock className="h-4 w-4" />
                    <h3 className="text-lg font-medium">Change Password</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-4">
                      <label htmlFor="currentPassword" className="text-sm font-medium text-slate-700">
                        Current Password
                      </label>
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                      />
                    </div>

                    <div className="space-y-4">
                      <label htmlFor="newPassword" className="text-sm font-medium text-slate-700">
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                      />
                    </div>

                    <div className="space-y-4">
                      <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                        Confirm New Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between pt-6 border-t border-slate-100">
                <Button
                  variant="outline"
                  type="button"
                  onClick={logout}
                  className="border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 text-slate-700 font-medium rounded-xl py-6 px-8 group"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl py-6 px-8 group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile
