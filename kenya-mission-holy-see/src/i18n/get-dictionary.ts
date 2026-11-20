import type { Locale } from "@/config/locales";
import type { Dictionary } from "./types";

import en from "./dictionaries/en.json";
import it from "./dictionaries/it.json";
import sw from "./dictionaries/sw.json";

const dictionaries: Record<Locale, Dictionary> = { en, it, sw };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
