'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EMAIL_TEMPLATES } from '@/lib/email-templates-simple';

export default function NewBroadcastPage() {
  const [step, setStep] = useState<'details' | 'content' | 'preview'>('details');
  const [audiences, setAudiences] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    htmlContent: '',
    textContent: '',
    audienceId: '',
    fromDomain: 'm.networkleveragingcashflow.com',
    fromName: 'Network Leveraging Cash Flow',
    scheduledFor: '',
    sendNow: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAudiences();
  }, []);

  const fetchAudiences = async () => {
    try {
      const response = await fetch('/api/crm/audiences');
      const data = await response.json();
      setAudiences(data.audiences || []);
    } catch (err) {
      console.error('Failed to fetch audiences:', err);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setFormData(prev => ({
        ...prev,
        subject: template.subject,
        htmlContent: template.html,
      }));
      setStep('content');
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.subject || !formData.htmlContent || !formData.audienceId) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/crm/broadcasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/crm/broadcasts';
        }, 2000);
      } else {
        setError(data.error || 'Failed to create broadcast');
      }
    } catch (err) {
      setError('Failed to create broadcast');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e5e5e5',
        padding: '16px 20px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/crm/broadcasts" style={{ color: '#1E8E5A', textDecoration: 'none', fontSize: '20px' }}>
            ←
          </Link>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#333' }}>
            Create Broadcast
          </h1>
        </div>
      </header>

      {/* Steps */}
      <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {['details', 'content', 'preview'].map((s, i) => (
            <div key={s} style={{
              flex: 1,
              padding: '10px 16px',
              background: step === s ? '#1E8E5A' : 'white',
              color: step === s ? 'white' : '#666',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              textAlign: 'center',
              border: '1px solid #e5e5e5',
            }}>
              {i + 1}. {s.charAt(0).toUpperCase() + s.slice(1)}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: 'white', borderRadius: '10px', padding: '24px', border: '1px solid #e5e5e5' }}>
          {step === 'details' && (
            <div>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#333' }}>Broadcast Details</h2>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                  Campaign Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Weekly Newsletter - May 2026"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '13px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                  Audience *
                </label>
                <select
                  value={formData.audienceId}
                  onChange={(e) => setFormData({ ...formData, audienceId: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '13px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select audience...</option>
                  {audiences.map(aud => (
                    <option key={aud.id} value={aud.id}>{aud.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                    From Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fromName}
                    onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '13px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                    From Domain *
                  </label>
                  <select
                    value={formData.fromDomain}
                    onChange={(e) => setFormData({ ...formData, fromDomain: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '13px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="m.networkleveragingcashflow.com">m.networkleveragingcashflow.com</option>
                    <option value="m.cashflowvisionaries.com">m.cashflowvisionaries.com</option>
                    <option value="m.cashflowvisionary.com">m.cashflowvisionary.com</option>
                    <option value="m.citizenactivation.com">m.citizenactivation.com</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e5e5e5' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#333' }}>Start from a Template (Optional)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                  {EMAIL_TEMPLATES.map(template => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.id)}
                      style={{
                        padding: '12px',
                        background: '#f9f9f9',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      <div style={{ fontWeight: '600', color: '#1E8E5A', marginBottom: '4px' }}>{template.name}</div>
                      <div style={{ fontSize: '11px', color: '#666' }}>{template.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep('content')}
                disabled={!formData.name || !formData.audienceId}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  background: formData.name && formData.audienceId ? '#1E8E5A' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: formData.name && formData.audienceId ? 'pointer' : 'not-allowed',
                }}
              >
                Next: Email Content →
              </button>
            </div>
          )}

          {step === 'content' && (
            <div>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#333' }}>Email Content</h2>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                  Subject Line *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Enter email subject..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '13px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                  HTML Content *
                </label>
                <textarea
                  value={formData.htmlContent}
                  onChange={(e) => setFormData({ ...formData, htmlContent: e.target.value })}
                  placeholder="Paste or write your HTML email content..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '13px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                    minHeight: '300px',
                    fontFamily: 'monospace',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setStep('details')}
                  style={{
                    padding: '10px 20px',
                    background: 'white',
                    color: '#333',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep('preview')}
                  disabled={!formData.subject || !formData.htmlContent}
                  style={{
                    padding: '10px 20px',
                    background: formData.subject && formData.htmlContent ? '#1E8E5A' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: formData.subject && formData.htmlContent ? 'pointer' : 'not-allowed',
                  }}
                >
                  Next: Preview & Send →
                </button>
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#333' }}>Preview & Send</h2>
              
              {/* Email Preview */}
              <div style={{
                background: '#f9f9f9',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '20px',
              }}>
                <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #ddd' }}>
                  <div style={{ fontSize: '11px', color: '#666', marginBottom: '4px' }}>From</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>
                    {formData.fromName} &lt;hello@{formData.fromDomain}&gt;
                  </div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#666', marginBottom: '4px' }}>Subject</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E8E5A' }}>
                    {formData.subject}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>Email Preview</div>
                  <iframe
                    srcDoc={formData.htmlContent}
                    style={{
                      width: '100%',
                      height: '400px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                    }}
                    sandbox="allow-same-origin"
                    title="Email Preview"
                  />
                </div>
              </div>

              {/* Send Options */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  background: '#fff7e6',
                  border: '1px solid #C9A441',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}>
                  <input
                    type="checkbox"
                    checked={formData.sendNow}
                    onChange={(e) => setFormData({ ...formData, sendNow: e.target.checked })}
                  />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#C9A441' }}>
                    Send immediately to all contacts in selected audience
                  </span>
                </label>
              </div>

              {error && (
                <div style={{
                  padding: '12px',
                  background: '#fee',
                  color: '#c33',
                  fontSize: '13px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                }}>
                  {error}
                </div>
              )}

              {success && (
                <div style={{
                  padding: '12px',
                  background: '#e8f5e9',
                  color: '#166B44',
                  fontSize: '13px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                }}>
                  ✓ Broadcast created successfully! Redirecting...
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setStep('content')}
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    background: 'white',
                    color: '#333',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    background: loading ? '#ccc' : '#1E8E5A',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? 'Creating...' : formData.sendNow ? '🚀 Create & Send Now' : '💾 Save as Draft'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
