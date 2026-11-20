# Google Tag Manager

The site only loads GTM (`src/components/Tracking.astro`). GA4, Clarity and, later, ad tags live in the container. `container.json` is the starting container, ready to import.

## What the site sends

| dataLayer | When | Used by |
| --- | --- | --- |
| Consent Mode v2 `default` (all denied) and `update` | Before GTM loads, and when the visitor chooses | Google tags (GA4, Ads), automatically |
| `consent_analytics`, `consent_ads` (`granted`/`denied`) | Before GTM loads | Tags without Consent Mode: Clarity, later Meta and LinkedIn |
| `consent_update` event (same two values) | Visitor saves a choice | Re-firing those tags |
| `contact_click` with `method` (`email`, `linkedin`, `github`) | Contact link clicked | GA4 event; mark as key event |
| `feed_filter` with `filter_type`, `filter_value` | Lab filter chip clicked | GA4 event |

New tracked links only need `data-track="<event>"` and `data-track-<param>` attributes; add the event to the "Event - site events" trigger regex and the parameter to the GA4 event tag.

## First setup

1. Create a GTM web container for `ericramos.com.br`, a GA4 property (web stream on `https://ericramos.com.br`) and a Clarity project.
2. GTM → Admin → Import container → `container.json`, workspace "Default", option **Merge** → "Rename conflicting".
3. Variables: set **GA4 Measurement ID** (`G-…`) and **Clarity Project ID**.
4. Admin → Container settings → enable **Consent overview**. In the consent overview, mark Clarity tags as needing no extra consent (they read `consent_*` themselves).
5. Preview with Tag Assistant, then Submit → Publish.
6. Put the container ID (`GTM-…`) in `gtmId` in `src/consent.ts` and deploy.
7. GA4 → Admin → Events: mark `contact_click` as a key event. Register `method`, `filter_type` and `filter_value` as event-scoped custom dimensions.
8. Clarity → Settings → Setup: link the GA4 property (optional, lets you filter replays by GA4 segments).

## Adding an ad platform later

- **Google Ads:** use the built-in Conversion Tracking tag; Consent Mode handles it.
- **Meta Pixel, LinkedIn Insight:** add the template tag, then under Advanced settings → Consent settings require `ad_storage`, and fire on "All Pages" plus "Event - consent_update" with tag firing option "Once per page". Use the "Event - site events" trigger for conversions.
- Update the privacy notice (`src/components/PrivacyPage.astro`) when a new platform goes live.
