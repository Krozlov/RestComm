'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PetalLogo } from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, Sun, Moon, Phone, Lock } from 'lucide-react';

export default function LoginPage() {
  const { theme, toggle } = useTheme();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    alert('Login functionality coming soon!');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg)' }}>
      {/* Left panel — decorative */}
      <div style={{
        flex: 1, background: 'var(--green)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: 48, position: 'relative', overflow: 'hidden',
      }} className="auth-panel">
        <div style={{ position: 'absolute', top: -80, right: -80, opacity: 0.12 }}>
          <svg width="400" height="400" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="13" cy="13" rx="10" ry="14" transform="rotate(-45 13 13)" fill="#fff" />
            <ellipse cx="27" cy="13" rx="10" ry="14" transform="rotate(45 27 13)" fill="#fff" />
            <ellipse cx="13" cy="27" rx="10" ry="14" transform="rotate(45 13 27)" fill="#fff" />
            <ellipse cx="27" cy="27" rx="10" ry="14" transform="rotate(-45 27 27)" fill="#fff" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: -60, left: -60, opacity: 0.08 }}>
          <svg width="300" height="300" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="13" cy="13" rx="10" ry="14" transform="rotate(-45 13 13)" fill="#fff" />
            <ellipse cx="27" cy="13" rx="10" ry="14" transform="rotate(45 27 13)" fill="#fff" />
            <ellipse cx="13" cy="27" rx="10" ry="14" transform="rotate(45 13 27)" fill="#fff" />
            <ellipse cx="27" cy="27" rx="10" ry="14" transform="rotate(-45 27 27)" fill="#fff" />
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', maxWidth: 320 }}>
          <div className="animate-float" style={{ marginBottom: 32 }}>
            <svg width="80" height="80" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="13" cy="13" rx="10" ry="14" transform="rotate(-45 13 13)" fill="rgba(255,255,255,0.9)" />
              <ellipse cx="27" cy="13" rx="10" ry="14" transform="rotate(45 27 13)" fill="rgba(255,255,255,0.7)" />
              <ellipse cx="13" cy="27" rx="10" ry="14" transform="rotate(45 13 27)" fill="rgba(255,255,255,0.8)" />
              <ellipse cx="27" cy="27" rx="10" ry="14" transform="rotate(-45 27 27)" fill="rgba(255,255,255,0.6)" />
            </svg>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>
            Welcome Back to RestComm
          </h2>
          <p style={{ opacity: 0.85, fontSize: 15, lineHeight: 1.6 }}>
            Your community is waiting. Log in to see new listings, connect with neighbours, and share your own gifts.
          </p>

          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['"I found a beautiful pet sitter through here!" — Margaret, 68', '"Made 3 new friends just from posting my cakes." — Robert, 72'].map(q => (
              <div key={q} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '14px 18px', fontSize: 13, textAlign: 'left', lineHeight: 1.5, backdropFilter: 'blur(8px)' }}>
                {q}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '48px 40px', position: 'relative', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ position: 'absolute', top: 24, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 40px', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <PetalLogo size={28} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
              Silver<span style={{ color: 'var(--gold)' }}>Circle</span>
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
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 36 }}>
            Don't have an account? <Link href="/signup" style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'none' }}>Sign up free</Link>
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Phone */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+60 12-345 6789"
                  required
                  style={{
                    width: '100%', padding: '14px 16px 14px 44px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    borderRadius: 12, fontSize: 15,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    transition: 'border-color 0.2s',
                  }}
                  className="auth-input"
                />
              </div>
            </div>

            {/* Password */}
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
                  style={{
                    width: '100%', padding: '14px 44px 14px 44px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    borderRadius: 12, fontSize: 15,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    transition: 'border-color 0.2s',
                  }}
                  className="auth-input"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? 'var(--text-muted)' : 'var(--green)',
                color: '#fff', border: 'none',
                padding: '16px', borderRadius: 12,
                fontSize: 16, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                marginTop: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {loading ? (
                <>
                  <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Logging in...
                </>
              ) : 'Log In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Social */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ label: 'Google', emoji: '🔵' }, { label: 'Facebook', emoji: '📘' }].map(s => (
              <button key={s.label} style={{
                padding: '12px', background: 'var(--bg-card)',
                border: '1px solid var(--border)', borderRadius: 12,
                cursor: 'pointer', fontSize: 14, fontWeight: 600,
                color: 'var(--text-primary)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s',
              }} className="social-btn">
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .auth-panel { display: none !important; } }
        .auth-input:focus { border-color: var(--green) !important; background: var(--bg-card) !important; }
        .social-btn:hover { background: var(--bg-subtle) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
