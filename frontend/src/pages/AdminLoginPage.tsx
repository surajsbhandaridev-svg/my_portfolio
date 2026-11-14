import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Shield, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.adminLogin({ email, password });
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.message || 'Login failed.');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0e] flex items-center justify-center p-4 selection:bg-[#F2A6AC] selection:text-[#101010]">
      <div className="w-full max-w-md bg-[#161618] border border-white/10 rounded-lg shadow-2xl p-8 space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-[#F2A6AC] mb-2">
            <Shield size={26} />
          </div>
          <h1 className="text-2xl font-bold font-sans text-white tracking-tight">
            Sketchbook Admin Portal
          </h1>
          <p className="text-xs text-zinc-400 font-sans">
            Secure administrative control panel for Suraj Singh Bhandari's engineering journal.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium font-sans text-zinc-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@surajsinghbhandari.dev"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#0e0e10] border border-zinc-800 rounded text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#F2A6AC] focus:ring-1 focus:ring-[#F2A6AC]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium font-sans text-zinc-300 mb-1.5">
              Security Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#0e0e10] border border-zinc-800 rounded text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#F2A6AC] focus:ring-1 focus:ring-[#F2A6AC]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 bg-[#F2A6AC] hover:bg-[#eb9399] text-[#101010] font-sans text-sm font-semibold rounded transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        {/* Return to website */}
        <div className="text-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Public Journal
          </Link>
        </div>
      </div>
    </div>
  );
};
