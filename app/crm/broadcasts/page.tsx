import Link from 'next/link';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function BroadcastsPage() {
  const broadcasts = await prisma.resendBroadcast.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  const stats = {
    total: broadcasts.length,
    sent: broadcasts.filter(b => b.status === 'sent').length,
    scheduled: broadcasts.filter(b => b.status === 'scheduled').length,
    draft: broadcasts.filter(b => b.status === 'draft').length,
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--soft)' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid var(--line)',
        padding: '20px 24px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/crm" style={{ color: 'var(--green)', textDecoration: 'none', fontSize: '24px' }}>
              ←
            </Link>
            <div>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: 'var(--green-deep)' }}>
                Broadcast Campaigns
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: 'var(--muted)' }}>
                {stats.sent} sent • {stats.scheduled} scheduled • {stats.draft} drafts
              </p>
            </div>
          </div>
          <button style={{
            background: 'var(--green)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
          }}>
            + New Broadcast
          </button>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}>
          <StatCard label="Total Campaigns" value={stats.total.toString()} color="var(--green)" />
          <StatCard label="Sent" value={stats.sent.toString()} color="var(--gold)" />
          <StatCard label="Scheduled" value={stats.scheduled.toString()} color="var(--green-dark)" />
          <StatCard label="Drafts" value={stats.draft.toString()} color="var(--muted)" />
        </div>

        {/* Broadcasts List */}
        {broadcasts.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {broadcasts.map(broadcast => (
              <BroadcastCard key={broadcast.id} broadcast={broadcast} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid var(--line)',
    }}>
      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{ fontSize: '32px', fontWeight: '700', color }}>
        {value}
      </div>
    </div>
  );
}

function BroadcastCard({ broadcast }: { broadcast: any }) {
  const statusColors = {
    draft: 'var(--muted)',
    scheduled: 'var(--gold)',
    sending: 'var(--green)',
    sent: 'var(--green-dark)',
  };

  const statusColor = statusColors[broadcast.status as keyof typeof statusColors] || 'var(--muted)';

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid var(--line)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700', color: 'var(--green-deep)' }}>
            {broadcast.name}
          </h3>
          <div style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '8px' }}>
            {broadcast.subject}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
            From: {broadcast.fromName} &lt;{broadcast.fromEmail || `hello@${broadcast.fromDomain}`}&gt;
          </div>
        </div>
        <div style={{
          background: statusColor,
          color: 'white',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '600',
          textTransform: 'capitalize',
        }}>
          {broadcast.status}
        </div>
      </div>

      {broadcast.status === 'sent' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          padding: '16px',
          background: 'var(--soft)',
          borderRadius: '8px',
          marginBottom: '12px',
        }}>
          <MetricBox label="Sent" value={broadcast.recipientCount.toLocaleString()} />
          <MetricBox label="Opens" value={broadcast.openedCount.toLocaleString()} />
          <MetricBox label="Clicks" value={broadcast.clickedCount.toLocaleString()} />
        </div>
      )}

      {broadcast.scheduledFor && broadcast.status === 'scheduled' && (
        <div style={{
          padding: '12px',
          background: 'var(--soft)',
          borderRadius: '8px',
          marginBottom: '12px',
          fontSize: '14px',
          color: 'var(--green-dark)',
          fontWeight: '600',
        }}>
          📅 Scheduled for: {new Date(broadcast.scheduledFor).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--muted)' }}>
        <span>Created {new Date(broadcast.createdAt).toLocaleDateString()}</span>
        {broadcast.sentAt && (
          <span>• Sent {new Date(broadcast.sentAt).toLocaleDateString()}</span>
        )}
      </div>

      {(broadcast.status === 'draft' || broadcast.status === 'scheduled') && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
          <button style={{
            background: 'var(--green)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}>
            {broadcast.status === 'draft' ? 'Edit Draft' : 'Reschedule'}
          </button>
          <button style={{
            background: 'var(--soft)',
            color: 'var(--green-deep)',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--green)', marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{label}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '64px',
      textAlign: 'center',
      border: '1px solid var(--line)',
    }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>📧</div>
      <h2 style={{ fontSize: '24px', color: 'var(--green-deep)', marginBottom: '12px' }}>
        No broadcasts yet
      </h2>
      <p style={{ fontSize: '16px', color: 'var(--muted)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
        Create your first broadcast campaign to send emails to your audiences. Perfect for announcements, updates, and promotions.
      </p>
      <button style={{
        background: 'var(--green)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
      }}>
        + Create First Broadcast
      </button>
    </div>
  );
}
