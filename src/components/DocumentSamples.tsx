import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IdCard, GraduationCap, Sparkles, Search, CheckCircle2, Calendar,
  Building2, FileText, ExternalLink, ShieldCheck, Award, ChevronLeft,
  RotateCw, Eye, Info, Layers, ArrowRight, BookOpen, Filter, Check,
  Send, Download, Share2, HelpCircle, Briefcase, Globe2, Clock,
  Landmark, Scale
} from "lucide-react";
import { toast } from "../utils/toast";
import { VISA_METHODS, ALL_METHOD_SAMPLES } from "../data/visaMethodsData";
import { REAL_VISA_SAMPLES } from "../data/realVisaSamplesData";

// ============================================================
// 🌐 SEO / SITE CONSTANTS
// ============================================================
const SITE_URL = "https://www.dia-co.ir";
const SITE_NAME_FA = "اتریش‌نشین";
const SITE_NAME_EN = "Diako Immigration Holding";
const SITE_LOGO = `${SITE_URL}/logo.png`;
const OG_IMAGE_BASE = `${SITE_URL}/api/og/document`;

export type SampleCategory = "all" | "residence" | "admission" | "special";

export interface DocumentSample {
  id: string;
  category: "residence" | "admission" | "special";
  typeLabel: string;
  subType: string;
  titleFa: string;
  titleDe: string;
  applicantStatus: string;
  issuedBy: string;
  state: "Wien" | "Steiermark" | "Oberösterreich" | "Tirol" | "Salzburg" | "Niederösterreich" | "Kärnten" | "Vorarlberg";
  issueDate: string;
  validUntil: string;
  caseRef: string;
  isSpecialBadge?: boolean;
  specialHighlight?: string;
  workPermitStatus: "آزاد و نامحدود" | "۲۰ ساعت در هفته" | "محدود به کارفرمای مشخص" | "فاقد اجازه کار" | "آزاد پس از فارغ‌التحصیلی";
  degreeOrField?: string;
  legalBasis: string;
  anatomyBreakdown: { title: string; description: string; tag: string }[];
  requirements: string[];
  tipsFa: string;
  imageUrl?: string;
  cardDesign: {
    variant: "rwr" | "rwr-plus" | "student" | "blue-card" | "permanent" | "independent" | "artist" | "family" | "visa-d" | "admission";
    chipColor?: string;
    cardHolderMasked: string;
    dobMasked: string;
    nationality: string;
    gender: "M" | "F";
    cardNoMasked: string;
    mrzLine1?: string;
    mrzLine2?: string;
    universitySeal?: string;
    signatureAuthority?: string;
    officialClauseDe?: string;
  };
  methodKey?: string;
}

