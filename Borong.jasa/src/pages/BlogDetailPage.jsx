import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { ArrowLeft, Calendar, MessageCircle } from 'lucide-react';
import { mockBlogPosts } from '../data/blogData';

function renderBlocks(content) {
  if (!Array.isArray(content)) {
    return <p className="text-brand-muted leading-relaxed whitespace-pre-wrap">{content || ''}</p>;
  }
  return content.map((block, i) => {
    switch (block.type) {
      case 'heading':
        return <h2 key={i} className="font-heading text-2xl font-bold mt-8 mb-3">{block.text}</h2>;
      case 'callout':
        return (
          <div key={i} className="bg-brand-navy text-white rounded-xl p-5 my-6">
            <p className="font-medium">{block.text}</p>
          </div>
        );
      case 'paragraph':
      default:
        return <p key={i} className="text-brand-muted leading-relaxed mb-4">{block.text}</p>;
    }
  });
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let found = mockBlogPosts.find(p => p.slug === slug || p.id === slug);
      let all = mockBlogPosts;
      if (db) {
        try {
          const { collection, getDocs } = await import('firebase/firestore');
          const snap = await getDocs(collection(db, 'blog'));
          const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          if (items.length > 0) {
            all = items;
            found = items.find(p => p.slug === slug || p.id === slug) || null;
          }
        } catch { /* use mock */ }
      }
      setPost(found);
      setRelated(all.filter(p => p.slug !== (found?.slug) && p.id !== (found?.id)).slice(0, 3));
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-12 text-center text-brand-muted">Memuat...</div>;
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="font-heading text-2xl font-bold mb-4">Artikel tidak ditemukan</h2>
        <Link to="/blog" className="btn-primary">Kembali ke Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Link to="/blog" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-dark transition-colors mb-8">
        <ArrowLeft size={18} /> Semua Artikel
      </Link>

      <article className="max-w-3xl mx-auto">
        <span className="inline-block bg-brand-navy text-white text-xs px-3 py-1 rounded-full mb-4">
          {post.category || 'Artikel'}
        </span>
        <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-brand-muted mb-8">
          <span className="inline-flex items-center gap-1.5"><Calendar size={15} /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}</span>
          {post.author && <span>{post.author}</span>}
        </div>

        {post.image && (
          <div className="rounded-2xl overflow-hidden mb-8 h-72 lg:h-96">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-slate max-w-none">
          {renderBlocks(post.content)}
        </div>

        <div className="mt-10 bg-brand-cream rounded-2xl p-6 text-center">
          <h3 className="font-heading text-xl font-semibold mb-2">Butuh bantuan untuk bisnis Anda?</h3>
          <p className="text-brand-muted text-sm mb-4">Konsultasikan kebutuhan signage Anda secara gratis.</p>
          <a href="https://wa.me/6281200000000" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
            <MessageCircle size={18} /> Chat via WhatsApp
          </a>
        </div>
      </article>

      {related.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold">Artikel Lainnya</h2>
            <Link to="/blog" className="text-sm font-medium text-brand-navy hover:underline">Semua Artikel</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map(p => (
              <Link key={p.id} to={`/blog/${p.slug || p.id}`} className="card group">
                <div className="h-40 overflow-hidden bg-brand-cream">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-muted/30">No Image</div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base font-semibold group-hover:text-brand-navy transition-colors line-clamp-2">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
