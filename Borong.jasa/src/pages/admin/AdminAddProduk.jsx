import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db, storage } from '../../config/firebase';
import { ArrowLeft, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockCategories } from '../../data/mockData';

export default function AdminAddProduk() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '', categoryId: '', categoryName: '', description: '', priceEstimate: '', isAvailable: true
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (db) {
        try {
          const { collection, getDocs } = await import('firebase/firestore');
          const snap = await getDocs(collection(db, 'categories'));
          const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          if (items.length > 0) { setCategories(items); return; }
        } catch { /* use mock */ }
      }
      setCategories(mockCategories);
    })();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === 'categoryId') {
      const cat = categories.find(c => c.id === value);
      setForm(prev => ({ ...prev, categoryId: value, categoryName: cat?.name || '' }));
    } else {
      setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreviews(prev => [...prev, reader.result]);
      reader.readAsDataURL(file);
    });
  }

  function removeImage(index) {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (db && storage && images.length > 0) {
      try {
        const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        const imageUrls = [];
        for (const img of images) {
          const storageRef = ref(storage, `products/${Date.now()}_${img.name}`);
          await uploadBytes(storageRef, img);
          const url = await getDownloadURL(storageRef);
          imageUrls.push(url);
        }
        await addDoc(collection(db, 'products'), {
          ...form, images: imageUrls, createdAt: serverTimestamp(), updatedAt: serverTimestamp()
        });
        toast.success('Produk berhasil ditambahkan!');
        setLoading(false);
        navigate('/admin/produk');
        return;
      } catch { /* demo mode */ }
    }
    toast.success('Produk ditambahkan (mode demo)');
    setLoading(false);
    navigate('/admin/produk');
  }

  return (
    <div>
      <Link to="/admin/produk" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-dark transition-colors mb-6">
        <ArrowLeft size={18} /> Kembali
      </Link>
      <h1 className="font-heading text-2xl font-bold mb-8">Tambah Produk Baru</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="card p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Nama Produk</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Contoh: Neon Box Custom" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Kategori</label>
            <select name="categoryId" value={form.categoryId} onChange={handleChange} className="input-field" required>
              <option value="">Pilih Kategori</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Deskripsi</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="input-field min-h-[120px] resize-y" placeholder="Deskripsi produk..." required />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Estimasi Harga</label>
            <input type="text" name="priceEstimate" value={form.priceEstimate} onChange={handleChange} className="input-field" placeholder="Contoh: Rp 500.000 - Rp 2.000.000" />
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="isAvailable" checked={form.isAvailable} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-brand-navy focus:ring-brand-navy" />
              <span className="text-sm font-medium text-brand-dark">Tersedia</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Gambar Produk</label>
            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-brand-navy/30 transition-colors">
              <div className="text-center">
                <Upload size={24} className="mx-auto text-brand-muted mb-1" />
                <p className="text-sm text-brand-muted">Klik untuk upload gambar</p>
              </div>
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {imagePreviews.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative w-20 h-20">
                    <img src={src} className="w-full h-full object-cover rounded-lg" alt="" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Menyimpan...' : 'Simpan Produk'}
          </button>
          <Link to="/admin/produk" className="btn-secondary">Batal</Link>
        </div>
      </form>
    </div>
  );
}
