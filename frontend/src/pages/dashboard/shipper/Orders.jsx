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
  Package,
  Truck,
  Calendar,
  User,
  Building2,
  Globe,
  ArrowRight,
  MapPin,
} from "lucide-react";

const ShipperOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get("/orders/shipper");
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

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await api.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });

      setOrders(
        orders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                trackingInfo: {
                  ...order.trackingInfo,
                  status: newStatus,
                },
              }
            : order
        )
      );

      toast({
        title: "Success",
        description: "Order status updated successfully.",
      });
    } catch (error) {
      console.error("Status update error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order status. Please try again.",
      });
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingInfo?.status
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
              Assigned Orders
            </h1>
            <p className="text-slate-600 mt-1">
              Manage and track your assigned orders
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders by product or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-slate-600">Loading your assigned orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Truck className="h-12 w-12 text-slate-400 mb-4" />
              <p className="text-xl text-slate-600 mb-4">
                No orders assigned yet
              </p>
              <p className="text-slate-500 text-center max-w-md">
                You will see your assigned orders here once they are assigned to
                you by exporters.
              </p>
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
                          Assigned on {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusBadgeClass(
                        order.trackingInfo?.status
                      )}`}
                    >
                      {order.trackingInfo?.status.charAt(0).toUpperCase() +
                        order.trackingInfo?.status.slice(1)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
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
                                <p className="text-sm font-medium text-blue-600">
                                  Total: {formatCurrency(order.totalAmount)}
                                </p>
                              </div>
                            </div>
                          )
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <Building2 className="h-4 w-4 text-slate-500" />
                          <h3 className="text-sm font-medium text-slate-700">
                            Exporter Information
                          </h3>
                        </div>
                        <p className="text-sm text-slate-900 font-medium">
                          {order.exporter?.name}
                        </p>
                        <p className="text-sm text-slate-600">
                          {order.exporter?.email}
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="h-4 w-4 text-slate-500" />
                          <h3 className="text-sm font-medium text-slate-700">
                            Buyer Information
                          </h3>
                        </div>
                        <p className="text-sm text-slate-900 font-medium">
                          {order.buyer?.name}
                        </p>
                        <p className="text-sm text-slate-600">
                          {order.buyer?.email}
                        </p>
                      </div>

                      {order.shippingAddress && (
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="h-4 w-4 text-slate-500" />
                            <h3 className="text-sm font-medium text-slate-700">
                              Delivery Address
                            </h3>
                          </div>
                          <p className="text-sm text-slate-900">
                            {order.shippingAddress.street}
                          </p>
                          <p className="text-sm text-slate-600">
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}{" "}
                            {order.shippingAddress.zipCode}
                          </p>
                          <p className="text-sm text-slate-600">
                            {order.shippingAddress.country}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Update Status
                      </h3>
                      <select
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In-Transit">In Transit</option>
                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    {order.trackingNumber && (
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow-md transition-all duration-300">
                        Track Order <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipperOrders;
