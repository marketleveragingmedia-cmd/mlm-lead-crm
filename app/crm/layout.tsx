import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resend CRM - Network Leveraging Cash Flow',
  description: 'Professional CRM system powered by Resend',
};

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style jsx global>{`
        :root {
          --green: #1E8E5A;
          --green-dark: #0A5D39;
          --green-deep: #063B25;
          --gold: #C9A441;
          --gold-light: #E6CF87;
          --white: #FFFFFF;
          --soft: #F6FAF7;
          --ink: #18362A;
          --muted: #5B6E64;
          --line: #DCECE2;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          color: var(--ink);
          background: var(--soft);
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
      {children}
    </>
  );
}
