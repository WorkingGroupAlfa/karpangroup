import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { siteConfig } from '@/lib/config';
import { getAllPageSlugs } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllPageSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${siteConfig.siteUrl}/${locale}${slug === '/' ? '' : slug}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${siteConfig.siteUrl}/${alt}${slug === '/' ? '' : slug}`])
        )
      }
    }))
  );
}
