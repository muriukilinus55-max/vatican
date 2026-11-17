"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/config/locales";
import { sections } from "@/lib/navigation";
import { messages } from "@/i18n/messages";

export function MobileNavigation({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const copy = messages[locale];

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="border border-[#d9ded9] px-3 py-2 text-sm font-bold"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? copy.closeMenu : copy.menu}
      </button>
      {open ? (
        <nav
          id="mobile-navigation"
          aria-label={copy.mainNavigation}
          className="absolute left-0 right-0 top-full border-t border-[#d9ded9] bg-white px-5 py-4 shadow-lg"
        >
          <ul className="grid gap-1">
            {sections.map((item) => (
              <li key={item.slug}>
                <Link
                  className="block py-2.5 text-sm font-bold"
                  href={`/${locale}/${item.slug}`}
                  aria-current={pathname.startsWith(`/${locale}/${item.slug}`) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
