import React from "react"
import { Bell, Lock, UserCog } from "lucide-react"

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
              Settings
            </h1>
            <p className="text-slate-600 mt-1">Manage your account preferences, notifications, and security</p>
          </div>

          <div className="space-y-8">
            {/* Account Preferences */}
            <div className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-2xl overflow-hidden p-6">
              <div className="flex items-center gap-3 mb-4">
                <UserCog className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-900">Account Preferences</h2>
              </div>
              <p className="text-slate-600 mb-2 text-sm">Update your language, timezone, and other preferences.</p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                  <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 text-lg">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                  <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 text-lg">
                    <option>UTC</option>
                    <option>GMT</option>
                    <option>PST</option>
                    <option>EST</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Notification Settings */}
            <div className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-2xl overflow-hidden p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-900">Notification Settings</h2>
              </div>
              <p className="text-slate-600 mb-2 text-sm">Choose how you want to receive notifications.</p>
              <form className="space-y-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="emailNotif" className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                  <label htmlFor="emailNotif" className="text-slate-700 text-sm">Email Notifications</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="smsNotif" className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                  <label htmlFor="smsNotif" className="text-slate-700 text-sm">SMS Notifications</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="pushNotif" className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                  <label htmlFor="pushNotif" className="text-slate-700 text-sm">Push Notifications</label>
                </div>
              </form>
            </div>

            {/* Security */}
          
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl py-3 px-8 mt-2">
                  Update
                </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 