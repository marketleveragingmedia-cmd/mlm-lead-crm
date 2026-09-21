import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NLC Lead CRM - Network Leveraging Cash Flow',
  description: 'Professional CRM system powered by Resend',
};

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
