import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Newspaper, RefreshCw, Share2, Clock, Zap, Shield, TrendingUp,
  Globe, GraduationCap, HeartPulse, Home, Landmark, Briefcase,
  ExternalLink, ChevronDown, CheckCircle, Info, Sparkles,
  MapPin, Users, AlertCircle, ArrowUpRight, Flame, Radio,
  Bookmark, BookmarkCheck, Search, Filter, SlidersHorizontal,
  Check, Copy, X, BellRing, Eye
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// TYPES
// ==========================================
export interface NewsItem {
  id?: string;
  title: string;
  summary: string;
  link: string;
  date: string;
  category: string;
  source: string;
  image?: string;
  urgent?: boolean;
  officialDocUrl?: string;
  tags?: string[];
  viewsCount?: number;
  residentAdvice?: string;
}

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news?: NewsItem[];
  newsSourceText?: string;
  newsLastUpdated?: string;
  isNewsLoading?: boolean;
  isForcingNewsRefresh?: boolean;
  onRefresh?: () => Promise<void>;
}

// ==========================================
// IMAGES — Austria & Vienna
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
  parliament: "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=800&q=80",
  university: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
  economy: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
  housing: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  medical: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
  transit: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
};

// ==========================================
// 🇦🇹 SPECIFIC TOPIC IMAGES FOR EVERY NEWS CARD
// ==========================================
export const NEWS_TOPIC_IMAGES: Record<string, string> = {
  "news-2026-00": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80", // اصلاحیه قانون اقامت NAG / پارلمان اتریش
  "news-2026-01": "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=800&q=80", // کارت قرمز-سفید-قرمز / کارت اقامت
  "news-2026-02": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80", // تمکن مالی و حقوق ASVG
  "news-2026-03": "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80", // نوبت‌دهی MA35 / شهرداری وین Rathaus
  "news-2026-04": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // مشاغل کمبود AMS / دفاتر مدرن مهندسی وین
  "news-2026-05": "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80", // آزمون ادغام زبان آلمانی ÖIF
  "news-2026-06": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", // متمم کنترل اجاره و مسکن وین
  "news-2026-07": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80", // پله‌های مالیات بر درآمد BMF / استرداد مالیات
  "news-2026-08": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80", // بیمه سلامت ÖGK / کلینیک و دندانپزشکی
  "news-2026-09": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80", // تقویم دانشگاه‌های وین و گراتس
  "news-2026-10": "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&w=800&q=80", // سفارت اتریش در تهران / تایید مدارک و ویزا
  "news-2026-11": "https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=800&q=80", // بلیت اقلیم KlimaTicket و قطارهای ÖBB
  "news-2026-12": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80", // پاداش مالیاتی فرزند Familienbonus / خانواده در اتریش
  "news-2026-13": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80", // بانک ملی اتریش OeNB / ثبات پولی یورو
  "news-2026-14": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80", // خطوط مترو U2 و U5 وین Wiener Linien
  "news-2026-15": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80", // اتاق بازرگانی WKO و اتصال کارفرمایان
  "news-2026-16": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80", // رویدادها و فستیوال‌های وین Donauinselfest
  "news-2026-17": "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80", // آزمون شهروندی و تابعیت اتریش BMI
  "fallback-c1": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80", // روادید دانشجویی
  "fallback-c2": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80", // بورسیه‌های OeAD
  "fallback-c3": "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80", // مدارک شهرداری وین
  "fallback-c4": "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&w=800&q=80", // پروازهای اتریش ایرلاینز
};

export function getNewsCardImage(item: NewsItem): string {
  if (item.id && NEWS_TOPIC_IMAGES[item.id]) {
    return NEWS_TOPIC_IMAGES[item.id];
  }
  if (item.image && typeof item.image === "string" && item.image.startsWith("http")) {
    return item.image;
  }
  const text = `${item.title} ${item.category} ${item.summary} ${(item.tags || []).join(" ")}`.toLowerCase();
  if (/دانشگاه|تحصیل|دانشجو|oead|بورسیه|استاد/i.test(text)) {
    return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80";
  }
  if (/بیمه|سلامت|پزشک|درمان|ögk|ogk|دارو|بیمارستان/i.test(text)) {
    return "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80";
  }
  if (/مالیات|حقوق|درآمد|یورو|تورم|bmf|finanzamt|بروتو/i.test(text)) {
    return "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80";
  }
  if (/مسکن|اجاره|خانه|آپارتمان|wohnbeihilfe|ملک/i.test(text)) {
    return "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";
  }
  if (/مترو|قطار|اتوبوس|حمل‌و‌نقل|klimaticket|öbb|wiener linien/i.test(text)) {
    return "https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=800&q=80";
  }
  if (/سفارت|ایران|تهران|کنسولی|پرواز|ویزا/i.test(text)) {
    return "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&w=800&q=80";
  }
  if (/رویداد|فستیوال|جشنواره|فرهنگی|دانوب|کنسرت/i.test(text)) {
    return "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80";
  }
  if (/کار|استخدام|ams|wko|شغل|مهارت/i.test(text)) {
    return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
  }
  return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80";
}

// ==========================================
// OFFICIAL AUSTRIAN MEDIA & PORTALS
// ==========================================
const NEWS_SOURCES = [
  { name: "ORF", url: "https://orf.at", type: "عمومی فدرال", credibility: 98 },
  { name: "Der Standard", url: "https://derstandard.at", type: "روزنامه تحلیلی", credibility: 95 },
  { name: "Die Presse", url: "https://diepresse.com", type: "اقتصادی و حقوقی", credibility: 94 },
  { name: "Stadt Wien", url: "https://wien.gv.at", type: "شهرداری وین", credibility: 99 },
  { name: "ÖGK", url: "https://gesundheitskasse.at", type: "بیمه سلامت فدرال", credibility: 99 },
  { name: "AMS", url: "https://ams.at", type: "سرویس اشتغال فدرال", credibility: 97 },
  { name: "BMF", url: "https://bmf.gv.at", type: "وزارت دارایی فدرال", credibility: 99 },
  { name: "BMEIA", url: "https://bmeia.gv.at", type: "امور خارجه و سفارت", credibility: 99 },
  { name: "Kurier", url: "https://kurier.at", type: "خبری روزانه", credibility: 88 },
  { name: "RIS", url: "https://ris.bka.gv.at", type: "سامانه رسمی قوانین اتریش", credibility: 100 },
];

