import React, { useState } from "react";
import { 
  ChevronLeft, 
  Home, 
  Share2, 
  Copy, 
  Printer, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Compass,
  Coins,
  Map,
  Building,
  BookOpen,
  Car,
  Users,
  HelpCircle,
  ChevronDown,
  ShieldCheck
} from "lucide-react";
import { getPageItem, getCategory, getRelatedPages, getPagesByCategory, SuperAppPageItem } from "../data/superAppCatalog";
import { getSeoForSegment } from "../data/seoCatalog";
import { CONTENT_PILLARS } from "../data/contentClustersData";
import { toast } from "../utils/toast";

interface SuperAppPageLayoutProps {
  pageId: string;
  onNavigate: (segment: string) => void;
  children: React.ReactNode;
}

export default function SuperAppPageLayout({
  pageId,
  onNavigate,
  children
}: SuperAppPageLayoutProps) {
  const page = getPageItem(pageId);
  const category = page ? getCategory(page.category) : undefined;
  const relatedPages = getRelatedPages(pageId, 4);
  const companionPages = category ? getPagesByCategory(category.id).filter(p => p.id !== pageId) : [];
  const seoItem = getSeoForSegment(pageId);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const parentPillar = CONTENT_PILLARS.find(pil =>
    pil.clusterLinks.some(l => l.path.includes(pageId) || `/${pageId}` === l.path) ||
    pil.pillarPath.includes(pageId)
  );

  const getPageCleanUrl = (id: string) => {
    if (typeof window === "undefined") return "";
    const cleanPath =
      id === "rwr-calculator" ? "/rwr-card" :
      id === "finance" ? "/brutto-netto-rechner" :
      id === "ma35" || id === "appointment" ? "/ma35" :
      id === "tax-return" ? "/finanzonline" :
      id === "tax-reg" ? "/steuernummer" :
      id === "housesearch" ? "/wohnen" :
      id === "citizenship" ? "/citizenship" :
      id === "id-austria" || id === "id-austria-guide" ? "/id-austria" :
      id === "mapper" ? "/mapper" :
      id === "german" ? "/german" :
      id === "carpool" ? "/carpool" :
      id === "klimaticket" ? "/klimaticket" :
      id === "betriebskosten" ? "/betriebskosten" :
      id === "familienbonus" ? "/familienbonus" :
      id === "freelance-tax" ? "/freelance-tax" :
      id === "traffic-fine-appeal" ? "/traffic-fine-appeal" :
      id === "residency-conditions" ? "/residency-conditions" :
      id === "nostrification" ? "/nostrification" :
      id === "kassenarzt-directory" ? "/kassenarzt-directory" :
      id === "emergency-dentistry" ? "/emergency-dentistry" :
      id === "student-grad-guide" ? "/student-grad-guide" :
      id === "forms" ? "/forms" :
      id === "about" ? "/about" :
      `/${id}`;
    return `${window.location.origin}${cleanPath}`;
  };

  const handleShare = () => {
    const url = getPageCleanUrl(pageId);
    if (navigator.share) {
      navigator.share({
        title: page?.title || "اتریش‌نشین",
        text: page?.description || "سوپراپلیکیشن فارسی‌زبانان اتریش",
        url: url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      toast.success("لینک اختصاصی این صفحه با موفقیت کپی شد!");
    }
  };

  const handleCopyLink = () => {
    const url = getPageCleanUrl(pageId);
    navigator.clipboard.writeText(url);
    toast.success("لینک اختصاصی و مستقیم صفحه کپی شد!");
  };

  const handlePrint = () => {
    window.print();
  };

  const IconComp = page?.icon || Sparkles;

  return (
    <div className="space-y-8 animate-fadeIn" dir="rtl">
      
      {/* 1. Subpage Identity Banner (Exact Austrian Super App Styling) */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-red-650/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Control Bar: Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          
          {/* Breadcrumb Path */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-bold flex-wrap">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-1 text-stone-600 hover:text-red-650 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>خانه سوپراپ</span>
            </button>
            <span>/</span>
            {category && (
              <>
                <span className="text-stone-600">
                  {category.title}
                </span>
                <span>/</span>
              </>
            )}
            <span className="text-red-650 font-black">
              {page?.shortTitle || page?.title || pageId}
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            <button
              onClick={handleCopyLink}
              title="کپی لینک مستقیم این صفحه"
              className="p-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md border border-emerald-500 active:scale-95"
            >
              <Copy className="w-3.5 h-3.5 text-emerald-100" />
              <span>کپی لینک</span>
            </button>

            <button
              onClick={handleShare}
              title="اشتراک‌گذاری این صفحه"
              className="p-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md border border-blue-500 active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-100" />
              <span>اشتراک‌گذاری</span>
            </button>

            <button
              onClick={() => onNavigate("home")}
              className="p-2 px-4 rounded-xl bg-gradient-to-r from-[#c8102e] to-[#990011] hover:from-red-700 hover:to-red-900 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md border border-red-500/50 active:scale-95"
            >
              <span>بازگشت به خانه</span>
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Middle: Tool Title, Badges & Description */}
        <div className="pt-5 flex flex-col md:flex-row items-start gap-4 sm:gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-red-50 to-rose-100 border border-red-200 text-red-650 flex items-center justify-center shrink-0 shadow-xs">
            <IconComp className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                {page?.title || pageId}
              </h1>

              {category && (
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
                  {category.title} 🇦🇹
                </span>
              )}

              {page?.badge && (
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                  page.badge === "پربازدید" ? "bg-amber-100 text-amber-800" :
                  page.badge === "هوشمند" ? "bg-purple-100 text-purple-800" :
                  page.badge === "ضروری" ? "bg-red-100 text-red-700" :
                  "bg-emerald-100 text-emerald-800"
                }`}>
                  {page.badge}
                </span>
              )}

              <span className="text-[10px] font-mono text-stone-400 font-bold">
                بروزرسانی رسمی ۲۰۲۶
              </span>
            </div>

            {page?.description && (
              <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed max-w-3xl">
                {page.description}
              </p>
            )}
          </div>
        </div>

        {/* Bottom: Companion Category Quick Switcher Pills */}
        {companionPages.length > 0 && (
          <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-black text-stone-500">
              <span>سایر ابزارهای مرتبط در دسته‌بندی «{category?.title}»:</span>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {companionPages.slice(0, 7).map(item => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-50/80 hover:bg-rose-100/90 border border-rose-200 hover:border-rose-300 text-rose-950 hover:text-[#c8102e] text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all shadow-2xs"
                  >
                    <ItemIcon className="w-3.5 h-3.5 text-rose-600" />
                    <span>{item.shortTitle || item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. Main Page Content Canvas */}
      <div className="w-full">
        {children}
      </div>

      {/* 3. Related Super App Services Recommendation Grid */}
      {relatedPages.length > 0 && (
        <section className="bg-stone-50 border border-stone-200 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-5 bg-red-650 rounded-full inline-block"></span>
              <h3 className="text-sm sm:text-base font-black text-stone-900">
                پیشنهادهای مرتبط سوپراپ اتریش‌نشین
              </h3>
            </div>
            <button
              onClick={() => onNavigate("home")}
              className="text-xs font-bold text-red-650 hover:underline flex items-center gap-1"
            >
              <span>مشاهده همه خدمات</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {relatedPages.map(item => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="bg-white border border-stone-200 hover:border-red-300 rounded-2xl p-3.5 flex flex-col justify-between gap-3 cursor-pointer transition-all hover:shadow-sm group text-right"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-stone-50 group-hover:bg-red-50 text-stone-700 group-hover:text-red-650 flex items-center justify-center shrink-0 transition-colors border border-stone-100">
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black text-stone-900 group-hover:text-red-650 transition-colors truncate">
                        {item.shortTitle || item.title}
                      </h4>
                      <p className="text-[10px] text-stone-400 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] font-bold text-stone-400 group-hover:text-red-650">
                    <span>اجرای ابزار</span>
                    <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. On-Page FAQs for User Intent & Zero-Click Answers */}
      {seoItem.faqs && seoItem.faqs.length > 0 && (
        <section className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <HelpCircle className="w-5 h-5 text-red-650" />
            <h3 className="text-sm sm:text-base font-black text-stone-900">
              پرسش‌های متداول و نکات کلیدی {seoItem.breadcrumbName}
            </h3>
          </div>
          <div className="space-y-2.5">
            {seoItem.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-stone-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-right flex items-center justify-between gap-3 bg-stone-50/70 hover:bg-stone-100/70 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-black text-stone-800 leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${
                      openFaqIndex === idx ? "rotate-180 text-red-650" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 pt-3 bg-white text-xs sm:text-sm text-stone-600 font-medium leading-relaxed border-t border-stone-100 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. E-E-A-T Official Austrian Authorities & Legal Citations */}
      <section className="bg-gradient-to-br from-stone-50 to-stone-100/70 border border-stone-200 rounded-3xl p-5 sm:p-6 text-xs text-stone-600 space-y-3">
        <div className="flex items-center gap-2 text-stone-800 font-black text-xs sm:text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>مرجعیت اطلاعاتی و استناد به منابع رسمی اتریش (E-E-A-T)</span>
        </div>
        <p className="leading-relaxed text-[11px] sm:text-xs text-stone-500">
          محتوای این بخش بر اساس جدیدترین آیین‌نامه‌ها، قوانین حقوقی جمهوری اتریش (RIS)، دستورالعمل‌های وزارت دارایی فدرال (BMF)، صندوق بیمه سلامت (ÖGK) و اداره اقامت شهرداری وین (MA 35) در سال ۲۰۲۶ تنظیم و اعتبارسنجی شده است.
        </p>

        {/* Author / Reviewer Transparency & Topic Pillar Link */}
        {parentPillar && (
          <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between flex-wrap gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-stone-700 font-bold flex-wrap">
              <span className="text-stone-400 font-normal">نویسنده و بازبین علمی:</span>
              <span className="text-stone-900 font-black">{parentPillar.authorReviewer.name}</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px] font-black">
                اعتبارسنجی ۲۰۲۶
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate(parentPillar.pillarPath.replace("/", ""))}
              className="text-[#c8102e] hover:underline font-black text-[11px] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>مشاهده خوشه مادر ({parentPillar.titleFa.replace("خوشه موضوعی: ", "")})</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {seoItem.officialSources && seoItem.officialSources.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[10px] font-bold text-stone-400">پیوندهای برون‌مرزی استنادی:</span>
            {seoItem.officialSources.map((source, sIdx) => (
              <a
                key={sIdx}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-red-650 hover:border-red-200 text-[10px] font-bold transition-all"
              >
                <span>{source.title}</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