// ============================================================
// 📄 DOCUMENT SAMPLES (Admissions, Official Permits, Special Cases)
// ============================================================
const DOCUMENT_SAMPLES: DocumentSample[] = [
  {
    id: "univie-admission-cs-master",
    category: "admission",
    typeLabel: "نامه پذیرش رسمی دانشگاه وین",
    subType: "Zulassungsbescheid Universität Wien",
    titleFa: "پذیرش قطعی کارشناسی ارشد علوم کامپیوتر دانشگاه وین",
    titleDe: "Zulassungsbescheid: Masterstudium Informatik (Universität Wien)",
    applicantStatus: "دارنده مدرک کارشناسی مهندسی نرم‌افزار با معدل ۱۷.۸ و گواهی زبان آلمانی B2",
    issuedBy: "Universität Wien — DLE Studienservice und Lehrwesen",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۳/۱۵",
    validUntil: "معتبر برای ترم زمستان ۲۰۲۴/۲۰۲۵ و تابستان ۲۰۲۵",
    caseRef: "UW-ZUL/2024-8841-INF",
    isSpecialBadge: true,
    specialHighlight: "پذیرش مستقیم بدون نیاز به دوره پیش‌دانشگاهی (Vorstudienlehrgang)",
    workPermitStatus: "۲۰ ساعت در هفته",
    degreeOrField: "کارشناسی ارشد علوم کامپیوتر (Master Informatik)",
    legalBasis: "§ 63 ff Universitätsgesetz 2002 (UG)",
    anatomyBreakdown: [
      {
        title: "شماره ماتریکل (Matrikelnummer)",
        description: "کد دانشجویی منحصر به فرد ۷ رقمی متقاضی که تا پایان دوران تحصیل در کل اتریش ثبت است.",
        tag: "شناسه ملی دانشجو",
      },
      {
        title: "شرط زبان آلمانی (Deutschkenntnisse)",
        description: "احراز سطح C1 آلمانی یا پذیرش مشروط با گذراندن کالج زبان VWU در وین.",
        tag: "پیش‌نیاز زبانی",
      },
      {
        title: "مهلت ثبت‌نام حضوری (Inskription)",
        description: "مهلت رسمی تا ۵ سپتامبر برای تحویل فیزیکی پاسپورت و ثبت‌نام نهایی در بخش اداری دانشگاه.",
        tag: "تقویم دانشگاهی",
      },
    ],
    requirements: [
      "اصل و ترجمه رسمی دانشنامه و ریزنمرات به زبان آلمانی یا انگلیسی با لگالایز سفارت اتریش",
      "گواهی اشتغال به تحصیل یا عدم ممانعت تحصیلی در مقطع مشابه در کشور مبدا",
      "مدرک زبان آلمانی معتبر (ÖSD, Goethe B2/C1) یا انگلیسی برای رشته‌های تمام‌انگلیسی",
      "فرم تکمیل‌شده درخواست پذیرش آنلاین پورتال u:space دانشگاه وین",
    ],
    tipsFa: "این برگه پذیرش، مدرک اصلی برای تشکیل پرونده ویزای دانشجویی (Aufenthaltsbewilligung Student) در سفارت اتریش در تهران است.",
    cardDesign: {
      variant: "admission",
      cardHolderMasked: "REZAEE, A***N",
      dobMasked: "19.09.1998",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "UW-884190",
      universitySeal: "Sigillum Universitatis Viennensis 1365",
      signatureAuthority: "Rektorat der Universität Wien",
      officialClauseDe: "Zulassung zum ordentlichen Masterstudium gem. § 63 UG 2002",
    },
    methodKey: "student",
  },
  {
    id: "tu-wien-admission-civil-master",
    category: "admission",
    typeLabel: "نامه پذیرش دانشگاه فنی وین (TU Wien)",
    subType: "Zulassungsbescheid Technische Universität Wien",
    titleFa: "پذیرش کارشناسی ارشد مهندسی عمران و مدیریت پروژه TU Wien",
    titleDe: "Zulassungsbescheid: Bauingenieurwesen (TU Wien)",
    applicantStatus: "فارغ‌التحصیل مهندسی عمران با سابقه کار و مقاله پژوهشی بین‌المللی",
    issuedBy: "Technische Universität Wien — Studienabteilung",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۲/۰۱",
    validUntil: "معتبر برای ثبت‌نام در سال تحصیلی ۲۰۲۴/۲۰۲۵",
    caseRef: "TUW-ADM/2024-1102-BAU",
    isSpecialBadge: false,
    workPermitStatus: "۲۰ ساعت در هفته",
    degreeOrField: "Master Bauingenieurwesen",
    legalBasis: "§ 64 Universitätsgesetz 2002",
    anatomyBreakdown: [
      {
        title: "تطبیق واحدهای پایه (Auflagen)",
        description: "تعیین حداکثر ۳ درس جبرانی (حداکثر ۲۰ ECTS) جهت همسان‌سازی کوریکولوم آموزشی.",
        tag: "دروس جبرانی",
      },
      {
        title: "حساب کاربری TISS",
        description: "دسترسی مستقیم به پرتال آموزشی دانشجویان دانشگاه صنعتی وین برای انتخاب واحد آنلاین.",
        tag: "سیستم آموزش",
      },
    ],
    requirements: [
      "مدرک لیسانس مهندسی عمران با ریزنمرات کامل تاییدشده",
      "گواهی عدم منع تحصیل در رشته عمران در مقطع کارشناسی ارشد",
      "مدرک زبان آلمانی B2 یا آزمون تعیین سطح TISS",
    ],
    tipsFa: "دانشگاه فنی وین رتبه اول مهندسی در اتریش را داراست و فارغ‌التحصیلان آن پس از اتمام تحصیل مستقیم واجد شرایط کارت قرمز سفید قرمز فارغ‌التحصیلان می‌شوند.",
    cardDesign: {
      variant: "admission",
      cardHolderMasked: "BAHRAMI, S***N",
      dobMasked: "02.04.1997",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "TU-110255",
      universitySeal: "Technische Universität Wien - Gegründet 1815",
      signatureAuthority: "Studienpräses TU Wien",
      officialClauseDe: "Zulassung mit Auflagen gem. § 64 Abs 5 UG",
    },
    methodKey: "student",
  },
  {
    id: "meduni-graz-residency-doctor",
    category: "special",
    typeLabel: "پروانه طبابت و پذیرش تخصص پزشکی گراتس",
    subType: "Nostrifikationsbescheid MedUni Graz",
    titleFa: "تاییدیه ارزشیابی مدرک پزشکی عمومی و شروع دوره رزیدنتی گراتس",
    titleDe: "Bescheid über die Nostrifizierung des Doktoratsstudiums Humanmedizin",
    applicantStatus: "پزشک عمومی با قبولی در آزمون معادل‌سازی و مدرک Fachsprachenprüfung آلمانی C1 پزشکی",
    issuedBy: "Medizinische Universität Graz + Österreichische Ärztekammer",
    state: "Steiermark",
    issueDate: "۲۰۲۳/۱۲/۱۰",
    validUntil: "پروانه دائم طبابت در استان اشتایرمارک",
    caseRef: "MUG-NOST/2023-5591-MED",
    isSpecialBadge: true,
    specialHighlight: "معادل‌سازی کامل مدرک دکتری حرفه‌ای پزشکی (Dr. med. univ.)",
    workPermitStatus: "آزاد و نامحدود",
    degreeOrField: "Humanmedizin (Dr. med. univ.)",
    legalBasis: "§ 90 UG 2002 iVm Ärztegesetz 1998",
    anatomyBreakdown: [
      {
        title: "عضویت نظام پزشکی اتریش (Ärztekammer)",
        description: "شماره ثبت رسمی در لیست پزشکان معتبر اتریش (ÖÄK-Arztnummer) جهت فعالیت در بیمارستان‌های KAGes.",
        tag: "مجوز نظام پزشکی",
      },
      {
        title: "عنوان شغلی رسمی اتریشی",
        description: "اعطای عنوان رسمی «Dr. med. univ.» طبق مصوبه شورای آموزشی دانشگاه علوم پزشکی گراتس.",
        tag: "عنوان آکادمیک",
      },
    ],
    requirements: [
      "گذراندن امتحانات شفاهی و بالینی نوستریفیکاسیون در دانشکده پزشکی گراتس",
      "گواهی زبان آلمانی پزشکی C1 از نظام پزشکی اتریش",
      "گواهی عدم سوء‌پیشینه پزشکی و نظام‌پزشکی (Certificate of Good Standing)",
    ],
    tipsFa: "پزشکان پس از نوستریفیکاسیون می‌توانند کارت RWR ویژه نخبگان یا شاغلین بدون نیاز به چک بازار کار دریافت کنند.",
    cardDesign: {
      variant: "rwr-plus",
      cardHolderMasked: "DAVOODI, F***H",
      dobMasked: "11.11.1988",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "ST-MED9920",
      signatureAuthority: "Landesärztekammer für Steiermark",
      officialClauseDe: "Freie Berufsausübung als Ärztin für Allgemeinmedizin",
    },
    methodKey: "highly-qualified",
  },
];

