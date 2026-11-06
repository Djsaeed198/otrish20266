import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag, ShoppingCart, Smartphone, Wifi, Signal, Euro,
  Tag, Percent, Calendar, Store, Gift, CreditCard, Wallet,
  CheckCircle, Info, ChevronDown, Sparkles, Zap, Star, Users,
  PhoneCall, Send, Globe, Heart, Shield, Award, TrendingUp,
  Quote, Clock, MapPin, Building2, Package, Truck, Recycle,
  Instagram, Facebook, Search, Filter, Grid3x3, ThumbsUp,
  AlertCircle, Landmark, Coffee, Home, Car, Bike, Monitor,
  Headphones, Watch, Shirt, Sofa, Refrigerator, ArrowUpRight,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES — Vienna Shopping themed
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  fleaMarket: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=80",
  sim: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=80",
  mall: "https://images.unsplash.com/photo-1567449303078-57ad995bd17c?auto=format&fit=crop&w=1200&q=80",
  sale: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&q=80",
  phone: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// TYPES
// ==========================================
type CategoryId = "secondhand" | "sales" | "simcards" | "markets";

type Category = {
  id: CategoryId;
  name: string;
  nameDe: string;
  tagline: string;
  icon: any;
  gradient: string;
  color: string;
  stat: string;
  statLabel: string;
};

// ==========================================
// CATEGORIES
// ==========================================
const CATEGORIES: Category[] = [
  {
    id: "secondhand",
    name: "خرید دست‌دوم",
    nameDe: "Secondhand & Gebraucht",
    tagline: "کیفیت بالا با یک‌سوم قیمت نو",
    icon: Recycle,
    gradient: "from-emerald-600 to-teal-700",
    color: "text-emerald-700",
    stat: "۵۰-۷۰٪",
    statLabel: "ارزان‌تر از نو",
  },
  {
    id: "sales",
    name: "حراج‌های فصلی",
    nameDe: "Ausverkauf & Aktionen",
    tagline: "تقویم دقیق تخفیف‌های بزرگ اتریش",
    icon: Percent,
    gradient: "from-rose-600 to-red-700",
    color: "text-rose-700",
    stat: "۷۰٪",
    statLabel: "حداکثر تخفیف",
  },
  {
    id: "simcards",
    name: "سیم‌کارت و اینترنت",
    nameDe: "Mobilfunk & Internet",
    tagline: "مقایسه دقیق سه اپراتور اصلی اتریش",
    icon: Signal,
    gradient: "from-sky-600 to-blue-700",
    color: "text-sky-700",
    stat: "€۱۰",
    statLabel: "حداقل ماهانه",
  },
  {
    id: "markets",
    name: "بازارهای محلی",
    nameDe: "Märkte & Flohmärkte",
    tagline: "گنجینه‌های پنهان در بازارهای وین",
    icon: Store,
    gradient: "from-amber-500 to-orange-600",
    color: "text-amber-700",
    stat: "۲۵+",
    statLabel: "بازار در وین",
  },
];

// ==========================================
// MARKETPLACES DATA
// ==========================================
type Marketplace = {
  name: string;
  nameDe: string;
  type: string;
  category: string;
  description: string;
  bestFor: string;
  rating: number;
  tips: string;
  link: string;
  icon: any;
  gradient: string;
};

const MARKETPLACES: Marketplace[] = [
  {
    name: "ویل‌هابن",
    nameDe: "Willhaben.at",
    type: "بزرگ‌ترین بازار آنلاین",
    category: "دست‌دوم",
    description:
      "بزرگ‌ترین پلتفرم خرید و فروش دست‌دوم اتریش با بیش از ۱۰ میلیون آگهی فعال. از مبلمان و لوازم خانه تا خودرو، موبایل و لباس. فروشندگان معمولاً آلمانی صحبت می‌کنند اما چت آنلاین رایج است.",
    bestFor: "لوازم خانه، مبلمان، خودرو، موبایل",
    rating: 5,
    tips: "همیشه از فروشنده بخواهید عکس‌های واقعی بفرستد. برای اقلام گران، پرداخت حضوری امن‌تر است.",
    link: "https://www.willhaben.at",
    icon: ShoppingBag,
    gradient: "from-sky-600 to-blue-700",
  },
  {
    name: "شوک",
    nameDe: "Shpock",
    type: "اپلیکیشن موبایل",
    category: "دست‌دوم",
    description:
      "اپلیکیشن محبوب برای خرید و فروش محلی. بسیار شبیه eBay Kleinanzeigen آلمان. بیشتر برای اقلام کوچک، لباس و لوازم دیجیتال استفاده می‌شود.",
    bestFor: "لوازم دیجیتال، لباس، کتاب",
    rating: 4,
    tips: "برای اقلام زیر €۵۰ ایده‌آل است. پرداخت از طریق اپلیکیشن امن‌تر است.",
    link: "https://www.shpock.com",
    icon: Smartphone,
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    name: "فیسبوک مارکت‌پلیس",
    nameDe: "Facebook Marketplace",
    type: "شبکه اجتماعی",
    category: "دست‌دوم",
    description:
      "بخش خرید و فروش فیسبوک، محبوب در بین گروه‌های ایرانی و فارسی‌زبان وین. گروه‌های اختصاصی مثل «خرید و فروش ایرانیان وین» نیز وجود دارد که خرید و فروش به فارسی را ساده می‌کند.",
    bestFor: "لوازم ایرانی، مبلمان، ماشین",
    rating: 4,
    tips: "گروه‌های فارسی‌زبان وین بهترین محل برای خرید اقلام خاص ایرانی و یافتن معامله‌های محلی است.",
    link: "https://www.facebook.com/marketplace",
    icon: Facebook,
    gradient: "from-indigo-600 to-blue-700",
  },
  {
    name: "وی‌کید",
    nameDe: "Vinted",
    type: "پلتفرم تخصصی",
    category: "دست‌دوم",
    description:
      "پلتفرم تخصصی لباس، کیف و کفش دست‌دوم. اگر به دنبال برندهای اروپایی با قیمت مقرون‌به‌صرفه هستید، Vinted بهترین گزینه است. ارسال پستی و پرداخت از طریق پلتفرم انجام می‌شود.",
    bestFor: "لباس، کیف، کفش، اکسسوری",
    rating: 5,
    tips: "کیفیت محصولات بر اساس رتبه‌بندی (Neu, Sehr gut, Gut) مشخص می‌شود — قبل از خرید عکس‌ها را دقیق بررسی کنید.",
    link: "https://www.vinted.at",
    icon: Shirt,
    gradient: "from-teal-600 to-emerald-700",
  },
  {
    name: "ای‌بای اتریش",
    nameDe: "eBay.at",
    type: "پلتفرم بین‌المللی",
    category: "دست‌دوم",
    description:
      "شعبه اتریشی eBay برای خرید و فروش اقلام نو و دست‌دوم. ارسال به تمام اتریش و اتحادیه اروپا. مناسب برای کالاهای کمیاب و الکترونیک.",
    bestFor: "الکترونیک، کتاب، کلکسیون",
    rating: 4,
    tips: "همیشه به رتبه‌بندی فروشنده (Feedback) دقت کنید. برای اقلام بالای €۱۰۰، بیمه ارسال بگیرید.",
    link: "https://www.ebay.at",
    icon: Package,
    gradient: "from-violet-600 to-purple-700",
  },
];

