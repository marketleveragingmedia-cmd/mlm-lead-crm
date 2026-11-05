/* NLC CRM Registration Adapter - Connects V19 form to existing mlm-lead-crm API */
(function() {
  'use strict';
  
  window.NLCRegistrationHandler = async function(payload) {
    // Validate input
    if (!payload || !payload.firstName || !payload.lastName || !payload.email) {
      throw new Error('Missing required fields');
    }
    
    // Map V19 payload to existing CRM endpoint format
    const requestData = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      mobile: payload.mobile || '',
      sourcePage: payload.source || 'laying_the_foundation_for_success_experience'
    };
    
    // Call existing NLC Lead CRM endpoint on production domain
    const response = await fetch('https://mlm-lead-crm.vercel.app/api/capture-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Registration failed');
    }
    
    const result = await response.json();
    
    // Return V19-expected format
    if (result.success && result.skoolUrl) {
      return {
        success: true,
        redirectUrl: result.skoolUrl
      };
    } else if (result.success) {
      // Fallback to default SKOOL URL if not provided
      return {
        success: true,
        redirectUrl: 'https://www.skool.com/network-leveraging-cash-flow'
      };
    } else {
      throw new Error('Registration was not successful');
    }
  };
})();
