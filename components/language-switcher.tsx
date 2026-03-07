import Link from 'next/link';
import { locales, type Locale } from '@/lib/i18n';

export function LanguageSwitcher({ locale, pathname }: { locale: Locale; pathname: string }) {
  const clean = pathname.replace(/^\/(sk|ua|de|sl|en)/, '') || '';
  return (
    <div className="flex items-center gap-1 rounded-full border border-line bg-white/70 p-1 backdrop-blur">
      {locales.map((item) => (
        <Link
          key={item}
          href={`/${item}${clean}`}
          className={`rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] transition ${item === locale ? 'bg-graphite text-white' : 'text-muted hover:text-graphite'}`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
