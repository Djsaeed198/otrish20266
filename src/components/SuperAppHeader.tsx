import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock, MapPin, Search, Phone, ShieldAlert, Menu, Sparkles,
  ChevronDown, Home, Compass, Coins, Map, Building, BookOpen,
  Car, Users, MessageSquare, Share2, ExternalLink, Award,
  X, ChevronLeft, ChevronRight, Bell, Zap, TrendingUp, Flame,
  Radio, Newspaper, Heart, Star, CheckCircle, Info, Filter,
  Sun, Moon, Coffee, Landmark, Mountain, Snowflake, TreePine,
  Wifi, Battery, Signal, ArrowUpRight, Calendar, Globe, Gift,
  IdCard,
} from "lucide-react";
import { SUPER_APP_CATEGORIES, getPagesByCategory } from "../data/superAppCatalog";
import EmergencyNumbersModal from "./EmergencyNumbersModal";
import MobileNavigationDrawer from "./MobileNavigationDrawer";

// @ts-ignore
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// IMAGES — Vienna & Austria themed
// ==========================================
const IMAGES = {
  viennaHero: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80",
  stephansdom: "https://images.unsplash.com/photo-1583687355032-89b902b7335f?auto=format&fit=crop&w=800&q=80",
  alps: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=800&q=80",
  parliament: "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=800&q=80",
  cafe: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
};

// ==========================================
// NAVIGATION CONFIG
// ==========================================
const NAV_ITEMS = [
  {
    id: "home",
    label: "صفحه اصلی",
    icon: Home,
    color: "from-[#c8102e] to-[#970d22]",
    text: "text-[#c8102e]",
    segments: ["home"],
    description: "صفحه اصلی سوپراپلیکیشن اتریش‌نشین",
  },
  {
    id: "immigration",
    label: "مهاجرت و اقامت",
    icon: Compass,
    color: "from-[#c8102e] to-[#970d22]",
    text: "text-[#c8102e]",
    segments: ["visa-samples", "rwr-calculator", "ma35", "residency-conditions", "citizenship", "immigration-assessment", "student-grad-guide", "tracker", "id-austria-guide", "criminal-record", "marriage-divorce"],
    description: "RWR Card، MA35، اقامت، شهروندی و ارزیابی مهاجرت",
  },
  {
    id: "finance",
    label: "کار، حقوق و مالیات",
    icon: Coins,
    color: "from-emerald-600 to-teal-700",
    text: "text-emerald-700",
    segments: ["finance", "exchange", "tax-return", "freelance-tax", "familienbonus", "compare-living", "student-finance", "nova", "real-estate", "bank-compare"],
    description: "مالیات، حقوق، ارز، Familienbonus و مالی شخصی",
  },
  {
    id: "directory",
    label: "پزشکان و خدمات شهری",
    icon: Map,
    color: "from-sky-600 to-blue-700",
    text: "text-sky-700",
    segments: ["kassenarzt-directory", "emergency-dentistry", "mapper", "translators", "experts", "grocery", "halal-directory", "organic-markets", "schools", "kindergarten"],
    description: "پزشکان، مترجمان، مدارس، بازارها و خدمات عمومی",
  },
  {
    id: "living",
    label: "مسکن و زندگی",
    icon: Building,
    color: "from-amber-500 to-orange-600",
    text: "text-amber-700",
    segments: ["housesearch", "willhaben", "willhaben-furniture", "betriebskosten", "discounter-guide", "district", "neighborhood", "contract-cancellation", "mutter-kind-pass", "supplemental-insurance", "liability-insurance", "phishing-security", "stadtwanderwege", "opera-standing-tickets"],
    description: "مسکن، اجاره، خوابگاه، خرید ملک و زندگی در اتریش",
  },
  {
    id: "language",
    label: "زبان و آموزش",
    icon: BookOpen,
    color: "from-indigo-600 to-blue-700",
    text: "text-indigo-700",
    segments: ["german", "glossary", "education-wifi-bfi", "nostrification", "accounting-career"],
    description: "آموزش زبان آلمانی، معادل‌سازی مدارک و آموزش حرفه‌ای",
  },
  {
    id: "transport",
    label: "خودرو و حمل‌ونقل",
    icon: Car,
    color: "from-violet-600 to-purple-700",
    text: "text-violet-700",
    segments: ["transport", "klimaticket", "obb-vorteilscard", "license", "theory-test", "inspection", "parking", "traffic-fine-appeal"],
    description: "گواهینامه، پارک، Klimaticket و حمل‌ونقل عمومی",
  },
  {
    id: "community",
    label: "همسفر و کانون",
    icon: Users,
    color: "from-rose-600 to-red-700",
    text: "text-rose-700",
    segments: ["carpool", "stories", "holidays", "trust-examples", "volunteer"],
    description: "همسفر، داستان‌ها، تعطیلات و کار داوطلبانه",
  },
  {
    id: "smart",
    label: "سامانه‌های هوشمند",
    icon: Sparkles,
    color: "from-yellow-500 to-amber-600",
    text: "text-yellow-700",
    segments: ["smart", "doccheck"],
    description: "ابزارهای هوشمند، شبیه‌سازها و بررسی مدارک",
  },
];

