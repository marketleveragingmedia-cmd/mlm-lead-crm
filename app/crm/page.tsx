import Link from 'next/link';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getDashboardStats() {
  try {
    const [
      totalLeads,
      leadsThisWeek,
      leadsToday,
      simulatorCompletions,
      totalEmails,
      openRate,
    ] = await Promise.all([
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
    prisma.simulatorResult.count({
      where: { simulatorCompleted: true }
    }),
    prisma.lead.aggregate({
      _sum: {
        emailsReceived: true
      }
    }),
    calculateOpenRate(),
    ]);

    return {
      totalLeads,
      leadsThisWeek,
      leadsToday,
      simulatorCompletions,
      totalEmails: totalEmails._sum.emailsReceived || 0,
      openRate,
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      totalLeads: 0,
      leadsThisWeek: 0,
      leadsToday: 0,
      simulatorCompletions: 0,
      totalEmails: 0,
      openRate: 0,
    };
  }
}

async function calculateOpenRate() {
  try {
    const leads = await prisma.lead.findMany({
      select: {
        emailsReceived: true,
        emailsOpened: true,
      }
    });

    const totalReceived = leads.reduce((sum, lead) => sum + lead.emailsReceived, 0);
    const totalOpened = leads.reduce((sum, lead) => sum + lead.emailsOpened, 0);

    if (totalReceived === 0) return 0;
    return Math.round((totalOpened / totalReceived) * 100);
  } catch (error) {
    console.error('Error calculating open rate:', error);
    return 0;
  }
}

export default async function CRMDashboard() {
  const stats = await getDashboardStats();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--soft)' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, var(--green-deep) 0%, var(--green-dark) 70%, var(--green) 100%)',
        color: 'white',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(6, 59, 37, 0.1)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: '32px',
            fontWeight: '700',
            letterSpacing: '-0.5px',
          }}>
            Resend CRM Dashboard
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
            value={stats.totalLeads.toLocaleString()}
            subtitle="All time"
            color="var(--green)"
          />
          <StatCard
            title="This Week"
            value={stats.leadsThisWeek.toLocaleString()}
            subtitle="Last 7 days"
            color="var(--gold)"
          />
          <StatCard
            title="Today"
            value={stats.leadsToday.toLocaleString()}
            subtitle="Since midnight"
            color="var(--green-dark)"
          />
          <StatCard
            title="Simulator"
            value={stats.simulatorCompletions.toLocaleString()}
            subtitle="Completions"
            color="var(--gold)"
          />
          <StatCard
            title="Emails Sent"
            value={stats.totalEmails.toLocaleString()}
            subtitle="Total delivered"
            color="var(--green)"
          />
          <StatCard
            title="Open Rate"
            value={`${stats.openRate}%`}
            subtitle="Average"
            color="var(--gold)"
          />
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--green-deep)',
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
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--green-deep)',
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
      border: '1px solid var(--line)',
    }}>
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: 'var(--muted)',
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
        color: 'var(--muted)',
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
        border: '2px solid var(--line)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--green)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(30, 142, 90, 0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--line)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      >
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
        <div style={{
          fontSize: '18px',
          fontWeight: '700',
          color: 'var(--green-deep)',
          marginBottom: '8px',
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '15px',
          color: 'var(--muted)',
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
        border: '1px solid var(--line)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
        <div style={{ fontSize: '18px', color: 'var(--muted)' }}>
          No leads yet. Start capturing leads to see them here.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      border: '1px solid var(--line)',
      overflow: 'hidden',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--soft)', borderBottom: '1px solid var(--line)' }}>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Source</th>
            <th style={tableHeaderStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {recentLeads.map((lead, index) => (
            <tr key={lead.id} style={{
              borderBottom: index < recentLeads.length - 1 ? '1px solid var(--line)' : 'none',
            }}>
              <td style={tableCellStyle}>
                <strong>{lead.firstName} {lead.lastName}</strong>
              </td>
              <td style={tableCellStyle}>{lead.email}</td>
              <td style={tableCellStyle}>
                <span style={{
                  background: 'var(--soft)',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--green-dark)',
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
        border: '1px solid var(--line)',
      }}>
        <div style={{ fontSize: '16px', color: 'var(--muted)' }}>
          Unable to load recent leads. Please refresh the page.
        </div>
      </div>
    );
  }
}

const tableHeaderStyle: React.CSSProperties = {
  padding: '16px 20px',
  textAlign: 'left',
  fontSize: '13px',
  fontWeight: '700',
  color: 'var(--green-deep)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const tableCellStyle: React.CSSProperties = {
  padding: '16px 20px',
  fontSize: '15px',
  color: 'var(--ink)',
};

function formatSource(source: string): string {
  if (source.includes('cash-flow-visionaries')) return 'CFV Landing';
  if (source.includes('simulator')) return 'Simulator';
  if (source.includes('founders-beta')) return 'Founders Beta';
  if (source.includes('jv-affiliate')) return 'JV Affiliates';
  if (source.includes('side-hustler')) return 'Side Hustlers';
  return source.replace(/[/-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
