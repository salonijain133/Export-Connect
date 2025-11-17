import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../../services/api"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import { useToast } from "../../../components/ui/use-toast"
import { ArrowLeft, Upload, Loader2, Package, Globe, Award, Scale } from "lucide-react"

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    pricePerUnit: "",
    unit: "",
    availableQuantity: "",
    originCountry: "",
    certifications: "",
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setFetchLoading(true)
        const response = await api.get(`/products/${id}`)
        const product = response.data

        setFormData({
          name: product.name || "",
          description: product.description || "",
          category: product.category || "",
          pricePerUnit: product.pricePerUnit || "",
          unit: product.unit || "",
          availableQuantity: product.availableQuantity || "",
          originCountry: product.originCountry || "",
          certifications: product.certifications || "",
        })

        if (product.image) {
          setImagePreview(product.image)
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product details. Please try again later.",
        })
        navigate("/dashboard/exporter/products")
      } finally {
        setFetchLoading(false)
      }
    }

    fetchProduct()
  }, [id, navigate, toast])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (image) {
        const productFormData = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
          productFormData.append(key, value)
        })
        productFormData.append("image", image)

        await api.put(`/products/${id}`, productFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      } else {
        await api.put(`/products/${id}`, formData)
      }

      toast({
        title: "Product Updated",
        description: "Your product has been successfully updated.",
      })

      navigate("/dashboard/exporter/products")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to update product.",
      })
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Loading product details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <Button
          variant="outline"
          className="mb-6 bg-white/80 backdrop-blur-sm hover:bg-white/90 border-slate-200"
          onClick={() => navigate("/dashboard/exporter/products")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold text-slate-900">Edit Product</CardTitle>
                <p className="text-slate-500 mt-1">Update your product information</p>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Product Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                  />
                </div>
              </div>

              {/* Pricing and Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="pricePerUnit" className="text-sm font-medium text-slate-700">
                    Price per Unit (USD)
                  </label>
                  <input
                    id="pricePerUnit"
                    name="pricePerUnit"
                    type="number"
                    value={formData.pricePerUnit}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="unit" className="text-sm font-medium text-slate-700">
                    Unit (e.g. kg, ton)
                  </label>
                  <input
                    id="unit"
                    name="unit"
                    type="text"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                  />
                </div>
              </div>

              {/* Quantity and Origin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="availableQuantity" className="text-sm font-medium text-slate-700">
                    Available Quantity
                  </label>
                  <input
                    id="availableQuantity"
                    name="availableQuantity"
                    type="number"
                    value={formData.availableQuantity}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="originCountry" className="text-sm font-medium text-slate-700">
                    Origin Country
                  </label>
                  <input
                    id="originCountry"
                    name="originCountry"
                    type="text"
                    value={formData.originCountry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                  />
                </div>
              </div>

              {/* Category and Certifications */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium text-slate-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                  >
                    <option value="">Select Category</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Grains">Grains</option>
                    <option value="Spices">Spices</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Meat">Meat</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Handicrafts">Handicrafts</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Industrial Goods">Industrial Goods</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="certifications" className="text-sm font-medium text-slate-700">
                    Certifications (comma-separated)
                  </label>
                  <input
                    id="certifications"
                    name="certifications"
                    type="text"
                    value={formData.certifications}
                    onChange={handleChange}
                    placeholder="e.g. Organic, ISO, HACCP"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                  />
                </div>
              </div>

              {/* Product Image */}
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium text-slate-700">
                  Product Image
                </label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-8 bg-white/50 backdrop-blur-sm">
                  {imagePreview ? (
                    <div className="relative w-full">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="mx-auto max-h-64 object-contain rounded-lg shadow-sm"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4 bg-white/80 hover:bg-white"
                        onClick={() => {
                          setImage(null)
                          setImagePreview(null)
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-slate-400 mb-2" />
                      <p className="text-sm text-slate-500 mb-2">Click or drag to upload an image</p>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t border-slate-100 pt-6">
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl py-6 px-8 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Updating Product...
                  </>
                ) : (
                  "Update Product"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default EditProduct
