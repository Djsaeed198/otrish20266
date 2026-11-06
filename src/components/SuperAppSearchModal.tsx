import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, X, ChevronLeft, Sparkles, ArrowUpRight, Compass, Coins,
  Map, Building, BookOpen, Car, Users, Home, Award, FileText,
  TrendingUp, Clock, Star, Filter, Zap, Target, Info, CheckCircle,
  History, Trash2, Flame, Hash, Globe, Heart, Shield, Calculator,
  Newspaper, Landmark, GraduationCap, Scale, Wallet, Hotel,
  MousePointerClick, ArrowDown, CornerDownLeft, Lightbulb,
  Layers, BookMarked, CircleDot, Hash as HashIcon, Command,
} from "lucide-react";
import {
  SUPER_APP_PAGES,
  SUPER_APP_CATEGORIES,
  SuperAppPageItem,
} from "../data/superAppCatalog";

// ==========================================
// TYPES
// ==========================================
interface SuperAppSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPage: (pageId: string) => void;
}

interface SearchResult {
  page: SuperAppPageItem;
  score: number;
  matchType: "title" | "keyword" | "description" | "content" | "category";
  matchedText?: string;
  highlightedTitle: string;
  highlightedDescription: string;
  matchedKeywords: string[];
}

interface RecentSearch {
  query: string;
  timestamp: number;
}

// ==========================================
// CONSTANTS
// ==========================================
const RECENT_SEARCHES_KEY = "otrish_recent_searches_v2";
const MAX_RECENT = 8;

// Trending / Suggested searches (based on user behavior patterns)
const TRENDING_SEARCHES = [
  { query: "RWR Card", icon: Award, color: "from-[#c8102e] to-[#970d22]" },
  { query: "MA35", icon: Landmark, color: "from-indigo-600 to-blue-700" },
  { query: "Familienbonus", icon: Coins, color: "from-emerald-600 to-teal-700" },
  { query: "ÖGK بیمه", icon: Shield, color: "from-sky-600 to-blue-700" },
  { query: "شماره اضطراری", icon: Flame, color: "from-rose-600 to-red-700" },
  { query: "گواهینامه", icon: Car, color: "from-violet-600 to-purple-700" },
  { query: "پزشک Kassenarzt", icon: Heart, color: "from-pink-600 to-rose-700" },
  { query: "نوستریفیکاسیون", icon: GraduationCap, color: "from-amber-500 to-orange-600" },
];

// Smart aliases — تبدیل واژه‌های عامیانه به کلیدواژه‌های رسمی
const SMART_ALIASES: Record<string, string[]> = {
  "کارت": ["rwr", "card", "اقامت", "کارت"],
  "اقامت": ["rwr", "ma35", "residence", "citizenship"],
  "ویزا": ["visa", "rwr", "ma35"],
  "حقوق": ["gehalt", "salary", "lohn", "brutto", "netto", "مالیات"],
  "مالیات": ["steuer", "tax", "lohnsteuer"],
  "بیمه": ["versicherung", "öGK", "insurance", "e-card"],
  "پزشک": ["arzt", "doctor", "kassenarzt"],
  "دارو": ["apotheke", "medikament", "pharmacy"],
  "مسکن": ["wohnung", "house", "housing", "مiet"],
  "اجاره": ["miete", "rent", "kaution"],
  "خودرو": ["auto", "car", "kfz", "license"],
  "گواهینامه": ["führerschein", "license", "driver"],
  "مالی": ["financial", "steuer", "tax"],
  "کار": ["arbeit", "job", "work", "arbeit"],
  "دانشگاه": ["university", "universität", "student"],
  "زبان": ["german", "deutsch", "language", "goethe", "ösd"],
  "مدرک": ["zeugnis", "certificate", "document"],
  "خبر": ["news", "nachrichten"],
  "ارز": ["currency", "exchange", "wechel"],
  "حساب": ["bank", "konto", "account"],
  "بورس": ["scholarship", "stipendium", "börse"],
  "شهروندی": ["citizenship", "staatsbürgerschaft", "passport"],
  "پاسپورت": ["passport", "staatsbürgerschaft"],
  "طلاق": ["divorce", "scheidung"],
  "ازدواج": ["marriage", "heirat", "ehe"],
};

