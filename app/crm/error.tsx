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
        maxWidth: '600px',
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
          Database Connection Error
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'var(--muted)',
          marginBottom: '24px',
          lineHeight: '1.6',
        }}>
          Unable to connect to the database. This is usually a temporary issue.
        </p>
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
        <p style={{
          fontSize: '13px',
          color: 'var(--muted)',
          marginTop: '24px',
        }}>
          If this persists, contact support.
        </p>
      </div>
    </div>
  );
}
