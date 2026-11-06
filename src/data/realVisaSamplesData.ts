import { DocumentSample } from "../components/DocumentSamples";

export const REAL_VISA_SAMPLES: DocumentSample[] = [
  // =========================================================================
  // 1. اقامت تمکن مالی اتریش — حجت (۲۰۲۴)
  // =========================================================================
  {
    id: "real-visa-hojat-financial-independence-2024",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit (Hojat)",
    titleFa: "کارت اقامت تمکن مالی اتریش — حجت",
    titleDe: "Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit gem. § 44 NAG",
    applicantStatus: "متقاضی اقامت خودحمایتی اتریش بدون اجازه اشتغال استخدامی با اثبات تمکن مالی و درآمد مستقل",
    issuedBy: "اداره امور اقامت و شهروندی اتریش (MA 35 Wien)",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۵/۳۰",
    validUntil: "۲۰۲۵/۰۵/۳۰ (قابل تمدید سالانه)",
    caseRef: "AUT-NB/2024-HOJAT",
    isSpecialBadge: true,
    specialHighlight: "دارای تاییدیه رسمی شهرداری وین بر اساس درآمد غیرفعال مستقل",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 Niederlassungs- und Aufenthaltsgesetz (NAG)",
    imageUrl: "/assets/aistudio/______________________21_dbf0b32e.webp",
    anatomyBreakdown: [
      {
        title: "نوع مجوز اقامت (Art des Titels)",
        description: "Niederlassungsbewilligung ausgenommen Erwerbstätigkeit — اقامت ویژه افراد با تمکن مالی بدون اجازه کار.",
        tag: "پایه اقامتی",
      },
      {
        title: "تاریخ اخذ و اعتبار",
        description: "صادرشده در ۳۰ مه ۲۰۲۴ با امکان تمدید و تبدیل به اقامت دائم پس از ۵ سال.",
        tag: "تقویم و تمدید",
      },
    ],
    requirements: [
      "اثبات درآمد غیرفعال ماهانه حداقل دو برابر نرخ استاندارد رفاهی اتریش",
      "گواهی سلامت و بیمه درمانی جامع معتبر در سراسر اتریش",
      "مدرک زبان آلمانی مقدماتی سطح A1 یا مدرک دانشگاهی معاف‌کننده",
    ],
    tipsFa: "این کارت به متقاضی و اعضای خانواده اجازه اقامت قانونی در کل خاک اتریش و تردد آزادانه در حوزه شنگن را می‌دهد.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "Hojat",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "NB-2024-HOJAT",
      officialClauseDe: "AUSGENOMMEN ERWERBSTATIGKEIT",
    },
  },

  // =========================================================================
  // 2. اقامت تمکن مالی اتریش — وین (دوره ۲۰۱۹–۲۰۲۰)
  // =========================================================================
  {
    id: "real-visa-financial-independence-wien-2019",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit",
    titleFa: "کارت اقامت تمکن مالی اتریش — شهرداری وین",
    titleDe: "Aufenthaltstitel Niederlassungsbewilligung (Wien)",
    applicantStatus: "پرونده موفق اقامت خودحمایتی صادر شده توسط مرکز اصلی مهاجرت وین",
    issuedBy: "MA 35 – Einwanderung und Staatsbürgerschaft Wien",
    state: "Wien",
    issueDate: "۲۰۱۹/۱۰/۰۹",
    validUntil: "۲۰۲۰/۰۲/۰۹ (تمدید دوره‌ای)",
    caseRef: "W-NB/2019-1009-VIE",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/______________________24_220ffc77.webp",
    anatomyBreakdown: [
      {
        title: "مرجع صدور کارت",
        description: "شهرداری وین (Magistratsabteilung 35) متولی بررسی سهمیه‌های تمکن مالی پایتخت.",
        tag: "مرجع دولتی",
      },
    ],
    requirements: [
      "سهمیه سالانه تمکن مالی (Quote)",
      "اجاره‌نامه رسمی مسکن در وین (Mietvertrag)",
      "حساب بانکی معتبر با موجودی ارزی کافی",
    ],
    tipsFa: "پس از اتمام دوره اول، کارت برای دوره یکساله و سپس سه ساله تمدید می‌گردد.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "******, *",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "NB-2019-VIE",
      officialClauseDe: "AUSGENOMMEN ERWERBSTATIGKEIT",
    },
  },

  // =========================================================================
  // 3. اقامت تمکن مالی اتریش — حامد (گوسینگ)
  // =========================================================================
  {
    id: "real-visa-hamed-financial-independence-gussing-2017",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit (Güssing)",
    titleFa: "کارت اقامت تمکن مالی اتریش — حامد (گوسینگ)",
    titleDe: "Niederlassungsbewilligung BH Güssing (Hamed)",
    applicantStatus: "اخذ کارت اقامت تمکن مالی بدون سهمیه دشوار پایتخت از طریق ادارات ایالتی",
    issuedBy: "Bezirkshauptmannschaft Güssing",
    state: "Burgenland" as any,
    issueDate: "۲۰۱۷/۰۸/۲۵",
    validUntil: "۲۰۱۸/۰۸/۲۴",
    caseRef: "GS-NB/2017-HAMED",
    isSpecialBadge: true,
    specialHighlight: "صدور سریع‌تر از طریق فرمانداری‌های ایالتی بورگن‌لاند",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/______________________32_4d1a03d6.webp",
    anatomyBreakdown: [
      {
        title: "فرمانداری صادرکننده",
        description: "BH Güssing — پرونده‌های استانی به دلیل تراکم کمتر سهمیه‌بندی بازتری دارند.",
        tag: "راهبرد ایالتی",
      },
    ],
    requirements: [
      "ثبت سکونت رسمی در حوزه استحفاظی فرمانداری گوسینگ",
      "بیمه سلامت مسافرتی و درمانی اتریش",
      "گواهی عدم سوءپیشینه و تمکن مالی مستقل",
    ],
    tipsFa: "اقدام از شهرهای کوچک‌تر اتریش اغلب صف بررسی پرونده را به شدت کاهش می‌دهد.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "Hamed",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "NB-2017-GS",
      officialClauseDe: "AUSGENOMMEN ERWERBSTATIGKEIT",
    },
  },

  // =========================================================================
  // 4. اقامت تمکن مالی اتریش — ۲۰۲۲
  // =========================================================================
  {
    id: "real-visa-financial-independence-2022",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung Republik Österreich",
    titleFa: "کارت اقامت تمکن مالی اتریش — دوره ۲۰۲۲",
    titleDe: "Aufenthaltstitel Niederlassungsbewilligung 2022",
    applicantStatus: "تمدید موفق سالیانه اقامت خودحمایتی با حفظ شرایط تمکن مالی",
    issuedBy: "جمهوری اتریش — اداره اقامت و شهروندی",
    state: "Wien",
    issueDate: "۲۰۲۱/۰۴/۲۹",
    validUntil: "۲۰۲۲/۰۴/۲۹",
    caseRef: "AUT-NB/2022-2904",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/______________________231_c8d574d3.webp",
    anatomyBreakdown: [
      {
        title: "کارت اقامت استاندارد اتحادیه اروپا",
        description: "دارای چیپ بیومتریک و بارکد امنیتی هماهنگ با استانداردهای اتحادیه اروپا.",
        tag: "استاندارد امنیتی",
      },
    ],
    requirements: [
      "ارائه پرینت گردش حساب و اثبات انتقال وجوه به اتریش",
      "قرارداد تمدید بیمه درمانی معتبر",
    ],
    tipsFa: "درخواست تمدید باید حداکثر تا ۳ ماه قبل از تاریخ انقضا به اداره مربوطه تسلیم شود.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "******, *",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "NB-2022-AUT",
    },
  },

  // =========================================================================
  // 5. اقامت تمکن مالی اتریش — پریسا (۲۰۲۴–۲۰۲۵)
  // =========================================================================
  {
    id: "real-visa-parisa-financial-independence-2024",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung (Parisa Mehdin)",
    titleFa: "کارت اقامت تمکن مالی اتریش — پریسا",
    titleDe: "Niederlassungsbewilligung (Parisa Mehdin 2024-2025)",
    applicantStatus: "پرونده تمکن مالی موفق برای سرپرست خانواده و متقاضی اصلی",
    issuedBy: "اداره اقامت MA 35 وین",
    state: "Wien",
    issueDate: "۲۰۲۴/۱۱/۱۳",
    validUntil: "۲۰۲۵/۱۱/۱۳ (معتبر)",
    caseRef: "W-NB/2024-PARISA",
    isSpecialBadge: true,
    specialHighlight: "نمونه تاییدشده تمکن مالی با مدرک زبان و پوشش خانواده",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/_____________________1_88b306dd.webp",
    anatomyBreakdown: [
      {
        title: "احراز شرایط اقامت خودحمایتی",
        description: "تأمین کلیه الزامات قانونی اعم از مسکن متناسب و درآمد مستقل ماهانه.",
        tag: "تاییدیه قانونی",
      },
    ],
    requirements: [
      "مدرک زبان آلمانی A1 با مدرک رسمی ÖIF یا Goethe",
      "بیمه سلامت بین‌المللی با پوشش کامل بیمارستانی",
      "سند ملکی یا اجاره‌نامه رسمی مسکونی در وین",
    ],
    tipsFa: "همسر و فرزندان زیر ۱۸ سال متقاضی تمکن مالی می‌توانند همزمان کارت الحاق به خانواده دریافت کنند.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "Parisa Mehdin",
      dobMasked: "23.09.1979",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "NB-PARISA-2024",
      officialClauseDe: "AUSGENOMMEN ERWERBSTATIGKEIT",
    },
  },

  // =========================================================================
  // 6. اقامت تمکن مالی اتریش — حمیدرضا (دوره ۲۰۲۵–۲۰۲۶)
  // =========================================================================
  {
    id: "real-visa-hamidreza-financial-independence-2025",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung (Hamidreza 2025–2026)",
    titleFa: "کارت اقامت تمکن مالی اتریش — حمیدرضا (۲۰۲۵–۲۰۲۶)",
    titleDe: "Niederlassungsbewilligung (Hamidreza 2025-2026)",
    applicantStatus: "پرونده جدید تمکن مالی با اعتبار بلندمدت تا اواخر سال ۲۰۲۶",
    issuedBy: "MA 35 – Stadt Wien",
    state: "Wien",
    issueDate: "۲۰۲۵/۱۰/۲۶",
    validUntil: "۲۰۲۶/۱۰/۲۶ (معتبر)",
    caseRef: "W-NB/2025-HAMIDREZA",
    isSpecialBadge: true,
    specialHighlight: "جدیدترین نمونه کارت تمکن مالی با اعتبار تا اکتبر ۲۰۲۶",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/_______-______________________2025-2026_7e17a98a.webp",
    anatomyBreakdown: [
      {
        title: "تاریخ اعتبار تا پاییز ۲۰۲۶",
        description: "دارای اعتبار رسمی بلندمدت و امکان تمدید به اقامت دائم ۳ ساله.",
        tag: "اعتبار رسمی",
      },
    ],
    requirements: [
      "تمکن مالی غیرفعال مکفی بدون اشتغال",
      "بیمه سلامت اختصاصی اتریش",
      "گواهی عدم سوءپیشینه از اینترپل و دادگستری",
    ],
    tipsFa: "این کارت امکان افتتاح حساب بانکی، خرید ملک و تحصیل رایگان فرزندان در اتریش را فراهم می‌سازد.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "Hamidreza",
      dobMasked: "25.01.2003",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "NB-HAMID-2025",
    },
  },

  // =========================================================================
  // 7. اقامت تمکن مالی اتریش — رضا (دوره ۲۰۲۵–۲۰۲۶)
  // =========================================================================
  {
    id: "real-visa-reza-financial-independence-2025",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung (Reza 2025–2026)",
    titleFa: "کارت اقامت تمکن مالی اتریش — رضا (۲۰۲۵–۲۰۲۶)",
    titleDe: "Niederlassungsbewilligung (Reza 2025-2026)",
    applicantStatus: "اخذ موفقیت‌آمیز کارت اقامت تمکن مالی با اعتبار تا آگوست ۲۰۲۶",
    issuedBy: "اداره امور اقامت اتریش",
    state: "Wien",
    issueDate: "۲۰۲۵/۰۸/۱۷",
    validUntil: "۲۰۲۶/۰۸/۱۷ (معتبر)",
    caseRef: "W-NB/2025-REZA",
    isSpecialBadge: true,
    specialHighlight: "پرونده موفق با مدارک تمکن بانکی بین‌المللی",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/___-______________________2025-2026_ddec03d7.webp",
    anatomyBreakdown: [
      {
        title: "اعتبار دو ساله اقامت",
        description: "پس از اثبات تداوم شرایط تمکن، کارت‌های دوره بعدی صادر می‌شوند.",
        tag: "تمدید پایدار",
      },
    ],
    requirements: [
      "ارائه اسناد عواید سهام و اجاره املاک خارج از خاک اتریش",
      "تاییدیه سلامت و عدم اعتیاد",
      "تکمیل فرم درخواست رسمی NAG",
    ],
    tipsFa: "متقاضی موظف است حداقل ۱۸۳ روز در هر سال در حوزه اتحادیه اروپا و خاک اتریش حضور داشته باشد.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "Reza",
      dobMasked: "29.06.1982",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "NB-REZA-2025",
    },
  },

  // =========================================================================
  // 8. اقامت تمکن مالی اتریش — مهدی (دوره ۲۰۲۴–۲۰۲۵)
  // =========================================================================
  {
    id: "real-visa-mehdi-financial-independence-2024",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung (Mehdi 2024–2025)",
    titleFa: "کارت اقامت تمکن مالی اتریش — مهدی (۲۰۲۴–۲۰۲۵)",
    titleDe: "Niederlassungsbewilligung (Mehdi 2024-2025)",
    applicantStatus: "پرونده تمکن مالی با تاییدیه مدارک بانکی و اسناد دارایی",
    issuedBy: "MA 35 – Magistratsabteilung für Einwanderung",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۸/۰۸",
    validUntil: "۲۰۲۵/۰۸/۰۸",
    caseRef: "W-NB/2024-MEHDI",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/_____-______________________2025-2024_4058fab0.webp",
    anatomyBreakdown: [
      {
        title: "کارت اقامت فیزیکی رسمی",
        description: "دارای چیپ هوشمند شناسایی الکترونیک و هولوگرام دولتی اتریش.",
        tag: "شناسه رسمی",
      },
    ],
    requirements: [
      "مقرری ماهانه بازنشستگی یا سود سهام قابل اتکا",
      "قرارداد رسمی اجاره مسکن استاندارد",
    ],
    tipsFa: "تمکن مالی اتریش یکی از سریع‌ترین و باکیفیت‌ترین روش‌های مهاجرت خانوادگی به قلب اروپاست.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "Mehdi",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "NB-MEHDI-2024",
    },
  },

  // =========================================================================
  // 9. اقامت هنرمندی اتریش — نمونه رسمی (Niederlassungsbewilligung Künstler)
  // =========================================================================
  {
    id: "real-visa-artist-austria-3",
    category: "residence",
    methodKey: "artist",
    typeLabel: "اقامت هنرمندی اتریش",
    subType: "Niederlassungsbewilligung – Künstler gem. § 43a NAG",
    titleFa: "کارت اقامت هنرمندی اتریش — نمونه رسمی",
    titleDe: "Aufenthaltstitel Niederlassungsbewilligung Künstler",
    applicantStatus: "هنرمند مستقل در شاخه‌های هنرهای تجسمی، موسیقی و اجرا با درآمد مستمر از آثار هنری",
    issuedBy: "اداره امور اقامت اتریش (MA 35)",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۳/۱۵",
    validUntil: "۲۰۲۵/۰۳/۱۵",
    caseRef: "VIE-ART/2024-KUNST",
    isSpecialBadge: true,
    specialHighlight: "اجازه کار هنری آزاد بدون نیاز به ارزیابی اداره کار (AMS)",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 43a NAG (Künstlerische Tätigkeit)",
    imageUrl: "/assets/aistudio/____________________3_e9413ff4.webp",
    anatomyBreakdown: [
      {
        title: "عنوان اختصاصی KÜNSTLER",
        description: "درج عبارت رسمی KÜNSTLER در بخش توضیحات کارت اقامت جهت آزادی عمل فعالیت هنری.",
        tag: "بند هنرمندی",
      },
    ],
    requirements: [
      "پورتفولیو و کاتالوگ آثار و جوایز معتبر هنری",
      "قراردادهای کاری و نمایشگاهی با گالری‌ها یا نهادهای فرهنگی اتریش",
      "بیمه سلامت اختصاصی سازمان بیمه اجتماعی شاغلین مستقل (SVS)",
    ],
    tipsFa: "دارندگان اقامت هنرمندی پس از دو سال فعالیت مستمر می‌توانند کارت خود را به کارت RWR Plus با بازار کار نامحدود تبدیل کنند.",
    cardDesign: {
      variant: "artist",
      cardHolderMasked: "******, *",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "ART-2024-VIE",
      officialClauseDe: "KUNSTLER",
    },
  },

  // =========================================================================
  // 10. اقامت هنرمندی اتریش — دوره ۲۰۲۳
  // =========================================================================
  {
    id: "real-visa-artist-austria-2023",
    category: "residence",
    methodKey: "artist",
    typeLabel: "اقامت هنرمندی اتریش",
    subType: "Niederlassungsbewilligung – Künstler (April 2023)",
    titleFa: "کارت اقامت هنرمندی اتریش — دوره ۲۰۲۳",
    titleDe: "Aufenthaltstitel Niederlassungsbewilligung Künstler 2023",
    applicantStatus: "فعال فرهنگی و هنری با قرارداد رسمی و تاییدیه انجمن‌های هنری اتریش",
    issuedBy: "شهرداری وین — MA 35",
    state: "Wien",
    issueDate: "۲۰۲۲/۰۴/۱۵",
    validUntil: "۲۰۲۳/۰۴/۱۵",
    caseRef: "W-ART/2023-04-KUNST",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 43a NAG",
    imageUrl: "/assets/aistudio/__________05875601.jpg",
    anatomyBreakdown: [
      {
        title: "تاییدیه هنری اتریش",
        description: "تایید صلاحیت تخصصی هنری متقاضی توسط کمیسیون‌های فرهنگی دولت فدرال اتریش.",
        tag: "ارزیابی هنری",
      },
    ],
    requirements: [
      "اثبات حداقل درآمد لازم از فعالیت‌های هنری معادل حداقل معیشت ASVG",
      "محل سکونت قانونی در وین",
    ],
    tipsFa: "وین پایتخت موسیقی و هنر اروپاست و شرایط حمایتی کم‌نظیری برای هنرمندان بین‌المللی فراهم می‌کند.",
    cardDesign: {
      variant: "artist",
      cardHolderMasked: "******, *",
      dobMasked: "** ** 1979",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "ART-2023-04",
      officialClauseDe: "KUNSTLER",
    },
  },

  // =========================================================================
  // 11. ویزای شینگن اتحادیه اروپا — لهستان / سید امیر (۲۰۲۳)
  // =========================================================================
  {
    id: "real-visa-poland-schengen-2023",
    category: "special",
    methodKey: "job-seeker",
    typeLabel: "ویزای شینگن اتحادیه اروپا",
    subType: "Visum Schengen Typ C (Multiple Entry)",
    titleFa: "ویزای شینگن لهستان / ورود به حوزه شنگن — سید امیر",
    titleDe: "Visum Schengen C – Seyed Amir (Polen / Schengen-Raum)",
    applicantStatus: "ویزای برچسبی پاسپورت تایپ C معتبر برای سفر قانونی به کلیه کشورهای حوزه شنگن و اتریش",
    issuedBy: "سفارت جمهوری لهستان در تهران (Ambasada RP w Teheranie)",
    state: "Wien",
    issueDate: "۲۰۲۳/۰۷/۲۵",
    validUntil: "۲۰۲۳/۰۹/۱۵",
    caseRef: "PL-SCH/2023-AMIR-0725",
    isSpecialBadge: true,
    specialHighlight: "ویزای معتبر شنگن با امکان تردد در کلیه کشورهای اروپایی از جمله اتریش",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "مقررات روادید شنگن (EU Visa Code No 810/2009)",
    imageUrl: "/assets/aistudio/_________________106b1ff5.webp",
    anatomyBreakdown: [
      {
        title: "برچسب رسمی روادید شنگن (Visa Sticker)",
        description: "ویزای امنیتی اتحادیه اروپا چاپ‌شده در پاسپورت با کدهای هولوگرام و UV.",
        tag: "لیبل پاسپورت",
      },
    ],
    requirements: [
      "برنامه سفر موثق و بلیت رفت و برگشت",
      "رزرو قطعی هتل و محل اقامت در حوزه شنگن",
      "بیمه مسافرتی شنگن با سقف پوشش حداقل ۳۰ هزار یورو",
    ],
    tipsFa: "ویزای شینگن تایپ C مجوز قانونی حضور تا سقف ۹۰ روز در هر بازه ۱۸۰ روزه در ۲۹ کشور عضو شنگن است.",
    cardDesign: {
      variant: "visa-d",
      cardHolderMasked: "Seyed Amir Hossein",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "SCH-PL-2023-AMIR",
    },
  },

  // =========================================================================
  // 12. کارت قرمز سفید قرمز پلاس — وین (دوره ۲۰۱۹–۲۰۲۱)
  // =========================================================================
  {
    id: "real-visa-rwr-plus-wien-2019",
    category: "residence",
    methodKey: "rwr-plus",
    typeLabel: "کارت قرمز سفید قرمز پلاس",
    subType: "Rot-Weiß-Rot – Karte Plus (Wien 2019–2021)",
    titleFa: "کارت سرخ-سفید-سرخ پلاس اتریش — وین (دوره ۲۰۱۹)",
    titleDe: "Rot-Weiß-Rot – Karte Plus gem. § 41a NAG (Wien 18.01.2019)",
    applicantStatus: "نیروی کلیدی و متخصص با سپری کردن دوره ۲ ساله RWR اولیه و ارتقا به پلاس با بازار کار کاملاً آزاد",
    issuedBy: "MA 35 – Stadt Wien",
    state: "Wien",
    issueDate: "۲۰۱۹/۰۱/۱۸",
    validUntil: "۲۰۲۱/۰۶/۱۷",
    caseRef: "W-RWR+/2019-0118",
    isSpecialBadge: true,
    specialHighlight: "حق اشتغال کاملاً آزاد و نامحدود نزد هر کارفرما در سراسر اتریش",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 41a NAG iVm § 17 AuslBG",
    imageUrl: "/assets/aistudio/___________________-______-red-white-red_austria-_0_58818c73.webp",
    anatomyBreakdown: [
      {
        title: "عبارت کلیدی ROT-WEISS-ROT - KARTE PLUS",
        description: "برترین رتبه کارت اقامت کاری موقت اتریش با آزادی کامل انتخاب شغل و کارفرما.",
        tag: "کار آزاد",
      },
    ],
    requirements: [
      "حداقل ۲۱ ماه اشتغال قانونی با کارت RWR اولیه طی ۲۴ ماه گذشته",
      "گواهی پرداخت حق بیمه و بازنشستگی از سازمان بیمه اجتماعی (ÖGK)",
    ],
    tipsFa: "دارندگان کارت RWR Plus نیازی به اخذ مجوز مجدد از اداره کار (AMS) ندارند.",
    cardDesign: {
      variant: "rwr-plus",
      cardHolderMasked: "******, *",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "RWR+-2019-VIE",
      officialClauseDe: "FREIER ARBEITSMARKTZUGANG",
    },
  },

  // =========================================================================
  // 13. کارت قرمز سفید قرمز پلاس — وین (دوره ۲۰۱۷–۲۰۱۹)
  // =========================================================================
  {
    id: "real-visa-rwr-plus-wien-2017",
    category: "residence",
    methodKey: "rwr-plus",
    typeLabel: "کارت قرمز سفید قرمز پلاس",
    subType: "Rot-Weiß-Rot – Karte Plus (Wien 2017–2019)",
    titleFa: "کارت سرخ-سفید-سرخ پلاس اتریش — وین (دوره ۲۰۱۷)",
    titleDe: "Rot-Weiß-Rot – Karte Plus (Wien 09.05.2017)",
    applicantStatus: "متخصص مهندسی و فناوری با ۲ سال سابقه کار موفق در شرکت‌های اتریشی",
    issuedBy: "MA 35 – Stadt Wien",
    state: "Wien",
    issueDate: "۲۰۱۷/۰۵/۰۹",
    validUntil: "۲۰۱۹/۰۱/۱۷",
    caseRef: "W-RWR+/2017-0509",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 41a NAG",
    imageUrl: "/assets/aistudio/___________________-______-red-white-red_austria-_2__16f3853a.webp",
    anatomyBreakdown: [
      {
        title: "تاریخ اخذ رسمی در وین",
        description: "صادرشده در تاریخ ۰۹ مه ۲۰۱۷ توسط اداره امور اقامت شهر وین.",
        tag: "سابقه موفق",
      },
    ],
    requirements: [
      "قرارداد کاری معتبر با حقوق مصوب Kollektivvertrag",
      "گواهی ثبت آدرس سکونت (Meldezettel) در وین",
    ],
    tipsFa: "مسیر اصلی تبدیل اقامت کاری به اقامت دائم ۵ ساله اتحادیه اروپا (Daueraufenthalt EU).",
    cardDesign: {
      variant: "rwr-plus",
      cardHolderMasked: "******, *",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "RWR+-2017-VIE",
    },
  },

  // =========================================================================
  // 14. کارت قرمز سفید قرمز پلاس — سید (۲۰۲۴)
  // =========================================================================
  {
    id: "real-visa-rwr-plus-seyed-2024",
    category: "residence",
    methodKey: "rwr-plus",
    typeLabel: "کارت قرمز سفید قرمز پلاس",
    subType: "Rot-Weiß-Rot – Karte Plus (Seyed 2024)",
    titleFa: "کارت سرخ-سفید-سرخ پلاس اتریش — سید (۲۰۲۴)",
    titleDe: "Rot-Weiß-Rot – Karte Plus (Seyed 2024)",
    applicantStatus: "تمدید موفق کارت RWR Plus با تاییدیه اشتغال و فعالیت حرفه‌ای مستمر",
    issuedBy: "اداره اقامت جمهوری اتریش",
    state: "Wien",
    issueDate: "۲۰۲۲/۰۱/۲۳",
    validUntil: "۲۰۲۴/۰۱/۲۳",
    caseRef: "AUT-RWR+/2024-SEYED",
    isSpecialBadge: true,
    specialHighlight: "دارای اعتبار دوساله اشتغال آزاد در کل اتریش",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 41a NAG",
    imageUrl: "/assets/aistudio/___________________-______-red-white-red_austria-_6__a7c9db34.webp",
    anatomyBreakdown: [
      {
        title: "تمدید دو ساله بدون وابستگی به کارفرما",
        description: "امکان تغییر کارفرما، تغییر شغل و خوداشتغالی بدون نیاز به هماهنگی مجدد با اداره مهاجرت.",
        tag: "استقلال شغلی",
      },
    ],
    requirements: [
      "اشتغال قانونی در اتریش با رعایت سقف‌های بیمه‌ای",
      "محل سکونت قانونی در اتریش",
    ],
    tipsFa: "دارنده این کارت می‌تواند اعضای درجه یک خانواده خود را نیز با کارت RWR Plus الحاق نماید.",
    cardDesign: {
      variant: "rwr-plus",
      cardHolderMasked: "Seyed",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "RWR+-SEYED-2024",
    },
  },

  // =========================================================================
  // 15. کارت قرمز سفید قرمز اتریش (RWR) — وین (۲۰۱۸–۲۰۲۰)
  // =========================================================================
  {
    id: "real-visa-rwr-wien-2018",
    category: "residence",
    methodKey: "skilled-workers",
    typeLabel: "کارت قرمز سفید قرمز اتریش",
    subType: "Rot-Weiß-Rot – Karte (Wien 2018–2020)",
    titleFa: "کارت سرخ-سفید-سرخ اتریش (RWR) — وین (۲۰۱۸)",
    titleDe: "Rot-Weiß-Rot – Karte gem. § 41 NAG (Wien 19.06.2018)",
    applicantStatus: "نیروی متخصص در مشاغل مورد نیاز (Mangelberufe) با احراز امتیازات تخصصی و ارزیابی AMS",
    issuedBy: "MA 35 Wien + اداره بازار کار (AMS)",
    state: "Wien",
    issueDate: "۲۰۱۸/۰۶/۱۹",
    validUntil: "۲۰۲۰/۰۶/۱۹",
    caseRef: "W-RWR/2018-0619",
    workPermitStatus: "محدود به کارفرمای مشخص",
    legalBasis: "§ 12a AuslBG iVm § 41 NAG",
    imageUrl: "/assets/aistudio/___________________-______-red-white-red_austria-_15_946d41e7.webp",
    anatomyBreakdown: [
      {
        title: "ROT-WEISS-ROT - KARTE",
        description: "کارت اقامت و اشتغال دو ساله وابسته به کارفرمای متقاضی که راه را برای اخذ کارت پلاس هموار می‌کند.",
        tag: "اقامت تخصصی",
      },
    ],
    requirements: [
      "کسب حداقل ۵۵ امتیاز از فاکتورهای سن، تحصیلات، سابقه کاری و زبان",
      "پیشنهاد کاری تمام‌وقت با حداقل دستمزد مصوب Kollektivvertrag",
    ],
    tipsFa: "نیروی کار پس از گذراندن ۲۱ ماه با این کارت می‌تواند کارت مستقل RWR Plus دریافت کند.",
    cardDesign: {
      variant: "rwr",
      cardHolderMasked: "******, *",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "RWR-2018-VIE",
    },
  },

  // =========================================================================
  // 16. ویزای تحصیلی اتریش (Visum D) — یاشار (۲۰۲۴)
  // =========================================================================
  {
    id: "real-visa-yashar-student-d-2024",
    category: "admission",
    methodKey: "student",
    typeLabel: "ویزای تحصیلی اتریش (Visum D)",
    subType: "Visum D für Studierende (Yashar)",
    titleFa: "ویزای تحصیلی تایپ D اتریش — یاشار (۲۰۲۴)",
    titleDe: "Visum D zur Einreise für Studierende (Teheran – Wien)",
    applicantStatus: "دانشجوی دارای نامه پذیرش قطعی دانشگاهی با ویزای ورود رسمی تایپ D از سفارت اتریش در تهران",
    issuedBy: "سفارت جمهوری اتریش در تهران (Österreichische Botschaft Teheran)",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۵/۲۱",
    validUntil: "۲۰۲۴/۱۰/۱۶",
    caseRef: "AUT-VISAD/2024-YASHAR",
    isSpecialBadge: true,
    specialHighlight: "ویزای ورود قانونی به خاک اتریش جهت دریافت کارت اقامت دانشجویی در MA 35",
    workPermitStatus: "۲۰ ساعت در هفته",
    legalBasis: "§ 20 FPG iVm § 64 NAG",
    imageUrl: "/assets/aistudio/_____________________________2024-______2a857c96.webp",
    anatomyBreakdown: [
      {
        title: "نوع ویزا: Visum D (ÖSTERREICH)",
        description: "ویزای ملی بلندمدت نوع D با اجازه حضور تا چند ماه برای تکمیل ثبت‌نام دانشگاه و دریافت کارت اقامت.",
        tag: "ویزای ملی اتریش",
      },
      {
        title: "تاریخ اخذ و سفر",
        description: "صادرشده در ۲۱ مه ۲۰۲۴ توسط سفارت اتریش در تهران با بازه ورود ۱۷ ژوئن تا ۱۶ اکتبر ۲۰۲۴.",
        tag: "تاریخ صدور سفارت",
      },
    ],
    requirements: [
      "نامه پذیرش رسمی از یکی از دانشگاه‌های دولتی اتریش (Zulassungsbescheid)",
      "تمکن مالی دانشجویی در حساب بانکی معتبر",
      "قرارداد خوابگاه دانشجویی یا اقامتگاه تاییدشده",
      "بیمه مسافرتی معتبر شنگن",
    ],
    tipsFa: "دانشجو پس از ورود با ویزای D ظرف ۳ روز باید ثبت آدرس (Meldezettel) انجام داده و کارت اقامت دانشجویی خود را تحویل بگیرد.",
    cardDesign: {
      variant: "visa-d",
      cardHolderMasked: "YASHAR",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "VISAD-2024-YASHAR",
    },
  },

  // =========================================================================
  // 17. کارت اقامت دانشجویی اتریش — دوره ۲۰۲۵
  // =========================================================================
  {
    id: "real-visa-student-austria-2025",
    category: "admission",
    methodKey: "student",
    typeLabel: "ویزای تحصیلی اتریش",
    subType: "Aufenthaltsbewilligung – Student (2025)",
    titleFa: "کارت اقامت دانشجویی اتریش — دوره ۲۰۲۵",
    titleDe: "Aufenthaltsbewilligung Student – Republik Österreich",
    applicantStatus: "دانشجوی رسمی دانشگاه وین با تمدید قانونی سالیانه و اجازه اشتغال دانشجویی",
    issuedBy: "MA 35 – Fachbereich Einwanderung Wien",
    state: "Wien",
    issueDate: "۲۰۲۵/۰۱/۱۵",
    validUntil: "۲۰۲۶/۰۱/۱۵ (معتبر)",
    caseRef: "W-STU/2025-0115",
    isSpecialBadge: true,
    specialHighlight: "دارای اجازه کار قانونی دانشجویی تا ۲۰ ساعت در هفته",
    workPermitStatus: "۲۰ ساعت در هفته",
    legalBasis: "§ 64 NAG iVm § 4 Abs 7 AuslBG",
    imageUrl: "/assets/aistudio/_____________________________2025_3247778e.webp",
    anatomyBreakdown: [
      {
        title: "Aufenthaltsbewilligung Student",
        description: "کارت اقامت تحصیلی معتبر که هر سال با ارائه کارنامه قبولی (حداقل ۱۶ واحد ECTS) تمدید می‌شود.",
        tag: "اقامت تحصیلی",
      },
    ],
    requirements: [
      "ثبت‌نام ترمی معتبر (Inskriptionsbestätigung)",
      "بیمه دانشجویی ÖGK Selbstversicherung",
      "تمکن مالی سالیانه حدود ۱۲ تا ۱۵ هزار یورو",
    ],
    tipsFa: "فارغ‌التحصیلان دانشگاه‌های اتریش بلافاصله بدون قرعه‌کشی و جدول امتیازی می‌توانند کارت RWR ویژه فارغ‌التحصیلان دریافت کنند.",
    cardDesign: {
      variant: "student",
      cardHolderMasked: "******, *",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "STU-2025-VIE",
    },
  },

  // =========================================================================
  // 18. کارت اقامت تحصیلی اتریش — سحر (۲۰۲۵)
  // =========================================================================
  {
    id: "real-visa-sahar-student-2025",
    category: "admission",
    methodKey: "student",
    typeLabel: "ویزای تحصیلی اتریش",
    subType: "Aufenthaltsbewilligung Student (Sahar 2025)",
    titleFa: "کارت اقامت تحصیلی اتریش — سحر (۲۰۲۵)",
    titleDe: "Aufenthaltsbewilligung Student (Sahar)",
    applicantStatus: "دانشجوی مقطع کارشناسی ارشد در دانشگاه دولتی اتریش",
    issuedBy: "شهرداری وین — MA 35",
    state: "Wien",
    issueDate: "۲۰۲۵/۰۲/۱۰",
    validUntil: "۲۰۲۶/۰۲/۱۰ (معتبر)",
    caseRef: "W-STU/2025-SAHAR",
    workPermitStatus: "۲۰ ساعت در هفته",
    legalBasis: "§ 64 NAG",
    imageUrl: "/assets/aistudio/_____________________________2025-_____d1113669.webp",
    anatomyBreakdown: [
      {
        title: "مجوز اقامت تحصیلی کارشناسی ارشد",
        description: "امکان اشتغال پاره‌وقت در شرکت‌های اتریشی و شرکت در پروژه‌های تحقیقاتی دانشگاه.",
        tag: "تحصیلات تکمیلی",
      },
    ],
    requirements: [
      "ارائه تاییدیه قبولی دروس ترمی",
      "قرارداد تمدید خوابگاه یا آپارتمان دانشجویی",
    ],
    tipsFa: "دانشجویان در طول دوره تحصیل از تخفیف‌های ویژه حمل و نقل عمومی اتریش (Klimaticket Ö-Jugend) بهره‌مند هستند.",
    cardDesign: {
      variant: "student",
      cardHolderMasked: "Sahar",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "STU-2025-SAHAR",
    },
  },

  // =========================================================================
  // 19. ویزای دانش‌آموزی اتریش — یاشار (۲۰۲۴)
  // =========================================================================
  {
    id: "real-visa-yashar-pupil-2024",
    category: "admission",
    methodKey: "student",
    typeLabel: "ویزای دانش‌آموزی اتریش",
    subType: "Aufenthaltsbewilligung – Schüler (Yashar)",
    titleFa: "کارت اقامت دانش‌آموزی اتریش — یاشار (۲۰۲۴)",
    titleDe: "Aufenthaltsbewilligung Schüler gem. § 63 NAG (Yashar)",
    applicantStatus: "دانش‌آموز زیر ۱۸ سال مشغول به تحصیل در مدارس دولتی و بین‌المللی اتریش",
    issuedBy: "MA 35 – Einwanderung Wien",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۶/۲۰",
    validUntil: "۲۰۲۵/۰۶/۲۰",
    caseRef: "W-SCH/2024-YASHAR",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 63 NAG (Schüler)",
    imageUrl: "/assets/aistudio/_________________________________2024-______9fa78827.webp",
    anatomyBreakdown: [
      {
        title: "مجوز اقامت دانش‌آموزی (Schüler)",
        description: "اقامت قانونی برای فرزندان در مدارس اتریش همراه با قیم قانونی یا خوابگاه شبانه‌روزی تاییدشده.",
        tag: "اقامت دانش‌آموزی",
      },
    ],
    requirements: [
      "ثبت‌نام رسمی در یکی از مدارس اتریش (Schulbesuchsbestätigung)",
      "تعیین سرپرست یا قیم قانونی در اتریش (Obsorge)",
      "بیمه درمانی و مسکن مناسب",
    ],
    tipsFa: "نظام آموزشی اتریش یکی از برترین سیستم‌های آموزشی دنیاست و فارغ‌التحصیلان دیپلم اتریشی (Matura) مستقیم وارد دانشگاه‌های برتر اروپا می‌شوند.",
    cardDesign: {
      variant: "student",
      cardHolderMasked: "Yashar",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "SCH-2024-YASHAR",
    },
  },

  // =========================================================================
  // 20. کارت اقامت الحاق به خانواده اتریش — دوره ۲۰۲۴
  // =========================================================================
  {
    id: "real-visa-family-reunification-2024",
    category: "residence",
    methodKey: "family",
    typeLabel: "کارت اقامت الحاق به خانواده",
    subType: "Aufenthaltstitel Familienangehöriger (RWR Plus)",
    titleFa: "کارت اقامت الحاق به خانواده اتریش — ۲۰۲۴",
    titleDe: "Rot-Weiß-Rot – Karte Plus (Familienzusammenführung 2024)",
    applicantStatus: "الحاق همسر و فرزندان به دارنده کارت اقامت متخصصان در اتریش",
    issuedBy: "اداره امور اتباع خارجی و اقامت اتریش",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۳/۱۸",
    validUntil: "۲۰۲۵/۰۳/۱۸",
    caseRef: "AUT-FAM/2024-NB",
    isSpecialBadge: true,
    specialHighlight: "دارای اجازه کار ۱۰۰٪ آزاد و بدون سهمیه برای همسر",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 46 NAG iVm § 17 AuslBG",
    imageUrl: "/assets/aistudio/__________________________________________2024-_8a8cbd58.webp",
    anatomyBreakdown: [
      {
        title: "الحاق خانواده با کارت RWR Plus",
        description: "اعطای کارت اقامت پلاس به همسر با حق اشتغال آزاد در تمام مشاغل بدون نیاز به ارزیابی AMS.",
        tag: "الحاق خانواده",
      },
    ],
    requirements: [
      "عقدنامه رسمی ترجمه و تاییدشده با آپوستیل یا سفارت",
      "مدرک زبان آلمانی A1 همسر (در صورت الزام نوع ویزای نفر اصلی)",
      "درآمد مکفی متقاضی اصلی برای پوشش هزینه‌های خانواده",
    ],
    tipsFa: "همسر متقاضی دارای کارت بلوکارت یا نخبگان حتی از شرط مدرک زبان آلمانی A1 اولیه نیز معاف است.",
    cardDesign: {
      variant: "family",
      cardHolderMasked: "******, *",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "FAM-2024-AUT",
    },
  },

  // =========================================================================
  // 21. کارت اقامت دانشجویی اتریش — مرتضی (۲۰۲۴)
  // =========================================================================
  {
    id: "real-visa-morteza-student-2024",
    category: "admission",
    methodKey: "student",
    typeLabel: "ویزای تحصیلی اتریش",
    subType: "Aufenthaltsbewilligung Student (Morteza 2024)",
    titleFa: "کارت اقامت دانشجویی اتریش — مرتضی (۲۰۲۴)",
    titleDe: "Aufenthaltsbewilligung Student (Morteza)",
    applicantStatus: "پذیرش در دانشگاه وین و دریافت کارت دانشجویی با تمکن مالی شخصی",
    issuedBy: "MA 35 Wien",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۴/۱۱",
    validUntil: "۲۰۲۵/۰۴/۱۱",
    caseRef: "W-STU/2024-MORTEZA",
    workPermitStatus: "۲۰ ساعت در هفته",
    legalBasis: "§ 64 NAG",
    imageUrl: "/assets/aistudio/_____________________________2024-______04cae95c.webp",
    anatomyBreakdown: [
      {
        title: "اقامت تحصیلی اتریش",
        description: "صادر شده پس از بررسی اسناد مالی و تحصیلی در شهرداری وین.",
        tag: "دانشجویی",
      },
    ],
    requirements: [
      "پذیرش دانشگاهی رسمی",
      "بیمه سلامت دانشجویی",
      "اثبات تمکن مالی در حساب بانکی",
    ],
    tipsFa: "کارت اقامت دانشجویی اجازه تردد آزاد در کل اتحادیه اروپا بدون نیاز به اخذ ویزای مجدد را فراهم می‌کند.",
    cardDesign: {
      variant: "student",
      cardHolderMasked: "Morteza",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "STU-2024-MORTEZA",
    },
  },

  // =========================================================================
  // 22. کارت اقامت تمکن مالی اتریش — نادیا (۲۰۲۵–۲۰۲۶)
  // =========================================================================
  {
    id: "real-visa-nadia-financial-2025",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung (Nadia 2025–2026)",
    titleFa: "کارت اقامت تمکن مالی اتریش — نادیا (۲۰۲۵–۲۰۲۶)",
    titleDe: "Niederlassungsbewilligung (Nadia 2025-2026)",
    applicantStatus: "پرونده موفق اقامت تمکن مالی با اسناد ملکی و تمکن بانکی",
    issuedBy: "شهرداری وین — MA 35",
    state: "Wien",
    issueDate: "۲۰۲۵/۰۹/۱۰",
    validUntil: "۲۰۲۶/۰۹/۱۰ (معتبر)",
    caseRef: "W-NB/2025-NADIA",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/______-______________________2025-2026_80d155e9.webp",
    anatomyBreakdown: [
      {
        title: "اقامت خودحمایتی نادیا",
        description: "دارای کلیه استانداردهای لازم سهمیه سالانه تمکن مالی اتریش.",
        tag: "خودحمایتی",
      },
    ],
    requirements: [
      "درآمد مستقل غیرفعال",
      "بیمه خصوصی جامع اتریش",
      "قرارداد مسکن مسکونی معتبر",
    ],
    tipsFa: "پس از ۵ سال تداوم اقامت تمکن مالی و ارائه مدرک زبان آلمانی B1، اقامت دائم ۵ ساله اتحادیه اروپا اعطا می‌گردد.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "Nadia",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "NB-2025-NADIA",
    },
  },

  // =========================================================================
  // 23. کارت اقامت دانشجویی اتریش — فرشته (۲۰۲۵)
  // =========================================================================
  {
    id: "real-visa-fereshteh-student-2025",
    category: "admission",
    methodKey: "student",
    typeLabel: "ویزای دانشجویی اتریش",
    subType: "Aufenthaltsbewilligung Student (Fereshteh 2025)",
    titleFa: "کارت اقامت دانشجویی اتریش — فرشته (۲۰۲۵)",
    titleDe: "Aufenthaltsbewilligung Student (Fereshteh)",
    applicantStatus: "دانشجوی پذیرفته‌شده در مقطع تحصیلات دانشگاهی وین",
    issuedBy: "MA 35 – Fachbereich Einwanderung",
    state: "Wien",
    issueDate: "۲۰۲۵/۰۳/۰۱",
    validUntil: "۲۰۲۶/۰۳/۰۱ (معتبر)",
    caseRef: "W-STU/2025-FERESHTEH",
    workPermitStatus: "۲۰ ساعت در هفته",
    legalBasis: "§ 64 NAG",
    imageUrl: "/assets/aistudio/__________________________________2025-2025-__________5844eb84.webp",
    anatomyBreakdown: [
      {
        title: "مجوز قانونی اقامت و تحصیل",
        description: "معتبر برای زندگی و تحصیل در اتریش با حق کار پاره‌وقت قانونی.",
        tag: "دانشجویی",
      },
    ],
    requirements: [
      "گواهی ثبت‌نام دانشگاهی معتبر",
      "حساب بانکی تاییدشده دانشجویی",
    ],
    tipsFa: "اتریش کشوری با شهریه دانشگاهی بسیار پایین (کمتر از ۸۰۰ یورو در هر ترم) برای دانشجویان بین‌المللی است.",
    cardDesign: {
      variant: "student",
      cardHolderMasked: "Fereshteh",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "STU-2025-FERESHTEH",
    },
  },

  // =========================================================================
  // 24. کارت اقامت تحصیلی اتریش — مژده (۲۰۲۴)
  // =========================================================================
  {
    id: "real-visa-mojdeh-student-2024",
    category: "admission",
    methodKey: "student",
    typeLabel: "ویزای تحصیلی اتریش",
    subType: "Aufenthaltsbewilligung Student (Mojdeh 2024)",
    titleFa: "کارت اقامت تحصیلی اتریش — مژده (۲۰۲۴)",
    titleDe: "Aufenthaltsbewilligung Student (Mojdeh)",
    applicantStatus: "تحصیل در دانشگاه‌های معتبر دولتی اتریش",
    issuedBy: "اداره اقامت MA 35 وین",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۵/۰۲",
    validUntil: "۲۰۲۵/۰۵/۰۲",
    caseRef: "W-STU/2024-MOJDEH",
    workPermitStatus: "۲۰ ساعت در هفته",
    legalBasis: "§ 64 NAG",
    imageUrl: "/assets/aistudio/_____________________________2024-_____eb3f4c13.webp",
    anatomyBreakdown: [
      {
        title: "کارت دانشجویی اتریش",
        description: "اقامت یکساله تمدیدپذیر بر پایه موفقیت تحصیلی.",
        tag: "تحصیلی",
      },
    ],
    requirements: [
      "اثبات قبولی در دروس ترمی",
      "بیمه درمان دانشجویی",
    ],
    tipsFa: "فارغ‌التحصیلان پس از پایان درس تا ۱۲ ماه مهلت دارند در اتریش به دنبال کار مناسب بگردند.",
    cardDesign: {
      variant: "student",
      cardHolderMasked: "Mojdeh",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "STU-2024-MOJDEH",
    },
  },

  // =========================================================================
  // 25. اقامت هنرمندی اتریش — پاراک (۲۰۲۴–۲۰۲۵)
  // =========================================================================
  {
    id: "real-visa-parak-artist-2024",
    category: "residence",
    methodKey: "artist",
    typeLabel: "اقامت هنرمندی اتریش",
    subType: "Artist Visa Niederlassungsbewilligung (Parak 2024–2025)",
    titleFa: "کارت اقامت هنرمندی اتریش — پاراک (۲۰۲۴–۲۰۲۵)",
    titleDe: "Niederlassungsbewilligung – Künstler (Parak)",
    applicantStatus: "هنرمند با ارائه رزومه تخصصی، آثار هنری و قراردادهای فرهنگی در وین",
    issuedBy: "MA 35 Wien",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۶/۱۵",
    validUntil: "۲۰۲۵/۰۶/۱۵",
    caseRef: "W-ART/2024-PARAK",
    isSpecialBadge: true,
    specialHighlight: "فعالیت هنری بدون نیاز به بررسی تست بازار کار اداره کار اتریش",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 43a NAG",
    imageUrl: "/assets/aistudio/__________________2024-2025___Artist_visa____________2024-______05d27b7c.webp",
    anatomyBreakdown: [
      {
        title: "تاییدیه کانون هنرمندان اتریش",
        description: "احراز اصالت و درآمدزایی آثار هنری توسط کارشناسان وزارت فرهنگ اتریش.",
        tag: "مجوز هنری",
      },
    ],
    requirements: [
      "ارائه سوابق نمایشگاهی و رزومه مستند هنری",
      "پیش‌قراردادهای فروش اثر یا اجرای برنامه در اتریش",
      "بیمه سلامت جامع هنرمندان SVS",
    ],
    tipsFa: "هنرمندان در اتریش از پرداخت برخی مالیات‌های خاص معاف بوده و از صندوق‌های حمایتی دولتی بهره‌مند می‌شوند.",
    cardDesign: {
      variant: "artist",
      cardHolderMasked: "Parak",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "ART-2024-PARAK",
      officialClauseDe: "KUNSTLER",
    },
  },

  // =========================================================================
  // 26. اقامت تمکن مالی اتریش — امیر (۲۰۲۵)
  // =========================================================================
  {
    id: "real-visa-amir-financial-2025",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung (Amir 2025)",
    titleFa: "کارت اقامت تمکن مالی اتریش — امیر (۲۰۲۵)",
    titleDe: "Niederlassungsbewilligung (Amir 2025)",
    applicantStatus: "پرونده خودحمایتی با تاییدیه بانکی و گردش حساب ارزی بدون وابستگی شغلی",
    issuedBy: "شهرداری وین — MA 35",
    state: "Wien",
    issueDate: "۲۰۲۵/۰۴/۱۴",
    validUntil: "۲۰۲۶/۰۴/۱۴ (معتبر)",
    caseRef: "W-NB/2025-AMIR",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/____________________________2025-2025-______1e89025a.jpg",
    anatomyBreakdown: [
      {
        title: "اقامت خودحمایتی سال ۲۰۲۵",
        description: "صادرشده بر اساس بند ۴۴ قانون اقامت اتریش ویژه دارندگان تمکن مالی.",
        tag: "سهمیه تمکن مالی",
      },
    ],
    requirements: [
      "سپرده نقدی کافی در حساب بانکی",
      "اثبات درآمد غیرفعال ماهانه",
      "بیمه سلامت معتبر اتریش",
    ],
    tipsFa: "تمکن مالی اتریش نیازی به سرمایه‌گذاری یا خرید اجباری ملک ندارد و صرفاً اثبات درآمد ملاک است.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "Amir",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "NB-2025-AMIR",
    },
  },

  // =========================================================================
  // 27. اقامت تمکن مالی اتریش — اشکان (۲۰۲۶)
  // =========================================================================
  {
    id: "real-visa-ashkan-financial-2026",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung (Ashkan 2026)",
    titleFa: "کارت اقامت تمکن مالی اتریش — اشکان (۲۰۲۶)",
    titleDe: "Niederlassungsbewilligung (Ashkan 2026)",
    applicantStatus: "پرونده تاییدشده خودحمایتی با اعتبار رسمی تا سال ۲۰۲۶",
    issuedBy: "اداره اقامت MA 35 وین",
    state: "Wien",
    issueDate: "۲۰۲۵/۰۶/۱۸",
    validUntil: "۲۰۲۶/۰۶/۱۸ (معتبر)",
    caseRef: "W-NB/2026-ASHKAN",
    isSpecialBadge: true,
    specialHighlight: "اعتبار رسمی بلندمدت کارت اقامت تا تابستان ۲۰۲۶",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/________________________________2026-______59ad5e27.jpg",
    anatomyBreakdown: [
      {
        title: "اعتبار بلندمدت اقامت",
        description: "دارای کلیه تاییدات قانونی اداره اقامت و شهروندی وین.",
        tag: "اعتبار ۲۰۲۶",
      },
    ],
    requirements: [
      "تاییدیه درآمد غیرفعال مستقل",
      "محل سکونت قانونی در اتریش",
      "بیمه سلامت با سقف نامحدود",
    ],
    tipsFa: "داشتن کارت اقامت اتریش امکان افتتاح حساب در معتبرترین بانک‌های اروپایی چون Erste Bank و Raiffeisen را فراهم می‌سازد.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "Ashkan",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "NB-2026-ASHKAN",
    },
  },

  // =========================================================================
  // 28. ویزای ملی تایپ D اتریش — صادره از مسقط (۲۰۲۳)
  // =========================================================================
  {
    id: "real-visa-muscat-visum-d-2023",
    category: "special",
    methodKey: "student",
    typeLabel: "ویزای ملی تایپ D اتریش",
    subType: "Visum D Österreich (Maskat 2023)",
    titleFa: "ویزای ملی تایپ D اتریش — صادره از مسقط (۲۰۲۳)",
    titleDe: "Visum D Österreich (Maskat – Teheran/Wien)",
    applicantStatus: "اخذ ویزای ملی تایپ D اتریش از طریق سفارت اتریش در مسقط جهت ورود قانونی به خاک اتریش",
    issuedBy: "سفارت جمهوری اتریش در مسقط (Österreichische Botschaft Maskat)",
    state: "Wien",
    issueDate: "۲۰۲۳/۱۰/۲۲",
    validUntil: "۲۰۲۴/۰۲/۲۱ (معتبر از ۲۴-۱۰-۲۰۲۳ تا ۲۱-۰۲-۲۰۲۴)",
    caseRef: "AUT-VISAD/2023-MASKAT",
    isSpecialBadge: true,
    specialHighlight: "اخذ سریع ویزای ملی D از سفارت اتریش در کشور ثالث (عمان)",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 20 Fremdenpolizeigesetz (FPG) – Visum D",
    imageUrl: "/assets/aistudio/Photoleap_11_02_2024_23_28_22_CeacJ_52dcc2cf.jpg",
    anatomyBreakdown: [
      {
        title: "نوع روادید: Visum D Österreich",
        description: "ویزای بلندمدت D با مجوز تردد نامحدود در شنگن و اقامت تا ۱۲۰ روز در اتریش.",
        tag: "ویزای ملی",
      },
      {
        title: "تاریخ اخذ و صدور",
        description: "صادرشده در ۲۲ اکتبر ۲۰۲۳ توسط سفارت اتریش در مسقط.",
        tag: "تاریخ صدور رسمی",
      },
    ],
    requirements: [
      "وقت سفارت اتریش در عمان",
      "گواهی تمکن مالی و بیمه معتبر شنگن",
      "انگیزه سفر و رزرو محل اقامت در اتریش",
    ],
    tipsFa: "در شرایط ترافیک وقت سفارت تهران، اقدام از طریق سفارت‌های اتریش در کشورهای همسایه نظیر مسقط راهکاری سریع و تاییدشده است.",
    cardDesign: {
      variant: "visa-d",
      cardHolderMasked: "******, *",
      dobMasked: "25.11.1982",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "VDAD-AUT-M53160672",
    },
  },

  // =========================================================================
  // 29. ویزای تحصیلی تایپ D اتریش — سارا (تهران ۲۰۲۳)
  // =========================================================================
  {
    id: "real-visa-sara-visum-d-2023",
    category: "admission",
    methodKey: "student",
    typeLabel: "ویزای تحصیلی تایپ D اتریش",
    subType: "Visum D für Studierende (Sara – Teheran 2023)",
    titleFa: "ویزای تحصیلی تایپ D اتریش — سارا (تهران ۲۰۲۳)",
    titleDe: "Visum D für Studierende (Sara – Botschaft Teheran)",
    applicantStatus: "دانشجوی دارای پذیرش دانشگاهی با اخذ ویزای رسمی ورود D از سفارت اتریش در تهران",
    issuedBy: "سفارت جمهوری اتریش در تهران (Österreichische Botschaft Teheran)",
    state: "Wien",
    issueDate: "۲۰۲۳/۱۰/۲۹",
    validUntil: "۲۰۲۴/۰۲/۲۸ (ورود قانونی ۴ ماهه)",
    caseRef: "AUT-VISAD/2023-SARA",
    isSpecialBadge: true,
    specialHighlight: "ویزای ورود قطعی برای ثبت‌نام در دانشگاه دولتی وین",
    workPermitStatus: "۲۰ ساعت در هفته",
    legalBasis: "§ 20 FPG iVm § 64 NAG",
    imageUrl: "/assets/aistudio/1720451066964_50ce6f17.jpg",
    anatomyBreakdown: [
      {
        title: "ویزای ورود تحصیلی D",
        description: "مجوز قانونی سفر به اتریش جهت تحویل حضوری کارت اقامت دانشجویی.",
        tag: "ویزای D دانشجویی",
      },
      {
        title: "تاریخ اخذ رسمی",
        description: "صادرشده در ۲۹ اکتبر ۲۰۲۳ با برچسب رسمی ضدجعل شنگن.",
        tag: "تاریخ صدور",
      },
    ],
    requirements: [
      "نامه پذیرش رسمی از دانشگاه وین",
      "حساب تمکن مالی دانشجویی",
      "قرارداد خوابگاه دانشجویی تاییدشده",
    ],
    tipsFa: "دانشجویان بلافاصله پس از ورود با ویزای D نسبت به دریافت اصل کارت اقامت بیومتریک از MA 35 اقدام می‌نمایند.",
    cardDesign: {
      variant: "visa-d",
      cardHolderMasked: "SARA",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "VDAD-SARA-X5680261",
    },
  },

  // =========================================================================
  // 30. ویزای تحصیلی تایپ D اتریش — هاشمی (تهران ۲۰۲۳)
  // =========================================================================
  {
    id: "real-visa-hashemi-visum-d-2023",
    category: "admission",
    methodKey: "student",
    typeLabel: "ویزای تحصیلی تایپ D اتریش",
    subType: "Visum D für Studierende (Hashemi – Teheran 2023)",
    titleFa: "ویزای تحصیلی تایپ D اتریش — هاشمی (تهران ۲۰۲۳)",
    titleDe: "Visum D für Studierende (Hashemi – Botschaft Teheran)",
    applicantStatus: "متقاضی موفق اخذ ویزای تحصیلی نوع D از سفارت اتریش در تهران",
    issuedBy: "سفارت جمهوری اتریش در تهران (Österreichische Botschaft Teheran)",
    state: "Wien",
    issueDate: "۲۰۲۳/۰۱/۰۲",
    validUntil: "۲۰۲۳/۰۵/۱۱ (ورود قانونی ۴ ماهه)",
    caseRef: "AUT-VISAD/2023-HASH",
    workPermitStatus: "۲۰ ساعت در هفته",
    legalBasis: "§ 20 FPG iVm § 64 NAG",
    imageUrl: "/assets/aistudio/1741112836713_1e707b04.jpg",
    anatomyBreakdown: [
      {
        title: "برچسب ویزای نوع D اتریش",
        description: "ویزای معتبر چندبار ورود جهت آغاز تحصیلات تکمیلی در اتریش.",
        tag: "ویزای D تحصیلی",
      },
      {
        title: "تاریخ اخذ رسمی",
        description: "صادرشده در ۲ ژانویه ۲۰۲۳ با شماره پرونده معتبر کنسولی.",
        tag: "تاریخ صدور",
      },
    ],
    requirements: [
      "تاییدیه تمکن مالی بانکی",
      "پذیرش قطعی دانشگاهی",
      "بیمه مسافرتی معتبر شنگن",
    ],
    tipsFa: "ویزای نوع D به دانشجو اجازه می‌دهد مستقیماً برای ترم زمستانه یا تابستانه به وین پرواز کرده و در دانشگاه ثبت‌نام نماید.",
    cardDesign: {
      variant: "visa-d",
      cardHolderMasked: "HASHEMI",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "VDAD-HASH-0107943",
    },
  },

  // =========================================================================
  // 31. اقامت تمکن مالی اتریش — رادین (۲۰۲۴–۲۰۲۵)
  // =========================================================================
  {
    id: "real-visa-radin-financial-independence-2025",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit (Radin)",
    titleFa: "کارت اقامت تمکن مالی اتریش — رادین (۲۰۲۴–۲۰۲۵)",
    titleDe: "Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit (Radin)",
    applicantStatus: "پرونده موفق اقامت خودحمایتی فرزند در قالب پرونده تمکن مالی خانواده",
    issuedBy: "اداره امور اقامت اتریش (MA 35 Wien)",
    state: "Wien",
    issueDate: "۲۰۲۴/۱۱/۱۳",
    validUntil: "۲۰۲۵/۱۱/۱۳ (معتبر)",
    caseRef: "W-NB/2024-RADIN",
    isSpecialBadge: true,
    specialHighlight: "اقامت قانونی فرزند به همراه خانواده با تحصیل رایگان در اتریش",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG iVm § 46 NAG",
    imageUrl: "/assets/aistudio/123654_e4ac7ed0.png",
    anatomyBreakdown: [
      {
        title: "Niederlassungsbewilligung فرزند",
        description: "کارت اقامت مستقل صادرشده برای فرزند با حق تحصیل در مدارس و کالج‌های اتریش.",
        tag: "اقامت فرزند",
      },
      {
        title: "تاریخ اخذ و اعتبار",
        description: "صادرشده با اعتبار تا ۱۳ نوامبر ۲۰۲۵ همگام با پرونده سرپرست خانواده.",
        tag: "تاریخ اعتبار",
      },
    ],
    requirements: [
      "پوشش تمکن مالی سرپرست خانواده",
      "بیمه سلامت اختصاصی اتریش",
      "قرارداد مسکن متناسب با بعد خانوار",
    ],
    tipsFa: "فرزندان متقاضیان تمکن مالی از بدو ورود می‌توانند در بهترین مدارس اتریش به صورت رایگان ثبت‌نام و تحصیل نمایند.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "Radin",
      dobMasked: "15.05.2008",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "NB-A43311925",
    },
  },

  // =========================================================================
  // 32. کارت قرمز سفید قرمز پلاس اتریش — کارن ایمان‌زاده (الحاق فرزند)
  // =========================================================================
  {
    id: "real-visa-karen-family-rwr-plus-2023",
    category: "residence",
    methodKey: "family",
    typeLabel: "کارت قرمز سفید قرمز پلاس",
    subType: "Rot-Weiß-Rot – Karte Plus (Karen Imanzadeh)",
    titleFa: "کارت سرخ-سفید-سرخ پلاس اتریش — کارن ایمان‌زاده (الحاق فرزند)",
    titleDe: "Rot-Weiß-Rot – Karte Plus gem. § 46 NAG (Karen Imanzadeh)",
    applicantStatus: "کارت اقامت الحاق فرزند خردسال به والدین شاغل و دارای کارت اقامت در اتریش",
    issuedBy: "اداره اقامت MA 35 وین",
    state: "Wien",
    issueDate: "۲۰۲۲/۰۸/۱۸",
    validUntil: "۲۰۲۳/۰۸/۱۸",
    caseRef: "W-RWR+/2023-KAREN",
    isSpecialBadge: true,
    specialHighlight: "الحاق رسمی فرزند خردسال و بهره‌مندی از حقوق رفاهی و کمک‌هزینه فرزند (Familienbeihilfe)",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 46 NAG (Familienangehörige)",
    imageUrl: "/assets/aistudio/6_copy_6940c625.jpg",
    anatomyBreakdown: [
      {
        title: "RWR Plus الحاق فرزند",
        description: "اعطای کارت سرخ-سفید-سرخ پلاس به فرزند برای همراهی کامل والدین در اتریش.",
        tag: "الحاق فرزند",
      },
      {
        title: "تاریخ اخذ و انقضا",
        description: "صادرشده در وین با اعتبار قانونی تا ۱۸ آگوست ۲۰۲۳ و قابلیت تمدید پیوسته.",
        tag: "تاریخ صدور",
      },
    ],
    requirements: [
      "شناسنامه رسمی و ترجمه تاییدشده فرزند",
      "کارت اقامت معتبر والدین در اتریش",
      "بیمه درمانی پوشش خانواده ÖGK",
    ],
    tipsFa: "فرزندان الحاق‌شده از کمک‌هزینه دولتی ماهانه فرزندان در اتریش (حدود ۲۰۰ یورو در ماه) برخوردار می‌شوند.",
    cardDesign: {
      variant: "family",
      cardHolderMasked: "KAREN IMANZADEH",
      dobMasked: "01.08.2022",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "RWR+-A4244-KAREN",
    },
  },

  // =========================================================================
  // 33. اقامت هنرمندی اتریش — هنرمند متولد ۱۹۹۵ (۲۰۲۳)
  // =========================================================================
  {
    id: "real-visa-artist-young-1995-2023",
    category: "residence",
    methodKey: "artist",
    typeLabel: "اقامت هنرمندی اتریش",
    subType: "Niederlassungsbewilligung – Künstler (متولد ۱۹۹۵)",
    titleFa: "کارت اقامت هنرمندی اتریش — هنرمند متولد ۱۹۹۵ (۲۰۲۳)",
    titleDe: "Niederlassungsbewilligung – Künstler (Geb. 1995)",
    applicantStatus: "هنرمند مستعد نسل جوان در شاخه هنرهای بصری و دیجیتال با ارائه آثار و تاییدیه رسمی",
    issuedBy: "اداره امور اقامت اتریش (MA 35)",
    state: "Wien",
    issueDate: "۲۰۲۲/۰۶/۱۰",
    validUntil: "۲۰۲۳/۰۶/۱۰",
    caseRef: "VIE-ART/2023-YNG1995",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 43a NAG (Künstler)",
    imageUrl: "/assets/aistudio/20240907_232541_9511e653.jpg",
    anatomyBreakdown: [
      {
        title: "مجوز هنرمند مستقل",
        description: "اجازه اقامت و فعالیت حرفه‌ای آزاد بدون محدودیت کارفرما در سراسر اتریش.",
        tag: "هنرمندی",
      },
      {
        title: "تاریخ اخذ و اعتبار",
        description: "صادرشده در سال ۲۰۲۲ با اعتبار تا ۲۰۲۳ و تبدیل به دوره‌های دوساله.",
        tag: "تاریخ صدور",
      },
    ],
    requirements: [
      "پورتفولیوی تخصصی آثار هنری",
      "عضویت در نهادهای هنری",
      "بیمه سلامت اختصاصی SVS",
    ],
    tipsFa: "حتی هنرمندان جوان با داشتن نمونه آثار قوی می‌توانند اقامت اتریش را بدون نیاز به سرمایه‌گذاری دریافت کنند.",
    cardDesign: {
      variant: "artist",
      cardHolderMasked: "S*** E***",
      dobMasked: "** ** 1995",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "ART-1995-VIE",
    },
  },

  // =========================================================================
  // 34. اقامت هنرمندی اتریش — بانوی هنرمند متولد ۱۹۷۱ (۲۰۲۴)
  // =========================================================================
  {
    id: "real-visa-artist-female-1971-2024",
    category: "residence",
    methodKey: "artist",
    typeLabel: "اقامت هنرمندی اتریش",
    subType: "Niederlassungsbewilligung – Künstler (متولد ۱۹۷۱)",
    titleFa: "کارت اقامت هنرمندی اتریش — بانوی هنرمند متولد ۱۹۷۱ (۲۰۲۴)",
    titleDe: "Niederlassungsbewilligung – Künstler (Geb. 1971)",
    applicantStatus: "استاد و هنرمند باسابقه هنرهای تجسمی با قرارداد گالری‌ها و پروژه‌های نمایشگاهی در وین",
    issuedBy: "MA 35 Wien",
    state: "Wien",
    issueDate: "۲۰۲۳/۰۱/۱۵",
    validUntil: "۲۰۲۴/۰۱/۱۵",
    caseRef: "VIE-ART/2024-F1971",
    isSpecialBadge: true,
    specialHighlight: "تاییدیه رسمی رزومه و قراردادهای هنری توسط وزارت هنر و فرهنگ اتریش",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 43a NAG",
    imageUrl: "/assets/aistudio/20240907_232544_95e99656.jpg",
    anatomyBreakdown: [
      {
        title: "پایه اقامتی Künstler",
        description: "کارت اقامت اتریش با بند معافیت از اداره کار برای فعالیت‌های فرهنگی هنری.",
        tag: "اقامت هنری",
      },
      {
        title: "تاریخ اخذ رسمی",
        description: "صادرشده در ژانویه ۲۰۲۳ با اعتبار تا ژانویه ۲۰۲۴ در وین.",
        tag: "تاریخ اخذ",
      },
    ],
    requirements: [
      "سوابق نمایشگاه‌های انفرادی و گروهی",
      "قرارداد فروش اثر یا تدریس کارگاهی",
      "محل سکونت در اتریش",
    ],
    tipsFa: "پرونده‌های هنرمندی با سابقه کاری مستند از سریع‌ترین زمان‌های صدور در اداره اقامت برخوردار هستند.",
    cardDesign: {
      variant: "artist",
      cardHolderMasked: "******, *",
      dobMasked: "** ** 1971",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "ART-1971-VIE",
    },
  },

  // =========================================================================
  // 35. اقامت هنرمندی اتریش — بانوی هنرمند متولد ۱۹۸۳ (۲۰۲۴)
  // =========================================================================
  {
    id: "real-visa-artist-female-1983-2024",
    category: "residence",
    methodKey: "artist",
    typeLabel: "اقامت هنرمندی اتریش",
    subType: "Niederlassungsbewilligung – Künstler (متولد ۱۹۸۳)",
    titleFa: "کارت اقامت هنرمندی اتریش — بانوی هنرمند متولد ۱۹۸۳ (۲۰۲۴)",
    titleDe: "Niederlassungsbewilligung – Künstler (Geb. 1983)",
    applicantStatus: "طراح و هنرمند حرفه‌ای با اثبات درآمد مستقل حاصل از خلق و فروش آثار هنری",
    issuedBy: "MA 35 – Stadt Wien",
    state: "Wien",
    issueDate: "۲۰۲۳/۰۴/۰۲",
    validUntil: "۲۰۲۴/۰۴/۰۲",
    caseRef: "VIE-ART/2024-F1983",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 43a NAG",
    imageUrl: "/assets/aistudio/20240907_232545_a5214354.jpg",
    anatomyBreakdown: [
      {
        title: "کارت اقامت بیومتریک Künstler",
        description: "اقامت تخصصی هنرمندان با امکان تمدید دوساله و الحاق اعضای خانواده.",
        tag: "هنرمندان",
      },
      {
        title: "تاریخ اخذ و تمدید",
        description: "صادرشده در آوریل ۲۰۲۳ و معتبر تا آوریل ۲۰۲۴ در وین.",
        tag: "تاریخ صدور",
      },
    ],
    requirements: [
      "کاتالوگ حرفه‌ای آثار هنری",
      "گردش مالی حاصل از فعالیت‌های هنری",
      "بیمه سلامت رسمی اتریش",
    ],
    tipsFa: "هنرمندان در اتریش از جایگاه اجتماعی بسیار بالا و حمایت‌های اداری و مالیاتی متعددی برخوردارند.",
    cardDesign: {
      variant: "artist",
      cardHolderMasked: "******, *",
      dobMasked: "** ** 1983",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "ART-1983-VIE",
    },
  },

  // =========================================================================
  // 36. اقامت هنرمندی اتریش — هنرمند مستقل (۲۰۲۳)
  // =========================================================================
  {
    id: "real-visa-artist-male-2023-cam",
    category: "residence",
    methodKey: "artist",
    typeLabel: "اقامت هنرمندی اتریش",
    subType: "Niederlassungsbewilligung – Künstler (۲۰۲۳)",
    titleFa: "کارت اقامت هنرمندی اتریش — هنرمند مستقل (۲۰۲۳)",
    titleDe: "Niederlassungsbewilligung – Künstler gem. § 43a NAG",
    applicantStatus: "فعال مستقل حوزه موسیقی و هنرهای نمایشی با قرارداد همکاری در تئاترهای وین",
    issuedBy: "اداره مهاجرت و اقامت اتریش",
    state: "Wien",
    issueDate: "۲۰۲۲/۰۸/۲۲",
    validUntil: "۲۰۲۳/۰۸/۲۲",
    caseRef: "VIE-ART/2023-CSM",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 43a NAG",
    imageUrl: "/assets/aistudio/20240907_232550_82b8c433.jpg",
    anatomyBreakdown: [
      {
        title: "آزادی فعالیت هنری",
        description: "اجازه اجرای کنسرت، کارگاه و پروژه‌های مستقل هنری در تمام ایالت‌های اتریش.",
        tag: "کار مستقل",
      },
      {
        title: "تاریخ اخذ و پرونده",
        description: "صادرشده در تابستان ۲۰۲۲ با اعتبار سال اول.",
        tag: "تاریخ صدور",
      },
    ],
    requirements: [
      "قراردادهای اجرای صحنه‌ای یا گالری",
      "اثبات درآمد مکفی بالای خط فقر اتریش",
      "ثبت سکونت در وین",
    ],
    tipsFa: "وین قلب تپنده موسیقی جهان است و امکان تعامل با معتبرترین گروه‌های هنری را برای شما فراهم می‌کند.",
    cardDesign: {
      variant: "artist",
      cardHolderMasked: "E***, *",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "ART-CSM-2023",
    },
  },

  // =========================================================================
  // 37. اقامت تمکن مالی اتریش — بانوی متقاضی (۲۰۲۴)
  // =========================================================================
  {
    id: "real-visa-financial-independence-female-2024",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit (۲۰۲۴)",
    titleFa: "کارت اقامت تمکن مالی اتریش — بانوی متقاضی (۲۰۲۴)",
    titleDe: "Niederlassungsbewilligung (Ausgenommen Erwerbstätigkeit 2024)",
    applicantStatus: "پرونده موفق اقامت تمکن مالی با احراز کامل درآمد غیرفعال و مسکن استاندارد",
    issuedBy: "MA 35 – Magistrat der Stadt Wien",
    state: "Wien",
    issueDate: "۲۰۲۳/۰۸/۲۹",
    validUntil: "۲۰۲۴/۰۸/۲۹",
    caseRef: "W-NB/2024-CAN289",
    isSpecialBadge: true,
    specialHighlight: "تاییدیه سهمیه خودحمایتی وین با کدهای امنیتی رسمی CAN 2892212",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/img_796x480x32_0024488_47d64dfd.jpg",
    anatomyBreakdown: [
      {
        title: "Niederlassungsbewilligung Ausgenommen Erwerbstätigkeit",
        description: "کارت اقامت تمکن مالی با چیپ بیومتریک و کد CAN 2892212.",
        tag: "تمکن مالی",
      },
      {
        title: "تاریخ اخذ و انقضا",
        description: "صادرشده در ۲۹ آگوست ۲۰۲۳ و معتبر تا ۲۹ آگوست ۲۰۲۴ در وین.",
        tag: "تاریخ اخذ",
      },
    ],
    requirements: [
      "درآمد غیرفعال معتبر از اجاره یا سپرده",
      "بیمه سلامت اختصاصی اتریش",
      "قرارداد رسمی اجاره مسکن",
    ],
    tipsFa: "این کارت امکان ثبت شرکت، افتتاح حساب بانکی اروپایی و سرمایه‌گذاری آزاد در سراسر اتریش را فراهم می‌سازد.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "******, *",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "NB-CAN-2892212",
    },
  },

  // =========================================================================
  // 38. اقامت هنرمندی اتریش — بانوی هنرمند متولد ۱۹۸۹ (دوره ۲۰۲۳–۲۰۲۶)
  // =========================================================================
  {
    id: "real-visa-artist-female-1989-long",
    category: "residence",
    methodKey: "artist",
    typeLabel: "اقامت هنرمندی اتریش",
    subType: "Niederlassungsbewilligung – Künstler (متولد ۱۹۸۹)",
    titleFa: "کارت اقامت هنرمندی اتریش — بانوی هنرمند متولد ۱۹۸۹ (دوره ۲۰۲۳–۲۰۲۶)",
    titleDe: "Niederlassungsbewilligung – Künstler (Geb. 1989 / 2023-2026)",
    applicantStatus: "تمدید بلندمدت کارت اقامت هنرمندی پس از اثبات درآمد پایدار هنری در اتریش",
    issuedBy: "جمهوری اتریش — اداره اقامت",
    state: "Wien",
    issueDate: "۲۰۲۳/۰۵/۲۰",
    validUntil: "۲۰۲۶/۰۵/۲۰ (تمدید ۳ ساله)",
    caseRef: "AUT-ART/2026-F1989",
    isSpecialBadge: true,
    specialHighlight: "تمدید بلندمدت ۳ ساله اقامت هنرمندی اتریش با اعتبار تا سال ۲۰۲۶",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 43a NAG",
    imageUrl: "/assets/aistudio/img_863x533x24_0049844_15c909ed.jpg",
    anatomyBreakdown: [
      {
        title: "تمدید ۳ ساله کارت هنرمندی",
        description: "اعطای کارت اقامت بلندمدت ۳ ساله پس از تثبیت جایگاه حرفه‌ای در جامعه هنری اتریش.",
        tag: "تمدید بلندمدت",
      },
      {
        title: "تاریخ اخذ و اعتبار",
        description: "صادرشده در سال ۲۰۲۳ با اعتبار رسمی تا سال ۲۰۲۶.",
        tag: "تاریخ صدور",
      },
    ],
    requirements: [
      "کارنامه مالیاتی و بیمه SVS دوره‌های قبل",
      "قراردادهای ادامه‌دار پروژه‌های هنری",
      "عدم سوءپیشینه",
    ],
    tipsFa: "پس از اتمام دوره ۳ ساله، دارنده کارت مستقیماً واجد شرایط دریافت اقامت دائم ۵ ساله اتحادیه اروپا (Daueraufenthalt EU) خواهد بود.",
    cardDesign: {
      variant: "artist",
      cardHolderMasked: "******, *",
      dobMasked: "** ** 1989",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "ART-1989-2026",
    },
  },

  // =========================================================================
  // 39. اقامت تمکن مالی اتریش — متقاضی متولد ۱۹۸۲ (۲۰۲۳)
  // =========================================================================
  {
    id: "real-visa-financial-independence-male-1982",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung (متولد ۱۹۸۲)",
    titleFa: "کارت اقامت تمکن مالی اتریش — متقاضی متولد ۱۹۸۲ (۲۰۲۳)",
    titleDe: "Niederlassungsbewilligung (Geb. 1982 / 2023)",
    applicantStatus: "پرونده موفق خودحمایتی برای سرپرست خانواده با احراز کامل درآمد مستقل",
    issuedBy: "اداره اقامت MA 35 وین",
    state: "Wien",
    issueDate: "۲۰۲۲/۰۸/۰۴",
    validUntil: "۲۰۲۳/۰۸/۰۴",
    caseRef: "W-NB/2023-M1982",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/img_1280x789x24_0037292_b029bbc6.jpg",
    anatomyBreakdown: [
      {
        title: "Niederlassungsbewilligung بدون اجازه کار",
        description: "اقامت پایدار در وین با تایید سهمیه سالانه تمکن مالی ایالتی.",
        tag: "اقامت تمکن مالی",
      },
      {
        title: "تاریخ اخذ و پرونده",
        description: "صادرشده در وین در آگوست ۲۰۲۲ با اعتبار سال اول.",
        tag: "تاریخ صدور",
      },
    ],
    requirements: [
      "سپرده نقدی کافی و اسناد مالکیت",
      "مدرک زبان آلمانی A1",
      "بیمه درمانی بین‌المللی",
    ],
    tipsFa: "روش تمکن مالی برای افرادی که بدون نیاز به حضور در بازار کار مایل به زندگی مرفه در اروپا هستند بهترین گزینه است.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "******, *",
      dobMasked: "** ** 1982",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "NB-1982-AUT",
    },
  },

  // =========================================================================
  // 40. اقامت هنرمندی اتریش — بانوی هنرمند متولد ۱۹۸۶ (۲۰۲۳)
  // =========================================================================
  {
    id: "real-visa-artist-female-1986-2023",
    category: "residence",
    methodKey: "artist",
    typeLabel: "اقامت هنرمندی اتریش",
    subType: "Niederlassungsbewilligung – Künstler (متولد ۱۹۸۶)",
    titleFa: "کارت اقامت هنرمندی اتریش — بانوی هنرمند متولد ۱۹۸۶ (۲۰۲۳)",
    titleDe: "Niederlassungsbewilligung – Künstler (Geb. 1986 / 2023)",
    applicantStatus: "هنرمند نقاش و تصویرگر با ارائه نمونه‌کارها و نمایشگاه‌های برگزارشده در اروپا",
    issuedBy: "MA 35 – Stadt Wien",
    state: "Wien",
    issueDate: "۲۰۲۲/۱۱/۲۱",
    validUntil: "۲۰۲۳/۱۱/۲۱",
    caseRef: "VIE-ART/2023-F1986",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 43a NAG",
    imageUrl: "/assets/aistudio/img_1280x793x24_0037071_89ed318d.jpg",
    anatomyBreakdown: [
      {
        title: "کارت اقامت هنرمندی وین",
        description: "اقامت رسمی با هولوگرام امنیتی جمهوری اتریش و بند KÜNSTLER.",
        tag: "کارت هنرمندی",
      },
      {
        title: "تاریخ اخذ و دوره",
        description: "صادرشده در ۲۱ نوامبر ۲۰۲۲ با اعتبار تا نوامبر ۲۰۲۳.",
        tag: "تاریخ اخذ",
      },
    ],
    requirements: [
      "پورتفولیو و گواهی اصالت آثار",
      "پیش‌قراردادهای نمایشگاهی و فروش",
      "بیمه سلامت اختصاصی SVS",
    ],
    tipsFa: "هنرمندان با این کارت حق سفر بدون ویزا در تمام کشورهای حوزه شنگن را به صورت نامحدود دارند.",
    cardDesign: {
      variant: "artist",
      cardHolderMasked: "******, *",
      dobMasked: "** ** 1986",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "ART-1986-VIE",
    },
  },

  // =========================================================================
  // 41. اقامت تمکن مالی اتریش — وین (کد CAN 844353)
  // =========================================================================
  {
    id: "real-visa-financial-independence-wien-can844-2019",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit (CAN 844353)",
    titleFa: "کارت اقامت تمکن مالی اتریش — وین (کد CAN 844353)",
    titleDe: "Niederlassungsbewilligung (Wien 2019 – CAN 844353)",
    applicantStatus: "پرونده موفق خودحمایتی صادر شده توسط شهرداری وین با کد امنیتی اختصاصی",
    issuedBy: "شهرداری وین — MA 35",
    state: "Wien",
    issueDate: "۲۰۱۹/۱۰/۰۹",
    validUntil: "۲۰۲۰/۰۲/۰۹ (تمدید دوره‌ای)",
    caseRef: "W-NB/2019-CAN844",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/20240212_010254_355efe14.jpg",
    anatomyBreakdown: [
      {
        title: "مجوز اقامت تمکن مالی وین",
        description: "صادر شده در مرکز اصلی مهاجرت شهر وین با کد امنیتی CAN 844353.",
        tag: "سهمیه وین",
      },
      {
        title: "تاریخ اخذ رسمی",
        description: "صادرشده در تاریخ ۰۹ اکتبر ۲۰۱۹ در وین.",
        tag: "تاریخ صدور",
      },
    ],
    requirements: [
      "احراز درآمد مستقل ماهانه مکفی",
      "اجاره‌نامه رسمی مسکن در وین",
      "بیمه درمان معتبر اتریش",
    ],
    tipsFa: "پرونده‌های تمکن مالی در شهر وین پس از سپری شدن دوره اولیه ۴ ماهه، برای دوره‌های ۱ ساله و ۳ ساله به آسانی تمدید می‌گردند.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "******, *",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "NB-CAN-844353",
    },
  },

  // =========================================================================
  // 42. اقامت تمکن مالی اتریش — وین (کد CAN 907242)
  // =========================================================================
  {
    id: "real-visa-financial-independence-wien-can907-2019",
    category: "residence",
    methodKey: "financial-independence",
    typeLabel: "اقامت تمکن مالی اتریش",
    subType: "Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit (CAN 907242)",
    titleFa: "کارت اقامت تمکن مالی اتریش — وین (کد CAN 907242)",
    titleDe: "Niederlassungsbewilligung (Wien 2019 – CAN 907242)",
    applicantStatus: "پرونده تمکن مالی همزمان اعضای خانواده در شهرداری وین با کد امنیتی CAN 907242",
    issuedBy: "اداره اقامت و شهروندی وین (MA 35)",
    state: "Wien",
    issueDate: "۲۰۱۹/۱۰/۰۹",
    validUntil: "۲۰۲۰/۰۲/۰۹ (تمدید دوره‌ای)",
    caseRef: "W-NB/2019-CAN907",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG",
    imageUrl: "/assets/aistudio/photo_2024-02-14_12-35-08_526970d4.jpg",
    anatomyBreakdown: [
      {
        title: "کارت اقامت تمکن مالی همگام",
        description: "صادر شده همزمان برای پوشش اعضای خانواده در پایتخت اتریش.",
        tag: "پوشش خانواده",
      },
      {
        title: "تاریخ اخذ رسمی",
        description: "صادرشده در ۰۹ اکتبر ۲۰۱۹ در شهر وین.",
        tag: "تاریخ اخذ",
      },
    ],
    requirements: [
      "اثبات تمکن مالی و سپرده ارزی",
      "بیمه سلامت اختصاصی اتریش",
      "سکونت قانونی در وین",
    ],
    tipsFa: "تمام اعضای خانواده دارنده اقامت تمکن مالی از همان ابتدای ورود از امکانات کامل درمانی و آموزشی بهره‌مند می‌شوند.",
    cardDesign: {
      variant: "independent",
      cardHolderMasked: "******, *",
      dobMasked: "** ** ****",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "NB-CAN-907242",
    },
  },
];

