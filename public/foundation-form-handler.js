/**
 * NLC | Laying the Foundation for Success Experience
 * Registration Form Handler
 * 
 * Integrates V10 HTML form with NLC Lead CRM /api/capture-lead endpoint
 * Handles attribution tracking, validation, error handling, and SKOOL redirect
 * 
 * Version: 1.0
 * Date: November 2, 2026
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    apiEndpoint: '/api/capture-lead',
    source: 'laying_the_foundation_for_success_experience',
    sourcePage: window.location.href,
    
    // SKOOL Configuration (TO BE CONFIRMED)
    skoolRedirectUrl: 'https://www.skool.com/network-leveraging-cash-flow-4401/classroom/nlc-laying-the-foundation-for-success',
    
    // Form element IDs
    formId: 'foundation-form',
    firstNameId: 'first-name',
    lastNameId: 'last-name',
    emailId: 'email',
    phoneId: 'phone',
    submitButtonSelector: 'button[type="submit"]',
    statusElementId: 'form-status',
    
    // Messages
    messages: {
      submitting: 'Processing your registration...',
      success: 'Registration successful! Redirecting to the NLC Community...',
      duplicate: 'This email is already registered. Redirecting to the NLC Community...',
      error: 'Registration failed. Please try again or contact support.',
      validationError: 'Please check your information and try again.',
      networkError: 'Connection error. Please check your internet and try again.'
    }
  };

  // Utility: Get attribution data
  function getAttributionData() {
    const data = {
      landingPath: window.location.pathname + window.location.search,
      referrer: document.referrer || null,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    // Extract UTM parameters
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      if (urlParams.has(param)) {
        utmParams[param] = urlParams.get(param);
      }
    });

    if (Object.keys(utmParams).length > 0) {
      data.utmParams = utmParams;
    }

    return data;
  }

  // Utility: Normalize phone number
  function normalizePhone(phone) {
    if (!phone) return null;
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    // Return null if empty after normalization
    return digits.length > 0 ? `+${digits}` : null;
  }

  // Utility: Display status message
  function setStatus(message, type = 'info') {
    const statusEl = document.getElementById(CONFIG.statusElementId);
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.removeAttribute('hidden');
      statusEl.className = `formstatus formstatus--${type}`;
    }
  }

  // Utility: Clear status message
  function clearStatus() {
    const statusEl = document.getElementById(CONFIG.statusElementId);
    if (statusEl) {
      statusEl.setAttribute('hidden', '');
      statusEl.textContent = '';
    }
  }

  // Utility: Disable form during submission
  function setFormLoading(form, isLoading) {
    const submitBtn = form.querySelector(CONFIG.submitButtonSelector);
    const inputs = form.querySelectorAll('input');

    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing...';
      inputs.forEach(input => input.disabled = true);
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Continue to the NLC Community';
      inputs.forEach(input => input.disabled = false);
    }
  }

  // Main: Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    clearStatus();

    const form = event.target;
    const formData = new FormData(form);

    // Extract form values
    const firstName = formData.get('firstName')?.trim();
    const lastName = formData.get('lastName')?.trim();
    const email = formData.get('email')?.trim().toLowerCase();
    const phoneRaw = formData.get('mobile')?.trim();
    const phone = normalizePhone(phoneRaw);

    // Client-side validation
    if (!firstName || !lastName || !email) {
      setStatus(CONFIG.messages.validationError, 'error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Prepare payload
    const attribution = getAttributionData();
    const payload = {
      firstName,
      lastName,
      email,
      phone,
      sourcePage: CONFIG.source,
      pageUrl: CONFIG.sourcePage,
      attribution: JSON.stringify(attribution)
    };

    // Set loading state
    setFormLoading(form, true);
    setStatus(CONFIG.messages.submitting, 'info');

    try {
      // Submit to lead capture API
      const response = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success: Lead captured
        setStatus(CONFIG.messages.success, 'success');
        
        // Store lead info for SKOOL redirect
        sessionStorage.setItem('nlc_foundation_email', email);
        sessionStorage.setItem('nlc_foundation_name', `${firstName} ${lastName}`);
        
        // Redirect to SKOOL after short delay
        setTimeout(() => {
          redirectToSkool(email, firstName, lastName);
        }, 1500);

      } else if (response.status === 409) {
        // Duplicate email - lead already exists
        setStatus(CONFIG.messages.duplicate, 'success');
        
        // Still redirect to SKOOL
        setTimeout(() => {
          redirectToSkool(email, firstName, lastName);
        }, 1500);

      } else {
        // API error
        console.error('Lead capture error:', result);
        setStatus(result.error || CONFIG.messages.error, 'error');
        setFormLoading(form, false);
      }

    } catch (error) {
      // Network or unexpected error
      console.error('Form submission error:', error);
      setStatus(CONFIG.messages.networkError, 'error');
      setFormLoading(form, false);
    }
  }

  // Redirect to SKOOL with optional email pre-fill
  function redirectToSkool(email, firstName, lastName) {
    let redirectUrl = CONFIG.skoolRedirectUrl;

    // Attempt email pre-fill (if SKOOL supports it)
    // Common URL parameter patterns: ?email=, ?user_email=, ?signup_email=
    // NOTE: Need to verify if SKOOL actually supports this
    try {
      const url = new URL(redirectUrl);
      url.searchParams.set('email', email);
      redirectUrl = url.toString();
    } catch (e) {
      console.warn('Email pre-fill not supported, using direct URL');
    }

    // Redirect
    window.location.href = redirectUrl;
  }

  // Initialize form handler on page load
  function init() {
    const form = document.getElementById(CONFIG.formId);
    if (!form) {
      console.error(`Form with ID "${CONFIG.formId}" not found`);
      return;
    }

    // Attach submit handler
    form.addEventListener('submit', handleSubmit);

    // Optional: Add real-time validation
    const emailInput = document.getElementById(CONFIG.emailId);
    if (emailInput) {
      emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          this.setCustomValidity('Please enter a valid email address');
        } else {
          this.setCustomValidity('');
        }
      });
    }

    console.log('[Foundation Form] Handler initialized');
  }

  // Run init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
