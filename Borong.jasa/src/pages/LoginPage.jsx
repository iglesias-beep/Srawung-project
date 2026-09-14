import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Berhasil masuk!');
      navigate(isAdmin ? '/admin/dashboard' : '/');
    } catch (err) {
      toast.error(err.message || 'Gagal masuk. Periksa email dan password.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">Masuk</h1>
          <p className="text-brand-muted">Selamat datang kembali di Borongjasa</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="email@contoh.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-11"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2" >
              <LogIn size={18} />
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-brand-muted mt-6">
          Belum punya akun?{' '}
          <Link to="/register" className="text-brand-navy font-medium hover:underline">Daftar sekarang</Link>
        </p>
        <p className="text-center text-sm text-brand-muted mt-2">
          <Link to="/admin/login" className="text-brand-navy font-medium hover:underline">Login sebagai Admin</Link>
        </p>

        {/* Demo hint */}
        <div className="mt-6 card p-4">
          <p className="text-xs font-medium text-brand-navy uppercase tracking-wider mb-2">Mode Demo</p>
          <p className="text-xs text-brand-muted">
            Masuk sebagai admin: <span className="font-mono font-medium text-brand-dark">admin@borongjasa.com</span> / <span className="font-mono font-medium text-brand-dark">admin123</span>
          </p>
          <p className="text-xs text-brand-muted mt-1">
            Masuk sebagai user: <span className="font-mono font-medium text-brand-dark">*(email apa saja)</span> / <span className="font-mono font-medium text-brand-dark">123456</span>
          </p>
        </div>
      </div>
    </div>
  );
}
