import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { db, storage } from '../../config/firebase';
import { ArrowLeft, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockProducts, mockCategories } from '../../data/mockData';

export default function AdminEditProduk() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '', categoryId: '', categoryName: '', description: '', priceEstimate: '', isAvailable: true
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    if (db) {
      try {
        const { doc, getDoc, collection, getDocs } = await import('firebase/firestore');
        const [docSnap, catSnap] = await Promise.all([
          getDoc(doc(db, 'products', id)),
          getDocs(collection(db, 'categories'))
        ]);
        const firestoreCategories = catSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (firestoreCategories.length > 0) setCategories(firestoreCategories);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({ name: data.name || '', categoryId: data.categoryId || '', categoryName: data.categoryName || '',
            description: data.description || '', priceEstimate: data.priceEstimate || '', isAvailable: data.isAvailable !== false });
          setExistingImages(data.images || []);
          setLoading(false);
          return;
        }
      } catch { /* fallback */ }
    }
    // Fallback to mock
    setCategories(mockCategories);
    const mock = mockProducts.find(p => p.id === id);
    if (mock) {
      setForm({ name: mock.name || '', categoryId: mock.categoryId || '', categoryName: mock.categoryName || '',
        description: mock.description || '', priceEstimate: mock.priceEstimate || '', isAvailable: mock.isAvailable !== false });
      setExistingImages(mock.images || []);
    } else {
      toast.error('Produk tidak ditemukan');
      navigate('/admin/produk');
    }
    setLoading(false);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === 'categoryId') {
      const cat = categories.find(c => c.id === value);
      setForm(prev => ({ ...prev, categoryId: value, categoryName: cat?.name || '' }));
    } else {
      setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  }

  function handleNewImages(e) {
    const files = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setNewPreviews(prev => [...prev, reader.result]);
      reader.readAsDataURL(file);
    });
  }

  function removeExistingImage(index) {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  }

  function removeNewImage(index) {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    if (db && storage && newImages.length > 0) {
      try {
        const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
        const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
        const uploadedUrls = [];
        for (const img of newImages) {
          const storageRef = ref(storage, `products/${Date.now()}_${img.name}`);
          await uploadBytes(storageRef, img);
          const url = await getDownloadURL(storageRef);
          uploadedUrls.push(url);
        }
        const allImages = [...existingImages, ...uploadedUrls];
        await updateDoc(doc(db, 'products', id), { ...form, images: allImages, updatedAt: serverTimestamp() });
        toast.success('Produk berhasil diupdate!');
        setSaving(false);
        navigate('/admin/produk');
        return;
      } catch { /* demo mode */ }
    }
    toast.success('Produk diupdate (mode demo)');
    setSaving(false);
    navigate('/admin/produk');
  }

  if (loading) {
    return <div className="text-center py-12 text-brand-muted">Memuat data...</div>;
  }

  return (
    <div>
      <Link to="/admin/produk" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-dark transition-colors mb-6">
        <ArrowLeft size={18} /> Kembali
      </Link>
      <h1 className="font-heading text-2xl font-bold mb-8">Edit Produk</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="card p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Nama Produk</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" required />
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
            <textarea name="description" value={form.description} onChange={handleChange} className="input-field min-h-[120px] resize-y" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Estimasi Harga</label>
            <input type="text" name="priceEstimate" value={form.priceEstimate} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="isAvailable" checked={form.isAvailable} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-brand-navy focus:ring-brand-navy" />
              <span className="text-sm font-medium text-brand-dark">Tersedia</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Gambar Saat Ini</label>
            {existingImages.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {existingImages.map((src, i) => (
                  <div key={i} className="relative w-20 h-20">
                    <img src={src} className="w-full h-full object-cover rounded-lg" alt="" />
                    <button type="button" onClick={() => removeExistingImage(i)} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Tambah Gambar Baru</label>
            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-brand-navy/30 transition-colors">
              <div className="text-center">
                <Upload size={24} className="mx-auto text-brand-muted mb-1" />
                <p className="text-sm text-brand-muted">Klik untuk upload gambar</p>
              </div>
              <input type="file" multiple accept="image/*" onChange={handleNewImages} className="hidden" />
            </label>
            {newPreviews.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {newPreviews.map((src, i) => (
                  <div key={i} className="relative w-20 h-20">
                    <img src={src} className="w-full h-full object-cover rounded-lg" alt="" />
                    <button type="button" onClick={() => removeNewImage(i)} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Menyimpan...' : 'Update Produk'}
          </button>
          <Link to="/admin/produk" className="btn-secondary">Batal</Link>
        </div>
      </form>
    </div>
  );
}
