import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/config/locales";
import { messages } from "@/i18n/messages";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = messages[locale];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const alternates = Object.fromEntries(
    locales.map((item) => [item, siteUrl ? `${siteUrl}/${item}` : `/${item}`]),
  );
  return {
    title: copy.homeTitle,
    description: copy.homeDescription,
    openGraph: {
      title: copy.homeTitle,
      description: copy.homeDescription,
      locale: locale === "en" ? "en_GB" : locale === "it" ? "it_IT" : "sw_KE",
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => item === "en" ? "en_GB" : item === "it" ? "it_IT" : "sw_KE"),
      type: "website",
      ...(siteUrl ? { url: `${siteUrl}/${locale}` } : {}),
    },
    alternates: { canonical: siteUrl ? `${siteUrl}/${locale}` : `/${locale}`, languages: { ...alternates, "x-default": siteUrl ? `${siteUrl}/en` : "/en" } },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = messages[locale];

  return (
    <div className="flex min-h-screen flex-col">
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
        }}
      />
      <a className="skip-link" href="#main-content">{copy.skipToContent}</a>
      <SiteHeader locale={locale as Locale} />
      {children}
      <SiteFooter locale={locale as Locale} />
    </div>
  );
}
