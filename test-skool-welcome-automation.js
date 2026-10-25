#!/usr/bin/env node
/**
 * Test script for SKOOL welcome email automation
 * Tests both Standard and Premium member scenarios
 * October 25, 2026
 */

const crypto = require('crypto');

const WEBHOOK_URL = 'http://localhost:3000/api/webhooks/skooly';
const TEST_SECRET = process.env.SKOOLY_WEBHOOK_SECRET || 'test-secret-key';

// Test payloads
const standardMemberPayload = {
  event: 'member.joined',
  member: {
    id: 'test-standard-' + Date.now(),
    skool_member_id: 'test-std-' + Date.now(),
    name: 'Test Standard Member',
    email: `test-standard-${Date.now()}@test-nlc.com`,
    pricing_tier: 'Standard',
    joined_at: new Date().toISOString()
  }
};

const premiumMemberPayload = {
  event: 'member.joined',
  member: {
    id: 'test-premium-' + Date.now(),
    skool_member_id: 'test-prem-' + Date.now(),
    name: 'Test Premium Member',
    email: `test-premium-${Date.now()}@test-nlc.com`,
    pricing_tier: 'Premium',
    joined_at: new Date().toISOString()
  }
};

function generateSignature(payload, secret) {
  const bodyString = JSON.stringify(payload);
  return crypto.createHmac('sha256', secret).update(bodyString).digest('hex');
}

async function sendWebhook(payload, description) {
  const bodyString = JSON.stringify(payload);
  const signature = generateSignature(payload, TEST_SECRET);
  
  console.log(`\n========================================`);
  console.log(`📤 Sending: ${description}`);
  console.log(`========================================`);
  console.log(`Email: ${payload.member.email}`);
  console.log(`Name: ${payload.member.name}`);
  console.log(`Tier: ${payload.member.pricing_tier}`);
  
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-skooly-signature': signature
      },
      body: bodyString
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ Success:`, result);
    } else {
      console.error(`❌ Failed:`, result);
    }
    
    return result;
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    return { error: error.message };
  }
}

async function testDuplicateWebhook(payload, description) {
  console.log(`\n========================================`);
  console.log(`🔄 Testing Duplicate: ${description}`);
  console.log(`========================================`);
  
  // Send same webhook twice
  const result1 = await sendWebhook(payload, `${description} (First)`);
  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
  const result2 = await sendWebhook(payload, `${description} (Duplicate)`);
  
  console.log(`\n✅ Deduplication Test Complete`);
  console.log(`First attempt:`, result1);
  console.log(`Second attempt:`, result2);
}

async function testTierUpgrade(originalPayload, description) {
  console.log(`\n========================================`);
  console.log(`⬆️  Testing Tier Upgrade: ${description}`);
  console.log(`========================================`);
  
  // First join as Standard
  const standardResult = await sendWebhook(originalPayload, `${description} (Standard)`);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Then upgrade to Premium (same email, different tier)
  const upgradedPayload = {
    ...originalPayload,
    member: {
      ...originalPayload.member,
      pricing_tier: 'Premium'
    }
  };
  
  const premiumResult = await sendWebhook(upgradedPayload, `${description} (Upgraded to Premium)`);
  
  console.log(`\n✅ Tier Upgrade Test Complete`);
  console.log(`Standard result:`, standardResult);
  console.log(`Premium upgrade result:`, premiumResult);
  console.log(`Note: Should NOT send a second welcome email`);
}

async function runTests() {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║   SKOOL Welcome Email Automation Test Suite              ║
║   Testing: Standard, Premium, Deduplication, Upgrades    ║
╚═══════════════════════════════════════════════════════════╝
  `);
  
  console.log(`📋 Test Configuration:`);
  console.log(`   Webhook URL: ${WEBHOOK_URL}`);
  console.log(`   Using ${TEST_SECRET ? 'configured' : 'default'} webhook secret`);
  console.log(`   Timestamp: ${new Date().toISOString()}`);
  
  // Test 1: Standard Member
  await sendWebhook(standardMemberPayload, 'Standard Member Registration');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Test 2: Premium Member
  await sendWebhook(premiumMemberPayload, 'Premium Member Registration');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Test 3: Duplicate webhook delivery (Standard)
  await testDuplicateWebhook(
    {
      ...standardMemberPayload,
      member: {
        ...standardMemberPayload.member,
        email: `test-dup-standard-${Date.now()}@test-nlc.com`,
        id: 'test-dup-std-' + Date.now()
      }
    },
    'Duplicate Standard Member Webhook'
  );
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Test 4: Tier upgrade (Standard → Premium)
  await testTierUpgrade(
    {
      ...standardMemberPayload,
      member: {
        ...standardMemberPayload.member,
        email: `test-upgrade-${Date.now()}@test-nlc.com`,
        id: 'test-upgrade-' + Date.now()
      }
    },
    'Member Tier Upgrade'
  );
  
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║   All Tests Complete                                      ║
║   Check NLC Lead CRM database and Resend for results     ║
╚═══════════════════════════════════════════════════════════╝
  `);
  
  console.log(`\n📊 Expected Results:`);
  console.log(`   1. Two new Standard members created (one duplicate ignored)`);
  console.log(`   2. One new Premium member created`);
  console.log(`   3. One member upgraded from Standard to Premium`);
  console.log(`   4. Total welcome emails sent: 4 (2 Standard, 2 Premium)`);
  console.log(`   5. Duplicate webhook should NOT send second email`);
  console.log(`   6. Tier upgrade should NOT send second email`);
  console.log(`\n✅ Review database flags:`);
  console.log(`   - skoolWelcomeEmailSent should be true`);
  console.log(`   - skoolWelcomeEmailSentAt should have timestamp`);
  console.log(`   - resendContactId should be populated`);
}

// Run tests
runTests().catch(console.error);
