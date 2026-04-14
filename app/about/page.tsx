'use client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Heart, Users, ShieldCheck, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: 'var(--red)', padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, opacity: 0.08, fontSize: 300 }}>🌸</div>
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 24 }}>
            About RestComm
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, lineHeight: 1.7 }}>
            We exist because loneliness should never be a senior's companion.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ maxWidth: 800, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ width: 60, height: 4, background: 'var(--gold)', margin: '0 auto 32px', borderRadius: 2 }} />
        <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: 28 }}>
          "Loneliness is not Emptiness.<br />Emptiness is Loneliness."
        </blockquote>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
          This truth drove us to create RestComm — a place where seniors don't just sell their skills, but rediscover their place in the world. Every listing is a conversation waiting to happen. Every transaction is a friendship in the making.
        </p>
      </section>

      {/* Values */}
      <section style={{ background: 'var(--bg-subtle)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 48, textAlign: 'center', letterSpacing: '-1px' }}>What We Stand For</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
            {[
              { icon: <Heart size={28} color="var(--red)" />, title: 'Community First', desc: 'Every feature is designed to bring people closer, not just facilitate transactions.', bg: 'var(--red-pale)' },
              { icon: <Users size={28} color="var(--blue)" />, title: 'Dignity & Respect', desc: 'We celebrate seniors as contributors, not dependants. Their wisdom has immense value.', bg: 'var(--blue-pale)' },
              { icon: <ShieldCheck size={28} color="var(--green)" />, title: 'Safe & Simple', desc: 'WhatsApp-based contact keeps it familiar. No complex systems, just real conversations.', bg: 'var(--green-pale)' },
              { icon: <Globe size={28} color="var(--gold)" />, title: 'Inclusive Access', desc: 'Anyone can browse. Any senior can post. No fees, no barriers, just connection.', bg: 'var(--gold-pale)' },
            ].map(v => (
              <div key={v.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 28 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>{v.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ maxWidth: 800, margin: '80px auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Our Story</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
              Born from a Grandmother's Loneliness
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.75 }}>
              Our founder noticed his grandmother — once a vibrant batik artist — growing quieter each year after retirement. She had so much to give, but no platform to offer it. RestComm was built for her, and for every senior who still has so much left to share.
            </p>
          </div>
          <div style={{ background: 'var(--gold-pale)', borderRadius: 24, padding: 40, textAlign: 'center', border: '1px solid var(--gold)30' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎨</div>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, color: 'var(--text-primary)', lineHeight: 1.5 }}>
              "She taught 47 children batik in her first month on RestComm."
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 12 }}>— A real story from our community</p>
          </div>
        </div>
        <style>{`@media (max-width: 600px) { section > div { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--green)', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>Join Us Today</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
          Whether you're a senior with something to offer, or someone looking to support our community — there's a place for you here.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" style={{ padding: '16px 32px', background: '#fff', color: 'var(--green)', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 16 }}>
            Sign Up Free
          </Link>
          <Link href="/marketplace" style={{ padding: '16px 32px', border: '2px solid rgba(255,255,255,0.5)', color: '#fff', borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>
            Browse Listings
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
