import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import { Card, CardContent, CardFooter } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { useToast } from "../../components/ui/use-toast"
import { formatCurrency } from "../../lib/utils"
import { Loader2, Search, Package, Globe, Award, Scale, Filter } from "lucide-react"

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products")
        setProducts(response.data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load products. Please try again later.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [toast])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <div className=" rounded-3xl p-8 mb-12 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
                  Browse Products
                </h1>
                <p className="text-gray-600 text-lg">Discover high-quality products from verified exporters</p>
              </div>
              <div className="w-full md:w-80">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm shadow-sm"
                  />
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-2xl text-gray-500 font-medium">No products found</p>
              <p className="text-gray-400 mt-2">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product._id} className="overflow-hidden flex flex-row lg:h-[330px] bg-white hover:shadow-xl transition-all duration-300 rounded-2xl border-0">
                  <div className="aspect-square overflow-hidden bg-gray-100 border-r">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardContent className="flex-col items-between p-6">
                    <h2 className="text-xl font-semibold mb-3 line-clamp-1 text-gray-900">{product.name}</h2>
                    <p className="text-gray-600 mb-6 line-clamp-2 text-sm">{product.description}</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center text-blue-600">
                        <Scale className="h-5 w-5 mr-3" />
                        <p className="font-semibold text-lg">
                          {formatCurrency(product.pricePerUnit)} / {product.unit}
                        </p>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Package className="h-5 w-5 mr-3" />
                        <p className="text-sm">
                          <span className="font-medium">Available: </span>
                          {product.availableQuantity} {product.unit}
                        </p>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Globe className="h-5 w-5 mr-3" />
                        <p className="text-sm">
                          <span className="font-medium">Origin: </span>
                          {product.originCountry}
                        </p>
                      </div>

                      {product.certifications?.length > 0 && (
                        <div className="flex items-center text-gray-600">
                          <Award className="h-5 w-5 mr-3" />
                          <p className="text-sm">
                            <span className="font-medium">Certifications: </span>
                            {product.certifications.join(", ")}
                          </p>
                        </div>
                      )}

                       <button
                      asChild 
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl py-2"
                    >
                      <Link to={`/products/${product._id}`}>View Details</Link>
                    </button>
                    </div>
                   
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
