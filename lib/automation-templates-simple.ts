// Simple Automation Templates - ASCII only
import { wrapEmailContent } from './email-templates-simple';

export interface AutomationEmail {
  subject: string;
  htmlContent: string;
  textContent: string;
  delayDays?: number;
  delayHours?: number;
}

export interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  triggerType: string;
  audienceKey: string;
  emails: AutomationEmail[];
  defaultFromDomain: string;
  defaultFromName: string;
}

export const AUTOMATION_TEMPLATES: AutomationTemplate[] = [
  {
    id: 'welcome-basic',
    name: 'Basic Welcome Series',
    description: '3-email welcome sequence',
    triggerType: 'form_submit',
    audienceKey: 'main-list',
    defaultFromDomain: 'm.networkleveragingcashflow.com',
    defaultFromName: 'Network Leveraging Cash Flow',
    emails: [
      {
        subject: 'Welcome!',
        delayDays: 0,
        htmlContent: wrapEmailContent('<h2>Welcome!</h2><p>Thanks for joining.</p>'),
        textContent: 'Welcome! Thanks for joining.',
      },
      {
        subject: 'Getting Started',
        delayDays: 2,
        htmlContent: wrapEmailContent('<h2>Getting Started</h2><p>Here are some tips to get started.</p>'),
        textContent: 'Getting Started. Here are some tips.',
      },
      {
        subject: 'Next Steps',
        delayDays: 5,
        htmlContent: wrapEmailContent('<h2>Next Steps</h2><p>Ready to take the next step?</p>'),
        textContent: 'Next Steps. Ready to take the next step?',
      },
    ],
  },
];

export function getAutomationTemplateById(id: string): AutomationTemplate | undefined {
  return AUTOMATION_TEMPLATES.find(t => t.id === id);
}

export function getAutomationTemplatesByAudience(audienceKey: string): AutomationTemplate[] {
  return AUTOMATION_TEMPLATES.filter(t => t.audienceKey === audienceKey);
}

export const TOTAL_AUTOMATION_TEMPLATES = AUTOMATION_TEMPLATES.length;
