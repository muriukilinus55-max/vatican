import Link from "next/link";
import type { Locale } from "@/config/locales";
import { messages } from "@/i18n/messages";
import { getDictionary } from "@/i18n/get-dictionary";
import { sections } from "@/lib/navigation";
import { ContentContainer } from "./ContentContainer";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const dictionary = getDictionary(locale);

  return (
    <footer className="institution-footer mt-auto text-white">
      <div className="national-identity-strip" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <ContentContainer>
        <div className="grid gap-8 py-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="footer-brand">
              <div className="official-brand-slot official-brand-slot--footer" role="img" aria-label="Official Kenya branding pending approval">
                <span>KE</span>
              </div>
              <div>
                <p className="m-0 font-bold">{copy.institution}</p>
                <p className="m-0 mt-1 text-xs font-bold uppercase tracking-[0.12em]">{dictionary.designation}</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm text-[#dce5df]">
              {copy.contentPending}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <nav aria-label={copy.mainNavigation}>
              <h2 className="footer-heading">{dictionary.mission}</h2>
              <ul className="footer-links">
                {sections.filter((item) => ["about", "ambassador", "relations", "contact"].includes(item.slug)).map((item) => (
                  <li key={item.slug}><Link href={`/${locale}/${item.slug}`}>{item.label[locale]}</Link></li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Information">
              <h2 className="footer-heading">{dictionary.information}</h2>
              <ul className="footer-links">
                <li><Link href={`/${locale}/privacy`}>{copy.privacy}</Link></li>
                <li><Link href={`/${locale}/accessibility`}>{copy.accessibility}</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </ContentContainer>
    </footer>
  );
}
