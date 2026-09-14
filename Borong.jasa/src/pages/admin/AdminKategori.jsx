import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { Plus, Search, Edit, Trash2, FolderTree } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockCategories } from '../../data/mockData';

export default function AdminKategori() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    if (db) {
      try {
        const { collection, getDocs } = await import('firebase/firestore');
        const snap = await getDocs(collection(db, 'categories'));
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (items.length > 0) { setCategories(items); setLoading(false); return; }
      } catch { /* use mock */ }
    }
    setCategories(mockCategories);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (db) {
      try {
        const { doc, deleteDoc } = await import('firebase/firestore');
        await deleteDoc(doc(db, 'categories', id));
      } catch { /* ignore */ }
    }
    setCategories(categories.filter(c => c.id !== id));
    toast.success('Kategori berhasil dihapus');
    setDeleteConfirm(null);
  }

  const filtered = categories.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-heading text-2xl font-bold">Kelola Kategori</h1>
        <Link to="/admin/kategori/tambah" className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Tambah Kategori
        </Link>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input type="text" placeholder="Cari kategori..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 font-medium text-brand-muted">Icon</th>
                <th className="text-left px-6 py-4 font-medium text-brand-muted">Nama</th>
                <th className="text-left px-6 py-4 font-medium text-brand-muted">Slug</th>
                <th className="text-right px-6 py-4 font-medium text-brand-muted">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-brand-muted">Memuat...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-brand-muted">Tidak ada kategori ditemukan</td></tr>
              ) : filtered.map(cat => (
                <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 bg-brand-navy/10 rounded-lg flex items-center justify-center">
                      <FolderTree size={18} className="text-brand-navy" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{cat.name}</td>
                  <td className="px-6 py-4 text-brand-muted">{cat.slug || '—'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/kategori/edit/${cat.id}`} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => setDeleteConfirm(cat.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
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
            <h3 className="font-heading text-xl font-semibold mb-2">Hapus Kategori?</h3>
            <p className="text-brand-muted text-sm mb-6">Kategori yang dihapus tidak dapat dikembalikan.</p>
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
