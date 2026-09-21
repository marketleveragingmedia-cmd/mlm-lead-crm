export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--soft)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px',
        }}>⏳</div>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--green)',
        }}>
          Loading Dashboard...
        </div>
      </div>
    </div>
  );
}
