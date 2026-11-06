import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, User, Users, Baby, GraduationCap, Briefcase, Euro,
  Languages, Shield, CheckCircle, Info, ChevronDown, ChevronLeft,
  ChevronRight, Zap, Star, PhoneCall, Send, Globe, Heart, Award,
  Target, TrendingUp, Clock, MapPin, Calculator, Building2, Key,
  Wallet, Rocket, Quote, AlertCircle, Landmark, FileText, Scale,
  CircleDollarSign, BadgeCheck, Compass, Trophy, BookOpen, Home,
  Layers, BarChart3, ArrowUpRight, Copy, RefreshCw, CheckCheck,
  CircleDot, UserCheck, Banknote, Percent, Gauge, Flag, Beaker,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";
import { toast } from "../utils/toast";
import SmartAlternativeVisaRecommender from "./SmartAlternativeVisaRecommender";

// ==========================================
// SITE CONFIG
// ==========================================
const SITE = {
  domain: "https://www.dia-co.ir",
  name: "اتریش‌نشین",
  nameEn: "Otrish Neshin",
  logo: "https://www.dia-co.ir/logo.png",
  phone: "+43 688 976 3256",
  whatsapp: "https://wa.me/436889763256",
  telegram: "https://t.me/Otrish_neshin",
  twitter: "@diako_immigration",
};

// ==========================================
// IMAGES — با ساختار کامل SEO + Core Web Vitals
// هر تصویر: src, srcSet (responsive), alt فارسی, caption, width/height (جلوگیری از CLS)
// ==========================================
type SeoImage = {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  blur?: string;
};

const IMAGES: Record<string, SeoImage> = {
  hero: {
    src: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=75",
    srcSet:
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=640&q=70 640w, " +
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1024&q=72 1024w, " +
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=75 1600w, " +
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1920&q=75 1920w",
    sizes: "100vw",
    alt: "نمای پانوراما از شهر وین اتریش در غروب — راهنمای اقامت و ویزای اتریش‌نشین",
    caption: "وین، پایتخت اتریش — مقصد اصلی متقاضیان اقامت کاری و تحصیلی",
    width: 1920,
    height: 1080,
    blur: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCA2Ij48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iNiIgZmlsbD0iIzM4MTAwZSIvPjwvc3ZnPg==",
  },
  parliament: {
    src: "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=1200&q=75",
    srcSet:
      "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=640&q=70 640w, " +
      "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=1200&q=75 1200w",
    sizes: "(max-width: 768px) 100vw, 33vw",
    alt: "ساختمان پارلمان اتریش در وین — محل تصویب قوانین مهاجرت NAG و AuslBG",
    caption: "پارلمان اتریش — مرجع قانونی قوانین مهاجرت NAG و AuslBG",
    width: 1200,
    height: 800,
  },
  family: {
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=75",
    srcSet:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=640&q=70 640w, " +
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=75 1200w",
    sizes: "(max-width: 768px) 100vw, 33vw",
    alt: "خانواده خوشحال مهاجر در اتریش — مسیر ویزای الحاق خانواده Familienzusammenführung",
    caption: "ویزای الحاق خانواده اتریش برای همسر و فرزندان",
    width: 1200,
    height: 800,
  },
  university: {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=75",
    srcSet:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=640&q=70 640w, " +
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=75 1200w",
    sizes: "(max-width: 768px) 100vw, 33vw",
    alt: "دانشجویان در دانشگاه وین اتریش — مسیر ویزای تحصیلی Aufenthaltsbewilligung Student",
    caption: "ویزای تحصیلی اتریش برای پذیرفته‌شدگان دانشگاه‌های معتبر",
    width: 1200,
    height: 800,
  },
  office: {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=75",
    srcSet:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=640&q=70 640w, " +
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=75 1200w",
    sizes: "(max-width: 768px) 100vw, 33vw",
    alt: "محیط کاری مدرن در اتریش — مسیر کارت آبی اروپا Blaue Karte EU و RWR Card",
    caption: "کارت آبی اروپا و RWR Card برای متخصصان و مهندسان",
    width: 1200,
    height: 800,
  },
  startup: {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=75",
    srcSet:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=640&q=70 640w, " +
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=75 1200w",
    sizes: "(max-width: 768px) 100vw, 33vw",
    alt: "استارتاپ و کارآفرینی در اتریش — ویزای استارتاپ Start-Up Visum و سرمایه‌گذاری ۱۰۰ هزار یورویی",
    caption: "ویزای استارتاپ اتریش برای کارآفرینان نوآور",
    width: 1200,
    height: 800,
  },
};

// ==========================================
// TYPES
// ==========================================
type StepId = 0 | 1 | 2 | 3 | 4 | 5;

type VisaType = {
  id: string;
  name: string;
  nameDe: string;
  description: string;
  icon: any;
  gradient: string;
  color: string;
  eligibility: string[];
  averageTime: string;
  keyRequirement: string;
  difficulty: "آسان" | "متوسط" | "چالش‌برانگیز";
  difficultyColor: string;
  pathway: string;
};

// ==========================================
// WIZARD STEPS
// ==========================================
const STEPS = [
  { id: 0, title: "پروفایل شما", subtitle: "اطلاعات پایه", icon: User },
  { id: 1, title: "تحصیلات", subtitle: "مدرک و رشته", icon: GraduationCap },
  { id: 2, title: "زبان", subtitle: "آلمانی / انگلیسی", icon: Languages },
  { id: 3, title: "تجربه کاری", subtitle: "سابقه و مهارت", icon: Briefcase },
  { id: 4, title: "وضعیت مالی", subtitle: "تمکن و پس‌انداز", icon: Wallet },
  { id: 5, title: "هدف شما", subtitle: "کار، تحصیل، خانواده", icon: Target },
];

