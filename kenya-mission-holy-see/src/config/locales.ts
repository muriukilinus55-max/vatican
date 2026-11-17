export const locales = ["en", "it", "sw"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  sw: "Kiswahili",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
