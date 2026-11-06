import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, CheckCircle2, ChevronDown, HelpCircle, ArrowLeft,
  Star, MessageCircle, Send, AlertTriangle, TrendingUp, Users,
  Package, ShoppingCart, Tag, Camera, Image as ImageIcon, Eye,
  Clock, Zap, Info, Search, Filter, Heart, Bookmark, Grid3x3,
  List, BarChart3, Coins, Target, Award, Megaphone, Mail, Phone,
  FileText, ThumbsUp, Gauge, Calculator, Lightbulb, Palette,
  Hash, Percent, TrendingDown, BadgeCheck, Rocket, Handshake
} from "lucide-react";
import SEO from "./SEO";
import AustriaHousingGuide from "./AustriaHousingGuide";

/* ============================================================
   تصاویر ویژه — Unsplash
============================================================ */
const IMG_HERO =
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80";
// خرید آنلاین از موبایل
const IMG_PHOTO =
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1000&q=80";
// عکس‌برداری حرفه‌ای از محصول
const IMG_MARKET =
  "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1000&q=80";
// بازار و خرید

/* ============================================================
   آمار کلیدی Willhaben
============================================================ */
const STATS = [
  { icon: Package, v: "۹M+", l: "آگهی فعال در اتریش" },
  { icon: Users, v: "۴.۵M", l: "کاربر ماهانه" },
  { icon: Tag, v: "۱۵۰+", l: "دسته‌بندی کالا" },
  { icon: TrendingUp, v: "۲ دقیقه", l: "میانگین زمان اولین تماس" },
];

/* ============================================================
   دسته‌بندی‌های اصلی Willhaben
============================================================ */
const CATEGORIES = [
  {
    icon: Package,
    name: "Marktplatz",
    farsi: "بازار عمومی کالا",
    desc: "بزرگ‌ترین بخش Willhaben: الکترونیک، مبلمان، لباس، اسباب‌بازی و هر چیز دیگر.",
    color: "from-amber-500 to-orange-600",
    badge: "پرترافیک‌ترین",
    tips: ["برچسب قیمت (Festpreis) یا تخفیف‌پذیر (VB) مشخص کنید", "برای کالاهای زیر ۵۰€ انتظار تخفیف نداشته باشید"],
  },
  {
    icon: Grid3x3,
    name: "Immobilien",
    farsi: "املاک و مسکن",
    desc: "اجاره آپارتمان، خرید خانه، دفتر کار، زمین و پارکینگ در سراسر اتریش.",
    color: "from-blue-500 to-indigo-600",
    badge: "بالاترین ارزش",
    tips: ["حتماً آگهی معتبر با عکس واقعی", "هرگز بدون بازدید ودیعه نپردازید"],
  },
  {
    icon: Gauge,
    name: "Auto & Motor",
    farsi: "خودرو و موتورسیکلت",
    desc: "خرید و فروش خودرو، موتور، قطعات یدکی و لوازم جانبی در اتریش.",
    color: "from-rose-500 to-red-600",
    badge: "پرریسک‌ترین",
    tips: ["بررسی VIN و Pickerl معتبر §57a", "همیشه بازدید حضوری و تست رانندگی"],
  },
  {
    icon: ShoppingCart,
    name: "Jobs",
    farsi: "فرصت‌های شغلی",
    desc: "آگهی‌های استخدام تمام‌وقت، پاره‌وقت و فریلنسری در اتریش.",
    color: "from-emerald-500 to-teal-600",
    badge: "رایگان",
    tips: ["CV آلمانی فرمت اتریشی", "Bewerbungsschreiben اختصاصی برای هر موقعیت"],
  },
  {
    icon: Heart,
    name: "Tiere",
    farsi: "حیوانات خانگی",
    desc: "پذیرش، واگذاری و خدمات مرتبط با حیوانات خانگی و دامپزشکی.",
    color: "from-fuchsia-500 to-purple-600",
    badge: "فرهنگی",
    tips: ["پرونده سلامت حیوان را بررسی کنید", "تست اخلاقی مالک قبلی"],
  },
  {
    icon: Handshake,
    name: "Dienstleistungen",
    farsi: "خدمات و تخصص‌ها",
    desc: "خدمات خانه، تعمیرات، آموزش، طراحی و مشاوره حرفه‌ای.",
    color: "from-cyan-500 to-blue-600",
    badge: "محلی",
    tips: ["امتیازات و نظرات را بخوانید", "برای خدمات گران، قرارداد کتبی ببندید"],
  },
];

