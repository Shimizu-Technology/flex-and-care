# Flex and Care Visual Concept Agent Guide

## Project intent

This is a mobile-first visual concept for a prospective nonprofit caregiver resource platform on Guam. It demonstrates the experience and content-governance model; it is not a production medical service.

## Stack

- React + TypeScript + Vite
- Custom CSS design system
- Vitest for unit tests
- Playwright for browser tests

## Safety and content rules

- Do not present demo guidance as medical diagnosis or individualized treatment.
- Do not invent local services, inventory, eligibility rules, phone numbers, or operating hours.
- Every published guidance item must show its review status and source links.
- Unsupported questions must use the explicit fallback state.
- Keep “visual concept” language visible until content owners approve a production release.

## Verification

Run `npm run gate` after changes. For visible changes, also run Playwright and inspect desktop and mobile screenshots.

## Git

Do not commit, push, or deploy unless Leon explicitly asks.

## Runtime and delivery
Start: npm run dev -- --host 127.0.0.1 --port <owned-port> --strictPort. Stop only the claimed process. No services are intentionally persistent. Use dev-lifecycle for all new servers, browsers and workers.
Complete gate: npm run gate plus npm run test:e2e and manual affected-flow acceptance. CodeRabbit is advisory; unavailable review requires independent final-diff review and passing gates.
Canonical project: Shimizu-Technology/flex-and-care. Integrate via PR to main. Publish only a reviewed prototype; sample status remains visible.
