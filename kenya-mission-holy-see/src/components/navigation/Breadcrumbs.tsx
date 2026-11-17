import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/config/locales";

export function Breadcrumbs({
  locale,
  items,
}: {
  locale: Locale;
  items: { label: string; href?: string }[];
}) {
  const dictionary = getDictionary(locale);
  const homeLabel = dictionary.home;
  return (
    <nav aria-label={locale === "it" ? "Percorso" : locale === "sw" ? "Njia" : "Breadcrumb"} className="py-4 text-sm">
      <ol className="m-0 flex flex-wrap gap-2 p-0" style={{ listStyle: "none" }}>
        <li><Link href={`/${locale}`}>{homeLabel}</Link></li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="before:mr-2 before:content-['/']">
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
