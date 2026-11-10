import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator, FileText, Coins, Stethoscope, Compass, ShoppingBag,
  Sparkles, ArrowLeft, ChevronLeft, Search, ExternalLink,
  ShieldCheck, Building, BookOpen, Car, Users, Award,
  Clock, Star, Filter, Zap, Target, Info, CheckCircle,
  Flame, Globe, Heart, Landmark, GraduationCap, Scale, Wallet,
  Hotel, Newspaper, MapPin, Rocket, Trophy, ArrowUpRight,
  Layers, Command, Grid3x3, List, ArrowRight, CircleDot, Play,
  Bookmark, Share2, Heart as HeartIcon, BadgeCheck, TrendingDown,
  CheckCircle2, Eye, Calendar
} from "lucide-react";
import SEO from "./SEO";
import AustriaIranNewsBanner from "./AustriaIranNewsBanner";
import AustriaSmartSuite from "./AustriaSmartSuite";
import {
  SUPER_APP_PAGES,
  SUPER_APP_CATEGORIES,
  SuperAppPageItem,
} from "../data/superAppCatalog";

// ==========================================
// IMAGES — Vienna & Austria themed
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=80",
  finance: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  rwr: "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=800&q=80",
  ma35: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80",
  doctor: "https://images.unsplash.com/photo-1631815588090-d1bcbe9a8551?auto=format&fit=crop&w=800&q=80",
  living: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  family: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
  alps: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=800&q=80",
};

// ==========================================
// SERVICE CARD IMAGES (Austria Themed with Watermark)
// ==========================================
const SERVICE_PAGE_IMAGES: Record<string, string> = {
  // Immigration & Permits
  "rwr-calculator": "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=600&q=80",
  "ma35": "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=600&q=80",
  "visa-status": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
  "student-visa": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
  "citizenship-calc": "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=600&q=80",
  "family-reunion": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
  "chance-calculator": "https://images.unsplash.com/photo-1520503185794-6d9b5463f8cb?auto=format&fit=crop&w=600&q=80",
  "schengen-calc": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
  "residence-permit-guide": "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80",
  "embassy-appointment": "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80",

  // Finance & Tax
  "finance": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
  "tax-return": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
  "ams-unemployment": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  "freelance-calculator": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
  "pension-calculator": "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=600&q=80",
  "family-bonus": "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=600&q=80",
  "klimabonus": "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80",

  // Directory & Medical
  "kassenarzt-directory": "https://images.unsplash.com/photo-1631815588090-d1bcbe9a8551?auto=format&fit=crop&w=600&q=80",
  "iranian-directory": "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=600&q=80",
  "lawyer-directory": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
  "translator-directory": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
  "emergency-numbers": "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=600&q=80",
  "pharmacy-night-service": "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=600&q=80",

  // Living & Housing
  "rent-rights": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
  "willhaben-guide": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
  "supermarket-deals": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80",
  "childcare-kindergarten": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80",
  "utilities-comparison": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
  "austria-cost-of-living": "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=600&q=80",

  // Language & Education
  "german-a1-b2": "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
  "bmdw-recognition": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  "integration-fund-oeif": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
  "german-administrative-terms": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",

  // Transport & Mobility
  "driving-license": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80",
  "oebb-guide": "https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=600&q=80",
  "klimaticket-guide": "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80",
  "car-import-pickerl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80",
  "vienna-parking": "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80",

  // Community & Culture
  "mitfahrgelegenheit": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
  "events-austria": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80",
  "secondhand-bazaar": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
  "community-forum": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",

  // Smart Evaluation
  "smart-assessment": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  "document-validator": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
  "wohnbeihilfe-calculator": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
  "form-filler-ai": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
};

const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  immigration: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=600&q=80",
  finance: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
  directory: "https://images.unsplash.com/photo-1631815588090-d1bcbe9a8551?auto=format&fit=crop&w=600&q=80",
  living: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
  language: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
  transport: "https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=600&q=80",
  community: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
  smart: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
};

export function getServicePageCardImage(page: SuperAppPageItem): string {
  if (SERVICE_PAGE_IMAGES[page.id]) {
    return SERVICE_PAGE_IMAGES[page.id];
  }
  if (page.category && CATEGORY_FALLBACK_IMAGES[page.category]) {
    return CATEGORY_FALLBACK_IMAGES[page.category];
  }
  return IMAGES.hero;
}

