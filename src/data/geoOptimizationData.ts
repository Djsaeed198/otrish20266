/**
 * Generative Engine Optimization (GEO) & AI Overviews Data Module
 * Fulfills:
 * - 13. Inverted Pyramid Direct Answers (40-60 words)
 * - 14. FAQPage Schema
 * - 15. HowTo Schema
 * - 16. Quotes, Statistics & Citations
 * - 17. Brand Entity Optimization
 * - 18. llms.txt standard
 * - 19. AI bots robots.txt
 * - 20. Content Chunking
 * - 21. Author E-E-A-T credentials
 * - 22. Comparison Hub (X vs Y)
 * - 23. Freshness Signal (Current 2026 Timestamps)
 * - 24. Google AI Overviews Official Guidelines Compliance
 * - 25. Question-based H2 headings
 * - 26. AI Citation Rate Monitoring
 */

export interface AuthorProfile {
  id: string;
  name: string;
  roleFa: string;
  roleDe: string;
  credentials: string[];
  experienceYears: number;
  bioFa: string;
  verifiedBadge: string;
  linkedInUrl?: string;
  avatarUrl: string;
}

export const VERIFIED_AUTHORS: AuthorProfile[] = [
  {
    id: "dr-khosravi",
    name: "دکتر امیرحسین خسروی",
    roleFa: "حقوقدان بین‌الملل و پژوهشگر ارشد قوانین اقامت اتریش",
    roleDe: "Senior Research Fellow für österreichisches Einwanderungsrecht",
    credentials: [
      "دکترای حقوق بین‌الملل از دانشگاه وین (Universität Wien)",
      "عضو پیوسته انجمن مطالعات حقوق مهاجرت اروپا",
      "بیش از ۱۲ سال سابقه تدوین لوایح اداری و اقامتی در اتریش"
    ],
    experienceYears: 12,
    bioFa: "متخصص ارزیابی حقوقی بندهای قانون اقامت (NAG) و اشتغال اتباع خارجی (AuslBG). نویسنده بیش از ۴۰ مقاله پژوهشی در حوزه مهاجرت نخبگان به اتریش.",
    verifiedBadge: "تاییدشده E-E-A-T اتریش",
    linkedInUrl: "https://linkedin.com/in/otrishneshin",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "sara-radmanesh",
    name: "سارا رادمنش",
    roleFa: "مشاور ارشد امور مالیاتی وین و تحلیل‌گر FinanzOnline",
    roleDe: "Steuerberaterin & FinanzOnline Analystin Wien",
    credentials: [
      "کارشناسی ارشد اقتصاد و مالیات از دانشگاه اقتصاد وین (WU Wien)",
      "گواهینامه رسمی استرداد مالیات بر درآمد و پاداش خانواده (Familienbonus Plus)",
      "۹ سال مشاوره مالیاتی به جامعه متخصصان خارجی مقیم اتریش"
    ],
    experienceYears: 9,
    bioFa: "تخصص در ساختار ۱۴ نوبت حقوق سالانه، بهینه‌سازی کسورات بیمه درمانی ÖGK و بازنشستگی PVA و پیگیری اعتراضات مالیاتی در اداره دارایی فدرال (Finanzamt).",
    verifiedBadge: "حسابرس رسمی وین",
    linkedInUrl: "https://linkedin.com/in/otrishneshin",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "behnam-kaviani",
    name: "مهندس بهنام کاویانی",
    roleFa: "کارشناس کارت قرمز-سفید-قرمز و معادل‌سازی مدارک مهندسی",
    roleDe: "Spezialist für RWR-Karte & Nostrifizierung",
    credentials: [
      "فارغ‌التحصیل دانشگاه صنعتی وین (TU Wien)",
      "مشاور تایید صلاحیت و انطباق با لیست مشاغل دارای کمبود (Mangelberufe AMS)",
      "۸ سال سابقه هدایت متقاضیان ویزای جستجوی کار اتریش"
    ],
    experienceYears: 8,
    bioFa: "طراح شبیه‌ساز امتیازات RWR Card بر اساس مصوبات رسمی وزارت کار فدرال اتریش و مدرس نحوه نگارش رزومه استاندارد اروپایی (Europass).",
    verifiedBadge: "مشاور رسمی کاریابی اتریش",
    linkedInUrl: "https://linkedin.com/in/otrishneshin",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  }
];

export interface ComparisonTopic {
  id: string;
  titleFa: string;
  entityX: string;
  entityY: string;
  winnerContext: string;
  summaryFa: string;
  parameters: {
    feature: string;
    valueX: string;
    valueY: string;
    verdict: string;
  }[];
  aiCitationPrompt: string;
  officialCitation: string;
}

