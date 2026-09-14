import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { Package, MessageCircle } from 'lucide-react';

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

export default function PesananPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let list = [];
      const local = JSON.parse(localStorage.getItem('borongjasa_orders') || '[]');
      list = list.concat(local);

      if (db && currentUser) {
        try {
          const { collection, query, where, getDocs } = await import('firebase/firestore');
          const snap = await getDocs(query(collection(db, 'orders'), where('userId', '==', currentUser.uid)));
          const fbOrders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          list = list.concat(fbOrders);
        } catch { /* ignore */ }
      }

      // dedupe by id, newest first
      const seen = new Set();
      const unique = list.filter(o => (seen.has(o.id) ? false : (seen.add(o.id), true)));
      unique.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setOrders(unique);
      setLoading(false);
    })();
  }, [currentUser]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Pesanan Saya</h1>
        <p className="text-brand-muted">Pantau status pesanan signage Anda</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-brand-muted">Memuat...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <Package size={48} className="mx-auto text-brand-muted/30 mb-4" />
          <h3 className="font-heading text-xl font-semibold mb-2">Belum Ada Pesanan</h3>
          <p className="text-brand-muted mb-6">Anda belum membuat pesanan apapun.</p>
          <Link to="/produk" className="btn-primary">Lihat Produk</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <p className="font-heading text-lg font-bold text-brand-dark">{order.id}</p>
                  <p className="text-xs text-brand-muted">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                  </p>
                </div>
                <span className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-medium ${statusStyles[order.status] || statusStyles.pending}`}>
                  {statusLabels[order.status] || order.status}
                </span>
              </div>

              <div className="space-y-2 border-t border-gray-50 pt-4">
                {Array.isArray(order.items) && order.items.map((item, i) => (
                  <div key={i} className="flex justify-between gap-4 text-sm">
                    <span className="text-brand-dark">{item.name} <span className="text-brand-muted">x{item.qty}</span></span>
                    <span className="text-brand-muted whitespace-nowrap">{item.priceEstimate}</span>
                  </div>
                ))}
              </div>

              {order.note && (
                <p className="mt-4 text-sm text-brand-muted bg-brand-cream rounded-lg p-3">
                  <span className="font-medium text-brand-dark">Catatan:</span> {order.note}
                </p>
              )}

              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://wa.me/6281200000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:underline"
                >
                  <MessageCircle size={16} /> Tanyakan via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
