'use client';
import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Upload, X, MapPin, MessageCircle, CheckCircle2, ChevronRight, Info, Tag, FileImage, Sparkles } from 'lucide-react';
import { categories } from '../data/listings';

type Step = 1 | 2 | 3 | 4;

const tips = [
  { icon: '📸', text: 'A clear, bright photo gets 3× more responses' },
  { icon: '✍️', text: 'Describe what makes your service unique' },
  { icon: '💬', text: 'Buyers contact you directly via WhatsApp — keep your number ready' },
  { icon: '🏷️', text: 'Pick the most relevant category so people can find you' },
];

export default function PostListingPage() {
  const [step, setStep] = useState<Step>(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    whatsapp: '',
    price: '',
    priceType: 'negotiable',
  });
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setStep(4);
  };

  const stepLabels = ['Photo', 'Details', 'Contact', 'Published!'];
  const canProceed = [
    !!imagePreview,
    !!(form.title && form.category && form.description),
    !!(form.location && form.whatsapp),
    true,
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      {/* Page header */}
      <div style={{ background: 'var(--blue)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, opacity: 0.8, fontSize: 13 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <span>Post a Listing</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 12 }}>
            Share Your Gift with the World
          </h1>
          <p style={{ opacity: 0.82, fontSize: 16, lineHeight: 1.6 }}>
            Your skills and services deserve to be seen. It only takes a few minutes — and it's completely free.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40, alignItems: 'start' }}>

          {/* Main form */}
          <div>
            {/* Step progress */}
            {step < 4 && (
              <div style={{ display: 'flex', gap: 0, marginBottom: 40, background: 'var(--bg-subtle)', borderRadius: 50, padding: 4 }}>
                {stepLabels.slice(0, 3).map((label, i) => {
                  const isActive = i + 1 === step;
                  const isDone = i + 1 < step;
                  return (
                    <div key={label} style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '10px 4px', borderRadius: 50,
                      background: isActive ? 'var(--blue)' : 'transparent',
                      transition: 'all 0.3s',
                    }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: isActive ? '#fff' : isDone ? 'var(--green)' : 'var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 800,
                        color: isActive ? 'var(--blue)' : isDone ? '#fff' : 'var(--text-muted)',
                        flexShrink: 0,
                      }}>
                        {isDone ? '✓' : i + 1}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: isActive ? '#fff' : isDone ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ---- STEP 1: Photo ---- */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                  Add a Photo
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>
                  A picture speaks a thousand words. Show what you're offering!
                </p>

                {/* Drop zone */}
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => !imagePreview && fileRef.current?.click()}
                  style={{
                    border: `2px dashed ${dragOver ? 'var(--blue)' : imagePreview ? 'var(--green)' : 'var(--border)'}`,
                    borderRadius: 20,
                    background: dragOver ? 'var(--blue-pale)' : imagePreview ? 'var(--green-pale)' : 'var(--bg-subtle)',
                    minHeight: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: imagePreview ? 'default' : 'pointer',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 18 }} />
                      <button
                        onClick={e => { e.stopPropagation(); setImagePreview(null); }}
                        style={{
                          position: 'absolute', top: 14, right: 14,
                          background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%',
                          width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', color: '#fff',
                        }}
                      >
                        <X size={16} />
                      </button>
                      <div style={{ position: 'absolute', bottom: 14, left: 14, background: 'rgba(46,125,50,0.9)', color: '#fff', padding: '6px 14px', borderRadius: 50, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CheckCircle2 size={12} /> Photo added
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: 32 }}>
                      <div style={{ width: 72, height: 72, background: 'var(--bg-card)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid var(--border)' }}>
                        <FileImage size={28} color="var(--text-muted)" />
                      </div>
                      <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 6 }}>
                        {dragOver ? 'Drop it here!' : 'Drag & drop or click to upload'}
                      </p>
                      <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>JPG, PNG, WEBP — up to 10MB</p>
                    </div>
                  )}
                </div>

                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

                {!imagePreview && (
                  <button
                    onClick={() => fileRef.current?.click()}
                    style={{ width: '100%', marginTop: 16, padding: '14px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  >
                    <Upload size={16} /> Browse Files
                  </button>
                )}

                <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!imagePreview}
                    style={{
                      padding: '14px 32px', borderRadius: 50,
                      background: imagePreview ? 'var(--blue)' : 'var(--bg-subtle)',
                      color: imagePreview ? '#fff' : 'var(--text-muted)',
                      border: 'none', fontSize: 15, fontWeight: 700,
                      cursor: imagePreview ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8,
                    }}
                  >
                    Next: Add Details <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ---- STEP 2: Details ---- */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                  Describe Your Listing
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>Help people understand what you're offering.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Title */}
                  <FormField label="Listing Title *" hint="Be specific — e.g. 'Homemade Kuih & Traditional Cakes'">
                    <input
                      value={form.title}
                      onChange={e => update('title', e.target.value)}
                      placeholder="What are you offering?"
                      maxLength={80}
                      style={inputStyle}
                      className="form-input"
                    />
                    <div style={{ textAlign: 'right', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{form.title.length}/80</div>
                  </FormField>

                  {/* Category */}
                  <FormField label="Category *" hint="Pick the best fit">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {categories.filter(c => c.name !== 'All').map(cat => {
                        const isSelected = form.category === cat.name;
                        const colorMap = {
                          green: { bg: 'var(--green)', pale: 'var(--green-pale)', border: 'var(--green)' },
                          red: { bg: 'var(--red)', pale: 'var(--red-pale)', border: 'var(--red)' },
                          blue: { bg: 'var(--blue)', pale: 'var(--blue-pale)', border: 'var(--blue)' },
                          gold: { bg: 'var(--gold)', pale: 'var(--gold-pale)', border: 'var(--gold)' },
                        }[cat.color];
                        return (
                          <button
                            key={cat.name}
                            type="button"
                            onClick={() => update('category', cat.name)}
                            style={{
                              padding: '8px 14px', borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                              border: `1.5px solid ${isSelected ? colorMap.bg : 'var(--border)'}`,
                              background: isSelected ? colorMap.pale : 'var(--bg-card)',
                              color: isSelected ? colorMap.bg : 'var(--text-secondary)',
                              transition: 'all 0.18s',
                              display: 'flex', alignItems: 'center', gap: 5,
                            }}
                          >
                            {cat.emoji} {cat.name}
                          </button>
                        );
                      })}
                    </div>
                  </FormField>

                  {/* Description */}
                  <FormField label="Description *" hint="Tell your story — people connect with honesty and warmth">
                    <textarea
                      value={form.description}
                      onChange={e => update('description', e.target.value)}
                      placeholder="Describe your service, your experience, and what makes it special..."
                      rows={5}
                      maxLength={500}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      className="form-input"
                    />
                    <div style={{ textAlign: 'right', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{form.description.length}/500</div>
                  </FormField>

                  {/* Price */}
                  <FormField label="Pricing" hint="Optional — leave blank if you prefer to discuss">
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input
                        value={form.price}
                        onChange={e => update('price', e.target.value)}
                        placeholder="e.g. RM 50"
                        style={{ ...inputStyle, flex: 1 }}
                        className="form-input"
                      />
                      <select
                        value={form.priceType}
                        onChange={e => update('priceType', e.target.value)}
                        style={{ ...inputStyle, width: 'auto', paddingLeft: 12, cursor: 'pointer' }}
                        className="form-input"
                      >
                        <option value="negotiable">Negotiable</option>
                        <option value="fixed">Fixed</option>
                        <option value="per-hour">Per hour</option>
                        <option value="per-day">Per day</option>
                        <option value="free">Free / Volunteer</option>
                      </select>
                    </div>
                  </FormField>
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                  <button onClick={() => setStep(1)} style={{ padding: '14px 24px', borderRadius: 50, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!(form.title && form.category && form.description)}
                    style={{
                      flex: 1, padding: '14px', borderRadius: 50,
                      background: (form.title && form.category && form.description) ? 'var(--blue)' : 'var(--bg-subtle)',
                      color: (form.title && form.category && form.description) ? '#fff' : 'var(--text-muted)',
                      border: 'none', fontSize: 15, fontWeight: 700,
                      cursor: (form.title && form.category && form.description) ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                  >
                    Next: Contact Info <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ---- STEP 3: Contact ---- */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                  Contact & Location
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>
                  Interested buyers will reach out to you directly via WhatsApp.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <FormField label="Your Location *" hint="Area name is enough — e.g. 'Petaling Jaya, KL'">
                    <div style={{ position: 'relative' }}>
                      <MapPin size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                      <input value={form.location} onChange={e => update('location', e.target.value)} placeholder="e.g. Subang Jaya, Selangor" style={{ ...inputStyle, paddingLeft: 44 }} className="form-input" />
                    </div>
                  </FormField>

                  <FormField label="WhatsApp Number *" hint="This is how buyers will contact you">
                    <div style={{ position: 'relative' }}>
                      <MessageCircle size={16} color="#25D366" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                      <input value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} placeholder="+60 12-345 6789" type="tel" style={{ ...inputStyle, paddingLeft: 44 }} className="form-input" />
                    </div>
                  </FormField>
                </div>

                {/* Preview card */}
                {form.title && (
                  <div style={{ marginTop: 28, padding: 20, background: 'var(--bg-subtle)', borderRadius: 16, border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Sparkles size={12} /> Preview
                    </p>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      {imagePreview && <img src={imagePreview} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} alt="" />}
                      <div>
                        <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 15, marginBottom: 4 }}>{form.title}</p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5 }}>{form.description.slice(0, 80)}{form.description.length > 80 ? '...' : ''}</p>
                        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                          {form.category && <span style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 600 }}>📌 {form.category}</span>}
                          {form.location && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>📍 {form.location}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                  <button onClick={() => setStep(2)} style={{ padding: '14px 24px', borderRadius: 50, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
                  <button
                    onClick={handleSubmit}
                    disabled={!(form.location && form.whatsapp) || loading}
                    style={{
                      flex: 1, padding: '14px', borderRadius: 50,
                      background: (form.location && form.whatsapp && !loading) ? 'var(--green)' : 'var(--bg-subtle)',
                      color: (form.location && form.whatsapp && !loading) ? '#fff' : 'var(--text-muted)',
                      border: 'none', fontSize: 15, fontWeight: 700,
                      cursor: (form.location && form.whatsapp && !loading) ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                  >
                    {loading ? <><LoadingSpinner /> Publishing...</> : <>🚀 Publish Listing</>}
                  </button>
                </div>
              </div>
            )}

            {/* ---- STEP 4: Success ---- */}
            {step === 4 && (
              <div className="animate-fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, letterSpacing: '-0.5px' }}>
                  You're Live!
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7, maxWidth: 420, margin: '0 auto 16px' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>"{form.title}"</strong> is now visible to everyone in the SilverCircle community.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 36 }}>
                  When someone is interested, they'll WhatsApp <strong>{form.whatsapp}</strong> directly.
                </p>

                {imagePreview && (
                  <div style={{ maxWidth: 280, margin: '0 auto 36px', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 12px 32px var(--shadow)' }}>
                    <img src={imagePreview} alt="Listing" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '14px 16px', background: 'var(--bg-card)' }}>
                      <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 4 }}>{form.title}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>📍 {form.location}</p>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/marketplace" style={{ padding: '14px 28px', background: 'var(--blue)', color: '#fff', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
                    View in Marketplace
                  </Link>
                  <button onClick={() => { setStep(1); setImagePreview(null); setForm({ title: '', category: '', description: '', location: '', whatsapp: '', price: '', priceType: 'negotiable' }); }}
                    style={{ padding: '14px 28px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', borderRadius: 50, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
                    Post Another
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar tips */}
          {step < 4 && (
            <div style={{ position: 'sticky', top: 90 }}>
              <div style={{ background: 'var(--blue-pale)', border: '1px solid var(--blue)20', borderRadius: 20, padding: 24, marginBottom: 20 }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--blue)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Info size={14} /> Tips for a Great Listing
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {tips.map(tip => (
                    <div key={tip.text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{tip.icon}</span>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold)20', borderRadius: 20, padding: 24 }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--gold)', marginBottom: 8 }}>🔒 Your Safety</p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  Your number is only shared when a buyer chooses to contact you. We never sell your data or share it publicly.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <style>{`
        .form-input:focus { border-color: var(--blue) !important; background: var(--bg-card) !important; }
        @media (max-width: 700px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>{label}</label>
      {hint && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{hint}</p>}
      {children}
    </div>
  );
}

function LoadingSpinner() {
  return <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  background: 'var(--bg-subtle)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  fontSize: 15,
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  transition: 'border-color 0.2s, background 0.2s',
};
