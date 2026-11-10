import React, { useState } from "react";
import { 
  Network, 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Compass, 
  Calendar, 
  FileCheck2, 
  Award, 
  Sparkles,
  ChevronLeft,
  Share2,
  ArrowRight,
  Layers,
  Cpu,
  BarChart2,
  Youtube,
  Send,
  Linkedin,
  Instagram,
  Check
} from "lucide-react";
import { 
  CONTENT_PILLARS, 
  FIRST_HAND_CASE_STUDIES, 
  DIGITAL_CHANNELS, 
  SEARCH_INTENT_MAP,
  SearchIntentType 
} from "../data/contentClustersData";

interface ContentClustersSectionProps {
  onNavigate: (segment: string) => void;
  className?: string;
}

export default function ContentClustersSection({
  onNavigate,
  className = ""
}: ContentClustersSectionProps) {
  const [activePillarId, setActivePillarId] = useState<string>("immigration");
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string>(FIRST_HAND_CASE_STUDIES[0].id);

  const activePillar = CONTENT_PILLARS.find(p => p.id === activePillarId) || CONTENT_PILLARS[0];
  const selectedCaseStudy = FIRST_HAND_CASE_STUDIES.find(c => c.id === selectedCaseStudyId) || FIRST_HAND_CASE_STUDIES[0];

  return (
    <section className={`space-y-8 font-sans ${className}`} dir="rtl">
      
      {/* ======================================================== */}
      {/* 1. CONTENT CLUSTERS & TOPIC PILLARS ARCHITECTURE (ITEM 45 & 50) */}
      {/* ======================================================== */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 relative overflow-hidden">
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c8102e] via-amber-400 to-emerald-500" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2.5 h-6 bg-[#c8102e] rounded-full inline-block" />
              <h2 className="text-lg sm:text-xl font-black text-stone-900">
                خوشه‌های محتوایی و مراجع تخصصی (Topic Clusters & Pillar Architecture)
              </h2>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-red-100 text-[#c8102e] border border-red-200">
                ۴ پیلار جامع اقتدار موضوعی
              </span>
            </div>
            <p className="text-xs text-stone-600 font-medium mt-1 leading-relaxed max-w-3xl">
              معماری محتوایی چندلایه برای اثبات تخصص به موتورهای جستجو و هوش مصنوعی؛ هر خوشه شامل یک صفحه ستون (Pillar) و زیرشاخه‌های اقماری به همراه تفکیک دقیق نیت جستجو (Search Intent) است.
            </p>
          </div>

          {/* Search Intent Legend Pill Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {Object.values(SEARCH_INTENT_MAP).map(intent => (
              <span 
                key={intent.type}
                className={`text-[9.5px] font-black px-2 py-0.5 rounded-md border ${intent.badgeColor}`}
                title={intent.descriptionFa}
              >
                {intent.labelFa.split(" ")[1]}
              </span>
            ))}
          </div>
        </div>

        {/* Pillar Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-stone-100">
          {CONTENT_PILLARS.map(pillar => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black shrink-0 transition-all flex items-center gap-2 border ${
                  isActive
                    ? "bg-[#c8102e] text-white border-transparent shadow-sm shadow-red-500/20"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>{pillar.titleFa.replace("خوشه موضوعی: ", "")}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Showcase Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Pillar Lead Card (Col 1-5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-md">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-rose-300 text-[11px] font-black border border-white/10">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>صفحه ستون اصلی (Core Pillar Page)</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                {activePillar.titleFa}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                {activePillar.descriptionFa}
              </p>
            </div>

            <div className="pt-4 border-t border-white/15 space-y-3">
              <div className="text-[11px] text-stone-200 font-bold">
                صفحه ستون اصلی این بخش:
              </div>
              <a
                href={activePillar.pillarPath}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    onNavigate(activePillar.pillarPath.replace("/", ""));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="w-full inline-flex items-center justify-between p-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-black transition-all border border-white/30 group no-underline shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-300 font-black text-xs">{activePillar.titleFa.replace("خوشه موضوعی: ", "")}</span>
                  <span className="text-stone-200 text-[11px]">| ورود مستقیم به بخش</span>
                </div>
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-white" />
              </a>
            </div>
          </div>

          {/* Sibling Cluster Links & Search Intent Mapping (Col 6-12) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs font-black text-stone-500 pb-1">
              <span>محتواهای اقماری متصل به این خوشه ({activePillar.clusterLinks.length} صفحه):</span>
              <span className="text-[11px] font-mono text-stone-400">Multi-Tier Internal Linking</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activePillar.clusterLinks.map((link, idx) => {
                const intentMeta = SEARCH_INTENT_MAP[link.intent];
                return (
                  <a
                    key={idx}
                    href={link.path}
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        onNavigate(link.path.replace("/", ""));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="p-3.5 rounded-2xl bg-stone-50/80 hover:bg-white border border-stone-200 hover:border-[#c8102e]/40 flex flex-col justify-between gap-2.5 transition-all hover:shadow-sm text-right group no-underline"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-[9.5px] font-black px-1.5 py-0.5 rounded border ${intentMeta.badgeColor}`}>
                          {intentMeta.labelFa.split(" ")[1]}
                        </span>
                        <span className="text-[9.5px] font-black text-rose-800 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                          {link.title.split("(")[0].trim()}
                        </span>
                      </div>
                      <h4 className="text-xs font-black text-stone-900 group-hover:text-[#c8102e] transition-colors leading-snug line-clamp-1">
                        {link.title}
                      </h4>
                      <p className="text-[11px] text-stone-700 font-medium leading-relaxed mt-1 line-clamp-2">
                        {link.shortDesc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px] font-black text-stone-700 group-hover:text-[#c8102e]">
                      <span>مشاهده راهنمای کامل</span>
                      <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* E-E-A-T Transparency & Official Citations (Item 47) */}
        <div className="pt-4 border-t border-stone-100 bg-stone-50/70 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-200 text-[#c8102e] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black text-stone-900">
                  {activePillar.authorReviewer.name}
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  تایید صلاحیت علمی و حقوقی E-E-A-T
                </span>
              </div>
              <p className="text-[11px] text-stone-600 font-medium">
                {activePillar.authorReviewer.role} • {activePillar.authorReviewer.credentials}
              </p>
            </div>
          </div>

          {/* Official Sources Citations */}
          <div className="flex items-center gap-1.5 flex-wrap self-end sm:self-auto">
            <span className="text-[10px] font-bold text-stone-400">مراجع استنادی رسمی:</span>
            {activePillar.authorReviewer.sources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-stone-200 hover:border-red-300 text-stone-700 hover:text-[#c8102e] inline-flex items-center gap-1 transition-colors"
              >
                <span>{src.name}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. FIRST-HAND EXPERIENCE & CASE STUDIES (ITEM 46) */}
      {/* ======================================================== */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-emerald-600 rounded-full inline-block" />
              <h2 className="text-lg sm:text-xl font-black text-stone-900">
                محتوای تجربه‌محور و مطالعات موردی دست‌اول (First-Hand Case Studies)
              </h2>
            </div>
            <p className="text-xs text-stone-600 font-medium mt-1">
              مبتنی بر پرونده‌های واقعی، داده‌های دقیق عددی و تجربیات میدانی متقاضیان در ادارات MA35، AMS، BMF و شهرداری‌های اتریش.
            </p>
          </div>
          <span className="text-xs font-black px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
            محتوای دست‌اول با سیگنال واقعی E-E-A-T
          </span>
        </div>

        {/* Case Study Switcher & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* List of Case Studies (Col 1-4) */}
          <div className="lg:col-span-4 space-y-2">
            {FIRST_HAND_CASE_STUDIES.map((study) => {
              const isSelected = study.id === selectedCaseStudyId;
              return (
                <button
                  key={study.id}
                  onClick={() => setSelectedCaseStudyId(study.id)}
                  className={`w-full text-right p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-red-50/80 border-[#c8102e] shadow-xs"
                      : "bg-stone-50/70 hover:bg-white border-stone-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-stone-400 mb-1">
                    <span className="text-[#c8102e] font-black">{study.category}</span>
                    <span>{study.date}</span>
                  </div>
                  <h4 className="text-xs font-black text-stone-900 line-clamp-2 leading-snug">
                    {study.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Case Study (Col 5-12) */}
          <div className="lg:col-span-8 bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-2xl p-5 sm:p-6 space-y-5">
            
            {/* Header with Title & Verification Badge */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  ✓ {selectedCaseStudy.verifiedBadge}
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  ثبت پرونده: {selectedCaseStudy.date}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                {selectedCaseStudy.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {selectedCaseStudy.summaryFa}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedCaseStudy.metrics.map((m, i) => (
                <div key={i} className="bg-white border border-stone-200 rounded-xl p-3 text-center shadow-2xs">
                  <div className="text-[9px] font-black text-stone-400 mb-0.5">{m.label}</div>
                  <div className="text-xs sm:text-sm font-black font-mono text-[#c8102e] dir-ltr">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-2">
              <div className="text-xs font-black text-stone-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>نکات کلیدی و راهکارهای اثبات‌شده در این مطالعه موردی:</span>
              </div>
              <ul className="space-y-1.5 pr-2">
                {selectedCaseStudy.keyTakeaways.map((tip, idx) => (
                  <li key={idx} className="text-xs text-stone-600 font-medium flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] shrink-0 mt-1.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. MULTI-CHANNEL DIGITAL PRESENCE (ITEM 49) */}
      {/* ======================================================== */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-red-500 rounded-full inline-block" />
              <h2 className="text-lg sm:text-xl font-black text-white">
                حضور فعال در کانال‌های رسمی دیجیتال اتریش‌نشین (Multi-Channel Brand Presence)
              </h2>
            </div>
            <p className="text-xs text-stone-300 font-medium mt-1">
              گوگل به برندهایی که در چندین پلتفرم رسمی دارای فعالیت مستمر و اعضای حقیقی هستند اعتبار رتبه‌بندی بالاتری اختصاص می‌دهد.
            </p>
          </div>
          <span className="text-xs font-black px-3 py-1 rounded-xl bg-white/10 text-amber-300 border border-white/15 self-start md:self-auto">
            شبکه چندکاناله تاییدشده 🇦🇹
          </span>
        </div>

        {/* 4 Official Digital Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DIGITAL_CHANNELS.map((ch, idx) => {
            return (
              <a
                key={idx}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-4 no-underline"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/10 text-white font-mono dir-ltr">
                      {ch.members}
                    </span>
                    <span className="text-[10px] font-black text-amber-300">
                      {ch.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                      {ch.name}
                    </h4>
                    <span className="text-[10px] font-mono text-stone-400 dir-ltr inline-block mt-0.5">
                      {ch.handle}
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed font-normal">
                    {ch.descriptionFa}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-black text-stone-300 group-hover:text-white">
                  <span>عضویت در کانال</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

    </section>
  );
}
