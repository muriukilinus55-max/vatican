import Link from "next/link";
import type { Locale } from "@/config/locales";
import { messages } from "@/i18n/messages";
import { ContentContainer } from "./ContentContainer";
import { PrimaryNavigation } from "@/components/navigation/PrimaryNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { NationalIdentityStrip } from "@/components/home/HomeSections";
import { getDictionary } from "@/i18n/get-dictionary";

export function SiteHeader({
  locale,
}: {
  locale: Locale;
}) {
  const copy = messages[locale];
  const dictionary = getDictionary(locale);

  return (
    <header className="relative border-b border-[#d9ded9] bg-white">
      <NationalIdentityStrip />
      <ContentContainer>
        <div className="flex min-h-24 items-center justify-between gap-5 py-4">
          <Link href={`/${locale}`} className="flex min-w-0 items-center gap-3 no-underline">
            <div className="official-brand-slot" role="img" aria-label={locale === "it" ? "Marchio ufficiale del Kenya in attesa di approvazione" : locale === "sw" ? "Nembo rasmi ya Kenya inasubiri uthibitisho" : "Official Kenya branding pending approval"}>
              <span>KE</span>
              <span className="official-brand-slot__label">BRANDING</span>
            </div>
            <div>
              <p className="institution-name">{copy.institution}</p>
              <p className="mission-name">{dictionary.designation}</p>
            </div>
          </Link>
          <div className="hidden items-end gap-5 lg:flex">
            <LanguageSwitcher locale={locale} />
          </div>
          <MobileNavigation locale={locale} />
        </div>
        <div className="border-t border-[#edf0ed] py-3">
          <div className="flex items-center justify-between">
            <PrimaryNavigation locale={locale} />
            <div className="lg:hidden">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        </div>
      </ContentContainer>
    </header>
  );
}
