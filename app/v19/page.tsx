export const metadata = {
  title: 'Laying the Foundation for Success | Cash Flow Visionaries',
};

export default function V19Page() {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/v19/site.css" />
        <script src="/v19/nlc-crm-adapter.js" defer></script>
        <script src="/v19/site.js" defer></script>
      </head>
      <body className="nlc-v19" dangerouslySetInnerHTML={{ __html: V19_HTML }} />
    </html>
  );
}

const V19_HTML = `<!-- V19 body content loaded from static file -->`;