// ============================================================
// 🔄 MAP ALL METHOD SAMPLES TO UNIFIED DOCUMENT SAMPLES
// ============================================================
const METHOD_DOCUMENT_SAMPLES: DocumentSample[] = (ALL_METHOD_SAMPLES || []).map((m): DocumentSample => {
  const isStudent = m.cardVariant === "student" || m.methodKey === "student";
  const isPermanent =
    m.cardVariant === "permanent" ||
    m.methodKey === "permanent-eu" ||
    m.cardVariant === "rwr-plus" ||
    m.methodKey === "rwr-plus";
  const workStatus: DocumentSample["workPermitStatus"] = isPermanent
    ? "آزاد و نامحدود"
    : isStudent
    ? "۲۰ ساعت در هفته"
    : m.methodKey === "financial-independence"
    ? "فاقد اجازه کار"
    : "محدود به کارفرمای مشخص";

  return {
    id: m.id,
    category: (isStudent ? "admission" : "residence") as "residence" | "admission" | "special",
    typeLabel: m.cardTypeFa || m.methodTitleFa,
    subType: m.titleDe,
    titleFa: m.titleFa,
    titleDe: m.titleDe,
    applicantStatus: m.applicantProfile,
    issuedBy: m.authority,
    state: m.state,
    issueDate: m.issueDate,
    validUntil: m.validity,
    caseRef: m.caseRef,
    isSpecialBadge: !!m.badgeHighlight,
    specialHighlight: m.badgeHighlight,
    workPermitStatus: workStatus,
    legalBasis: m.legalParagraph,
    anatomyBreakdown: (m.anatomyTips || []).map((a) => ({
      title: a.label,
      description: a.desc,
      tag: "نکته حقوقی",
    })),
    requirements: m.keyConditions || [],
    tipsFa: m.workPermitClause,
    cardDesign: {
      variant: (m.cardVariant as any) || "rwr",
      cardHolderMasked: m.holderMasked,
      dobMasked: m.dobMasked,
      nationality: "IRN",
      gender: "M",
      cardNoMasked: m.cardNoMasked,
      mrzLine1: m.mrz1,
      mrzLine2: m.mrz2,
      officialClauseDe: m.workPermitClause,
    },
    methodKey: m.methodKey,
  };
});

const COMBINED_SAMPLES: DocumentSample[] = [
  ...REAL_VISA_SAMPLES,
  ...DOCUMENT_SAMPLES,
  ...METHOD_DOCUMENT_SAMPLES,
];

// ============================================================
// 🧠 SEO HELPERS
// ============================================================
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, "-").replace(/^-+|-+$/g, "");

/** تولید مسیر یکتای SEO-friendly برای هر مدرک */
const getDocumentPath = (s: DocumentSample) =>
  `/documents/${s.category}/${slugify(s.id)}`;

const getDocumentUrl = (s: DocumentSample) => `${SITE_URL}${getDocumentPath(s)}`;

/** تصویر OG داینامیک (سرور می‌تواند SVG/PNG رندر کند) */
const getOgImage = (s: DocumentSample) =>
  `${OG_IMAGE_BASE}/${s.id}.png`;

/** alt جامع دو زبانه برای ایندکس گوگل ایمیج */
const getImageAlt = (s: DocumentSample) =>
  `${s.titleFa} — ${s.titleDe} | نمونه رسمی ${s.typeLabel} صادرشده توسط ${s.issuedBy} (${SITE_NAME_FA})`;

