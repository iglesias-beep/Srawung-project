import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { ArrowLeft, ShoppingBag, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, totalItems, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: currentUser?.displayName || '',
    phone: '',
    address: '',
    note: '',
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);

    const orderData = {
      userId: currentUser?.uid || 'guest',
      userName: form.name || currentUser?.email?.split('@')[0] || 'Pelanggan',
      items: items.map(i => ({ name: i.name, qty: i.qty, priceEstimate: i.priceEstimate, categoryName: i.categoryName })),
      phone: form.phone,
      address: form.address,
      note: form.note,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    if (db) {
      try {
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        await addDoc(collection(db, 'orders'), { ...orderData, createdAt: serverTimestamp() });
        clearCart();
        toast.success('Pesanan berhasil dikirim! Kami akan segera menghubungi Anda.');
        setLoading(false);
        navigate('/pesanan');
        return;
      } catch { /* fall through to demo */ }
    }

    try {
      const stored = JSON.parse(localStorage.getItem('borongjasa_orders') || '[]');
      const newOrder = { id: 'ORD-' + Date.now().toString().slice(-6), ...orderData };
      localStorage.setItem('borongjasa_orders', JSON.stringify([newOrder, ...stored]));
    } catch { /* ignore */ }

    clearCart();
    toast.success('Pesan (mode demo) berhasil dikirim!');
    setLoading(false);
    navigate('/pesanan');
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={28} className="text-brand-muted/40" />
        </div>
        <h1 className="font-heading text-2xl font-bold mb-2">Keranjang Kosong</h1>
        <p className="text-brand-muted mb-6">Tambahkan produk ke keranjang sebelum membuat pesanan.</p>
        <Link to="/produk" className="btn-primary">Lihat Produk</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Link to="/produk" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-dark transition-colors mb-8">
        <ArrowLeft size={18} /> Kembali ke Katalog
      </Link>
      <h1 className="font-heading text-3xl font-bold mb-8">Buat Pesanan</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="card p-6 lg:p-8 space-y-5">
          <h2 className="font-heading text-xl font-semibold">Data Diri</h2>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Nama Lengkap</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Nama Anda" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">No. WhatsApp</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="0812 XXX XXX" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Alamat Pengiriman</label>
            <textarea name="address" value={form.address} onChange={handleChange} className="input-field min-h-[80px] resize-y" placeholder="Alamat lengkap" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Catatan Tambahan</label>
            <textarea name="note" value={form.note} onChange={handleChange} className="input-field min-h-[80px] resize-y" placeholder="Contoh: ukuran, warna, material, teks yang diinginkan" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
            <Send size={18} />
            {loading ? 'Mengirim...' : 'Kirim Pesanan'}
          </button>
          <p className="text-xs text-brand-muted text-center">
            {totalItems} item akan dikirim sebagai permintaan pesanan. Admin akan menghubungi Anda untuk estimasi harga.
          </p>
        </form>

        <div>
          <h2 className="font-heading text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
          <div className="card overflow-hidden">
            <div className="divide-y divide-gray-50">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-brand-cream flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-muted/30">
                        <ShoppingBag size={20} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark truncate">{item.name}</p>
                    <p className="text-xs text-brand-muted">{item.priceEstimate}</p>
                  </div>
                  <span className="text-sm font-semibold">x{item.qty}</span>
                </div>
              ))}
            </div>
            <div className="bg-brand-cream px-6 py-4">
              <p className="text-sm text-brand-muted">Harga final menyesuaikan ukuran & spesifikasi. Kami hubungi via WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
