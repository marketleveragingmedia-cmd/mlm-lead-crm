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
      <head>
        <style dangerouslySetInnerHTML={{__html: `
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
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