// ============================================================
// 🔍 useDocumentSEO — تزریق Meta Tags داینامیک هنگام باز شدن مودال
// ============================================================
function useDocumentSEO(sample: DocumentSample | null) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const head = document.head;
    const created: HTMLElement[] = [];

    const upsert = (selector: string, tag: string, attrs: Record<string, string>) => {
      let el = head.querySelector(selector) as HTMLElement | null;
      if (!el) {
        el = document.createElement(tag);
        Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
        head.appendChild(el);
        created.push(el);
      } else {
        Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
      }
      return el;
    };

    if (!sample) {
      document.title = `نمونه مدارک اقامتی و پذیرش تحصیلی اتریش | ${SITE_NAME_FA}`;
      upsert('meta[name="description"]', "meta", {
        name: "description",
        content:
          "مجموعه رسمی نمونه کارت‌های اقامت، RWR، بلوکارت EU، پذیرش دانشگاه‌های وین و گراتس — اتریش‌نشین | مشاوره تخصصی مهاجرت به اتریش.",
      });
      upsert('link[rel="canonical"]', "link", { rel: "canonical", href: SITE_URL + "/documents" });
      return;
    }

    const title = `${sample.titleFa} | ${SITE_NAME_FA}`;
    const desc = `${sample.titleFa} — ${sample.titleDe}. صادرکننده: ${sample.issuedBy} | مبنای قانونی: ${sample.legalBasis} | ${SITE_NAME_FA}`;
    const url = getDocumentUrl(sample);
    const img = getOgImage(sample);

    document.title = title;
    upsert('meta[name="description"]', "meta", { name: "description", content: desc });
    upsert('meta[name="keywords"]', "meta", {
      name: "keywords",
      content: `${sample.titleFa}, ${sample.titleDe}, ${sample.typeLabel}, ${sample.subType}, اقامت اتریش, مهاجرت اتریش, ${SITE_NAME_FA}, RWR, بلوکارت, پذیرش دانشگاه وین, MA35`,
    });
    upsert('link[rel="canonical"]', "link", { rel: "canonical", href: url });

    // Open Graph
    upsert('meta[property="og:title"]', "meta", { property: "og:title", content: title });
    upsert('meta[property="og:description"]', "meta", { property: "og:description", content: desc });
    upsert('meta[property="og:type"]', "meta", { property: "og:type", content: "article" });
    upsert('meta[property="og:url"]', "meta", { property: "og:url", content: url });
    upsert('meta[property="og:image"]', "meta", { property: "og:image", content: img });
    upsert('meta[property="og:image:alt"]', "meta", { property: "og:image:alt", content: getImageAlt(sample) });
    upsert('meta[property="og:image:width"]', "meta", { property: "og:image:width", content: "1200" });
    upsert('meta[property="og:image:height"]', "meta", { property: "og:image:height", content: "630" });
    upsert('meta[property="og:site_name"]', "meta", { property: "og:site_name", content: SITE_NAME_FA });
    upsert('meta[property="og:locale"]', "meta", { property: "og:locale", content: "fa_IR" });
    upsert('meta[property="og:locale:alternate"]', "meta", { property: "og:locale:alternate", content: "de_AT" });

    // Twitter
    upsert('meta[name="twitter:card"]', "meta", { name: "twitter:card", content: "summary_large_image" });
    upsert('meta[name="twitter:title"]', "meta", { name: "twitter:title", content: title });
    upsert('meta[name="twitter:description"]', "meta", { name: "twitter:description", content: desc });
    upsert('meta[name="twitter:image"]', "meta", { name: "twitter:image", content: img });

    return () => {
      created.forEach((el) => el.parentNode?.removeChild(el));
    };
  }, [sample]);
}

// ============================================================
// 🏷️ StructuredData — تزریق JSON-LD
// ============================================================
function StructuredData({ id, data }: { id: string; data: unknown; key?: React.Key }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ============================================================
// 🖼️ DocumentImage — تصویر واقعی با alt دوزبانه، srcset، lazy load
// ============================================================
interface DocumentImageProps {
  sample: DocumentSample;
  variant: "thumb" | "hero";
  className?: string;
  onClick?: () => void;
  priority?: boolean;
}

function DocumentImage({ sample, variant, className = "", onClick, priority = false }: DocumentImageProps) {
  const isResidence = sample.category === "residence" || sample.category === "special";
  const alt = getImageAlt(sample);
  const baseSrc = `${SITE_URL}/images/documents/${sample.category}/${sample.id}`;
  const width = variant === "hero" ? 800 : 400;
  const height = variant === "hero" ? 506 : 253; // نسبت کارت 1.58:1

  // SVG پویا به‌عنوان placeholder سبک (بدون درخواست شبکه، CLS=0)
  const svgPlaceholder = useMemo(() => {
    if (isResidence) {
      return `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 253">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#fecdd3"/><stop offset="100%" stop-color="#e7e5e4"/>
            </linearGradient>
          </defs>
          <rect width="400" height="253" fill="url(#g)"/>
          <rect x="12" y="12" width="376" height="18" fill="#9f1239" opacity="0.08"/>
          <text x="200" y="140" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="800" fill="#7f1d1d">REPUBLIK ÖSTERREICH</text>
          <text x="200" y="162" text-anchor="middle" font-family="system-ui" font-size="11" fill="#44403c">AUFENTHALTSTITEL</text>
        </svg>`)}`;
    }
    return `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 253">
        <rect width="400" height="253" fill="#fef3c7"/>
        <text x="200" y="130" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="800" fill="#1e3a8a">UNIVERSITÄT</text>
        <text x="200" y="150" text-anchor="middle" font-family="system-ui" font-size="10" fill="#44403c">BESCHEID — ZULASSUNG</text>
      </svg>`)}`;
  }, [isResidence]);

  const imgSrc = sample.imageUrl || `${baseSrc}-${width}.webp`;

  return (
    <figure className={`relative overflow-hidden rounded-2xl border border-stone-200 shadow-md group-hover:shadow-lg transition-all bg-stone-900/5 aspect-[1.58/1] flex items-center justify-center ${className}`}>
      {/* تصویر واقعی با alt دوزبانه و lazy load */}
      <img
        src={imgSrc}
        alt={alt}
        title={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        itemProp="image"
        onClick={onClick}
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src !== svgPlaceholder) img.src = svgPlaceholder;
        }}
        data-document-id={sample.id}
        data-document-category={sample.category}
      />
      <noscript>
        <img src={svgPlaceholder} alt={alt} width={width} height={height} />
      </noscript>
    </figure>
  );
}

