import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useToast } from "../../../components/ui/use-toast";
import { formatCurrency, formatDate } from "../../../lib/utils";
import {
  Loader2,
  Search,
  ExternalLink,
  Package,
  Truck,
  Calendar,
  User,
  Building2,
  ArrowRight,
} from "lucide-react";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get("/orders/buyer");
        setOrders(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load orders. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [toast]);

  const filteredOrders = orders.filter(
    (order) =>
      order.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingInfo.status
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "In-Transit":
        return "bg-sky-100 text-sky-800 border border-sky-200"; 
      case "Out for Delivery":
        return "bg-indigo-100 text-indigo-800 border border-indigo-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border border-green-200";
      case "Delayed":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 md:pt-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
              My Orders
            </h1>
            <p className="text-slate-600 mt-1">Track and manage your orders</p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-5 text-slate-800" />
            <input
              type="text"
              placeholder="Search orders by product name or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-slate-600">Loading your orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Package className="h-12 w-12 text-slate-400 mb-4" />
              <p className="text-xl text-slate-600 mb-4">No orders found</p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Link to="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card
                key={order._id}
                className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-2xl overflow-hidden"
              >
                <CardHeader className="border-b border-slate-100 pb-4">
                  <CardTitle className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-lg font-semibold text-slate-900">
                          Order #{order._id.slice(-6)}
                        </span>
                        <p className="text-sm text-slate-500">
                          Placed on {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusBadgeClass(
                        order.trackingInfo.status
                      )}`}
                    >
                      {order.trackingInfo.status.charAt(0).toUpperCase() +
                        order.trackingInfo.status.slice(1)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {order.products?.map(
                      (item, index) =>
                        item.product && (
                          <div
                            key={index}
                            className="flex gap-4 p-4 bg-slate-50 rounded-xl"
                          >
                            <div className="w-24 h-24 overflow-hidden rounded-lg shadow-sm">
                              <img
                                src={
                                  item.product?.image ||
                                  "/placeholder.svg?height=96&width=96"
                                }
                                alt={item.product?.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-slate-900 mb-1">
                                {item.product?.name}
                              </h3>
                              <p className="text-sm text-slate-600 mb-2">
                                Quantity: {item.quantity}
                              </p>
                              <p className="text-sm font-medium text-blue-600 mb-2">
                                Total: {formatCurrency(order.totalAmount)}
                              </p>
                              <Button
                                variant="link"
                                className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700"
                                asChild
                              >
                                <Link to={`/products/${item.product?._id}`}>
                                  View Product{" "}
                                  <ExternalLink className="ml-1 h-3 w-3" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        )
                    )}
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <Building2 className="h-4 w-4 text-slate-500" />
                          <h3 className="text-sm font-medium text-slate-700">
                            Seller Information
                          </h3>
                        </div>
                        <p className="text-sm text-slate-900 font-medium">
                          {order.exporter?.name || "Unknown"}
                        </p>
                        <p className="text-sm text-slate-600">
                          {order.exporter?.email}
                        </p>
                      </div>

                      {order.shipper && (
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <div className="flex items-center gap-2 mb-3">
                            <Truck className="h-4 w-4 text-slate-500" />
                            <h3 className="text-sm font-medium text-slate-700">
                              Shipping Information
                            </h3>
                          </div>
                          <p className="text-sm text-slate-900 font-medium">
                            {order.shipper?.name}
                          </p>
                          <p className="text-sm text-slate-600">
                            {order.shipper?.email}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {order.trackingInfo.status === "Delivered" && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <p className="text-green-800 text-sm flex items-center gap-2">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        This order has been successfully delivered. Thank you
                        for your purchase!
                      </p>
                    </div>
                  )}

                  {order.trackingInfo.status === "Cancelled" && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-800 text-sm flex items-center gap-2">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        This order has been cancelled. Please contact the seller
                        for more information.
                      </p>
                    </div>
                  )}

                  {order.trackingInfo.trackingNumber && (
                    <div className="mt-6">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow-md transition-all duration-300">
                        Track Order <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerOrders;
