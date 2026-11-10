import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper, Search, Zap, Clock, Bookmark, BookmarkCheck,
  Share2, ChevronDown, CheckCircle, ExternalLink, RefreshCw,
  X, Eye, Landmark, HeartPulse, TrendingUp, Home,
  GraduationCap, Flame, MapPin, Sparkles, Filter, SlidersHorizontal,
  RotateCcw, ArrowUpDown, Calendar, HelpCircle,
  ChevronLeft, ChevronRight, Play, Pause
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
  // 🎨 Colorful per-topic theme styling
  cardBg: string;
  cardBorder: string;
  glowShadow: string;
  badgeBg: string;
  accentBar: string;
  actionBtn: string;
  accentText: string;
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
    cardBg: "bg-gradient-to-b from-stone-50 via-white to-stone-100/70",
    cardBorder: "border-stone-200/90 hover:border-stone-400",
    glowShadow: "hover:shadow-stone-400/20",
    badgeBg: "bg-stone-900 text-white border-stone-700",
    accentBar: "from-stone-600 via-stone-400 to-stone-600",
    actionBtn: "bg-stone-900 hover:bg-black text-white",
    accentText: "text-stone-800",
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
    cardBg: "bg-gradient-to-b from-indigo-50/95 via-white to-blue-50/60",
    cardBorder: "border-indigo-200 hover:border-indigo-500",
    glowShadow: "hover:shadow-indigo-500/25",
    badgeBg: "bg-gradient-to-r from-indigo-600 to-blue-700 text-white border-indigo-400/30",
    accentBar: "from-indigo-600 via-blue-500 to-indigo-700",
    actionBtn: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30",
    accentText: "text-indigo-700",
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
    cardBg: "bg-gradient-to-b from-cyan-50/95 via-white to-sky-50/60",
    cardBorder: "border-cyan-200 hover:border-cyan-500",
    glowShadow: "hover:shadow-cyan-500/25",
    badgeBg: "bg-gradient-to-r from-cyan-600 to-sky-700 text-white border-cyan-400/30",
    accentBar: "from-cyan-500 via-sky-400 to-blue-600",
    actionBtn: "bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-600/30",
    accentText: "text-cyan-700",
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
    cardBg: "bg-gradient-to-b from-emerald-50/95 via-white to-teal-50/60",
    cardBorder: "border-emerald-200 hover:border-emerald-500",
    glowShadow: "hover:shadow-emerald-500/25",
    badgeBg: "bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-400/30",
    accentBar: "from-emerald-500 via-green-400 to-teal-600",
    actionBtn: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30",
    accentText: "text-emerald-700",
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
    cardBg: "bg-gradient-to-b from-teal-50/95 via-white to-emerald-50/60",
    cardBorder: "border-teal-200 hover:border-teal-500",
    glowShadow: "hover:shadow-teal-500/25",
    badgeBg: "bg-gradient-to-r from-teal-600 to-emerald-700 text-white border-teal-400/30",
    accentBar: "from-teal-500 via-emerald-400 to-teal-600",
    actionBtn: "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/30",
    accentText: "text-teal-700",
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
    cardBg: "bg-gradient-to-b from-amber-50/95 via-white to-orange-50/60",
    cardBorder: "border-amber-200 hover:border-amber-500",
    glowShadow: "hover:shadow-amber-500/25",
    badgeBg: "bg-gradient-to-r from-amber-600 to-orange-700 text-white border-amber-400/30",
    accentBar: "from-amber-500 via-orange-400 to-amber-600",
    actionBtn: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30",
    accentText: "text-amber-700",
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
    cardBg: "bg-gradient-to-b from-violet-50/95 via-white to-purple-50/60",
    cardBorder: "border-violet-200 hover:border-violet-500",
    glowShadow: "hover:shadow-violet-500/25",
    badgeBg: "bg-gradient-to-r from-violet-600 to-purple-700 text-white border-violet-400/30",
    accentBar: "from-violet-500 via-purple-400 to-indigo-600",
    actionBtn: "bg-violet-600 hover:bg-violet-700 text-white shadow-violet-600/30",
    accentText: "text-violet-700",
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
    cardBg: "bg-gradient-to-b from-rose-50/95 via-white to-red-50/60",
    cardBorder: "border-rose-200 hover:border-rose-500",
    glowShadow: "hover:shadow-rose-500/25",
    badgeBg: "bg-gradient-to-r from-rose-600 to-red-700 text-white border-rose-400/30",
    accentBar: "from-rose-500 via-red-400 to-red-600",
    actionBtn: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30",
    accentText: "text-rose-700",
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

  // ============================================================
  // 🎠 AUTOMATIC SLIDER / CAROUSEL CONTROLS & STATE
  // ============================================================
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const selectedArticle = useMemo(() => {
    if (!selectedArticleId) return null;
    return allNews.find((n) => n.id === selectedArticleId) || null;
  }, [allNews, selectedArticleId]);

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current || filteredNews.length === 0) return;
    const targetIdx = Math.max(0, Math.min(index, filteredNews.length - 1));
    const cards = sliderRef.current.children;
    if (cards && cards[targetIdx]) {
      (cards[targetIdx] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveSlideIndex(targetIdx);
    }
  };

  const handleNextSlide = () => {
    if (filteredNews.length <= 1) return;
    const nextIdx = (activeSlideIndex + 1) % filteredNews.length;
    scrollToSlide(nextIdx);
  };

  const handlePrevSlide = () => {
    if (filteredNews.length <= 1) return;
    const prevIdx = (activeSlideIndex - 1 + filteredNews.length) % filteredNews.length;
    scrollToSlide(prevIdx);
  };

  // Reset slide index when category/search/filters change
  useEffect(() => {
    setActiveSlideIndex(0);
    if (sliderRef.current && sliderRef.current.children[0]) {
      (sliderRef.current.children[0] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [activeCategoryId, searchTitleQuery, filterMode, sortBy, yearFilter]);

  // Automatic slide interval (every 4.2 seconds) with pause on hover
  useEffect(() => {
    if (!isAutoPlay || isHovered || filteredNews.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => {
        const next = (prev + 1) % filteredNews.length;
        if (sliderRef.current && sliderRef.current.children[next]) {
          (sliderRef.current.children[next] as HTMLElement).scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
        return next;
      });
    }, 4200);
    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, filteredNews.length]);

  // Synchronize activeSlideIndex on manual scroll
  const handleScroll = () => {
    if (!sliderRef.current || filteredNews.length === 0) return;
    const container = sliderRef.current;
    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIdx = 0;
    let minDistance = Infinity;
    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });
    setActiveSlideIndex(closestIdx);
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
            <span className="inline-flex items-center gap-1 text-[9.5px] font-black bg-emerald-50 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>به‌روزرسانی تازه ({newsLastUpdated})</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[9.5px] font-black bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
              <span>۱۰ منبع رسمی فدرال و شهری اتریش</span>
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
            <div className="space-y-3">
              {/* 🎛️ Slider Navigation & Autoplay Toolbar */}
              <div className="flex items-center justify-between gap-3 px-1 py-1.5 bg-stone-50 border border-stone-200/90 rounded-2xl text-xs font-bold">
                {/* Autoplay status toggle */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black transition-all cursor-pointer border ${
                      isAutoPlay
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 shadow-2xs"
                        : "bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200"
                    }`}
                    title={isAutoPlay ? "توقف اسلاید خودکار" : "شروع اسلاید خودکار"}
                  >
                    {isAutoPlay ? (
                      <>
                        <Pause className="w-3 h-3 text-emerald-600" />
                        <span>اسلایدر خودکار فعال</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-stone-600" />
                        <span>پخش خودکار اسلایدر</span>
                      </>
                    )}
                  </button>

                  <span className="hidden sm:inline-block text-[10px] text-stone-400 font-bold">
                    (توقف موقت با هاور ماوس)
                  </span>
                </div>

                {/* Right controls: Next, Prev, Slide counter */}
                <div className="flex items-center gap-2 mr-auto">
                  <span className="text-[11px] font-mono font-bold text-stone-600 bg-white border border-stone-200 px-2.5 py-1 rounded-xl shadow-2xs" dir="ltr">
                    {activeSlideIndex + 1} / {filteredNews.length}
                  </span>

                  <div className="inline-flex items-center gap-1 bg-white border border-stone-200 p-0.5 rounded-xl shadow-2xs">
                    <button
                      type="button"
                      onClick={handleNextSlide}
                      className="p-1.5 rounded-lg text-stone-700 hover:text-white hover:bg-[#c8102e] transition-all cursor-pointer active:scale-95"
                      title="کارت بعدی"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      className="p-1.5 rounded-lg text-stone-700 hover:text-white hover:bg-[#c8102e] transition-all cursor-pointer active:scale-95"
                      title="کارت قبلی"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 🎠 Automatic Square-Card Carousel */}
              <div
                ref={sliderRef}
                onScroll={handleScroll}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-2 px-1 snap-x snap-mandatory scroll-smooth items-stretch"
                dir="rtl"
              >
                {filteredNews.map((item, idx) => {
                  const matchedSmartCat = SMART_CATEGORIES.find((c) => c.matcher(item)) || SMART_CATEGORIES[0];
                  const CatIcon = matchedSmartCat.icon;
                  const isSaved = item.id ? savedNewsIds.includes(item.id) : false;
                  const cardImageUrl = getNewsCardImage(item);
                  const isCurrentSlide = activeSlideIndex === idx;

                  return (
                    <motion.article
                      key={item.id || idx}
                      layout
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.28,
                        delay: Math.min(idx * 0.03, 0.2),
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      onClick={() => setSelectedArticleId(item.id || null)}
                      className={`group relative w-[calc(25%-6px)] sm:w-[calc(25%-9px)] min-w-[110px] aspect-[2/3] shrink-0 rounded-2xl ${matchedSmartCat.cardBg} ${matchedSmartCat.cardBorder} ${matchedSmartCat.glowShadow} border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden snap-center select-none shadow-sm hover:shadow-xl ${
                        isCurrentSlide
                          ? "ring-2 ring-offset-1 ring-[#c8102e]/35 scale-[1.01]"
                          : ""
                      }`}
                    >
                      {/* 🎨 Top Vibrant Topic Accent Stripe */}
                      <div className={`h-1 w-full bg-gradient-to-r ${matchedSmartCat.accentBar}`} />

                      {/* 🖼️ Upper Section (~44% height): Watermarked Media Banner */}
                      <div className="relative h-[44%] w-full overflow-hidden bg-stone-900 border-b border-stone-200/80 group-hover:border-[#c8102e]/40 transition-all select-none shrink-0">
                        <img
                          src={cardImageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                        {/* Dark gradient for visual depth & legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/40 pointer-events-none" />

                        {/* Top Badges: Thematic Category + Urgent */}
                        <div className="absolute top-1 right-1 z-10 flex items-center gap-0.5 flex-wrap">
                          <span className={`inline-flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] font-black border backdrop-blur-md shadow-xs ${matchedSmartCat.badgeBg}`}>
                            <CatIcon className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                            <span className="truncate max-w-[50px] sm:max-w-none">{item.category || matchedSmartCat.label}</span>
                          </span>

                          {item.urgent && (
                            <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[6.5px] sm:text-[7.5px] font-black bg-red-600 text-white shadow-xs animate-pulse">
                              <Zap className="w-1.5 h-1.5" />
                              فوری
                            </span>
                          )}
                        </div>

                        {/* Top-Left: Bookmark & Share Actions */}
                        <div className="absolute top-1 left-1 z-10 flex items-center gap-0.5">
                          {item.id && (
                            <button
                              type="button"
                              onClick={(e) => toggleBookmark(item.id!, e)}
                              className={`p-1 rounded border text-[8px] backdrop-blur-md transition-all cursor-pointer shadow-xs ${
                                isSaved
                                  ? "bg-amber-400 text-stone-950 border-amber-300 font-black"
                                  : "bg-black/60 border-white/25 text-white hover:bg-black/85"
                              }`}
                              title={isSaved ? "نشان‌شده" : "نشان کردن خبر"}
                            >
                              {isSaved ? (
                                <BookmarkCheck className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                              ) : (
                                <Bookmark className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                              )}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={(e) => handleShare(item, e)}
                            className="p-1 rounded border border-white/25 bg-black/60 hover:bg-black/85 text-white backdrop-blur-md transition-all cursor-pointer shadow-xs"
                            title="اشتراک و کپی خلاصه خبر"
                          >
                            <Share2 className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                          </button>
                        </div>

                        {/* 🔒 Center Subtle Security Watermark across the image */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                          <span className="text-white/30 text-[7px] sm:text-[8px] font-black tracking-wider rotate-[-12deg] drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] uppercase border border-white/25 px-1 py-0.2 rounded backdrop-blur-[1px]">
                            اتریش‌نشین
                          </span>
                        </div>

                        {/* 🇦🇹 Bottom-Right Official Watermark Badge */}
                        <div className="absolute bottom-1 right-1 z-10 flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 rounded bg-stone-950/90 backdrop-blur-md border border-white/25 text-white shadow-xs">
                          <span className="flex h-1 w-1 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1 w-1 bg-[#c8102e]"></span>
                          </span>
                          <span className="text-[6.5px] sm:text-[7.5px] font-black tracking-tight text-white select-none">
                            اتریش‌نشین 🇦🇹
                          </span>
                        </div>

                        {/* Bottom-Left Date Badge */}
                        <div className="absolute bottom-1 left-1 z-10">
                          <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-black/70 text-stone-200 text-[6.5px] sm:text-[7.5px] font-mono backdrop-blur-md border border-white/10" dir="ltr">
                            <Clock className="w-1.5 h-1.5 text-amber-300" />
                            <span>{item.date}</span>
                          </span>
                        </div>
                      </div>

                      {/* 📝 Lower Section (~56% height): Title, Summary & Themed Action */}
                      <div className="h-[56%] p-2 sm:p-2.5 flex flex-col justify-between text-right shrink-0">
                        <div>
                          {/* Title with live search keyword highlight */}
                          <h3 className="text-[10px] sm:text-[11px] md:text-xs font-black text-stone-900 group-hover:text-[#c8102e] transition-colors leading-tight line-clamp-2 mb-1">
                            <HighlightMatch text={item.title} query={searchTitleQuery} />
                          </h3>

                          {/* Summary */}
                          <p className="line-clamp-2 sm:line-clamp-3 text-[8px] sm:text-[9px] text-stone-600 font-bold leading-snug">
                            {item.summary}
                          </p>
                        </div>

                        {/* Bottom Metadata & Thematic Action Guidance Prompt */}
                        <div className="pt-1 border-t border-stone-200/70 flex items-center justify-between text-[7.5px] sm:text-[8.5px] font-bold">
                          <span className="truncate max-w-[50px] sm:max-w-[70px] text-stone-600">
                            <strong className={`font-black ${matchedSmartCat.accentText}`}>{item.source}</strong>
                          </span>

                          <span className={`text-[7.5px] sm:text-[8.5px] font-black flex items-center gap-0.5 px-1.5 py-0.5 rounded transition-all shadow-2xs cursor-pointer ${matchedSmartCat.actionBtn}`}>
                            <span>راهنما</span>
                            <ChevronDown className="w-2 h-2 sm:w-2.5 sm:h-2.5 -rotate-90" />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* 🔘 Slide Pagination Dots (Quick click to jump) */}
              {filteredNews.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 pt-1 overflow-x-auto scrollbar-hide py-1">
                  {filteredNews.slice(0, 16).map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => scrollToSlide(dotIdx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeSlideIndex === dotIdx
                          ? "w-6 bg-[#c8102e] shadow-xs"
                          : "w-2 bg-stone-300 hover:bg-stone-400"
                      }`}
                      title={`اسلاید شماره ${dotIdx + 1}`}
                    />
                  ))}
                  {filteredNews.length > 16 && (
                    <span className="text-[9px] font-mono text-stone-400 font-bold px-1">
                      +{filteredNews.length - 16}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 🔍 Article Focus & Full Guidance Modal (Triggered on Card Click) */}
          <AnimatePresence>
            {selectedArticle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-text"
                onClick={() => setSelectedArticleId(null)}
              >
                <motion.div
                  initial={{ scale: 0.94, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: 15 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-3xl max-w-xl w-full max-h-[88vh] overflow-y-auto border border-stone-200 shadow-2xl relative text-right p-5 sm:p-6 space-y-4"
                  dir="rtl"
                >
                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => setSelectedArticleId(null)}
                    className="absolute top-4 left-4 p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-all cursor-pointer shadow-xs"
                    title="بستن"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Header Image with Watermark in Modal */}
                  <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 select-none">
                    <img
                      src={getNewsCardImage(selectedArticle)}
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

                    {/* Category badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-stone-900/80 text-white border border-white/20 backdrop-blur-md">
                        {selectedArticle.category}
                      </span>
                      {selectedArticle.urgent && (
                        <span className="px-2 py-1 rounded-md text-[9.5px] font-black bg-red-600 text-white shadow-sm animate-pulse">
                          فوری
                        </span>
                      )}
                    </div>

                    {/* Official watermark */}
                    <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-950/90 backdrop-blur-md border border-white/25 text-white shadow-lg">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8102e]"></span>
                      </span>
                      <span className="text-[10px] font-black text-white">
                        واترمارک رسمی اتریش‌نشین 🇦🇹
                      </span>
                    </div>

                    {/* Date */}
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/70 text-stone-200 text-[10px] font-mono border border-white/10" dir="ltr">
                        <Clock className="w-3 h-3 text-amber-300" />
                        <span>{selectedArticle.date}</span>
                      </span>
                    </div>
                  </div>

                  {/* Headline & Meta */}
                  <div className="space-y-2">
                    <h2 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                      {selectedArticle.title}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-stone-500 font-bold">
                      <span>مرجع خبر: <strong className="text-stone-800">{selectedArticle.source}</strong></span>
                      {selectedArticle.viewsCount && (
                        <span>بازدید: <strong className="font-mono text-stone-700">{selectedArticle.viewsCount.toLocaleString("fa-IR")}</strong></span>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-2xl text-xs text-stone-700 font-bold leading-relaxed">
                    {selectedArticle.summary}
                  </div>

                  {/* 🇦🇹 Resident Practical Advice Box */}
                  <div className="bg-amber-50/90 border border-amber-300 p-4 rounded-2xl space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span>راهکار اختصاصی برای فارسی‌زبانان و مقیمان اتریش:</span>
                    </div>
                    <p className="text-xs text-amber-950 font-bold leading-relaxed">
                      {selectedArticle.residentAdvice || "این مصوبه قانونی برای سال جدید لازم‌الاجرا است. توصیه می‌شود قبل از اقدام، مدارک خود را با مراجع رسمی تطبیق دهید."}
                    </p>
                  </div>

                  {/* Tags */}
                  {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {selectedArticle.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-bold border border-stone-200">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={(e) => handleShare(selectedArticle, e)}
                      className="px-3.5 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>اشتراک و کپی خلاصه</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {selectedArticle.link && (
                        <a
                          href={selectedArticle.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                        >
                          <span>تارنمای رسمی منبع</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedArticleId(null)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c8102e] to-[#970d22] text-white text-xs font-black shadow-xs hover:shadow-md transition-all cursor-pointer"
                      >
                        بستن
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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
