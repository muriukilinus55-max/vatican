import type { Locale } from "@/config/locales";

type Messages = {
  institution: string;
  missionName: string;
  skipToContent: string;
  mainNavigation: string;
  menu: string;
  closeMenu: string;
  language: string;
  contentPending: string;
  approvalNotice: string;
  homeTitle: string;
  homeDescription: string;
  notFoundTitle: string;
  notFoundDescription: string;
  backHome: string;
  privacy: string;
  accessibility: string;
  placeholderHeading: string;
};

export const messages: Record<Locale, Messages> = {
  en: {
    institution: "Republic of Kenya",
    missionName: "Embassy to the Holy See",
    skipToContent: "Skip to main content",
    mainNavigation: "Main navigation",
    menu: "Menu",
    closeMenu: "Close menu",
    language: "Language",
    contentPending: "Content awaiting institutional review and approval.",
    approvalNotice: "This page is a structured editorial placeholder.",
    homeTitle: "Kenya–Holy See Diplomatic Mission",
    homeDescription: "Institutional representation and diplomatic engagement.",
    notFoundTitle: "Page not found",
    notFoundDescription: "The requested page could not be found.",
    backHome: "Return to the homepage",
    privacy: "Privacy",
    accessibility: "Accessibility",
    placeholderHeading: "Content to be confirmed",
  },
  it: {
    institution: "Repubblica del Kenya",
    missionName: "Missione presso la Santa Sede",
    skipToContent: "Vai al contenuto principale",
    mainNavigation: "Navigazione principale",
    menu: "Menu",
    closeMenu: "Chiudi menu",
    language: "Lingua",
    contentPending: "Contenuto in attesa di revisione e approvazione istituzionale.",
    approvalNotice: "Questa pagina è un segnaposto editoriale strutturato.",
    homeTitle: "Missione diplomatica Kenya–Santa Sede",
    homeDescription: "Rappresentanza istituzionale e attività diplomatica.",
    notFoundTitle: "Pagina non trovata",
    notFoundDescription: "La pagina richiesta non è stata trovata.",
    backHome: "Torna alla pagina iniziale",
    privacy: "Privacy",
    accessibility: "Accessibilità",
    placeholderHeading: "Contenuto da confermare",
  },
  sw: {
    institution: "Jamhuri ya Kenya",
    missionName: "Ujumbe nchini Vatican",
    skipToContent: "Ruka hadi kwenye yaliyomo",
    mainNavigation: "Urambazaji kuu",
    menu: "Menyu",
    closeMenu: "Funga menyu",
    language: "Lugha",
    contentPending: "Maudhui yanangojea ukaguzi na uthibitisho wa taasisi.",
    approvalNotice: "Ukurasa huu ni kiashiria cha redaksheni kilichopangwa.",
    homeTitle: "Ujumbe wa Kidiplomasia wa Kenya–Holy See",
    homeDescription: "Uwakilishi wa kitaasisi na ushirikiano wa kidiplomasia.",
    notFoundTitle: "Ukurasa haupatikani",
    notFoundDescription: "Ukurasa uliyoomba haupatikani.",
    backHome: "Rudi kwenye ukurasa wa mwanzo",
    privacy: "Faragha",
    accessibility: "Ufikiaji",
    placeholderHeading: "Maudhui ya kuthibitishwa",
  },
};
