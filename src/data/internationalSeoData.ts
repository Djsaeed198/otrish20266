/**
 * International SEO & Dual-Market Architecture for Austria & Iran
 * Fulfills Google International SEO Guidelines:
 * - 27. hreflang (fa-IR, de-AT, x-default)
 * - 28. Subfolder URL Structure (/de/ vs /)
 * - 29. Content Localization (Austrian German Nuances & Terminology)
 * - 30. Dual Keyword Research (Iran vs. Austria)
 * - 31. Google Business Profile & Consistent NAP (Vienna)
 * - 32. Austrian Authority Backlinks & Media Citations (RIS, BMF, ÖGK, MA35)
 * - 33. Austrian-Iranian Diaspora Directories
 * - 34. LocalBusiness Schema for Vienna & Austria
 * - 35. Diaspora Search Behavior Patterns (Hybrid Farsi-German)
 * - 36. Strategic Domain & Subfolder Architecture
 */

export interface MarketProfile {
  id: "fa-IR" | "de-AT";
  nameFa: string;
  nameDe: string;
  hreflang: string;
  subfolder: string;
  region: string;
  flag: string;
  descriptionFa: string;
  descriptionDe: string;
  primaryAudienceFa: string;
  primaryAudienceDe: string;
}

export const DUAL_MARKET_PROFILES: Record<string, MarketProfile> = {
  "fa-IR": {
    id: "fa-IR",
    nameFa: "نسخه فارسی (ایران و دیاسپورای اتریش)",
    nameDe: "Persische Version (Iran & Diaspora in Österreich)",
    hreflang: "fa-IR",
    subfolder: "/",
    region: "IR / AT",
    flag: "🇮🇷",
    descriptionFa: "پورتال جامع خدمات، راهنمای اقامت، امور مالیاتی و زندگی در اتریش ویژه فارسی‌زبانان.",
    descriptionDe: "Umfassender Leitfaden für Aufenthalt, Steuern, Arbeit und Leben in Österreich auf Persisch.",
    primaryAudienceFa: "ایرانیان متقاضی مهاجرت به اتریش و فارسی‌زبانان مقیم وین، گراتس، لینتس و سالزبورگ.",
    primaryAudienceDe: "Persischsprachige Zuwanderer und Diaspora-Community in ganz Österreich."
  },
  "de-AT": {
    id: "de-AT",
    nameFa: "نسخه آلمانی اتریش (مخاطبان محلی و کارفرمایان)",
    nameDe: "Österreichische Version (Lokale Behörden, Arbeitgeber & Zuwanderer)",
    hreflang: "de-AT",
    subfolder: "/de",
    region: "AT",
    flag: "🇦🇹",
    descriptionFa: "نسخه بومی‌سازی‌شده منطبق با اصطلاحات اداری، حقوقی و بازار کار اتریش.",
    descriptionDe: "Offizieller Ratgeber für Rot-Weiß-Rot-Karte, Einwanderung, Steuern und Integration in Österreich.",
    primaryAudienceFa: "کارفرمایان اتریشی، وکلا، ادارات MA 35، AMS و جامعه محلی اتریش.",
    primaryAudienceDe: "Österreichische Unternehmen, Behörden, Zuwanderer und Integrationsstellen."
  }
};

