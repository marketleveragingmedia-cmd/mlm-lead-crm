'use client';

import { useState } from 'react';

export default function MasterclassRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/webinar/register/CFI-2026-10-08', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setIsSubmitting(false);
        return;
      }

      // Handle success based on response
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-card" id="register" style={{ minWidth: '480px', width: '100%', maxWidth: '100%' }}>
      <div className="kicker">Reserve Your Seat</div>
      <h3 className="serif">Cash Flow Injection Strategy Masterclass</h3>
      <p>See What Has Changed, Why Cash Flow Matters Now And How Strategy, Community, Technology And Participation Can Be Leveraged To Create Sustainable Residual Cash Flow.</p>
      
      <form onSubmit={handleSubmit} className="field-grid" style={{ width: '100%' }}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          placeholder="First Name"
          required
          autoComplete="given-name"
          style={{ width: '100%', boxSizing: 'border-box' }}
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          placeholder="Last Name"
          required
          autoComplete="family-name"
          style={{ width: '100%', boxSizing: 'border-box' }}
        />
        <input
          type="email"
          name="email"
          className="full"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Email Address"
          required
          autoComplete="email"
          style={{ width: '100%', boxSizing: 'border-box' }}
        />
        <div className="member-email-note">Already A Member? Use The Email Address Associated With Your SKOOL Membership.</div>
        <input
          type="tel"
          name="phone"
          className="full"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          placeholder="Mobile Number (Optional)"
          autoComplete="tel"
          style={{ width: '100%', boxSizing: 'border-box' }}
        />
      </form>

      {error && (
        <div className="error-message" style={{ color: '#c53030', margin: '12px 0', fontSize: '0.95rem' }}>
          {error}
        </div>
      )}

      <div className="form-actions">
        <button 
          type="submit" 
          form="masterclass-form"
          className="btn" 
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Processing...' : 'Continue To Registration'}
        </button>
        <a className="btn secondary" href="#discover">See What You Will Discover</a>
      </div>
    </div>
  );
}
