'use client';
import { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';
import { listings, categories } from '../data/listings';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filtered = listings.filter(l => {
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.description.toLowerCase().includes(search.toLowerCase()) || l.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || l.category === activeCategory;
    return matchSearch && matchCat;
  }).sort((a, b) => {
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <div style={{ background: 'var(--green)', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', marginBottom: 16 }}>
            Browse All Listings
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 32 }}>
            Discover skills, services and stories from our wonderful community of seniors.
          </p>

          {/* Search bar */}
          <div style={{ background: '#fff', borderRadius: 60, display: 'flex', alignItems: 'center', padding: '8px 8px 8px 24px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', maxWidth: 520, margin: '0 auto' }}>
            <Search size={18} color="#9C9C98" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search listings..."
              style={{ flex: 1, border: 'none', background: 'transparent', padding: '10px 16px', fontSize: 15, color: '#1A1A18', fontFamily: 'var(--font-body)' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', color: '#9C9C98' }}>
                <X size={16} />
              </button>
            )}
            <button style={{ background: 'var(--green)', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: 50, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        {/* Filters row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(cat => {
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  style={{
                    padding: '8px 16px', borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    border: `1px solid ${isActive ? 'var(--green)' : 'var(--border)'}`,
                    background: isActive ? 'var(--green)' : 'var(--bg-card)',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  {cat.emoji} {cat.name}
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SlidersHorizontal size={16} color="var(--text-muted)" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '8px 12px', fontSize: 13,
                color: 'var(--text-primary)', cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              <option value="featured">Featured First</option>
              <option value="name">Name A-Z</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> listings
          {activeCategory !== 'All' && <span> in <strong style={{ color: 'var(--green)' }}>{activeCategory}</strong></span>}
          {search && <span> matching <strong style={{ color: 'var(--blue)' }}>"{search}"</strong></span>}
        </p>

        {/* Listings grid */}
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {filtered.map(listing => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-primary)', marginBottom: 8 }}>No listings found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Try a different search or category</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} style={{ marginTop: 20, padding: '12px 24px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 50, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
