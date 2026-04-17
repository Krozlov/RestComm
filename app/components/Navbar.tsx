'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image src="/logo.png" alt="RestComm logo" width={38} height={38} style={{ objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Rest<span style={{ color: 'var(--gold)' }}>Comm</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/marketplace">Browse</NavLink>
          <NavLink href="/post-listing">Post a Listing</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={toggle}
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 50,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link href="/dashboard" style={{
            padding: '9px 18px',
            borderRadius: 50,
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 500,
            transition: 'all 0.2s ease',
          }}
            className="nav-btn-ghost"
          >
            Log in
          </Link>

          <Link href="/signup" style={{
            padding: '9px 18px',
            borderRadius: 50,
            background: 'var(--green)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
            className="nav-btn-primary"
          >
            Join Free
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'none' }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          <Link href="/" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, padding: '8px 0' }} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/marketplace" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, padding: '8px 0' }} onClick={() => setMenuOpen(false)}>Browse Listings</Link>
          <Link href="/post-listing" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, padding: '8px 0' }} onClick={() => setMenuOpen(false)}>Post a Listing</Link>
          <Link href="/about" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, padding: '8px 0' }} onClick={() => setMenuOpen(false)}>About</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        .nav-btn-ghost:hover { background: var(--bg-subtle); }
        .nav-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{
      color: 'var(--text-secondary)',
      textDecoration: 'none',
      fontSize: 14,
      fontWeight: 500,
      padding: '8px 14px',
      borderRadius: 8,
      transition: 'all 0.2s ease',
    }}
      className="navlink"
    >
      {children}
      <style>{`.navlink:hover { color: var(--text-primary); background: var(--bg-subtle); }`}</style>
    </Link>
  );
}

// Used in other pages that import this
export function PetalLogo({ size = 40 }: { size?: number }) {
  return (
    <Image src="/logo.png" alt="RestComm logo" width={size} height={size} style={{ objectFit: 'contain' }} />
  );
}