/* ============================================================
   دیکشنری اصطلاحات Willhaben
============================================================ */
const TERMS = [
  {
    term: "Willhaben",
    pronounce: "ویل‌هابن",
    meaning: "بزرگ‌ترین بازار آنلاین اتریش، معادل eBay در آلمان یا دیوار در ایران",
    category: "general",
    example: "Ich habe mein Fahrrad auf Willhaben verkauft.",
    exampleFa: "دوچرخه‌ام را در Willhaben فروختم.",
  },
  {
    term: "Festpreis",
    pronounce: "فست‌پرایس",
    meaning: "قیمت ثابت — تخفیف نمی‌پذیرد و فروشنده روی قیمت مشخص‌شده پافشاری می‌کند.",
    category: "pricing",
    example: "Festpreis: 150 Euro, keine Verhandlung.",
    exampleFa: "قیمت ثابت: ۱۵۰ یورو، چانه‌زنی نمی‌شود.",
  },
  {
    term: "VB (Verhandlungsbasis)",
    pronounce: "فاو-بِ",
    meaning: "قیمت قابل مذاکره — می‌توانید تخفیف پیشنهاد دهید.",
    category: "pricing",
    example: "VB 200 Euro — Preis ist verhandelbar.",
    exampleFa: "قابل مذاکره از ۲۰۰ یورو — قیمت قابل چانه‌زنی است.",
  },
  {
    term: "Abholung",
    pronounce: "آپ‌هولونگ",
    meaning: "تحویل حضوری — خریدار برای دریافت کالا به آدرس فروشنده می‌رود.",
    category: "delivery",
    example: "Nur Abholung, kein Versand möglich.",
    exampleFa: "فقط حضوری، امکان ارسال وجود ندارد.",
  },
  {
    term: "Versand",
    pronounce: "فِرزاند",
    meaning: "ارسال پستی — فروشنده کالا را از طریق پست یا پیک ارسال می‌کند.",
    category: "delivery",
    example: "Versand per Post: 5 Euro extra.",
    exampleFa: "ارسال پستی: ۵ یورو اضافه.",
  },
  {
    term: "PayLivery",
    pronounce: "پِی‌لیوری",
    meaning: "سیستم پرداخت امن رسمی Willhaben با محافظت از خریدار و فروشنده.",
    category: "payment",
    example: "Bitte nur über PayLivery bezahlen.",
    exampleFa: "لطفاً فقط از طریق PayLivery پرداخت کنید.",
  },
  {
    term: "Reserviert",
    pronounce: "رِزِرویرت",
    meaning: "رزرو شده — کالا برای خریدار دیگری کنار گذاشته شده است.",
    category: "status",
    example: "Der Artikel ist bereits reserviert.",
    exampleFa: "این کالا قبلاً رزرو شده است.",
  },
  {
    term: "Zu verschenken",
    pronounce: "تسو فِر‌شِنکِن",
    meaning: "رایگان واگذار می‌شود — فروشنده کالا را بدون هزینه واگذار می‌کند.",
    category: "status",
    example: "Sofa zu verschenken, nur Abholung.",
    exampleFa: "مبل رایگان، فقط حضوری.",
  },
  {
    term: "Neuwertig",
    pronounce: "نوی‌ورتیش",
    meaning: "در حد نو — کالای استفاده‌شده اما با کیفیت بسیار نزدیک به نو.",
    category: "condition",
    example: "iPhone 14, neuwertig, kaum benutzt.",
    exampleFa: "آیفون ۱۴، در حد نو، کم استفاده شده.",
  },
  {
    term: "Verhandlungsgeschick",
    pronounce: "فِرهاندلونگس‌گِشیک",
    meaning: "مهارت مذاکره — توانایی چانه‌زنی مؤثر در معامله.",
    category: "skill",
    example: "Mit etwas Verhandlungsgeschick bekommt man 10-15% Rabatt.",
    exampleFa: "با کمی مهارت مذاکره، ۱۰-۱۵٪ تخفیف می‌گیرید.",
  },
  {
    term: "Bewertung",
    pronounce: "بِوِرتونگ",
    meaning: "امتیاز و نظر کاربران قبلی — معیار اصلی اعتبار فروشنده.",
    category: "trust",
    example: "Verkäufer mit 4.8 Bewertung und 25 Verkäufen.",
    exampleFa: "فروشنده با امتیاز ۴.۸ و ۲۵ معامله موفق.",
  },
  {
    term: "Angebot",
    pronounce: "آن‌گِبوت",
    meaning: "پیشنهاد قیمت — می‌توانید پیشنهاد قیمت پایین‌تر از قیمت اعلامی بدهید.",
    category: "pricing",
    example: "Ich mache Ihnen ein Angebot von 80 Euro.",
    exampleFa: "من به شما پیشنهاد ۸۰ یورو می‌دهم.",
  },
  {
    term: "Sofort-Kauf",
    pronounce: "زوفورت-کاوف",
    meaning: "خرید فوری — پرداخت مستقیم بدون مذاکره با فروشنده.",
    category: "payment",
    example: "Sofort-Kauf aktiviert, kein Verhandeln möglich.",
    exampleFa: "خرید فوری فعال است، چانه‌زنی امکان ندارد.",
  },
  {
    term: "Warenkorb",
    pronounce: "وارن‌کورب",
    meaning: "سبد خرید — سبدی که کالاهای انتخابی در آن ذخیره می‌شود.",
    category: "general",
    example: "Artikel in den Warenkorb legen.",
    exampleFa: "کالا را در سبد خرید قرار دهید.",
  },
  {
    term: "Nachricht",
    pronounce: "ناخ‌ریخت",
    meaning: "پیام — سیستم چت داخلی Willhaben برای ارتباط خریدار و فروشنده.",
    category: "communication",
    example: "Ich habe Ihnen eine Nachricht geschickt.",
    exampleFa: "من به شما پیامی فرستادم.",
  },
  {
    term: "Favoriten",
    pronounce: "فاوریتن",
    meaning: "لیست علاقه‌مندی‌ها — ذخیره آگهی‌ها برای بررسی بعدی.",
    category: "general",
    example: "Ich habe das Auto zu meinen Favoriten hinzugefügt.",
    exampleFa: "خودرو را به لیست علاقه‌مندی‌هایم اضافه کردم.",
  },
];

