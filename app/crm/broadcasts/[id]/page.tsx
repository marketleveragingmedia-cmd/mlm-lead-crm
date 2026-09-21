import Link from 'next/link';
import prisma from '@/lib/db';
import EmailPreview from '@/components/EmailPreview';

export const dynamic = 'force-dynamic';

export default async function BroadcastDetailPage({ params }: { params: { id: string } }) {
  const broadcast = await prisma.resendBroadcast.findUnique({
    where: { id: params.id },
  });

  if (!broadcast) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Broadcast Not Found</h1>
        <Link href="/crm/broadcasts">← Back to Broadcasts</Link>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    draft: '#666',
    scheduled: '#C9A441',
    sending: '#1E8E5A',
    sent: '#166B44',
  };

  const statusColor = statusColors[broadcast.status] || '#666';

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e5e5e5',
        padding: '16px 20px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Link href="/crm/broadcasts" style={{ color: '#1E8E5A', textDecoration: 'none', fontSize: '20px' }}>
              ←
            </Link>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#333' }}>
              {broadcast.name}
            </h1>
            <div style={{
              background: statusColor,
              color: 'white',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'capitalize',
            }}>
              {broadcast.status}
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#666' }}>
            Created {new Date(broadcast.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
        {/* Stats (if sent) */}
        {broadcast.status === 'sent' && (
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
            border: '1px solid #e5e5e5',
          }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>Performance</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              <StatBox label="Recipients" value={broadcast.recipientCount.toLocaleString()} />
              <StatBox label="Opens" value={broadcast.openedCount.toLocaleString()} />
              <StatBox label="Clicks" value={broadcast.clickedCount.toLocaleString()} />
              <StatBox
                label="Open Rate"
                value={broadcast.recipientCount > 0
                  ? `${((broadcast.openedCount / broadcast.recipientCount) * 100).toFixed(1)}%`
                  : '0%'}
              />
              <StatBox
                label="Click Rate"
                value={broadcast.recipientCount > 0
                  ? `${((broadcast.clickedCount / broadcast.recipientCount) * 100).toFixed(1)}%`
                  : '0%'}
              />
            </div>
          </div>
        )}

        {/* Scheduled Info */}
        {broadcast.status === 'scheduled' && broadcast.scheduledFor && (
          <div style={{
            background: '#fff7e6',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '20px',
            border: '1px solid #C9A441',
          }}>
            <strong style={{ color: '#C9A441' }}>📅 Scheduled for:</strong>{' '}
            {new Date(broadcast.scheduledFor).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>
        )}

        {/* Email Content */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '20px',
          border: '1px solid #e5e5e5',
        }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>Email Content</h2>
          <EmailPreview
            subject={broadcast.subject}
            htmlContent={broadcast.htmlContent}
            textContent={broadcast.textContent || ''}
            fromName={broadcast.fromName}
            fromEmail={broadcast.fromEmail || `hello@${broadcast.fromDomain}`}
            showMode="html"
          />
        </div>

        {/* Actions */}
        {(broadcast.status === 'draft' || broadcast.status === 'scheduled') && (
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '20px',
            marginTop: '20px',
            border: '1px solid #e5e5e5',
            display: 'flex',
            gap: '12px',
          }}>
            <button style={{
              padding: '10px 20px',
              background: '#1E8E5A',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
            }}>
              Edit Broadcast
            </button>
            <button style={{
              padding: '10px 20px',
              background: 'white',
              color: '#c33',
              border: '1px solid #c33',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
            }}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      padding: '12px',
      background: '#f9f9f9',
      borderRadius: '6px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '20px', fontWeight: '700', color: '#1E8E5A', marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </div>
    </div>
  );
}
