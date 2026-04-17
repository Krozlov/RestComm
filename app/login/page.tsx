'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PetalLogo } from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, Sun, Moon, Phone, Lock } from 'lucide-react';

export default function LoginPage() {
  const { theme, toggle } = useTheme();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    alert('Login functionality coming soon!');
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    // When backend is ready, replace this with:
    // signIn('google') from next-auth, or supabase.auth.signInWithOAuth({ provider: 'google' })
    await new Promise(r => setTimeout(r, 1200));
    setGoogleLoading(false);
    alert('Google login coming soon — see README for setup instructions.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg)' }}>

      {/* ── Left panel — decorative ── */}
      <div style={{
        flex: 1, background: 'var(--green)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: 48, position: 'relative', overflow: 'hidden',
      }} className="auth-panel">
        {/* Background logo watermarks */}
        <div style={{ position: 'absolute', top: -60, right: -60, opacity: 0.12 }}>
          <Image src="/logo.png" alt="" width={320} height={320} style={{ objectFit: 'contain' }} />
        </div>
        <div style={{ position: 'absolute', bottom: -60, left: -60, opacity: 0.07 }}>
          <Image src="/logo.png" alt="" width={240} height={240} style={{ objectFit: 'contain' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', maxWidth: 320 }}>
          {/* Floating logo */}
          <div className="animate-float" style={{ marginBottom: 28 }}>
            <Image src="/logo.png" alt="RestComm" width={88} height={88} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.92 }} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, marginBottom: 14, lineHeight: 1.2 }}>
            Welcome Back to RestComm
          </h2>
          <p style={{ opacity: 0.85, fontSize: 15, lineHeight: 1.65 }}>
            Your community is waiting. Log in to see new listings, connect with neighbours, and share your own gifts.
          </p>

          <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              '"I found a beautiful pet sitter through here!" — Margaret, 68',
              '"Made 3 new friends just from posting my cakes." — Robert, 72',
            ].map(q => (
              <div key={q} style={{ background: 'rgba(255,255,255,0.13)', borderRadius: 14, padding: '14px 18px', fontSize: 13, textAlign: 'left', lineHeight: 1.55, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {q}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '48px 40px', position: 'relative', minWidth: 0 }}>

        {/* Top bar */}
        <div style={{ position: 'absolute', top: 24, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 40px', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <PetalLogo size={28} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
              Rest<span style={{ color: 'var(--gold)' }}>Comm</span>
            </span>
          </Link>
          <button onClick={toggle} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 50, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div style={{ width: '100%', maxWidth: 400 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.5px' }}>
            Log In
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 32 }}>
            Don't have an account?{' '}
            <Link href="/signup" style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'none' }}>
              Sign up free
            </Link>
          </p>

          {/* ── Google Login ── */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            style={{
              width: '100%', padding: '14px 20px',
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border)',
              borderRadius: 12, cursor: googleLoading ? 'not-allowed' : 'pointer',
              fontSize: 15, fontWeight: 600,
              color: 'var(--text-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              transition: 'all 0.2s',
              marginBottom: 20,
              opacity: googleLoading ? 0.7 : 1,
            }}
            className="google-btn"
          >
            {googleLoading ? (
              <div style={{ width: 20, height: 20, border: '2px solid var(--border)', borderTopColor: '#4285F4', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            ) : (
              /* Official Google "G" SVG */
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: 13, whiteSpace: 'nowrap' }}>or log in with phone</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Phone + Password form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+65 9123 4567"
                  required
                  style={{ width: '100%', padding: '14px 16px 14px 44px', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s' }}
                  className="auth-input"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                Password
                <Link href="#" style={{ color: 'var(--blue)', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</Link>
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{ width: '100%', padding: '14px 44px 14px 44px', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s' }}
                  className="auth-input"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? 'var(--text-muted)' : 'var(--green)',
                color: '#fff', border: 'none', padding: '16px', borderRadius: 12,
                fontSize: 16, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', marginTop: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {loading ? (
                <><div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Logging in...</>
              ) : 'Log In'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .auth-panel { display: none !important; } }
        .auth-input:focus { border-color: var(--green) !important; background: var(--bg-card) !important; }
        .google-btn:hover { border-color: #4285F4 !important; box-shadow: 0 2px 12px rgba(66,133,244,0.15); }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
