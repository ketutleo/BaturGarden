import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/frontpages/Dashboard'
import ProductDetail from './pages/frontpages/ProductDetail'
import Cart from './pages/frontpages/Cart'
import Wishlist from './pages/frontpages/Wishlist'
import Checkout from './pages/frontpages/Checkout'
import Login from './pages/frontpages/Login'
import AdminDashboard from './pages/adminpages/AdminDashboard'
import ProductsPage from './pages/adminpages/ProductsPage'
import OrdersPage from './pages/adminpages/OrdersPage'
import UsersPage from './pages/adminpages/UsersPage'
import AboutPage from './pages/adminpages/AboutPage'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
