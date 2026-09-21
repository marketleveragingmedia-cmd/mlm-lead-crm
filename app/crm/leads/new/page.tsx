'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddContactPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    source: 'manual-entry'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/crm/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          source: formData.source,
        })
      });

      const data = await response.json();

      if (data.success) {
        router.push('/crm/leads');
      } else {
        setError(data.error || 'Failed to add contact');
      }
    } catch (err) {
      setError('Failed to add contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F6FAF7' }}>
      {/* Header */}
      <header style={{ background: 'white', borderBottom: '1px solid #DCECE2', padding: '16px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/crm/leads" style={{ color: '#1E8E5A', textDecoration: 'none', fontSize: '20px' }}>←</Link>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#063B25' }}>Add New Contact</h1>
        </div>
      </header>

      {/* Form */}
      <main style={{ maxWidth: '800px', margin: '32px auto', padding: '0 20px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #DCECE2' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* First Name */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#063B25', marginBottom: '8px' }}>
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', fontSize: '15px', border: '2px solid #DCECE2', borderRadius: '8px', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#1E8E5A'}
                  onBlur={(e) => e.target.style.borderColor = '#DCECE2'}
                />
              </div>

              {/* Last Name */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#063B25', marginBottom: '8px' }}>
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', fontSize: '15px', border: '2px solid #DCECE2', borderRadius: '8px', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#1E8E5A'}
                  onBlur={(e) => e.target.style.borderColor = '#DCECE2'}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#063B25', marginBottom: '8px' }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', fontSize: '15px', border: '2px solid #DCECE2', borderRadius: '8px', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#1E8E5A'}
                  onBlur={(e) => e.target.style.borderColor = '#DCECE2'}
                />
              </div>

              {/* Phone */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#063B25', marginBottom: '8px' }}>
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  style={{ width: '100%', padding: '10px 14px', fontSize: '15px', border: '2px solid #DCECE2', borderRadius: '8px', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#1E8E5A'}
                  onBlur={(e) => e.target.style.borderColor = '#DCECE2'}
                />
              </div>

              {/* Source */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#063B25', marginBottom: '8px' }}>
                  Source
                </label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', fontSize: '15px', border: '2px solid #DCECE2', borderRadius: '8px', outline: 'none', background: 'white' }}
                >
                  <option value="manual-entry">Manual Entry</option>
                  <option value="imported">Imported</option>
                  <option value="referral">Referral</option>
                  <option value="event">Event</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Error */}
              {error && (
                <div style={{ padding: '12px 16px', background: '#ffebee', color: '#c62828', fontSize: '14px', borderRadius: '8px', border: '1px solid #ffcdd2' }}>
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: loading ? '#5B6E64' : '#1E8E5A',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Adding...' : 'Add Contact'}
                </button>
                <Link
                  href="/crm/leads"
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#f5f5f5',
                    color: '#063B25',
                    border: '1px solid #DCECE2',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '600',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'block'
                  }}
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