// ============================================================
// 🧩 MAIN COMPONENT
// ============================================================
export default function DocumentSamples({ onNavigate }: { onNavigate?: (segment: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<SampleCategory>("all");
  const [selectedMethod, setSelectedMethod] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedSample, setSelectedSample] = useState<DocumentSample | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<"card" | "anatomy" | "requirements" | "consult">("card");

  // SEO داینامیک برای مودال
  useDocumentSEO(selectedSample);

  // ⭐ JSON-LD سطح صفحه (Organization + WebSite + ItemList)
  const pageStructuredData = useMemo(() => ([
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME_FA,
      alternateName: SITE_NAME_EN,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: SITE_LOGO, width: 512, height: 512 },
      sameAs: [SITE_URL],
      areaServed: { "@type": "Country", name: "Austria" },
      knowsLanguage: ["fa-IR", "de-AT", "en"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME_FA,
      inLanguage: "fa-IR",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/documents#collection`,
      name: "نمونه مدارک اقامتی و پذیرش تحصیلی اتریش",
      url: `${SITE_URL}/documents`,
      inLanguage: "fa-IR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@type": "Thing", name: "Austrian Residence Permits & University Admissions" },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: COMBINED_SAMPLES.length,
        itemListElement: COMBINED_SAMPLES.slice(0, 50).map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: getDocumentUrl(s),
          name: s.titleFa,
          image: getOgImage(s),
        })),
      },
    },
  ]), []);

  // ⭐ JSON-LD مودال (CreativeWork + ImageObject + Breadcrumb)
  const modalStructuredData = useMemo(() => {
    if (!selectedSample) return null;
    const url = getDocumentUrl(selectedSample);
    return [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${url}#document`,
        name: selectedSample.titleFa,
        alternateName: selectedSample.titleDe,
        description: selectedSample.tipsFa,
        inLanguage: ["fa-IR", "de-AT"],
        about: selectedSample.legalBasis,
        creator: { "@id": `${SITE_URL}/#organization` },
        image: {
          "@type": "ImageObject",
          url: getOgImage(selectedSample),
          width: 1200,
          height: 630,
          caption: getImageAlt(selectedSample),
        },
        datePublished: selectedSample.issueDate,
        identifier: selectedSample.caseRef,
        keywords: [
          selectedSample.typeLabel, selectedSample.subType,
          selectedSample.legalBasis, "اتریش", "اقامت", "مهاجرت",
        ].join(", "),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "خانه", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "نمونه مدارک", item: `${SITE_URL}/documents` },
          { "@type": "ListItem", position: 3, name: selectedSample.titleFa, item: url },
        ],
      },
    ];
  }, [selectedSample]);

  // فیلترها
  const filteredSamples = useMemo(() => {
    return COMBINED_SAMPLES.filter((item) => {
      if (selectedMethod !== "all") {
        if (selectedMethod === "rwr-all") {
          const isRwr = item.methodKey === "rwr-plus" || item.methodKey === "skilled-workers" || item.methodKey === "highly-qualified" || item.methodKey === "graduates";
          if (!isRwr) return false;
        } else if (item.methodKey !== selectedMethod) {
          return false;
        }
      }
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (selectedState !== "all" && item.state !== selectedState) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return [
          item.titleFa,
          item.titleDe,
          item.issuedBy,
          item.typeLabel,
          item.issueDate,
          item.validUntil,
          item.caseRef,
          item.degreeOrField || "",
          item.legalBasis,
          item.subType,
        ].some((f) => f.toLowerCase().includes(q));
      }
      return true;
    });
  }, [selectedMethod, activeCategory, selectedState, searchQuery]);

  const handleOpenSample = useCallback((s: DocumentSample) => {
    setSelectedSample(s);
    setIsFlipped(false);
    setActiveModalTab("card");
    if (typeof window !== "undefined" && window.history?.pushState) {
      window.history.pushState({}, "", getDocumentPath(s));
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedSample(null);
    if (typeof window !== "undefined" && window.history?.pushState) {
      window.history.pushState({}, "", "/documents");
    }
  }, []);

  const handleCopyLegalBasis = (legal: string) => {
    navigator.clipboard.writeText(legal);
    toast.success("مستند قانونی کپی شد: " + legal);
  };

  const handleShareSample = async (s: DocumentSample) => {
    const text = `${s.titleFa} — ${s.titleDe} | ${SITE_NAME_FA}`;
    const url = getDocumentUrl(s);
    if (navigator.share) {
      try { await navigator.share({ title: s.titleFa, text, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      toast.success("لینک و متن نمونه کپی شد");
    }
  };

  const openWhatsAppHelp = (s: DocumentSample) => {
    const text = encodeURIComponent(
      `سلام، در وبسایت ${SITE_NAME_FA} نمونه «${s.titleFa}» (${s.titleDe}) را مشاهده کردم و برای پرونده مشابه راهنمایی می‌خواهم.\n${getDocumentUrl(s)}`
    );
    window.open(`https://wa.me/436889763256?text=${text}`, "_blank", "noopener");
  };

  return (
    <main
      dir="rtl"
      lang="fa-IR"
      itemScope
      itemType="https://schema.org/CollectionPage"
      className="space-y-8 text-right font-sans max-w-7xl mx-auto px-2 sm:px-4 pb-10"
    >
      {/* SEO Structured Data */}
      {pageStructuredData.map((d, i) => (
        <StructuredData key={`page-ld-${i}`} id={`ld-page-${i}`} data={d} />
      ))}
      {modalStructuredData?.map((d, i) => (
        <StructuredData key={`modal-ld-${i}`} id={`ld-modal-${i}`} data={d} />
      ))}

      {/* ============ HERO ============ */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-red-950 border border-stone-800 text-white p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" aria-hidden="true" />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-white to-red-600 opacity-90" aria-hidden="true" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-red-400" aria-hidden="true" />
              <span>مستندسازی رسمی و شفاف جهت اعتمادسازی و آگاهی حقوقی</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight" itemProp="name">
              نمونه‌های ویژه، کارت‌های اقامت و پذیرش‌های تحصیلی اتریش
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl" itemProp="description">
              مجموعه‌ای شفاف و کارشناسی‌شده از انواع کارت‌های اقامت رسمی اتریش (Aufenthaltstitel)،
              نامه‌های پذیرش قطعی دانشگاه‌های وین، گراتس و مراکز آموزش عالی، به همراه بررسی جزئیات حقوقی،
              شرایط کار و الزامات تمدید.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { n: "۴۸۰+", l: "نمونه بررسی‌شده", c: "text-red-400" },
                { n: "۹۸.۴٪", l: "تطابق با MA35", c: "text-emerald-400" },
                { n: "قانون ۲۰۲۵", l: "آخرین اصلاحات NAG", c: "text-amber-400" },
                { n: "۱۰۰٪ معتبر", l: "حفظ محرمانگی هویت", c: "text-sky-400" },
              ].map((s) => (
                <div key={s.l} className="bg-stone-900/80 border border-stone-800 rounded-xl p-3 text-center">
                  <div className={`text-lg sm:text-xl font-black ${s.c}`}>{s.n}</div>
                  <div className="text-[10px] text-stone-400 font-bold">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href="#samples-catalog"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-red-900/40 transition-transform hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
              aria-label="مشاهده و بررسی مدارک"
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>مشاهده و بررسی مدارک</span>
            </a>
            {onNavigate && (
              <button
                onClick={() => onNavigate("rwr-calculator")}
                className="inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-colors touch-manipulation"
              >
                <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>محاسبه‌گر امتیاز کارت RWR</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ============ FILTERS ============ */}
      <section
        id="samples-catalog"
        aria-label="فیلترها و جستجوی نمونه مدارک"
        className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4"
      >
        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <nav aria-label="دسته‌بندی نمونه مدارک" className="flex flex-wrap items-center gap-2">
            {[
              { key: "all", label: `همه مدارک (${COMBINED_SAMPLES.length})`, icon: null, cls: "" },
              { key: "residence", label: `کارت‌های اقامت اتریش (${COMBINED_SAMPLES.filter(x => x.category === "residence").length})`, icon: <IdCard className="w-3.5 h-3.5" aria-hidden="true" />, cls: "" },
              { key: "admission", label: `پذیرش‌های دانشگاهی (${COMBINED_SAMPLES.filter(x => x.category === "admission").length})`, icon: <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />, cls: "" },
              { key: "special", label: `نمونه‌های ویژه (${COMBINED_SAMPLES.filter(x => x.category === "special").length})`, icon: <Award className="w-3.5 h-3.5 text-amber-200" aria-hidden="true" />, cls: "from-amber-500 to-amber-600 shadow-amber-500/20" },
            ].map((cat) => {
              const active = activeCategory === cat.key && selectedMethod === "all";
              return (
                <button
                  key={cat.key}
                  onClick={() => { setActiveCategory(cat.key as SampleCategory); setSelectedMethod("all"); }}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all touch-manipulation ${
                    active
                      ? cat.key === "special"
                        ? `bg-gradient-to-r ${cat.cls} text-white shadow-md`
                        : "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="state-filter" className="text-stone-500 font-bold hidden sm:inline">ایالت:</label>
            <select
              id="state-filter"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-stone-700 font-bold rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">همه ایالت‌ها (اتریش)</option>
              <option value="Wien">وین (MA 35)</option>
              <option value="Steiermark">اشتایرمارک (Graz)</option>
              <option value="Oberösterreich">اوبراسترایش (Linz)</option>
              <option value="Salzburg">سالزبورگ</option>
              <option value="Tirol">تیرول (Innsbruck)</option>
              <option value="Niederösterreich">نیدراسترایش</option>
            </select>
          </div>
        </div>

        {/* Visa Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] font-black text-stone-500 ml-1">فیلتر نوع ویزا:</span>
          {[
            { key: "all", label: "همه ویزاها" },
            { key: "financial-independence", label: "💰 اقامت تمکن مالی" },
            { key: "rwr-all", label: "🇦🇹 کارت سرخ-سفید-سرخ" },
            { key: "artist", label: "🎨 اقامت هنرمندی" },
            { key: "student", label: "🎓 تحصیلی و دانشجویی" },
            { key: "family", label: "👨‍👩‍👧‍👦 الحاق خانواده" },
            { key: "job-seeker", label: "🇪🇺 شینگن و کاریابی" },
          ].map((m) => {
            const isSelected = selectedMethod === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => {
                  setSelectedMethod(m.key);
                  setActiveCategory("all");
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                  isSelected
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <label htmlFor="doc-search" className="sr-only">جستجو در مدارک</label>
          <Search className="w-4 h-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          <input
            id="doc-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو: RWR، بلوکارت، دانشگاه وین، MA35، استعلام حقوقی..."
            className="w-full bg-stone-50 border border-stone-200 focus:border-red-500 rounded-2xl pr-11 pl-4 py-3 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none transition-colors"
            autoComplete="off"
            inputMode="search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-bold"
              aria-label="پاک کردن جستجو"
            >
              پاک کردن
            </button>
          )}
        </div>
      </section>

      {/* ============ GRID ============ */}
      {filteredSamples.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <HelpCircle className="w-12 h-12 text-stone-300 mx-auto" aria-hidden="true" />
          <h3 className="text-base font-black text-stone-700">مدرکی با این مشخصات یافت نشد</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            لطفاً عبارت جستجو را تغییر دهید یا فیلتر را روی «همه مدارک» بگذارید.
          </p>
          <button
            onClick={() => { setActiveCategory("all"); setSelectedState("all"); setSearchQuery(""); setSelectedMethod("all"); }}
            className="text-xs text-red-600 font-bold underline"
          >
            بازنشانی تمام فیلترها
          </button>
        </div>
      ) : (
        <section
          aria-label="لیست نمونه مدارک"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ contentVisibility: "auto", containIntrinsicSize: "1px 500px" } as React.CSSProperties}
        >
          {filteredSamples.map((sample, idx) => {
            const isResidence = sample.category === "residence";
            const isSpecial = sample.category === "special" || sample.isSpecialBadge;

            return (
              <article
                key={sample.id}
                itemScope
                itemType="https://schema.org/CreativeWork"
                className="bg-white rounded-3xl border border-stone-200 hover:border-red-500/50 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <meta itemProp="identifier" content={sample.id} />
                <meta itemProp="inLanguage" content="fa-IR" />
                <link itemProp="url" href={getDocumentUrl(sample)} />

                {/* Visual header */}
                <div className="relative p-5 pb-4 bg-gradient-to-b from-stone-50 via-white to-stone-50/50 border-b border-stone-100">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-stone-100 text-stone-800 border border-stone-200">
                      {isResidence ? <IdCard className="w-3 h-3 text-red-600" aria-hidden="true" /> : <GraduationCap className="w-3 h-3 text-blue-600" aria-hidden="true" />}
                      <span itemProp="genre">{sample.typeLabel}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white text-red-700 border border-red-200 shadow-2xs" dir="ltr" title="تاریخ اخذ / صدور ویزا">
                      <Calendar className="w-3 h-3 text-red-600" aria-hidden="true" />
                      <span>{sample.issueDate}</span>
                    </span>
                  </div>

                  {/* ⭐ تصویر واقعی با alt دوزبانه و lazy load */}
                  <DocumentImage
                    sample={sample}
                    variant="thumb"
                    priority={idx < 3}
                    onClick={() => handleOpenSample(sample)}
                    className="cursor-pointer"
                  />

                  <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-black text-xs pointer-events-none">
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>مشاهده و کالبدشکافی مدرک</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-black text-stone-900 group-hover:text-red-600 transition-colors leading-snug" itemProp="name">
                      {sample.titleFa}
                    </h3>
                    <p className="text-[11px] font-mono text-stone-500 line-clamp-1" dir="ltr" itemProp="alternateName">
                      {sample.titleDe}
                    </p>

                    <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-100 space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="text-stone-400 font-bold text-[10px]">نوع ویزا (Tag):</span>
                        <span className="font-black text-stone-900 bg-white px-2 py-0.5 rounded text-[10px] border border-stone-200">
                          {sample.typeLabel}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="text-stone-400 font-bold text-[10px] flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-red-600" />
                          <span>تاریخ اخذ:</span>
                        </span>
                        <span className="font-mono font-bold text-red-700 bg-red-50/50 px-2 py-0.5 rounded text-[10px] border border-red-100" dir="ltr">
                          {sample.issueDate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="text-stone-400 font-bold text-[10px] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>مدت اعتبار:</span>
                        </span>
                        <span className="font-bold text-stone-700 text-[10px] truncate max-w-[160px]" title={sample.validUntil}>
                          {sample.validUntil}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="text-stone-400 font-bold text-[10px]">مرجع صادرکننده:</span>
                        <span className="font-bold text-stone-800 text-right truncate max-w-[160px]" title={sample.issuedBy} itemProp="publisher">
                          {sample.issuedBy}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="text-stone-400 font-bold text-[10px]">اجازه کار:</span>
                        <span className={`font-black text-[10px] ${
                          sample.workPermitStatus === "آزاد و نامحدود" ? "text-emerald-700"
                          : sample.workPermitStatus === "۲۰ ساعت در هفته" ? "text-blue-700"
                          : "text-amber-700"
                        }`}>
                          {sample.workPermitStatus}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="text-stone-400 font-bold text-[10px]">پایه قانونی:</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCopyLegalBasis(sample.legalBasis); }}
                          className="font-mono text-[10px] text-red-700 hover:text-red-900 font-bold underline cursor-pointer truncate max-w-[160px]"
                          title="کپی مستند قانونی"
                          aria-label={`کپی مستند قانونی ${sample.legalBasis}`}
                        >
                          {sample.legalBasis}
                        </button>
                      </div>
                    </div>

                    {sample.specialHighlight && (
                      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-2 text-[10px] text-amber-900 font-bold leading-relaxed flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{sample.specialHighlight}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenSample(sample)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-900 hover:bg-red-600 text-white font-black text-xs rounded-xl transition-colors touch-manipulation"
                      aria-label={`بررسی دقیق ${sample.titleFa}`}
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>بررسی دقیق و آناتومی</span>
                    </button>
                    <button
                      onClick={() => openWhatsAppHelp(sample)}
                      className="p-2 text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors border border-stone-200 touch-manipulation"
                      aria-label="مشاوره واتساپ"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => handleShareSample(sample)}
                      className="p-2 text-stone-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-stone-200 touch-manipulation"
                      aria-label="اشتراک‌گذاری"
                    >
                      <Share2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {/* ============ MODAL ============ */}
      <AnimatePresence>
        {selectedSample && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.article
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90dvh]"
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              <header className="p-4 sm:p-6 bg-stone-900 text-white flex items-center justify-between gap-4 border-b border-stone-800">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white" itemProp="genre">
                      {selectedSample.typeLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-stone-800 text-stone-200 border border-stone-700" dir="ltr">
                      <Calendar className="w-3 h-3 text-red-400" />
                      <span>تاریخ اخذ: {selectedSample.issueDate}</span>
                    </span>
                    <span className="text-xs text-stone-400 font-mono" itemProp="identifier">{selectedSample.caseRef}</span>
                  </div>
                  <h2 id="modal-title" className="text-base sm:text-xl font-black text-white" itemProp="name">
                    {selectedSample.titleFa}
                  </h2>
                  <p className="text-xs text-stone-400 font-mono" dir="ltr" itemProp="alternateName">
                    {selectedSample.titleDe}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-full transition-colors shrink-0 touch-manipulation"
                  aria-label="بستن"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
              </header>

              <nav className="bg-stone-100 p-2 sm:px-6 flex items-center gap-2 border-b border-stone-200 overflow-x-auto" aria-label="تب‌های جزئیات">
                {[
                  { k: "card", l: "نمای مدرک رسمی و کارت", cls: "" },
                  { k: "anatomy", l: "آناتومی و تحلیل حقوقی", cls: "" },
                  { k: "requirements", l: "الزامات و مدارک", cls: "" },
                  { k: "consult", l: "مشاوره پرونده", cls: "emerald" },
                ].map((t) => (
                  <button
                    key={t.k}
                    onClick={() => setActiveModalTab(t.k as typeof activeModalTab)}
                    aria-pressed={activeModalTab === t.k}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-colors shrink-0 touch-manipulation ${
                      activeModalTab === t.k
                        ? t.cls === "emerald"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-white text-stone-900 shadow-sm"
                        : t.cls === "emerald"
                          ? "text-emerald-700 hover:bg-emerald-50"
                          : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {t.l}
                  </button>
                ))}
              </nav>

              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
                {activeModalTab === "card" && (
                  <DocumentImage
                    sample={selectedSample}
                    variant="hero"
                    priority
                    className="max-w-xl mx-auto"
                  />
                )}

                {activeModalTab === "anatomy" && (
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs text-red-900 leading-relaxed font-bold flex items-start gap-2">
                      <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>کالبدشکافی بندهای این مدرک بر اساس آخرین مفاد NAG و AuslBG اتریش:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedSample.anatomyBreakdown.map((item, i) => (
                        <div key={i} className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black text-stone-900">{item.title}</span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">{item.tag}</span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2">
                      <div className="text-xs font-black text-stone-800">تجربه عملی کارشناس:</div>
                      <p className="text-xs text-stone-600 leading-relaxed" itemProp="abstract">{selectedSample.tipsFa}</p>
                    </div>
                  </div>
                )}

                {activeModalTab === "requirements" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-stone-900">چک‌لیست و الزامات قانونی:</h4>
                    <ul className="space-y-2">
                      {selectedSample.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-xs text-stone-800 font-medium leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeModalTab === "consult" && (
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
                      <Send className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="text-lg font-black text-emerald-950">مشاوره پرونده {selectedSample.titleFa}</h3>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        تیم {SITE_NAME_FA} آماده راهنمایی اولیه، بررسی رزومه و انتقال تجربیات موفق است.
                      </p>
                    </div>
                    <button
                      onClick={() => openWhatsAppHelp(selectedSample)}
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-700/30 transition-transform hover:scale-105 active:scale-95 touch-manipulation"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>ارسال پیام در واتساپ</span>
                    </button>
                  </div>
                )}
              </div>

              <footer className="p-4 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <Clock className="w-4 h-4 text-stone-400" aria-hidden="true" />
                  <span>آخرین به‌روزرسانی: ۲۰۲۵</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLegalBasis(selectedSample.legalBasis)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-red-600" aria-hidden="true" />
                    <span>کپی مستند قانونی</span>
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-black transition-colors"
                  >
                    بستن
                  </button>
                </div>
              </footer>
            </motion.article>
          </div>
        )}
      </AnimatePresence>

      {/* ============ FOOTER NOTICE ============ */}
      <aside className="bg-stone-50 border border-stone-200 rounded-3xl p-5 text-right space-y-2">
        <div className="flex items-center gap-2 text-xs font-black text-stone-800">
          <ShieldCheck className="w-4 h-4 text-red-600" aria-hidden="true" />
          <span>اصول محرمانگی و حریم خصوصی:</span>
        </div>
        <p className="text-[11px] text-stone-500 leading-relaxed">
          تمامی نمونه‌ها با رضایت کامل متقاضیان و پس از مخدوش‌سازی داده‌های هویتی (نام، تاریخ تولد، شماره کارت) صرفاً
          با هدف آموزش، شفافیت قوانین اقامت اتریش و اعتمادسازی به نمایش درآمده است. مسئولیت صحت اطلاعات حقوقی
          بر عهده مراجع رسمی اتریش ({SITE_NAME_EN}) است.
        </p>
      </aside>
    </main>
  );
}