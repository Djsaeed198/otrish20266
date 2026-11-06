import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator, User, GraduationCap, Briefcase, Languages, Award,
  CheckCircle, AlertTriangle, Info, TrendingUp, Target, Star,
  Phone, RefreshCw, ChevronDown, ChevronLeft, Sparkles, ShieldCheck,
  Clock, Globe, HelpCircle, MessageCircle, Share2, Rocket, Compass,
  Check, ArrowRight, Zap, BadgeCheck, FileText, CheckCircle2,
  Building2, Users, DollarSign, BookOpen
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// TYPES
// ==========================================
export type RWRCategory =
  | "jobseeker"
  | "veryHighlyQualified"
  | "skilledWorker"
  | "otherKeyWorker"
  | "startup"
  | "graduates"
  | "selfEmployed"
  | "rwrPlus"
  | "blueCard";

interface PointsBreakdown {
  age: number;
  education: number;
  experience: number;
  language: number;
  bonus: number;
}

interface ThresholdInfo {
  min: number;
  max: number;
  label: string;
  germanLabel: string;
  paragraph: string;
  categoryGroup: "points" | "jobsearch" | "pointsFree" | "business";
  pointsBased: boolean;
  badge: string;
  badgeColor: string;
  jobOfferRequired: boolean;
  salaryCondition: string;
  description: string;
  keyHighlights: string[];
}

// ==========================================
// CATEGORY DEFINITIONS (ALL 9 RWR METHODS)
// ==========================================
const THRESHOLDS: Record<RWRCategory, ThresholdInfo> = {
  jobseeker: {
    min: 70,
    max: 100,
    label: "مسیر ویزای جستجوی کار نخبگان (Jobseeker Visa)",
    germanLabel: "Visum D zur Arbeitsplatzsuche (§ 24a FPG iVm Anlage A AuslBG)",
    paragraph: "§ 24a FPG & Anlage A AuslBG",
    categoryGroup: "jobsearch",
    pointsBased: true,
    badge: "بدون نیاز به جاب‌آفر از قبل 🔍",
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
    jobOfferRequired: false,
    salaryCondition: "پس از یافتن کار: حداقل حقوق متناسب با مقطع",
    description: "ویزای ۶ ماهه قانونی ورود به اتریش برای مصاحبه‌های حضوری و کاریابی نخبگان بدون نیاز به کارفرما از قبل؛ تبدیل مستقیم به کارت RWR بدون آزمون نیروی کار جایگزین AMS.",
    keyHighlights: [
      "نیازی به داشتن قرارداد کاری قبل از ورود به اتریش نیست",
      "۶ ماه فرصت جستجوی شغل در اتریش با ویزای اقامتی نوع D",
      "تبدیل مستقیم و آنی به RWR Card به محض عقد قرارداد",
      "معافیت کارفرما از فرآیند سخت‌گیرانه بررسی بازار کار (Ersatzkraftverfahren)"
    ]
  },
  veryHighlyQualified: {
    min: 70,
    max: 100,
    label: "نیروی بسیار متخصص دارای جاب‌آفر (Besonders Hochqualifizierte)",
    germanLabel: "Besonders Hochqualifizierte (§ 12 AuslBG iVm § 41 Abs 1 NAG)",
    paragraph: "§ 12 AuslBG & § 41 Abs 1 NAG",
    categoryGroup: "points",
    pointsBased: true,
    badge: "مسیر سریع ۷۰ امتیازی 🚀",
    badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
    jobOfferRequired: true,
    salaryCondition: "حقوق ناخالص متناسب با مدرک تحصیلی",
    description: "برای متخصصان، پژوهشگران و دارندگان مدارک ارشد و دکترا با پیشنهاد کار رسمی؛ صدور سریع کارت اقامت ۲ ساله بدون بررسی بازار کار AMS.",
    keyHighlights: [
      "کسب حداقل ۷۰ امتیاز از جدول اختصاصی نخبگان (Anlage A)",
      "صدور کارت اقامت ۲ ساله اولیه",
      "بدون نیاز به آزمون نیروی کار جایگزین محلی اتریش",
      "امکان درخواست مستقیم همسر و فرزندان با کارت RWR Plus"
    ]
  },
  skilledWorker: {
    min: 55,
    max: 90,
    label: "کارگر متخصص در مشاغل دارای کمبود (Mangelberufe)",
    germanLabel: "Fachkräfte in Mangelberufen (§ 12a AuslBG iVm § 41 Abs 2 NAG)",
    paragraph: "§ 12a AuslBG & § 41 Abs 2 NAG",
    categoryGroup: "points",
    pointsBased: true,
    badge: "لیست کمبود ۵۵ امتیاز ⚙️",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    jobOfferRequired: true,
    salaryCondition: "رعایت حداقل دستمزد قانون کار / قرارداد جمعی (Kollektivvertrag)",
    description: "برای متقاضیان شاغل در فهرست سالانه مشاغل دارای کمبود نیروی ملی یا ایالتی اتریش ۲۰۲۶ (فناوری اطلاعات، پرستاری، مهندسی مکانیک/برق، جوشکاری، تکنسین‌ها).",
    keyHighlights: [
      "کسب حداقل ۵۵ امتیاز از ۹۰ بر اساس جدول Anlage B",
      "شغل در لیست سالانه کمبود رسمی وزارت کار اتریش (Mangelberufsliste)",
      "نیاز به داشتن پیشنهاد کاری رسمی با حقوق طبق Kollektivvertrag",
      "امکان استفاده از سابقه کار فنی و هنرستانی معتبر"
    ]
  },
  otherKeyWorker: {
    min: 55,
    max: 90,
    label: "سایر نیروهای کلیدی عمومی (Sonstige Schlüsselkräfte)",
    germanLabel: "Sonstige Schlüsselkräfte (§ 12b Abs 1 AuslBG iVm § 41 Abs 3 NAG)",
    paragraph: "§ 12b Abs 1 AuslBG & § 41 Abs 3 NAG",
    categoryGroup: "points",
    pointsBased: true,
    badge: "شرط حداقل حقوق ۵۵ امتیاز 💼",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    jobOfferRequired: true,
    salaryCondition: "زیر ۳۰ سال: ماهانه €۳,۰۳۰+ | بالای ۳۰ سال: ماهانه €۳,۶۳۶+ (ناخالص)",
    description: "برای سایر تخصص‌ها و مشاغلی که خارج از لیست کمبود هستند اما کارفرما نتوانسته نیروی اتریشی بیابد و حداقل حقوق ناخالص قانونی را می‌پردازد.",
    keyHighlights: [
      "کسب حداقل ۵۵ امتیاز از ۹۰ بر اساس جدول Anlage C",
      "شرط سخت‌گیرانه حداقل حقوق ناخالص ماهانه (۳,۰۳۰ یا ۳,۶۳۶ یورو در ۲۰۲۶)",
      "بررسی اولویت بازار کار توسط اداره کار فدرال (AMS Arbeitsmarktprüfung)",
      "پرداخت ۱۴ ماه حقوق در سال طبق استانداردهای اتریش"
    ]
  },
  startup: {
    min: 50,
    max: 85,
    label: "بنیان‌گذاران استارتاپ نوآور (Start-up-Gründer)",
    germanLabel: "Start-up-Gründer (§ 24 Abs 2 AuslBG iVm § 41 Abs 5 NAG)",
    paragraph: "§ 24 Abs 2 AuslBG & § 41 Abs 5 NAG",
    categoryGroup: "business",
    pointsBased: true,
    badge: "نوآوری و سرمایه ۵۰ امتیاز 💡",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    jobOfferRequired: false,
    salaryCondition: "سرمایه اولیه حداقل €۳۰,۰۰۰ (حداقل ۱۵,۰۰۰ نقدی شخصی)",
    description: "برای کارآفرینان و موسسان استارتاپ‌های نوآور تکنولوژی، هوش مصنوعی، فین‌تک یا محصولات صنعتی نوین؛ ارزیابی طرح کسب‌وکار توسط سرویس اقتصادی اتریش (aws).",
    keyHighlights: [
      "کسب حداقل ۵۰ امتیاز از ۸۵ بر اساس جدول اختصاصی Anlage D",
      "ارائه بیزنس‌پلن نوآورانه و تاییدیه کتبی از Austria Wirtschaftsservice (aws)",
      "سرمایه ثبتی حداقل ۳۰,۰۰۰ یورو با حداقل ۵۰٪ سهم متقاضی",
      "تبدیل مستقیم به کارت RWR Plus آزاد پس از ۲ سال در صورت موفقیت کسب‌وکار"
    ]
  },
  graduates: {
    min: 0,
    max: 100,
    label: "فارغ‌التحصیلان دانشگاه‌های اتریش (Studienabsolventen)",
    germanLabel: "Studienabsolventen (§ 12b Abs 2 AuslBG iVm § 41 Abs 4 NAG)",
    paragraph: "§ 12b Abs 2 AuslBG & § 41 Abs 4 NAG",
    categoryGroup: "pointsFree",
    pointsBased: false,
    badge: "معاف ۱۰۰٪ از جدول امتیازات 🎓",
    badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    jobOfferRequired: true,
    salaryCondition: "حداقل حقوق عرفی فارغ‌التحصیلان (حدود €۳,۱۳۲ ناخالص ماهانه)",
    description: "مسیر طلایی و بدون امتیاز برای کسانی که مقطع لیسانس، فوق‌لیسانس یا دکترا را در دانشگاه‌ها یا دانشگاه‌های کاربردی (FH) اتریش به پایان رسانده‌اند.",
    keyHighlights: [
      "معاف از جدول امتیازات سن، سابقه و زبان (کاملاً Punktefrei)",
      "۱۲ ماه ویزای قانونی اقامت جهت جستجوی کار پس از فارغ‌التحصیلی",
      "بدون نیاز به آزمون نیروی کار جایگزین (Ersatzkraftverfahren) اداره کار AMS",
      "تبدیل مستقیم به کارت RWR Card ۲ ساله"
    ]
  },
  selfEmployed: {
    min: 0,
    max: 100,
    label: "نیروهای کلیدی خوداشتغال و سرمایه‌گذار (Selbständige Schlüsselkräfte)",
    germanLabel: "Selbständige Schlüsselkräfte (§ 24 AuslBG iVm § 41 Abs 6 NAG)",
    paragraph: "§ 24 AuslBG & § 41 Abs 6 NAG",
    categoryGroup: "business",
    pointsBased: false,
    badge: "ارزیابی اقتصاد کلان 🏢",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    jobOfferRequired: false,
    salaryCondition: "انتقال سرمایه حداقل €۱۰۰,۰۰۰ یا ایجاد شغل پایدار",
    description: "برای مدیران و سرمایه‌گذارانی که فعالیت اقتصادی آن‌ها موجب منفعت اقتصاد کلان اتریش (Makroökonomischer Nutzen) یا اشتغال‌زایی ملموس شود.",
    keyHighlights: [
      "انتقال پایدار سرمایه حداقل ۱۰۰,۰۰۰ یورو به اقتصاد اتریش",
      "ایجاد یا تثبیت فرصت‌های شغلی جدید برای شهروندان اتریش",
      "انتقال دانش فنی پیشرفته یا احداث زیرساخت نوین اقتصادی",
      "تایید گزارش توجیهی اقتصاد کلان توسط هیئت عالی AMS اتریش"
    ]
  },
  rwrPlus: {
    min: 0,
    max: 100,
    label: "کارت سرخ-سفید-سرخ پلاس (Rot-Weiß-Rot – Karte Plus)",
    germanLabel: "Rot-Weiß-Rot – Karte Plus (§ 41a NAG)",
    paragraph: "§ 41a NAG",
    categoryGroup: "pointsFree",
    pointsBased: false,
    badge: "کار ۱۰۰٪ آزاد در سراسر اتریش 🌟",
    badgeColor: "bg-sky-50 text-sky-800 border-sky-200",
    jobOfferRequired: false,
    salaryCondition: "بدون شرط کارفرما — اشتغال در هر شرکت یا ایالت",
    description: "کارت اقامت با دسترسی ۱۰۰٪ آزاد به بازار کار اتریش بدون وابستگی به هیچ کارفرما؛ صدور پس از ۲ سال کار با کارت RWR یا اعطای مستقیم به اعضای خانواده.",
    keyHighlights: [
      "دسترسی کاملاً آزاد به بازار کار اتریش (Freier Arbeitsmarktzugang)",
      "امکان تغییر شغل و کارفرما در هر لحظه بدون نیاز به اخذ مجوز مجدد",
      "صدور خودکار پس از ۲۱ ماه اشتغال در طول مدت اعتبار ۲ ساله کارت RWR",
      "صدور مستقیم برای همسر و فرزندان متقاضیان کارت RWR و کارت آبی"
    ]
  },
  blueCard: {
    min: 0,
    max: 100,
    label: "کارت آبی اتحادیه اروپا در اتریش (Blaue Karte EU)",
    germanLabel: "Blaue Karte EU (§ 42 NAG iVm § 12c AuslBG)",
    paragraph: "§ 42 NAG & § 12c AuslBG",
    categoryGroup: "pointsFree",
    pointsBased: false,
    badge: "بدون شرط سنی و بدون جدول امتیاز 💎",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    jobOfferRequired: true,
    salaryCondition: "حداقل حقوق ناخالص سالانه €۴۵,۸۶۴ (معادل ~€۳,۲۷۶ ماهانه)",
    description: "مسیر هماهنگ اتحادیه اروپا برای دارندگان مدرک دانشگاهی ۳ ساله یا ۳ سال سابقه تخصصی در فناوری اطلاعات بدون جدول امتیازی سن و سابقه.",
    keyHighlights: [
      "کاملاً بدون جدول امتیازی و بدون شرط سنی",
      "قرارداد کاری حداقل ۶ ماهه با حداقل حقوق مصوب سالانه ۴۵,۸۶۴ یورو",
      "اعطای فوری کارت RWR Plus با اجازه کار ۱۰۰٪ آزاد به همسر",
      "تسهیل جابه‌جایی و انتقال سوابق اقامتی در کل کشورهای عضو اتحادیه اروپا"
    ]
  }
};

