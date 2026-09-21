'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        router.push('/crm');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #063B25 0%, #0A5D39 50%, #1E8E5A 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '420px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #1E8E5A 0%, #C9A441 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '28px'
          }}>
            🔐
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#063B25',
            marginBottom: '8px'
          }}>
            NLC Lead CRM
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#5B6E64',
            margin: 0
          }}>
            Network Leveraging Cash Flow
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#063B25'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: '2px solid #DCECE2',
                borderRadius: '8px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
                outline: 'none'
              }}
              placeholder="Enter your password"
              required
              autoFocus
              onFocus={(e) => e.target.style.borderColor = '#1E8E5A'}
              onBlur={(e) => e.target.style.borderColor = '#DCECE2'}
            />
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              background: '#ffebee',
              color: '#c62828',
              fontSize: '14px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #ffcdd2'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#5B6E64' : 'linear-gradient(135deg, #1E8E5A 0%, #0A5D39 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.1s',
              boxShadow: '0 4px 12px rgba(30, 142, 90, 0.3)'
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {loading ? 'Logging in...' : 'Login to CRM'}
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #DCECE2',
          textAlign: 'center',
          fontSize: '13px',
          color: '#5B6E64'
        }}>
          <div style={{ marginBottom: '8px' }}>🔒 Secure Access</div>
          <div>Password required for all CRM functions</div>
        </div>
      </div>
    </div>
  );
}