// ==========================================
// TYPES
// ==========================================
interface SuperAppLauncherProps {
  onSelectPage: (pageId: string) => void;
  onOpenSearch: () => void;
}

// ==========================================
// FEATURED SERVICES (4 Hero Cards)
// ==========================================
const FEATURED_SERVICES = [
  {
    id: "finance",
    title: "محاسبه حقوق Brutto-Netto",
    subtitle: "محاسبه‌گر مالیات حقوق",
    description: "محاسبه دقیق بیمه ÖGK، مالیات بر درآمد و حقوق ۱۳ و ۱۴ اتریش بر اساس نرخ‌های سال ۲۰۲۶",
    image: IMAGES.finance,
    icon: Coins,
    badge: "بروزرسانی ۲۰۲۶ 💶",
    gradient: "from-emerald-600 via-emerald-700 to-teal-800",
    accent: "bg-amber-400 text-stone-900",
    stats: [
      { label: "نرخ SV", value: "۱۸.۱۲٪" },
      { label: "حقوق ۱۴ ماهه", value: "✓" },
    ],
    ctaText: "اجرای محاسبه‌گر",
    aiKeyword: "Austria salary tax calculator 2026",
  },
  {
    id: "rwr-calculator",
    title: "سنجش امتیاز کارت RWR",
    subtitle: "کارت اقامت کاری اتریش",
    description: "محاسبه امتیاز سن، مدرک، زبان و سابقه برای مشاغل کلیدی و کمبود نیرو (Mangelberufe)",
    image: IMAGES.rwr,
    icon: Calculator,
    badge: "کارت سرخ-سفید-سرخ 🇦🇹",
    gradient: "from-[#c8102e] via-rose-700 to-red-800",
    accent: "bg-white text-red-700",
    stats: [
      { label: "حد نصاب", value: "۷۰ امتیاز" },
      { label: "پروسه", value: "۸-۱۲ هفته" },
    ],
    ctaText: "محاسبه آنلاین امتیاز",
    aiKeyword: "RWR Card Austria points calculator",
  },
  {
    id: "ma35",
    title: "نوبت‌ها و پرونده‌های MA35",
    subtitle: "اداره مهاجرت وین",
    description: "پایش وقت‌های باز MA35، کنسلی‌ها و چک‌لیست کامل مدارک تمدید کارت اقامت",
    image: IMAGES.ma35,
    badge: "پایش MA 35 وین 🏛️",
    gradient: "from-blue-700 via-indigo-800 to-slate-900",
    icon: FileText,
    accent: "bg-amber-400 text-slate-950",
    stats: [
      { label: "نوبت‌دهی", value: "زنده" },
      { label: "چک‌لیست", value: "کامل" },
    ],
    ctaText: "بررسی نوبت‌های باز",
    aiKeyword: "MA35 Vienna appointment",
  },
  {
    id: "kassenarzt-directory",
    title: "پزشکان فارسی‌زبان و اتریشی",
    subtitle: "دفتر پزشکان Kassenarzt",
    description: "فهرست پزشکان عمومی و متخصص طرف قرارداد بیمه دولتی (ÖGK) با e-card رایگان",
    image: IMAGES.doctor,
    icon: Stethoscope,
    badge: "پزشکان بیمه ÖGK 🩺",
    gradient: "from-teal-700 via-cyan-800 to-slate-900",
    accent: "bg-emerald-400 text-slate-950",
    stats: [
      { label: "شهرها", value: "۲۳" },
      { label: "تخصص", value: "۱۵+" },
    ],
    ctaText: "جستجوی پزشکان",
    aiKeyword: "Kassenarzt Vienna doctor directory",
  },
];

