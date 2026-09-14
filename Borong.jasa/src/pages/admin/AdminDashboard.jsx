import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { Package, FolderTree, TrendingUp, ShoppingCart, FileText } from 'lucide-react';
import { mockProducts, mockCategories } from '../../data/mockData';
import { mockOrders, mockBlogPosts } from '../../data/blogData';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: mockProducts.length, categories: mockCategories.length, orders: mockOrders.length, blogs: mockBlogPosts.length });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (db) {
        try {
          const { collection, getDocs } = await import('firebase/firestore');
          const [productsSnap, categoriesSnap, ordersSnap, blogSnap] = await Promise.all([
            getDocs(collection(db, 'products')),
            getDocs(collection(db, 'categories')),
            getDocs(collection(db, 'orders')),
            getDocs(collection(db, 'blog')),
          ]);
          setStats({
            products: productsSnap.size || mockProducts.length,
            categories: categoriesSnap.size || mockCategories.length,
            orders: ordersSnap.size || mockOrders.length,
            blogs: blogSnap.size || mockBlogPosts.length,
          });
        } catch {
          // keep defaults
        }
      }
      setLoading(false);
    })();
  }, []);

  const statCards = [
    { icon: Package, label: 'Total Produk', value: stats.products, color: 'bg-blue-500/10 text-blue-600', link: '/admin/produk' },
    { icon: FolderTree, label: 'Total Kategori', value: stats.categories, color: 'bg-green-500/10 text-green-600', link: '/admin/kategori' },
    { icon: ShoppingCart, label: 'Total Pesanan', value: stats.orders, color: 'bg-purple-500/10 text-purple-600', link: '/admin/pesanan' },
    { icon: FileText, label: 'Total Artikel', value: stats.blogs, color: 'bg-orange-500/10 text-orange-600', link: '/admin/blog' },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-8">Ringkasan</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={i} to={stat.link} className="card p-6 group hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
                <TrendingUp size={16} className="text-brand-muted" />
              </div>
              <p className="text-sm text-brand-muted mb-1">{stat.label}</p>
              <p className="text-2xl font-bold font-heading">{loading ? '...' : stat.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="card p-6">
        <h2 className="font-heading text-lg font-semibold mb-4">Aksi Cepat</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/produk/tambah" className="btn-primary text-sm">+ Tambah Produk</Link>
          <Link to="/admin/kategori/tambah" className="btn-secondary text-sm">+ Tambah Kategori</Link>
          <Link to="/admin/blog/tambah" className="btn-secondary text-sm">+ Tambah Artikel</Link>
          <Link to="/admin/produk" className="btn-secondary text-sm">Kelola Produk</Link>
          <Link to="/admin/kategori" className="btn-secondary text-sm">Kelola Kategori</Link>
          <Link to="/admin/pesanan" className="btn-secondary text-sm">Kelola Pesanan</Link>
        </div>
      </div>
    </div>
  );
}
