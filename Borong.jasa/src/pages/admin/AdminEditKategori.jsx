import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockCategories } from '../../data/mockData';

export default function AdminEditKategori() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', slug: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategory();
  }, [id]);

  async function fetchCategory() {
    if (db) {
      try {
        const { doc, getDoc } = await import('firebase/firestore');
        const docSnap = await getDoc(doc(db, 'categories', id));
        if (docSnap.exists()) {
          setForm({ name: docSnap.data().name || '', slug: docSnap.data().slug || '' });
          setLoading(false);
          return;
        }
      } catch { /* fallback */ }
    }
    const mock = mockCategories.find(c => c.id === id);
    if (mock) {
      setForm({ name: mock.name || '', slug: mock.slug || '' });
    } else {
      toast.error('Kategori tidak ditemukan');
      navigate('/admin/kategori');
    }
    setLoading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') } : {})
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    if (db) {
      try {
        const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
        await updateDoc(doc(db, 'categories', id), { ...form, updatedAt: serverTimestamp() });
        toast.success('Kategori berhasil diupdate!');
        setSaving(false);
        navigate('/admin/kategori');
        return;
      } catch { /* demo mode */ }
    }
    toast.success('Kategori diupdate (mode demo)');
    setSaving(false);
    navigate('/admin/kategori');
  }

  if (loading) {
    return <div className="text-center py-12 text-brand-muted">Memuat data...</div>;
  }

  return (
    <div>
      <Link to="/admin/kategori" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-dark transition-colors mb-6">
        <ArrowLeft size={18} /> Kembali
      </Link>
      <h1 className="font-heading text-2xl font-bold mb-8">Edit Kategori</h1>

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="card p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Nama Kategori</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Slug</label>
            <input type="text" name="slug" value={form.slug} onChange={handleChange} className="input-field" required />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Menyimpan...' : 'Update Kategori'}
          </button>
          <Link to="/admin/kategori" className="btn-secondary">Batal</Link>
        </div>
      </form>
    </div>
  );
}
