import Link from "next/link";
import type { Locale } from "@/config/locales";
import { ContentContainer } from "@/components/layout/ContentContainer";

const copy = {
  en: {
    heroEyebrow: "Diplomatic mission",
    heroTitle: "Kenya–Holy See relations",
    heroText: "Institutional representation and constructive international cooperation.",
    about: "About the Mission",
    ambassador: "Ambassadorial Welcome",
    ambassadorName: "Ambassador — name to be confirmed",
    ambassadorText: "Official welcome message awaiting institutional approval.",
    priorities: "Diplomatic priorities",
    leadership: "National Leadership",
    president: "H.E. Dr. William Samoei Ruto",
    presidentTitle: "President of the Republic of Kenya",
    portraitPending: "Official portrait pending approved asset",
    relations: "A New Chapter in Kenya–Holy See Relations",
    relationsText: "A framework for presenting verified historical milestones and future diplomatic engagements.",
    cooperation: "Cooperation Priorities",
    engagements: "Selected Official Engagements",
    engagementText: "No events are listed until authentic photographs and verified details are approved.",
  },
  it: {
    heroEyebrow: "Missione diplomatica",
    heroTitle: "Relazioni Kenya–Santa Sede",
    heroText: "Rappresentanza istituzionale e cooperazione internazionale costruttiva.",
    about: "Informazioni sulla Missione",
    ambassador: "Messaggio dell'Ambasciatore",
    ambassadorName: "Ambasciatore — nome da confermare",
    ambassadorText: "Messaggio ufficiale in attesa di approvazione istituzionale.",
    priorities: "Priorità diplomatiche",
    leadership: "Leadership nazionale",
    president: "S.E. Dott. William Samoei Ruto",
    presidentTitle: "Presidente della Repubblica del Kenya",
    portraitPending: "Ritratto ufficiale in attesa dell'immagine approvata",
    relations: "Un nuovo capitolo nelle relazioni Kenya–Santa Sede",
    relationsText: "Struttura per presentare tappe storiche verificate e futuri incontri diplomatici.",
    cooperation: "Priorità di cooperazione",
    engagements: "Impegni ufficiali selezionati",
    engagementText: "Nessun evento viene pubblicato finché fotografie autentiche e dettagli verificati non sono approvati.",
  },
  sw: {
    heroEyebrow: "Ujumbe wa kidiplomasia",
    heroTitle: "Mahusiano ya Kenya–Holy See",
    heroText: "Uwakilishi wa kitaasisi na ushirikiano wa kimataifa wenye tija.",
    about: "Kuhusu Ujumbe",
    ambassador: "Ujumbe wa Balozi",
    ambassadorName: "Balozi — jina linangoja kuthibitishwa",
    ambassadorText: "Ujumbe rasmi unangojea uthibitisho wa kitaasisi.",
    priorities: "Vipaumbele vya kidiplomasia",
    leadership: "Uongozi wa Kitaifa",
    president: "Mhe. Dkt. William Samoei Ruto",
    presidentTitle: "Rais wa Jamhuri ya Kenya",
    portraitPending: "Picha rasmi inangojea taswira iliyoidhinishwa",
    relations: "Sura Mpya ya Mahusiano ya Kenya–Holy See",
    relationsText: "Mfumo wa kuonyesha matukio ya kihistoria yaliothibitishwa na mikutano ya kidiplomasia yajayo.",
    cooperation: "Vipaumbele vya Ushirikiano",
    engagements: "Mikutano Rasmi Iliyochaguliwa",
    engagementText: "Hakuna tukio litakaloonyeshwa hadi picha halisi na maelezo yaliyothibitishwa yaidhinishwe.",
  },
};

export function NationalIdentityStrip() {
  return (
    <div className="national-identity-strip" aria-hidden="true">
      <span /><span /><span /><span />
    </div>
  );
}

export function HeroSection({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <section className="hero-section" aria-labelledby="home-hero-title">
      <div className="hero-architecture" aria-hidden="true">
        <div className="hero-architecture__line" />
      </div>
      <ContentContainer>
        <div className="hero-content">
          <p className="hero-eyebrow">{text.heroEyebrow}</p>
          <h1 id="home-hero-title">{text.heroTitle}</h1>
          <p className="hero-lead">{text.heroText}</p>
          <Link className="institution-button" href={`/${locale}/about`}>{text.about}</Link>
        </div>
      </ContentContainer>
    </section>
  );
}

