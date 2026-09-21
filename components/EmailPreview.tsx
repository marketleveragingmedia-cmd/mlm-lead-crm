'use client';

interface EmailPreviewProps {
  subject: string;
  htmlContent: string;
  textContent?: string;
  fromName: string;
  fromEmail: string;
  showMode?: 'html' | 'text' | 'both';
}

export default function EmailPreview({
  subject,
  htmlContent,
  textContent,
  fromName,
  fromEmail,
  showMode = 'html'
}: EmailPreviewProps) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid var(--line)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {/* Email Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid var(--line)',
        background: 'var(--soft)',
      }}>
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>From</span>
          <div style={{ fontSize: '13px', color: 'var(--green-deep)', fontWeight: '500', marginTop: '4px' }}>
            {fromName} &lt;{fromEmail}&gt;
          </div>
        </div>
        <div>
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subject</span>
          <div style={{ fontSize: '14px', color: 'var(--green-deep)', fontWeight: '600', marginTop: '4px' }}>
            {subject}
          </div>
        </div>
      </div>

      {/* Email Content */}
      {showMode === 'html' && (
        <div style={{
          padding: '20px',
          maxHeight: '600px',
          overflow: 'auto',
        }}>
          <iframe
            srcDoc={htmlContent}
            style={{
              width: '100%',
              minHeight: '400px',
              border: 'none',
            }}
            sandbox="allow-same-origin"
            title="Email Preview"
          />
        </div>
      )}

      {showMode === 'text' && textContent && (
        <div style={{
          padding: '20px',
          maxHeight: '600px',
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: '12px',
          whiteSpace: 'pre-wrap',
          background: '#f9f9f9',
        }}>
          {textContent}
        </div>
      )}

      {showMode === 'both' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--line)' }}>
          <div style={{ background: 'white', padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--muted)', marginBottom: '12px', textTransform: 'uppercase' }}>HTML</div>
            <iframe
              srcDoc={htmlContent}
              style={{
                width: '100%',
                height: '400px',
                border: '1px solid var(--line)',
                borderRadius: '4px',
              }}
              sandbox="allow-same-origin"
              title="HTML Preview"
            />
          </div>
          <div style={{ background: 'white', padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--muted)', marginBottom: '12px', textTransform: 'uppercase' }}>TEXT</div>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              whiteSpace: 'pre-wrap',
              background: '#f9f9f9',
              padding: '12px',
              borderRadius: '4px',
              height: '400px',
              overflow: 'auto',
              border: '1px solid var(--line)',
            }}>
              {textContent || 'No text version'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
