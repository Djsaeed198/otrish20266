import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Trophy,
  Briefcase,
  GraduationCap,
  CircleDollarSign,
  Rocket,
  Compass,
  ArrowRightLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Euro,
  FileCheck,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Search,
  Sliders,
  Filter,
  RefreshCw,
  Copy,
  PhoneCall,
  Send,
  Zap,
  ShieldCheck,
  Award,
  Layers,
  Scale,
  BookOpen,
  Building2,
  Check,
  X,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { toast } from "../utils/toast";

// ==========================================
// TYPES
// ==========================================
export interface UserAssessmentData {
  score?: number;
  age?: number;
  educationLevel?: string;
  germanLevel?: string;
  englishLevel?: string;
  experienceYears?: number;
  hasJobOffer?: boolean;
  currentJobField?: string;
  savingsAmount?: number;
  passiveIncome?: number;
  monthlyIncome?: number;
  austrianDegree?: boolean;
  mainGoal?: string;
  maritalStatus?: string;
  hasChildren?: boolean;
}

export interface AlternativeVisa {
  id: string;
  titleFa: string;
  titleDe: string;
  category: "work" | "study" | "financial" | "business" | "special";
  icon: any;
  gradient: string;
  badge: string;
  badgeColor: string;
  minPointsNeeded: number | null; // null if points-free
  pointsSystemName: string;
  requiresJobOffer: boolean;
  requiresGermanLevel: string; // "هیچ" | "A1" | "A2" | "B1" | "B2"
  processingWeeks: string;
  minFundsMonthly: string;
  familyReunification: string;
  workRights: string;
  legalBasis: string;
  summary: string;
  whyThisAlternative: (user: RequiredUserSpecs) => string;
  matchScoreCalculator: (user: RequiredUserSpecs) => {
    score: number;
    pros: string[];
    cons: string[];
    isTopAlternative: boolean;
  };
  keyPrerequisites: string[];
  conversionToPermanent: string;
  officialAuthority: string;
}

interface RequiredUserSpecs {
  score: number;
  age: number;
  educationLevel: string;
  germanLevel: string;
  englishLevel: string;
  experienceYears: number;
  hasJobOffer: boolean;
  currentJobField: string;
  savingsAmount: number;
  passiveIncome: number;
  austrianDegree: boolean;
}

interface SmartAlternativeVisaRecommenderProps {
  initialUserData?: UserAssessmentData;
  onRetest?: () => void;
  isEmbeddedInResults?: boolean;
}

