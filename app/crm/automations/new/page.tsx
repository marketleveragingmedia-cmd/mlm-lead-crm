'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AUTOMATION_TEMPLATES } from '@/lib/automation-templates';

export default function NewAutomationPage() {
  const [step, setStep] = useState<'template' | 'config'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [audiences, setAudiences] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    audienceId: '',
    fromDomain: 'm.networkleveragingcashflow.com',
    fromName: 'Network Leveraging Cash Flow',
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const template = AUTOMATION_TEMPLATES.find(t => t.id === selectedTemplate);

  const handleTemplateSelect = (templateId: string) => {
    const t = AUTOMATION_TEMPLATES.find(t => t.id === templateId);
    if (t) {
      setSelectedTemplate(templateId);
      setFormData({
        ...formData,
        name: t.name,
        description: t.description,
        fromDomain: t.defaultFromDomain,
        fromName: t.defaultFromName,
      });
      setStep('config');
    }
  };

  const handleSubmit = async () => {
    if (!selectedTemplate || !formData.name || !formData.audienceId) {
      setError('Please complete all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/crm/automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          templateId: selectedTemplate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = '/crm/automations';
      } else {
        setError(data.error || 'Failed to create automation');
      }
    } catch (err) {
      setError('Failed to create automation');
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
          <Link href="/crm/automations" style={{ color: '#1E8E5A', textDecoration: 'none', fontSize: '20px' }}>
            ←
          </Link>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#333' }}>
            Create Automation
          </h1>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
        {step === 'template' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#333' }}>
                Choose an Automation Template
              </h2>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                {AUTOMATION_TEMPLATES.length} pre-built email sequences ready to activate
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {AUTOMATION_TEMPLATES.map(template => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  style={{
                    background: 'white',
                    borderRadius: '10px',
                    padding: '20px',
                    border: '1px solid #e5e5e5',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                  onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      background: '#f0f9f5',
                      color: '#1E8E5A',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '600',
                      marginBottom: '8px',
                    }}>
                      {template.emails.length} EMAILS
                    </div>
                  </div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#1E8E5A' }}>
                    {template.name}
                  </h3>
                  <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                    {template.description}
                  </p>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    Audience: {template.audienceKey}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'config' && template && (
          <div style={{ background: 'white', borderRadius: '10px', padding: '24px', border: '1px solid #e5e5e5' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#333' }}>
              Configure: {template.name}
            </h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                Automation Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '13px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  minHeight: '80px',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                Target Audience *
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

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}>
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>
                  Activate immediately (start sending to new contacts)
                </span>
              </label>
            </div>

            {/* Email Sequence Preview */}
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: '#f9f9f9',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
            }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#333' }}>
                Email Sequence ({template.emails.length} emails)
              </h3>
              {template.emails.map((email, index) => (
                <div key={index} style={{
                  padding: '12px',
                  background: 'white',
                  borderRadius: '6px',
                  marginBottom: '8px',
                  border: '1px solid #e5e5e5',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{
                      background: '#1E8E5A',
                      color: 'white',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: '700',
                    }}>
                      {index + 1}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>
                      {email.subject}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', paddingLeft: '28px' }}>
                    Sends {email.delayDays === 0 ? 'immediately' : `${email.delayDays} day${email.delayDays > 1 ? 's' : ''} after enrollment`}
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                background: '#fee',
                color: '#c33',
                fontSize: '13px',
                borderRadius: '6px',
              }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={() => setStep('template')}
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
                disabled={loading || !formData.name || !formData.audienceId}
                style={{
                  padding: '10px 20px',
                  background: (loading || !formData.name || !formData.audienceId) ? '#ccc' : '#1E8E5A',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: (loading || !formData.name || !formData.audienceId) ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Creating...' : 'Create Automation'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
