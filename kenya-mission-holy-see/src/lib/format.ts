import type { Locale } from "@/config/locales";

export const localeIdentifiers: Record<Locale, string> = {
  en: "en-GB",
  it: "it-IT",
  sw: "sw-KE",
};

export function formatDate(
  value: string | Date,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = { dateStyle: "long" },
) {
  return new Intl.DateTimeFormat(localeIdentifiers[locale], options).format(
    typeof value === "string" ? new Date(`${value}T12:00:00`) : value,
  );
}

export function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(localeIdentifiers[locale]).format(value);
}
