import React, { useState } from "react";
import {
  Globe2,
  MapPin,
  Building2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Languages,
  ArrowRight,
  Sparkles,
  Search,
  Share2,
  Copy,
  Check,
  FileCode,
  Layers,
  PhoneCall,
  Clock,
  Star,
  Award,
  Link2,
  Users
} from "lucide-react";
import {
  DUAL_MARKET_PROFILES,
  VIENNA_LOCAL_BUSINESS_NAP,
  DUAL_KEYWORD_RESEARCH,
  AUSTRIAN_AUTHORITY_SOURCES,
  DIASPORA_COMMUNITY_DIRECTORIES,
  LOCALIZED_AUSTRIAN_PAGES,
  getHreflangLinks,
  getLocalBusinessSchema
} from "../data/internationalSeoData";

interface InternationalSeoSectionProps {
  onNavigate: (segment: string) => void;
  currentSegment?: string;
  isDeLocale?: boolean;
  onToggleDeLocale?: (enabled: boolean) => void;
  className?: string;
}

export default function InternationalSeoSection({
  onNavigate,
  currentSegment = "home",
  isDeLocale = false,
  onToggleDeLocale,
  className = ""
}: InternationalSeoSectionProps) {
  const [activeTab, setActiveTab] = useState<"hreflang" | "keywords" | "nap" | "authorities" | "diaspora">("hreflang");
  const [selectedMarket, setSelectedMarket] = useState<"all" | "Iran (fa-IR)" | "Austria (de-AT)" | "Diaspora (Hybrid)">("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const hreflangLinks = getHreflangLinks(isDeLocale ? `/de/${currentSegment === "home" ? "" : currentSegment}` : `/${currentSegment === "home" ? "" : currentSegment}`);
  const localBusinessJson = JSON.stringify(getLocalBusinessSchema(), null, 2);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const filteredKeywords = selectedMarket === "all"
    ? DUAL_KEYWORD_RESEARCH
    : DUAL_KEYWORD_RESEARCH.filter(k => k.targetMarket === selectedMarket);

  return (
    <section className={`space-y-6 font-sans select-none ${className}`} dir="rtl">
      {/* ======================================================== */}
      {/* MAIN CONTAINER */}
      {/* ======================================================== */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 relative overflow-hidden">
        {/* Austrian-Iranian gradient accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c8102e] via-amber-400 to-[#009640]" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2.5 h-6 bg-gradient-to-b from-[#c8102e] to-[#009640] rounded-full inline-block" />
              <h2 className="text-lg sm:text-xl font-black text-stone-900">
                سئوی بین‌المللی دوگانه (ایران 🇮🇷 و اتریش 🇦🇹)
              </h2>
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                استاندارد Google International SEO
              </span>
            </div>
            <p className="text-xs text-stone-600 font-medium mt-1 leading-relaxed max-w-3xl">
              معماری اختصاصی زیرپوشه (<code className="font-mono bg-stone-100 text-[#c8102e] px-1 py-0.5 rounded">/de/</code>)، پیاده‌سازی تگ‌های hreflang، تطبیق با الگوی جستجوی دیاسپورا، اسکیما LocalBusiness وین و پیوند با مراجع رسمی اتریش.
            </p>
          </div>

          {/* Quick Dual Market Toggle Switcher */}
          <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-2xl border border-stone-200 self-start md:self-auto shrink-0">
            <button
              onClick={() => onToggleDeLocale && onToggleDeLocale(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                !isDeLocale
                  ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <span>🇮🇷</span>
              <span>فارسی (fa-IR)</span>
            </button>
            <button
              onClick={() => onToggleDeLocale && onToggleDeLocale(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                isDeLocale
                  ? "bg-[#c8102e] text-white shadow-xs"
                  : "text-stone-500 hover:text-[#c8102e]"
              }`}
            >
              <span>🇦🇹</span>
              <span>Deutsch (/de/)</span>
            </button>
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-stone-100">
          <button
            onClick={() => setActiveTab("hreflang")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
              activeTab === "hreflang"
                ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>۲۷ و ۲۸. ساختار hreflang و زیرپوشه /de/</span>
          </button>

          <button
            onClick={() => setActiveTab("keywords")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
              activeTab === "keywords"
                ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>۳۰ و ۳۵. کلمات کلیدی دوگانه و الگوی دیاسپورا</span>
          </button>

          <button
            onClick={() => setActiveTab("nap")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
              activeTab === "nap"
                ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-[#c8102e]" />
            <span>۳۱ و ۳۴. نمایه کسب‌وکار گوگل (NAP) و اسکیما وین</span>
          </button>

          <button
            onClick={() => setActiveTab("authorities")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
              activeTab === "authorities"
                ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>۳۲. لینک‌سازی از مراجع اتریشی (RIS, BMF, ÖGK)</span>
          </button>

          <button
            onClick={() => setActiveTab("diaspora")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
              activeTab === "diaspora"
                ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-600" />
            <span>۳۳. دایرکتوری‌های جامعه ایرانی اتریش</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: HREFLANG & SUBFOLDER ARCHITECTURE (ITEMS 27, 28, 29, 36) */}
        {/* ======================================================== */}
        {activeTab === "hreflang" && (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Strategy Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Iran / Farsi Card */}
              <div className={`p-4 rounded-2xl border transition-all ${
                !isDeLocale ? "bg-red-50/40 border-[#c8102e]/30 shadow-xs" : "bg-stone-50/70 border-stone-200"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇮🇷</span>
                    <div>
                      <h4 className="text-xs font-black text-stone-900">بازار ایران و دیاسپورای اتریش (fa-IR)</h4>
                      <p className="text-[10px] text-stone-500 font-mono">hreflang="fa-IR" | ریشه دامنه (/) </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    فعال
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  پوشش نیازهای متقاضیان مهاجرت از ایران و فارسی‌زبانان ساکن وین، گراتس و لینتس با فونت Vazirmatn، جهت‌بندی راست‌به‌چپ (RTL) و پاسخ به نیت‌های جستجوی فارسی.
                </p>
                <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">آدرس فعال فعلی:</span>
                  <code className="font-mono text-[#c8102e] font-bold dir-ltr">https://otrish-iran.ir/</code>
                </div>
              </div>

              {/* Austria / German Card */}
              <div className={`p-4 rounded-2xl border transition-all ${
                isDeLocale ? "bg-red-50/40 border-[#c8102e]/30 shadow-xs" : "bg-stone-50/70 border-stone-200"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇦🇹</span>
                    <div>
                      <h4 className="text-xs font-black text-stone-900">بازار اتریش و نهادهای رسمی (de-AT)</h4>
                      <p className="text-[10px] text-stone-500 font-mono">hreflang="de-AT" | زیرپوشه (/de/)</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-100 text-[#c8102e]">
                    زیرپوشه بهینه
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  بومی‌سازی محتوا با اصطلاحات حقوقی اتریش (Rot-Weiß-Rot-Karte، Meldezettel، Brutto Netto mit 14 Gehältern) برای دیده‌شدن در موتورهای جستجوی اتریش و جلب اعتماد کارفرمایان و ادارات محلی.
                </p>
                <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">آدرس فعال نسخه اتریش:</span>
                  <code className="font-mono text-[#c8102e] font-bold dir-ltr">https://otrish-iran.ir/de/</code>
                </div>
              </div>
            </div>

            {/* Generated Hreflang Tags Code Box */}
            <div className="bg-stone-900 text-stone-100 p-4 rounded-2xl space-y-2.5 relative">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-stone-300">
                    تگ‌های hreflang تزریق‌شده در تگ &lt;head&gt; این صفحه
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(
                    hreflangLinks.map(l => `<link rel="alternate" hreflang="${l.hrefLang}" href="${l.href}" />`).join("\n"),
                    "hreflang-code"
                  )}
                  className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all"
                >
                  {copiedCode === "hreflang-code" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      کپی شد
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      کپی تگ‌ها
                    </>
                  )}
                </button>
              </div>

              <pre className="text-[11px] font-mono leading-relaxed overflow-x-auto text-emerald-300 py-1" dir="ltr">
{hreflangLinks.map(l => `<link rel="alternate" hreflang="${l.hrefLang}" href="${l.href}" />`).join("\n")}
              </pre>

              <div className="text-[10px] text-stone-400 pt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>مطابق دستورالعمل گوگل: هر دو زبان به یکدیگر لینک متقابل (Reciprocal Links) دارند و x-default نیز تعریف شده است.</span>
              </div>
            </div>

            {/* Item 36 Strategic Domain Note */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                <Globe2 className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black text-amber-900">
                  ۳۶. استراتژی ساختار دامنه (.ir در برابر زیرپوشه /de/)
                </h4>
                <p className="text-xs text-amber-820 leading-relaxed font-medium">
                  استفاده از ساختار زیرپوشه (<code className="font-mono bg-amber-100/80 px-1 py-0.5 rounded">/de/</code>) اجازه می‌دهد اعتبار دامنه اصلی (Domain Authority) میان هر دو نسخه تقسیم نشود و نیاز به پرداخت هزینه‌های سالانه چندگانه هاست و دامنه حذف گردد، در حالی که الگوریتم Googlebot International هر زیرپوشه را به صورت مجزا بر اساس سیگنال‌های hreflang و موقعیت مکانی سرور برای کاربران اتریش رتبه‌بندی می‌کند.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DUAL KEYWORD RESEARCH & DIASPORA PATTERNS (ITEMS 30 & 35) */}
        {/* ======================================================== */}
        {activeTab === "keywords" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Filter by Target Market */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                {(["all", "Iran (fa-IR)", "Austria (de-AT)", "Diaspora (Hybrid)"] as const).map(market => (
                  <button
                    key={market}
                    onClick={() => setSelectedMarket(market)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      selectedMarket === market
                        ? "bg-stone-900 text-white shadow-xs"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {market === "all" && "همه کلمات کلیدی"}
                    {market === "Iran (fa-IR)" && "🇮🇷 بازار ایران (فارسی)"}
                    {market === "Austria (de-AT)" && "🇦🇹 بازار اتریش (آلمانی)"}
                    {market === "Diaspora (Hybrid)" && "🌐 الگوی دوگانه دیاسپورا"}
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-black text-stone-500">
                {filteredKeywords.length} عبارت هدفمند ارزیابی‌شده
              </span>
            </div>

            {/* Keyword Table */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-black">
                    <tr>
                      <th className="p-3">کلمه کلیدی هدف</th>
                      <th className="p-3">بازار هدف</th>
                      <th className="p-3">نیت جستجو</th>
                      <th className="p-3">حجم تخمینی ماهانه</th>
                      <th className="p-3">صفحه مقصد اختصاصی</th>
                      <th className="p-3">تحلیل فنی و الگوی رفتار</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredKeywords.map((item, idx) => (
                      <tr key={idx} className="hover:bg-rose-50/30 transition-colors">
                        <td className="p-3 font-bold text-stone-900">
                          {item.keyword}
                        </td>
                        <td className="p-3">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black ${
                            item.targetMarket.includes("Iran")
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : item.targetMarket.includes("Austria")
                              ? "bg-red-50 text-[#c8102e] border border-red-200"
                              : "bg-purple-50 text-purple-800 border border-purple-200"
                          }`}>
                            {item.targetMarket}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                            {item.intent}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-stone-800">
                          {item.monthlySearchVolumeEst}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => onNavigate(item.targetUrl.replace(/^\//, "").replace(/^de\//, ""))}
                            className="font-mono text-[11px] text-[#c8102e] font-bold hover:underline flex items-center gap-1"
                          >
                            <span>{item.targetUrl}</span>
                            <ArrowRight className="w-3 h-3 rotate-180" />
                          </button>
                        </td>
                        <td className="p-3 text-[11px] text-stone-600 max-w-xs leading-relaxed">
                          {item.notesFa}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Diaspora Search Pattern Insight */}
            <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-700" />
                <h4 className="text-xs font-black text-purple-900">
                  ۳۵. تحلیل رفتار جستجوی دیاسپورای ایرانی در اتریش
                </h4>
              </div>
              <p className="text-xs text-purple-900 leading-relaxed font-medium">
                ایرانیان ساکن اتریش به ندرت کلمات اداری را به فارسی خالص ترجمه می‌کنند (مثلاً به جای «برگه ثبت مسکن»، مستقیماً عبارت <strong>Meldezettel</strong> یا به جای «بیمه سلامت»، عبارت <strong>ÖGK</strong> را سرچ می‌کنند). صفحات سایت با ترکیب ساختاری هر دو عبارت بهینه شده‌اند تا در جستجوهای هیبریدی نظیر «نحوه تمدید Meldezettel وین» بالاترین رتبه گوگل را کسب نمایند.
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: GOOGLE BUSINESS PROFILE & LOCALBUSINESS SCHEMA (ITEMS 31 & 34) */}
        {/* ======================================================== */}
        {activeTab === "nap" && (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* NAP Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Google Business Profile Information (NAP) */}
              <div className="border border-stone-200 rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-stone-50 to-white space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#c8102e]" />
                    <div>
                      <h4 className="text-xs font-black text-stone-900">
                        ۳۱. نمایه کسب‌وکار گوگل در وین (Google Business Profile NAP)
                      </h4>
                      <p className="text-[10px] text-stone-500">ثبت رسمی نام، آدرس و شماره تماس یکسان در تمامی پلتفرم‌ها</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    منطقه ۱ وین (1010 Wien)
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 font-bold block text-[10px]">نام کسب‌وکار (Name):</span>
                      <strong className="text-stone-900 font-bold">{VIENNA_LOCAL_BUSINESS_NAP.nameFa}</strong>
                      <span className="text-stone-500 text-[10px] block font-medium">{VIENNA_LOCAL_BUSINESS_NAP.nameDe}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#c8102e] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 font-bold block text-[10px]">آدرس رسمی (Address):</span>
                      <span className="text-stone-900 font-bold dir-ltr block text-right font-mono">
                        {VIENNA_LOCAL_BUSINESS_NAP.streetAddress}, {VIENNA_LOCAL_BUSINESS_NAP.postalCode} {VIENNA_LOCAL_BUSINESS_NAP.addressLocality}, Österreich
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 font-bold block text-[10px]">شماره تماس و فوریت‌ها (Phone):</span>
                      <a href={`tel:${VIENNA_LOCAL_BUSINESS_NAP.telephone}`} className="font-mono font-bold text-emerald-700 dir-ltr block text-right hover:underline">
                        {VIENNA_LOCAL_BUSINESS_NAP.telephone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 font-bold block text-[10px]">ساعات کاری و پاسخگویی:</span>
                      <span className="text-stone-800 font-medium">دوشنبه تا جمعه: ۹:۰۰ الی ۱۸:۰۰ به وقت اروپای مرکزی (CET)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Star className="w-4 h-4 text-amber-500 shrink-0 fill-amber-500 mt-0.5" />
                    <div className="flex items-center gap-2">
                      <span className="text-stone-900 font-bold font-mono">{VIENNA_LOCAL_BUSINESS_NAP.rating.ratingValue} از ۵</span>
                      <span className="text-stone-500 text-[10px]">({VIENNA_LOCAL_BUSINESS_NAP.rating.reviewCount} نظر کاربران تاییدشده اتریش)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">مختصات جغرافیایی (Geo):</span>
                  <span className="font-mono text-stone-700 dir-ltr font-bold">
                    {VIENNA_LOCAL_BUSINESS_NAP.geoCoordinates.latitude}, {VIENNA_LOCAL_BUSINESS_NAP.geoCoordinates.longitude}
                  </span>
                </div>
              </div>

              {/* LocalBusiness Schema JSON-LD Output */}
              <div className="border border-stone-200 rounded-2xl p-4 sm:p-5 bg-stone-900 text-stone-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2.5 mb-3">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-stone-200">
                        ۳۴. اسکیما LocalBusiness منطقه‌ای وین (JSON-LD)
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(localBusinessJson, "local-schema")}
                      className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all"
                    >
                      {copiedCode === "local-schema" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          کپی شد
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          کپی کد اسکیما
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-[10px] font-mono text-emerald-300 leading-relaxed overflow-x-auto max-h-64 p-2 bg-stone-950/60 rounded-xl" dir="ltr">
{localBusinessJson}
                  </pre>
                </div>

                <div className="pt-3 text-[10px] text-stone-400 flex items-center gap-1.5 border-t border-stone-800 mt-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>معتبر در Google Rich Results Test با پشتیبانی کامل از PostalAddress و GeoCoordinates اتریش.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: AUSTRIAN AUTHORITY BACKLINK SOURCES (ITEM 32) */}
        {/* ======================================================== */}
        {activeTab === "authorities" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-stone-900">
                  ۳۲. شبکه استنادی و لینک‌سازی از منابع اتریشی (E-E-A-T Authority Network)
                </h4>
                <p className="text-[11px] text-stone-500 font-medium">
                  استناد و دریافت بک‌لینک از سامانه‌های دولتی اتریش بیشترین وزن رتبه‌بندی را در الگوریتم‌های گوگل ایجاد می‌کند.
                </p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                اعتبار دامنه بالای ۸۰ (DA 80+)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {AUSTRIAN_AUTHORITY_SOURCES.map((source, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-[#c8102e]/30 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9.5px] font-black px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                        {source.category}
                      </span>
                      <span className="text-[10px] font-mono font-black text-[#c8102e]">
                        {source.domainAuthority}
                      </span>
                    </div>
                    <h5 className="text-xs font-black text-stone-900 group-hover:text-[#c8102e] transition-colors">
                      {source.name}
                    </h5>
                    <p className="text-[10px] text-stone-500 font-mono" dir="ltr">
                      {source.entityDe}
                    </p>
                    <p className="text-[11px] text-stone-600 leading-relaxed pt-1">
                      {source.descriptionFa}
                    </p>
                  </div>

                  <div className="pt-2.5 mt-2 border-t border-stone-200/80 flex items-center justify-between">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-stone-400 hover:text-stone-700 flex items-center gap-1"
                    >
                      <Link2 className="w-3 h-3 text-[#c8102e]" />
                      <span>{source.url.replace("https://", "")}</span>
                    </a>
                    <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-[#c8102e] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: DIASPORA COMMUNITY DIRECTORIES (ITEM 33) */}
        {/* ======================================================== */}
        {activeTab === "diaspora" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-stone-900">
                  ۳۳. حضور در دایرکتوری‌های رسمی جامعه ایرانی اتریش
                </h4>
                <p className="text-[11px] text-stone-500 font-medium">
                  ثبت در تشکل‌های اجتماعی، کانون پزشکان و مترجمان قسم‌خورده ایرانی-اتریشی جهت دیده‌شدن در جستجوهای محلی ایرانیان.
                </p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                ۴ کانون تاییدشده
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {DIASPORA_COMMUNITY_DIRECTORIES.map(dir => (
                <div
                  key={dir.id}
                  className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#c8102e]/30 transition-all shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className="text-xs font-black text-stone-900">{dir.nameFa}</h5>
                        <span className="text-[9px] font-black px-2 py-0.2 rounded-full bg-stone-100 text-stone-600">
                          {dir.city}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono block mt-0.5" dir="ltr">
                        {dir.nameDe}
                      </span>
                    </div>
                    <span className="text-[9.5px] font-black px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                      {dir.verifiedStatus}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {dir.descriptionFa}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400 text-[10px]">دسترسی و استعلام:</span>
                    <span className="font-mono text-stone-700 font-bold text-[10px]">{dir.contact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
