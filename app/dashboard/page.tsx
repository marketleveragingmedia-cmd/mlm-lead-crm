'use client';

import { useEffect, useState } from 'react';

interface Lead {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  sourcePage: string;
  createdAt: string;
  syncedToGlobalControl: boolean;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' 
        ? '/api/leads' 
        : `/api/leads?sourcePage=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
    setLoading(false);
  };

  const exportCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Source Page', 'Date', 'Synced'];
    const rows = leads.map(lead => [
      lead.firstName,
      lead.lastName,
      lead.email,
      lead.phone || '',
      lead.sourcePage,
      new Date(lead.createdAt).toLocaleString(),
      lead.syncedToGlobalControl ? 'Yes' : 'No'
    ]);

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div style={{ 
      fontFamily: 'Inter, system-ui, sans-serif',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ 
          fontSize: '20px', 
          fontWeight: '600',
          color: '#1E8E5A',
          margin: 0
        }}>
          Lead Dashboard
        </h1>
        
        <button 
          onClick={exportCSV}
          style={{
            background: '#1E8E5A',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Export CSV
        </button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            borderRadius: '6px',
            border: '1px solid #1E8E5A',
            background: 'white'
          }}
        >
          <option value="all">All Pages</option>
          <option value="jv-affiliate-marketers-primary.html">JV Affiliate Marketers</option>
          <option value="high-risk-trading-primary.html">High Risk Trading</option>
          <option value="no-more-clients-primary.html">No More Clients</option>
          <option value="side-hustlers-primary.html">Side Hustlers</option>
          <option value="builder-class-primary.html">Builder Class</option>
          <option value="artists-musicians-primary.html">Artists & Musicians</option>
          <option value="social-security-trap-primary.html">Social Security Trap</option>
          <option value="ubi-cbdc-warning-primary.html">UBI/CBDC Warning</option>
          <option value="why-mosca.html">Why MOSCA</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>Loading...</p>
        </div>
      ) : (
        <>
          <div style={{ 
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <table style={{ 
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ 
                  background: '#1E8E5A',
                  color: 'white',
                  fontSize: '13px'
                }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '500' }}>Name</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '500' }}>Email</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '500' }}>Phone</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '500' }}>Source</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '500' }}>Date</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: '500' }}>Synced</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr 
                    key={lead._id}
                    style={{ 
                      borderBottom: '1px solid #eee',
                      background: index % 2 === 0 ? 'white' : '#f9f9f9',
                      fontSize: '13px'
                    }}
                  >
                    <td style={{ padding: '10px 12px' }}>
                      {lead.firstName} {lead.lastName}
                    </td>
                    <td style={{ padding: '10px 12px' }}>{lead.email}</td>
                    <td style={{ padding: '10px 12px' }}>{lead.phone || '—'}</td>
                    <td style={{ padding: '10px 12px', fontSize: '12px', color: '#666' }}>
                      {lead.sourcePage.replace('.html', '').replace(/-/g, ' ')}
                    </td>
                    <td style={{ padding: '10px 12px', fontSize: '12px', color: '#666' }}>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: lead.syncedToGlobalControl ? '#1E8E5A' : '#ccc'
                      }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ 
            marginTop: '16px',
            textAlign: 'center',
            color: '#666'
          }}>
            <p style={{ fontSize: '13px', fontWeight: '500', margin: 0 }}>
              Total: {leads.length} leads
            </p>
          </div>
        </>
      )}
    </div>
  );
}
