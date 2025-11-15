# NJ Dreamers Hub – Project Overview

This single-page bilingual experience guides undocumented and DACA students in New Jersey toward college access, financial aid, family support, and career pathways. The build runs on the existing React + TypeScript + Vite stack with Tailwind utility classes for styling.

## What’s Included
- **Hero & Language Toggle:** English/Spanish views share a unified hero that now explains how DACA recipients and NJ Dreamers overlap and differ.
- **Financial Aid Section:** Updated with Garden State Guarantee details plus state, national, and private scholarship resources tailored to NJ Dreamers.
- **Dreamer-Friendly Colleges:** Expanded roster featuring Rutgers, Montclair, NJCU, Stockton, Saint Peter’s, Rowan, William Paterson, and NJIT with refreshed links and concise support descriptions (enrollment counts removed per request).
- **Family Support:** Combined info-night guidance and calendar callout, backed by the embedded workshop schedule component.
- **Community & Trade Programs / Careers:** Maintained Morris County program lineup and high-growth career cards while removing outdated employer note.
- **Citations:** Dedicated APA-style references block covering every resource cited in the page.

## Key Files
- `src/App.tsx` – Holds bilingual content, section components, workshop calendar, and the new citations section.
- `public/assets` & `src/assets` – Contain background imagery and scholarship PDF already linked in content.

## Run & Build
- Install dependencies once: `npm install`
- Local preview: `npm run dev`
- Production build: `npm run build`

## Next Ideas
- Bind the workshop calendar to live data once backend endpoints are ready.
- Add more visual assets (hero photography, section illustrations) if brand approves.
- Surface contact info or chat support for campus allies in the Dreamer-friendly colleges list.
