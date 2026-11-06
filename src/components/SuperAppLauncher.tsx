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
      {/* HERO SECTION WITH IMAGE */}
      {/* ========================================== */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl text-white"
        style={{
          background:
            "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-25">
          <img
            src={IMAGES.hero}
            alt="وین، اتریش — سوپراپلیکیشن اتریش‌نشین"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-[#1e1512]/95 via-[#38100e]/85 to-[#9e142d]/60" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
          🇦🇹
        </div>

        <div className="relative z-10 p-8 md:p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            سوپراپلیکیشن مستقل فارسی‌زبانان اتریش — نسخه ۲۰۲۶
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
            ۶۰+ ابزار هوشمند، همه در یک اپ — از مهاجرت تا زندگی روزمره در اتریش
          </h1>

          <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-6">
            از <strong className="text-amber-300">محاسبه‌گر مالیات Brutto-Netto</strong> تا
            <strong className="text-amber-300"> سنجش امتیاز RWR Card</strong>،
            <strong className="text-amber-300"> پایش نوبت MA35</strong> و
            <strong className="text-amber-300"> دفتر پزشکان Kassenarzt</strong> — سوپراپلیکیشن
            اتریش‌نشین تمام نیازهای یک فارسی‌زبان در اتریش را در یک پلتفرم یکپارچه ارائه می‌دهد.
          </p>

          {/* Benefits */}
          <div className="flex items-center gap-4 flex-wrap mb-6">
            {HERO_BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100"
                >
                  <Icon className={`w-3.5 h-3.5 ${b.color}`} />
                  <span>{b.text}</span>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap mb-6">
            <button
              onClick={onOpenSearch}
              className="group inline-flex items-center gap-2 bg-white text-[#9e142d] font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
            >
              <Search className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              جستجوی هوشمند در ۶۰+ سرویس
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded-md text-[9px] font-mono text-stone-600 ml-1">
                Ctrl+K
              </kbd>
            </button>
            <a
              href="https://t.me/Otrish_neshin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white font-black text-xs px-5 py-3 rounded-2xl hover:bg-white/20 transition-all"
            >
              <Share2 className="w-4 h-4" />
              پشتیبانی تلگرام
            </a>
          </div>

          {/* Stats row inside hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-3"
                >
                  <Icon className="w-4 h-4 text-amber-300 mb-1" />
                  <div className="text-lg font-black font-mono" dir="ltr">
                    {s.value}
                  </div>
                  <div className="text-[9px] font-black text-rose-100/70 leading-tight">
                    {s.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ========================================== */}
      {/* TRUST / FEATURES BAR */}
      {/* ========================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { icon: ShieldCheck, title: "کاملاً رایگان", desc: "بدون ثبت‌نام یا پرداخت", color: "from-emerald-500 to-teal-600" },
          { icon: Zap, title: "بروزرسانی زنده", desc: "نرخ‌های رسمی ۲۰۲۶", color: "from-amber-500 to-orange-600" },
          { icon: Heart, title: "ساخته‌شده با عشق", desc: "برای هموطنان ایرانی", color: "from-rose-500 to-red-600" },
          { icon: Award, title: "۵۰K+ کاربر", desc: "با رضایت ۴.۹ از ۵", color: "from-indigo-500 to-blue-600" },
        ].map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-stone-200 p-4 flex items-center gap-3 hover:shadow-md transition-all"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white shadow-md shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-right">
                <div className="text-[11px] font-black text-stone-900">{f.title}</div>
                <div className="text-[9.5px] text-stone-500 font-bold mt-0.5">{f.desc}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ========================================== */}
      {/* FEATURED CTA BANNER (Moved above Featured Services) */}
      {/* ========================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white text-center"
      >
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
            <Rocket className="w-3.5 h-3.5 text-amber-300" />
            سفر شما به اتریش از اینجا شروع می‌شود
          </div>

          <h2 className="text-2xl md:text-3xl font-black mb-3">
            آماده‌اید از ۶۰+ ابزار هوشمند استفاده کنید؟
          </h2>

          <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
            چه تازه به اتریش آمده‌اید، چه سال‌ها اینجا زندگی می‌کنید — سوپراپلیکیشن
            اتریش‌نشین همراه همیشگی شماست. یکی از ۶۰+ ابزار را انتخاب کنید و مسیر
            خود را هوشمند بسازید.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center gap-2 bg-gradient-to-br from-amber-400 to-orange-500 text-stone-900 font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
            >
              <Search className="w-4 h-4" />
              شروع جستجو در ۶۰+ سرویس
            </button>
            <a
              href="https://t.me/Otrish_neshin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
            >
              <Share2 className="w-4 h-4" />
              مشاوره رایگان در تلگرام
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              کاملاً رایگان
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              خدمات داوطلبانه
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              بدون ثبت‌نام
            </div>
          </div>
        </div>
      </motion.div>

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
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#c8102e] to-[#970d22] rounded-full" />
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
                className="text-[11px] font-black text-[#c8102e] hover:text-red-700 hover:underline flex items-center gap-1 transition-colors"
              >
                <span>مشاهده آرشیو کامل ویزاها (۴۰+ مدرک)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowFeatured(false)}
                className="text-[10px] font-bold text-stone-400 hover:text-stone-600 flex items-center gap-0.5 transition-colors"
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
                  className="group relative bg-white rounded-3xl border border-stone-200 hover:border-red-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between text-right"
                >
                  {/* Image container with badges */}
                  <div className="relative h-48 w-full bg-stone-950 overflow-hidden">
                    <img
                      src={visa.imageUrl}
                      alt={visa.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                    {/* Visa Type Tag (Top Right) */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black shadow-md ${visa.tagBg}`}>
                        <Icon className="w-3 h-3" />
                        <span>{visa.typeTag}</span>
                      </span>
                    </div>

                    {/* Date Tag with Calendar Icon (Top Left) */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-stone-900/90 text-amber-300 border border-stone-700/80 backdrop-blur-md shadow-md" dir="ltr">
                        <Calendar className="w-3 h-3 text-amber-400" />
                        <span>{visa.dateTag}</span>
                      </span>
                    </div>

                    {/* Bottom overlay in image */}
                    <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-[10px] text-stone-200">
                      <span className="font-mono text-stone-300 font-bold truncate">{visa.authority}</span>
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
                      <p className="text-[10px] text-stone-400 font-mono font-bold mt-0.5 truncate" dir="ltr">
                        {visa.subTitle}
                      </p>
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
      {/* LIVE AUSTRIA-IRAN NEWS BANNER */}
      {/* ========================================== */}
      <AustriaIranNewsBanner />

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
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c8102e] via-white to-[#c8102e]" />

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2.5 h-6 bg-gradient-to-b from-[#c8102e] to-[#970d22] rounded-full inline-block" />
              <h2 className="text-lg sm:text-xl font-black text-stone-900">
                ویترین کامل خدمات و ابزارهای سوپراپ اتریش‌نشین
              </h2>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-100 to-amber-100 text-[#c8102e] border border-rose-200">
                {SUPER_APP_PAGES.length} صفحه مجزا و اختصاصی
              </span>
            </div>
            <p className="text-xs text-stone-500 font-bold mt-1.5 pr-4 leading-relaxed max-w-2xl">
              هر کدام از بخش‌های زیر دارای صفحه مستقل، آدرس اینترنتی تمیز، عنوان و متای اختصاصی، تگ H1 و داده‌های ساختاریافته Schema.org جهت تضمین بالاترین رتبه در نتایج گوگل هستند.
            </p>
            {/* Technical SEO Status Badges */}
            <div className="flex items-center gap-2 flex-wrap mt-3 pr-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                صفحات اختصاصی با URL تمیز و Canonical
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-[#c8102e] text-[10px] font-black">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c8102e]" />
                نقشه سایت XML و robots.txt فعال
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-black">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                بهینه‌سازی Core Web Vitals و موبایل
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-[10px] font-black">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                تاییدیه رسمی Google Search Console
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap items-center">
            {/* Search shortcut */}
            <button
              onClick={onOpenSearch}
              className="group px-4 py-2.5 bg-gradient-to-br from-stone-50 to-white hover:from-white hover:to-rose-50/40 text-stone-700 hover:text-[#c8102e] rounded-2xl flex items-center justify-center gap-2 text-xs font-black transition-all border-2 border-stone-200 hover:border-[#c8102e]/40 shadow-sm hover:shadow-md"
            >
              <Search className="w-4 h-4 text-[#c8102e] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">جستجوی پیشرفته</span>
              <span className="sm:hidden">جستجو</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-white border border-stone-300 rounded-md text-[10px] font-mono text-stone-500">
                Ctrl+K
              </kbd>
            </button>

            {/* View mode toggle */}
            <div className="flex bg-stone-100 border border-stone-200 rounded-2xl p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-[#c8102e] shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                }`}
                title="نمایش شبکه‌ای"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === "list"
                    ? "bg-white text-[#c8102e] shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
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
                    ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                    : "bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200/60"
                }`}
              >
                <CatIcon
                  className={`w-4 h-4 ${
                    isSelected ? "text-white" : cat.color
                  }`}
                />
                <span>{cat.shortTitle}</span>
                {isSelected && (
                  <motion.span
                    layoutId="activeCategoryIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-300 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between text-[11px] font-black text-stone-500 px-1">
          <span className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#c8102e]" />
            {displayedPages.length} سرویس در دسترس
            {activeCategory !== "all" && (
              <>
                {" "}در دسته{" "}
                <span className="text-[#c8102e]">
                  {SUPER_APP_CATEGORIES.find((c) => c.id === activeCategory)?.shortTitle}
                </span>
              </>
            )}
          </span>
          <span className="text-stone-400 font-mono">اتریش‌نشین 🇦🇹</span>
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
                    className="group relative bg-gradient-to-br from-stone-50 to-white hover:from-white hover:to-rose-50/30 border border-stone-200 hover:border-[#c8102e]/40 rounded-2xl p-3.5 flex flex-col justify-between gap-3 cursor-pointer transition-all duration-200 hover:shadow-lg text-right block no-underline"
                  >
                    {/* Top: Icon & Badge */}
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-gradient-to-br group-hover:from-[#c8102e] group-hover:to-[#970d22] border border-stone-200 group-hover:border-transparent text-stone-700 group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-sm group-hover:scale-110 group-hover:rotate-3">
                        <PageIcon className="w-5 h-5" />
                      </div>
                      {page.badge && (
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                            page.badge === "پربازدید"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : page.badge === "هوشمند"
                              ? "bg-purple-100 text-purple-800 border border-purple-200"
                              : page.badge === "ضروری"
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          {page.badge}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-stone-900 group-hover:text-[#c8102e] transition-colors line-clamp-2 leading-snug">
                        {page.shortTitle || page.title}
                      </h4>
                      <p className="text-[10px] text-stone-500 line-clamp-2 leading-relaxed font-bold">
                        {page.description}
                      </p>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-2 border-t border-stone-200/60 group-hover:border-[#c8102e]/20 flex items-center justify-between text-[10px] font-black text-stone-400 group-hover:text-[#c8102e] transition-colors">
                      <span className="font-mono text-[9px] text-stone-400 group-hover:text-[#c8102e] dir-ltr text-left px-1.5 py-0.5 rounded bg-stone-100 group-hover:bg-rose-100/60">
                        {getPageCleanPath(page.id)}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <span>ورود به صفحه</span>
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
                    className="group bg-stone-50/70 hover:bg-white border border-stone-200 hover:border-[#c8102e]/40 rounded-2xl p-3 flex items-center justify-between gap-3 cursor-pointer transition-all hover:shadow-md text-right block no-underline"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-11 h-11 rounded-xl bg-white group-hover:bg-gradient-to-br group-hover:from-[#c8102e] group-hover:to-[#970d22] border border-stone-200 group-hover:border-transparent text-stone-700 group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-sm">
                        <PageIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-black text-stone-900 group-hover:text-[#c8102e] transition-colors truncate">
                            {page.title}
                          </h4>
                          <span className="font-mono text-[9px] text-stone-400 group-hover:text-[#c8102e] dir-ltr px-1.5 py-0.5 rounded bg-stone-100 group-hover:bg-rose-100/60 shrink-0">
                            {getPageCleanPath(page.id)}
                          </span>
                          {page.badge && (
                            <span
                              className={`text-[9px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
                                page.badge === "پربازدید"
                                  ? "bg-amber-100 text-amber-800"
                                  : page.badge === "هوشمند"
                                  ? "bg-purple-100 text-purple-800"
                                  : page.badge === "ضروری"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {page.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5 font-bold">
                          {page.description}
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-[#c8102e] group-hover:text-white flex items-center justify-center text-stone-400 transition-all shrink-0">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-2xl text-xs font-black transition-all"
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