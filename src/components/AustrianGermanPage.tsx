import React from "react";
import {
  Globe,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  ArrowRight,
  FileCheck2,
  Scale,
  Sparkles,
  BookOpen,
  Layers,
  PhoneCall
} from "lucide-react";
import {
  LOCALIZED_AUSTRIAN_PAGES,
  VIENNA_LOCAL_BUSINESS_NAP,
  AUSTRIAN_AUTHORITY_SOURCES
} from "../data/internationalSeoData";

interface AustrianGermanPageProps {
  segment: string;
  onNavigateFa: (segment: string) => void;
  onSwitchToFarsi: () => void;
  onOpenTool: (toolId: string) => void;
}

export default function AustrianGermanPage({
  segment,
  onNavigateFa,
  onSwitchToFarsi,
  onOpenTool
}: AustrianGermanPageProps) {
  const pageData = LOCALIZED_AUSTRIAN_PAGES[segment] || LOCALIZED_AUSTRIAN_PAGES["home"];

  return (
    <article className="space-y-6 font-sans text-stone-900 select-none animate-in fade-in duration-300" dir="ltr">
      {/* ======================================================== */}
      {/* 1. GERMAN TOP BREADCRUMB & LANGUAGE SWITCHER */}
      {/* ======================================================== */}
      <nav aria-label="Breadcrumb Navigation" className="bg-stone-50 border border-stone-200 rounded-2xl p-3 px-4 flex items-center justify-between text-xs flex-wrap gap-2">
        <ol className="flex items-center gap-1.5 text-stone-600 font-medium">
          <li>
            <button
              onClick={() => onNavigateFa("home")}
              className="hover:text-[#c8102e] transition-colors font-bold"
            >
              Otrish Neshin
            </button>
          </li>
          <li>/</li>
          <li className="text-stone-400">Österreich (de-AT)</li>
          <li>/</li>
          <li className="text-stone-900 font-bold">{pageData.slug}</li>
        </ol>

        <button
          onClick={onSwitchToFarsi}
          className="px-3 py-1 bg-white hover:bg-stone-100 text-[#c8102e] border border-[#c8102e]/30 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-2xs"
          title="Zurück zur persischen Version"
        >
          <span>🇮🇷</span>
          <span>نسخه فارسی این صفحه</span>
        </button>
      </nav>

      {/* ======================================================== */}
      {/* 2. AUSTRIAN HERO HEADER */}
      {/* ======================================================== */}
      <header className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden space-y-4">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c8102e] via-white to-[#c8102e]" />

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-[#c8102e] font-black border border-red-200 flex items-center gap-1">
            <span>🇦🇹</span>
            <span>Österreichischer Rechtsstandard 2026</span>
          </span>
          <span className="text-stone-500 font-mono text-[11px]">
            de-AT / Subfolder: {pageData.cleanPathDe}
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-black text-stone-900 tracking-tight leading-tight">
          {pageData.h1De}
        </h1>

        <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-3xl">
          {pageData.descriptionDe}
        </p>

        {/* Interactive CTA to Launch the Tool */}
        <div className="pt-2 flex items-center gap-3 flex-wrap">
          <button
            onClick={() => onOpenTool(pageData.slug)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#c8102e] to-[#970d22] hover:opacity-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-95"
          >
            <span>Interaktiven Rechner / Dienst starten</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={pageData.officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
          >
            <span>Quelle: {pageData.officialSourceDe}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. CORE LEGAL & TECHNICAL POINTS */}
      {/* ======================================================== */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#c8102e]" />
          <h2 className="text-base sm:text-lg font-black text-stone-900">
            Wesentliche rechtliche Eckpunkte & Voraussetzungen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {pageData.keyPointsDe.map((point, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-xs text-stone-700 leading-relaxed font-medium">
                {point}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. GOOGLE LOCAL BUSINESS (WIEN NAP) FOOTER */}
      {/* ======================================================== */}
      <footer className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                {VIENNA_LOCAL_BUSINESS_NAP.nameDe}
              </h3>
              <p className="text-[11px] text-stone-400">
                Offiziell gelistete Diaspora-Plattform Wien (1010 Wien)
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-1 rounded bg-stone-800 text-emerald-400">
            Google Business Profile verifiziert
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-300">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#c8102e] shrink-0 mt-0.5" />
            <div>
              <span className="text-stone-500 block text-[10px]">Standort:</span>
              <span className="font-bold">{VIENNA_LOCAL_BUSINESS_NAP.streetAddress}, {VIENNA_LOCAL_BUSINESS_NAP.postalCode} Wien</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-stone-500 block text-[10px]">Helpline:</span>
              <span className="font-mono font-bold">{VIENNA_LOCAL_BUSINESS_NAP.telephone}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-stone-500 block text-[10px]">Geltungsbereich:</span>
              <span>Wien & alle 9 österreichischen Bundesländer</span>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