// ==========================================
// HELPERS
// ==========================================
const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Normalize Persian/Arabic characters
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ة/g, "ه")
    .replace(/[ًٌٍَُِّْ]/g, "")
    .trim();
};

// Split query into individual terms
const tokenize = (query: string): string[] => {
  return normalizeText(query)
    .split(/\s+/)
    .filter((t) => t.length > 0);
};

// Smart expansion — اضافه کردن aliasها
const expandTerms = (terms: string[]): string[] => {
  const expanded = new Set<string>(terms);
  terms.forEach((term) => {
    Object.entries(SMART_ALIASES).forEach(([key, aliases]) => {
      if (key.includes(term) || term.includes(key)) {
        aliases.forEach((a) => expanded.add(normalizeText(a)));
      }
    });
  });
  return Array.from(expanded);
};

// Highlight matching terms in a text
const highlightMatches = (
  text: string,
  terms: string[],
  className = "bg-amber-200 text-stone-900 px-0.5 rounded"
): string => {
  if (!text || terms.length === 0) return text;
  let result = text;
  terms.forEach((term) => {
    if (!term) return;
    const regex = new RegExp(`(${escapeRegex(term)})`, "gi");
    result = result.replace(regex, `<mark class="${className}">$1</mark>`);
  });
  return result;
};

