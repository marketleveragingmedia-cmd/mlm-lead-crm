'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EMAIL_TEMPLATES } from '@/lib/email-templates';

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const template = selectedTemplate ? EMAIL_TEMPLATES.find(t => t.id === selectedTemplate) : null;

  const handleCopy = () => {
    if (template) {
      navigator.clipboard.writeText(template.html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUseTemplate = () => {
    if (template) {
      // Store in sessionStorage for the broadcast page to pick up
      sessionStorage.setItem('selectedTemplate', JSON.stringify({
        subject: template.subject,
        htmlContent: template.html,
      }));
      window.location.href = '/crm/broadcasts/new';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--soft)' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid var(--line)',
        padding: '16px 20px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/crm" style={{ color: 'var(--green)', textDecoration: 'none', fontSize: '20px' }}>
              ←
            </Link>
            <div>
              <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: 'var(--green-deep)' }}>
                Email Templates
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--muted)' }}>
                {EMAIL_TEMPLATES.length} professional templates ready to use
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: selectedTemplate ? '400px 1fr' : '1fr', gap: '20px' }}>
          {/* Template List */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '10px',
              border: '1px solid var(--line)',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--green-deep)' }}>
                  Choose a Template
                </h2>
              </div>
              <div>
                {EMAIL_TEMPLATES.map((t, index) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    style={{
                      padding: '16px 20px',
                      borderBottom: index < EMAIL_TEMPLATES.length - 1 ? '1px solid var(--line)' : 'none',
                      cursor: 'pointer',
                      background: selectedTemplate === t.id ? 'var(--soft)' : 'white',
                      transition: 'background 0.2s',
                    }}
                    onMouseOver={(e) => {
                      if (selectedTemplate !== t.id) e.currentTarget.style.background = '#fafafa';
                    }}
                    onMouseOut={(e) => {
                      if (selectedTemplate !== t.id) e.currentTarget.style.background = 'white';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                      <div style={{
                        minWidth: '40px',
                        height: '40px',
                        background: selectedTemplate === t.id ? 'var(--green)' : 'var(--soft)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                      }}>
                        {selectedTemplate === t.id ? '✓' : '📧'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          margin: '0 0 4px 0',
                          fontSize: '14px',
                          fontWeight: '700',
                          color: selectedTemplate === t.id ? 'var(--green)' : 'var(--green-deep)',
                        }}>
                          {t.name}
                        </h3>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--muted)' }}>
                          {t.description}
                        </p>
                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--green)', fontWeight: '600' }}>
                          {t.preview}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          {selectedTemplate && template && (
            <div>
              <div style={{
                background: 'white',
                borderRadius: '10px',
                border: '1px solid var(--line)',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--line)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--green-deep)' }}>
                    {template.name} Preview
                  </h2>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setPreviewMode(!previewMode)}
                      style={{
                        padding: '8px 16px',
                        background: previewMode ? 'var(--green)' : 'white',
                        color: previewMode ? 'white' : 'var(--green)',
                        border: '1px solid var(--green)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      {previewMode ? 'Show Code' : 'Show Preview'}
                    </button>
                    <button
                      onClick={handleCopy}
                      style={{
                        padding: '8px 16px',
                        background: 'white',
                        color: 'var(--green)',
                        border: '1px solid var(--line)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      {copied ? '✓ Copied!' : 'Copy HTML'}
                    </button>
                    <button
                      onClick={handleUseTemplate}
                      style={{
                        padding: '8px 16px',
                        background: 'var(--green)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Use Template →
                    </button>
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  {previewMode ? (
                    <iframe
                      srcDoc={template.html}
                      style={{
                        width: '100%',
                        height: '600px',
                        border: '1px solid var(--line)',
                        borderRadius: '6px',
                      }}
                      title="Email Preview"
                    />
                  ) : (
                    <pre style={{
                      background: '#f5f5f5',
                      padding: '16px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      lineHeight: '1.5',
                      overflow: 'auto',
                      maxHeight: '600px',
                      margin: 0,
                      fontFamily: 'monospace',
                    }}>
                      {template.html}
                    </pre>
                  )}
                </div>

                <div style={{
                  padding: '16px 20px',
                  borderTop: '1px solid var(--line)',
                  background: 'var(--soft)',
                }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: '700', color: 'var(--green-deep)' }}>
                    Available Variables
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['{{firstName}}', '{{lastName}}', '{{email}}', '{{subject}}', '{{date}}', '{{unsubscribeUrl}}'].map(v => (
                      <code key={v} style={{
                        background: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        border: '1px solid var(--line)',
                      }}>
                        {v}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!selectedTemplate && (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '48px',
              textAlign: 'center',
              border: '1px solid var(--line)',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📧</div>
              <h2 style={{ fontSize: '20px', color: 'var(--green-deep)', marginBottom: '10px' }}>
                Select a Template
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--muted)' }}>
                Choose a template from the list to preview and customize it for your broadcast.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