// ==========================================
// SCORING OPTIONS FOR POINTS-BASED CATEGORIES
// ==========================================

// 1. AGE OPTIONS BY CATEGORY
const getAgeOptions = (cat: RWRCategory) => {
  if (cat === "jobseeker" || cat === "veryHighlyQualified") {
    return [
      { label: "تا ۳۵ سال تمام", value: 35, points: 20, description: "حداکثر امتیاز سنی نخبگان (۲۰ امتیاز)" },
      { label: "۳۶ تا ۴۰ سال", value: 40, points: 15, description: "امتیاز بسیار خوب سنی (۱۵ امتیاز)" },
      { label: "۴۱ تا ۴۵ سال", value: 45, points: 10, description: "امتیاز رده میانی (۱۰ امتیاز)" },
      { label: "بیش از ۴۵ سال", value: 50, points: 0, description: "بدون امتیاز در جدول نخبگان" },
    ];
  }
  if (cat === "startup") {
    return [
      { label: "تا ۳۵ سال تمام", value: 35, points: 15, description: "حداکثر امتیاز کارآفرینان جوان (۱۵ امتیاز)" },
      { label: "۳۶ تا ۴۰ سال", value: 40, points: 10, description: "امتیاز کارآفرینان باتجربه (۱۰ امتیاز)" },
      { label: "بیش از ۴۰ سال", value: 45, points: 0, description: "بدون امتیاز سنی در استارتاپ" },
    ];
  }
  // Skilled Worker & Other Key Workers
  return [
    { label: "تا ۳۰ سال تمام", value: 30, points: 15, description: "حداکثر امتیاز سنی (۱۵ امتیاز)" },
    { label: "۳۱ تا ۴۰ سال", value: 40, points: 10, description: "امتیاز رده سنی متوسط (۱۰ امتیاز)" },
    { label: "۴۱ تا ۵۰ سال", value: 50, points: 5, description: "امتیاز سابقه سنی (۵ امتیاز)" },
    { label: "بیش از ۵۰ سال", value: 51, points: 0, description: "بدون امتیاز سنی" },
  ];
};

// 2. EDUCATION OPTIONS
interface EduItem {
  id: string;
  label: string;
  points: number;
  description: string;
  categories: RWRCategory[];
}