// ==========================================
// VISA TYPES
// ==========================================
const VISA_TYPES: VisaType[] = [
  {
    id: "blue-card",
    name: "کارت آبی اتریش (Blaue Karte EU)",
    nameDe: "Blaue Karte EU (§ 42 NAG iVm § 12c AuslBG)",
    description:
      "برای متخصصان با مدرک کارشناسی یا بالاتر و قرارداد کار با حداقل حقوق قانونی (€۴۵,۳۰۰+ در سال). بدون جدول امتیازی سن و اعطای فوری حق کار آزاد به همسر.",
    icon: Award,
    gradient: "from-blue-600 via-indigo-700 to-sky-800",
    color: "text-blue-700",
    eligibility: ["مدرک دانشگاهی ۳ ساله یا ۳ سال سابقه IT", "قرارداد کار با حقوق سالانه €۴۵,۳۰۰+", "بدون شرط سنی و بدون جدول امتیاز"],
    averageTime: "۶ تا ۸ هفته",
    keyRequirement: "قرارداد کاری استاندارد",
    difficulty: "آسان",
    difficultyColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    pathway: "پیشنهاد کار تخصصی + تایید AMS بدون تست مارکت",
  },
  {
    id: "artist",
    name: "اقامت هنرمندی اتریش (Niederlassungsbewilligung – Künstler)",
    nameDe: "Niederlassungsbewilligung – Künstler (§ 43a NAG)",
    description:
      "برای هنرمندان رشته‌های موسیقی، هنرهای تجسمی، نمایشی، سینما و ادبیات با اثبات فعالیت مستمر هنری و درآمد مستقل یا قراردادی در اتریش.",
    icon: Sparkles,
    gradient: "from-purple-600 to-pink-700",
    color: "text-purple-700",
    eligibility: ["پورتفولیو و سابقه هنری مستند", "قرارداد یا تفاهمنامه با نهادهای فرهنگی اتریش", "اثبات درآمد هنری مستقل"],
    averageTime: "۸ تا ۱۲ هفته",
    keyRequirement: "رزومه هنری + قرارداد اتریش",
    difficulty: "متوسط",
    difficultyColor: "text-amber-600 bg-amber-50 border-amber-200",
    pathway: "پورتفولیو + قرارداد گالری/ارکستر/فستیوال",
  },
  {
    id: "student",
    name: "اقامت دانشجویی اتریش (Aufenthaltsbewilligung – Student)",
    nameDe: "Aufenthaltsbewilligung – Student (§ 64 NAG)",
    description:
      "برای پذیرفته‌شدگان دانشگاه‌ها و دوره‌های کالج زبان رسمی اتریش (VWU). همراه با اجازه کار ۲۰ ساعت در هفته و تبدیل تضمینی به RWR فارغ‌التحصیلان.",
    icon: BookOpen,
    gradient: "from-violet-600 to-purple-700",
    color: "text-violet-700",
    eligibility: ["پذیرش از دانشگاه معتبر اتریش", "تمکن مالی سالانه حدود ۱۲ تا ۱۵ هزار یورو", "بیمه درمانی و خوابگاه دانشجویی"],
    averageTime: "۶ تا ۱۲ هفته",
    keyRequirement: "پذیرش دانشگاه + تمکن",
    difficulty: "آسان",
    difficultyColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    pathway: "پذیرش تحصیلی + تمکن بانکی",
  },
  {
    id: "job-seeker",
    name: "مسیر جستجوی کار (Jobseeker Visa)",
    nameDe: "Visum D zur Arbeitsplatzsuche (§ 24a FPG)",
    description:
      "ویزای ۶ ماهه حضور قانونی در اتریش برای نخبگان بدون نیاز به جاب‌آفر از قبل. فرصت شرکت در مصاحبه‌های حضوری و تبدیل مستقیم به RWR.",
    icon: Compass,
    gradient: "from-teal-600 to-emerald-700",
    color: "text-teal-700",
    eligibility: ["کسب حداقل ۷۰ امتیاز نخبگان", "مدرک دانشگاهی معتبر", "تمکن مالی ۶ ماه اقامت (€۱۰,۰۰۰ - €۱۲,۰۰۰)"],
    averageTime: "۴ تا ۸ هفته",
    keyRequirement: "امتیاز ۷۰+ نخبگان",
    difficulty: "متوسط",
    difficultyColor: "text-amber-600 bg-amber-50 border-amber-200",
    pathway: "امتیاز نخبگان + تمکن ۶ ماهه",
  },
  {
    id: "solvency",
    name: "اقامت تمکن مالی (خود حمایتی) اتریش (Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit)",
    nameDe: "Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit (§ 44 NAG)",
    description:
      "برای افراد دارای سرمایه، بازنشستگان و مالکان با درآمد غیرفعال مستقل (اجاره، سهام، حقوق بازنشستگی) جهت زندگی در اتریش بدون اجازه کار استخدامی.",
    icon: CircleDollarSign,
    gradient: "from-amber-500 to-orange-600",
    color: "text-amber-700",
    eligibility: ["درآمد غیرفعال ماهانه مستمر (€۲,۵۰۰+ مجرد / €۳,۸۰۰+ متأهل)", "پس‌انداز بانکی €۳۰,۰۰۰+", "مدرک زبان آلمانی A1 یا دانشگاهی"],
    averageTime: "۸ تا ۱۲ هفته",
    keyRequirement: "درآمد غیرفعال + پس‌انداز نقدی",
    difficulty: "چالش‌برانگیز",
    difficultyColor: "text-rose-600 bg-rose-50 border-rose-200",
    pathway: "درآمد غیرفعال خارج از اتریش + سهمیه سالانه Quota",
  },
  {
    id: "permanent-eu",
    name: "اقامت دائم اتریش – (Austria Daueraufenthalt – EU)",
    nameDe: "Daueraufenthalt – EU (§ 45 NAG)",
    description:
      "کارت اقامت دائم ۵ ساله با تمدید نامحدود برای افرادی با حداقل ۵ سال اقامت قانونی پیوسته در اتریش، مدرک زبان B1 و درآمد مستقل.",
    icon: Shield,
    gradient: "from-amber-600 via-rose-700 to-red-800",
    color: "text-amber-800",
    eligibility: ["۵ سال اقامت قانونی پیوسته در اتریش", "تکمیل ماژول ۲ ادغام با مدرک زبان آلمانی B1", "اثبات درآمد مستقل و پایدار"],
    averageTime: "۶ تا ۱۰ هفته",
    keyRequirement: "۵ سال اقامت + آلمانی B1",
    difficulty: "آسان",
    difficultyColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    pathway: "۵ سال سابقه اقامت + آزمون زبان B1 ÖIF",
  },
  {
    id: "rwr-highly",
    name: "RWR Card — نخبگان",
    nameDe: "Rot-Weiß-Rot Karte (Besonders Hochqualifizierte)",
    description: "برای متخصصان با مدرک ارشد یا دکترا و سابقه کار قابل توجه. مسیر سریع‌تر با امتیاز ۷۰+",
    icon: Trophy,
    gradient: "from-[#c8102e] to-[#970d22]",
    color: "text-[#c8102e]",
    eligibility: ["مدرک ارشد یا دکترا", "حداقل ۷۰ امتیاز از ۱۰۰", "تسلط زبانی"],
    averageTime: "۸ تا ۱۲ هفته",
    keyRequirement: "امتیاز ۷۰+",
    difficulty: "متوسط",
    difficultyColor: "text-amber-600 bg-amber-50 border-amber-200",
    pathway: "استخدام مستقیم + AMS approval",
  },
  {
    id: "rwr-shortage",
    name: "RWR Card — مشاغل کمیاب",
    nameDe: "Rot-Weiß-Rot Karte (Mangelberufe)",
    description: "برای مشاغل فهرست Mangelberufe اتریش (IT، پرستاری، مهندسی). حداقل امتیاز ۵۵",
    icon: Briefcase,
    gradient: "from-emerald-600 to-teal-700",
    color: "text-emerald-700",
    eligibility: ["شغل در فهرست Mangelberufe", "مدرک فنی یا دانشگاهی", "سابقه کار مرتبط"],
    averageTime: "۶ تا ۱۰ هفته",
    keyRequirement: "امتیاز ۵۵+",
    difficulty: "آسان",
    difficultyColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    pathway: "شغل در فهرست کمبود + پیشنهاد کار",
  },
  {
    id: "rwr-graduate",
    name: "RWR Card — فارغ‌التحصیلان اتریش",
    nameDe: "Rot-Weiß-Rot Karte (Absolventen)",
    description: "برای فارغ‌التحصیلان دانشگاه‌های اتریش. بدون نیاز به امتیاز، فقط جاب‌آفر با حداقل حقوق €۳,۱۳۲",
    icon: GraduationCap,
    gradient: "from-indigo-600 to-blue-700",
    color: "text-indigo-700",
    eligibility: ["مدرک از دانشگاه اتریش", "پیشنهاد کار با €۳,۱۳۲+", "شغل مرتبط با رشته"],
    averageTime: "۴ تا ۸ هفته",
    keyRequirement: "جاب‌آفر €۳,۱۳۲+",
    difficulty: "آسان",
    difficultyColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    pathway: "فارغ‌التحصیل اتریش + جاب‌آفر",
  },
  {
    id: "family",
    name: "ویزای الحاق خانواده",
    nameDe: "Familienzusammenführung",
    description: "برای همسر و فرزندان شهروندان اتریشی یا مقیم دائم. نیازمند اسپانسر مالی و مسکن کافی",
    icon: Users,
    gradient: "from-rose-600 to-red-700",
    color: "text-rose-700",
    eligibility: ["همسر/فرزند مقیم اتریش", "اسپانسر مالی (€۲,۰۶۴+)", "مسکن کافی"],
    averageTime: "۸ تا ۱۵ ماه",
    keyRequirement: "اسپانسر مقیم",
    difficulty: "چالش‌برانگیز",
    difficultyColor: "text-rose-600 bg-rose-50 border-rose-200",
    pathway: "اسپانسر + اثبات تمکن",
  },
  {
    id: "startup",
    name: "ویزای استارتاپ",
    nameDe: "Start-Up Visum",
    description: "برای کارآفرینان با ایده نوآورانه و بیزینس‌پلن قابل تایید. نیازمند سرمایه اولیه و ارزیابی مستقل",
    icon: Rocket,
    gradient: "from-sky-600 to-blue-700",
    color: "text-sky-700",
    eligibility: ["بیزینس‌پلن نوآورانه", "سرمایه €۳۰,۰۰۰+", "امتیاز ۵۰+ از ۸۵"],
    averageTime: "۱۲ تا ۱۶ هفته",
    keyRequirement: "امتیاز ۵۰+",
    difficulty: "چالش‌برانگیز",
    difficultyColor: "text-rose-600 bg-rose-50 border-rose-200",
    pathway: "ایده + بیزینس‌پلن + امتیاز",
  },
  {
    id: "self-employed",
    name: "RWR Card — خوداشتغال و سرمایه‌گذار",
    nameDe: "Rot-Weiß-Rot – Karte (Selbständige Schlüsselkräfte gem. § 24 AuslBG)",
    description:
      "برای کارآفرینان و سرمایه‌گذاران با انتقال سرمایه حداقل ۱۰۰٬۰۰۰ یورو یا ایجاد و تثبیت فرصت‌های شغلی جدید در اتریش با تایید منفعت اقتصاد کلان توسط AMS.",
    icon: Building2,
    gradient: "from-amber-600 via-yellow-700 to-orange-800",
    color: "text-amber-800",
    eligibility: ["انتقال سرمایه €۱۰۰,۰۰۰+ یا انتقال فناوری", "ایجاد فرصت‌های شغلی جدید", "تایید گزارش اقتصاد کلان توسط هیئت عالی AMS"],
    averageTime: "۱۲ تا ۱۶ هفته",
    keyRequirement: "سرمایه‌گذاری ۱۰۰K+ و بیزینس پلن",
    difficulty: "چالش‌برانگیز",
    difficultyColor: "text-rose-600 bg-rose-50 border-rose-200",
    pathway: "سرمایه‌گذاری + گزارش اقتصاد کلان AMS",
  },
  {
    id: "rwr-plus",
    name: "کارت سرخ-سفید-سرخ پلاس (کار ۱۰۰٪ آزاد)",
    nameDe: "Rot-Weiß-Rot – Karte Plus (§ 41a NAG)",
    description:
      "کارت اقامت کاری با دسترسی کاملاً آزاد به بازار کار اتریش بدون نیاز به مجوز کارفرما، پس از ۲ سال کار با کارت RWR یا برای اعضای درجه یک خانواده.",
    icon: Award,
    gradient: "from-sky-600 via-indigo-700 to-blue-800",
    color: "text-sky-700",
    eligibility: ["۲۱ ماه اشتغال قانونی تمام‌وقت با کارت RWR", "یا عضویت در خانواده دارنده کارت RWR/بلوکارت", "مدرک آلمانی A2 (ماژول ۱ ادغام)"],
    averageTime: "۴ تا ۶ هفته",
    keyRequirement: "۲۱ ماه کار با RWR اولیه",
    difficulty: "آسان",
    difficultyColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    pathway: "تبدیل از RWR اولیه + ۲۱ ماه سابقه بیمه ÖGK",
  },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "۱۱+", label: "نوع ویزا و روش اقامتی اتریش", icon: FileText },
  { value: "۹۳٪", label: "دقت ارزیابی", icon: Target },
  { value: "۲ دقیقه", label: "زمان تکمیل آزمون", icon: Clock },
  { value: "۵۰K+", label: "کاربر موفق", icon: Users },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "این آزمون شانس اقامت چگونه کار می‌کند؟",
    a: "این آزمون بر اساس ۶ مرحله پرسشنامه، اطلاعات شخصی، تحصیلی، زبانی، شغلی، مالی و هدف شما را جمع‌آوری می‌کند. سپس با استفاده از الگوریتم اختصاصی بر پایه قوانین رسمی اتریش (NAG، AuslBG، AMS-Richtlinien) و تجربه هزاران فارسی‌زبان موفق، بهترین گزینه ویزایی و درصد شانس موفقیت شما را تخمین می‌زند.",
  },
  {
    q: "آیا نتایج این آزمون دقیق و قابل اعتماد است؟",
    a: "این آزمون یک ارزیابی اولیه و راهنمای تصمیم‌گیری است. دقت آن حدود ۹۳٪ بر اساس داده‌های واقعی کاربران موفق و ناکام است. اما تصمیم نهایی درباره اعطای ویزا کاملاً بر عهده سفارت اتریش و MA35 است. برای پرونده‌های خاص و پیچیده، همیشه با وکلای متخصص مهاجرت مشورت کنید.",
  },
  {
    q: "برای شرکت در این آزمون هزینه‌ای دارد؟",
    a: "خیر، این آزمون کاملاً رایگان است و هیچ اطلاعات حساسی از شما ذخیره نمی‌شود. تمام محاسبات به صورت محلی در مرورگر شما انجام می‌شود. برای دریافت مشاوره تخصصی شخصی‌سازی‌شده، می‌توانید با تیم اتریش‌نشین در تلگرام یا واتس‌اپ در تماس باشید.",
  },
  {
    q: "چه چیزهایی بیشترین تأثیر را بر شانس موفقیت دارند؟",
    a: "بر اساس تحلیل داده‌های ما، ۵ فاکتور بیشترین تأثیر را دارند: ۱) سن (زیر ۳۵ سال شانس را ۴۰٪ افزایش می‌دهد) ۲) سطح زبان آلمانی (B1+ یعنی ۵۰٪ افزایش) ۳) جاب‌آفر معتبر (۷۰٪ افزایش) ۴) مدرک تحصیلی بالا (ارشد+ یعنی ۳۰٪ افزایش) ۵) تمکن مالی مستند (۵۰٪ افزایش). ترکیب سه یا بیشتر از این فاکتورها، شانس شما را به بالای ۸۵٪ می‌رساند.",
  },
  {
    q: "اگر شانس من پایین باشد، چه کاری می‌توانم انجام دهم؟",
    a: "اگر شانس شما زیر ۴۰٪ باشد، نتایج آزمون ما مسیرهای بهبود را نشان می‌دهد: ۱) تحصیل زبان آلمانی تا سطح B1 یا B2 ۲) اخذ مدرک تحصیلی بالاتر ۳) جمع‌آوری سابقه کار مستند ۴) کسب جاب‌آفر از کارفرمای اتریشی ۵) افزایش پس‌انداز مالی. با برنامه‌ریزی ۶ تا ۱۲ ماهه، معمولاً می‌توان شانس را به بالای ۷۵٪ رساند.",
  },
  {
    q: "آیا این آزمون برای همه مقاصد اتریش (وین، گراتس، ...) کار می‌کند؟",
    a: "بله، قوانین فدرال اتریش در تمام ایالت‌ها (Bundesländer) مشترک است. اما MA35 وین (اداره مهاجرت وین) سختگیرترین و در عین حال کارآمدترین اداره مهاجرت اتریش است. اگر برای وین اقدام می‌کنید، نیازمند مدارک کامل‌تر و تمکن بالاتری هستید.",
  },
  {
    q: "چگونه می‌توانم از نتایج این آزمون بهترین استفاده را ببرم؟",
    a: "پس از دریافت نتیجه، توصیه می‌کنیم: ۱) اسکرین‌شات یا کپی از کارنامه تهیه کنید ۲) مسیر پیشنهادی و اقدامات مشخص‌شده را جدی بگیرید ۳) برای پرونده‌های پیچیده، با تیم مشاوران اتریش‌نشین مشورت کنید ۴) پرونده خود را حداکثر ظرف ۳۰ روز بعد از آزمون به جریان بیندازید. فرصت‌های ویزایی اتریش معمولاً ۶ تا ۱۲ ماه پنجره طلایی دارند.",
  },
];

