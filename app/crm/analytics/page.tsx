import Link from 'next/link';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const analytics = await getAnalytics();

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
              Analytics & Insights
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: 'var(--muted)' }}>
              Track engagement and campaign performance
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Overview Stats */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--green-deep)', marginBottom: '20px' }}>
            Email Performance
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}>
            <PerformanceCard
              label="Total Emails Sent"
              value={analytics.totalSent.toLocaleString()}
              color="var(--green)"
            />
            <PerformanceCard
              label="Open Rate"
              value={`${analytics.openRate}%`}
              subtitle={`${analytics.totalOpened.toLocaleString()} opens`}
              color="var(--gold)"
            />
            <PerformanceCard
              label="Click Rate"
              value={`${analytics.clickRate}%`}
              subtitle={`${analytics.totalClicked.toLocaleString()} clicks`}
              color="var(--green-dark)"
            />
            <PerformanceCard
              label="Engagement Rate"
              value={`${analytics.engagementRate}%`}
              subtitle="Active contacts"
              color="var(--gold)"
            />
          </div>
        </div>

        {/* Sources Breakdown */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--green-deep)', marginBottom: '20px' }}>
            Lead Sources
          </h2>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid var(--line)',
          }}>
            {analytics.sourceBreakdown.map((source, index) => (
              <SourceRow
                key={source.source}
                source={source.source}
                count={source.count}
                percentage={source.percentage}
                isLast={index === analytics.sourceBreakdown.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--green-deep)', marginBottom: '20px' }}>
            Recent Email Events
          </h2>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            border: '1px solid var(--line)',
            padding: '24px',
          }}>
            <RecentEvents />
          </div>
        </div>
      </main>
    </div>
  );
}

async function getAnalytics() {
  const leads = await prisma.lead.findMany({
    select: {
      emailsReceived: true,
      emailsOpened: true,
      emailsClicked: true,
      sourcePage: true,
      lastEmailOpenedAt: true,
    }
  });

  const totalSent = leads.reduce((sum, lead) => sum + lead.emailsReceived, 0);
  const totalOpened = leads.reduce((sum, lead) => sum + lead.emailsOpened, 0);
  const totalClicked = leads.reduce((sum, lead) => sum + lead.emailsClicked, 0);

  const openRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;
  const clickRate = totalSent > 0 ? Math.round((totalClicked / totalSent) * 100) : 0;

  // Engagement rate: contacts with opens/clicks in last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const engagedCount = leads.filter(l => 
    l.lastEmailOpenedAt && new Date(l.lastEmailOpenedAt) > thirtyDaysAgo
  ).length;
  const engagementRate = leads.length > 0 ? Math.round((engagedCount / leads.length) * 100) : 0;

  // Source breakdown
  const sourceMap = new Map<string, number>();
  leads.forEach(lead => {
    const page = lead.sourcePage || 'Unknown';
    const count = sourceMap.get(page) || 0;
    sourceMap.set(page, count + 1);
  });

  const sourceBreakdown = Array.from(sourceMap.entries())
    .map(([source, count]) => ({
      source,
      count,
      percentage: leads.length > 0 ? Math.round((count / leads.length) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalSent,
    totalOpened,
    totalClicked,
    openRate,
    clickRate,
    engagementRate,
    sourceBreakdown,
  };
}

function PerformanceCard({ label, value, subtitle, color }: {
  label: string;
  value: string;
  subtitle?: string;
  color: string;
}) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid var(--line)',
    }}>
      <div style={{
        fontSize: '13px',
        fontWeight: '600',
        color: 'var(--muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '12px',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '36px',
        fontWeight: '700',
        color,
        lineHeight: '1',
        marginBottom: subtitle ? '8px' : 0,
      }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: '14px', color: 'var(--muted)' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

function SourceRow({ source, count, percentage, isLast }: {
  source: string;
  count: number;
  percentage: number;
  isLast: boolean;
}) {
  return (
    <div style={{
      paddingBottom: isLast ? 0 : '16px',
      marginBottom: isLast ? 0 : '16px',
      borderBottom: isLast ? 'none' : '1px solid var(--line)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--green-deep)' }}>
          {formatSource(source)}
        </span>
        <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--gold)' }}>
          {count} ({percentage}%)
        </span>
      </div>
      <div style={{ background: 'var(--soft)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{
          background: 'var(--green)',
          height: '100%',
          width: `${percentage}%`,
          transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  );
}

async function RecentEvents() {
  const events = await prisma.emailEvent.findMany({
    orderBy: { occurredAt: 'desc' },
    take: 20,
    include: {
      lead: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        }
      }
    }
  });

  if (events.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '32px', color: 'var(--muted)' }}>
        No email events recorded yet
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      {events.map(event => (
        <div key={event.id} style={{
          padding: '12px',
          background: 'var(--soft)',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <span style={{ fontWeight: '600', color: 'var(--green-deep)' }}>
              {event.lead.firstName} {event.lead.lastName}
            </span>
            <span style={{ color: 'var(--muted)', marginLeft: '8px' }}>
              {event.eventType}
            </span>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
            {new Date(event.occurredAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </span>
        </div>
      ))}
    </div>
  );
}

function formatSource(source: string | null): string {
  if (!source) return 'Unknown';
  if (source.includes('cash-flow-visionaries')) return 'Cash Flow Visionaries';
  if (source.includes('simulator')) return 'Simulator';
  if (source.includes('founders-beta')) return 'Founders Beta';
  if (source.includes('jv-affiliate')) return 'JV Affiliates';
  if (source.includes('side-hustler')) return 'Side Hustlers';
  return source.replace(/[/-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