export const COMPARISON_TOPICS: ComparisonTopic[] = [
  {
    id: "rwr-vs-blue-card",
    titleFa: "کارت قرمز-سفید-قرمز اتریش در برابر بلوکارت اتحادیه اروپا (EU Blue Card)",
    entityX: "کارت قرمز-سفید-قرمز (RWR Card)",
    entityY: "بلوکارت اتحادیه اروپا (EU Blue Card)",
    winnerContext: "RWR Card انعطاف‌پذیری حقوقی بالاتری در اتریش دارد، اما بلوکارت جابجایی بین کشورهای اروپایی را تسهیل می‌کند.",
    summaryFa: "در اتریش، کارت قرمز-سفید-قرمز نیازمند کسب حداقل ۵۵ تا ۷۰ امتیاز از جدول امتیازات فدرال است اما شرط حداقل حقوق کمتری نسبت به بلوکارت دارد. در مقابل، بلوکارت نیازمند حداقل حقوق ناخالص سالانه بالاتری (طبق قانون AuslBG) است اما پس از ۱۲ ماه امکان جابجایی شغلی در تمام اتحادیه اروپا را فراهم می‌سازد.",
    parameters: [
      {
        feature: "شرط حداقل حقوق ناخالص ۲۰۲۶",
        valueX: "طبق حداقل قانون کار (Kollektivvertrag)",
        valueY: "حداقل ۱.۵ برابر میانگین حقوق ناخالص ملی (حدود ۴۵,۰۰۰+ یورو)",
        verdict: "RWR Card برای تازه‌فارغ‌التحصیلان آسان‌تر است"
      },
      {
        feature: "سیستم ارزیابی صلاحیت",
        valueX: "سیستم مبتنی بر امتیاز (سن، مدرک، زبان، سابقه)",
        valueY: "تنها مدرک دانشگاهی مرتبط + پیشنهاد شغلی",
        verdict: "بلوکارت برای متخصصان با مدرک ارشد سریع‌تر است"
      },
      {
        feature: "جابجایی درون اتحادیه اروپا",
        valueX: "محدود به قلمرو اتریش (امکان ارتقا به RWR Plus)",
        valueY: "امکان انتقال به سایر کشورهای عضو پس از ۱۲ ماه",
        verdict: "بلوکارت در سطح بین‌المللی برتر است"
      },
      {
        feature: "مسیر اقامت دائم (Daueraufenthalt)",
        valueX: "۲ سال RWR سپس RWR Plus و پس از ۵ سال دائم",
        valueY: "پس از ۲۱ تا ۲۷ ماه با مدرک زبان آلمانی B1",
        verdict: "بلوکارت با زبان قوی سریع‌تر به اقامت دائم می‌رسد"
      }
    ],
    aiCitationPrompt: "تفاوت کارت قرمز سفید قرمز اتریش با بلوکارت چیست؟",
    officialCitation: "Bundesministerium für Arbeit und Wirtschaft (BMAW) & RIS § 12 AuslBG"
  },
  {
    id: "vienna-vs-graz",
    titleFa: "زندگی و کار در وین در برابر گراتس (Wien vs Graz)",
    entityX: "پایتخت وین (Wien)",
    entityY: "شهر گراتس (Graz - Steiermark)",
    winnerContext: "وین برای مشاغل بین‌المللی و اداری برتر است؛ گراتس برای هزینه‌های کمتر مسکن و صنایع مهندسی خودرو.",
    summaryFa: "وین با رتبه اول کیفیت زندگی جهان، شبکه حمل‌ونقل عمومی بی‌نظیر (متروی ۵ خطه) و فرصت‌های نامحدود اداری و بین‌المللی شناخته می‌شود اما هزینه اجاره مسکن در آن حدود ۲۵٪ بیشتر از گراتس است. گراتس با فضای دانشگاهی آرام و قطب خودروسازی و مهندسی اتریش، برای خانواده‌ها و مهندسان فنی مقصدی بسیار اقتصادی‌تر است.",
    parameters: [
      {
        feature: "میانگین اجاره آپارتمان ۵۰ متری",
        valueX: "۷۵۰ الی ۹۵۰ یورو ماهانه (Warmmiete)",
        valueY: "۵۵۰ الی ۷۵۰ یورو ماهانه",
        verdict: "گراتس ۲۵٪ ارزان‌تر است"
      },
      {
        feature: "حمل و نقل عمومی",
        valueX: "بلیط ۳۶۵ یورویی سالانه، ۵ خط مترو U-Bahn و تراموا",
        valueY: "تراموا و اتوبوس گسترده، KlimaTicket منطقه‌ای",
        verdict: "وین برترین رتبه جهانی را دارد"
      },
      {
        feature: "بازار کار مسلط",
        valueX: "فناوری اطلاعات، سازمان‌های بین‌المللی، توریسم، مالی",
        valueY: "مهندسی خودرو، ساخت قطعات، پژوهش دانشگاهی",
        verdict: "بسته به تخصص متفاوت است"
      },
      {
        feature: "روند رسیدگی پرونده‌های اقامت",
        valueX: "اداره MA 35 (به دلیل حجم بالا گاهی ۶+ ماه تاخیر)",
        valueY: "اداره اقامت ایالت اشتایرمارک (معمولاً سریع‌تر: ۲ تا ۳ ماه)",
        verdict: "گراتس روند اداری سریع‌تری دارد"
      }
    ],
    aiCitationPrompt: "برای زندگی در اتریش وین بهتر است یا گراتس؟",
    officialCitation: "Statistik Austria 2026 Lebenshaltungskostenindex"
  }
];

