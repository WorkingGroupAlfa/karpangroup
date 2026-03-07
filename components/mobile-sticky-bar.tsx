'use client';

import { Mail, MessageCircleMore, CalendarDays } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import type { Dictionary } from '@/lib/translations';

export function MobileStickyBar({ locale, dict }: { locale: string; dict: Dictionary }) {
  const items = [
    { href: siteConfig.whatsappUrl, label: dict.cta.whatsapp, icon: MessageCircleMore },
    { href: `mailto:${siteConfig.contactEmail}`, label: dict.cta.email, icon: Mail },
    { href: `/${locale}/contact`, label: dict.cta.booking, icon: CalendarDays }
  ];

  return (
    <div className="fixed inset-x-0 bottom-3 z-40 px-4 lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 rounded-[24px] border border-white/70 bg-white/85 p-2 shadow-soft backdrop-blur-xl">
        {items.map((item, index) => {
          const Icon = item.icon;
          return <a key={`${index}-${item.href}`} href={item.href} className="flex flex-col items-center gap-1 rounded-[18px] px-3 py-2 text-center text-[11px] font-medium text-graphite hover:bg-black/5"><Icon className="h-4 w-4" />{item.label}</a>;
        })}
      </div>
    </div>
  );
}
