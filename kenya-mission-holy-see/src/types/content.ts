import type { Locale } from "@/config/locales";

export type LocalizedText = Record<Locale, string>;

export type TranslationStatus =
  | "draft"
  | "awaiting_translation"
  | "awaiting_review"
  | "approved"
  | "published";

export type TranslationMetadata = {
  status: TranslationStatus;
  originalLocale: Locale;
  reviewer?: string;
  reviewDate?: string;
  publicationEligible: boolean;
};

export type BaseContent = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  source?: string;
  approved: boolean;
  translations?: Partial<Record<Locale, TranslationMetadata>>;
};

export type NewsArticle = BaseContent & {
  publicationDate?: string;
  category: LocalizedText;
  content: LocalizedText;
  featuredImage?: string;
  issuingInstitution?: LocalizedText;
};

export type OfficialStatement = BaseContent & {
  publicationDate?: string;
  issuedBy?: LocalizedText;
  content: LocalizedText;
};

export type DiplomaticEngagement = BaseContent & {
  date?: string;
  location?: LocalizedText;
  category: LocalizedText;
  participants?: LocalizedText[];
  featuredImage?: string;
};

export type Event = BaseContent & {
  date?: string;
  time?: string;
  location?: LocalizedText;
  status: "upcoming" | "past" | "to_be_confirmed";
  featuredImage?: string;
};

export type Publication = BaseContent & {
  publicationDate?: string;
  category: LocalizedText;
  language: Locale[];
  format?: "PDF" | "DOC" | "HTML";
  fileSize?: string;
  downloadUrl?: string;
  issuingInstitution: LocalizedText;
};

export type MediaItem = BaseContent & {
  image: string;
  date?: string;
  location?: LocalizedText;
  photographer?: string;
  copyright?: string;
  category: LocalizedText;
};

export type TimelineMilestone = BaseContent & {
  date?: string;
  optionalImage?: string;
};

export type CooperationPriority = BaseContent & {
  points: LocalizedText[];
};

export type AmbassadorProfile = BaseContent & {
  name?: LocalizedText;
  diplomaticTitle: LocalizedText;
  welcomeMessage: LocalizedText;
  priorities: LocalizedText[];
};

export type CountryProfile = BaseContent & {
  overview: LocalizedText;
  capital?: LocalizedText;
  officialLanguages?: LocalizedText[];
};
