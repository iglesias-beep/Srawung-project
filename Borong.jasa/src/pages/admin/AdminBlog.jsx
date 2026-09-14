import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { Plus, Search, Edit, Trash2, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockBlogPosts } from '../../data/blogData';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    if (db) {
      try {
        const { collection, getDocs } = await import('firebase/firestore');
        const snap = await getDocs(collection(db, 'blog'));
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (items.length > 0) { setPosts(items); setLoading(false); return; }
      } catch { /* use mock */ }
    }
    setPosts(mockBlogPosts);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (db) {
      try {
        const { doc, deleteDoc } = await import('firebase/firestore');
        await deleteDoc(doc(db, 'blog', id));
      } catch { /* ignore */ }
    }
    setPosts(posts.filter(p => p.id !== id));
    toast.success('Artikel berhasil dihapus');
    setDeleteConfirm(null);
  }

  const filtered = posts.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-heading text-2xl font-bold">Kelola Artikel</h1>
        <Link to="/admin/blog/tambah" className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Tambah Artikel
        </Link>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input type="text" placeholder="Cari artikel..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 font-medium text-brand-muted">Gambar</th>
                <th className="text-left px-6 py-4 font-medium text-brand-muted">Judul</th>
                <th className="text-left px-6 py-4 font-medium text-brand-muted">Kategori</th>
                <th className="text-right px-6 py-4 font-medium text-brand-muted">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-brand-muted">Memuat...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-brand-muted">Tidak ada artikel ditemukan</td></tr>
              ) : filtered.map(post => (
                <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    {post.image ? (
                      <img src={post.image} alt="" className="w-16 h-12 rounded-lg object-cover" />
                    ) : (
                      <div className="w-16 h-12 bg-brand-cream rounded-lg flex items-center justify-center">
                        <Image size={20} className="text-brand-muted/30" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium max-w-xs truncate">{post.title}</td>
                  <td className="px-6 py-4 text-brand-muted">{post.category || '—'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/blog/edit/${post.id}`} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => setDeleteConfirm(post.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
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
            <h3 className="font-heading text-xl font-semibold mb-2">Hapus Artikel?</h3>
            <p className="text-brand-muted text-sm mb-6">Artikel yang dihapus tidak dapat dikembalikan.</p>
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
