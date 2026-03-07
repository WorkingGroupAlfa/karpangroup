'use client';

import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Logo } from '@/components/logo';
import { siteConfig } from '@/lib/config';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/translations';

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-bg/80 backdrop-blur-xl">
      <div className="section flex h-20 items-center justify-between gap-4">
        <Logo locale={locale} />
        <nav className="hidden items-center gap-6 lg:flex">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-muted transition hover:text-graphite">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher locale={locale} pathname={pathname} />
          <Button href={siteConfig.whatsappUrl} variant="secondary">{dict.cta.whatsapp}</Button>
          <Button href={`mailto:${siteConfig.contactEmail}`}>{dict.cta.email}</Button>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="rounded-full border border-line bg-white/80 p-3 lg:hidden" aria-label={dict.nav.menu}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="section pb-4 lg:hidden">
          <div className="glass space-y-3 rounded-[28px] p-4">
            {items.map((item) => <a key={item.href} href={item.href} className="block rounded-2xl px-3 py-2 text-sm hover:bg-black/5">{item.label}</a>)}
            <LanguageSwitcher locale={locale} pathname={pathname} />
            <div className="flex flex-col gap-2 pt-2">
              <Button href={siteConfig.whatsappUrl} variant="secondary">{dict.cta.whatsapp}</Button>
              <Button href={`mailto:${siteConfig.contactEmail}`}>{dict.cta.email}</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
