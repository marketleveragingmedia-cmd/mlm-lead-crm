// Quick investigation script to examine Skooly event types and payloads
// Run with: npx tsx scripts/investigate-skooly-events.ts

import { prisma } from '../lib/prisma';

async function investigateSkoolyEvents() {
  console.log('🔍 Investigating Skooly Event History...\n');

  // 1. Get unique event types
  console.log('═'.repeat(80));
  console.log('1. UNIQUE EVENT TYPES RECEIVED');
  console.log('═'.repeat(80));
  
  const eventTypes = await prisma.skoolEvent.groupBy({
    by: ['eventType'],
    _count: true,
    orderBy: {
      _count: {
        eventType: 'desc'
      }
    }
  });

  console.log(`\nTotal unique event types: ${eventTypes.length}\n`);
  eventTypes.forEach(et => {
    console.log(`  📌 ${et.eventType}: ${et._count} events`);
  });

  // 2. Look for purchase-related events
  console.log('\n' + '═'.repeat(80));
  console.log('2. PURCHASE-RELATED EVENT SEARCH');
  console.log('═'.repeat(80));

  const purchaseKeywords = ['purchase', 'payment', 'paid', 'buy', 'course', 'classroom', 'enroll'];
  const foundPurchaseEvents = eventTypes.filter(et => 
    purchaseKeywords.some(keyword => et.eventType.toLowerCase().includes(keyword))
  );

  if (foundPurchaseEvents.length > 0) {
    console.log('\n✅ Found purchase-related events:');
    foundPurchaseEvents.forEach(et => {
      console.log(`  💰 ${et.eventType}: ${et._count} events`);
    });
  } else {
    console.log('\n⚠️  No purchase-related event types found');
    console.log('   Searched for keywords: ' + purchaseKeywords.join(', '));
  }

  // 3. Sample recent events
  console.log('\n' + '═'.repeat(80));
  console.log('3. RECENT EVENT SAMPLES (Last 10)');
  console.log('═'.repeat(80));

  const recentEvents = await prisma.skoolEvent.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      eventType: true,
      skoolMemberId: true,
      skoolEmail: true,
      membershipPlan: true,
      rawPayload: true,
      createdAt: true
    }
  });

  console.log(`\nShowing ${recentEvents.length} most recent events:\n`);
  recentEvents.forEach((event, index) => {
    console.log(`\n[${index + 1}] Event ID: ${event.id}`);
    console.log(`    Type: ${event.eventType}`);
    console.log(`    Email: ${event.skoolEmail || 'N/A'}`);
    console.log(`    Member ID: ${event.skoolMemberId || 'N/A'}`);
    console.log(`    Plan: ${event.membershipPlan || 'N/A'}`);
    console.log(`    Date: ${event.createdAt.toISOString()}`);
    console.log(`    Raw Payload Keys: ${Object.keys(event.rawPayload as object).join(', ')}`);
  });

  // 4. Examine payload structure for purchase indicators
  console.log('\n' + '═'.repeat(80));
  console.log('4. PAYLOAD STRUCTURE ANALYSIS');
  console.log('═'.repeat(80));

  if (recentEvents.length > 0) {
    const samplePayload = recentEvents[0].rawPayload as any;
    console.log('\nSample Payload Structure (most recent event):');
    console.log(JSON.stringify(samplePayload, null, 2).substring(0, 1000) + '...');

    // Check for purchase-related fields
    const purchaseFields = ['amount', 'price', 'payment', 'transaction', 'purchase', 'course_id', 'classroom_id'];
    const foundFields = purchaseFields.filter(field => 
      JSON.stringify(samplePayload).toLowerCase().includes(field)
    );

    if (foundFields.length > 0) {
      console.log('\n✅ Found potential purchase indicators in payload:');
      foundFields.forEach(field => console.log(`   - ${field}`));
    } else {
      console.log('\n⚠️  No obvious purchase indicators found in payload');
    }
  }

  // 5. Summary and recommendations
  console.log('\n' + '═'.repeat(80));
  console.log('5. SUMMARY & RECOMMENDATIONS');
  console.log('═'.repeat(80));

  console.log('\n📋 Event Types Summary:');
  console.log(`   Total events in database: ${await prisma.skoolEvent.count()}`);
  console.log(`   Unique event types: ${eventTypes.length}`);
  console.log(`   Purchase-related events: ${foundPurchaseEvents.length > 0 ? 'YES' : 'NO'}`);

  if (foundPurchaseEvents.length === 0) {
    console.log('\n⚠️  FINDING: No course-specific purchase events detected');
    console.log('\n🔧 VERIFICATION OPTIONS:');
    console.log('   1. Check if Skooly documentation mentions course purchase events');
    console.log('   2. Perform a test $1 purchase to trigger a real event');
    console.log('   3. Investigate SKOOL API for course purchase verification endpoint');
    console.log('   4. Use SKOOL course member lists as verification source');
    console.log('   5. Implement manual verification workflow (not recommended)');
  } else {
    console.log('\n✅ FINDING: Course purchase events ARE being received');
    console.log('   Next step: Integrate purchase event handling into webhook');
  }

  await prisma.$disconnect();
}

investigateSkoolyEvents()
  .catch(console.error)
  .finally(() => process.exit(0));
