import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/config/locales";
import { messages } from "@/i18n/messages";
import { institutionalPages, sections } from "@/lib/navigation";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { timelineMilestones } from "@/content/institutional";
import { getDictionary } from "@/i18n/get-dictionary";

const validSections = new Set([...sections.map((item) => item.slug), ...institutionalPages]);

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    [...sections.map((item) => item.slug), ...institutionalPages].map((section) => ({
      locale,
      section: [section],
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string[] }>;
}): Promise<Metadata> {
  const { locale, section } = await params;
  if (!isLocale(locale) || section.length !== 1 || !validSections.has(section[0])) return {};
  const sectionSlug = section[0];
  const item = sections.find((entry) => entry.slug === sectionSlug);
  const title = item?.label[locale] ?? (sectionSlug === "privacy" ? messages[locale].privacy : messages[locale].accessibility);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const canonical = siteUrl ? `${siteUrl}/${locale}/${sectionSlug}` : `/${locale}/${sectionSlug}`;
  const languages = Object.fromEntries(
    locales.map((itemLocale) => [
      itemLocale,
      siteUrl ? `${siteUrl}/${itemLocale}/${sectionSlug}` : `/${itemLocale}/${sectionSlug}`,
    ]),
  );
  return {
    title,
    description: `${title} — ${messages[locale].institution}`,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": siteUrl ? `${siteUrl}/en/${sectionSlug}` : `/en/${sectionSlug}` },
    },
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ locale: string; section: string[] }>;
}) {
  const { locale, section } = await params;
  if (!isLocale(locale) || section.length !== 1 || !validSections.has(section[0])) notFound();
  const slug = section[0];
  const item = sections.find((entry) => entry.slug === slug);
  const title =
    item?.label[locale] ??
    (slug === "privacy" ? messages[locale].privacy : messages[locale].accessibility);
  const copy = messages[locale];
  const dictionary = getDictionary(locale);

  const renderPageContent = () => {
    if (slug === "about") {
      const items = locale === "it"
        ? ["Scopo istituzionale", "Dialogo politico e diplomatico", "Valori", "Dignità umana", "Peace and dialogue"]
        : locale === "sw"
          ? ["Lengo la taasisi", "Mazungumzo ya kisiasa na kidiplomasia", "Maadili", "Heshima ya binadamu", "Amani"]
          : ["Institutional purpose", "Political and diplomatic dialogue", "Institutional values", "Mutual respect", "Peace and cooperation"];
      return (
        <div className="institution-grid">
          {items.map((item) => (
            <article className="institution-panel" key={item}>
              <h2>{item}</h2>
              <p>{copy.contentPending}</p>
            </article>
          ))}
        </div>
      );
    }

    if (slug === "ambassador") {
      return (
        <div className="ambassador-grid">
          <div className="portrait-slot"><span>{locale === "it" ? "Ritratto dell'Ambasciatore" : locale === "sw" ? "Picha ya Balozi" : "Ambassador portrait"}</span><small>{copy.contentPending}</small></div>
          <div className="ambassador-copy">
            <p className="section-kicker">{locale === "it" ? "Messaggio istituzionale" : locale === "sw" ? "Ujumbe wa kitaasisi" : "Institutional welcome"}</p>
            <h2>{locale === "it" ? "Nome da confermare" : locale === "sw" ? "Jina linangoja kuthibitishwa" : "Name to be confirmed"}</h2>
            <p className="section-lead">{copy.contentPending}</p>
            <h3>{locale === "it" ? "Priorità diplomatiche" : locale === "sw" ? "Vipaumbele vya kidiplomasia" : "Diplomatic priorities"}</h3>
            <p>{copy.contentPending}</p>
          </div>
        </div>
      );
    }

    if (slug === "relations") {
      return (
        <div className="relations-grid">
          <div>
            <p className="section-lead">{copy.contentPending}</p>
            <h2>{locale === "it" ? "Sviluppi diplomatici" : locale === "sw" ? "Maendeleo ya kidiplomasia" : "Diplomatic developments"}</h2>
            <p>{copy.contentPending}</p>
          </div>
          <ol className="timeline" aria-label="Diplomatic timeline">
            {timelineMilestones.map((milestone) => (
              <li key={milestone.id}>
                <span className="timeline-marker" aria-hidden="true" />
                <strong>{milestone.title[locale]}</strong>
                <span>{milestone.description[locale]}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    }

    if (slug === "cooperation") {
      const priorities = locale === "en"
        ? ["Peace and dialogue", "Humanitarian affairs", "Education", "Health", "Sustainable development", "Cultural and people-to-people relations"]
        : locale === "it"
          ? ["Pace e dialogo", "Affari umanitari", "Istruzione", "Salute", "Sviluppo sostenibile", "Relazioni culturali e interpersonali"]
          : ["Amani na mazungumzo", "Masuala ya kibinadamu", "Elimu", "Afya", "Maendeleo endelevu", "Mahusiano ya kitamaduni na baina ya watu"];
      return (
        <div className="institution-grid institution-grid--three">
          {priorities.map((item) => (
            <article className="institution-panel" key={item}>
              <h2>{item}</h2>
              <p>{copy.contentPending}</p>
            </article>
          ))}
        </div>
      );
    }

    if (slug === "kenya") {
      const items = locale === "it"
        ? ["Panoramica", "Geografia", "Popolazione e cultura", "Sviluppo e innovazione", "Identità nazionale"]
        : locale === "sw"
          ? ["Muhtasari", "Jiografia", "Watu na utamaduni", "Maendeleo na uvumbuzi", "Utambulisho wa kitaifa"]
          : ["Country overview", "Geography and environment", "People and culture", "Development and innovation", "National identity"];
      return (
        <div className="institution-grid institution-grid--three">
          {items.map((item) => (
            <article className="institution-panel" key={item}>
              <h2>{item}</h2>
              <p>{copy.contentPending}</p>
            </article>
          ))}
        </div>
      );
    }

    if (slug === "news") {
      return (
        <div className="empty-state" role="status">
          <h2>{dictionary.noApprovedNews}</h2>
          <p>{copy.contentPending}</p>
        </div>
      );
    }

    if (slug === "engagements") {
      return (
        <div className="empty-state" role="status">
          <h2>{dictionary.noVerifiedEngagements}</h2>
          <p>{copy.contentPending}</p>
        </div>
      );
    }

    if (slug === "events") {
      return (
        <div className="empty-state" role="status">
          <h2>{dictionary.noOfficialEvents}</h2>
          <p>{copy.contentPending}</p>
        </div>
      );
    }

    if (slug === "publications") {
      return (
        <div className="empty-state" role="status">
          <h2>{dictionary.noApprovedPublications}</h2>
          <p>{copy.contentPending}</p>
        </div>
      );
    }

    if (slug === "media") {
      return (
        <div className="empty-state" role="status">
          <h2>{dictionary.noApprovedMedia}</h2>
          <p>{copy.contentPending}</p>
        </div>
      );
    }

    if (slug === "contact") {
      const contactSections =
        locale === "it"
          ? ["Consultazioni generali", "Corrispondenza ufficiale", "Richieste dei media"]
          : locale === "sw"
            ? ["Maswali ya jumla", "Barua rasmi", "Maswali ya vyombo vya habari"]
            : ["General enquiries", "Official correspondence", "Media enquiries"];
      return (
        <div className="institution-grid institution-grid--three">
          {contactSections.map((item) => (
            <article className="institution-panel" key={item}>
              <h2>{item}</h2>
              <p>{copy.contentPending}</p>
            </article>
          ))}
        </div>
      );
    }

    if (slug === "privacy") {
      return (
        <div className="institution-panel">
          <p className="section-kicker">{dictionary.draftLegalReview}</p>
          <p>{copy.contentPending}</p>
        </div>
      );
    }

    if (slug === "accessibility") {
      return (
        <div className="institution-panel">
          <p>{dictionary.accessibilityDraft}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <main id="main-content" className="flex-1">
      <PageHeader title={title} description={copy.approvalNotice} />
      <ContentContainer>
        <Breadcrumbs locale={locale} items={[{ label: title }]} />
        <section className="pb-14" aria-labelledby="section-content">
          {renderPageContent() ?? (
            <>
              <SectionHeading><span id="section-content">{copy.placeholderHeading}</span></SectionHeading>
              <p className="mt-5 max-w-3xl leading-7 text-[#59665f]">{copy.contentPending}</p>
            </>
          )}
        </section>
      </ContentContainer>
    </main>
  );
}
