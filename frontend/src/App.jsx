import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"

// Layouts
import MainLayout from "./layouts/MainLayout"
import DashboardLayout from "./layouts/DashboardLayout"

// Public Pages
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ProductDetails from "./pages/products/ProductDetails"
import Products from "./pages/products/Products"
import About from "./pages/About"

// Protected Pages
import Dashboard from "./pages/dashboard/Dashboard"
import ExporterProducts from "./pages/dashboard/exporter/Products"
import ExporterOrders from "./pages/dashboard/exporter/Orders"
import BuyerOrders from "./pages/dashboard/buyer/Orders"
import ShipperOrders from "./pages/dashboard/shipper/Orders"
import Profile from "./pages/dashboard/Profile"
import CreateProduct from "./pages/dashboard/exporter/CreateProduct"
import EditProduct from "./pages/dashboard/exporter/EditProduct"
import Settings from "./pages/dashboard/Settings"
import Help from "./pages/dashboard/Help"
import Chatbot from "./components/Chatbot"

// Route Guards
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />
  }

  return children
}

function App() {
  return (
    <>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />

        {/* Exporter Routes */}
        <Route
          path="exporter/products"
          element={
            <ProtectedRoute allowedRoles={["exporter"]}>
              <ExporterProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="exporter/products/create"
          element={
            <ProtectedRoute allowedRoles={["exporter"]}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="exporter/products/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["exporter"]}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="exporter/orders"
          element={
            <ProtectedRoute allowedRoles={["exporter"]}>
              <ExporterOrders />
            </ProtectedRoute>
          }
        />

        {/* Buyer Routes */}
        <Route
          path="buyer/orders"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerOrders />
            </ProtectedRoute>
          }
        />

        {/* Shipper Routes */}
        <Route
          path="shipper/orders"
          element={
            <ProtectedRoute allowedRoles={["shipper"]}>
              <ShipperOrders />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch all - 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <Chatbot />
    </>
  )
}

export default App
