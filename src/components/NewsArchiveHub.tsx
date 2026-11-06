import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper, Search, Zap, Clock, Bookmark, BookmarkCheck,
  Share2, ChevronDown, CheckCircle, ExternalLink, RefreshCw,
  X, Eye, Landmark, HeartPulse, TrendingUp, Home,
  GraduationCap, Flame, MapPin, Sparkles, Filter, SlidersHorizontal,
  RotateCcw, ArrowUpDown, Calendar, HelpCircle
} from "lucide-react";
import { toast } from "../utils/toast";
import { NewsItem, COMPREHENSIVE_NEWS_ARCHIVE, getNewsCardImage } from "./NewsModal";

export interface NewsArchiveHubProps {
  news?: NewsItem[];
  newsLastUpdated?: string;
  onRefresh?: () => Promise<void>;
  isNewsLoading?: boolean;
  variant?: "full" | "compact" | "card";
  onOpenModal?: () => void;
  title?: string;
  subtitle?: string;
}

// ============================================================
// 🎯 SMART CATEGORY DEFINITIONS
// Covers "قوانین مهاجرت", "رویدادهای شهری", "اخبار مالیاتی", and more
// ============================================================
export interface SmartCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgLight: string;
  borderLight: string;
  activeBg: string;
  matcher: (item: NewsItem) => boolean;
}

export const SMART_CATEGORIES: SmartCategory[] = [
  {
    id: "all",
    label: "همه اخبار",
    icon: Newspaper,
    color: "text-stone-700",
    bgLight: "bg-stone-100",
    borderLight: "border-stone-200",
    activeBg: "bg-stone-900 text-white",
    matcher: () => true,
  },
  {
    id: "migration_laws",
    label: "قوانین مهاجرت",
    icon: Landmark,
    color: "text-indigo-700",
    bgLight: "bg-indigo-50",
    borderLight: "border-indigo-200",
    activeBg: "bg-indigo-600 text-white",
    matcher: (item: NewsItem) => {
      const corpus = `${item.category} ${item.title} ${item.summary} ${(item.tags || []).join(" ")} ${item.source} ${item.residentAdvice || ""}`.toLowerCase();
      return /مهاجرت|اقامت|قوانین|rwr|قرمز|ma35|ویزا|پاسپورت|پناهند|شهروندی|تابعیت|bmaw|اداره اقامت|اتباع|مقیمان|الحاق خانواده/i.test(corpus);
    },
  },
  {
    id: "urban_events",
    label: "رویدادهای شهری",
    icon: MapPin,
    color: "text-cyan-700",
    bgLight: "bg-cyan-50",
    borderLight: "border-cyan-200",
    activeBg: "bg-cyan-600 text-white",
    matcher: (item: NewsItem) => {
      const corpus = `${item.category} ${item.title} ${item.summary} ${(item.tags || []).join(" ")} ${item.source} ${item.residentAdvice || ""}`.toLowerCase();
      return /رویداد|رویدادهای شهری|شهری|خدمات شهری|شهرداری|وین|klimaticket|حمل‌و‌نقل|حمل و نقل|مترو|wiener linien|اتوبوس|فستیوال|جشنواره|فرهنگی|ترافیک|donauinsel|festwochen/i.test(corpus);
    },
  },
  {
    id: "tax_news",
    label: "اخبار مالیاتی",
    icon: TrendingUp,
    color: "text-emerald-700",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-200",
    activeBg: "bg-emerald-600 text-white",
    matcher: (item: NewsItem) => {
      const corpus = `${item.category} ${item.title} ${item.summary} ${(item.tags || []).join(" ")} ${item.source} ${item.residentAdvice || ""}`.toLowerCase();
      return /مالیات|مالیاتی|اخبار مالیاتی|bmf|finanzamt|steuertarif|kalte progression|بروتو|حقوق|درآمد|تورم|یورو|مالی|سود|کسورات|کار و مالیات|ams|مشاغل کمبود|wko|معافیت/i.test(corpus);
    },
  },
  {
    id: "health",
    label: "بیمه و سلامت",
    icon: HeartPulse,
    color: "text-teal-700",
    bgLight: "bg-teal-50",
    borderLight: "border-teal-200",
    activeBg: "bg-teal-600 text-white",
    matcher: (item: NewsItem) => {
      const corpus = `${item.category} ${item.title} ${item.summary} ${(item.tags || []).join(" ")}`.toLowerCase();
      return /بیمه|سلامت|ögk|ogk|e-card|دندان|پزشک|درمان|دارو/i.test(corpus);
    },
  },
  {
    id: "housing",
    label: "مسکن و اجاره",
    icon: Home,
    color: "text-amber-700",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    activeBg: "bg-amber-600 text-white",
    matcher: (item: NewsItem) => {
      const corpus = `${item.category} ${item.title} ${item.summary} ${(item.tags || []).join(" ")}`.toLowerCase();
      return /مسکن|اجاره|wohnbeihilfe|ودیعه|ملک|آپارتمان|شارژ|mietpreisbremse/i.test(corpus);
    },
  },
  {
    id: "education",
    label: "تحصیل و دانشگاه",
    icon: GraduationCap,
    color: "text-blue-700",
    bgLight: "bg-blue-50",
    borderLight: "border-blue-200",
    activeBg: "bg-blue-600 text-white",
    matcher: (item: NewsItem) => {
      const corpus = `${item.category} ${item.title} ${item.summary} ${(item.tags || []).join(" ")}`.toLowerCase();
      return /تحصیل|دانشگاه|دانشجو|پذیرش|مدرک|آکادمیک|شهریه/i.test(corpus);
    },
  },
  {
    id: "iran",
    label: "ایران و سفارت",
    icon: Flame,
    color: "text-rose-700",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
    activeBg: "bg-rose-600 text-white",
    matcher: (item: NewsItem) => {
      const corpus = `${item.category} ${item.title} ${item.summary} ${(item.tags || []).join(" ")}`.toLowerCase();
      return /ایران|سفارت|کنسولی|تهران|گذرنامه|پرواز/i.test(corpus);
    },
  },
];

