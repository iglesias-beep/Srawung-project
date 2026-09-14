import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

import LandingPage from './pages/LandingPage';
import ProdukPage from './pages/ProdukPage';
import DetailProdukPage from './pages/DetailProdukPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TentangPage from './pages/TentangPage';
import KontakPage from './pages/KontakPage';
import CheckoutPage from './pages/CheckoutPage';
import PesananPage from './pages/PesananPage';
import ProfilPage from './pages/ProfilPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';

import CartDrawer from './components/CartDrawer';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProduk from './pages/admin/AdminProduk';
import AdminKategori from './pages/admin/AdminKategori';
import AdminAddProduk from './pages/admin/AdminAddProduk';
import AdminEditProduk from './pages/admin/AdminEditProduk';
import AdminAddKategori from './pages/admin/AdminAddKategori';
import AdminEditKategori from './pages/admin/AdminEditKategori';
import AdminPesanan from './pages/admin/AdminPesanan';
import AdminBlog from './pages/admin/AdminBlog';
import AdminBlogForm from './pages/admin/AdminBlogForm';

function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser, isAdmin } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  return children;
}

function AdminRoute({ children }) {
  const { currentUser, isAdmin } = useAuth();
  if (!currentUser) return <Navigate to="/admin/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-center" toastOptions={{ duration: 3000, style: { fontFamily: 'Inter', borderRadius: '12px' } }} />
          <CartDrawer />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/produk" element={<ProdukPage />} />
              <Route path="/produk/:id" element={<DetailProdukPage />} />
              <Route path="/tentang" element={<TentangPage />} />
              <Route path="/kontak" element={<KontakPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="/pesanan" element={<ProtectedRoute><PesananPage /></ProtectedRoute>} />
              <Route path="/profil" element={<ProtectedRoute><ProfilPage /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/produk" element={<AdminProduk />} />
              <Route path="/admin/produk/tambah" element={<AdminAddProduk />} />
              <Route path="/admin/produk/edit/:id" element={<AdminEditProduk />} />
              <Route path="/admin/kategori" element={<AdminKategori />} />
              <Route path="/admin/kategori/tambah" element={<AdminAddKategori />} />
              <Route path="/admin/kategori/edit/:id" element={<AdminEditKategori />} />
              <Route path="/admin/pesanan" element={<AdminPesanan />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/blog/tambah" element={<AdminBlogForm />} />
              <Route path="/admin/blog/edit/:id" element={<AdminBlogForm />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
