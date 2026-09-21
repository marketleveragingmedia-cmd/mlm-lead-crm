'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--soft)',
      padding: '24px',
    }}>
      <div style={{
        background: 'white',
        padding: '48px',
        borderRadius: '16px',
        maxWidth: '800px',
        textAlign: 'center',
        border: '1px solid var(--line)',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>⚠️</div>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--green-deep)',
          marginBottom: '16px',
        }}>
          Page Error
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'var(--muted)',
          marginBottom: '24px',
          lineHeight: '1.6',
        }}>
          Something went wrong loading this page.
        </p>
        
        <div style={{
          background: '#ffebee',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '24px',
          textAlign: 'left',
        }}>
          <strong style={{ color: '#c62828' }}>Error Details:</strong>
          <pre style={{
            marginTop: '10px',
            fontSize: '13px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: '#333',
          }}>
            {error.message}
          </pre>
          {error.digest && (
            <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
              Digest: {error.digest}
            </div>
          )}
        </div>

        <button
          onClick={reset}
          style={{
            background: 'var(--green)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
