import { Hero } from '@/components/hero';
import { ServiceGrid } from '@/components/service-grid';
import { FeatureList } from '@/components/feature-list';
import { ProcessSection } from '@/components/process-section';
import { ContactCta } from '@/components/contact-cta';
import { BookingForm } from '@/components/booking-form';
import { Card } from '@/components/ui/card';
import { getDictionary } from '@/lib/translations';
import { isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <ServiceGrid locale={locale as Locale} dict={dict} />
      <section className="section grid gap-5 py-16 lg:grid-cols-2">
        <FeatureList title={dict.home.whyTitle} items={dict.home.whyItems} />
        <FeatureList title={dict.home.expertiseTitle} items={dict.home.expertiseItems} />
      </section>
      <ProcessSection dict={dict} />
      <section className="section py-16">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <span className="eyebrow">{dict.home.aboutTitle}</span>
            <p className="text-lg leading-8 text-muted">{dict.home.aboutText}</p>
          </Card>
          <div id="booking">
            <BookingForm locale={locale} dict={dict} />
          </div>
        </div>
      </section>
      <ContactCta locale={locale} dict={dict} />
    </>
  );
}
