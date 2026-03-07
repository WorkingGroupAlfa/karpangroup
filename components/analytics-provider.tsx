'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export function AnalyticsProvider({ locale }: { locale: string }) {
  const pathname = usePathname();

  useEffect(() => {
    const source = document.referrer ? new URL(document.referrer).hostname : 'direct';
    const device = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
    trackEvent({ type: 'page_view', path: pathname, locale, source, device });
  }, [pathname, locale]);

  useEffect(() => {
    function handler(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest('[data-track-cta]') as HTMLElement | null;
      if (!trigger) return;
      trackEvent({ type: 'cta_click', cta: trigger.dataset.trackCta, path: pathname, locale });
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [pathname, locale]);

  return null;
}
