import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Image, ShoppingBag, Check } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import toast from 'react-hot-toast';

export default function DetailProdukPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function fetchProduct() {
    try {
      if (db) {
        const { doc, getDoc } = await import('firebase/firestore');
        const docSnap = await getDoc(doc(db, 'products', id));
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
          setLoading(false);
          return;
        }
      }
    } catch {
      // fallback to mock
    }
    const mock = mockProducts.find(p => p.id === id);
    setProduct(mock || null);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-200 rounded-2xl"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-heading text-2xl font-bold mb-4">Produk tidak ditemukan</h2>
        <Link to="/produk" className="btn-primary">Kembali ke Katalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Link to="/produk" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-dark transition-colors mb-8">
        <ArrowLeft size={18} /> Kembali ke Katalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-cream mb-4">
            {product.images && product.images[selectedImage] ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image size={64} className="text-brand-muted/30" />
              </div>
            )}
            {!product.isAvailable && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-sm px-4 py-1 rounded-full">
                Stok Habis
              </div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-brand-navy' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-brand-navy uppercase tracking-wider mb-2">
            {product.categoryName || 'Produk'}
          </p>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-brand-navy mb-6">
            {product.priceEstimate || 'Hubungi untuk harga'}
          </p>
          <div className="prose prose-sm text-brand-muted mb-8">
            <p className="whitespace-pre-wrap">{product.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                if (product.isAvailable === false) return toast.error('Maaf, produk ini sedang habis');
                addItem(product);
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
              disabled={product.isAvailable === false}
              className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {added ? <Check size={18} /> : <ShoppingBag size={18} />}
              {product.isAvailable === false ? 'Stok Habis' : added ? 'Ditambahkan!' : 'Tambah ke Keranjang'}
            </button>
            <Link to="/kontak" className="btn-secondary flex items-center justify-center gap-2">
              Konsultasi
            </Link>
            <a
              href={`https://wa.me/6281200000000?text=Halo, saya tertarik dengan produk ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