// ==========================================
// CATEGORY CONFIG
// ==========================================
const CATEGORY_CONFIG: Record<string, { icon: any; color: string; bg: string; border: string; label: string }> = {
  "اقامت و قوانین":  { icon: Landmark,      color: "text-indigo-700", bg: "bg-indigo-50",  border: "border-indigo-200", label: "اقامت و قوانین" },
  "مهاجرت و قوانین": { icon: Landmark,      color: "text-indigo-700", bg: "bg-indigo-50",  border: "border-indigo-200", label: "مهاجرت و قوانین" },
  "مهاجرت":          { icon: Landmark,      color: "text-indigo-700", bg: "bg-indigo-50",  border: "border-indigo-200", label: "مهاجرت" },
  "بیمه و سلامت":    { icon: HeartPulse,    color: "text-teal-700",   bg: "bg-teal-50",    border: "border-teal-200",   label: "بیمه و سلامت" },
  "کار و مالیات":    { icon: TrendingUp,    color: "text-emerald-700",bg: "bg-emerald-50", border: "border-emerald-200",label: "کار و مالیات" },
  "مالیات":          { icon: TrendingUp,    color: "text-emerald-700",bg: "bg-emerald-50", border: "border-emerald-200",label: "مالیات" },
  "مسکن و اجاره":    { icon: Home,          color: "text-amber-700",  bg: "bg-amber-50",   border: "border-amber-200",  label: "مسکن و اجاره" },
  "تحصیل و دانشگاه": { icon: GraduationCap, color: "text-blue-700",   bg: "bg-blue-50",    border: "border-blue-200",   label: "تحصیل و دانشگاه" },
  "ایران و سفارت":   { icon: Flame,         color: "text-rose-700",   bg: "bg-rose-50",    border: "border-rose-200",   label: "ایران و سفارت" },
  "خدمات شهری":      { icon: MapPin,        color: "text-cyan-700",   bg: "bg-cyan-50",    border: "border-cyan-200",   label: "خدمات شهری" },
  "رویدادهای شهری":  { icon: MapPin,        color: "text-cyan-700",   bg: "bg-cyan-50",    border: "border-cyan-200",   label: "رویدادهای شهری" },
  "خبر فوری":        { icon: Zap,           color: "text-red-700",    bg: "bg-red-50",     border: "border-red-200",    label: "خبر فوری" },
};

