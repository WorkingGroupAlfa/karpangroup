import { BookingForm } from '@/components/booking-form';
import { Card } from '@/components/ui/card';
import { siteConfig } from '@/lib/config';
import { getDictionary } from '@/lib/translations';
import { isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="section py-16">
      <span className="eyebrow">{dict.contact.eyebrow}</span>
      <h1 className="h1 max-w-3xl">{dict.contact.headline}</h1>
      <p className="p-muted mt-4 max-w-2xl">{dict.contact.text}</p>
      <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <h2 className="text-2xl font-semibold">{dict.contact.directTitle}</h2>
          <div className="mt-6 space-y-3 text-sm text-muted">
            <a className="block hover:text-graphite" href={siteConfig.whatsappUrl}>{dict.contact.whatsappLabel}</a>
            <a className="block hover:text-graphite" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            <p>{siteConfig.companyName}</p>
            <p>{siteConfig.address}</p>
            <p>{siteConfig.postalCode} {siteConfig.city}, {siteConfig.country}</p>
            <p>{dict.contact.legal}</p>
          </div>
        </Card>
        <BookingForm locale={locale} dict={dict} />
      </div>
    </div>
  );
}
