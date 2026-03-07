'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { hasAnalyticsConsent, setAnalyticsConsent } from '@/lib/analytics';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/translations';

export function ConsentBanner({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const current = localStorage.getItem('karpan_consent_analytics');
    setVisible(!current);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="section">
        <div className="glass flex flex-col gap-4 rounded-[28px] p-5 shadow-soft lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold">{dict.consent.title}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{dict.consent.text} <Link href={`/${locale}/cookie-policy`} className="text-electric underline underline-offset-4">{dict.consent.manage}</Link></p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setAnalyticsConsent('denied'); setVisible(false); }} className="rounded-full border border-line px-4 py-2 text-sm font-medium">{dict.consent.decline}</button>
            <button onClick={() => { setAnalyticsConsent('granted'); setVisible(false); }} className="rounded-full bg-graphite px-4 py-2 text-sm font-medium text-white">{dict.consent.accept}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
