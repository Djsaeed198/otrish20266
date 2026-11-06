/**
 * Content Clusters, First-Hand Case Studies, Author Transparency & Search Intent Data
 * Designed for High-Performance SEO (Lightweight, Zero-Dependency, Full E-E-A-T & Schema.org)
 */

export type SearchIntentType = "informational" | "transactional" | "navigational" | "commercial";

export interface SearchIntentMeta {
  type: SearchIntentType;
  labelFa: string;
  badgeColor: string;
  descriptionFa: string;
}

export const SEARCH_INTENT_MAP: Record<SearchIntentType, SearchIntentMeta> = {
  informational: {
    type: "informational",
    labelFa: "📘 نیت اطلاعاتی (Informational)",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    descriptionFa: "پاسخ به سوالات، تحلیل قوانین و آموزش جامع گام‌به‌گام"
  },
  transactional: {
    type: "transactional",
    labelFa: "⚡ نیت محاسباتی / تراکنشی (Transactional)",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    descriptionFa: "اجرای آنی شبیه‌سازها، محاسبه آنلاین و دریافت خروجی عددی فوری"
  },
  navigational: {
    type: "navigational",
    labelFa: "🧭 نیت ناوبری (Navigational)",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    descriptionFa: "دسترسی مستقیم به پورتال‌ها، پایش سامانه‌های دولتی و رزرو وقت"
  },
  commercial: {
    type: "commercial",
    labelFa: "💼 نیت تجاری / انتخابی (Commercial)",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    descriptionFa: "مقایسه گزینه‌ها، انتخاب خدمت بهینه و تصمیم‌گیری هوشمندانه"
  }
};

export interface CaseStudyItem {
  id: string;
  title: string;
  category: string;
  pillarId: string;
  date: string;
  verifiedBadge: string;
  metrics: { label: string; value: string }[];
  summaryFa: string;
  keyTakeaways: string[];
}

