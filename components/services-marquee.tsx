import de from '@/content/locales/de.json';
import en from '@/content/locales/en.json';
import sk from '@/content/locales/sk.json';
import ua from '@/content/locales/ua.json';
import type { Locale } from '@/lib/i18n';
import { services } from '@/lib/site';

const dictionaries = { ua, de, sk, en };

type ServiceKey = (typeof services)[number]['key'];

function getServiceTitles(locale: Locale) {
  return services.map((service) => dictionaries[locale].serviceCards[service.key as ServiceKey].title);
}

export function ServicesMarquee({ locale }: { locale: Locale }) {
  const titles = getServiceTitles(locale);

  return (
    <section className="section pb-8">
      <div className="services-marquee glass rounded-[24px] py-3">
        <div className="services-marquee-track">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="services-marquee-group" aria-hidden={idx === 1}>
              {titles.map((title, index) => (
                <span key={`${idx}-${index}-${title}`} className="services-marquee-item">
                  {title}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
