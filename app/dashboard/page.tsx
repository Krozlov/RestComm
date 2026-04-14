'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { listings } from '../data/listings';
import { Plus, Eye, Edit3, Trash2, MessageCircle, TrendingUp, Users, Star, Bell, Settings, LogOut, ChevronRight } from 'lucide-react';

const mockUser = {
  name: 'Margaret Tan',
  age: 68,
  location: 'Petaling Jaya, KL',
  whatsapp: '60123456789',
  emoji: '🌿',
  joined: 'March 2024',
  myListings: [1, 5],
};

const statCards = [
  { icon: <Eye size={20} color="var(--blue)" />, label: 'Listing Views', value: '1,284', delta: '+18% this week', bg: 'var(--blue-pale)' },
  { icon: <MessageCircle size={20} color="#25D366" />, label: 'WhatsApp Taps', value: '47', delta: '+6 this week', bg: 'var(--green-pale)' },
  { icon: <Star size={20} color="var(--gold)" />, label: 'Avg. Rating', value: '4.9', delta: 'From 34 reviews', bg: 'var(--gold-pale)' },
  { icon: <Users size={20} color="var(--red)" />, label: 'Profile Visits', value: '312', delta: '+22 this week', bg: 'var(--red-pale)' },
];

const notifications = [
  { icon: '💬', text: 'Priya L. sent you a WhatsApp about your Pet Sitting listing', time: '2h ago', unread: true },
  { icon: '⭐', text: 'James T. left you a 5-star review!', time: '1d ago', unread: true },
  { icon: '✅', text: 'Your listing "Expert Pet Sitting" was approved', time: '3d ago', unread: false },
  { icon: '🎉', text: 'You\'ve reached 30+ reviews! Badge unlocked.', time: '1w ago', unread: false },
];

