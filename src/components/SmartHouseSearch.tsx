import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Building, Search, MapPin, Coins, Calculator, ShieldCheck,
  ExternalLink, AlertCircle, Compass, Info, CheckCircle,
  HelpCircle, Home, TrendingUp, Users, Train, Trees, Award,
  Sparkles, Zap, Star, PhoneCall, Send, Heart, Euro, Clock,
  FileText, Key, Scale, Quote, BarChart3, Target, Percent,
  Wallet, Baby, GraduationCap, Landmark, Copy, RefreshCw,
  ChevronDown, ChevronLeft, Filter, Grid3x3, List, ArrowUpRight,
  Shield, Globe,
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";
import AustriaHousingGuide from "./AustriaHousingGuide";

// ==========================================
// IMAGES — Austria Housing & Architecture
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1548625361-195feee18a7c?auto=format&fit=crop&w=1600&q=80",
  apartment: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  contract: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  family: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
  vienna: "https://images.unsplash.com/photo-1583687355032-89b902b7335f?auto=format&fit=crop&w=1200&q=80",
  keys: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// TYPES
// ==========================================
interface DistrictInfo {
  number: number;
  name: string;
  sqmPrice: number;
  vibe: string;
  transit: string;
  pros: string;
  group: "inner" | "family" | "modern" | "green";
  score: number;
  safety: number;
  family: number;
}

// ==========================================
// DISTRICTS DATA — 23 Vienna Bezirke
// ==========================================
const DISTRICTS_DATA: DistrictInfo[] = [
  { number: 1, name: "Innere Stadt", sqmPrice: 22.4, vibe: "تاریخی، توریستی و مجلل", transit: "U1, U2, U3, U4", pros: "قلب وین، امنیت بی‌نظیر، دسترسی مطلق", group: "inner", score: 88, safety: 5, family: 3 },
  { number: 2, name: "Leopoldstadt", sqmPrice: 15.8, vibe: "جوان‌پسند، سبز و رو به رشد (نزدیک پراتر)", transit: "U1, U2", pros: "نزدیکی به پارک بزرگ پراتر، بافت دانشجویی", group: "inner", score: 82, safety: 4, family: 4 },
  { number: 3, name: "Landstraße", sqmPrice: 16.2, vibe: "دیپلماتیک، آرام و مسکونی شیک", transit: "U3, U4, S-Bahn", pros: "امنیت بالا، پر از سفارت‌خانه‌ها و مراکز خرید", group: "inner", score: 85, safety: 5, family: 4 },
  { number: 4, name: "Wieden", sqmPrice: 17.0, vibe: "فرهنگی، ترندی و نزدیک به دانشگاه صنعتی (TU)", transit: "U1, U4", pros: "کافه‌های باکلاس، اتمسفر بین‌المللی عالی", group: "inner", score: 86, safety: 5, family: 3 },
  { number: 5, name: "Margareten", sqmPrice: 14.9, vibe: "صنعتی قدیمی بازسازی‌شده، پرانرژی", transit: "U4 (و به زودی U5)", pros: "کرایه‌های مقرون به صرفه‌تر، گالری‌های هنری", group: "inner", score: 78, safety: 4, family: 3 },
  { number: 6, name: "Mariahilf", sqmPrice: 17.5, vibe: "خرید، شلوغ و پرنشاط (نزدیک Mariahilfer Straße)", transit: "U3, U4, U6", pros: "دسترسی عالی به مراکز خرید، رستوران‌ها و تئاتر", group: "inner", score: 84, safety: 5, family: 3 },
  { number: 7, name: "Neubau", sqmPrice: 18.0, vibe: "روشنفکری، بوبو (شیک-هیپستر)، خلاق", transit: "U2, U3, U6", pros: "کافه‌های ارگانیک، گالری‌ها، محله موزه‌ها (MQ)", group: "inner", score: 85, safety: 5, family: 3 },
  { number: 8, name: "Josefstadt", sqmPrice: 17.2, vibe: "آکادمیک، دنج، کوچک‌ترین منطقه وین", transit: "U2, U6", pros: "خیابان‌های سنگ‌فرش زیبا، بسیار دنج و آرام", group: "inner", score: 87, safety: 5, family: 3 },
  { number: 9, name: "Alsergrund", sqmPrice: 16.8, vibe: "پزشکی و دانشگاهی (نزدیک دانشگاه وین)", transit: "U4, U6", pros: "محله باکلاس، پر از دانشجو و مراکز درمانی معتبر", group: "inner", score: 86, safety: 5, family: 3 },
  { number: 10, name: "Favoriten", sqmPrice: 12.8, vibe: "چندفرهنگی، پرجمعیت و بسیار ارزان", transit: "U1, Hauptbahnhof", pros: "کمترین کرایه، دسترسی عالی به ایستگاه مرکزی قطار وین", group: "modern", score: 72, safety: 3, family: 3 },
  { number: 11, name: "Simmering", sqmPrice: 13.0, vibe: "صنعتی-مسکونی، حاشیه‌ای و آرام", transit: "U3", pros: "قیمت‌های ارزان، فروشگاه‌های زنجیره‌ای بزرگ", group: "modern", score: 74, safety: 3, family: 3 },
  { number: 12, name: "Meidling", sqmPrice: 13.9, vibe: "سنتی کارگری اتریشی، ادغام قومیتی خوب", transit: "U4, U6", pros: "دسترسی عالی به قصر شونبرون، قیمت‌های مناسب", group: "modern", score: 77, safety: 4, family: 3 },
  { number: 13, name: "Hietzing", sqmPrice: 18.5, vibe: "فوق‌العاده باکلاس، سرسبز و ویلایی مستقل", transit: "U4", pros: "بسیار آرام، خانه‌های اشرافی، مجاورت با قصر و باغ‌وحش شونبرون", group: "green", score: 90, safety: 5, family: 5 },
  { number: 14, name: "Penzing", sqmPrice: 14.5, vibe: "ترکیب شهر و جنگل، دنج و خانوادگی", transit: "U4, S-Bahn", pros: "طبیعت عالی و ریه‌های تنفسی غربی وین", group: "family", score: 79, safety: 4, family: 4 },
  { number: 15, name: "Rudolfsheim-Fünfhaus", sqmPrice: 13.5, vibe: "مهاجرنشین، ترندی و رو به پیشرفت سریع", transit: "U3, U6, Westbahnhof", pros: "کرایه‌های مقرون به صرفه، رستوران‌های قومی لذیذ", group: "modern", score: 70, safety: 3, family: 2 },
  { number: 16, name: "Ottakring", sqmPrice: 14.2, vibe: "پرانرژی، آبجوسازی سنتی، بازار هوشمانده", transit: "U3, U6", pros: "بازار فوق‌العاده برونن‌مارکت (پایین‌ترین قیمت تره‌بار)، حیات شبانه ترندی", group: "family", score: 75, safety: 3, family: 3 },
  { number: 17, name: "Hernals", sqmPrice: 14.6, vibe: "آرام، تپه‌ای، سنتی و سرسبز", transit: "ترامواها (و به زودی U5)", pros: "نزدیکی به جنگل‌های وین، محیط مناسب خانواده", group: "green", score: 80, safety: 4, family: 5 },
  { number: 18, name: "Währing", sqmPrice: 17.8, vibe: "اشرافی قدیمی، پارک‌های شگفت‌انگیز، بسیار تمیز", transit: "U6, ترامواها", pros: "کاتیج وین، لوکس و دنج، مناسب برای آرامش", group: "green", score: 84, safety: 5, family: 4 },
  { number: 19, name: "Döbling", sqmPrice: 19.2, vibe: "بورژوایی، تاکستان‌ها، تپه‌های کالمبرگ", transit: "U4, S45", pros: "مجلل‌ترین محله شمال وین، مناظر بی نظیر، هوای پاکیزه", group: "green", score: 91, safety: 5, family: 5 },
  { number: 20, name: "Brigittenau", sqmPrice: 14.0, vibe: "بین رودخانه‌ای (دانوب و کانال)، در حال توسعه", transit: "U6, S-Bahn", pros: "مسیرهای دوچرخه‌سواری عالی، قیمت‌های معقول کرایه", group: "modern", score: 73, safety: 3, family: 3 },
  { number: 21, name: "Floridsdorf", sqmPrice: 13.2, vibe: "حومه شهری بزرگ، خانوادگی، فرارودخانه‌ای", transit: "U6, S-Bahn", pros: "آپارتمان‌های نوساز بزرگ، طبیعت زیبا و آرام", group: "family", score: 78, safety: 4, family: 4 },
  { number: 22, name: "Donaustadt", sqmPrice: 14.8, vibe: "مدرن، جزیره دانوب، برج‌های سازمان ملل (VIC)", transit: "U1, U2", pros: "دریاچه‌های طبیعی برای شنا، زیرساخت نوساز و لوکس", group: "family", score: 82, safety: 4, family: 5 },
  { number: 23, name: "Liesing", sqmPrice: 13.8, vibe: "حومه دنج مسکونی-تجاری در جنوب وین", transit: "U6, S-Bahn", pros: "محیط آرام، فضاهای پارک آسان خودرو، قیمت معقول", group: "family", score: 81, safety: 5, family: 5 },
];