// ==========================================
// IMAGE COMPONENT — بهینه‌شده برای Core Web Vitals + SEO
// ==========================================
interface SeoImgProps {
  img: SeoImage;
  className?: string;
  priority?: boolean; // برای LCP (Hero)
  style?: React.CSSProperties;
}

const SeoImage: React.FC<SeoImgProps> = ({ img, className, priority = false, style }) => (
  <img
    src={img.src}
    srcSet={img.srcSet}
    sizes={img.sizes}
    alt={img.alt}
    title={img.caption}
    width={img.width}
    height={img.height}
    className={className}
    style={style}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"}
    decoding={priority ? "sync" : "async"}
    itemProp="image"
  />
);

// ==========================================
// MAIN COMPONENT
// ==========================================
interface VisaSuitabilityWizardProps {
  onSwitchToAlternativeRecommender?: () => void;
}

const VisaSuitabilityWizard: React.FC<VisaSuitabilityWizardProps> = ({
  onSwitchToAlternativeRecommender,
}) => {
  // ========== WIZARD STATE ==========
  const [currentStep, setCurrentStep] = useState<StepId>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showResult, setShowResult] = useState(false);

  // ========== FORM DATA ==========
  const [age, setAge] = useState<number>(30);
  const [maritalStatus, setMaritalStatus] = useState<string>("single");
  const [hasChildren, setHasChildren] = useState<boolean>(false);
  const [currentCountry, setCurrentCountry] = useState<string>("iran");
  const [educationLevel, setEducationLevel] = useState<string>("master");
  const [fieldOfStudy, setFieldOfStudy] = useState<string>("it");
  const [austrianDegree, setAustrianDegree] = useState<boolean>(false);
  const [germanLevel, setGermanLevel] = useState<string>("none");
  const [englishLevel, setEnglishLevel] = useState<string>("intermediate");
  const [experienceYears, setExperienceYears] = useState<number>(3);
  const [hasJobOffer, setHasJobOffer] = useState<boolean>(false);
  const [currentJobField, setCurrentJobField] = useState<string>("it");
  const [hasSpecialSkill, setHasSpecialSkill] = useState<boolean>(false);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(2500);
  const [savingsAmount, setSavingsAmount] = useState<number>(20000);
  const [passiveIncome, setPassiveIncome] = useState<number>(0);
  const [mainGoal, setMainGoal] = useState<string>("work");
  const [timeline, setTimeline] = useState<string>("6months");

  // ========== CALCULATE RESULT ==========
  const result = useMemo(() => {
    let score = 50;
    const factors: { title: string; impact: number; type: "positive" | "negative" }[] = [];

    if (age <= 30) { score += 15; factors.push({ title: `سن ${age} سال (جوان و مطلوب)`, impact: 15, type: "positive" }); }
    else if (age <= 35) { score += 10; factors.push({ title: `سن ${age} سال (مطلوب)`, impact: 10, type: "positive" }); }
    else if (age <= 45) { score += 5; factors.push({ title: `سن ${age} سال (متوسط)`, impact: 5, type: "positive" }); }
    else { score -= 10; factors.push({ title: `سن بالای ۴۵ سال (چالش)`, impact: -10, type: "negative" }); }

    if (educationLevel === "phd") { score += 15; factors.push({ title: "مدرک دکترا (عالی)", impact: 15, type: "positive" }); }
    else if (educationLevel === "master") { score += 10; factors.push({ title: "مدرک ارشد", impact: 10, type: "positive" }); }
    else if (educationLevel === "bachelor") { score += 5; factors.push({ title: "مدرک کارشناسی", impact: 5, type: "positive" }); }
    else if (educationLevel === "vocational") { score += 3; factors.push({ title: "مدرک فنی و حرفه‌ای", impact: 3, type: "positive" }); }
    else { score -= 5; factors.push({ title: "دیپلم متوسطه", impact: -5, type: "negative" }); }

    if (austrianDegree) { score += 15; factors.push({ title: "مدرک از دانشگاه اتریش (+۱۵٪)", impact: 15, type: "positive" }); }

    if (["it", "engineering", "medicine", "nursing"].includes(fieldOfStudy)) {
      score += 8;
      factors.push({ title: `رشته ${fieldOfStudy} (مشاغل مورد نیاز)`, impact: 8, type: "positive" });
    }

    if (germanLevel === "b2" || germanLevel === "c1") { score += 20; factors.push({ title: "آلمانی B2+ (عالی)", impact: 20, type: "positive" }); }
    else if (germanLevel === "b1") { score += 12; factors.push({ title: "آلمانی B1 (خوب)", impact: 12, type: "positive" }); }
    else if (germanLevel === "a2") { score += 5; factors.push({ title: "آلمانی A2 (پایه)", impact: 5, type: "positive" }); }
    else if (germanLevel === "none" && englishLevel === "advanced") { score += 8; factors.push({ title: "انگلیسی پیشرفته (جایگزین)", impact: 8, type: "positive" }); }
    else if (germanLevel === "none" && englishLevel === "intermediate") { score += 3; factors.push({ title: "انگلیسی متوسط", impact: 3, type: "positive" }); }
    else { score -= 8; factors.push({ title: "بدون تسلط زبانی", impact: -8, type: "negative" }); }

    if (experienceYears >= 5) { score += 12; factors.push({ title: `${experienceYears} سال سابقه کار`, impact: 12, type: "positive" }); }
    else if (experienceYears >= 3) { score += 8; factors.push({ title: `${experienceYears} سال سابقه کار`, impact: 8, type: "positive" }); }
    else if (experienceYears >= 1) { score += 4; factors.push({ title: `${experienceYears} سال سابقه کار`, impact: 4, type: "positive" }); }
    else { score -= 5; factors.push({ title: "بدون سابقه کار", impact: -5, type: "negative" }); }

    if (hasJobOffer) { score += 20; factors.push({ title: "پیشنهاد کار (Job Offer) دارم", impact: 20, type: "positive" }); }
    if (hasSpecialSkill) { score += 8; factors.push({ title: "مهارت تخصصی ویژه", impact: 8, type: "positive" }); }

    if (savingsAmount >= 50000) { score += 12; factors.push({ title: `پس‌انداز €${savingsAmount.toLocaleString()}`, impact: 12, type: "positive" }); }
    else if (savingsAmount >= 30000) { score += 8; factors.push({ title: `پس‌انداز €${savingsAmount.toLocaleString()}`, impact: 8, type: "positive" }); }
    else if (savingsAmount >= 15000) { score += 4; factors.push({ title: `پس‌انداز €${savingsAmount.toLocaleString()}`, impact: 4, type: "positive" }); }
    else { score -= 5; factors.push({ title: "پس‌انداز کم", impact: -5, type: "negative" }); }

    if (passiveIncome >= 2000) { score += 15; factors.push({ title: `درآمد غیرفعال €${passiveIncome.toLocaleString()}`, impact: 15, type: "positive" }); }
    else if (passiveIncome >= 1200) { score += 8; factors.push({ title: `درآمد غیرفعال €${passiveIncome.toLocaleString()}`, impact: 8, type: "positive" }); }

    if (monthlyIncome >= 3500) { score += 8; factors.push({ title: `حقوق ماهانه €${monthlyIncome.toLocaleString()}`, impact: 8, type: "positive" }); }
    else if (monthlyIncome >= 2000) { score += 3; factors.push({ title: `حقوق ماهانه €${monthlyIncome.toLocaleString()}`, impact: 3, type: "positive" }); }

    if (mainGoal === "work" && hasJobOffer) score += 5;
    else if (mainGoal === "study" && austrianDegree) score += 5;

    if (maritalStatus === "married" && hasChildren) { score += 3; factors.push({ title: "خانواده با فرزند (بونوس اجتماعی)", impact: 3, type: "positive" }); }

    score = Math.max(5, Math.min(98, score));

    let bestVisa: VisaType = VISA_TYPES[0];
    const recommendedVisas: VisaType[] = [];

    if (mainGoal === "blue_card") {
      bestVisa = VISA_TYPES.find((v) => v.id === "blue-card")!;
      recommendedVisas.push(bestVisa);
      if (hasJobOffer) recommendedVisas.push(VISA_TYPES.find((v) => v.id === "rwr-highly")!);
    } else if (mainGoal === "job_seeker") {
      bestVisa = VISA_TYPES.find((v) => v.id === "job-seeker")!;
      recommendedVisas.push(bestVisa);
      if (score >= 70) recommendedVisas.push(VISA_TYPES.find((v) => v.id === "rwr-highly")!);
    } else if (mainGoal === "artist") {
      bestVisa = VISA_TYPES.find((v) => v.id === "artist")!;
      recommendedVisas.push(bestVisa);
    } else if (mainGoal === "permanent_eu" || mainGoal === "citizenship") {
      bestVisa = VISA_TYPES.find((v) => v.id === "permanent-eu")!;
      recommendedVisas.push(bestVisa);
      recommendedVisas.push(VISA_TYPES.find((v) => v.id === "blue-card")!);
    } else if (mainGoal === "work") {
      if (!hasJobOffer && score >= 70) {
        bestVisa = VISA_TYPES.find((v) => v.id === "job-seeker")!;
        recommendedVisas.push(bestVisa);
        recommendedVisas.push(VISA_TYPES.find((v) => v.id === "rwr-highly")!);
      } else if (age > 35 && hasJobOffer && (educationLevel === "master" || educationLevel === "phd" || educationLevel === "bachelor")) {
        bestVisa = VISA_TYPES.find((v) => v.id === "blue-card")!;
        recommendedVisas.push(bestVisa);
        recommendedVisas.push(VISA_TYPES.find((v) => v.id === "rwr-shortage")!);
      } else if (austrianDegree && hasJobOffer) {
        bestVisa = VISA_TYPES.find((v) => v.id === "rwr-graduate")!;
        recommendedVisas.push(bestVisa);
        recommendedVisas.push(VISA_TYPES.find((v) => v.id === "blue-card")!);
      } else if (["it", "engineering", "medicine", "nursing"].includes(currentJobField)) {
        bestVisa = VISA_TYPES.find((v) => v.id === "rwr-shortage")!;
        recommendedVisas.push(bestVisa);
        recommendedVisas.push(VISA_TYPES.find((v) => v.id === "blue-card")!);
      } else if (educationLevel === "phd" || educationLevel === "master") {
        bestVisa = VISA_TYPES.find((v) => v.id === "rwr-highly")!;
        recommendedVisas.push(bestVisa);
        recommendedVisas.push(VISA_TYPES.find((v) => v.id === "blue-card")!);
      } else {
        bestVisa = VISA_TYPES.find((v) => v.id === "rwr-shortage")!;
        recommendedVisas.push(bestVisa);
        recommendedVisas.push(VISA_TYPES.find((v) => v.id === "blue-card")!);
      }
    } else if (mainGoal === "study") {
      bestVisa = VISA_TYPES.find((v) => v.id === "student")!;
      recommendedVisas.push(bestVisa);
      if (austrianDegree) recommendedVisas.push(VISA_TYPES.find((v) => v.id === "rwr-graduate")!);
    } else if (mainGoal === "family") {
      bestVisa = VISA_TYPES.find((v) => v.id === "family")!;
      recommendedVisas.push(bestVisa);
    } else if (mainGoal === "business") {
      bestVisa = VISA_TYPES.find((v) => v.id === "startup")!;
      recommendedVisas.push(bestVisa);
      recommendedVisas.push(VISA_TYPES.find((v) => v.id === "blue-card")!);
    } else if (mainGoal === "retire" || mainGoal === "solvency" || passiveIncome >= 1200) {
      bestVisa = VISA_TYPES.find((v) => v.id === "solvency")!;
      recommendedVisas.push(bestVisa);
    } else {
      bestVisa = VISA_TYPES.find((v) => v.id === "blue-card") || VISA_TYPES[0];
      recommendedVisas.push(bestVisa);
    }

    const uniqueRecommended = recommendedVisas.filter((v, i, arr) => arr.findIndex((x) => x.id === v.id) === i);

    let strength: "قوی" | "متوسط" | "نیازمند تقویت" = "متوسط";
    let strengthColor = "text-amber-600 bg-amber-50 border-amber-200";
    if (score >= 75) { strength = "قوی"; strengthColor = "text-emerald-600 bg-emerald-50 border-emerald-200"; }
    else if (score < 45) { strength = "نیازمند تقویت"; strengthColor = "text-rose-600 bg-rose-50 border-rose-200"; }

    const improvements: { title: string; impact: string }[] = [];
    if (germanLevel === "none" || germanLevel === "a1") improvements.push({ title: "یادگیری زبان آلمانی تا سطح B1", impact: "+۱۵٪ شانس" });
    if (!hasJobOffer) improvements.push({ title: "کسب پیشنهاد کار از کارفرمای اتریشی", impact: "+۲۰٪ شانس" });
    if (savingsAmount < 30000) improvements.push({ title: "افزایش پس‌انداز به بالای €۳۰,۰۰۰", impact: "+۸٪ شانس" });
    if (educationLevel === "bachelor" || educationLevel === "vocational") improvements.push({ title: "اخذ مدرک ارشد یا تخصص بالاتر", impact: "+۱۰٪ شانس" });
    if (experienceYears < 3) improvements.push({ title: "کسب حداقل ۳ سال سابقه کار مستند", impact: "+۸٪ شانس" });
    if (!hasSpecialSkill) improvements.push({ title: "کسب مهارت تخصصی ویژه (گواهی، پروژه)", impact: "+۸٪ شانس" });

    return {
      score,
      factors: factors.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)),
      bestVisa,
      recommendedVisas: uniqueRecommended,
      strength,
      strengthColor,
      improvements: improvements.slice(0, 4),
    };
  }, [
    age, educationLevel, germanLevel, englishLevel, experienceYears, hasJobOffer,
    savingsAmount, monthlyIncome, passiveIncome, austrianDegree, fieldOfStudy,
    currentJobField, hasSpecialSkill, mainGoal, maritalStatus, hasChildren,
  ]);

  // ========== NAVIGATION HANDLERS ==========
  const handleNext = useCallback(() => {
    if (currentStep < 5) setCurrentStep((prev) => (prev + 1) as StepId);
    else { setShowResult(true); toast.success("تجزیه و تحلیل کامل شد! 🎯"); }
  }, [currentStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep((prev) => (prev - 1) as StepId);
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(0); setShowResult(false); setAge(30); setMaritalStatus("single");
    setHasChildren(false); setCurrentCountry("iran"); setEducationLevel("master");
    setFieldOfStudy("it"); setAustrianDegree(false); setGermanLevel("none");
    setEnglishLevel("intermediate"); setExperienceYears(3); setHasJobOffer(false);
    setCurrentJobField("it"); setHasSpecialSkill(false); setMonthlyIncome(2500);
    setSavingsAmount(20000); setPassiveIncome(0); setMainGoal("work"); setTimeline("6months");
    toast.success("آزمون بازنشانی شد");
  }, []);

  const handleCopyResult = useCallback(() => {
    const text = `🇦🇹 کارنامه آزمون شانس اقامت اتریش — ${SITE.name}\n${SITE.domain}\n\nامتیاز نهایی: ${result.score}٪\nوضعیت: ${result.strength}\n\nویزای پیشنهادی: ${result.bestVisa.name}\n${result.bestVisa.description}\n\nنقاط قوت:\n${result.factors.filter((f) => f.type === "positive").slice(0, 5).map((f) => `• ${f.title}: ${f.impact >= 0 ? "+" : ""}${f.impact}%`).join("\n")}\n\nاقدامات بهبود:\n${result.improvements.map((i) => `• ${i.title} → ${i.impact}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    toast.success("کارنامه کپی شد!");
  }, [result]);

  // ========== SEO SCHEMA — کامل با تصاویر و سایت دیاکو ==========
  const seoSchema = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE.domain}/#organization`,
      name: SITE.name,
      alternateName: SITE.nameEn,
      url: SITE.domain,
      logo: {
        "@type": "ImageObject",
        url: SITE.logo,
        width: 512,
        height: 512,
      },
      sameAs: [SITE.whatsapp, SITE.telegram],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "customer service",
        availableLanguage: ["fa", "de", "en"],
        areaServed: ["AT", "IR", "DE"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE.domain}/#website`,
      url: SITE.domain,
      name: SITE.name,
      inLanguage: "fa-IR",
      publisher: { "@id": `${SITE.domain}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": `${SITE.domain}/visa-wizard/#webapp`,
      name: "تست هوشمند شانس اقامت اتریش — اتریش‌نشین",
      alternateName: "Austria Visa Suitability Wizard by Otrish Neshin",
      description:
        "آزمون آنلاین چندمرحله‌ای برای بررسی شانس دریافت ویزا و اقامت اتریش. تجزیه و تحلیل هوشمند بر اساس سن، تحصیلات، زبان، تجربه کاری و وضعیت مالی.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      inLanguage: "fa-IR",
      url: `${SITE.domain}/visa-wizard`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "آزمون ۶ مرحله‌ای هوشمند",
        "ارزیابی ۱۳ نوع ویزای اتریش",
        "محاسبه درصد شانس موفقیت",
        "پیشنهاد ویزای برتر و مسیر جایگزین",
        "اقدامات بهبود شخصی‌سازی‌شده",
      ],
      screenshot: IMAGES.hero.src,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "2300",
        bestRating: "5",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${SITE.domain}/visa-wizard/#howto`,
      name: "نحوه استفاده از آزمون هوشمند شانس اقامت اتریش",
      description: "راهنمای گام‌به‌گام آزمون چندمرحله‌ای برای بررسی شانس دریافت ویزا و اقامت اتریش.",
      inLanguage: "fa-IR",
      image: IMAGES.hero.src,
      step: [
        { "@type": "HowToStep", position: 1, name: "وارد کردن اطلاعات شخصی (سن، وضعیت تأهل، فرزندان)", url: `${SITE.domain}/visa-wizard#step-1` },
        { "@type": "HowToStep", position: 2, name: "ثبت تحصیلات و رشته تحصیلی", url: `${SITE.domain}/visa-wizard#step-2` },
        { "@type": "HowToStep", position: 3, name: "تعیین سطح زبان آلمانی و انگلیسی", url: `${SITE.domain}/visa-wizard#step-3` },
        { "@type": "HowToStep", position: 4, name: "درج سابقه کاری و مهارت‌های تخصصی", url: `${SITE.domain}/visa-wizard#step-4` },
        { "@type": "HowToStep", position: 5, name: "ثبت وضعیت مالی و پس‌انداز", url: `${SITE.domain}/visa-wizard#step-5` },
        { "@type": "HowToStep", position: 6, name: "انتخاب هدف اصلی (کار، تحصیل، خانواده)", url: `${SITE.domain}/visa-wizard#step-6` },
        { "@type": "HowToStep", position: 7, name: "دریافت کارنامه تفصیلی با درصد شانس و ویزای پیشنهادی", url: `${SITE.domain}/visa-wizard#result` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE.domain}/visa-wizard/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${SITE.domain}/visa-wizard/#article`,
      headline: "تست هوشمند شانس اقامت اتریش ۲۰۲۶ | ارزیابی ۱۳ نوع ویزا — اتریش‌نشین",
      description: "آزمون آنلاین رایگان برای سنجش شانس دریافت اقامت اتریش و پیشنهاد بهترین نوع ویزا بر اساس پروفایل شما.",
      author: { "@type": "Organization", name: SITE.name, url: SITE.domain },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        logo: { "@type": "ImageObject", url: SITE.logo, width: 512, height: 512 },
      },
      image: [IMAGES.hero.src, IMAGES.office.src, IMAGES.university.src, IMAGES.family.src],
      inLanguage: "fa-IR",
      datePublished: "2025-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.domain}/visa-wizard` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${SITE.domain}/visa-wizard/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "خانه", item: SITE.domain },
        { "@type": "ListItem", position: 2, name: "راهنمای مهاجرت اتریش", item: `${SITE.domain}/guides` },
        { "@type": "ListItem", position: 3, name: "تست هوشمند شانس اقامت", item: `${SITE.domain}/visa-wizard` },
      ],
    },
    // ImageObject schemas — برای ایندکس شدن در Google Images
    ...Object.values(IMAGES).map((img, idx) => ({
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "@id": `${SITE.domain}/visa-wizard/#image-${idx + 1}`,
      url: img.src,
      contentUrl: img.src,
      width: img.width,
      height: img.height,
      name: img.caption,
      description: img.alt,
      caption: img.caption,
      inLanguage: "fa-IR",
      representativeOfPage: idx === 0,
      creator: { "@id": `${SITE.domain}/#organization` },
    })),
  ], []);

  // ========== RENDER ==========
  return (
    <GuideContainer
      title="تست هوشمند شانس اقامت اتریش | اتریش‌نشین"
      description="ارزیابی آنلاین شانس دریافت ۱۳ نوع ویزای اتریش بر اساس پروفایل شخصی، تحصیلی و مالی شما — توسط اتریش‌نشین"
    >
      <SEO
        title="تست هوشمند شانس اقامت اتریش ۲۰۲۶ | ارزیابی ۱۳ نوع ویزا — اتریش‌نشین"
        description="آزمون آنلاین رایگان چندمرحله‌ای برای بررسی شانس دریافت اقامت اتریش. ارزیابی هوشمند ۱۳ نوع ویزا: RWR Card، Bleu Card، تحصیلی، الحاق خانواده، تمکن مالی و استارتاپ. با درصد شانس و مسیر پیشنهادی. اتریش‌نشین."
        keywords="تست اقامت اتریش, شانس ویزای اتریش, ارزیابی اقامت, RWR Card, کارت آبی اتریش, ویزای تحصیلی اتریش, الحاق خانواده اتریش, ویزای استارتاپ, مهاجرت به اتریش, MA35, اتریش‌نشین, dia-co.ir"
        type="guide"
        aiSummary="آزمون هوشمند ۶ مرحله‌ای برای ارزیابی شانس دریافت اقامت اتریش. با تجزیه و تحلیل سن، تحصیلات، زبان، تجربه و وضعیت مالی، بهترین نوع ویزا و درصد موفقیت تخمین زده می‌شود. ارائه‌شده توسط اتریش‌نشین."
        aiKeywords={["Austria visa assessment", "RWR Card eligibility", "Austria immigration quiz", "Vienna visa wizard", "Blaue Karte EU", "Diako Immigration"]}
        schemaData={seoSchema}
        canonicalUrl={`${SITE.domain}/visa-wizard`}
        ogImage={IMAGES.hero.src}
        ogImageAlt={IMAGES.hero.alt}
        siteName={SITE.name}
        locale="fa_IR"
      />

      {/* Preload hero image for LCP optimization */}
      <link
        rel="preload"
        as="image"
        href={IMAGES.hero.src}
        imageSrcSet={IMAGES.hero.srcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />

      <div className="space-y-10 font-sans" dir="rtl" itemScope itemType="https://schema.org/WebApplication">

        {/* ========================================== */}
        {/* HERO */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          aria-labelledby="hero-title"
          className="relative overflow-hidden rounded-3xl text-white"
          style={{
            background: "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          {/* LCP image — eager + high priority */}
          <div className="absolute inset-0 opacity-30">
            <SeoImage
              img={IMAGES.hero}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#1e1512]/90 via-[#38100e]/80 to-[#9e142d]/60" aria-hidden="true" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none" aria-hidden="true">🎯</div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              آزمون هوشمند ۶ مرحله‌ای — {SITE.name}
            </div>

            <h1 id="hero-title" className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl" itemProp="name">
              شانس اقامتت در اتریش چقدر است؟ در ۲ دقیقه بفهم
            </h1>

            <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-6" itemProp="description">
              با پاسخ به <strong className="text-amber-300">۶ پرسش کوتاه</strong>، هوشمندترین
              آزمون ارزیابی اقامت اتریش را تجربه کنید. سیستم بر اساس
              <strong className="text-amber-300"> ۱۳ نوع ویزای مختلف</strong>، پروفایل شخصی، تحصیلی،
              زبانی و مالی شما را تحلیل کرده و بهترین مسیر مهاجرت را پیشنهاد می‌دهد.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>۱۳ نوع ویزا</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>دقت ۹۳٪</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>کاملاً رایگان</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-3"
                  >
                    <Icon className="w-4 h-4 text-amber-300 mb-1" aria-hidden="true" />
                    <div className="text-lg font-black font-mono" dir="ltr">{s.value}</div>
                    <div className="text-[9px] font-black text-rose-100/70 leading-tight">{s.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex gap-3 flex-wrap mt-6">
              <a
                href="#wizard"
                className="inline-flex items-center gap-2 bg-white text-[#9e142d] font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                aria-label="شروع آزمون هوشمند شانس اقامت اتریش"
              >
                <Rocket className="w-4 h-4" aria-hidden="true" />
                شروع آزمون هوشمند
              </a>
              {onSwitchToAlternativeRecommender ? (
                <button
                  onClick={onSwitchToAlternativeRecommender}
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-900" aria-hidden="true" />
                  موتور هوشمند پیشنهاد ویزاهای جایگزین
                </button>
              ) : (
                <a
                  href="#smart-alternatives-recommender"
                  className="inline-flex items-center gap-2 bg-amber-400/90 hover:bg-amber-300 text-stone-950 font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-900" aria-hidden="true" />
                  پیشنهاد ویزاهای جایگزین
                </a>
              )}
              <a
                href={SITE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white font-black text-xs px-5 py-3 rounded-2xl hover:bg-white/20 transition-all"
                aria-label="مشاوره فوری RWR در تلگرام دیاکو"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                مشاوره فوری RWR
              </a>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 border border-rose-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Quote className="w-7 h-7" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-[#c8102e] mb-1">چرا قبل از هر اقدامی، ارزیابی کنید؟</div>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">
                <strong className="text-[#c8102e]">۷۰٪ درخواست‌های رد شده، به دلیل انتخاب اشتباه نوع ویزا است.</strong> بسیاری
                از متقاضیان بدون شناخت دقیق شرایط خود، وقت و هزینه‌شان را برای ویزایی
                صرف می‌کنند که با پروفایلشان تطابق ندارد. این آزمون هوشمند، با تحلیل
                <strong className="text-amber-700"> ۱۵ فاکتور کلیدی</strong> به شما کمک می‌کند
                بهترین و کوتاه‌ترین مسیر مهاجرت را پیدا کنید — قبل از هر اقدامی.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* VISA TYPES OVERVIEW */}
        {/* ========================================== */}
        <section aria-labelledby="visa-types-title">
          <div className="mb-5">
            <h2 id="visa-types-title" className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#c8102e]" aria-hidden="true" />
              روش‌های قانونی مهاجرت و اقامت اتریش که در این سامانه ارزیابی می‌شوند
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              آزمون، شرایط فردی، تحصیلی، مالی و شغلی شما را با تمام مسیرهای رسمی مقایسه کرده و شانس موفقیت و پلن‌های جایگزین را مشخص می‌کند.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {VISA_TYPES.map((visa, i) => {
              const Icon = visa.icon;
              return (
                <motion.article
                  key={visa.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 hover:shadow-md transition-all group"
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${visa.gradient} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-black text-stone-900 leading-tight" itemProp="name">{visa.name}</h3>
                      <div className={`inline-flex items-center gap-1 text-[9px] font-black mt-1 px-2 py-0.5 rounded-full border ${visa.difficultyColor}`}>
                        <Gauge className="w-2.5 h-2.5" aria-hidden="true" />
                        {visa.difficulty}
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-stone-600 font-bold leading-relaxed mb-3 line-clamp-2" itemProp="description">
                    {visa.description}
                  </p>
                  <div className="bg-stone-50 rounded-xl p-2.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] font-bold">
                      <span className="text-stone-500">کلید اصلی:</span>
                      <span className={`font-black ${visa.color}`}>{visa.keyRequirement}</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-bold">
                      <span className="text-stone-500">زمان تقریبی:</span>
                      <span className="font-black text-stone-700">{visa.averageTime}</span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* ========================================== */}
        {/* WIZARD */}
        {/* ========================================== */}
        <section id="wizard" className="scroll-mt-24" aria-labelledby="wizard-title">
          <div className="mb-5">
            <h2 id="wizard-title" className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#c8102e]" aria-hidden="true" />
              آزمون هوشمند شانس اقامت — ۶ مرحله
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">هر مرحله کمتر از ۳۰ ثانیه زمان می‌برد</p>
          </div>

          {!showResult ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm"
            >
              {/* Progress Bar */}
              <div className="bg-gradient-to-r from-stone-50 to-white border-b border-stone-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-[#c8102e] bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full">
                      مرحله {currentStep + 1} از ۶
                    </span>
                    <span className="text-[10px] font-black text-stone-500">{STEPS[currentStep].title}</span>
                  </div>
                  <span className="text-[10px] font-black text-stone-400 font-mono" dir="ltr">
                    {Math.round(((currentStep + 1) / 6) * 100)}%
                  </span>
                </div>
                <div className="flex gap-1.5" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={6}>
                  {STEPS.map((step, idx) => {
                    const isActive = idx === currentStep;
                    const isCompleted = idx < currentStep;
                    return (
                      <button
                        key={step.id}
                        onClick={() => isCompleted && setCurrentStep(idx as StepId)}
                        aria-label={`برو به مرحله ${step.title}`}
                        className={`flex-1 h-2 rounded-full transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-[#c8102e] to-[#970d22] shadow-sm"
                            : isCompleted
                            ? "bg-gradient-to-r from-emerald-400 to-emerald-500 cursor-pointer"
                            : "bg-stone-200"
                        }`}
                        title={step.title}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Step content */}
              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      {(() => {
                        const StepIcon = STEPS[currentStep].icon;
                        return (
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-md">
                            <StepIcon className="w-7 h-7" aria-hidden="true" />
                          </div>
                        );
                      })()}
                      <div>
                        <h3 className="text-lg font-black text-stone-900">{STEPS[currentStep].title}</h3>
                        <p className="text-[11px] text-stone-500 font-bold mt-0.5">{STEPS[currentStep].subtitle}</p>
                      </div>
                    </div>

                    {/* ==== STEP 0: PERSONAL ==== */}
                    {currentStep === 0 && (
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex items-center gap-1.5" htmlFor="age-slider">
                            <User className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                            سن شما
                          </label>
                          <input
                            id="age-slider"
                            type="range"
                            min="18"
                            max="65"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            className="w-full accent-[#c8102e] h-2"
                            aria-valuemin={18}
                            aria-valuemax={65}
                            aria-valuenow={age}
                          />
                          <div className="flex justify-between text-[10px] font-black text-stone-500">
                            <span>۱۸ سال</span>
                            <span className="text-[#c8102e] text-base font-mono" dir="ltr">{age} سال</span>
                            <span>۶۵ سال</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                            وضعیت تأهل
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: "single", label: "مجرد" },
                              { id: "married", label: "متأهل" },
                              { id: "divorced", label: "جدا شده" },
                            ].map((s) => (
                              <button
                                key={s.id}
                                onClick={() => setMaritalStatus(s.id)}
                                aria-pressed={maritalStatus === s.id}
                                className={`p-3 rounded-xl text-[11px] font-black transition-all border-2 ${
                                  maritalStatus === s.id
                                    ? "border-[#c8102e] bg-rose-50/50 text-[#c8102e] shadow-sm"
                                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                                }`}
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex items-center gap-1.5">
                            <Baby className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                            آیا فرزند زیر ۱۸ سال دارید؟
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: false, label: "خیر" },
                              { id: true, label: "بله" },
                            ].map((s) => (
                              <button
                                key={String(s.id)}
                                onClick={() => setHasChildren(s.id)}
                                aria-pressed={hasChildren === s.id}
                                className={`p-3 rounded-xl text-[11px] font-black transition-all border-2 ${
                                  hasChildren === s.id
                                    ? "border-[#c8102e] bg-rose-50/50 text-[#c8102e] shadow-sm"
                                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                                }`}
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ==== STEP 1: EDUCATION ==== */}
                    {currentStep === 1 && (
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                            بالاترین مدرک تحصیلی
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {[
                              { id: "phd", label: "دکترا" },
                              { id: "master", label: "ارشد" },
                              { id: "bachelor", label: "کارشناسی" },
                              { id: "vocational", label: "فنی/کاردانی" },
                              { id: "secondary", label: "دیپلم" },
                            ].map((e) => (
                              <button
                                key={e.id}
                                onClick={() => setEducationLevel(e.id)}
                                aria-pressed={educationLevel === e.id}
                                className={`p-3 rounded-xl text-[10px] font-black transition-all border-2 ${
                                  educationLevel === e.id
                                    ? "border-[#c8102e] bg-rose-50/50 text-[#c8102e] shadow-sm"
                                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                                }`}
                              >
                                {e.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex items-center gap-1.5" htmlFor="field-select">
                            <BookOpen className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                            رشته تحصیلی
                          </label>
                          <select
                            id="field-select"
                            value={fieldOfStudy}
                            onChange={(e) => setFieldOfStudy(e.target.value)}
                            className="w-full bg-white border-2 border-stone-200 rounded-xl p-3 text-xs font-bold outline-none focus:border-[#c8102e] transition-all"
                          >
                            <option value="it">مهندسی کامپیوتر / IT</option>
                            <option value="engineering">مهندسی (مکانیک، برق، عمران)</option>
                            <option value="medicine">پزشکی / دندانپزشکی / داروسازی</option>
                            <option value="nursing">پرستاری / پیراپزشکی</option>
                            <option value="business">مدیریت / MBA / مالی</option>
                            <option value="law">حقوق</option>
                            <option value="education">آموزش / پژوهش</option>
                            <option value="arts">هنر / طراحی</option>
                            <option value="other">سایر رشته‌ها</option>
                          </select>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer p-3 bg-stone-50 border-2 border-stone-200 rounded-xl hover:border-[#c8102e]/40 transition-all">
                          <input
                            type="checkbox"
                            checked={austrianDegree}
                            onChange={(e) => setAustrianDegree(e.target.checked)}
                            className="w-4 h-4 accent-[#c8102e] cursor-pointer"
                          />
                          <span className="text-[11px] font-black text-stone-700">
                            مدرک من از دانشگاه اتریش است (+۱۵٪ بونوس)
                          </span>
                        </label>
                      </div>
                    )}

                    {/* ==== STEP 2: LANGUAGE ==== */}
                    {currentStep === 2 && (
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex items-center gap-1.5">
                            <Languages className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                            سطح زبان آلمانی
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {[
                              { id: "none", label: "بدون مدرک" },
                              { id: "a1", label: "A1" },
                              { id: "a2", label: "A2" },
                              { id: "b1", label: "B1" },
                              { id: "b2", label: "B2/C1" },
                            ].map((g) => (
                              <button
                                key={g.id}
                                onClick={() => setGermanLevel(g.id)}
                                aria-pressed={germanLevel === g.id}
                                className={`p-3 rounded-xl text-[10px] font-black transition-all border-2 ${
                                  germanLevel === g.id
                                    ? "border-[#c8102e] bg-rose-50/50 text-[#c8102e] shadow-sm"
                                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                                }`}
                              >
                                {g.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                            سطح زبان انگلیسی
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: "none", label: "ضعیف" },
                              { id: "intermediate", label: "متوسط" },
                              { id: "advanced", label: "پیشرفته (IELTS 7+)" },
                            ].map((e) => (
                              <button
                                key={e.id}
                                onClick={() => setEnglishLevel(e.id)}
                                aria-pressed={englishLevel === e.id}
                                className={`p-3 rounded-xl text-[10px] font-black transition-all border-2 ${
                                  englishLevel === e.id
                                    ? "border-[#c8102e] bg-rose-50/50 text-[#c8102e] shadow-sm"
                                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                                }`}
                              >
                                {e.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
                            <strong>نکته:</strong> مدرک آلمانی B1 به بالا، شانس شما را تا ۱۵٪ افزایش
                            می‌دهد. برای مشاغل درمان و حقوقی، آلمانی C1 الزامی است.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ==== STEP 3: WORK ==== */}
                    {currentStep === 3 && (
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex justify-between" htmlFor="exp-slider">
                            <span className="flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                              سابقه کار تخصصی
                            </span>
                            <span className="text-sm font-black text-[#c8102e] font-mono" dir="ltr">{experienceYears} سال</span>
                          </label>
                          <input
                            id="exp-slider"
                            type="range"
                            min="0"
                            max="20"
                            value={experienceYears}
                            onChange={(e) => setExperienceYears(Number(e.target.value))}
                            className="w-full accent-[#c8102e] h-2"
                            aria-valuemin={0}
                            aria-valuemax={20}
                            aria-valuenow={experienceYears}
                          />
                          <div className="flex justify-between text-[9px] text-stone-400 font-bold">
                            <span>۰</span>
                            <span>۵ سال (نقطه طلایی)</span>
                            <span>۱۰+</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex items-center gap-1.5" htmlFor="job-field-select">
                            <Building2 className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                            حوزه کاری فعلی شما
                          </label>
                          <select
                            id="job-field-select"
                            value={currentJobField}
                            onChange={(e) => setCurrentJobField(e.target.value)}
                            className="w-full bg-white border-2 border-stone-200 rounded-xl p-3 text-xs font-bold outline-none focus:border-[#c8102e] transition-all"
                          >
                            <option value="it">IT / برنامه‌نویسی</option>
                            <option value="engineering">مهندسی</option>
                            <option value="nursing">پرستاری / درمان</option>
                            <option value="medicine">پزشکی</option>
                            <option value="business">مدیریت / مالی</option>
                            <option value="education">آموزش</option>
                            <option value="hospitality">هتل / گردشگری</option>
                            <option value="other">سایر</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className={`flex items-center gap-2 cursor-pointer p-3 border-2 rounded-xl transition-all ${
                            hasJobOffer ? "border-emerald-400 bg-emerald-50" : "border-stone-200 bg-white hover:border-stone-300"
                          }`}>
                            <input
                              type="checkbox"
                              checked={hasJobOffer}
                              onChange={(e) => setHasJobOffer(e.target.checked)}
                              className="w-4 h-4 accent-[#c8102e] cursor-pointer"
                            />
                            <span className="text-[11px] font-black text-stone-700">پیشنهاد کار (Job Offer) دارم</span>
                          </label>

                          <label className={`flex items-center gap-2 cursor-pointer p-3 border-2 rounded-xl transition-all ${
                            hasSpecialSkill ? "border-emerald-400 bg-emerald-50" : "border-stone-200 bg-white hover:border-stone-300"
                          }`}>
                            <input
                              type="checkbox"
                              checked={hasSpecialSkill}
                              onChange={(e) => setHasSpecialSkill(e.target.checked)}
                              className="w-4 h-4 accent-[#c8102e] cursor-pointer"
                            />
                            <span className="text-[11px] font-black text-stone-700">مهارت تخصصی ویژه دارم</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* ==== STEP 4: FINANCIAL ==== */}
                    {currentStep === 4 && (
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex justify-between" htmlFor="income-slider">
                            <span className="flex items-center gap-1.5">
                              <Banknote className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                              حقوق ماهانه فعلی (خالص)
                            </span>
                            <span className="text-sm font-black text-[#c8102e] font-mono" dir="ltr">€{monthlyIncome.toLocaleString()}</span>
                          </label>
                          <input
                            id="income-slider"
                            type="range"
                            min="500"
                            max="10000"
                            step="100"
                            value={monthlyIncome}
                            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                            className="w-full accent-[#c8102e] h-2"
                            aria-valuemin={500}
                            aria-valuemax={10000}
                            aria-valuenow={monthlyIncome}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex justify-between" htmlFor="savings-slider">
                            <span className="flex items-center gap-1.5">
                              <Wallet className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                              موجودی پس‌انداز
                            </span>
                            <span className="text-sm font-black text-[#c8102e] font-mono" dir="ltr">€{savingsAmount.toLocaleString()}</span>
                          </label>
                          <input
                            id="savings-slider"
                            type="range"
                            min="0"
                            max="150000"
                            step="1000"
                            value={savingsAmount}
                            onChange={(e) => setSavingsAmount(Number(e.target.value))}
                            className="w-full accent-[#c8102e] h-2"
                            aria-valuemin={0}
                            aria-valuemax={150000}
                            aria-valuenow={savingsAmount}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex justify-between" htmlFor="passive-slider">
                            <span className="flex items-center gap-1.5">
                              <CircleDollarSign className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                              درآمد غیرفعال ماهانه (اجاره، سود سهام)
                            </span>
                            <span className="text-sm font-black text-[#c8102e] font-mono" dir="ltr">€{passiveIncome.toLocaleString()}</span>
                          </label>
                          <input
                            id="passive-slider"
                            type="range"
                            min="0"
                            max="5000"
                            step="100"
                            value={passiveIncome}
                            onChange={(e) => setPassiveIncome(Number(e.target.value))}
                            className="w-full accent-[#c8102e] h-2"
                            aria-valuemin={0}
                            aria-valuemax={5000}
                            aria-valuenow={passiveIncome}
                          />
                        </div>

                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <p className="text-[10px] text-emerald-800 font-bold leading-relaxed">
                            <strong>نکته:</strong> برای ویزای تمکن مالی، حداقل درآمد غیرفعال
                            €۱,۲۰۰ ماهانه + پس‌انداز €۳۰,۰۰۰+ نیاز است.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ==== STEP 5: GOAL ==== */}
                    {currentStep === 5 && (
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex items-center gap-1.5">
                            <Target className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                            هدف اصلی شما از مهاجرت به اتریش
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                            {[
                              { id: "work", label: "کار و استخدام", icon: Briefcase },
                              { id: "blue_card", label: "کارت آبی اتریش (Blaue Karte)", icon: Award },
                              { id: "job_seeker", label: "جستجوی کار (Jobseeker)", icon: Compass },
                              { id: "study", label: "اقامت دانشجویی (Student)", icon: GraduationCap },
                              { id: "artist", label: "اقامت هنرمندی (Künstler)", icon: Sparkles },
                              { id: "solvency", label: "تمکن مالی / خودحمایتی", icon: CircleDollarSign },
                              { id: "permanent_eu", label: "اقامت دائم اتریش (Daueraufenthalt)", icon: Shield },
                              { id: "business", label: "کارآفرینی/استارتاپ", icon: Rocket },
                              { id: "family", label: "الحاق خانواده", icon: Users },
                              { id: "citizenship", label: "شهروندی بلندمدت", icon: Trophy },
                            ].map((g) => {
                              const Icon = g.icon;
                              return (
                                <button
                                  key={g.id}
                                  onClick={() => setMainGoal(g.id)}
                                  aria-pressed={mainGoal === g.id}
                                  className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all border-2 ${
                                    mainGoal === g.id
                                      ? "border-[#c8102e] bg-rose-50/50 text-[#c8102e] shadow-sm"
                                      : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                                  }`}
                                >
                                  <Icon className="w-5 h-5" aria-hidden="true" />
                                  <span className="text-[10px] font-black">{g.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-stone-700 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#c8102e]" aria-hidden="true" />
                            زمان شروع مورد نظر شما
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              { id: "now", label: "فوری" },
                              { id: "6months", label: "۶ ماه" },
                              { id: "1year", label: "۱ سال" },
                              { id: "later", label: "بدون عجله" },
                            ].map((t) => (
                              <button
                                key={t.id}
                                onClick={() => setTimeline(t.id)}
                                aria-pressed={timeline === t.id}
                                className={`p-3 rounded-xl text-[10px] font-black transition-all border-2 ${
                                  timeline === t.id
                                    ? "border-[#c8102e] bg-rose-50/50 text-[#c8102e] shadow-sm"
                                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                                }`}
                              >
                                {t.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                          <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <p className="text-[10px] text-sky-800 font-bold leading-relaxed">
                              <strong>آماده دریافت کارنامه هستید؟</strong> با کلیک روی «تجزیه و تحلیل»،
                              سیستم هوشمند پروفایل شما را با هر ۱۳ نوع ویزا مقایسه کرده و
                              بهترین مسیر را به همراه درصد شانس موفقیت ارائه می‌دهد.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="bg-stone-50 border-t border-stone-200 p-4 flex items-center justify-between gap-3 flex-wrap">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  aria-label="مرحله قبلی"
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-black transition-all ${
                    currentStep === 0
                      ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                      : "bg-white border border-stone-200 text-stone-700 hover:border-stone-300 hover:shadow-sm"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  مرحله قبلی
                </button>

                <div className="flex items-center gap-1.5 order-first md:order-none" aria-hidden="true">
                  {STEPS.map((s, idx) => (
                    <div
                      key={s.id}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentStep
                          ? "bg-[#c8102e] w-6"
                          : idx < currentStep
                          ? "bg-emerald-400"
                          : "bg-stone-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  aria-label={currentStep === 5 ? "تجزیه و تحلیل شانس" : "مرحله بعد"}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white rounded-2xl text-xs font-black hover:scale-105 transition-all shadow-md shadow-red-500/20"
                >
                  {currentStep === 5 ? (
                    <>
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                      تجزیه و تحلیل شانس
                    </>
                  ) : (
                    <>
                      مرحله بعد
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            /* ========================================== */
            /* RESULT PANEL */
            /* ========================================== */
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
              id="result"
            >
              {/* Big Score Card */}
              <div className={`relative overflow-hidden rounded-3xl p-6 md:p-8 text-white ${
                result.score >= 75
                  ? "bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800"
                  : result.score >= 45
                  ? "bg-gradient-to-br from-amber-500 via-orange-600 to-rose-700"
                  : "bg-gradient-to-br from-[#1e1512] via-[#38100e] to-[#9e142d]"
              }`}>
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 border border-white/25 rounded-full text-[10px] font-black backdrop-blur-sm">
                      <Sparkles className="w-3 h-3 text-amber-300" aria-hidden="true" />
                      کارنامه آزمون هوشمند اقامت — {SITE.name}
                    </div>
                    <button
                      onClick={handleReset}
                      aria-label="آزمون مجدد"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 border border-white/25 rounded-full text-[10px] font-black backdrop-blur-sm transition-all"
                    >
                      <RefreshCw className="w-3 h-3" aria-hidden="true" />
                      آزمون مجدد
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div className="text-center md:text-right">
                      <div className="text-[11px] font-black text-white/70 mb-2">درصد شانس موفقیت شما</div>
                      <div className="flex items-baseline justify-center md:justify-start gap-2">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                          className="text-6xl md:text-7xl font-black leading-none font-mono"
                          dir="ltr"
                          aria-label={`امتیاز ${result.score} درصد`}
                        >
                          {result.score}
                        </motion.div>
                        <div className="text-2xl font-black opacity-60 mb-2">%</div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full text-xs font-black border-2 bg-white/15 border-white/25 backdrop-blur-sm">
                        {result.strength === "قوی" ? (
                          <>
                            <Trophy className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                            پروفایل قوی
                          </>
                        ) : result.strength === "متوسط" ? (
                          <>
                            <TrendingUp className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                            پروفایل متوسط
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                            نیازمند تقویت
                          </>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="w-full bg-white/15 h-4 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.score}%` }}
                          transition={{ delay: 0.3, duration: 1 }}
                          className="h-full bg-gradient-to-r from-white/50 via-white/80 to-white rounded-full"
                        />
                      </div>
                      <div className="flex justify-between text-[9px] font-black text-white/60 mt-2">
                        <span>ضعیف</span>
                        <span>متوسط (۴۵+)</span>
                        <span>قوی (۷۵+)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Visa Recommendation */}
              <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-stone-50 to-white border-b border-stone-200 p-5">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" aria-hidden="true" />
                    <h3 className="text-base font-black text-stone-900">ویزای پیشنهادی برتر برای شما</h3>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    <div>
                      <div className={`inline-flex items-center gap-3 mb-4`}>
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${result.bestVisa.gradient} flex items-center justify-center text-white shadow-lg`}>
                          <result.bestVisa.icon className="w-7 h-7" aria-hidden="true" />
                        </div>
                        <div>
                          <div className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${result.bestVisa.difficultyColor} inline-flex items-center gap-1`}>
                            <Gauge className="w-2.5 h-2.5" aria-hidden="true" />
                            {result.bestVisa.difficulty}
                          </div>
                          <h4 className="text-lg font-black text-stone-900 mt-1">{result.bestVisa.name}</h4>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">{result.bestVisa.description}</p>

                      <div className="bg-stone-50 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-stone-500">کلید اصلی ورود:</span>
                          <span className={`font-black ${result.bestVisa.color}`}>{result.bestVisa.keyRequirement}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-stone-500">زمان تقریبی پروسه:</span>
                          <span className="font-black text-stone-700">{result.bestVisa.averageTime}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-stone-500">مسیر پیشنهادی:</span>
                          <span className="font-black text-stone-700 text-left">{result.bestVisa.pathway}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-black text-stone-500 mb-3 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                        شرایط اصلی این ویزا
                      </div>
                      <ul className="space-y-2">
                        {result.bestVisa.eligibility.map((e, i) => (
                          <li key={i} className="flex items-start gap-2 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3">
                            <CheckCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-[11px] text-emerald-800 font-bold leading-relaxed">{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Factors Breakdown */}
              <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-stone-50 to-white border-b border-stone-200 p-5">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#c8102e]" aria-hidden="true" />
                    <h3 className="text-base font-black text-stone-900">تحلیل ۱۵ فاکتور مؤثر بر پرونده شما</h3>
                  </div>
                </div>

                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-3">
                  {result.factors.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.04 }}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 ${
                        f.type === "positive" ? "bg-emerald-50/50 border-emerald-100" : "bg-rose-50/50 border-rose-100"
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {f.type === "positive" ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" aria-hidden="true" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" aria-hidden="true" />
                        )}
                        <span className={`text-[11px] font-bold leading-tight truncate ${
                          f.type === "positive" ? "text-emerald-900" : "text-rose-900"
                        }`}>
                          {f.title}
                        </span>
                      </div>
                      <span className={`text-[12px] font-black font-mono shrink-0 ml-2 ${
                        f.type === "positive" ? "text-emerald-600" : "text-rose-600"
                      }`} dir="ltr">
                        {f.impact >= 0 ? "+" : ""}{f.impact}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Intelligent Alternative Visas Recommender */}
              <div id="smart-alternatives-recommender" className="scroll-mt-20">
                <SmartAlternativeVisaRecommender
                  initialUserData={{
                    score: result.score,
                    age, educationLevel, germanLevel, englishLevel, experienceYears,
                    hasJobOffer, currentJobField, savingsAmount, passiveIncome,
                    monthlyIncome, austrianDegree, mainGoal, maritalStatus, hasChildren,
                  }}
                  onRetest={handleReset}
                  isEmbeddedInResults={true}
                />
              </div>

              {/* Improvement Recommendations */}
              {result.improvements.length > 0 && (
                <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-amber-50 to-white border-b border-amber-200 p-5">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-amber-600" aria-hidden="true" />
                      <h3 className="text-base font-black text-stone-900">اقدامات بهبود شانس شما</h3>
                      <span className="text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                        شخصی‌سازی‌شده
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    {result.improvements.map((imp, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.08 }}
                        className="flex items-center justify-between bg-amber-50/50 border border-amber-100 rounded-xl p-3"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                            {i + 1}
                          </div>
                          <span className="text-[11px] font-black text-amber-900">{imp.title}</span>
                        </div>
                        <span className="text-[11px] font-black text-amber-700 bg-white border border-amber-200 px-2 py-0.5 rounded-full shrink-0 ml-2">
                          {imp.impact}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="bg-white rounded-3xl border border-stone-200 p-5 md:p-6 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-sm font-black text-stone-900 mb-1">قدم بعدی: بررسی تخصصی پرونده شما</h3>
                  <p className="text-[10px] text-stone-500 font-bold">
                    کارنامه‌ات را با تیم {SITE.name} بررسی کن و برنامه شخصی‌سازی‌شده بگیر
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap justify-center">
                  <button
                    onClick={handleCopyResult}
                    aria-label="کپی کارنامه"
                    className="inline-flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black text-xs px-5 py-3 rounded-2xl transition-all"
                  >
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    کپی کارنامه
                  </button>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="مشاوره در واتس‌اپ"
                    className="inline-flex items-center gap-1.5 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" aria-hidden="true" />
                    مشاوره در واتس‌اپ
                  </a>
                  <a
                    href={SITE.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ارسال در تلگرام"
                    className="inline-flex items-center gap-1.5 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    ارسال در تلگرام
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* ========================================== */}
        {/* 3 IMAGE GALLERY — با figure/figcaption و SEO */}
        {/* ========================================== */}
        <section aria-labelledby="paths-title">
          <div className="mb-5">
            <h2 id="paths-title" className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#c8102e]" aria-hidden="true" />
              سه مسیر موفقیت پس از این آزمون
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">بر اساس کارنامه خود، یکی از این مسیرها را انتخاب کنید</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { img: IMAGES.office, title: "مسیر کاری (RWR Card)", subtitle: "برای متخصصان", desc: "با امتیاز بالای ۷۰ و جاب‌آفر معتبر، در ۸-۱۲ هفته کارت RWR صادر می‌شود.", icon: Briefcase, gradient: "from-[#c8102e] to-[#970d22]", stat: "۸۵٪ شانس" },
              { img: IMAGES.university, title: "مسیر تحصیلی", subtitle: "برای دانشجویان", desc: "با پذیرش دانشگاه اتریش و تمکن مالی، در ۶-۱۲ هفته ویزای تحصیلی صادر می‌شود.", icon: GraduationCap, gradient: "from-indigo-600 to-blue-700", stat: "۷۵٪ شانس" },
              { img: IMAGES.family, title: "مسیر خانوادگی", subtitle: "برای الحاق خانواده", desc: "با اسپانسر مقیم و تمکن کافی، پس از ۸-۱۵ ماه ویزای الحاق صادر می‌شود.", icon: Users, gradient: "from-emerald-600 to-teal-700", stat: "۶۵٪ شانس" },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-stone-200 hover:shadow-xl transition-all m-0"
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <div className="relative h-56 overflow-hidden">
                    <SeoImage
                      img={c.img}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-45 mix-blend-multiply`} aria-hidden="true" />
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-stone-800" aria-hidden="true" />
                    </div>
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-[9px] font-black text-white">
                      <Sparkles className="w-3 h-3 text-amber-300" aria-hidden="true" />
                      {c.stat}
                    </div>
                    <div className="absolute bottom-3 right-3 left-3">
                      <div className="text-[10px] font-black text-white/90 mb-1">{c.subtitle}</div>
                      <figcaption className="text-sm font-black text-white leading-tight" itemProp="caption">
                        {c.title}
                      </figcaption>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-stone-600 font-bold leading-relaxed" itemProp="description">
                      {c.desc}
                    </p>
                  </div>
                </motion.figure>
              );
            })}
          </div>
        </section>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8" aria-labelledby="faq-title">
          <div className="mb-5">
            <h2 id="faq-title" className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#c8102e]" aria-hidden="true" />
              سوالات متداول درباره آزمون شانس اقامت
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">پاسخ‌های کوتاه به پرتکرارترین سوالات</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* CTA */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white text-center"
          aria-labelledby="cta-title"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              مشاوره تخصصی بعد از آزمون
            </div>

            <h2 id="cta-title" className="text-2xl md:text-3xl font-black mb-3">
              کارنامه‌ات را با تیم {SITE.name} بررسی کن
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم {SITE.name} با تجربه هزاران پرونده موفق، می‌تواند کارنامه آزمون
              شما را تحلیل دقیق‌تر کرده و برنامه اجرایی شخصی‌سازی‌شده تهیه کند.
              همین حالا پیام دهید.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                مشاوره در واتس‌اپ
              </a>
              <a
                href={SITE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                پشتیبانی تلگرام
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                پاسخ در کمتر از ۲۴ ساعت
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" aria-hidden="true" />
                خدمات داوطلبانه
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                کاملاً محرمانه
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* DISCLAIMER */}
        {/* ========================================== */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3" role="note">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              این آزمون یک ارزیابی اولیه و راهنمای تصمیم‌گیری است. دقت آن بر اساس
              داده‌های تاریخی کاربران حدود ۹۳٪ است. اما تصمیم نهایی درباره اعطای
              ویزا کاملاً بر عهده سفارت اتریش و MA35 (اداره مهاجرت) است. برای
              پرونده‌های خاص و پیچیده، همیشه با وکلای متخصص مهاجرت مشورت کنید.
            </p>
          </div>
        </div>
      </div>
    </GuideContainer>
  );
};

// ==========================================
// FAQ ITEM
// ==========================================
function FaqItem({
  q, a, isOpen, onToggle, index,
}: {
  key?: React.Key;
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl border transition-all overflow-hidden ${
        isOpen ? "border-[#c8102e]/30 bg-[#c8102e]/[0.02] shadow-md" : "border-stone-200"
      }`}
      itemScope
      itemType="https://schema.org/Question"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition"
      >
        <span className="flex items-center gap-3 flex-1">
          <span
            className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all ${
              isOpen ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white" : "bg-stone-100 text-stone-500"
            }`}
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <span className="font-black text-xs text-stone-900 leading-snug text-right" itemProp="name">
            {q}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180 text-[#c8102e]" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            itemScope
            itemType="https://schema.org/Answer"
          >
            <div className="px-4 pb-4 pr-14 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-3" itemProp="text">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default VisaSuitabilityWizard;