type Tab = 'overview' | 'listings' | 'notifications' | 'settings';

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('overview');
  const myListings = listings.filter(l => mockUser.myListings.includes(l.id));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        {/* Welcome header */}
        <div style={{ background: 'var(--green)', borderRadius: 24, padding: '32px 36px', marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -40, top: -40, fontSize: 160, opacity: 0.08, pointerEvents: 'none' }}>🌿</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>
                {mockUser.emoji}
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 2 }}>Good morning 👋</p>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
                  {mockUser.name}
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 2 }}>
                  {mockUser.location} · Member since {mockUser.joined}
                </p>
              </div>
            </div>
            <Link href="/post-listing" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', color: 'var(--green)', padding: '13px 24px', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 14, transition: 'all 0.2s', flexShrink: 0 }}
              className="post-btn">
              <Plus size={16} /> Post New Listing
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-subtle)', borderRadius: 14, padding: 4, marginBottom: 32, width: 'fit-content' }}>
          {(['overview', 'listings', 'notifications', 'settings'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                background: tab === t ? 'var(--bg-card)' : 'transparent',
                color: tab === t ? 'var(--text-primary)' : 'var(--text-muted)',
                boxShadow: tab === t ? '0 2px 8px var(--shadow)' : 'none',
                transition: 'all 0.2s', textTransform: 'capitalize',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              {t === 'notifications' ? (
                <><Bell size={14} />{t} <span style={{ background: 'var(--red)', color: '#fff', borderRadius: 50, padding: '0 6px', fontSize: 10, fontWeight: 700 }}>2</span></>
              ) : t === 'overview' ? <><TrendingUp size={14} />{t}</> : t === 'listings' ? <><Eye size={14} />{t}</> : <><Settings size={14} />{t}</>}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div className="animate-fade-in">
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
              {statCards.map(card => (
                <div key={card.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 18, padding: '22px 24px' }}>
                  <div style={{ width: 44, height: 44, background: card.bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    {card.icon}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 4 }}>{card.value}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 3 }}>{card.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 500 }}>{card.delta}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 24 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Quick Actions</h3>
                {[
                  { icon: <Plus size={16} />, label: 'Post a New Listing', href: '/post-listing', color: 'var(--green)' },
                  { icon: <Eye size={16} />, label: 'View My Profile', href: '/profile/1', color: 'var(--blue)' },
                  { icon: <Settings size={16} />, label: 'Edit Profile Info', href: '#', color: 'var(--gold)' },
                  { icon: <LogOut size={16} />, label: 'Sign Out', href: '/', color: 'var(--red)' },
                ].map(action => (
                  <Link key={action.label} href={action.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--border)', textDecoration: 'none', transition: 'all 0.2s' }} className="quick-action">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${action.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: action.color }}>
                      {action.icon}
                    </div>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{action.label}</span>
                    <ChevronRight size={14} color="var(--text-muted)" />
                  </Link>
                ))}
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 24 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Recent Activity</h3>
                {notifications.slice(0, 3).map((n, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{n.icon}</span>
                    <div>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{n.text}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LISTINGS TAB */}
        {tab === 'listings' && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>My Listings ({myListings.length})</h2>
              <Link href="/post-listing" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--green)', color: '#fff', padding: '11px 20px', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
                <Plus size={15} /> New Listing
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {myListings.map(listing => (
                <div key={listing.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 18, padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 14, background: `var(--${listing.color}-pale)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0 }}>
                    {listing.imageEmoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 4 }}>{listing.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>{listing.category} · {listing.location}</p>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <span style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>👁 {Math.floor(Math.random() * 500 + 200)} views</span>
                      <span style={{ fontSize: 12, color: '#25D366', fontWeight: 600 }}>💬 {Math.floor(Math.random() * 20 + 5)} taps</span>
                      {listing.featured && <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>⭐ Featured</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                    <button style={{ padding: '9px 16px', border: '1px solid var(--border)', background: 'var(--bg-subtle)', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Edit3 size={13} /> Edit
                    </button>
                    <button style={{ padding: '9px 14px', border: '1px solid var(--red)30', background: 'var(--red-pale)', borderRadius: 10, cursor: 'pointer', color: 'var(--red)' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {myListings.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 24px', background: 'var(--bg-subtle)', borderRadius: 20, border: '1px dashed var(--border)' }}>
                <div style={{ fontSize: 56, marginBottom: 14 }}>📋</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)', marginBottom: 8 }}>No listings yet</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>Share your first skill or service with the community!</p>
                <Link href="/post-listing" style={{ padding: '13px 28px', background: 'var(--green)', color: '#fff', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
                  Post Your First Listing
                </Link>
              </div>
            )}
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {tab === 'notifications' && (
          <div className="animate-fade-in">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>Notifications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {notifications.map((n, i) => (
                <div key={i} style={{ background: n.unread ? 'var(--blue-pale)' : 'var(--bg-card)', border: `1px solid ${n.unread ? 'var(--blue)30' : 'var(--border)'}`, borderRadius: 16, padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0, marginTop: 6 }} />}
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: n.unread ? 600 : 400 }}>{n.text}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === 'settings' && (
          <div className="animate-fade-in">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>Account Settings</h2>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
              {[
                { label: 'Full Name', value: mockUser.name, type: 'text' },
                { label: 'Age', value: String(mockUser.age), type: 'number' },
                { label: 'Location', value: mockUser.location, type: 'text' },
                { label: 'WhatsApp Number', value: '+' + mockUser.whatsapp, type: 'tel' },
              ].map((field, i) => (
                <div key={field.label} style={{ padding: '20px 24px', borderBottom: i < 3 ? '1px solid var(--border)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>{field.label}</div>
                    <div style={{ fontSize: 15, color: 'var(--text-primary)', fontWeight: 500 }}>{field.value}</div>
                  </div>
                  <button style={{ padding: '9px 18px', border: '1px solid var(--border)', background: 'var(--bg-subtle)', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Edit3 size={12} /> Edit
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24, background: 'var(--red-pale)', border: '1px solid var(--red)20', borderRadius: 20, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--red)', marginBottom: 4 }}>Delete Account</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>This will permanently remove your profile and all listings.</div>
              </div>
              <button style={{ padding: '10px 20px', border: '1px solid var(--red)', background: 'transparent', borderRadius: 10, cursor: 'pointer', color: 'var(--red)', fontWeight: 600, fontSize: 13 }}>
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <style>{`
        .post-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .quick-action:last-child { border-bottom: none !important; }
        .quick-action:hover span { color: var(--text-primary) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
