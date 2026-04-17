'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PetalLogo } from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, Sun, Moon, User, Phone, Lock, Calendar, CheckCircle2, CreditCard, ShieldCheck, Star, Sparkles } from 'lucide-react';

type Step = 1 | 2 | 3 | 4;

export default function SignupPage() {
  const { theme, toggle } = useTheme();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    name: '', phone: '', age: '', password: '', confirm: '', role: 'senior',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  const update = (field: string, val: string) => setForm(f => ({ ...f, [field]: val }));

  const handleBack = () => { if (step > 1) setStep((step - 1) as Step); };

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    // Seniors go to payment step, public go straight to done
    if (form.role === 'senior') {
      setStep(3);
    } else {
      setStep(4);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setPayLoading(false);
    setStep(4);
  };

  const formatCard = (val: string) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val: string) => val.replace(/\D/g, '').slice(0, 4).replace(/(.{2})(.+)/, '$1/$2');

  // Step labels differ by role
  const isSenior = form.role === 'senior';
  const stepLabels = isSenior
    ? ['Personal Info', 'Account Setup', 'Membership', 'Done!']
    : ['Personal Info', 'Account Setup', 'Done!'];

  const totalSteps = isSenior ? 3 : 2; // excluding done screen

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <PetalLogo size={28} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            Rest<span style={{ color: 'var(--gold)' }}>Comm</span>
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            Already a member?{' '}
            <Link href="/login" style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
          </span>
          <button onClick={toggle} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 50, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: 520 }}>

          {/* Progress stepper */}
          {step !== 4 && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
                {(isSenior ? ['Personal Info', 'Account Setup', 'Membership'] : ['Personal Info', 'Account Setup']).map((label, i) => {
                  const stepNum = i + 1;
                  const currentStep = step as number;
                  const isDone = stepNum < currentStep;
                  const isActive = stepNum === currentStep;
                  return (
                    <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: isDone ? 'var(--green)' : isActive ? 'var(--blue)' : 'var(--bg-subtle)',
                          border: `2px solid ${isDone ? 'var(--green)' : isActive ? 'var(--blue)' : 'var(--border)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 13, fontWeight: 800,
                          color: (isDone || isActive) ? '#fff' : 'var(--text-muted)',
                          transition: 'all 0.35s',
                        }}>
                          {isDone ? '✓' : stepNum}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: isActive ? 'var(--text-primary)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          {label}
                        </span>
                      </div>
                      {i < (isSenior ? 2 : 1) && (
                        <div style={{ width: 60, height: 2, background: isDone ? 'var(--green)' : 'var(--border)', margin: '0 8px', marginBottom: 18, transition: 'background 0.35s', flexShrink: 0 }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 1: Personal Info ── */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.5px' }}>
                Join RestComm
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 32 }}>Tell us a bit about yourself.</p>

              {/* Role selection */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>I am joining as...</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    {
                      val: 'senior',
                      emoji: '👴',
                      label: 'A Senior',
                      desc: 'Post services & products',
                      badge: 'S$48 / year',
                      badgeColor: 'var(--gold)',
                      badgeBg: 'var(--gold-pale)',
                    },
                    {
                      val: 'public',
                      emoji: '👥',
                      label: 'General Public',
                      desc: 'Browse & connect with seniors',
                      badge: 'Always Free',
                      badgeColor: 'var(--green)',
                      badgeBg: 'var(--green-pale)',
                    },
                  ].map(r => (
                    <button
                      key={r.val}
                      type="button"
                      onClick={() => update('role', r.val)}
                      style={{
                        padding: '18px 16px',
                        border: `2px solid ${form.role === r.val ? (r.val === 'senior' ? 'var(--gold)' : 'var(--green)') : 'var(--border)'}`,
                        borderRadius: 16,
                        background: form.role === r.val ? (r.val === 'senior' ? 'var(--gold-pale)' : 'var(--green-pale)') : 'var(--bg-card)',
                        cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                        position: 'relative',
                      }}
                    >
                      <div style={{ fontSize: 30, marginBottom: 8 }}>{r.emoji}</div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 3 }}>{r.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>{r.desc}</div>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        background: r.badgeBg, color: r.badgeColor,
                        padding: '3px 8px', borderRadius: 50,
                        fontSize: 11, fontWeight: 700,
                      }}>
                        {r.val === 'senior' ? <CreditCard size={9} /> : <Star size={9} fill="currentColor" />}
                        {r.badge}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Membership info blurb shown when senior is selected */}
                {form.role === 'senior' && (
                  <div className="animate-fade-in" style={{ marginTop: 12, padding: '12px 16px', background: 'var(--gold-pale)', border: '1px solid var(--gold)40', borderRadius: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Sparkles size={15} color="var(--gold)" style={{ flexShrink: 0, marginTop: 1 }} />
                    <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      Senior membership is <strong style={{ color: 'var(--text-primary)' }}>S$48/year</strong> — that's just S$4/month. Includes unlimited listings, a verified profile badge, and priority community support. You'll be billed after creating your account.
                    </p>
                  </div>
                )}
              </div>

              <InputField label="Full Name" icon={<User size={16} color="var(--text-muted)" />} type="text" value={form.name} onChange={v => update('name', v)} placeholder="e.g. Margaret Tan" required />
              <div style={{ marginTop: 16 }}>
                <InputField label="Phone Number (WhatsApp)" icon={<Phone size={16} color="var(--text-muted)" />} type="tel" value={form.phone} onChange={v => update('phone', v)} placeholder="+65 9123 4567" required />
              </div>
              {form.role === 'senior' && (
                <div style={{ marginTop: 16 }}>
                  <InputField label="Your Age" icon={<Calendar size={16} color="var(--text-muted)" />} type="number" value={form.age} onChange={v => update('age', v)} placeholder="e.g. 68" required />
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!(form.name && form.phone && (form.role === 'public' || form.age))}
                style={{
                  width: '100%', marginTop: 28, padding: '16px',
                  background: (form.name && form.phone && (form.role === 'public' || form.age)) ? 'var(--green)' : 'var(--bg-subtle)',
                  color: (form.name && form.phone && (form.role === 'public' || form.age)) ? '#fff' : 'var(--text-muted)',
                  border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700,
                  cursor: (form.name && form.phone && (form.role === 'public' || form.age)) ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {/* ── STEP 2: Account Setup ── */}
          {step === 2 && (
            <form onSubmit={handleAccountSubmit} className="animate-fade-in">
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.5px' }}>
                Set Up Your Account
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 32 }}>
                Create a secure password for your RestComm account.
              </p>

              <InputField
                label="Password"
                icon={<Lock size={16} color="var(--text-muted)" />}
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={v => update('password', v)}
                placeholder="At least 8 characters"
                required
                rightEl={
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />

              <div style={{ marginTop: 16 }}>
                <InputField label="Confirm Password" icon={<Lock size={16} color="var(--text-muted)" />} type="password" value={form.confirm} onChange={v => update('confirm', v)} placeholder="Re-enter your password" required />
              </div>

              {/* Password strength bar */}
              {form.password && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: form.password.length >= 12 ? '100%' : form.password.length >= 8 ? '60%' : '30%',
                      background: form.password.length >= 12 ? 'var(--green)' : form.password.length >= 8 ? 'var(--gold)' : 'var(--red)',
                      transition: 'all 0.3s', borderRadius: 2,
                    }} />
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                    {form.password.length >= 12 ? '✓ Strong password' : form.password.length >= 8 ? 'Moderate — add more characters' : 'Weak — too short'}
                  </p>
                </div>
              )}

              {/* Terms */}
              <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--green-pale)', border: '1px solid var(--green)20', borderRadius: 12 }}>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  By continuing you agree to our{' '}
                  <Link href="#" style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</Link>{' '}
                  and{' '}
                  <Link href="#" style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>.
                  {form.role === 'senior' && ' Your membership will be charged S$48 annually.'}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, marginTop: 24 }}>
                <button type="button" onClick={handleBack} style={{ padding: '16px', background: 'var(--bg-subtle)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !(form.password && form.confirm)}
                  style={{
                    padding: '16px',
                    background: loading || !(form.password && form.confirm) ? 'var(--text-muted)' : 'var(--green)',
                    color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                    cursor: loading || !(form.password && form.confirm) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  {loading
                    ? <><LoadingSpinner /> Saving...</>
                    : form.role === 'senior' ? 'Continue to Payment →' : 'Create My Account 🎉'
                  }
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 3: Membership Payment (Seniors only) ── */}
          {step === 3 && (
            <form onSubmit={handlePayment} className="animate-fade-in">
              {/* Membership summary card */}
              <div style={{ background: 'linear-gradient(135deg, #D4A017 0%, #A67C00 100%)', borderRadius: 20, padding: '24px 28px', marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ position: 'absolute', right: 20, bottom: -30, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Image src="/logo.png" alt="RestComm" width={28} height={28} style={{ objectFit: 'contain' }} />
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}>RESTCOMM SENIOR MEMBERSHIP</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, color: '#fff', lineHeight: 1 }}>S$48</span>
                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginBottom: 6 }}>/year</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Just S$4/month · Billed annually · Cancel anytime</p>
                  <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {['Unlimited listings', 'Verified badge', 'Priority support', 'Community access'].map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 600 }}>
                        <CheckCircle2 size={12} /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.3px' }}>
                Payment Details
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
                Your card will be charged S$48.00 today.
              </p>

              {/* Card name */}
              <div style={{ marginBottom: 16 }}>
                <InputField
                  label="Name on Card"
                  icon={<User size={16} color="var(--text-muted)" />}
                  type="text"
                  value={form.cardName}
                  onChange={v => update('cardName', v)}
                  placeholder="Margaret Tan"
                  required
                />
              </div>

              {/* Card number */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Card Number</label>
                <div style={{ position: 'relative' }}>
                  <CreditCard size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.cardNumber}
                    onChange={e => update('cardNumber', formatCard(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    style={{ width: '100%', padding: '14px 120px 14px 44px', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, color: 'var(--text-primary)', fontFamily: 'monospace', letterSpacing: 1, transition: 'border-color 0.2s' }}
                    className="auth-input"
                  />
                  {/* Card type icons */}
                  <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 4 }}>
                    {['VISA', 'MC'].map(card => (
                      <span key={card} style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '2px 5px', borderRadius: 4, letterSpacing: 0.5 }}>
                        {card}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expiry + CVC */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Expiry Date</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.cardExpiry}
                    onChange={e => update('cardExpiry', formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                    style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, color: 'var(--text-primary)', fontFamily: 'monospace', transition: 'border-color 0.2s' }}
                    className="auth-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>CVC</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.cardCvc}
                    onChange={e => update('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="123"
                    maxLength={3}
                    required
                    style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, color: 'var(--text-primary)', fontFamily: 'monospace', transition: 'border-color 0.2s' }}
                    className="auth-input"
                  />
                </div>
              </div>

              {/* Security note */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', background: 'var(--bg-subtle)', borderRadius: 10, marginBottom: 20, border: '1px solid var(--border)' }}>
                <ShieldCheck size={15} color="var(--green)" />
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  256-bit SSL encryption. Your card details are never stored on our servers.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                <button type="button" onClick={handleBack} style={{ padding: '16px', background: 'var(--bg-subtle)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={payLoading}
                  style={{
                    padding: '16px', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                    background: payLoading ? 'var(--text-muted)' : 'var(--gold)',
                    color: '#fff',
                    cursor: payLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  {payLoading
                    ? <><LoadingSpinner /> Processing S$48.00...</>
                    : <><CreditCard size={16} /> Pay S$48.00 & Join</>
                  }
                </button>
              </div>

              <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 14 }}>
                You will be billed S$48 annually. Cancel at any time from your dashboard.
              </p>
            </form>
          )}

          {/* ── STEP 4: Success ── */}
          {step === 4 && (
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: 90, height: 90, background: 'var(--green-pale)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '3px solid var(--green)' }}>
                <CheckCircle2 size={44} color="var(--green)" />
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, letterSpacing: '-0.5px' }}>
                Welcome, {form.name.split(' ')[0] || 'Friend'}! 🎉
              </h1>

              {form.role === 'senior' ? (
                <>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--gold-pale)', color: 'var(--gold)', border: '1px solid var(--gold)40', borderRadius: 50, padding: '6px 16px', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
                    <Star size={13} fill="currentColor" /> Senior Member — Active
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7, maxWidth: 400, margin: '0 auto 12px' }}>
                    Your S$48 membership is confirmed. You're now a verified RestComm senior — ready to share your gifts with the world.
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 32 }}>
                    A receipt has been sent to your WhatsApp number.
                  </p>
                </>
              ) : (
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7, maxWidth: 400, margin: '0 auto 32px' }}>
                  You're now part of the RestComm community. Start browsing amazing listings from our seniors!
                </p>
              )}

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href={form.role === 'senior' ? '/post-listing' : '/marketplace'} style={{ padding: '14px 28px', background: 'var(--green)', color: '#fff', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
                  {form.role === 'senior' ? '🚀 Post Your First Listing' : '🔍 Browse Listings'}
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
        .auth-input:focus { border-color: var(--green) !important; background: var(--bg-card) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function InputField({ label, icon, type, value, onChange, placeholder, required, rightEl }: {
  label: string; icon: React.ReactNode; type: string; value: string;
  onChange: (v: string) => void; placeholder: string; required?: boolean; rightEl?: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}>{icon}</div>
        <input
          type={type} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} required={required}
          style={{ width: '100%', padding: '14px 44px 14px 44px', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s' }}
          className="auth-input"
        />
        {rightEl && <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>{rightEl}</div>}
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
  );
}
