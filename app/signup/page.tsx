'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PetalLogo } from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, Sun, Moon, User, Phone, Lock, Calendar, CheckCircle2 } from 'lucide-react';

type Step = 1 | 2 | 3;

export default function SignupPage() {
  const { theme, toggle } = useTheme();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({ name: '', phone: '', age: '', password: '', confirm: '', role: 'senior' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: string, val: string) => setForm(f => ({ ...f, [field]: val }));

  const handleNext = () => { if (step < 3) setStep((step + 1) as Step); };
  const handleBack = () => { if (step > 1) setStep((step - 1) as Step); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setStep(3);
  };

  const steps = ['Personal Info', 'Account Setup', 'Done!'];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <PetalLogo size={28} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            Silver<span style={{ color: 'var(--gold)' }}>Circle</span>
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>Already a member? <Link href="/login" style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'none' }}>Log in</Link></span>
          <button onClick={toggle} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 50, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: 520 }}>
          {/* Progress */}
          {step !== 3 && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                {steps.map((s, i) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: i + 1 <= step ? 'var(--green)' : 'var(--bg-subtle)',
                      border: `2px solid ${i + 1 <= step ? 'var(--green)' : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700,
                      color: i + 1 <= step ? '#fff' : 'var(--text-muted)',
                      transition: 'all 0.3s',
                    }}>
                      {i + 1 < step ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: i + 1 === step ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s}</span>
                    {i < steps.length - 1 && <div style={{ width: 40, height: 1, background: i + 1 < step ? 'var(--green)' : 'var(--border)', transition: 'background 0.3s', marginLeft: 4, display: step > 2 ? 'none' : 'block' }} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.5px' }}>Join RestComm</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 36 }}>Tell us a bit about yourself.</p>

              {/* Role selection */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>I am joining as...</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { val: 'senior', emoji: '👴', label: 'A Senior', desc: 'Post my services & products' },
                    { val: 'public', emoji: '👥', label: 'General Public', desc: 'Browse and hire seniors' },
                  ].map(r => (
                    <button key={r.val} type="button" onClick={() => update('role', r.val)} style={{
                      padding: '18px 16px',
                      border: `2px solid ${form.role === r.val ? 'var(--green)' : 'var(--border)'}`,
                      borderRadius: 14, background: form.role === r.val ? 'var(--green-pale)' : 'var(--bg-card)',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                    }}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{r.emoji}</div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{r.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <InputField label="Full Name" icon={<User size={16} color="var(--text-muted)" />} type="text" value={form.name} onChange={v => update('name', v)} placeholder="Margaret Tan" required />
              <div style={{ marginTop: 16 }}>
                <InputField label="Phone Number (for WhatsApp)" icon={<Phone size={16} color="var(--text-muted)" />} type="tel" value={form.phone} onChange={v => update('phone', v)} placeholder="+60 12-345 6789" required />
              </div>
              {form.role === 'senior' && (
                <div style={{ marginTop: 16 }}>
                  <InputField label="Your Age" icon={<Calendar size={16} color="var(--text-muted)" />} type="number" value={form.age} onChange={v => update('age', v)} placeholder="e.g. 68" required />
                </div>
              )}

              <button onClick={handleNext} style={{ width: '100%', marginTop: 28, padding: '16px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s' }}>
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="animate-fade-in">
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.5px' }}>Set Up Your Account</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 36 }}>Create a secure password for your account.</p>

              <InputField label="Password" icon={<Lock size={16} color="var(--text-muted)" />} type={showPw ? 'text' : 'password'} value={form.password} onChange={v => update('password', v)} placeholder="At least 8 characters" required
                rightEl={<button type="button" onClick={() => setShowPw(!showPw)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>}
              />
              <div style={{ marginTop: 16 }}>
                <InputField label="Confirm Password" icon={<Lock size={16} color="var(--text-muted)" />} type="password" value={form.confirm} onChange={v => update('confirm', v)} placeholder="Re-enter your password" required />
              </div>

              {/* Password strength */}
              {form.password && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: form.password.length >= 12 ? '100%' : form.password.length >= 8 ? '60%' : '30%', background: form.password.length >= 12 ? 'var(--green)' : form.password.length >= 8 ? 'var(--gold)' : 'var(--red)', transition: 'all 0.3s', borderRadius: 2 }} />
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{form.password.length >= 12 ? 'Strong password ✓' : form.password.length >= 8 ? 'Moderate password' : 'Weak — add more characters'}</p>
                </div>
              )}

              {/* T&C */}
              <div style={{ marginTop: 20, padding: '16px', background: 'var(--green-pale)', border: '1px solid var(--green)20', borderRadius: 12 }}>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  By signing up you agree to our <Link href="#" style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</Link> and{' '}
                  <Link href="#" style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>. Your phone number will only be shared when a buyer contacts you.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, marginTop: 28 }}>
                <button type="button" onClick={handleBack} style={{ padding: '16px', background: 'var(--bg-subtle)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                  ← Back
                </button>
                <button type="submit" disabled={loading} style={{ padding: '16px', background: loading ? 'var(--text-muted)' : 'var(--green)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {loading ? <><div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Creating account...</> : 'Create My Account 🎉'}
                </button>
              </div>
            </form>
          )}

          {/* Step 3 — Success */}
          {step === 3 && (
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: 80, height: 80, background: 'var(--green-pale)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <CheckCircle2 size={40} color="var(--green)" />
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Welcome, {form.name || 'Friend'}!</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7, maxWidth: 380, margin: '0 auto 32px' }}>
                You're now part of the RestComm community. {form.role === 'senior' ? 'Start by posting your first listing!' : 'Start browsing amazing listings from our seniors!'}
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/marketplace" style={{ padding: '14px 28px', background: 'var(--green)', color: '#fff', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
                  {form.role === 'senior' ? 'Post a Listing' : 'Browse Listings'}
                </Link>
                <Link href="/" style={{ padding: '14px 28px', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 15, background: 'var(--bg-card)' }}>
                  Go to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .auth-input:focus { border-color: var(--green) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function InputField({ label, icon, type, value, onChange, placeholder, required, rightEl }: { label: string; icon: React.ReactNode; type: string; value: string; onChange: (v: string) => void; placeholder: string; required?: boolean; rightEl?: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}>{icon}</div>
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
          style={{ width: '100%', padding: '14px 44px 14px 44px', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s' }}
          className="auth-input"
        />
        {rightEl && <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>{rightEl}</div>}
      </div>
    </div>
  );
}