// Extract snippet around match
const extractSnippet = (text: string, terms: string[], maxLength = 120): string | null => {
  if (!text) return null;
  const normalized = normalizeText(text);
  for (const term of terms) {
    const idx = normalized.indexOf(term);
    if (idx !== -1) {
      const start = Math.max(0, idx - 40);
      const end = Math.min(text.length, idx + term.length + maxLength);
      return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
    }
  }
  return null;
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function SuperAppSearchModal({
  isOpen,
  onClose,
  onSelectPage,
}: SuperAppSearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOnlyBadges, setShowOnlyBadges] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // INITIAL: Load recent searches from localStorage
  // ==========================================
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
        if (stored) {
          setRecentSearches(JSON.parse(stored));
        }
      } catch (e) {
        // Ignore
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setSelectedCategory("all");
      setActiveIndex(0);
      setShowOnlyBadges(null);
    }
  }, [isOpen]);

  // ==========================================
  // SAVE recent search
  // ==========================================
  const saveRecentSearch = (q: string) => {
    if (!q.trim() || q.length < 2) return;
    const updated = [
      { query: q.trim(), timestamp: Date.now() },
      ...recentSearches.filter((r) => r.query !== q.trim()),
    ].slice(0, MAX_RECENT);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (e) {
      // Ignore
    }
  };

  const removeRecentSearch = (e: React.MouseEvent, qToRemove: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter((r) => r.query !== qToRemove);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (e) {
      // Ignore
    }
  };

  const formatRelativeTime = (timestamp: number): string => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return "لحظاتی پیش";
    if (minutes < 60) return `${minutes} دقیقه پیش`;
    if (hours < 24) return `${hours} ساعت پیش`;
    if (days === 1) return "دیروز";
    return `${days} روز پیش`;
  };

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && searchResults[activeIndex]) {
        e.preventDefault();
        const selected = searchResults[activeIndex].page;
        saveRecentSearch(query);
        onSelectPage(selected.id);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, activeIndex, query]);

  // Auto-scroll active result into view
  useEffect(() => {
    if (resultsRef.current) {
      const activeEl = resultsRef.current.querySelector(
        `[data-result-index="${activeIndex}"]`
      ) as HTMLElement;
      activeEl?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeIndex]);

  // ==========================================
  // SMART SEARCH ENGINE
  // ==========================================
  const searchResults = useMemo((): SearchResult[] => {
    const rawTerms = tokenize(query);
    const terms = expandTerms(rawTerms);

    const results: SearchResult[] = [];

    SUPER_APP_PAGES.forEach((page) => {
      // Category filter
      if (selectedCategory !== "all" && page.category !== selectedCategory) return;

      // Badge filter (visual chips)
      if (showOnlyBadges && page.badge !== showOnlyBadges) return;

      // If no query, include all in category (with 0 score)
      if (terms.length === 0) {
        results.push({
          page,
          score: 0,
          matchType: "title",
          highlightedTitle: page.title,
          highlightedDescription: page.description,
          matchedKeywords: [],
        });
        return;
      }

      // === Scoring system ===
      let score = 0;
      let matchType: SearchResult["matchType"] = "title";
      let matchedText: string | undefined;
      const matchedKeywords: string[] = [];

      const normalizedTitle = normalizeText(page.title);
      const normalizedDesc = normalizeText(page.description);
      const normalizedKeywords = page.keywords.map(normalizeText);

      // Synthetic full-text (title + desc + keywords + category)
      const fullText = [page.title, page.description, ...page.keywords, page.category]
        .filter(Boolean)
        .join(" · ");
      const normalizedFull = normalizeText(fullText);

      // Title match — highest score
      const titleMatches = terms.filter((t) => normalizedTitle.includes(t));
      if (titleMatches.length > 0) {
        score += 100 + titleMatches.length * 20;
        if (matchType !== "title") matchType = "title";
      }

      // Keyword match — high score
      const keywordMatches = terms.filter((t) =>
        normalizedKeywords.some((k) => k.includes(t))
      );
      if (keywordMatches.length > 0) {
        score += 60 + keywordMatches.length * 15;
        if (matchType === "title" && titleMatches.length === 0) matchType = "keyword";
        keywordMatches.forEach((t) => {
          const originalKw = page.keywords.find((k) =>
            normalizeText(k).includes(t)
          );
          if (originalKw && !matchedKeywords.includes(originalKw)) {
            matchedKeywords.push(originalKw);
          }
        });
      }

      // Description match — medium score
      const descMatches = terms.filter((t) => normalizedDesc.includes(t));
      if (descMatches.length > 0) {
        score += 30 + descMatches.length * 8;
        if (matchType === "title" && titleMatches.length === 0 && keywordMatches.length === 0) {
          matchType = "description";
        }
      }

      // Full-text match (extended content) — lower but valid
      const fullMatches = terms.filter((t) => normalizedFull.includes(t));
      if (fullMatches.length > 0 && score === 0) {
        score += 15 + fullMatches.length * 5;
        matchType = "content";
        matchedText = extractSnippet(fullText, terms) || undefined;
      }

      // Category match bonus
      if (normalizeText(page.category).includes(normalizeText(query))) {
        score += 25;
      }

      // Badge bonus (shows popular pages higher)
      if (page.badge === "پربازدید" || page.badge === "ضروری") {
        score += 10;
      }

      // Only include if matched
      if (score > 0) {
        results.push({
          page,
          score,
          matchType,
          matchedText,
          highlightedTitle: highlightMatches(page.title, terms, "bg-amber-200 text-stone-900 px-0.5 rounded"),
          highlightedDescription: highlightMatches(page.description, terms, "bg-amber-100 text-stone-900 px-0.5 rounded"),
          matchedKeywords,
        });
      }
    });

    // Sort by score descending
    return results.sort((a, b) => b.score - a.score);
  }, [query, selectedCategory, showOnlyBadges]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query, selectedCategory, showOnlyBadges]);

  // Matching recent searches when typing
  const matchingRecentSearches = useMemo(() => {
    if (!query.trim()) return [];
    const norm = normalizeText(query);
    return recentSearches.filter((r) => normalizeText(r.query).includes(norm));
  }, [query, recentSearches]);

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleSelectPage = (pageId: string) => {
    saveRecentSearch(query);
    onSelectPage(pageId);
    onClose();
  };

  const handleSelectSuggestion = (suggestionQuery: string) => {
    setQuery(suggestionQuery);
    inputRef.current?.focus();
  };

  // ==========================================
  // BADGE FILTER CHIPS
  // ==========================================
  const BADGE_FILTERS = [
    { id: null, label: "همه", icon: Layers },
    { id: "پربازدید", label: "پربازدید", icon: Flame },
    { id: "ضروری", label: "ضروری", icon: CheckCircle },
    { id: "هوشمند", label: "هوشمند", icon: Sparkles },
  ];

  if (!isOpen) return null;

  const hasQuery = query.trim().length > 0;
  const hasResults = searchResults.length > 0;
  const showSuggestions = !hasQuery;

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-stone-950/80 backdrop-blur-md"
          dir="rtl"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative"
          >
            {/* Austrian flag accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c8102e] via-white to-[#c8102e]" />

            {/* ========================================== */}
            {/* SEARCH INPUT BAR */}
            {/* ========================================== */}
            <div className="p-4 pt-5 border-b border-stone-200 flex items-center gap-3 bg-gradient-to-br from-stone-50/80 to-white">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white flex items-center justify-center shrink-0 shadow-md">
                <Search className="w-5 h-5" />
              </div>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="هر متنی بنویسید — موضوع، کلمه کلیدی یا حتی جمله..."
                  className="w-full bg-transparent border-0 outline-none text-stone-900 placeholder:text-stone-400 font-bold text-sm sm:text-base"
                />
                {hasQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setQuery("")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                <kbd className="px-2 py-1 bg-white border border-stone-300 rounded-lg text-[10px] font-mono font-bold text-stone-500 shadow-sm">
                  <CornerDownLeft className="w-3 h-3 inline" />
                </kbd>
                <span className="text-[10px] text-stone-400 font-bold">برای ورود</span>
              </div>

              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-black text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors shrink-0"
              >
                Esc
              </button>
            </div>

            {/* ========================================== */}
            {/* FILTER BAR: Categories + Badges */}
            {/* ========================================== */}
            <div className="px-4 py-3 border-b border-stone-100 bg-white space-y-2">
              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[10px] font-black text-stone-400 shrink-0 flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  دسته:
                </span>
                {SUPER_APP_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-[11px] font-black transition-all shrink-0 ${
                        isSelected
                          ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {cat.shortTitle}
                    </button>
                  );
                })}
              </div>

              {/* Badge filters */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-stone-400 shrink-0 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  فیلتر:
                </span>
                {BADGE_FILTERS.map((badge) => {
                  const Icon = badge.icon;
                  const isSelected = showOnlyBadges === badge.id;
                  return (
                    <button
                      key={String(badge.id)}
                      onClick={() => setShowOnlyBadges(badge.id)}
                      className={`inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-black transition-all shrink-0 ${
                        isSelected
                          ? "bg-stone-900 text-white shadow-sm"
                          : "bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {badge.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================== */}
            {/* CONTENT AREA */}
            {/* ========================================== */}
            <div ref={resultsRef} className="flex-1 overflow-y-auto p-4 space-y-2.5">

              {/* ============ SUGGESTIONS MODE (no query) ============ */}
              {showSuggestions && (
                <>
                  {/* Recent searches */}
                  {recentSearches.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2.5 pb-2"
                    >
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[11px] font-black text-stone-600 flex items-center gap-1.5">
                          <History className="w-3.5 h-3.5 text-[#c8102e]" />
                          جستجوهای اخیر شما
                          <span className="text-[9.5px] px-1.5 py-0.5 rounded-full bg-stone-150 text-stone-500 font-bold">
                            {recentSearches.length}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={clearRecentSearches}
                          className="text-[10.5px] font-black text-stone-400 hover:text-[#c8102e] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          پاک کردن همه
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((r, idx) => (
                          <motion.div
                            key={`${r.query}-${idx}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.02 }}
                            className="group inline-flex items-center gap-1.5 pl-1.5 pr-2.5 py-1.5 bg-stone-100 hover:bg-rose-50/80 border border-stone-200/90 hover:border-rose-200 rounded-xl transition-all shadow-xs"
                          >
                            <button
                              type="button"
                              onClick={() => handleSelectSuggestion(r.query)}
                              className="inline-flex items-center gap-1.5 text-stone-800 hover:text-[#c8102e] text-xs font-black cursor-pointer"
                            >
                              <Clock className="w-3 h-3 text-stone-400 group-hover:text-rose-600 shrink-0" />
                              <span>{r.query}</span>
                              <span className="text-[9px] text-stone-400 font-normal mr-1">
                                ({formatRelativeTime(r.timestamp)})
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => removeRecentSearch(e, r.query)}
                              className="p-1 rounded-full text-stone-300 hover:text-rose-600 hover:bg-rose-100/70 transition-colors cursor-pointer"
                              title="حذف از تاریخچه"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Trending searches */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="space-y-2 pt-2"
                  >
                    <div className="flex items-center gap-1.5 px-1">
                      <Flame className="w-3.5 h-3.5 text-[#c8102e] animate-pulse" />
                      <span className="text-[11px] font-black text-stone-500">
                        پرجستجوترین‌های امروز
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {TRENDING_SEARCHES.map((t, idx) => {
                        const Icon = t.icon;
                        return (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + idx * 0.03 }}
                            whileHover={{ y: -3, scale: 1.02 }}
                            onClick={() => handleSelectSuggestion(t.query)}
                            className="group relative overflow-hidden bg-white border border-stone-200 hover:border-stone-300 rounded-2xl p-3 flex items-center gap-2 transition-all shadow-sm hover:shadow-md text-right"
                          >
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-black text-stone-800 truncate">
                                {t.query}
                              </div>
                              <div className="text-[9px] text-stone-400 font-bold">
                                کلیک برای جستجو
                              </div>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#c8102e] group-hover:translate-x-0.5 transition-all shrink-0" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3 p-3 bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 rounded-2xl flex items-start gap-2.5"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-amber-900 font-bold leading-relaxed">
                      <strong className="text-[#c8102e]">هوشمند جستجو کنید:</strong> می‌توانید
                      یک کلمه («MA35»)، یک موضوع («کارت اقامت»)، یا حتی یک جمله
                      کامل («چگونه مالیات اتریش را کم کنم؟») را وارد کنید. سیستم به‌طور
                      خودکار مترادف‌ها را نیز بررسی می‌کند.
                    </div>
                  </motion.div>
                </>
              )}

              {/* ============ NO RESULTS ============ */}
              {hasQuery && !hasResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-stone-100 to-rose-100 flex items-center justify-center text-stone-400 border-2 border-stone-200">
                    <Search className="w-9 h-9" />
                  </div>
                  <div>
                    <p className="font-black text-stone-800 text-base mb-1">
                      موردی برای «{query}» یافت نشد
                    </p>
                    <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed font-bold">
                      می‌توانید واژه‌های دیگر مانند «حقوق»، «کارت قرمز»،
                      «پزشک»، «ارز» یا «گواهینامه» را امتحان کنید.
                    </p>
                  </div>
                  <div className="pt-3 flex flex-wrap gap-1.5 justify-center max-w-lg mx-auto">
                    {TRENDING_SEARCHES.slice(0, 6).map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectSuggestion(t.query)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-[#c8102e] border border-stone-200 hover:border-rose-200 rounded-xl text-[11px] font-black transition-all"
                      >
                        {t.query}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ============ RESULTS LIST ============ */}
              {hasResults && (
                <>
                  {/* Results count + status */}
                  <div className="flex items-center justify-between px-1 pb-1">
                    <span className="text-[11px] font-black text-stone-500 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-[#c8102e]" />
                      {hasQuery
                        ? `${searchResults.length} نتیجه برای «${query}»`
                        : `${searchResults.length} خدمت در دسترس`}
                    </span>
                    {hasQuery && searchResults.length > 0 && (
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <Zap className="w-2.5 h-2.5 inline" /> مرتب‌سازی هوشمند
                      </span>
                    )}
                  </div>

                  {/* Matching recent searches banner */}
                  {hasQuery && matchingRecentSearches.length > 0 && (
                    <div className="flex items-center gap-2 p-2.5 bg-rose-50/60 border border-rose-200/80 rounded-2xl mb-1 text-xs">
                      <History className="w-3.5 h-3.5 text-[#c8102e] shrink-0" />
                      <span className="text-[10.5px] font-black text-stone-600 shrink-0">مطابق با جستجوهای قبلی شما:</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {matchingRecentSearches.map((m, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectSuggestion(m.query)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-rose-200 text-stone-800 text-[11px] font-black hover:bg-rose-100 hover:text-[#c8102e] transition-colors cursor-pointer shadow-2xs"
                          >
                            <Clock className="w-3 h-3 text-stone-400" />
                            <span>{m.query}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.map((result, idx) => {
                    const IconComp = result.page.icon;
                    const isActive = idx === activeIndex;

                    return (
                      <motion.div
                        key={result.page.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(idx * 0.02, 0.2) }}
                        data-result-index={idx}
                        onClick={() => handleSelectPage(result.page.id)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`group p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isActive
                            ? "border-[#c8102e]/60 bg-gradient-to-br from-rose-50/50 to-white shadow-md"
                            : "border-stone-200/80 hover:border-[#c8102e]/40 hover:bg-rose-50/20 bg-white"
                        }`}
                      >
                        <div className="flex items-start gap-3.5 min-w-0 flex-1">
                          {/* Icon */}
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                              : "bg-stone-100 text-stone-700 group-hover:bg-rose-100 group-hover:text-[#c8102e]"
                          }`}>
                            <IconComp className="w-5 h-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            {/* Title + badges */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4
                                className={`font-black text-sm transition-colors truncate ${
                                  isActive ? "text-[#c8102e]" : "text-stone-900 group-hover:text-[#c8102e]"
                                }`}
                                dangerouslySetInnerHTML={{ __html: result.highlightedTitle }}
                              />
                              {result.page.badge && (
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md shrink-0 ${
                                  result.page.badge === "پربازدید"
                                    ? "bg-amber-100 text-amber-800"
                                    : result.page.badge === "هوشمند"
                                    ? "bg-purple-100 text-purple-800"
                                    : result.page.badge === "ضروری"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}>
                                  {result.page.badge}
                                </span>
                              )}
                              {/* Match type indicator */}
                              {hasQuery && (
                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                                  result.matchType === "title"
                                    ? "bg-rose-50 text-[#c8102e] border-rose-200"
                                    : result.matchType === "keyword"
                                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                    : result.matchType === "description"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : "bg-stone-50 text-stone-600 border-stone-200"
                                }`}>
                                  {result.matchType === "title" ? "عنوان" :
                                    result.matchType === "keyword" ? "کلیدواژه" :
                                    result.matchType === "description" ? "توضیحات" : "محتوا"}
                                </span>
                              )}
                            </div>

                            {/* Description with highlight */}
                            <p
                              className="text-xs text-stone-500 line-clamp-1 mt-1 font-bold"
                              dangerouslySetInnerHTML={{
                                __html: result.highlightedDescription,
                              }}
                            />

                            {/* Snippet from content (if match is in content) */}
                            {result.matchedText && result.matchType === "content" && (
                              <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg text-[10px] text-amber-900 font-bold leading-relaxed flex items-start gap-1.5">
                                <Info className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                                <span className="line-clamp-2">{result.matchedText}</span>
                              </div>
                            )}

                            {/* Matched keywords */}
                            {result.matchedKeywords.length > 0 && (
                              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                                <HashIcon className="w-3 h-3 text-stone-400" />
                                {result.matchedKeywords.slice(0, 4).map((kw, i) => (
                                  <span
                                    key={i}
                                    className="text-[9px] font-black text-stone-600 bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded"
                                  >
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center gap-2 shrink-0 mt-1">
                          <span className="text-[11px] text-stone-400 group-hover:text-[#c8102e] font-bold hidden sm:inline">
                            ورود
                          </span>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            isActive
                              ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white"
                              : "bg-stone-100 group-hover:bg-[#c8102e] group-hover:text-white text-stone-400"
                          }`}>
                            <ChevronLeft className="w-4 h-4" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </>
              )}
            </div>

            {/* ========================================== */}
            {/* FOOTER: Stats + Keyboard Hints */}
            {/* ========================================== */}
            <div className="p-3 px-5 border-t border-stone-200 bg-gradient-to-br from-stone-50 to-white text-[11px] text-stone-500 font-bold flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <Target className="w-3 h-3 text-[#c8102e]" />
                  {hasQuery
                    ? `${searchResults.length} نتیجه از ${SUPER_APP_PAGES.length} خدمت`
                    : `${SUPER_APP_PAGES.length} خدمت در دسترس`}
                </span>
                <span className="text-stone-300">|</span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded text-[9px] font-mono">↑↓</kbd>
                  ناوبری
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded text-[9px] font-mono">
                    <CornerDownLeft className="w-2.5 h-2.5" />
                  </kbd>
                  انتخاب
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded text-[9px] font-mono">Esc</kbd>
                  بستن
                </span>
              </div>
              <span className="font-mono text-stone-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-500" />
                سوپراپلیکیشن اتریش‌نشین 🇦🇹
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}