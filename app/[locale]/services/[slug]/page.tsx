import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookingForm } from '@/components/booking-form';
import { getDictionary } from '@/lib/translations';
import { isLocale, type Locale } from '@/lib/i18n';
import { services } from '@/lib/site';
import { siteConfig } from '@/lib/config';

const map = {
  'air-conditioner-installation': 'installation',
  'air-conditioner-cleaning': 'cleaning',
  'air-conditioner-service': 'service',
  'heating-systems': 'heating',
  'heat-pumps': 'heatPumps',
  'mar-control-systems': 'mar'
} as const;

export function generateStaticParams() {
  return ['sk', 'ua', 'de', 'sl', 'en'].flatMap((locale) => services.map((service) => ({ locale, slug: service.slug })));
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const key = map[slug as keyof typeof map];
  if (!key) notFound();

  const dict = await getDictionary(locale as Locale);
  const content = dict.servicePages[key];

  return (
    <div className="py-10">
      <section className="section pt-6">
        <span className="eyebrow">{dict.serviceCards[key].title}</span>
        <h1 className="h1 max-w-3xl">{content.title}</h1>
        <p className="p-muted mt-5 max-w-3xl">{content.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={siteConfig.whatsappUrl}>{dict.cta.whatsapp}</Button>
          <Button href={`mailto:${siteConfig.contactEmail}`} variant="secondary">{dict.cta.email}</Button>
          <Button href={`/${locale}/contact`} variant="ghost">{dict.cta.booking}</Button>
        </div>
      </section>
      <section className="section grid gap-5 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <div className="space-y-5 text-base leading-8 text-muted">
            {content.body.map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
          </div>
        </Card>
        <BookingForm locale={locale} dict={dict} />
      </section>
    </div>
  );
}