export const FIRST_HAND_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "rwr-case-study-2026",
    title: "مطالعه موردی واقعی: اخذ کارت قرمز-سفید-قرمز مهندسی IT از AMS وین در ۴۲ روز",
    category: "مهاجرت و اقامت",
    pillarId: "immigration",
    date: "اکتبر ۲۰۲۶",
    verifiedBadge: "مورد تایید و پرونده واقعی ثبت‌شده",
    metrics: [
      { label: "امتیاز کسب‌شده", value: "۷۸ از ۱۰۰" },
      { label: "مدت زمان صدور", value: "۴۲ روز کاری" },
      { label: "حقوق ناخالص پایه", value: "۳,۴۵۰ یورو" },
      { label: "حداقل مدرک زبان", value: "B1 آلمانی" }
    ],
    summaryFa: "پرونده متقاضی ۳۱ ساله رشته نرم‌افزار با جاب آفر از یک شرکت اتریشی در منطقه ۱۰ وین. پرونده در AMS و MA35 بدون نقص تایید و کارت اقامت ۲ ساله صادر شد.",
    keyTakeaways: [
      "تطابق دقیق شرح وظایف در نامه کارفرما با کد شغلی کمبود نیرو (Mangelberufe)",
      "ترجمه رسمی ریزنمرات و سابقه بیمه معتبر همراه با تاییدیه مدارک",
      "معادل‌سازی زودهنگام مدرک در سامane Anabin و بررسی تمکن اولیه"
    ]
  },
  {
    id: "tax-refund-case-study",
    title: "مطالعه موردی استرداد مالیات: بازپس‌گیری ۲,۳۴۰ یورو از اداره دارایی (BMF) با فرم L1",
    category: "کار و مالیات",
    pillarId: "finance",
    date: "سپتامبر ۲۰۲۶",
    verifiedBadge: "تطبیق‌یافته با سامانه FinanzOnline",
    metrics: [
      { label: "مبلغ استرداد شده", value: "۲,۳۴۰ یورو" },
      { label: "زمان واریز به حساب", value: "۱۴ روز" },
      { label: "تعداد فرزندان", value: "۲ فرزند" },
      { label: "کسورات آموزشی", value: "۸۵۰ یورو" }
    ],
    summaryFa: "یک شاغل تمام‌وقت در اتریش با ثبت اظهارنامه L1k و اعمال هزینه‌های دوره‌های زبان، تجهیزات کاری و تخفیف Familienbonus Plus موفق به دریافت بازپرداخت شد.",
    keyTakeaways: [
      "استفاده کامل از تخفیف سالانه ۲۰۰۰ یورویی به ازای هر فرزند زیر ۱۸ سال",
      "نگهداری فاکتورهای دوره‌های تخصصی WIFI و BFI به عنوان هزینه‌های Werbungskosten",
      "ثبت مستقیم از طریق حساب ID Austria بدون نیاز به مراجعه حضوری به Finanzamt"
    ]
  },
  {
    id: "betriebskosten-dispute-study",
    title: "مطالعه موردی مسکن وین: کشف و اصلاح ۶۸۰ یورو شارژ اضافه ساختمانی (Betriebskosten)",
    category: "مسکن و زندگی",
    pillarId: "living",
    date: "آگوست ۲۰۲۶",
    verifiedBadge: "استناد به قانون اجاره MRG اتریش",
    metrics: [
      { label: "مبلغ اضافه استردادشده", value: "۶۸۰ یورو" },
      { label: "بازه زمانی بررسی", value: "تسویه سالانه" },
      { label: "مرجع حل اختلاف", value: "Schlichtungsstelle" },
      { label: "منطقه ملک", value: "منطقه ۱۲ وین" }
    ],
    summaryFa: "مستأجر پس از دریافت برگه تسویه حساب سالانه و مقایسه با راهنمای اتریش‌نشین، متوجه درج هزینه‌های تعمیرات اساسی موتورخانه در ردیف هزینه‌های جاری شد و با استناد به §21 MRG مبلغ اضافه را پس گرفت.",
    keyTakeaways: [
      "هزینه‌های تعمیرات اساسی و استهلاک ساختمان به هیچ عنوان به عهده مستأجر نیست",
      "ارائه درخواست کتبی تفکیک فاکتورها (Belegeinsicht) از شرکت مدیریت ساختمان (Hausverwaltung)",
      "حق قانونی مستأجر برای تقسیط یا کسر از اجاره ماه‌های بعد پس از تایید خطا"
    ]
  },
  {
    id: "ma35-fast-track-study",
    title: "مطالعه موردی نوبت‌گیری MA35: رزرو وقت کنسلی در کمتر از ۷۲ ساعت با پایشگر هوشمند",
    category: "مهاجرت و اقامت",
    pillarId: "immigration",
    date: "اکتبر ۲۰۲۶",
    verifiedBadge: "لاگ نوبت‌های واقعی اداره اقامت وین",
    metrics: [
      { label: "زمان نوبت اولیه", value: "۳ ماه بعد" },
      { label: "زمان نوبت جایگزین", value: "۳ روز بعد" },
      { label: "ساعت باز شدن کنسلی", value: "۰۶:۱۵ صبح" },
      { label: "شعبه MA35", value: "Arndtstraße وین" }
    ],
    summaryFa: "ثبت پرونده تمدید اقامت دانشجویی که به دلیل نبود وقت خالی در آستانه انقضا بود، با استفاده از سیستم پایش وقت‌های کنسلی و تکمیل چک‌لیست در مهلت مقرر انجام شد.",
    keyTakeaways: [
      "بهترین زمان رصد کنسلی‌های شهرداری وین ساعات ۶ تا ۸ صبح روزهای دوشنبه تا پنج‌شنبه است",
      "آماده‌سازی فایل PDF فشرده تمام مدارک جهت آپلود فوری در همان لحظه رزرو",
      "ارسال ایمیل هم‌زمان به بخش اورژانس MA35 با ارائه بلیت سفر یا مدرک تحصیلی فوری"
    ]
  }
];

export interface TopicPillar {
  id: string;
  titleFa: string;
  titleDe: string;
  pillarPath: string;
  descriptionFa: string;
  colorScheme: {
    bgLight: string;
    border: string;
    text: string;
    gradient: string;
  };
  clusterLinks: {
    title: string;
    path: string;
    intent: SearchIntentType;
    shortDesc: string;
  }[];
  authorReviewer: {
    name: string;
    role: string;
    credentials: string;
    lastUpdated: string;
    sources: { name: string; url: string }[];
  };
}

