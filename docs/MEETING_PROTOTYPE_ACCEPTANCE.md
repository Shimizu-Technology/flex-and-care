# Meeting prototype acceptance

October 13, 2026. Owner/executor: Codex. Baseline imported as ba2a813 from the unversioned sandbox. User authorized changes, PR, review, merge, deployment and care.shimizu-technology.com. WhatsApp remains unsent.

## Purpose and scope
Guam family caregivers supporting someone with dementia or Alzheimer’s, plus Mrs. Therese and prospective content partners evaluating the idea. Sources: three private call transcripts and August 28 proposal in Brain Dump; private source material is not copied into this repository. The demo is sample content, not an approved health service. No AI, accounts, forum, case records, real publishing or submitted feedback.

## Required journeys
| Case | Starting point and expected outcome | Coverage |
| --- | --- | --- |
| A1 | Suggested supply topic opens sample guidance and references with pending-review disclosure | Desktop/phone |
| A2 | Free-text agitation search preserves original text; user chooses article; back allows editing | Desktop/phone |
| A3 | Synthetic cannot-breathe and cardiac-arrest searches show human help, no unrelated answer | Desktop/phone |
| A4 | Unsupported search has honest empty state, no stored question, resource recovery | Desktop/phone |
| A5 | Dementia + new diagnosis + planning yields starting steps, contacts, top-of-page result and reset | Desktop/phone |
| A6 | Immediate urgency overrides transportation/equipment with safety contacts | Desktop/phone |
| A7 | Directory filters and details remain usable | Desktop/phone |
| A8 | Public team mockup identifies itself; sample approval labels do not claim partner signoff | Desktop/phone |
| A9 | Urgent modal keyboard focus is contained, Escape closes, focus returns | Desktop keyboard |
| A10 | Deployed brand, assets, HTTPS, release commit and primary-domain behavior verified | Public release |

No actual phone calls, submissions or personal fixtures. Physical mobile keyboard/touch, native/PWA behavior, professional accuracy approval and print export are excluded from this meeting prototype acceptance.

## Execution
Local gate passed under Node 24.19.0: lint, types, 14 unit tests and build. Production dependency audit: zero vulnerabilities. Automated browser acceptance: 22 passed across Chromium desktop and WebKit iPhone-size emulation. Initial WebKit execution was blocked by a missing browser binary; installed the matching runtime and reran successfully.

A1–A8 passed in desktop and mobile browser automation. Additional computer-use checks confirmed explicit urgent wording, article choice, pending-review labels, and the new diagnosis plan. Phone-sized result opens at the top with a short heading and visible steps. A9 passed manually: Shift-Tab/Tab stay in the modal, Escape closes it and returns focus to the opener. No calls or messages were sent.

Independent review first found two issues (equivalent explicit danger phrases and ambiguous diagnosis label); both corrected and re-reviewed with no material findings. CodeRabbit/CI status and release head are recorded in the PR.

A10 remains blocked: Netlify dashboard is restricted for overdue billing; user has been asked to restore it. Do not change DNS until the domain is assigned and reviewed release is available.