// ==========================================
// FALLBACK NEWS
// ==========================================
const FALLBACK_NEWS = [
  { category: "اقامت", title: "اصلاحات جدید کارت قرمز-سفید-قرمز اتریش در سال ۲۰۲۶", source: "ORF" },
  { category: "بیمه", title: "تمدید خودکار کارت‌های الکترونیک سلامت ÖGK", source: "ÖGK" },
  { category: "خدمات", title: "فعال‌سازی سامانه ID Austria برای تمام شهروندان", source: "BMF" },
  { category: "مالیات", title: "کاهش مالیات بر درآمد در سال ۲۰۲۶ اعلام شد", source: "Finanzamt" },
  { category: "حمل‌ونقل", title: "افزایش خطوط مترو وین U2 و U5 تا ۲۰۲۸", source: "Wiener Linien" },
];

// ==========================================
// EMERGENCY QUICK NUMBERS
// ==========================================
const EMERGENCY_NUMBERS = [
  { number: "133", label: "پلیس", color: "from-sky-600 to-blue-700" },
  { number: "144", label: "اورژانس", color: "from-rose-600 to-red-700" },
  { number: "122", label: "آتش‌نشانی", color: "from-amber-500 to-orange-600" },
  { number: "112", label: "اضطراری اروپا", color: "from-emerald-600 to-teal-700" },
];

// ==========================================
// TYPES
// ==========================================
interface SuperAppHeaderProps {
  activeSegment: string;
  onSelectSegment: (segment: string) => void;
  onOpenSearch: () => void;
  onOpenNews: () => void;
  onOpenMobileMenu?: () => void;
  viennaTime: string;
  viennaGreeting: string;
  sparkleActive: boolean;
  triggerSparkleFest: () => void;
  austriaNews?: any[];
  isNewsLoading?: boolean;
  showNavigation?: boolean;
  showHeroStrip?: boolean;
  isDeLocale?: boolean;
  onToggleDeLocale?: (enabled: boolean) => void;
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function SuperAppHeader({
  activeSegment,
  onSelectSegment,
  onOpenSearch,
  onOpenNews,
  onOpenMobileMenu,
  viennaTime,
  viennaGreeting,
  sparkleActive,
  triggerSparkleFest,
  austriaNews = [],
  isNewsLoading = false,
  showNavigation = false,
  showHeroStrip = false,
  isDeLocale = false,
  onToggleDeLocale,
}: SuperAppHeaderProps) {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);

  // Find active nav
  const activeNav = useMemo(
    () => NAV_ITEMS.find((nav) => nav.segments.includes(activeSegment)) || NAV_ITEMS[0],
    [activeSegment]
  );

  // Get pages for mega menu
  const getMegaMenuPages = (navId: string) => {
    const nav = NAV_ITEMS.find((n) => n.id === navId);
    if (!nav) return [];
    try {
      return nav.segments
        .map((seg) => {
          const category = SUPER_APP_CATEGORIES.find((c) => c.id === seg);
          if (category) {
            return getPagesByCategory(seg) || [];
          }
          return [];
        })
        .flat()
        .slice(0, 8);
    } catch {
      return [];
    }
  };

