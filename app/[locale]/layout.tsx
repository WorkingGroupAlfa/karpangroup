import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ConsentBanner } from '@/components/consent-banner';
import { MobileStickyBar } from '@/components/mobile-sticky-bar';
import { AnalyticsProvider } from '@/components/analytics-provider';
import { getDictionary } from '@/lib/translations';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/config';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((item) => [item, `/${item}`]))
    },
    openGraph: {
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      url: `${siteConfig.siteUrl}/${locale}`,
      siteName: siteConfig.companyName,
      locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription
    }
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <AnalyticsProvider locale={locale} />
      <Header locale={locale as Locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={locale as Locale} dict={dict} />
      <ConsentBanner locale={locale as Locale} dict={dict} />
      <MobileStickyBar locale={locale} dict={dict} />
    </>
  );
}
