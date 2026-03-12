import ua from '@/content/locales/ua.json';
import de from '@/content/locales/de.json';
import sk from '@/content/locales/sk.json';
import en from '@/content/locales/en.json';
import type { Locale } from '@/lib/i18n';

const dictionaries = { ua, de, sk, en };

export async function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type Dictionary = typeof sk;