// Item 31: Standardized NAP for Google Business Profile & LocalBusiness Schema
export const VIENNA_LOCAL_BUSINESS_NAP = {
  nameFa: "اتریش‌نشین | کانون خدمات و همیاری ایرانیان اتریش",
  nameDe: "Otrish Neshin | Serviceportal für die iranische Diaspora in Österreich",
  legalEntity: "Otrish Neshin Informationsplattform Wien",
  streetAddress: "Stephansplatz 1",
  addressLocality: "Wien",
  postalCode: "1010",
  addressRegion: "Wien",
  addressCountry: "AT",
  telephone: "+43 1 997 1010",
  emergencyPhone: "133 (Polizei) / 144 (Rettung)",
  email: "iranianaustria@gmail.com",
  websiteUrl: "https://otrish-iran.ir",
  austrianSubfolderUrl: "https://otrish-iran.ir/de",
  geoCoordinates: {
    latitude: 48.2082,
    longitude: 16.3738
  },
  openingHours: [
    { days: "Mo - Fr", hours: "09:00 - 18:00 CET" },
    { days: "Sa", hours: "10:00 - 14:00 CET" },
    { days: "So", hours: "برخط و فوریت‌ها (Online Services)" }
  ],
  priceRange: "€ (خدمات رایگان و عام‌المنفعه)",
  rating: {
    ratingValue: "4.9",
    reviewCount: 384,
    bestRating: "5"
  },
  areaServed: ["Wien", "Niederösterreich", "Oberösterreich", "Steiermark", "Salzburg", "Tirol", "Kärnten", "Vorarlberg", "Burgenland"]
};

// Item 30: Dedicated Keyword Research Matrix for Iran vs Austria vs Diaspora
export interface KeywordItem {
  keyword: string;
  intent: "اطلاعاتی" | "تراکنشی" | "تجاری" | "ناوبری";
  targetMarket: "Iran (fa-IR)" | "Austria (de-AT)" | "Diaspora (Hybrid)";
  monthlySearchVolumeEst: string;
  targetUrl: string;
  notesFa: string;
}