const ALL_EDU_OPTIONS: EduItem[] = [
  {
    id: "stem_phd",
    label: "دکترا یا فوق‌دکترا در رشته‌های فنی-مهندسی یا علوم پایه (MINT / STEM)",
    points: 40,
    description: "رشته‌های ریاضیات، علوم کامپیوتر، فناوری، مهندسی و علوم طبیعی — بالاترین امتیاز ممکن نخبگان",
    categories: ["jobseeker", "veryHighlyQualified"]
  },
  {
    id: "other_phd",
    label: "دکترا در سایر رشته‌های علوم انسانی، پزشکی یا هنر",
    points: 30,
    description: "مقطع دکترا در رشته‌های غیر STEM",
    categories: ["jobseeker", "veryHighlyQualified"]
  },
  {
    id: "stem_master",
    label: "کارشناسی ارشد در رشته‌های STEM / فنی مهندسی",
    points: 30,
    description: "فوق‌لیسانس علوم مهندسی، IT، صنایع، هوش مصنوعی و بیوتکنولوژی",
    categories: ["jobseeker", "veryHighlyQualified"]
  },
  {
    id: "other_master",
    label: "کارشناسی ارشد در سایر رشته‌ها",
    points: 25,
    description: "فوق‌لیسانس مدیریت، اقتصاد، زبان و علوم انسانی",
    categories: ["jobseeker", "veryHighlyQualified"]
  },
  {
    id: "stem_bachelor",
    label: "کارشناسی (لیسانس) در رشته‌های STEM / فنی مهندسی",
    points: 20,
    description: "لیسانس مهندسی، علوم کامپیوتر، فیزیک، شیمی، ریاضیات",
    categories: ["jobseeker", "veryHighlyQualified"]
  },
  {
    id: "other_bachelor",
    label: "کارشناسی (لیسانس) در سایر رشته‌ها",
    points: 15,
    description: "لیسانس علوم انسانی، بازرگانی، حسابداری",
    categories: ["jobseeker", "veryHighlyQualified"]
  },
  // Skilled Worker & Key Workers
  {
    id: "shortage_vocational",
    label: "دوره فنی‌حرفه‌ای رسمی معتبر یا دیپلم فنی در شغل کمبود (Lehrabschluss)",
    points: 30,
    description: "مدرک آموزش فنی رسمی متناسب با فهرست مشاغل کمبود اعلامی دولت اتریش",
    categories: ["skilledWorker"]
  },
  {
    id: "univ_degree_shortage",
    label: "مدرک دانشگاهی (لیسانس یا بالاتر) در رشته مرتبط با شغل",
    points: 30,
    description: "مدرک دانشگاهی ۳ یا ۴ ساله تایید شده",
    categories: ["skilledWorker", "otherKeyWorker", "startup"]
  },
  {
    id: "matura_general",
    label: "دیپلم متوسطه نظری با صلاحیت ورود به دانشگاه (Matura / Abitur)",
    points: 25,
    description: "دیپلم ۱۲ ساله رسمی با تاییدیه ورود به آموزش عالی",
    categories: ["skilledWorker", "otherKeyWorker"]
  },
  {
    id: "general_vocational",
    label: "مدرک مهارت فنی و حرفه‌ای عمومی",
    points: 20,
    description: "مدرک آموزش‌های فنی و کاربردی تخصصی",
    categories: ["otherKeyWorker", "startup"]
  }
];

// 3. EXPERIENCE OPTIONS
const getExpOptions = (cat: RWRCategory) => {
  if (cat === "jobseeker" || cat === "veryHighlyQualified") {
    return [
      { label: "بیش از ۶ سال سابقه کاری تخصصی", value: 6, points: 20, description: "حداکثر سابقه نخبگان (۲۰ امتیاز)" },
      { label: "۴ تا ۶ سال سابقه مرتبط", value: 4, points: 15, description: "سابقه کاری قوی و مستند (۱۵ امتیاز)" },
      { label: "۲ تا ۴ سال سابقه مرتبط", value: 2, points: 10, description: "سابقه کاری متوسط (۱۰ امتیاز)" },
      { label: "۱ تا ۲ سال سابقه مرتبط", value: 1, points: 4, description: "حداقل سابقه تخصصی (۴ امتیاز)" },
      { label: "کمتر از ۱ سال سابقه", value: 0, points: 0, description: "بدون سابقه کاری رسمی قابل قبول" },
    ];
  }
  if (cat === "startup") {
    return [
      { label: "بیش از ۳ سال سابقه کارآفرینی یا فعالیت در حوزه نوآوری", value: 3, points: 10, description: "حداکثر سابقه تجاری (۱۰ امتیاز)" },
      { label: "۱ تا ۳ سال سابقه مرتبط", value: 1, points: 5, description: "سابقه کارآفرینی اولیه (۵ امتیاز)" },
      { label: "کمتر از ۱ سال سابقه", value: 0, points: 0, description: "بدون سابقه کارآفرینی قبلی" },
    ];
  }
  // Skilled Worker & Key Workers
  return [
    { label: "بیش از ۵ سال سابقه کار مرتبط", value: 6, points: 20, description: "حداکثر امتیاز سابقه (۲۰ امتیاز)" },
    { label: "۳ تا ۵ سال سابقه کار مرتبط", value: 4, points: 15, description: "سابقه کار موثر و با بیمه (۱۵ امتیاز)" },
    { label: "۱ تا ۲ سال سابقه کار مرتبط", value: 2, points: 10, description: "سابقه کاری پایه (۱۰ امتیاز)" },
    { label: "کمتر از ۱ سال سابقه کار", value: 0, points: 0, description: "بدون امتیاز سابقه" },
  ];
};

// 4. LANGUAGE OPTIONS
const GERMAN_OPTIONS = [
  { label: "آلمانی سطح B2 یا C1 (تسلط بالا)", value: "b2", points: 15, description: "مدرک رسمی ÖSD یا گوته سطح پیشرفته" },
  { label: "آلمانی سطح B1 (استفاده مستقل)", value: "b1", points: 15, description: "حداکثر امتیاز در اکثر رده‌ها" },
  { label: "آلمانی سطح A2 (استفاده پایه)", value: "a2", points: 10, description: "مکالمه روزمره ابتدایی" },
  { label: "آلمانی سطح A1 (مقدماتی)", value: "a1", points: 5, description: "دانش پایه الفبایی" },
  { label: "بدون دانش زبان آلمانی", value: "none", points: 0, description: "بدون مدرک رسمی" },
];

const ENGLISH_OPTIONS = [
  { label: "انگلیسی سطح C1 یا C2 (IELTS 7.0+)", value: "c1", points: 10, description: "تسلط کامل زبان بین‌المللی" },
  { label: "انگلیسی سطح B2 (IELTS 5.5 - 6.5)", value: "b2", points: 5, description: "استفاده مستقل از زبان" },
  { label: "انگلیسی سطح کمتر یا بدون مدرک", value: "none", points: 0, description: "بدون امتیاز انگلیسی" },
];

// ==========================================
// CHECKLIST ITEMS FOR POINTS-FREE VISAS
// ==========================================
interface ChecklistItem {
  id: string;
  label: string;
  details: string;
  isMandatory: boolean;
}

