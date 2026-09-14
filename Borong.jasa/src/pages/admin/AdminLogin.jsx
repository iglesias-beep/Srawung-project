import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(email, password);
      toast.success('Berhasil masuk!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.message || 'Gagal masuk. Periksa email dan password.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl font-heading">B</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-brand-muted">Masuk ke dashboard admin Borongjasa</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-navy/50 focus:border-brand-navy transition-all"
                placeholder="admin@borongjasa.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-navy/50 focus:border-brand-navy transition-all pr-11"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              <LogIn size={18} />
              {loading ? 'Memproses...' : 'Masuk sebagai Admin'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-brand-muted mt-6">
          <a href="/" className="text-white/50 hover:text-white/70 transition-colors">Kembali ke website</a>
        </p>

        {/* Demo credentials */}
        <div className="mt-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3">Mode Demo</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/40">Admin:</span>
              <span className="text-white/70 font-mono">admin@borongjasa.com / admin123</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">User:</span>
              <span className="text-white/70 font-mono">*(email apa saja) / 123456</span>
            </div>
          </div>
          <p className="text-xs text-white/30 mt-3">Gunakan akun demo jika Firebase belum dikonfigurasi</p>
        </div>
      </div>
    </div>
  );
}
