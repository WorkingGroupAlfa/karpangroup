import { NextRequest, NextResponse } from 'next/server';
import { readAnalytics, writeAnalytics } from '@/lib/storage';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const analytics = await readAnalytics();
  const type = String(body.type || 'unknown');
  const visitorId = String(body.visitorId || 'anonymous');
  const locale = String(body.locale || 'unknown');
  const path = String(body.path || '/');
  const source = String(body.source || 'direct');
  const device = String(body.device || 'unknown');
  const cta = String(body.cta || 'unknown');

  if (type === 'page_view') {
    analytics.visits += 1;
    analytics.pageViews += 1;
    if (!analytics.uniqueVisitors.includes(visitorId)) analytics.uniqueVisitors.push(visitorId);
    analytics.pageHits[path] = (analytics.pageHits[path] || 0) + 1;
    analytics.languages[locale] = (analytics.languages[locale] || 0) + 1;
    analytics.trafficSources[source] = (analytics.trafficSources[source] || 0) + 1;
    analytics.devices[device] = (analytics.devices[device] || 0) + 1;
  }

  if (type === 'cta_click') {
    analytics.ctaClicks[cta] = (analytics.ctaClicks[cta] || 0) + 1;
  }

  analytics.events.unshift({ type, path, locale, source, device, at: new Date().toISOString() });
  analytics.events = analytics.events.slice(0, 500);
  await writeAnalytics(analytics);
  return NextResponse.json({ ok: true });
}
