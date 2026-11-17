import type {
  CooperationPriority,
  DiplomaticEngagement,
  Event,
  NewsArticle,
  Publication,
  TimelineMilestone,
} from "@/types/content";

export const newsArticles: NewsArticle[] = [];
export const diplomaticEngagements: DiplomaticEngagement[] = [];
export const events: Event[] = [];
export const publications: Publication[] = [];

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: "relations-1965",
    title: {
      en: "Historical diplomatic relationship",
      it: "Rapporto diplomatico storico",
      sw: "Uhusiano wa kihistoria wa kidiplomasia",
    },
    description: {
      en: "Any 1965 establishment-date claim is pending verification against an authoritative Kenyan government source.",
      it: "Qualsiasi riferimento al 1965 è in attesa di verifica presso una fonte autorevole del governo keniano.",
      sw: "Taarifa yoyote ya mwaka 1965 inasubiri uthibitishaji kutoka chanzo rasmi cha serikali ya Kenya.",
    },
    approved: false,
    translations: {
      en: { status: "draft", originalLocale: "en", publicationEligible: false },
      it: { status: "awaiting_translation", originalLocale: "en", publicationEligible: false },
      sw: { status: "awaiting_translation", originalLocale: "en", publicationEligible: false },
    },
  },
];

export const cooperationPriorities: CooperationPriority[] = [
  {
    id: "peace",
    title: { en: "Peace and dialogue", it: "Pace e dialogo", sw: "Amani na mazungumzo" },
    description: { en: "Areas of potential peaceful and diplomatic engagement.", it: "Ambiti di possibile impegno pacifico e diplomatico.", sw: "Maeneo ya ushirikiano wa amani na kidiplomasia." },
    points: [],
    approved: false,
  },
];
