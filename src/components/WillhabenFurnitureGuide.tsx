import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, CheckCircle2, ChevronDown, HelpCircle, ArrowLeft,
  Star, MessageCircle, Send, AlertTriangle, TrendingUp, Users,
  Package, Truck, Sofa, Bed, Lamp, Utensils, Bath, Home, Coffee,
  Calculator, Coins, Wallet, PiggyBank, Tag, Clock, MapPin, Car,
  Zap, Info, Bookmark, Search, Filter, Award, Target, TrendingDown,
  MessageSquare, Handshake, ShoppingBag, Building2, Heart, Eye,
  Lightbulb, Ruler, Wrench, Users2, Percent, BadgeCheck, Landmark
} from "lucide-react";
import SEO from "./SEO";

/* ============================================================
   تصاویر ویژه — Unsplash
============================================================ */
const IMG_HERO =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=80";
// اتاق نشیمن مدرن و دنج با مبلمان
const IMG_MOVING =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80";
// مبلمان مدرن و فضای خانه
const IMG_MARKET =
  "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1000&q=80";
// بازار مبلمان یا فروشگاه مبلمان دست‌دوم

/* ============================================================
   آمار کلیدی
============================================================ */
const STATS = [
  { icon: PiggyBank, v: "٪۷۵", l: "صرفه‌جویی نسبت به فروشگاه" },
  { icon: Sofa, v: "۳۵۰K+", l: "آگهی مبلمان فعال" },
  { icon: Truck, v: "از ۲۵€", l: "هزینه اجاره Transporter" },
  { icon: Clock, v: "۲-۷ روز", l: "میانگین تجهیز کامل خانه" },
];