const CHECKLIST_MAP: Record<"graduates" | "selfEmployed" | "rwrPlus" | "blueCard", ChecklistItem[]> = {
  graduates: [
    { id: "grad_deg", label: "فارغ‌التحصیلی از یک دانشگاه یا FH معتبر اتریش", details: "مدرک لیسانس، فوق‌لیسانس یا دکترا از موسسات آموزش عالی اتریش", isMandatory: true },
    { id: "grad_job", label: "پیشنهاد کاری (Job Offer) متناسب با مقطع تحصیلی", details: "قرارداد کار مرتبط با رشته تحصیلی اخذ شده در اتریش", isMandatory: true },
    { id: "grad_salary", label: "رعایت حداقل دستمزد عرفی (~۳,۱۳۲ یورو ناخالص ماهانه)", details: "پرداخت ناخالص مطابق حداقل استاندارد فارغ‌التحصیلان", isMandatory: true },
    { id: "grad_housing", label: "قرارداد اجاره مسکن قانونی و بیمه سلامت", details: "محل سکونت قانونی در اتریش + بیمه درمانی ÖGK", isMandatory: true }
  ],
  blueCard: [
    { id: "bc_degree", label: "مدرک دانشگاهی حداقل ۳ ساله یا ۳ سال سابقه تخصصی در فناوری اطلاعات", details: "تاییدیه مدرک تحصیلی عالی در آنابین یا گواهی سابقه معتبر IT", isMandatory: true },
    { id: "bc_contract", label: "قرارداد کاری حداقل ۶ ماهه با کارفرمای اتریشی", details: "قرارداد تمام‌وقت با مشخصات دقیق سمت شغلی", isMandatory: true },
    { id: "bc_salary", label: "حداقل حقوق سالانه ناخالص مصوب (€۴۵,۸۶۴ در ۲۰۲۶)", details: "معادل ماهانه حداقل ۳,۲۷۶ یورو ناخالص در ۱۴ ماه حقوق", isMandatory: true },
    { id: "bc_health", label: "بیمه سلامت کامل و مسکن استاندارد در اتریش", details: "عضویت در سامانه بیمه سلامت دولتی ÖGK", isMandatory: true }
  ],
  rwrPlus: [
    { id: "rwr_holder", label: "دارا بودن کارت RWR اولیه حداقل به مدت ۲۱ ماه", details: "یا عضویت در خانواده (همسر/فرزند) دارنده کارت RWR / کارت آبی", isMandatory: true },
    { id: "rwr_work_period", label: "حداقل ۲۱ ماه اشتغال قانونی بیمه‌شده تمام‌وقت در اتریش", details: "استعلام رسمی سابقه بیمه از سامانه Sozialversicherung (ÖGK)", isMandatory: true },
    { id: "rwr_integration", label: "تکمیل ماژول ۱ توافقنامه ادغام (Integrationsvereinbarung) با مدرک A2", details: "مدرک زبان آلمانی رسمی ÖIF سطح A2", isMandatory: true },
    { id: "rwr_solvency", label: "اثبات تمکن مالی و عدم وابستگی به کمک‌های رفاهی دولتی", details: "فیش حقوقی ۳ ماه اخیر بدون دریافت کمک‌هزینه بیکاری یا سوسیال", isMandatory: true }
  ],
  selfEmployed: [
    { id: "se_investment", label: "سرمایه‌گذاری یا انتقال پایدار حداقل ۱۰۰,۰۰۰ یورو به اتریش", details: "یا انتقال تکنولوژی نوین یا ایجاد فرصت‌های شغلی جدید", isMandatory: true },
    { id: "se_business_plan", label: "طرح کسب‌وکار توجیهی اقتصاد کلان (Business Plan)", details: "شرح دقیق بازار هدف، زنجیره تامین و ارزش افزوده برای اقتصاد اتریش", isMandatory: true },
    { id: "se_ams_review", label: "گزارش مثبت ارزیابی هیئت عالی اداره کار اتریش (AMS)", details: "تاییدیه کتبی منفعت اقتصاد کلان توسط کمیسیون تخصصی AMS", isMandatory: true },
    { id: "se_housing", label: "مسکن مستقل و تمکن کافی برای هزینه‌های شخصی زندگی", details: "سرمایه جداگانه جهت هزینه‌های شخصی زندگی در اتریش", isMandatory: true }
  ]
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const RWRPunterRechner: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<"all" | "points" | "jobsearch" | "pointsFree" | "business">("all");
  const [category, setCategory] = useState<RWRCategory>("jobseeker");

  // Points-based states
  const [age, setAge] = useState<number | null>(null);
  const [education, setEducation] = useState<string | null>(null);
  const [experience, setExperience] = useState<number | null>(null);
  const [germanLang, setGermanLang] = useState<string | null>(null);
  const [englishLang, setEnglishLang] = useState<string | null>(null);

  // Bonus checks
  const [bonusStudyAustria, setBonusStudyAustria] = useState(false);
  const [bonusPatent, setBonusPatent] = useState(false);
  const [bonusHighSalary, setBonusHighSalary] = useState(false);
  const [bonusStartupCapital, setBonusStartupCapital] = useState(false);
  const [bonusStartupIncubator, setBonusStartupIncubator] = useState(false);
  const [bonusEnglishCompany, setBonusEnglishCompany] = useState(false);

  // Checklist states for Points-Free categories
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const threshold = THRESHOLDS[category];
  const isPointsBased = threshold.pointsBased;

  // Filtered categories
  const displayedCategories = useMemo(() => {
    const allKeys = Object.keys(THRESHOLDS) as RWRCategory[];
    if (selectedGroup === "all") return allKeys;
    return allKeys.filter((k) => THRESHOLDS[k].categoryGroup === selectedGroup);
  }, [selectedGroup]);

  // Handle category switch
  const handleSelectCategory = (cat: RWRCategory) => {
    setCategory(cat);
    // Reset specific fields if not relevant
    if (!THRESHOLDS[cat].pointsBased) {
      setCheckedItems({});
    }
  };

  // Toggle checklist
  const toggleChecklistItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // CALCULATIONS FOR POINTS
  const points: PointsBreakdown = useMemo(() => {
    if (!isPointsBased) {
      return { age: 0, education: 0, experience: 0, language: 0, bonus: 0 };
    }

    const ageOptions = getAgeOptions(category);
    const agePoints = ageOptions.find((a) => a.value === age)?.points || 0;

    const eduOption = ALL_EDU_OPTIONS.find((e) => e.id === education && e.categories.includes(category));
    const eduPoints = eduOption ? eduOption.points : 0;

    const expOptions = getExpOptions(category);
    const expPoints = expOptions.find((e) => e.value === experience)?.points || 0;

    const germanPoints = GERMAN_OPTIONS.find((l) => l.value === germanLang)?.points || 0;
    const englishPoints = ENGLISH_OPTIONS.find((l) => l.value === englishLang)?.points || 0;
    const maxLang = category === "skilledWorker" || category === "otherKeyWorker" ? 25 : 20;
    const langPoints = Math.min(germanPoints + englishPoints, maxLang);

    let bonusTotal = 0;
    if (category === "jobseeker" || category === "veryHighlyQualified") {
      if (bonusStudyAustria) bonusTotal += 20;
      if (bonusPatent) bonusTotal += 10;
      if (bonusHighSalary) bonusTotal += 20;
    }
    if (category === "startup") {
      if (bonusStartupCapital) bonusTotal += 10;
      if (bonusStartupIncubator) bonusTotal += 10;
    }
    if (category === "otherKeyWorker" || category === "skilledWorker") {
      if (bonusEnglishCompany) bonusTotal += 5;
    }

    return {
      age: agePoints,
      education: eduPoints,
      experience: expPoints,
      language: langPoints,
      bonus: bonusTotal,
    };
  }, [
    category,
    isPointsBased,
    age,
    education,
    experience,
    germanLang,
    englishLang,
    bonusStudyAustria,
    bonusPatent,
    bonusHighSalary,
    bonusStartupCapital,
    bonusStartupIncubator,
    bonusEnglishCompany,
  ]);

  const totalPoints = points.age + points.education + points.experience + points.language + points.bonus;
  const maxPoints = threshold.max;
  const percentage = Math.min((totalPoints / maxPoints) * 100, 100);
  const isQualified = isPointsBased ? totalPoints >= threshold.min : false;
  const gap = Math.max(0, threshold.min - totalPoints);

  // Non-points checklist qualification evaluation
  const checklistData = useMemo(() => {
    if (isPointsBased) return null;
    const nonPointsKey = category as "graduates" | "selfEmployed" | "rwrPlus" | "blueCard";
    const items = CHECKLIST_MAP[nonPointsKey] || [];
    const totalItems = items.length;
    const passedCount = items.filter((item) => checkedItems[item.id]).length;
    const allPassed = totalItems > 0 && passedCount === totalItems;
    return { items, totalItems, passedCount, allPassed };
  }, [category, isPointsBased, checkedItems]);

  const resetForm = () => {
    setAge(null);
    setEducation(null);
    setExperience(null);
    setGermanLang(null);
    setEnglishLang(null);
    setBonusStudyAustria(false);
    setBonusPatent(false);
    setBonusHighSalary(false);
    setBonusStartupCapital(false);
    setBonusStartupIncubator(false);
    setBonusEnglishCompany(false);
    setCheckedItems({});
    toast.success("فرم با موفقیت بازنشانی شد.");
  };

  const generateWhatsAppMessage = (): string => {
    if (isPointsBased) {
      const statusEmoji = isQualified ? "✅" : "⚠️";
      const statusText = isQualified
        ? "واجد شرایط کامل (کسب حد نصاب لازم قانونی)"
        : `${gap} امتیاز کمتر از حد نصاب لازم (${threshold.min} امتیاز)`;

      return `
🇦🇹 *نتیجه سنجش امتیاز RWR اتریش ۲۰۲۶ — پورتال اتریش‌نشین*

📋 روش انتخابی: ${threshold.label}
⚖️ مبنای قانونی: ${threshold.paragraph}
🎯 امتیاز کسب‌شده: *${totalPoints} از ${maxPoints}* (حداقل لازم: ${threshold.min})
${statusEmoji} وضعیت صلاحیت: *${statusText}*

━━━━━━━━━━━━━━━━
📊 *ریز امتیازات:*
👤 سن: ${points.age} امتیاز
🎓 مدرک و تحصیلات: ${points.education} امتیاز
💼 سابقه کار مرتبط: ${points.experience} امتیاز
🗣️ زبان (آلمانی/انگلیسی): ${points.language} امتیاز
⭐ امتیازهای ویژه قانونی: ${points.bonus} امتیاز
━━━━━━━━━━━━━━━━

${isQualified
  ? "🎉 تبریک! شما واجد شرایط دریافت این روش مهاجرتی هستید. جهت آغاز اقدامات پرونده و بررسی چک‌لیست مدارک با کارشناسان اتریش‌نشین تماس بگیرید."
  : "📞 برای ارزیابی پرونده، راهکارهای جبران کسری امتیاز و مشاوره رایگان با ما در واتس‌اپ ارتباط بگیرید."}

🌐 اتریش‌نشین — همراه رسمی فارسی‌زبانان مقیم اتریش
      `.trim();
    } else {
      const nonPointsPassed = checklistData?.allPassed;
      return `
🇦🇹 *ارزیابی روش مهاجرتی بدون امتیاز RWR — پورتال اتریش‌نشین*

📋 روش انتخابی: ${threshold.label}
⚖️ مبنای حقوقی: ${threshold.paragraph}
✅ وضعیت انطباق با قوانین: *${nonPointsPassed ? "انطباق ۱۰۰٪ با شروط قانون NAG و AuslBG" : `${checklistData?.passedCount} از ${checklistData?.totalItems} شرط تکمیل شده`}*

💼 شرط درآمد و حقوق ۲۰۲۶: ${threshold.salaryCondition}
🏢 نوع دسترسی کاری: ${threshold.badge}

🌐 درخواست بررسی تخصصی مدارک در اتریش‌نشین
      `.trim();
    }
  };

  const sendToWhatsApp = () => {
    const text = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/436889763256?text=${text}`, "_blank");
  };

  const shareResult = async () => {
    const message = generateWhatsAppMessage();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "نتیجه سنجش امتیاز کارت RWR اتریش",
          text: message,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      navigator.clipboard.writeText(message);
      toast.success("متن کامل نتیجه در کلیپ‌بورد کپی شد!");
    }
  };

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "ماشین‌حساب امتیاز و روش‌های ویزای RWR اتریش ۲۰۲۶",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      description:
        "ارزیابی آنلاین تمامی ۹ روش خانواده ویزای کارت سرخ-سفید-سرخ اتریش شامل ویزای جستجوی کار، مشاغل کمبود، فارغ‌التحصیلان، استارتاپ و کارت آبی.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
  ];

  return (
    <>
      <SEO
        title="ماشین‌حساب امتیاز و کلیه روش‌های کارت RWR اتریش ۲۰۲۶ | اتریش‌نشین"
        description="سنجش امتیاز رسمی تمام ۹ روش مهاجرتی خانواده RWR اتریش: ویزای ۶ ماهه جستجوی کار (Jobseeker Visa)، مشاغل کمبود Mangelberufe، نخبگان، فارغ‌التحصیلان دانشگاهی، استارتاپ، کارت آبی و RWR Plus."
        keywords="RWR Card, کارت قرمز سفید قرمز, ویزای جستجوی کار اتریش, Jobseeker Visa اتریش, Mangelberufe, امتیاز RWR, ویزای کار اتریش, کارت آبی اتریش, فارغ التحصیلان اتریش, ویزای استارتاپ اتریش"
        schemaData={seoSchema}
      />

      <div className="space-y-6 font-sans" dir="rtl">
        {/* ========================================== */}
        {/* HERO HEADER */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-6 sm:p-10 text-white shadow-xl"
          style={{
            background: "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute -left-8 -bottom-12 text-[200px] opacity-5 pointer-events-none select-none">
            🇦🇹
          </div>

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              پوشش کامل ۹ روش رسمی خانواده کارت سرخ-سفید-سرخ اتریش (قوانین ۲۰۲۶)
            </div>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-black leading-tight text-white">
              سامانه جامع سنجش امتیاز و راهنمای رسمی
              <br />
              <span className="text-amber-300">روش‌های مهاجرتی خانواده RWR اتریش</span>
            </h1>

            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed max-w-2xl font-medium">
              از <strong>ویزای جستجوی کار ۶ ماهه نخبگان (Jobseeker Visa)</strong> بدون نیاز به کارفرما،
              تا <strong>مشاغل دارای کمبود (Mangelberufe)</strong>، <strong>مسیر معاف از امتیاز فارغ‌التحصیلان</strong>،
              <strong>استارتاپ نوآور</strong> و <strong>کارت آبی اتحادیه اروپا</strong> — صلاحیت خود را بر اساس جداول رسمی AuslBG و قانون NAG بسنجید.
            </p>

            <div className="flex items-center gap-4 pt-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>بر اساس مواد قانونی AuslBG و NAG و FPG</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>محاسبه و تحلیل آنی کمتر از ۲ دقیقه</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                <CheckCircle2 className="w-4 h-4 text-sky-300" />
                <span>شامل روش‌های امتیازی و معاف از امتیاز</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* CATEGORY FILTER TABS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#c8102e]" />
              <div>
                <h2 className="font-black text-stone-800 text-sm sm:text-base">
                  انتخاب یکی از ۹ مسیر مهاجرتی خانواده RWR اتریش
                </h2>
                <p className="text-[11px] text-stone-500 font-bold">
                  روش مورد نظر خود را جهت محاسبه امتیاز یا بررسی چک‌لیست شروط انتخاب کنید
                </p>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
              {[
                { id: "all", label: "همه ۹ روش" },
                { id: "jobsearch", label: "مسیر جستجوی کار" },
                { id: "points", label: "مسیرهای امتیازی" },
                { id: "pointsFree", label: "معاف از امتیاز (تحصیلی/بلوکارت)" },
                { id: "business", label: "استارتاپ و خوداشتغالی" },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGroup(g.id as any)}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer text-[11px] font-black ${
                    selectedGroup === g.id
                      ? "bg-[#c8102e] text-white shadow-sm"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-600"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayedCategories.map((catKey) => {
              const info = THRESHOLDS[catKey];
              const isSelected = category === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => handleSelectCategory(catKey)}
                  className={`text-right p-4 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                    isSelected
                      ? "border-[#c8102e] bg-gradient-to-br from-[#c8102e]/5 to-transparent shadow-md ring-1 ring-[#c8102e]/20"
                      : "border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${info.badgeColor}`}>
                        {info.badge}
                      </span>
                      {isSelected && <CheckCircle className="w-4 h-4 text-[#c8102e] shrink-0" />}
                    </div>

                    <div className="font-black text-xs sm:text-[13px] text-stone-900 leading-snug">
                      {info.label}
                    </div>
                    <div className="text-[10px] font-mono text-stone-400 mt-0.5 truncate">
                      {info.paragraph}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 space-y-1 text-[10px] text-stone-500 font-bold">
                    <div className="flex items-center justify-between">
                      <span>حالت ارزیابی:</span>
                      <span className="font-black text-stone-800">
                        {info.pointsBased ? `حداقل ${info.min} از ${info.max} امتیاز` : "معاف از امتیاز (چک‌لیست)"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>پیشنهاد کار از قبل:</span>
                      <span className={`font-black ${info.jobOfferRequired ? "text-amber-700" : "text-emerald-700"}`}>
                        {info.jobOfferRequired ? "الزامی است" : "نیازی نیست (کاریابی آزاد)"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* CURRENT SELECTION LEGAL DETAIL BANNER */}
        {/* ========================================== */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-stone-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-[10px] font-black px-2.5 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/40">
                <Compass className="w-3.5 h-3.5" />
                <span>بررسی تخصصی: {threshold.label}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">{threshold.germanLabel}</h3>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-white/10 text-amber-300 font-mono text-xs font-black border border-white/10">
                {threshold.salaryCondition}
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed font-medium">
            {threshold.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t border-stone-800 text-[11px] font-bold text-stone-300">
            {threshold.keyHighlights.map((hl, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* MAIN BODY: POINTS FORM OR CHECKLIST */}
        {/* ========================================== */}
        {isPointsBased ? (
          /* ==========================================
             POINTS CALCULATOR VIEW
             ========================================== */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              {/* --- 1. AGE --- */}
              <FormSection
                icon={<User className="w-4 h-4" />}
                title="سن متقاضی"
                subtitle={category === "jobseeker" || category === "veryHighlyQualified" ? "حداکثر ۲۰ امتیاز نخبگان" : "حداکثر ۱۵ امتیاز"}
                points={points.age}
                color="bg-blue-50 text-blue-700"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {getAgeOptions(category).map((opt) => (
                    <OptionButton
                      key={opt.value}
                      active={age === opt.value}
                      onClick={() => setAge(opt.value)}
                      label={opt.label}
                      sub={`${opt.points} امتیاز`}
                    />
                  ))}
                </div>
              </FormSection>

              {/* --- 2. EDUCATION --- */}
              <FormSection
                icon={<GraduationCap className="w-4 h-4" />}
                title="تحصیلات و مدارک تخصصی"
                subtitle="امتیازدهی رسمی AuslBG بر اساس مدرک"
                points={points.education}
                color="bg-purple-50 text-purple-700"
              >
                <div className="space-y-2">
                  {ALL_EDU_OPTIONS.filter((e) => e.categories.includes(category)).map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                        education === opt.id
                          ? "border-[#c8102e] bg-[#c8102e]/5"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="education"
                        checked={education === opt.id}
                        onChange={() => setEducation(opt.id)}
                        className="mt-1 accent-[#c8102e]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-black text-xs text-stone-800">{opt.label}</span>
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                              education === opt.id
                                ? "bg-[#c8102e] text-white"
                                : "bg-stone-100 text-stone-600"
                            }`}
                          >
                            {opt.points} امتیاز
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                          {opt.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </FormSection>

              {/* --- 3. EXPERIENCE --- */}
              <FormSection
                icon={<Briefcase className="w-4 h-4" />}
                title="سابقه کاری مرتبط با تخصص"
                subtitle="سابقه رسمی با گواهی کاری و بیمه"
                points={points.experience}
                color="bg-amber-50 text-amber-700"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {getExpOptions(category).map((opt) => (
                    <OptionButton
                      key={opt.value}
                      active={experience === opt.value}
                      onClick={() => setExperience(opt.value)}
                      label={opt.label}
                      sub={`${opt.points} امتیاز`}
                    />
                  ))}
                </div>
              </FormSection>

              {/* --- 4. GERMAN LANGUAGE --- */}
              <FormSection
                icon={<Languages className="w-4 h-4" />}
                title="زبان آلمانی (ÖSD / گوته)"
                subtitle="حداکثر ۱۵ امتیاز"
                points={GERMAN_OPTIONS.find((l) => l.value === germanLang)?.points || 0}
                color="bg-emerald-50 text-emerald-700"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {GERMAN_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      active={germanLang === opt.value}
                      onClick={() => setGermanLang(opt.value)}
                      label={opt.label}
                      sub={`${opt.points} امتیاز`}
                    />
                  ))}
                </div>
              </FormSection>

              {/* --- 5. ENGLISH LANGUAGE --- */}
              <FormSection
                icon={<Globe className="w-4 h-4" />}
                title="زبان انگلیسی (IELTS / TOEFL)"
                subtitle="حداکثر ۱۰ امتیاز"
                points={ENGLISH_OPTIONS.find((l) => l.value === englishLang)?.points || 0}
                color="bg-indigo-50 text-indigo-700"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {ENGLISH_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      active={englishLang === opt.value}
                      onClick={() => setEnglishLang(opt.value)}
                      label={opt.label}
                      sub={`${opt.points} امتیاز`}
                    />
                  ))}
                </div>
              </FormSection>

              {/* --- 6. BONUS OPTIONS --- */}
              <FormSection
                icon={<Star className="w-4 h-4" />}
                title="امتیازات ویژه قانونی (Bonus Points)"
                subtitle="امتیازهای اختصاصی بر اساس مفاد قانون AuslBG"
                points={points.bonus}
                color="bg-rose-50 text-rose-700"
              >
                <div className="space-y-3">
                  {(category === "jobseeker" || category === "veryHighlyQualified") && (
                    <>
                      <label className="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={bonusStudyAustria}
                          onChange={(e) => setBonusStudyAustria(e.target.checked)}
                          className="mt-1 accent-[#c8102e]"
                        />
                        <div>
                          <div className="text-xs font-black text-stone-800">
                            فارغ‌التحصیلی یا گذراندن حداقل ۱۸۰ واحد ECTS در اتریش (+۲۰ امتیاز)
                          </div>
                          <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                            تکمیل دوره دیپلم دوم یا کارشناسی ارشد در یکی از دانشگاه‌های معتبر اتریش
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={bonusPatent}
                          onChange={(e) => setBonusPatent(e.target.checked)}
                          className="mt-1 accent-[#c8102e]"
                        />
                        <div>
                          <div className="text-xs font-black text-stone-800">
                            ثبت اختراع (Patent) یا مقالات علمی بین‌المللی معتبر (+۱۰ امتیاز)
                          </div>
                          <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                            دارا بودن گواهی ثبت اختراع رسمی بین‌المللی یا جوایز معتبر علمی
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={bonusHighSalary}
                          onChange={(e) => setBonusHighSalary(e.target.checked)}
                          className="mt-1 accent-[#c8102e]"
                        />
                        <div>
                          <div className="text-xs font-black text-stone-800">
                            درآمد سالانه بیش از ۵۰٬۰۰۰ تا ۷۰٬۰۰۰ یورو در سال گذشته (+۲۰ امتیاز)
                          </div>
                          <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                            اثبات فیش‌های حقوقی و مالیات پرداختی در سمت مدیریتی یا تخصصی ارشد
                          </p>
                        </div>
                      </label>
                    </>
                  )}

                  {category === "startup" && (
                    <>
                      <label className="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={bonusStartupCapital}
                          onChange={(e) => setBonusStartupCapital(e.target.checked)}
                          className="mt-1 accent-[#c8102e]"
                        />
                        <div>
                          <div className="text-xs font-black text-stone-800">
                            سرمایه‌گذاری بیش از ۵۰٬۰۰۰ یورو در استارتاپ (+۱۰ امتیاز)
                          </div>
                          <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                            سرمایه نقدی ثبت شده فراتر از حداقل ۳۰ هزار یورو
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={bonusStartupIncubator}
                          onChange={(e) => setBonusStartupIncubator(e.target.checked)}
                          className="mt-1 accent-[#c8102e]"
                        />
                        <div>
                          <div className="text-xs font-black text-stone-800">
                            پذیرش در مراکز شتاب‌دهنده رسمی یا دریافت گرنت aws / FFG اتریش (+۱۰ امتیاز)
                          </div>
                          <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                            نامه رسمی قبولی در انکوباتورهای دانشگاهی اتریش نظیر INiTS
                          </p>
                        </div>
                      </label>
                    </>
                  )}

                  {(category === "skilledWorker" || category === "otherKeyWorker") && (
                    <label className="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={bonusEnglishCompany}
                        onChange={(e) => setBonusEnglishCompany(e.target.checked)}
                        className="mt-1 accent-[#c8102e]"
                      />
                      <div>
                        <div className="text-xs font-black text-stone-800">
                          زبان رسمی شرکت و سازمان مقصد انگلیسی است (+۵ امتیاز)
                        </div>
                        <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                          تاییدیه کتبی کارفرما مبنی بر اینکه زبان کاری پروژه انگلیسی می‌باشد
                        </p>
                      </div>
                    </label>
                  )}
                </div>
              </FormSection>
            </div>

            {/* ========================================== */}
            {/* SIDEBAR: LIVE POINTS RESULT */}
            {/* ========================================== */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                <motion.div
                  layout
                  className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c8102e]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

                  <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                      <Calculator className="w-5 h-5 text-[#c8102e]" />
                      <h3 className="font-black text-stone-800 text-sm">امتیاز زنده شما</h3>
                    </div>

                    <div className="text-center mb-4">
                      <motion.div
                        key={totalPoints}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-5xl font-black text-stone-900"
                      >
                        {totalPoints}
                      </motion.div>
                      <div className="text-xs font-black text-stone-400 mt-1">
                        از {maxPoints} امتیاز قانونی
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${
                            isQualified
                              ? "from-emerald-500 to-green-600"
                              : totalPoints >= threshold.min - 10
                              ? "from-amber-500 to-orange-500"
                              : "from-rose-500 to-red-600"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-[10px] font-black text-stone-400">
                        <span>۰</span>
                        <span className="text-[#c8102e]">حد نصاب قبولی: {threshold.min}</span>
                        <span>{maxPoints}</span>
                      </div>
                    </div>

                    {/* Status Box */}
                    <div
                      className={`rounded-2xl p-4 text-center ${
                        isQualified
                          ? "bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200"
                          : totalPoints > 0
                          ? "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200"
                          : "bg-stone-50 border border-stone-200"
                      }`}
                    >
                      {isQualified ? (
                        <>
                          <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                          <div className="font-black text-emerald-800 text-xs">
                            واجد شرایط کامل هستید! 🎉
                          </div>
                          <p className="text-[10px] text-emerald-700 font-bold mt-1 leading-relaxed">
                            امتیاز شما ({totalPoints}) به حد نصاب قانونی ({threshold.min}) رسیده است.
                          </p>
                        </>
                      ) : totalPoints > 0 ? (
                        <>
                          <AlertTriangle className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                          <div className="font-black text-amber-800 text-xs">
                            {gap} امتیاز تا حد نصاب قانونی کسری دارید
                          </div>
                          <p className="text-[10px] text-amber-700 font-bold mt-1 leading-relaxed">
                            با اخذ مدرک زبان بالاتر، سابقه کار یا امتیازات ویژه می‌توانید جبران کنید.
                          </p>
                        </>
                      ) : (
                        <>
                          <Info className="w-6 h-6 text-stone-400 mx-auto mb-1" />
                          <div className="font-black text-stone-600 text-xs">
                            گزینه‌ها را تکمیل نمایید
                          </div>
                          <p className="text-[10px] text-stone-500 font-bold mt-1">
                            امتیاز بر اساس فاکتورهای سن، تحصیلات، سابقه و زبان محاسبه می‌شود.
                          </p>
                        </>
                      )}
                    </div>

                    {/* Score Breakdown List */}
                    <div className="mt-4 space-y-2">
                      <BreakdownRow icon="👤" label="سن" value={points.age} max={category === "jobseeker" ? 20 : 15} />
                      <BreakdownRow icon="🎓" label="تحصیلات" value={points.education} max={category === "jobseeker" ? 40 : 30} />
                      <BreakdownRow icon="💼" label="سابقه کار" value={points.experience} max={20} />
                      <BreakdownRow icon="🗣️" label="زبان" value={points.language} max={category === "skilledWorker" ? 25 : 20} />
                      {points.bonus > 0 && (
                        <BreakdownRow icon="⭐" label="امتیازهای ویژه" value={points.bonus} max={20} />
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="mt-5 space-y-2">
                      <button
                        onClick={sendToWhatsApp}
                        disabled={totalPoints === 0}
                        className={`w-full flex items-center justify-center gap-2 font-black text-xs py-3 rounded-2xl transition-all cursor-pointer ${
                          totalPoints === 0
                            ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                            : "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg hover:scale-[1.02]"
                        }`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        ارسال پرونده و نتیجه به واتس‌اپ
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={resetForm}
                          className="flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black text-[11px] py-2.5 rounded-2xl transition cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          شروع مجدد
                        </button>
                        <button
                          onClick={shareResult}
                          disabled={totalPoints === 0}
                          className={`flex items-center justify-center gap-1.5 font-black text-[11px] py-2.5 rounded-2xl transition cursor-pointer ${
                            totalPoints === 0
                              ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                              : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                          }`}
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          اشتراک‌گذاری
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Free Consultation Card */}
                {totalPoints > 0 && (
                  <div className="bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] rounded-3xl p-5 text-white shadow-lg space-y-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      <h4 className="font-black text-sm text-white">مشاوره تخصصی و رایگان اتریش‌نشین</h4>
                    </div>
                    <p className="text-[11px] text-stone-300 font-medium leading-relaxed">
                      {isQualified
                        ? "تبریک! با کسب حد نصاب، مراحل تکمیل مدارک، ترجمه رسمی و اخذ نوبت سفارت یا MA35 را با همراهی تیم ما آغاز کنید."
                        : `کسری ${gap} امتیاز مانع شما نیست! کارشناسان ما مسیرهای جایگزین مانند جاب‌سیکر، بلوکارت یا تغییر رده شغلی را به شما پیشنهاد می‌دهند.`}
                    </p>
                    <button
                      onClick={sendToWhatsApp}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs py-3 rounded-2xl shadow-md hover:scale-[1.02] transition cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      گفتگو با کارشناس در واتس‌اپ
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ==========================================
             POINTS-FREE / QUALITATIVE CHECKLIST VIEW
             ========================================== */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <h3 className="font-black text-stone-900 text-sm sm:text-base flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      چک‌لیست بررسی احراز صلاحیت قانونی (بدون نیاز به جدول امتیازی)
                    </h3>
                    <p className="text-xs text-stone-500 font-bold mt-1">
                      این روش کاملاً معاف از سیستم امتیاز است. با فعال کردن شروط زیر، وضعیت واجد شرایط بودن خود را بررسی کنید:
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-black rounded-full border border-emerald-200">
                    Punktefrei
                  </span>
                </div>

                {/* Checklist Cards */}
                <div className="space-y-3">
                  {checklistData?.items.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer select-none ${
                          isChecked
                            ? "border-emerald-500 bg-emerald-50/40 shadow-xs"
                            : "border-stone-200 hover:border-stone-300 bg-stone-50/50"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? "bg-emerald-600 text-white"
                              : "border-2 border-stone-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <div className="font-black text-xs sm:text-sm text-stone-900">
                            {item.label}
                          </div>
                          <p className="text-[11px] text-stone-500 font-medium leading-relaxed">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legal Process Roadmap */}
              <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
                <h4 className="font-black text-stone-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#c8102e]" />
                  مراحل اجرایی پرونده در اتریش (نقشه راه قانونی)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="text-[10px] font-black text-[#c8102e] font-mono">مرحله ۱ • مدارک</div>
                    <div className="text-xs font-black text-stone-800">آماده‌سازی قرارداد و تایید مدارک</div>
                    <p className="text-[10px] text-stone-500 font-medium">ترجمه رسمی با مهر دادگستری و وزارت خارجه یا لگالیزاسیون</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="text-[10px] font-black text-[#c8102e] font-mono">مرحله ۲ • ثبت پرونده</div>
                    <div className="text-xs font-black text-stone-800">ارائه به سفارت یا اداره MA35</div>
                    <p className="text-[10px] text-stone-500 font-medium">بررسی استعلام امنیتی و ارسال پرونده به اداره کار AMS</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="text-[10px] font-black text-[#c8102e] font-mono">مرحله ۳ • صدور کارت</div>
                    <div className="text-xs font-black text-stone-800">اخذ کارت هوشمند اقامت</div>
                    <p className="text-[10px] text-stone-500 font-medium">صدور کارت اقامت ۲ ساله و شروع به کار قانونی در اتریش</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Sidebar Result */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-black text-stone-900 text-sm">وضعیت احراز شروط قانونی</h4>
                  </div>

                  <div className="text-center p-5 rounded-2xl bg-stone-50 border border-stone-200">
                    <div className="text-4xl font-black text-stone-900 font-mono">
                      {checklistData?.passedCount} / {checklistData?.totalItems}
                    </div>
                    <div className="text-xs font-bold text-stone-500 mt-1">
                      شرط قانونی تکمیل شده
                    </div>

                    <div className="mt-3">
                      {checklistData?.allPassed ? (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>۱۰۰٪ واجد شرایط طبق قانون NAG</span>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black">
                          تکمیل تمامی موارد بالا جهت تایید الزامی است
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-[11px] text-stone-600 font-bold border-t border-stone-100 pt-3">
                    <div className="flex justify-between">
                      <span>مدت اعتبار اولیه:</span>
                      <span className="font-black text-stone-900">۲ سال</span>
                    </div>
                    <div className="flex justify-between">
                      <span>تبدیل به RWR Plus:</span>
                      <span className="font-black text-emerald-700">پس از ۲ سال کار</span>
                    </div>
                    <div className="flex justify-between">
                      <span>حق کار همسر:</span>
                      <span className="font-black text-sky-700">کار ۱۰۰٪ آزاد و بدون قید</span>
                    </div>
                  </div>

                  <button
                    onClick={sendToWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs shadow-md hover:scale-[1.02] transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    ارسال پرونده و مشاوره رایگان واتس‌اپ
                  </button>

                  <button
                    onClick={resetForm}
                    className="w-full flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black text-[11px] py-2.5 rounded-2xl transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    بازنشانی چک‌لیست
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* COMPREHENSIVE 3-BOX SUMMARY */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard
            icon="🔍"
            title="ویزای جستجوی کار ۶ ماهه (Jobseeker)"
            text="نخبگان با کسب حداقل ۷۰ امتیاز می‌توانند بدون کارفرما و جاب‌آفر، ویزای نوع D اخذ کرده و ۶ ماه در خاک اتریش به مصاحبه حضوری بپردازند."
          />
          <InfoCard
            icon="🎓"
            title="فارغ‌التحصیلان دانشگاه‌های اتریش"
            text="دانش‌آموختگان لیسانس، فوق‌لیسانس و دکترا در اتریش نیازی به سیستم امتیاز ندارند و با جاب‌آفر مرتبط با رشته، کارت RWR دریافت می‌کنند."
          />
          <InfoCard
            icon="💎"
            title="کارت آبی اتحادیه اروپا (Blue Card)"
            text="تنها با مدرک دانشگاهی ۳ ساله یا ۳ سال سابقه IT و قرارداد با حقوق ناخالص سالانه حداقل €۴۵,۸۶۴ (۲۰۲۶) بدون جدول امتیازی صادر می‌شود."
          />
        </div>

        {/* ========================================== */}
        {/* FAQ SECTION */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4">
          <h3 className="font-black text-stone-800 text-sm sm:text-base flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#c8102e]" />
            سوالات متداول درباره روش‌های مهاجرتی خانواده RWR و ویزای جستجوی کار
          </h3>
          <div className="space-y-3">
            {[
              {
                q: "آیا برای ویزای جستجوی کار (Jobseeker Visa) اتریش حتماً جاب‌آفر نیاز است؟",
                a: "خیر! مزیت اصلی ویزای جستجوی کار (Visum D gem. § 24a FPG) این است که به جاب‌آفر یا اسپانسر نیاز ندارد. اگر بر اساس سن، مدرک تحصیلی، سابقه کار و زبان حداقل ۷۰ امتیاز کسب کنید، سفارت اتریش ویزای ۶ ماهه کاریابی به شما می‌دهد تا شخصاً در اتریش دنبال کار بگردید.",
              },
              {
                q: "پس از یافتن کار با ویزای جستجوی کار، چگونه به کارت RWR تبدیل می‌شود؟",
                a: "به محض اینکه در مدت ۶ ماه اقامت خود با یک کارفرمای اتریشی به توافق برسید و قرارداد متناسب منعقد کنید، درخواست کارت RWR مستقیماً به اداره مهاجرت (MA35 در وین یا Bezirkshauptmannschaft در سایر ایالت‌ها) تسلیم شده و بدون نیاز به آزمون نیروی کار جایگزین صادر می‌گردد.",
              },
              {
                q: "تفاوت کارت RWR با کارت RWR Plus چیست؟",
                a: "کارت RWR اولیه شما را به کارفرمای مشخص شده در قرارداد محدود می‌کند. اما کارت RWR Plus به شما اجازه کار ۱۰۰٪ آزاد (Freier Arbeitsmarktzugang) در کل اتریش بدون قید و شرط کارفرما را می‌دهد. پس از ۲۱ ماه کار قانونی با RWR، مستقیماً کارت Plus دریافت می‌کنید.",
              },
              {
                q: "آیا همسر و فرزندان دارنده کارت RWR اجازه کار آزاد دارند؟",
                a: "بله، اعضای درجه یک خانواده دارنده کارت RWR از همان ابتدا کارت سرخ-سفید-سرخ پلاس (RWR Plus) با اجازه کار کاملاً آزاد در هر شغل و کارفرمایی دریافت می‌کنند.",
              },
              {
                q: "کارت آبی اتریش (Blaue Karte EU) چه مزیتی نسبت به RWR دارد؟",
                a: "کارت آبی نیازی به محاسبه سن و جدول امتیازی ندارد. در صورتی که مدرک دانشگاهی ۳ ساله یا ۳ سال سابقه IT داشته باشید و قرارداد شما حداقل حقوق ناخالص سالانه ۴۵,۸۶۴ یورو را پوشش دهد، نیازی به شمارش امتیاز ندارید.",
              },
            ].map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* LEGAL DISCLAIMER */}
        {/* ========================================== */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
            <b>یادداشت حقوقی اتریش‌نشین:</b> محاسبات و شرایط فوق بر اساس آخرین اصلاحات قانون اشتغال اتباع خارجی (AuslBG)،
            قانون اقامت و اسکان اتریش (NAG) و قانون پلیس بیگانگان (FPG) در سال ۲۰۲۶ تنظیم شده است. تایید نهایی مدارک و صلاحیت
            شغلی منحصراً بر عهده اداره کار اتریش (AMS) و اداره اقامت (MA35 / BH) می‌باشد. جهت بررسی تخصصی مدارک، با کارشناسان اتریش‌نشین در ارتباط باشید.
          </p>
        </div>
      </div>
    </>
  );
};

// ==========================================
// SUB-COMPONENTS
// ==========================================
function FormSection({
  icon,
  title,
  subtitle,
  points,
  color,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  points: number;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <div>
            <h3 className="font-black text-stone-800 text-xs sm:text-sm">{title}</h3>
            <p className="text-[10px] text-stone-400 font-bold">{subtitle}</p>
          </div>
        </div>
        {points > 0 && (
          <motion.span
            key={points}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-[11px] font-black bg-[#c8102e]/10 text-[#c8102e] px-3 py-1 rounded-full shrink-0"
          >
            +{points} امتیاز
          </motion.span>
        )}
      </div>
      {children}
    </motion.div>
  );
}

function OptionButton({
  active,
  onClick,
  label,
  sub,
}: {
  key?: React.Key;
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-2xl border-2 text-right transition-all cursor-pointer flex flex-col justify-between ${
        active
          ? "border-[#c8102e] bg-[#c8102e]/5 shadow-sm ring-1 ring-[#c8102e]/20"
          : "border-stone-200 hover:border-stone-300 bg-white"
      }`}
    >
      <div className="font-black text-[11px] text-stone-800 leading-tight">{label}</div>
      <div
        className={`text-[9px] font-black mt-1.5 ${active ? "text-[#c8102e]" : "text-stone-400"}`}
      >
        {sub}
      </div>
    </button>
  );
}

function BreakdownRow({
  icon,
  label,
  value,
  max,
}: {
  icon: string;
  label: string;
  value: number;
  max: number;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{icon}</span>
      <span className="text-[10px] font-black text-stone-500 flex-1">{label}</span>
      <div className="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            pct > 66 ? "bg-emerald-500" : pct > 33 ? "bg-amber-400" : "bg-stone-300"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] font-black text-stone-700 w-6 text-left">{value}</span>
    </div>
  );
}

function InfoCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-5 space-y-2 shadow-xs">
      <div className="text-2xl">{icon}</div>
      <h4 className="font-black text-stone-800 text-xs sm:text-sm">{title}</h4>
      <p className="text-[11px] text-stone-500 font-bold leading-relaxed">{text}</p>
    </div>
  );
}

function FaqItem({
  q,
  a,
}: {
  key?: React.Key;
  q: string;
  a: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all ${
        open ? "border-[#c8102e]/30 bg-[#c8102e]/[0.02]" : "border-stone-200"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full p-3 flex items-center justify-between text-right cursor-pointer"
      >
        <span className="font-black text-[11px] text-stone-800 flex-1">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-stone-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-3 pb-3 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-2">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RWRPunterRechner;