// ==========================================
// MASTER ALTERNATIVE VISAS DATABASE
// ==========================================
const ALTERNATIVE_VISAS: AlternativeVisa[] = [
  {
    id: "job-seeker-d",
    titleFa: "مسیر جستجوی کار (Jobseeker Visa) — Visum D",
    titleDe: "Visum D für besonders Hochqualifizierte zur Arbeitsplatzsuche",
    category: "work",
    icon: Compass,
    gradient: "from-amber-500 via-orange-600 to-rose-600",
    badge: "پلان B بدون نیاز به جاب‌آفر از قبل",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    minPointsNeeded: 70,
    pointsSystemName: "جدول نخبگان (حداقل ۷۰ از ۱۰۰)",
    requiresJobOffer: false,
    requiresGermanLevel: "بدون شرط اجباری (انگلیسی کافیست)",
    processingWeeks: "۴ تا ۸ هفته",
    minFundsMonthly: "€۱,۲۰۰ ماهانه تمکن دوران جستجو",
    familyReunification: "پس از تبدیل به کارت RWR در اتریش",
    workRights: "حین جستجو حق کار ندارد؛ پس از یافتن جاب‌آفر فوراً تبدیل به RWR می‌شود",
    legalBasis: "§ 24a FPG (Fremdenpolizeigesetz)",
    summary:
      "اگر مدارک تحصیلی عالی و سابقه دارید ولی کارفرمایان اتریشی به خاطر نبودن در اتریش به شما جاب‌آفر نمی‌دهند، این ویزا به شما ۶ ماه اقامت قانونی در وین جهت مصاحبه‌های حضوری و استخدام می‌دهد.",
    whyThisAlternative: (u) => {
      if (!u.hasJobOffer && u.score >= 60) {
        return "بزرگترین مانع شما نداشتن جاب‌آفر است. با این ویزا بدون نیاز به کارفرما وارد اتریش می‌شوید و در خاک اتریش قرارداد می‌بندید.";
      }
      return "گزینه‌ای عالی برای شکستن بن‌بست مصاحبه از راه دور و تبدیل مستقیم به اقامت دائم بدون بازگشت به کشور مبدا.";
    },
    matchScoreCalculator: (u) => {
      let score = 50;
      const pros: string[] = [];
      const cons: string[] = [];

      if (!u.hasJobOffer) {
        score += 25;
        pros.push("بدون نیاز به پیشنهاد کار اولیه");
      }
      if (u.educationLevel === "phd" || u.educationLevel === "master") {
        score += 15;
        pros.push("تحصیلات عالی مناسب جهت احراز ۷۰ امتیاز نخبگان");
      } else {
        score -= 15;
        cons.push("برای رسیدن به حدنصاب ۷۰ امتیاز نیازمند ارشد یا سابقه سنگین هستید");
      }
      if (u.englishLevel === "advanced" || u.germanLevel !== "none") {
        score += 10;
        pros.push("امتیاز زبانی لازم را دارا هستید");
      }
      if (u.savingsAmount >= 15000) {
        score += 10;
        pros.push("تمکن کافی برای هزینه ۶ ماه اقامت در اتریش");
      } else {
        score -= 10;
        cons.push("نیاز به حداقل حدود ۱۲ تا ۱۵ هزار یورو تمکن مالی");
      }

      return {
        score: Math.min(98, Math.max(20, score)),
        pros,
        cons,
        isTopAlternative: !u.hasJobOffer && (u.educationLevel === "master" || u.educationLevel === "phd"),
      };
    },
    keyPrerequisites: [
      "احراز حداقل ۷۰ امتیاز نخبگان طبق جدول رسمی اتریش",
      "گواهی تمکن مالی به ازای ۶ ماه اقامت (حداقل €۱۰,۰۰۰ - €۱۲,۰۰۰)",
      "بیمه مسافرتی کامل شنگن با پوشش حداقل ۳۰ هزار یورو",
      "انگیزه‌نامه و برنامه جستجوی کار هدفمند در اتریش",
    ],
    conversionToPermanent: "تبدیل فوری به کارت RWR دو ساله به محض امضای قرارداد کاری معتبر",
    officialAuthority: "سفارت اتریش در تهران + بررسی صلاحیت امتیازی توسط AMS اتریش",
  },
  {
    id: "rwr-shortage-alt",
    titleFa: "کارت قرمز-سفید-قرمز مشاغل با کمبود نیرو (Mangelberufe)",
    titleDe: "Rot-Weiß-Rot – Karte für Fachkräfte in Mangelberufen",
    category: "work",
    icon: Briefcase,
    gradient: "from-emerald-600 to-teal-700",
    badge: "آستانه قبولی فقط ۵۵ امتیاز (کاهش ۱۵ امتیازی!)",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    minPointsNeeded: 55,
    pointsSystemName: "جدول مشاغل کمبود نیرو (فقط ۵۵ از ۱۰۰)",
    requiresJobOffer: true,
    requiresGermanLevel: "حداقل A1 یا انگلیسی B1 (بسته به رشته)",
    processingWeeks: "۶ تا ۱۰ هفته",
    minFundsMonthly: "تامین از طریق حداقل حقوق پایه اتحادیه (Kollektivvertrag)",
    familyReunification: "فوری و همزمان با متقاضی اصلی (RWR Plus برای همسر با حق کار آزاد)",
    workRights: "کارت اقامت و کار ۲ ساله مختص کارفرمای معین، پس از ۲ سال تبدیل به کارت آزاد",
    legalBasis: "§ 12a AuslBG (Ausländerbeschäftigungsgesetz)",
    summary:
      "اگر نمرات شما به حدنصاب ۷۰ نرسیده، اتریش سالانه فهرستی از بیش از ۱۰۰ شغل دارای کمبود حاد نیرو (IT، مهندسی، پرستاری، ساختمانی و فنی) منتشر می‌کند که ورود به آن با تنها ۵۵ امتیاز امکان‌پذیر است.",
    whyThisAlternative: (u) => {
      if (["it", "engineering", "medicine", "nursing"].includes(u.currentJobField)) {
        return `رشته شغلی شما (${u.currentJobField}) دقیقاً در لیست رسمی Mangelberufe ۲۰۲۵/۲۰۲۶ اتریش قرار دارد. این یعنی به جای ۷۰ امتیاز، تنها به ۵۵ امتیاز نیاز دارید!`;
      }
      return "با تطبیق عنوان شغلی یا دوره‌های مهندسی/فنی، آستانه قبولی از ۷۰ به ۵۵ امتیاز کاهش می‌یابد.";
    },
    matchScoreCalculator: (u) => {
      let score = 45;
      const pros: string[] = [];
      const cons: string[] = [];

      const isShortageField = ["it", "engineering", "medicine", "nursing"].includes(u.currentJobField);
      if (isShortageField) {
        score += 35;
        pros.push("رشته شما در لیست اولویت ملی اتریش است");
      } else {
        score -= 10;
        cons.push("رشته نیازمند انطباق با جدول سالانه کمبود نیرو است");
      }

      if (u.score >= 50 && u.score < 75) {
        score += 20;
        pros.push("امتیاز شما در محدوده ایده‌آل ۵۵ تا ۷۰ قرار دارد");
      }

      if (u.experienceYears >= 2) {
        score += 10;
        pros.push(`${u.experienceYears} سال سابقه کار تخصصی مستند`);
      }

      if (!u.hasJobOffer) {
        cons.push("نیاز به یافتن یک کارفرمای دارای قرارداد صنفی در اتریش");
      } else {
        score += 15;
        pros.push("دارای پیشنهاد کار اولیه");
      }

      return {
        score: Math.min(99, Math.max(30, score)),
        pros,
        cons,
        isTopAlternative: isShortageField && u.score >= 50,
      };
    },
    keyPrerequisites: [
      "پیشنهاد کار (Job Offer) در عنوان شغلی مندرج در لیست کمبود",
      "حقوق مطابق حداقل قانون کار صنفی اتریش (بدون بررسی تست بازار کار AMS)",
      "مدرک تحصیلی یا فنی معادل‌سازی شده در اتریش",
      "کسب حداقل ۵۵ امتیاز در فاکتورهای سن، تحصیلات، سابقه و زبان",
    ],
    conversionToPermanent: "تبدیل پس از ۲ سال به کارت RWR Plus (حق کار نامحدود نزد هر کارفرمایی در اتریش)",
    officialAuthority: "اداره مهاجرت اتریش (MA 35 در وین یا BH در ایالات) + تاییدیه سریع AMS",
  },
  {
    id: "eu-blue-card",
    titleFa: "کارت آبی اتریش (Blaue Karte EU)",
    titleDe: "Blaue Karte EU (Österreich)",
    category: "work",
    icon: Award,
    gradient: "from-blue-600 via-indigo-700 to-sky-800",
    badge: "بدون نیاز به جدول امتیازات (مستقل از سن!)",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    minPointsNeeded: null,
    pointsSystemName: "بدون سیستم امتیازی (معیار حقوق و مدرک)",
    requiresJobOffer: true,
    requiresGermanLevel: "الزامی نیست (بسته به زبان محیط شرکت)",
    processingWeeks: "۶ تا ۸ هفته",
    minFundsMonthly: "حقوق ناخالص سالانه حداقل €۴۵,۳۰۰+ (برای سال ۲۰۲۵/۲۰۲۶)",
    familyReunification: "فوری و بدون نیاز به مدرک زبان آلمانی A1 برای همسر!",
    workRights: "کارت اقامت دو ساله با امکان تحرک شغلی در کل اتحادیه اروپا پس از ۱۲ ماه",
    legalBasis: "§ 12b AuslBG + دستورالعمل اتحادیه اروپا ۲۰۲۱/۱۸۸۳",
    summary:
      "اگر سن شما بالای ۳۵ یا ۴۰ سال است و در سیستم RWR به خاطر افت امتیاز سن متضرر شده‌اید، بلوکارت هیچ سیستم امتیازی سن و زبانی ندارد! فقط داشتن مدرک دانشگاهی مرتبط و جاب‌آفر با حداقل حقوق قانونی کافی است.",
    whyThisAlternative: (u) => {
      if (u.age > 35) {
        return `سن شما (${u.age} سال) در سیستم RWR امتیاز کمتری دارد، اما کارت آبی اصلاً سیستم امتیازی ندارد و سن هیچ تاثیری در رد یا قبولی ندارد!`;
      }
      return "مسیر پرستیژدار اروپایی بدون نیاز به جدول امتیاز، با امکان جابجایی آسان بین کشورهای حوزه یورو بعد از یک سال.";
    },
    matchScoreCalculator: (u) => {
      let score = 40;
      const pros: string[] = [];
      const cons: string[] = [];

      if (u.educationLevel === "phd" || u.educationLevel === "master" || u.educationLevel === "bachelor") {
        score += 25;
        pros.push("مدرک دانشگاهی مورد نیاز (حداقل لیسانس ۳ ساله)");
      } else {
        score -= 25;
        cons.push("کارت آبی حتماً نیازمند مدرک کارشناسی یا ۳ سال سابقه معادل IT است");
      }

      if (u.age > 35) {
        score += 20;
        pros.push("دور زدن کسر امتیاز سن در سیستم RWR");
      }

      if (u.germanLevel === "none" && (u.englishLevel === "advanced" || u.englishLevel === "intermediate")) {
        score += 15;
        pros.push("بدون نیاز به مدرک آلمانی برای خود و همسر");
      }

      if (u.hasJobOffer) {
        score += 20;
        pros.push("پیشنهاد کاری موجود است");
      } else {
        cons.push("نیازمند جاب‌آفر با حداقل حقوق سالانه ناخالص حدود €۴۵,۳۰۰");
      }

      return {
        score: Math.min(97, Math.max(25, score)),
        pros,
        cons,
        isTopAlternative: u.age >= 35 && (u.educationLevel === "master" || u.educationLevel === "phd"),
      };
    },
    keyPrerequisites: [
      "قرارداد کاری حداقل ۶ ماهه با شرکتی در اتریش",
      "حقوق سالانه حداقل برابر میانگین درآمد ناخالص ملی اتریش (حدود €۴۵,۳۰۰ در ۲۰۲۵)",
      "مدرک دانشگاهی مرتبط با شغل پیشنهادی (یا ۳ سال سابقه معادل برای متخصصان IT)",
      "تاییدیه اولیه اداره کار اتریش (AMS)",
    ],
    conversionToPermanent: "اخذ اقامت دائم اتریش یا اقامت دائم اتحادیه اروپا (Daueraufenthalt-EU) پس از ۲۱ ماه (با مدرک B1) یا ۳۳ ماه",
    officialAuthority: "اداره اقامت محلی (Landeshauptmann / MA 35) با هماهنگی وزارت کار",
  },
  {
    id: "student-pathway",
    titleFa: "اقامت دانشجویی اتریش (Aufenthaltsbewilligung – Student)",
    titleDe: "Aufenthaltsbewilligung Studierende + Vorstudienlehrgang",
    category: "study",
    icon: GraduationCap,
    gradient: "from-violet-600 via-purple-700 to-indigo-800",
    badge: "بدون شرط سابقه کار + اجازه کار ۲۰ ساعت در هفته",
    badgeColor: "bg-violet-50 text-violet-800 border-violet-200",
    minPointsNeeded: null,
    pointsSystemName: "بدون سیستم امتیازی (بر اساس پذیرش دانشگاه)",
    requiresJobOffer: false,
    requiresGermanLevel: "پذیرش مشروط با A2 در کالج دولتی زبان وین (VWU)",
    processingWeeks: "۶ تا ۱۲ هفته",
    minFundsMonthly: "حدود €۱,۲۴۵ ماهانه در حساب بانکی متقاضی",
    familyReunification: "برای دانشجویان ارشد و دکترا قابل اقدام",
    workRights: "اجازه کار قانونی پاره‌وقت ۲۰ ساعت در هفته در حین تحصیل بدون تست مارکت",
    legalBasis: "§ 64 NAG (Niederlassungs- und Aufenthaltsgesetz)",
    summary:
      "اگر به دلیل کمبود سابقه کاری یا نداشتن جاب‌آفر شانس ویزای کاری ندارید، ورود از طریق ادامه تحصیل در دانشگاه‌های معتبر و ارزان دولتی اتریش بهترین پل ورود است؛ با حق ۲۰ ساعت کار هفتگی و تبدیل تضمینی به RWR پس از فراغت!",
    whyThisAlternative: (u) => {
      if (u.experienceYears < 2 || !u.hasJobOffer) {
        return "چون هنوز جاب‌آفر یا سابقه کار بالایی ندارید، ویزای تحصیلی امن‌ترین دروازه ورود است و پس از فارغ‌التحصیلی بدون نیاز به امتیاز، کارت RWR دریافت می‌کنید.";
      }
      return "شهریه بسیار پایین دانشگاه‌های دولتی اتریش (حدود ۷۵۰ یورو در ترم) و اجازه کار پاره‌وقت همزمان.";
    },
    matchScoreCalculator: (u) => {
      let score = 55;
      const pros: string[] = [];
      const cons: string[] = [];

      if (u.age <= 32) {
        score += 20;
        pros.push("سن مناسب برای پذیرش دانشگاهی و دریافت ویزای دانشجویی");
      } else if (u.age > 38) {
        score -= 15;
        cons.push("سن بالای ۳۸ سال شانس رد ویزای دانشجویی را در سفارت افزایش می‌دهد");
      }

      if (u.savingsAmount >= 15000) {
        score += 15;
        pros.push("تمکن مالی سالانه حدود ۱۲ تا ۱۵ هزار یورو در حساب موجود است");
      } else {
        score -= 10;
        cons.push("نیاز به اثبات موجودی نقدی یک سال زندگی در اتریش");
      }

      if (!u.hasJobOffer) {
        score += 15;
        pros.push("هیچ نیازی به جاب‌آفر یا اسپانسر کاری ندارد");
      }

      return {
        score: Math.min(96, Math.max(25, score)),
        pros,
        cons,
        isTopAlternative: u.age <= 30 && !u.hasJobOffer,
      };
    },
    keyPrerequisites: [
      "برگه اشتغال به تحصیل یا فارغ‌التحصیلی معتبر در مقطع پیشین",
      "پذیرش رسمی از یکی از دانشگاه‌های اتریش (دولتی یا خصوصی تاییدشده)",
      "تمکن مالی سالانه در حساب بانکی شخصی (حدود €۱۵,۰۰۰)",
      "قرارداد خوابگاه یا اجاره مسکن تاییدشده در اتریش (Wohnrechtsvereinbarung)",
    ],
    conversionToPermanent: "یک سال فرصت جستجوی کار پس از فارغ‌التحصیلی و تبدیل قطعی به کارت RWR فارغ‌التحصیلان بدون هیچ جدولی از امتیازات",
    officialAuthority: "سفارت اتریش در تهران و تایید نهایی شهرداری وین (MA 35) یا ادارات ایالتی",
  },
  {
    id: "solvency-residence",
    titleFa: "اقامت تمکن مالی (خود حمایتی) اتریش (Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit)",
    titleDe: "Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit",
    category: "financial",
    icon: CircleDollarSign,
    gradient: "from-amber-600 via-orange-600 to-amber-800",
    badge: "ویژه افراد با سرمایه و درآمد مستقل (بدون نیاز به کارمند بودن)",
    badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
    minPointsNeeded: null,
    pointsSystemName: "بدون جدول امتیاز (معیار سهمیه و درآمد غیرفعال)",
    requiresJobOffer: false,
    requiresGermanLevel: "مدرک پایه A1 زبان آلمانی یا مدرک دانشگاهی",
    processingWeeks: "۸ تا ۱۶ هفته (ثبت نام در ۲ ژانویه هر سال)",
    minFundsMonthly: "حدود €۲,۵۰۰ برای فرد مجرد / €۳,۸۰۰ برای متأهلان به صورت درآمد غیرفعال",
    familyReunification: "همزمان با خانواده (تحت همان سهمیه ایالتی)",
    workRights: "اجازه کارمندی در اتریش ندارد؛ مدیریت سرمایه شخصی و درآمد بین‌المللی آزاد است",
    legalBasis: "§ 44 NAG",
    summary:
      "برای کارآفرینان، بازنشستگان، سرمایه‌گذاران یا مالکان املاک که در خارج از اتریش درآمد اجاره، سود بانکی، حقوق بازنشستگی یا سود سهام دارند و می‌خواهند بدون استرس کاری در اتریش با خانواده زندگی کنند.",
    whyThisAlternative: (u) => {
      if (u.passiveIncome >= 1500 || u.savingsAmount >= 40000) {
        return `وضعیت مالی و پس‌انداز شما (€${u.savingsAmount.toLocaleString()}) این مسیر را به یک جایگزین لوکس و بی‌دردسر بدون وابستگی به هیچ کارفرمایی تبدیل کرده است.`;
      }
      return "بهترین انتخاب برای افراد بالای ۴۰ سال که تمکن نقدی یا ملکی دارند و نمی‌خواهند وارد بازی امتیاز ویزای کاری شوند.";
    },
    matchScoreCalculator: (u) => {
      let score = 30;
      const pros: string[] = [];
      const cons: string[] = [];

      if (u.savingsAmount >= 50000) {
        score += 35;
        pros.push(`پس‌انداز بسیار عالی (€${u.savingsAmount.toLocaleString()})`);
      } else if (u.savingsAmount >= 25000) {
        score += 15;
        pros.push("پس‌انداز نقدی اولیه قابل قبول");
      } else {
        score -= 20;
        cons.push("نیازمند حداقل ۳۰ تا ۵۰ هزار یورو پس‌انداز نقدی در بانک");
      }

      if (u.passiveIncome >= 1500) {
        score += 30;
        pros.push(`درآمد غیرفعال ماهانه مستند (€${u.passiveIncome.toLocaleString()})`);
      } else {
        cons.push("نیاز به اثبات سود بانکی، درآمد اجاره یا درآمد خارج از اتریش");
      }

      if (u.age >= 38) {
        score += 10;
        pros.push("سن مناسب و ثبات مالی خانوادگی");
      }

      return {
        score: Math.min(98, Math.max(15, score)),
        pros,
        cons,
        isTopAlternative: u.passiveIncome >= 1500 || u.savingsAmount >= 40000,
      };
    },
    keyPrerequisites: [
      "اثبات درآمد غیرفعال منظم ماهیانه ۲ برابر نرخ پایه رفاه اتریش",
      "پس‌انداز در حساب بانکی بین‌المللی یا اتریشی",
      "بیمه سلامت کامل خصوصی معتبر در اتریش (Private Krankenversicherung)",
      "قرارداد رسمی اجاره ملک یا خرید مسکن در اتریش با متراژ کافی برای خانواده",
      "مدرک زبان آلمانی A1 یا گواهی دانشگاهی",
    ],
    conversionToPermanent: "تمدید ۱ ساله، سپس ۱ ساله، سپس ۳ ساله و پس از ۵ سال دریافت اقامت دائم اتریش (Daueraufenthalt-EU)",
    officialAuthority: "اداره اقامت ایالتی (MA 35 وین یا فرمانداری ایالت‌های دیگر اتریش) در سهمیه سالانه",
  },
  {
    id: "startup-founder",
    titleFa: "ویزای استارتاپ و کارآفرینی نوآورانه (Start-Up Visum)",
    titleDe: "Rot-Weiß-Rot – Karte für Start-up-Gründer",
    category: "business",
    icon: Rocket,
    gradient: "from-sky-600 via-cyan-700 to-teal-800",
    badge: "ویژه ایده‌های نوآورانه + سرمایه فقط ۳۰,۰۰۰ یورو",
    badgeColor: "bg-sky-50 text-sky-800 border-sky-200",
    minPointsNeeded: 50,
    pointsSystemName: "جدول کارآفرینان استارتاپ (۵۰ از ۸۵ امتیاز)",
    requiresJobOffer: false,
    requiresGermanLevel: "اختیاری (انگلیسی B2 کفایت می‌کند)",
    processingWeeks: "۱۰ تا ۱۶ هفته",
    minFundsMonthly: "حداقل سرمایه اولیه ثبت شرکت €۳۰,۰۰۰ (نیمی از آن نقد)",
    familyReunification: "همزمان با متقاضی اصلی برای همسر و فرزندان",
    workRights: "مدیریت شرکت خودتان به عنوان سهامدار با حق کنترل بالای ۵۰٪",
    legalBasis: "§ 24 AuslBG",
    summary:
      "اگر صاحب ایده نوآورانه، محصول دیجیتال، اختراع، بیزینس مقیاس‌پذیر یا پلتفرم نرم‌افزاری هستید، اتریش به موسسان استارتاپ‌ها با حداقل ۳۰ هزار یورو سرمایه کارت RWR دو ساله اعطا می‌کند.",
    whyThisAlternative: (u) => {
      if (u.currentJobField === "it" || u.educationLevel === "master" || u.educationLevel === "phd") {
        return "با توجه به زمینه تخصصی شما، راه‌اندازی استارتاپ در وین یا گراتس با حمایت شتاب‌دهنده‌های اتریش دسترسی مستقیم به بازار ۴۵۰ میلیونی اروپا را برایتان فراهم می‌سازد.";
      }
      return "جایگزینی جذاب برای افرادی با روحیه کارآفرینی که نمی‌خواهند به کارفرما وابسته باشند.";
    },
    matchScoreCalculator: (u) => {
      let score = 40;
      const pros: string[] = [];
      const cons: string[] = [];

      if (u.currentJobField === "it" || u.educationLevel === "phd" || u.educationLevel === "master") {
        score += 25;
        pros.push("پروفایل علمی/فناوری مناسب جهت طرح استارتاپی");
      }

      if (u.savingsAmount >= 30000) {
        score += 25;
        pros.push("سرمایه نقدی اولیه حداقل ۳۰ هزار یورو موجود است");
      } else {
        score -= 15;
        cons.push("نیاز به حداقل ۳۰ هزار یورو سرمایه یا جذب سرمایه‌گذار اتریشی");
      }

      if (u.englishLevel === "advanced") {
        score += 10;
        pros.push("تسلط به زبان انگلیسی تجاری جهت دفاع از بیزینس‌پلن");
      }

      return {
        score: Math.min(95, Math.max(20, score)),
        pros,
        cons,
        isTopAlternative: u.savingsAmount >= 30000 && (u.currentJobField === "it" || u.educationLevel === "master"),
      };
    },
    keyPrerequisites: [
      "بیزینس‌پلن جامع و نوآورانه برای ارائه محصولات یا خدمات جدید",
      "اثبات کنترل فعال بر شرکت (حداقل ۵۰٪ سهم الشرکه)",
      "سرمایه حداقل €۳۰,۰۰۰ یا تاییدیه سرمایه‌گذار فرشته / انکوباتور رسمی اتریش",
      "کسب حداقل ۵۰ امتیاز از جدول اختصاصی ۸۵ امتیازی استارتاپ اتریش",
    ],
    conversionToPermanent: "تبدیل پس از ۲ سال به کارت RWR Plus (با شرط استخدام حداقل ۲ کارمند تمام‌وقت یا ۵۰ هزار یورو فروش سالانه)",
    officialAuthority: "سفارت اتریش + ارزیابی بیزینس‌پلان توسط AMS و آژانس پژوهش‌های اتریش (FFG)",
  },
  {
    id: "rwr-graduate-path",
    titleFa: "کارت قرمز-سفید-قرمز فارغ‌التحصیلان اتریش (RWR Absolventen)",
    titleDe: "Rot-Weiß-Rot – Karte für Absolventen österreichischer Hochschulen",
    category: "work",
    icon: GraduationCap,
    gradient: "from-indigo-600 via-blue-700 to-cyan-800",
    badge: "بدون نیاز به حتی یک امتیاز (امتیاز = صفر!)",
    badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    minPointsNeeded: null,
    pointsSystemName: "معافیت کامل از جدول امتیازات",
    requiresJobOffer: true,
    requiresGermanLevel: "بدون شرط جداگانه (بر اساس رشته)",
    processingWeeks: "۴ تا ۶ هفته",
    minFundsMonthly: "حقوق ناخالص ماهانه حداقل €۳,۱۳۲ (برای فارغ‌التحصیلان ارشد/دکترا ۲۰۲۵)",
    familyReunification: "فوری با کارت اقامت RWR Plus برای همسر",
    workRights: "کارت ۲ ساله با حق کار تخصصی مرتبط با رشته دانشگاهی",
    legalBasis: "§ 12 Abs. 1 AuslBG",
    summary:
      "هر فردی که از یکی از دانشگاه‌های اتریش در مقطع لیسانس یا فوق لیسانس فارغ‌التحصیل شود، از کل سیستم امتیازی معاف می‌شود و بلافاصله با یک جاب‌آفر استاندارد کارت RWR می‌گیرد.",
    whyThisAlternative: (u) => {
      if (u.austrianDegree) {
        return "شما دارای مدرک از اتریش هستید! این به معنای معافیت کامل از آزمون امتیازی است و فقط با ارائه جاب‌آفر می‌توانید کارت اقامت بگیرید.";
      }
      return "اگر ابتدا یک دوره ۱ یا ۲ ساله ارشد در اتریش بگذرانید، به طور خودکار به این مسیر طلایی و بدون نیاز به امتیاز متصل می‌شوید.";
    },
    matchScoreCalculator: (u) => {
      let score = 35;
      const pros: string[] = [];
      const cons: string[] = [];

      if (u.austrianDegree) {
        score = 99;
        pros.push("مدرک فارغ‌التحصیلی از اتریش دارید (مسیر تضمینی)");
      } else {
        cons.push("مستلزم گذراندن دوره تحصیلی در اتریش است");
      }

      if (u.hasJobOffer) {
        score += 20;
        pros.push("پیشنهاد شغلی اولیه آماده است");
      }

      return {
        score: Math.min(99, Math.max(20, score)),
        pros,
        cons,
        isTopAlternative: u.austrianDegree,
      };
    },
    keyPrerequisites: [
      "مدرک اتمام دوره Bachelor، Master یا PhD از دانشگاه یا Fachhochschule اتریش",
      "پیشنهاد شغلی متناسب با سطح مدرک و رشته فارغ‌التحصیلی",
      "حداقل حقوق قانونی ماهانه (€۳,۱۳۲ برای ارشد و €۲,۸۱۹ برای کارشناسی در ۲۰۲۵)",
      "بدون نیاز به آزمون بازار کار AMS (Ersatzkraftverfahren)",
    ],
    conversionToPermanent: "تبدیل پس از ۲ سال به کارت RWR Plus و سپس اقامت دائم",
    officialAuthority: "اداره اقامت اتریش (MA 35) با صدور فوری",
  },
  {
    id: "researcher-visa",
    titleFa: "اقامت پژوهشگران، اساتید و نخبگان علمی (Forscher)",
    titleDe: "Aufenthaltsbewilligung – Forscher (Host Agreement)",
    category: "special",
    icon: Layers,
    gradient: "from-teal-600 via-emerald-700 to-cyan-800",
    badge: "بدون نیاز به جدول امتیاز + صدور سریع",
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
    minPointsNeeded: null,
    pointsSystemName: "بدون سیستم امتیازی (بر اساس قرارداد میزبانی)",
    requiresJobOffer: true,
    requiresGermanLevel: "الزامی نیست (انگلیسی آکادمیک)",
    processingWeeks: "۳ تا ۶ هفته",
    minFundsMonthly: "تامین مالی توسط قرارداد پژوهشی یا فلوشیپ دانشگاهی",
    familyReunification: "فوری با کارت اقامت RWR Plus برای همسر و اجازه کار آزاد",
    workRights: "پژوهش و تدریس در موسسه تحقیقاتی یا دانشگاه با معافیت از قانون کار خارجی‌ها",
    legalBasis: "§ 67 NAG",
    summary:
      "برای محققان، دارندگان مدرک دکترا، یا پژوهشگرانی که با یک دانشگاه، پژوهشگاه یا دپارتمان تحقیق و توسعه (R&D) شرکتی در اتریش قرارداد میزبانی (Aufnahmevereinbarung) منعقد می‌کنند.",
    whyThisAlternative: (u) => {
      if (u.educationLevel === "phd" || u.educationLevel === "master") {
        return "با توجه به تحصیلات تکمیلی شما، فرصت‌های پژوهشی (Postdoc یا Research Fellow) در مراکز اتریش شما را بدون درگیر شدن در فرآیندهای طولانی وارد اقامت اروپا می‌کنند.";
      }
      return "مسیر سریع و پرستیژدار آکادمیک بدون وابستگی به جدول امتیازی سن و بدون استعلام بازار کار.";
    },
    matchScoreCalculator: (u) => {
      let score = 30;
      const pros: string[] = [];
      const cons: string[] = [];

      if (u.educationLevel === "phd") {
        score += 40;
        pros.push("مدرک دکترا (ایده‌آل‌ترین شرایط برای قرارداد پژوهشی)");
      } else if (u.educationLevel === "master") {
        score += 20;
        pros.push("مدرک کارشناسی ارشد قابل قبول برای پروژه‌های پژوهشی");
      } else {
        score -= 20;
        cons.push("این ویزا مستلزم تحصیلات دانشگاهی پژوهش‌محور است");
      }

      if (u.englishLevel === "advanced") {
        score += 15;
        pros.push("تسلط به زبان انگلیسی آکادمیک");
      }

      return {
        score: Math.min(95, Math.max(15, score)),
        pros,
        cons,
        isTopAlternative: u.educationLevel === "phd",
      };
    },
    keyPrerequisites: [
      "انعقاد قرارداد رسمی میزبانی پژوهشی (Aufnahmevereinbarung)",
      "تاییدیه موسسه یا دانشگاه ثبت‌شده در وزارت آموزش و پژوهش اتریش",
      "تضمین پوشش هزینه‌های زندگی و مسکن از طریق بودجه پروژه",
    ],
    conversionToPermanent: "تبدیل پس از اتمام پروژه به کارت جستجوی کار یا کارت RWR Plus",
    officialAuthority: "ادارات اقامت اتریش با اولویت بررسی فوری آکادمیک",
  },
  {
    id: "artist-residence",
    titleFa: "اقامت هنرمندی اتریش (Niederlassungsbewilligung – Künstler)",
    titleDe: "Niederlassungsbewilligung – Künstler gem. § 43a NAG",
    category: "special",
    icon: Sparkles,
    gradient: "from-purple-600 via-pink-700 to-rose-800",
    badge: "ویژه هنرمندان بدون نیاز به سیستم امتیازدهی و تست مارکت",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    minPointsNeeded: null,
    pointsSystemName: "معاف از جدول امتیازات (سنجش صلاحیت هنری و پورتفولیو)",
    requiresJobOffer: false,
    requiresGermanLevel: "بدون شرط زبانی الزامی در شروع (A1 توصیه می‌شود)",
    processingWeeks: "۸ تا ۱۲ هفته",
    minFundsMonthly: "تامین حداقل €۱,۲۵۰ ماهانه از فعالیت هنری یا قراردادهای معتبر",
    familyReunification: "قابل اقدام برای همسر و فرزندان تحت ضوابط قانون اقامت اتریش",
    workRights: "فعالیت هنری مستقل (Selbständig) یا استخدامی (Unselbständig) در تمام زمینه‌های هنری",
    legalBasis: "§ 43a NAG (Niederlassungs- und Aufenthaltsgesetz)",
    summary:
      "برای هنرمندان رشته‌های موسیقی، هنرهای تجسمی، نقاشی، عکاسی، سینما، تئاتر، ادبیات و طراحی که دارای رزومه مستند، سوابق نمایشگاهی، آثار منتشرشده یا قرارداد با گالری‌ها و فستیوال‌های اتریش هستند.",
    whyThisAlternative: (u) => {
      if (u.currentJobField === "art" || u.currentJobField === "media" || u.currentJobField === "architecture") {
        return "با توجه به زمینه هنری یا خلاقانه شما، این ویزا شما را از پیچیدگی‌های نمره سن و زبان در سیستم RWR معاف کرده و مسیری اختصاصی فراهم می‌کند.";
      }
      return "مسیر استثنایی برای فعالان هنری بدون نیاز به اثبات سرمایه‌گذاری سنگین و بدون وابستگی به جاب‌آفر کارمندی.";
    },
    matchScoreCalculator: (u) => {
      let score = 35;
      const pros: string[] = [];
      const cons: string[] = [];

      if (u.currentJobField === "art" || u.currentJobField === "media") {
        score += 45;
        pros.push("زمینه تخصصی منطبق با جامعه هنری و فرهنگی اتریش");
      } else {
        cons.push("نیازمند ارائه پورتفولیو و گواهی‌های معتبر فعالیت حرفه‌ای هنری");
      }

      if (u.savingsAmount >= 20000) {
        score += 15;
        pros.push("پشتوانه مالی مناسب جهت استقرار و فعالیت هنری در اتریش");
      }

      if (u.germanLevel !== "none") {
        score += 10;
        pros.push("آشنایی با زبان آلمانی جهت عقد قرارداد با گالری‌ها و تئاترها");
      }

      return {
        score: Math.min(97, Math.max(20, score)),
        pros,
        cons,
        isTopAlternative: u.currentJobField === "art" || u.currentJobField === "media",
      };
    },
    keyPrerequisites: [
      "پورتفولیو و کاتالوگ آثار هنری با سوابق نمایشگاهی، جوایز یا آثار رسمی منتشرشده",
      "قرارداد، پیش‌قرارداد، تفاهمنامه یا دعوتنامه معتبر از گالری، فستیوال، ناشر یا ارکستر در اتریش",
      "اثبات درآمد مستقل یا تضمین‌شده از محل هنر برابر با حداقل نرخ استاندارد رفاهی ASVG",
      "بیمه سلامت جامع معتبر در اتریش (SVS یا بیمه خصوصی تاییدشده)",
    ],
    conversionToPermanent: "تمدید سالانه و پس از ۲ سال امکان تبدیل به کارت RWR Plus و پس از ۵ سال اقامت دائم اتحادیه اروپا (Daueraufenthalt-EU)",
    officialAuthority: "ادارات اقامت استانی اتریش (MA 35 وین یا فرمانداری ایالت مربوطه) با استعلام از کارشناسان هنر",
  },
  {
    id: "permanent-eu-residence",
    titleFa: "اقامت دائم اتریش – (Austria Daueraufenthalt – EU)",
    titleDe: "Daueraufenthalt – EU gem. § 45 NAG",
    category: "special",
    icon: ShieldCheck,
    gradient: "from-amber-600 via-rose-700 to-red-800",
    badge: "اقامت ۵ ساله نامحدود + حقوق برابر شهروندان",
    badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
    minPointsNeeded: null,
    pointsSystemName: "سنجش ۵ سال اقامت قانونی + مدرک ادغام B1",
    requiresJobOffer: false,
    requiresGermanLevel: "مدرک رسمی زبان آلمانی سطح B1 (ماژول ۲ موافقتنامه ادغام)",
    processingWeeks: "۶ تا ۱۰ هفته",
    minFundsMonthly: "اثبات درآمد مستقل و پایدار خانوار بدون استفاده از خدمات سوسیال",
    familyReunification: "صدور کارت دائم مستقل برای اعضای واجد شرایط خانواده",
    workRights: "حق اشتغال و خوداشتغالی ۱۰۰٪ آزاد در سراسر اتریش و امکان اقامت در سایر کشورهای اتحادیه اروپا",
    legalBasis: "§ 45 NAG iVm دستورالعمل ۲۰۰۳/۱۰۹/EC اتحادیه اروپا",
    summary:
      "عالی‌ترین وضعیت اقامتی در اتریش پیش از دریافت پاسپورت و تابعیت، با اعتبار ۵ ساله کارتی و امکان تردد، اقامت و کار آزاد در کل کشورهای عضو اتحادیه اروپا با حقوق برابر با شهروندان اتریش.",
    whyThisAlternative: (u) => {
      if (u.score >= 70 || u.hasJobOffer) {
        return "تمام مسیرهای کاری و اقامتی شما نهایتاً به این ایستگاه طلایی ختم می‌شوند؛ با برنامه‌ریزی زبانی و حفظ درآمد، این هدف نهایی شماست.";
      }
      return "هدف غایی تمام مهاجران مقیم اتریش جهت تثبیت مادام‌العمر وضعیت اقامت و امنیت خانوادگی در خاک اروپا.";
    },
    matchScoreCalculator: (u) => {
      let score = 40;
      const pros: string[] = [];
      const cons: string[] = [];

      if (u.germanLevel === "b1" || u.germanLevel === "b2" || u.germanLevel === "c1") {
        score += 30;
        pros.push("مدرک زبان آلمانی در سطح B1 یا بالاتر (شرط الزامی ماژول ۲)");
      } else {
        cons.push("نیازمند قبولی در آزمون زبان B1 ادغام اتریش (ÖIF Integrationsprüfung)");
      }

      if (u.experienceYears >= 4) {
        score += 20;
        pros.push("سابقه اشتغال و پرداخت مالیات پیوسته در سابقه حرفه‌ای");
      }

      return {
        score: Math.min(99, Math.max(25, score)),
        pros,
        cons,
        isTopAlternative: (u.germanLevel === "b1" || u.germanLevel === "b2" || u.germanLevel === "c1") && u.experienceYears >= 4,
      };
    },
    keyPrerequisites: [
      "۵ سال اقامت قانونی، پیوسته و بدون وقفه در اتریش با کارت‌های معتبر",
      "گواهی قبولی در آزمون ادغام ماژول ۲ اتریش (ÖIF B1 Integrationsprüfung)",
      "اثبات درآمد مستقل و بدون اتکا به سوسیال در ۱۲ ماه گذشته",
      "نداشتن هرگونه سابقه کیفری و داشتن مسکن قانونی استاندارد",
    ],
    conversionToPermanent: "پایدارترین وضعیت اقامت دائم در اتریش با قابلیت اقدام برای اخذ تابعیت و پاسپورت اتریش پس از ۶ یا ۱۰ سال",
    officialAuthority: "ادارات اقامت فدرال (MA 35 وین یا فرمانداری ایالات Bezirkshauptmannschaft)",
  },
];