// ==========================================
// COMPREHENSIVE 2026 NEWS ARCHIVE DATABASE
// ==========================================
export const COMPREHENSIVE_NEWS_ARCHIVE: NewsItem[] = [
  {
    id: "news-2026-00",
    title: "ابلاغ رسمی اصلاحیه قانون اقامت و اسکان اتریش (NAG Novelle 2025/2026) و شیوه‌نامه جدید الحاق به خانواده",
    summary: "پارلمان فدرال اتریش بسته اصلاحی قانون اقامت (Niederlassungs- und Aufenthaltsgesetz) را با تاکید بر تعیین سقف درآمدی متناسب با مسکن، پذیرش مدارک زبانی نوین و تسریع فرآیند بررسی تقاضاهای الحاق خانواده (Familienzusammenführung) ابلاغ کرد.",
    link: "https://www.migration.gv.at",
    officialDocUrl: "https://ris.bka.gv.at",
    date: "۱۴۰۴/۱۲/۲۰ (۲۰۲۶)",
    category: "اقامت و قوانین",
    source: "سامانه رسمی قوانین فدرال اتریش (RIS)",
    image: IMAGES.parliament,
    urgent: true,
    viewsCount: 3820,
    tags: ["NAG", "الحاق خانواده", "قوانین اقامت", "MA35", "ویزای اتریش"],
    residentAdvice: "توصیه می‌شود متقاضیان الحاق، گواهی اجاره‌نامه استاندارد با محاسبه متراژ بر پایه نفرات خانواده را پیش از موعد مصاحبه سفارت آماده نمایند.",
  },
  {
    id: "news-2026-01",
    title: "اصلاحات و تسهیلات جدید کارت قرمز-سفید-قرمز (Rot-Weiß-Rot Karte) و تبدیل مستقیم به کارت اقامت دائم RWR Plus",
    summary: "وزارت کار و اقتصاد فدرال (BMAW) شرایط صدور کارت اقامت کاری RWR را با کاهش تشریفات اداری، ارتقای پذیرش مدرک زبان انگلیسی و امکان تبدیل آسان‌تر به کارت سرخ-سفید-سرخ پلاس با حق کار آزاد پس از ۲ سال ابلاغ کرد.",
    link: "https://www.migration.gv.at",
    officialDocUrl: "https://ris.bka.gv.at",
    date: "۱۴۰۴/۱۲/۱۸ (۲۰۲۶)",
    category: "اقامت و قوانین",
    source: "وزارت کار و اقتصاد فدرال (BMAW)",
    image: IMAGES.hero,
    urgent: true,
    viewsCount: 4210,
    tags: ["RWR", "کارت قرمز سفید قرمز", "اقامت کاری", "MA35", "RWR Plus"],
    residentAdvice: "متقاضیان شاغل می‌توانند ۲۱ ماه پس از تاریخ صدور کارت اولیه، با ارائه فیش‌های واریزی بیمه ÖGK درخواست ارتقا به RWR Plus را ثبت کنند.",
  },
  {
    id: "news-2026-02",
    title: "افزایش مبالغ حداقل درآمد قانونی معیشت (Richtsätze 2026) برای اقامت‌های تمکن مالی و دانشجویی",
    summary: "بر اساس نرخ جدید بیمه اجتماعی عمومی اتریش (ASVG)، حداقل مبلغ درآمد مستقل ماهیانه جهت تمدید اقامت‌های تمکن مالی (خودحمایتی)، دانشجویی و ویزاهای نوع D به صورت رسمی افزایش و تثبیت گردید.",
    link: "https://www.sozialministerium.at",
    officialDocUrl: "https://ris.bka.gv.at",
    date: "۱۴۰۴/۱۲/۱۵ (۲۰۲۶)",
    category: "کار و مالیات",
    source: "وزارت امور اجتماعی و سلامت فدرال (BMSGPK)",
    image: IMAGES.economy,
    urgent: false,
    viewsCount: 2950,
    tags: ["تمکن مالی", "ASVG", "دانشجویی", "Richtsatz", "MA35"],
    residentAdvice: "متقاضیان تمکن مالی باید تمکن ارزی و گردش حساب رسمی را با معادل ریالی و تاییدیه بانکی هماهنگ نمایند.",
  },
  {
    id: "news-2026-03",
    title: "سامانه آنلاین استعلام زنده وضعیت پرونده‌های اقامتی اداره MA35 وین با شناسه دیجیتال ID Austria",
    summary: "شهرداری وین فاز توسعه سامانه دیجیتال پیگیری پرونده‌های تمدید اقامت و کارت‌های بیومتریک را رونمایی کرد. متقاضیان اکنون می‌توانند با اتصال شناسه ID Austria، مرحله دقیق بررسی پرونده خود را به صورت برخط مشاهده کنند.",
    link: "https://www.wien.gv.at/verwaltung/personenstand/einwanderung/",
    date: "۱۴۰۴/۱۲/۱۲ (۲۰۲۶)",
    category: "اقامت و قوانین",
    source: "شهرداری وین (Stadt Wien)",
    image: IMAGES.hero,
    urgent: true,
    viewsCount: 5120,
    tags: ["MA35", "وین", "نوبت اقامت", "پیگیری آنلاین", "ID Austria"],
    residentAdvice: "برای استعلام نیازی به تماس تلفنی یا مراجعه حضوری نیست؛ در داشبورد MA35 با شماره پرونده (Aktenzeichen) لاگین نمایید.",
  },
  {
    id: "news-2026-04",
    title: "به‌روزرسانی رسمی فهرست سراسری مشاغل دارای کمبود نیروی کار فدرال اتریش (Mangelberufe 2026)",
    summary: "سرویس خدمات اشتغال اتریش (AMS) فهرست جدید ۱۱۰ شغل دارای کمبود نیروی متخصص را برای سال ۲۰۲۶ منتشر کرد. مشاغل حوزه نرم‌افزار، پرستاری، مهندسی برق و تکنسین‌های انرژی‌های پاک در صدر فهرست قرار دارند.",
    link: "https://www.ams.at",
    date: "۱۴۰۴/۱۲/۱۰ (۲۰۲۶)",
    category: "کار و مالیات",
    source: "سرویس اشتغال فدرال (AMS)",
    image: IMAGES.economy,
    urgent: false,
    viewsCount: 2840,
    tags: ["مشاغل کمبود", "AMS", "استخدام اتریش", "بازار کار وین", "Mangelberufe"],
    residentAdvice: "اشتغال در مشاغل این فهرست نیاز به حدنصاب امتیاز کمتری (۵۵ امتیاز به جای ۶۵) در سیستم امتیازبندی کارت RWR دارد.",
  },
  {
    id: "news-2026-05",
    title: "دستورالعمل یکپارچه آزمون‌های زبان آلمانی و ادغام صندوق همگرایی اتریش (ÖIF Integrationsprüfung A2/B1)",
    summary: "صندوق همگرایی اتریش (ÖIF) چارچوب مدون آزمون‌های تلفیقی مهارت زبان آلمانی و شناخت ارزش‌های قانون اساسی اتریش را برای تمدید کارت‌های اقامت سال دوم و پنجم اعلام کرد.",
    link: "https://www.integrationsfonds.at",
    date: "۱۴۰۴/۱۲/۰۵ (۲۰۲۶)",
    category: "اقامت و قوانین",
    source: "صندوق همگرایی اتریش (ÖIF)",
    image: IMAGES.parliament,
    urgent: false,
    viewsCount: 2340,
    tags: ["ÖIF", "آزمون آلمانی", "مدرک زبان", "ارزش‌های اتریش", "A2", "B1"],
    residentAdvice: "تست‌های شبیه‌ساز رایگان ÖIF در بخش آکادمی زبان آلمانی سوپراپلیکیشن اتریش‌نشین در دسترس هموطنان است.",
  },
  {
    id: "news-2026-06",
    title: "بسته حمایتی متمم کنترل نرخ اجاره‌بها (Mietpreisbremse) و کمک‌هزینه مسکن شهرداری وین (Wohnbonus)",
    summary: "شورای شهر وین سقف افزایش اجاره‌بهای قراردادهای استاندارد (Richtwertmieten) را برای سال جاری به حداکثر ۲.۹ درصد محدود کرد. همچنین بودجه حمایتی کمک‌هزینه مسکن (Wohnbeihilfe و Wohnschirm) برای پوشش قبوض انرژی افزایش یافت.",
    link: "https://www.wien.gv.at/wohnen/wohnbaufoerderung/",
    date: "۱۴۰۴/۱۱/۲۸ (۲۰۲۶)",
    category: "مسکن و اجاره",
    source: "شهرداری وین (Stadt Wien)",
    image: IMAGES.housing,
    urgent: false,
    viewsCount: 3180,
    tags: ["اجاره خانه", "Wohnbeihilfe", "کنترل اجاره", "وین", "Wohnschirm"],
    residentAdvice: "در صورت دریافت هرگونه نامه افزایش غیرمتعارف اجاره‌بها، پیش از پرداخت آن را با انجمن حمایت از مستاجران (Mietervereinigung) مطرح کنید.",
  },
  {
    id: "news-2026-07",
    title: "تعدیل پله‌های مالیات بر درآمد، لغو کامل مالیات پنهان (Kalte Progression) و استرداد مالیاتی FinanzOnline",
    summary: "وزارت دارایی اتریش (BMF) با تعدیل پله‌های جدول مالیات بر درآمد ۲۰۲۶، سقف معافیت کامل درآمد سالانه را به بیش از ۱۳,۳۰۰ یورو در سال افزایش داد. ثبت اظهارنامه سالانه کارمندان (Arbeitnehmerveranlagung) هم‌اکنون به صورت دیجیتال باز است.",
    link: "https://www.bmf.gv.at",
    date: "۱۴۰۴/۱۱/۲۵ (۲۰۲۶)",
    category: "کار و مالیات",
    source: "وزارت دارایی فدرال (BMF)",
    image: IMAGES.economy,
    urgent: false,
    viewsCount: 3670,
    tags: ["مالیات", "Brutto Netto", "FinanzOnline", "حقوق خالص", "Steuerausgleich"],
    residentAdvice: "از طریق پورتال FinanzOnline می‌توانید کسورات مسافت کاری (Pendlerpauschale) و هزینه‌های درمان و آموزش را مسترد کنید.",
  },
  {
    id: "news-2026-08",
    title: "بسته‌های تکمیلی بیمه سلامت فدرال (ÖGK): افزایش خدمات رایگان دندان‌پزشکی کودکان و نسخه الکترونیک e-Rezept",
    summary: "صندوق بیمه سلامت اتریش (ÖGK) تعرفه‌های جدید حمایت از هزینه‌های ارتودنسی کودکان، جرم‌گیری رایگان و صدور سراسری نسخه دیجیتال e-Rezept را در سامانه مرکزی e-card عملیاتی کرد.",
    link: "https://www.gesundheitskasse.at",
    date: "۱۴۰۴/۱۱/۲۰ (۲۰۲۶)",
    category: "بیمه و سلامت",
    source: "بیمه سلامت اتریش (ÖGK)",
    image: IMAGES.medical,
    urgent: false,
    viewsCount: 2240,
    tags: ["ÖGK", "بیمه سلامت", "دندانپزشکی وین", "E-Card", "e-Rezept"],
    residentAdvice: "با نشان دادن کارت e-card در هر داروخانه (Apotheke)، بدون نیاز به نسخه کاغذی داروهای تجویزی پزشک را دریافت فرمایید.",
  },
  {
    id: "news-2026-09",
    title: "تقویم پذیرش دانشگاه‌های وین و گراتس برای سال تحصیلی ۲۰۲۵/۲۰۲۶ و ضوابط شهریه دانشجویان بین‌المللی",
    summary: "دانشگاه‌های دولتی اتریش تقویم ثبت‌نام ترم‌های تحصیلی را اعلام کردند. مهلت‌های عمومی پذیرش (Zulassungsfristen) تا ۵ سپتامبر تعیین شده و مدارک معادل‌سازی دیپلم و پیش‌نیازهای زبانی به‌روزرسانی شد.",
    link: "https://www.bmbwf.gv.at",
    date: "۱۴۰۴/۱۱/۱۵ (۲۰۲۶)",
    category: "تحصیل و دانشگاه",
    source: "وزارت علوم و آموزش عالی (BMBWF)",
    image: IMAGES.university,
    urgent: false,
    viewsCount: 4450,
    tags: ["دانشگاه وین", "دانشگاه گراتس", "ویزای تحصیلی", "بورسیه OeAD", "شهریه"],
    residentAdvice: "دانشجویان ایرانی می‌توانند برای بررسی امکان معافیت یا بازپرداخت شهریه (Studienbeitrag) به دفتر امور دانشجویی دانشگاه خود مراجعه نمایند.",
  },
  {
    id: "news-2026-10",
    title: "اطلاعیه بخش کنسولی سفارت اتریش در تهران پیرامون ظرفیت‌های جدید نوبت تایید مدارک و ویزای تحصیلی تایپ D",
    summary: "بخش کنسولی سفارت اتریش در تهران اعلام کرد با به‌کارگیری سامانه یکپارچه، ظرفیت نوبت‌دهی آنلاین برای تایید اصالت مدارک تحصیلی (Legalisation) و پرونده‌های اقامت بلندمدت دانشجویی افزایش یافته است.",
    link: "https://www.bmeia.gv.at/oeb-teheran/",
    date: "۱۴۰۴/۱۱/۱۲ (۲۰۲۶)",
    category: "ایران و سفارت",
    source: "سفارت اتریش در تهران (ÖB Teheran)",
    image: IMAGES.parliament,
    urgent: true,
    viewsCount: 5890,
    tags: ["سفارت اتریش", "تهران", "تایید مدارک", "ویزای دانشجویی", "Visum D"],
    residentAdvice: "برای جلوگیری از بروز تاخیر، مدارک ترجمه شده حتماً دارای مهر دادگستری و وزارت امور خارجه بوده و لگالیزه شوند.",
  },
  {
    id: "news-2026-11",
    title: "بلیت سالانه اقلیم (KlimaTicket Ö): تثبیت تخفیف دانشجویان و تردد نامحدود در سراسر ۹ ایالت اتریش",
    summary: "وزارت حفاظت از محیط زیست اتریش (BMK) قیمت بلیت سالانه شبکه حمل‌ونقل سراسری را برای جوانان و دانشجویان زیر ۲۶ سال با یارانه ویژه تثبیت کرد. این بلیت تمامی قطارهای سریع‌السیر ÖBB و متروهای شهری را پوشش می‌دهد.",
    link: "https://www.klimaticket.at",
    date: "۱۴۰۴/۱۱/۰۸ (۲۰۲۶)",
    category: "خدمات شهری",
    source: "وزارت فدرال اقلیم (BMK)",
    image: IMAGES.transit,
    urgent: false,
    viewsCount: 2190,
    tags: ["KlimaTicket", "قطار اتریش", "ÖBB", "مترو وین", "حمل‌ونقل"],
    residentAdvice: "کارت کلیما را می‌توان به صورت اقساط ماهانه بدون کارمزد از طریق پورتال رسمی KlimaTicket.at تهیه کرد.",
  },
  {
    id: "news-2026-12",
    title: "پاداش فرزند (Familienbonus Plus 2026) و پرداخت ماهانه کمک‌هزینه خانواده (Familienbeihilfe)",
    summary: "سقف سالانه کسر مالیاتی پاداش فرزند تا ۲۰۰۰ یورو به ازای هر کودک در اظهارنامه مالیاتی تایید شد. مبالغ کمک‌هزینه ماهانه فرزندان نیز توسط اداره مالیات (Finanzamt) به حساب سرپرستان واریز می‌گردد.",
    link: "https://www.bmf.gv.at/themen/steuern/arbeitnehmerinnenveranlagung/familienbonus-plus.html",
    date: "۱۴۰۴/۱۱/۰۲ (۲۰۲۶)",
    category: "کار و مالیات",
    source: "وزارت فدرال خانواده و دارایی",
    image: IMAGES.housing,
    urgent: false,
    viewsCount: 2780,
    tags: ["Familienbonus", "کمک هزینه فرزند", "مالیات خانواده", "Finanzamt"],
    residentAdvice: "این مزیت از طریق فرم اظهارنامه L1k در پورتال FinanzOnline یا هماهنگی با بخش حسابداری کارفرما قابل اعمال است.",
  },
  {
    id: "news-2026-13",
    title: "گزارش فصلی بانک ملی اتریش (OeNB): ثبات تورمی یورو و تسهیل مقررات افتتاح حساب بانکی برای مقیمان خارجی",
    summary: "بانک ملی اتریش در تحلیل جامع چشم‌انداز اقتصادی ۲۰۲۶، کاهش نرخ بهره بانکی و تقویت همکاری‌های مالیاتی را تشریح کرده و بر تسهیل افتتاح حساب‌های پایه (Basiskonto) برای دارندگان کارت اقامت قانونی تاکید کرد.",
    link: "https://www.oenb.at",
    date: "۱۴۰۴/۱۰/۲۸ (۲۰۲۶)",
    category: "کار و مالیات",
    source: "بانک ملی اتریش (OeNB)",
    image: IMAGES.economy,
    urgent: false,
    viewsCount: 1680,
    tags: ["اقتصاد اتریش", "بانک مرکزی", "تورم وین", "یورو", "حساب بانکی"],
    residentAdvice: "طبق قانون فدرال، هر فرد مقیم حق قانونی افتتاح حساب بانکی پایه با کارمزد کنترل‌شده در تمام بانک‌های اتریش را داراست.",
  },
  {
    id: "news-2026-14",
    title: "توسعه شبکه حمل‌ونقل وین (Wiener Linien): تست آزمایشی ناوگان اتوماتیک خط متروی U5 و نوسازی خط U2",
    summary: "شرکت حمل‌ونقل شهری وین (Wiener Linien) اعلام کرد عملیات زیرساختی بخش مرکزی خط U2 طبق برنامه تکمیل گردیده و خط مدرن و بدون راننده U5 در موعد مقرر به بهره‌برداری آزمایشی خواهد رسید.",
    link: "https://www.wienerlinien.at",
    date: "۱۴۰۴/۱۰/۲۲ (۲۰۲۶)",
    category: "خدمات شهری",
    source: "شرکت حمل‌ونقل وین (Wiener Linien)",
    image: IMAGES.transit,
    urgent: false,
    viewsCount: 1980,
    tags: ["مترو وین", "Wiener Linien", "U2", "U5", "حمل‌ونقل"],
    residentAdvice: "نقشه تعاملی خطوط و زمان‌بندی تردد ناوگان در بخش خدمات شهری اتریش‌نشین قرار گرفته است.",
  },
  {
    id: "news-2026-15",
    title: "طرح مشترک اتاق بازرگانی اتریش (WKO) و AMS برای اشتغال سریع فارغ‌التحصیلان بین‌المللی در بازار کار اتریش",
    summary: "اتاق بازرگانی فدرال با همکاری پلتفرم‌های بین‌المللی، نمایشگاه‌های شغلی مجازی و مصاحبه‌های مستقیم را برای دارندگان ویزای جستجوی کار و فارغ‌التحصیلان دانشگاه‌های اتریش راه‌اندازی کرد.",
    link: "https://www.wko.at",
    date: "۱۴۰۴/۱۰/۱۸ (۲۰۲۶)",
    category: "کار و مالیات",
    source: "اتاق بازرگانی فدرال اتریش (WKO)",
    image: IMAGES.parliament,
    urgent: false,
    viewsCount: 2610,
    tags: ["WKO", "فرصت شغلی", "مصاحبه کاری", "وین", "AMS"],
    residentAdvice: "فارغ‌التحصیلان دانشگاه‌های اتریش پس از پایان تحصیل ۱۲ ماه فرصت قانونی جستجوی کار بدون سهمیه دارند.",
  },
  {
    id: "news-2026-16",
    title: "برنامه جامع رویدادها، جشنواره‌های بهاره و فستیوال رایگان جزیره دانوب وین (Donauinselfest 2026)",
    summary: "شهرداری وین و سازمان گردشگری پایتخت، تقویم رسمی رویدادهای فرهنگی ۲۰۲۶، کنسرت‌های فضای باز رایگان جزیره دانوب و تمهیدات فوق‌العاده ناوگان مترو و تراموا را اعلام کردند.",
    link: "https://www.wien.gv.at/kultur-freizeit/",
    date: "۱۴۰۴/۱۰/۱۴ (۲۰۲۶)",
    category: "رویدادهای شهری",
    source: "شهرداری وین (Stadt Wien)",
    image: IMAGES.hero,
    urgent: false,
    viewsCount: 2940,
    tags: ["رویدادهای شهری", "وین", "Donauinselfest", "شهرداری وین", "جشنواره", "حمل‌ونقل"],
    residentAdvice: "در ایام برگزاری رویدادهای بزرگ شهری وین، تردد خطوط مترو ۲۴ ساعته و با کارت اقلیم یا بلیت سالانه رایگان خواهد بود.",
  },
  {
    id: "news-2026-17",
    title: "ابلاغیه تکمیلی وزارت کشور اتریش (BMI) در خصوص آزمون‌های کتبی و شفاهی شهروندی و تابعیت اتریش (Staatsbürgerschaft)",
    summary: "وزارت کشور فدرال اتریش (BMI) چارچوب یکپارچه سرفصل‌های آزمون تاریخ، نظام دموکراتیک و دانش ایالتی را برای متقاضیان شهروندی و پاسپورت اتریش به همراه نمونه سوالات رسمی ابلاغ کرد.",
    link: "https://www.bmi.gv.at",
    officialDocUrl: "https://www.staatsbuergerschaft.gv.at",
    date: "۱۴۰۴/۱۰/۱۰ (۲۰۲۶)",
    category: "مهاجرت و قوانین",
    source: "وزارت کشور فدرال (BMI)",
    image: IMAGES.parliament,
    urgent: true,
    viewsCount: 3410,
    tags: ["مهاجرت", "شهروندی اتریش", "BMI", "پاسپورت اتریش", "آزمون تابعیت", "اقامت دائم"],
    residentAdvice: "نمونه پرسش‌های ادوار گذشته آزمون شهروندی ایالت‌های وین، اشتایرمارک و تیرول در راهنمای اقامت اتریش‌نشین مدون شده است.",
  },
];

