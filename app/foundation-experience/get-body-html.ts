// Extract body HTML from the source file
import fs from 'fs';
import path from 'path';

export function getFoundationBodyHTML(): string {
  const htmlPath = path.join(process.cwd(), '..', 'nlc-launcher-temp', 'NLC_Sales_Page_V16_Copyright_Footer.html');
  
  if (!fs.existsSync(htmlPath)) {
    // Fallback if source file not available
    return getEmbeddedHTML();
  }
  
  const fullHTML = fs.readFileSync(htmlPath, 'utf-8');
  const bodyMatch = fullHTML.match(/<body>([\s\S]*?)<\/body>/);
  
  if (bodyMatch && bodyMatch[1]) {
    return bodyMatch[1].trim();
  }
  
  return getEmbeddedHTML();
}

function getEmbeddedHTML(): string {
  // Embedded version as fallback
  return `<!-- Body content will be loaded here -->`;
}
