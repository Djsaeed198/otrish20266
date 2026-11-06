import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap, MapPin, Search, Star, Users, Globe, BookOpen,
  Clock, Coins, Heart, Baby, Languages, Phone, Mail, ExternalLink,
  ChevronLeft, ChevronRight, CheckCircle, Info, AlertTriangle, Sparkles,
  Building2, School, Backpack, X, SlidersHorizontal, TrendingUp,
  ShieldCheck, Calendar, FileText, HelpCircle, ChevronDown, Bookmark
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// TYPES
// ==========================================
type SchoolType = "public" | "international" | "kindergarten" | "language" | "vocational" | "iranian";
type Language = "de" | "en" | "fa" | "bilingual" | "fr";
type District = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23";

interface School {
  id: string;
  name: string;
  nameEn: string;
  type: SchoolType;
  district: District;
  city: string;
  languages: Language[];
  ageRange: string;
  fees: string;
  rating: number;
  reviews: number;
  tags: string[];
  description: string;
  highlights: string[];
  website?: string;
  phone?: string;
  email?: string;
  address: string;
  image?: string;
  verified: boolean;
  featured?: boolean;
}

// ==========================================
// SCHOOLS DATA (کامل - ایرانی، دولتی، بین‌المللی، مهدکودک، زبان)
// ==========================================
const SCHOOLS: School[] = [
  // ==========================================
  // 🇮🇷 مدارس ایرانی و فارسی‌زبان در وین
  // ==========================================
  {
    id: "ir-1",
    name: "مجتمع آموزشی فارابی وین",
    nameEn: "Farabi Educational Complex Vienna",
    type: "iranian",
    district: "21",
    city: "وین",
    languages: ["fa", "de"],
    ageRange: "۶-۱۴ سال",
    fees: "متغیر (بر اساس دوره)",
    rating: 4.8,
    reviews: 87,
    tags: ["فارسی", "معارف اسلامی", "آخر هفته", "هویت ایرانی"],
    description:
      "مدرسه آخر هفته فارابی با هدف آموزش زبان فارسی، قرآن و معارف اسلامی به فرزندان مهاجران ایرانی و افغانستانی در وین فعالیت می‌کند.",
    highlights: [
      "کلاس‌های آخر هفته (جمعه/شنبه)",
      "آموزش زبان فارسی در ۶ سطح مختلف",
      "تقویت هویت ملی و فرهنگی",
      "برگزاری مراسم نوروز و جشن‌ها",
    ],
    address: "منطقه ۲۱ وین (آدرس دقیق با تماس)",
    verified: true,
    featured: true,
  },
  {
    id: "ir-2",
    name: "مدرسه جمهوری اسلامی ایران در وین",
    nameEn: "School of the Islamic Republic of Iran in Vienna",
    type: "iranian",
    district: "6",
    city: "وین",
    languages: ["fa", "de", "en"],
    ageRange: "دبستان تا دبیرستان",
    fees: "متغیر (خصوصی با مجوز)",
    rating: 4.5,
    reviews: 45,
    tags: ["مدرسه رسمی ایرانی", "برنامه درسی ایران", "مجوز اتریش"],
    description:
      "مدرسه رسمی جمهوری اسلامی ایران در وین که با مجوز وزارت آموزش اتریش و بر اساس برنامه درسی ایران فعالیت می‌کند.",
    highlights: [
      "برنامه درسی رسمی ایران",
      "آموزش به زبان فارسی، انگلیسی یا آلمانی",
      "مجوز فعالیت از دولت اتریش",
      "مناسب برای خانواده‌های دیپلماتیک و مقیم",
    ],
    address: "Mollardgasse 60, 1060 Wien",
    phone: "+43 1 596 06 80",
    verified: true,
  },
  {
    id: "ir-3",
    name: "دبیرستان ابن‌سینا (آویسننا) وین",
    nameEn: "Avicenna (Ibn Sina) Gymnasium Vienna",
    type: "iranian",
    district: "21",
    city: "وین",
    languages: ["de", "fa", "en"],
    ageRange: "۱۰-۱۸ سال",
    fees: "متغیر (خصوصی)",
    rating: 4.6,
    reviews: 62,
    tags: ["دبیرستان خصوصی", "فارسی", "AHS", "دیجیتال"],
    description:
      "دبیرستان و رآل‌گیمنازیوم خصوصی «آویسننا» (ابن‌سینا) با تمرکز بر فناوری‌های دیجیتال و پذیرش دانش‌آموزان با پیشینه ایرانی.",
    highlights: [
      "نوع مدرسه: AHS (دبیرستان)",
      "تمرکز بر رسانه‌های دیجیتال و فناوری",
      "احتمال آموزش زبان فارسی",
      "پذیرش از منطقه ۲۱ و اطراف",
    ],
    address: "Pragerstraße 124, 1210 Wien",
    website: "https://www.avicenna-gymnasium.at",
    verified: true,
  },
  {
    id: "ir-4",
    name: "کلاس‌های آموزش زبان فارسی در مدارس دولتی وین",
    nameEn: "Persian (Farsi) Language Classes in Viennese Public Schools",
    type: "iranian",
    district: "8",
    city: "وین",
    languages: ["fa"],
    ageRange: "دانش‌آموزان مدارس",
    fees: "رایگان (برای دانش‌آموزان مدارس دولتی)",
    rating: 4.7,
    reviews: 134,
    tags: ["رایگان", "زبان مادری", "مدارس دولتی", "Erstsprachenunterricht"],
    description:
      "دوره‌های آموزش زبان فارسی به‌عنوان «زبان مادری» (Erstsprachenunterricht) در برخی مدارس دولتی وین برگزار می‌شود.",
    highlights: [
      "کاملاً رایگان برای دانش‌آموزان مدارس دولتی",
      "تحت نظارت اداره آموزش وین",
      "برگزاری در مدارس منتخب مناطق ۸، ۱۰، ۱۹، ۲۱، ۲۲ و ۲۳",
      "فرصت عالی برای حفظ زبان فارسی",
    ],
    address: "مدارس منتخب در مناطق ۸، ۱۰، ۱۹، ۲۱، ۲۲ و ۲۳",
    website: "https://www.sfz-wien.at",
    verified: true,
  },

  // ==========================================
  // 🌍 مدارس بین‌المللی وین
  // ==========================================
  {
    id: "intl-1",
    name: "مدرسه بین‌المللی وین (VIS)",
    nameEn: "Vienna International School",
    type: "international",
    district: "22",
    city: "وین",
    languages: ["en", "de"],
    ageRange: "۳-۱۸ سال",
    fees: "€ 12,420+ / سال (بسته به مقطع)",
    rating: 4.9,
    reviews: 412,
    tags: ["IB", "بزرگ‌ترین", "غیرانتفاعی", "سازمان ملل"],
    description:
      "بزرگ‌ترین و یکی از معتبرترین مدارس بین‌المللی اتریش با برنامه IB و روابط نزدیک با سازمان‌های بین‌المللی مستقر در وین.",
    highlights: [
      "بیش از ۱۴۰۰ دانش‌آموز از ۷۰+ کشور",
      "برنامه IB کامل (PYP, MYP, DP)",
      "غیرانتفاعی",
      "مورد تأیید سازمان‌های بین‌المللی",
    ],
    website: "https://www.vis.ac.at",
    phone: "+43 1 203 55 95",
    email: "info@vis.ac.at",
    address: "Strudlhofgasse 3-5, 1090 Wien",
    verified: true,
    featured: true,
  },
  {
    id: "intl-2",
    name: "مدرسه آمریکایی وین",
    nameEn: "American International School Vienna",
    type: "international",
    district: "19",
    city: "وین",
    languages: ["en"],
    ageRange: "۴-۱۸ سال",
    fees: "€ 23,931 - € 28,028 / سال",
    rating: 4.8,
    reviews: 289,
    tags: ["AP", "دیپلم آمریکایی", "غیرانتفاعی"],
    description:
      "مدرسه آمریکایی غیرانتفاعی با برنامه Advanced Placement (AP) و دیپلم معتبر آمریکایی، در منطقه ۱۹ وین.",
    highlights: [
      "دیپلم دبیرستان آمریکایی",
      "دوره‌های AP",
      "تیم‌های ورزشی حرفه‌ای",
      "کتابخانه دیجیتال پیشرفته",
    ],
    website: "https://www.ais.at",
    phone: "+43 1 40132",
    address: "Salmannsdorfer Str. 47, 1190 Wien",
    verified: true,
  },
  {
    id: "intl-3",
    name: "مدرسه بین‌المللی آمادئوس وین",
    nameEn: "AMADEUS International School Vienna",
    type: "international",
    district: "18",
    city: "وین",
    languages: ["en", "de"],
    ageRange: "۳-۱۸ سال",
    fees: "€ 17,955 - € 69,865 / سال",
    rating: 4.8,
    reviews: 167,
    tags: ["IB", "Boarding", "خصوصی", "موسیقی"],
    description:
      "مدرسه خصوصی بین‌المللی با برنامه IB، امکانات شبانه‌روزی (Boarding) و تمرکز ویژه بر موسیقی و هنرهای نمایشی.",
    highlights: [
      "برنامه IB (PYP, MYP, DP)",
      "امکان اقامت شبانه‌روزی (Boarding)",
      "تمرکز بر موسیقی و هنر",
      "۵۰۰ دانش‌آموز از ۶۵ ملیت",
    ],
    website: "https://www.amadeus-vienna.com",
    address: "Bastiengasse 36-38, 1180 Wien",
    verified: true,
    featured: true,
  },
  {
    id: "intl-4",
    name: "مدرسه بین‌المللی دانوب وین",
    nameEn: "Danube International School, Vienna",
    type: "international",
    district: "2",
    city: "وین",
    languages: ["en"],
    ageRange: "۳-۱۸ سال",
    fees: "€ 19,608 - € 25,354 / سال",
    rating: 4.7,
    reviews: 189,
    tags: ["IB", "خصوصی", "منطقه ۲", "چندفرهنگی"],
    description:
      "مدرسه بین‌المللی معتبر با برنامه IB در منطقه ۲ وین، با محیطی چندفرهنگی و امکانات آموزشی مدرن.",
    highlights: [
      "برنامه کامل IB (PYP, MYP, DP)",
      "۵۴۰ دانش‌آموز از ملیت‌های مختلف",
      "محیط آموزشی صمیمی",
      "هزینه‌های نسبتاً مقرون‌به‌صرفه",
    ],
    website: "https://www.danubeschool.at",
    address: "Josef Gall-Gasse 2, 1020 Wien",
    verified: true,
  },
  {
    id: "intl-5",
    name: "دبیرستان فرانسوی وین",
    nameEn: "Lycée Français de Vienne",
    type: "international",
    district: "9",
    city: "وین",
    languages: ["fr", "de", "en"],
    ageRange: "۳-۱۸ سال",
    fees: "€ 7,220+ / سال (بسته به مقطع)",
    rating: 4.6,
    reviews: 234,
    tags: ["برنامه فرانسوی", "Baccalauréat", "دوزبانه", "دولتی فرانسه"],
    description:
      "مدرسه فرانسوی وین با برنامه درسی رسمی فرانسه و ارائه دیپلم Baccalauréat، تحت نظارت دولت فرانسه.",
    highlights: [
      "برنامه درسی رسمی فرانسه",
      "دیپلم Baccalauréat",
      "دوره‌های زبان آلمانی و انگلیسی",
      "۱۸۵۰ دانش‌آموز از ملیت‌های مختلف",
    ],
    website: "https://www.lf-vienne.at",
    address: "Liechtensteinstraße 37a, 1090 Wien",
    verified: true,
  },
  {
    id: "intl-6",
    name: "مدرسه بین‌المللی مسیحی وین",
    nameEn: "International Christian School of Vienna",
    type: "international",
    district: "22",
    city: "وین",
    languages: ["en", "de"],
    ageRange: "۳-۱۸ سال",
    fees: "متغیر (خصوصی)",
    rating: 4.5,
    reviews: 112,
    tags: ["مسیحی", "IB", "American Curriculum", "خصوصی"],
    description:
      "مدرسه بین‌المللی مسیحی با برنامه IB و برنامه درسی آمریکایی، ارائه‌دهنده محیطی مبتنی بر ارزش‌های مسیحی.",
    highlights: [
      "برنامه IB و American Curriculum",
      "محیط مبتنی بر ارزش‌های مسیحی",
      "پذیرش دانش‌آموزان از همه ملیت‌ها",
      "موقعیت در منطقه ۲۲",
    ],
    website: "https://www.icsv.at",
    address: "Wagramer Straße 175, 1220 Wien",
    verified: true,
  },

  // ==========================================
  // 🏛️ دبیرستان‌های دولتی (Gymnasium)
  // ==========================================
  {
    id: "pub-1",
    name: "دبیرستان آکادمیک وین",
    nameEn: "Akademisches Gymnasium Wien",
    type: "public",
    district: "1",
    city: "وین",
    languages: ["de", "en"],
    ageRange: "۱۰-۱۸ سال",
    fees: "رایگان",
    rating: 4.7,
    reviews: 215,
    tags: ["قدیمی‌ترین دبیرستان وین", "دولتی", "زبان‌محور", "مرکز شهر"],
    description:
      "قدیمی‌ترین دبیرستان وین (تأسیس ۱۵۵۳) با تمرکز بر زبان‌های کلاسیک و مدرن، واقع در قلب شهر و نزدیک پارک شهر.",
    highlights: [
      "تأسیس در سال ۱۵۵۳",
      "تمرکز ویژه بر زبان‌ها",
      "موقعیت عالی در منطقه ۱",
      "شهریه رایگان",
    ],
    address: "Beethovenplatz 1, 1010 Wien",
    website: "https://www.akademischesgymnasium.at",
    verified: true,
  },
  {
    id: "pub-2",
    name: "دبیرستان دوبلینگر (G19)",
    nameEn: "Bundesgymnasium Wien 19 | Döblinger Gymnasium",
    type: "public",
    district: "19",
    city: "وین",
    languages: ["de", "en"],
    ageRange: "۱۰-۱۸ سال",
    fees: "رایگان",
    rating: 4.6,
    reviews: 178,
    tags: ["دولتی", "منطقه ۱۹", "Gymnasium"],
    description:
      "دبیرستان دولتی معتبر در منطقه ۱۹ (Döbling) با محیط آموزشی باکیفیت و امکانات مناسب.",
    highlights: [
      "دبیرستان دولتی (AHS)",
      "منطقه آرام و امن ۱۹",
      "معلمان مجرب",
      "فعالیت‌های فوق‌برنامه متنوع",
    ],
    address: "Gymnasiumstraße 83, 1190 Wien",
    verified: true,
  },
  {
    id: "pub-3",
    name: "دبیرستان دو زبانه دراشه‌اشتراسه",
    nameEn: "Bundesgymnasium Wien 23 Vienna Bilingual Schooling",
    type: "public",
    district: "23",
    city: "وین",
    languages: ["de", "en", "bilingual"],
    ageRange: "۱۰-۱۸ سال",
    fees: "رایگان",
    rating: 4.7,
    reviews: 201,
    tags: ["دولتی", "دوزبانه", "VBS", "ورزشی"],
    description:
      "دبیرستان دولتی بزرگ و متنوع در جنوب وین با برنامه دوزبانه (آلمانی-انگلیسی) و امکانات ورزشی گسترده.",
    highlights: [
      "برنامه Vienna Bilingual Schooling (VBS)",
      "بیش از ۱۰۰۰ دانش‌آموز",
      "امکانات ورزشی عالی",
      "بیش از ۱۴۰ ماژول انتخابی",
    ],
    address: "Draschestraße 90-92, 1230 Wien",
    verified: true,
  },
  {
    id: "pub-4",
    name: "دبیرستان تئودور کرامر",
    nameEn: "Bundesgymnasium Theodor Kramer-Straße",
    type: "public",
    district: "22",
    city: "وین",
    languages: ["de", "en"],
    ageRange: "۱۰-۱۸ سال",
    fees: "رایگان",
    rating: 4.5,
    reviews: 132,
    tags: ["دولتی", "منطقه ۲۲", "هنر", "طراحی"],
    description:
      "دبیرستان دولتی در منطقه ۲۲ با تمرکز بر هنر، طراحی و فناوری، و ارائه درس زبان انگلیسی با معلم Native.",
    highlights: [
      "زبان انگلیسی با Native Speaker",
      "درس هنر و طراحی",
      "فناوری و طراحی",
      "مناسب برای دانش‌آموزان خلاق",
    ],
    address: "Theodor Kramer-Straße 3, 1220 Wien",
    verified: true,
  },
  {
    id: "pub-5",
    name: "دبیرستان اشترن‌گاسه (Gymnasium Stubenbastei)",
    nameEn: "Gymnasium Stubenbastei",
    type: "public",
    district: "1",
    city: "وین",
    languages: ["de", "en"],
    ageRange: "۱۰-۱۸ سال",
    fees: "رایگان",
    rating: 4.6,
    reviews: 145,
    tags: ["دولتی", "منطقه ۱", "مرکزی", "سنتی"],
    description:
      "دبیرستان دولتی سنتی و معتبر در قلب وین با تمرکز بر علوم انسانی و زبان‌ها.",
    highlights: [
      "موقعیت مرکزی در منطقه ۱",
      "تاریخچه طولانی آموزشی",
      "زبان‌های متعدد",
      "شهریه رایگان",
    ],
    address: "Stubenbastei 6, 1010 Wien",
    verified: true,
  },
  {
    id: "pub-6",
    name: "دبیرستان رآل‌گیمنازیوم وین ۱۳",
    nameEn: "BG/BRG Wien 13 Fichtnergasse",
    type: "public",
    district: "13",
    city: "وین",
    languages: ["de"],
    ageRange: "۱۰-۱۸ سال",
    fees: "رایگان",
    rating: 4.5,
    reviews: 98,
    tags: ["دولتی", "رایگان", "Gymnasium", "منطقه ۱۳"],
    description:
      "دبیرستان دولتی با برنامه Gymnasium و آموزش رایگان برای مقیمان قانونی در منطقه ۱۳.",
    highlights: [
      "آموزش رایگان",
      "برنامه Gymnasium",
      "کلاس‌های زبان",
      "فعالیت‌های فوق‌برنامه",
    ],
    address: "Fichtnergasse 15, 1130 Wien",
    verified: true,
  },

  // ==========================================
  // 🧸 مهدکودک‌ها
  // ==========================================
  {
    id: "kg-1",
    name: "مهدکودک مونته‌سوری وین",
    nameEn: "Montessori Kindergarten Wien",
    type: "kindergarten",
    district: "4",
    city: "وین",
    languages: ["de", "en"],
    ageRange: "۲-۶ سال",
    fees: "€ 550 - 850 / ماه",
    rating: 4.7,
    reviews: 156,
    tags: ["Montessori", "Bilingual", "Nature-based"],
    description:
      "مهدکودک با رویکرد مونته‌سوری و محیط دوزبانه آلمانی-انگلیسی در منطقه ۴ وین.",
    highlights: [
      "رویکرد مونته‌سوری",
      "محیط دوزبانه",
      "فعالیت‌های طبیعت‌محور",
      "نسبت معلم به کودک ۱:۶",
    ],
    phone: "+43 1 505 25 25",
    address: "Wiedner Hauptstraße 15, 1040 Wien",
    verified: true,
  },
  {
    id: "kg-2",
    name: "مهدکودک اشتراوس‌برگ",
    nameEn: "Kindergarten Straußberg",
    type: "kindergarten",
    district: "21",
    city: "وین",
    languages: ["de"],
    ageRange: "۱-۶ سال",
    fees: "€ 280 - 480 / ماه (شهری)",
    rating: 4.6,
    reviews: 92,
    tags: ["شهری", "تعاونی", "طبیعت"],
    description:
      "مهدکودک شهری با شهریه تعاونی و تمرکز بر بازی و یادگیری طبیعی در منطقه ۲۱.",
    highlights: [
      "شهریه تعاونی",
      "بازی‌محور",
      "فضای باز بزرگ",
      "پذیرش از ۱ سال",
    ],
    address: "Prager Straße 60, 1210 Wien",
    verified: true,
  },

  // ==========================================
  // 🗣️ آموزشگاه‌های زبان
  // ==========================================
  {
    id: "lang-1",
    name: "آموزشگاه زبان آلمانی Alpha",
    nameEn: "Alpha Sprachschule Wien",
    type: "language",
    district: "1",
    city: "وین",
    languages: ["de", "en", "fa"],
    ageRange: "بزرگسالان + نوجوانان",
    fees: "€ 320 - 850 / دوره",
    rating: 4.6,
    reviews: 421,
    tags: ["ÖSD", "Goethe", "Integration", "مترجم فارسی"],
    description:
      "آموزشگاه زبان آلمانی با تمرکز بر آزمون‌های ÖSD، Goethe و دوره‌های Integration در مرکز وین.",
    highlights: [
      "آزمون ÖSD و Goethe",
      "دوره‌های Integration",
      "مترجم فارسی",
      "کلاس‌های آنلاین",
    ],
    website: "https://www.alpha.at",
    phone: "+43 1 524 06 06",
    address: "Schwarzenbergplatz 6, 1010 Wien",
    verified: true,
    featured: true,
  },
  {
    id: "lang-2",
    name: "مدرسه اتریشی-ایرانی مهر",
    nameEn: "Mehr Austrian-Persian School",
    type: "language",
    district: "10",
    city: "وین",
    languages: ["fa", "de", "bilingual"],
    ageRange: "۶-۱۴ سال",
    fees: "€ 180 - 350 / ماه",
    rating: 4.8,
    reviews: 187,
    tags: ["فارسی", "دوزبانه", "فرهنگی"],
    description:
      "مدرسه دوزبانه با تمرکز بر حفظ هویت فرهنگی و زبان فارسی همزمان با آموزش اتریشی.",
    highlights: [
      "حفظ هویت ایرانی",
      "آموزش فارسی و آلمانی",
      "برنامه‌های فرهنگی",
      "معلمان دوزبانه",
    ],
    phone: "00436889763256",
    address: "Quellenstraße 55, 1100 Wien",
    verified: true,
    featured: true,
  },

  // ==========================================
  // ⚙️ هنرستان فنی
  // ==========================================
  {
    id: "voc-1",
    name: "هنرستان فنی HTL Wien",
    nameEn: "HTL Wien Höhere Technische Lehranstalt",
    type: "vocational",
    district: "10",
    city: "وین",
    languages: ["de"],
    ageRange: "۱۴-۱۹ سال",
    fees: "رایگان / مشارکت جزئی",
    rating: 4.4,
    reviews: 156,
    tags: ["فنی و حرفه‌ای", "مهندسی", "دیپلم فنی"],
    description:
      "هنرستان فنی با رشته‌های مهندسی، IT و معماری؛ مسیر عالی برای ورود سریع به بازار کار.",
    highlights: [
      "دیپلم فنی اروپایی",
      "کارآموزی در صنعت",
      "رشته‌های IT و مکانیک",
      "بازار کار تضمینی",
    ],
    address: "Laimgrubengasse 10, 1100 Wien",
    verified: true,
  },
];

