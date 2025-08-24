
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('surreal');
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImg('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ prompt, style })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Generation failed');
      setImg(data.svgDataUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{maxWidth: 800, margin: '40px auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif'}}>
      <h1 style={{fontSize: 28, fontWeight: 700}}>AI Tee — Prompt to Preview (Mock)</h1>
      <p style={{color:'#555', marginTop: 8}}>Stap 1: werkende site met promptveld & voorbeeldafbeelding. In de volgende stap vervangen we de mock door échte AI.</p>

      <form onSubmit={handleGenerate} style={{marginTop: 16}}>
        <textarea
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          placeholder="Beschrijf je idee… (geen merknamen/personen)"
          rows={4}
          required
          maxLength={300}
          style={{width: '100%', padding: 12, border: '1px solid #ccc', borderRadius: 8}}
        />
        <div style={{marginTop: 8, display: 'flex', gap: 8}}>
          <select value={style} onChange={(e)=>setStyle(e.target.value)} style={{padding: 8, borderRadius: 8, border: '1px solid #ccc'}}>
            <option value="surreal">Surreal</option>
            <option value="minimal">Minimal line</option>
            <option value="rave">Glitch/Rave</option>
          </select>
          <button disabled={loading} type="submit" style={{padding: '8px 14px', borderRadius: 8, background: 'black', color: 'white', border: 'none'}}>
            {loading ? 'Genereren…' : 'Genereer'}
          </button>
        </div>
      </form>

      {error && <p style={{color:'crimson', marginTop: 12}}>{error}</p>}

      {img && (
        <>
          <h2 style={{marginTop: 24, fontSize: 20}}>Voorbeeld</h2>
          <img src={img} alt="Mock AI result" style={{width: '100%', maxWidth: 512, borderRadius: 12, border: '1px solid #eee'}}/>
          <p style={{color:'#777', fontSize: 12, marginTop: 8}}>Dit is een MOCK afbeelding (SVG). Volgende stap: echte AI output + T‑shirt mockup.</p>
        </>
      )}
    </main>
  );
}
