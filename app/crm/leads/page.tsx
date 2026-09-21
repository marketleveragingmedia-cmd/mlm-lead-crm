'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectAll(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setSelectedLeads(new Set(filteredLeads.map(l => l.id)));
    } else {
      setSelectedLeads(new Set());
    }
  }

  function handleSelectLead(id: string) {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedLeads(newSelected);
  }

  async function handleBulkDelete() {
    if (!confirm(`Delete ${selectedLeads.size} leads? This cannot be undone.`)) return;
    
    try {
      await fetch('/api/crm/leads/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedLeads) })
      });
      setSelectedLeads(new Set());
      fetchLeads();
    } catch (error) {
      alert('Error deleting leads');
    }
  }

  async function handleDeleteLead(id: string) {
    if (!confirm('Delete this lead? This cannot be undone.')) return;
    
    try {
      await fetch(`/api/crm/leads/${id}`, { method: 'DELETE' });
      fetchLeads();
    } catch (error) {
      alert('Error deleting lead');
    }
  }

  function exportToCSV() {
    const csv = [
      ['Name', 'Email', 'Phone', 'Source', 'Date'],
      ...filteredLeads.map(lead => [
        `${lead.firstName} ${lead.lastName}`,
        lead.email,
        lead.phone || '',
        lead.sourcePage,
        new Date(lead.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  const filteredLeads = leads
    .filter(lead => {
      const matchesSearch = searchTerm === '' || 
        lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSource = sourceFilter === 'all' || lead.sourcePage.includes(sourceFilter);
      
      return matchesSearch && matchesSource;
    })
    .sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'name':
          aVal = `${a.firstName} ${a.lastName}`.toLowerCase();
          bVal = `${b.firstName} ${b.lastName}`.toLowerCase();
          break;
        case 'email':
          aVal = a.email.toLowerCase();
          bVal = b.email.toLowerCase();
          break;
        case 'source':
          aVal = a.sourcePage;
          bVal = b.sourcePage;
          break;
        case 'date':
        default:
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F6FAF7' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>⏳</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1E8E5A' }}>Loading leads...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F6FAF7' }}>
      {/* Header */}
      <header style={{ background: 'white', borderBottom: '1px solid #DCECE2', padding: '16px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/crm" style={{ color: '#1E8E5A', textDecoration: 'none', fontSize: '20px' }}>←</Link>
            <div>
              <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#063B25' }}>All Leads</h1>
              <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#5B6E64' }}>{filteredLeads.length} leads</p>
            </div>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                background: '#f5f5f5',
                color: '#063B25',
                border: '1px solid #DCECE2',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Toolbar */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid #DCECE2' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '12px', marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #DCECE2', borderRadius: '6px', fontSize: '14px' }}
            />
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #DCECE2', borderRadius: '6px', fontSize: '14px' }}
            >
              <option value="all">All Sources</option>
              <option value="cash-flow-visionaries">Cash Flow Visionaries</option>
              <option value="cashflowvisionaries">CFV (alt)</option>
              <option value="simulator">Simulator</option>
              <option value="founders-beta">Founders Beta</option>
              <option value="strategic-partner">Strategic Partners</option>
              <option value="jv-affiliate">JV Affiliates</option>
              <option value="side-hustler">Side Hustlers</option>
              <option value="high-risk">High-Risk Traders</option>
              <option value="no-more-clients">No More Clients</option>
              <option value="builder">Builder Class</option>
              <option value="artist">Artists & Musicians</option>
              <option value="unknown">Unknown</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #DCECE2', borderRadius: '6px', fontSize: '14px' }}
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="source">Sort by Source</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              style={{ padding: '8px 16px', background: '#F6FAF7', border: '1px solid #DCECE2', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={exportToCSV}
              style={{ padding: '8px 16px', background: '#1E8E5A', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
            >
              Export CSV
            </button>
            {selectedLeads.size > 0 && (
              <button
                onClick={handleBulkDelete}
                style={{ padding: '8px 16px', background: '#c62828', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
              >
                Delete {selectedLeads.size} Selected
              </button>
            )}
          </div>
        </div>

        {/* Leads Table */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #DCECE2', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F6FAF7', borderBottom: '1px solid #DCECE2' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', width: '40px' }}>
                  <input type="checkbox" onChange={handleSelectAll} checked={selectedLeads.size === filteredLeads.length && filteredLeads.length > 0} />
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#063B25', textTransform: 'uppercase' }}>Name</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#063B25', textTransform: 'uppercase' }}>Email</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#063B25', textTransform: 'uppercase' }}>Phone</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#063B25', textTransform: 'uppercase' }}>Source</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#063B25', textTransform: 'uppercase' }}>Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#063B25', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, idx) => (
                <tr key={lead.id} style={{ borderBottom: idx < filteredLeads.length - 1 ? '1px solid #DCECE2' : 'none' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <input
                      type="checkbox"
                      checked={selectedLeads.has(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                    />
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <strong>{lead.firstName} {lead.lastName}</strong>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{lead.email}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{lead.phone || '—'}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <span style={{ background: '#F6FAF7', padding: '3px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', color: '#0A5D39' }}>
                      {formatSourceLabel(lead.sourcePage)}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      style={{ padding: '4px 12px', background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function formatSourceLabel(source: string): string {
  const lower = source.toLowerCase();
  
  if (lower.includes('cashflowvisionaries') || lower.includes('cash-flow-visionaries')) return 'Cash Flow Visionaries';
  if (lower.includes('simulator')) return 'Simulator';
  if (lower.includes('founders-beta') || lower.includes('founders')) return 'Founders Beta';
  if (lower.includes('strategic-partner')) return 'Strategic Partners';
  if (lower.includes('jv-affiliate')) return 'JV Affiliates';
  if (lower.includes('side-hustler')) return 'Side Hustlers';
  if (lower.includes('high-risk')) return 'High-Risk Traders';
  if (lower.includes('no-more-clients')) return 'No More Clients';
  if (lower.includes('builder')) return 'Builder Class';
  if (lower.includes('artist') || lower.includes('musician')) return 'Artists & Musicians';
  
  // Fallback: format the path nicely
  const parts = source.split('/').filter(p => p);
  if (parts.length === 0) return 'Unknown';
  return parts[parts.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
