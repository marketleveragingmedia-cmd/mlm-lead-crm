import { masterclassStyles } from '@/lib/masterclass-html';
import MasterclassRegistrationForm from '@/components/MasterclassRegistrationForm';

export const metadata = {
  title: 'Cash Flow Injection Strategy Masterclass | Official Draft V15',
};

export default function MasterclassPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: masterclassStyles }} />
      
      <nav className="nav">
        <div className="shell nav-inner">
          <div className="brand serif">CASH FLOW VISIONARIES<small>NETWORK LEVERAGING CASH FLOW</small></div>
          <a className="btn" href="#register">Reserve My Seat</a>
        </div>
      </nav>

      <header className="hero">
        <div className="shell hero-grid">
          <div>
            <div className="kicker">Cash Flow Injection Strategy Masterclass</div>
            <h1 className="serif">Nobody Teaches This.</h1>
            <h2>How Connections, Community And Duplication Can Create Sustainable Residual Cash Flow.</h2>
            <p className="lead">A Live Masterclass Designed To Introduce A Different Way Of Seeing Cash Flow, Community And What Is Possible In Today&apos;s Economy.</p>
            <div className="meta-row">
              <div className="pill">Thursday, October 8, 2026</div>
              <div className="pill">11:00 AM Eastern Time</div>
              <div className="pill">Premium SKOOL Membership: $50 Per Year</div>
            </div>
            <p className="hero-note">The $50 Annual Premium Membership Includes The Live Masterclass, One Year Of Premium SKOOL Access And Official Cash Flow Visionary Status.</p>
          </div>

          <MasterclassRegistrationForm />
        </div>
      </header>

      <footer className="footer">
        <div className="shell">
          <div className="copyright">&copy; 2026 Network Leveraging Cash Flow | Cash Flow Visionaries. All Rights Reserved.</div>
          <div className="footer-small">Educational Content. No Earnings Guarantee. Participation Requires Informed Decision-Making.</div>
        </div>
      </footer>
    </>
  );
}
