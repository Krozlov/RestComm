import Link from 'next/link';
import { PetalLogo } from './Navbar';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', marginTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <PetalLogo size={32} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
                Silver<span style={{ color: 'var(--gold)' }}>Circle</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, maxWidth: 240 }}>
              Loneliness is not Emptiness. Emptiness is Loneliness. We build bridges between seniors and the world.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Explore</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Browse Listings', 'Categories', 'How It Works', 'Success Stories'].map(l => (
                <Link key={l} href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  className="footer-link">{l}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Community</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['About Us', 'Blog', 'Community Guidelines', 'Safety Tips'].map(l => (
                <Link key={l} href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14 }}
                  className="footer-link">{l}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map(l => (
                <Link key={l} href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14 }}
                  className="footer-link">{l}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>© 2025 SilverCircle. All rights reserved.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
            Made with <Heart size={12} fill="currentColor" color="var(--red)" /> for seniors everywhere
          </p>
        </div>
      </div>
      <style>{`.footer-link:hover { color: var(--text-primary) !important; }`}</style>
    </footer>
  );
}
