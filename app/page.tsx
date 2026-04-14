'use client';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListingCard from './components/ListingCard';
import { listings, categories } from './data/listings';
import { Search, ArrowRight, Heart, Users, ShoppingBag, Star, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const featured = listings.filter(l => l.featured);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: 'var(--bg)',
        padding: '80px 24px 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background petals decorative */}
        <div style={{ position: 'absolute', top: -60, right: -80, opacity: 0.06, pointerEvents: 'none' }}>
          <svg width="500" height="500" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="13" cy="13" rx="10" ry="14" transform="rotate(-45 13 13)" fill="#2E7D32" />
            <ellipse cx="27" cy="13" rx="10" ry="14" transform="rotate(45 27 13)" fill="#8B1A1A" />
            <ellipse cx="13" cy="27" rx="10" ry="14" transform="rotate(45 13 27)" fill="#1565C0" />
            <ellipse cx="27" cy="27" rx="10" ry="14" transform="rotate(-45 27 27)" fill="#D4A017" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: -100, left: -60, opacity: 0.04, pointerEvents: 'none' }}>
          <svg width="400" height="400" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="13" cy="13" rx="10" ry="14" transform="rotate(-45 13 13)" fill="#2E7D32" />
            <ellipse cx="27" cy="13" rx="10" ry="14" transform="rotate(45 27 13)" fill="#8B1A1A" />
            <ellipse cx="13" cy="27" rx="10" ry="14" transform="rotate(45 13 27)" fill="#1565C0" />
            <ellipse cx="27" cy="27" rx="10" ry="14" transform="rotate(-45 27 27)" fill="#D4A017" />
          </svg>
        </div>

        <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div className="animate-fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--gold-pale)',
            border: '1px solid var(--gold)',
            borderRadius: 50,
            padding: '6px 16px',
            marginBottom: 28,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--gold)',
          }}>
            <Heart size={12} fill="currentColor" /> A Community Built with Love
          </div>

          <h1 className="animate-fade-up delay-100" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: 24,
          }}>
            Where Seniors Share<br />
            <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>Skills, Stories</em> &{' '}
            <span style={{ color: 'var(--gold)' }}>Connection</span>
          </h1>

          <p className="animate-fade-up delay-200" style={{
            fontSize: 18,
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: 560,
            margin: '0 auto 16px',
          }}>
            Loneliness is not Emptiness. Emptiness is Loneliness.
          </p>

          <p className="animate-fade-up delay-300" style={{
            fontSize: 15,
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: 500,
            margin: '0 auto 40px',
          }}>
            A warm marketplace where seniors post their services and connect with the world — one listing at a time.
          </p>

          {/* Search */}
          <div className="animate-fade-up delay-400" style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 60,
            display: 'flex',
            alignItems: 'center',
            padding: '8px 8px 8px 24px',
            maxWidth: 540,
            margin: '0 auto 40px',
            boxShadow: '0 4px 24px var(--shadow)',
          }}>
            <Search size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search services, hobbies, skills..."
              style={{
                flex: 1, border: 'none', background: 'transparent',
                padding: '10px 16px', fontSize: 15,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
              }}
            />
            <Link href={`/marketplace?q=${searchQuery}`} style={{
              background: 'var(--green)', color: '#fff',
              padding: '12px 24px', borderRadius: 50,
              textDecoration: 'none', fontSize: 14, fontWeight: 600,
              whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6,
              transition: 'opacity 0.2s',
            }}>
              Search <ArrowRight size={14} />
            </Link>
          </div>

          {/* CTAs */}
          <div className="animate-fade-up delay-500" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/marketplace" style={{
              padding: '14px 28px', borderRadius: 50,
              background: 'var(--blue)', color: '#fff',
              textDecoration: 'none', fontWeight: 600, fontSize: 15,
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.2s',
            }} className="cta-primary">
              <ShoppingBag size={16} /> Browse Listings
            </Link>
            <Link href="/signup" style={{
              padding: '14px 28px', borderRadius: 50,
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              textDecoration: 'none', fontWeight: 600, fontSize: 15,
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.2s',
              background: 'var(--bg-card)',
            }} className="cta-secondary">
              Post Your Listing <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: 'var(--green)', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
          {[
            { number: '2,400+', label: 'Active Seniors', icon: '👴' },
            { number: '8,900+', label: 'Listings Posted', icon: '📋' },
            { number: '15,000+', label: 'Connections Made', icon: '🤝' },
            { number: '12', label: 'Cities & Growing', icon: '🏙️' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{stat.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{stat.number}</div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '80px 24px 0', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Explore by Category</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-1px' }}>What Can You Find?</h2>
          </div>
          <Link href="/marketplace" style={{ color: 'var(--blue)', textDecoration: 'none', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
            View all <ChevronRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
          {categories.map((cat, i) => {
            const colorStyle = {
              green: { bg: 'var(--green-pale)', border: 'var(--green)', text: 'var(--green)' },
              red: { bg: 'var(--red-pale)', border: 'var(--red)', text: 'var(--red)' },
              blue: { bg: 'var(--blue-pale)', border: 'var(--blue)', text: 'var(--blue)' },
              gold: { bg: 'var(--gold-pale)', border: 'var(--gold)', text: 'var(--gold)' },
            }[cat.color];
            return (
              <Link
                key={cat.name}
                href={`/marketplace?cat=${cat.name}`}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 8, padding: '16px 22px',
                  background: colorStyle.bg, border: `1px solid ${colorStyle.border}20`,
                  borderRadius: 16, textDecoration: 'none', whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
                className="cat-card"
              >
                <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: colorStyle.text }}>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>⭐ Handpicked</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-1px' }}>Featured Listings</h2>
          </div>
          <Link href="/marketplace" style={{ color: 'var(--blue)', textDecoration: 'none', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
            See all listings <ChevronRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {featured.map(listing => (
            <ListingCard key={listing.id} {...listing} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: 'var(--bg-subtle)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Simple & Safe</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-1px' }}>How RestComm Works</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
            {[
              { step: '01', icon: '📝', title: 'Create Your Profile', desc: 'Sign up free and tell us a little about yourself and what you love to do.', color: 'var(--green)' },
              { step: '02', icon: '📸', title: 'Post Your Listing', desc: 'Upload a photo and write a short description of your service or product.', color: 'var(--blue)' },
              { step: '03', icon: '💬', title: 'Get Contacted via WhatsApp', desc: 'Interested people WhatsApp you directly to discuss and arrange details.', color: 'var(--gold)' },
              { step: '04', icon: '🤝', title: 'Make New Friends', desc: 'Beyond transactions — build real connections with your community.', color: 'var(--red)' },
            ].map(item => (
              <div key={item.step} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 20, padding: 28,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, color: item.color, opacity: 0.08 }}>
                  {item.step}
                </div>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION QUOTE */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: 60, height: 4, background: 'var(--gold)', margin: '0 auto 32px', borderRadius: 2 }} />
          <blockquote style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 4vw, 38px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--text-primary)',
            lineHeight: 1.4,
            marginBottom: 24,
            letterSpacing: '-0.5px',
          }}>
            "Loneliness is not Emptiness.<br />Emptiness is Loneliness."
          </blockquote>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>
            We believe every senior has something beautiful to offer. RestComm is the bridge between that gift and the world waiting to receive it.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--red)',
            color: '#fff', padding: '16px 32px', borderRadius: 50,
            textDecoration: 'none', fontWeight: 700, fontSize: 16,
            transition: 'all 0.2s',
          }} className="cta-primary">
            <Users size={18} /> Join the Community
          </Link>
        </div>
      </section>

      {/* RECENT LISTINGS */}
      <section style={{ background: 'var(--bg-subtle)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Just Added</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-1px' }}>Recent Listings</h2>
            </div>
            <Link href="/marketplace" style={{ color: 'var(--blue)', textDecoration: 'none', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {listings.slice(3, 7).map(listing => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .cta-primary:hover { opacity: 0.88; transform: translateY(-2px); }
        .cta-secondary:hover { background: var(--bg-subtle) !important; transform: translateY(-2px); }
        .cat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px var(--shadow); }
      `}</style>
    </div>
  );
}
