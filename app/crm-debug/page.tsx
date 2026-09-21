import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

async function testDashboardQueries() {
  const results: any = {};

  // Test 1: Simple count
  try {
    results.totalLeads = await prisma.lead.count();
  } catch (e: any) {
    results.totalLeads = `ERROR: ${e.message}`;
  }

  // Test 2: Count with date filter
  try {
    results.leadsThisWeek = await prisma.lead.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    });
  } catch (e: any) {
    results.leadsThisWeek = `ERROR: ${e.message}`;
  }

  // Test 3: Simulator count
  try {
    results.simulatorCount = await prisma.simulatorResult.count({
      where: { simulatorCompleted: true }
    });
  } catch (e: any) {
    results.simulatorCount = `ERROR: ${e.message}`;
  }

  // Test 4: Aggregate
  try {
    const agg = await prisma.lead.aggregate({
      _sum: {
        emailsReceived: true
      }
    });
    results.emailsReceived = agg._sum.emailsReceived || 0;
  } catch (e: any) {
    results.emailsReceived = `ERROR: ${e.message}`;
  }

  // Test 5: FindMany with select
  try {
    const leads = await prisma.lead.findMany({
      select: {
        emailsReceived: true,
        emailsOpened: true,
      }
    });
    results.openRateQuery = `Success: ${leads.length} leads`;
  } catch (e: any) {
    results.openRateQuery = `ERROR: ${e.message}`;
  }

  // Test 6: Recent leads with orderBy
  try {
    const recent = await prisma.lead.findMany({
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
    results.recentLeads = `Success: ${recent.length} leads`;
  } catch (e: any) {
    results.recentLeads = `ERROR: ${e.message}`;
  }

  return results;
}

export default async function CRMDebugPage() {
  const results = await testDashboardQueries();

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
          🔍 Dashboard Query Debug
        </h1>
        
        <div style={{ fontSize: '14px', lineHeight: '2' }}>
          {Object.entries(results).map(([key, value]) => (
            <div key={key} style={{ 
              marginBottom: '10px',
              padding: '10px',
              background: typeof value === 'string' && value.includes('ERROR') ? '#ffebee' : '#e8f5e9',
              borderRadius: '4px'
            }}>
              <strong>{key}:</strong> {String(value)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
