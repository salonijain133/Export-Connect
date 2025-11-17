import React from "react"
import { Globe, Users, Shield, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

const Button = ({ children, className = "", size, variant, asChild, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  const sizeClasses = size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"
  const variantClasses = variant === "outline" ? "border-2 bg-transparent" : "shadow-sm"
  
  if (asChild) {
    return React.cloneElement(children, { 
      className: `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`,
      ...props 
    })
  }
  
  return (
    <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}

const About = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50 pt-10 pb-16 lg:pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Globe className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">XportConnect</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            XportConnect is dedicated to connecting global trade partners for seamless international commerce. Our mission is to empower exporters, buyers, and shippers to grow their businesses with confidence, security, and ease.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in making international trade accessible, transparent, and secure for everyone.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Trust & Security</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every business on our platform is verified, ensuring a safe and secure trading environment for all.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We foster a global network of exporters, buyers, and shippers, supporting each other’s growth and success.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <Heart className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our dedicated support team is here to help you navigate challenges and grow your business globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Join Our Global Network?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Become part of XportConnect and start trading internationally with confidence.
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 font-semibold" asChild>
                <Link to="/register">Create Free Account</Link>
              </Button>
            </div>
          )}
          <p className="text-sm text-blue-200 mt-6">
            No credit card required • Free forever plan available • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  )
}

export default About