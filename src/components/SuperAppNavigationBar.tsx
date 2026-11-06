import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown, ChevronLeft, ArrowUpRight, Home, Compass,
  Coins, Map, Building, BookOpen, Car, Users, MessageSquare,
  Sparkles, FileText, Calculator, IdCard, CheckCircle2, ShieldCheck,
  Stethoscope, Landmark, Layers, Search, CarFront, HelpCircle,
  Briefcase, Zap, X, GraduationCap, Scale, Euro, MapPin,
  HeartPulse, ShieldAlert, Award, FileCheck, CalendarDays, Bus,
  ShoppingCart, Apple, Baby, Check, ChevronRight, Menu, PhoneCall,
  Newspaper, Headphones
} from "lucide-react";

export interface SubMenuItemConfig {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: "پربازدید" | "هوشمند" | "ویژه" | "ضروری" | "جدید" | "رایگان";
  highlight?: boolean;
}

export interface SubCategoryGroup {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeColor?: string;
  items: SubMenuItemConfig[];
}

export interface NavCategoryConfig {
  id: string;
  label: string;
  shortLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  contextIcon?: React.ComponentType<{ className?: string }>;
  contextBadge?: string;
  color: string;
  hoverBg: string;
  activeBg: string;
  textColor: string;
  borderActive: string;
  description: string;
  directSegment?: string;
  groups?: SubCategoryGroup[];
}