// ==========================================
// 🇦🇹 LATEST REAL VISA SAMPLES (4 Featured Cards)
// ==========================================
const FEATURED_LATEST_VISAS = [
  {
    id: "real-visa-sara-visum-d-2023",
    typeTag: "ویزای تحصیلی تایپ D اتریش",
    tagBg: "bg-blue-600 text-white",
    dateTag: "۲۰۲۳/۱۰/۲۹",
    title: "ویزای تحصیلی تایپ D اتریش — سارا",
    subTitle: "Visum D für Studierende (Teheran – Wien)",
    authority: "سفارت جمهوری اتریش در تهران",
    validity: "اعتبار ۴ ماهه ورود (دانشگاه وین)",
    legalBasis: "§ 20 FPG iVm § 64 NAG",
    description: "ویزای رسمی ورود به خاک اتریش با برچسب بیومتریک و کد امنیتی جهت آغاز سال تحصیلی و دریافت کارت اقامت.",
    imageUrl: "/assets/aistudio/1720451066964_50ce6f17.jpg",
    badge: "پذیرش دانشگاه وین 🎓",
    badgeColor: "bg-blue-500 text-white",
    cardTypeIcon: GraduationCap,
    workPermit: "۲۰ ساعت در هفته",
  },
  {
    id: "real-visa-radin-financial-independence-2025",
    typeTag: "اقامت تمکن مالی اتریش",
    tagBg: "bg-amber-500 text-stone-950",
    dateTag: "۲۰۲۴/۱۱/۱۳",
    title: "کارت اقامت تمکن مالی — رادین",
    subTitle: "Niederlassungsbewilligung (Radin)",
    authority: "اداره امور اقامت اتریش (MA 35 Wien)",
    validity: "معتبر تا ۱۳ نوامبر ۲۰۲۵ (تمدید سالانه)",
    legalBasis: "§ 44 NAG Ausgenommen Erwerbstätigkeit",
    description: "کارت اقامت خودحمایتی بر پایه اثبات درآمد مستقل غیرفعال با امکان تحصیل رایگان در مدارس اتریش.",
    imageUrl: "/assets/aistudio/123654_e4ac7ed0.png",
    badge: "سهمیه رسمی تمکن مالی 💰",
    badgeColor: "bg-amber-400 text-stone-900",
    cardTypeIcon: Coins,
    workPermit: "فاقد اجازه کار استخدامی",
  },
  {
    id: "real-visa-karen-family-rwr-plus-2023",
    typeTag: "کارت قرمز سفید قرمز پلاس",
    tagBg: "bg-red-600 text-white",
    dateTag: "۲۰۲۲/۰۸/۱۸",
    title: "کارت RWR Plus اتریش — کارن (الحاق)",
    subTitle: "Rot-Weiß-Rot – Karte Plus (§ 46 NAG)",
    authority: "اداره امور اقامت MA 35 وین",
    validity: "معتبر و قابل تمدید پیوسته در وین",
    legalBasis: "§ 46 NAG (Familienangehörige)",
    description: "کارت اقامت الحاق به خانواده با برخورداری کامل از حقوق رفاهی، بیمه درمانی و کمک‌هزینه دولتی فرزندان.",
    imageUrl: "/assets/aistudio/6_copy_6940c625.jpg",
    badge: "الحاق رسمی فرزند 👨‍👩‍👧‍👦",
    badgeColor: "bg-red-600 text-white",
    cardTypeIcon: Users,
    workPermit: "آزاد و نامحدود",
  },
  {
    id: "real-visa-artist-female-1989-long",
    typeTag: "اقامت هنرمندی اتریش",
    tagBg: "bg-purple-600 text-white",
    dateTag: "۲۰۲۳/۰۵/۲۰",
    title: "کارت اقامت هنرمندی — دوره ۳ ساله",
    subTitle: "Niederlassungsbewilligung Künstler",
    authority: "جمهوری اتریش — اداره امور اقامت",
    validity: "اعتبار رسمی بلندمدت تا سال ۲۰۲۶",
    legalBasis: "§ 43a NAG (Künstlerische Tätigkeit)",
    description: "تمدید بلندمدت ۳ ساله اقامت هنرمندی اتریش بدون نیاز به بررسی تست بازار کار اداره کار (AMS).",
    imageUrl: "/assets/aistudio/img_863x533x24_0049844_15c909ed.jpg",
    badge: "تمدید ۳ ساله بلندمدت 🎨",
    badgeColor: "bg-purple-500 text-white",
    cardTypeIcon: Award,
    workPermit: "فعالیت هنری کاملاً آزاد",
  },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "۶۰+", label: "سرویس اختصاصی", icon: Layers, color: "from-[#c8102e] to-[#970d22]" },
  { value: "۲۳", label: "منطقه وین", icon: MapPin, color: "from-indigo-600 to-blue-700" },
  { value: "۵۰K+", label: "کاربر فعال", icon: Users, color: "from-emerald-600 to-teal-700" },
  { value: "۲۴/۷", label: "پشتیبانی آنلاین", icon: Clock, color: "from-amber-500 to-orange-600" },
];