  // Determine time-based greeting icon
  const getTimeIcon = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return Sun;
    if (hour >= 12 && hour < 18) return Coffee;
    if (hour >= 18 && hour < 22) return Moon;
    return Star;
  };
  const TimeIcon = getTimeIcon();

  return (
    <header
      className="w-full space-y-3 sm:space-y-4 text-right select-none relative"
      dir="rtl"
    >
      {/* ========================================== */}
      {/* 1. MAIN BRAND BAR (Responsive Mobile & Tablet) */}
      {/* ========================================== */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white/95 border border-stone-200 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-md backdrop-blur-md flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4 relative overflow-hidden"
      >
        {/* Decorative flag accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c8102e] via-white to-[#c8102e]" />

        {/* Top / Left Side: Brand Logo & Title & Hamburger Button on Mobile */}
        <div className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-4 w-full lg:w-auto relative z-10">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div
              onClick={triggerSparkleFest}
              className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center p-1 shrink-0 cursor-pointer group select-none transition-transform active:scale-95"
              title="اتریش‌نشین: کانون مستقل همیاری ایرانیان اتریش"
            >
              {/* Spinning Austrian flag aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#c8102e] via-rose-500 to-amber-500 rounded-full animate-[spin_12s_linear_infinite] opacity-90 group-hover:opacity-100 transition-all shadow-md" />
              <div className="absolute inset-0.5 bg-white rounded-full flex items-center justify-center" />
              <img
                src={otrishLogo}
                alt="لوگوی پورتال اتریش‌نشین"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-full z-10 filter saturate-[1.05] transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
              />
              {/* Dual flags */}
              <span className="absolute -top-0.5 -right-0.5 bg-white text-[9px] sm:text-[10px] p-0.5 sm:p-1 rounded-full shadow-xs border border-stone-100 z-20">
                🇦🇹
              </span>
              <span className="absolute -bottom-0.5 -left-0.5 bg-white text-[9px] sm:text-[10px] p-0.5 sm:p-1 rounded-full shadow-xs border border-stone-100 z-20">
                🇮🇷
              </span>
              {/* Sparkle indicator */}
              {sparkleActive && (
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute -top-1 -left-1 bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[9px] p-1 rounded-full shadow-md z-20"
                >
                  <Sparkles className="w-3 h-3" />
                </motion.span>
              )}
            </div>

            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <button
                  onClick={() => onSelectSegment("home")}
                  className="text-lg sm:text-xl md:text-2xl font-black text-stone-900 hover:text-[#c8102e] transition-colors flex items-center gap-1"
                >
                  <span>اتریش‌نشین</span>
                  <span className="text-[#c8102e] font-serif italic text-sm sm:text-base md:text-lg" dir="ltr">
                    Otrish
                  </span>
                </button>

                <span className="text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-50 to-red-50 border border-red-200 text-[#c8102e] flex items-center gap-1 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="hidden xs:inline">سوپر اپلیکیشن</span> مستقل
                </span>
              </div>

              <p className="text-[11px] sm:text-xs text-stone-500 font-bold max-w-md hidden sm:block leading-relaxed">
                <span className="text-[#c8102e]">مرجع هوشمند</span> و کانون همیاری فارسی‌زبانان اتریش
                • اقامت، مالیات، مسکن و خدمات اجتماعی
              </p>
            </div>
          </div>

          {/* Mobile & Tablet Hamburger Button directly in header top */}
          {onOpenMobileMenu && (
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 sm:p-2.5 px-3 sm:px-3.5 bg-gradient-to-br from-stone-900 to-stone-800 text-white hover:bg-stone-700 rounded-xl sm:rounded-2xl flex items-center gap-1.5 sm:gap-2 text-xs font-black transition-all shadow-md active:scale-95 border border-stone-700/70 shrink-0"
              title="باز کردن منوی همبرگری دسته‌بندی‌ها و خدمات"
              aria-label="منوی همبرگری خدمات"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              <span>منوی بخش‌ها</span>
              <span className="text-[9px] font-mono bg-red-650 px-1.5 py-0.2 rounded-full text-white font-bold">
                ۶۰+
              </span>
            </button>
          )}
        </div>

        {/* Center: Global Search Bar */}
        <div className="w-full lg:max-w-md relative z-10">
          <div
            onClick={onOpenSearch}
            className="group w-full bg-gradient-to-br from-stone-50 to-white hover:from-white hover:to-rose-50/30 border-2 border-stone-200 hover:border-[#c8102e]/40 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 px-3 sm:px-4 flex items-center justify-between cursor-pointer transition-all shadow-xs hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-stone-500 group-hover:text-stone-800 min-w-0">
              <Search className="w-4 h-4 text-[#c8102e] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold truncate">
                جستجو در ۶۰+ بخش سوپراپ (MA35، پزشک، مالیات...)
              </span>
            </div>
            <kbd className="hidden sm:inline-flex px-2 py-0.5 bg-white border border-stone-300 rounded-lg text-[10px] font-mono font-bold text-stone-500 shadow-xs shrink-0">
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Right Controls: Clock & Assessment */}
        <div className="flex items-center gap-2 sm:gap-2.5 w-full lg:w-auto justify-between sm:justify-end flex-wrap sm:flex-nowrap relative z-10">
          {/* Vienna Live Clock */}
          <div className="bg-gradient-to-br from-stone-50 to-white border border-stone-200 p-2 sm:p-2.5 px-2.5 sm:px-3 rounded-xl sm:rounded-2xl flex items-center gap-2 shadow-xs hover:shadow-sm transition-all shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white flex items-center justify-center shrink-0 shadow-xs">
              <TimeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="text-right">
              <span className="text-[8.5px] sm:text-[9px] text-stone-500 font-black flex items-center gap-0.5 sm:gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#c8102e]" />
                وین:
              </span>
              <span className="text-xs sm:text-sm font-mono font-black text-stone-900 tracking-wider block">
                {viennaTime || "--:--:--"}
              </span>
            </div>
          </div>

          {/* Assessment Button */}
          <a
            href="https://tally.so/r/eqyy5E"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden p-2 sm:p-2.5 px-3 sm:px-3.5 bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:scale-105 text-white rounded-xl sm:rounded-2xl text-xs font-black transition-all shadow-md shadow-red-500/30 flex items-center gap-1.5 shrink-0"
            title="فرم ارزیابی هوشمند اقامت اتریش (Apply)"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/30 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Zap className="w-3.5 h-3.5 relative z-10 shrink-0" />
            <span className="relative z-10">ارزیابی</span>
            <span className="relative z-10 hidden sm:inline">رایگان</span>
            <ExternalLink className="w-3 h-3 relative z-10 opacity-70 group-hover:opacity-100" />
          </a>
        </div>
      </motion.div>

      {/* ========================================== */}
      {/* 2. MAIN NAVIGATION WITH MEGA MENU */}
      {/* ========================================== */}
      {showNavigation && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          aria-label="دسته‌بندی‌های اصلی سوپراپ"
          className="w-full relative z-30"
        >
          {/* Nav Bar */}
          <div className="bg-white/95 border border-stone-200 rounded-2xl p-1.5 shadow-lg backdrop-blur-md overflow-x-auto no-scrollbar flex items-center gap-1">
            {NAV_ITEMS.map((nav) => {
              const Icon = nav.icon;
              const isActive = activeNav.id === nav.id;
              return (
                <div
                  key={nav.id}
                  className="relative shrink-0"
                  onMouseEnter={() => setOpenMegaMenu(nav.id)}
                  onMouseLeave={() => setOpenMegaMenu(null)}
                >
                  <button
                    onClick={() => {
                      onSelectSegment(nav.segments[0]);
                      setOpenMegaMenu(openMegaMenu === nav.id ? null : nav.id);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? `bg-gradient-to-br ${nav.color} text-white shadow-md scale-105`
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "" : nav.text}`} />
                    <span>{nav.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        openMegaMenu === nav.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {openMegaMenu === nav.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-96 bg-white border-2 border-stone-200 rounded-2xl shadow-2xl p-4 z-50"
                      >
                        {/* Header */}
                        <div className="flex items-start gap-3 pb-3 mb-3 border-b border-stone-100">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${nav.color} flex items-center justify-center text-white shadow-md`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-black text-stone-900">
                              {nav.label}
                            </div>
                            <div className="text-[10px] text-stone-500 font-bold mt-0.5 leading-snug">
                              {nav.description}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                              {nav.segments.length} بخش
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMegaMenu(null);
                              }}
                              className="p-1 px-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-[10px] font-black flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                              title="بستن منو"
                              aria-label="بستن منو"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>بستن</span>
                            </button>
                          </div>
                        </div>

                        {/* Segments list */}
                        <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                          {nav.segments.slice(0, 10).map((seg) => {
                            const pageInfo = SUPER_APP_CATEGORIES.find((c) => c.id === seg);
                            if (!pageInfo) return null;
                            const isCurrentSeg = activeSegment === seg;
                            return (
                              <button
                                key={seg}
                                onClick={() => {
                                  onSelectSegment(seg);
                                  setOpenMegaMenu(null);
                                }}
                                className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-right transition-all group/item ${
                                  isCurrentSeg
                                    ? `bg-gradient-to-br ${nav.color} text-white shadow-sm`
                                    : "hover:bg-stone-50 text-stone-700"
                                }`}
                              >
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                  isCurrentSeg
                                    ? "bg-white/20"
                                    : `bg-gradient-to-br ${nav.color}`
                                } text-white`}>
                                  <Icon className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 text-right">
                                  <div className={`text-[11px] font-black ${
                                    isCurrentSeg ? "text-white" : "text-stone-800"
                                  }`}>
                                    {pageInfo.title || seg}
                                  </div>
                                </div>
                                <ChevronLeft
                                  className={`w-3.5 h-3.5 shrink-0 transition-all ${
                                    isCurrentSeg ? "text-white" : "text-stone-400 group-hover/item:text-[#c8102e] group-hover/item:-translate-x-0.5"
                                  }`}
                                />
                              </button>
                            );
                          })}

                          {nav.segments.length > 10 && (
                            <button
                              onClick={() => {
                                onSelectSegment(nav.segments[0]);
                                setOpenMegaMenu(null);
                              }}
                              className="w-full text-[10px] font-black text-[#c8102e] bg-rose-50 hover:bg-rose-100 border border-rose-200 py-2 rounded-xl transition-all flex items-center justify-center gap-1"
                            >
                              <span>مشاهده {nav.segments.length - 10} بخش دیگر</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* About & Contact */}
            <button
              onClick={() => onSelectSegment("about")}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 shrink-0 transition-all cursor-pointer mr-auto whitespace-nowrap ${
                activeSegment === "about"
                  ? "bg-gradient-to-br from-stone-800 to-stone-900 text-white shadow-md scale-105"
                  : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0 text-stone-600" />
              <span>درباره و تماس</span>
            </button>
          </div>
        </motion.nav>
      )}

      {/* ========================================== */}
      {/* 4. QUICK ACCESS HERO STRIP */}
      {/* ========================================== */}
      {showHeroStrip && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
        >
          {[
            {
              img: IMAGES.viennaHero,
              label: "RWR Card",
              sub: "محاسبه امتیاز",
              segment: "rwr-calculator",
              icon: Award,
              gradient: "from-[#c8102e] to-[#970d22]",
            },
            {
              img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
              label: "نمونه ویزاها",
              sub: "کارت اقامت و پذیرش",
              segment: "visa-samples",
              icon: IdCard,
              gradient: "from-purple-700 via-indigo-800 to-blue-900",
            },
            {
              img: IMAGES.parliament,
              label: "MA35",
              sub: "اقامت و مدارک",
              segment: "ma35",
              icon: Landmark,
              gradient: "from-indigo-600 to-blue-700",
            },
            {
              img: IMAGES.alps,
              label: "مدارک زبان",
              sub: "ÖSD، Goethe",
              segment: "german",
              icon: BookOpen,
              gradient: "from-emerald-600 to-teal-700",
            },
            {
              img: IMAGES.cafe,
              label: "مسکن وین",
              sub: "۲۳ منطقه",
              segment: "housesearch",
              icon: Building,
              gradient: "from-amber-500 to-orange-600",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={i}
                onClick={() => onSelectSegment(item.segment)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl h-20 md:h-24 border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-lg transition-all"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-75 mix-blend-multiply group-hover:opacity-85 transition-opacity`} />
                <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
                  <Icon className="w-4 h-4 opacity-80" />
                  <div className="text-right">
                    <div className="text-xs font-black leading-tight">{item.label}</div>
                    <div className="text-[9px] font-bold opacity-80">{item.sub}</div>
                  </div>
                </div>
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {/* Emergency Numbers Modal */}
      <EmergencyNumbersModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
    </header>
  );
}