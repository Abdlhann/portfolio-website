import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Eye, EyeOff, Mail, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const ADMIN_EMAIL = 'hannan335@gmail.com';
const ADMIN_PASSWORD = 'Hnvsvnsid2';

export function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginSuccess = (userCredential) => {
    // Cookie expiry: 4 hours (0.167 days) for extra security
    Cookies.set('auth_token', userCredential.user.uid, { expires: 0.167, path: '/portfolio-website' });
    Cookies.set('user_role', 'Admin', { expires: 0.167, path: '/portfolio-website' });
    onLogin();
    navigate('/UploadProject');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Only allow the admin email
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError('Email atau Password salah (Credential tidak valid).');
      setLoading(false);
      return;
    }

    try {
      // Try to login first
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      loginSuccess(userCredential);
    } catch (err) {
      console.error('Firebase Login Error:', err.code, err.message);
      console.error('Full error:', err);

      // If user doesn't exist yet, auto-create and login
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        try {
          const newUser = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
          loginSuccess(newUser);
        } catch (createErr) {
          console.error('Auto-create error:', createErr);
          setError(`Gagal membuat akun: ${createErr.code} - ${createErr.message}`);
        }
      } else if (err.code === 'auth/too-many-requests') {
        setError('Terlalu banyak percobaan login. Silakan coba lagi nanti.');
      } else {
        setError(`Error: ${err.code} - ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.2),_transparent_25%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] px-4 py-8 text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/15 bg-slate-900/70 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.55)] backdrop-blur-xl">
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-cyan-400/20" />

          <div className="relative">
            <div className="mb-7 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-lg shadow-indigo-500/30">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo-200">
                <Sparkles className="h-3.5 w-3.5" />
                Admin Access Only
              </div>
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="mt-2 text-sm text-slate-300">
                Sign in to manage your portfolio and project updates.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label htmlFor="email" className="text-sm font-medium text-slate-200">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-2xl border border-slate-700/80 bg-slate-800/70 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-400 shadow-inner shadow-slate-950/30 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                    placeholder="Alamat email"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="password" className="text-sm font-medium text-slate-200">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-2xl border border-slate-700/80 bg-slate-800/70 py-3 pl-11 pr-11 text-sm text-white placeholder:text-slate-400 shadow-inner shadow-slate-950/30 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                    placeholder="Kata sandi"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-center text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center rounded-2xl border border-transparent bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                >
                  <span>{loading ? 'Signing in...' : 'Sign in'}</span>
                  <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">{loading ? '' : '→'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