// ==========================================
// HERO BENEFITS (Trust badges)
// ==========================================
const HERO_BENEFITS = [
  { icon: ShieldCheck, text: "۱۰۰٪ رایگان و مستقل", color: "text-emerald-400" },
  { icon: BadgeCheck, text: "نرخ‌های رسمی ۲۰۲۶", color: "text-amber-400" },
  { icon: Heart, text: "ساخته‌شده برای فارسی‌زبانان", color: "text-rose-300" },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function SuperAppLauncher({
  onSelectPage,
  onOpenSearch,
}: SuperAppLauncherProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFeatured, setShowFeatured] = useState(true);

  // ==========================================
  // DISPLAYED PAGES (filtered by category)
  // ==========================================
  const displayedPages = useMemo(() => {
    return activeCategory === "all"
      ? SUPER_APP_PAGES.filter(
          (p) =>
            p.popular ||
            [
              "rwr-calculator",
              "finance",
              "kassenarzt-directory",
              "ma35",
              "exchange",
              "willhaben",
              "german",
              "carpool",
              "housesearch",
              "tax-return",
              "transport",
              "license",
              "citizenship",
              "id-austria-guide",
            ].includes(p.id)
        )
      : SUPER_APP_PAGES.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "سوپراپلیکیشن اتریش‌نشین",
      alternateName: "Otrish SuperApp",
      url: "https://otrish-iran.ir",
      description:
        "سوپراپلیکیشن جامع فارسی‌زبانان اتریش شامل ۶۰+ سرویس: اقامت RWR Card، مالیات، بیمه، پزشکان، مسکن، حمل‌ونقل و خدمات اجتماعی.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "fa-IR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "محاسبه‌گر مالیات و حقوق Brutto-Netto",
        "سنجش امتیاز RWR Card اتریش",
        "پایش نوبت‌های MA35",
        "دفتر پزشکان Kassenarzt",
        "راهنمای مسکن و اجاره در وین",
        "آموزش زبان آلمانی",
        "ماشین‌حساب بیمه و Familienbonus",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1850",
        bestRating: "5",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "سرویس‌های برجسته سوپراپلیکیشن اتریش‌نشین",
      itemListElement: FEATURED_SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        description: s.description,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "اتریش‌نشین",
      alternateName: "Otrish Neshin",
      url: "https://otrish-iran.ir",
      logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
      sameAs: [
        "https://t.me/OTRISH_IRAN",
        "https://instagram.com/otrish__iran",
      ],
      areaServed: { "@type": "Country", name: "Austria" },
      knowsLanguage: ["fa-IR", "de-AT", "en-US"],
    },
  ];

  const getPageCleanPath = (id: string): string => {
    const map: Record<string, string> = {
      "rwr-calculator": "/rwr-card",
      "finance": "/brutto-netto-rechner",
      "ma35": "/ma35",
      "appointment": "/ma35",
      "appointments": "/ma35",
      "tax-return": "/finanzonline",
      "tax-reg": "/steuernummer",
      "housesearch": "/wohnen",
      "citizenship": "/citizenship",
      "id-austria": "/id-austria",
      "id-austria-guide": "/id-austria",
      "mapper": "/mapper",
      "german": "/german",
      "carpool": "/carpool",
      "klimaticket": "/klimaticket",
      "betriebskosten": "/betriebskosten",
      "familienbonus": "/familienbonus",
      "freelance-tax": "/freelance-tax",
      "traffic-fine-appeal": "/traffic-fine-appeal",
      "residency-conditions": "/residency-conditions",
      "nostrification": "/nostrification",
      "kassenarzt-directory": "/kassenarzt-directory",
      "emergency-dentistry": "/emergency-dentistry",
      "student-grad-guide": "/student-grad-guide",
      "mutter-kind-pass": "/mutter-kind-pass",
      "willhaben-security": "/willhaben-security",
      "forms": "/forms",
      "about": "/about",
      "events": "/events",
      "ecosystem": "/ecosystem",
      "links": "/ecosystem",
      "visa-samples": "/visa-samples",
      "exchange": "/exchange",
      "smart": "/smart",
      "tracker": "/tracker",
      "stories": "/stories",
      "compare": "/compare",
      "glossary": "/glossary",
      "compare-living": "/compare-living"
    };
    return map[id] || `/${id}`;
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <section className="space-y-6 font-sans" dir="rtl">
      <SEO
        title="سوپراپلیکیشن اتریش‌نشین | ۶۰+ سرویس مهاجرت، مالیات و زندگی در اتریش"
        description="سوپراپلیکیشن جامع فارسی‌زبانان اتریش: محاسبه‌گر مالیات Brutto-Netto، سنجش امتیاز RWR Card، پایش نوبت MA35، دفتر پزشکان Kassenarzt، مسکن وین و ۶۰+ سرویس رایگان."
        keywords="سوپراپلیکیشن اتریش, اتریش‌نشین, Otrish Neshin, خدمات اتریش, RWR Card, MA35, Kassenarzt, مالیات اتریش, مسکن وین, پزشک فارسی زبان اتریش"
        type="website"
        aiSummary="سوپراپلیکیشن اتریش‌نشین با ۶۰+ سرویس تخصصی برای فارسی‌زبانان اتریش شامل محاسبه‌گر مالیات، RWR Card، MA35، Kassenarzt و مسکن."
        aiKeywords={["Otrish SuperApp Austria", "Persian services Austria", "Austria immigration tools", "Vienna Persian community"]}
        schemaData={seoSchema}
      />



      {/* ========================================== */}
      {/* 1. LIVE AUSTRIA-IRAN NEWS BANNER */}
      {/* ========================================== */}
      <AustriaIranNewsBanner />

      {/* ========================================== */}
      {/* 2. AUSTRIA SMART SUITE */}
      {/* ========================================== */}
      <div className="space-y-4">
        <AustriaSmartSuite />
      </div>

      {/* ========================================== */}
      {/* 🇦🇹 FEATURED VISA SAMPLES (4 Real Cards) */}
      {/* ========================================== */}
      {showFeatured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full" />
              <h2 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                <span>🇦🇹 نمونه‌های برگزیده ویزا و کارت‌های اقامت اخذشده</span>
              </h2>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                بروزرسانی اخیر
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectPage("visa-samples")}
                className="text-[11px] font-black text-red-700 hover:text-red-800 hover:underline flex items-center gap-1 transition-colors"
              >
                <span>مشاهده آرشیو کامل ویزاها (۴۰+ مدرک)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowFeatured(false)}
                className="text-[10px] font-bold text-stone-400 hover:text-stone-700 flex items-center gap-0.5 transition-colors"
                title="بستن این بخش"
              >
                <span>بستن</span>
                <ArrowUpRight className="w-3 h-3 rotate-45" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_LATEST_VISAS.map((visa, i) => {
              const Icon = visa.cardTypeIcon;
              return (
                <motion.div
                  key={visa.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ y: -6 }}
                  onClick={() => onSelectPage("visa-samples")}
                  className="group relative bg-white rounded-3xl border border-stone-200 hover:border-red-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between text-right"
                >
                  {/* Image container with badges */}
                  <div className="relative h-48 w-full bg-stone-950 overflow-hidden">
                    <img
                      src={visa.imageUrl}
                      alt={visa.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                    {/* Visa Type Tag (Top Right) */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black shadow-md ${visa.tagBg}`}>
                        <Icon className="w-3 h-3" />
                        <span>{visa.typeTag}</span>
                      </span>
                    </div>

                    {/* Bottom overlay in image */}
                    <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-[10px] text-stone-200">
                      <span className="font-mono text-stone-200 font-bold truncate">{visa.authority}</span>
                      <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-[9px] font-bold text-white shrink-0">
                        {visa.workPermit}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-sm font-black text-stone-900 group-hover:text-red-700 transition-colors leading-snug">
                        {visa.title}
                      </h3>
                      <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed mt-2 font-medium">
                        {visa.description}
                      </p>
                    </div>

                    {/* Meta info pills */}
                    <div className="pt-2 border-t border-stone-100 space-y-1.5 text-[10px]">
                      <div className="flex items-center justify-between text-stone-500">
                        <span className="font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>وضعیت اعتبار:</span>
                        </span>
                        <span className="font-bold text-emerald-700">{visa.validity}</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-500">
                        <span className="font-bold flex items-center gap-1">
                          <Scale className="w-3 h-3 text-stone-400" />
                          <span>مستند قانونی:</span>
                        </span>
                        <span className="font-mono text-[9px] text-stone-600 font-bold" dir="ltr">{visa.legalBasis}</span>
                      </div>
                    </div>

                    {/* CTA Footer */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-black text-red-700 group-hover:text-red-800">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>مشاهده پرونده کامل و مشخصات</span>
                      </span>
                      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ========================================== */}
      {/* FULL CATALOG — HEADER + FILTERS */}
      {/* ========================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5 relative overflow-hidden"
      >
        {/* Decorative Austrian flag line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block" />
              <h2 className="text-lg sm:text-xl font-black text-stone-900">
                ویترین کامل خدمات و ابزارهای سوپراپ اتریش‌نشین
              </h2>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                {SUPER_APP_PAGES.length} صفحه مجزا و اختصاصی
              </span>
            </div>
            <p className="text-xs text-stone-600 font-normal mt-1.5 pr-4 leading-relaxed max-w-2xl">
              هر کدام از بخش‌های زیر دارای صفحه مستقل، آدرس اینترنتی تمیز، عنوان و متای اختصاصی، تگ H1 و داده‌های ساختاریافته Schema.org جهت تضمین بالاترین رتبه در نتایج گوگل هستند.
            </p>
            {/* Technical SEO Status Badges */}
            <div className="flex items-center gap-2 flex-wrap mt-3 pr-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                صفحات اختصاصی با URL تمیز و Canonical
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-black">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                نقشه سایت XML و robots.txt فعال
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-black">
                <Zap className="w-3.5 h-3.5 text-teal-600" />
                بهینه‌سازی Core Web Vitals و موبایل
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-[10px] font-black">
                <Globe className="w-3.5 h-3.5 text-sky-600" />
                تاییدیه رسمی Google Search Console
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap items-center">
            {/* Search shortcut */}
            <button
              onClick={onOpenSearch}
              className="group px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-2xl flex items-center justify-center gap-2 text-xs font-black transition-all border border-stone-200 shadow-2xs cursor-pointer"
            >
              <Search className="w-4 h-4 text-stone-600 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">جستجوی پیشرفته</span>
              <span className="sm:hidden">جستجو</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-white border border-stone-200 rounded-md text-[10px] font-mono text-stone-600">
                Ctrl+K
              </kbd>
            </button>

            {/* View mode toggle */}
            <div className="flex bg-stone-100 border border-stone-200 rounded-2xl p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-500 hover:text-stone-900"
                }`}
                title="نمایش شبکه‌ای"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-500 hover:text-stone-900"
                }`}
                title="نمایش لیستی"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-stone-100">
          {SUPER_APP_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const CatIcon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-2 shrink-0 transition-all cursor-pointer overflow-hidden group ${
                  isSelected
                    ? "bg-stone-900 text-white shadow-md font-black"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900 border border-stone-200/60"
                }`}
              >
                <CatIcon
                  className={`w-4 h-4 ${
                    isSelected ? "text-red-400" : "text-stone-500 group-hover:text-stone-900"
                  }`}
                />
                <span>{cat.shortTitle}</span>
                {isSelected && (
                  <motion.span
                    layoutId="activeCategoryIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-red-500 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between text-[11px] font-black text-stone-500 px-1">
          <span className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-red-600" />
            <span>{displayedPages.length} سرویس در دسترس</span>
            {activeCategory !== "all" && (
              <>
                {" "}در دسته{" "}
                <span className="text-stone-900 font-bold">
                  {SUPER_APP_CATEGORIES.find((c) => c.id === activeCategory)?.shortTitle}
                </span>
              </>
            )}
          </span>
          <span className="text-red-700 font-mono font-bold">اتریش‌نشین 🇦🇹</span>
        </div>

        {/* Grid/List of App Services */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
            >
              {displayedPages.map((page, idx) => {
                const PageIcon = page.icon;
                return (
                  <motion.a
                    key={page.id}
                    href={getPageCleanPath(page.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.02, 0.3) }}
                    whileHover={{ y: -4 }}
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        onSelectPage(page.id);
                      }
                    }}
                    className="group relative bg-white hover:bg-stone-50/80 border border-stone-200 hover:border-stone-300 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between gap-2.5 cursor-pointer transition-all duration-200 hover:shadow-lg text-right block no-underline overflow-hidden"
                  >
                    {/* Top: Image Banner with Dual Watermark & Icon */}
                    <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
                      <img
                        src={getServicePageCardImage(page)}
                        alt={page.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = IMAGES.hero;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />

                      {/* Official اتریش‌نشین badge watermark */}
                      <div className="absolute top-1.5 right-1.5 z-10 px-1.5 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-stone-800 text-[8.5px] font-black border border-stone-200 flex items-center gap-1 shadow-xs pointer-events-none select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>اتریش‌نشین 🇦🇹</span>
                      </div>

                      {/* Subtle diagonal watermark */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                        <span className="text-white/30 text-[10px] sm:text-xs font-black tracking-widest uppercase rotate-[-12deg] drop-shadow-sm">
                          OTRISH-IRAN
                        </span>
                      </div>

                      {/* Bottom banner: Floating Category Icon & Badge */}
                      <div className="absolute bottom-1.5 right-1.5 left-1.5 flex items-center justify-between z-10">
                        <div className="w-7 h-7 rounded-lg bg-white group-hover:bg-red-600 text-stone-700 group-hover:text-white flex items-center justify-center shadow-md transition-colors border border-stone-200">
                          <PageIcon className="w-4 h-4" />
                        </div>
                        {page.badge && (
                          <span
                            className={`text-[8.5px] font-black px-1.5 py-0.5 rounded-md shadow-sm backdrop-blur-sm ${
                              page.badge === "پربازدید"
                                ? "bg-amber-400 text-stone-950 font-black"
                                : page.badge === "هوشمند"
                                ? "bg-cyan-600 text-white"
                                : page.badge === "ضروری"
                                ? "bg-red-600 text-white"
                                : "bg-emerald-600 text-white"
                            }`}
                          >
                            {page.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-stone-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
                        {page.shortTitle || page.title}
                      </h4>
                      <p className="text-[10px] text-stone-600 line-clamp-2 leading-relaxed font-normal">
                        {page.description}
                      </p>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-2 border-t border-stone-100 group-hover:border-stone-200 flex items-center justify-between text-[10px] font-black text-stone-600 group-hover:text-red-700 transition-colors">
                      <span className="text-[9.5px] font-black text-[#c8102e] text-right px-2 py-0.5 rounded bg-rose-50/80 border border-red-200/60 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e]" />
                        <span>صفحه {page.shortTitle || page.title}</span>
                      </span>
                      <span className="flex items-center gap-0.5 font-bold text-stone-700 group-hover:text-red-700">
                        <span>ورود به بخش</span>
                        <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {displayedPages.map((page, idx) => {
                const PageIcon = page.icon;
                return (
                  <motion.a
                    key={page.id}
                    href={getPageCleanPath(page.id)}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(idx * 0.02, 0.3) }}
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        onSelectPage(page.id);
                      }
                    }}
                    className="group bg-white hover:bg-stone-50/80 border border-stone-200 hover:border-stone-300 rounded-2xl p-3 flex items-center justify-between gap-3 cursor-pointer transition-all hover:shadow-md text-right block no-underline"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* List Thumbnail Image with Watermark */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                        <img
                          src={getServicePageCardImage(page)}
                          alt={page.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = IMAGES.hero;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                        <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-white/90 backdrop-blur-md text-stone-800 text-[7.5px] font-black border border-stone-200 pointer-events-none select-none flex items-center gap-0.5">
                          <span className="w-1 h-1 rounded-full bg-emerald-500" />
                          <span>اتریش‌نشین 🇦🇹</span>
                        </div>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-red-600 border border-stone-200 text-stone-700 group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-2xs">
                        <PageIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-black text-stone-900 group-hover:text-red-700 transition-colors truncate">
                            {page.title}
                          </h4>
                          <span className="text-[10px] font-black text-[#c8102e] px-2 py-0.5 rounded bg-rose-50 border border-red-200/60 shrink-0">
                            {page.shortTitle || page.title}
                          </span>
                          {page.badge && (
                            <span
                              className={`text-[9px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
                                page.badge === "پربازدید"
                                  ? "bg-amber-400 text-stone-950 font-black"
                                  : page.badge === "هوشمند"
                                  ? "bg-cyan-600 text-white"
                                  : page.badge === "ضروری"
                                  ? "bg-red-600 text-white"
                                  : "bg-emerald-600 text-white"
                              }`}
                            >
                              {page.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5 font-normal">
                          {page.description}
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center text-stone-600 transition-all shrink-0">
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View more CTA if category is "all" */}
        {activeCategory === "all" && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setActiveCategory(SUPER_APP_CATEGORIES[1]?.id || "all")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-2xl text-xs font-black transition-all border border-stone-200 cursor-pointer"
            >
              <span>مشاهده همه {SUPER_APP_PAGES.length} سرویس</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}