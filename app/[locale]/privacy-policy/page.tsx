import { siteConfig } from '@/lib/config';
import { getDictionary } from '@/lib/translations';
import { isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="section py-16">
      <h1 className="h1 max-w-3xl">{dict.meta.privacyTitle}</h1>
      <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-muted">
        <p>{dict.legal.privacyIntro}</p>
        <p>{dict.legal.privacyController}: {siteConfig.companyName}, {siteConfig.address}, {siteConfig.postalCode} {siteConfig.city}, {siteConfig.country}. {dict.legal.privacyContact}: {siteConfig.contactEmail}.</p>
        <p>{dict.legal.privacyBooking}</p>
        <p>{dict.legal.privacyAnalytics}</p>
        <p>{dict.legal.privacyRights}</p>
      </div>
    </div>
  );
}