// Quick search tags for instant filtering
const QUICK_SEARCH_TAGS = [
  "کارت اقامت RWR",
  "مالیات بر درآمد ۲۰۲۶",
  "رویدادهای وین",
  "بلیت اقلیم KlimaTicket",
  "اداره اقامت MA35",
  "بیمه سلامت ÖGK",
  "سوبسید مسکن",
  "آزمون شهروندی"
];

// Helper to highlight matching keyword in title
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query || !query.trim()) return <>{text}</>;
  const cleanQ = query.trim();
  const parts = text.split(new RegExp(`(${cleanQ})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === cleanQ.toLowerCase() ? (
          <mark key={i} className="bg-amber-200/90 text-stone-900 rounded-xs px-0.5 font-black">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function NewsArchiveHub({
  news,
  newsLastUpdated = "۱۴۰۵ (پیوسته)",
  onRefresh,
  isNewsLoading = false,
  variant = "full",
  onOpenModal,
  title = "آرشیو اخبار و مصوبات اتریش",
  subtitle = "پایش هوشمند و ترجمه تحلیلی مهم‌ترین مصوبات فدرال اتریش برای فارسی‌زبانان",
}: NewsArchiveHubProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");
  const [searchTitleQuery, setSearchTitleQuery] = useState<string>("");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [savedNewsIds, setSavedNewsIds] = useState<string[]>([]);
  
  // Advanced filters state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<"all" | "saved" | "urgent" | "advice">("all");
  const [sortBy, setSortBy] = useState<"newest" | "views" | "urgent">("newest");
  const [searchScope, setSearchScope] = useState<"title_only" | "all_text">("title_only");
  const [yearFilter, setYearFilter] = useState<"all" | "2026" | "recent">("all");
  const [isRefreshingLocal, setIsRefreshingLocal] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("otrish_saved_news_archive");
      if (stored) {
        setSavedNewsIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Keyboard shortcut listener for live search (Press "/" to focus)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (savedNewsIds.includes(id)) {
      updated = savedNewsIds.filter((item) => item !== id);
      toast.info("از نشان‌شده‌ها حذف شد.");
    } else {
      updated = [...savedNewsIds, id];
      toast.success("به نشان‌شده‌ها اضافه شد 📌");
    }
    setSavedNewsIds(updated);
    try {
      localStorage.setItem("otrish_saved_news_archive", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const allNews = useMemo(() => {
    if (news && news.length > 0) return news;
    return COMPREHENSIVE_NEWS_ARCHIVE;
  }, [news]);

  // Compute live counts for each smart category
  const smartCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    SMART_CATEGORIES.forEach((cat) => {
      counts[cat.id] = allNews.filter((item) => cat.matcher(item)).length;
    });
    return counts;
  }, [allNews]);

  // Check if any custom filter is active
  const isFilterActive = useMemo(() => {
    return (
      activeCategoryId !== "all" ||
      searchTitleQuery.trim() !== "" ||
      filterMode !== "all" ||
      sortBy !== "newest" ||
      yearFilter !== "all"
    );
  }, [activeCategoryId, searchTitleQuery, filterMode, sortBy, yearFilter]);

  // Reset all filters to default
  const handleResetFilters = () => {
    setActiveCategoryId("all");
    setSearchTitleQuery("");
    setFilterMode("all");
    setSortBy("newest");
    setSearchScope("title_only");
    setYearFilter("all");
    toast.info("تمام فیلترها و جستجو پاکسازی شدند.");
  };

  // Smart Filtered & Searched News
  const filteredNews = useMemo(() => {
    let result = allNews;

    // Filter by mode (urgent / saved / advice)
    if (filterMode === "saved") {
      result = result.filter((n) => n.id && savedNewsIds.includes(n.id));
    } else if (filterMode === "urgent") {
      result = result.filter((n) => n.urgent);
    } else if (filterMode === "advice") {
      result = result.filter((n) => Boolean(n.residentAdvice && n.residentAdvice.length > 10));
    }

    // Filter by smart category (قوانین مهاجرت, رویدادهای شهری, اخبار مالیاتی, ...)
    const activeCatObj = SMART_CATEGORIES.find((c) => c.id === activeCategoryId);
    if (activeCatObj && activeCatObj.id !== "all") {
      result = result.filter((item) => activeCatObj.matcher(item));
    }

    // Filter by year
    if (yearFilter === "2026") {
      result = result.filter((n) => n.date.includes("2026") || n.date.includes("۱۴۰۵"));
    }

    // Live search in news titles (or full text based on searchScope)
    if (searchTitleQuery.trim()) {
      const q = searchTitleQuery.toLowerCase().trim();
      if (searchScope === "title_only") {
        result = result.filter((n) => n.title.toLowerCase().includes(q));
      } else {
        result = result.filter((n) =>
          n.title.toLowerCase().includes(q) ||
          (n.summary && n.summary.toLowerCase().includes(q)) ||
          (n.tags && n.tags.some((t) => t.toLowerCase().includes(q))) ||
          (n.residentAdvice && n.residentAdvice.toLowerCase().includes(q))
        );
      }
    }

    // Sort result
    return [...result].sort((a, b) => {
      if (sortBy === "views") {
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      }
      if (sortBy === "urgent") {
        if (a.urgent && !b.urgent) return -1;
        if (!a.urgent && b.urgent) return 1;
      }
      return 0; // maintain default newest order
    });
  }, [allNews, activeCategoryId, searchTitleQuery, filterMode, savedNewsIds, sortBy, searchScope, yearFilter]);

  const handleShare = (item: NewsItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = item.link || window.location.href;
    const shareText = `📰 ${item.title}\nمنبع: ${item.source}\nمطالعه در اتریش‌نشین:\n${link}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText)
        .then(() => toast.success("خلاصه و لینک خبر کپی شد 📋"))
        .catch(() => toast.success("لینک خبر کپی شد."));
    }
  };

  const handleManualRefresh = async () => {
    setIsRefreshingLocal(true);
    if (onRefresh) {
      await onRefresh();
    } else {
      await new Promise((res) => setTimeout(res, 600));
    }
    setIsRefreshingLocal(false);
    toast.success("آرشیو اخبار با موفقیت به‌روزرسانی شد ⚡");
  };

  // Find active category metadata
  const activeCategoryMeta = SMART_CATEGORIES.find((c) => c.id === activeCategoryId) || SMART_CATEGORIES[0];

  return (
    <section
      className="w-full bg-white border border-stone-200/90 rounded-3xl p-4 sm:p-6 shadow-md relative overflow-hidden select-none"
      dir="rtl"
      aria-label="بخش آرشیو جامع اخبار"
    >
      {/* Decorative Austrian top flag gradient stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c8102e] via-amber-400 to-[#c8102e]" />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-stone-150">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white flex items-center justify-center shadow-xs">
              <Newspaper className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-black text-stone-900 flex items-center gap-1.5">
              <span>{title}</span>
              <span className="text-xs font-serif italic text-[#c8102e]" dir="ltr">2026</span>
            </h2>
            <span className="inline-flex items-center gap-1 text-[9.5px] font-black bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              <span>پایش ۱۰ رسانه فدرال</span>
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-stone-500 font-bold leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Action buttons & Refresh */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            disabled={isRefreshingLocal || isNewsLoading}
            onClick={handleManualRefresh}
            className="p-2 sm:px-3 sm:py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 border border-stone-200 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-60 shadow-2xs"
            title="به‌روزرسانی آرشیو اخبار"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingLocal || isNewsLoading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline text-[11px]">به‌روزرسانی</span>
          </button>

          {onOpenModal && (
            <button
              type="button"
              onClick={onOpenModal}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#c8102e] to-[#970d22] text-white rounded-xl text-xs font-black transition-all cursor-pointer hover:shadow-md active:scale-95 flex items-center gap-1.5 shadow-xs"
              title="مشاهده در نمای تمام‌صفحه آرشیو"
            >
              <span>مشاهده کل آرشیو</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 🔍 LIVE TITLE SEARCH & ADVANCED FILTER CONTROLS */}
      {/* ============================================================ */}
      <div className="space-y-3 mb-5">
        {/* Row 1: Search in Titles Input + Filter Mode Tabs + Advanced Filter Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Live Search Input across titles */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTitleQuery}
              onChange={(e) => setSearchTitleQuery(e.target.value)}
              placeholder="جستجوی زنده در عناوین اخبار (RWR، مالیات، رویدادهای وین، مسکن...)"
              className="w-full pr-10 pl-20 py-2.5 text-xs font-bold bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c8102e]/30 focus:border-[#c8102e] transition-all shadow-2xs placeholder:text-stone-400"
            />
            
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchTitleQuery && (
                <button
                  type="button"
                  onClick={() => setSearchTitleQuery("")}
                  className="text-stone-400 hover:text-stone-700 p-1"
                  title="پاک کردن جستجو"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <span className="hidden md:inline-block text-[9px] font-mono font-bold text-stone-400 bg-stone-200/70 px-1.5 py-0.5 rounded border border-stone-300">
                /
              </span>
            </div>
          </div>

          {/* Quick Mode Selector (همه / فوری / نشان‌شده‌ها) */}
          <div className="inline-flex p-1 bg-stone-100 border border-stone-200 rounded-xl text-[10.5px] font-black shrink-0">
            <button
              type="button"
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                filterMode === "all" ? "bg-white text-stone-900 shadow-2xs font-extrabold" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              همه ({allNews.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("urgent")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                filterMode === "urgent" ? "bg-red-600 text-white shadow-2xs font-extrabold" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Zap className="w-2.5 h-2.5" />
              <span>فوری</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("saved")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                filterMode === "saved" ? "bg-amber-500 text-white shadow-2xs font-extrabold" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Bookmark className="w-2.5 h-2.5" />
              <span>نشان‌شده ({savedNewsIds.length})</span>
            </button>
          </div>

          {/* Advanced Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
              showAdvancedFilters || isFilterActive
                ? "bg-amber-50 border-amber-300 text-amber-900 shadow-xs"
                : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
            }`}
            title="تنظیمات فیلتر پیشرفته"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
            <span>فیلتر پیشرفته</span>
            {isFilterActive && (
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            )}
          </button>
        </div>

        {/* Row 2: Smart Category Filter Chips with Framer-Motion Active Pill */}
        {/* Featuring: «قوانین مهاجرت»، «رویدادهای شهری»، «اخبار مالیاتی» */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1 relative" dir="rtl">
          {SMART_CATEGORIES.map((cat) => {
            const isActive = activeCategoryId === cat.id;
            const Icon = cat.icon;
            const count = smartCategoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95 z-10 ${
                  isActive
                    ? "text-white shadow-xs"
                    : "bg-stone-100/90 text-stone-700 hover:bg-stone-200/80 border border-stone-200 hover:border-stone-300"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-gradient-to-br from-[#c8102e] to-[#970d22] rounded-xl -z-10 shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : cat.color}`} />
                <span>{cat.label}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-stone-200/70 text-stone-600"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* ⚙️ ADVANCED FILTER EXPANDABLE PANEL (FRAMER MOTION) */}
        {/* ============================================================ */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="bg-stone-50/90 border border-stone-200 rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-inner text-right">
                <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-stone-800">
                    <Filter className="w-4 h-4 text-[#c8102e]" />
                    <span>تنظیمات چندبعدی فیلتر اخبار</span>
                  </div>
                  {isFilterActive && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-[10.5px] font-bold text-red-700 hover:text-red-900 flex items-center gap-1 transition-colors cursor-pointer bg-red-50 hover:bg-red-100 px-2 py-1 rounded-lg border border-red-200"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>حذف تمام فیلترها</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  {/* Option 1: Sort by */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 flex items-center gap-1">
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                      مرتب‌سازی نتایج:
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 text-[11px] font-bold text-stone-800 focus:outline-none focus:border-[#c8102e]"
                    >
                      <option value="newest">جدیدترین اخبار (۲۰۲۶)</option>
                      <option value="views">پربازدیدترین اخبار</option>
                      <option value="urgent">اولویت با اخبار فوری ⚡</option>
                    </select>
                  </div>

                  {/* Option 2: Search Scope */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 flex items-center gap-1">
                      <Search className="w-3 h-3 text-stone-400" />
                      محدوده جستجوی زنده:
                    </label>
                    <select
                      value={searchScope}
                      onChange={(e) => setSearchScope(e.target.value as any)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 text-[11px] font-bold text-stone-800 focus:outline-none focus:border-[#c8102e]"
                    >
                      <option value="title_only">فقط در عناوین اخبار 🏷️</option>
                      <option value="all_text">عناوین و متن کامل تحلیلی 📄</option>
                    </select>
                  </div>

                  {/* Option 3: Mode / Advice Filter */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-stone-400" />
                      نوع محتوا:
                    </label>
                    <select
                      value={filterMode}
                      onChange={(e) => setFilterMode(e.target.value as any)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 text-[11px] font-bold text-stone-800 focus:outline-none focus:border-[#c8102e]"
                    >
                      <option value="all">همه انواع اخبار</option>
                      <option value="urgent">فقط اخبار فوری و اضطراری ⚡</option>
                      <option value="saved">نشان‌شده‌های من 📌</option>
                      <option value="advice">دارای راهکار اختصاصی مقیمان 💡</option>
                    </select>
                  </div>

                  {/* Option 4: Year Filter */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      بازه زمانی خبر:
                    </label>
                    <select
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value as any)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 text-[11px] font-bold text-stone-800 focus:outline-none focus:border-[#c8102e]"
                    >
                      <option value="all">همه زمان‌ها</option>
                      <option value="2026">فقط مصوبات سال ۲۰۲۶</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row 3: Quick Search suggestions & Live Filter status */}
        <div className="flex items-center justify-between gap-2 flex-wrap pt-0.5 text-[10.5px]">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5">
            <span className="text-stone-400 font-bold shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              عناوین پیشنهادی:
            </span>
            {QUICK_SEARCH_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchTitleQuery(tag);
                  setActiveCategoryId("all");
                }}
                className={`px-2 py-0.5 rounded-md border text-[9.5px] font-bold transition-all cursor-pointer shrink-0 ${
                  searchTitleQuery === tag
                    ? "bg-[#c8102e] text-white border-[#c8102e]"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          <div className="text-[10px] text-stone-500 font-bold shrink-0 mr-auto flex items-center gap-2">
            {searchTitleQuery ? (
              <span className="text-[#c8102e] font-black">
                {filteredNews.length} خبر مطابق با عنوان «{searchTitleQuery}»
              </span>
            ) : (
              <span>
                دسته‌بندی: <strong className="text-stone-800">{activeCategoryMeta.label}</strong> ({filteredNews.length} خبر)
              </span>
            )}

            {isFilterActive && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[9.5px] text-stone-400 hover:text-stone-700 underline cursor-pointer"
                title="پاکسازی فیلترها"
              >
                پاکسازی
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 🌟 SMOOTH FADE-IN & SLIDE ANIMATED ARTICLES GRID (FRAMER-MOTION) */}
      {/* ============================================================ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`news-grid-${activeCategoryId}-${searchTitleQuery}-${filterMode}-${sortBy}-${yearFilter}`}
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          {filteredNews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-center py-12 border border-dashed border-stone-200 rounded-2xl p-6 bg-stone-50/50 space-y-2"
            >
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-black text-stone-800">خبری یافت نشد</h4>
              <p className="text-[11px] text-stone-500 max-w-xs mx-auto">
                {searchTitleQuery
                  ? `عنوانی با عبارت «${searchTitleQuery}» در دسته‌بندی «${activeCategoryMeta.label}» یافت نشد.`
                  : `در حال حاضر خبری با این فیلترهای انتخابی موجود نیست.`}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-2 px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
              >
                نمایش تمام اخبار آرشیو
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredNews.map((item, idx) => {
                // Find category styling
                const matchedSmartCat = SMART_CATEGORIES.find((c) => c.matcher(item)) || SMART_CATEGORIES[0];
                const CatIcon = matchedSmartCat.icon;
                const isSelected = selectedArticleId === item.id;
                const isSaved = item.id ? savedNewsIds.includes(item.id) : false;
                const cardImageUrl = getNewsCardImage(item);

                return (
                  <motion.article
                    key={item.id || idx}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.28,
                      delay: Math.min(idx * 0.035, 0.25),
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    onClick={() => setSelectedArticleId(isSelected ? null : item.id || null)}
                    className={`group bg-stone-50/60 hover:bg-white border rounded-2xl p-3.5 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md ${
                      isSelected
                        ? "border-[#c8102e]/60 ring-2 ring-[#c8102e]/10 bg-white"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    {/* 🖼️ Card Media Banner with Official "اتریش‌نشین" Watermark */}
                    <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3 bg-stone-900 border border-stone-200/80 group-hover:border-[#c8102e]/40 transition-all select-none">
                      <img
                        src={cardImageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      {/* Dark gradient for visual depth & legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />

                      {/* Top Badges: Category + Urgent */}
                      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[9.5px] font-black border backdrop-blur-md shadow-sm ${matchedSmartCat.bgLight} ${matchedSmartCat.color} ${matchedSmartCat.borderLight}`}>
                          <CatIcon className="w-2.5 h-2.5" />
                          <span>{item.category || matchedSmartCat.label}</span>
                        </span>

                        {item.urgent && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-1 rounded-md text-[9px] font-black bg-red-600 text-white shadow-sm animate-pulse">
                            <Zap className="w-2.5 h-2.5" />
                            فوری
                          </span>
                        )}
                      </div>

                      {/* Top-Left: Bookmark & Share Actions */}
                      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1">
                        {item.id && (
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(item.id!, e)}
                            className={`p-1.5 rounded-lg border text-[11px] backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                              isSaved
                                ? "bg-amber-400 text-stone-950 border-amber-300 font-black"
                                : "bg-black/55 border-white/20 text-white hover:bg-black/80"
                            }`}
                            title={isSaved ? "نشان‌شده" : "نشان کردن خبر"}
                          >
                            {isSaved ? (
                              <BookmarkCheck className="w-3.5 h-3.5" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={(e) => handleShare(item, e)}
                          className="p-1.5 rounded-lg border border-white/20 bg-black/55 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer shadow-sm"
                          title="اشتراک و کپی خلاصه خبر"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* 🔒 Center Subtle Security Watermark across the image */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                        <span className="text-white/25 text-base sm:text-lg font-black tracking-widest rotate-[-12deg] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] uppercase border border-white/20 px-3 py-1 rounded-xl backdrop-blur-[1px]">
                          اتریش‌نشین • OTRISH NESHIN
                        </span>
                      </div>

                      {/* 🇦🇹 Bottom-Right Official Watermark Badge */}
                      <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-950/90 backdrop-blur-md border border-white/25 text-white shadow-lg">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8102e]"></span>
                        </span>
                        <span className="text-[10px] font-black tracking-tight text-white select-none">
                          واترمارک رسمی اتریش‌نشین 🇦🇹
                        </span>
                      </div>

                      {/* Bottom-Left Date Badge */}
                      <div className="absolute bottom-2.5 left-2.5 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/65 text-stone-200 text-[9px] font-mono backdrop-blur-md border border-white/10" dir="ltr">
                          <Clock className="w-2.5 h-2.5 text-amber-300" />
                          <span>{item.date}</span>
                        </span>
                      </div>
                    </div>

                    {/* Content Section: Title & Summary */}
                    <div>
                      {/* Title with live search keyword highlight */}
                      <h3 className="text-xs sm:text-[13px] font-black text-stone-900 group-hover:text-[#c8102e] transition-colors leading-snug mb-1.5">
                        <HighlightMatch text={item.title} query={searchTitleQuery} />
                      </h3>

                      {/* Summary */}
                      <p className="text-[11px] text-stone-600 font-bold leading-relaxed line-clamp-2">
                        {item.summary}
                      </p>
                    </div>

                    {/* Bottom Metadata & Expand */}
                    <div className="mt-3 pt-2 border-t border-stone-150/80 flex items-center justify-between text-[9.5px] font-bold text-stone-400">
                      <span className="truncate">
                        مرجع: <span className="font-extrabold text-stone-700">{item.source}</span>
                      </span>

                      <span className="text-[#c8102e] font-black flex items-center gap-0.5 shrink-0">
                        {isSelected ? "بستن راهنما" : "راهنمای اقدام"}
                        <ChevronDown className={`w-3 h-3 transition-transform ${isSelected ? "rotate-180" : ""}`} />
                      </span>
                    </div>

                    {/* Expandable Action Guidance with Smooth Motion */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.24, ease: "easeOut" }}
                          className="mt-3 pt-2.5 border-t border-dashed border-stone-200 space-y-2 text-right overflow-hidden"
                        >
                          <div className="bg-amber-50/90 border border-amber-200 p-2.5 rounded-xl text-[10.5px] text-amber-950 font-bold leading-relaxed">
                            <span className="font-black text-amber-800 flex items-center gap-1 mb-1">
                              <Zap className="w-3 h-3 text-amber-600" />
                              راهکار اختصاصی برای مقیمان اتریش:
                            </span>
                            {item.residentAdvice || "این قانون برای سال جدید معتبر است. مدارک خود را با مراجع رسمی تطبیق دهید."}
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[9px] text-emerald-700 font-black flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              تایید مراجع رسمی فدرال
                            </span>

                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-[9.5px] font-black text-stone-800 hover:text-[#c8102e] bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded-lg transition-colors"
                              >
                                <span>تارنمای مرجع</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Footer Info */}
      <div className="mt-4 pt-3 border-t border-stone-150 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-stone-400 font-bold">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-stone-400" />
          آخرین به‌روزرسانی فید: <span className="font-mono text-stone-700 font-black">{newsLastUpdated}</span>
        </span>

        <span className="flex items-center gap-1 text-emerald-700 font-black">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          پایش هوشمند و بی‌وقفه ۲۰۲۶ اتریش‌نشین 🇦🇹
        </span>
      </div>
    </section>
  );
}