const TERM_CATEGORIES = [
  { id: "all", name: "🌸 همه اصطلاحات", color: "from-stone-500 to-stone-700" },
  { id: "general", name: "📦 عمومی", color: "from-slate-500 to-slate-700" },
  { id: "pricing", name: "💰 قیمت‌گذاری", color: "from-amber-500 to-orange-600" },
  { id: "delivery", name: "🚚 ارسال و تحویل", color: "from-blue-500 to-indigo-600" },
  { id: "payment", name: "💳 پرداخت", color: "from-emerald-500 to-teal-600" },
  { id: "status", name: "🏷️ وضعیت آگهی", color: "from-purple-500 to-fuchsia-600" },
  { id: "condition", name: "⭐ کیفیت کالا", color: "from-rose-500 to-red-600" },
  { id: "trust", name: "🛡️ اعتبار و امتیاز", color: "from-cyan-500 to-blue-600" },
  { id: "communication", name: "💬 ارتباط", color: "from-pink-500 to-rose-600" },
  { id: "skill", name: "🎯 مهارت", color: "from-green-500 to-emerald-600" },
];

/* ============================================================
   راهنمای عکس‌برداری حرفه‌ای
============================================================ */
const PHOTO_TIPS = [
  {
    icon: Palette,
    title: "پس‌زمینه ساده و روشن",
    desc: "کالا را روی سطح سفید یا خاکستری روشن قرار دهید. پس‌زمینه شلوغ، توجه خریدار را پرت می‌کند.",
    score: "۲۵٪ افزایش بازدید",
  },
  {
    icon: ImageIcon,
    title: "حداقل ۵ عکس از زوایای مختلف",
    desc: "جلو، عقب، دو طرف، بالا، پایین و جزئیات. عکس بیشتر = اعتماد بیشتر.",
    score: "۴۰٪ افزایش تماس",
  },
  {
    icon: Lightbulb,
    title: "نور طبیعی غیرمستقیم",
    desc: "کنار پنجره با نور روز عکس بگیرید. فلش مستقیم، سایه‌های زشت ایجاد می‌کند.",
    score: "کیفیت حرفه‌ای",
  },
  {
    icon: Eye,
    title: "نمایش عیوب (Ehrlichkeit)",
    desc: "خط و خش، خرابی و ایرادات را در عکس نشان دهید. پنهان کردن، منجر به بازگشت کالا می‌شود.",
    score: "اعتماد پایدار",
  },
  {
    icon: Camera,
    title: "فوکوس دقیق و زوم",
    desc: "جزئیات مهم مثل شماره سریال، برچسب برند و مشخصات فنی را در عکس جداگانه نشان دهید.",
    score: "کاهش سؤالات",
  },
  {
    icon: Hash,
    title: "ابعاد و مقیاس (Maßstab)",
    desc: "کنار کالا یک خط‌کش یا وسیله آشنا (سکه، دست) قرار دهید تا ابعاد واقعی مشخص شود.",
    score: "افزایش نرخ فروش",
  },
];

