export const services = [
  { slug: 'air-conditioner-installation', icon: 'Snowflake', key: 'installation' },
  { slug: 'air-conditioner-cleaning', icon: 'Sparkles', key: 'cleaning' },
  { slug: 'air-conditioner-service', icon: 'Wrench', key: 'service' },
  { slug: 'heating-systems', icon: 'Flame', key: 'heating' },
  { slug: 'heat-pumps', icon: 'Fan', key: 'heatPumps' },
  { slug: 'mar-control-systems', icon: 'Cpu', key: 'mar' }
] as const;

export const staticPages = ['/', '/services', '/about', '/contact', '/privacy-policy', '/cookie-policy', '/admin/stats'];

export function getAllPageSlugs() {
  return [...staticPages, ...services.map((item) => `/services/${item.slug}`)];
}
