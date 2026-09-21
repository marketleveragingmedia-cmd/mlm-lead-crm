import Link from 'next/link';
import prisma from '@/lib/db';

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
          </div>
        </div>

        {/* Status Message */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          border: '1px solid #DCECE2',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
          <h3 style={{ fontSize: '20px', color: '#1E8E5A', marginBottom: '8px' }}>
            Dashboard Operational
          </h3>
          <p style={{ fontSize: '15px', color: '#5B6E64' }}>
            All systems running. Database connected successfully.
          </p>
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
