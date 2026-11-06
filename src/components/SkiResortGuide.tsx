import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mountain, Snowflake, Train, Clock, Euro, MapPin, Star, Users,
  Baby, CheckCircle, Info, ChevronDown, Sparkles, Zap, Award,
  PhoneCall, Send, Globe, Heart, Shield, Calendar, TrendingUp,
  Quote, Navigation, Ticket, Cable, Backpack, Thermometer, Wind,
  Sun, CloudSnow, Route, Coffee, Utensils, Hotel, Car, Bus, Bike,
  Footprints, Image as ImageIcon,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";

// ==========================================
// BRAND CONSTANTS — OTRISH NESHIN
// ==========================================
const BRAND = {
  nameFa: "اتریش‌نشین",
  nameEn: "Otrish Neshin",
  domain: "www.dia-co.ir",
  baseUrl: "https://www.dia-co.ir",
  logo: "https://www.dia-co.ir/logo.png",
  whatsapp: "https://wa.me/436889763256",
  telegram: "https://t.me/Otrish_neshin",
  pageUrl: "https://www.dia-co.ir/guides/austria-ski-resorts-near-vienna",
} as const;

// ==========================================
// IMAGES — with SEO metadata for Google Images
// ==========================================
const IMAGES = {
  hero: {
    url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1600&q=75",
    alt: "پیست اسکی زیبا در آلپ اتریش با برف تازه - راهنمای اسکی نزدیک وین - اتریش‌نشین",
    title: "پیست اسکی آلپ اتریش — راهنمای کامل اسکی نزدیک وین ۲۰۲۶",
    width: 1600,
    height: 900,
  },
  semmering: {
    url: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=1200&q=75",
    alt: "پیست اسکی زمرینگ Semmering نزدیک وین اتریش - مناسب خانواده و مبتدی",
    title: "پیست اسکی زمرینگ Semmering — ۱ ساعت از وین",
    width: 1200,
    height: 800,
  },
  stuhleck: {
    url: "https://images.unsplash.com/photo-1613516531451-3d2f1a0d9f5e?auto=format&fit=crop&w=1200&q=75",
    alt: "پیست اسکی اشتوله‌لک Stuhleck بزرگ‌ترین پیست نیدراوتریش اتریش",
    title: "پیست اسکی اشتوله‌لک Stuhleck — ۲۶ کیلومتر پیست",
    width: 1200,
    height: 800,
  },
  hochkar: {
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=75",
    alt: "قله برفی هوخکار Hochkar اتریش با بهترین برف نیدراوتریش",
    title: "پیست اسکی هوخکار Hochkar — بلندترین قله ۱۸۰۸ متر",
    width: 1200,
    height: 800,
  },
  schladming: {
    url: "https://images.unsplash.com/photo-1610394307770-cff3e4e10a58?auto=format&fit=crop&w=1200&q=75",
    alt: "پیست اسکی شلادمینگ Schladming اتریش - میزبان مسابقات جهانی اسکی",
    title: "پیست اسکی شلادمینگ Schladming — ۴ کوه، ۱ بلیت",
    width: 1200,
    height: 800,
  },
  train: {
    url: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=75",
    alt: "قطار ÖBB اتریش برای سفر به پیست اسکی - پکیج Ski + Bahn از وین",
    title: "سفر با قطار ÖBB به پیست اسکی اتریش",
    width: 1200,
    height: 800,
  },
  apresSki: {
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=75",
    alt: "پیست اسکی خانوادگی آناابرگ Annaberg اتریش مناسب کودکان و مبتدی",
    title: "پیست اسکی خانوادگی آناابرگ Annaberg",
    width: 1200,
    height: 800,
  },
} as const;

// ==========================================
// TYPES
// ==========================================
type ResortId = "semmering" | "stuhleck" | "hochkar" | "schladming" | "annaberg";
type ImageMeta = { url: string; alt: string; title: string; width: number; height: number };

type Resort = {
  id: ResortId;
  name: string;
  nameDe: string;
  tagline: string;
  state: string;
  distance: string;
  travelTime: string;
  elevation: string;
  pistes: string;
  lifts: number;
  dayPass: string;
  dayPassPrice: number;
  season: string;
  difficulty: { beginner: number; intermediate: number; expert: number };
  icon: any;
  gradient: string;
  color: string;
  image: ImageMeta;
  highlights: string[];
  bestFor: string[];
  tips: string[];
  transport: string;
  recommended?: boolean;
  snowpark?: boolean;
  nightSki?: boolean;
};

