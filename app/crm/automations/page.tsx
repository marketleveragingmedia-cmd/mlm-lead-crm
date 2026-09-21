'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import EmailSequenceFlow from '@/components/EmailSequenceFlow';

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [automationsRes, templatesRes] = await Promise.all([
        fetch('/api/crm/automations'),
        fetch('/api/crm/automation-templates'),
      ]);
      const automationsData = await automationsRes.json();
      const templatesData = await templatesRes.json();
      setAutomations(automationsData.automations || []);
      setTemplates(templatesData.templates || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
    setLoading(false);
  };

  const handleCreateFromTemplate = async (templateId: string) => {
    try {
      const response = await fetch('/api/crm/automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, active: true }),
      });

      if (response.ok) {
        fetchData();
        setShowTemplates(false);
        setSelectedTemplate(null);
      }
    } catch (err) {
      console.error('Failed to create automation:', err);
    }
  };

  const handleToggle = async (id: string, active: boolean) => {
    try {
      await fetch('/api/crm/automations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, active }),
      });
      fetchData();
    } catch (err) {
      console.error('Failed to toggle automation:', err);
    }
  };

  const stats = {
    total: automations.length,
    active: automations.filter(a => a.active).length,
    inactive: automations.filter(a => !a.active).length,
    enrolled: automations.reduce((sum, a) => sum + (a.enrolledCount || 0), 0),
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e5e5e5',
        padding: '16px 20px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/crm" style={{ color: '#1E8E5A', textDecoration: 'none', fontSize: '20px' }}>
              ←
            </Link>
            <div>
              <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#333' }}>
                Email Automations
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666' }}>
                {stats.active} active • {stats.enrolled} total enrolled
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowTemplates(true)}
            style={{
              background: '#1E8E5A',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            + New Automation
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '20px',
        }}>
          <StatCard label="Total Automations" value={stats.total.toString()} color="#1E8E5A" />
          <StatCard label="Active" value={stats.active.toString()} color="#166B44" />
          <StatCard label="Inactive" value={stats.inactive.toString()} color="#666" />
          <StatCard label="Total Enrolled" value={stats.enrolled.toLocaleString()} color="#C9A441" />
        </div>

        {/* Automations List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading...</div>
        ) : automations.length === 0 ? (
          <EmptyState onAddClick={() => setShowTemplates(true)} />
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {automations.map(automation => (
              <AutomationCard
                key={automation.id}
                automation={automation}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </main>

      {/* Template Selection Modal */}
      {showTemplates && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#333' }}>
                Choose an Automation Template
              </h2>
              <button
                onClick={() => {
                  setShowTemplates(false);
                  setSelectedTemplate(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666',
                }}
              >
                ×
              </button>
            </div>

            {selectedTemplate ? (
              <TemplateDetail
                template={selectedTemplate}
                onCreate={handleCreateFromTemplate}
                onBack={() => setSelectedTemplate(null)}
              />
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    style={{
                      padding: '16px',
                      background: '#f9f9f9',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f0f8f4'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#f9f9f9'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#1E8E5A', marginBottom: '4px' }}>
                          {template.name}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                          {template.description}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999' }}>
                          {template.emailCount} emails • {template.triggerType.replace('_', ' ')}
                        </div>
                      </div>
                      <div style={{
                        background: '#1E8E5A',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}>
                        View →
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      padding: '16px',
      border: '1px solid #e5e5e5',
    }}>
      <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
        {label}
      </div>
      <div style={{ fontSize: '26px', fontWeight: '700', color }}>
        {value}
      </div>
    </div>
  );
}

function AutomationCard({ automation, onToggle }: { automation: any; onToggle: (id: string, active: boolean) => void }) {
  const [expanded, setExpanded] = useState(false);
  const emails = automation.emails || [];

  return (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      padding: '20px',
      border: '1px solid #e5e5e5',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: '#333' }}>
            {automation.name}
          </h3>
          {automation.description && (
            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#666' }}>
              {automation.description}
            </p>
          )}
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#999' }}>
            <span>{emails.length} emails</span>
            <span>•</span>
            <span>{automation.enrolledCount || 0} enrolled</span>
            <span>•</span>
            <span>{automation.triggerType.replace('_', ' ')}</span>
          </div>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={automation.active}
            onChange={(e) => onToggle(automation.id, e.target.checked)}
            style={{ width: '16px', height: '16px' }}
          />
          <span style={{ fontSize: '12px', fontWeight: '600', color: automation.active ? '#1E8E5A' : '#666' }}>
            {automation.active ? 'Active' : 'Inactive'}
          </span>
        </label>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '8px 16px',
          background: '#f9f9f9',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          color: '#1E8E5A',
        }}
      >
        {expanded ? '▼ Hide Email Sequence' : '▶ View Email Sequence'}
      </button>

      {expanded && emails.length > 0 && (
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e5e5' }}>
          <EmailSequenceFlow
            emails={emails.map((email: any, i: number) => ({
              id: `${automation.id}-${i}`,
              ...email,
            }))}
            fromName={automation.fromName}
            fromEmail={automation.fromEmail || `hello@${automation.fromDomain}`}
          />
        </div>
      )}
    </div>
  );
}

function TemplateDetail({ template, onCreate, onBack }: { template: any; onCreate: (id: string) => void; onBack: () => void }) {
  const [fullTemplate, setFullTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFullTemplate();
  }, [template.id]);

  const fetchFullTemplate = async () => {
    try {
      const response = await fetch(`/api/crm/automation-templates/${template.id}`);
      const data = await response.json();
      setFullTemplate(data.template);
    } catch (err) {
      console.error('Failed to fetch template:', err);
    }
    setLoading(false);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
  }

  if (!fullTemplate) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Template not found</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: '#333' }}>
          {fullTemplate.name}
        </h3>
        <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#666' }}>
          {fullTemplate.description}
        </p>
        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#999' }}>
          <span>{fullTemplate.emails.length} emails in sequence</span>
          <span>•</span>
          <span>Trigger: {fullTemplate.triggerType.replace('_', ' ')}</span>
        </div>
      </div>

      <div style={{ marginBottom: '20px', maxHeight: '400px', overflow: 'auto' }}>
        <EmailSequenceFlow
          emails={fullTemplate.emails.map((email: any, i: number) => ({
            id: `preview-${i}`,
            ...email,
          }))}
          fromName={fullTemplate.defaultFromName}
          fromEmail={`hello@${fullTemplate.defaultFromDomain}`}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid #e5e5e5' }}>
        <button
          onClick={onBack}
          style={{
            padding: '10px 20px',
            background: 'white',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>
        <button
          onClick={() => onCreate(template.id)}
          style={{
            padding: '10px 20px',
            background: '#1E8E5A',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          ✓ Create This Automation
        </button>
      </div>
    </div>
  );
}

function EmptyState({ onAddClick }: { onAddClick: () => void }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '48px',
      textAlign: 'center',
      border: '1px solid #e5e5e5',
    }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
      <h2 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>
        No automations yet
      </h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', maxWidth: '500px', margin: '0 auto 20px' }}>
        Create your first email automation to nurture leads on autopilot. Choose from 11 pre-built templates.
      </p>
      <button
        onClick={onAddClick}
        style={{
          background: '#1E8E5A',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '10px 20px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        + Create First Automation
      </button>
    </div>
  );
}