// ==========================================
// SALES CALENDAR
// ==========================================
type SaleEvent = {
  month: string;
  monthNum: number;
  event: string;
  eventDe: string;
  description: string;
  discount: string;
  where: string;
  icon: any;
  gradient: string;
};

const SALES_CALENDAR: SaleEvent[] = [
  {
    month: "ژانویه",
    monthNum: 1,
    event: "حراج بزرگ زمستانی",
    eventDe: "Winterschlussverkauf",
    description:
      "بزرگ‌ترین حراج سال اتریش. تمام فروشگاه‌های بزرگ لباس، کفش، لوازم خانه و الکترونیک تا ۷۰٪ تخفیف می‌دهند. معمولاً از ۷ ژانویه شروع و تا اوایل فوریه ادامه دارد.",
    discount: "تا ۷۰٪",
    where: "تمام فروشگاه‌های بزرگ — Mariahilfer Straße، Kärntner Straße",
    icon: Tag,
    gradient: "from-sky-600 to-blue-700",
  },
  {
    month: "فوریه",
    monthNum: 2,
    event: "ادامه حراج زمستانی",
    eventDe: "Fortsetzung WSV",
    description:
      "ادامه حراج‌های ژانویه با تخفیف‌های عمیق‌تر. بعضی فروشگاه‌ها تا ۸۰٪ تخفیف می‌دهند چون می‌خواهند موجودی را برای فصل بهار خالی کنند.",
    discount: "تا ۸۰٪",
    where: "Mall of Vienna، Donau Zentrum، Shopping City Süd",
    icon: ShoppingBag,
    gradient: "from-indigo-600 to-blue-700",
  },
  {
    month: "آپریل",
    monthNum: 4,
    event: "عید پاک",
    eventDe: "Ostern",
    description:
      "تخفیف‌های عید پاک روی شکلات، هدیه، اسباب‌بازی و لوازم خانه. فروشگاه‌های آنلاین Amazon، Zalando و Otto تخفیف‌های ویژه می‌دهند.",
    discount: "تا ۳۰٪",
    where: "فروشگاه‌های آنلاین + سوپرمارکت‌ها",
    icon: Gift,
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    month: "ژوئن",
    monthNum: 6,
    event: "شروع حراج تابستانی",
    eventDe: "Sommerschlussverkauf Start",
    description:
      "دومین حراج بزرگ سال از ابتدای جولای. لباس‌های تابستانی، صندل، لوازم سفر و باغبانی تا ۷۰٪ تخفیف. بهترین زمان برای خرید لباس تابستانی برای سال بعد.",
    discount: "تا ۷۰٪",
    where: "همه فروشگاه‌ها + مراکز خرید",
    icon: Tag,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    month: "جولای",
    monthNum: 7,
    event: "اوج حراج تابستانی",
    eventDe: "Sommerschlussverkauf",
    description:
      "اوج تخفیف‌های تابستانی. Mariahilfer Straße و مراکز خرید بزرگ پر از تخفیف‌های جذاب است. برخی برندها لباس‌های تابستانی را تا ۸۰٪ تخفیف می‌دهند.",
    discount: "تا ۸۰٪",
    where: "Mariahilfer Straße، تمام مراکز خرید",
    icon: Percent,
    gradient: "from-rose-600 to-red-700",
  },
  {
    month: "آگوست",
    monthNum: 8,
    event: "حراج پایان تابستان",
    eventDe: "Ende Sommerschlussverkauf",
    description:
      "آخرین فرصت برای خرید لباس تابستانی و لوازم سفر. برخی فروشگاه‌ها موجودی را با تخفیف‌های واقعاً استثنایی می‌فروشند.",
    discount: "تا ۸۵٪",
    where: "همه فروشگاه‌ها",
    icon: ShoppingCart,
    gradient: "from-orange-500 to-red-600",
  },
  {
    month: "نوامبر",
    monthNum: 11,
    event: "بلک فرایدی و سایبر ماندی",
    eventDe: "Black Friday & Cyber Monday",
    description:
      "بزرگ‌ترین رویداد خرید آنلاین سال. تخفیف‌های عظیم روی الکترونیک، لوازم خانه، لباس و خدمات. Amazon.de, Media Markt, Otto, Zalando از پیشتازان هستند. برای خرید تلویزیون، لپ‌تاپ یا موبایل، بهترین زمان سال.",
    discount: "تا ۷۰٪",
    where: "فروشگاه‌های آنلاین + فروشگاه‌های فیزیکی",
    icon: Zap,
    gradient: "from-stone-700 to-stone-900",
  },
  {
    month: "دسامبر",
    monthNum: 12,
    event: "بازارهای کریسمس",
    eventDe: "Christkindlmärkte",
    description:
      "بازارهای کریسمس در وین (Rathausplatz، Schönbrunn، Spittelberg) نه فقط برای خرید هدیه، بلکه یک تجربه فرهنگی. همچنین فروشگاه‌ها تخفیف‌های پیش از کریسمس دارند.",
    discount: "متغیر",
    where: "بازارهای کریسمس + فروشگاه‌های مرکزی",
    icon: Coffee,
    gradient: "from-red-600 to-rose-700",
  },
];

