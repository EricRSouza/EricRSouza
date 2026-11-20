/**
 * Visitor consent for the tags loaded through Google Tag Manager.
 *
 * The site never talks to GA4, Clarity or ad platforms directly: it sets Google Consent Mode v2,
 * loads the GTM container and pushes `dataLayer` values that GTM turns into tags (see `gtm/README.md`).
 * Everything starts denied; the visitor's choice is kept in localStorage under `storageKey`.
 */

/** GTM container ID. Empty disables GTM, the consent banner and the cookie-settings link. */
export const gtmId = 'GTM-PTCLG76';

export const storageKey = 'consent.v1';

/** Two purposes, matching the banner: analytics (GA4, Clarity) and marketing (Ads, Meta, LinkedIn). */
export interface Choice {
  analytics: boolean;
  ads: boolean;
}

type Signal = 'granted' | 'denied';
const signal = (on: boolean): Signal => (on ? 'granted' : 'denied');

/** Google Consent Mode v2 fields for a choice. */
export function googleConsent(choice: Choice) {
  return {
    analytics_storage: signal(choice.analytics),
    ad_storage: signal(choice.ads),
    ad_user_data: signal(choice.ads),
    ad_personalization: signal(choice.ads),
  };
}

/** `dataLayer` values GTM reads for tags without built-in Consent Mode (Clarity, later Meta and LinkedIn). */
export function layerConsent(choice: Choice) {
  return { consent_analytics: signal(choice.analytics), consent_ads: signal(choice.ads) };
}

/** Reads a stored choice; anything malformed counts as no choice, so the banner shows again. */
export function parseChoice(raw: string | null): Choice | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== 'object' || value === null) return null;
    const { analytics, ads } = value as Record<string, unknown>;
    return typeof analytics === 'boolean' && typeof ads === 'boolean' ? { analytics, ads } : null;
  } catch {
    return null;
  }
}
