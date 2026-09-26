import { readFileSync } from 'fs';
import { join } from 'path';

export const metadata = {
  title: 'Cash Flow Injection Strategy Masterclass | Official Draft V15',
};

export default function MasterclassPage() {
  // Read the HTML file from public directory
  const htmlPath = join(process.cwd(), 'public', 'cash-flow-injection-masterclass.html');
  const htmlContent = readFileSync(htmlPath, 'utf-8');
  
  // Extract just the body content (everything between <body> and </body>)
  const bodyMatch = htmlContent.match(/<body>([\s\S]*)<\/body>/);
  const bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;
  
  // Extract styles (everything between <style> and </style>)
  const styleMatches = htmlContent.match(/<style>([\s\S]*?)<\/style>/g) || [];
  const styles = styleMatches.map(s => s.replace(/<\/?style>/g, '')).join('\n');
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  );
}
