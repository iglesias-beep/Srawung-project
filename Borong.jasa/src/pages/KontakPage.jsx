import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function KontakPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // In production, send to Firebase or email service
    setTimeout(() => {
      toast.success('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
      setForm({ name: '', email: '', phone: '', message: '' });
      setLoading(false);
    }, 1000);
  }

  const contactInfo = [
    { icon: Phone, label: 'Telepon', value: '+62 812 XXX XXX', href: 'tel:+6281200000000' },
    { icon: Mail, label: 'Email', value: 'info@borongjasa.com', href: 'mailto:info@borongjasa.com' },
    { icon: MapPin, label: 'Alamat', value: 'Surabaya, Jawa Timur', href: '#' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-4">Hubungi Kami</h1>
        <p className="text-brand-muted max-w-xl mx-auto">
          Konsultasikan kebutuhan signage Anda kepada kami. Kami siap membantu mewujudkan visi Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          {contactInfo.map((info, i) => {
            const Icon = info.icon;
            return (
              <a
                key={i}
                href={info.href}
                className="card p-6 flex items-start gap-4 group"
              >
                <div className="w-12 h-12 bg-brand-navy/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-navy group-hover:text-white transition-all duration-300">
                  <Icon size={20} className="text-brand-navy group-hover:text-white transition-all" />
                </div>
                <div>
                  <p className="text-sm text-brand-muted">{info.label}</p>
                  <p className="font-medium text-brand-dark">{info.value}</p>
                </div>
              </a>
            );
          })}

          <div className="card p-6">
            <h3 className="font-heading text-lg font-semibold mb-3">Jam Operasional</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-muted">Senin - Jumat</span>
                <span className="font-medium">08:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Sabtu</span>
                <span className="font-medium">08:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Minggu</span>
                <span className="font-medium text-red-500">Tutup</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="card p-8">
            <h3 className="font-heading text-xl font-semibold mb-6">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">Nama</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Nama Anda"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="email@contoh.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">No. WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="0812 XXX XXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">Pesan</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="input-field min-h-[140px] resize-y"
                  placeholder="Ceritakan kebutuhan signage Anda..."
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                <Send size={18} />
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
