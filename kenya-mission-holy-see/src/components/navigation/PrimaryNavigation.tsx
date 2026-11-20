"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/config/locales";
import { sections } from "@/lib/navigation";
import { messages } from "@/i18n/messages";

export function PrimaryNavigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return (
    <nav aria-label={messages[locale].mainNavigation} className="hidden md:block">
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {sections.map((item) => (
          <li key={item.slug}>
            <Link
              className={`text-[13px] font-bold uppercase tracking-[0.05em] hover:text-[#006b3c] ${pathname.startsWith(`/${locale}/${item.slug}`) ? "border-b-2 border-[#bb0000] pb-1" : ""}`}
              href={`/${locale}/${item.slug}`}
              aria-current={pathname.startsWith(`/${locale}/${item.slug}`) ? "page" : undefined}
            >
              {item.label[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