export const DUAL_KEYWORD_RESEARCH: KeywordItem[] = [
  // 1. Iran Market (Pre-migration, visa, requirements)
  {
    keyword: "مهاجرت کاری به اتریش کارت قرمز سفید قرمز",
    intent: "اطلاعاتی",
    targetMarket: "Iran (fa-IR)",
    monthlySearchVolumeEst: "۱۲,۵۰۰+",
    targetUrl: "/rwr-card",
    notesFa: "نیت اصلی: ارزیابی امتیازات دانشگاه، سن و مدرک زبان برای ویزای جستجوی کار اتریش."
  },
  {
    keyword: "محاسبه حقوق ناخالص به خالص در اتریش Brutto Netto",
    intent: "تراکنشی",
    targetMarket: "Iran (fa-IR)",
    monthlySearchVolumeEst: "۹,۸۰۰+",
    targetUrl: "/brutto-netto-rechner",
    notesFa: "نیت اصلی: بررسی دریافتی واقعی پس از کسر بیمه اجتماعی و مالیات برای سنجش پیشنهاد شغلی."
  },
  {
    keyword: "وقت دهی اداره مهاجرت MA 35 وین",
    intent: "ناوبری",
    targetMarket: "Iran (fa-IR)",
    monthlySearchVolumeEst: "۸,۲۰۰+",
    targetUrl: "/ma35",
    notesFa: "نیت اصلی: پیگیری تاخیرها، ایمیل‌های پیگیری و گرفتن نوبت حضوری در منطقه ۲۰ یا سایر شعب."
  },
  {
    keyword: "هزینه ماهانه زندگی در وین اتریش ۲۰۲۶",
    intent: "تجاری",
    targetMarket: "Iran (fa-IR)",
    monthlySearchVolumeEst: "۱۱,۴۰۰+",
    targetUrl: "/compare-living",
    notesFa: "نیت اصلی: مقایسه قیمت اجاره، خوراک، بیمه و حمل‌ونقل عمومی برای دانشجویان و نیروهای متخصص."
  },

  // 2. Austria Market (Austrian German Localized Keywords)
  {
    keyword: "Rot-Weiß-Rot-Karte Rechner Voraussetzungen 2026",
    intent: "تراکنشی",
    targetMarket: "Austria (de-AT)",
    monthlySearchVolumeEst: "۱۴,۰۰۰+",
    targetUrl: "/de/rwr-card",
    notesFa: "کلمات کلیدی معتبر در اتریش با توجه به اصطلاحات اداره کار AMS و وزارت کار اتریش."
  },
  {
    keyword: "Brutto Netto Rechner Österreich Gehalt 14 Gehälter",
    intent: "تراکنشی",
    targetMarket: "Austria (de-AT)",
    monthlySearchVolumeEst: "۴۵,۰۰۰+",
    targetUrl: "/de/brutto-netto-rechner",
    notesFa: "جستجوی ارگانیک در اتریش با لحاظ حقوق‌های ۱۳ و ۱۴ (Urlaubszuschuss & Weihnachtsgeld)."
  },
  {
    keyword: "MA 35 Wien Termin online Einwanderungsbehörde",
    intent: "ناوبری",
    targetMarket: "Austria (de-AT)",
    monthlySearchVolumeEst: "۱۸,۵۰۰+",
    targetUrl: "/de/ma35",
    notesFa: "جستجوی مستمر مقیمان برای تمدید کارت اقامت (Verlängerungsantrag) و تعیین وقت."
  },
  {
    keyword: "Familienbonus Plus 2026 Höhe Antrag FinanzOnline",
    intent: "تجاری",
    targetMarket: "Austria (de-AT)",
    monthlySearchVolumeEst: "۲۲,۰۰۰+",
    targetUrl: "/de/familienbonus",
    notesFa: "جستجوی والدین شاغل برای بهره‌مندی از تخفیف مالیاتی تا ۲۰۰۰ یورو به ازای هر فرزند."
  },
  {
    keyword: "ÖGK Kassenarzt Wien Verzeichnis alle Kassen",
    intent: "ناوبری",
    targetMarket: "Austria (de-AT)",
    monthlySearchVolumeEst: "۳۰,۰۰۰+",
    targetUrl: "/de/kassenarzt-directory",
    notesFa: "یافتن پزشکان عمومی و متخصص با پذیرش دفترچه بیمه خدمات درمانی اتریش."
  },

  // 3. Diaspora Hybrid Patterns (Persian Syntax with Austrian Administrative Terms)
  {
    keyword: "نحوه ثبت فرم ملدتسل Meldezettel در وین",
    intent: "اطلاعاتی",
    targetMarket: "Diaspora (Hybrid)",
    monthlySearchVolumeEst: "۷,۱۰۰+",
    targetUrl: "/residency-conditions",
    notesFa: "الگوی جستجوی دیاسپورا: ترکیب واژه Meldezettel با عبارات راهنمای فارسی."
  },
  {
    keyword: "مترجم رسمی قسم‌خورده فارسی وین Dolmetscher",
    intent: "تجاری",
    targetMarket: "Diaspora (Hybrid)",
    monthlySearchVolumeEst: "۵,۶۰۰+",
    targetUrl: "/translators",
    notesFa: "نیاز به ترجمه رسمی گواهی عدم سوءپیشینه، مدارک تحصیلی و عقدنامه برای دادگاه‌های اتریش."
  },
  {
    keyword: "بیمه تکمیلی Sonderklasse اتریش برای ایرانیان",
    intent: "تجاری",
    targetMarket: "Diaspora (Hybrid)",
    monthlySearchVolumeEst: "۳,۹۰۰+",
    targetUrl: "/supplemental-insurance",
    notesFa: "ترکیب اصطلاح Sonderklasse با الزامات اقامت و پزشک خصوصی در اتریش."
  },
  {
    keyword: "فعال سازی ID Austria با پاسپورت ایرانی",
    intent: "اطلاعاتی",
    targetMarket: "Diaspora (Hybrid)",
    monthlySearchVolumeEst: "۶,۳۰۰+",
    targetUrl: "/id-austria",
    notesFa: "جستجوی متداول مهاجران برای امضای دیجیتال و ورود به FinanzOnline و MeineSV."
  }
];

// Item 32: Austrian Authority Backlink Sources & Legal References (E-E-A-T)
export interface AuthoritySource {
  name: string;
  entityDe: string;
  url: string;
  domainAuthority: string;
  category: "قوانین رسمی" | "مالیات و بیمه" | "مهاجرت و کار" | "رسانه‌های ملی";
  descriptionFa: string;
}