// ==========================================
// SIM CARRIERS DATA
// ==========================================
type Carrier = {
  name: string;
  nameDe: string;
  parent?: string;
  type: string;
  plans: { name: string; data: string; price: string; features: string }[];
  pros: string[];
  cons: string[];
  icon: any;
  gradient: string;
  color: string;
  coverage: number;
  recommended?: boolean;
  bestFor: string;
};

const CARRIERS: Carrier[] = [
  {
    name: "A1",
    nameDe: "A1 Telekom Austria",
    type: "بزرگ‌ترین اپراتور اتریش",
    plans: [
      { name: "A1 Go! S", data: "۳۰ GB", price: "€۱۹.۹۰/ماه", features: "تماس نامحدود، 5G" },
      { name: "A1 Go! M", data: "۶۰ GB", price: "€۲۹.۹۰/ماه", features: "تماس + SMS نامحدود، 5G" },
      { name: "A1 Go! L", data: "نامحدود", price: "€۴۹.۹۰/ماه", features: "دیتا نامحدود، 5G، رومینگ EU" },
    ],
    pros: ["بهترین پوشش شبکه در اتریش", "5G پرقدرت", "پشتیبانی مشتری قوی"],
    cons: ["گران‌ترین اپراتور", "قراردادهای ۲۴ ماهه رایج"],
    icon: Signal,
    gradient: "from-[#c8102e] to-[#970d22]",
    color: "text-[#c8102e]",
    coverage: 5,
    recommended: true,
    bestFor: "افرادی که پوشش شبکه برایشان اولویت است (سفر به روستا، کوه)",
  },
  {
    name: "Magenta",
    nameDe: "Magenta Telekom",
    parent: "Deutsche Telekom",
    type: "اپراتور دوم",
    plans: [
      { name: "Magenta S", data: "۲۰ GB", price: "€۱۵/ماه", features: "تماس + SMS نامحدود" },
      { name: "Magenta M", data: "۵۰ GB", price: "€۲۵/ماه", features: "۵G، رومینگ EU" },
      { name: "Magenta L", data: "نامحدود", price: "€۴۰/ماه", features: "دیتا نامحدود، 5G، Apple TV+" },
    ],
    pros: ["کیفیت خوب ۵G", "قیمت متوسط", "بسته‌های ترکیبی TV + اینترنت"],
    cons: ["پوشش در برخی مناطق روستایی کمتر از A1", "پشتیبانی مشتری متوسط"],
    icon: Signal,
    gradient: "from-pink-600 to-fuchsia-700",
    color: "text-pink-700",
    coverage: 4,
    bestFor: "افرادی که بین قیمت و کیفیت تعادل می‌خواهند",
  },
  {
    name: "Drei",
    nameDe: "Drei (Hutchison)",
    parent: "CK Hutchison",
    type: "اپراتور اقتصادی",
    plans: [
      { name: "Drei Like S", data: "۲۵ GB", price: "€۱۴/ماه", features: "تماس + SMS نامحدود" },
      { name: "Drei Like M", data: "۶۰ GB", price: "€۲۲/ماه", features: "5G، رومینگ EU" },
      { name: "Drei Like L", data: "نامحدود", price: "€۳۵/ماه", features: "دیتا نامحدود، 5G، رومینگ EU+US" },
    ],
    pros: ["ارزان‌ترین اپراتور اصلی", "بسته‌های دیتا مناسب", "قیمت‌های شفاف بدون هزینه پنهان"],
    cons: ["پوشش در مناطق روستایی ضعیف‌تر", "کیفیت شبکه در ساعات شلوغی"],
    icon: Signal,
    gradient: "from-emerald-600 to-teal-700",
    color: "text-emerald-700",
    coverage: 3,
    bestFor: "دانشجویان، بودجه محدود، کاربران شهری",
  },
  {
    name: "HoT",
    nameDe: "HoT (Hofer Telekom)",
    parent: "Hofer (Aldi)",
    type: "اپراتور مجازی ارزان",
    plans: [
      { name: "HoT smart S", data: "۱۵ GB", price: "€۹.۹۰/ماه", features: "تماس نامحدود" },
      { name: "HoT smart M", data: "۴۰ GB", price: "€۱۴.۹۰/ماه", features: "تماس + SMS نامحدود" },
      { name: "HoT smart L", data: "۱۰۰ GB", price: "€۱۹.۹۰/ماه", features: "دیتا فراوان، ۵G" },
    ],
    pros: ["ارزان‌ترین اپراتور اتریش", "بدون قرارداد — پیش‌پرداخت", "بر پایه شبکه Magenta"],
    cons: ["پشتیبانی تلفنی محدود", "بدون دفتر فروش فیزیکی"],
    icon: Wallet,
    gradient: "from-amber-500 to-orange-600",
    color: "text-amber-700",
    coverage: 3,
    bestFor: "دانشجویان، مسافران، بودجه بسیار محدود",
  },
  {
    name: "Yesss",
    nameDe: "Yesss (A1 Group)",
    parent: "A1 Group",
    type: "اپراتور مجازی ارزان",
    plans: [
      { name: "Yesss S", data: "۲۰ GB", price: "€۱۲/ماه", features: "تماس + SMS نامحدود" },
      { name: "Yesss M", data: "۵۰ GB", price: "€۱۷/ماه", features: "۵G، رومینگ EU" },
      { name: "Yesss L", data: "نامحدود", price: "€۲۵/ماه", features: "دیتا نامحدود، ۵G" },
    ],
    pros: ["کیفیت شبکه A1 با قیمت پایین", "پوشش خوب", "بدون قرارداد بلندمدت"],
    cons: ["پشتیبانی مشتری محدود", "سرویس‌های جانبی کم"],
    icon: Wallet,
    gradient: "from-violet-600 to-purple-700",
    color: "text-violet-700",
    coverage: 5,
    bestFor: "کسانی که کیفیت A1 می‌خواهند اما قیمت کمتر",
  },
  {
    name: "spusu",
    nameDe: "spusu",
    type: "اپراتور اقتصادی",
    plans: [
      { name: "spusu S", data: "۱۵ GB", price: "€۹.۹۰/ماه", features: "تماس + SMS نامحدود" },
      { name: "spusu M", data: "۴۰ GB", price: "€۱۴.۹۰/ماه", features: "۵G، رومینگ EU" },
      { name: "spusu L", data: "نامحدود", price: "€۲۲.۹۰/ماه", features: "دیتا نامحدود، ۵G" },
    ],
    pros: ["قیمت‌های رقابتی", "امکان پورت سریع", "پشتیبانی فارسی‌پسند (چند زبانه)"],
    cons: ["پوشش محدودتر", "برند نوپا"],
    icon: Wallet,
    gradient: "from-teal-600 to-cyan-700",
    color: "text-teal-700",
    coverage: 4,
    bestFor: "کاربران اقتصادی که به کیفیت متوسط نیاز دارند",
  },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "۵۰-۷۰٪", label: "تخفیف دست‌دوم", icon: Recycle },
  { value: "۷۰-۸۵٪", label: "حراج فصلی", icon: Percent },
  { value: "۶", label: "اپراتور اصلی", icon: Signal },
  { value: "۲۵+", label: "بازار محلی وین", icon: Store },
];

