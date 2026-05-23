export const metadata = {
  title: 'MLM Lead CRM',
  description: 'Lead management system for MLM Command Center',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#f5f5f5' }}>
        {children}
      </body>
    </html>
  )
}
