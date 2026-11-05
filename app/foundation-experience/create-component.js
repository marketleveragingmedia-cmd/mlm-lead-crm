const fs = require('fs');

// Read the body HTML
const bodyHTML = fs.readFileSync('/tmp/foundation-body.html', 'utf-8');

// Escape for template literal
const escapedHTML = bodyHTML
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$/g, '\\$');

// Create the component
const component = `'use client';

import { useState, useEffect, useRef } from 'react';
import './foundation.css';

export default function FoundationExperiencePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const bodyHTML = \`${escapedHTML}\`;

  // Attach form submit handler
  useEffect(() => {
    if (!containerRef.current) return;

    const form = containerRef.current.querySelector('#foundation-form') as HTMLFormElement;
    if (!form) return;

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      setIsSubmitting(true);
      setStatusMessage('');

      const formData = new FormData(form);

      const data = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        mobile: formData.get('mobile') as string,
        sourcePage: 'laying_the_foundation_for_success_experience',
      };

      try {
        const response = await fetch('/api/capture-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok || response.status === 409) {
          window.location.href = 'https://www.skool.com/network-leveraging-cash-flow-4401/classroom/nlc-laying-the-foundation-for-success';
        } else {
          const result = await response.json();
          setStatusMessage(result.message || 'An error occurred. Please try again.');
          setIsSubmitting(false);
        }
      } catch (error) {
        setStatusMessage('Network error. Please check your connection and try again.');
        setIsSubmitting(false);
      }
    };

    form.addEventListener('submit', handleSubmit);
    return () => form.removeEventListener('submit', handleSubmit);
  }, []);

  // Update status message
  useEffect(() => {
    if (!containerRef.current) return;
    const statusElement = containerRef.current.querySelector('#form-status') as HTMLElement;
    if (statusElement) {
      statusElement.hidden = !statusMessage;
      if (statusMessage) statusElement.textContent = statusMessage;
    }
  }, [statusMessage]);

  // Update button state
  useEffect(() => {
    if (!containerRef.current) return;
    const form = containerRef.current.querySelector('#foundation-form') as HTMLFormElement;
    const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (submitButton) {
      submitButton.disabled = isSubmitting;
      if (isSubmitting) {
        submitButton.setAttribute('data-original-text', submitButton.textContent || '');
        submitButton.textContent = 'Processing...';
      } else {
        const originalText = submitButton.getAttribute('data-original-text');
        if (originalText) submitButton.textContent = originalText;
      }
    }
  }, [isSubmitting]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: bodyHTML }} />;
}
`;

fs.writeFileSync('FoundationExperiencePage.tsx', component);
console.log('Component created successfully');
