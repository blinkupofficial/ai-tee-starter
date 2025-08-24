
# AI Tee Starter (Mock)

Dit is een **super simpele** Next.js starter. Je krijgt:
- Een pagina met promptveld en **Generate**-knop
- Een mock "AI" afbeelding (SVG) als preview
- API route `/api/generate` met mini-moderatie

**Volgende stap** (niet in deze starter): echte AI, T‑shirt mockup, betalingen en fulfillment.

## Stap-voor-stap deploy (geen terminal nodig)

1) **GitHub-account** (gratis) aanmaken en inloggen: github.com  
2) **Nieuwe repository** maken met naam `ai-tee-starter` (Public of Private).  
3) **Upload** alle bestanden uit deze map naar die repo:
   - Ga naar je repo → Add file → *Upload files* → selecteer alle bestanden → Commit.
4) **Vercel-account** (gratis) aanmaken en inloggen: vercel.com  
5) **Import Project** → koppel GitHub → kies je `ai-tee-starter` repo → Deploy.
6) Klaar! Je krijgt een URL. Open die en test het promptveld.

## Lokale run (optioneel)
- Vereist: Node 18+
```bash
npm i
npm run dev
```
Open `http://localhost:3000`.

## Volgende stappen (na deploy)
- Echte AI-generatie via API
- T-shirt mockup met canvas
- Mollie betalingen
- Printful/Gelato fulfillment
