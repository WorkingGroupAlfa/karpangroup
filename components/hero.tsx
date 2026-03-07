'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Dictionary } from '@/lib/translations';
import { siteConfig } from '@/lib/config';

export function Hero({ locale, dict }: { locale: string; dict: Dictionary }) {
  return (
    <section className="section grid gap-10 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-16">
      <div>
        <span className="eyebrow">{dict.home.eyebrow}</span>
        <h1 className="h1 max-w-3xl">{dict.home.headline}</h1>
        <p className="p-muted mt-6 max-w-2xl">{dict.home.subheadline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={siteConfig.whatsappUrl}>{dict.cta.whatsapp}</Button>
          <Button href={`mailto:${siteConfig.contactEmail}`} variant="secondary">{dict.cta.email}</Button>
          <Button href={`/${locale}/contact`} variant="ghost">{dict.cta.booking}</Button>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="relative overflow-hidden p-0">
          <div className="grid min-h-[420px] bg-grid bg-[size:28px_28px] p-8 sm:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-electric/10 via-white/20 to-brand/5" />
            <div className="relative grid content-between gap-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">{dict.home.heroBadge}</p>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-muted">{dict.home.heroDescription}</p>
                </div>
                <div className="h-16 w-16 rounded-[22px] border border-white/60 bg-white/70 shadow-soft backdrop-blur" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/60 bg-graphite p-6 text-white shadow-soft">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">{dict.home.heroCoreFocusLabel}</p>
                  <p className="mt-3 text-xl font-medium">{dict.home.heroCoreFocusText}</p>
                </div>
                <div className="rounded-[24px] border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">{dict.home.heroLeadPathLabel}</p>
                  <p className="mt-3 text-xl font-medium">{dict.home.heroLeadPathText}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
