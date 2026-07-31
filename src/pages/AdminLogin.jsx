import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '@/lib/adminAuth';
import { Lock, Mail, ArrowLeft, Eye, EyeOff, KeyRound, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any leftover lockout attempt counters from localStorage
    localStorage.removeItem('portfolio_admin_attempts');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await loginAdmin(email, password, accessCode);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.message || 'Invalid credentials. Please check inputs and try again.');
      }
    } catch {
      setError('Something went wrong during sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 text-ivory/40 hover:text-ivory transition-colors mb-8 text-sm">
          <ArrowLeft size={14} /> Back to site
        </Link>

        <div className="bg-ivory rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-obsidian flex items-center justify-center">
                <Lock size={18} className="text-ivory" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-obsidian">Admin Panel</h1>
                <p className="text-xs text-obsidian/40">Sign in to manage your content</p>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-lime/10 border border-lime/30 rounded-full text-[11px] font-bold text-lime">
              <ShieldCheck size={12} />
              <span>Database Sync</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs uppercase tracking-widest text-obsidian/40 font-medium mb-2 block">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian/30" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@prabal.dev"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-sand rounded-xl outline-none focus:border-obsidian focus:ring-2 focus:ring-obsidian/10"
                  required
                  maxLength={100}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs uppercase tracking-widest text-obsidian/40 font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 text-sm bg-white border border-sand rounded-xl outline-none focus:border-obsidian focus:ring-2 focus:ring-obsidian/10"
                  required
                  maxLength={200}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-obsidian/35 hover:text-obsidian transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Access Code */}
            <div>
              <label className="text-xs uppercase tracking-widest text-obsidian/40 font-medium mb-2 block">Access Code</label>
              <div className="relative">
                <KeyRound size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian/30" />
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Secret access code"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-sand rounded-xl outline-none focus:border-obsidian focus:ring-2 focus:ring-obsidian/10"
                  required
                  maxLength={200}
                  autoComplete="one-time-code"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-charcoal transition-colors disabled:opacity-50 font-bold shadow-md cursor-pointer"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
