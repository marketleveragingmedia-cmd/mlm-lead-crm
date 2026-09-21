import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function CRMSimpleTest() {
  let leads = null;
  let error = null;

  try {
    leads = await prisma.lead.findMany({
      take: 5,
      select: {
        firstName: true,
        lastName: true,
        email: true,
      }
    });
  } catch (e: any) {
    error = e.message;
  }

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
          Database Query Test (Server Component)
        </h1>
        
        {error ? (
          <div style={{ 
            background: '#ffebee', 
            padding: '20px', 
            borderRadius: '8px',
            color: '#c62828'
          }}>
            <strong>❌ Error:</strong>
            <pre style={{ marginTop: '10px', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
              {error}
            </pre>
          </div>
        ) : (
          <div style={{ 
            background: '#e8f5e9', 
            padding: '20px', 
            borderRadius: '8px'
          }}>
            <strong>✅ Success! Found {leads?.length || 0} leads:</strong>
            <ul style={{ marginTop: '10px' }}>
              {leads?.map((lead, i) => (
                <li key={i}>
                  {lead.firstName} {lead.lastName} - {lead.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
