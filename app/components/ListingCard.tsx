import { MessageCircle, MapPin, Tag } from 'lucide-react';
import Link from 'next/link';

interface ListingCardProps {
  id: number;
  name: string;
  age: number;
  title: string;
  description: string;
  category: string;
  location: string;
  whatsapp: string;
  imageEmoji: string;
  color: 'green' | 'red' | 'blue' | 'gold';
  featured?: boolean;
}

const colorMap = {
  green: { bg: 'var(--green-pale)', accent: 'var(--green)', label: '#2E7D32' },
  red: { bg: 'var(--red-pale)', accent: 'var(--red)', label: '#8B1A1A' },
  blue: { bg: 'var(--blue-pale)', accent: 'var(--blue)', label: '#1565C0' },
  gold: { bg: 'var(--gold-pale)', accent: 'var(--gold)', label: '#D4A017' },
};

export default function ListingCard({ id, name, age, title, description, category, location, whatsapp, imageEmoji, color, featured }: ListingCardProps) {
  const c = colorMap[color];

  return (
    <Link href={`/listing/${id}`} style={{ textDecoration: 'none', display: 'block' }}>
    <div
      className="card-lift"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {featured && (
        <div style={{
          position: 'absolute', top: 14, left: 14, zIndex: 2,
          background: 'var(--gold)', color: '#fff',
          fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
          padding: '4px 10px', borderRadius: 50,
          textTransform: 'uppercase',
        }}>⭐ Featured</div>
      )}

      {/* Image area */}
      <div style={{
        background: c.bg,
        height: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 72,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <span style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>{imageEmoji}</span>
        <div style={{
          position: 'absolute',
          bottom: -20, right: -20,
          width: 80, height: 80,
          borderRadius: '50%',
          background: c.accent,
          opacity: 0.12,
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 22px' }}>
        {/* Category pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <Tag size={11} color={c.label} />
          <span style={{ fontSize: 11, fontWeight: 600, color: c.label, textTransform: 'uppercase', letterSpacing: 0.6 }}>
            {category}
          </span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 18,
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 8,
          lineHeight: 1.3,
        }}>{title}</h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.6, marginBottom: 16 }}>
          {description}
        </p>

        {/* Poster info */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 32, height: 32,
                borderRadius: '50%',
                background: c.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
                color: c.label,
                border: `2px solid ${c.accent}`,
              }}>
                {name[0]}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{name}, {age}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <MapPin size={10} color="var(--text-muted)" />
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{location}</span>
                </div>
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#25D366',
              color: '#fff',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 600,
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            className="whatsapp-btn"
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
        </div>
      </div>

      <style>{`.whatsapp-btn:hover { opacity: 0.88; transform: translateY(-1px); }`}</style>
    </div>
    </Link>
  );
}