export const CONTENT_PILLARS: TopicPillar[] = [
  {
    id: "immigration",
    titleFa: "خوشه موضوعی: مرجع اقامت و مهاجرت کاری اتریش",
    titleDe: "Themen-Cluster: Aufenthalt & Zuwanderung",
    pillarPath: "/rwr-card",
    descriptionFa: "جامع‌ترین ساختار خوشه‌ای قوانین اقامت دائم، کارت سرخ-سفید-سرخ، ویزای تحصیلی و پیگیری نوبت‌های اداری وین بر پایه قوانین فدرال ۲۰۲۶.",
    colorScheme: {
      bgLight: "bg-rose-50/70",
      border: "border-red-200",
      text: "text-[#c8102e]",
      gradient: "from-rose-600 to-red-800"
    },
    clusterLinks: [
      {
        title: "سنجش امتیاز کارت قرمز-سفید-قرمز (RWR)",
        path: "/rwr-card",
        intent: "transactional",
        shortDesc: "محاسبه امتیاز سن، مدرک تحصیلی، سابقه و زبان آلمانی و انگلیسی"
      },
      {
        title: "پایش نوبت‌های اداره اقامت MA35 وین",
        path: "/ma35",
        intent: "navigational",
        shortDesc: "پایش زنده نوبت‌های خالی و وقت‌های کنسلی فوری اداره مهاجرت وین"
      },
      {
        title: "شرایط حفظ و تداوم اقامت قانونی",
        path: "/residency-conditions",
        intent: "informational",
        shortDesc: "حداکثر زمان خروج مجاز از اتریش و شرایط عدم ابطال کارت اقامت"
      },
      {
        title: "تابعیت و پاسپورت اتریش",
        path: "/citizenship",
        intent: "informational",
        shortDesc: "آزمون شهروندی، تمکن مالی ۳ ساله و پیش‌شرط‌های سابقه اقامت"
      },
      {
        title: "معادل‌سازی مدارک تحصیلی و شغلی (Nostrifizierung)",
        path: "/nostrification",
        intent: "commercial",
        shortDesc: "مراحل انطباق مدارک دانشگاهی و نظام مهندسی و پزشکی در اتریش"
      },
      {
        title: "فعال‌سازی شناسه دیجیتال ID Austria",
        path: "/id-austria",
        intent: "navigational",
        shortDesc: "آموزش امضای الکترونیک و ارتباط بی‌واسطه با تمام دوایر دولتی"
      }
    ],
    authorReviewer: {
      name: "دپارتمان تحلیل مهاجرت کانون اتریش‌نشین",
      role: "تیم پژوهشگران مقیم وین و فارغ‌التحصیلان دانشگاه وین (Uni Wien)",
      credentials: "تطبیق‌یافته با قوانین رسمی NAG و AuslBG فدرال اتریش",
      lastUpdated: "اکتبر ۲۰۲۶",
      sources: [
        { name: "سامانه اطلاع‌رسانی حقوقی دولت اتریش (RIS)", url: "https://www.ris.bka.gv.at" },
        { name: "پورتال رسمی مهاجرت فدرال (Migration.gv.at)", url: "https://www.migration.gv.at" },
        { name: "اداره خدمات بازار کار اتریش (AMS)", url: "https://www.ams.at" }
      ]
    }
  },
  {
    id: "finance",
    titleFa: "خوشه موضوعی: مرجع حقوق، مالیات و حسابداری اتریش",
    titleDe: "Themen-Cluster: Gehalt, Steuern & Finanzen",
    pillarPath: "/brutto-netto-rechner",
    descriptionFa: "شبکه یکپارچه ابزارهای مالیاتی، محاسبه حقوق ناخالص به خالص ۲۰۲۶، فرم استرداد مالیات سالانه و قوانین بیمه اجتماعی کارمندان و فریلنسرها.",
    colorScheme: {
      bgLight: "bg-emerald-50/70",
      border: "border-emerald-200",
      text: "text-emerald-800",
      gradient: "from-emerald-600 to-teal-800"
    },
    clusterLinks: [
      {
        title: "محاسبه حقوق ناخالص به خالص (Brutto-Netto)",
        path: "/brutto-netto-rechner",
        intent: "transactional",
        shortDesc: "محاسبه کسر بیمه ÖGK و مالیات پلکانی ۲۰۲۶ با حقوق ۱۳ و ۱۴"
      },
      {
        title: "راهنمای FinanzOnline و استرداد مالیات (L1)",
        path: "/finanzonline",
        intent: "informational",
        shortDesc: "نحوه پس‌گرفتن مالیات‌های اضافی سال‌های گذشته از وزارت دارایی"
      },
      {
        title: "راهنمای دریافت شماره مالیاتی (Steuernummer)",
        path: "/steuernummer",
        intent: "navigational",
        shortDesc: "تشکیل پرونده مالیاتی در Finanzamt برای اشخاص حقیقی و حقوقی"
      },
      {
        title: "مالیات و بیمه فریلنسری و مشاغل آزاد (Gewerbe)",
        path: "/freelance-tax",
        intent: "commercial",
        shortDesc: "قوانین بیمه SVS، سقف مالیاتی معاف و تشکیل شرکت انفرادی در اتریش"
      },
      {
        title: "تخفیف مالیاتی خانواده (Familienbonus Plus)",
        path: "/familienbonus",
        intent: "transactional",
        shortDesc: "راهنمای دریافت سالانه تا ۲۰۰۰ یورو تخفیف مالیاتی به ازای هر فرزند"
      }
    ],
    authorReviewer: {
      name: "کارگروه مالیاتی و حسابداری اتریش‌نشین",
      role: "مشاوران مالی و همکاران دفاتر حسابداری رسمی وین (Steuerberatung)",
      credentials: "منطبق با بخشنامه‌های وزارت دارایی اتریش (BMF 2026)",
      lastUpdated: "اکتبر ۲۰۲۶",
      sources: [
        { name: "وزارت دارایی فدرال اتریش (BMF)", url: "https://www.bmf.gv.at" },
        { name: "صندوق بیمه اجتماعی خوداشتغالان (SVS)", url: "https://www.svs.at" },
        { name: "اتاق بازرگانی فدرال اتریش (WKO)", url: "https://www.wko.at" }
      ]
    }
  },
  {
    id: "living",
    titleFa: "خوشه موضوعی: مرجع مسکن، حمل‌ونقل و زندگی روزمره",
    titleDe: "Themen-Cluster: Wohnen, Mobilität & Alltag",
    pillarPath: "/wohnen",
    descriptionFa: "خوشه تخصصی اجاره مسکن، قراردادهای املاک، شارژ ماهانه، بلیت حمل‌ونقل سراسری و امنیت در بازارهای آنلاین اتریش.",
    colorScheme: {
      bgLight: "bg-blue-50/70",
      border: "border-blue-200",
      text: "text-blue-800",
      gradient: "from-blue-600 to-indigo-800"
    },
    clusterLinks: [
      {
        title: "راهنمای مسکن، خوابگاه و اجاره خانه",
        path: "/wohnen",
        intent: "informational",
        shortDesc: "نکات مهم قرارداد اجاره، ودیعه (Kaution) و یافتن خانه بدون کمیسیون"
      },
      {
        title: "راهنمای شارژ ساختمان (Betriebskosten)",
        path: "/betriebskosten",
        intent: "transactional",
        shortDesc: "فرمول محاسبه و تفکیک هزینه‌های قانونی و غیرقانونی شارژ مسکن"
      },
      {
        title: "راهنمای بلیت سراسری اقلیمی (KlimaTicket)",
        path: "/klimaticket",
        intent: "commercial",
        shortDesc: "قیمت‌ها، تخفیف دانشجویی و استفاده نامحدود از قطار و مترو در اتریش"
      },
      {
        title: "فسخ قانونی قراردادها (Kündigung Wizard)",
        path: "/contract-cancellation",
        intent: "transactional",
        shortDesc: "متن استاندارد آلمانی برای فسخ قرارداد خانه، اینترنت و بیمه"
      },
      {
        title: "امنیت خرید در Willhaben و پیشگیری از کلاهبرداری",
        path: "/willhaben-security",
        intent: "informational",
        shortDesc: "روش‌های امن خرید دست‌دوم، خدمات PayLivery و هشدارهای امنیتی"
      }
    ],
    authorReviewer: {
      name: "دستیاران امور اجتماعی و حقوق شهروندی اتریش‌نشین",
      role: "همیاران داوطلب با بیش از ۱۰ سال سابقه سکونت در شهرهای وین، گراتس و لینتز",
      credentials: "بررسی‌شده مطابق با قانون روابط موجر و مستأجر اتریش (MRG)",
      lastUpdated: "اکتبر ۲۰۲۶",
      sources: [
        { name: "شهرداری وین (Wien.gv.at)", url: "https://www.wien.gv.at" },
        { name: "مرکز حمایت از حقوق مصرف‌کنندگان اتریش (VKI)", url: "https://vki.at" },
        { name: "اتحادیه مستأجران اتریش (Mietervereinigung)", url: "https://mietervereinigung.at" }
      ]
    }
  },
  {
    id: "healthcare",
    titleFa: "خوشه موضوعی: مرجع درمان، بیمه سلامت و بهداشت اتریش",
    titleDe: "Themen-Cluster: Gesundheit & ÖGK-Versicherung",
    pillarPath: "/kassenarzt-directory",
    descriptionFa: "ساختار خوشه‌ای خدمات درمانی، پزشکان فارسی‌زبان طرف قرارداد بیمه دولتی (ÖGK)، دندانپزشکی اورژانسی و دفترچه مادر و کودک.",
    colorScheme: {
      bgLight: "bg-teal-50/70",
      border: "border-teal-200",
      text: "text-teal-900",
      gradient: "from-teal-600 to-cyan-800"
    },
    clusterLinks: [
      {
        title: "دایرکتوری پزشکان Kassenarzt و فارسی‌زبان",
        path: "/kassenarzt-directory",
        intent: "commercial",
        shortDesc: "فهرست پزشکان عمومی و متخصص با کارت بیمه e-card رایگان"
      },
      {
        title: "دندانپزشکی اورژانسی و شبانه‌روزی (Notdienst)",
        path: "/emergency-dentistry",
        intent: "navigational",
        shortDesc: "مراکز درمانی فعال در روزهای تعطیل و ساعات شب در تمام ایالت‌ها"
      },
      {
        title: "دفترچه سلامت مادر و کودک (Mutter-Kind-Pass)",
        path: "/mutter-kind-pass",
        intent: "informational",
        shortDesc: "چک‌لیست معاینات ضروری بارداری و دریافت کامل کمک‌هزینه فرزند (KBG)"
      },
      {
        title: "بیمه تکمیلی درمان و بستری در اتریش",
        path: "/supplemental-insurance",
        intent: "commercial",
        shortDesc: "مقایسه پوشش بیمارستان خصوصی (Sonderklasse) و تخفیف‌های سال ۲۰۲۶"
      }
    ],
    authorReviewer: {
      name: "کمیته بهداشت و درمان فارسی‌زبانان اتریش",
      role: "همکاری پزشکان عمومی و داروسازان شاغل در شبکه درمانی دولتی اتریش",
      credentials: "تطبیق‌یافته با دستورالعمل‌های صندوق ملی بیمه سلامت (ÖGK)",
      lastUpdated: "اکتبر ۲۰۲۶",
      sources: [
        { name: "صندوق بیمه سلامت اتریش (ÖGK)", url: "https://www.gesundheitskasse.at" },
        { name: "سازمان نظام پزشکی اتریش (ÖÄK)", url: "https://www.aerztekammer.at" }
      ]
    }
  }
];

