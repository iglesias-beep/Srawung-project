import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, BadgeCheck, Headset, Calendar } from 'lucide-react';
import { mockBlogPosts } from '../data/blogData';

const categories = [
  { name: 'Papan Nama', slug: 'papan-nama', desc: 'Papan nama custom untuk bisnis Anda', image: '/assets/products/papan-nama.jpg' },
  { name: 'Neon Box', slug: 'neon-box', desc: 'Neon box berkualitas tinggi dan menarik', image: '/assets/products/neon-box.jpg' },
  { name: 'Rambu-Rambu', slug: 'rambu-rambu', desc: 'Rambu dan signage petunjuk lokasi', image: '/assets/products/rambu.jpg' },
  { name: 'Huruf Timbul', slug: 'huruf-timbul', desc: 'Huruf timbul untuk kesan premium', image: '/assets/products/huruf-timbul.jpg' },
  { name: 'Totem & Pylon', slug: 'totem-pylon', desc: 'Totem dan pylon untuk identitas bisnis', image: '/assets/products/totem-pylon.jpg' },
  { name: 'Sticker Cutting', slug: 'sticker-cutting', desc: 'Sticker cutting untuk branding & promosi', image: '/assets/products/sticker-cutting.jpg' },
  { name: 'Event Booth', slug: 'event-booth', desc: 'Booth custom untuk event dan pameran', image: '/assets/products/event-booth.jpg' },
  { name: 'Electric POP', slug: 'electric-pop-display', desc: 'Display POP elektrik untuk promosi', image: '/assets/products/electric-pop.jpg' },
];

const slides = [
  {
    title: 'Wujudkan Identitas Bisnis dengan',
    highlight: 'Signage Premium',
    desc: 'Papan nama, neon box, hingga huruf timbul berkualitas tinggi. Desain sesuai keinginan Anda.',
    image: '/assets/products/papan-nama.jpg',
    cta: { to: '/produk', label: 'Lihat Produk' },
  },
  {
    title: 'Neon Box yang Menyala',
    highlight: 'Terang & Menarik',
    desc: 'Pencahayaan LED hemat energi yang membuat toko Anda menonjol, siang maupun malam.',
    image: '/assets/products/neon-box.jpg',
    cta: { to: '/produk?kategori=neon-box', label: 'Lihat Neon Box' },
  },
  {
    title: 'Huruf Timbul Elegan untuk',
    highlight: 'Kesan Premium',
    desc: 'Material stainless, acrylic, dan galvanis. Tampilan tiga dimensi yang mewah untuk brand Anda.',
    image: '/assets/products/huruf-timbul.jpg',
    cta: { to: '/produk?kategori=huruf-timbul', label: 'Lihat Huruf Timbul' },
  },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir) => {
    setIndex(i => (i + dir + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex(i => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const slide = slides[index];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-charcoal to-brand-dark text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-navy rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-brand-accent/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {slide.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy via-brand-steel to-brand-accent">
                {slide.highlight}
              </span>
            </h1>
            <p className="text-lg leading-relaxed mb-8 max-w-xl text-white/70">{slide.desc}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={slide.cta.to} className="btn-primary flex items-center justify-center gap-2 text-base">
                {slide.cta.label} <ArrowRight size={18} />
              </Link>
              <Link to="/kontak" className="btn-secondary flex items-center justify-center gap-2 text-base !border-white/30 !text-white hover:!bg-white hover:!text-brand-dark">
                Konsultasi Gratis
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 max-w-md">
              {[
                { v: '500+', l: 'Proyek Selesai' },
                { v: '11', l: 'Kategori Produk' },
                { v: '100%', l: 'Garansi Kualitas' },
              ].map((s, i) => (
                <div key={i} className="border-l-2 border-brand-navy/50 pl-4">
                  <p className="text-2xl lg:text-3xl font-bold font-heading text-brand-steel">{s.v}</p>
                  <p className="text-sm text-white/60">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-navy/40 to-brand-accent/30 rounded-[2.5rem] blur-2xl opacity-70 pointer-events-none"></div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
              <img src={slide.image} alt={slide.highlight} className="w-full h-72 sm:h-96 lg:h-[460px] object-cover scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex items-center justify-between">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-brand-navy' : 'w-2 bg-white/30 hover:bg-white/60'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => go(-1)} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Sebelumnya">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => go(1)} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Berikutnya">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: BadgeCheck, title: 'Kualitas Terjamin', desc: 'Material terbaik & pengerjaan rapi' },
    { icon: Truck, title: 'Pengiriman Aman', desc: 'Packaging kokoh, sampai tujuan' },
    { icon: Headset, title: 'Support 24/7', desc: 'Siap membantu kapan saja' },
  ];
  return (
    <div className="bg-gradient-to-r from-brand-charcoal via-brand-dark to-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold">{it.title}</p>
                  <p className="text-xs text-white/60 leading-snug">{it.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ClientLogos() {
  const logos = [
    { name: 'BUMN', src: '/assets/clients/bumn.png' },
    { name: 'Pertamina', src: '/assets/clients/pertamina.jpg' },
    { name: 'PLN', src: '/assets/clients/pln.webp' },
    { name: 'Telkomsel', src: '/assets/clients/telkomsel.jpg' },
    { name: 'Volcom', src: '/assets/clients/volcom.jpg' },
    { name: 'Comnet Plus', src: '/assets/clients/comnet-plus.jpg' },
    { name: 'Billabong', src: '/assets/clients/billabong.png' },
    { name: 'Harfam Makmur', src: '/assets/clients/harfam-makmur.png' },
    { name: 'Quiksilver', src: '/assets/clients/quiksilver.jpg' },
    { name: 'Fonterra', src: '/assets/clients/fonterra.png' },
    { name: 'Motasa', src: '/assets/clients/motasa.png' },
    { name: 'PGN', src: '/assets/clients/pgn.jpg' },
  ];
  const doubled = [...logos, ...logos];
  return (
    <section className="bg-white border-y border-brand-soft py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-3 text-brand-dark">Dipercaya oleh Brand Terbaik</h2>
        <p className="text-brand-muted max-w-xl mx-auto">Ribuan pelanggan dan brand ternama mempercayakan kebutuhan signage mereka kepada kami</p>
      </div>
      <div className="relative overflow-hidden select-none">
        <div className="absolute inset-y-0 left-0 w-20 lg:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 lg:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
          {doubled.map((logo, i) => (
            <div key={i} className="mx-7 lg:mx-10 flex items-center justify-center p-2">
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                className="h-12 lg:h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div>
      <HeroSlider />
      <TrustBar />

      {/* Categories */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">Kategori Produk</h2>
            <p className="text-brand-muted max-w-xl mx-auto">Kami menyediakan berbagai macam signage custom sesuai kebutuhan bisnis Anda</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/produk?kategori=${cat.slug}`}
                className="card group cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden bg-brand-cream">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg font-semibold mb-1 group-hover:text-brand-navy transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-brand-muted leading-snug">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <div>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">Artikel & Tips</h2>
              <p className="text-brand-muted max-w-xl">Tips memilih dan merawat signage untuk bisnis Anda</p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-brand-navy font-semibold hover:gap-3 transition-all"
            >
              Lihat Semua <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockBlogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="card group cursor-pointer overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden bg-brand-cream">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {post.category && (
                    <span className="absolute top-3 left-3 bg-brand-navy text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-brand-muted mb-2">
                    <Calendar size={14} />
                    <span>{post.createdAt}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold leading-snug group-hover:text-brand-navy transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClientLogos />
    </div>
  );
}