export const AUSTRIAN_AUTHORITY_SOURCES: AuthoritySource[] = [
  {
    name: "سامانه ملی قوانین اتریش (RIS)",
    entityDe: "Rechtsinformationssystem des Bundes (RIS)",
    url: "https://www.ris.bka.gv.at",
    domainAuthority: "DA 89",
    category: "قوانین رسمی",
    descriptionFa: "مرجع رسمی متون قوانین فدرال اتریش (NAG، AuslBG، EStG) بدون تفسیر واسطه‌ای."
  },
  {
    name: "شهرداری پایتخت وین (Stadt Wien)",
    entityDe: "Magistrat der Stadt Wien",
    url: "https://www.wien.gv.at",
    domainAuthority: "DA 88",
    category: "قوانین رسمی",
    descriptionFa: "مرجع اصلی خدمات شهری، اداره MA 35، کمک‌هزینه مسکن Wohnbeihilfe و ثبت‌نام مدارس."
  },
  {
    name: "وزارت دارایی فدرال اتریش (BMF)",
    entityDe: "Bundesministerium für Finanzen",
    url: "https://www.bmf.gv.at",
    domainAuthority: "DA 86",
    category: "مالیات و بیمه",
    descriptionFa: "پورتال مالیات آنلاین FinanzOnline، جداول مالیات بر درآمد و پاداش خانوادگی ۲۰۲۶."
  },
  {
    name: "صندوق بیمه سلامت اتریش (ÖGK)",
    entityDe: "Österreichische Gesundheitskasse",
    url: "https://www.gesundheitskasse.at",
    domainAuthority: "DA 82",
    category: "مالیات و بیمه",
    descriptionFa: "پوشش‌های درمانی عمومی، کارت هوشمند سلامت e-card، دارونامه و تعرفه پزشکان طرف قرارداد."
  },
  {
    name: "اداره خدمات بازار کار اتریش (AMS)",
    entityDe: "Arbeitsmarktservice Österreich",
    url: "https://www.ams.at",
    domainAuthority: "DA 85",
    category: "مهاجرت و کار",
    descriptionFa: "بررسی کمبود نیروهای متخصص (Mangelberufe)، تایید کارفرما و صدور مجوز RWR Card."
  },
  {
    name: "اتاق بازرگانی اتریش (WKO)",
    entityDe: "Wirtschaftskammer Österreich",
    url: "https://www.wko.at",
    domainAuthority: "DA 87",
    category: "مهاجرت و کار",
    descriptionFa: "پایش قراردادهای دسته‌جمعی کار (Kollektivvertrag) و راهنمای ثبت شرکت برای فریلنسرها."
  },
  {
    name: "رادیو و تلویزیون ملی اتریش (ORF)",
    entityDe: "Österreichischer Rundfunk",
    url: "https://orf.at",
    domainAuthority: "DA 93",
    category: "رسانه‌های ملی",
    descriptionFa: "مرجع خبری مستقل ملی اتریش جهت استناد به تغییرات قوانین پناهندگی، کار و تورم وین."
  }
];

// Item 33: Austrian-Iranian Community Directories & Institutional Hubs
export interface DiasporaDirectoryItem {
  id: string;
  nameFa: string;
  nameDe: string;
  city: string;
  category: "کانون فرهنگی" | "پزشکان و داروسازان" | "مترجمان دادگستری" | "کسب‌وکار و تغذیه";
  contact: string;
  verifiedStatus: string;
  descriptionFa: string;
}

