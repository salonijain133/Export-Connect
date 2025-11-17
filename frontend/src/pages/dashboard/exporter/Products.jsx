import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useToast } from "../../../components/ui/use-toast";
import { formatCurrency } from "../../../lib/utils";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Search,
  Package,
  Globe,
  Award,
  Scale,
  ArrowRight,
} from "lucide-react";

const ExporterProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products?exporter=true");
      setProducts(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load products. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setPendingDelete(id);
  };

  const confirmDelete = async () => {
    const id = pendingDelete;
    if (!id) return;

    try {
      setDeleteLoading(id);
      await api.delete(`/products/${id}`);

      toast({
        title: "Product Deleted",
        description: "Product has been successfully deleted.",
      });

      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description:
          error.response?.data?.message || "Failed to delete product.",
      });
    } finally {
      setDeleteLoading(null);
      setPendingDelete(null);
    }
  };

  // const handleDelete = async (id) => {
  //   if (!confirm("Are you sure you want to delete this product?")) {
  //     return;
  //   }

  //   try {
  //     setDeleteLoading(id);
  //     await api.delete(`/products/${id}`);

  //     toast({
  //       title: "Product Deleted",
  //       description: "Product has been successfully deleted.",
  //     });

  //     setProducts(products.filter((product) => product._id !== id));
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Delete Failed",
  //       description:
  //         error.response?.data?.message || "Failed to delete product.",
  //     });
  //   } finally {
  //     setDeleteLoading(null);
  //   }
  // };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">My Products</h1>
              <p className="text-slate-600 mt-1">
                Manage your product listings and inventory
              </p>
            </div>
            <Button
              onClick={() => navigate("/dashboard/exporter/products/create")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl py-6 px-8 text-lg group"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Product
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm text-lg"
              />
              <Search className="absolute left-4 top-4 h-6 w-6 text-slate-400" />
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-3xl">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Package className="h-16 w-16 text-slate-400 mb-4" />
                <p className="text-2xl text-slate-600 mb-4">
                  No products found
                </p>
                <p className="text-slate-500 mb-8">
                  Start by adding your first product to your inventory
                </p>
                <Button
                  onClick={() =>
                    navigate("/dashboard/exporter/products/create")
                  }
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl py-6 px-8 text-lg group"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Your First Product
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product._id}
                  className="bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden flex flex-col h-full"
                >
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                    <img
                      src={
                        product.image || "/placeholder.svg?height=200&width=400"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold text-slate-900 line-clamp-1">
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-slate-500">{product.category}</p>
                  </CardHeader>

                  <CardContent className="flex-grow space-y-4">
                    <p className="text-slate-600 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center text-blue-600">
                        <Scale className="h-5 w-5 mr-3" />
                        <p className="text-lg font-semibold">
                          {formatCurrency(product.pricePerUnit)} /{" "}
                          {product.unit}
                        </p>
                      </div>

                      <div className="flex items-center text-slate-600">
                        <Package className="h-5 w-5 mr-3" />
                        <p className="text-sm">
                          <span className="font-medium">Available: </span>
                          {product.availableQuantity} {product.unit}
                        </p>
                      </div>

                      <div className="flex items-center text-slate-600">
                        <Globe className="h-5 w-5 mr-3" />
                        <p className="text-sm">
                          <span className="font-medium">Origin: </span>
                          {product.originCountry}
                        </p>
                      </div>

                      {product.certifications?.length > 0 && (
                        <div className="flex items-center text-slate-600">
                          <Award className="h-5 w-5 mr-3" />
                          <p className="text-sm">
                            <span className="font-medium">
                              Certifications:{" "}
                            </span>
                            {product.certifications.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between pt-4 border-t gap-4 border-slate-100">
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigate(
                          `/dashboard/exporter/products/edit/${product._id}`
                        )
                      }
                      className="border-slate-200 hover:border-blue-200 hover:bg-blue-50 text-slate-700 font-medium rounded-xl p-4 group"
                    >
                      <Pencil className="h-5 w-5 mr-2" />
                      Edit
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(product._id)}
                      disabled={deleteLoading === product._id}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-xl py-4"
                    >
                      {deleteLoading === product._id ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="h-5 w-5 mr-2" />
                          Delete
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      {pendingDelete && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-slate-200 shadow-xl rounded-2xl p-6 w-[320px] space-y-4">
          <p className="text-slate-800 font-semibold text-base">
            Are you sure you want to delete this product?
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setPendingDelete(null)}
              className="rounded-xl px-4 py-2 text-sm"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="rounded-xl px-4 py-2 text-sm"
              disabled={deleteLoading === pendingDelete}
            >
              {deleteLoading === pendingDelete ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Yes, Delete"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExporterProducts;