// ==========================================
// SKI RESORTS DATA
// ==========================================
const RESORTS: Resort[] = [
  {
    id: "semmering",
    name: "زمرینگ",
    nameDe: "Semmering",
    tagline: "نزدیک‌ترین پیست اسکی به وین — فقط ۱ ساعت",
    state: "نیدراوتریش / اشتایرمارک",
    distance: "۱۰۰ کیلومتر",
    travelTime: "۱ ساعت با قطار",
    elevation: "۱,۰۰۰ تا ۱,۳۹۰ متر",
    pistes: "۱۴ کیلومتر",
    lifts: 7,
    dayPass: "€۴۹",
    dayPassPrice: 49,
    season: "دسامبر تا مارس",
    difficulty: { beginner: 45, intermediate: 40, expert: 15 },
    icon: Train,
    gradient: "from-sky-600 to-blue-700",
    color: "text-sky-700",
    image: IMAGES.semmering,
    highlights: [
      "دسترسی مستقیم با قطار از وین (Wiener Neustadt)",
      "شب‌اسکی در روزهای خاص (Flutlicht)",
      "مناسب برای مبتدی‌ها و خانواده‌ها",
      "پیست‌های آموزشی متعدد",
    ],
    bestFor: ["سفر یک‌روزه", "خانواده‌ها", "مبتدی‌ها", "اسکی تفریحی"],
    tips: [
      "بلیت قطار + اسکی پکیج ویژه از ÖBB — صرفه‌جویی تا ۳۰٪",
      "برای آخر هفته‌ها حتماً بلیت را آنلاین رزرو کنید",
      "مدرسه اسکی برای کودکان از ۴ سال به بالا",
    ],
    transport: "قطار Südbahn از Wien Hauptbahnhof به Semmering (۱ ساعت)",
    recommended: true,
    nightSki: true,
  },
  {
    id: "stuhleck",
    name: "اشتوله‌لک",
    nameDe: "Stuhleck",
    tagline: "بزرگ‌ترین پیست نیدراوتریش با برف مطمئن",
    state: "اشتایرمارک",
    distance: "۱۱۰ کیلومتر",
    travelTime: "۱ ساعت و ۲۰ دقیقه",
    elevation: "۱,۱۵۰ تا ۱,۷۸۲ متر",
    pistes: "۲۶ کیلومتر",
    lifts: 7,
    dayPass: "€۵۵",
    dayPassPrice: 55,
    season: "نوامبر تا آوریل",
    difficulty: { beginner: 35, intermediate: 50, expert: 15 },
    icon: Mountain,
    gradient: "from-indigo-600 to-purple-700",
    color: "text-indigo-700",
    image: IMAGES.stuhleck,
    highlights: [
      "بلندترین قله اسکی نیدراوتریش (۱,۷۸۲ متر)",
      "برف مطمئن از نوامبر تا آوریل",
      "پارک اسنوبرد حرفه‌ای",
      "مناظر پانورامیک آلپ",
    ],
    bestFor: ["اسکی‌بازان متوسط", "اسنوبردسواران", "مناظر زیبا"],
    tips: [
      "پکیج قطار + اسکی از ÖBB موجود است",
      "اجاره تجهیزات از Spital am Semmering",
      "در روزهای شنبه شلوغ است — جمعه‌ها بهتر است",
    ],
    transport: "قطار Südbahn به Spital am Semmering + اتوبوس شاتل (رایگان با Ski-Pass)",
    recommended: true,
    snowpark: true,
  },
  {
    id: "hochkar",
    name: "هوخکار",
    nameDe: "Hochkar",
    tagline: "بهترین برف اتریش در نزدیکی وین",
    state: "نیدراوتریش",
    distance: "۱۷۵ کیلومتر",
    travelTime: "۲ ساعت",
    elevation: "۱,۱۵۰ تا ۱,۸۰۸ متر",
    pistes: "۱۹ کیلومتر",
    lifts: 6,
    dayPass: "€۵۲",
    dayPassPrice: 52,
    season: "دسامبر تا آوریل",
    difficulty: { beginner: 25, intermediate: 55, expert: 20 },
    icon: Snowflake,
    gradient: "from-emerald-600 to-teal-700",
    color: "text-emerald-700",
    image: IMAGES.hochkar,
    highlights: [
      "بهترین برف نیدراوتریش (بالای ۱,۵۰۰ متر)",
      "پیست‌های چالش‌برانگیز برای حرفه‌ای‌ها",
      "مناظر پانورامیک کوه‌های آلپ",
      "مدرسه اسکی حرفه‌ای",
    ],
    bestFor: ["اسکی‌بازان حرفه‌ای", "اسنوبرد", "مناظر کوهستانی"],
    tips: [
      "برف این پیست به‌دلیل ارتفاع بالا مطمئن‌تر است",
      "اجاره خودرو توصیه می‌شود (اتوبوس محدود است)",
      "برای یک‌روزه، صبح زود حرکت کنید (۶ صبح)",
    ],
    transport: "قطار به Amstetten + اتوبوس یا خودرو شخصی (بهترین گزینه)",
  },
  {
    id: "schladming",
    name: "شلادمینگ",
    nameDe: "Schladming-Dachstein",
    tagline: "بهشتی برای اسکی حرفه‌ای — ۴ کوه، ۱ بلیت",
    state: "اشتایرمارک",
    distance: "۲۵۰ کیلومتر",
    travelTime: "۳ ساعت و ۳۰ دقیقه",
    elevation: "۷۵۰ تا ۲,۷۰۰ متر",
    pistes: "۱۲۳ کیلومتر",
    lifts: 47,
    dayPass: "€۷۴",
    dayPassPrice: 74,
    season: "نوامبر تا می",
    difficulty: { beginner: 25, intermediate: 45, expert: 30 },
    icon: Award,
    gradient: "from-rose-600 to-red-700",
    color: "text-rose-700",
    image: IMAGES.schladming,
    highlights: [
      "بزرگ‌ترین منطقه اسکی نزدیک وین (۴ کوه)",
      "میزبان مسابقات جهانی اسکی (Nightrace)",
      "پارک اسنوبرد و فریراید حرفه‌ای",
      "زندگی شبانه و après-ski بی‌نظیر",
    ],
    bestFor: ["اسکی حرفه‌ای", "اقامت چندروزه", "زندگی شبانه", "تجربه اروپایی"],
    tips: [
      "برای اقامت حداقل ۲ شب برنامه‌ریزی کنید",
      "بلیت Ski amadé برای چند منطقه قابل استفاده است",
      "در ژانویه و بهمن بهترین برف را دارد",
    ],
    transport: "قطار به Schladming از Wien Hauptbahnhof (۳ ساعت و ۳۰ دقیقه)",
  },
  {
    id: "annaberg",
    name: "آناابرگ",
    nameDe: "Annaberg",
    tagline: "پیست خانوادگی مناسب کودکان",
    state: "نیدراوتریش",
    distance: "۹۰ کیلومتر",
    travelTime: "۱ ساعت و ۳۰ دقیقه",
    elevation: "۸۰۰ تا ۱,۳۳۴ متر",
    pistes: "۱۲ کیلومتر",
    lifts: 5,
    dayPass: "€۴۲",
    dayPassPrice: 42,
    season: "دسامبر تا مارس",
    difficulty: { beginner: 60, intermediate: 35, expert: 5 },
    icon: Baby,
    gradient: "from-amber-500 to-orange-600",
    color: "text-amber-700",
    image: IMAGES.apresSki,
    highlights: [
      "بیش از نیمی از پیست‌ها برای مبتدی‌ها",
      "مدرسه اسکی ویژه کودکان",
      "منطقه بازی برفی و سرسره",
      "قیمت‌های مناسب‌تر",
    ],
    bestFor: ["خانواده با کودکان", "مبتدی‌ها", "سفر یک‌روزه"],
    tips: [
      "برای کودکان زیر ۶ سال، بلیت اسکی رایگان است",
      "پکیج خانوادگی تخفیف ویژه دارد",
      "مدرسه اسکی کودکان را از قبل رزرو کنید",
    ],
    transport: "قطار به St. Pölten + اتوبوس (یا خودرو شخصی)",
  },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "۵ پیست", label: "نزدیک وین (۱-۳ ساعت)", icon: Mountain },
  { value: "€۴۲+", label: "بلیت یک‌روزه", icon: Ticket },
  { value: "۵ ماه", label: "فصل اسکی (دسامبر-آوریل)", icon: Calendar },
  { value: "۱۸۰۸ متر", label: "بلندترین قله (هوخکار)", icon: TrendingUp },
];

