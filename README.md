# Flex and Care

A mobile-first visual concept for a Guam caregiver guidance and resource platform. The caregiver experience turns common questions into calm, source-backed next steps. A separate team workspace shows how nonprofit partners could review and maintain guidance before it is published.

## What the demo includes

- Four curated caregiver questions based on the discovery conversation
- A three-step caregiver plan builder with personalized next steps
- A safe fallback for questions without approved guidance
- Topic-based local resource directory with eligibility and preparation details
- Always-available urgent routes for 911, Guam 988, and Adult Protective Services
- A printable support-call plan that does not collect or send personal information
- A separate content workspace showing ownership and publication status
- Desktop and mobile browser coverage

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

Open `http://localhost:5173/?team=1` for the content-team workspace.

## Verify

```bash
npm run gate
npm run test:e2e
```

## Important

The copy and resource records are discussion content, not a production knowledge base. Phone numbers, availability, eligibility, and service details must be confirmed by the responsible organizations before launch. The plan builder stores nothing and does not determine program eligibility.
