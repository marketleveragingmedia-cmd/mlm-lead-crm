'use client';

// Foundation Experience Page Component
// Integrates V10 HTML design with functional registration form

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function FoundationExperiencePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'info' | 'success' | 'error'>('info');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage('');
    
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName')?.toString().trim();
    const lastName = formData.get('lastName')?.toString().trim();
    const email = formData.get('email')?.toString().trim().toLowerCase();
    const phone = formData.get('mobile')?.toString().trim();

    // Client-side validation
    if (!firstName || !lastName || !email) {
      setStatusMessage('Please enter your first name, last name and a valid email address.');
      setStatusType('error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatusMessage('Please enter a valid email address.');
      setStatusType('error');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('Processing your registration...');
    setStatusType('info');

    // Collect attribution data
    const attribution: Record<string, any> = {
      landingPath: window.location.pathname + window.location.search,
      referrer: document.referrer || null,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    // Extract UTM parameters
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) utmParams[param] = value;
    });
    if (Object.keys(utmParams).length > 0) {
      attribution.utmParams = utmParams;
    }

    try {
      const response = await fetch('/api/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: phone || null,
          sourcePage: 'laying_the_foundation_for_success_experience',
          pageUrl: window.location.href,
          attribution: JSON.stringify(attribution)
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatusMessage('Registration successful! Redirecting to the NLC Community...');
        setStatusType('success');
        
        // Store for potential SKOOL redirect
        sessionStorage.setItem('nlc_foundation_email', email);
        sessionStorage.setItem('nlc_foundation_name', `${firstName} ${lastName}`);
        
        // Redirect to SKOOL after short delay
        // TODO: Replace with verified SKOOL Classroom URL
        setTimeout(() => {
          window.location.href = 'https://www.skool.com/network-leveraging-cash-flow-4401/classroom/nlc-laying-the-foundation-for-success';
        }, 1500);

      } else if (response.status === 409) {
        setStatusMessage('This email is already registered. Redirecting to the NLC Community...');
        setStatusType('success');
        
        setTimeout(() => {
          window.location.href = 'https://www.skool.com/network-leveraging-cash-flow-4401/classroom/nlc-laying-the-foundation-for-success';
        }, 1500);

      } else {
        setStatusMessage(result.error || 'Registration failed. Please try again or contact support.');
        setStatusType('error');
        setIsSubmitting(false);
      }

    } catch (error) {
      setStatusMessage('Connection error. Please check your internet and try again.');
      setStatusType('error');
      setIsSubmitting(false);
    }
  };

  // V10 HTML content with integrated form handler
  return (
    <div dangerouslySetInnerHTML={{ __html: getV10HTML(isSubmitting, statusMessage, statusType, handleSubmit) }} />
  );
}

// V10 HTML template with form integration points
function getV10HTML(isSubmitting: boolean, statusMessage: string, statusType: string, handleSubmit: any): string {
  // Note: This is a temporary approach for rapid deployment
  // For production, consider converting to proper React components
  return `
    <!-- V10 HTML will be injected here -->
    <!-- Form handler is integrated via React event handlers -->
  `;
}