// ==========================================
// COMPONENT
// ==========================================
export default function SmartAlternativeVisaRecommender({
  initialUserData,
  onRetest,
  isEmbeddedInResults = false,
}: SmartAlternativeVisaRecommenderProps) {
  // Spec state (starts from initialUserData or defaults)
  const [userScore, setUserScore] = useState<number>(initialUserData?.score ?? 60);
  const [userAge, setUserAge] = useState<number>(initialUserData?.age ?? 32);
  const [educationLevel, setEducationLevel] = useState<string>(initialUserData?.educationLevel ?? "master");
  const [germanLevel, setGermanLevel] = useState<string>(initialUserData?.germanLevel ?? "none");
  const [englishLevel, setEnglishLevel] = useState<string>(initialUserData?.englishLevel ?? "intermediate");
  const [experienceYears, setExperienceYears] = useState<number>(initialUserData?.experienceYears ?? 3);
  const [hasJobOffer, setHasJobOffer] = useState<boolean>(initialUserData?.hasJobOffer ?? false);
  const [currentJobField, setCurrentJobField] = useState<string>(initialUserData?.currentJobField ?? "it");
  const [savingsAmount, setSavingsAmount] = useState<number>(initialUserData?.savingsAmount ?? 20000);
  const [passiveIncome, setPassiveIncome] = useState<number>(initialUserData?.passiveIncome ?? 0);
  const [austrianDegree, setAustrianDegree] = useState<boolean>(initialUserData?.austrianDegree ?? false);

  // Filters & UI state
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [filterNoJobOfferOnly, setFilterNoJobOfferOnly] = useState<boolean>(false);
  const [filterNoGermanOnly, setFilterNoGermanOnly] = useState<boolean>(false);
  const [showTuner, setShowTuner] = useState<boolean>(!isEmbeddedInResults);
  const [selectedVisaForDetails, setSelectedVisaForDetails] = useState<AlternativeVisa | null>(null);
  const [compareVisaA, setCompareVisaA] = useState<string>("job-seeker-d");
  const [compareVisaB, setCompareVisaB] = useState<string>("rwr-shortage-alt");
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  // Consolidated user object for calculators
  const userSpecs: RequiredUserSpecs = useMemo(() => {
    return {
      score: userScore,
      age: userAge,
      educationLevel,
      germanLevel,
      englishLevel,
      experienceYears,
      hasJobOffer,
      currentJobField,
      savingsAmount,
      passiveIncome,
      austrianDegree,
    };
  }, [
    userScore,
    userAge,
    educationLevel,
    germanLevel,
    englishLevel,
    experienceYears,
    hasJobOffer,
    currentJobField,
    savingsAmount,
    passiveIncome,
    austrianDegree,
  ]);

  // Ranked alternative visas
  const rankedVisas = useMemo(() => {
    const list = ALTERNATIVE_VISAS.map((visa) => {
      const match = visa.matchScoreCalculator(userSpecs);
      const why = visa.whyThisAlternative(userSpecs);
      return {
        ...visa,
        matchScore: match.score,
        pros: match.pros,
        cons: match.cons,
        isTopAlternative: match.isTopAlternative,
        smartReasoning: why,
      };
    });

    // Sort by match score descending
    list.sort((a, b) => b.matchScore - a.matchScore);

    return list;
  }, [userSpecs]);

  // Filtered visas
  const filteredVisas = useMemo(() => {
    return rankedVisas.filter((v) => {
      if (activeCategoryFilter !== "all" && v.category !== activeCategoryFilter) {
        return false;
      }
      if (filterNoJobOfferOnly && v.requiresJobOffer) {
        return false;
      }
      if (filterNoGermanOnly && v.requiresGermanLevel.includes("B1") && !v.requiresGermanLevel.includes("انگلیسی")) {
        return false;
      }
      return true;
    });
  }, [rankedVisas, activeCategoryFilter, filterNoJobOfferOnly, filterNoGermanOnly]);

  // Top recommendation
  const topAlternative = rankedVisas[0];

  // Quick Preset Scenarios
  const applyPreset = (presetName: string) => {
    if (presetName === "no-job-offer") {
      setHasJobOffer(false);
      setUserScore(62);
      setEducationLevel("master");
      setFilterNoJobOfferOnly(true);
      toast.success("سناریوی «بدون جاب‌آفر» با تحصیلات ارشد اعمال شد");
    } else if (presetName === "it-shortage") {
      setCurrentJobField("it");
      setUserScore(58);
      setExperienceYears(4);
      setHasJobOffer(false);
      setFilterNoJobOfferOnly(false);
      toast.success("سناریوی «متخصص IT در مشاغل کمیاب با ۵۸ امتیاز» اعمال شد");
    } else if (presetName === "age-over-38") {
      setUserAge(41);
      setUserScore(48);
      setEducationLevel("master");
      setExperienceYears(12);
      setSavingsAmount(35000);
      toast.success("سناریوی «سن بالای ۴۰ سال + بلوکارت و تمکن مالی» اعمال شد");
    } else if (presetName === "wealth-passive") {
      setPassiveIncome(2200);
      setSavingsAmount(65000);
      setUserAge(46);
      setUserScore(42);
      toast.success("سناریوی «درآمد غیرفعال و اقامت تمکن مالی» اعمال شد");
    }
  };

  // Quick Boost Simulation
  const simulateBoost = (type: "germanB1" | "jobOffer" | "savings") => {
    if (type === "germanB1") {
      setGermanLevel("b1");
      setUserScore((prev) => Math.min(95, prev + 15));
      toast.success("شبیه‌سازی: آلمانی B1 اضافه شد (+۱۵ امتیاز شانس)");
    } else if (type === "jobOffer") {
      setHasJobOffer(true);
      setUserScore((prev) => Math.min(98, prev + 20));
      toast.success("شبیه‌سازی: جاب‌آفر معتبر اتریش اضافه شد (+۲۰ امتیاز و باز شدن قفل ویزاها)");
    } else if (type === "savings") {
      setSavingsAmount((prev) => prev + 25000);
      toast.success("شبیه‌سازی: افزایش ۲۵,۰۰۰ یورویی پس‌انداز اعمال شد");
    }
  };

  // Copy full recommendation report
  const handleCopyReport = () => {
    const text = `📋 گزارش پیشنهادات هوشمند ویزاهای جایگزین اتریش (اتریش‌نشین)
=====================================
👤 پروفایل ارزیابی متقاضی:
• سن: ${userAge} سال
• مدرک تحصیلی: ${educationLevel}
• امتیاز کسب‌شده: ${userScore} از ۱۰۰
• وضعیت پیشنهاد کار (Job Offer): ${hasJobOffer ? "دارد" : "ندارد"}
• رشته تخصصی: ${currentJobField}
• سطح زبان آلمانی: ${germanLevel} | انگلیسی: ${englishLevel}
• پس‌انداز: €${savingsAmount.toLocaleString()}

🏆 برترین ویزاهای جایگزین پیشنهادی الگوریتم:
${rankedVisas
  .slice(0, 3)
  .map(
    (v, i) =>
      `${i + 1}. ${v.titleFa}
   - درصد تطابق با شرایط شما: ${v.matchScore}٪
   - دلیل انتخاب: ${v.smartReasoning}
   - پیش‌نیاز کلیدی: ${v.keyPrerequisites[0]}`
  )
  .join("\n\n")}

💡 شبیه‌سازی اختصاصی در پلتفرم جامع اتریش‌نشین`;

    navigator.clipboard.writeText(text);
    toast.success("گزارش ویزاهای جایگزین با موفقیت کپی شد!");
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* ========================================== */}
      {/* HERO BANNER & HEADER */}
      {/* ========================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e1512] via-[#2f1013] to-[#800d1e] p-6 md:p-8 text-white shadow-xl border border-rose-950/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-full text-xs font-black backdrop-blur-md transition-all">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              موتور تطبیق هوشمند ویزاهای جایگزین اتریش
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTuner(!showTuner)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 border border-white/20 rounded-full text-xs font-black backdrop-blur-md transition-all"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-300" />
                {showTuner ? "بستن تنظیمات امتیاز" : "تنظیم دستی امتیازات"}
              </button>
              {onRetest && (
                <button
                  onClick={onRetest}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 border border-white/20 rounded-full text-xs font-black backdrop-blur-md transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-white" />
                  آزمون مجدد ۶ مرحله‌ای
                </button>
              )}
            </div>
          </div>

          <h2 className="text-xl md:text-3xl font-black leading-tight tracking-tight mb-2">
            ویزاهای جایگزین متناسب با امتیازات و مشخصات شما
          </h2>
          <p className="text-xs md:text-sm text-stone-200 font-bold leading-relaxed max-w-3xl">
            اگر در آزمون امتیاز کافی برای ویزای اولویت اول نیاورده‌اید یا جاب‌آفر ندارید، سیستم مهاجرت اتریش مسیرهای
            موازی قانونی متعددی ارائه می‌دهد. این ابزار با تحلیل شرایط شما بهترین «پلان B» و راهکارهای میانبر را محاسبه می‌کند.
          </p>

          {/* Quick Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/15">
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/10">
              <div className="text-[10px] font-bold text-white/70">امتیاز پایه ارزیابی شما</div>
              <div className="text-xl md:text-2xl font-black font-mono text-amber-300 mt-0.5" dir="ltr">
                {userScore} / 100
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/10">
              <div className="text-[10px] font-bold text-white/70">تعداد ویزاهای تحلیل‌شده</div>
              <div className="text-xl md:text-2xl font-black font-mono text-white mt-0.5" dir="ltr">
                {ALTERNATIVE_VISAS.length} ویزا
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/10">
              <div className="text-[10px] font-bold text-white/70">بهترین پیشنهاد جایگزین</div>
              <div className="text-xs md:text-sm font-black text-emerald-300 mt-1 truncate">
                {topAlternative.titleFa.split("—")[0].split("(")[0]}
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/10">
              <div className="text-[10px] font-bold text-white/70">حداکثر شانس تطابق</div>
              <div className="text-xl md:text-2xl font-black font-mono text-emerald-300 mt-0.5" dir="ltr">
                {topAlternative.matchScore}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* QUICK PRESETS & BOOST SIMULATOR */}
      {/* ========================================== */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-black text-stone-900">سناریوهای شبیه‌ساز سریع (تغییر آنی وضعیت)</h3>
          </div>
          <span className="text-[11px] font-bold text-stone-500">
            روی هر سناریو کلیک کنید تا تاثیر آن را بر ویزاهای جایگزین ببینید
          </span>
        </div>

        {/* Preset scenario buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            onClick={() => applyPreset("no-job-offer")}
            className="flex items-start gap-2.5 p-3 rounded-2xl border-2 border-amber-200/80 bg-amber-50/50 hover:bg-amber-100/70 hover:border-amber-400 text-right transition-all group"
          >
            <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-stone-900">بدون جاب‌آفر اتریش</div>
              <div className="text-[10px] text-stone-500 font-bold mt-0.5">ویزای ۶ ماهه جستجوی کار D</div>
            </div>
          </button>

          <button
            onClick={() => applyPreset("it-shortage")}
            className="flex items-start gap-2.5 p-3 rounded-2xl border-2 border-emerald-200/80 bg-emerald-50/50 hover:bg-emerald-100/70 hover:border-emerald-400 text-right transition-all group"
          >
            <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-stone-900">مشاغل کمیاب (IT/مهندسی)</div>
              <div className="text-[10px] text-stone-500 font-bold mt-0.5">قبولی با آستانه تنها ۵۵ امتیاز</div>
            </div>
          </button>

          <button
            onClick={() => applyPreset("age-over-38")}
            className="flex items-start gap-2.5 p-3 rounded-2xl border-2 border-blue-200/80 bg-blue-50/50 hover:bg-blue-100/70 hover:border-blue-400 text-right transition-all group"
          >
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-stone-900">سن بالای ۳۸ سال</div>
              <div className="text-[10px] text-stone-500 font-bold mt-0.5">بلوکارت اروپا بدون امتیاز سن</div>
            </div>
          </button>

          <button
            onClick={() => applyPreset("wealth-passive")}
            className="flex items-start gap-2.5 p-3 rounded-2xl border-2 border-purple-200/80 bg-purple-50/50 hover:bg-purple-100/70 hover:border-purple-400 text-right transition-all group"
          >
            <div className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <CircleDollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-stone-900">سرمایه و درآمد مستقل</div>
              <div className="text-[10px] text-stone-500 font-bold mt-0.5">اقامت تمکن مالی بدون کارمندی</div>
            </div>
          </button>
        </div>

        {/* Quick 1-click Boost actions */}
        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-black text-stone-700 ml-2">ارتقای سریع پروفایل:</span>
          <button
            onClick={() => simulateBoost("germanB1")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-black transition-colors"
          >
            <span>🇩🇪 اگر مدرک آلمانی B1 بگیرم؟</span>
            <span className="text-emerald-600 font-mono">+۱۵٪</span>
          </button>
          <button
            onClick={() => simulateBoost("jobOffer")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-black transition-colors"
          >
            <span>💼 اگر یک جاب‌آفر اتریشی پیدا کنم؟</span>
            <span className="text-emerald-600 font-mono">+۲۰٪</span>
          </button>
          <button
            onClick={() => simulateBoost("savings")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-black transition-colors"
          >
            <span>💶 افزایش ۲۵ هزار یورو پس‌انداز</span>
            <span className="text-amber-600 font-mono">+تمکن</span>
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* INTERACTIVE SCORE TUNER DRAWER */}
      {/* ========================================== */}
      <AnimatePresence>
        {showTuner && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-stone-50 rounded-3xl border border-stone-200 p-5 md:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#c8102e]" />
                  <h3 className="text-sm font-black text-stone-900">
                    داشبورد متغیرهای امتیاز و پروفایل شما
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-stone-500">
                  با تغییر هر متغیر، رتبه‌بندی ویزاهای جایگزین بلافاصله به‌روز می‌شود
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Score Slider */}
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-stone-700">امتیاز کل آزمون:</span>
                    <span className="text-[#c8102e] font-mono text-sm" dir="ltr">
                      {userScore} / 100
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="98"
                    value={userScore}
                    onChange={(e) => setUserScore(Number(e.target.value))}
                    className="w-full accent-[#c8102e] h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-bold">
                    <span>۱۵ (ضعیف)</span>
                    <span>۵۵ (کمبود نیرو)</span>
                    <span>۷۰ (نخبگان)</span>
                    <span>۹۸</span>
                  </div>
                </div>

                {/* Age Slider */}
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-stone-700">سن متقاضی:</span>
                    <span className="text-stone-900 font-mono text-sm" dir="ltr">
                      {userAge} سال
                    </span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={userAge}
                    onChange={(e) => setUserAge(Number(e.target.value))}
                    className="w-full accent-[#c8102e] h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-bold">
                    <span>۱۸ سال</span>
                    <span>۳۵ سال</span>
                    <span>۶۵ سال</span>
                  </div>
                </div>

                {/* Job Offer Toggle */}
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 flex flex-col justify-between">
                  <div className="text-xs font-black text-stone-700 mb-1">وضعیت پیشنهاد کار (Job Offer):</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setHasJobOffer(false)}
                      className={`py-2 px-3 rounded-xl text-xs font-black transition-all ${
                        !hasJobOffer
                          ? "bg-amber-500 text-white shadow-sm"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      ندارم (نیاز به پلان B)
                    </button>
                    <button
                      onClick={() => setHasJobOffer(true)}
                      className={`py-2 px-3 rounded-xl text-xs font-black transition-all ${
                        hasJobOffer
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      دارم / در مذاکره‌ام
                    </button>
                  </div>
                </div>

                {/* Education Level */}
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-1.5">
                  <label className="text-xs font-black text-stone-700 block">مدرک تحصیلی:</label>
                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2 text-xs font-bold text-stone-800 focus:outline-none focus:border-[#c8102e]"
                  >
                    <option value="phd">دکترا (PhD) / فلوشیپ</option>
                    <option value="master">کارشناسی ارشد (Master)</option>
                    <option value="bachelor">کارشناسی (Bachelor)</option>
                    <option value="vocational">کاردانی / مدرک فنی و حرفه‌ای</option>
                    <option value="highschool">دیپلم متوسطه</option>
                  </select>
                </div>

                {/* German Level */}
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-1.5">
                  <label className="text-xs font-black text-stone-700 block">سطح زبان آلمانی:</label>
                  <select
                    value={germanLevel}
                    onChange={(e) => setGermanLevel(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2 text-xs font-bold text-stone-800 focus:outline-none focus:border-[#c8102e]"
                  >
                    <option value="none">بدون تسلط / تازه شروع کرده‌ام</option>
                    <option value="a1">A1 (پایه مبتدی)</option>
                    <option value="a2">A2 (پیش‌متوسط)</option>
                    <option value="b1">B1 (مستقل - امتیاز عالی)</option>
                    <option value="b2">B2 (پیشرفته شغلی)</option>
                    <option value="c1">C1 (تسلط کامل)</option>
                  </select>
                </div>

                {/* Field of Study */}
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-1.5">
                  <label className="text-xs font-black text-stone-700 block">رشته و حوزه شغلی:</label>
                  <select
                    value={currentJobField}
                    onChange={(e) => setCurrentJobField(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2 text-xs font-bold text-stone-800 focus:outline-none focus:border-[#c8102e]"
                  >
                    <option value="it">مهندسی نرم‌افزار / IT / هوش مصنوعی (کمبود حاد)</option>
                    <option value="engineering">مهندسی مکانیک، برق، صنایع (کمبود حاد)</option>
                    <option value="medicine">پزشکی / دندان‌پزشکی / داروسازی</option>
                    <option value="nursing">پرستاری و پیراپزشکی (کمبود حاد)</option>
                    <option value="business">مدیریت، مالی، بازرگانی</option>
                    <option value="arts">هنر، معماری، علوم انسانی</option>
                    <option value="other">سایر رشته‌ها و مشاغل آزاد</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* CATEGORY & ATTRIBUTE FILTERS */}
      {/* ========================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-black text-stone-600 ml-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-stone-500" />
            دسته‌بندی:
          </span>
          {[
            { id: "all", label: "همه ویزاها" },
            { id: "work", label: "کاری و مهارتی" },
            { id: "study", label: "تحصیلی و دانشگاهی" },
            { id: "financial", label: "تمکن مالی و سرمایه" },
            { id: "business", label: "استارتاپ و کارآفرینی" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeCategoryFilter === cat.id
                  ? "bg-[#c8102e] text-white shadow-sm"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-stone-700 select-none">
            <input
              type="checkbox"
              checked={filterNoJobOfferOnly}
              onChange={(e) => setFilterNoJobOfferOnly(e.target.checked)}
              className="accent-[#c8102e] w-4 h-4 rounded cursor-pointer"
            />
            فقط بدون نیاز به جاب‌آفر
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-stone-700 select-none">
            <input
              type="checkbox"
              checked={filterNoGermanOnly}
              onChange={(e) => setFilterNoGermanOnly(e.target.checked)}
              className="accent-[#c8102e] w-4 h-4 rounded cursor-pointer"
            />
            بدون مدرک آلمانی اجباری
          </label>

          <button
            onClick={() => setShowComparisonModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100 text-xs font-black transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-600" />
            مقایسه رودررو
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* TOP ALTERNATIVE SPOTLIGHT CARD */}
      {/* ========================================== */}
      {topAlternative && (
        <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden border border-emerald-700/40">
          <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-black text-emerald-200">
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                رتبه ۱ پیشنهادات هوشمند (بیشترین تطابق با شرایط فعلی شما)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-200/80">شاخص تطابق:</span>
                <span className="text-2xl font-black font-mono text-emerald-300" dir="ltr">
                  {topAlternative.matchScore}%
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topAlternative.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}
                  >
                    <topAlternative.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-white">{topAlternative.titleFa}</h3>
                    <div className="text-[11px] font-mono text-emerald-200/70" dir="ltr">
                      {topAlternative.titleDe}
                    </div>
                  </div>
                </div>

                {/* Smart Rationale Box */}
                <div className="bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-sm space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-black">
                    <Sparkles className="w-4 h-4" />
                    چرا الگوریتم این ویزا را به عنوان جایگزین برتر شما پیشنهاد کرد؟
                  </div>
                  <p className="text-xs text-stone-100 font-bold leading-relaxed">
                    {topAlternative.smartReasoning}
                  </p>
                </div>

                {/* Pros and match highlights */}
                <div className="grid sm:grid-cols-2 gap-2 pt-2">
                  {topAlternative.pros.map((pro, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-400/20 rounded-xl p-2.5 text-xs text-emerald-100 font-bold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action & Key Info */}
              <div className="bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-sm space-y-3">
                <div className="text-xs font-black text-white/90 pb-2 border-b border-white/15">
                  اطلاعات کلیدی این جایگزین
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/60">نیاز به جاب‌آفر:</span>
                    <span className="font-black text-white">
                      {topAlternative.requiresJobOffer ? "دارد (الزامی)" : "خیر (بدون نیاز)"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">حداقل امتیاز:</span>
                    <span className="font-black text-amber-300">
                      {topAlternative.minPointsNeeded ? `${topAlternative.minPointsNeeded} امتیاز` : "بدون جدول امتیاز"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">مدت زمان صدور:</span>
                    <span className="font-black text-white">{topAlternative.processingWeeks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">ویزای همراه خانواده:</span>
                    <span className="font-black text-emerald-300 text-left truncate max-w-[120px]">
                      {topAlternative.familyReunification}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVisaForDetails(topAlternative)}
                  className="w-full mt-3 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <FileCheck className="w-4 h-4" />
                  مشاهده مدارک و راهنمای ثبت‌نام
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* RANKED ALTERNATIVE VISAS LIST */}
      {/* ========================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#c8102e]" />
            <h3 className="text-base font-black text-stone-900">
              فهرست کامل گزینه‌های جایگزین (مرتب‌شده بر اساس امتیاز تطابق)
            </h3>
          </div>
          <span className="text-xs font-bold text-stone-500">
            {filteredVisas.length} گزینه فعال
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVisas.map((visa, index) => {
            const IconComponent = visa.icon;
            const isTop = index === 0;

            return (
              <motion.div
                key={visa.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white rounded-3xl border-2 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                  isTop ? "border-emerald-300 ring-2 ring-emerald-100" : "border-stone-200"
                }`}
              >
                <div>
                  {/* Top Bar of card */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${visa.gradient} flex items-center justify-center text-white shadow-md shrink-0`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-stone-900 leading-tight">
                          {visa.titleFa}
                        </h4>
                        <div className="text-[10px] font-mono text-stone-400 mt-0.5 truncate max-w-[200px]" dir="ltr">
                          {visa.titleDe}
                        </div>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="text-left shrink-0">
                      <div
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black font-mono border ${
                          visa.matchScore >= 75
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : visa.matchScore >= 50
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                        dir="ltr"
                      >
                        <span>{visa.matchScore}%</span>
                        <span className="text-[9px] font-bold">تطابق</span>
                      </div>
                    </div>
                  </div>

                  {/* Badge & Description */}
                  <div className="mb-3">
                    <span
                      className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full border mb-2 ${visa.badgeColor}`}
                    >
                      {visa.badge}
                    </span>
                    <p className="text-xs text-stone-600 font-bold leading-relaxed line-clamp-3">
                      {visa.summary}
                    </p>
                  </div>

                  {/* Why this alternative smart box */}
                  <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 mb-3 space-y-1">
                    <div className="text-[10px] font-black text-stone-800 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      استدلال هوشمند برای شما:
                    </div>
                    <p className="text-[11px] text-stone-600 font-bold leading-relaxed">
                      {visa.smartReasoning}
                    </p>
                  </div>

                  {/* Key specs grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-stone-700 mb-3">
                    <div className="bg-stone-100/70 p-2 rounded-xl flex items-center justify-between">
                      <span className="text-stone-400 text-[10px]">جاب‌آفر:</span>
                      <span className="font-black text-stone-900">
                        {visa.requiresJobOffer ? "الزامی" : "بدون نیاز"}
                      </span>
                    </div>
                    <div className="bg-stone-100/70 p-2 rounded-xl flex items-center justify-between">
                      <span className="text-stone-400 text-[10px]">حداقل امتیاز:</span>
                      <span className="font-black text-stone-900">
                        {visa.minPointsNeeded ? `${visa.minPointsNeeded}` : "معاف از امتیاز"}
                      </span>
                    </div>
                    <div className="bg-stone-100/70 p-2 rounded-xl flex items-center justify-between">
                      <span className="text-stone-400 text-[10px]">زبان:</span>
                      <span className="font-black text-stone-900 truncate max-w-[90px]">
                        {visa.requiresGermanLevel}
                      </span>
                    </div>
                    <div className="bg-stone-100/70 p-2 rounded-xl flex items-center justify-between">
                      <span className="text-stone-400 text-[10px]">زمان صدور:</span>
                      <span className="font-black text-stone-900">{visa.processingWeeks}</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedVisaForDetails(visa)}
                    className="flex-1 py-2 px-3 bg-stone-100 hover:bg-[#c8102e] hover:text-white text-stone-800 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>جزئیات و چک‌لیست مدارک</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setCompareVisaA(topAlternative.id);
                      setCompareVisaB(visa.id);
                      setShowComparisonModal(true);
                    }}
                    title="مقایسه با ویزای رتبه اول"
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================== */}
      {/* BOTTOM ACTION BAR (COPY REPORT, CONTACT) */}
      {/* ========================================== */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-black text-stone-900 mb-1">
              آیا برای انتخاب قطعی بین ویزاهای جایگزین به مشاوره نیاز دارید؟
            </h4>
            <p className="text-xs text-stone-500 font-bold">
              می‌توانید گزارش امتیازات خود را کپی کرده و مستقیماً برای کارشناسان اتریش‌نشین ارسال کنید.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-black transition-all"
            >
              <Copy className="w-4 h-4 text-stone-600" />
              کپی کارنامه ویزاهای جایگزین
            </button>

            <a
              href="https://wa.me/436889763256"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-black shadow-md hover:scale-105 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              ارسال کارنامه در واتس‌اپ
            </a>

            <a
              href="https://t.me/Otrish_neshin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sky-500 text-white text-xs font-black hover:bg-sky-600 transition-all"
            >
              <Send className="w-4 h-4" />
              تلگرام اتریش‌نشین
            </a>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* DETAILS MODAL / DRAWER */}
      {/* ========================================== */}
      <AnimatePresence>
        {selectedVisaForDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-stone-200 text-right space-y-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedVisaForDetails.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}
                  >
                    <selectedVisaForDetails.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-black text-stone-900">
                      {selectedVisaForDetails.titleFa}
                    </h3>
                    <div className="text-xs font-mono text-stone-500" dir="ltr">
                      {selectedVisaForDetails.titleDe}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVisaForDetails(null)}
                  className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Rationale & summary */}
              <div className="space-y-3">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    استدلال الگوریتم برای انتخاب این ویزا:
                  </div>
                  <p className="text-xs text-amber-800 font-bold leading-relaxed">
                    {selectedVisaForDetails.whyThisAlternative(userSpecs)}
                  </p>
                </div>

                <p className="text-xs text-stone-700 font-bold leading-relaxed">
                  {selectedVisaForDetails.summary}
                </p>
              </div>

              {/* Key Specs Table */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2.5 text-xs font-bold">
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">مبنای قانونی در حقوق اتریش:</span>
                  <span className="font-mono text-stone-800" dir="ltr">{selectedVisaForDetails.legalBasis}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">حداقل سیستم امتیازی:</span>
                  <span className="text-stone-800">{selectedVisaForDetails.pointsSystemName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">شرط مدرک زبان آلمانی:</span>
                  <span className="text-stone-800">{selectedVisaForDetails.requiresGermanLevel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">حق کار و فعالیت اقتصادی:</span>
                  <span className="text-stone-800 text-left">{selectedVisaForDetails.workRights}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">الحاق همسر و فرزندان:</span>
                  <span className="text-stone-800">{selectedVisaForDetails.familyReunification}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">ارگان رسیدگی‌کننده در اتریش:</span>
                  <span className="text-stone-800 text-left">{selectedVisaForDetails.officialAuthority}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">مسیر رسیدن به اقامت دائم (Daueraufenthalt):</span>
                  <span className="text-stone-800 text-left">{selectedVisaForDetails.conversionToPermanent}</span>
                </div>
              </div>

              {/* Prerequisites Checklist */}
              <div>
                <div className="text-xs font-black text-stone-900 mb-2 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  چک‌لیست مدارک و الزامات اصلی:
                </div>
                <div className="space-y-2">
                  {selectedVisaForDetails.keyPrerequisites.map((req, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5 text-xs text-emerald-900 font-bold"
                    >
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal footer */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedVisaForDetails(null)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-black transition-colors"
                >
                  بستن پنجره
                </button>
                <a
                  href={`https://wa.me/436889763256?text=${encodeURIComponent(
                    `سلام، من در ابزار ارزیابی ویزاهای جایگزین، برای ویزای "${selectedVisaForDetails.titleFa}" تطابق دریافت کرده‌ام. مایلم راهنمایی بگیرم.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  مشاوره تخصصی این ویزا
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* SIDE-BY-SIDE COMPARISON MODAL */}
      {/* ========================================== */}
      <AnimatePresence>
        {showComparisonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-stone-200 text-right space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-black text-stone-900">
                    مقایسه رودررو ویزاهای جایگزین اتریش
                  </h3>
                </div>
                <button
                  onClick={() => setShowComparisonModal(false)}
                  className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Selector row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-stone-700 block mb-1">ویزای اول (الف):</label>
                  <select
                    value={compareVisaA}
                    onChange={(e) => setCompareVisaA(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-bold text-stone-800"
                  >
                    {ALTERNATIVE_VISAS.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.titleFa}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-stone-700 block mb-1">ویزای دوم (ب):</label>
                  <select
                    value={compareVisaB}
                    onChange={(e) => setCompareVisaB(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-bold text-stone-800"
                  >
                    {ALTERNATIVE_VISAS.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.titleFa}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comparison Matrix */}
              {(() => {
                const visaA = ALTERNATIVE_VISAS.find((v) => v.id === compareVisaA) || ALTERNATIVE_VISAS[0];
                const visaB = ALTERNATIVE_VISAS.find((v) => v.id === compareVisaB) || ALTERNATIVE_VISAS[1];

                const rows = [
                  { label: "سیستم امتیازی", a: visaA.pointsSystemName, b: visaB.pointsSystemName },
                  {
                    label: "پیشنهاد کار (Job Offer)",
                    a: visaA.requiresJobOffer ? "الزامی است" : "بدون نیاز اولیه",
                    b: visaB.requiresJobOffer ? "الزامی است" : "بدون نیاز اولیه",
                  },
                  { label: "مدرک زبان", a: visaA.requiresGermanLevel, b: visaB.requiresGermanLevel },
                  { label: "مدت زمان صدور", a: visaA.processingWeeks, b: visaB.processingWeeks },
                  { label: "حق کار قانونی", a: visaA.workRights, b: visaB.workRights },
                  { label: "الحاق همسر و فرزند", a: visaA.familyReunification, b: visaB.familyReunification },
                  { label: "مبنای قانونی", a: visaA.legalBasis, b: visaB.legalBasis },
                ];

                return (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-bold border-collapse border border-stone-200">
                      <thead>
                        <tr className="bg-stone-100 text-stone-800">
                          <th className="p-3 border border-stone-200 text-right w-1/4">معیار مقایسه</th>
                          <th className="p-3 border border-stone-200 text-right w-3/8 text-[#c8102e]">
                            {visaA.titleFa}
                          </th>
                          <th className="p-3 border border-stone-200 text-right w-3/8 text-indigo-700">
                            {visaB.titleFa}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                            <td className="p-3 border border-stone-200 text-stone-500 font-black">{row.label}</td>
                            <td className="p-3 border border-stone-200 text-stone-800">{row.a}</td>
                            <td className="p-3 border border-stone-200 text-stone-800">{row.b}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })()}

              <div className="pt-3 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setShowComparisonModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-black"
                >
                  بستن مقایسه
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
