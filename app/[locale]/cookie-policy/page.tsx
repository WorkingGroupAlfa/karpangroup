import { getDictionary } from '@/lib/translations';
import { isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default async function CookiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="section py-16">
      <h1 className="h1 max-w-3xl">{dict.meta.cookieTitle}</h1>
      <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-muted">
        <p>{dict.legal.cookieIntro}</p>
        <p>{dict.legal.cookieEssential}</p>
        <p>{dict.legal.cookieAnalytics}</p>
        <p>{dict.legal.cookieChoice}</p>
      </div>
    </div>
  );
}
