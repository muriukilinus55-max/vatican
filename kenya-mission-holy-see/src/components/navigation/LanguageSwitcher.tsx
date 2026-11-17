"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { locales, localeNames, type Locale } from "@/config/locales";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const localizedPath = pathname.replace(/^\/(en|it|sw)(?=\/|$)/, `/${locale}`);

  useEffect(() => {
    document.cookie = `locale=${locale}; path=/; max-age=31536000; samesite=lax`;
    try {
      window.localStorage.setItem("preferredLocale", locale);
    } catch {
      // Storage is optional; the cookie remains sufficient.
    }
  }, [locale]);

  return (
    <nav aria-label="Language" className="flex items-center gap-1 text-xs">
      {locales.map((targetLocale) => (
        <Link
          key={targetLocale}
          href={localizedPath.replace(/^\/(en|it|sw)(?=\/|$)/, `/${targetLocale}`)}
          hrefLang={targetLocale}
          aria-current={targetLocale === locale ? "page" : undefined}
          className={`font-bold ${targetLocale === locale ? "text-[#bb0000]" : "text-[#445049]"}`}
        >
          {localeNames[targetLocale]}
        </Link>
      ))}
    </nav>
  );
}