/* ============================================================
   دسته‌بندی مبلمان با قیمت تخمینی
============================================================ */
const FURNITURE_CATEGORIES = [
  {
    icon: Sofa,
    name: "مبل و کاناپه",
    german: "Sofa / Couch",
    budget: "۵۰-۱۵۰€",
    mid: "۱۵۰-۴۰۰€",
    premium: "۴۰۰-۸۰۰€",
    tips: ["کاور قابل شستشو را بررسی کنید", "تست نشستن حتماً حضوری", "برای زیر ۲۰۰€ انتظار کیفیت بالا نداشته باشید"],
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Bed,
    name: "تخت و تشک",
    german: "Bett / Matratze",
    budget: "۳۰-۱۰۰€",
    mid: "۱۰۰-۳۰۰€",
    premium: "۳۰۰-۷۰۰€",
    tips: ["تشک دست‌دوم بهداشتی نیست — نو بخرید", "اسکلت تخت را می‌توانید دست‌دوم بخرید", "اندازه استاندارد ۱۴۰×۲۰۰ یا ۱۶۰×۲۰۰"],
    color: "from-rose-500 to-red-600",
  },
  {
    icon: Utensils,
    name: "میز و صندلی غذاخوری",
    german: "Esstisch / Stühle",
    budget: "۴۰-۱۲۰€",
    mid: "۱۲۰-۳۰۰€",
    premium: "۳۰۰-۶۰۰€",
    tips: ["میز چوبی محکم، بهترین گزینه دست‌دوم", "حتماً همه صندلی‌ها را تست کنید", "برای آپارتمان کوچک، میز تاشو (Klapptisch)"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Package,
    name: "کمد و قفسه",
    german: "Kleiderschrank / Regal",
    budget: "۳۰-۹۰€",
    mid: "۹۰-۲۵۰€",
    premium: "۲۵۰-۶۰۰€",
    tips: ["حمل‌ونقل سخت — حتماً اندازه در را بگیرید", "کمدهای PAX IKEA دست‌دوم رایج و قابل تنظیم", "پیچ‌ها و آچار همراهش را بخواهید"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Lamp,
    name: "روشنایی و لوازم برقی",
    german: "Lampen / Elektronik",
    budget: "۱۰-۴۰€",
    mid: "۴۰-۱۰۰€",
    premium: "۱۰۰-۳۰۰€",
    tips: ["سلامت سیم و پریز را تست کنید", "لوسترهای اتریشی با فیش استاندارد (Schuko)", "وسایل برقی دارای CE را ترجیح دهید"],
    color: "from-amber-400 to-yellow-500",
  },
  {
    icon: Bath,
    name: "لوازم حمام و آشپزخانه",
    german: "Bad / Küche",
    budget: "۲۰-۸۰€",
    mid: "۸۰-۲۰۰€",
    premium: "۲۰۰-۵۰۰€",
    tips: ["ظروف و قابلمه دست‌دوم مشکلی ندارد", "آینه و روشویی باید بازدید حضوری شوند", "لوازم برقی آشپزخانه از برندهای معتبر (Bosch, Siemens)"],
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Coffee,
    name: "دکور و فرش",
    german: "Teppich / Deko",
    budget: "۱۵-۵۰€",
    mid: "۵۰-۱۵۰€",
    premium: "۱۵۰-۴۰۰€",
    tips: ["فرش را در نور روز و با زاویه ببینید", "برای فرش ایرانی، اصالت و رنگ را بررسی کنید", "دکورهای فصلی از Sozialmarkt ارزان‌تر است"],
    color: "from-purple-500 to-fuchsia-600",
  },
  {
    icon: Wrench,
    name: "ابزار و لوازم تعمیر",
    german: "Werkzeug",
    budget: "۲۰-۶۰€",
    mid: "۶۰-۱۵۰€",
    premium: "۱۵۰-۴۰۰€",
    tips: ["ابزار برقی برند (Bosch, Makita) ارزش نگهداری دارد", "پیچ‌گوشتی و دریل، ضروری برای تجهیز", "ست ابزار کامل از دست‌دوم به‌صرفه‌تر"],
    color: "from-slate-500 to-slate-700",
  },
];

/* ============================================================
   گزینه‌های حمل‌ونقل مبلمان
============================================================ */
const TRANSPORT_OPTIONS = [
  {
    icon: Car,
    name: "اجاره Transporter (ون کوچک)",
    price: "۲۵-۶۰€ / ساعت",
    desc: "مناسب برای کمد، مبل بزرگ و چند قلم. رایج‌ترین گزینه در وین.",
    pros: ["در دسترس همه جا", "بدون نیاز به گواهینامه خاص", "امکان یک‌نفره"],
    cons: ["نیاز به رزرو قبلی", "پارکینگ در وین چالشی است"],
    providers: ["OBI", "Bauhaus", "Sixt", "Buchbinder"],
  },
  {
    icon: Truck,
    name: "خدمات اجاره با راننده (Umzugsservice)",
    price: "۸۰-۱۵۰€ / سفر",
    desc: "مناسب برای تجهیز کامل خانه یا اسباب‌کشی رسمی. صرفه‌جویی زمان.",
    pros: ["راننده حرفه‌ای", "تجهیزات بسته‌بندی", "دو نفره برای حمل"],
    cons: ["گران‌تر", "نیاز به رزرو چند روز قبل"],
    providers: ["Umzug Wien", "Sicher Umzug", "Lauterbach"],
  },
  {
    icon: Users2,
    name: "کمک دوستان + اجاره ون کوچک",
    price: "۲۵-۴۰€ / روز",
    desc: "ارزان‌ترین گزینه برای دانشجوها و بودجه محدود.",
    pros: ["کم‌هزینه‌ترین", "مناسب حجم متوسط"],
    cons: ["نیاز به کمک دوستان", "خستگی زیاد"],
    providers: ["ShareNow", "MO.Point", "Cambio"],
  },
  {
    icon: Truck,
    name: "ارسال پستی (برای اقلام کوچک)",
    price: "۵-۱۵€ / بسته",
    desc: "برای لوازم کوچک مثل لامپ، دکور و کتاب. عدم نیاز به جابه‌جایی.",
    pros: ["ارزان", "بدون دردسر"],
    cons: ["فقط اقلام کوچک", "ریسک شکستگی"],
    providers: ["Post.at", "GLS", "DPD"],
  },
];

/* ============================================================
   اصطلاحات کلیدی تجهیز خانه
============================================================ */
const TERMS = [
  {
    term: "Abholung",
    pronounce: "آپ‌هولونگ",
    meaning: "تحویل حضوری — خریدار برای دریافت کالا می‌رود.",
    category: "transport",
  },
  {
    term: "Lieferung",
    pronounce: "لیفِرونگ",
    meaning: "ارسال توسط فروشنده — به‌ویژه برای اقلام بزرگ.",
    category: "transport",
  },
  {
    term: "Sperrmüll",
    pronounce: "شپر‌مول",
    meaning: "زباله حجیم شهرداری — مبلمان رایگان در خیابان‌ها.",
    category: "free",
  },
  {
    term: "Sozialmarkt",
    pronounce: "زوتیسال‌مارکت",
    meaning: "بازار اجتماعی با قیمت پایین برای خانواده‌های کم‌درآمد.",
    category: "free",
  },
  {
    term: "Zu verschenken",
    pronounce: "تسو فِر‌شِنکِن",
    meaning: "رایگان واگذار می‌شود — فقط هزینه حمل با شما.",
    category: "free",
  },
  {
    term: "Zustand",
    pronounce: "تسوشتاند",
    meaning: "وضعیت کالا — در آگهی‌ها معمولاً neu, neuwertig, gut, akzeptabel.",
    category: "condition",
  },
  {
    term: "Maße",
    pronounce: "ماسه",
    meaning: "ابعاد کالا — بر حسب سانتی‌متر (B×H×T: عرض × ارتفاع × عمق).",
    category: "condition",
  },
  {
    term: "Verhandelbar",
    pronounce: "فِرهاندِلبا",
    meaning: "قابل چانه‌زنی — معمولاً ۱۰-۲۰٪ تخفیف ممکن است.",
    category: "pricing",
  },
  {
    term: "Klappsofa",
    pronounce: "کلاپ‌زوفا",
    meaning: "مبل تاشو — تبدیل به تخت، مناسب آپارتمان کوچک.",
    category: "furniture",
  },
  {
    term: "Kleiderschrank",
    pronounce: "کلایدر‌شرانک",
    meaning: "کمد لباس — مهم‌ترین قلم تجهیز خانه.",
    category: "furniture",
  },
  {
    term: "Matratze",
    pronounce: "ماتراتسه",
    meaning: "تشک — به دلایل بهداشتی فقط نو بخرید.",
    category: "furniture",
  },
  {
    term: "Transporter",
    pronounce: "ترانسپورتر",
    meaning: "ون باری کوچک — اجاره‌ای برای حمل مبلمان.",
    category: "transport",
  },
];

const TERM_CATEGORIES = [
  { id: "all", name: "🌸 همه" },
  { id: "furniture", name: "🛋️ مبلمان" },
  { id: "transport", name: "🚚 حمل‌ونقل" },
  { id: "pricing", name: "💰 قیمت" },
  { id: "condition", name: "📏 وضعیت و ابعاد" },
  { id: "free", name: "🎁 رایگان" },
];

/* ============================================================
   ۶ ترفند چانه‌زنی مؤثر
============================================================ */
const NEGOTIATION_TIPS = [
  {
    icon: Target,
    title: "قیمت مشابه‌ها را بدانید",
    desc: "قبل از تماس، ۳ تا ۵ آگهی مشابه را در Willhaben ببینید. با دانستن قیمت بازار، پیشنهاد منطقی می‌دهید.",
  },
  {
    icon: MessageSquare,
    title: "پیام مؤدبانه و کوتاه",
    desc: "به آلمانی شروع کنید: «Guten Tag, ich interessiere mich für ... Wären X Euro möglich?» — ادب، ۵۰٪ موفقیت است.",
  },
  {
    icon: Clock,
    title: "صبر کنید تا فروشنده تخفیف بدهد",
    desc: "اگر آگهی ۲-۳ هفته منتشر شده و هنوز فروش نرفته، فروشنده معمولاً تخفیف پیشنهاد می‌دهد.",
  },
  {
    icon: Coins,
    title: "پرداخت نقدی (Bargeld) پیشنهاد دهید",
    desc: "فروشندگان اتریشی پرداخت نقدی فوری را ترجیح می‌دهند — بهانه عالی برای ۱۰-۱۵٪ تخفیف.",
  },
  {
    icon: Truck,
    title: "حمل سریع پیشنهاد دهید",
    desc: "«من امروز می‌آیم و می‌برم» — این جمله ارزش طلایی دارد. فروشنده از شر کالا خلاص می‌شود.",
  },
  {
    icon: Package,
    title: "بسته‌ای خرید کنید",
    desc: "اگر فروشنده چند قلم دارد (مثل میز + صندلی)، پیشنهاد خرید همه با هم و ۲۰٪ تخفیف بدهید.",
  },
];

/* ============================================================
   ۵ گام تجهیز خانه با بودجه
============================================================ */
const STEPS = [
  {
    icon: Calculator,
    t: "بودجه‌بندی اولیه",
    d: "بودجه کل تجهیز خانه را تقسیم کنید: ۳۰٪ مبلمان بزرگ، ۲۵٪ اتاق خواب، ۲۰٪ آشپزخانه، ۱۵٪ دکور، ۱۰٪ حمل.",
  },
  {
    icon: Home,
    t: "متراژ و پلان خانه",
    d: "قبل از خرید، متراژ واقعی و پلان خانه را ترسیم کنید. حتی ۱۰ سانتی‌متر اختلاف می‌تواند باعث عدم جا شدن کمد شود.",
  },
  {
    icon: Search,
    t: "جستجوی هوشمند در Willhaben",
    d: "با فیلترهای Bezirk (منطقه) و Umkreis (شعاع) جستجو کنید. کالای نزدیک = هزینه حمل کمتر.",
  },
  {
    icon: Ruler,
    t: "بازدید حضوری حتماً",
    d: "برای اقلام بالای ۱۰۰€، حتماً بازدید حضوری. ابعاد را با متر اندازه بگیرید و وضعیت واقعی کالا را ببینید.",
  },
  {
    icon: Truck,
    t: "حمل‌ونقل و مونتاژ",
    d: "برای مبلمان بزرگ، Transporter اجاره کنید. کمدهای بزرگ ممکن است نیاز به مونتاژ مجدد داشته باشند.",
  },
];

/* ============================================================
   سوالات متداول
============================================================ */
const FAQS = [
  {
    q: "با چه بودجه‌ای می‌توان یک آپارتمان کامل را با Willhaben تجهیز کرد؟",
    a: "بسته به کیفیت و اندازه آپارتمان، سه سطح داریم: ۱) بودجه اقتصادی (۲۵۰-۵۰۰€): برای استودیو یا اتاق کوچک با اقلام پایه مثل تخت، میز و کمد. ۲) بودجه متوسط (۵۰۰-۱۲۰۰€): برای آپارتمان ۵۰ متری با اقلام باکیفیت. ۳) بودجه پریمیوم (۱۲۰۰-۲۵۰۰€): برای آپارتمان ۸۰+ متری با برندهای معتبر. راز اصلی، اولویت‌بندی است: اول تخت و تشک نو، سپس کمد، میز و مبل.",
  },
  {
    q: "آیا خرید مبلمان دست‌دوم در اتریش ایمن است؟",
    a: "بله، اگر از Willhaben با PayLivery خرید کنید. نکات مهم: ۱) برای تشک همیشه نو بخرید — مسائل بهداشتی. ۲) برای مبل، بررسی کنید که کاور قابل شستشو باشد. ۳) از فروشنده بخواهید عکس از داخل دراورها و کمدها بفرستد. ۴) قبل از پرداخت کامل، مونتاژ مجدد را تست کنید. ۵) حتماً از بازدید حضوری برای اقلام بالای ۱۰۰ یورو استفاده کنید.",
  },
  {
    q: "ارزان‌ترین راه حمل مبلمان در وین چیست؟",
    a: "چهار گزینه بر اساس حجم: ۱) برای اقلام کوچک: پست اتریش (Post.at) با ۵-۱۵ یورو. ۲) برای یک یا دو قلم بزرگ: اجاره Transporter از OBI یا Bauhaus (۲۵-۶۰ یورو در ساعت). ۳) برای تجهیز کامل خانه: اجاره ون کوچک از ShareNow یا Cambio با دوستان (۲۵-۴۰ یورو در روز). ۴) برای حجم زیاد بدون دردسر: خدمات Umzugsservice با راننده (۸۰-۱۵۰ یورو).",
  },
  {
    q: "Sperrmüll و Sozialmarkt چیست و چطور استفاده کنم؟",
    a: "دو منبع طلایی برای مبلمان رایگان یا ارزان: ۱) Sperrmüll: شهرداری وین هر منطقه یک روز در ماه، مبلمان دورریز را جمع می‌کند. یک روز قبل، مردم مبلمان سالم خود را در خیابان می‌گذارند. با آپ Willhaben یا وب‌سایت شهرداری، روز Sperrmüll محله خود را ببینید. ۲) Sozialmarkt: بازارهای اجتماعی مثل «SOMA Wien» یا «Kaufhaus der Diakonie» مبلمان را با تخفیف ۷۰-۹۰٪ می‌فروشند. برای ورود، کارت SozialCard یا اثبات درآمد پایین لازم است.",
  },
  {
    q: "چطور ابعاد مبلمان را قبل از خرید چک کنم؟",
    a: "سه گام: ۱) ابعاد مبلمان را در آگهی به آلمانی بخوانید: B (Breite=عرض) × H (Höhe=ارتفاع) × T (Tiefe=عمق). ۲) فضای موجود در خانه را با متر دقیق اندازه بگیرید — به‌ویژه عرض درها و راه‌پله. ۳) برای کمدهای بزرگ، ارتفاع اتاق را چک کنید (کمد + ارتفاع حمل = باید کمتر از سقف باشد). حتماً به آسانسور خانه نیز توجه کنید — کمدهای بزرگ ممکن است از پله جا نروند.",
  },
  {
    q: "چطور می‌توانم در قیمت چانه‌زنی کنم؟",
    a: "شش استراتژی مؤثر: ۱) تحقیق قبلی: قیمت ۵ آگهی مشابه را بدانید. ۲) پیام مؤدبانه به آلمانی: «Wären X Euro möglich?» — ادب، ۵۰٪ موفقیت. ۳) صبر کنید تا آگهی ۲-۳ هفته قدیمی شود. ۴) پیشنهاد پرداخت نقدی و حمل فوری — این بزرگ‌ترین اهرم فشار است. ۵) اگر چند قلم می‌خرید، تخفیف بسته‌ای بخواهید. ۶) اجازه دهید فروشنده ابتدا شماره را بدهد — معمولاً ۵-۱۰٪ تخفیف پایین‌تر از پیشنهاد شما می‌دهد.",
  },
  {
    q: "مهم‌ترین اقلام برای تجهیز خانه چیست؟",
    a: "بر اساس اولویت: سطح ۱ (ضروری روز اول): تخت + تشک نو، میز و صندلی غذا، کمد لباس. سطح ۲ (هفته اول): یخچال، اجاق گاز یا پلوپز، پرده و لامپ. سطح ۳ (ماه اول): مبل، فرش، میز کار یا میز مطالعه. سطح ۴ (کمال‌گرایی): دکور، گیاه، تابلوی دیواری، لوستر. اگر بودجه محدود دارید، سطح ۱ و ۲ را با کالای باکیفیت و سطوح بالاتر را با کالای دست‌دوم خوب تجهیز کنید.",
  },
];

/* ============================================================
   کامپوننت اصلی
============================================================ */
const WillhabenFurnitureGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTermCat, setActiveTermCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ماشین‌حساب بودجه تجهیز خانه */
  const [rooms, setRooms] = useState<string>("2");
  const [squareMeters, setSquareMeters] = useState<string>("55");
  const [quality, setQuality] = useState<string>("mixed");

  const budget = useMemo(() => {
    const r = parseFloat(rooms);
    const m = parseFloat(squareMeters);
    if (isNaN(r) || isNaN(m) || r < 1 || m < 15) return null;

    // بودجه پایه بر اساس متراژ و تعداد اتاق
    const base = m * 12 + r * 80;

    // ضریب کیفیت: economy = 0.6, mixed = 1.0, premium = 1.8
    const qualityMultiplier =
      quality === "economy" ? 0.6 : quality === "premium" ? 1.8 : 1.0;

    const total = Math.round((base * qualityMultiplier) / 10) * 10;

    return {
      total,
      breakdown: [
        { label: "تخت و تشک", percent: 25, amount: Math.round(total * 0.25) },
        { label: "کمد و ذخیره‌سازی", percent: 20, amount: Math.round(total * 0.20) },
        { label: "مبل و نشیمن", percent: 18, amount: Math.round(total * 0.18) },
        { label: "میز و صندلی", percent: 12, amount: Math.round(total * 0.12) },
        { label: "آشپزخانه", percent: 15, amount: Math.round(total * 0.15) },
        { label: "حمل‌ونقل", percent: 10, amount: Math.round(total * 0.10) },
      ],
    };
  }, [rooms, squareMeters, quality]);

  /* فیلتر دیکشنری اصطلاحات */
  const filteredTerms = useMemo(() => {
    return TERMS.filter((t) => {
      const matchesCat = activeTermCat === "all" || t.category === activeTermCat;
      const matchesSearch =
        !searchQuery ||
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.meaning.includes(searchQuery);
      return matchesCat && matchesSearch;
    });
  }, [activeTermCat, searchQuery]);

  /* ---------- Schema JSON-LD ---------- */
  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HowTo",
          name: "تجهیز خانه با بودجه کم در اتریش از Willhaben",
          description:
            "راهنمای گام‌به‌گام تجهیز آپارتمان در اتریش با خرید مبلمان دست‌دوم از Willhaben، اجاره Transporter و ترفندهای چانه‌زنی.",
          totalTime: "P7D",
          estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "250-2500" },
          step: STEPS.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.t,
            text: s.d,
          })),
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        {
          "@type": "ItemList",
          name: "دسته‌بندی مبلمان با قیمت تخمینی اتریش",
          numberOfItems: FURNITURE_CATEGORIES.length,
          itemListElement: FURNITURE_CATEGORIES.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            description: `قیمت اقتصادی ${c.budget}, متوسط ${c.mid}, پریمیوم ${c.premium}`,
          })),
        },
        {
          "@type": "WebPage",
          name: "راهنمای تجهیز خانه با Willhaben",
          description:
            "آموزش کامل تجهیز خانه با بودجه کم از Willhaben اتریش: ماشین‌حساب بودجه، مبلمان دست‌دوم، حمل‌ونقل ارزان و چانه‌زنی.",
          inLanguage: "fa-IR",
          audience: {
            "@type": "Audience",
            audienceType: "Persian-speaking residents in Austria",
          },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "خانه", item: "https://otrish-iran.ir" },
            { "@type": "ListItem", position: 2, name: "Willhaben", item: "https://otrish-iran.ir/willhaben" },
            { "@type": "ListItem", position: 3, name: "تجهیز خانه" },
          ],
        },
      ],
    }),
    []
  );

  return (
    <>
      <SEO
        title="راهنمای تجهیز خانه با Willhaben اتریش | ۵۰۰€ بودجه، خانه کامل + ترفندهای چانه‌زنی"
        description="آموزش کامل تجهیز خانه با بودجه کم از Willhaben در اتریش: ماشین‌حساب بودجه، ۸ دسته مبلمان با قیمت، حمل‌ونقل ارزان با Transporter، Sperrmüll و Sozialmarkt. برای فارسی‌زبانان مقیم وین."
        keywords="تجهیز خانه Willhaben, مبلمان ارزان اتریش, حمل مبلمان وین, Transporter اجاره, Sperrmüll وین, Sozialmarkt, مبلمان دست دوم, چانه زنی Willhaben, Willhaben furniture, möbel Wien"
        schemaData={schema}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section
        dir="rtl"
        className="font-sans bg-gradient-to-b from-white via-amber-50/20 to-white py-10 md:py-16 space-y-12"
        id="willhaben-furniture-guide"
      >
        {/* ==================== HERO ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[36px] border border-amber-200 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 md:p-12 space-y-5">
              <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-[10px] font-black px-3 py-1.5 border border-amber-100 rounded-full">
                <Sofa className="w-3.5 h-3.5" />
                MÖBEL AUF WILLHABEN · BUDGET GUIDE
              </span>

              <h1 className="font-black text-stone-900 text-2xl md:text-4xl leading-tight">
                <span className="text-[#c8102e]">با ۵۰۰ یورو، خانه‌ات را کامل تجهیز کن</span> — مبلمان دست‌دوم باکیفیت در وین
              </h1>

              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-bold">
                هر تازه‌وارد اتریش، اولین شوک مالی را از خرید مبلمان نو در IKEA یا XXXLutz می‌خورد.
                یک آپارتمان ۵۰ متری با مبلمان نو، حداقل <strong>۳٬۰۰۰ یورو</strong> هزینه دارد — اما
                همان خانه با مبلمان دست‌دوم باکیفیت از Willhaben، تنها با <strong>۵۰۰-۸۰۰ یورو</strong> تجهیز می‌شود.
                <span className="text-[#c8102e]"> در این راهنما، ۸ دسته مبلمان با قیمت واقعی، ۴ گزینه حمل‌ونقل و ۶ ترفند چانه‌زنی را یاد می‌گیرید.</span>
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: PiggyBank, t: "٪۷۵ صرفه‌جویی" },
                  { icon: Truck, t: "حمل از ۲۵€" },
                  { icon: BadgeCheck, t: "بر پایه تجربه وین" },
                ].map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-[11px] font-black text-stone-700 bg-white border border-stone-200 px-3 py-1.5 rounded-full"
                  >
                    <b.icon className="w-3.5 h-3.5 text-emerald-600" />
                    {b.t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#budget-calculator"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  محاسبه بودجه من
                </a>
                <a
                  href="#furniture-categories"
                  className="inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-amber-400 text-stone-700 text-xs font-black px-5 py-3 rounded-2xl transition"
                >
                  <Sofa className="w-4 h-4" />
                  قیمت ۸ دسته مبلمان
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px]">
              <img
                src={IMG_HERO}
                alt="اتاق نشیمن دنج با مبلمان دست‌دوم باکیفیت از Willhaben اتریش - تجهیز خانه با بودجه کم"
                loading="lazy"
                width={1400}
                height={900}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/60 lg:to-white" />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-[10px] font-black text-stone-500 mb-0.5">صرفه‌جویی نسبت به نو</div>
                <div className="text-xl font-black text-[#c8102e]">~ ۷۵٪</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==================== STATS ==================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition"
            >
              <s.icon className="w-5 h-5 mx-auto text-[#c8102e] mb-2" />
              <div className="text-lg font-black text-stone-900">{s.v}</div>
              <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.l}</div>
            </motion.div>
          ))}
        </div>

        {/* ==================== ماشین‌حساب بودجه ==================== */}
        <motion.div
          id="budget-calculator"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 via-orange-50/40 to-emerald-50/40 border border-amber-200 rounded-3xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-600" />
                ماشین‌حساب بودجه تجهیز خانه
              </h2>
              <p className="text-xs text-stone-600 font-bold leading-relaxed">
                بر اساس متراژ، تعداد اتاق و سطح کیفی مدنظر شما، بودجه تخمینی تجهیز خانه
                از Willhaben را محاسبه کنید.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-black text-stone-700 mb-1">
                    تعداد اتاق‌ها (اتاق خواب + نشیمن):
                  </label>
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    className="w-full bg-white border border-stone-200 p-3 rounded-xl text-xs outline-none cursor-pointer text-stone-800 focus:border-amber-500"
                  >
                    <option value="1">۱ (استودیو)</option>
                    <option value="2">۲ (اتاق + پذیرایی)</option>
                    <option value="3">۳ (دو خواب + پذیرایی)</option>
                    <option value="4">۴ یا بیشتر</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-700 mb-1">
                    متراژ خانه (مترمربع):
                  </label>
                  <input
                    type="number"
                    value={squareMeters}
                    onChange={(e) => setSquareMeters(e.target.value)}
                    placeholder="55"
                    className="w-full bg-white border border-stone-200 p-3 rounded-xl text-sm font-mono text-left outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-700 mb-1">
                    سطح کیفی:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "economy", label: "اقتصادی" },
                      { id: "mixed", label: "ترکیبی" },
                      { id: "premium", label: "پریمیوم" },
                    ].map((q) => (
                      <button
                        key={q.id}
                        onClick={() => setQuality(q.id)}
                        className={`p-2.5 rounded-xl border-2 text-[11px] font-black transition ${
                          quality === q.id
                            ? "bg-amber-500 border-amber-500 text-white shadow-md"
                            : "bg-white border-stone-200 text-stone-600 hover:border-amber-300"
                        }`}
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {budget && (
                  <motion.div
                    key={`${rooms}-${squareMeters}-${quality}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="bg-white rounded-2xl p-5 border-2 border-amber-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-black text-stone-700">
                          بودجه تخمینی کل
                        </span>
                        <PiggyBank className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="text-4xl font-black text-amber-700 text-right" dir="ltr">
                        {budget.total.toLocaleString("fa-IR")} €
                      </div>
                      <p className="text-[10px] font-bold text-stone-500 mt-1">
                        صرفه‌جویی تخمینی نسبت به خرید نو: حدود {Math.round(budget.total * 3).toLocaleString("fa-IR")} €
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-stone-200">
                      <div className="text-[11px] font-black text-stone-700 mb-3">
                        تفکیک بودجه به تفکیک دسته:
                      </div>
                      <div className="space-y-2.5">
                        {budget.breakdown.map((b, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between text-[10.5px] font-bold">
                              <span className="text-stone-700">{b.label}</span>
                              <span className="text-stone-800 font-black" dir="ltr">
                                {b.amount.toLocaleString("fa-IR")} €
                              </span>
                            </div>
                            <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(b.percent / 30) * 100}%` }}
                                transition={{ duration: 0.6, delay: i * 0.05 }}
                                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Lightbulb className="w-4 h-4 text-emerald-600" />
                        <span className="text-[11px] font-black text-stone-900">
                          نکته طلایی
                        </span>
                      </div>
                      <p className="text-[10.5px] font-bold text-stone-700 leading-relaxed">
                        به‌جای خرید همه چیز در یک روز، در ۲-۳ هفته خرید کنید. با صبر،
                        اقلام باکیفیت‌تر با قیمت مناسب‌تر پیدا می‌کنید. برای تخت و تشک
                        همیشه نو بخرید — بقیه اقلام را می‌توان دست‌دوم تهیه کرد.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ==================== ۸ دسته مبلمان با قیمت ==================== */}
        <div id="furniture-categories">
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <span className="inline-block text-[10px] bg-amber-100 text-amber-700 font-black px-3 py-1 rounded-full mb-2">
              <Sofa className="w-3 h-3 inline ml-1" />
              MÖBELKATEGORIEN
            </span>
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Package className="w-5 h-5 text-[#c8102e]" />
              ۸ دسته اصلی مبلمان با قیمت تخمینی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1 leading-relaxed">
              قیمت‌های واقعی بر پایه آگهی‌های فعال Willhaben در وین
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FURNITURE_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="relative bg-white rounded-3xl border border-stone-200 p-5 overflow-hidden hover:shadow-lg hover:border-amber-300 transition-all"
                >
                  <div
                    className={`absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-br ${cat.color} opacity-[0.08] rounded-full`}
                  />

                  <div className="relative flex items-center gap-3 mb-3">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shrink-0 shadow-md`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[12px] font-black text-stone-900 leading-tight">
                        {cat.name}
                      </h3>
                      <span
                        className="text-[9px] font-black text-stone-400 font-mono"
                        dir="ltr"
                      >
                        {cat.german}
                      </span>
                    </div>
                  </div>

                  {/* Price tiers */}
                  <div className="relative space-y-1.5 mb-3">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-emerald-600">اقتصادی</span>
                      <span className="text-stone-800 font-black">{cat.budget}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-blue-600">متوسط</span>
                      <span className="text-stone-800 font-black">{cat.mid}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-purple-600">پریمیوم</span>
                      <span className="text-stone-800 font-black">{cat.premium}</span>
                    </div>
                  </div>

                  <div className="relative bg-stone-50 rounded-xl p-2.5 border border-stone-100">
                    <div className="text-[9px] font-black text-stone-700 mb-1 flex items-center gap-1">
                      <Lightbulb className="w-2.5 h-2.5 text-amber-500" />
                      نکات:
                    </div>
                    <ul className="space-y-0.5">
                      {cat.tips.map((tip, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-1 text-[9px] font-bold text-stone-600 leading-tight"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==================== تصویر + حمل‌ونقل ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[320px]">
            <img
              src={IMG_MOVING}
              alt="اجاره Transporter و حمل مبلمان در وین - راهنمای جابه‌جایی مبلمان Willhaben"
              loading="lazy"
              width={1000}
              height={700}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 text-white">
              <div className="text-[10px] font-black opacity-80 mb-1">TRANSPORT IN WIEN</div>
              <div className="text-base font-black">حمل هوشمند، هزینه کمتر</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#c8102e]" />
              ۴ گزینه حمل‌ونقل مبلمان در وین
            </h2>
            <p className="text-xs text-stone-600 font-bold leading-relaxed">
              انتخاب روش حمل، ۱۰-۲۰٪ بودجه تجهیز خانه را مصرف می‌کند. انتخاب درست، صرفه‌جویی قابل توجهی به همراه دارد:
            </p>

            <div className="space-y-3">
              {TRANSPORT_OPTIONS.map((opt, i) => {
                const Icon = opt.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl border border-stone-200 p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <h3 className="text-[12px] font-black text-stone-900">
                            {opt.name}
                          </h3>
                          <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                            {opt.price}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-stone-500 font-bold leading-relaxed mt-1">
                          {opt.desc}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[10px] font-bold">
                      <div>
                        <div className="text-emerald-700 mb-1">✅ مزایا:</div>
                        <ul className="space-y-0.5">
                          {opt.pros.map((p, k) => (
                            <li key={k} className="text-stone-600 flex items-start gap-1">
                              <span className="text-emerald-500">•</span> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-rose-700 mb-1">⚠️ معایب:</div>
                        <ul className="space-y-0.5">
                          {opt.cons.map((c, k) => (
                            <li key={k} className="text-stone-600 flex items-start gap-1">
                              <span className="text-rose-500">•</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-stone-100 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-black text-stone-500">
                        ارائه‌دهندگان:
                      </span>
                      {opt.providers.map((p, k) => (
                        <span
                          key={k}
                          className="text-[9px] font-black bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==================== ۵ گام تجهیز خانه ==================== */}
        <div>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <span className="inline-block text-[10px] bg-emerald-100 text-emerald-700 font-black px-3 py-1 rounded-full mb-2">
              <Home className="w-3 h-3 inline ml-1" />
              EINRICHTUNGS-PROZESS
            </span>
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Home className="w-5 h-5 text-[#c8102e]" />
              ۵ گام تجهیز خانه با بودجه کم
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1 leading-relaxed">
              از بودجه‌بندی تا مونتاژ نهایی — همه چیز در کمتر از ۲ هفته
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="relative bg-white rounded-3xl border border-stone-200 p-5 overflow-hidden group"
                >
                  <div className="absolute top-3 left-3 text-5xl font-black text-stone-100 select-none">
                    {i + 1}
                  </div>
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="relative text-[12px] font-black text-stone-900 mb-1">
                    {s.t}
                  </h3>
                  <p className="relative text-[10.5px] text-stone-500 font-bold leading-relaxed">
                    {s.d}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==================== ۶ ترفند چانه‌زنی ==================== */}
        <div>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <span className="inline-block text-[10px] bg-blue-100 text-blue-700 font-black px-3 py-1 rounded-full mb-2">
              <MessageSquare className="w-3 h-3 inline ml-1" />
              VERHANDLUNGS-TIPPS
            </span>
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Coins className="w-5 h-5 text-[#c8102e]" />
              ۶ ترفند چانه‌زنی مؤثر در Willhaben
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1 leading-relaxed">
              هر ترفند، به‌طور میانگین ۱۰-۱۵٪ تخفیف اضافه ایجاد می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {NEGOTIATION_TIPS.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="relative bg-white rounded-2xl border border-stone-200 p-5 hover:shadow-lg hover:border-blue-300 transition-all overflow-hidden"
                >
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-[0.06] rounded-full" />

                  <div className="relative flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[11.5px] font-black text-stone-900 mb-1 leading-snug">
                        {tip.title}
                      </h3>
                      <p className="text-[10px] text-stone-500 font-bold leading-relaxed">
                        {tip.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==================== دیکشنری اصطلاحات مبلمان ==================== */}
        <div>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <span className="inline-block text-[10px] bg-purple-100 text-purple-700 font-black px-3 py-1 rounded-full mb-2">
              <Bookmark className="w-3 h-3 inline ml-1" />
              MÖBEL-GLOSSAR
            </span>
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Search className="w-5 h-5 text-[#c8102e]" />
              دیکشنری ۱۲ اصطلاح کلیدی مبلمان
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1 leading-relaxed">
              برای معامله موفق، این اصطلاحات آلمانی ضروری هستند
            </p>
          </div>

          {/* Search + Category Filter */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 جستجوی اصطلاح (آلمانی یا فارسی)..."
                className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 font-bold transition"
              />
            </div>

            <div className="md:col-span-12 lg:col-span-7 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {TERM_CATEGORIES.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTermCat(tab.id)}
                  className={`px-3 py-2 rounded-xl border text-[11px] font-black shrink-0 transition-all cursor-pointer ${
                    activeTermCat === tab.id
                      ? "bg-gradient-to-br from-purple-500 to-fuchsia-600 border-transparent text-white shadow-md scale-105"
                      : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] font-bold text-stone-500 text-right mb-3">
            نمایش <span className="font-black text-[#c8102e]">{filteredTerms.length}</span> اصطلاح
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term, idx) => (
                <motion.div
                  key={term.term}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  whileHover={{ y: -4 }}
                  className="relative bg-white rounded-2xl border border-stone-200 p-5 overflow-hidden shadow-sm hover:shadow-lg hover:border-purple-300 transition-all"
                >
                  <div className="absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-br from-purple-500 to-fuchsia-600 opacity-[0.04] rounded-full" />

                  <div className="relative space-y-2">
                    <h3
                      className="font-black text-stone-900 text-base font-mono"
                      dir="ltr"
                    >
                      {term.term}
                    </h3>
                    <p className="text-[10px] text-purple-700 font-black">
                      تلفظ: {term.pronounce}
                    </p>
                    <p className="text-[10.5px] text-stone-600 font-bold leading-relaxed pt-2 border-t border-stone-100">
                      {term.meaning}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center p-8 text-stone-400 text-xs font-bold bg-stone-50/50 border border-stone-200 rounded-2xl">
                اصطلاحی مطابق با فیلتر شما یافت نشد.
              </div>
            )}
          </div>
        </div>

        {/* ==================== تصویر سوم + هشدار بودجه ==================== */}
        <div className="relative rounded-3xl overflow-hidden min-h-[240px] md:min-h-[300px]">
          <img
            src={IMG_MARKET}
            alt="بازار مبلمان دست‌دوم در وین - خرید ارزان مبلمان از Willhaben و Sozialmarkt"
            loading="lazy"
            width={1000}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a1128]/92 via-[#0a1128]/70 to-transparent" />
          <div className="relative p-8 md:p-12 max-w-xl text-white">
            <span className="inline-flex items-center gap-2 bg-amber-500/25 border border-amber-400/40 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              منبع پنهان
            </span>
            <h3 className="text-xl md:text-2xl font-black mb-3 leading-snug">
              Sperrmüll: مبلمان رایگان در خیابان‌های وین
            </h3>
            <p className="text-xs md:text-sm text-stone-200 font-bold leading-relaxed">
              شهرداری وین هر ماه یک روز برای هر منطقه، زباله‌های حجیم را جمع می‌کند. یک روز قبل،
              مردم مبلمان سالم، میز و کمد خود را در خیابان می‌گذارند. با آپ{" "}
              <strong>Willhaben</strong> یا وب‌سایت شهرداری، روز <strong>Sperrmüll</strong> محله خود را
              ببینید. برای اقلام رایگان بیشتر، سرویس <strong>zu verschenken</strong> را در Willhaben
              فیلتر کنید.
            </p>
          </div>
        </div>

        {/* ==================== FAQ ==================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره تجهیز خانه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ دقیق به پرتکرارترین پرسش‌های فارسی‌زبانان مقیم اتریش
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? "border-[#c8102e]/30 bg-[#c8102e]/[0.02] shadow-md"
                      : "border-stone-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/60 transition"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3 flex-1">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black shrink-0 transition-all ${
                          isOpen
                            ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white"
                            : "bg-stone-100 text-stone-500"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="font-black text-xs text-stone-900 leading-snug">
                        {f.q}
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
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
                        <div className="px-4 pb-4 pr-14 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-3">
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== CTA پایانی ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full">
              <Home className="w-3.5 h-3.5 text-amber-300" />
              کمک رایگان برای تجهیز خانه
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              تازه به اتریش آمده‌اید؟ ما در تجهیز خانه کمکتان می‌کنیم
            </h2>
            <p className="text-sm text-stone-300 font-bold leading-relaxed">
              تیم اتریش‌نشین می‌تواند در جستجوی آگهی مناسب، ترجمه آلمانی، ترتیب حمل‌ونقل
              و حتی معرفی فروشندگان فارسی‌زبان همراه شما باشد. برای مشاوره رایگان اولین قدم را بردارید.
            </p>
            <div className="flex gap-3 justify-center flex-wrap pt-1">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                مشاوره در واتس‌اپ
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-black text-xs px-6 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <Send className="w-4 h-4" />
                پشتیبانی تلگرام
              </a>
            </div>
          </div>
        </motion.div>

        {/* ==================== Disclaimer ==================== */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              قیمت‌های ارائه‌شده تخمینی و بر پایه میانگین آگهی‌های Willhaben در سال جاری است.
              قیمت‌ها بسته به منطقه، برند و وضعیت کالا متفاوت است. برای راهنمای امنیتی کامل
              خرید، به بخش «امنیت Willhaben» و برای استفاده عمومی از پلتفرم، به بخش «راهنمای
              جامع Willhaben» مراجعه کنید.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WillhabenFurnitureGuide;