// ==========================================
// ARTICLES DATA
// ==========================================
const ARTICLES = [
  {
    id: "a1",
    icon: "🎯",
    title: "راهنمای انتخاب مدرسه برای فرزندان ایرانی",
    excerpt:
      "مدارس دولتی، بین‌المللی یا ایرانی؟ چگونه بهترین انتخاب را بر اساس بودجه، محل سکونت و آینده فرزندتان انجام دهید.",
    readTime: "۸ دقیقه",
    category: "راهنما",
  },
  {
    id: "a2",
    icon: "📝",
    title: "مراحل ثبت‌نام در مدارس دولتی اتریش",
    excerpt:
      "از پیش‌ثبت‌نام آنلاین تا دریافت کارت Schülerausweis؛ قدم به قدم با مهلت‌های قانونی.",
    readTime: "۶ دقیقه",
    category: "ثبت‌نام",
  },
  {
    id: "a3",
    icon: "💰",
    title: "هزینه‌های واقعی تحصیل در اتریش ۲۰۲۶",
    excerpt:
      "مدارس دولتی رایگان هستند اما هزینه‌های جانبی مثل لوازم، اردو، بیمه و کلاس زبان را جدی بگیرید.",
    readTime: "۵ دقیقه",
    category: "مالی",
  },
  {
    id: "a4",
    icon: "🗣️",
    title: "چطور فرزندتان زبان آلمانی را سریع یاد می‌گیرد؟",
    excerpt:
      "تکنیک‌های عملی برای والدین برای تسریع یادگیری زبان در خانه و مدرسه بدون فشار.",
    readTime: "۷ دقیقه",
    category: "زبان",
  },
  {
    id: "a5",
    icon: "🇮🇷",
    title: "حفظ هویت ایرانی در مدارس اتریش",
    excerpt:
      "چگونه فرزندانمان هم در سیستم آموزشی اتریش موفق باشند و هم زبان و فرهنگ ایرانی را حفظ کنند.",
    readTime: "۹ دقیقه",
    category: "فرهنگ",
  },
  {
    id: "a6",
    icon: "🌍",
    title: "مقایسه مدارس بین‌المللی وین",
    excerpt:
      "VIS، AIS، Amadeus، Danube و Lycée Français؛ کدام مدرسه برای شما مناسب‌تر است؟",
    readTime: "۱۰ دقیقه",
    category: "مقایسه",
  },
];