// ============================================================
// 🌟 MULTI-LEVEL HIERARCHICAL NAVIGATION DATA
// ============================================================
export const STRUCTURED_MENU_CATEGORIES: NavCategoryConfig[] = [
  {
    id: "home",
    label: "صفحه اصلی",
    icon: Home,
    contextIcon: Sparkles,
    contextBadge: "وین",
    color: "from-red-600 to-rose-700",
    hoverBg: "hover:bg-red-50",
    activeBg: "bg-red-600 text-white shadow-md shadow-red-600/20",
    textColor: "text-red-650",
    borderActive: "border-red-600",
    description: "صفحه نخست سوپراپلیکیشن کانون ایرانیان اتریش",
    directSegment: "home",
  },
  {
    id: "immigration",
    label: "مهاجرت و اقامت",
    icon: Compass,
    contextIcon: IdCard,
    contextBadge: "RWR",
    color: "from-red-600 to-rose-700",
    hoverBg: "hover:bg-red-50",
    activeBg: "bg-red-600 text-white shadow-md shadow-red-600/20",
    textColor: "text-red-600",
    borderActive: "border-red-600",
    description: "کارت قرمز-سفید-قرمز، ویزاها، اداره اقامت MA35 و شهروندی اتریش",
    groups: [
      {
        id: "visas-and-cards",
        title: "مسیرهای ویزا و کارت‌های اقامت",
        subtitle: "محاسبه امتیاز، نمونه ویزاها و قوانین اقامت",
        icon: IdCard,
        items: [
          {
            id: "rwr-calculator",
            title: "محاسبه امتیاز کارت قرمز-سفید-قرمز (RWR)",
            shortTitle: "محاسبه‌گر امتیاز RWR",
            description: "امتیازسنجی رسمی متخصصین، مشاغل کمبود و جستجوی کار",
            icon: Calculator,
            badge: "پربازدید",
            highlight: true,
          },
          {
            id: "visa-samples",
            title: "نمونه ویزاها و کارت‌های اقامت واقعی",
            shortTitle: "نمونه ویزاها و مدارک",
            description: "کالبدشکافی بندهای قانونی کارت اقامت، بلوکارت و پذیرش‌ها",
            icon: IdCard,
            badge: "جدید",
            highlight: true,
          },
          {
            id: "residency-conditions",
            title: "شرایط تمدید و اقامت دائم اتریش",
            shortTitle: "اقامت دائم اتریش",
            description: "قوانین ۵ ساله، درآمد خالص مکفی و بندهای NAG",
            icon: ShieldCheck,
          },
          {
            id: "citizenship",
            title: "راهنمای جامع اخذ شهروندی و پاسپورت",
            shortTitle: "شهروندی اتریش",
            description: "شرایط ۶، ۱۰ و ۱۵ ساله، آزمون شهروندی و مدارک",
            icon: Award,
          },
          {
            id: "student-grad-guide",
            title: "راهنمای اقامت دانشجویی و فارغ‌التحصیلی",
            shortTitle: "دانشجویان اتریش",
            description: "تبدیل ویزای تحصیلی به کارت سرخ‌سفیدسرخ پس از فارغ‌التحصیلی",
            icon: GraduationCap,
          },
        ],
      },
      {
        id: "ma35-and-legal",
        title: "اداره اقامت MA 35 و امور حقوقی",
        subtitle: "نوبت‌ها، پیگیری پرونده و احراز هویت",
        icon: Scale,
        items: [
          {
            id: "ma35",
            title: "پایش نوبت‌های اداره اقامت وین (MA 35)",
            shortTitle: "نوبت‌های MA 35",
            description: "رهگیری نوبت‌های خالی شعب، راهنمای مصاحبه و مدارک",
            icon: Landmark,
            badge: "ضروری",
            highlight: true,
          },
          {
            id: "immigration-assessment",
            title: "ارزیابی هوشمند روش‌های مهاجرتی",
            shortTitle: "ارزیابی هوشمند",
            description: "آنالیز تخصصی رزومه و پیشنهاد مناسب‌ترین ویزای اتریش",
            icon: Sparkles,
            badge: "هوشمند",
          },
          {
            id: "tracker",
            title: "رهگیری وضعیت پرونده اقامتی",
            shortTitle: "پیگیری پرونده",
            description: "سیستم هوشمند تخمین زمان صدور و مراحل گردش کار",
            icon: Layers,
          },
          {
            id: "id-austria-guide",
            title: "راهنمای فعال‌سازی ID Austria",
            shortTitle: "سامانه ID Austria",
            description: "امضای دیجیتال و دسترسی به سامانه‌های الکترونیک دولتی",
            icon: ShieldCheck,
          },
          {
            id: "criminal-record",
            title: "گواهی عدم سوء‌پیشینه اتریشی (Strafregister)",
            shortTitle: "عدم سوء‌پیشینه",
            description: "نحوه دریافت آنلاین یا حضوری با تاییدیه پلیس فدرال",
            icon: FileCheck,
          },
          {
            id: "marriage-divorce",
            title: "ثبت رسمی ازدواج و امور حقوقی خانواده",
            shortTitle: "ازدواج در اتریش",
            description: "مدارک شهرداری، اداره Standesamt و ترجمه احکام",
            icon: Users,
          },
        ],
      },
    ],
  },
  {
    id: "finance",
    label: "کار و مالیات",
    icon: Coins,
    contextIcon: Euro,
    contextBadge: "Netto",
    color: "from-emerald-600 to-teal-700",
    hoverBg: "hover:bg-emerald-50",
    activeBg: "bg-emerald-600 text-white shadow-md shadow-emerald-600/20",
    textColor: "text-emerald-700",
    borderActive: "border-emerald-600",
    description: "حقوق خالص، اظهارنامه مالیاتی، ارز روز، هزینه‌های زندگی و بانک",
    groups: [
      {
        id: "tax-and-salary",
        title: "حقوق و امور مالیاتی اتریش",
        subtitle: "محاسبه دریافتی خالص، کسورات و اظهارنامه",
        icon: Calculator,
        items: [
          {
            id: "finance",
            title: "محاسبه‌گر حقوق خالص (Brutto-Netto)",
            shortTitle: "حقوق ناخالص به خالص",
            description: "محاسبه حقوق ۱۴ ماهه، بیمه اجتماعی ÖGK و مالیات پلکانی",
            icon: Euro,
            badge: "پربازدید",
            highlight: true,
          },
          {
            id: "tax-return",
            title: "اظهارنامه سالانه و بازگشت مالیاتی (Arbeitnehmerveranlagung)",
            shortTitle: "بازگشت مالیات",
            description: "راهنمای دریافت اضافه مالیات پرداختی از پورتال FinanzOnline",
            icon: FileText,
            badge: "ضروری",
          },
          {
            id: "freelance-tax",
            title: "مالیات فریلنسری و خوداشتغالی",
            shortTitle: "مالیات فریلنسرها",
            description: "بیمه SVS، صورتحساب سود و زیان و معافیت‌های مالیاتی",
            icon: Briefcase,
          },
          {
            id: "familienbonus",
            title: "پاداش مالیاتی خانواده (Familienbonus Plus)",
            shortTitle: "پاداش فرزند اتریش",
            description: "کاهش مالیات سالانه تا ۲٬۰۰۰ یورو به ازای هر فرزند",
            icon: Baby,
            badge: "ویژه",
          },
        ],
      },
      {
        id: "living-cost-and-banking",
        title: "هزینه‌های زندگی، صرافی و امور مالی",
        subtitle: "نرخ ارز، بودجه زندگی، وام و حساب بانکی",
        icon: Landmark,
        items: [
          {
            id: "exchange",
            title: "نرخ لحظه‌ای یورو و ارزهای بین‌المللی",
            shortTitle: "صرافی و ارز روز",
            description: "نرخ زنده و مقایسه کارمزد حواله‌های مالی به اتریش",
            icon: Euro,
            badge: "رایگان",
          },
          {
            id: "compare-living",
            title: "مقایسه هزینه‌های زندگی شهرهای اتریش",
            shortTitle: "هزینه شهرهای اتریش",
            description: "مقایسه اجاره، خوراک، حمل‌ونقل و قبوض وین، گراتس و لینتس",
            icon: Building,
          },
          {
            id: "student-finance",
            title: "امور مالی دانشجویی و کمک‌هزینه",
            shortTitle: "بورسیه و کمک دانشجویی",
            description: "راهنمای درخواست وام، Studienbeihilfe و حقوق کار دانشجویی",
            icon: GraduationCap,
          },
          {
            id: "nova",
            title: "محاسبه مالیات خودرو در اتریش (NoVA)",
            shortTitle: "مالیات NoVA خودرو",
            description: "محاسبه مالیات محیط‌زیستی بر اساس مصرف سوخت و آلایندگی",
            icon: Car,
          },
          {
            id: "real-estate",
            title: "راهنمای خرید و اجاره ملک در اتریش",
            shortTitle: "خرید و اجاره خانه",
            description: "هزینه‌های جانبی سند، مالیات انتقال ملک و حق بنگاه",
            icon: Building,
          },
          {
            id: "bank-compare",
            title: "مقایسه حساب‌ها و کارت‌های بانکی اتریش",
            shortTitle: "بانک‌های اتریش",
            description: "بررسی حساب‌های رایگان، کارت‌های اعتباری و تسهیلات",
            icon: Landmark,
          },
        ],
      },
    ],
  },
  {
    id: "living",
    label: "مسکن و خدمات شهری",
    icon: Building,
    contextIcon: HeartPulse,
    contextBadge: "ÖGK",
    color: "from-amber-500 to-orange-600",
    hoverBg: "hover:bg-amber-50",
    activeBg: "bg-amber-600 text-white shadow-md shadow-amber-600/20",
    textColor: "text-amber-700",
    borderActive: "border-amber-600",
    description: "مسکن، پزشکان ایرانی، خدمات شهری، مدارس، فروشگاه‌ها و بیمه",
    groups: [
      {
        id: "housing-and-home",
        title: "مسکن، اجاره و زندگی",
        subtitle: "خانه، اثاثیه دست‌دوم، محله‌ها و قراردادها",
        icon: Building,
        items: [
          {
            id: "housesearch",
            title: "موتور جستجوی مسکن و خوابگاه‌های دانشجویی",
            shortTitle: "جستجوی مسکن",
            description: "جستجوی هوشمند در سایت‌های اجاره معتبر اتریش",
            icon: Building,
            badge: "پربازدید",
            highlight: true,
          },
          {
            id: "willhaben",
            title: "راهنمای خرید امن از Willhaben",
            shortTitle: "خرید از Willhaben",
            description: "روش‌های پرداخت PayLivery و جلوگیری از کلاهبرداری",
            icon: ShoppingCart,
          },
          {
            id: "willhaben-furniture",
            title: "تجهیز ارزان خانه با مبلمان دست دوم",
            shortTitle: "مبلمان و اثاثیه",
            description: "ترفندهای چیدمان خانه نو و حمل‌ونقل اثاثیه در اتریش",
            icon: Home,
          },
          {
            id: "betriebskosten",
            title: "بررسی و اعتبارسنجی قبوض شارژ (Betriebskosten)",
            shortTitle: "قبوض شارژ مسکن",
            description: "محاسبه هزینه‌های مجاز آب، نظافت، آسانسور و گرمایش",
            icon: FileText,
          },
          {
            id: "district",
            title: "راهنمای مناطق ۲۳گانه وین",
            shortTitle: "مناطق وین",
            description: "معرفی ویژگی‌ها، امنیت، دسترسی و هزینه هر منطقه",
            icon: MapPin,
          },
          {
            id: "neighborhood",
            title: "مقایسه محله‌های مسکونی اتریش",
            shortTitle: "محله‌های مسکونی",
            description: "بررسی آرامش، فضای سبز و مدارس اطراف مسکن",
            icon: Map,
          },
          {
            id: "contract-cancellation",
            title: "فسخ قانونی قراردادهای مسکن و خدمات (Kündigung)",
            shortTitle: "فسخ قراردادها",
            description: "نمونه نامه‌های رسمی آلمانی برای خاتمه قراردادها طبق قانون",
            icon: FileCheck,
          },
        ],
      },
      {
        id: "health-and-doctors",
        title: "پزشکان و سلامت خانواده",
        subtitle: "پزشکان بیمه ÖGK، دندانپزشکی و سلامت خانواده",
        icon: Stethoscope,
        items: [
          {
            id: "kassenarzt-directory",
            title: "دایرکتوری پزشکان طرف قرارداد بیمه (Kassenarzt)",
            shortTitle: "پزشکان بیمه و ایرانی",
            description: "جستجوی پزشکان عمومی و متخصص با پوشش ۱۰۰٪ بیمه ÖGK",
            icon: Stethoscope,
            badge: "ضروری",
            highlight: true,
          },
          {
            id: "emergency-dentistry",
            title: "دندانپزشکی اورژانسی و شبانه‌روزی وین",
            shortTitle: "دندانپزشکی اورژانس",
            description: "مراکز کشیک شب و ایام تعطیل بدون نیاز به نوبت قبلی",
            icon: HeartPulse,
          },
          {
            id: "mutter-kind-pass",
            title: "دفترچه مراقبت مادر و کودک (Mutter-Kind-Pass)",
            shortTitle: "مراقبت مادر و کودک",
            description: "جدول معاینات اجباری برای دریافت کامل کمک‌هزینه فرزند",
            icon: Baby,
          },
          {
            id: "supplemental-insurance",
            title: "راهنمای بیمه تکمیلی درمان (Sonderklasse)",
            shortTitle: "بیمه تکمیلی سلامت",
            description: "پوشش اتاق اختصاصی بیمارستان و پزشکان خصوصی",
            icon: ShieldCheck,
          },
          {
            id: "liability-insurance",
            title: "بیمه مسئولیت مدنی (Privathaftpflicht)",
            shortTitle: "بیمه مسئولیت مدنی",
            description: "پوشش خسارات تصادفی به اشخاص ثالث در منزل و خیابان",
            icon: ShieldAlert,
          },
        ],
      },
      {
        id: "city-services-and-shops",
        title: "خدمات شهری، خرید و آموزش",
        subtitle: "مترجمان، صنف‌ها، فروشگاه‌ها و مدارس",
        icon: Map,
        items: [
          {
            id: "mapper",
            title: "نقشه جامع امکانات شهری اتریش",
            shortTitle: "نقشه امکانات شهری",
            description: "موقعیت بیمارستان‌ها، ادارات دولتی، مراکز تفریحی و ایستگاه‌ها",
            icon: MapPin,
          },
          {
            id: "translators",
            title: "مترجمان رسمی قسم‌خورده فارسی-آلمانی",
            shortTitle: "مترجمان رسمی دادگستری",
            description: "فهرست مترجمان رسمی مورد تایید سفارت و دادگاه‌های اتریش",
            icon: FileCheck,
            badge: "ضروری",
          },
          {
            id: "experts",
            title: "وکلا، مشاوران مالیاتی و متخصصان",
            shortTitle: "وکلا و مشاوران",
            description: "شبکه کارشناسان فارسی‌زبان و رسمی مقیم اتریش",
            icon: Scale,
          },
          {
            id: "grocery",
            title: "سوپرمارکت‌ها و فروشگاه‌های ایرانی",
            shortTitle: "فروشگاه‌های ایرانی",
            description: "آدرس و ساعت کاری فروشگاه‌های عرضه مواد غذایی ایرانی",
            icon: ShoppingCart,
          },
          {
            id: "halal-directory",
            title: "مراکز و رستوران‌های حلال اتریش",
            shortTitle: "قصابی و غذای حلال",
            description: "قصابی‌های حلال معتبر، رستوران‌ها و تاییدیه ذبح اسلامی",
            icon: Apple,
          },
          {
            id: "organic-markets",
            title: "فروشگاه‌های محصولات ارگانیک (Bio-Märkte)",
            shortTitle: "محصولات ارگانیک",
            description: "بازارچه‌های هفتگی کشاورزان محلی و برندهای سلامت",
            icon: Apple,
          },
          {
            id: "schools",
            title: "سیستم مدارس و ثبت‌نام دانش‌آموزان",
            shortTitle: "مدارس در اتریش",
            description: "تفاوت Gymnasium و Mittelschule و مدارک ثبت‌نام مدارس",
            icon: GraduationCap,
          },
          {
            id: "kindergarten",
            title: "مهدکودک‌ها و مهلت ثبت‌نام در اتریش",
            shortTitle: "مهدکودک در اتریش",
            description: "مهدکودک‌های رایگان شهرداری و روش دریافت شماره مشتری",
            icon: Baby,
          },
          {
            id: "discounter-guide",
            title: "راهنمای خرید به‌صرفه از Discounterها",
            shortTitle: "تخفیف‌های سوپرمارکت",
            description: "نکات خرید هفتگی از Hofer، Lidl و پلتفرم‌های تخفیف",
            icon: ShoppingCart,
          },
          {
            id: "phishing-security",
            title: "امنیت سایبری و پیشگیری از فیشینگ",
            shortTitle: "امنیت سایبری",
            description: "شناسایی پیامک‌های جعلی FinanzOnline و اداره پست اتریش",
            icon: ShieldAlert,
          },
          {
            id: "stadtwanderwege",
            title: "مسیرهای پیاده‌روی شهری وین (Stadtwanderwege)",
            shortTitle: "پیاده‌روی و طبیعت وین",
            description: "۱۴ مسیر پیاده‌روی استاندارد در جنگل‌ها و تپه‌های وین",
            icon: MapPin,
          },
          {
            id: "opera-standing-tickets",
            title: "راهنمای بلیت‌های ایستاده اپرای وین",
            shortTitle: "بلیت‌های ایستاده اپرا",
            description: "تجربه تماشای بهترین اپراهای جهان با بلیت‌های چند یورویی",
            icon: Award,
          },
        ],
      },
    ],
  },
  {
    id: "education-transport",
    label: "آموزش و حمل‌ونقل",
    icon: BookOpen,
    contextIcon: GraduationCap,
    contextBadge: "ÖBB",
    color: "from-indigo-600 to-blue-700",
    hoverBg: "hover:bg-indigo-50",
    activeBg: "bg-indigo-600 text-white shadow-md shadow-indigo-600/20",
    textColor: "text-indigo-700",
    borderActive: "border-indigo-600",
    description: "زبان آلمانی، گواهینامه، کلیما تیکت، قطار ÖBB و معادل‌سازی",
    groups: [
      {
        id: "german-and-study",
        title: "زبان آلمانی و مدارک تحصیلی",
        subtitle: "آکادمی بقا، واژه‌نامه تخصصی و نوستریفیکاسیون",
        icon: BookOpen,
        items: [
          {
            id: "german",
            title: "آکادمی زبان آلمانی و اصطلاحات اتریشی",
            shortTitle: "آکادمی زبان آلمانی",
            description: "اصطلاحات عامیانه دیالکت اتریشی، مکالمات اداری و آزمون ÖSD",
            icon: BookOpen,
            badge: "ویژه",
            highlight: true,
          },
          {
            id: "glossary",
            title: "واژه‌نامه تخصصی اداری، حقوقی و مهاجرتی",
            shortTitle: "واژه‌نامه تخصصی",
            description: "فرهنگ لغات اصطلاحات سردرگم‌کننده نامه‌های اداری اتریش",
            icon: FileText,
          },
          {
            id: "education-wifi-bfi",
            title: "دوره‌های فنی‌حرفه‌ای و شغلی (WIFI & BFI)",
            shortTitle: "دوره‌های مهارتی WIFI",
            description: "بورسیه دوره‌های آموزشی و مهارتی با کمک‌هزینه AMS",
            icon: Briefcase,
          },
          {
            id: "nostrification",
            title: "معادل‌سازی مدارک دانشگاهی (Nostrifizierung)",
            shortTitle: "معادل‌سازی مدارک",
            description: "تاییدیه ارزشیابی مدارک تحصیلی ایران در وزارت علوم اتریش",
            icon: GraduationCap,
          },
          {
            id: "accounting-career",
            title: "مسیر شغلی و بازار کار حسابداری در اتریش",
            shortTitle: "شغل حسابداری در اتریش",
            description: "گواهینامه‌های رسمی حسابداری، کتابداری و نرم‌افزارهای مالیاتی",
            icon: Landmark,
          },
        ],
      },
      {
        id: "transport-and-driving",
        title: "حمل‌ونقل، قطار و گواهینامه رانندگی",
        subtitle: "کلیما تیکت، کارت‌های تخفیف و آیین‌نامه",
        icon: Car,
        items: [
          {
            id: "transport",
            title: "راهنمای حمل‌ونقل عمومی و شبکه مترو اتریش",
            shortTitle: "حمل‌ونقل عمومی",
            description: "خطوط مترو، اتوبوس و قطارهای حومه‌ای (Wiener Linien)",
            icon: Bus,
          },
          {
            id: "klimaticket",
            title: "راهنمای بلیت سراسری کلیما تیکت (KlimaTicket)",
            shortTitle: "کلیما تیکت اتریش",
            description: "استفاده نامحدود از کلیه وسایل نقلیه عمومی اتریش با یک بلیت",
            icon: Award,
            badge: "پربازدید",
            highlight: true,
          },
          {
            id: "obb-vorteilscard",
            title: "کارت تخفیف ۵۰٪ قطارهای فدرال (ÖBB Vorteilscard)",
            shortTitle: "کارت تخفیف ÖBB",
            description: "سفرهای ارزان بین‌شهری و بین‌المللی با قطارهای اتریش",
            icon: Bus,
          },
          {
            id: "license",
            title: "تبدیل و دریافت گواهینامه رانندگی اتریش",
            shortTitle: "گواهینامه رانندگی",
            description: "فرآیند Umschreibung گواهینامه ایران در اداره پلیس اتریش",
            icon: CarFront,
            badge: "ضروری",
          },
          {
            id: "theory-test",
            title: "شبیه‌ساز آزمون تئوری آیین‌نامه اتریش",
            shortTitle: "تست تئوری گواهینامه",
            description: "بانک سوالات استاندارد آزمون کامپیوتری رانندگی اتریش",
            icon: Sparkles,
            badge: "هوشمند",
          },
          {
            id: "inspection",
            title: "معاینه فنی دوره‌ای خودرو (Pickerl §57a)",
            shortTitle: "معاینه فنی خودرو Pickerl",
            description: "مهلت‌های قانونی بازرسی فنی و برچسب معاینه شیشه اتومبیل",
            icon: ShieldCheck,
          },
          {
            id: "parking",
            title: "قوانین و مناطق پارک ساعتی وین (Kurzparkzone)",
            shortTitle: "پارکینگ در وین",
            description: "خرید بلیت پارک Parkschein و مجوز پارک ساکنین Parkpickerl",
            icon: Car,
          },
          {
            id: "traffic-fine-appeal",
            title: "اعتراض به جرایم رانندگی و پارک در اتریش",
            shortTitle: "اعتراض به جریمه",
            description: "نمونه لوایح اعتراض به برگه‌های جریمه پلیس و شهرداری",
            icon: Scale,
          },
        ],
      },
    ],
  },
  {
    id: "community-smart",
    label: "کانون و هوشمند",
    icon: Sparkles,
    contextIcon: Zap,
    contextBadge: "AI",
    color: "from-yellow-500 to-amber-600",
    hoverBg: "hover:bg-yellow-50",
    activeBg: "bg-amber-500 text-white shadow-md shadow-amber-500/20",
    textColor: "text-amber-700",
    borderActive: "border-amber-500",
    description: "همسفریاب، تجارب زیسته، تعطیلات، ارزیابی هوشمند و چک مدارک",
    groups: [
      {
        id: "community-circle",
        title: "کانون و همیاری ایرانیان اتریش",
        subtitle: "همسفریاب، تجارب زیسته و رویدادها",
        icon: Users,
        items: [
          {
            id: "carpool",
            title: "همسفریاب فرودگاهی و باربری اتریش-ایران",
            shortTitle: "همسفریاب فرودگاه",
            description: "هماهنگی مسافران پروازهای تهران-وین برای انتقال امانات و بار",
            icon: Users,
            badge: "پربازدید",
            highlight: true,
          },
          {
            id: "stories",
            title: "روایت‌ها و تجارب زیسته مهاجرین در اتریش",
            shortTitle: "تجارب مهاجرین",
            description: "داستان‌های واقعی تطبیق فرهنگی، کاریابی و چالش‌های زندگی",
            icon: MessageSquare,
          },
          {
            id: "holidays",
            title: "تقویم تعطیلات رسمی و مناسبت‌های اتریش",
            shortTitle: "تعطیلات رسمی اتریش",
            description: "تقویم کامل تعطیلات فدرال، ایالتی و روزهای مرخصی پل زننده",
            icon: CalendarDays,
          },
          {
            id: "trust-examples",
            title: "نمونه‌های اعتماد و همیاری در جامعه اتریش‌نشین",
            shortTitle: "نمونه‌های اعتماد",
            description: "دستاوردهای جمعی کانون و بازخوردهای هموطنان مقیم اتریش",
            icon: Award,
          },
          {
            id: "volunteer",
            title: "کانون داوطلبان و برنامه‌های همیاری اجتماعی",
            shortTitle: "داوطلبان کانون",
            description: "پیوستن به جمع حامیان، مشاوران راهنما و یاران تازه‌واردها",
            icon: Users,
          },
        ],
      },
      {
        id: "smart-analytics",
        title: "سامانه‌های هوشمند و اعتبارسنجی",
        subtitle: "ابزارهای تحلیلی مبتنی بر هوش و قوانین اتریش",
        icon: Sparkles,
        items: [
          {
            id: "smart",
            title: "سامانه مرکزی ابزارهای هوشمند اتریش",
            shortTitle: "سامانه ابزارهای هوشمند",
            description: "مجموعه پردازشگرها و محاسبات تحلیلی وضعیت اقامت و حقوق",
            icon: Sparkles,
            badge: "هوشمند",
            highlight: true,
          },
          {
            id: "doccheck",
            title: "بررسی هوشمند مدارک و فرم‌ها (DocCheck)",
            shortTitle: "بررسی هوشمند مدارک",
            description: "چک‌لیست تطبیق مدارک با استانداردهای سفارت و ادارات اتریش",
            icon: ShieldCheck,
            badge: "هوشمند",
            highlight: true,
          },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "درباره و تماس",
    icon: MessageSquare,
    contextIcon: PhoneCall,
    contextBadge: "کانون",
    color: "from-stone-700 to-stone-900",
    hoverBg: "hover:bg-stone-100",
    activeBg: "bg-stone-900 text-white shadow-md shadow-stone-900/20",
    textColor: "text-stone-800",
    borderActive: "border-stone-800",
    description: "معرفی کانون مستقل ایرانیان اتریش و راه‌های ارتباطی",
    directSegment: "about",
  },
];

// Flat legacy NAV_ITEMS for backward compatibility
export interface NavItemConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  text: string;
  segments: string[];
  description: string;
}

export const NAV_ITEMS: NavItemConfig[] = STRUCTURED_MENU_CATEGORIES.map((cat) => {
  const allSegments: string[] = [];
  if (cat.directSegment) {
    allSegments.push(cat.directSegment);
  }
  if (cat.groups) {
    cat.groups.forEach((g) => {
      g.items.forEach((item) => allSegments.push(item.id));
    });
  }
  return {
    id: cat.id,
    label: cat.label,
    icon: cat.icon,
    color: cat.color,
    text: cat.textColor,
    segments: allSegments.length > 0 ? allSegments : [cat.id],
    description: cat.description,
  };
});

interface SuperAppNavigationBarProps {
  activeSegment: string;
  onSelectSegment: (segment: string) => void;
  isDocked?: boolean;
  onOpenMobileMenu?: () => void;
  onOpenSearch?: () => void;
  onOpenNews?: () => void;
}

export default function SuperAppNavigationBar({
  activeSegment,
  onSelectSegment,
  isDocked = false,
  onOpenMobileMenu,
  onOpenSearch,
  onOpenNews,
}: SuperAppNavigationBarProps) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [mobileDrawerCategory, setMobileDrawerCategory] = useState<NavCategoryConfig | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K for search, and Escape to close open menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenSearch?.();
      }
      if (e.key === "Escape") {
        setOpenCategoryId(null);
        setActiveGroupId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenSearch]);

  // Identify which category contains the activeSegment
  const activeCategory = useMemo(() => {
    for (const cat of STRUCTURED_MENU_CATEGORIES) {
      if (cat.directSegment === activeSegment) return cat;
      if (cat.groups) {
        for (const g of cat.groups) {
          if (g.items.some((it) => it.id === activeSegment)) {
            return cat;
          }
        }
      }
    }
    return STRUCTURED_MENU_CATEGORIES[0];
  }, [activeSegment]);

  // Sync active group when open category changes
  useEffect(() => {
    if (openCategoryId) {
      const currentCat = STRUCTURED_MENU_CATEGORIES.find((c) => c.id === openCategoryId);
      if (currentCat?.groups && currentCat.groups.length > 0) {
        // If current segment is in one of the groups, select that group, otherwise select first group
        const groupWithActiveItem = currentCat.groups.find((g) =>
          g.items.some((it) => it.id === activeSegment)
        );
        setActiveGroupId(groupWithActiveItem ? groupWithActiveItem.id : currentCat.groups[0].id);
      } else {
        setActiveGroupId(null);
      }
    } else {
      setActiveGroupId(null);
    }
  }, [openCategoryId, activeSegment]);

  // Close menus on outside click or Escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenCategoryId(null);
        setActiveGroupId(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenCategoryId(null);
        setActiveGroupId(null);
        setMobileDrawerCategory(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Hover triggers for Level 1 (Desktop)
  const handleLevel1MouseEnter = useCallback((cat: NavCategoryConfig) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (cat.groups && cat.groups.length > 0) {
      setOpenCategoryId(cat.id);
    } else {
      setOpenCategoryId(null);
    }
  }, []);

  const handleContainerMouseLeave = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setOpenCategoryId(null);
      setActiveGroupId(null);
    }, 200);
  }, []);

  const handleCategoryClick = useCallback(
    (cat: NavCategoryConfig) => {
      if (cat.directSegment) {
        onSelectSegment(cat.directSegment);
        setOpenCategoryId(null);
        setActiveGroupId(null);
        setMobileDrawerCategory(null);
        return;
      }

      if (cat.groups && cat.groups.length > 0) {
        // Toggle on click (for mobile/tablet tap)
        if (openCategoryId === cat.id) {
          setOpenCategoryId(null);
          setActiveGroupId(null);
        } else {
          setOpenCategoryId(cat.id);
          setActiveGroupId(cat.groups[0].id);
        }
      }
    },
    [onSelectSegment, openCategoryId]
  );

  const handleSubItemClick = useCallback(
    (segmentId: string) => {
      onSelectSegment(segmentId);
      setOpenCategoryId(null);
      setActiveGroupId(null);
      setMobileDrawerCategory(null);
    },
    [onSelectSegment]
  );

  // Active Category Data for the open dropdown
  const currentOpenCat = useMemo(
    () => STRUCTURED_MENU_CATEGORIES.find((c) => c.id === openCategoryId),
    [openCategoryId]
  );

  const currentActiveGroup = useMemo(() => {
    if (!currentOpenCat?.groups) return null;
    return (
      currentOpenCat.groups.find((g) => g.id === activeGroupId) || currentOpenCat.groups[0]
    );
  }, [currentOpenCat, activeGroupId]);

  return (
    <div
      ref={containerRef}
      className="main-nav w-full relative z-40 select-none"
      dir="rtl"
      onMouseLeave={handleContainerMouseLeave}
    >
      {/* ============================================================ */}
      {/* 🧭 NAVIGATION CONTAINER (Mobile Hamburger & Desktop Horizontal) */}
      {/* ============================================================ */}
      <nav
        aria-label="منوی اصلی ناوبری اتریش‌نشین"
        className={`w-full bg-white/95 border border-stone-200/90 rounded-2xl desktop:rounded-3xl p-1.5 backdrop-blur-md transition-all duration-300 shadow-md ${
          isDocked ? "shadow-xl border-stone-300 ring-1 ring-stone-900/5 bg-white/98" : ""
        }`}
      >
        {/* 📱 MOBILE / TABLET VIEW (< 1024px: flex desktop:hidden):
            Completely hides the horizontal list to prevent any scrolling. Replaces with a sleek hamburger bar */}
        <div className="flex desktop:hidden items-center justify-between px-2.5 py-1 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className={`w-8 h-8 rounded-xl bg-gradient-to-br ${activeCategory.color} flex items-center justify-center text-white shadow-xs shrink-0`}
            >
              {React.createElement(activeCategory.icon, { className: "w-4 h-4" })}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-stone-900 truncate flex items-center gap-1.5">
                <span>{activeCategory.label}</span>
                {activeCategory.contextBadge && (
                  <span className="text-[8.5px] px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-600 font-bold">
                    {activeCategory.contextBadge}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-stone-500 font-medium truncate">
                {activeCategory.description}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="جستجو در سامانه"
              className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-transform active:scale-95 cursor-pointer border border-stone-200"
              title="جستجو (⌘K)"
            >
              <Search className="w-4 h-4 text-stone-700" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (onOpenMobileMenu) {
                  onOpenMobileMenu();
                } else {
                  setMobileDrawerCategory(activeCategory);
                }
              }}
              aria-label="باز کردن منوی کشویی موبایل"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-black text-xs transition-transform active:scale-95 shadow-sm shrink-0 cursor-pointer"
            >
              <Menu className="w-4 h-4 text-white" />
              <span>منو و دسته‌ها</span>
            </button>
          </div>
        </div>

        {/* 💻 DESKTOP HORIZONTAL VIEW (>= 1024px: hidden desktop:flex):
            Strictly horizontal, zero scrolling, fits completely on desktop */}
        <div className="hidden desktop:flex items-center justify-between gap-1 desktop:gap-1.5 overflow-visible py-0.5">
          <div className="flex items-center gap-1 desktop:gap-1.5 flex-1 min-w-0">
            {STRUCTURED_MENU_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isCategoryActive = activeCategory.id === cat.id;
              const hasSubmenu = Boolean(cat.groups && cat.groups.length > 0);
              const isOpen = openCategoryId === cat.id;
              const ContextIcon = cat.contextIcon;

              return (
                <div
                  key={cat.id}
                  className="relative shrink desktop:flex-1 min-w-0 group/navitem"
                  onMouseEnter={() => handleLevel1MouseEnter(cat)}
                >
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat)}
                    aria-expanded={hasSubmenu ? isOpen : undefined}
                    className={`w-full px-2 desktop:px-2.5 py-2 desktop:py-2.5 rounded-xl desktop:rounded-2xl text-[11px] desktop:text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                      isCategoryActive
                        ? `bg-gradient-to-r ${cat.color} text-white shadow-md shadow-stone-900/10 scale-102`
                        : isOpen
                        ? "bg-stone-100 text-stone-950 ring-1 ring-stone-300"
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-950"
                    }`}
                    title={cat.description}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        isCategoryActive
                          ? "text-white"
                          : isOpen
                          ? "text-stone-950 scale-110"
                          : cat.textColor
                      }`}
                    />
                    <span className="leading-none tracking-tight truncate">{cat.label}</span>

                    {/* Small Context-Aware Micro-Icon / Mini-Badge */}
                    {ContextIcon && (
                      <span
                        className={`hidden xl:inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[8.5px] font-bold shrink-0 transition-colors leading-none ${
                          isCategoryActive
                            ? "bg-white/20 text-white"
                            : "bg-stone-200/60 text-stone-600 group-hover/navitem:bg-white group-hover/navitem:text-stone-900"
                        }`}
                        title={cat.contextBadge ? `${cat.label} — ${cat.contextBadge}` : undefined}
                      >
                        <ContextIcon className="w-2.5 h-2.5 shrink-0" />
                        {cat.contextBadge && (
                          <span className="font-mono text-[7.5px] uppercase">{cat.contextBadge}</span>
                        )}
                      </span>
                    )}

                    {hasSubmenu && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 shrink-0 ${
                          isOpen
                            ? "rotate-180 text-stone-950"
                            : isCategoryActive
                            ? "text-white/80"
                            : "text-stone-400 group-hover/navitem:text-stone-700"
                        }`}
                      />
                    )}
                  </button>

                  {/* Desktop Active Dot Indicator */}
                  {isCategoryActive && cat.id !== "home" && cat.id !== "about" && (
                    <span className="hidden desktop:block absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-600 ring-2 ring-white shadow-xs" />
                  )}
                </div>
              );
            })}
          </div>

          {/* 🔍 Desktop Quick Search Button in .main-nav */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="px-2.5 py-2 rounded-xl desktop:rounded-2xl bg-stone-100/90 hover:bg-stone-200 text-stone-700 hover:text-stone-950 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 border border-stone-200/80 mr-1 shadow-2xs group/searchnav"
            title="جستجوی هوشمند در خدمات، مدارک و راهنماها (Ctrl+K / ⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-stone-500 group-hover/searchnav:text-stone-950 transition-colors" />
            <span className="hidden xl:inline text-[11px] font-black">جستجو</span>
            <kbd className="hidden lg:inline-flex text-[9px] font-mono px-1 py-0.5 rounded bg-white border border-stone-300 text-stone-500 leading-none">
              ⌘K
            </kbd>
          </button>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* 🚀 DESKTOP MULTI-LEVEL HOVER DROPDOWN (Level 1 -> Level 2 -> Level 3) */}
      {/* Precise absolute position floating cleanly without shifting page layout */}
      {/* ============================================================ */}
      <AnimatePresence>
        {openCategoryId && currentOpenCat?.groups && (
          <motion.div
            key={currentOpenCat.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="hidden desktop:block absolute top-full left-0 right-0 mt-2 w-full bg-white/98 backdrop-blur-xl border border-stone-200 rounded-3xl shadow-2xl p-4 desktop:p-5 z-50 text-right ring-1 ring-stone-900/5 pointer-events-auto"
            onMouseEnter={() => {
              if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
            }}
            onMouseLeave={handleContainerMouseLeave}
          >
            {/* Top Bar: Active Category Header */}
            <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl bg-gradient-to-br ${currentOpenCat.color} flex items-center justify-center text-white shadow-xs shrink-0`}
                >
                  {React.createElement(currentOpenCat.icon, { className: "w-4 h-4" })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-stone-900">
                      {currentOpenCat.label}
                    </span>
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-650 border border-red-200/60">
                      🇦🇹 اتریش
                    </span>
                  </div>
                  <p className="text-[10.5px] text-stone-500 font-medium">
                    {currentOpenCat.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                  {currentOpenCat.groups.reduce((acc, g) => acc + g.items.length, 0)} ابزار و خدمت تخصصی
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setOpenCategoryId(null);
                    setActiveGroupId(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-650 hover:text-red-800 border border-red-200 transition-all cursor-pointer font-black text-xs flex items-center gap-1.5 shadow-2xs active:scale-95 shrink-0"
                  title="بستن منو (Esc)"
                  aria-label="بستن منو"
                >
                  <X className="w-4 h-4" />
                  <span>بستن منو</span>
                </button>
              </div>
            </div>

            {/* DUAL-PANE MULTI-LEVEL HIERARCHY:
                - Right Pane: Level 2 (Sub-Categories / Groups) on Hover
                - Left Pane: Level 3 (Items / Tools) corresponding to hovered group
            */}
            <div className="flex items-stretch gap-4 min-h-[290px]">
              {/* 📂 PANE 1 (RIGHT / LEVEL 2): Sub-Categories List */}
              <div className="w-72 bg-stone-50/80 border border-stone-200/80 rounded-2xl p-2.5 flex flex-col justify-between shrink-0">
                <div className="space-y-1.5">
                  <div className="text-[10px] font-black text-stone-400 px-2 pb-1">
                    دسته‌بندی‌های زیرمنو (سطح دوم)
                  </div>
                  {currentOpenCat.groups.map((group) => {
                    const GroupIcon = group.icon;
                    const isGroupActive = currentActiveGroup?.id === group.id;

                    return (
                      <button
                        key={group.id}
                        type="button"
                        onMouseEnter={() => setActiveGroupId(group.id)}
                        onClick={() => setActiveGroupId(group.id)}
                        className={`w-full text-right p-2.5 rounded-xl transition-all duration-150 flex items-center justify-between gap-2 cursor-pointer group/groupbtn ${
                          isGroupActive
                            ? `bg-white border-2 ${currentOpenCat.borderActive} shadow-sm font-black`
                            : "hover:bg-white/80 border border-transparent text-stone-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isGroupActive
                                ? `bg-gradient-to-br ${currentOpenCat.color} text-white shadow-xs`
                                : "bg-stone-200/80 text-stone-700 group-hover/groupbtn:bg-stone-800 group-hover/groupbtn:text-white"
                            }`}
                          >
                            <GroupIcon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 text-right">
                            <div
                              className={`text-xs truncate ${
                                isGroupActive ? "text-stone-950 font-black" : "text-stone-800"
                              }`}
                            >
                              {group.title}
                            </div>
                            {group.subtitle && (
                              <div className="text-[9.5px] text-stone-400 font-medium truncate">
                                {group.subtitle}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-md ${
                              isGroupActive
                                ? "bg-stone-150 text-stone-800"
                                : "bg-stone-200/60 text-stone-500"
                            }`}
                          >
                            {group.items.length}
                          </span>
                          <ChevronLeft
                            className={`w-3.5 h-3.5 transition-transform ${
                              isGroupActive
                                ? "text-red-650 -translate-x-0.5"
                                : "text-stone-300 group-hover/groupbtn:text-stone-600"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Submenu Helper badge */}
                <div className="pt-2 mt-2 border-t border-stone-200/60 px-2 flex items-center gap-1 text-[10px] text-stone-500 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                  برای تغییر زیرمنو، موس را روی هر عنوان نگه دارید.
                </div>
              </div>

              {/* 📑 PANE 2 (LEFT / LEVEL 3): Tools & Submenu Items */}
              <div className="flex-1 bg-stone-50/50 border border-stone-200/70 rounded-2xl p-3.5 flex flex-col justify-between">
                <div>
                  {/* Group header within pane */}
                  {currentActiveGroup && (
                    <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-stone-200/70">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-stone-200/80 flex items-center justify-center text-stone-700">
                          {React.createElement(currentActiveGroup.icon, { className: "w-3 h-3" })}
                        </div>
                        <span className="text-xs font-black text-stone-900">
                          {currentActiveGroup.title}
                        </span>
                        {currentActiveGroup.subtitle && (
                          <span className="text-[10.5px] text-stone-500 font-medium hidden lg:inline">
                            — {currentActiveGroup.subtitle}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-500 font-bold">
                        نمایش {currentActiveGroup.items.length} آیتم
                      </span>
                    </div>
                  )}

                  {/* Level 3 Items 2-Column Responsive Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {currentActiveGroup?.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isItemActive = activeSegment === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSubItemClick(item.id)}
                          className={`text-right p-2.5 rounded-xl transition-all duration-150 flex items-start gap-2.5 cursor-pointer group/card ${
                            isItemActive
                              ? `bg-white border-2 ${currentOpenCat.borderActive} shadow-xs ring-1 ring-stone-900/5`
                              : "bg-white/80 hover:bg-white border border-stone-200/80 hover:border-stone-300 hover:shadow-xs"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isItemActive
                                ? `bg-gradient-to-br ${currentOpenCat.color} text-white shadow-xs`
                                : "bg-stone-100 text-stone-700 group-hover/card:bg-stone-800 group-hover/card:text-white"
                            }`}
                          >
                            <ItemIcon className="w-3.5 h-3.5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className={`text-xs font-black truncate ${
                                  isItemActive
                                    ? "text-stone-950 font-black"
                                    : "text-stone-800 group-hover/card:text-stone-950"
                                }`}
                              >
                                {item.shortTitle || item.title}
                              </span>
                              {item.badge && (
                                <span
                                  className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded shrink-0 leading-none ${
                                    item.badge === "جدید"
                                      ? "bg-rose-100 text-rose-700 border border-rose-200"
                                      : item.badge === "پربازدید"
                                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                                      : item.badge === "هوشمند"
                                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                                      : item.badge === "ضروری"
                                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                      : "bg-blue-100 text-blue-800 border border-blue-200"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-stone-500 font-medium line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          </div>

                          <ChevronLeft
                            className={`w-3.5 h-3.5 shrink-0 mt-1 transition-transform ${
                              isItemActive
                                ? "text-red-650"
                                : "text-stone-300 group-hover/card:text-stone-700 group-hover/card:-translate-x-0.5"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Legal Note */}
                <div className="pt-2 mt-3 border-t border-stone-200/50 flex items-center justify-between text-[10px] text-stone-400">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <Check className="w-3 h-3 text-emerald-600" />
                    به‌روزرسانی رسمی طبق مصوبات سال ۲۰۲۶ جمهوری اتریش
                  </span>
                  <span>کانون مستقل همیاری ایرانیان اتریش</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 📱 MOBILE / TABLET ACCORDION SHEET (< 1024px) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {openCategoryId && currentOpenCat?.groups && (
          <motion.div
            key={`mobile-${currentOpenCat.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="block desktop:hidden mt-2 bg-white rounded-2xl border border-stone-200 p-3 shadow-xl z-50 text-right overflow-hidden"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
              <span className="text-xs font-black text-stone-900 flex items-center gap-1.5">
                {currentOpenCat.label}
              </span>
              <button
                type="button"
                onClick={() => setOpenCategoryId(null)}
                className="p-1 rounded-full text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {currentOpenCat.groups.map((group) => (
                <div key={group.id} className="space-y-1">
                  <div className="text-[10.5px] font-black text-stone-500 bg-stone-100 px-2 py-1 rounded-lg">
                    {group.title}
                  </div>
                  <div className="space-y-1 pr-1">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSubItemClick(item.id)}
                        className={`w-full text-right p-2 rounded-lg text-xs font-bold flex items-center justify-between ${
                          activeSegment === item.id
                            ? "bg-red-50 text-red-700 font-black"
                            : "hover:bg-stone-50 text-stone-700"
                        }`}
                      >
                        <span className="truncate">{item.shortTitle || item.title}</span>
                        {item.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
