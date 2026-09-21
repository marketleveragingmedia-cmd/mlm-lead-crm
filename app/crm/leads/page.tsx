import Link from 'next/link';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--soft)' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid var(--line)',
        padding: '20px 24px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/crm" style={{ color: 'var(--green)', textDecoration: 'none', fontSize: '24px' }}>
            ←
          </Link>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: 'var(--green-deep)' }}>
              All Leads
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: 'var(--muted)' }}>
              {leads.length} total leads
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {leads.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '64px',
            textAlign: 'center',
            border: '1px solid var(--line)',
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
            <h2 style={{ fontSize: '24px', color: 'var(--green-deep)', marginBottom: '12px' }}>
              No leads yet
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)' }}>
              Start capturing leads from your landing pages to see them here.
            </p>
          </div>
        ) : (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            border: '1px solid var(--line)',
            overflow: 'hidden',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--soft)', borderBottom: '2px solid var(--line)' }}>
                  <th style={headerStyle}>Name</th>
                  <th style={headerStyle}>Email</th>
                  <th style={headerStyle}>Phone</th>
                  <th style={headerStyle}>Source</th>
                  <th style={headerStyle}>Resend</th>
                  <th style={headerStyle}>Engagement</th>
                  <th style={headerStyle}>Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, idx) => (
                  <tr key={lead.id} style={{
                    borderBottom: idx < leads.length - 1 ? '1px solid var(--line)' : 'none',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--soft)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                  >
                    <td style={cellStyle}>
                      <strong style={{ color: 'var(--green-deep)' }}>
                        {lead.firstName} {lead.lastName}
                      </strong>
                    </td>
                    <td style={cellStyle}>{lead.email}</td>
                    <td style={cellStyle}>{lead.phone || '—'}</td>
                    <td style={cellStyle}>
                      <span style={{
                        background: 'var(--green)',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                      }}>
                        {formatSource(lead.sourcePage)}
                      </span>
                    </td>
                    <td style={cellStyle}>
                      {lead.resendContactId ? (
                        <span style={{ color: 'var(--green)', fontWeight: '600' }}>✓ Synced</span>
                      ) : (
                        <span style={{ color: 'var(--muted)' }}>—</span>
                      )}
                    </td>
                    <td style={cellStyle}>
                      <div style={{ fontSize: '13px' }}>
                        <div>{lead.emailsOpened}/{lead.emailsReceived} opens</div>
                        <div style={{ color: 'var(--muted)' }}>{lead.emailsClicked} clicks</div>
                      </div>
                    </td>
                    <td style={cellStyle}>
                      {new Date(lead.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

const headerStyle: React.CSSProperties = {
  padding: '16px 20px',
  textAlign: 'left',
  fontSize: '13px',
  fontWeight: '700',
  color: 'var(--green-deep)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const cellStyle: React.CSSProperties = {
  padding: '16px 20px',
  fontSize: '15px',
  color: 'var(--ink)',
};

function formatSource(source: string): string {
  if (source.includes('cash-flow-visionaries')) return 'CFV';
  if (source.includes('simulator')) return 'Simulator';
  if (source.includes('founders-beta')) return 'Founders';
  if (source.includes('jv-affiliate')) return 'JV';
  if (source.includes('side-hustler')) return 'Side Hustler';
  return source.substring(0, 15);
}