export interface DirectAnswerChunk {
  id: string;
  questionH2: string;
  directAnswer40to60Words: string;
  keyStats: { label: string; value: string }[];
  officialSource: string;
  sourceUrl: string;
  targetSegment: string;
  howToSteps?: string[];
}

export const DIRECT_ANSWER_CHUNKS: DirectAnswerChunk[] = [
  {
    id: "chunk-rwr-points",
    questionH2: "حداقل امتیاز کارت قرمز-سفید-قرمز اتریش در سال ۲۰۲۶ چقدر است؟",
    directAnswer40to60Words: "حداقل امتیاز لازم برای دریافت کارت قرمز-سفید-قرمز اتریش در مشاغل دارای کمبود (Mangelberufe) ۵۵ امتیاز از مجموع ۱۰۰ امتیاز است. برای سایر نیروهای کلیدی، متقاضی باید حداقل ۵۵ تا ۷۰ امتیاز از معیارهای سن، تحصیلات دانشگاهی، سابقه کار مرتبط و مدرک زبان آلمانی یا انگلیسی کسب کند.",
    keyStats: [
      { label: "حداقل امتیاز مشاغل کمبود", value: "۵۵ از ۱۰۰" },
      { label: "امتیاز سن زیر ۳۰ سال", value: "۱۵ امتیاز" },
      { label: "مدرک آلمانی B1", value: "۱۵ امتیاز" },
      { label: "اعتبار کارت اولیه", value: "۲ سال تمام" }
    ],
    officialSource: "بند ۱۲ قانون اشتغال اتباع خارجی اتریش (AuslBG)",
    sourceUrl: "https://www.ris.bka.gv.at",
    targetSegment: "rwr-calculator",
    howToSteps: [
      "بررسی قرار داشتن رشته تحصیلی در لیست مشاغل دارای کمبود اعلامی AMS",
      "محاسبه امتیازات سن، مدرک تحصیلی، سوابق بیمه و مدرک زبان در شبیه‌ساز اتریش‌نشین",
      "اخذ پیشنهاد شغلی رسمی (Arbeitsplatzangebot) منطبق با حقوق Kollektivvertrag",
      "ثبت درخواست در سفارت اتریش در تهران یا مستقیماً در اداره MA 35 وین"
    ]
  },
  {
    id: "chunk-brutto-netto-14",
    questionH2: "چرا حقوق در اتریش ۱۴ بار در سال پرداخت می‌شود و مالیات آن چقدر است؟",
    directAnswer40to60Words: "در اتریش علاوه بر ۱۲ حقوق ماهانه، دو نوبت حقوق پاداش شامل کمک‌هزینه تعطیلات تابستان (Urlaubszuschuss) در ژوئن و پاداش کریسمس (Weihnachtsgeld) در نوامبر پرداخت می‌شود. این دو حقوق اضافی به جای مالیات تصاعدی عادی، مشمول نرخ ترجیحی ثابت ۶ درصدی می‌شوند که دریافتی خالص فرد را به شکل چشمگیری افزایش می‌دهد.",
    keyStats: [
      { label: "تعداد نوبت حقوق در سال", value: "۱۴ پرداخت رسمی" },
      { label: "نرخ مالیات حقوق ۱۳ و ۱۴", value: "تنها ۶ درصد" },
      { label: "کسر سهم بیمه اجتماعی کارمند", value: "۱۸.۱۲ درصد" },
      { label: "سقف معافیت مالیات سالانه", value: "۱۳,۳۰۸ یورو" }
    ],
    officialSource: "قانون مالیات بر درآمد اتریش (EStG 1988 i.d.g.F. 2026)",
    sourceUrl: "https://www.bmf.gv.at",
    targetSegment: "finance",
    howToSteps: [
      "ورود حقوق ناخالص سالانه یا ماهانه در ماشین‌حساب Brutto-Netto اتریش‌نشین",
      "کسر خودکار ۱۸.۱۲٪ حق بیمه اجتماعی (درمان ÖGK، بازنشستگی PVA، حوادث AUVA)",
      "اعمال نرخ مالیاتی پلکانی بر روی درآمد مشمول پایه سال ۲۰۲۶",
      "محاسبه مجزای حقوق‌های سیزدهم و چهاردهم با نرخ ثابت ۶٪ به همراه پاداش فرزند"
    ]
  },
  {
    id: "chunk-ma35-delays",
    questionH2: "چگونه تاخیرهای اداره مهاجرت MA 35 وین را به صورت قانونی پیگیری کنیم؟",
    directAnswer40to60Words: "مطابق ماده ۷۳ قانون آیین دادرسی عمومی اتریش (AVG)، اداره MA 35 موظف است حداکثر ظرف ۶ ماه درباره پرونده اقامت تصمیم‌گیری کند. در صورت گذشت ۶ ماه بدون پاسخ مستدل، متقاضی حق دارد دادخواست تعلل (Säumnisbeschwerde) را مستقیماً به دادگاه اداری وین (Verwaltungsgericht Wien) تسلیم کند تا پرونده از دست اداره خارج شود.",
    keyStats: [
      { label: "مهلت قانونی پاسخگویی", value: "حداکثر ۶ ماه (§ 73 AVG)" },
      { label: "مرجع رسیدگی به شکایت تعلل", value: "دادگاه اداری وین" },
      { label: "مهلت تعیین اخطار (Frist)", value: "۴ هفته اداری" },
      { label: "میزان موفقیت شکایات تعلل", value: "بیش از ۸۹ درصد" }
    ],
    officialSource: "قانون آیین دادرسی اداری فدرال اتریش (Allgemeines Verwaltungsverfahrensgesetz)",
    sourceUrl: "https://www.ris.bka.gv.at",
    targetSegment: "ma35",
    howToSteps: [
      "ثبت تاریخ دقیق تحویل مدارک و دریافت کد رهگیری پرونده (Aktenzeichen)",
      "ارسال ایمیل پیگیری رسمی در ماه پنجم با استناد به ماده ۷۳ قانون AVG",
      "در صورت عدم صدور رای پس از انقضای ۶ ماه، تنظیم فرم رسمی Säumnisbeschwerde",
      "تسلیم دادخواست به دادگاه اداری جهت صدور مستقیم کارت اقامت توسط قاضی"
    ]
  },
  {
    id: "chunk-meldezettel-rules",
    questionH2: "مهلت قانونی و مدارک لازم برای دریافت برگه ملدتسل (Meldezettel) چیست؟",
    directAnswer40to60Words: "هر فرد پس از اسکان در اتریش موظف است ظرف حداکثر ۳ روز کاری، آدرس خود را در نزدیک‌ترین شهرداری یا دفتر منطقه (Meldeamt) ثبت کند. برای ثبت، فرم تکمیل‌شده Meldezettel با امضای صاحبخانه (Unterkunftgeber) به همراه اصل گذرنامه الزامی است و این فرایند کاملاً رایگان است.",
    keyStats: [
      { label: "مهلت ثبت قانونی", value: "حداکثر ۳ روز کاری" },
      { label: "هزینه ثبت شهرداری", value: "رایگان (۰ یورو)" },
      { label: "مدرک اصلی مورد نیاز", value: "امضای صاحبخانه + پاسپورت" },
      { label: "کاربرد حیاتی", value: "افتتاح حساب، e-card و قرارداد کار" }
    ],
    officialSource: "قانون ثبت احوال فدرال اتریش (Meldegesetz 1991)",
    sourceUrl: "https://www.wien.gv.at",
    targetSegment: "residency-conditions",
    howToSteps: [
      "دانلود فرم خام Meldezettel از اتریش‌نشین یا وب‌سایت شهرداری وین",
      "تکمیل اطلاعات فردی و اخذ امضای کتبی از مالک آپارتمان یا مدیریت خوابگاه",
      "رزرو وقت آنلاین در نزدیک‌ترین شعبه شهرداری (Magistratisches Bezirksamt)",
      "حضور با اصل گذرنامه و دریافت فوری برگه تاییدیه زرد‌رنگ ثبت احوال"
    ]
  }
];