/* ============================================================
   ۵ گام فروش موفق در Willhaben
============================================================ */
const STEPS = [
  {
    icon: FileText,
    t: "عنوان هوشمند آگهی",
    d: "برند + مدل + وضعیت + کلیدواژه در ۵۰ کاراکتر. مثال: «iPhone 13 Pro 128GB, neuwertig, OVP»",
  },
  {
    icon: Camera,
    t: "عکس‌برداری حرفه‌ای",
    d: "حداقل ۵ عکس روشن از زوایای مختلف با پس‌زمینه ساده و نور طبیعی.",
  },
  {
    icon: Coins,
    t: "قیمت‌گذاری رقابتی",
    d: "قیمت کالاهای مشابه را در Willhaben جست‌وجو کنید و ۱۰-۱۵٪ پایین‌تر از میانگین قیمت بگذارید.",
  },
  {
    icon: MessageCircle,
    t: "پاسخ‌دهی سریع و محترمانه",
    d: "در کمتر از ۱ ساعت پاسخ دهید. لحن مؤدبانه و آلمانی روان، اعتماد می‌سازد.",
  },
  {
    icon: Award,
    t: "ارزیابی و امتیاز",
    d: "پس از معامله موفق، از خریدار بخواهید به شما امتیاز دهد. امتیاز بالا = فروش سریع‌تر.",
  },
];

/* ============================================================
   سوالات متداول
============================================================ */
const FAQS = [
  {
    q: "Willhaben چیست و چطور کار می‌کند؟",
    a: "Willhaben بزرگ‌ترین پلتفرم بازار آنلاین اتریش با بیش از ۹ میلیون آگهی فعال است. این پلتفرم امکان خرید و فروش کالا، خودرو، ملک و حتی پیدا کردن شغل و حیوان خانگی را فراهم می‌کند. برای شروع، باید یک حساب کاربری رایگان بسازید و آگهی خود را منتشر کنید. ثبت آگهی در Willhaben برای افراد خصوصی رایگان است.",
  },
  {
    q: "آیا ثبت آگهی در Willhaben رایگان است؟",
    a: "بله، ثبت آگهی برای افراد خصوصی (Privatverkäufer) کاملاً رایگان است. اما برای فروشندگان تجاری (Gewerblich) و آگهی‌های ویژه با نمایش برجسته‌تر، هزینه‌هایی وجود دارد. برای فروشندگان خصوصی، محدودیتی در تعداد آگهی‌ها وجود ندارد اما هر آگهی پس از ۳۰ روز به‌طور خودکار منقضی می‌شود.",
  },
  {
    q: "چطور یک آگهی موفق در Willhaben بسازم؟",
    a: "پنج عنصر کلیدی: ۱) عنوان هوشمند با برند، مدل و وضعیت. ۲) حداقل ۵ عکس حرفه‌ای با نور طبیعی. ۳) توضیحات کامل با ابعاد، عیوب و مشخصات فنی. ۴) قیمت رقابتی ۱۰-۱۵٪ زیر میانگین بازار. ۵) پاسخ‌دهی سریع به پیام‌ها در کمتر از ۱ ساعت. رعایت این ۵ اصل، شانس فروش سریع را ۳ برابر می‌کند.",
  },
  {
    q: "چطور قیمت مناسب برای کالایم تعیین کنم؟",
    a: "سه گام: ۱) کالای مشابه را در Willhaben جست‌وجو کنید و قیمت‌های مشابه را ببینید. ۲) قیمت میانگین را محاسبه کنید و ۱۰-۱۵٪ پایین‌تر بگذارید تا رقابتی باشد. ۳) برای کالاهای خاص یا کمیاب، از پلتفرم‌های بین‌المللی (eBay, Amazon) هم قیمت مرجع بگیرید. نکته: همیشه قیمت فروش نهایی را کمی بالاتر از هدف بگذارید تا فضای مذاکره داشته باشید.",
  },
  {
    q: "چطور آگهی‌ام را ویرایش یا حذف کنم؟",
    a: "پس از ورود به حساب کاربری، به بخش «Meine Anzeigen» بروید. هر آگهی گزینه‌های ویرایش (Bearbeiten) و حذف (Löschen) دارد. برای تغییر قیمت یا توضیحات، روی Bearbeiten کلیک کنید. برای حذف آگهی پس از فروش، بهتر است وضعیت آن را به «Verkauft» تغییر دهید — این کار اعتبار فروشنده را بالا می‌برد.",
  },
  {
    q: "آیا Willhaben در تمام اتریش فعال است؟",
    a: "بله، Willhaben در تمام ۹ ایالت اتریش فعال است. اما بیشترین حجم آگهی و ترافیک در وین (Wien), نیدراسترایش (Niederösterreich) و اوبراسترایش (Oberösterreich) است. برای خریداران در شهرهای کوچک، معمولاً گزینه ارسال پستی (Versand) یا انتخاب آگهی‌های نزدیک توصیه می‌شود.",
  },
  {
    q: "چطور بفهمم فروشنده معتبر است؟",
    a: "پنج معیار اعتبار: ۱) تاریخ عضویت — حداقل ۶ ماه. ۲) امتیاز (Bewertung) — بالای ۴ از ۵. ۳) تعداد معاملات موفق — حداقل ۵ مورد. ۴) پاسخ‌دهی سریع و محترمانه در چت. ۵) توضیحات دقیق آگهی و عکس‌های باکیفیت. اگر هر یک از این معیارها ضعیف بود، احتیاط کنید — برای راهنمای کامل امنیتی، به راهنمای امنیت Willhaben مراجعه کنید.",
  },
];

