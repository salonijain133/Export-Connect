import { useState, useEffect } from "react";
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
  User,
  Calendar,
  Truck,
  ArrowRight,
  Building2,
  Globe,
  Award,
  Scale,
} from "lucide-react";

const ExporterOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [shippers, setShippers] = useState([]);
  const [actionLoading, setActionLoading] = useState(null);
  const [status, setStatus] = useState("Pending");
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
    fetchShippers();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/orders/exporter");
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

  const fetchShippers = async () => {
    try {
      const response = await api.get("/orders/all-shippers");
      setShippers(response.data.data);
    } catch (error) {
      console.error("Failed to load shippers:", error);
    }
  };

  const handleAssignShipper = async (orderId, shipperId) => {
    try {
      setActionLoading(orderId);
      await api.patch(`/orders/${orderId}/assign-shipper`, { shipperId });

      toast({
        title: "Shipper Assigned",
        description: "Shipper has been successfully assigned to the order.",
      });

      fetchOrders();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Assignment Failed",
        description:
          error.response?.data?.message || "Failed to assign shipper.",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      setActionLoading(orderId);
      await api.patch(`/orders/${orderId}/status`, { status });

      toast({
        title: "Status Updated",
        description: `Order status has been updated to ${status}.`,
      });

      fetchOrders();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description:
          error.response?.data?.message || "Failed to update order status.",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Manage Orders
            </h1>
            <p className="text-slate-600 mt-1">Track and manage your export orders</p>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-2xl">
                <Building2 className="h-6 w-6 text-blue-600" />
                <span className="text-blue-700 font-medium">
                  Exporter Dashboard
                </span>
              </div>
        </div>
          

          {/* Search Section */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders by product name, buyer, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
              />
              <Search className="absolute left-4 top-4 h-6 w-6 text-slate-400" />
            </div>
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-3xl">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Package className="h-16 w-16 text-slate-400 mb-4" />
                <p className="text-2xl text-slate-600 mb-4">No orders found</p>
                <p className="text-slate-500">
                  Try adjusting your search terms
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <Card
                  key={order._id}
                  className="bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-xl font-semibold text-slate-900">
                          Order #{order._id.slice(-6)}
                        </span>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${getStatusBadgeClass(
                          order.trackingInfo.status
                        )}`}
                      >
                        {order.trackingInfo.status.charAt(0).toUpperCase() +
                          order.trackingInfo.status.slice(1)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {order.products?.map(
                      (item, index) =>
                        item.product && (
                          <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                          >
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <Package className="h-5 w-5 text-blue-600" />
                                <div>
                                  <h3 className="text-lg font-semibold text-slate-900">
                                    {item.product?.name}
                                  </h3>
                                  <p className="text-slate-600">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Scale className="h-5 w-5 text-blue-600" />
                                <p className="text-lg font-semibold text-blue-600">
                                  Total: {formatCurrency(order.totalAmount)}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-blue-600" />
                                <div>
                                  <h3 className="text-lg font-semibold text-slate-900">
                                    {order.buyer?.name}
                                  </h3>
                                  <p className="text-slate-600">
                                    {order.buyer?.email}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                <p className="text-slate-600">
                                  Ordered on: {formatDate(order.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                    )}

                    <div className="border-t border-slate-100 pt-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {!order.shipper ? (
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                              <Truck className="h-4 w-4" />
                              Assign Shipper
                            </h3>
                            <div className="flex gap-3">
                              <select
                                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                                defaultValue={
                                  order.trackingInfo.status || `pending`
                                }
                              >
                                <option value="" disabled>
                                  Select a shipper
                                </option>
                                {shippers.map((shipper) => (
                                  <option key={shipper._id} value={shipper._id}>
                                    {shipper.name}
                                  </option>
                                ))}
                              </select>
                              <Button
                                onClick={() => {
                                  const select =
                                    document.querySelector("select");
                                  const shipperId = select.value;
                                  if (shipperId) {
                                    handleAssignShipper(order._id, shipperId);
                                  } else {
                                    toast({
                                      variant: "destructive",
                                      title: "No Shipper Selected",
                                      description:
                                        "Please select a shipper to assign.",
                                    });
                                  }
                                }}
                                disabled={actionLoading === order._id}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl py-6 px-8 text-lg group"
                              >
                                {actionLoading === order._id ? (
                                  <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                  <>
                                    Assign Shipper
                                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                              <Truck className="h-4 w-4" />
                              Assigned Shipper
                            </h3>
                            <p className="text-lg font-medium text-slate-900">
                              {order.shipper.name}
                            </p>
                          </div>
                        )}

                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Update Status
                          </h3>
                          <div className="flex gap-3">
                            <select
                              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
                              defaultValue={order.trackingInfo.status}
                              onChange={(e) =>
                                handleUpdateStatus(order._id, e.target.value)
                              }
                              disabled={actionLoading === order._id}
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
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExporterOrders;