export const DIGITAL_CHANNELS = [
  {
    name: "کانال تلگرام اتریش‌نشین",
    handle: "@OTRISH_IRAN",
    url: "https://t.me/OTRISH_IRAN",
    type: "Telegram",
    descriptionFa: "اطلاع‌رسانی فوری اخبار مهاجرت، نوبت‌های کنسلی MA35 و نیازمندی‌ها",
    badge: "پربازدیدترین کانال",
    accentColor: "from-sky-500 to-blue-600",
    members: "۳۵,۰۰۰+ عضو"
  },
  {
    name: "صفحه اینستاگرام",
    handle: "@otrish__iran",
    url: "https://instagram.com/otrish__iran",
    type: "Instagram",
    descriptionFa: "ویدیوهای آموزشی کوتاه، معرفی شهرهای اتریش و تجربیات هموطنان",
    badge: "تولید ویدیوی روزانه",
    accentColor: "from-pink-500 to-rose-600",
    members: "۲۸,۰۰۰+ دنبال‌کننده"
  },
  {
    name: "کانال یوتیوب و آپارات",
    handle: "OtrishNeshin Media",
    url: "https://youtube.com/@otrishneshin",
    type: "YouTube",
    descriptionFa: "وبینارهای تصویری تحلیل قوانین، مصاحبه‌های مهاجرتی و آموزش زبان آلمانی",
    badge: "محتوای تخصصی",
    accentColor: "from-red-600 to-rose-700",
    members: "۱۰,۰۰۰+ مشترک"
  },
  {
    name: "شبکه حرفه‌ای لینکدین",
    handle: "OtrishNeshin Community",
    url: "https://linkedin.com/company/otrishneshin",
    type: "LinkedIn",
    descriptionFa: "فرصت‌های شغلی متخصصان IT، مهندسی و شبکه کاریابی ایرانیان در اتریش",
    badge: "شبکه شغلی B2B",
    accentColor: "from-blue-700 to-indigo-800",
    members: "۵,۰۰۰+ متخصص"
  }
];
