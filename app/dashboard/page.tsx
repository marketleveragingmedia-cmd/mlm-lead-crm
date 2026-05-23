'use client';

import { useEffect, useState } from 'react';

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

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
      fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      maxWidth: '100%',
      margin: 0,
      padding: '12px',
      fontSize: '14px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px',
        gap: '8px'
      }}>
        <h1 style={{ 
          fontSize: '16px', 
          fontWeight: '600',
          color: '#1E8E5A',
          margin: 0
        }}>
          Leads
        </h1>
        
        <button 
          onClick={exportCSV}
          style={{
            background: '#1E8E5A',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          Export
        </button>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '6px 10px',
            fontSize: '13px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            background: 'white',
            width: '100%',
            maxWidth: '300px'
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
          <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Loading...</p>
        </div>
      ) : (
        <>
          <div style={{ 
            background: 'white',
            borderRadius: '6px',
            border: '1px solid #e5e5e5',
            overflow: 'auto'
          }}>
            <table style={{ 
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12px'
            }}>
              <thead>
                <tr style={{ 
                  background: '#1E8E5A',
                  color: 'white',
                  fontSize: '11px'
                }}>
                  <th style={{ padding: '8px 6px', textAlign: 'left', fontWeight: '500', whiteSpace: 'nowrap' }}>Name</th>
                  <th style={{ padding: '8px 6px', textAlign: 'left', fontWeight: '500', whiteSpace: 'nowrap' }}>Email</th>
                  <th style={{ padding: '8px 6px', textAlign: 'left', fontWeight: '500', whiteSpace: 'nowrap' }}>Phone</th>
                  <th style={{ padding: '8px 6px', textAlign: 'left', fontWeight: '500', whiteSpace: 'nowrap' }}>Source</th>
                  <th style={{ padding: '8px 6px', textAlign: 'left', fontWeight: '500', whiteSpace: 'nowrap' }}>Date</th>
                  <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '500' }}>✓</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr 
                    key={lead._id}
                    style={{ 
                      borderBottom: '1px solid #f0f0f0',
                      fontSize: '11px'
                    }}
                  >
                    <td style={{ padding: '8px 6px', whiteSpace: 'nowrap' }}>
                      {lead.firstName} {lead.lastName}
                    </td>
                    <td style={{ padding: '8px 6px', wordBreak: 'break-all' }}>{lead.email}</td>
                    <td style={{ padding: '8px 6px', whiteSpace: 'nowrap' }}>{lead.phone || '—'}</td>
                    <td style={{ padding: '8px 6px', fontSize: '10px', color: '#666' }}>
                      {lead.sourcePage.replace('.html', '').replace(/-/g, ' ').substring(0, 20)}
                    </td>
                    <td style={{ padding: '8px 6px', fontSize: '10px', color: '#666', whiteSpace: 'nowrap' }}>
                      {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                    </td>
                    <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
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
            marginTop: '12px',
            textAlign: 'center',
            color: '#999'
          }}>
            <p style={{ fontSize: '11px', margin: 0 }}>
              {leads.length} total
            </p>
          </div>
        </>
      )}
    </div>
  );
}
