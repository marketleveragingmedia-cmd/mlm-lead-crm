'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface EmailStep {
  id: string;
  subject: string;
  htmlContent: string;
  delayDays: number;
}

export default function CustomAutomationPage() {
  const router = useRouter();
  const [audiences, setAudiences] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    audienceId: '',
    fromDomain: 'm.networkleveragingcashflow.com',
    fromName: 'Network Leveraging Cash Flow',
    active: false,
  });
  const [emails, setEmails] = useState<EmailStep[]>([
    {
      id: '1',
      subject: '',
      htmlContent: '',
      delayDays: 0,
    }
  ]);
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

  const addEmail = () => {
    const lastEmail = emails[emails.length - 1];
    const newDelay = lastEmail ? lastEmail.delayDays + 3 : 0;
    
    setEmails([
      ...emails,
      {
        id: Date.now().toString(),
        subject: '',
        htmlContent: '',
        delayDays: newDelay,
      }
    ]);
  };

  const removeEmail = (id: string) => {
    if (emails.length === 1) {
      alert('You must have at least one email in the sequence');
      return;
    }
    setEmails(emails.filter(e => e.id !== id));
  };

  const updateEmail = (id: string, field: keyof EmailStep, value: any) => {
    setEmails(emails.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      setError('Automation name is required');
      return;
    }
    if (!formData.audienceId) {
      setError('Please select a target audience');
      return;
    }
    if (emails.some(e => !e.subject.trim() || !e.htmlContent.trim())) {
      setError('All emails must have a subject and content');
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
          emails: emails.map(({ id, ...email }) => email),
          triggerType: 'contact_added',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/crm/automations');
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
            Create Custom Automation
          </h1>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ background: 'white', borderRadius: '10px', padding: '24px', border: '1px solid #e5e5e5' }}>
          
          {/* Basic Info */}
          <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#333' }}>
            Automation Details
          </h2>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
              Automation Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Welcome Series for New Subscribers"
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
              placeholder="What is this automation for?"
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
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              New contacts added to this audience will be automatically enrolled
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
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

          <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '24px 0' }} />

          {/* Email Sequence */}
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#333' }}>
              Email Sequence ({emails.length} email{emails.length !== 1 ? 's' : ''})
            </h2>
            <button
              onClick={addEmail}
              style={{
                padding: '8px 16px',
                background: '#1E8E5A',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              + Add Email
            </button>
          </div>

          {emails.map((email, index) => (
            <div
              key={email.id}
              style={{
                marginBottom: '16px',
                padding: '20px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <div style={{
                    background: '#1E8E5A',
                    color: 'white',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '700',
                  }}>
                    {index + 1}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#333' }}>
                    Email {index + 1}
                  </h3>
                </div>
                {emails.length > 1 && (
                  <button
                    onClick={() => removeEmail(email.id)}
                    style={{
                      padding: '6px 12px',
                      background: 'white',
                      color: '#c33',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                  Delay (days) *
                </label>
                <input
                  type="number"
                  min="0"
                  value={email.delayDays}
                  onChange={(e) => updateEmail(email.id, 'delayDays', parseInt(e.target.value) || 0)}
                  style={{
                    width: '120px',
                    padding: '8px 12px',
                    fontSize: '13px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                  }}
                />
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  {email.delayDays === 0 ? 'Sends immediately when contact is added' : `Sends ${email.delayDays} day${email.delayDays > 1 ? 's' : ''} after enrollment`}
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                  Subject Line *
                </label>
                <input
                  type="text"
                  value={email.subject}
                  onChange={(e) => updateEmail(email.id, 'subject', e.target.value)}
                  placeholder="e.g., Welcome to Network Leveraging Cash Flow"
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
                  Email Content (HTML) *
                </label>
                <textarea
                  value={email.htmlContent}
                  onChange={(e) => updateEmail(email.id, 'htmlContent', e.target.value)}
                  placeholder="Enter your email HTML content here. You can use variables: {{firstName}}, {{lastName}}, {{email}}"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '13px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                    minHeight: '200px',
                    fontFamily: 'monospace',
                  }}
                />
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  Available variables: {'{'}{'{'} firstName {'}'}{'}'}, {'{'}{'{'} lastName {'}'}{'}'}, {'{'}{'{'} email {'}'}{'}'}, {'{'}{'{'} unsubscribeUrl {'}'}{'}'}
                </div>
              </div>
            </div>
          ))}

          <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '24px 0' }} />

          {/* Activation */}
          <div style={{ marginBottom: '24px' }}>
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

          {error && (
            <div style={{
              marginBottom: '16px',
              padding: '12px',
              background: '#fee',
              color: '#c33',
              fontSize: '13px',
              borderRadius: '6px',
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => router.push('/crm/automations')}
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
              Cancel
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
              {loading ? 'Creating...' : 'Create Custom Automation'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
