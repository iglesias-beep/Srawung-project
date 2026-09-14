import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { Plus, Search, Edit, Trash2, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockProducts } from '../../data/mockData';

export default function AdminProduk() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    if (db) {
      try {
        const { collection, getDocs } = await import('firebase/firestore');
        const snap = await getDocs(collection(db, 'products'));
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (items.length > 0) { setProducts(items); setLoading(false); return; }
      } catch { /* use mock */ }
    }
    setProducts(mockProducts);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (db) {
      try {
        const { doc, deleteDoc } = await import('firebase/firestore');
        await deleteDoc(doc(db, 'products', id));
      } catch { /* ignore */ }
    }
    setProducts(products.filter(p => p.id !== id));
    toast.success('Produk berhasil dihapus');
    setDeleteConfirm(null);
  }

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.categoryName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-heading text-2xl font-bold">Kelola Produk</h1>
        <Link to="/admin/produk/tambah" className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Tambah Produk
        </Link>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input type="text" placeholder="Cari produk..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 font-medium text-brand-muted">Gambar</th>
                <th className="text-left px-6 py-4 font-medium text-brand-muted">Nama</th>
                <th className="text-left px-6 py-4 font-medium text-brand-muted">Kategori</th>
                <th className="text-left px-6 py-4 font-medium text-brand-muted">Harga</th>
                <th className="text-left px-6 py-4 font-medium text-brand-muted">Status</th>
                <th className="text-right px-6 py-4 font-medium text-brand-muted">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-brand-muted">Memuat...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-brand-muted">Tidak ada produk ditemukan</td></tr>
              ) : filtered.map(product => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-brand-cream rounded-lg flex items-center justify-center">
                        <Image size={20} className="text-brand-muted/30" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-brand-muted">{product.categoryName || '—'}</td>
                  <td className="px-6 py-4">{product.priceEstimate || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${product.isAvailable !== false ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {product.isAvailable !== false ? 'Tersedia' : 'Habis'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/produk/edit/${product.id}`} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => setDeleteConfirm(product.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-heading text-xl font-semibold mb-2">Hapus Produk?</h3>
            <p className="text-brand-muted text-sm mb-6">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1 text-sm">Batal</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="btn-danger flex-1 text-sm">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