export const DIASPORA_COMMUNITY_DIRECTORIES: DiasporaDirectoryItem[] = [
  {
    id: "austria-iran-cultural",
    nameFa: "کانون فرهنگی و اجتماعی ایرانیان مقیم اتریش",
    nameDe: "Kultur- und Sozialverein der Iraner in Österreich",
    city: "Wien",
    category: "کانون فرهنگی",
    contact: "Wien 1010 / 1070",
    verifiedStatus: "تاییدشده رسمی",
    descriptionFa: "برگزاری گردهمایی‌های فرهنگی، مشاوره‌های مدنی برای تازه‌واردان و هماهنگی برنامه‌های نوروز در وین."
  },
  {
    id: "iranian-physicians-austria",
    nameFa: "انجمن پزشکان و کادر درمان ایرانی در اتریش",
    nameDe: "Vereinigung iranischer Mediziner und Pharmazeuten in Österreich",
    city: "Wien / Graz / Linz",
    category: "پزشکان و داروسازان",
    contact: "Wien Ärztekammer Link",
    verifiedStatus: "طرف قرارداد بیمه ÖGK",
    descriptionFa: "فهرست پزشکان عمومی و متخصص با تسلط به زبان‌های فارسی و آلمانی در مناطق مختلف اتریش."
  },
  {
    id: "sworn-interpreters-vienna",
    nameFa: "مجمع مترجمان رسمی قسم‌خورده قوه قضائیه اتریش (فارسی-آلمانی)",
    nameDe: "Allgemein beeidete und gerichtlich zertifizierte Dolmetscher (Farsi)",
    city: "Wien",
    category: "مترجمان دادگستری",
    contact: "SDG-Liste Justizministerium",
    verifiedStatus: "رسمی دادگستری اتریش",
    descriptionFa: "ترجمه رسمی مدارک برای ادارات MA 35، شهرداری‌ها، دانشگاه‌ها و محاکم قضایی با مهر دادگاه اتریش."
  },
  {
    id: "iranian-bazaar-wien",
    nameFa: "دایرکتوری اصناف و خواربارفروشی‌های حلال ایرانی وین",
    nameDe: "Iranische Supermärkte und Halal-Lebensmittel Wien",
    city: "Wien",
    category: "کسب‌وکار و تغذیه",
    contact: "Wien 1060, 1150, 1100",
    verifiedStatus: "فعال",
    descriptionFa: "مراکز تهیه نان سنگک، برنج زعفرانی، گوشت ذبح حلال و ادویه‌جات اصیل در مناطق مختلف وین."
  }
];

// Item 29: Localized Austrian German Content for Subfolder (/de/...)
export interface LocalizedPageContent {
  slug: string;
  cleanPathDe: string;
  cleanPathFa: string;
  titleDe: string;
  h1De: string;
  descriptionDe: string;
  keyPointsDe: string[];
  officialSourceDe: string;
  officialSourceUrl: string;
}

