import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/config/locales";
import { messages } from "@/i18n/messages";
import {
  AmbassadorWelcome,
  CooperationPriorities,
  DiplomaticTimeline,
  EngagementFeature,
  HeroSection,
  NationalIdentityStrip,
  NationalLeadership,
  PublishingPreviews,
} from "@/components/home/HomeSections";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: messages[locale].homeTitle,
    description: messages[locale].homeDescription,
  };
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main id="main-content" className="flex-1">
      <NationalIdentityStrip />
      <HeroSection locale={locale} />
      <AmbassadorWelcome locale={locale} />
      <NationalLeadership locale={locale} />
      <DiplomaticTimeline locale={locale} />
      <CooperationPriorities locale={locale} />
      <EngagementFeature locale={locale} />
      <PublishingPreviews locale={locale} />
    </main>
  );
}
