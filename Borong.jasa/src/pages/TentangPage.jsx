import { Award, Users, Clock, Target } from 'lucide-react';

const stats = [
  { icon: Award, value: '500+', label: 'Proyek Selesai' },
  { icon: Users, value: '300+', label: 'Klien Puas' },
  { icon: Clock, value: '10+', label: 'Tahun Pengalaman' },
  { icon: Target, value: '100%', label: 'Komitmen Kualitas' },
];

export default function TentangPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-cream to-white text-brand-dark py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 bg-brand-navy/10 text-brand-navy font-medium text-sm tracking-wider uppercase px-3 py-1 rounded-full mb-5">Tentang Kami</p>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-6">
              Solusi Signage Terpercaya Sejak 2014
            </h1>
            <p className="text-brand-muted text-lg leading-relaxed">
              Borongjasa adalah penyedia jasa pembuatan signage custom yang berlokasi di Surabaya. Kami berkomitmen menghadirkan produk berkualitas premium dengan harga terjangkau.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 bg-brand-navy/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={24} className="text-brand-navy" />
                  </div>
                  <p className="font-heading text-3xl font-bold text-brand-dark">{stat.value}</p>
                  <p className="text-brand-muted text-sm mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6">Cerita Kami</h2>
              <div className="space-y-4 text-brand-muted leading-relaxed">
                <p>
                  Borongjasa didirikan dengan visi sederhana: menyediakan signage berkualitas tinggi yang bisa diakses oleh semua jenis bisnis, dari usaha kecil hingga korporasi besar.
                </p>
                <p>
                  Dengan peralatan modern dan tim berpengalaman, kami menangani setiap proyek dengan teliti — mulai dari desain, produksi, hingga pemasangan. Setiap detail diperhatikan untuk memastikan hasil yang melebihi ekspektasi.
                </p>
                <p>
                  Kami percaya bahwa signage yang baik bukan sekadar papan nama, tapi merupakan investasi dalam identitas dan citra bisnis Anda.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-brand-soft">
              <h3 className="font-heading text-2xl font-bold mb-4 text-brand-dark">Misi Kami</h3>
              <ul className="space-y-3">
                {[
                  'Menghadirkan signage premium dengan harga kompetitif',
                  'Memberikan layanan konsultasi desain gratis',
                  'Menjamin kualitas material dan pengerjaan',
                  'Tepat waktu dalam setiap proyek',
                  'Membangun hubungan jangka panjang dengan klien',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-brand-navy rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-brand-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
