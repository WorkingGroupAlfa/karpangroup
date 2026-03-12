import { Logo } from '@/components/logo';
import { siteConfig } from '@/lib/config';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/translations';

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-line py-12">
      <div className="section grid gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo locale={locale} />
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">{dict.footer.tagline}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-graphite/70">{dict.footer.contactTitle}</h3>
          <div className="mt-4 space-y-2 text-sm text-muted">
            <a href={siteConfig.whatsappUrl} className="block hover:text-graphite">WhatsApp</a>
            <a href={`mailto:${siteConfig.contactEmail}`} className="block hover:text-graphite">{siteConfig.contactEmail}</a>
            <p>{siteConfig.city}, {siteConfig.country}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-graphite/70">{dict.footer.legalTitle}</h3>
          <div className="mt-4 space-y-2 text-sm text-muted">
            <a href={`/${locale}/privacy-policy`} className="block hover:text-graphite">{dict.nav.privacy}</a>
            <a href={`/${locale}/cookie-policy`} className="block hover:text-graphite">{dict.nav.cookies}</a>
            <a href={`/${locale}/admin/stats`} className="block hover:text-graphite">{dict.nav.admin}</a>
          </div>
        </div>
      </div>
      <div className="section mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {siteConfig.companyName}. {dict.footer.rights}</p>
        <div className="flex gap-3">
          <a href={`/sk`}>SK8</a>
          <a href={`/en`}>EN</a>
          <a href={`/de`}>DE</a>
          <a href={`/ua`}>UA</a>
        </div>
      </div>
    </footer>
  );
}
