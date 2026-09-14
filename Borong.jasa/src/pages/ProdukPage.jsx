import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { Search, Filter, Image } from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockData';

async function fetchFirestore() {
  if (!db) return null;
  try {
    const { collection, getDocs } = await import('firebase/firestore');
    const [productsSnap, categoriesSnap] = await Promise.all([
      getDocs(collection(db, 'products')),
      getDocs(collection(db, 'categories'))
    ]);
    const products = productsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const categories = categoriesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    return products.length > 0 ? { products, categories } : null;
  } catch {
    return null;
  }
}

export default function ProdukPage() {
  const [products, setProducts] = useState(mockProducts);
  const [categories, setCategories] = useState(mockCategories);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('kategori') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchFirestore();
      if (data) {
        setProducts(data.products);
        setCategories(data.categories);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setSelectedCategory(searchParams.get('kategori') || '');
  }, [searchParams]);

  const filteredProducts = products.filter(p => {
    const matchSearch = !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !selectedCategory || p.categorySlug === selectedCategory || p.categoryId === selectedCategory;
    return matchSearch && matchCategory && p.isAvailable !== false;
  });

  const handleCategoryChange = (slug) => {
    if (slug) {
      setSearchParams({ kategori: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-2">Produk Kami</h1>
        <p className="text-brand-muted">Temukan signage custom terbaik untuk bisnis Anda</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-11"
          />
        </div>
        <div className="relative">
          <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="input-field pl-11 pr-8 appearance-none min-w-[200px]"
          >
            <option value="">Semua Kategori</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.slug || cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="h-56 bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <Image size={48} className="mx-auto text-brand-muted/30 mb-4" />
          <h3 className="font-heading text-xl font-semibold mb-2">Produk tidak ditemukan</h3>
          <p className="text-brand-muted">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Link key={product.id} to={`/produk/${product.id}`} className="card group">
              <div className="relative h-56 overflow-hidden bg-brand-cream">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image size={48} className="text-brand-muted/30" />
                  </div>
                )}
                {!product.isAvailable && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    Stok Habis
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-medium text-brand-navy uppercase tracking-wider mb-1">
                  {product.categoryName || 'Produk'}
                </p>
                <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-brand-navy transition-colors">
                  {product.name}
                </h3>
                <p className="text-brand-muted text-sm line-clamp-2 mb-3">{product.description}</p>
                <p className="text-brand-navy font-semibold">
                  {product.priceEstimate || 'Hubungi untuk harga'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