// ==========================================
// TRANSPORT OPTIONS
// ==========================================
const TRANSPORT_OPTIONS = [
  {
    icon: Train,
    title: "قطار (ÖBB)",
    desc: "بهترین و راحت‌ترین گزینه. پکیج‌های Ski + Bahn از وین با تخفیف ۳۰٪.",
    pros: ["راحت", "بدون نگرانی پارکینگ", "پکیج تخفیف‌دار"],
    cost: "€۲۰-€۴۰ (رفت و برگشت)",
    gradient: "from-sky-600 to-blue-700",
  },
  {
    icon: Car,
    title: "خودرو شخصی",
    desc: "انعطاف‌پذیر اما نیازمند زنجیر چرخ در روزهای برفی. پارکینگ معمولاً €۵-€۱۰.",
    pros: ["انعطاف‌پذیر", "مناسب گروه‌ها", "امکان توقف در مسیر"],
    cost: "€۱۵-€۳۰ بنزین + پارکینگ",
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    icon: Bus,
    title: "اتوبوس اسکی",
    desc: "اتوبوس‌های اختصاصی از وین به پیست‌های اصلی. رزرو از قبل ضروری است.",
    pros: ["ارزان", "مناسب گروه‌ها", "بدون استرس رانندگی"],
    cost: "€۱۵-€۲۵ (رفت و برگشت)",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Backpack,
    title: "سفر ترکیبی",
    desc: "قطار + اتوبوس + شاتل — گاهی بهترین ترکیب برای رسیدن به پیست‌های خاص.",
    pros: ["دسترسی به همه پیست‌ها", "قابل انعطاف"],
    cost: "متغیر",
    gradient: "from-violet-600 to-purple-700",
  },
];

// ==========================================
// COST BREAKDOWN
// ==========================================
const COST_ITEMS = [
  { icon: Ticket, label: "بلیت اسکی یک‌روزه", range: "€۴۲-€۷۴", note: "بسته به پیست" },
  { icon: Cable, label: "اجاره تجهیزات کامل", range: "€۲۵-€۴۰", note: "چوب‌دستی + بوت + اسکی/اسنوبرد" },
  { icon: Backpack, label: "اجاره کلاه و ماسک", range: "€۵-€۱۰", note: "اختیاری" },
  { icon: Train, label: "حمل‌ونقل (رفت و برگشت)", range: "€۲۰-€۴۰", note: "قطار یا اتوبوس" },
  { icon: Utensils, label: "غذا و نوشیدنی", range: "€۱۵-€۳۰", note: "غذای کوهستان گران است" },
  { icon: Footprints, label: "مدرسه اسکی (اختیاری)", range: "€۴۰-€۸۰", note: "برای مبتدی‌ها توصیه می‌شود" },
];

// ==========================================
// BEGINNER TIPS
// ==========================================
const BEGINNER_TIPS = [
  { icon: Footprints, title: "کلاس مقدماتی بگیرید", desc: "اگر اولین‌بار اسکی می‌کنید، حتماً ۱-۲ جلسه کلاس مقدماتی بگیرید (حدود €۴۰-€۸۰). این سرمایه‌گذاری شما را از آسیب‌ها نجات می‌دهد.", color: "from-sky-500 to-blue-600" },
  { icon: Shield, title: "بیمه اسکی", desc: "بیمه اسکی (Ski-Versicherung) روزانه حدود €۵-€۱۰ است. در اتریش توصیه می‌شود — هزینه‌های درمانی و امداد کوهستان بسیار بالا هستند.", color: "from-emerald-500 to-teal-600" },
  { icon: Wind, title: "لباس چند لایه", desc: "از لباس زیر حرارتی، سپس یک لایه فلزی، و در نهایت کاپشن اسکی استفاده کنید. دستکش، عینک آفتابی و کرم ضدآفتاب ضروری است.", color: "from-amber-500 to-orange-600" },
  { icon: Sun, title: "کرم ضدآفتاب", desc: "در ارتفاعات بالای ۱,۵۰۰ متر، اشعه UV بسیار شدید است — حتی در روزهای ابری. هر ۲ ساعت کرم را تجدید کنید.", color: "from-rose-500 to-red-600" },
  { icon: Calendar, title: "ساعت طلایی", desc: "بهترین زمان اسکی از ساعت ۹:۰۰ تا ۱۱:۰۰ صبح است — برف سفت، پیست خلوت، و کیفیت پیست بالاست. بعد از ساعت ۱۴ برف شل می‌شود.", color: "from-violet-500 to-purple-600" },
  { icon: CloudSnow, title: "وضعیت برف را چک کنید", desc: "قبل از حرکت، وضعیت پیست و آب‌وهوا را در وب‌سایت رسمی پیست بررسی کنید. Bergfex.at بهترین منبع برای این اطلاعات است.", color: "from-teal-500 to-cyan-600" },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  { q: "آیا می‌توانم بدون تجربه اسکی به پیست‌های اتریش بروم؟", a: "بله. تمام پیست‌های معرفی‌شده بخش‌های آموزشی و پیست‌های آسان (آبی) برای مبتدی‌ها دارند. توصیه می‌شود حداقل یک کلاس مقدماتی ۲ ساعته (€۴۰-€۸۰) بگیرید تا از آسیب‌ها جلوگیری کنید. همچنین اجاره تجهیزات کامل از ایستگاه‌های کنار پیست به‌صرفه‌تر از خرید است." },
  { q: "بهترین ماه برای اسکی در اتریش چه موقع است؟", a: "بهترین ماه برای اسکی در نزدیکی وین: ژانویه و فوریه. در این دو ماه بیشترین برف و کمترین مشکل آب‌وهوایی وجود دارد. دسامبر ممکن است برف کم داشته باشد، مارس و آوریل هوا گرم‌تر اما پیست‌ها هنوز قابل استفاده هستند. برای پیست‌های با ارتفاع بالای ۱,۵۰۰ متر (مثل هوخکار)، فصل از نوامبر شروع می‌شود." },
  { q: "چه تجهیزاتی برای اسکی نیاز دارم؟", a: "برای اسکی به این تجهیزات نیاز دارید: ۱) اسکی یا اسنوبرد + بوت + چوب‌دستی (قابل اجاره) ۲) کلاه اسکی و عینک اسکی ۳) دستکش ضدآب ۴) کاپشن و شلوار ضدآب ۵) لباس زیر حرارتی ۶) جوراب ضخیم پشمی ۷) کرم ضدآفتاب ۸) بیمه اسکی. اگر برای اولین بار می‌روید، تمام تجهیزات به‌جز لباس زیر حرارتی قابل اجاره هستند." },
  { q: "هزینه یک روز اسکی در اتریش چقدر است؟", a: "هزینه یک روز اسکی برای یک نفر شامل: بلیت اسکی €۴۲-€۷۴، اجاره تجهیزات €۲۵-€۴۰، حمل‌ونقل €۲۰-€۴۰، غذا €۱۵-€۳۰، بیمه اسکی €۵-€۱۰. مجموع معمولاً بین €۱۰۵ تا €۱۹۵ برای یک روز کامل. صرفه‌جویی با پکیج‌های ÖBB یا Ski + Bahn و اجاره تجهیزات از فروشگاه‌های شهر (نه در پیست) امکان‌پذیر است." },
  { q: "آیا کودکان هم می‌توانند اسکی کنند؟", a: "بله. در اکثر پیست‌های اتریش، مدرسه‌های اسکی ویژه کودکان از ۳-۴ سال وجود دارد. برای کودکان زیر ۶ سال، معمولاً بلیت اسکی رایگان است (به‌همراه والد). پیست‌های خانوادگی مثل Annaberg و Semmering بهترین گزینه‌ها هستند. اجاره تجهیزات کودکان نیز در تمام ایستگاه‌ها موجود است." },
  { q: "آیا با قطار از وین می‌توانم به پیست اسکی بروم؟", a: "بله. محبوب‌ترین پیست‌های نزدیک وین با قطار ÖBB قابل دسترسی هستند: Semmering (۱ ساعت)، Stuhleck (۱ ساعت و ۲۰ دقیقه)، Schladming (۳ ساعت و ۳۰ دقیقه). ÖBB پکیج‌های ویژه «Ski + Bahn» ارائه می‌دهد که شامل بلیت قطار رفت و برگشت + بلیت اسکی است و تا ۳۰٪ صرفه‌جویی دارد. برای پیست‌های دیگر (Hochkar) خودرو یا اتوبوس توصیه می‌شود." },
  { q: "بیمه اسکی ضروری است؟", a: "بله، بیمه اسکی (Ski-Versicherung) در اتریش به‌شدت توصیه می‌شود. هزینه‌های امداد کوهستان (Bergrettung) می‌تواند از €۱,۰۰۰ تا €۱۰,۰۰۰ باشد. بیمه روزانه حدود €۵-€۱۰ است و از هر ایستگاه یا آنلاین قابل خریداری است. اگر بیمه درمانی عادی دارید، اغلب هزینه امداد کوهستان را پوشش نمی‌دهد — بیمه اسکی تکمیلی ضروری است." },
];