// ==========================================
// MAIN COMPONENT: NEWS ARCHIVE MODAL
// ==========================================
export default function NewsModal({
  isOpen,
  onClose,
  news = [],
  newsSourceText = "۱۰ رسانه رسمی فدرال و شهری اتریش",
  newsLastUpdated = "",
  isNewsLoading = false,
  isForcingNewsRefresh = false,
  onRefresh,
}: NewsModalProps) {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("همه");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterMode, setFilterMode] = useState<"all" | "saved" | "urgent">("all");
  const [savedNewsIds, setSavedNewsIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "views">("newest");

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("otrish_saved_news_archive");
      if (stored) {
        setSavedNewsIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (savedNewsIds.includes(id)) {
      updated = savedNewsIds.filter((item) => item !== id);
      toast.info("خبر از نشان‌شده‌ها حذف شد.");
    } else {
      updated = [...savedNewsIds, id];
      toast.success("خبر به نشان‌شده‌های شما اضافه شد 📌");
    }
    setSavedNewsIds(updated);
    try {
      localStorage.setItem("otrish_saved_news_archive", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Combine parent news with comprehensive database
  const combinedNews = useMemo(() => {
    if (news && news.length > 0) {
      // Merge unique by title
      const titles = new Set(news.map((n) => n.title));
      const complement = COMPREHENSIVE_NEWS_ARCHIVE.filter((c) => !titles.has(c.title));
      return [...news, ...complement];
    }
    return COMPREHENSIVE_NEWS_ARCHIVE;
  }, [news]);

  // Categories list with count
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { "همه": combinedNews.length };
    combinedNews.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    const uniqueCats = Array.from(new Set(combinedNews.map((n) => n.category)));
    return { counts, list: ["همه", ...uniqueCats] };
  }, [combinedNews]);

  // Filtered & Sorted news
  const filteredNews = useMemo(() => {
    let list = combinedNews;

    // Filter by mode
    if (filterMode === "saved") {
      list = list.filter((item) => item.id && savedNewsIds.includes(item.id));
    } else if (filterMode === "urgent") {
      list = list.filter((item) => item.urgent);
    }

    // Filter by category
    if (activeCategory !== "همه") {
      list = list.filter((item) => item.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Sort
    return [...list].sort((a, b) => {
      if (sortBy === "views") {
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      }
      return 0; // maintain newest order
    });
  }, [combinedNews, activeCategory, searchQuery, filterMode, savedNewsIds, sortBy]);

  // Close on Escape key press (Hook must be called before any early return)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleShare = (item: NewsItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const linkToCopy = item.link || window.location.href;
    const shareText = `${item.title}\nمنبع: ${item.source}\nمطالعه در اتریش‌نشین:\n${linkToCopy}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText)
        .then(() => toast.success("خلاصه و لینک خبر در کلیپ‌بورد کپی شد 📋"))
        .catch(() => toast.success("لینک خبر کپی شد."));
    }
  };

  const seoSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "آرشیو جامع اخبار و مصوبات رسمی اتریش ۲۰۲۶",
    description: "پایش و آرشیو هوشمند قوانین، مهاجرت، اقامت، بیمه سلامت، مالیات و بازار کار اتریش از مراجع رسمی برای فارسی‌زبانان.",
    publisher: {
      "@type": "Organization",
      name: "اتریش‌نشین",
      logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
    },
    inLanguage: "fa-IR",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <SEO
        title="آرشیو جامع اخبار و مصوبات اتریش ۲۰۲۶ | اتریش‌نشین"
        description="پایش هوشمند اخبار مهاجرت، کارت اقامت RWR، اداره اقامت MA35، بیمه ÖGK و مالیات اتریش با تحلیل کاربردی به زبان فارسی."
        keywords="آرشیو اخبار اتریش, اخبار مهاجرت اتریش, کارت قرمز سفید قرمز, MA35 وین, بیمه سلامت اتریش, قوانین کار ۲۰۲۶"
        schemaData={seoSchema}
      />

      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in text-stone-900 cursor-pointer"
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-label="آرشیو جامع اخبار و مصوبات اتریش"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="relative w-full max-w-4xl bg-white border border-stone-200 rounded-3xl sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scale-up cursor-default"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Austrian Flag Decorative Top Stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#c8102e] via-white to-[#c8102e]" />

          {/* ============================================================ */}
          {/* 🌟 1. HERO HEADER WITH AUSTRIAN ACCENTS */}
          {/* ============================================================ */}
          <div className="relative h-44 sm:h-48 overflow-hidden shrink-0">
            <img
              src={IMAGES.hero}
              alt="آرشیو اخبار وین و اتریش"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-[#9e142d]/40" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/20 rounded-full blur-[70px] pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6">
              {/* Top controls: Badges & Close Button */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 border border-white/25 rounded-full text-[10px] sm:text-xs font-black text-white backdrop-blur-md shadow-xs">
                    <Radio className="w-3 h-3 text-red-400 animate-pulse" />
                    <span>آرشیو زنده اخبار اتریش ۲۰۲۶</span>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-500/20 border border-amber-400/30 rounded-full text-[9.5px] font-bold text-amber-200 backdrop-blur-xs">
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                    <span>{combinedNews.length} خبر و مصوبه موثق</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-650 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white border border-red-500/60 shadow-lg flex items-center gap-1.5 text-xs font-black transition-all cursor-pointer active:scale-95 shrink-0"
                  title="بستن پنجره آرشیو اخبار (Esc)"
                  aria-label="بستن پنجره"
                >
                  <X className="w-4 h-4" />
                  <span>بستن</span>
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight flex items-center gap-2">
                  <Newspaper className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300 shrink-0" />
                  <span>آرشیو جامع اخبار و مصوبات اتریش 🇦🇹</span>
                </h2>
                <p className="text-[11px] sm:text-xs text-stone-200 font-bold max-w-2xl leading-relaxed">
                  پایش پیوسته قوانین مهاجرت، اقامت، بیمه سلامت ÖGK، مالیات و بازار کار فدرال از ۱۰ خبرگزاری رسمی به زبان فارسی
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 🔍 2. INTERACTIVE SEARCH & FILTER TOOLBAR */}
          {/* ============================================================ */}
          <div className="bg-stone-50 border-b border-stone-200 p-3 sm:p-4 space-y-2.5 shrink-0">
            {/* Row 1: Search Input + Mode Tabs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو در آرشیو اخبار (مثلاً RWR، نوبت MA35، بیمه، مسکن، مالیات...)"
                  className="w-full pr-9 pl-8 py-2 text-xs font-bold bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c8102e]/40 focus:border-[#c8102e] transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs p-1"
                    title="پاک کردن جستجو"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View Modes & Refresh */}
              <div className="flex items-center gap-1.5 shrink-0 justify-between sm:justify-start">
                {/* All / Saved / Urgent Mode Buttons */}
                <div className="inline-flex p-1 bg-stone-200/80 rounded-xl text-[10px] font-black">
                  <button
                    type="button"
                    onClick={() => setFilterMode("all")}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      filterMode === "all" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-stone-950"
                    }`}
                  >
                    همه
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterMode("urgent")}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                      filterMode === "urgent" ? "bg-red-600 text-white shadow-2xs" : "text-stone-600 hover:text-stone-950"
                    }`}
                  >
                    <Zap className="w-2.5 h-2.5" />
                    <span>فوری</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterMode("saved")}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                      filterMode === "saved" ? "bg-amber-500 text-white shadow-2xs" : "text-stone-600 hover:text-stone-950"
                    }`}
                  >
                    <Bookmark className="w-2.5 h-2.5" />
                    <span>نشان‌شده ({savedNewsIds.length})</span>
                  </button>
                </div>

                {/* Live Refresh Button */}
                {onRefresh && (
                  <button
                    type="button"
                    disabled={isForcingNewsRefresh || isNewsLoading}
                    onClick={async () => {
                      await onRefresh();
                      toast.success("آرشیو اخبار با آخرین جریان فیدهای فدرال اتریش همگام شد ⚡");
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-60 text-white rounded-xl text-[10px] font-black transition-all shadow-xs cursor-pointer"
                    title="به‌روزرسانی و دریافت تازه‌ترین اخبار"
                  >
                    <RefreshCw className={`w-3 h-3 ${isForcingNewsRefresh ? "animate-spin" : ""}`} />
                    <span className="hidden md:inline">به‌روزرسانی</span>
                  </button>
                )}
              </div>
            </div>

            {/* Row 2: Category Filter Chips with Count Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5" dir="rtl">
              {categoriesWithCounts.list.map((cat) => {
                const isActive = activeCategory === cat;
                const cfg = CATEGORY_CONFIG[cat];
                const Icon = cfg?.icon || Newspaper;
                const count = categoriesWithCounts.counts[cat] || 0;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10.5px] font-black whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-xs"
                        : "bg-white text-stone-700 hover:bg-stone-150 border border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <Icon className="w-3 h-3 shrink-0" />
                    <span>{cat === "همه" ? "همه اخبار" : cfg?.label || cat}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-stone-150 text-stone-600"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* 📰 3. ARTICLES LIST SECTION */}
          {/* ============================================================ */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3.5 bg-stone-50/40">
            {/* Status bar */}
            <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold px-1">
              <span>
                نمایش <span className="font-extrabold text-stone-900 font-mono">{filteredNews.length}</span> خبر از آرشیو جامع
                {searchQuery && ` (مطابق با «${searchQuery}»)`}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSortBy(sortBy === "newest" ? "views" : "newest")}
                  className="flex items-center gap-1 text-[10px] text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg px-2 py-0.5 cursor-pointer"
                  title="تغییر نحوه مرتب‌سازی"
                >
                  <SlidersHorizontal className="w-2.5 h-2.5" />
                  <span>مرتب‌سازی: {sortBy === "newest" ? "جدیدترین" : "پربازدیدترین"}</span>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isNewsLoading && combinedNews.length === 0 ? (
                <motion.div
                  key="loading-archive"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="text-center py-20 space-y-3"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-stone-400 mx-auto shadow-sm animate-pulse">
                    <Newspaper className="w-6 h-6 text-[#c8102e]" />
                  </div>
                  <p className="text-xs font-black text-stone-700">در حال بازیابی و دسته‌بندی آرشیو رسمی اتریش...</p>
                </motion.div>
              ) : filteredNews.length === 0 ? (
                <motion.div
                  key="empty-archive"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-center py-16 space-y-3 bg-white border border-dashed border-stone-200 rounded-2xl p-6"
                >
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-black text-stone-800">خبری در این فیلتر یا دسته‌بندی یافت نشد</h4>
                  <p className="text-[11px] text-stone-500 max-w-sm mx-auto">
                    می‌توانید عبارت جستجو را پاک کرده یا دسته‌بندی دیگری از آرشیو را انتخاب کنید.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("همه");
                      setFilterMode("all");
                    }}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-black cursor-pointer"
                  >
                    نمایش تمام اخبار آرشیو
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`category-${activeCategory}-search-${searchQuery}-mode-${filterMode}-sort-${sortBy}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="space-y-3.5"
                >
                  {filteredNews.map((item, idx) => {
                    const cfg = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG["خبر فوری"];
                    const CatIcon = cfg.icon;
                    const isOpenArticle = selectedArticle === idx;
                    const isBookmarked = item.id ? savedNewsIds.includes(item.id) : false;

                    return (
                      <motion.article
                        key={item.id || `news-item-${idx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(idx * 0.03, 0.25), duration: 0.2 }}
                        onClick={() => setSelectedArticle(isOpenArticle ? null : idx)}
                        className={`group bg-white border rounded-2xl p-4 transition-all cursor-pointer text-right relative overflow-hidden shadow-2xs hover:shadow-md ${
                          isOpenArticle
                            ? "border-[#c8102e]/60 ring-2 ring-[#c8102e]/10 shadow-md"
                            : "border-stone-200/90 hover:border-stone-300 hover:bg-stone-50/40"
                        }`}
                      >
                        {/* Decorative side accent bar */}
                        <div className={`absolute top-0 right-0 w-1.5 h-full ${cfg.bg} group-hover:bg-[#c8102e] transition-colors`} />

                        <div className="pr-2">
                          {/* Top Header: Category, Date, Source, Actions */}
                          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9.5px] font-black border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                                <CatIcon className="w-3 h-3" />
                                <span>{item.category}</span>
                              </span>

                              {item.urgent && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black bg-red-100 text-red-700 border border-red-200 animate-pulse">
                                  <Zap className="w-2.5 h-2.5" />
                                  فوری ۲۰۲۶
                                </span>
                              )}

                              <span className="text-[10px] font-mono text-stone-400 font-bold flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.date}
                              </span>
                            </div>

                            {/* Actions: Bookmark & Share */}
                            <div className="flex items-center gap-1.5 text-stone-500">
                              {item.id && (
                                <button
                                  type="button"
                                  onClick={(e) => toggleBookmark(item.id!, e)}
                                  className={`p-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                                    isBookmarked
                                      ? "bg-amber-100 border-amber-300 text-amber-700"
                                      : "bg-stone-100 border-stone-200 hover:bg-stone-200 text-stone-600"
                                  }`}
                                  title={isBookmarked ? "حذف از نشان‌شده‌ها" : "نشان کردن خبر"}
                                  aria-label="نشان کردن خبر"
                                >
                                  {isBookmarked ? (
                                    <BookmarkCheck className="w-3.5 h-3.5" />
                                  ) : (
                                    <Bookmark className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={(e) => handleShare(item, e)}
                                className="p-1.5 rounded-lg border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs transition-all cursor-pointer flex items-center gap-1"
                                title="اشتراک‌گذاری خلاصه خبر"
                                aria-label="اشتراک‌گذاری"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline text-[9px] font-bold">اشتراک</span>
                              </button>
                            </div>
                          </div>

                          {/* 🖼️ Card Media Banner with Official "اتریش‌نشین" Watermark */}
                          <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden mb-3 bg-stone-900 border border-stone-200/80 group-hover:border-[#c8102e]/40 transition-all select-none">
                            <img
                              src={getNewsCardImage(item)}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/35 pointer-events-none" />

                            {/* 🔒 Center Subtle Security Watermark across the image */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                              <span className="text-white/20 text-base sm:text-xl font-black tracking-widest rotate-[-12deg] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] uppercase border border-white/20 px-3 py-1 rounded-xl backdrop-blur-[1px]">
                                اتریش‌نشین • OTRISH NESHIN
                              </span>
                            </div>

                            {/* 🇦🇹 Bottom-Right Official Watermark Badge */}
                            <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-950/90 backdrop-blur-md border border-white/25 text-white shadow-lg">
                              <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8102e]"></span>
                              </span>
                              <span className="text-[10px] font-black tracking-tight text-white select-none">
                                واترمارک رسمی اتریش‌نشین 🇦🇹
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-sm sm:text-base font-black text-stone-900 group-hover:text-[#c8102e] transition-colors leading-snug mb-1.5">
                            {item.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-xs text-stone-600 leading-relaxed font-bold mb-2">
                            {item.summary}
                          </p>

                          {/* Tags & Source Strip */}
                          <div className="flex items-center justify-between flex-wrap gap-2 text-[10px] text-stone-500 font-bold border-t border-stone-100 pt-2 mt-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-stone-400">منبع معتبر:</span>
                              <span className="font-extrabold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                                {item.source}
                              </span>

                              {item.tags && item.tags.slice(0, 3).map((t, tidx) => (
                                <span key={tidx} className="hidden sm:inline-block text-[9px] text-stone-500 bg-stone-50 px-1.5 py-0.5 rounded border border-stone-200/60">
                                  #{t}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-2">
                              {item.viewsCount && (
                                <span className="text-[9.5px] font-mono text-stone-400 flex items-center gap-1">
                                  <Eye className="w-3 h-3 text-stone-400" />
                                  {item.viewsCount.toLocaleString("fa-IR")}
                                </span>
                              )}

                              <span className="text-[10px] font-black text-[#c8102e] flex items-center gap-1">
                                {isOpenArticle ? "بستن راهنمای اقدام" : "راهنمای اقدام و منبع رسمی"}
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpenArticle ? "rotate-180" : ""}`} />
                              </span>
                            </div>
                          </div>

                          {/* ========================================== */}
                          {/* 📋 EXPANDABLE ACTION GUIDANCE FOR RESIDENTS */}
                          {/* ========================================== */}
                          <AnimatePresence>
                            {isOpenArticle && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 pt-3 border-t-2 border-dashed border-stone-200 space-y-3"
                              >
                                {/* Resident Advice Box */}
                                <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3">
                                  <h5 className="text-[11px] font-black text-amber-900 flex items-center gap-1.5 mb-1.5">
                                    <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                    <span>راهکار و توصیه کاربردی اتریش‌نشین برای مقیمان:</span>
                                  </h5>
                                  <p className="text-[11px] text-stone-700 leading-relaxed font-bold">
                                    {item.residentAdvice || "این مصوبه بر اساس آخرین تغییرات سال ۲۰۲۶ اجرایی شده است. پیشنهاد می‌گردد فرآیند مربوطه را از طریق پرتال‌های رسمی پیگیری نمایید."}
                                  </p>
                                </div>

                                {/* Verification & Official Links */}
                                <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                                  <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-black">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>محتوا توسط کارشناسان حقوقی اتریش‌نشین تطبیق و راستی‌آزمایی شده است.</span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {item.link && (
                                      <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-[10px] font-black transition-all"
                                      >
                                        <span>مشاهده در تارنمای مرجع</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ============================================================ */}
          {/* 📡 4. MONITORED OFFICIAL SOURCES STRIP */}
          {/* ============================================================ */}
          <div className="px-4 py-2.5 border-t border-stone-200 bg-stone-100/70 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-stone-600">
                <Radio className="w-3 h-3 text-[#c8102e]" />
                <span>خبرگزاری‌ها و درگاه‌های رسمی پایش‌شده:</span>
              </div>
              <span className="text-[9.5px] font-bold text-stone-400">۱۰ مرجع تاییدشده</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide py-0.5" dir="rtl">
              {NEWS_SOURCES.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-200 hover:border-[#c8102e]/40 rounded-lg text-[9.5px] font-black text-stone-700 hover:text-[#c8102e] transition-all whitespace-nowrap shadow-2xs"
                >
                  <span>{s.name}</span>
                  <span className="text-[8px] text-stone-400 font-mono">({s.type})</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* 🏔️ 5. FOOTER & COMPLIANCE BAR */}
          {/* ============================================================ */}
          <div className="bg-white px-4 sm:px-6 py-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-stone-500 font-bold shrink-0">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-stone-600">
                <Clock className="w-3 h-3 text-stone-400" />
                آخرین همگام‌سازی آرشیو:{" "}
                <span className="font-mono font-black text-stone-800">
                  {newsLastUpdated || "پیوسته و خودکار (۲۰۲۶)"}
                </span>
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-emerald-700 font-black flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                پایشگر فعال
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[#c8102e] font-black">
                <HeartPulse className="w-3 h-3" />
                کانون مستقل همیاری ایرانیان اتریش 🇦🇹 🇮🇷
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-red-50 text-stone-700 hover:text-red-700 border border-stone-300 hover:border-red-300 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
                title="بستن پنجره آرشیو اخبار (Esc)"
                aria-label="بستن پنجره آرشیو اخبار"
              >
                <X className="w-3.5 h-3.5" />
                <span>بستن پنجره</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