export function AmbassadorWelcome({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <section className="editorial-section" aria-labelledby="ambassador-heading">
      <ContentContainer>
        <div className="ambassador-grid">
          <div className="portrait-slot portrait-slot--ambassador">
            <span>Ambassador portrait</span>
            <small>{text.portraitPending}</small>
          </div>
          <div className="ambassador-copy">
            <p className="section-kicker">{text.ambassador}</p>
            <h2 id="ambassador-heading">{text.ambassadorName}</h2>
            <p className="section-lead">{text.ambassadorText}</p>
            <h3>{text.priorities}</h3>
            <p>{text.ambassadorText}</p>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}

export function NationalLeadership({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <section className="leadership-section" aria-labelledby="leadership-heading">
      <ContentContainer>
        <div className="leadership-grid">
          <div>
            <p className="section-kicker section-kicker--light">{text.leadership}</p>
            <h2 id="leadership-heading">{text.president}</h2>
            <p className="leadership-title">{text.presidentTitle}</p>
          </div>
          <div className="portrait-slot portrait-slot--president">
            <span>Official portrait</span>
            <small>{text.portraitPending}</small>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}

export function DiplomaticTimeline({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <section className="editorial-section" aria-labelledby="relations-heading">
      <ContentContainer>
        <div className="relations-grid">
          <div>
            <p className="section-kicker">Kenya — Holy See</p>
            <h2 id="relations-heading">{text.relations}</h2>
            <p className="section-lead">{text.relationsText}</p>
          </div>
          <ol className="timeline" aria-label="Diplomatic timeline">
            <li>
              <span className="timeline-marker" aria-hidden="true" />
              <strong>{locale === "en" ? "Historical milestone" : locale === "it" ? "Tappa storica" : "Hatua ya kihistoria"}</strong>
              <span>{text.relationsText}</span>
            </li>
            <li>
              <span className="timeline-marker" aria-hidden="true" />
              <strong>{locale === "en" ? "Current cooperation" : locale === "it" ? "Cooperazione attuale" : "Ushirikiano wa sasa"}</strong>
              <span>{text.relationsText}</span>
            </li>
          </ol>
        </div>
      </ContentContainer>
    </section>
  );
}

export function CooperationPriorities({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const priorities = locale === "en"
    ? ["Peace and dialogue", "Humanitarian affairs", "Education", "Health", "Sustainable development", "International cooperation"]
    : locale === "it"
      ? ["Pace e dialogo", "Affari umanitari", "Istruzione", "Salute", "Sviluppo sostenibile", "Cooperazione internazionale"]
      : ["Amani na mazungumzo", "Masuala ya kibinadamu", "Elimu", "Afya", "Maendeleo endelevu", "Ushirikiano wa kimataifa"];

  return (
    <section className="cooperation-section" aria-labelledby="cooperation-heading">
      <ContentContainer>
        <p className="section-kicker">{text.priorities}</p>
        <h2 id="cooperation-heading">{text.cooperation}</h2>
        <div className="priority-grid">
          {priorities.map((priority, index) => (
            <article key={priority}>
              <span className="priority-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{priority}</h3>
            </article>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}

export function EngagementFeature({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <section className="editorial-section" aria-labelledby="engagements-heading">
      <ContentContainer>
        <p className="section-kicker">Official programme</p>
        <h2 id="engagements-heading">{text.engagements}</h2>
        <div className="engagement-placeholder">
          <div className="engagement-placeholder__image" aria-hidden="true">
            <span>Approved photograph slot</span>
          </div>
          <div className="engagement-placeholder__copy">
            <p>{text.engagementText}</p>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}

export function PublishingPreviews({ locale }: { locale: Locale }) {
  const text = {
    en: {
      news: "Latest news",
      newsEmpty: "No approved news or official statements are currently published.",
      events: "Upcoming events",
      eventsEmpty: "No verified upcoming events are currently published.",
      publications: "Publications",
      publicationsEmpty: "No approved institutional publications are currently available.",
    },
    it: {
      news: "Ultime notizie",
      newsEmpty: "Nessuna notizia o dichiarazione approvata è pubblicata.",
      events: "Prossimi eventi",
      eventsEmpty: "Nessun evento verificato è pubblicato.",
      publications: "Pubblicazioni",
      publicationsEmpty: "Nessuna pubblicazione istituzionale approvata è disponibile.",
    },
    sw: {
      news: "Habari za hivi karibuni",
      newsEmpty: "Hakuna habari au taarifa rasmi zilizoidhinishwa.",
      events: "Matukio yajayo",
      eventsEmpty: "Hakuna matukio yaliyothibitishwa yaliyochapishwa.",
      publications: "Machapisho",
      publicationsEmpty: "Hakuna machapisho ya kitaasisi yaliyoidhinishwa.",
    },
  }[locale];

  return (
    <section className="editorial-section publishing-previews" aria-label={text.news}>
      <ContentContainer>
        <div className="institution-grid institution-grid--three">
          <article className="institution-panel">
            <p className="section-kicker">News and statements</p>
            <h2>{text.news}</h2>
            <p>{text.newsEmpty}</p>
            <Link className="institution-text-link" href={`/${locale}/news`}>{text.news}</Link>
          </article>
          <article className="institution-panel">
            <p className="section-kicker">Programme</p>
            <h2>{text.events}</h2>
            <p>{text.eventsEmpty}</p>
            <Link className="institution-text-link" href={`/${locale}/events`}>{text.events}</Link>
          </article>
          <article className="institution-panel">
            <p className="section-kicker">Library</p>
            <h2>{text.publications}</h2>
            <p>{text.publicationsEmpty}</p>
            <Link className="institution-text-link" href={`/${locale}/publications`}>{text.publications}</Link>
          </article>
        </div>
      </ContentContainer>
    </section>
  );
}
