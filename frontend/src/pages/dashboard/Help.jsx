import React from "react"
import { HelpCircle, Mail, Phone, BookOpen } from "lucide-react"

const Help = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
              Help & Support
            </h1>
            <p className="text-slate-600 mt-1">Find answers to common questions or contact our support team</p>
          </div>

          {/* Quick Guide */}
          <div className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-2xl overflow-hidden p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-900">Quick Guide</h2>
            </div>
            <ul className="list-disc pl-6 text-slate-700 space-y-2 text-sm">
              <li>Navigate your dashboard using the sidebar menu.</li>
              <li>Check your notifications and account info in the top right corner.</li>
              <li>Manage your products, orders, and profile from the dashboard sections.</li>
              <li>For detailed instructions, visit our documentation or contact support.</li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-2xl overflow-hidden p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">How do I reset my password?</h3>
                <p className="text-slate-600 text-sm">Go to the Settings page and use the Change Password section to update your password securely.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">How can I contact support?</h3>
                <p className="text-slate-600 text-sm">You can email or call our support team using the contact information below.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Where can I find more documentation?</h3>
                <p className="text-slate-600 text-sm">Check our website or contact support for detailed guides and documentation.</p>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-2xl overflow-hidden p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-900">Contact Support</h2>
            </div>
            <div className="flex flex-col gap-2 text-slate-700 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>support@xportconnect.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>+1 (800) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help 