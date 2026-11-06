import React, { useState } from "react";
import { 
  Home, 
  ChevronLeft, 
  Copy, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  Check, 
  Share2,
  Compass,
  ArrowRight
} from "lucide-react";
import { getPageItem, getCategory, getPagesByCategory } from "../data/superAppCatalog";
import { getSeoForSegment } from "../data/seoCatalog";
import { SEGMENT_TO_PATH_MAP } from "../App";
import { toast } from "../utils/toast";

interface DynamicBreadcrumbProps {
  activeSegment: string;
  onSelectSegment: (segment: string) => void;
  className?: string;
}

export default function DynamicBreadcrumb({
  activeSegment,
  onSelectSegment,
  className = ""
}: DynamicBreadcrumbProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState<boolean>(false);

  const isHome = activeSegment === "home";
  const pageItem = getPageItem(activeSegment);
  const seoData = getSeoForSegment(activeSegment);
  const category = pageItem ? getCategory(pageItem.category) : undefined;
  const companionPages = category ? getPagesByCategory(category.id).filter(p => p.id !== activeSegment) : [];

  const canonicalPath = SEGMENT_TO_PATH_MAP[activeSegment] || (isHome ? "/" : `/${activeSegment}`);
  const cleanUrl = typeof window !== "undefined" 
    ? `${window.location.origin}${canonicalPath === "/" ? "" : canonicalPath}`
    : `https://otrish-iran.ir${canonicalPath === "/" ? "" : canonicalPath}`;

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(cleanUrl);
      setCopied(true);
      toast.success(`لینک اختصاصی صفحه کپی شد: ${canonicalPath}`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: seoData.title,
        text: seoData.description,
        url: cleanUrl
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <nav
      aria-label="مسیر راهنما و ناوبری صفحات (Breadcrumb)"
      className={`bg-white/95 backdrop-blur-sm border border-stone-200 rounded-2xl px-3.5 sm:px-5 py-2.5 shadow-xs transition-all ${className}`}
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        
        {/* Schema.org BreadcrumbList Microdata */}
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          className="flex items-center flex-wrap gap-1.5 text-xs text-stone-600 font-medium"
        >
          {/* Item 1: Home */}
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="flex items-center gap-1.5"
          >
            <a
              href="/"
              itemProp="item"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectSegment("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-1.5 text-stone-800 hover:text-[#c8102e] font-black transition-all px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-red-50 border border-stone-200/80 hover:border-red-300 group shadow-2xs"
            >
              <div className="w-5 h-5 rounded-md bg-white text-stone-700 group-hover:text-[#c8102e] flex items-center justify-center transition-colors shadow-2xs">
                <Home className="w-3.5 h-3.5" />
              </div>
              <span itemProp="name">صفحه اصلی</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>

          {/* Separator */}
          <li className="text-stone-300 select-none">
            <ChevronLeft className="w-3.5 h-3.5" />
          </li>

          {/* Conditional Item 2: Category or Main Portal */}
          {isHome ? (
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1 text-[#c8102e] font-black px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 shadow-2xs"
            >
              <span itemProp="name" className="flex items-center gap-1">
                <span>پیشخوان سوپراپ اتریش‌نشین</span>
                <span className="text-[10px] font-normal text-red-600/80 font-mono">(وین 🇦🇹)</span>
              </span>
              <meta itemProp="position" content="2" />
            </li>
          ) : (
            <>
              {category && (
                <>
                  <li
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                    className="relative flex items-center gap-1"
                  >
                    <button
                      type="button"
                      onClick={() => setIsCategoryMenuOpen(prev => !prev)}
                      className="inline-flex items-center gap-1.5 text-amber-950 hover:text-amber-900 font-black transition-all px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 shadow-2xs"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-600" />
                      <span itemProp="name">{category.title}</span>
                    </button>
                    <meta itemProp="position" content="2" />

                    {/* Companion pages dropdown quick-jump */}
                    {isCategoryMenuOpen && companionPages.length > 0 && (
                      <div className="absolute top-full right-0 mt-1.5 w-64 bg-white border border-stone-200 rounded-xl shadow-xl p-2 z-50 text-right space-y-1 animate-fadeIn">
                        <div className="text-[10px] font-black text-stone-400 px-2 py-1 border-b border-stone-100">
                          سایر ابزارهای «{category.title}»:
                        </div>
                        <div className="max-h-56 overflow-y-auto space-y-0.5">
                          {companionPages.map(comp => (
                            <button
                              key={comp.id}
                              type="button"
                              onClick={() => {
                                onSelectSegment(comp.id);
                                setIsCategoryMenuOpen(false);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="w-full text-right px-2.5 py-1.5 text-xs text-stone-700 hover:text-[#c8102e] hover:bg-red-50/60 rounded-lg font-bold flex items-center justify-between transition-colors"
                            >
                              <span className="truncate">{comp.shortTitle || comp.title}</span>
                              <ChevronLeft className="w-3 h-3 text-stone-400 shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>

                  <li className="text-stone-300 select-none">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </li>
                </>
              )}

              {/* Item 3: Active Subpage */}
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center gap-1.5 text-[#c8102e] font-black"
              >
                <a
                  href={canonicalPath}
                  itemProp="item"
                  onClick={(e) => e.preventDefault()}
                  className="hover:underline flex items-center gap-1"
                >
                  <span itemProp="name" className="truncate max-w-[200px] sm:max-w-[320px]">
                    {seoData.breadcrumbName || pageItem?.shortTitle || pageItem?.title || activeSegment}
                  </span>
                </a>
                <meta itemProp="position" content={category ? "3" : "2"} />
              </li>
            </>
          )}
        </ol>

        {/* Right side: Canonical URL Badge & Quick Actions */}
        <div className="flex items-center gap-2 text-xs shrink-0 self-end sm:self-auto">
          {/* Canonical path badge */}
          <div 
            className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-600 font-mono text-[10px] dir-ltr text-left"
            title="آدرس استاندارد و یکتای این صفحه برای موتورهای جستجو"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>{canonicalPath}</span>
          </div>

          {/* Copy link button */}
          <button
            type="button"
            onClick={handleCopyLink}
            title="کپی آدرس مستقیم و سئو شده این صفحه"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-[11px] font-black transition-all shadow-sm hover:shadow-md active:scale-95 ${
              copied
                ? "bg-emerald-700 border border-emerald-600 ring-2 ring-emerald-300"
                : "bg-emerald-600 hover:bg-emerald-700 border border-emerald-500"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>کپی شد!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-emerald-100" />
                <span>کپی لینک</span>
              </>
            )}
          </button>

          {/* Share button */}
          <button
            type="button"
            onClick={handleShare}
            title="اشتراک‌گذاری این صفحه"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 text-[11px] font-black transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-100" />
            <span>اشتراک‌گذاری</span>
          </button>

          {/* If on a subpage, quick Back to Home button */}
          {!isHome && (
            <button
              type="button"
              onClick={() => {
                onSelectSegment("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#c8102e] to-[#990011] hover:from-red-700 hover:to-red-900 text-white border border-red-500/50 text-[11px] font-black transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <span>بازگشت به خانه</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
