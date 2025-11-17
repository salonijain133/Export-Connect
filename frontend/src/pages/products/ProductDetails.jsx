import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useToast } from "../../components/ui/use-toast";
import { formatCurrency } from "../../lib/utils";
import { Loader2, ArrowLeft, Package, Globe, Award, Scale, Truck, Calendar, Building2, User, ShoppingCart } from "lucide-react";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product details. Please try again later.",
        });
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate, toast]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.availableQuantity) {
      setQuantity(value);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isAddressValid = () => {
    return (
      shippingAddress.street &&
      shippingAddress.city &&
      shippingAddress.state &&
      shippingAddress.zip &&
      shippingAddress.country
    );
  };

  const handleOrder = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to place an order.",
      });
      return;
    }

    if (!isAddressValid()) {
      toast({
        variant: "destructive",
        title: "Missing Address Fields",
        description: "Please fill in all the shipping address fields.",
      });
      return;
    }

    setProcessing(true);
    try {
      await api.post("/orders", {
        exporter: product.exporter._id,
        products: [
          {
            product: product._id,
            quantity: quantity,
          },
        ],
        totalAmount: product.pricePerUnit * quantity,
        shippingAddress: shippingAddress,
      });

      toast({
        title: "Success",
        description: "Order placed successfully!",
      });
      navigate("/orders");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to place order. Please try again.",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            className="mb-8 text-gray-600 hover:text-blue-600 transition-colors group"
            onClick={() => navigate("/products")}
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              <div className="aspect-square overflow-hidden rounded-3xl bg-gray-100 shadow-sm">
                <img
                  src={product.image || "/placeholder.svg?height=600&width=600"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.additionalImages?.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.additionalImages.map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={image}
                        alt={`${product.name} - Image ${index + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
                <p className="text-gray-600 text-lg mb-8">{product.description}</p>

                <div className="space-y-6">
                  <div className="flex items-center text-blue-600">
                    <Scale className="h-6 w-6 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Price per {product.unit}</p>
                      <p className="text-3xl font-bold">{formatCurrency(product.pricePerUnit)}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Package className="h-6 w-6 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Available Quantity</p>
                      <p className="text-xl font-semibold">{product.availableQuantity} {product.unit}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Globe className="h-6 w-6 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Origin Country</p>
                      <p className="text-xl font-semibold">{product.originCountry}</p>
                    </div>
                  </div>

                  {product.certifications?.length > 0 && (
                    <div className="flex items-center text-gray-600">
                      <Award className="h-6 w-6 mr-4" />
                      <div>
                        <p className="text-sm text-gray-500">Certifications</p>
                        <p className="text-xl font-semibold">{product.certifications.join(", ")}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Section */}
              <Card className="bg-white shadow-sm rounded-3xl border-0">
                <CardContent className="p-8 space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Place Order</h2>

                  {/* Quantity */}
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity ({product.unit})
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={product.availableQuantity}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Shipping Address Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["street", "city", "state", "zip", "country"].map((field) => (
                      <div key={field} className="col-span-1">
                        <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {field}
                        </label>
                        <input
                          type="text"
                          name={field}
                          id={field}
                          value={shippingAddress[field]}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Enter ${field}`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Total Amount */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <span className="text-gray-600 text-lg">Total Amount:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatCurrency(product.pricePerUnit * quantity)}
                    </span>
                  </div>

                  <Button
                    onClick={handleOrder}
                    disabled={processing || !user}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl py-6 text-lg"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : !user ? (
                      <>
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Login to Order
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Place Order
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Exporter Info */}
              {product.exporter && (
                <Card className="bg-white shadow-sm rounded-3xl border-0">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Exporter Information</h2>
                    <div className="space-y-6">
                      <div className="flex items-center text-gray-600">
                        <Building2 className="h-6 w-6 mr-4" />
                        <div>
                          <p className="text-sm text-gray-500">Company Name</p>
                          <p className="text-xl font-semibold">{product.exporter.companyName}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <User className="h-6 w-6 mr-4" />
                        <div>
                          <p className="text-sm text-gray-500">Contact Person</p>
                          <p className="text-xl font-semibold">{product.exporter.contactPerson}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Truck className="h-6 w-6 mr-4" />
                        <div>
                          <p className="text-sm text-gray-500">Shipping Terms</p>
                          <p className="text-xl font-semibold">{product.exporter.shippingTerms}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-6 w-6 mr-4" />
                        <div>
                          <p className="text-sm text-gray-500">Lead Time</p>
                          <p className="text-xl font-semibold">{product.exporter.leadTime}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
