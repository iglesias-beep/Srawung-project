import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, totalItems, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setOpen(false);
    navigate(currentUser ? '/checkout' : '/login');
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setOpen(false)} />
      )}
      <div
        className={`fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-navy" />
            <h2 className="font-heading text-lg font-bold">Keranjang ({totalItems})</h2>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-gray-50">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center mb-4">
              <ShoppingBag size={28} className="text-brand-muted/40" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-1">Keranjang Kosong</h3>
            <p className="text-brand-muted text-sm mb-6">Belum ada produk di keranjang Anda.</p>
            <Link to="/produk" onClick={() => setOpen(false)} className="btn-primary text-sm">Lihat Produk</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto px-6 py-4 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-gray-50">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-brand-cream flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-muted/30">
                        <ShoppingBag size={22} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark truncate">{item.name}</p>
                    <p className="text-xs text-brand-muted mb-2">{item.priceEstimate}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start p-2 rounded-lg text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 px-6 py-5 space-y-3">
              <button
                onClick={handleCheckout}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Lanjutkan ke Pesanan
              </button>
              <button
                onClick={clearCart}
                className="w-full text-center text-sm text-brand-muted hover:text-red-500 transition-colors py-1"
              >
                Kosongkan Keranjang
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
