'use client';

import { useState, useEffect } from 'react';
import './foundation-v17.css';
import { V17_BODY_HTML } from './v17-body';

export default function FoundationExperienceV17() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const form = document.getElementById('foundation-form') as HTMLFormElement;
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

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Registration failed');
        }

        if (result.success && result.skoolUrl) {
          window.location.href = result.skoolUrl;
        } else {
          setStatusMessage('Registration successful! Redirecting to SKOOL...');
          setTimeout(() => {
            window.location.href = 'https://www.skool.com/network-leveraging-cash-flow';
          }, 2000);
        }
      } catch (error) {
        console.error('Registration error:', error);
        setStatusMessage('Please check your information and try again.');
        setIsSubmitting(false);
      }
    };

    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: V17_BODY_HTML }} />
  );
}
