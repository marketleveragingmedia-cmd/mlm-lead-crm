export const dynamic = 'force-dynamic';

export default async function SimpleTest() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#F6FAF7',
      padding: '40px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '16px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ color: '#1E8E5A', marginBottom: '20px' }}>
          ✅ Page Rendering Works!
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>
          This page loaded successfully without any database calls.
        </p>
        <div style={{ 
          background: '#F6FAF7', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <strong>If you see this, the problem is NOT:</strong>
          <ul style={{ marginTop: '10px' }}>
            <li>Next.js rendering</li>
            <li>Vercel deployment</li>
            <li>Page structure</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            <strong>The problem IS:</strong> Database queries in /crm
          </p>
        </div>
      </div>
    </div>
  );
}
