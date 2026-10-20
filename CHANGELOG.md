# ORIA | Longevity & Wellness Resort — change log

Two separate websites, built from one shared design system (same CSS, components, fonts and imagery), each with its own pages, navigation, copy and calls to action.

| | Marketing Website | Operator Website |
|---|---|---|
| Folder | ORIA_Marketing_Website | ORIA_Operator_Website |
| Audience | Future guests and the public | Wellness brands and resort operators |
| Pages | 5 | 9 |
| Status | Private until public launch is approved | Private — authorised access only |

## Access and privacy (both sites)
- **Added** `middleware.js` — Vercel Routing Middleware that puts the whole site behind a username and password. Set `ORIA_USER` and `ORIA_PASS` in Vercel → Project → Settings → Environment Variables. If they are not set, every request is refused. Nothing confidential is stored in the code.
- **Added** `robots.txt` (Disallow all) and a `noindex, nofollow, noarchive` meta tag on every page.
- **Changed** each site now ships only its own translations. The marketing pages no longer carry operator strings in their page source.
- **To do at launch:** remove the middleware, robots.txt and the noindex tag from the marketing site only.

## Marketing Website — new
**Added: five pages.** Home · About ORIA · The Destination · Wellness Experience · Contact. All five are in English and Arabic, with right-to-left layout and mobile layouts.
- **Home:** the scroll film with the brief's headline, supporting text and "Discover ORIA". Then "Water. Heat. Time.", the three pillars, "A Sanctuary Shaped by Nature", a five-image wellness gallery and the closing statement.
- **About ORIA:** "The Philosophy of ORIA", the meaning of the name (ōra / aura), Water · Heat · Time, "More Than a Spa" and the vision.
- **The Destination:** "A Destination Within the Desert", the location, the masterplan you can drag, "From Desert to Water", "Stone. Light. Water. Shadow." and a day/night section.
- **Wellness Experience:** "A World of Wellness", the Great Thermae, the thermal ritual, seven thermal experiences, "Beyond Bathing", the Longevity Kitchen, "Space to Slow Down", the Children's Wellness Garden and the closing section.
- **Contact:** Full name, email, enquiry type and message, a consent checkbox, verified contact details and "A Development by El Alfy Holding".

**Excluded on purpose:**
- Operator and partnership content.
- Commercial figures and revenue lines.
- Residences sales content.
- Booking functions and opening dates.
- Security systems.
- The World Record attempt, until its public wording is approved.
- Facility sizes and capacities.

## Operator Website
- **Added** a ninth page, *Feasibility* ("Can it work"), with content from the operator presentation: the two water scenarios, water discipline, heat recovery, clinical governance and site safety, the seven risks, and the six unknowns with what closes each.
- **Moved** Governance and site safety from Destination to Feasibility, so the content isn't repeated.
- **Retained** every other page and section.

## Both sites
- **Changed** ORIA is always shown with "Longevity & Wellness Resort": header, page transitions, loading screen, footer, titles and copyright.
- **Changed** the credit now reads "Developed by OP Labs by Overpowered". The icon and the text both link to https://www.overpoweredagency.co.uk/index.html.
- **Changed** the hero film is the new video. It is used byte for byte, with no re-encode. The film's headlines are timed to its shots.

## Flagged for review: not found in the catalog (ORIA_Catalog_EN_v12)
1. **"Approximately 25 km inland"** — not in the catalog. The site says only "set well back from the shoreline", which the catalog does state. The catalog also lists a second location under evaluation (the inland water corridor, West Cairo / Giza side). Confirm the North Coast-only wording before launch.
2. **ōra / aura** — the catalog doesn't state where the name comes from. The meanings used are the standard Latin ones (ōra: shore, edge; aura: air, atmosphere). Please confirm.
3. **Children's Wellness Garden image** — there is no approved image of it. A garden image stands in until one is supplied.
4. **Steam Rooms and Hot Springs images** — the closest approved images are used. Please confirm or supply dedicated ones.
5. **El Alfy Holding link** — no verified website address was supplied, so the developer logo isn't linked yet.
