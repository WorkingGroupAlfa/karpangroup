import { Card } from '@/components/ui/card';
import { getDictionary } from '@/lib/translations';
import { isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="section py-16">
      <span className="eyebrow">{dict.about.eyebrow}</span>
      <h1 className="h1 max-w-3xl">{dict.about.headline}</h1>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {dict.about.body.map((paragraph, index) => (
          <Card key={`${index}-${paragraph}`}><p className="text-base leading-8 text-muted">{paragraph}</p></Card>
        ))}
      </div>
    </div>
  );
}
