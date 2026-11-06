import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  BrainCircuit,
  HelpCircle,
  FileText,
  Scale,
  Award,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  Quote,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Layers,
  Search,
  Globe2,
  Share2,
  ArrowRight
} from "lucide-react";
import {
  VERIFIED_AUTHORS,
  COMPARISON_TOPICS,
  DIRECT_ANSWER_CHUNKS,
  AI_CITATION_BENCHMARKS,
  getGeoFaqPageSchema,
  getGeoHowToSchema
} from "../data/geoOptimizationData";

interface AiGeoOptimizationHubProps {
  onNavigate: (segment: string) => void;
  className?: string;
}

export default function AiGeoOptimizationHub({
  onNavigate,
  className = ""
}: AiGeoOptimizationHubProps) {
  const [activeTab, setActiveTab] = useState<"chunks" | "comparison" | "eeat" | "citation" | "schemas">("chunks");
  const [selectedChunkId, setSelectedChunkId] = useState<string>(DIRECT_ANSWER_CHUNKS[0].id);
  const [selectedComparisonId, setSelectedComparisonId] = useState<string>(COMPARISON_TOPICS[0].id);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectedChunk = DIRECT_ANSWER_CHUNKS.find(c => c.id === selectedChunkId) || DIRECT_ANSWER_CHUNKS[0];
  const selectedComparison = COMPARISON_TOPICS.find(c => c.id === selectedComparisonId) || COMPARISON_TOPICS[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const faqPageSchemaJson = JSON.stringify(getGeoFaqPageSchema(), null, 2);
  const howToSchemaJson = JSON.stringify(getGeoHowToSchema(selectedChunk.id), null, 2);

  return (
    <section className={`space-y-6 font-sans select-none ${className}`} dir="rtl">
      {/* ======================================================== */}
      {/* MAIN CONTAINER */}
      {/* ======================================================== */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 relative overflow-hidden">
        {/* Futuristic AI Gradient Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2.5 h-6 bg-gradient-to-b from-purple-600 to-rose-600 rounded-full inline-block" />
              <h2 className="text-lg sm:text-xl font-black text-stone-900">
                مرکز بهینه‌سازی موتورهای هوش مصنوعی (GEO & AI Overviews 2026)
              </h2>
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                <BrainCircuit className="w-3 h-3 text-purple-600" />
                مطابق دستورالعمل رسمی ۲۰۲۶ گوگل
              </span>
            </div>
            <p className="text-xs text-stone-600 font-medium mt-1 leading-relaxed max-w-3xl">
              ساختاردهی چانک‌های خودکفا (۴۰–۶۰ کلمه‌ای)، پاسخ مستقیم هرم وارونه، تیترهای سؤالی، اسکیمای HowTo و FAQPage، بیوگرافی E-E-A-T نویسندگان، محتوای مقایسه‌ای (X vs Y) و پایش نرخ استناد در ChatGPT، Gemini و Perplexity.
            </p>
          </div>

          {/* Freshness Signal Badge (Item 23) */}
          <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 p-2 px-3 rounded-2xl shrink-0 self-start md:self-auto">
            <Calendar className="w-4 h-4 text-[#c8102e]" />
            <div className="text-right">
              <span className="text-[9px] font-bold text-stone-500 block">سیگنال تازگی محتوا (Freshness):</span>
              <strong className="text-[11px] font-black text-stone-900 font-mono">
                ۱ اکتبر ۲۰۲۶ (بروزرسانی زنده)
              </strong>
            </div>
          </div>
        </div>

        {/* Navigation Tabs for GEO Sub-features */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-stone-100">
          <button
            onClick={() => setActiveTab("chunks")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
              activeTab === "chunks"
                ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>۱۳، ۲۰ و ۲۵. چانک‌های سؤالی و پاسخ مستقیم (هرم وارونه)</span>
          </button>

          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
              activeTab === "comparison"
                ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-500" />
            <span>۲۲. محتوای مقایسه‌ای تخصصی (X vs Y)</span>
          </button>

          <button
            onClick={() => setActiveTab("eeat")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
              activeTab === "eeat"
                ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-rose-500" />
            <span>۲۱. تخصص، سوابق و هویت نویسندگان (E-E-A-T)</span>
          </button>

          <button
            onClick={() => setActiveTab("citation")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
              activeTab === "citation"
                ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
            <span>۲۶. رصد نرخ استناد (Citation Rate) در موتورهای AI</span>
          </button>

          <button
            onClick={() => setActiveTab("schemas")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
              activeTab === "schemas"
                ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            <span>۱۴، ۱۵ و ۱۸. اسکیماهای FAQPage, HowTo و llms.txt</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: INVERTED PYRAMID CHUNKS & QUESTION H2s (ITEMS 13, 20, 25) */}
        {/* ======================================================== */}
        {activeTab === "chunks" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Chunk Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {DIRECT_ANSWER_CHUNKS.map(chunk => (
                <button
                  key={chunk.id}
                  onClick={() => setSelectedChunkId(chunk.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
                    selectedChunk.id === chunk.id
                      ? "bg-purple-900 text-white border-purple-900 shadow-xs"
                      : "bg-purple-50/60 text-purple-900 border-purple-200 hover:bg-purple-100"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[200px]">{chunk.questionH2}</span>
                </button>
              ))}
            </div>

            {/* Active Chunk Display Box */}
            <div className="border border-purple-200 rounded-2xl p-5 bg-gradient-to-br from-purple-50/30 via-white to-stone-50 space-y-4 shadow-2xs">
              {/* Question-based H2 Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
                <h3 className="text-sm sm:text-base font-black text-stone-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                  {selectedChunk.questionH2}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 self-start sm:self-auto font-bold">
                  چانک ۵۰ کلمه‌ای قابل استخراج هوش مصنوعی
                </span>
              </div>

              {/* Direct Answer Box (Inverted Pyramid) */}
              <div className="p-4 bg-white border border-purple-100 rounded-xl relative shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[11px] font-black text-purple-800">
                  <span className="flex items-center gap-1">
                    <Quote className="w-3.5 h-3.5 text-purple-600" />
                    پاسخ مستقیم و خودکفا در ابتدای بخش (Inverted Pyramid)
                  </span>
                  <button
                    onClick={() => handleCopy(selectedChunk.directAnswer40to60Words, selectedChunk.id)}
                    className="text-[10px] text-stone-400 hover:text-stone-700 flex items-center gap-1"
                  >
                    {copiedKey === selectedChunk.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">کپی شد</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>کپی پاسخ</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs sm:text-[13px] text-stone-800 font-semibold leading-relaxed">
                  {selectedChunk.directAnswer40to60Words}
                </p>
              </div>

              {/* Empirical Stats Grid (Item 16) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {selectedChunk.keyStats.map((stat, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-stone-200 text-center space-y-0.5 shadow-3xs">
                    <span className="text-[10px] text-stone-500 font-medium block">{stat.label}</span>
                    <strong className="text-xs sm:text-sm font-black text-stone-900 font-mono block text-[#c8102e]">
                      {stat.value}
                    </strong>
                  </div>
                ))}
              </div>

              {/* HowTo Step breakdown (Item 15 preview) */}
              {selectedChunk.howToSteps && (
                <div className="pt-2 border-t border-stone-200 space-y-2">
                  <span className="text-[11px] font-black text-stone-700 block">
                    مراحل اجرایی گام‌به‌گام (HowTo Structured Data):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedChunk.howToSteps.map((step, idx) => (
                      <div key={idx} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-purple-700 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-stone-700 text-[11px] leading-relaxed font-medium">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source & Deep Link */}
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs flex-wrap gap-2">
                <a
                  href={selectedChunk.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-stone-500 hover:text-stone-800 flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>مستند قانونی: {selectedChunk.officialSource}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => onNavigate(selectedChunk.targetSegment)}
                  className="px-3 py-1.5 bg-[#c8102e] hover:bg-[#a00d24] text-white rounded-xl text-[11px] font-black flex items-center gap-1 shadow-xs transition-all"
                >
                  <span>مشاهده ابزار کامل در سایت</span>
                  <ArrowRight className="w-3 h-3 rotate-180" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SPECIALIZED COMPARISONS X VS Y (ITEM 22) */}
        {/* ======================================================== */}
        {activeTab === "comparison" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Topic Selectors */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {COMPARISON_TOPICS.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedComparisonId(topic.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 border ${
                    selectedComparison.id === topic.id
                      ? "bg-amber-900 text-white border-amber-900 shadow-xs"
                      : "bg-amber-50/70 text-amber-900 border-amber-200 hover:bg-amber-100"
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{topic.titleFa}</span>
                </button>
              ))}
            </div>

            {/* Comparison Display */}
            <div className="border border-stone-200 rounded-2xl p-5 bg-gradient-to-br from-amber-50/30 via-white to-stone-50 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-stone-900">
                    {selectedComparison.titleFa}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                    طراحی تخصصی جهت ارجاع مستقیم به عنوان جدول مقایسه‌ای در پاسخ‌های ChatGPT و Perplexity
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                  منبع استناد رسمی
                </span>
              </div>

              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs font-semibold text-amber-900 leading-relaxed">
                <strong>نتیجه‌گیری راهبردی: </strong>
                {selectedComparison.summaryFa}
              </div>

              {/* Comparison Parameters Matrix */}
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-100 border-b border-stone-200 text-stone-700 font-black">
                    <tr>
                      <th className="p-3">معیار مقایسه</th>
                      <th className="p-3 text-purple-900">{selectedComparison.entityX}</th>
                      <th className="p-3 text-blue-900">{selectedComparison.entityY}</th>
                      <th className="p-3 text-emerald-900">تحلیل و برتری</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {selectedComparison.parameters.map((param, idx) => (
                      <tr key={idx} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 font-bold text-stone-800">{param.feature}</td>
                        <td className="p-3 text-stone-600 leading-relaxed">{param.valueX}</td>
                        <td className="p-3 text-stone-600 leading-relaxed">{param.valueY}</td>
                        <td className="p-3 font-bold text-emerald-700 text-[11px]">{param.verdict}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-200 flex-wrap gap-2">
                <span>نمونه پرامپت هوش مصنوعی: <code className="font-mono text-purple-700 font-bold">{selectedComparison.aiCitationPrompt}</code></span>
                <span className="font-bold text-stone-700">مرجع استناد: {selectedComparison.officialCitation}</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: AUTHOR CREDENTIALS & E-E-A-T (ITEM 21) */}
        {/* ======================================================== */}
        {activeTab === "eeat" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-stone-900">
                  ۲۱. شناسنامه و صلاحیت علمی نویسندگان و کارشناسان (E-E-A-T Authority Profiles)
                </h4>
                <p className="text-[11px] text-stone-500 font-medium">
                  دستورالعمل ۲۰۲۶ گوگل به اعتبار مستقیم و دست‌اول نویسنده در زمینه‌های حقوقی، مالی و مهاجرتی (YMYL) بیشترین اهمیت را می‌دهد.
                </p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                ۳ کارشناس تاییدشده اتریش
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VERIFIED_AUTHORS.map(author => (
                <div
                  key={author.id}
                  className="border border-stone-200 rounded-2xl p-4 bg-stone-50/50 hover:bg-white hover:border-[#c8102e]/30 transition-all shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={author.avatarUrl}
                        alt={author.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
                      />
                      <div>
                        <h5 className="text-xs font-black text-stone-900">{author.name}</h5>
                        <p className="text-[10px] text-stone-500 font-bold">{author.roleFa}</p>
                        <span className="text-[9px] font-mono text-[#c8102e] block" dir="ltr">{author.roleDe}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                      {author.bioFa}
                    </p>

                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-stone-500 block">مدارک و تاییدیه‌ها:</span>
                      {author.credentials.map((cred, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[10.5px] text-stone-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-stone-200/80 flex items-center justify-between text-[10px]">
                    <span className="font-mono text-purple-700 font-bold">{author.experienceYears}+ سال سابقه مقیم اتریش</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                      {author.verifiedBadge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: AI CITATION RATE BENCHMARKS (ITEM 26) */}
        {/* ======================================================== */}
        {activeTab === "citation" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-stone-900">
                  ۲۶. رصد نرخ استناد (Citation Rate) برند در پاسخ‌های ChatGPT، Gemini و Perplexity
                </h4>
                <p className="text-[11px] text-stone-500 font-medium">
                  معیار اصلی سنجش اقتدار موضوعی و موفقیت در GEO؛ پایش مستمر استناد مستقیم به صفحات اتریش‌نشین به عنوان مرجع معتبر اتریش.
                </p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                شاخص اقتدار بالای ۸۰٪
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {AI_CITATION_BENCHMARKS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#c8102e]/30 transition-all shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-stone-900">{item.engineName}</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.citationShare}
                      </span>
                    </div>

                    <div className="p-2 bg-stone-50 rounded-xl border border-stone-200/80 text-[11px] space-y-1">
                      <span className="text-[10px] text-stone-400 block font-bold">پرامپت آزمایشی ارزیابی‌شده:</span>
                      <strong className="text-stone-800 block">{item.samplePrompt}</strong>
                    </div>

                    <div className="p-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-[11px] text-stone-700 leading-relaxed italic">
                      "{item.verifiedSnippet}"
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px]">
                    <span className="text-stone-400">لینک ارجاع:</span>
                    <code className="font-mono text-[#c8102e] font-bold">{item.sourceAttribution}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: SCHEMAS & LLMS.TXT (ITEMS 14, 15, 18, 19) */}
        {/* ======================================================== */}
        {activeTab === "schemas" && (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Status of llms.txt and robots.txt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-700" />
                    <h5 className="text-xs font-black text-stone-900">۱۸. فایل استاندارد llms.txt</h5>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    مستقر در /llms.txt
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                  استاندارد باز برای مدل‌های زبانی؛ راهنمای چانک‌های متنی و پیوندهای مستقیم به مراجع اتریش با فرمت خلاصه و نسخه کامل (<code className="font-mono bg-stone-200 px-1 py-0.5 rounded">/llms-full.txt</code>).
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <a
                    href="/llms.txt"
                    target="_blank"
                    className="text-[#c8102e] font-bold hover:underline flex items-center gap-1 font-mono text-[10px]"
                  >
                    <span>مشاهده فایل زنده /llms.txt</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-emerald-700" />
                    <h5 className="text-xs font-black text-stone-900">۱۹. دسترسی ربات‌های AI در robots.txt</h5>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    تایید دسترسی ۷ موتور
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                  دسترسی مجاز هدفمند به محتوای سایت برای خزنده‌های رسمی <code className="font-mono">GPTBot</code>، <code className="font-mono">ClaudeBot</code>، <code className="font-mono">PerplexityBot</code>، <code className="font-mono">Google-Extended</code> و <code className="font-mono">Applebot-Extended</code>.
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <a
                    href="/robots.txt"
                    target="_blank"
                    className="text-[#c8102e] font-bold hover:underline flex items-center gap-1 font-mono text-[10px]"
                  >
                    <span>مشاهده فایل زنده /robots.txt</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Structured Data JSON-LD Box */}
            <div className="border border-stone-200 rounded-2xl p-5 bg-stone-900 text-stone-100 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-stone-200">
                    ۱۴ و ۱۵. داده‌های ساختاریافته FAQPage و HowTo (تزریق شده در Head)
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(faqPageSchemaJson, "faq-schema")}
                  className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all"
                >
                  {copiedKey === "faq-schema" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      کپی شد
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      کپی FAQPage JSON-LD
                    </>
                  )}
                </button>
              </div>

              <pre className="text-[10.5px] font-mono text-emerald-300 leading-relaxed overflow-x-auto max-h-60 p-2.5 bg-stone-950/70 rounded-xl" dir="ltr">
{faqPageSchemaJson}
              </pre>

              <div className="pt-1 text-[10px] text-stone-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>پشتیبانی کامل از استاندارد Rich Results گوگل برای پاسخ مستقیم در نتایج هوش مصنوعی و تب پرسش‌های متداول.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
