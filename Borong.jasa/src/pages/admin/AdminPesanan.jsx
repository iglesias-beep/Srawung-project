import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { Package, Search, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockOrders } from '../../data/blogData';

const statusOptions = ['pending', 'diproses', 'selesai', 'batal'];
const statusStyles = {
  pending: 'bg-yellow-50 text-yellow-600',
  diproses: 'bg-blue-50 text-blue-600',
  selesai: 'bg-green-50 text-green-600',
  batal: 'bg-red-50 text-red-600',
};
const statusLabels = {
  pending: 'Menunggu',
  diproses: 'Diproses',
  selesai: 'Selesai',
  batal: 'Dibatalkan',
};

export default function AdminPesanan() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    if (db) {
      try {
        const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
        const snap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (items.length > 0) { setOrders(items); setLoading(false); return; }
      } catch { /* use mock */ }
    }
    setOrders(mockOrders);
    setLoading(false);
  }

  async function handleStatusChange(order, newStatus) {
    if (db) {
      try {
        const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
        await updateDoc(doc(db, 'orders', order.id), { status: newStatus, updatedAt: serverTimestamp() });
      } catch { /* ignore */ }
    }
    setOrders(orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
    toast.success('Status pesanan diperbarui');
  }

  async function handleDelete(id) {
    if (db) {
      try {
        const { doc, deleteDoc } = await import('firebase/firestore');
        await deleteDoc(doc(db, 'orders', id));
      } catch { /* ignore */ }
    }
    setOrders(orders.filter(o => o.id !== id));
    toast.success('Pesanan dihapus');
  }

  const filtered = orders.filter(o =>
    o.id?.toLowerCase().includes(search.toLowerCase()) ||
    o.userName?.toLowerCase().includes(search.toLowerCase()) ||
    o.phone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-heading text-2xl font-bold">Kelola Pesanan</h1>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input type="text" placeholder="Cari pesanan..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
      </div>

      {loading ? (
        <div className="text-center py-16 text-brand-muted">Memuat...</div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Package size={48} className="mx-auto text-brand-muted/30 mb-4" />
          <h3 className="font-heading text-lg font-semibold">Belum ada pesanan</h3>
          <p className="text-brand-muted text-sm">Pesanan dari customer akan muncul di sini.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(order => (
            <div key={order.id} className="card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-heading text-lg font-bold">{order.id}</p>
                  <p className="text-sm text-brand-muted">
                    {order.userName} {order.phone && `• ${order.phone}`}
                  </p>
                  <p className="text-xs text-brand-muted">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e.target.value)}
                    className="input-field !py-2 !px-3 text-sm w-auto"
                  >
                    {statusOptions.map(s => (
                      <option key={s} value={s}>{statusLabels[s]}</option>
                    ))}
                  </select>
                  <button onClick={() => handleDelete(order.id)} className="text-sm text-red-500 hover:underline">
                    Hapus
                  </button>
                </div>
              </div>

              <button
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="mt-4 text-sm font-medium text-brand-navy hover:underline"
              >
                {expanded === order.id ? 'Sembunyikan detail' : 'Lihat detail'}
              </button>

              {expanded === order.id && (
                <div className="mt-4 border-t border-gray-50 pt-4">
                  <div className="space-y-2">
                    {Array.isArray(order.items) && order.items.map((item, i) => (
                      <div key={i} className="flex justify-between gap-4 text-sm">
                        <span className="text-brand-dark">{item.name} <span className="text-brand-muted">x{item.qty}</span></span>
                        <span className="text-brand-muted whitespace-nowrap">{item.priceEstimate}</span>
                      </div>
                    ))}
                  </div>
                  {order.address && (
                    <p className="mt-4 text-sm text-brand-muted">
                      <span className="font-medium text-brand-dark">Alamat:</span> {order.address}
                    </p>
                  )}
                  {order.note && (
                    <p className="mt-2 text-sm text-brand-muted">
                      <span className="font-medium text-brand-dark">Catatan:</span> {order.note}
                    </p>
                  )}
                  {order.phone && (
                    <a
                      href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:underline"
                    >
                      <MessageCircle size={16} /> Hubungi via WhatsApp
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
