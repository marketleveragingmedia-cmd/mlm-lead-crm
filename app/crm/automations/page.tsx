import Link from 'next/link';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AutomationsPage() {
  const automations = await prisma.resendAutomation.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const totalEnrolled = automations.reduce((sum, a) => sum + a.enrolledCount, 0);
  const activeCount = automations.filter(a => a.active).length;

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
                Email Automations
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: 'var(--muted)' }}>
                {activeCount} active • {totalEnrolled} total enrolled
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
            + New Automation
          </button>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}>
          <StatCard label="Total Sequences" value={automations.length.toString()} color="var(--green)" />
          <StatCard label="Active" value={activeCount.toString()} color="var(--gold)" />
          <StatCard label="Enrolled Contacts" value={totalEnrolled.toLocaleString()} color="var(--green-dark)" />
        </div>

        {/* Automations List */}
        {automations.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {automations.map(automation => (
              <AutomationCard key={automation.id} automation={automation} />
            ))}
          </div>
        )}

        {/* Placeholder for future automations */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--green-deep)', marginBottom: '20px' }}>
            Available Sequences
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            <SequenceTemplate
              name="Cash Flow Visionaries Welcome"
              description="5-email sequence over 10 days for CFV landing page leads"
              emails={5}
              duration="10 days"
            />
            <SequenceTemplate
              name="Founders Beta Onboarding"
              description="5-email sequence for new Founders Beta members"
              emails={5}
              duration="7 days"
            />
            <SequenceTemplate
              name="Simulator Nurture"
              description="6-email sequence for simulator completions"
              emails={6}
              duration="10 days"
            />
            <SequenceTemplate
              name="Strategic Partner Welcome"
              description="Welcome sequence for new Strategic Partners"
              emails={4}
              duration="7 days"
            />
          </div>
        </div>
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

function AutomationCard({ automation }: { automation: any }) {
  const emails = Array.isArray(automation.emails) ? automation.emails : [];
  
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      border: '2px solid var(--line)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '700', color: 'var(--green-deep)' }}>
            {automation.name}
          </h3>
          {automation.description && (
            <p style={{ margin: 0, fontSize: '15px', color: 'var(--muted)' }}>
              {automation.description}
            </p>
          )}
        </div>
        <div style={{
          background: automation.active ? 'var(--green)' : 'var(--muted)',
          color: 'white',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '600',
        }}>
          {automation.active ? 'Active' : 'Inactive'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
        <MetricBox label="Emails" value={emails.length.toString()} />
        <MetricBox label="Enrolled" value={automation.enrolledCount.toLocaleString()} />
        <MetricBox label="Completed" value={automation.completedCount.toLocaleString()} />
      </div>

      <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
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
          View Details
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
          Edit
        </button>
      </div>
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--green)' }}>{value}</div>
    </div>
  );
}

function SequenceTemplate({ name, description, emails, duration }: {
  name: string;
  description: string;
  emails: number;
  duration: string;
}) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid var(--line)',
    }}>
      <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--green-deep)', marginBottom: '8px' }}>
        {name}
      </div>
      <div style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '16px' }}>
        {description}
      </div>
      <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
        <span>📧 {emails} emails</span>
        <span>⏱️ {duration}</span>
      </div>
      <button style={{
        background: 'var(--green)',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        width: '100%',
      }}>
        Create Sequence
      </button>
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
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>⚡</div>
      <h2 style={{ fontSize: '24px', color: 'var(--green-deep)', marginBottom: '12px' }}>
        No automations yet
      </h2>
      <p style={{ fontSize: '16px', color: 'var(--muted)', marginBottom: '24px' }}>
        Create your first email automation sequence to start nurturing leads automatically.
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
        + Create First Automation
      </button>
    </div>
  );
}
