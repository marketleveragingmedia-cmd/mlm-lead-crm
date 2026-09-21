'use client';

import { useState } from 'react';

interface EmailStep {
  id: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  delayDays?: number;
  delayHours?: number;
}

interface EmailSequenceFlowProps {
  emails: EmailStep[];
  fromName: string;
  fromEmail: string;
  onEmailClick?: (email: EmailStep) => void;
}

export default function EmailSequenceFlow({
  emails,
  fromName,
  fromEmail,
  onEmailClick,
}: EmailSequenceFlowProps) {
  const [expandedEmail, setExpandedEmail] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {emails.map((email, index) => (
        <div key={email.id || index}>
          {/* Delay Indicator */}
          {index > 0 && (email.delayDays || email.delayHours) && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              color: 'var(--muted)',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--soft)',
                padding: '6px 16px',
                borderRadius: '20px',
                border: '1px solid var(--line)',
              }}>
                <span>⏱️</span>
                <span>
                  Wait {email.delayDays ? `${email.delayDays} day${email.delayDays > 1 ? 's' : ''}` : ''}
                  {email.delayDays && email.delayHours ? ' + ' : ''}
                  {email.delayHours ? `${email.delayHours} hour${email.delayHours > 1 ? 's' : ''}` : ''}
                </span>
              </div>
            </div>
          )}

          {/* Email Card */}
          <div
            style={{
              background: 'white',
              border: '2px solid var(--line)',
              borderRadius: '10px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onClick={() => {
              setExpandedEmail(expandedEmail === email.id ? null : email.id);
              if (onEmailClick) onEmailClick(email);
            }}
          >
            {/* Email Header */}
            <div style={{
              padding: '16px',
              background: expandedEmail === email.id ? 'var(--soft)' : 'white',
              borderBottom: '1px solid var(--line)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'var(--green)',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Email {index + 1}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--green-deep)',
                    marginBottom: '4px',
                  }}>
                    {email.subject}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--muted)',
                  }}>
                    From: {fromName} &lt;{fromEmail}&gt;
                  </div>
                </div>
                <div style={{
                  fontSize: '20px',
                  color: 'var(--muted)',
                  transform: expandedEmail === email.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}>
                  ▼
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedEmail === email.id && (
              <div style={{ padding: '16px' }}>
                <div style={{
                  marginBottom: '12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Email Content Preview
                </div>
                <div style={{
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}>
                  <iframe
                    srcDoc={email.htmlContent}
                    style={{
                      width: '100%',
                      height: '300px',
                      border: 'none',
                    }}
                    sandbox="allow-same-origin"
                    title={`Email ${index + 1} Preview`}
                  />
                </div>
                {email.textContent && (
                  <details style={{ marginTop: '12px' }}>
                    <summary style={{
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--muted)',
                      padding: '8px 0',
                    }}>
                      View text version
                    </summary>
                    <div style={{
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      whiteSpace: 'pre-wrap',
                      background: '#f9f9f9',
                      padding: '12px',
                      borderRadius: '4px',
                      marginTop: '8px',
                      maxHeight: '200px',
                      overflow: 'auto',
                    }}>
                      {email.textContent}
                    </div>
                  </details>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
