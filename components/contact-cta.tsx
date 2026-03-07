import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config';
import type { Dictionary } from '@/lib/translations';

export function ContactCta({ locale, dict }: { locale: string; dict: Dictionary }) {
  return (
    <section className="section py-16">
      <div className="overflow-hidden rounded-[34px] border border-line bg-graphite p-8 text-white shadow-soft sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">{dict.contact.eyebrow}</p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="h2 max-w-2xl text-white">{dict.contact.headline}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">{dict.contact.text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={siteConfig.whatsappUrl} variant="secondary" className="border-white/15 bg-white/10 text-white hover:bg-white/15">{dict.cta.whatsapp}</Button>
            <Button href={`mailto:${siteConfig.contactEmail}`} className="bg-brand text-white hover:bg-[#e97317]">{dict.cta.email}</Button>
            <Button href={`/${locale}/contact`} variant="ghost" className="text-white hover:bg-white/10">{dict.cta.booking}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