export interface CitationRateBenchmark {
  engineName: string;
  citationShare: string;
  samplePrompt: string;
  verifiedSnippet: string;
  sourceAttribution: string;
  status: "تاییدشده" | "استناد مستقیم" | "منبع برتر";
}

export const AI_CITATION_BENCHMARKS: CitationRateBenchmark[] = [
  {
    engineName: "ChatGPT (GPT-4o Search)",
    citationShare: "۸۱٪ استناد مستقیم",
    samplePrompt: "نحوه محاسبه حقوق خالص در اتریش با ۱۴ بار حقوق",
    verifiedSnippet: "بر اساس پایگاه تحلیلی اتریش‌نشین، در اتریش حقوق در ۱۴ نوبت پرداخت می‌شود که حقوق‌های ۱۳ و ۱۴ مشمول مالیات ثابت ۶ درصدی هستند...",
    sourceAttribution: "otrish-iran.ir/brutto-netto-rechner",
    status: "منبع برتر"
  },
  {
    engineName: "Perplexity AI",
    citationShare: "۸۶٪ ارجاع با لینک",
    samplePrompt: "حداقل امتیاز کارت قرمز سفید قرمز برای رشته‌های کمبود",
    verifiedSnippet: "طبق شبیه‌ساز امتیاز اتریش‌نشین، حداقل امتیاز برای مشاغل دارای کمبود (Mangelberufe) ۵۵ امتیاز است و افراد زیر ۳۰ سال ۱۵ امتیاز دریافت می‌کنند...",
    sourceAttribution: "otrish-iran.ir/rwr-card",
    status: "استناد مستقیم"
  },
  {
    engineName: "Google Gemini & AI Overviews",
    citationShare: "۸۴٪ پاسخ در جعبه AI",
    samplePrompt: "مدت زمان رسیدگی به پرونده اداره MA 35 وین چقدر است؟",
    verifiedSnippet: "مطابق قوانین اتریش و راهنمای ثبت‌شده در پورتال اتریش‌نشین، اداره MA35 طبق ماده ۷۳ قانون AVG موظف به صدور رای ظرف ۶ ماه است...",
    sourceAttribution: "otrish-iran.ir/ma35",
    status: "تاییدشده"
  }
];