// ==========================================
// GROUP PRESETS
// ==========================================
const GROUPS = [
  { id: "all", label: "همه مناطق", icon: Grid3x3, color: "from-stone-600 to-stone-800", text: "text-stone-700" },
  { id: "inner", label: "مرکزی (۱-۹)", icon: Landmark, color: "from-[#c8102e] to-[#970d22]", text: "text-[#c8102e]" },
  { id: "modern", label: "مدرن و ارزان", icon: Building, color: "from-indigo-600 to-blue-700", text: "text-indigo-700" },
  { id: "family", label: "خانوادگی", icon: Baby, color: "from-emerald-600 to-teal-700", text: "text-emerald-700" },
  { id: "green", label: "سبز و لوکس", icon: Trees, color: "from-amber-500 to-orange-600", text: "text-amber-700" },
];

// ==========================================
// MARKETPLACES
// ==========================================
const MARKETPLACES = [
  {
    name: "Willhaben Immobilien",
    desc: "بزرگ‌ترین پلتفرم بدون واسطه اتریش برای رهن، اجاره و خرید ملک خصوصی. بیش از ۱۵۰,۰۰۰ آگهی فعال.",
    link: "https://www.willhaben.at/iad/immobilien",
    icon: Building,
    gradient: "from-sky-600 to-blue-700",
    recommended: true,
  },
  {
    name: "WG-Gesucht Wien",
    desc: "بهترین منبع برای یافتن اتاق‌های مشترک دانشجویی و هم‌خانه‌ای مقرون‌به‌صرفه در وین.",
    link: "https://www.wg-gesucht.de/wg-zimmer-in-Wien.163.0.1.0.html",
    icon: Users,
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    name: "ImmobilienScout24",
    desc: "بانک اطلاعاتی پیشرفته و موتور جستجوی هوشمند آژانس‌های معتبر مسکن اتریش و آلمان.",
    link: "https://www.immobilienscout24.at",
    icon: Search,
    gradient: "from-violet-600 to-purple-700",
  },
  {
    name: "Der Standard Immobilien",
    desc: "بخش املاک روزنامه معتبر Der Standard — آگهی‌های باکیفیت و اغلب بدون واسطه.",
    link: "https://immobilien.derstandard.at",
    icon: FileText,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Wiener Wohnen",
    desc: "پلتفرم رسمی مسکن اجتماعی شهرداری وین (Gemeindewohnung) — صف طولانی اما ارزان‌ترین گزینه.",
    link: "https://www.wienerwohnen.at",
    icon: Landmark,
    gradient: "from-rose-600 to-red-700",
  },
  {
    name: "Facebook Marketplace",
    desc: "گروه‌های فارسی‌زبان وین برای اجاره و معاوضه مسکن — مناسب برای یافتن آگهی‌های ایرانی.",
    link: "https://www.facebook.com/marketplace",
    icon: Users,
    gradient: "from-indigo-600 to-blue-700",
  },
];

