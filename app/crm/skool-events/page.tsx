import Link from 'next/link';
import prisma from '@/lib/db';
import LogoutButton from '@/components/LogoutButton';

export const dynamic = 'force-dynamic';

export default async function SkoolEventsPage() {
  let events: any[] = [];
  let error = null;

  try {
    events = await prisma.skoolEvent.findMany({
      include: {
        lead: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            skoolPlan: true,
            fullSimulatorResultsUnlocked: true,
            officialCashFlowVisionary: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F6FAF7' }}>
      {/* Header */}
      <header style={{ background: 'white', borderBottom: '1px solid #DCECE2', padding: '16px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/crm" style={{ color: '#1E8E5A', textDecoration: 'none', fontSize: '20px' }}>←</Link>
            <div>
              <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#063B25' }}>Skooly VIP - Webhook Documentation Mode</h1>
              <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#5B6E64' }}>
                {events.length} events captured • Documentation Mode
              </p>
            </div>
          </div>
          <LogoutButton style={{
            padding: '8px 16px',
            background: '#f5f5f5',
            color: '#063B25',
            border: '1px solid #DCECE2',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
          }} />
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '24px auto', padding: '0 20px' }}>
        {/* Info Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1E8E5A 0%, #0A5D39 100%)',
          color: 'white',
          padding: '20px 24px',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700' }}>
            🎓 Skooly VIP - Webhook Documentation Mode
          </h2>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', opacity: 0.95 }}>
            All webhook events are captured here with complete payloads. Use this page to verify actual event names and data structure before implementing automation logic.
          </p>
          <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', fontSize: '13px' }}>
            <strong>Webhook URL:</strong> <code style={{ background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '4px' }}>
              https://mlm-lead-crm.vercel.app/api/webhooks/skooly
            </code>
          </div>
        </div>

        {error && (
          <div style={{ background: '#ffebee', border: '1px solid #ffcdd2', color: '#c62828', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
            Error loading events: {error}
          </div>
        )}

        {!error && events.length === 0 && (
          <div style={{ background: 'white', padding: '60px 20px', textAlign: 'center', borderRadius: '12px', border: '1px solid #DCECE2' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: '#063B25' }}>No Webhooks Received Yet</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#5B6E64' }}>
              Configure the webhook URL in your Skooly settings, then test with a membership action.
            </p>
          </div>
        )}

        {/* Events List */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {events.map((event) => (
            <div key={event.id} style={{
              background: 'white',
              border: `2px solid ${event.processed ? '#DCECE2' : '#C9A441'}`,
              borderRadius: '12px',
              padding: '20px',
              position: 'relative'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{
                      background: event.processed ? '#E8F5ED' : '#FFF8E1',
                      color: event.processed ? '#1E8E5A' : '#C9A441',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {event.eventType}
                    </span>
                    {event.processed && (
                      <span style={{ color: '#1E8E5A', fontSize: '14px' }}>✓</span>
                    )}
                    {event.errorMessage && (
                      <span style={{ color: '#c62828', fontSize: '14px' }}>⚠</span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#5B6E64' }}>
                    {new Date(event.createdAt).toLocaleString('en-US', { 
                      dateStyle: 'medium', 
                      timeStyle: 'short' 
                    })}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {event.lead ? (
                    <>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#063B25' }}>
                        {event.lead.firstName} {event.lead.lastName}
                      </div>
                      <div style={{ fontSize: '12px', color: '#5B6E64' }}>{event.lead.email}</div>
                      {event.lead.skoolPlan && (
                        <div style={{ marginTop: '4px' }}>
                          <span style={{
                            background: event.lead.skoolPlan === 'Premium' ? '#1E8E5A' : '#5B6E64',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}>
                            {event.lead.skoolPlan}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ fontSize: '13px', color: '#c62828', fontWeight: '600' }}>
                      No Lead Match
                    </div>
                  )}
                </div>
              </div>

              {/* Parsed Data */}
              {(event.skoolEmail || event.skoolMemberId || event.membershipPlan) && (
                <div style={{ 
                  background: '#F6FAF7', 
                  padding: '12px', 
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontSize: '13px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px' }}>
                    {event.skoolEmail && (
                      <>
                        <div style={{ fontWeight: '600', color: '#063B25' }}>Email:</div>
                        <div style={{ color: '#213128' }}>{event.skoolEmail}</div>
                      </>
                    )}
                    {event.skoolMemberId && (
                      <>
                        <div style={{ fontWeight: '600', color: '#063B25' }}>Member ID:</div>
                        <div style={{ color: '#213128' }}>{event.skoolMemberId}</div>
                      </>
                    )}
                    {event.membershipPlan && (
                      <>
                        <div style={{ fontWeight: '600', color: '#063B25' }}>Plan:</div>
                        <div style={{ color: '#213128' }}>{event.membershipPlan}</div>
                      </>
                    )}
                    {event.membershipStatus && (
                      <>
                        <div style={{ fontWeight: '600', color: '#063B25' }}>Status:</div>
                        <div style={{ color: '#213128' }}>{event.membershipStatus}</div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {event.errorMessage && (
                <div style={{
                  background: '#ffebee',
                  border: '1px solid #ffcdd2',
                  color: '#c62828',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontSize: '13px'
                }}>
                  <strong>Processing Error:</strong> {event.errorMessage}
                </div>
              )}

              {/* Raw Payload */}
              <details style={{ fontSize: '12px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: '600', color: '#1E8E5A', padding: '8px 0' }}>
                  View Raw Payload (for documentation)
                </summary>
                <pre style={{
                  background: '#213128',
                  color: '#E8F5ED',
                  padding: '16px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  maxHeight: '400px',
                  fontSize: '11px',
                  lineHeight: '1.4',
                  marginTop: '8px'
                }}>
                  {JSON.stringify(event.rawPayload, null, 2)}
                </pre>
              </details>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
