
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { prompt, style } = req.body || {};
  if (!prompt || typeof prompt !== 'string') return res.status(400).json({ error: 'Prompt missing' });

  // Very simple "moderation": block obvious IP words (demo only)
  const banned = ['nike','adidas','disney','mickey','marvel','fc','psg','real madrid','apple logo','playstation','pokemon','harry potter'];
  const lower = prompt.toLowerCase();
  if (banned.some(w => lower.includes(w))) {
    return res.status(400).json({ error: 'Gebruik geen merknamen/karakters in je prompt.' });
  }

  // Create a simple SVG that visualizes the prompt and "style"
  const width = 1024, height = 1024;
  const bg = style === 'rave' ? '#0f0f0f' : style === 'surreal' ? '#111827' : '#ffffff';
  const fg = style === 'minimal' ? '#111827' : '#f5f5f5';

  // Wrap text
  function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  }
  const text = escapeXml(prompt).slice(0, 160);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="${bg}"/>
  <circle cx="${width/2}" cy="${height/2}" r="360" fill="url(#g)" opacity="${style==='minimal' ? 0.15 : 0.35}"/>
  <g transform="translate(64,128)">
    <rect x="0" y="0" width="${width-128}" height="${height-256}" rx="24" ry="24" fill="${style==='minimal' ? '#f9fafb' : 'rgba(0,0,0,0.25)'}" />
    <foreignObject x="24" y="24" width="${width-176}" height="${height-304}">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color: ${fg}; font-size: 40px; line-height: 1.2; white-space: pre-wrap;">
        ${text}
      </div>
    </foreignObject>
  </g>
</svg>`.trim();

  const svgDataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  res.status(200).json({ svgDataUrl });
}
