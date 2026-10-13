# Flex and Care

A meeting prototype for dementia caregiver navigation and local resources on Guam. It contains sample content awaiting partner review and is not a production medical service.

## Included
- User-selected sample articles and keyword topic search (never an automatic answer to symptoms)
- Explicit danger phrases show human-help routes; search cannot assess safety
- A three-step starting plan including a path after diagnosis
- Local reference directory with expandable preparation information
- Printable plans without collecting or transmitting personal information
- Public content-workspace mockup; no editing, authentication or publishing
- Preview feedback is not saved or sent

## Development
Use Node 22.13 or later. `npm ci`, then `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort`. Stop the exact owned process with Ctrl-C. Claim runtime resources with dev-lifecycle. `?team=1` opens the public mockup.

## Verification
`npm run gate` runs lint, types, unit tests and production build. `npm run test:e2e` runs desktop/mobile browser acceptance with a task-owned preview server. See docs/MEETING_PROTOTYPE_ACCEPTANCE.md for manual acceptance and exclusions.

## Deployment
Netlify uses netlify.toml, main, npm run build and dist. The build writes release.json with its source commit. Intended meeting URL: https://care.shimizu-technology.com. The prototype is excluded from search indexing.

All provider contacts, eligibility, hours, guidance and source details require confirmation by the designated nonprofit and professional partners before a public service launch. HSP and other organizations are prospective partners until they agree. No unrestricted AI, database, user accounts, clinical certification or community forum is included.
