import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminAddKategori() {
  const [form, setForm] = useState({ name: '', slug: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      slug: name === 'name' ? value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : prev.slug
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (db) {
      try {
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        await addDoc(collection(db, 'categories'), { ...form, createdAt: serverTimestamp() });
        toast.success('Kategori berhasil ditambahkan!');
        setLoading(false);
        navigate('/admin/kategori');
        return;
      } catch { /* demo mode */ }
    }
    toast.success('Kategori ditambahkan (mode demo)');
    setLoading(false);
    navigate('/admin/kategori');
  }

  return (
    <div>
      <Link to="/admin/kategori" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-dark transition-colors mb-6">
        <ArrowLeft size={18} /> Kembali
      </Link>
      <h1 className="font-heading text-2xl font-bold mb-8">Tambah Kategori Baru</h1>

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="card p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Nama Kategori</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Contoh: Neon Box" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Slug</label>
            <input type="text" name="slug" value={form.slug} onChange={handleChange} className="input-field" placeholder="neon-box" required />
            <p className="text-xs text-brand-muted mt-1">Otomatis diisi berdasarkan nama kategori</p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Menyimpan...' : 'Simpan Kategori'}
          </button>
          <Link to="/admin/kategori" className="btn-secondary">Batal</Link>
        </div>
      </form>
    </div>
  );
}