// ==========================================
// CHECKLIST ITEMS
// ==========================================
const CHECKLIST = [
  { title: "۱. نوع قرارداد (Befristet vs. Unbefristet)", desc: "قراردادهای زمان‌دار (Befristet) قانوناً باید حداقل ۳ ساله تنظیم شوند. قراردادهای بدون محدودیت (Unbefristet) بهترین گزینه هستند زیرا صاحب‌خانه فقط با بهانه‌های قانونی سنگین می‌تواند شما را ملزم به ترک کند.", icon: FileText, color: "from-emerald-600 to-teal-700" },
  { title: "۲. حق فسخ پیش از موعد (Kündigungsrecht)", desc: "طبق قانون MRG، مستأجر بعد از گذشت ۱ سال از قرارداد زمان‌دار، حق فسخ آن با اطلاع قبلی ۳ ماهه (حداقل ۱۵ ماه ماندن) را دارد.", icon: Scale, color: "from-sky-600 to-blue-700" },
  { title: "۳. بررسی دقیق شارژ (Betriebskosten)", desc: "مطمئن شوید Betriebskosten (شارژ عمومی) در اجاره گنجانده شده باشد. گاز، برق و اینترنت جداگانه پرداخت می‌شوند.", icon: Wallet, color: "from-amber-500 to-orange-600" },
  { title: "۴. کمیسیون املاک (Provision)", desc: "از ژوئیه ۲۰۲۳، طبق قانون جدید اتریش، مستأجر موظف به پرداخت Provision نیست — این هزینه بر عهده صاحب‌خانه است.", icon: Euro, color: "from-rose-600 to-red-700" },
  { title: "۵. بازگشت سپرده (Kaution)", desc: "قبل از اسباب‌کشی، با صاحب‌خانه در تمام اتاق‌ها قدم بزنید و با عکس و Übergabeprotokoll تمام خرابی‌ها را مستند کنید تا در زمان خروج ادعای کسر Kaution نشود.", icon: Key, color: "from-violet-600 to-purple-700" },
  { title: "۶. بند افزایش خودکار اجاره (Indexklausel)", desc: "در اکثر قراردادهای اتریشی بندی برای تعدیل سالانه کرایه بر اساس نرخ تورم رسمی (VPI) وجود دارد — حتماً به آن دقت کنید.", icon: TrendingUp, color: "from-teal-600 to-cyan-700" },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "۹", label: "ایالت تحت پوشش", icon: MapPin },
  { value: "€۱۱.۷", label: "کمترین میانگین €/m² (Burgenland)", icon: Euro },
  { value: "€۲۲.۴", label: "بیشترین میانگین €/m² (Wien)", icon: TrendingUp },
  { value: "۳۰٪", label: "قاعده درآمد برای اجاره", icon: Percent },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  { q: "چند درصد از درآمد ماهانه برای اجاره در اتریش مناسب است؟", a: "مراجع رسمی اتریش، به‌ویژه MA 35 (اداره مهاجرت وین) برای تاییدیه اقامت، معمولاً اجاره را حداکثر تا ۳۰٪ از درآمد خالص ماهانه می‌پذیرند. برخی باجه‌ها تا ۴۰٪ را هم قبول می‌کنند اما این آستانه به‌شدت توصیه نمی‌شود. پس از کسر اجاره، باقی‌مانده درآمد شما باید حداقل برابر با نرخ معیشت فدرال (Ausgleichszulagenrichtsatz) باشد — در ۲۰۲۶ حدود €۱,۳۰۸ برای افراد مجرد و €۲,۰۶۴ برای زوج‌ها." },
  { q: "هزینه‌های پنهان در اجاره مسکن اتریش چیست؟", a: "علاوه بر اجاره سرد (Kaltmiete)، هزینه‌های زیر را در نظر بگیرید: ۱) Betriebskosten (شارژ عمومی) معمولاً €۱.۵-€۳ در متر مربع ۲) هزینه گرمایش و آب گرم (Heizung + Warmwasser) ۳) برق و گاز ۴) اینترنت و تلویزیون (GIS) ۵) Kaution (ودیعه ۳-۶ ماه) ۶) هزینه بنگاه املاک (اگر قدیمی باشد) ۷) مالیات بر درآمد اجاره و عوارض شهرداری. مجموعاً حدود ۳۰-۴۰٪ بیشتر از Kaltmiete می‌شود." },
  { q: "تفاوت بین Mietvertrag befristet و unbefristet چیست؟", a: "قرارداد Befristet (زمان‌دار) معمولاً بین ۳ تا ۵ سال است — پس از پایان آن، صاحب‌خانه می‌تواند قرارداد را تمدید نکند. قرارداد Unbefristet (بدون محدودیت) به شما امنیت بلندمدت می‌دهد و صاحب‌خانه فقط با دلایل قانونی مشخص (مثل تخریب ساختمان یا استفاده شخصی) می‌تواند قرارداد را فسخ کند. برای تمدید اقامت و وام مسکن، Unbefristet بهترین گزینه است." },
  { q: "آیا می‌توانم بدون اجاره‌نامه رسمی، Meldezettel بگیرم؟", a: "برای دریافت Meldezettel باید یک Wohnrechtsverhältnis (رابطه حقوقی مسکن) داشته باشید — یعنی یا قرارداد اجاره رسمی یا نامه‌ای از صاحب‌خانه اصلی. اگر با اجازه صاحب‌خانه اتاقی اجاره می‌کنید، یک «Untermietvertrag» یا نامه امضاشده از صاحب‌خانه اصلی کافی است. فرم Meldezettel باید توسط صاحب‌خانه یا مستأجر اصلی امضا شود." },
  { q: "چقدر طول می‌کشد تا در وین خانه پیدا کنم؟", a: "زمان یافتن خانه در وین به بودجه، منطقه و انتظارات شما بستگی دارد. برای آپارتمان با قیمت متوسط و در منطقه محبوب، معمولاً ۲ تا ۴ ماه زمان لازم است. برای مناطق ارزان‌تر (۱۰، ۱۱، ۱۵، ۲۰) ممکن است سریع‌تر یافت شود. توصیه می‌شود همزمان در چند پلتفرم ثبت‌نام کنید و در اسرع وقت به آگهی‌ها پاسخ دهید — آپارتمان‌های خوب معمولاً در ۲۴-۴۸ ساعت اول رزرو می‌شوند." },
  { q: "آیا ویلابین (Willhaben) امن است؟", a: "ویل‌هابن بزرگ‌ترین و معتبرترین پلتفرم آگهی اتریش است و اکثر آگهی‌ها توسط صاحبان واقعی یا بنگاه‌های رسمی ثبت می‌شوند. با این حال، کلاهبرداری‌های نادر ممکن است رخ دهد. توصیه‌های امنیتی: ۱) هرگز پیش‌پرداخت یا Kaution را قبل از بازدید و امضای قرارداد پرداخت نکنید ۲) صاحب‌خانه را حضوری ببینید ۳) از امضای قرارداد بدون خواندن آن خودداری کنید ۴) برای مبالغ بالا، از انتقال بانکی استفاده کنید نه پول نقد." },
  { q: "برای اجاره در وین چه مدارکی لازم است؟", a: "معمولاً این مدارک درخواست می‌شود: ۱) پاسپورت یا مدرک هویتی معتبر ۲) اثبات درآمد (فیش حقوقی ۳ ماه آخر یا قرارداد کار) ۳) Meldezettel فعلی ۴) سابقه پرداخت اجاره قبلی (اگر در اتریش بوده‌اید) ۵) برای دانشجویان: نامه پذیرش دانشگاه + اثبات تمکن مالی ۶) برای اتباع غیر-EU: کارت اقامت معتبر. آماده‌سازی این مدارک قبل از شروع جستجو سرعت شما را بسیار بالا می‌برد." },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function SmartHouseSearch() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(2200);
  const [coldRent, setColdRent] = useState<number>(600);
  const [activeSubTab, setActiveSubTab] = useState<"calculator" | "districts" | "checklist" | "links">("calculator");
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo>(DISTRICTS_DATA[9]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredDistricts = useMemo(() => {
    if (activeGroup === "all") return DISTRICTS_DATA;
    return DISTRICTS_DATA.filter((d) => d.group === activeGroup);
  }, [activeGroup]);

  // Calculations
  const calculatedMaxRent30 = Math.round(monthlyIncome * 0.3);
  const calculatedMaxRent40 = Math.round(monthlyIncome * 0.4);
  const estimatedKautionMin = coldRent * 3;
  const estimatedKautionMax = coldRent * 6;

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("لینک کپی شد! 🔗");
  };

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای جامع مسکن در اتریش ۲۰۲۶: قیمت‌ها، خوابگاه‌ها، خرید ملک و نقش اتریش‌نشین‌ها",
      description: "تحلیل کامل بازار اجاره مسکن در ۹ ایالت اتریش بر اساس ImmoScout24، لیست خوابگاه‌های دانشجویی All-inclusive، قوانین Grundverkehr برای اتباع ایرانی و نحوه ارائه تعهدنامه مسکن به سفارت.",
      inLanguage: "fa-IR",
      datePublished: "2026-01-15",
      dateModified: "2026-09-24",
      author: {
        "@type": "Organization",
        name: "اتریش‌نشین (Austrian Iranians Portal)",
        url: "https://iranianaustria.com",
      },
      publisher: {
        "@type": "Organization",
        name: "سوپراپلیکیشن اتریش‌نشین",
        logo: {
          "@type": "ImageObject",
          url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=600&q=80",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://iranianaustria.com/#housesearch",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "سامانه جستجوی هوشمند مسکن اتریش",
      description:
        "ابزار تعاملی رایگان برای محاسبه بودجه اجاره، آنالیز ۲۳ منطقه وین، چک‌لیست حقوقی قرارداد و معرفی پلتفرم‌های بدون واسطه مسکن اتریش.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "fa-IR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "مناطق مسکونی برای اجاره مسکن در اتریش",
      itemListElement: DISTRICTS_DATA.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${d.name} (Bezirk ${d.number})`,
        description: `${d.vibe} — میانگین اجاره: ${d.sqmPrice} یورو در متر مربع`,
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
        title="راهنمای جامع مسکن اتریش ۲۰۲۶ | قیمت اجاره، خوابگاه، خرید ملک و سفارت"
        description="راهنمای تخصصی مسکن اتریش: قیمت هر متر در ۹ ایالت، لیست خوابگاه‌های دانشجویی All-inclusive، قوانین خرید ملک اتباع ایرانی (Grundverkehr) و ارائه تعهدنامه مسکن به سفارت."
        keywords="مسکن اتریش, اجاره مسکن در اتریش, قیمت اجاره وین, خوابگاه دانشجویی اتریش, خرید ملک در اتریش, Grundverkehr ایرانیان, تعهدنامه مسکن سفارت اتریش, Wohnrechtsvereinbarung, اجاره خانه در گراتس و سالزبورگ, Richtwertmiete 2026, Meldezettel"
        schemaData={seoSchema}
      />

      <div className="space-y-8 font-sans" dir="rtl" id="smart-house-search-app">

        {/* ========================================== */}
        {/* COMPREHENSIVE HOUSING GUIDE & EMBASSY (NEW TOP SECTION) */}
        {/* ========================================== */}
        <section aria-label="راهنمای جامع مسکن در اتریش ۲۰۲۶">
          <AustriaHousingGuide />
        </section>

        {/* ========================================== */}
        {/* HERO WITH IMAGE */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl text-white"
          style={{
            background:
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-25">
            <img
              src={IMAGES.hero}
              alt="مسکن در اتریش"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#1e1512]/90 via-[#38100e]/75 to-[#9e142d]/60" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            🏠
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              سامانه هوشمند مسکن اتریش — ۲۰۲۶
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              مسکن در اتریش — بدون جریمه، بدون اشتباه
            </h1>

            <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-6">
              یافتن مسکن در اتریش یکی از <strong className="text-amber-300">چالش‌برانگیزترین</strong> مراحل مهاجرت است.
              این سامانه تعاملی، <strong className="text-amber-300">ابزارهای ضروری</strong> را در اختیار شما می‌گذارد:
              محاسبه بودجه مجاز، راهنمای خوابگاه‌ها، و چک‌لیست حقوقی قرارداد.
              همه با <strong className="text-amber-300">نکات ساکنان محلی ایرانی</strong>.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>۹ ایالت بررسی‌شده</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>قوانین MRG ۲۰۲۶</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>تجربه هزاران فارسی‌زبان</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-3"
                  >
                    <Icon className="w-4 h-4 text-amber-300 mb-1" />
                    <div className="text-lg font-black font-mono" dir="ltr">{s.value}</div>
                    <div className="text-[9px] font-black text-rose-100/70">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* MAIN APP CONTAINER */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-l from-[#c8102e] via-amber-400 to-[#c8102e]" />

          {/* Header */}
          <div className="border-b border-stone-150 pb-5 mb-6 space-y-2">
            <div className="flex items-center gap-2.5 justify-end">
              <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">
                سامانه پایش و جستجوی هوشمند مسکن اتریش 🏠
              </h2>
              <div className="p-2 bg-rose-50 border border-rose-100 rounded-xl text-[#c8102e]">
                <Building className="w-6 h-6" />
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-500 font-bold max-w-2xl ml-auto leading-relaxed">
              دستیار تعاملی برای محاسبه بودجه مجاز اجاره بر اساس قانون درآمد اتریش،
              آنالیز ایالت‌ها و مناطق مسکونی، چک‌لیست حقوقی Mietvertrag و معرفی پلتفرم‌های بدون واسطه.
            </p>
          </div>

          {/* ========================================== */}
          {/* SUB TABS NAVIGATION */}
          {/* ========================================== */}
          <div className="flex flex-wrap gap-2 mb-6 justify-end border-b border-stone-100 pb-3">
            {[
              { id: "links", label: "پلتفرم‌های بدون واسطه", icon: ExternalLink },
              { id: "checklist", label: "چک‌لیست طلایی قرارداد", icon: ShieldCheck },
              { id: "districts", label: "راهنمای ۲۳ منطقه وین", icon: MapPin },
              { id: "calculator", label: "سنجش توان مالی", icon: Calculator },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                      : "bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <span>{tab.label}</span>
                  <Icon className="w-4 h-4 shrink-0" />
                </button>
              );
            })}
          </div>

          {/* ========================================== */}
          {/* CALCULATOR TAB */}
          {/* ========================================== */}
          <AnimatePresence mode="wait">
            {activeSubTab === "calculator" && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Input Form */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
                    <h3 className="font-extrabold text-stone-800 text-xs sm:text-sm border-b border-stone-200 pb-2 flex items-center justify-end gap-1.5">
                      <span>ورودی داده‌های مالی شما</span>
                      <Coins className="w-4 h-4 text-amber-600" />
                    </h3>

                    <div className="space-y-3.5 text-xs text-stone-700">
                      <div>
                        <label htmlFor="income-input" className="block text-[10px] text-stone-500 font-bold mb-1">
                          کل درآمد خالص ماهانه (یورو):
                        </label>
                        <input
                          id="income-input"
                          type="number"
                          value={monthlyIncome}
                          onChange={(e) => setMonthlyIncome(Math.max(100, Number(e.target.value)))}
                          className="w-full bg-white border border-stone-200 p-2.5 rounded-xl font-bold text-stone-800 outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 font-mono text-left transition-all"
                        />
                        <span className="text-[9px] text-stone-400 font-semibold block mt-1">
                          مراجع رسمی معمولاً اجاره خانه را با حداکثر ۳۰٪ الی ۴۰٪ از درآمد ماهانه تایید می‌کنند.
                        </span>
                      </div>

                      <div>
                        <label htmlFor="rent-input" className="block text-[10px] text-stone-500 font-bold mb-1">
                          اجاره سرد حدودی (Kaltmiete در یورو):
                        </label>
                        <input
                          id="rent-input"
                          type="number"
                          value={coldRent}
                          onChange={(e) => setColdRent(Math.max(10, Number(e.target.value)))}
                          className="w-full bg-white border border-stone-200 p-2.5 rounded-xl font-bold text-stone-800 outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 font-mono text-left transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Assessment Dashboard */}
                  <div className="bg-[#FFFDF5] border border-amber-200/65 rounded-2xl p-5 space-y-5">
                    <h3 className="font-extrabold text-stone-800 text-xs sm:text-sm border-b border-amber-200 pb-2 flex items-center justify-end gap-1.5">
                      <span>تخمین توان مالی و پایش سپرده (Kaution)</span>
                      <Info className="w-4 h-4 text-amber-500" />
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-stone-150 p-3.5 rounded-xl text-center space-y-1">
                        <span className="text-[9px] text-stone-400 block font-bold">حداکثر اجاره ایده‌آل (۳۰٪)</span>
                        <span className="text-lg md:text-xl font-black text-emerald-700 font-mono" dir="ltr">{calculatedMaxRent30} €</span>
                        <span className="text-[8px] text-stone-400 block">منطبق با سختگیرانه‌ترین باجه‌ها</span>
                      </div>

                      <div className="bg-white border border-stone-150 p-3.5 rounded-xl text-center space-y-1">
                        <span className="text-[9px] text-stone-400 block font-bold">حداکثر اجاره مرزی (۴۰٪)</span>
                        <span className="text-lg md:text-xl font-black text-amber-700 font-mono" dir="ltr">{calculatedMaxRent40} €</span>
                        <span className="text-[8px] text-stone-400 block">آستانه تایید قرارداد برای ویزا</span>
                      </div>
                    </div>

                    <div className="border-t border-amber-100 pt-3.5 space-y-2">
                      <span className="text-[10px] text-stone-500 block font-bold">تخمین سپرده نقدی تضمین (Kaution):</span>
                      <div className="bg-white border border-amber-150 p-3.5 rounded-xl flex items-center justify-between font-mono font-black text-xs text-stone-800">
                        <span className="text-rose-700" dir="ltr">{estimatedKautionMax} €</span>
                        <span className="text-stone-400 text-[10px]">الی</span>
                        <span className="text-stone-800" dir="ltr">{estimatedKautionMin} €</span>
                        <span className="font-sans text-[10px] text-stone-500 font-black">۳ تا ۶ ماه Kaltmiete</span>
                      </div>
                      <p className="text-[9.5px] text-stone-400 font-semibold leading-relaxed">
                        ⚠️ طبق قانون اتریش، صاحب‌خانه موظف است این مبلغ را در یک حساب پس‌انداز مسدود (Sparbuch) با سود بانکی نگهداری کرده و در زمان تحویل نهایی با سود بازپس دهد.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <h5 className="font-extrabold text-stone-800 text-[11px] sm:text-xs">
                      سلب مسئولیت تاییدیه ویزا و تمکن مالی:
                    </h5>
                    <p className="text-[10px] text-stone-600 leading-relaxed font-bold">
                      اداره مهاجرت اتریش (MA 35) برای صدور یا تمدید اقامت، کل هزینه خانه (اجاره گرم + هزینه‌های جانبی) را از درآمد خالص کسر می‌کند. باقی‌مانده باید حداقل برابر با نرخ معیشت فدرال (Ausgleichszulagenrichtsatz) باشد — در ۲۰۲۶ حدود <strong>€۱,۳۰۸</strong> برای مجرد و <strong>€۲,۰۶۴</strong> برای متأهلین.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* DISTRICTS TAB */}
            {/* ========================================== */}
            {activeSubTab === "districts" && (
              <motion.div
                key="districts"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Group filter */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter className="w-4 h-4 text-stone-500" />
                  {GROUPS.map((g) => {
                    const Icon = g.icon;
                    const isActive = activeGroup === g.id;
                    return (
                      <button
                        key={g.id}
                        onClick={() => setActiveGroup(g.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                          isActive
                            ? `bg-gradient-to-br ${g.color} text-white shadow-md`
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {g.label}
                      </button>
                    );
                  })}
                  <span className="text-[10px] font-black text-stone-500 ml-auto">
                    {filteredDistricts.length} منطقه
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Districts List */}
                  <div className="lg:col-span-7 border border-stone-200 rounded-2xl p-4 max-h-[520px] overflow-y-auto space-y-2 pr-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <AnimatePresence mode="popLayout">
                        {filteredDistricts.map((dist) => {
                          const isActive = selectedDistrict?.number === dist.number;
                          return (
                            <motion.button
                              key={dist.number}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              onClick={() => {
                                setSelectedDistrict(dist);
                              }}
                              className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                                isActive
                                  ? "bg-rose-50/50 border-[#c8102e]/40 shadow-md"
                                  : "bg-white border-stone-150 hover:bg-stone-50 hover:border-stone-300"
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                                  isActive ? "bg-[#c8102e] text-white" : "bg-stone-100 text-stone-600"
                                }`}>
                                  Bezirk {dist.number}
                                </span>
                                <h4 className="text-xs font-extrabold text-stone-800">{dist.name}</h4>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-[10px] text-rose-700 font-black font-mono" dir="ltr">
                                  {dist.sqmPrice} €/m²
                                </span>
                                <div className="flex items-center gap-0.5">
                                  {[...Array(5)].map((_, idx) => (
                                    <Star
                                      key={idx}
                                      className={`w-2.5 h-2.5 ${idx < dist.safety ? "text-amber-500 fill-current" : "text-stone-200"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Selected District Details */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Image */}
                    <div className="relative h-48 rounded-2xl overflow-hidden">
                      <img
                        src={
                          selectedDistrict.group === "inner"
                            ? IMAGES.vienna
                            : selectedDistrict.group === "green"
                            ? IMAGES.family
                            : selectedDistrict.group === "family"
                            ? IMAGES.apartment
                            : IMAGES.keys
                        }
                        alt={selectedDistrict.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/40 to-transparent" />
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black text-stone-800 shadow-md">
                        <MapPin className="w-3 h-3 text-[#c8102e]" />
                        Bezirk {selectedDistrict.number}
                      </div>
                      <div className="absolute bottom-3 right-3 left-3">
                        <div className="text-lg font-black text-white leading-tight mb-0.5">
                          {selectedDistrict.number}. {selectedDistrict.name}
                        </div>
                        <div className="text-[10px] text-white/85 font-bold">
                          {selectedDistrict.vibe}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-b from-stone-50 to-stone-100/50 border border-stone-200 rounded-2xl p-5 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white border border-stone-200 p-3 rounded-xl">
                          <span className="text-[9px] text-stone-400 font-bold block mb-0.5 flex items-center gap-1">
                            <Euro className="w-2.5 h-2.5" />
                            متوسط کرایه متری
                          </span>
                          <div className="font-mono font-black text-rose-700 text-base" dir="ltr">
                            €{selectedDistrict.sqmPrice}
                          </div>
                        </div>
                        <div className="bg-white border border-stone-200 p-3 rounded-xl">
                          <span className="text-[9px] text-stone-400 font-bold block mb-0.5 flex items-center gap-1">
                            <ShieldCheck className="w-2.5 h-2.5" />
                            امنیت
                          </span>
                          <div className="flex items-center gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < selectedDistrict.safety ? "text-amber-500 fill-current" : "text-stone-200"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-stone-200 p-3 rounded-xl">
                        <span className="text-[9px] text-stone-400 font-bold block mb-0.5 flex items-center gap-1">
                          <Train className="w-2.5 h-2.5" />
                          خطوط حمل‌ونقل
                        </span>
                        <p className="font-mono font-black text-sky-700 text-[11px]">
                          {selectedDistrict.transit}
                        </p>
                      </div>

                      <div className="bg-white border border-stone-200 p-3 rounded-xl">
                        <span className="text-[9px] text-stone-400 font-bold block mb-0.5 flex items-center gap-1">
                          <Award className="w-2.5 h-2.5" />
                          مزایا و ویژگی‌های شاخص
                        </span>
                        <p className="font-bold text-stone-700 text-[11px] leading-relaxed">
                          {selectedDistrict.pros}
                        </p>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-200/50 p-3.5 rounded-xl flex items-start gap-2 text-[10px] text-amber-950 font-black leading-relaxed">
                      <Zap className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>
                        نکته طلایی: مناطق <strong>۱۰، ۱۱، ۱۲، ۱۵ و ۲۰</strong> وین همواره پایین‌ترین هزینه اجاره‌بها را دارند. مناطق <strong>۱۳، ۱۷، ۱۸، ۱۹</strong> برای خانواده‌ها با فضای سبز و مدارس خوب ایده‌آل هستند.
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* CHECKLIST TAB */}
            {/* ========================================== */}
            {activeSubTab === "checklist" && (
              <motion.div
                key="checklist"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
                  <h3 className="font-extrabold text-stone-800 text-xs sm:text-sm border-b border-stone-200 pb-2 mb-4 flex items-center justify-end gap-1.5">
                    <span>حقوق مستأجر و موارد احتیاطی در قرارداد مسکن</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CHECKLIST.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.06 }}
                          className="bg-white border border-stone-200 rounded-xl p-4 space-y-2 hover:border-emerald-300 hover:shadow-sm transition-all group"
                        >
                          <div className="flex items-center gap-2 justify-between">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <h4 className="text-stone-800 text-xs font-black text-right flex-1">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-[10.5px] text-stone-500 leading-relaxed font-bold">
                            {item.desc}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Pro Tip */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-black text-emerald-900 text-xs mb-1">
                      نکته حرفه‌ای از تیم اتریش‌نشین
                    </h5>
                    <p className="text-[11px] text-emerald-800 font-bold leading-relaxed">
                      قبل از امضای هر قرارداد اجاره، حتماً از <strong>Mietervereinigung</strong>
                      (اتحادیه مستأجران اتریش) یا <strong>AK Wien</strong> برای بررسی قرارداد کمک بگیرید.
                      این خدمات رایگان یا با هزینه ناچیز هستند و می‌توانند شما را از مشکلات حقوقی پرهزینه نجات دهند.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* LINKS TAB */}
            {/* ========================================== */}
            {activeSubTab === "links" && (
              <motion.div
                key="links"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="bg-[#FFFDF5] border border-amber-200/50 rounded-2xl p-5 space-y-4">
                  <h3 className="font-extrabold text-stone-800 text-xs sm:text-sm border-b border-amber-200 pb-2 flex items-center justify-end gap-1.5">
                    <span>درگاه‌های بدون واسطه و پلتفرم‌های برتر مسکن اتریش</span>
                    <ExternalLink className="w-5 h-5 text-amber-600" />
                  </h3>

                  <p className="text-[11px] text-stone-500 font-bold leading-relaxed text-right">
                    برای یافتن خانه، بهترین روش فیلتر کردن آگهی‌ها به‌صورت شخصی و بدون
                    Provision (کمیسیون) در بستر پلتفرم‌های مرجع اتریش است. در ادامه
                    بهترین منابع معرفی شده‌اند:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {MARKETPLACES.map((p, idx) => {
                      const Icon = p.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.06 }}
                          whileHover={{ y: -3 }}
                          className={`relative bg-white border ${p.recommended ? "border-amber-300 shadow-md" : "border-stone-200"} rounded-xl p-4 flex flex-col justify-between hover:border-amber-400 transition-all text-right space-y-3`}
                        >
                          {p.recommended && (
                            <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[8px] font-black px-2 py-0.5 rounded-br-xl flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              پیشنهادی
                            </div>
                          )}
                          <div className="space-y-2">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white shadow-md`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <h4 className="font-black text-stone-800 text-xs">{p.name}</h4>
                            <p className="text-[10px] text-stone-500 leading-relaxed font-bold">{p.desc}</p>
                          </div>
                          <div className="flex gap-2 justify-end pt-1">
                            <button
                              onClick={() => handleCopyLink(p.link)}
                              className="text-[9px] bg-stone-100 hover:bg-stone-200 text-stone-600 px-2 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1"
                            >
                              <Copy className="w-2.5 h-2.5" />
                              کپی
                            </button>
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[9px] bg-stone-900 hover:bg-stone-800 text-white px-2.5 py-1.5 rounded-lg font-black flex items-center gap-1 transition-all"
                            >
                              <span>ورود</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* 3-IMAGE GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#c8102e]" />
              سه گام مسیر خانه‌یابی در وین
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از جستجو تا کلید تحویل — همه‌چیز در یک نگاه
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.apartment,
                title: "جستجو و بازدید",
                subtitle: "گام اول",
                desc: "با پلتفرم‌های معتبر مثل Willhaben و WG-Gesucht، آپارتمان‌های مورد نظر را فیلتر کنید. برای بازدید حضوری حتماً همراه داشته باشید: پاسپورت، Meldezettel و اثبات درآمد.",
                icon: Search,
                gradient: "from-sky-600 to-blue-700",
                stat: "۲-۴ ماه",
              },
              {
                img: IMAGES.contract,
                title: "بررسی قرارداد",
                subtitle: "گام دوم",
                desc: "قبل از امضا، قرارداد را با Mietervereinigung یا AK Wien بررسی کنید. به Indexklausel، Betriebskosten و مدت قرارداد دقت کنید.",
                icon: FileText,
                gradient: "from-emerald-600 to-teal-700",
                stat: "۱ هفته",
              },
              {
                img: IMAGES.keys,
                title: "تحویل کلید",
                subtitle: "گام سوم",
                desc: "با Übergabeprotokoll (صورتجلسه تحویل)، تمام اتاق‌ها را با صاحب‌خانه بازدید کنید. عکس بگیرید. این مهم‌ترین مرحله برای بازگشت Kaution است.",
                icon: Key,
                gradient: "from-amber-500 to-orange-600",
                stat: "روز جابجایی",
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
              <Info className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره مسکن در اتریش
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Home className="w-3.5 h-3.5 text-amber-300" />
              مشاوره تخصصی مسکن
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              در جستجوی خانه در وین سردرگم شده‌اید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه زیسته در اتریش، می‌تواند در انتخاب منطقه،
              بررسی قرارداد، مذاکره با صاحب‌خانه و آماده‌سازی مدارک راهنمایی‌تان کند.
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

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
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
              قیمت‌های اجاره متری هر منطقه بر اساس میانگین بازار سال ۲۰۲۶
              ارائه شده و ممکن است بسته به نوع ملک، طبقه، امکانات و شرایط
              بازار تغییر کنند. همچنین، مبالغ محاسبه‌شده تخمینی هستند و
              تصمیم نهایی برای تایید اجاره به عهده صاحب‌خانه یا باجه‌های
              رسمی است. برای تصمیم‌های مالی مهم، همیشه با مشاوران مسکن
              رسمی یا Mietervereinigung مشورت کنید.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

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
        isOpen ? "border-[#c8102e]/30 bg-[#c8102e]/[0.02] shadow-md" : "border-stone-200"
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
                ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white"
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
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}