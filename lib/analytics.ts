'use client';

const CONSENT_KEY = 'karpan_consent_analytics';
const VISITOR_KEY = 'karpan_visitor_id';

export function hasAnalyticsConsent() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(CONSENT_KEY) === 'granted';
}

export function setAnalyticsConsent(value: 'granted' | 'denied') {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new Event('karpan-consent-change'));
}

function getVisitorId() {
  if (typeof window === 'undefined') return 'server';
  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;
  const next = crypto.randomUUID();
  window.localStorage.setItem(VISITOR_KEY, next);
  return next;
}

export async function trackEvent(payload: Record<string, unknown>) {
  if (!hasAnalyticsConsent()) return;
  await fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, visitorId: getVisitorId() })
  }).catch(() => null);
}