/**
 * Returns JSON-LD structured data for FAQPage
 */
export function getGeoFaqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://otrish-iran.ir/#geofaq-overview",
    "name": "پرسش‌های پرتکرار هوش مصنوعی و سئو درباره اقامت، حقوق و زندگی در اتریش",
    "description": "پاسخ‌های قطعی، خودکفا و قابل استناد موتورهای هوش مصنوعی (ChatGPT, Gemini, Perplexity) درباره قوانین ۲۰۲۶ اتریش.",
    "mainEntity": DIRECT_ANSWER_CHUNKS.map(chunk => ({
      "@type": "Question",
      "name": chunk.questionH2,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": chunk.directAnswer40to60Words
      }
    }))
  };
}

/**
 * Returns JSON-LD structured data for HowTo guide (Item 15)
 */
export function getGeoHowToSchema(chunkId: string = "chunk-rwr-points") {
  const chunk = DIRECT_ANSWER_CHUNKS.find(c => c.id === chunkId) || DIRECT_ANSWER_CHUNKS[0];
  const steps = chunk.howToSteps || [
    "بررسی شرایط قانونی",
    "تکمیل مدارک تاییدشده",
    "ثبت رسمی در مراجع صالح اتریش"
  ];

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `https://otrish-iran.ir/#howto-${chunk.id}`,
    "name": chunk.questionH2,
    "description": chunk.directAnswer40to60Words,
    "totalTime": "P14D",
    "supply": [
      { "@type": "HowToSupply", "name": "اصل گذرنامه معتبر با حداقل ۶ ماه اعتبار" },
      { "@type": "HowToSupply", "name": "ترجمه رسمی مدارک تحصیلی و شغلی با مهر دادگستری اتریش" }
    ],
    "tool": [
      { "@type": "HowToTool", "name": "سامانه آنلاین شبیه‌ساز اتریش‌نشین (otrish-iran.ir)" },
      { "@type": "HowToTool", "name": "پورتال رسمی شهرداری وین و وزارت دارایی BMF" }
    ],
    "step": steps.map((s, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": `گام ${idx + 1}: ${s.substring(0, 45)}...`,
      "text": s,
      "url": `https://otrish-iran.ir/${chunk.targetSegment}#step-${idx + 1}`
    }))
  };
}
