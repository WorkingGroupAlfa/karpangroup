import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { iconMap } from '@/components/icons';
import { services } from '@/lib/site';
import type { Dictionary } from '@/lib/translations';
import type { Locale } from '@/lib/i18n';

export function ServiceGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="section py-16">
      <span className="eyebrow">{dict.home.servicesTitle}</span>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="h2">{dict.servicesPage.headline}</h2>
          <p className="p-muted mt-3 max-w-2xl">{dict.home.servicesText}</p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap];
          const copy = dict.serviceCards[service.key as keyof typeof dict.serviceCards];
          return (
            <Link key={service.slug} href={`/${locale}/services/${service.slug}`}>
              <Card className="group h-full min-h-[220px] transition duration-300 hover:-translate-y-1 hover:border-electric/20">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-electric/15 bg-electric/10 text-electric">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{copy.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{copy.excerpt}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 text-muted transition group-hover:text-brand" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