// ==========================================
// FAQ DATA
// ==========================================
const FAQS = [
  {
    q: "آیا مدارس دولتی اتریش برای اتباع خارجی رایگان است؟",
    a: "بله، اگر اقامت قانونی معتبر و ثبت آدرس (Meldezettel) دارید، فرزندان شما می‌توانند به صورت رایگان در مدارس دولتی تحصیل کنند. تنها هزینه‌های جانبی مثل بیمه، لوازم و اردوها را پرداخت می‌کنید.",
  },
  {
    q: "چطور بهترین منطقه وین را برای مدرسه فرزندم انتخاب کنم؟",
    a: "عوامل کلیدی: نزدیکی به محل سکونت، کیفیت مدرسه (Vienna School Quality)، نسبت معلم به دانش‌آموز، و وجود برنامه‌های زبان. محله‌های ۱۳، ۱۸، ۱۹ و ۲۳ دبیرستان‌های دولتی ممتاز دارند.",
  },
  {
    q: "آیا مدرسه‌ای با آموزش فارسی یا دوزبانه در وین وجود دارد؟",
    a: "بله. مجتمع آموزشی فارابی، مدرسه رسمی جمهوری اسلامی ایران، دبیرستان ابن‌سینا (آویسننا)، و کلاس‌های زبان فارسی در برخی مدارس دولتی وین (Erstsprachenunterricht) گزینه‌های اصلی هستند.",
  },
  {
    q: "هزینه مهدکودک‌های خصوصی چقدر است؟",
    a: "بسته به منطقه و رویکرد (مونته‌سوری، والدورف، Nature-based) از ۳۰۰ تا ۹۰۰ یورو در ماه متغیر است. مهدکودک‌های شهری ارزان‌تر و از ۱۵۰ یورو شروع می‌شوند.",
  },
  {
    q: "برای ثبت‌نام در مدرسه‌های بین‌المللی چه مدارکی لازم است؟",
    a: "معمولاً: گذرنامه، کارت اقامت، سوابق تحصیلی ترجمه‌شده، توصیه‌نامه معلم قبلی، مدرک زبان انگلیسی/آلمانی، و گاهی آزمون ورودی. برخی مدارس لیست انتظار طولانی دارند.",
  },
  {
    q: "تفاوت مدرسه ایرانی با مدرسه دولتی اتریش چیست؟",
    a: "مدارس ایرانی معمولاً در آخر هفته یا به‌عنوان مکمل فعالیت می‌کنند و بر حفظ زبان فارسی و هویت فرهنگی تمرکز دارند. مدارس دولتی اتریش برنامه رسمی کشور را ارائه می‌دهند و کاملاً رایگان هستند.",
  },
  {
    q: "کلاس‌های زبان فارسی در مدارس دولتی وین چگونه است؟",
    a: "دوره‌های Erstsprachenunterricht (آموزش زبان مادری) در برخی مدارس دولتی منتخب مناطق ۸، ۱۰، ۱۹، ۲۱، ۲۲ و ۲۳ به‌صورت رایگان برای دانش‌آموزان برگزار می‌شود. اطلاعات دقیق را از SFZ Wien دریافت کنید.",
  },
];