/* ============================================================
   کامپوننت اصلی
============================================================ */
const WillhabenGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTermCat, setActiveTermCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ماشین‌حساب قیمت‌گذاری */
  const [purchasePrice, setPurchasePrice] = useState<string>("500");
  const [condition, setCondition] = useState<string>("90");
  const [age, setAge] = useState<string>("2");

  const pricing = useMemo(() => {
    const pp = parseFloat(purchasePrice);
    const cond = parseFloat(condition) / 100;
    const years = parseFloat(age);
    if (isNaN(pp) || isNaN(cond) || isNaN(years)) return null;

    // افت ارزش سالانه ۱۵٪
    const depreciation = Math.pow(0.85, years);
    const conditionMultiplier = 0.5 + cond * 0.5;
    const basePrice = pp * depreciation * conditionMultiplier;

    // پیشنهاد قیمت آگهی (۱۵٪ بالاتر از هدف نهایی)
    const listingPrice = Math.round(basePrice * 1.15 / 5) * 5;
    const fairPrice = Math.round(basePrice / 5) * 5;
    const quickSale = Math.round(basePrice * 0.85 / 5) * 5;

    return {
      listingPrice,
      fairPrice,
      quickSale,
      depreciation: Math.round((1 - depreciation) * 100),
    };
  }, [purchasePrice, condition, age]);

  /* فیلتر دیکشنری اصطلاحات */
  const filteredTerms = useMemo(() => {
    return TERMS.filter((t) => {
      const matchesCat = activeTermCat === "all" || t.category === activeTermCat;
      const matchesSearch =
        !searchQuery ||
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.meaning.includes(searchQuery) ||
        t.example.toLowerCase().includes(searchQuery.toLowerCase());
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
          name: "راهنمای جامع خرید و فروش در Willhaben اتریش",
          description:
            "راهنمای گام‌به‌گام استفاده از پلتفرم Willhaben اتریش شامل ساخت آگهی، قیمت‌گذاری، عکس‌برداری حرفه‌ای و ارتباط با خریدار.",
          totalTime: "PT20M",
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
          "@type": "SoftwareApplication",
          name: "Willhaben",
          applicationCategory: "ShoppingApplication",
          operatingSystem: "Web, iOS, Android",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            ratingCount: "50000",
            bestRating: "5",
          },
        },
        {
          "@type": "WebPage",
          name: "راهنمای جامع Willhaben",
          description:
            "آموزش کامل خرید و فروش در Willhaben اتریش برای فارسی‌زبانان: اصطلاحات، قیمت‌گذاری، عکس‌برداری و نکات طلایی.",
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
            { "@type": "ListItem", position: 2, name: "خرید و فروش", item: "https://otrish-iran.ir/marketplace" },
            { "@type": "ListItem", position: 3, name: "Willhaben" },
          ],
        },
      ],
    }),
    []
  );

  return (
    <>
      <SEO
        title="راهنمای جامع Willhaben اتریش ۲۰۲۶ | خرید، فروش، اصطلاحات و قیمت‌گذاری هوشمند"
        description="راهنمای کامل Willhaben برای فارسی‌زبانان: ساخت آگهی حرفه‌ای، قیمت‌گذاری هوشمند، دیکشنری ۱۶ اصطلاح کلیدی آلمانی، عکس‌برداری موفق و ۶ دسته‌بندی اصلی. به‌همراه ماشین‌حساب قیمت."
        keywords="Willhaben فارسی, خرید از Willhaben, فروش در Willhaben, Willhaben اتریش, قیمت گذاری Willhaben, اصطلاحات Willhaben, Willhaben guide, Festpreis, Verhandlungsbasis, PayLivery"
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
        id="willhaben-guide"
      >
        {/* ==================== AUSTRIAN HOUSING GUIDE (COMPREHENSIVE) ==================== */}
        <section aria-label="راهنمای جامع مسکن در اتریش ۲۰۲۶">
          <AustriaHousingGuide />
        </section>

        {/* ==================== HERO ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[36px] border border-amber-200 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 md:p-12 space-y-5">
              <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-[10px] font-black px-3 py-1.5 border border-amber-100 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                WILLHABEN · ÖSTERREICHS MARKTPLATZ #1
              </span>

              <h1 className="font-black text-stone-900 text-2xl md:text-4xl leading-tight">
                <span className="text-[#c8102e]">۹ میلیون آگهی فعال — ولی ۹۹٪ فارسی‌زبانان</span> از Willhaben درست استفاده نمی‌کنند
              </h1>

              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-bold">
                Willhaben بزرگ‌ترین بازار آنلاین اتریش است که ۴.۵ میلیون کاربر فعال دارد. اما
                بسیاری از فارسی‌زبانان به دلیل <strong>ناآشنایی با اصطلاحات آلمانی</strong> (مثل
                Festpreis، VB، PayLivery) و <strong>نبود راهنمای فارسی</strong>، نمی‌توانند از
                این پلتفرم به‌طور مؤثر استفاده کنند. <span className="text-[#c8102e]">در این راهنما، ۱۶ اصطلاح کلیدی، ۶ دسته‌بندی و ۵ گام فروش موفق را یاد می‌گیرید.</span>
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: CheckCircle2, t: "۱۰۰٪ رایگان" },
                  { icon: Bookmark, t: "۱۶ اصطلاح کلیدی" },
                  { icon: Calculator, t: "ماشین‌حساب قیمت" },
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
                  href="#pricing-calculator"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  محاسبه قیمت فروش
                </a>
                <a
                  href="#terms-dictionary"
                  className="inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-amber-400 text-stone-700 text-xs font-black px-5 py-3 rounded-2xl transition"
                >
                  <Bookmark className="w-4 h-4" />
                  دیکشنری اصطلاحات
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px]">
              <img
                src={IMG_HERO}
                alt="خرید و فروش آنلاین در Willhaben اتریش - راهنمای فارسی‌زبانان"
                loading="lazy"
                width={1400}
                height={900}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/60 lg:to-white" />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-[10px] font-black text-stone-500 mb-0.5">آگهی فعال در اتریش</div>
                <div className="text-xl font-black text-[#c8102e]">۹M+</div>
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

        {/* ==================== ۶ دسته‌بندی اصلی ==================== */}
        <div>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <span className="inline-block text-[10px] bg-amber-100 text-amber-700 font-black px-3 py-1 rounded-full mb-2">
              <Grid3x3 className="w-3 h-3 inline ml-1" />
              KATEGORIEN
            </span>
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Package className="w-5 h-5 text-[#c8102e]" />
              ۶ دسته‌بندی اصلی Willhaben را بشناسید
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1 leading-relaxed">
              هر دسته، قوانین، مزایا و چالش‌های خاص خود را دارد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="relative bg-white rounded-3xl border border-stone-200 p-5 overflow-hidden group hover:shadow-lg hover:border-amber-300 transition-all"
                >
                  <div
                    className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-[0.08] rounded-full`}
                  />

                  <span className={`absolute top-3 left-3 text-[9px] font-black bg-gradient-to-r ${cat.color} text-white px-2.5 py-1 rounded-full shadow-sm`}>
                    {cat.badge}
                  </span>

                  <div className="relative flex items-start gap-3 mb-3 pt-5">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-stone-900 leading-snug">
                        {cat.farsi}
                      </h3>
                      <span className="text-[10px] font-black text-stone-500 font-mono" dir="ltr">
                        {cat.name}
                      </span>
                    </div>
                  </div>

                  <p className="relative text-[10.5px] text-stone-500 font-bold leading-relaxed mb-3">
                    {cat.desc}
                  </p>

                  <div className="relative bg-stone-50 rounded-xl p-2.5 border border-stone-100">
                    <div className="text-[9px] font-black text-stone-700 mb-1.5 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-amber-500" />
                      نکات طلایی:
                    </div>
                    <ul className="space-y-1">
                      {cat.tips.map((tip, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-1.5 text-[9.5px] font-bold text-stone-600"
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

        {/* ==================== ماشین‌حساب قیمت‌گذاری ==================== */}
        <motion.div
          id="pricing-calculator"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 via-orange-50/40 to-emerald-50/40 border border-amber-200 rounded-3xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-600" />
                ماشین‌حساب قیمت فروش هوشمند
              </h2>
              <p className="text-xs text-stone-600 font-bold leading-relaxed">
                بر اساس قیمت اولیه، سن و وضعیت کالا، قیمت بهینه فروش را محاسبه کنید.
                این ماشین‌حساب بر پایه فرمول افت ارزش (Depreciation) و ضریب وضعیت اتریشی طراحی شده.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-black text-stone-700 mb-1">
                    قیمت اولیه خرید کالا (€):
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      placeholder="500"
                      className="w-full bg-white border border-stone-200 p-3 pr-10 rounded-xl text-sm font-mono text-left outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-400">
                      €
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-700 mb-1">
                    وضعیت کالا: <span className="text-amber-700">{condition}%</span>
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-bold text-stone-500 mt-1">
                    <span>استفاده‌شده</span>
                    <span>در حد نو</span>
                    <span>نو (OVP)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-700 mb-1">
                    سن کالا (سال):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="2"
                    className="w-full bg-white border border-stone-200 p-3 rounded-xl text-sm font-mono text-left outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {pricing && (
                  <motion.div
                    key={`${purchasePrice}-${condition}-${age}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="bg-white rounded-2xl p-4 border-2 border-amber-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-black text-stone-700">
                          پیشنهاد قیمت آگهی (با فضای مذاکره)
                        </span>
                        <TrendingDown className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="text-3xl font-black text-amber-700 text-right" dir="ltr">
                        {pricing.listingPrice.toLocaleString("fa-IR")} €
                      </div>
                      <p className="text-[10px] font-bold text-stone-500 mt-1">
                        افت ارزش تخمینی: {pricing.depreciation}٪ در مدت {age} سال
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-2xl p-4 border-2 border-emerald-200">
                        <div className="text-[10px] font-black text-stone-500 mb-1">
                          قیمت منصفانه (میانگین)
                        </div>
                        <div className="text-xl font-black text-emerald-700" dir="ltr">
                          {pricing.fairPrice.toLocaleString("fa-IR")} €
                        </div>
                      </div>
                      <div className="bg-white rounded-2xl p-4 border-2 border-rose-200">
                        <div className="text-[10px] font-black text-stone-500 mb-1">
                          قیمت فروش سریع (تخفیفی)
                        </div>
                        <div className="text-xl font-black text-rose-700" dir="ltr">
                          {pricing.quickSale.toLocaleString("fa-IR")} €
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-stone-200">
                      <div className="text-[11px] font-black text-stone-700 mb-2 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        راهبرد قیمت‌گذاری:
                      </div>
                      <p className="text-[10.5px] font-bold text-stone-600 leading-relaxed">
                        قیمت آگهی را کمی بالاتر از قیمت منصفانه بگذارید تا فضای مذاکره داشته باشید.
                        اگر خریدار فوری می‌خواهید، قیمت فروش سریع را انتخاب کنید. برای کالاهای خاص،
                        از قیمت منصفانه استفاده کنید.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ==================== تصویر + عکس‌برداری ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[320px]">
            <img
              src={IMG_PHOTO}
              alt="عکس‌برداری حرفه‌ای از محصول برای آگهی Willhaben - نکات نور و پس‌زمینه"
              loading="lazy"
              width={1000}
              height={700}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 text-white">
              <div className="text-[10px] font-black opacity-80 mb-1">PROFI-FOTOGRAFIE</div>
              <div className="text-base font-black">عکس حرفه‌ای = فروش سریع</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#c8102e]" />
              ۶ نکته طلایی عکس‌برداری حرفه‌ای
            </h2>
            <p className="text-xs text-stone-600 font-bold leading-relaxed">
              آگهی‌های دارای عکس باکیفیت، <strong>۲.۵ برابر</strong> بیشتر از آگهی‌های بدون عکس
              یا با عکس ضعیف، بازدید می‌شوند. رعایت این ۶ نکته، شما را از ۹۰٪ فروشندگان متمایز می‌کند.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PHOTO_TIPS.map((tip, i) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-2xl border border-stone-200 p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[11px] font-black text-stone-900 leading-snug">
                          {tip.title}
                        </h3>
                        <span className="text-[9px] font-black bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full inline-block mt-1">
                          {tip.score}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-stone-500 font-bold leading-relaxed">
                      {tip.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==================== ۵ گام فروش موفق ==================== */}
        <div>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <span className="inline-block text-[10px] bg-emerald-100 text-emerald-700 font-black px-3 py-1 rounded-full mb-2">
              <Rocket className="w-3 h-3 inline ml-1" />
              VERKAUFS-PROZESS
            </span>
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Megaphone className="w-5 h-5 text-[#c8102e]" />
              ۵ گام فروش موفق در Willhaben
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1 leading-relaxed">
              از ساخت آگهی تا دریافت امتیاز — همه چیز در کمتر از ۲۴ ساعت
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

        {/* ==================== دیکشنری اصطلاحات Willhaben ==================== */}
        <div id="terms-dictionary">
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <span className="inline-block text-[10px] bg-blue-100 text-blue-700 font-black px-3 py-1 rounded-full mb-2">
              <Bookmark className="w-3 h-3 inline ml-1" />
              GLOSSAR · 16 BEGRIFFE
            </span>
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Search className="w-5 h-5 text-[#c8102e]" />
              دیکشنری ۱۶ اصطلاح کلیدی Willhaben
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1 leading-relaxed">
              هر اصطلاح با معنی فارسی، تلفظ، مثال آلمانی و ترجمه — همه چیز برای معامله موفق
            </p>
          </div>

          {/* Search + Category Filter */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
            <div className="md:col-span-5 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 جستجوی اصطلاح (آلمانی یا فارسی)..."
                className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 font-bold transition"
              />
            </div>

            <div className="md:col-span-12 lg:col-span-7 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {TERM_CATEGORIES.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTermCat(tab.id)}
                  className={`px-3 py-2 rounded-xl border text-[11px] font-black shrink-0 transition-all cursor-pointer ${
                    activeTermCat === tab.id
                      ? `bg-gradient-to-br ${tab.color} border-transparent text-white shadow-md scale-105`
                      : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <div className="text-[11px] font-bold text-stone-500 text-right mb-3">
            نمایش <span className="font-black text-[#c8102e]">{filteredTerms.length}</span> اصطلاح از{" "}
            {TERMS.length} اصطلاح کلیدی
          </div>

          {/* Grid */}
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
                  className="relative bg-white rounded-2xl border border-stone-200 p-5 overflow-hidden shadow-sm hover:shadow-lg hover:border-amber-300 transition-all"
                >
                  <div className="absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-br from-amber-500 to-orange-600 opacity-[0.04] rounded-full" />

                  <div className="relative space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-[9px] font-black bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                        {TERM_CATEGORIES.find((c) => c.id === term.category)?.name || term.category}
                      </span>
                      <Hash className="w-4 h-4 text-stone-300" />
                    </div>

                    <div>
                      <h3
                        className="font-black text-stone-900 text-base font-mono leading-tight"
                        dir="ltr"
                      >
                        {term.term}
                      </h3>
                      <p className="text-[10px] text-amber-700 font-black mt-0.5">
                        تلفظ: {term.pronounce}
                      </p>
                    </div>

                    <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                      <p className="text-[11px] font-bold text-stone-700 leading-relaxed">
                        {term.meaning}
                      </p>
                    </div>

                    <div
                      className="text-left bg-stone-50 p-2.5 rounded-lg border border-stone-100"
                      dir="ltr"
                    >
                      <p className="text-[10.5px] font-bold text-stone-700 italic">
                        "{term.example}"
                      </p>
                    </div>

                    <div className="text-[10px] font-bold text-stone-500">
                      <span className="text-emerald-600">ترجمه:</span> {term.exampleFa}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center p-8 text-stone-400 text-xs font-bold bg-stone-50/50 border border-stone-200 rounded-2xl">
                اصطلاحی مطابق با فیلتر شما یافت نشد. عبارت دیگری وارد کنید.
              </div>
            )}
          </div>
        </div>

        {/* ==================== تصویر سوم + نکته طلایی ==================== */}
        <div className="relative rounded-3xl overflow-hidden min-h-[240px] md:min-h-[300px]">
          <img
            src={IMG_MARKET}
            alt="بازار خرید و فروش Willhaben اتریش - فرصت‌های معاملاتی فارسی‌زبانان"
            loading="lazy"
            width={1000}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a1128]/92 via-[#0a1128]/70 to-transparent" />
          <div className="relative p-8 md:p-12 max-w-xl text-white">
            <span className="inline-flex items-center gap-2 bg-amber-500/25 border border-amber-400/40 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              نکته طلایی
            </span>
            <h3 className="text-xl md:text-2xl font-black mb-3 leading-snug">
              عنوان آگهی، ۵۰٪ موفقیت فروش شما را تعیین می‌کند
            </h3>
            <p className="text-xs md:text-sm text-stone-200 font-bold leading-relaxed">
              جستجوی Willhaben بر اساس کلمات کلیدی کار می‌کند. بهترین فرمول عنوان:
              <strong> برند + مدل + ظرفیت + وضعیت + OVP</strong>. مثلاً به‌جای «گوشی موبایل»,
              بنویسید «iPhone 13 Pro 128GB, neuwertig, OVP, Rechnung vorhanden». این کار
              شانس دیده‌شدن شما را تا ۳ برابر افزایش می‌دهد.
            </p>
          </div>
        </div>

        {/* ==================== FAQ ==================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره Willhaben
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
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              کمک تخصصی Willhaben
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              کمک می‌خواهید در خرید یا فروش از Willhaben؟
            </h2>
            <p className="text-sm text-stone-300 font-bold leading-relaxed">
              تیم اتریش‌نشین می‌تواند در ساخت آگهی، ترجمه آلمانی، قیمت‌گذاری هوشمند و ارتباط
              با خریدار یا فروشنده همراه شما باشد. برای مشاوره رایگان اولین قدم را بردارید.
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
              این راهنما بر پایه اطلاعات عمومی و تجربه کاربران تهیه شده و جایگزین شرایط رسمی
              Willhaben نیست. شرایط، قوانین و کارمزدها ممکن است تغییر کنند. برای اطلاعات به‌روز،
              همیشه به پورتال رسمی{" "}
              <a
                href="https://www.willhaben.at"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                willhaben.at
              </a>{" "}
              مراجعه کنید. برای راهنمای امنیتی کامل، به بخش «امنیت Willhaben» مراجعه نمایید.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WillhabenGuide;