export const LOCALIZED_AUSTRIAN_PAGES: Record<string, LocalizedPageContent> = {
  "home": {
    slug: "home",
    cleanPathDe: "/de",
    cleanPathFa: "/",
    titleDe: "Otrish Neshin | Das Serviceportal für Zuwanderung & Leben in Österreich",
    h1De: "Unabhängiger Leitfaden für Zuwanderung, Steuern und Alltag in Österreich",
    descriptionDe: "Umfassende Tools für die Rot-Weiß-Rot-Karte, Brutto-Netto-Gehaltsrechner 2026, MA 35 Monitoring und das Netzwerk der persischen Diaspora in Wien.",
    keyPointsDe: [
      "Präzise Modellierung nach dem österreichischen Ausländerbeschäftigungsgesetz (AuslBG)",
      "Brutto-Netto-Berechnung mit 14 Gehältern und 2026 Steuerreform",
      "Echtzeit-Hilfe für Meldezettel, e-card und MA 35 Einwanderungsbehörde Wien",
      "Strikte Einhaltung der Google E-E-A-T Qualitätsrichtlinien und RIS-Zitierung"
    ],
    officialSourceDe: "Bundeskanzleramt RIS & Stadt Wien",
    officialSourceUrl: "https://www.ris.bka.gv.at"
  },
  "rwr-calculator": {
    slug: "rwr-calculator",
    cleanPathDe: "/de/rwr-card",
    cleanPathFa: "/rwr-card",
    titleDe: "Rot-Weiß-Rot-Karte Rechner 2026 | Punktesystem & Voraussetzungen",
    h1De: "Interaktiver Punkterechner für die Rot-Weiß-Rot-Karte Österreich",
    descriptionDe: "Berechnen Sie Ihre Punkte für die Rot-Weiß-Rot-Karte (Fachkräfte in Mangelberufen, sonstige Schlüsselkräfte, Studienabsolventen) gemäß dem österreichischen AuslBG.",
    keyPointsDe: [
      "Mindestpunkte: 55 Punkte für Mangelberufe, 55-70 Punkte für Schlüsselkräfte",
      "Automatische Prüfung von Altersstaffeln, Berufserfahrung und Sprachzertifikaten (ÖSD, Goethe, IELTS)",
      "Direkte Verlinkung zur offiziellen Mangelberufsliste des Arbeitsmarktservice (AMS)",
      "Praxiserprobte Antragsstrategien und E-Mail-Vorlagen für österreichische Arbeitgeber"
    ],
    officialSourceDe: "AMS Österreich & Bundesministerium für Arbeit",
    officialSourceUrl: "https://www.ams.at"
  },
  "finance": {
    slug: "finance",
    cleanPathDe: "/de/brutto-netto-rechner",
    cleanPathFa: "/brutto-netto-rechner",
    titleDe: "Brutto Netto Rechner Österreich 2026 | 14 Gehälter & Steuerklassen",
    h1De: "Offizieller Gehaltsrechner für Österreich mit Sozialversicherung & Lohnsteuer",
    descriptionDe: "Ermitteln Sie Ihr monatliches und jährliches Nettogehalt in Österreich. Berücksichtigt 14 Monatsgehälter, ÖGK-Beiträge, PVA und den Familienbonus Plus 2026.",
    keyPointsDe: [
      "Exakte Aufschlüsselung der Sozialversicherung: Krankenversicherung (ÖGK), Pensionsversicherung (PVA), AUVA",
      "Begünstigte Besteuerung des 13. und 14. Gehalts (Urlaubs- und Weihnachtsgeld)",
      "Inklusive Familienbonus Plus (bis zu 2.000 € pro Kind) und Alleinverdienerabsetzbetrag",
      "Vollständige Konformität mit dem Einkommensteuergesetz (EStG 1988 i.d.g.F. 2026)"
    ],
    officialSourceDe: "Bundesministerium für Finanzen (BMF)",
    officialSourceUrl: "https://www.bmf.gv.at"
  },
  "ma35": {
    slug: "ma35",
    cleanPathDe: "/de/ma35",
    cleanPathFa: "/ma35",
    titleDe: "MA 35 Wien Einwanderung | Termine, Wartezeiten & Antragsstatus",
    h1De: "Leitfaden für die Magistratsabteilung 35 (Einwanderung und Staatsbürgerschaft)",
    descriptionDe: "Wichtige Informationen zu Verfahrensdauer, Terminvergabe, Rechtsmitteln und Beschleunigungsanträgen bei der MA 35 in Wien.",
    keyPointsDe: [
      "Standorte der Außenstellen (z.B. Dresdner Straße, Hadersdorf)",
      "Verzögerungsrüge nach § 73 AVG bei Überschreitung der 6-Monats-Frist",
      "Rechtskonforme Dokumentenlisten für Erstantrag und Verlängerung (Aufenthaltstitel)",
      "E-Mail-Vorlagen und Fristüberwachung für Antragsteller"
    ],
    officialSourceDe: "Magistratsabteilung 35 Stadt Wien",
    officialSourceUrl: "https://www.wien.gv.at/menschen/integration/magistratsabteilungen/ma35/"
  },
  "tax-return": {
    slug: "tax-return",
    cleanPathDe: "/de/tax-return",
    cleanPathFa: "/tax-return",
    titleDe: "Arbeitnehmerveranlagung & FinanzOnline 2026 | Steuerausgleich Österreich",
    h1De: "Schritt-für-Schritt-Anleitung für den Steuerausgleich in Österreich",
    descriptionDe: "Holen Sie Ihre zu viel bezahlte Lohnsteuer vom Finanzamt zurück. Anleitung für Werbungskosten, Sonderausgaben, Pendlerpauschale und Homeoffice-Pauschale.",
    keyPointsDe: [
      "Rückwirkende Einreichung für bis zu 5 vergangene Kalenderjahre möglich",
      "Vollständig digital über das FinanzOnline-Portal mit ID Austria durchführbar",
      "Automatische Berechnung von Werbungskosten und Krankheitskosten",
      "Optimiert für Angestellte, Pendler und Familien mit Kindern in Österreich"
    ],
    officialSourceDe: "FinanzOnline Portal des BMF",
    officialSourceUrl: "https://finanzonline.bmf.gv.at"
  }
};