// ==========================================
// OPTIMIZED IMAGE COMPONENT (LCP/CLS friendly)
// ==========================================
const SeoImage: React.FC<{
  img: ImageMeta;
  className?: string;
  eager?: boolean;
  sizes?: string;
  caption?: string;
}> = ({ img, className = "", eager = false, sizes = "(max-width: 768px) 100vw, 50vw", caption }) => {
  const srcSet = `${img.url.replace(/w=\d+/, "w=600")} 600w, ${img.url.replace(/w=\d+/, "w=900")} 900w, ${img.url} ${img.width}w`;
  const Img = (
    <img
      src={img.url}
      srcSet={srcSet}
      sizes={sizes}
      alt={img.alt}
      title={img.title}
      width={img.width}
      height={img.height}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      fetchPriority={eager ? "high" : "auto"}
      className={className}
      itemProp="image"
    />
  );
  if (!caption) return Img;
  return (
    <figure itemScope itemType="https://schema.org/ImageObject">
      {Img}
      <figcaption className="sr-only" itemProp="caption">{caption}</figcaption>
      <meta itemProp="contentUrl" content={img.url} />
      <meta itemProp="width" content={String(img.width)} />
      <meta itemProp="height" content={String(img.height)} />
    </figure>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const SkiResortGuide: React.FC = () => {
  const [activeResort, setActiveResort] = useState<ResortId>("semmering");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [daysCount, setDaysCount] = useState<number>(1);
  const [peopleCount, setPeopleCount] = useState<number>(2);

  const activeResortData = useMemo(
    () => RESORTS.find((r) => r.id === activeResort)!,
    [activeResort]
  );

  const costEstimate = useMemo(() => {
    const ticketPerDay = activeResortData.dayPassPrice;
    const rentPerDay = 32;
    const transportPerPerson = 30;
    const foodPerDay = 22;
    const perPersonPerDay = ticketPerDay + rentPerDay + transportPerPerson + foodPerDay;
    const total = perPersonPerDay * peopleCount * daysCount;
    return { ticketPerDay, rentPerDay, transportPerPerson, foodPerDay, perPersonPerDay, total };
  }, [activeResortData, daysCount, peopleCount]);

  // ==========================================
  // SEO SCHEMA — Full Rich Results
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${BRAND.baseUrl}#organization`,
      name: BRAND.nameFa,
      alternateName: BRAND.nameEn,
      url: BRAND.baseUrl,
      logo: {
        "@type": "ImageObject",
        url: BRAND.logo,
        width: 512,
        height: 512,
      },
      sameAs: [BRAND.whatsapp, BRAND.telegram],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+43-688-976-3256",
        contactType: "customer service",
        availableLanguage: ["fa", "de", "en"],
        areaServed: ["AT", "IR"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: BRAND.baseUrl },
        { "@type": "ListItem", position: 2, name: "راهنماهای اتریش", item: `${BRAND.baseUrl}/guides` },
        { "@type": "ListItem", position: 3, name: "پیست‌های اسکی نزدیک وین", item: BRAND.pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${BRAND.pageUrl}#article`,
      headline: "راهنمای پیست‌های اسکی نزدیک وین ۲۰۲۶ — Semmering، Stuhleck، Hochkar",
      description:
        "معرفی کامل ۵ پیست اسکی نزدیک وین شامل Semmering، Stuhleck، Hochkar، Schladming و Annaberg — با قیمت بلیت، نحوه دسترسی با قطار ÖBB و نکات مبتدی.",
      image: [
        IMAGES.hero.url,
        IMAGES.semmering.url,
        IMAGES.stuhleck.url,
        IMAGES.hochkar.url,
        IMAGES.schladming.url,
      ],
      author: { "@type": "Organization", "@id": `${BRAND.baseUrl}#organization`, name: BRAND.nameFa },
      publisher: { "@type": "Organization", "@id": `${BRAND.baseUrl}#organization`, name: BRAND.nameFa, logo: { "@type": "ImageObject", url: BRAND.logo } },
      inLanguage: "fa-IR",
      datePublished: "2025-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      mainEntityOfPage: { "@type": "WebPage", "@id": BRAND.pageUrl },
      articleSection: "راهنمای سفر زمستانی اتریش",
      keywords: "پیست اسکی وین, اسکی اتریش, Semmering, Stuhleck, Hochkar, Schladming, Ski Wien",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "پیست‌های اسکی نزدیک وین",
      numberOfItems: RESORTS.length,
      itemListElement: RESORTS.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${r.name} (${r.nameDe})`,
        description: r.tagline,
        image: r.image.url,
        url: `${BRAND.pageUrl}#${r.id}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "چگونه از وین به پیست اسکی برویم؟",
      description: "راهنمای گام‌به‌گام سفر اسکی یک‌روزه از وین",
      totalTime: "P1D",
      estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "105" },
      step: [
        { "@type": "HowToStep", position: 1, name: "انتخاب پیست", text: "بر اساس سطح تجربه و بودجه، یکی از ۵ پیست معرفی‌شده را انتخاب کنید." },
        { "@type": "HowToStep", position: 2, name: "رزرو بلیت", text: "پکیج Ski + Bahn از ÖBB را آنلاین رزرو کنید." },
        { "@type": "HowToStep", position: 3, name: "اجاره تجهیزات", text: "تجهیزات کامل اسکی (اسکی، بوت، کلاه) را اجاره کنید." },
        { "@type": "HowToStep", position: 4, name: "بیمه اسکی", text: "بیمه اسکی روزانه (€۵-€۱۰) را تهیه کنید." },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "مشاوره سفر اسکی در اتریش",
      provider: { "@type": "Organization", "@id": `${BRAND.baseUrl}#organization` },
      areaServed: { "@type": "Country", name: "Austria" },
      serviceType: "Ski Travel Consultation",
      offers: { "@type": "Offer", priceCurrency: "EUR", price: "0", availability: "https://schema.org/InStock" },
    },
  ];

  return (
    <GuideContainer
      title="راهنمای پیست‌های اسکی نزدیک وین"
      description="معرفی کامل ۵ پیست اسکی نزدیک وین — با قیمت بلیت، نحوه دسترسی، سختی پیست و نکات مبتدی"
    >
      <SEO
        title="پیست‌های اسکی نزدیک وین ۲۰۲۶ | Semmering, Stuhleck, Hochkar — اتریش‌نشین"
        description="راهنمای کامل پیست‌های اسکی نزدیک وین: Semmering، Stuhleck، Hochkar، Schladming و Annaberg. قیمت بلیت، دسترسی با قطار ÖBB، تجهیزات و نکات مبتدی."
        keywords="پیست اسکی وین, Semmering, Stuhleck, Hochkar, Schladming, اسکی اتریش, Ski Wien, اسکی نزدیک وین, ÖBB Ski, Ski Amadé, اتریش‌نشین"
        canonical={BRAND.pageUrl}
        ogImage={IMAGES.hero.url}
        ogType="article"
        schemaData={seoSchema}
      />

      <article
        className="space-y-10 font-sans"
        dir="rtl"
        itemScope
        itemType="https://schema.org/Article"
      >
        <meta itemProp="headline" content="راهنمای پیست‌های اسکی نزدیک وین ۲۰۲۶" />
        <meta itemProp="inLanguage" content="fa-IR" />

        {/* ============ HERO (LCP optimized) ============ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl text-white"
          style={{
            background:
              "radial-gradient(80% 150% at 90% 0, #0369a1 0, #082f49 48%, #020617 100%)",
          }}
          aria-label="معرفی راهنمای پیست‌های اسکی نزدیک وین"
        >
          <div className="absolute inset-0 opacity-30">
            <SeoImage
              img={IMAGES.hero}
              eager
              className="w-full h-full object-cover"
              sizes="100vw"
              caption="پیست اسکی آلپ اتریش - راهنمای اسکی نزدیک وین"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#020617]/90 via-[#082f49]/75 to-[#0369a1]/55" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-sky-400/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none" aria-hidden="true">
            🎿
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              راهنمای پیست‌های اسکی نزدیک وین ۲۰۲۶
            </div>

            <h1
              className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl"
              itemProp="headline"
            >
              برف، سرسره و هیجان — یک ساعت از وین
            </h1>

            <p className="text-sm md:text-base text-sky-100 leading-relaxed max-w-3xl mb-6" itemProp="description">
              از پیست‌های <strong className="text-amber-300">آموزشی برای کودکان</strong> تا
              <strong className="text-amber-300"> پیست‌های حرفه‌ای با برف مطمئن</strong> —
              تنها با ۱ تا ۳ ساعت سفر از وین، می‌توانید به یکی از بهترین تجربه‌های
              زمستانی اروپا دسترسی داشته باشید. با <strong className="text-amber-300">قطار ÖBB</strong>،
              خودرو یا اتوبوس اسکی، همه‌چیز ساده‌تر از آن است که فکر می‌کنید.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              {[
                { icon: CheckCircle, text: "۵ پیست معتبر" },
                { icon: Train, text: "دسترسی با قطار" },
                { icon: Heart, text: "مناسب مبتدی و حرفه‌ای" },
              ].map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] font-bold text-sky-100">
                    <Icon className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    <span>{b.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="#resorts"
                className="inline-flex items-center gap-2 bg-white text-[#0369a1] font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Mountain className="w-4 h-4" aria-hidden="true" />
                کاوش پیست‌ها
              </a>
              <a
                href="https://www.oebb.at"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white font-black text-xs px-5 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <Ticket className="w-4 h-4" aria-hidden="true" />
                پکیج Ski + Bahn ÖBB
                <Globe className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* ============ QUICK STATS ============ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-sky-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-sky-700" aria-hidden="true" />
                </div>
                <div className="text-lg font-black text-sky-700">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ============ WHY AUSTRIA ============ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-sky-600 to-blue-700 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Quote className="w-7 h-7" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 className="text-[10px] font-black text-sky-700 mb-1">چرا اسکی در اتریش؟</h2>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">
                <strong className="text-sky-700">اتریش یکی از بهترین مقاصد اسکی در جهان است.</strong> بیش از
                ۴۰۰ پیست اسکی، ۳,۰۰۰ کوه و زیرساخت‌های عالی (قطار، اتوبوس، شاتل،
                پارکینگ) این کشور را به بهشت اسکی‌بازان تبدیل کرده است. حتی از
                وین، تنها با یک ساعت سفر می‌توانید به پیست‌های معتبر برسید.
                برخلاف تصور رایج، اسکی در اتریش می‌تواند با بودجه محدود هم انجام
                شود — اگر زمان‌بندی، پیست و تجهیزات را درست انتخاب کنید.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============ RESORTS ============ */}
        <section id="resorts" className="scroll-mt-24" aria-labelledby="resorts-heading">
          <div className="mb-5">
            <h2 id="resorts-heading" className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Mountain className="w-5 h-5 text-sky-700" aria-hidden="true" />
              ۵ پیست اسکی منتخب نزدیک وین — کدام مناسب شماست؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              روی هر پیست کلیک کنید تا جزئیات کامل را ببینید
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-5" role="tablist">
            {RESORTS.map((r) => {
              const Icon = r.icon;
              const isActive = activeResort === r.id;
              return (
                <motion.button
                  key={r.id}
                  onClick={() => setActiveResort(r.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`resort-panel-${r.id}`}
                  className={`relative overflow-hidden rounded-2xl border-2 p-3 text-center transition-all ${
                    isActive
                      ? "border-sky-600 shadow-lg shadow-sky-100"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  {r.recommended && (
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[8px] font-black px-2 py-0.5 rounded-br-xl flex items-center gap-0.5 z-10">
                      <Star className="w-2.5 h-2.5 fill-current" aria-hidden="true" />
                      پیشنهادی
                    </div>
                  )}
                  <div className={`w-9 h-9 mx-auto rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-white shadow-md mb-2`}>
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="text-[11px] font-black text-stone-900 leading-tight">{r.name}</div>
                  <div className="text-[9px] text-stone-500 font-bold font-mono mt-0.5" dir="ltr">
                    {r.travelTime}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeResort}
              id={`resort-panel-${activeResort}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white"
            >
              <div className="grid md:grid-cols-2">
                {/* Image panel */}
                <div className="relative h-72 md:h-auto min-h-[420px] overflow-hidden">
                  <SeoImage
                    img={activeResortData.image}
                    className="absolute inset-0 w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    caption={`${activeResortData.nameDe} — پیست اسکی اتریش`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${activeResortData.gradient} opacity-45 mix-blend-multiply`} />
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black text-stone-800 shadow-md">
                    <MapPin className="w-3 h-3 text-sky-700" aria-hidden="true" />
                    {activeResortData.state}
                  </div>
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {activeResortData.snowpark && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-600 text-white rounded-full text-[9px] font-black">
                        🏂 Snowpark
                      </span>
                    )}
                    {activeResortData.nightSki && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-800 text-white rounded-full text-[9px] font-black">
                        🌙 Night Ski
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">
                    <div className="text-[9px] font-black text-white/80 mb-1">بلیت یک‌روزه بزرگسال</div>
                    <div className="text-3xl font-black text-white leading-tight font-mono" dir="ltr">
                      {activeResortData.dayPass}
                    </div>
                    <div className="text-[9px] text-white/70 font-bold mt-0.5">
                      {activeResortData.pistes} پیست · {activeResortData.lifts} آسانسور
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className={`inline-flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-full bg-stone-100 ${activeResortData.color} mb-3`}>
                    <Mountain className="w-3 h-3" aria-hidden="true" />
                    {activeResortData.nameDe}
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-stone-900 mb-1 leading-tight">
                    {activeResortData.name}
                  </h3>
                  <div className="text-[11px] text-stone-400 font-bold font-mono mb-3" dir="ltr">
                    {activeResortData.tagline}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { icon: Clock, label: "زمان سفر از وین", value: activeResortData.travelTime },
                      { icon: TrendingUp, label: "ارتفاع", value: activeResortData.elevation },
                      { icon: Route, label: "طول پیست‌ها", value: activeResortData.pistes },
                      { icon: Calendar, label: "فصل اسکی", value: activeResortData.season },
                    ].map((it, idx) => {
                      const I = it.icon;
                      return (
                        <div key={idx} className="bg-stone-50 border border-stone-100 rounded-2xl p-2.5">
                          <I className="w-3.5 h-3.5 text-stone-500 mb-1" aria-hidden="true" />
                          <div className="text-[9px] text-stone-500 font-bold">{it.label}</div>
                          <div className="text-[10px] font-black text-stone-800">{it.value}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mb-4">
                    <div className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <Snowflake className="w-3 h-3" aria-hidden="true" />
                      توزیع سختی پیست‌ها
                    </div>
                    <div className="flex h-2.5 rounded-full overflow-hidden" role="img" aria-label={`مبتدی ${activeResortData.difficulty.beginner}٪، متوسط ${activeResortData.difficulty.intermediate}٪، حرفه‌ای ${activeResortData.difficulty.expert}٪`}>
                      <div className="bg-sky-400" style={{ width: `${activeResortData.difficulty.beginner}%` }} />
                      <div className="bg-rose-500" style={{ width: `${activeResortData.difficulty.intermediate}%` }} />
                      <div className="bg-stone-800" style={{ width: `${activeResortData.difficulty.expert}%` }} />
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-[9px] font-black text-stone-500">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-400" />مبتدی {activeResortData.difficulty.beginner}٪</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" />متوسط {activeResortData.difficulty.intermediate}٪</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-stone-800" />حرفه‌ای {activeResortData.difficulty.expert}٪</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" aria-hidden="true" />
                      نکات برجسته
                    </h4>
                    <ul className="space-y-1.5">
                      {activeResortData.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-[10px] text-stone-700 font-bold leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <Users className="w-3 h-3" aria-hidden="true" />
                      مناسب برای
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeResortData.bestFor.map((b, i) => (
                        <span key={i} className="text-[9px] font-black text-stone-600 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3 mb-4 flex items-start gap-2">
                    <Train className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="text-[10px] font-black text-sky-700 mb-0.5">دسترسی</div>
                      <div className="text-[10px] text-sky-800 font-bold leading-snug">
                        {activeResortData.transport}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3">
                    <div className="text-[10px] font-black text-amber-800 mb-2 flex items-center gap-1">
                      <Zap className="w-3 h-3" aria-hidden="true" />
                      نکات طلایی
                    </div>
                    <ul className="space-y-1.5">
                      {activeResortData.tips.map((t, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Star className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5 fill-current" aria-hidden="true" />
                          <span className="text-[10px] text-amber-900 font-bold leading-relaxed">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ============ COST CALCULATOR ============ */}
        <section aria-labelledby="calc-heading">
          <div className="mb-5">
            <h2 id="calc-heading" className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Euro className="w-5 h-5 text-sky-700" aria-hidden="true" />
              ماشین‌حساب هزینه سفر اسکی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              هزینه تقریبی سفر اسکی خود را محاسبه کنید
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-white rounded-3xl border border-stone-200 p-6 space-y-5">
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5 text-sky-700" aria-hidden="true" />
                  پیست انتخابی
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {RESORTS.map((r) => {
                    const isActive = activeResort === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setActiveResort(r.id)}
                        aria-pressed={isActive}
                        className={`rounded-xl border-2 p-2 text-center transition-all ${
                          isActive ? "border-sky-600 bg-sky-50/50 shadow-sm" : "border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <div className="text-[10px] font-black text-stone-700">{r.name}</div>
                        <div className="text-[9px] font-bold text-stone-500 font-mono mt-0.5" dir="ltr">
                          {r.dayPass}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-sky-700" aria-hidden="true" />
                    تعداد افراد
                  </span>
                  <span className="text-sm font-black text-sky-700 font-mono" dir="ltr">
                    {peopleCount} {peopleCount === 1 ? "person" : "people"}
                  </span>
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => setPeopleCount(n)}
                      aria-pressed={peopleCount === n}
                      className={`rounded-xl border-2 py-2.5 text-center transition-all ${
                        peopleCount === n ? "border-sky-600 bg-sky-50/50 shadow-md" : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <div className={`text-base font-black ${peopleCount === n ? "text-sky-700" : "text-stone-700"}`}>
                        {n}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-700" aria-hidden="true" />
                    تعداد روزهای اسکی
                  </span>
                  <span className="text-sm font-black text-sky-700 font-mono" dir="ltr">
                    {daysCount} {daysCount === 1 ? "day" : "days"}
                  </span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setDaysCount(n)}
                      aria-pressed={daysCount === n}
                      className={`rounded-xl border-2 py-2.5 text-center transition-all ${
                        daysCount === n ? "border-sky-600 bg-sky-50/50 shadow-md" : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <div className={`text-base font-black ${daysCount === n ? "text-sky-700" : "text-stone-700"}`}>
                        {n}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3">
                <div className="text-[10px] font-black text-amber-800 mb-2 flex items-center gap-1">
                  <Info className="w-3 h-3" aria-hidden="true" />
                  هزینه‌های تخمینی برای هر نفر در هر روز
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="flex justify-between"><span className="text-amber-800 font-bold">بلیت اسکی:</span><span className="font-black font-mono" dir="ltr">€{costEstimate.ticketPerDay}</span></div>
                  <div className="flex justify-between"><span className="text-amber-800 font-bold">اجاره تجهیزات:</span><span className="font-black font-mono" dir="ltr">€{costEstimate.rentPerDay}</span></div>
                  <div className="flex justify-between"><span className="text-amber-800 font-bold">حمل‌ونقل:</span><span className="font-black font-mono" dir="ltr">€{costEstimate.transportPerPerson}</span></div>
                  <div className="flex justify-between"><span className="text-amber-800 font-bold">غذا:</span><span className="font-black font-mono" dir="ltr">€{costEstimate.foodPerDay}</span></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeResort}-${peopleCount}-${daysCount}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="relative overflow-hidden rounded-3xl p-6 text-white bg-gradient-to-br from-[#0369a1] via-[#082f49] to-[#020617]"
                  aria-live="polite"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 border border-white/25 rounded-full text-[9px] font-black backdrop-blur-sm mb-4">
                      <Zap className="w-3 h-3 text-amber-300" aria-hidden="true" />
                      هزینه تقریبی سفر اسکی
                    </div>
                    <div className="text-[10px] font-black text-white/70 mb-1">
                      {peopleCount} نفر · {daysCount} روز در {activeResortData.name}
                    </div>
                    <div className="text-4xl md:text-5xl font-black leading-none mb-1 font-mono text-emerald-300" dir="ltr">
                      €{costEstimate.total.toLocaleString("de-AT", { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-[11px] font-bold text-white/60 mb-5">
                      برای هر نفر: €{costEstimate.perPersonPerDay.toFixed(0)} در روز
                    </div>
                    <div className="bg-white/10 border border-white/15 rounded-2xl p-3">
                      <div className="text-[9px] font-black text-white/60 mb-1">پیشنهاد {BRAND.nameFa}</div>
                      <p className="text-[10px] text-white/90 font-bold leading-relaxed">
                        {daysCount === 1
                          ? "برای سفر یک‌روزه، پکیج Ski + Bahn ÖBB می‌تواند تا ۳۰٪ صرفه‌جویی کند."
                          : "برای اقامت چندروزه، از اقامتگاه‌های Half-Board در نزدیکی پیست استفاده کنید."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ============ TRANSPORT OPTIONS ============ */}
        <section aria-labelledby="transport-heading">
          <div className="mb-5">
            <h2 id="transport-heading" className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-sky-700" aria-hidden="true" />
              ۴ روش رسیدن به پیست اسکی از وین
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              هر گزینه مزایا و معایب خود را دارد — بهترین را انتخاب کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {TRANSPORT_OPTIONS.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-stone-200 p-5 hover:shadow-md transition-all group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xs font-black text-stone-900 mb-1.5">{t.title}</h3>
                  <p className="text-[10px] text-stone-500 font-bold leading-relaxed mb-3">{t.desc}</p>
                  <div className="space-y-1 mb-3">
                    {t.pros.map((p, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-[9px] font-bold text-stone-600">
                        <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" aria-hidden="true" />
                        {p}
                      </div>
                    ))}
                  </div>
                  <div className="bg-stone-50 border border-stone-100 rounded-lg p-2">
                    <div className="text-[9px] text-stone-500 font-bold">هزینه تقریبی</div>
                    <div className="text-[10px] font-black text-sky-700">{t.cost}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ============ COST TABLE ============ */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8" aria-labelledby="cost-heading">
          <div className="mb-5">
            <h2 id="cost-heading" className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Euro className="w-5 h-5 text-sky-700" aria-hidden="true" />
              هزینه‌های یک روز اسکی در اتریش — جدول کامل
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              تخمین برای هر نفر در پیست‌های نزدیک وین
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right" dir="rtl">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-right">مورد</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-center">هزینه</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-right">توضیح</th>
                </tr>
              </thead>
              <tbody>
                {COST_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <tr key={i} className="border-b border-stone-100 hover:bg-stone-50/50 transition-all">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-sky-700" aria-hidden="true" />
                          </div>
                          <span className="text-[11px] font-black text-stone-800">{item.label}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className="text-[11px] font-black text-sky-700 font-mono" dir="ltr">{item.range}</span>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-[10px] font-bold text-stone-600">{item.note}</span>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-sky-50 border-b border-sky-200">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-sky-700 flex items-center justify-center text-white">
                        <Euro className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-black text-sky-900">مجموع تقریبی روزانه</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="text-sm font-black text-sky-900 font-mono" dir="ltr">€۱۰۵-€۱۹۵</span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-[10px] font-bold text-sky-800">هزینه هر نفر برای یک روز کامل</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
              <strong>صرفه‌جویی:</strong> با پکیج Ski + Bahn ÖBB (بلیت قطار + اسکی)،
              اجاره تجهیزات از فروشگاه‌های شهر (نه پیست) و همراه داشتن غذا از خانه،
              می‌توانید این مبلغ را تا ۳۰٪ کاهش دهید.
            </p>
          </div>
        </section>

        {/* ============ BEGINNER TIPS ============ */}
        <section aria-labelledby="tips-heading">
          <div className="mb-5">
            <h2 id="tips-heading" className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-sky-700" aria-hidden="true" />
              ۶ نکته طلایی برای مبتدی‌های اسکی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              اگر برای اولین بار به پیست می‌روید، این نکات را از دست ندهید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {BEGINNER_TIPS.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 hover:shadow-md transition-all group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xs font-black text-stone-900 mb-1.5">{tip.title}</h3>
                  <p className="text-[10px] text-stone-500 font-bold leading-relaxed">{tip.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ============ IMAGE GALLERY ============ */}
        <section aria-labelledby="gallery-heading">
          <div className="mb-5">
            <h2 id="gallery-heading" className="text-lg font-black text-stone-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-sky-700" aria-hidden="true" />
              تجربه اسکی در اتریش — سه قاب متفاوت
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از پیست‌های خانوادگی تا کوه‌های بلند آلپ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.semmering,
                title: "پیست خانوادگی",
                subtitle: "Semmering — ۱ ساعت از وین",
                desc: "مناسب خانواده‌ها و مبتدی‌ها با امکان سفر یک‌روزه با قطار از وین.",
                icon: Baby,
                gradient: "from-sky-600 to-blue-700",
                stat: "۱ ساعت",
              },
              {
                img: IMAGES.stuhleck,
                title: "پیست حرفه‌ای",
                subtitle: "Stuhleck — ۲۶ کیلومتر",
                desc: "بزرگ‌ترین پیست نیدراوتریش با پارک اسنوبرد و مناظر پانورامیک.",
                icon: Mountain,
                gradient: "from-indigo-600 to-purple-700",
                stat: "۱,۷۸۲ متر",
              },
              {
                img: IMAGES.train,
                title: "سفر با قطار",
                subtitle: "ÖBB Ski + Bahn",
                desc: "پکیج تخفیف‌دار ÖBB شامل بلیت رفت و برگشت + بلیت اسکی، تا ۳۰٪ صرفه‌جویی.",
                icon: Train,
                gradient: "from-emerald-600 to-teal-700",
                stat: "۳۰٪ تخفیف",
              },
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
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-45 mix-blend-multiply`} />
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-stone-800" aria-hidden="true" />
                    </div>
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-[9px] font-black text-white">
                      <Sparkles className="w-3 h-3 text-amber-300" aria-hidden="true" />
                      {c.stat}
                    </div>
                    <div className="absolute bottom-3 right-3 left-3">
                      <div className="text-[10px] font-black text-white/90 mb-1">{c.subtitle}</div>
                      <div className="text-sm font-black text-white leading-tight" itemProp="name">{c.title}</div>
                    </div>
                  </div>
                  <figcaption className="p-4 text-[11px] text-stone-600 font-bold leading-relaxed" itemProp="description">
                    {c.desc}
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8" aria-labelledby="faq-heading">
          <div className="mb-5">
            <h2 id="faq-heading" className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-sky-700" aria-hidden="true" />
              سوالات متداول درباره اسکی در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های کوتاه به پرتکرارترین سوالات فارسی‌زبانان
            </p>
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

        {/* ============ CTA ============ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#020617] via-[#082f49] to-[#0369a1] p-8 md:p-12 text-white text-center"
          aria-labelledby="cta-heading"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-sky-400/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Mountain className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              برنامه‌ریزی سفر اسکی
            </div>

            <h2 id="cta-heading" className="text-2xl md:text-3xl font-black mb-3">
              اولین سفر اسکی خود را برنامه‌ریزی می‌کنید؟
            </h2>

            <p className="text-sm text-sky-100 font-bold leading-relaxed mb-6">
              تیم {BRAND.nameFa} با تجربه زیسته در اتریش، می‌تواند بهترین پیست را
              بر اساس سطح تجربه، بودجه و محله شما پیشنهاد دهد. از رزرو پکیج
              Ski + Bahn تا اجاره تجهیزات. همین حالا پیام دهید.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                مشاوره در واتس‌اپ
              </a>
              <a
                href={BRAND.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                پشتیبانی تلگرام
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-sky-200/70 flex-wrap">
              <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />پاسخ در کمتر از ۲۴ ساعت</div>
              <div className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" aria-hidden="true" />خدمات داوطلبانه</div>
              <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" aria-hidden="true" />کاملاً محرمانه</div>
            </div>
          </div>
        </motion.section>

        {/* ============ DISCLAIMER ============ */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              قیمت‌های پیست اسکی، اجاره تجهیزات و حمل‌ونقل بر اساس داده‌های
              فصل ۲۰۲۵-۲۰۲۶ تهیه شده و ممکن است تغییر کنند. شرایط برف و
              پیست‌ها به‌شدت به آب‌وهوا بستگی دارد — همیشه وضعیت پیست را در
              وب‌سایت رسمی هر پیست یا Bergfex.at بررسی کنید. بیمه اسکی روزانه
              به‌شدت توصیه می‌شود چرا که هزینه‌های امداد کوهستان در اتریش
              بسیار بالاست.
            </p>
          </div>
        </div>
      </article>
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
        isOpen ? "border-sky-300 bg-sky-50/30 shadow-md" : "border-stone-200"
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
          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all ${
            isOpen ? "bg-gradient-to-br from-sky-600 to-blue-700 text-white" : "bg-stone-100 text-stone-500"
          }`}>
            {index + 1}
          </span>
          <span className="font-black text-xs text-stone-900 leading-snug text-right" itemProp="name">
            {q}
          </span>
        </span>
        <ChevronDown className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180 text-sky-700" : ""}`} aria-hidden="true" />
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

export default SkiResortGuide;