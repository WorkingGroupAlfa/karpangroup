import { ServiceGrid } from '@/components/service-grid';
import { getDictionary } from '@/lib/translations';
import { isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="py-10">
      <section className="section pt-6">
        <span className="eyebrow">{dict.servicesPage.eyebrow}</span>
        <h1 className="h1 max-w-3xl">{dict.servicesPage.headline}</h1>
        <p className="p-muted mt-4 max-w-2xl">{dict.servicesPage.text}</p>
      </section>
      <ServiceGrid locale={locale as Locale} dict={dict} />
    </div>
  );
}
