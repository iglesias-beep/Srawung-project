import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { User, Mail, Package, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilPage() {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    name: currentUser?.displayName || '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (db && currentUser) {
      try {
        const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
        await setDoc(doc(db, 'users', currentUser.uid), {
          name: form.name,
          phone: form.phone,
          address: form.address,
          email: currentUser.email,
          updatedAt: serverTimestamp(),
        }, { merge: true });
        toast.success('Profil berhasil diperbarui!');
        setLoading(false);
        return;
      } catch { /* demo fallback */ }
    }
    toast.success('Profil diperbarui (mode demo)');
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="w-16 h-16 bg-brand-navy rounded-2xl flex items-center justify-center">
          <span className="text-white font-bold text-2xl font-heading">
            {form.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold">Profil Saya</h1>
          <p className="text-brand-muted text-sm">{currentUser?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center">
            <User size={18} />
          </div>
          <div>
            <p className="text-xs text-brand-muted">Nama</p>
            <p className="text-sm font-semibold text-brand-dark">{form.name || '—'}</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500/10 text-green-600 rounded-xl flex items-center justify-center">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-xs text-brand-muted">Email</p>
            <p className="text-sm font-semibold text-brand-dark truncate">{currentUser?.email || '—'}</p>
          </div>
        </div>
        <a href="/pesanan" className="card p-5 flex items-center gap-3 group">
          <div className="w-10 h-10 bg-purple-500/10 text-purple-600 rounded-xl flex items-center justify-center">
            <Package size={18} />
          </div>
          <div>
            <p className="text-xs text-brand-muted">Pesanan Saya</p>
            <p className="text-sm font-semibold text-brand-dark group-hover:text-brand-navy">Lihat pesanan</p>
          </div>
        </a>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 lg:p-8 space-y-5">
        <h2 className="font-heading text-xl font-semibold">Data Profil</h2>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1.5">Nama Lengkap</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Nama Anda" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1.5">No. WhatsApp</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="0812 XXX XXX" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1.5">Alamat</label>
          <textarea name="address" value={form.address} onChange={handleChange} className="input-field min-h-[80px] resize-y" placeholder="Alamat lengkap" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
          <Save size={18} />
          {loading ? 'Menyimpan...' : 'Simpan Profil'}
        </button>
      </form>
    </div>
  );
}
