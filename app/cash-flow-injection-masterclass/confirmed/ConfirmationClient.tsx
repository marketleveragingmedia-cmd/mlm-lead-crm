'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ConfirmationData {
  firstName?: string;
  email?: string;
  webinarJamUrl?: string;
  eventDate?: string;
  eventTime?: string;
}

export default function ConfirmationClient() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<ConfirmationData>({});
  
  useEffect(() => {
    setData({
      firstName: searchParams.get('firstName') || undefined,
      email: searchParams.get('email') || undefined,
      webinarJamUrl: searchParams.get('url') || undefined,
      eventDate: 'Thursday, November 12, 2026',
      eventTime: '11:00 AM Eastern Time'
    });
  }, [searchParams]);

  const handleAddToCalendar = () => {
    // Generate .ics file
    const event = {
      title: 'Cash Flow Injection Strategy Masterclass',
      description: 'Live masterclass on connections, community, and duplication for sustainable residual cash flow.',
      location: data.webinarJamUrl || 'Online (Link will be sent via email)',
      start: new Date('2026-11-12T16:00:00.000Z'), // 11 AM EST = 4 PM UTC
      duration: 90, // minutes
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Cash Flow Visionaries//Masterclass//EN
BEGIN:VEVENT
UID:cfi-masterclass-2026-11-12@mlm-lead-crm.vercel.app
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.start.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(event.start.getTime() + event.duration * 60000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cash-flow-injection-masterclass.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGoogleCalendar = () => {
    const event = {
      title: 'Cash Flow Injection Strategy Masterclass',
      description: 'Live masterclass on connections, community, and duplication for sustainable residual cash flow.',
      location: data.webinarJamUrl || 'Online',
      start: '20261112T160000Z', // 11 AM EST = 4 PM UTC
      end: '20261112T173000Z',   // 90 minutes later
    };

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.start}/${event.end}`;
    
    window.open(googleUrl, '_blank');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="confirmation-page">
        <nav className="nav">
          <div className="shell nav-inner">
            <div className="brand">
              CASH FLOW VISIONARIES
              <small>NETWORK LEVERAGING CASH FLOW</small>
            </div>
          </div>
        </nav>

        <section className="hero-confirm">
          <div className="shell">
            <div className="confirm-card">
              {/* Success Icon */}
              <div className="success-icon">✓</div>
              
              {/* Heading */}
              <h1 className="confirm-title">
                {data.firstName ? `${data.firstName}, You're` : "You're"} All Set!
              </h1>
              
              <h2 className="confirm-subtitle">
                Your Seat Is Reserved
              </h2>

              {/* Event Details */}
              <div className="event-box">
                <div className="event-name">Cash Flow Injection Strategy Masterclass</div>
                <div className="event-host">Hosted by Samantha Hill | MzSamantha</div>
                
                <div className="event-when">
                  <div className="event-date">{data.eventDate}</div>
                  <div className="event-time">{data.eventTime}</div>
                </div>

                {/* Calendar Actions */}
                <div className="calendar-actions">
                  <button onClick={handleAddToCalendar} className="btn calendar-btn">
                    <span className="calendar-icon">📅</span>
                    Download Calendar File
                  </button>
                  <button onClick={handleGoogleCalendar} className="btn secondary calendar-btn">
                    <span className="calendar-icon">🗓️</span>
                    Add to Google Calendar
                  </button>
                </div>

                {/* WebinarJam Access */}
                {data.webinarJamUrl && (
                  <div className="access-box">
                    <div className="access-label">Your Webinar Access Link</div>
                    <a href={data.webinarJamUrl} className="btn access-btn" target="_blank" rel="noopener noreferrer">
                      Join Masterclass
                    </a>
                    <div className="access-note">
                      Save this link! You'll also receive it via email.
                    </div>
                  </div>
                )}
              </div>

              {/* Next Steps */}
              <div className="next-steps">
                <h3 className="next-steps-title">What Happens Next?</h3>
                
                <div className="steps-grid">
                  <div className="step">
                    <div className="step-header">
                      <div className="step-number">1</div>
                      <h4>Check Your Email</h4>
                    </div>
                    <div className="step-content">
                      <p>We've sent your confirmation and webinar access details to:</p>
                      <p className="email-display">{data.email}</p>
                    </div>
                  </div>

                  <div className="step">
                    <div className="step-header">
                      <div className="step-number">2</div>
                      <h4>Join The Community</h4>
                    </div>
                    <div className="step-content">
                      <p>Connect with fellow Cash Flow Visionaries in our Premium SKOOL community</p>
                      <a href="https://www.skool.com/network-leveraging-cash-flow-4401" className="step-link" target="_blank" rel="noopener noreferrer">
                        Join SKOOL Community →
                      </a>
                    </div>
                  </div>

                  <div className="step">
                    <div className="step-header">
                      <div className="step-number">3</div>
                      <h4>Mark Your Calendar</h4>
                    </div>
                    <div className="step-content">
                      <p>Add this event to your calendar so you don't miss this live training</p>
                    </div>
                  </div>

                  <div className="step">
                    <div className="step-header">
                      <div className="step-number">4</div>
                      <h4>Prepare Your Questions</h4>
                    </div>
                    <div className="step-content">
                      <p>Think about your cash flow goals. We'll have live Q&A during the masterclass</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="expect-section">
                <h3 className="expect-title">What You'll Discover</h3>
                <div className="expect-grid">
                  <div className="expect-item">
                    <div className="expect-icon-pro">✓</div>
                    <div className="expect-text">The exact strategy for creating sustainable residual cash flow through community participation</div>
                  </div>
                  <div className="expect-item">
                    <div className="expect-icon-pro">✓</div>
                    <div className="expect-text">How to leverage connections and duplication to multiply your results</div>
                  </div>
                  <div className="expect-item">
                    <div className="expect-icon-pro">✓</div>
                    <div className="expect-text">Live demonstration of the Cash Flow Injection Simulator in action</div>
                  </div>
                  <div className="expect-item">
                    <div className="expect-icon-pro">✓</div>
                    <div className="expect-text">Real-world examples and case studies from successful Cash Flow Visionaries</div>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="important-box">
                <div className="important-icon">⚠️</div>
                <div className="important-content">
                  <div className="important-title">Important</div>
                  <div className="important-text">
                    This is a <strong>live event</strong>. The replay will be available within 24-48 hours after the live session. 
                    Make sure to attend live for the full interactive experience and Q&A.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="shell">
            <p>© 2026 Cash Flow Visionaries | Network Leveraging Cash Flow. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

const styles = `
:root {
  --ivory:#fffaf0;
  --cream:#f8f0df;
  --white:#fffdf8;
  --green:#0f6b48;
  --green2:#17845c;
  --green-deep:#073d2c;
  --green-soft:#dfeee7;
  --gold:#c99b37;
  --gold2:#e5bf68;
  --ink:#183028;
  --muted:#61726c;
  --line:rgba(15,107,72,.14);
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--ink);
  background: linear-gradient(138deg, #fffdf9 0%, #fbf3e5 24%, #f4e6cb 48%, #fff9ef 70%, #f7ead4 100%);
  line-height: 1.6;
}

.confirmation-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.shell {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

.nav {
  background: rgba(255,250,240,.88);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(201,155,55,.20);
  padding: 20px 0;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-weight: 800;
  letter-spacing: .06em;
  color: var(--green-deep);
  font-size: 1.04rem;
}

.brand small {
  display: block;
  font-size: .67rem;
  letter-spacing: .18em;
  color: var(--gold);
  margin-top: 2px;
}

.hero-confirm {
  flex: 1;
  padding: 60px 0 80px;
}

.confirm-card {
  max-width: 880px;
  margin: 0 auto;
  background: linear-gradient(155deg, rgba(255,255,255,.96), rgba(248,236,213,.94));
  border: 1px solid rgba(201,155,55,.32);
  border-radius: 30px;
  padding: 60px 50px;
  box-shadow: 0 22px 70px rgba(40,45,35,.12);
  position: relative;
}

.confirm-card:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 7px;
  background: linear-gradient(90deg, var(--green), var(--gold), var(--green2));
  border-radius: 30px 30px 0 0;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--green), var(--green2));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  margin: 0 auto 30px;
  box-shadow: 0 10px 24px rgba(15,107,72,.18);
}

.confirm-title {
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  line-height: 1.1;
  margin: 0 0 10px;
  text-align: center;
  color: var(--green-deep);
}

.confirm-subtitle {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  line-height: 1.2;
  margin: 0 0 40px;
  text-align: center;
  color: var(--gold);
  font-weight: 600;
}

.event-box {
  background: rgba(255,255,255,.72);
  border: 1px solid rgba(15,107,72,.13);
  border-radius: 20px;
  padding: 36px;
  margin-bottom: 40px;
}

.event-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--green-deep);
  text-align: center;
  margin-bottom: 8px;
}

.event-host {
  font-size: 1rem;
  color: var(--gold);
  text-align: center;
  margin-bottom: 24px;
}

.event-when {
  text-align: center;
  padding: 20px;
  background: var(--green-soft);
  border-radius: 12px;
  margin-bottom: 24px;
}

.event-date {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--green-deep);
  margin-bottom: 4px;
}

.event-time {
  font-size: 1.1rem;
  color: var(--muted);
}

.calendar-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.calendar-btn {
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.calendar-icon {
  font-size: 1.2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 50px;
  padding: 0 24px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--green), var(--green2));
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  border: 1px solid rgba(255,255,255,.25);
  box-shadow: 0 10px 24px rgba(15,107,72,.18);
  cursor: pointer;
  font-size: 0.95rem;
  transition: transform 0.2s;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn.secondary {
  background: transparent;
  color: var(--green-deep);
  border: 1px solid rgba(15,107,72,.24);
  box-shadow: none;
}

.access-box {
  border-top: 1px solid var(--line);
  padding-top: 24px;
  text-align: center;
}

.access-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 12px;
  font-weight: 700;
}

.access-btn {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.1rem;
}

.access-note {
  font-size: 0.85rem;
  color: var(--muted);
  margin-top: 12px;
}

.next-steps {
  margin-bottom: 40px;
}

.next-steps-title {
  font-size: 1.8rem;
  color: var(--green-deep);
  text-align: center;
  margin: 0 0 30px;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.step {
  background: rgba(255,255,255,.72);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 24px;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.step-number {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--green), var(--green2));
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.step-header h4 {
  margin: 0;
  color: var(--green-deep);
  font-size: 1.1rem;
}

.step-content p {
  margin: 0 0 8px;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

.step-content p:last-child {
  margin-bottom: 0;
}

.email-display {
  font-weight: 600;
  color: var(--green-deep);
  word-break: break-all;
  padding: 8px 12px;
  background: var(--green-soft);
  border-radius: 8px;
  font-size: 0.9rem;
}

.step-link {
  display: inline-block;
  margin-top: 12px;
  color: var(--gold);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}

.step-link:hover {
  text-decoration: underline;
}

.expect-section {
  margin-bottom: 40px;
}

.expect-title {
  font-size: 1.8rem;
  color: var(--green-deep);
  text-align: center;
  margin: 0 0 30px;
}

.expect-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.expect-item {
  background: rgba(255,255,255,.72);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
}

.expect-icon-pro {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--green), var(--green2));
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 900;
  margin: 0 auto 16px;
  box-shadow: 0 4px 12px rgba(15,107,72,.15);
}

.expect-text {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.5;
}

.important-box {
  background: linear-gradient(135deg, rgba(255,249,230,.95), rgba(255,243,214,.95));
  border: 2px solid var(--gold);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.important-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.important-title {
  font-weight: 800;
  color: var(--green-deep);
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.important-text {
  color: var(--ink);
  line-height: 1.6;
  font-size: 0.95rem;
}

.footer {
  background: #f7efdf;
  padding: 28px 0 40px;
  text-align: center;
  color: #6e7b76;
  font-size: 0.85rem;
  margin-top: auto;
}

@media (max-width: 768px) {
  .confirm-card {
    padding: 40px 30px;
  }
  
  .steps-grid,
  .expect-grid {
    grid-template-columns: 1fr;
  }
  
  .calendar-actions {
    flex-direction: column;
  }
  
  .calendar-btn {
    width: 100%;
  }
}
`;