// ==========================================
// SHOPPING TIPS
// ==========================================
const SHOPPING_TIPS = [
  {
    icon: Tag,
    title: "قیمت‌ها را مقایسه کنید",
    desc: "قبل از خرید، قیمت را در geizhals.at (مقایسه‌گر اتریشی) بررسی کنید تا ارزان‌ترین فروشنده را پیدا کنید.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: CreditCard,
    title: "پرداخت با کارت بانکی",
    desc: "در اتریش، پرداخت با کارت بانکی رایج است. کارت‌های Bancontact، Visa، Mastercard همه‌جا پذیرفته می‌شوند.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Recycle,
    title: "بازگشت کالا (Rückgaberecht)",
    desc: "خرید آنلاین ۱۴ روز حق بازگشت دارد. اما خرید حضوری معمولاً حق بازگشت ندارد — قبل از خرید بپرسید.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Percent,
    title: "تخفیف دانشجویی",
    desc: "بسیاری از فروشگاه‌ها (H&M، Zara، Cineplexx، موزه‌ها) با کارت دانشجویی تخفیف ویژه می‌دهند.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: Clock,
    title: "ساعات طلایی حراج",
    desc: "آخرین روزهای حراج فصلی، تخفیف‌ها به اوج می‌رسد. صبح‌های شنبه بهترین زمان برای پیدا کردن سایزهای موجود.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: ThumbsUp,
    title: "چانه بزنید در بازارها",
    desc: "در بازارهای محلی و فلامارکت‌ها چانه زدن رایج است. در فروشگاه‌های زنجیره‌ای خیر — قیمت‌ها ثابت است.",
    color: "from-teal-500 to-cyan-600",
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا خرید دست‌دوم در اتریش امن است؟",
    a: "بله، خرید دست‌دوم در اتریش بسیار رایج و امن است. پلتفرم‌های معتبر مثل Willhaben و Vinted سیستم رتبه‌بندی دارند. توصیه می‌شود پرداخت حضوری در محل‌های عمومی (مثل ایستگاه مترو یا کافه) انجام دهید. برای اقلام گران‌قیمت، پرداخت از طریق پلتفرم یا PayPal با خرید محافظت‌شده انجام شود.",
  },
  {
    q: "کدام اپراتور موبایل برای من مناسب‌تر است؟",
    a: "بستگی به نیاز شما دارد: اگر به پوشش بالا نیاز دارید (سفر به روستا یا کوه) A1 بهترین است. اگر قیمت مهم‌تر است HoT یا spusu ارزان‌ترین گزینه هستند. اگر تعادل بین قیمت و کیفیت می‌خواهید Yesss یا Drei عالی هستند. برای دانشجویان معمولاً HoT یا spusu کافی است.",
  },
  {
    q: "آیا برای سیم‌کارت اتریشی به Anmeldung نیاز است؟",
    a: "برای سیم‌کارت پیش‌پرداخت (Prepaid) در اتریش، نیاز به ثبت‌نام با گذرنامه یا مدرک هویتی دارید (EU-Registrierungspflicht). برای قراردادهای ماهانه (Vertrag) نیازمند اقامت رسمی و حساب بانکی اتریشی هستید. برای دانشجویان، پاسپورت + ثبت‌نام دانشگاه معمولاً کافی است.",
  },
  {
    q: "آیا می‌توانم شماره موبایل خود را از ایران به اتریش منتقل کنم؟",
    a: "خیر، انتقال شماره از خارج از اتحادیه اروپا به اتریش امکان‌پذیر نیست. اما می‌توانید پس از دریافت سیم‌کارت اتریشی، شماره ایران خود را در واتس‌اپ یا تلگرام نگه دارید. در اتریش، پورت شماره بین اپراتورها (MNP) رایگان و آسان است.",
  },
  {
    q: "بهترین زمان خرید لپ‌تاپ یا موبایل در اتریش چه موقع است؟",
    a: "بهترین زمان برای خرید الکترونیک: ۱) بلک فرایدی (نوامبر) با تخفیف‌های تا ۷۰٪ ۲) حراج ژانویه برای مدل‌های قدیمی ۳) زمان معرفی محصولات جدید (سپتامبر برای اپل، فوریه-مارس برای سامسونگ) که مدل‌های قبلی تخفیف می‌خورند. فروشگاه‌های Media Markt، Saturn و Amazon.at بهترین گزینه‌ها هستند.",
  },
  {
    q: "آیا در اتریش می‌توانم از تخفیف‌های دانشجویی استفاده کنم؟",
    a: "بله، کارت دانشجویی اتریشی (Studentenausweis) تخفیف‌های زیادی دارد: ۵۰٪ تخفیف در موزه‌ها، تخفیف در H&M و Zara (با ارائه کارت)، تخفیف در سینما (Cineplexx)، کتاب‌فروشی‌ها و رستوران‌های دانشجویی (Mensa). برای دریافت کارت، به دفتر ÖH دانشگاه خود مراجعه کنید.",
  },
  {
    q: "مالیات بر ارزش افزوده (MwSt) در اتریش چقدر است؟",
    a: "نرخ مالیات بر ارزش افزوده در اتریش ۲۰٪ برای اکثر کالاها است. برای غذا، کتاب و دارو نرخ ۱۰٪، و برای برخی خدمات خاص ۱۳٪ است. قیمت‌های نمایش‌داده‌شده در فروشگاه‌ها معمولاً شامل MwSt هستند. برای اطلاع از قیمت خالص (Netto)، مبلغ نهایی را بر ۱.۲۰ تقسیم کنید.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const ShoppingGuide: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("secondhand");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCarrier, setActiveCarrier] = useState<string>("A1");
  const [monthFilter, setMonthFilter] = useState<number | null>(null);

  const activeCategoryData = useMemo(
    () => CATEGORIES.find((c) => c.id === activeCategory)!,
    [activeCategory]
  );

  const filteredMarketplaces = useMemo(() => {
    return MARKETPLACES.filter((m) => m.category === activeCategoryData.name);
  }, [activeCategoryData]);

  const activeCarrierData = useMemo(
    () => CARRIERS.find((c) => c.name === activeCarrier)!,
    [activeCarrier]
  );

  const filteredSales = useMemo(() => {
    if (!monthFilter) return SALES_CALENDAR;
    return SALES_CALENDAR.filter((s) => s.monthNum === monthFilter);
  }, [monthFilter]);

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای کامل خرید و سیم‌کارت در اتریش ۲۰۲۶",
      description:
        "راهنمای جامع خرید دست‌دوم، حراج‌های فصلی، اپراتورهای موبایل و بازارهای محلی اتریش — برای ایرانیان و فارسی‌زبانان مقیم اتریش.",
      author: { "@type": "Organization", name: "اتریش‌نشین" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
      },
      inLanguage: "fa-IR",
      datePublished: "2025-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "پلتفرم‌های خرید و فروش دست‌دوم اتریش",
      itemListElement: MARKETPLACES.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${m.name} (${m.nameDe})`,
        description: m.description,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "اپراتورهای موبایل اتریش",
      itemListElement: CARRIERS.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.nameDe,
        description: c.type,
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
    <GuideContainer
      title="راهنمای خرید و سیم‌کارت در اتریش"
      description="راهنمای جامع خرید دست‌دوم، حراج‌های فصلی، اپراتورهای موبایل و بازارهای محلی اتریش"
    >
      <SEO
        title="راهنمای خرید و سیم‌کارت در اتریش ۲۰۲۶ | حراج‌ها و اپراتورها"
        description="راهنمای کامل خرید در اتریش: بازارهای دست‌دوم (Willhaben, Shpock, Vinted)، حراج‌های فصلی (Black Friday, Winterschlussverkauf)، اپراتورهای موبایل (A1, Magenta, Drei, HoT) و بازارهای محلی وین."
        keywords="خرید اتریش, سیم‌کارت اتریش, Willhaben, Vinted Austria, حراج اتریش, اپراتور موبایل اتریش, A1, Magenta, Drei, HoT, بازار دست دوم وین, خرید ارزان وین"
        schemaData={seoSchema}
      />

      <div className="space-y-10 font-sans" dir="rtl">

        {/* ========================================== */}
        {/* HERO */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl text-white"
          style={{
            background:
              "radial-gradient(80% 150% at 90% 0, #7c2d12 0, #431407 48%, #1c0a02 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <img
              src={IMAGES.hero}
              alt="خرید در اتریش"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#1c0a02]/90 via-[#431407]/75 to-[#7c2d12]/55" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            🛍️
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              راهنمای خرید هوشمندانه در اتریش ۲۰۲۶
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              با نصف قیمت خرید کنید — راهنمای کامل خرید و سیم‌کارت در اتریش
            </h1>

            <p className="text-sm md:text-base text-amber-100 leading-relaxed max-w-3xl mb-6">
              از <strong className="text-amber-300">حراج‌های فصلی تا ۸۵٪ تخفیف</strong> تا
              <strong className="text-amber-300"> بازارهای دست‌دوم</strong> و
              <strong className="text-amber-300"> مقایسه دقیق اپراتورهای موبایل</strong> —
              در این راهنمای جامع، تمام رازهای خرید هوشمندانه در اتریش را یاد می‌گیرید.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>۷ پلتفرم دست‌دوم</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>۶ اپراتور موبایل</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>تقویم دقیق حراج‌ها</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="#categories"
                className="inline-flex items-center gap-2 bg-white text-[#7c2d12] font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                کاوش راهنما
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white font-black text-xs px-5 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <Send className="w-4 h-4" />
                مشاوره رایگان خرید
              </a>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* QUICK STATS */}
        {/* ========================================== */}
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
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-amber-700" />
                </div>
                <div className="text-lg font-black text-amber-700">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* WHY SHOP SMART */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-amber-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Quote className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-amber-700 mb-1">
                چرا خرید هوشمندانه در اتریش مهم است؟
              </div>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">
                <strong className="text-amber-700">یک خانوار ۴ نفره در اتریش می‌تواند با خرید هوشمندانه سالانه ۳,۰۰۰ تا ۵,۰۰۰ یورو صرفه‌جویی کند.</strong> از
                خرید لباس در حراج‌های فصلی (تا ۸۵٪ تخفیف) تا خرید لوازم خانه دست‌دوم
                (۵۰-۷۰٪ ارزان‌تر) و انتخاب اپراتور ارزان موبایل (تا €۲۰ صرفه‌جویی ماهانه).
                در این راهنما، تمام روش‌های قانونی و امن برای کاهش هزینه‌های زندگی در اتریش را یاد می‌گیرید.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* CATEGORY SELECTOR */}
        {/* ========================================== */}
        <div id="categories" className="scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Grid3x3 className="w-5 h-5 text-amber-700" />
              ۴ دسته اصلی خرید هوشمندانه در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              روی هر دسته کلیک کنید تا جزئیات کامل را ببینید
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative overflow-hidden rounded-2xl border-2 p-4 text-right transition-all ${
                    isActive
                      ? "border-amber-600 shadow-lg shadow-amber-100"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.gradient} opacity-[0.08] rounded-full -translate-y-1/2 translate-x-1/2`} />
                  <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shadow-md mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="relative text-xs font-black text-stone-900 leading-tight">
                    {cat.name}
                  </div>
                  <div className="relative text-[9px] text-stone-400 font-bold font-mono mt-0.5" dir="ltr">
                    {cat.nameDe}
                  </div>
                  <div className="relative flex items-center gap-1.5 mt-2 pt-2 border-t border-stone-100">
                    <span className={`text-base font-black font-mono ${isActive ? cat.color : "text-stone-700"}`} dir="ltr">
                      {cat.stat}
                    </span>
                    <span className="text-[9px] text-stone-500 font-bold">{cat.statLabel}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* ========================================== */}
          {/* CATEGORY CONTENT */}
          {/* ========================================== */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 md:p-8"
            >
              {/* Category Header */}
              <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeCategoryData.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    <activeCategoryData.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-900">
                      {activeCategoryData.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-bold mt-1">
                      {activeCategoryData.tagline}
                    </p>
                  </div>
                </div>
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-full bg-stone-100 ${activeCategoryData.color}`}>
                  {activeCategoryData.nameDe}
                </span>
              </div>

              {/* Content per category */}

              {/* Secondhand marketplaces */}
              {activeCategory === "secondhand" && (
                <div className="space-y-3">
                  {filteredMarketplaces.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <motion.a
                        key={m.name}
                        href={m.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -3 }}
                        className="group block bg-stone-50 hover:bg-white border border-stone-200 hover:border-amber-300 rounded-2xl p-4 transition-all hover:shadow-md"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="text-sm font-black text-stone-900">{m.name}</h4>
                              <span className="text-[9px] font-bold text-stone-400 font-mono" dir="ltr">
                                {m.nameDe}
                              </span>
                              <div className="flex items-center gap-0.5 ml-auto">
                                {[...Array(5)].map((_, idx) => (
                                  <Star
                                    key={idx}
                                    className={`w-3 h-3 ${
                                      idx < m.rating ? "text-amber-500 fill-current" : "text-stone-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-[10px] text-stone-500 font-bold mb-2 flex items-center gap-2">
                              <span className="bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                                {m.type}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-600 font-bold leading-relaxed mb-2">
                              {m.description}
                            </p>
                            <div className="flex items-start gap-2 bg-sky-50 border border-sky-100 rounded-xl p-2.5">
                              <Zap className="w-3 h-3 text-sky-600 flex-shrink-0 mt-0.5" />
                              <p className="text-[10px] text-sky-800 font-bold leading-snug">
                                {m.tips}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 mt-2 text-[10px] font-black text-stone-500">
                              <span className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                مناسب برای: {m.bestFor}
                              </span>
                            </div>
                          </div>
                          <ArrowUpRight className="w-5 h-5 text-stone-400 group-hover:text-amber-700 flex-shrink-0" />
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              )}

              {/* Sales Calendar */}
              {activeCategory === "sales" && (
                <div>
                  {/* Month filter */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <Filter className="w-4 h-4 text-stone-500" />
                    <button
                      onClick={() => setMonthFilter(null)}
                      className={`text-[10px] font-black px-3 py-1.5 rounded-xl transition-all ${
                        monthFilter === null
                          ? "bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-md"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                      }`}
                    >
                      همه ماه‌ها
                    </button>
                    {SALES_CALENDAR.map((s) => (
                      <button
                        key={s.monthNum}
                        onClick={() => setMonthFilter(s.monthNum)}
                        className={`text-[10px] font-black px-3 py-1.5 rounded-xl transition-all ${
                          monthFilter === s.monthNum
                            ? "bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                        }`}
                      >
                        {s.month}
                      </button>
                    ))}
                  </div>

                  {/* Sales grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredSales.map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <motion.div
                          key={s.monthNum}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          whileHover={{ y: -3 }}
                          className="bg-white border border-stone-200 hover:border-amber-300 rounded-2xl p-4 hover:shadow-md transition-all group"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <h4 className="text-xs font-black text-stone-900">{s.event}</h4>
                                <span className="text-[9px] font-bold text-stone-400 font-mono" dir="ltr">
                                  {s.eventDe}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {s.month}
                                </span>
                                <span className="text-[10px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <Percent className="w-3 h-3" />
                                  {s.discount}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-[10px] text-stone-600 font-bold leading-relaxed mb-2">
                            {s.description}
                          </p>
                          <div className="flex items-start gap-2 bg-stone-50 border border-stone-100 rounded-lg p-2">
                            <MapPin className="w-3 h-3 text-stone-500 flex-shrink-0 mt-0.5" />
                            <p className="text-[9px] text-stone-600 font-bold leading-snug">
                              {s.where}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SIM Carriers */}
              {activeCategory === "simcards" && (
                <div>
                  {/* Carrier tabs */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-5">
                    {CARRIERS.map((c) => {
                      const Icon = c.icon;
                      const isActive = activeCarrier === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => setActiveCarrier(c.name)}
                          className={`relative overflow-hidden rounded-2xl border-2 p-3 text-center transition-all ${
                            isActive
                              ? "border-amber-600 shadow-lg shadow-amber-100"
                              : "border-stone-200 hover:border-stone-300 bg-white"
                          }`}
                        >
                          {c.recommended && (
                            <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[8px] font-black px-2 py-0.5 rounded-br-xl flex items-center gap-0.5 z-10">
                              <Star className="w-2.5 h-2.5 fill-current" />
                            </div>
                          )}
                          <div className={`w-9 h-9 mx-auto rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white shadow-md mb-2`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-[11px] font-black text-stone-900">{c.name}</div>
                          <div className="flex items-center justify-center gap-0.5 mt-1">
                            {[...Array(5)].map((_, idx) => (
                              <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  idx < c.coverage ? "bg-emerald-500" : "bg-stone-200"
                                }`}
                              />
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Carrier detail */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCarrier}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="grid md:grid-cols-2 gap-4"
                    >
                      {/* Left panel */}
                      <div>
                        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${activeCarrierData.gradient} p-5 text-white mb-4`}>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                          <div className="relative">
                            <div className="text-[10px] font-black text-white/80 mb-1">
                              {activeCarrierData.type}
                            </div>
                            <h3 className="text-2xl font-black mb-1">
                              {activeCarrierData.name}
                            </h3>
                            <div className="text-[11px] font-bold text-white/70 font-mono mb-3" dir="ltr">
                              {activeCarrierData.nameDe}
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-[9px] font-black bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                پوشش شبکه:
                              </span>
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, idx) => (
                                  <Star
                                    key={idx}
                                    className={`w-3 h-3 ${
                                      idx < activeCarrierData.coverage ? "text-amber-300 fill-current" : "text-white/30"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            {activeCarrierData.parent && (
                              <div className="text-[10px] font-bold text-white/70">
                                زیرمجموعه: {activeCarrierData.parent}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Pros & Cons */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3">
                            <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-700 mb-2">
                              <CheckCircle className="w-3.5 h-3.5" />
                              مزایا
                            </div>
                            <ul className="space-y-1">
                              {activeCarrierData.pros.map((p, i) => (
                                <li key={i} className="text-[10px] text-emerald-800 font-bold leading-snug">
                                  • {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3">
                            <div className="flex items-center gap-1.5 text-[10px] font-black text-rose-700 mb-2">
                              <AlertCircle className="w-3.5 h-3.5" />
                              معایب
                            </div>
                            <ul className="space-y-1">
                              {activeCarrierData.cons.map((p, i) => (
                                <li key={i} className="text-[10px] text-rose-800 font-bold leading-snug">
                                  • {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3 flex items-start gap-2">
                          <Users className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[10px] font-black text-sky-700 mb-0.5">
                              مناسب برای:
                            </div>
                            <div className="text-[10px] text-sky-800 font-bold leading-snug">
                              {activeCarrierData.bestFor}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right panel - Plans */}
                      <div>
                        <div className="text-[11px] font-black text-stone-700 mb-3 flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-amber-700" />
                          پلن‌های اصلی {activeCarrierData.name}
                        </div>
                        <div className="space-y-2">
                          {activeCarrierData.plans.map((p, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="bg-stone-50 border border-stone-200 rounded-2xl p-3 hover:border-amber-300 transition-all"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-xs font-black text-stone-900">{p.name}</div>
                                <div className="text-base font-black font-mono text-amber-700" dir="ltr">
                                  {p.price}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-black text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <Wifi className="w-3 h-3" />
                                  {p.data}
                                </span>
                                <span className="text-[9px] text-stone-500 font-bold">
                                  {p.features}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2">
                          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
                            <strong>نکته:</strong> برای قراردادهای بلندمدت (۲۴ ماهه)، قیمت‌ها
                            معمولاً ۲۰-۳۰٪ کمتر است. اما برای دانشجویان، سیم‌کارت‌های
                            پیش‌پرداخت (Prepaid) بدون قرارداد ایده‌آل است.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* Markets */}
              {activeCategory === "markets" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      name: "ناش‌مارکت",
                      nameDe: "Naschmarkt",
                      type: "بازار تخصصی",
                      desc: "بزرگ‌ترین بازار وین برای میوه، سبزیجات، ادویه و اقلام خاص. شنبه‌ها فلامارکت آنتیک.",
                      day: "دوشنبه تا شنبه",
                      address: "U4 Kettenbrückengasse",
                      icon: Store,
                      gradient: "from-amber-500 to-orange-600",
                    },
                    {
                      name: "برونن‌مارکت",
                      nameDe: "Brunnenmarkt",
                      type: "بازار شرقی",
                      desc: "بزرگ‌ترین بازار شرقی اروپا — لباس، لوازم خانه، ادویه و اقلام دست‌دوم با قیمت‌های استثنایی.",
                      day: "دوشنبه تا شنبه",
                      address: "U6 Josefstädter Straße",
                      icon: ShoppingBag,
                      gradient: "from-rose-500 to-red-600",
                    },
                    {
                      name: "فلامارکت مایدلینگ",
                      nameDe: "Flohmarkt Meidling",
                      type: "بازار دست‌دوم",
                      desc: "یکی از بهترین بازارهای دست‌دوم وین برای مبلمان، کتاب، لباس و آنتیک. شنبه‌ها و یکشنبه‌ها.",
                      day: "شنبه‌ها ۷:۰۰-۱۴:۰۰",
                      address: "U6 Niederhofstraße",
                      icon: Recycle,
                      gradient: "from-emerald-500 to-teal-600",
                    },
                    {
                      name: "Mauerbach Market",
                      nameDe: "Antikmarkt Mauerbach",
                      type: "بازار آنتیک",
                      desc: "بازار تخصصی آنتیک، آثار هنری و اقلام کلکسیونی در حومه وین. یکشنبه‌ها.",
                      day: "یکشنبه‌های اول ماه",
                      address: "اتوبوس ۴۵۰ از Hütteldorf",
                      icon: Landmark,
                      gradient: "from-violet-500 to-purple-600",
                    },
                    {
                      name: "فلامارکت ناش‌مارکت",
                      nameDe: "Flohmarkt am Naschmarkt",
                      type: "بازار آنتیک",
                      desc: "هر شنبه، ناش‌مارکت میزبان بازار آنتیک و اجناس دست‌دوم است. محبوب برای گردشگران و محلی‌ها.",
                      day: "شنبه‌ها ۶:۳۰-۱۴:۰۰",
                      address: "U4 Kettenbrückengasse",
                      icon: Award,
                      gradient: "from-sky-500 to-blue-600",
                    },
                    {
                      name: "Kutschkermarkt",
                      nameDe: "Kutschkermarkt",
                      type: "بازار ارگانیک",
                      desc: "بازار کوچک و اصیل در منطقه ۱۸ — ارگانیک، فصلی و فضای روستایی. شنبه‌ها.",
                      day: "دوشنبه تا شنبه",
                      address: "تراموا 40, 41",
                      icon: Coffee,
                      gradient: "from-teal-500 to-cyan-600",
                    },
                  ].map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ y: -3 }}
                        className="bg-white border border-stone-200 hover:border-amber-300 rounded-2xl p-4 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <h4 className="text-xs font-black text-stone-900">{m.name}</h4>
                              <span className="text-[9px] text-stone-400 font-bold font-mono" dir="ltr">
                                {m.nameDe}
                              </span>
                            </div>
                            <span className="text-[9px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                              {m.type}
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] text-stone-600 font-bold leading-relaxed mb-2">
                          {m.desc}
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-stone-500">
                            <Clock className="w-3 h-3" />
                            {m.day}
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-stone-500">
                            <MapPin className="w-3 h-3" />
                            {m.address}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* SHOPPING TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-700" />
              ۶ ترفند خرید هوشمندانه در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              نکات تجربه‌شده‌ای که فقط ساکنان محلی می‌دانند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SHOPPING_TIPS.map((tip, i) => {
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
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-stone-900 mb-1.5">
                    {tip.title}
                  </h3>
                  <p className="text-[10px] text-stone-500 font-bold leading-relaxed">
                    {tip.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* 3 IMAGE GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-700" />
              سه تجربه خرید در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از بازارهای سنتی تا خرید آنلاین مدرن
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.fleaMarket,
                title: "بازارهای دست‌دوم",
                subtitle: "گنجینه‌های پنهان",
                desc: "فلامارکت‌های وین، از شنبه‌های ناش‌مارکت تا فلامارکت مایدلینگ، پر از اقلام دست‌دوم با کیفیت هستند.",
                icon: Recycle,
                gradient: "from-emerald-600 to-teal-700",
                stat: "۵۰-۷۰٪",
              },
              {
                img: IMAGES.sale,
                title: "حراج‌های فصلی",
                subtitle: "تخفیف‌های بزرگ",
                desc: "از بلک فرایدی تا حراج پایان تابستان، تخفیف‌های اتریش تا ۸۵٪ می‌رسند — اگر زمان‌بندی کنید.",
                icon: Percent,
                gradient: "from-rose-600 to-red-700",
                stat: "تا ۸۵٪",
              },
              {
                img: IMAGES.sim,
                title: "سیم‌کارت و اینترنت",
                subtitle: "ارتباط با جهان",
                desc: "مقایسه دقیق A1، Magenta، Drei، HoT و Yesss — انتخاب اپراتور مناسب تا €۲۰ ماهانه صرفه‌جویی دارد.",
                icon: Signal,
                gradient: "from-sky-600 to-blue-700",
                stat: "€۱۰+",
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-stone-200 hover:shadow-xl transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-45 mix-blend-multiply`} />
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-stone-800" />
                    </div>
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-[9px] font-black text-white">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      {c.stat}
                    </div>
                    <div className="absolute bottom-3 right-3 left-3">
                      <div className="text-[10px] font-black text-white/90 mb-1">
                        {c.subtitle}
                      </div>
                      <div className="text-sm font-black text-white leading-tight">
                        {c.title}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-stone-600 font-bold leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-700" />
              سوالات متداول درباره خرید در اتریش
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
        </div>

        {/* ========================================== */}
        {/* CTA */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c0a02] via-[#431407] to-[#7c2d12] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-orange-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
              راهنمای شخصی خرید و اپراتور
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              در انتخاب اپراتور یا فروشگاه شک دارید؟
            </h2>

            <p className="text-sm text-amber-100 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه زیسته در اتریش می‌تواند بر اساس بودجه،
              محله و نیاز شما بهترین اپراتور، فروشگاه یا زمان حراج را پیشنهاد دهد.
              همین حالا پیام دهید.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                مشاوره در واتس‌اپ
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4" />
                پشتیبانی تلگرام
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-amber-200/70 flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                پاسخ در کمتر از ۲۴ ساعت
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                خدمات داوطلبانه
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                کاملاً محرمانه
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* DISCLAIMER */}
        {/* ========================================== */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">
              یادآوری مهم
            </h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              قیمت‌های اپراتورهای موبایل و تاریخ حراج‌ها بر اساس آخرین
              اطلاعات سال ۲۰۲۶ تهیه شده و ممکن است تغییر کنند. برای خرید
              اپراتور، همیشه پیشنهادهای لحظه‌ای را در وب‌سایت رسمی هر اپراتور
              بررسی کنید. برای خرید دست‌دوم، همیشه از فروشندگان معتبر و
              در مکان‌های عمومی خرید کنید.
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
  q,
  a,
  isOpen,
  onToggle,
  index,
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
        isOpen ? "border-amber-300 bg-amber-50/30 shadow-md" : "border-stone-200"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition"
      >
        <span className="flex items-center gap-3 flex-1">
          <span
            className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all ${
              isOpen
                ? "bg-gradient-to-br from-amber-600 to-orange-700 text-white"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            {index + 1}
          </span>
          <span className="font-black text-xs text-stone-900 leading-snug text-right">
            {q}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180 text-amber-700" : ""
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
            <div className="px-4 pb-4 pr-14 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ShoppingGuide;