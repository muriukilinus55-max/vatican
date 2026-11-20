import type { Locale } from "@/config/locales";

export type NavigationItem = {
  slug: string;
  label: Record<Locale, string>;
};

export const sections: NavigationItem[] = [
  { slug: "about", label: { en: "About", it: "Chi siamo", sw: "Kutuhusu" } },
  { slug: "ambassador", label: { en: "Ambassador", it: "Ambasciatore", sw: "Balozi" } },
  { slug: "relations", label: { en: "Relations", it: "Relazioni", sw: "Mahusiano" } },
  { slug: "engagements", label: { en: "Engagements", it: "Impegni", sw: "Mikutano" } },
  { slug: "kenya", label: { en: "Kenya", it: "Kenya", sw: "Kenya" } },
  { slug: "cooperation", label: { en: "Cooperation", it: "Cooperazione", sw: "Ushirikiano" } },
  { slug: "news", label: { en: "News", it: "Notizie", sw: "Habari" } },
  { slug: "events", label: { en: "Events", it: "Eventi", sw: "Matukio" } },
  { slug: "publications", label: { en: "Publications", it: "Pubblicazioni", sw: "Machapisho" } },
  { slug: "media", label: { en: "Media", it: "Media", sw: "Vyombo vya habari" } },
  { slug: "contact", label: { en: "Contact", it: "Contatti", sw: "Mawasiliano" } },
];

export const institutionalPages = ["privacy", "accessibility"];
