// Personalized Simulator Results Helper
// Generates secure personalized results link for email personalization
// Created: October 29, 2026

import { PrismaClient } from '@prisma/client';
import { generateResultsToken } from './results-token';

const prisma = new PrismaClient();

interface PersonalizedResultsContent {
  html: string;
  text: string;
}

/**
 * Generate personalized Simulator results content for email
 * Checks if lead has completed Simulator and generates secure link
 */
export async function getPersonalizedSimulatorResults(
  leadEmail: string
): Promise<PersonalizedResultsContent> {
  try {
    // Query Simulator database for most recent completed result
    const simulatorResult = await prisma.simulatorResult.findFirst({
      where: {
        lead: {
          email: leadEmail,
        },
        simulatorCompleted: true,
      },
      orderBy: {
        completedAt: 'desc',
      },
      select: {
        id: true,
        completedAt: true,
      },
    });

    if (!simulatorResult) {
      // No completed Simulator - return empty (will show generic Simulator link)
      return { html: '', text: '' };
    }

    // Generate secure personalized results token
    const resultsToken = generateResultsToken(simulatorResult.id, leadEmail);
    const resultsUrl = `https://simulator.cashflowvisionaries.com/results.html?token=${resultsToken}`;

    // HTML version
    const htmlContent = `
        <div style="background: #f0fdf4; border-left: 4px solid #2d7a45; padding: 20px; margin: 24px 0; border-radius: 4px;">
          <h3 style="color: #2d7a45; font-size: 17px; margin-top: 0; margin-bottom: 12px;">🎯 Your Personalized Cash Flow Injection Results</h3>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 12px;">We Saved Your Personalized Simulator Results!</p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">Access Your Complete Enterprise vs Citizen Comparison and All Your Historical Simulations Anytime.</p>
          
          <p style="text-align: center; margin: 20px 0;">
            <a href="${resultsUrl}" style="display: inline-block; background: #C9A441; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">📊 View My Personalized Results →</a>
          </p>
          
          <p style="font-size: 14px; line-height: 1.5; color: #666; margin-bottom: 0;"><em>This Secure Link Is Personalized for You and Expires in 90 Days. Bookmark It for Easy Access!</em></p>
        </div>
`;

    // Plain text version
    const textContent = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 YOUR PERSONALIZED CASH FLOW INJECTION RESULTS

We Saved Your Personalized Simulator Results!

Access Your Complete Enterprise vs Citizen Comparison 
and All Your Historical Simulations Anytime.

View My Personalized Results:
${resultsUrl}

This Secure Link Is Personalized for You and Expires 
in 90 Days. Bookmark It for Easy Access!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    return {
      html: htmlContent,
      text: textContent,
    };
  } catch (error) {
    console.error('Error generating personalized Simulator results:', error);
    // On error, return empty (fail gracefully)
    return { html: '', text: '' };
  }
}
