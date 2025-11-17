import React from 'react'
import { ArrowRight, Package, ShoppingCart, Truck, Globe, Check, Shield, Star, Users, TrendingUp, Heart } from "lucide-react"
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

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

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50 pt-6 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Globe className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Global Trade Made
              <span className="block text-blue-600">Simple & Secure</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with verified exporters, trusted buyers, and reliable shippers worldwide. 
              Start trading internationally with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {!user && (
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
              )}
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
                <Link to="/products">View Products</Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Three Ways to Grow Your Business
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're selling, buying, or shipping, we've got you covered
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Exporters */}
            <div className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-8 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Sell Your Products</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  List your products and reach buyers from around the world. We handle the complex stuff so you can focus on what you do best.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Connect with verified international buyers</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Secure payment processing and escrow</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Integrated shipping and logistics support</span>
                  </div>
                </div>
                
                {!user && (
                <Link to="/register" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                  Start selling now 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                )}
              </div>
            </div>

            {/* Buyers */}
            <div className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-8 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <ShoppingCart className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Source Products</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Find quality products from trusted suppliers. Compare prices, read reviews, and order with confidence.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Browse thousands of verified suppliers</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Get competitive quotes and negotiate prices</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Quality guarantees and buyer protection</span>
                  </div>
                </div>
                
                {!user && (
                <Link to="/register" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium group">
                  Start buying today 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                )}
              </div>
            </div>

            {/* Shippers */}
            <div className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-8 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Offer Shipping</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Connect with exporters and buyers who need reliable shipping. Grow your logistics business globally.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Access to active shipping requests</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Built-in tracking and communication tools</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Expand your network and increase revenue</span>
                  </div>
                </div>
                
                {!user && (
                <Link to="/register" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group">
                  Join our network 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for International Trade
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We understand the challenges of global commerce and built our platform to solve them
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verified Partners</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every business on our platform goes through identity verification and background checks
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Process</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                From discovery to delivery, our streamlined process makes international trade straightforward
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Global Network</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Connect with partners across 120+ countries and expand your business worldwide
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <Heart className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support Team</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our dedicated support team helps you navigate challenges and grow your business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join XportConnect to expand globally. <br></br>
            It's free to get started, and you can be trading within days.
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

export default Home