// ==========================================
// FILTER LABELS
// ==========================================
const TYPE_LABELS: Record<SchoolType, { label: string; icon: string; color: string }> = {
  public: { label: "دولتی", icon: "🏛️", color: "bg-blue-50 text-blue-700 border-blue-200" },
  international: { label: "بین‌المللی", icon: "🌍", color: "bg-purple-50 text-purple-700 border-purple-200" },
  kindergarten: { label: "مهدکودک", icon: "🧸", color: "bg-pink-50 text-pink-700 border-pink-200" },
  language: { label: "آموزشگاه زبان", icon: "🗣️", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  vocational: { label: "فنی و حرفه‌ای", icon: "⚙️", color: "bg-amber-50 text-amber-700 border-amber-200" },
  iranian: { label: "ایرانی / فارسی‌زبان", icon: "🇮🇷", color: "bg-red-50 text-red-700 border-red-200" },
};

const LANGUAGE_LABELS: Record<Language, string> = {
  de: "آلمانی 🇦🇹",
  en: "انگلیسی 🇬🇧",
  fa: "فارسی 🇮🇷",
  bilingual: "دوزبانه 🌐",
  fr: "فرانسوی 🇫🇷",
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const SchoolDirectory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"schools" | "articles" | "faq" | "compare">("schools");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<SchoolType | "all">("all");
  const [filterLang, setFilterLang] = useState<Language | "all">("all");
  const [filterDistrict, setFilterDistrict] = useState<District | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "name">("rating");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  // ==========================================
  // FILTERING LOGIC
  // ==========================================
  const filteredSchools = useMemo(() => {
    let list = [...SCHOOLS];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.nameEn.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filterType !== "all") list = list.filter((s) => s.type === filterType);
    if (filterLang !== "all") list = list.filter((s) => s.languages.includes(filterLang));
    if (filterDistrict !== "all") list = list.filter((s) => s.district === filterDistrict);

    list.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return a.name.localeCompare(b.name, "fa");
    });

    return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [searchQuery, filterType, filterLang, filterDistrict, sortBy]);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      toast.success(prev.includes(id) ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد");
      return next;
    });
  };

  const toggleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) {
        toast.error("حداکثر ۳ مدرسه قابل مقایسه است");
        return prev;
      }
      return [...prev, id];
    });
  };

  const stats = {
    total: SCHOOLS.length,
    iranian: SCHOOLS.filter((s) => s.type === "iranian").length,
    public: SCHOOLS.filter((s) => s.type === "public").length,
    international: SCHOOLS.filter((s) => s.type === "international").length,
    kindergarten: SCHOOLS.filter((s) => s.type === "kindergarten").length,
    language: SCHOOLS.filter((s) => s.type === "language").length,
  };

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "دایرکتوری مدارس، مهدکودک‌ها و آموزشگاه‌های اتریش",
      description:
        "فهرست جامع مدارس دولتی، بین‌المللی، ایرانی، مهدکودک‌ها و آموزشگاه‌های زبان برای فارسی‌زبانان مقیم اتریش",
      itemListElement: SCHOOLS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "School",
          name: s.name,
          address: s.address,
          telephone: s.phone,
          url: s.website,
        },
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
  ];

  return (
    <>
      <SEO
        title="دایرکتوری مدارس، مهدکودک‌ها و آموزشگاه‌های اتریش ۲۰۲۶ | اتریش‌نشین"
        description="جستجوی جامع مدارس ایرانی، دولتی، بین‌المللی، مهدکودک‌ها و آموزشگاه‌های زبان آلمانی در وین و سراسر اتریش برای فارسی‌زبانان. مقایسه، نظرات، هزینه‌ها و راهنمای ثبت‌نام."
        keywords="مدارس ایرانی وین, مدرسه بین المللی وین, مدرسه دولتی اتریش, مهدکودک وین, آموزشگاه زبان آلمانی, ثبت نام مدرسه اتریش, تحصیل رایگان اتریش, مدرسه فارابی"
        schemaData={seoSchema}
      />

      <div className="space-y-8 font-sans" dir="rtl">
        {/* ========================================== */}
        {/* HERO SECTION */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white"
          style={{
            background: "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[280px] opacity-5 pointer-events-none select-none">
            🎓
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-black backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              راهنمای جامع ۲۰۲۶ برای والدین فارسی‌زبان
            </div>

            <h1 className="text-2xl md:text-4xl font-black leading-tight mt-4 mb-3">
              دایرکتوری مدارس، مهدکودک‌ها و
              <br />
              آموزشگاه‌های اتریش
            </h1>

            <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-2xl">
              همه‌ی مدارس ایرانی، دولتی، بین‌المللی، مهدکودک‌ها و آموزشگاه‌های زبان در وین و ایالت‌ها —
              با اطلاعات تماس، هزینه‌ها، زبان‌های تدریس و نظرات کاربران.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {[
                { n: stats.total, l: "مرکز ثبت‌شده", icon: "🏫" },
                { n: stats.iranian, l: "مدرسه ایرانی", icon: "🇮🇷" },
                { n: stats.public, l: "مدرسه دولتی", icon: "🏛️" },
                { n: stats.international, l: "بین‌المللی", icon: "🌍" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/15 rounded-2xl p-3 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 text-rose-200 text-[10px] font-bold">
                    <span>{s.icon}</span>
                    <span>{s.l}</span>
                  </div>
                  <div className="text-2xl font-black mt-1">{s.n}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* TABS */}
        {/* ========================================== */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: "schools", label: "مدارس و مراکز", icon: GraduationCap, count: filteredSchools.length },
            { id: "articles", label: "مقالات و راهنما", icon: BookOpen, count: ARTICLES.length },
            { id: "compare", label: "مقایسه", icon: TrendingUp, count: compareList.length },
            { id: "faq", label: "سوالات متداول", icon: HelpCircle, count: FAQS.length },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs whitespace-nowrap transition-all ${
                  active
                    ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-lg shadow-red-900/30"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-[#c8102e]/40"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
                {t.count > 0 && (
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                      active ? "bg-white/25" : "bg-[#c8102e]/10 text-[#c8102e]"
                    }`}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* TAB CONTENT */}
        {/* ========================================== */}
        <AnimatePresence mode="wait">
          {/* ============== SCHOOLS TAB ============== */}
          {activeTab === "schools" && (
            <motion.div
              key="schools"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Search + Filter Bar */}
              <div className="bg-white rounded-3xl border border-stone-200 p-4 space-y-4 shadow-sm">
                <div className="flex gap-3 flex-wrap">
                  <div className="flex-1 min-w-[240px] relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="جستجوی مدرسه، مهدکودک یا آموزشگاه…"
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3 pr-11 pl-4 text-sm font-bold focus:outline-none focus:border-[#c8102e] focus:ring-4 focus:ring-[#c8102e]/10 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-stone-200 rounded-full flex items-center justify-center hover:bg-stone-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setShowFilters((s) => !s)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-black text-xs transition-all ${
                      showFilters
                        ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    فیلترها
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-3 bg-stone-100 rounded-2xl text-xs font-black border-none focus:outline-none focus:ring-2 focus:ring-[#c8102e]/30"
                  >
                    <option value="rating">مرتب‌سازی: امتیاز</option>
                    <option value="reviews">مرتب‌سازی: تعداد نظرات</option>
                    <option value="name">مرتب‌سازی: نام</option>
                  </select>
                </div>

                {/* Filters Panel */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-stone-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[11px] font-black text-stone-500 mb-2 block">
                            نوع مرکز
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              onClick={() => setFilterType("all")}
                              className={`text-[11px] font-black px-3 py-1.5 rounded-full border transition-all ${
                                filterType === "all"
                                  ? "bg-stone-900 text-white border-stone-900"
                                  : "bg-white border-stone-200 hover:border-stone-400"
                              }`}
                            >
                              همه
                            </button>
                            {(Object.keys(TYPE_LABELS) as SchoolType[]).map((t) => (
                              <button
                                key={t}
                                onClick={() => setFilterType(t)}
                                className={`text-[11px] font-black px-3 py-1.5 rounded-full border transition-all ${
                                  filterType === t
                                    ? "bg-stone-900 text-white border-stone-900"
                                    : `${TYPE_LABELS[t].color} hover:shadow-sm`
                                }`}
                              >
                                {TYPE_LABELS[t].icon} {TYPE_LABELS[t].label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-black text-stone-500 mb-2 block">
                            زبان تدریس
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              onClick={() => setFilterLang("all")}
                              className={`text-[11px] font-black px-3 py-1.5 rounded-full border transition-all ${
                                filterLang === "all"
                                  ? "bg-stone-900 text-white border-stone-900"
                                  : "bg-white border-stone-200 hover:border-stone-400"
                              }`}
                            >
                              همه
                            </button>
                            {(Object.keys(LANGUAGE_LABELS) as Language[]).map((l) => (
                              <button
                                key={l}
                                onClick={() => setFilterLang(l)}
                                className={`text-[11px] font-black px-3 py-1.5 rounded-full border transition-all ${
                                  filterLang === l
                                    ? "bg-stone-900 text-white border-stone-900"
                                    : "bg-white border-stone-200 hover:border-stone-400"
                                }`}
                              >
                                {LANGUAGE_LABELS[l]}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-black text-stone-500 mb-2 block">
                            منطقه (Bezirk)
                          </label>
                          <select
                            value={filterDistrict}
                            onChange={(e) => setFilterDistrict(e.target.value as any)}
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold focus:outline-none focus:border-[#c8102e]"
                          >
                            <option value="all">همه مناطق</option>
                            {Array.from({ length: 23 }, (_, i) => String(i + 1) as District).map((d) => (
                              <option key={d} value={d}>
                                منطقه {d}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {(filterType !== "all" || filterLang !== "all" || filterDistrict !== "all" || searchQuery) && (
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <span className="text-[11px] font-bold text-stone-500">
                      {filteredSchools.length} نتیجه یافت شد
                    </span>
                    <button
                      onClick={() => {
                        setFilterType("all");
                        setFilterLang("all");
                        setFilterDistrict("all");
                        setSearchQuery("");
                      }}
                      className="text-[11px] font-black text-[#c8102e] hover:underline"
                    >
                      پاک کردن فیلترها ✕
                    </button>
                  </div>
                )}
              </div>

              {/* School Cards Grid */}
              {filteredSchools.length === 0 ? (
                <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-3">
                  <div className="text-5xl">🔍</div>
                  <h3 className="font-black text-stone-800">نتیجه‌ای یافت نشد</h3>
                  <p className="text-xs text-stone-500 font-bold">
                    فیلترها یا کلمه جستجو را تغییر دهید.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {filteredSchools.map((school, i) => (
                    <SchoolCard
                      key={school.id}
                      school={school}
                      index={i}
                      isBookmarked={bookmarks.includes(school.id)}
                      isCompared={compareList.includes(school.id)}
                      onBookmark={() => toggleBookmark(school.id)}
                      onCompare={() => toggleCompare(school.id)}
                      onDetails={() => setSelectedSchool(school)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ============== ARTICLES TAB ============== */}
          {activeTab === "articles" && (
            <motion.div
              key="articles"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                    📚
                  </div>
                  <div>
                    <h2 className="font-black text-stone-900 mb-1">
                      راهنمای والدین برای انتخاب و ثبت‌نام مدارس
                    </h2>
                    <p className="text-xs text-stone-600 font-bold leading-relaxed">
                      مقالاتی که به شما کمک می‌کند از صفر تا صد مسیر تحصیل فرزندانتان در اتریش را بهتر
                      بشناسید و تصمیم‌های درست بگیرید.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ARTICLES.map((a, i) => (
                  <motion.article
                    key={a.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="bg-white border border-stone-200 rounded-3xl p-6 cursor-pointer hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#c8102e]/10 to-[#970d22]/5 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        {a.icon}
                      </div>
                      <span className="text-[10px] font-black text-[#c8102e] bg-[#c8102e]/10 px-2.5 py-1 rounded-full">
                        {a.category}
                      </span>
                    </div>
                    <h3 className="font-black text-stone-900 mb-2 leading-snug">{a.title}</h3>
                    <p className="text-xs text-stone-500 font-bold leading-relaxed mb-4">
                      {a.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-stone-500">
                        <Clock className="w-3 h-3" />
                        {a.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-black text-[#c8102e] group-hover:gap-2 transition-all">
                        مطالعه
                        <ChevronLeft className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6">
                <h3 className="font-black text-emerald-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  نکات کلیدی برای والدین ایرانی
                </h3>
                <ul className="space-y-2 text-xs font-bold text-emerald-800 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      <b>ثبت‌نام دولتی رایگان است</b> — پس از دریافت Meldezettel، در نزدیک‌ترین مدرسه
                      منطقه ثبت‌نام کنید. هیچ محدودیت ملیتی وجود ندارد.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      <b>کلاس‌های آماده‌سازی زبان (Deutschförderklasse)</b> در مدارس دولتی برای کودکان
                      تازه‌وارد به‌صورت رایگان برگزار می‌شود.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      <b>مدارک ترجمه‌شده رسمی</b> (کارت اقامت، سوابق تحصیلی) را از قبل آماده کنید تا
                      روند ثبت‌نام سریع باشد.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      <b>برای مدارس بین‌المللی</b> معمولاً لیست انتظار وجود دارد؛ حداقل ۶ ماه قبل اقدام
                      کنید.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      <b>حفظ هویت ایرانی</b> — با ثبت‌نام موازی در مدارس آخر هفته فارسی (مانند فارابی)
                      فرزندتان هم زبان و فرهنگ را حفظ می‌کند و هم در سیستم اتریشی موفق می‌شود.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* ============== COMPARE TAB ============== */}
          {activeTab === "compare" && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {compareList.length === 0 ? (
                <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-3">
                  <div className="text-5xl">📊</div>
                  <h3 className="font-black text-stone-800">لیست مقایسه خالی است</h3>
                  <p className="text-xs text-stone-500 font-bold">
                    از تب «مدارس و مراکز»، روی دکمه «مقایسه» هر مدرسه کلیک کنید تا اینجا نمایش داده شود.
                  </p>
                  <button
                    onClick={() => setActiveTab("schools")}
                    className="mt-3 px-5 py-2.5 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs rounded-2xl shadow-lg hover:scale-[1.02] transition"
                  >
                    رفتن به لیست مدارس
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden">
                  <div className="grid grid-cols-4 gap-0">
                    <div className="bg-stone-50 p-4 border-b border-stone-200"></div>
                    {compareList.map((id) => {
                      const s = SCHOOLS.find((x) => x.id === id);
                      if (!s) return null;
                      return (
                        <div
                          key={id}
                          className="bg-gradient-to-br from-[#c8102e]/5 to-transparent p-4 border-b border-l border-stone-200 text-center"
                        >
                          <div className="text-2xl mb-1">🏫</div>
                          <div className="font-black text-xs text-stone-900 leading-tight">
                            {s.name}
                          </div>
                          <button
                            onClick={() => toggleCompare(id)}
                            className="text-[10px] font-black text-rose-600 mt-2 hover:underline"
                          >
                            حذف ✕
                          </button>
                        </div>
                      );
                    })}

                    {[
                      { key: "type", label: "نوع", render: (s: School) => `${TYPE_LABELS[s.type].icon} ${TYPE_LABELS[s.type].label}` },
                      { key: "district", label: "منطقه", render: (s: School) => `منطقه ${s.district}` },
                      { key: "age", label: "محدوده سنی", render: (s: School) => s.ageRange },
                      { key: "fees", label: "شهریه", render: (s: School) => s.fees },
                      { key: "languages", label: "زبان‌ها", render: (s: School) => s.languages.map((l) => LANGUAGE_LABELS[l]).join(" • ") },
                      { key: "rating", label: "امتیاز", render: (s: School) => `⭐ ${s.rating} (${s.reviews})` },
                      { key: "address", label: "آدرس", render: (s: School) => s.address },
                    ].map((row, ri) => (
                      <React.Fragment key={row.key}>
                        <div
                          className={`p-4 font-black text-xs text-stone-700 ${
                            ri % 2 === 0 ? "bg-stone-50" : "bg-white"
                          } border-b border-stone-100`}
                        >
                          {row.label}
                        </div>
                        {compareList.map((id) => {
                          const s = SCHOOLS.find((x) => x.id === id);
                          if (!s) return null;
                          return (
                            <div
                              key={id + row.key}
                              className={`p-4 font-bold text-xs text-stone-800 border-b border-l border-stone-100 ${
                                ri % 2 === 0 ? "bg-stone-50/50" : "bg-white"
                              }`}
                            >
                              {row.render(s)}
                            </div>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ============== FAQ TAB ============== */}
          {activeTab === "faq" && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                    ❓
                  </div>
                  <div>
                    <h2 className="font-black text-stone-900 mb-1">
                      سوالات پرتکرار والدین درباره مدارس اتریش
                    </h2>
                    <p className="text-xs text-stone-600 font-bold leading-relaxed">
                      پاسخ‌های کوتاه و کاربردی به رایج‌ترین سوالات فارسی‌زبانان درباره سیستم آموزشی،
                      ثبت‌نام، هزینه‌ها و زبان.
                    </p>
                  </div>
                </div>
              </div>

              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-white border rounded-3xl overflow-hidden transition-all ${
                      isOpen ? "border-[#c8102e]/30 shadow-md" : "border-stone-200"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full p-5 flex items-center justify-between text-right hover:bg-stone-50 transition"
                    >
                      <span className="flex items-center gap-3 flex-1">
                        <span
                          className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 transition ${
                            isOpen
                              ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white"
                              : "bg-stone-100 text-stone-500"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="font-black text-sm text-stone-900 leading-snug">
                          {faq.q}
                        </span>
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-[#c8102e]" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pr-16 text-xs text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              <div className="bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] rounded-3xl p-8 text-white text-center mt-6">
                <div className="text-4xl mb-2">💬</div>
                <h3 className="font-black text-lg mb-2">سوال دیگری دارید؟</h3>
                <p className="text-xs text-stone-300 font-bold max-w-md mx-auto leading-relaxed mb-5">
                  کارشناسان و مشاوران تحصیلی فارسی‌زبان در وین آماده پاسخ به سوالات شما هستند.
                </p>
                <a
                  href="https://wa.me/436889763256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
                >
                  <Phone className="w-4 h-4" />
                  مشاوره آنلاین رایگان
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================== */}
        {/* SCHOOL DETAIL MODAL */}
        {/* ========================================== */}
        <AnimatePresence>
          {selectedSchool && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedSchool(null)}
            >
              <motion.div
                initial={{ scale: 0.92, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                dir="rtl"
              >
                <div className="relative bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white p-6 rounded-t-3xl">
                  <button
                    onClick={() => setSelectedSchool(null)}
                    className="absolute top-4 left-4 w-9 h-9 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] font-black bg-white/20 border border-white/25 px-2.5 py-1 rounded-full">
                      {TYPE_LABELS[selectedSchool.type].icon} {TYPE_LABELS[selectedSchool.type].label}
                    </span>
                    {selectedSchool.verified && (
                      <span className="text-[10px] font-black bg-emerald-500/90 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> تاییدشده
                      </span>
                    )}
                    {selectedSchool.featured && (
                      <span className="text-[10px] font-black bg-amber-400 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> ویژه
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-black leading-tight">{selectedSchool.name}</h2>
                  <p className="text-xs text-rose-100 font-bold mt-1">{selectedSchool.nameEn}</p>
                </div>

                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(selectedSchool.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-stone-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-black text-stone-800">{selectedSchool.rating}</span>
                    <span className="text-xs text-stone-500 font-bold">
                      ({selectedSchool.reviews} نظر)
                    </span>
                  </div>

                  <p className="text-sm text-stone-600 font-bold leading-relaxed">
                    {selectedSchool.description}
                  </p>

                  <div>
                    <h4 className="text-xs font-black text-stone-500 mb-2">
                      ⭐ مزایا و ویژگی‌ها
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedSchool.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 bg-stone-50 rounded-xl p-2.5 border border-stone-100"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-[11px] font-bold text-stone-700 leading-snug">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Users, label: "محدوده سنی", value: selectedSchool.ageRange },
                      { icon: Coins, label: "شهریه", value: selectedSchool.fees },
                      { icon: MapPin, label: "منطقه", value: `منطقه ${selectedSchool.district}, ${selectedSchool.city}` },
                      { icon: Languages, label: "زبان‌ها", value: selectedSchool.languages.map((l) => LANGUAGE_LABELS[l]).join(" • ") },
                    ].map((info, i) => {
                      const Icon = info.icon;
                      return (
                        <div key={i} className="bg-stone-50 rounded-2xl p-3 border border-stone-100">
                          <div className="flex items-center gap-2 text-[10px] font-black text-stone-500 mb-1">
                            <Icon className="w-3.5 h-3.5" />
                            {info.label}
                          </div>
                          <div className="text-xs font-black text-stone-800 leading-snug">
                            {info.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-blue-700 text-[11px] font-black mb-1">
                      <MapPin className="w-4 h-4" />
                      آدرس
                    </div>
                    <div className="text-xs font-bold text-blue-900 leading-relaxed">
                      {selectedSchool.address}
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap pt-2">
                    {selectedSchool.website && (
                      <a
                        href={selectedSchool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs py-3 rounded-2xl shadow-lg hover:scale-[1.02] transition"
                      >
                        <Globe className="w-4 h-4" />
                        وب‌سایت رسمی
                      </a>
                    )}
                    {selectedSchool.phone && (
                      <a
                        href={`tel:${selectedSchool.phone}`}
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-stone-900 text-white font-black text-xs py-3 rounded-2xl hover:scale-[1.02] transition"
                      >
                        <Phone className="w-4 h-4" />
                        تماس تلفنی
                      </a>
                    )}
                    {selectedSchool.email && (
                      <a
                        href={`mailto:${selectedSchool.email}`}
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-stone-100 text-stone-800 font-black text-xs py-3 rounded-2xl hover:bg-stone-200 transition"
                      >
                        <Mail className="w-4 h-4" />
                        ایمیل
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// ==========================================
// SCHOOL CARD COMPONENT
// ==========================================
function SchoolCard({
  school,
  index,
  isBookmarked,
  isCompared,
  onBookmark,
  onCompare,
  onDetails,
}: {
  key?: React.Key;
  school: School;
  index: number;
  isBookmarked: boolean;
  isCompared: boolean;
  onBookmark: () => void;
  onCompare: () => void;
  onDetails: () => void;
}) {
  const typeInfo = TYPE_LABELS[school.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={`relative bg-white border rounded-3xl overflow-hidden transition-all hover:shadow-xl ${
        school.featured ? "border-[#c8102e]/40 ring-1 ring-[#c8102e]/10" : "border-stone-200"
      }`}
    >
      {school.featured && (
        <div className="absolute top-0 left-0 z-10 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[9px] font-black px-3 py-1 rounded-br-2xl flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          پیشنهاد ویژه
        </div>
      )}

      <button
        onClick={onBookmark}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition ${
          isBookmarked
            ? "bg-[#c8102e] text-white shadow-lg"
            : "bg-white/95 text-stone-400 hover:text-[#c8102e] shadow-sm"
        }`}
        aria-label="ذخیره"
      >
        <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
      </button>

      <div className="p-5 pt-6">
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl flex-shrink-0 ${typeInfo.color}`}
          >
            {typeInfo.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <span
                className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${typeInfo.color}`}
              >
                {typeInfo.label}
              </span>
              {school.verified && (
                <span className="text-[9px] font-black text-emerald-600 flex items-center gap-0.5">
                  <CheckCircle className="w-3 h-3" /> تاییدشده
                </span>
              )}
            </div>
            <h3 className="font-black text-stone-900 text-sm leading-tight truncate">
              {school.name}
            </h3>
            <p className="text-[10px] text-stone-400 font-bold truncate">{school.nameEn}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-black text-stone-800">{school.rating}</span>
            <span className="text-[10px] text-stone-400 font-bold">({school.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-black text-stone-500">
            <MapPin className="w-3 h-3" />
            منطقه {school.district}، {school.city}
          </div>
        </div>

        <p className="text-[11px] text-stone-500 font-bold leading-relaxed mb-3 line-clamp-2">
          {school.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {school.tags.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="text-[9px] font-black text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-stone-50 rounded-xl p-2 border border-stone-100">
            <div className="text-[9px] text-stone-400 font-black mb-0.5">سن</div>
            <div className="text-[10px] text-stone-700 font-black leading-tight">
              {school.ageRange}
            </div>
          </div>
          <div className="bg-stone-50 rounded-xl p-2 border border-stone-100">
            <div className="text-[9px] text-stone-400 font-black mb-0.5">زبان</div>
            <div className="text-[10px] text-stone-700 font-black leading-tight">
              {school.languages.length} زبان
            </div>
          </div>
          <div className="bg-stone-50 rounded-xl p-2 border border-stone-100">
            <div className="text-[9px] text-stone-400 font-black mb-0.5">شهریه</div>
            <div className="text-[10px] text-stone-700 font-black leading-tight truncate">
              {school.fees.split("/")[0]}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onDetails}
            className="flex-1 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-[11px] py-2.5 rounded-2xl shadow-md hover:scale-[1.02] transition flex items-center justify-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5" />
            جزئیات کامل
          </button>
          <button
            onClick={onCompare}
            className={`px-3 py-2.5 rounded-2xl font-black text-[11px] transition flex items-center gap-1.5 ${
              isCompared
                ? "bg-emerald-500 text-white shadow-md"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            {isCompared ? <CheckCircle className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
            {isCompared ? "افزوده شد" : "مقایسه"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SchoolDirectory;