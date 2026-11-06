/**
 * Persian Spelling Variants & Semantic Clustering Utility
 * Handles:
 * - Zero-Width Non-Joiner (نیم‌فاصله \u200c) vs Space vs Joined
 * - Arabic/Persian character normalization (ی / ي, ک / ك)
 * - Colloquial terms used by Iranian diaspora in Austria (e.g. ملدتسل, بروتو نتو, ما۳۵)
 * - Semantic keyword expansions for high-coverage SEO indexing
 */

// Common Austrian/Iranian colloquial & administrative synonym mappings
export const PERSIAN_COLLOQUIAL_TERMS: Record<string, string[]> = {
  "اتریش‌نشین": [
    "اتریش نشین",
    "اتریشنشین",
    "اتریش‌ نشین",
    "پورتال اتریش نشین",
    "سایت اتریش نشین",
    "otrishneshin",
    "otrish neshin",
    "otrish-iran"
  ],
  "کارت قرمز-سفید-قرمز": [
    "کارت قرمز سفید قرمز",
    "کارت سرخ سفید سرخ",
    "کارت قرمز اتریش",
    "کارت RWR",
    "ویزای RWR اتریش",
    "اقامت کاری اتریش",
    "Rot-Weiß-Rot-Karte",
    "Rot Weiss Rot Karte",
    "rwr card"
  ],
  "بروتو نتو": [
    "بروتو-نتو",
    "بروتونتو",
    "حقوق ناخالص به خالص",
    "محاسبه حقوق اتریش",
    "حقوق خالص در اتریش",
    "مالیات حقوق اتریش",
    "Brutto Netto Rechner",
    "gehalt rechner"
  ],
  "ملدتسل": [
    "ملده تسل",
    "ملده‌تسل",
    "برگه ملده",
    "ثبت آدرس اتریش",
    "برگه ثبت سکونت اتریش",
    "Meldezettel",
    "Meldebestätigung"
  ],
  "ام ای ۳۵": [
    "ام ای35",
    "اداره اقامت وین",
    "اداره مهاجرت اتریش",
    "MA35",
    "MA 35",
    "ما ۳۵",
    "ما۳۵",
    "وقت MA35",
    "تمدید MA35"
  ],
  "فینانس آنلاین": [
    "فینانس‌آنلاین",
    "فینانس انلاین",
    "استرداد مالیاتی اتریش",
    "تعدیل مالیات اتریش",
    "FinanzOnline",
    "Arbeitnehmerveranlagung",
    "Steuerausgleich"
  ],
  "بیمه سلامت": [
    "بیمه او گ کا",
    "بیمه اگ کا",
    "کارت ای کارت",
    "e-card اتریش",
    "ecard اتریش",
    "ÖGK",
    "OGK اتریش",
    "دفترچه بیمه اتریش"
  ],
  "بهینه‌سازی": [
    "بهینه سازی",
    "بهینهسازی",
    "بهینه سازی سایت",
    "سئو",
    "SEO"
  ],
  "وب‌سایت": [
    "وبسایت",
    "وب سایت",
    "سایت",
    "پورتال"
  ]
};

/**
 * Normalizes Persian and Arabic text for robust searching & indexing
 */
export function normalizePersianText(input: string): string {
  if (!input) return "";
  return input
    .replace(/\u200c/g, " ") // replace ZWNJ with space
    .replace(/[ي]/g, "ی") // normalize yeh
    .replace(/[ك]/g, "ک") // normalize kaf
    .replace(/[ة]/g, "ه") // normalize teh marbuta
    .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728)) // Persian digits to English
    .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1584)) // Arabic digits to English
    .replace(/[\u064B-\u065F]/g, "") // remove arabic diacritics
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim()
    .toLowerCase();
}

/**
 * Generates all spelling variants for a Persian keyword (ZWNJ, space, joined)
 */
export function generateSpellingVariants(term: string): string[] {
  const variants = new Set<string>();
  variants.add(term);

  // Normal space version
  const spaceVersion = term.replace(/\u200c/g, " ").replace(/-/g, " ");
  variants.add(spaceVersion);

  // Half-space (ZWNJ) version
  const zwnjVersion = term.replace(/ /g, "\u200c").replace(/-/g, "\u200c");
  variants.add(zwnjVersion);

  // Joined version without spaces
  const joinedVersion = term.replace(/[\s\u200c-]/g, "");
  if (joinedVersion.length > 3) {
    variants.add(joinedVersion);
  }

  // Look up known colloquial variants
  for (const [key, colloquialList] of Object.entries(PERSIAN_COLLOQUIAL_TERMS)) {
    if (term.includes(key) || key.includes(term) || colloquialList.some(c => term.includes(c))) {
      variants.add(key);
      colloquialList.forEach(c => variants.add(c));
    }
  }

  return Array.from(variants);
}

/**
 * Expands a list of keywords to include spelling variants & colloquial slang
 */
export function expandKeywordsWithVariants(keywords: string | string[]): string {
  const rawList = Array.isArray(keywords) 
    ? keywords 
    : keywords.split(",").map(k => k.trim()).filter(Boolean);

  const resultSet = new Set<string>();

  for (const item of rawList) {
    resultSet.add(item);
    const variants = generateSpellingVariants(item);
    variants.forEach(v => resultSet.add(v));
  }

  return Array.from(resultSet).join(", ");
}