/**
 * Helper to generate hreflang link elements for both head and sitemap
 */
export function getHreflangLinks(currentCleanPath: string = "/"): { hrefLang: string; href: string }[] {
  const normalizedPath = currentCleanPath.replace(/^\/de/, "") || "";
  const baseUrl = "https://otrish-iran.ir";

  const faUrl = `${baseUrl}${normalizedPath || "/"}`;
  const deUrl = `${baseUrl}/de${normalizedPath === "/" ? "" : normalizedPath}`;

  return [
    { hrefLang: "fa-IR", href: faUrl },
    { hrefLang: "de-AT", href: deUrl },
    { hrefLang: "x-default", href: faUrl }
  ];
}

/**
 * Generates valid Schema.org LocalBusiness structured data
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://otrish-iran.ir/#localbusiness-vienna",
    "name": VIENNA_LOCAL_BUSINESS_NAP.nameFa,
    "alternateName": VIENNA_LOCAL_BUSINESS_NAP.nameDe,
    "legalName": VIENNA_LOCAL_BUSINESS_NAP.legalEntity,
    "url": VIENNA_LOCAL_BUSINESS_NAP.websiteUrl,
    "telephone": VIENNA_LOCAL_BUSINESS_NAP.telephone,
    "email": VIENNA_LOCAL_BUSINESS_NAP.email,
    "priceRange": VIENNA_LOCAL_BUSINESS_NAP.priceRange,
    "image": "https://otrish-iran.ir/otrish_logo_1779961596526.png",
    "logo": "https://otrish-iran.ir/otrish_logo_1779961596526.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": VIENNA_LOCAL_BUSINESS_NAP.streetAddress,
      "addressLocality": VIENNA_LOCAL_BUSINESS_NAP.addressLocality,
      "postalCode": VIENNA_LOCAL_BUSINESS_NAP.postalCode,
      "addressRegion": VIENNA_LOCAL_BUSINESS_NAP.addressRegion,
      "addressCountry": VIENNA_LOCAL_BUSINESS_NAP.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": VIENNA_LOCAL_BUSINESS_NAP.geoCoordinates.latitude,
      "longitude": VIENNA_LOCAL_BUSINESS_NAP.geoCoordinates.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": VIENNA_LOCAL_BUSINESS_NAP.rating.ratingValue,
      "reviewCount": VIENNA_LOCAL_BUSINESS_NAP.rating.reviewCount,
      "bestRating": VIENNA_LOCAL_BUSINESS_NAP.rating.bestRating
    },
    "areaServed": VIENNA_LOCAL_BUSINESS_NAP.areaServed.map(area => ({
      "@type": "AdministrativeArea",
      "name": area
    })),
    "knowsLanguage": ["fa-IR", "de-AT", "en-US"],
    "sameAs": [
      "https://t.me/OTRISH_IRAN",
      "https://instagram.com/otrish__iran",
      "https://youtube.com/@otrishneshin",
      "https://linkedin.com/company/otrishneshin"
    ]
  };
}
