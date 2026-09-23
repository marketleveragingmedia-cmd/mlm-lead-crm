import Link from 'next/link';
import prisma from '@/lib/db';
import LogoutButton from '@/components/LogoutButton';

export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    const [totalLeads, leadsThisWeek, leadsToday] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
    ]);

    return { totalLeads, leadsThisWeek, leadsToday };
  } catch (error) {
    console.error('Stats error:', error);
    return { totalLeads: 0, leadsThisWeek: 0, leadsToday: 0 };
  }
}

export default async function CRMDashboard() {
  const stats = await getStats();

  return (
    <div style={{ minHeight: '100vh', background: '#F6FAF7' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #063B25 0%, #0A5D39 70%, #1E8E5A 100%)',
        color: 'white',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(6, 59, 37, 0.1)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{
              margin: '0 0 8px 0',
              fontSize: '32px',
              fontWeight: '700',
              letterSpacing: '-0.5px',
            }}>
              NLC Lead CRM Dashboard
            </h1>
            <p style={{
              margin: 0,
              fontSize: '16px',
              opacity: 0.9,
              fontWeight: '500',
            }}>
              Network Leveraging Cash Flow
            </p>
          </div>
          <LogoutButton style={{
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }} />
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '32px 24px',
      }}>
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}>
          <StatCard
            title="Total Leads"
            value={stats.totalLeads.toString()}
            subtitle="All time"
            color="#1E8E5A"
          />
          <StatCard
            title="This Week"
            value={stats.leadsThisWeek.toString()}
            subtitle="Last 7 days"
            color="#C9A441"
          />
          <StatCard
            title="Today"
            value={stats.leadsToday.toString()}
            subtitle="Since midnight"
            color="#0A5D39"
          />
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#063B25',
            marginBottom: '20px',
            letterSpacing: '-0.5px',
          }}>
            Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            <ActionCard
              href="/crm/leads"
              title="View Leads"
              description="Browse and manage all captured leads"
              icon="👥"
            />
            <ActionCard
              href="/crm/automations"
              title="Automations"
              description="Manage email sequences and workflows"
              icon="⚡"
            />
            <ActionCard
              href="/crm/broadcasts"
              title="Broadcasts"
              description="Send campaigns to your audiences"
              icon="📧"
            />
            <ActionCard
              href="/crm/analytics"
              title="Analytics"
              description="Track engagement and performance"
              icon="📊"
            />
            <ActionCard
              href="/crm/skool-events"
              title="Skool Events"
              description="Webhook events & membership tracking"
              icon="🎓"
            />
          </div>
        </div>

        {/* Recent Leads */}
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#063B25',
            marginBottom: '20px',
            letterSpacing: '-0.5px',
          }}>
            Recent Leads
          </h2>
          <RecentLeadsList />
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, subtitle, color }: {
  title: string;
  value: string;
  subtitle: string;
  color: string;
}) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #DCECE2',
    }}>
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#5B6E64',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '12px',
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '40px',
        fontWeight: '700',
        color,
        lineHeight: '1',
        marginBottom: '8px',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '14px',
        color: '#5B6E64',
        fontWeight: '500',
      }}>
        {subtitle}
      </div>
    </div>
  );
}

function ActionCard({ href, title, description, icon }: {
  href: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        border: '2px solid #DCECE2',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
        <div style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#063B25',
          marginBottom: '8px',
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '15px',
          color: '#5B6E64',
          lineHeight: '1.5',
        }}>
          {description}
        </div>
      </div>
    </Link>
  );
}

async function RecentLeadsList() {
  try {
    const recentLeads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        sourcePage: true,
        createdAt: true,
      }
    });

    if (recentLeads.length === 0) {
      return (
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center',
          border: '1px solid #DCECE2',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <div style={{ fontSize: '18px', color: '#5B6E64' }}>
            No leads yet. Start capturing leads to see them here.
          </div>
        </div>
      );
    }

    return (
      <div style={{
        background: 'white',
        borderRadius: '16px',
        border: '1px solid #DCECE2',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F6FAF7', borderBottom: '1px solid #DCECE2' }}>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Source</th>
              <th style={tableHeaderStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentLeads.map((lead, index) => (
              <tr key={lead.id} style={{
                borderBottom: index < recentLeads.length - 1 ? '1px solid #DCECE2' : 'none',
              }}>
                <td style={tableCellStyle}>
                  <strong>{lead.firstName} {lead.lastName}</strong>
                </td>
                <td style={tableCellStyle}>{lead.email}</td>
                <td style={tableCellStyle}>
                  <span style={{
                    background: '#F6FAF7',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#0A5D39',
                  }}>
                    {formatSource(lead.sourcePage)}
                  </span>
                </td>
                <td style={tableCellStyle}>
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
    );
  } catch (error) {
    console.error('Error loading recent leads:', error);
    return (
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        border: '1px solid #DCECE2',
      }}>
        <div style={{ fontSize: '16px', color: '#5B6E64' }}>
          Unable to load recent leads. Please refresh the page.
        </div>
      </div>
    );
  }
}

const tableHeaderStyle = {
  padding: '16px 20px',
  textAlign: 'left' as const,
  fontSize: '13px',
  fontWeight: '700',
  color: '#063B25',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const tableCellStyle = {
  padding: '16px 20px',
  fontSize: '15px',
  color: '#18362A',
};

function formatSource(source: string | null): string {
  if (!source) return 'Unknown';
  if (source.includes('cash-flow-visionaries')) return 'Cash Flow Visionaries';
  if (source.includes('simulator')) return 'Simulator';
  if (source.includes('founders-beta')) return 'Founders Beta';
  if (source.includes('jv-affiliate')) return 'JV Affiliates';
  if (source.includes('side-hustler')) return 'Side Hustlers';
  return source.replace(/[/-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
