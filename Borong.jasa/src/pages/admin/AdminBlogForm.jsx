import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { db, storage } from '../../config/firebase';
import { ArrowLeft, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockBlogPosts } from '../../data/blogData';

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function parseContent(text) {
  return text.split('\n').map(line => line.trim()).filter(Boolean).map(line => {
    if (line.startsWith('## ')) return { type: 'heading', text: line.slice(3) };
    if (line.startsWith('> ')) return { type: 'callout', text: line.slice(2) };
    return { type: 'paragraph', text: line };
  });
}

function blocksToText(content) {
  if (Array.isArray(content)) {
    return content.map(b => {
      if (b.type === 'heading') return '## ' + b.text;
      if (b.type === 'callout') return '> ' + b.text;
      return b.text;
    }).join('\n');
  }
  return content || '';
}

export default function AdminBlogForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loadingData, setLoadingData] = useState(isEdit);
  const [form, setForm] = useState({
    title: '', slug: '', category: '', excerpt: '', image: '', content: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      let post = mockBlogPosts.find(p => p.id === id);
      if (db) {
        try {
          const { doc, getDoc } = await import('firebase/firestore');
          const snap = await getDoc(doc(db, 'blog', id));
          if (snap.exists()) post = { id: snap.id, ...snap.data() };
        } catch { /* use mock */ }
      }
      if (post) {
        setForm({
          title: post.title || '',
          slug: post.slug || '',
          category: post.category || '',
          excerpt: post.excerpt || '',
          image: post.image || '',
          content: blocksToText(post.content),
        });
      }
      setLoadingData(false);
    })();
  }, [id, isEdit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => {
      const next = { ...prev, [name]: value };
      if (name === 'title' && !prev.slug.trim()) next.slug = slugify(value);
      return next;
    });
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (storage && db) {
      (async () => {
        try {
          const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
          const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          setForm(prev => ({ ...prev, image: url }));
        } catch { /* demo -> fallback local */ }
      })();
    }
    const reader = new FileReader();
    reader.onloadend = () => setForm(prev => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      category: form.category || 'Artikel',
      excerpt: form.excerpt,
      image: form.image,
      content: parseContent(form.content),
      author: 'Team Borongjasa',
      updatedAt: new Date().toISOString(),
    };

    if (db) {
      try {
        const { doc, setDoc, addDoc, collection, serverTimestamp } = await import('firebase/firestore');
        data.createdAt = serverTimestamp();
        if (isEdit) {
          await setDoc(doc(db, 'blog', id), data, { merge: true });
        } else {
          await addDoc(collection(db, 'blog'), data);
        }
        toast.success(isEdit ? 'Artikel diperbarui!' : 'Artikel ditambahkan!');
        setLoading(false);
        navigate('/admin/blog');
        return;
      } catch { /* demo mode */ }
    }
    toast.success(isEdit ? 'Artikel diperbarui (demo)' : 'Artikel ditambahkan (demo)');
    setLoading(false);
    navigate('/admin/blog');
  }

  if (loadingData) {
    return <div className="text-center py-16 text-brand-muted">Memuat...</div>;
  }

  return (
    <div>
      <Link to="/admin/blog" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-dark transition-colors mb-6">
        <ArrowLeft size={18} /> Kembali
      </Link>
      <h1 className="font-heading text-2xl font-bold mb-8">{isEdit ? 'Edit Artikel' : 'Tambah Artikel Baru'}</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="card p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Judul Artikel</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="input-field" placeholder="Judul artikel..." required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1.5">Slug</label>
              <input type="text" name="slug" value={form.slug} onChange={handleChange} className="input-field" placeholder="judul-artikel" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1.5">Kategori</label>
              <input type="text" name="category" value={form.category} onChange={handleChange} className="input-field" placeholder="Tutorial / Tips" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Ringkasan (excerpt)</label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} className="input-field min-h-[80px] resize-y" placeholder="Ringkasan singkat artikel..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Gambar Artikel</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center justify-center w-32 h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-brand-navy/30 transition-colors">
                <div className="text-center">
                  <Upload size={22} className="mx-auto text-brand-muted mb-1" />
                  <p className="text-xs text-brand-muted">Upload</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {form.image && (
                <div className="relative">
                  <img src={form.image} alt="" className="w-32 h-28 rounded-xl object-cover" />
                  <button type="button" onClick={() => setForm({ ...form, image: '' })} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
            <input type="text" name="image" value={form.image.startsWith('data:') ? '' : form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field mt-3" placeholder="...atau tempel URL gambar" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Isi Artikel</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="input-field min-h-[220px] resize-y font-mono text-xs"
              placeholder={'Tulis konten. Format:\n## Judul Bagian untuk heading\n> Teks untuk kotak penekanan\nBaris biasa untuk paragraf'}
              required
            />
            <p className="text-xs text-brand-muted mt-2">Gunakan <code className="font-mono">## </code> untuk judul bagian dan <code className="font-mono">&gt; </code> untuk kotak penekanan, satu baris per paragraf.</p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Simpan Artikel')}
          </button>
          <Link to="/admin/blog" className="btn-secondary">Batal</Link>
        </div>
      </form>
    </div>
  );
}
