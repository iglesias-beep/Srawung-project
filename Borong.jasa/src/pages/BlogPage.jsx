import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { Image, Calendar } from 'lucide-react';
import { mockBlogPosts } from '../data/blogData';

export default function BlogPage() {
  const [posts, setPosts] = useState(mockBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (db) {
        try {
          const { collection, getDocs } = await import('firebase/firestore');
          const snap = await getDocs(collection(db, 'blog'));
          const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          if (items.length > 0) {
            items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPosts(items);
          }
        } catch { /* use mock */ }
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="text-center mb-12">
        <p className="text-brand-navy text-sm font-medium uppercase tracking-wider mb-2">Artikel</p>
        <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-4">Blog & Edukasi</h1>
        <p className="text-brand-muted max-w-2xl mx-auto">
          Panduan memilih signage, tips branding, dan informasi seputar produk custom cetak.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <Image size={48} className="mx-auto text-brand-muted/30 mb-4" />
          <h3 className="font-heading text-xl font-semibold mb-2">Belum ada artikel</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link key={post.id} to={`/blog/${post.slug || post.id}`} className="card group">
              <div className="relative h-48 overflow-hidden bg-brand-cream">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image size={40} className="text-brand-muted/30" />
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-brand-navy text-white text-xs px-3 py-1 rounded-full">
                  {post.category || 'Artikel'}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-brand-navy transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-brand-muted text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-brand-muted">
                  <Calendar size={14} />
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
