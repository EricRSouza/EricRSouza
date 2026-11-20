import test from 'node:test';
import assert from 'node:assert/strict';
import { googleConsent, layerConsent, parseChoice } from '../src/consent.ts';

test('analytics-only consent keeps every ad signal denied', () => {
  const choice = { analytics: true, ads: false };
  assert.deepEqual(googleConsent(choice), {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  assert.deepEqual(layerConsent(choice), { consent_analytics: 'granted', consent_ads: 'denied' });
});

test('stored choice round-trips; anything malformed shows the banner again', () => {
  assert.deepEqual(parseChoice(JSON.stringify({ analytics: false, ads: true })), { analytics: false, ads: true });
  for (const raw of [null, '', 'not json', 'null', '"yes"', '{"analytics":"true","ads":false}', '{"analytics":true}']) {
    assert.equal(parseChoice(raw), null, String(raw));
  }
});
