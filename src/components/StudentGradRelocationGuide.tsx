import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap, Briefcase, Clock, Euro, FileText, CheckCircle,
  Info, ChevronDown, Sparkles, Zap, Star, Users, PhoneCall,
  Send, Globe, Heart, Shield, Building2, MapPin, Award,
  Target, TrendingUp, Calendar, Quote, AlertCircle, Landmark,
  Key, Layers, Percent, Wallet, BookOpen, Copy, Filter,
  Grid3x3, University, Rocket, Compass, BadgeCheck, Timer,
  CircleDollarSign, Scale, UserCheck, Search, ArrowUpRight,
  Star as StarIcon, Trophy, Coffee, Laptop, Handshake,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
  graduation: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
  career: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
  vienna: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  interview: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// TYPES
// ==========================================
type TimelineStageId = "post-study" | "search" | "offer" | "rwr-application" | "approval";

type TimelineStage = {
  id: TimelineStageId;
  num: number;
  title: string;
  titleDe: string;
  duration: string;
  description: string;
  icon: any;
  gradient: string;
  color: string;
  actions: string[];
  tips: string[];
  warnings?: string[];
};

type JobField = {
  id: string;
  name: string;
  demand: "high" | "medium" | "low";
  avgSalary: string;
  salaryNumeric: number;
  growth: number;
  icon: any;
  gradient: string;
  color: string;
  description: string;
  topRoles: string[];
  topCompanies: string[];
  rwrEligible: boolean;
};

// ==========================================
// 12-MONTH TIMELINE
// ==========================================
const TIMELINE: TimelineStage[] = [
  {
    id: "post-study",
    num: 1,
    title: "ثبت درخواست اقامت جستجوی کار",
    titleDe: "Aufenthaltsbewilligung 'Jobsuchende'",
    duration: "۱ تا ۴ هفته",
    description:
      "پس از فارغ‌التحصیلی، باید قبل از انقضای کارت اقامت دانشجویی، درخواست اقامت جستجوی کار (12-Monats-Aufenthaltsbewilligung) را ثبت کنید. این درخواست در MA 35 وین ارائه می‌شود و برای فارغ‌التحصیلان دانشگاه‌های معتبر اتریشی طراحی شده است.",
    icon: FileText,
    gradient: "from-[#c8102e] to-[#970d22]",
    color: "text-[#c8102e]",
    actions: [
      "دریافت مدرک فارغ‌التحصیلی رسمی (Abschlusszeugnis)",
      "تاییدیه اتمام تحصیل از دانشگاه (Studienabschlussbescheinigung)",
      "تکمیل فرم درخواست در MA 35 یا آنلاین",
      "ارائه پاسپورت معتبر (حداقل ۶ ماه)",
      "ارائه بیمه درمانی معتبر (ÖGK یا خصوصی)",
      "ارائه اثبات تمکن مالی (حداقل €۱,۲۴۵ ماهانه)",
      "ارائه Meldezettel و اثبات اسکان",
    ],
    tips: [
      "حداقل ۳ ماه قبل از انقضای کارت دانشجویی، درخواست را ثبت کنید",
      "پروسه معمولاً ۲ تا ۴ هفته طول می‌کشد — عجله نکنید اما تاخیر هم نکنید",
      "تا زمان تایید اقامت جدید، اجازه اقامت خود را تمدید کنید",
    ],
    warnings: [
      "عدم ثبت درخواست قبل از انقضا = از دست دادن فرصت ۱۲ ماهه",
      "پرداخت غیرقانونی در این مرحله می‌تواند منجر به رد درخواست شود",
    ],
  },
  {
    id: "search",
    num: 2,
    title: "جستجوی فعال کار در اتریش",
    titleDe: "Aktive Jobsuche — ۱۲ Monate",
    duration: "تا ۱۲ ماه",
    description:
      "شما الان یک اقامت قانونی ۱۲ ماهه برای جستجوی کار در اتریش دارید. این فرصت‌ها شما را واجد شرایط به کار در هر شغلی می‌کند — از کار تمام‌وقت تا پاره‌وقت — با شرط تطابق با مدرک تحصیلی. برای اتباع غیر-EU، استفاده از این دوره با جستجوی فعال و سیستماتیک، شانس دریافت کارت RWR را تا ۸۵٪ افزایش می‌دهد.",
    icon: Briefcase,
    gradient: "from-indigo-600 to-blue-700",
    color: "text-indigo-700",
    actions: [
      "ثبت‌نام در AMS (سازمان کار اتریش) و مشاهده آگهی‌ها",
      "به‌روزرسانی رزومه آلمانی (Lebenslauf) و انگلیسی",
      "ثبت‌نام در LinkedIn، Xing و Karriere.at",
      "استفاده از شبکه دانشجویی و Alumni دانشگاه",
      "ارسال درخواست به‌طور هدفمند (۱۵-۲۰ درخواست در هفته)",
      "شرکت در Jobmessen و رویدادهای شبکه‌سازی",
      "مصاحبه‌های آزمایشی (Mock Interviews) با مشاوران AMS",
    ],
    tips: [
      "در ۳ ماه اول تمرکز بر شرکت‌های بزرگ و بین‌المللی که انگلیسی صحبت می‌کنند",
      "هر شنبه، آگهی‌های جدید هفته را مرور کنید",
      "پروفایل LinkedIn خود را به آلمانی هم بسازید — ۶۰٪ فرصت‌ها آلمانی‌اند",
      "در طول دوره، اجازه کار پاره‌وقت و تمام‌وقت را دارید اما با محدودیت‌های خاص",
    ],
  },
  {
    id: "offer",
    num: 3,
    title: "دریافت پیشنهاد کار (Job Offer)",
    titleDe: "Arbeitsplatzangebot",
    duration: "متغیر — معمولاً ۲-۶ ماه",
    description:
      "وقتی موفق به دریافت جاب‌آفر شدید، کارفرما باید آماده‌سازی مدارک RWR Card را آغاز کند. برای ویزای RWR Card، شغل باید با مدرک تحصیلی شما مطابقت داشته باشد و حداقل حقوق مشخصی (€۲,۸۵۰ بروتو برای فارغ‌التحصیلان ۲۰۲۶) پرداخت کند.",
    icon: Handshake,
    gradient: "from-emerald-600 to-teal-700",
    color: "text-emerald-700",
    actions: [
      "دریافت قرارداد کار رسمی (Dienstvertrag) با حداقل حقوق",
      "تاییدیه کارفرما برای شروع پروسه RWR Card",
      "دریافت Beschäftigungsbewilligung از AMS",
      "ارائه مدارک به MA 35 برای صدور RWR Card",
      "انتظار برای پاسخ AMS و شهرداری (معمولاً ۴-۸ هفته)",
    ],
    tips: [
      "حداقل حقوق RWR ۲۰۲۶ برای فارغ‌التحصیلان: €۲,۸۵۰ بروتو ماهانه",
      "برای مشاغل کمیاب (Mangelberufe)، شرایط آسان‌تر است",
      "حداقل ۴ هفته قبل از انقضای اقامت جستجوی کار، درخواست RWR را ثبت کنید",
    ],
    warnings: [
      "اگر حقوق کمتر از حد مصوب باشد، درخواست RWR رد می‌شود",
      "شغل باید با رشته تحصیلی شما مرتبط باشد",
    ],
  },
  {
    id: "rwr-application",
    num: 4,
    title: "ثبت درخواست کارت سرخ-سفید-سرخ",
    titleDe: "Rot-Weiß-Rot Karte Antrag",
    duration: "۴ تا ۸ هفته",
    description:
      "اگر جاب‌آفر شما از طریق AMS تایید شد، پرونده RWR Card شما به مرحله اجرا می‌رسد. این مرحله گام نهایی برای تبدیل اقامت جستجوی کار به اقامت کاری بلندمدت است که به شما اجازه اقامت و کار در اتریش را برای ۲۴ ماه می‌دهد.",
    icon: BadgeCheck,
    gradient: "from-amber-500 to-orange-600",
    color: "text-amber-700",
    actions: [
      "ارسال درخواست به MA 35 با تمام مدارک",
      "تاییدیه از AMS مبنی بر قانونی بودن اشتغال",
      "پرداخت هزینه درخواست (€۱۶۰)",
      "انگشت‌نگاری و عکس بیومتریک",
      "انتظار برای تایید نهایی (۴-۸ هفته)",
    ],
    tips: [
      "پس از تایید، کارت جدید برای ۲۴ ماه معتبر است",
      "در این ۲۴ ماه می‌توانید شغل عوض کنید اما همیشه با RWR",
      "پس از ۲۴ ماه، امکان تمدید یا اخذ Daueraufenthalt (اقامت دائم) وجود دارد",
    ],
  },
  {
    id: "approval",
    num: 5,
    title: "دریافت کارت RWR و شروع کار",
    titleDe: "Erhalt der RWR Karte & Arbeitsbeginn",
    duration: "۱۰ تا ۱۵ روز",
    description:
      "کارت RWR فیزیکی شما صادر شده و برای ۲۴ ماه معتبر است. اکنون شما یک مقیم قانونی اتریش با حق کار تمام‌وقت، بیمه سلامت، تأمین اجتماعی و مسیر روشن به اقامت دائم و شهروندی هستید.",
    icon: Trophy,
    gradient: "from-rose-600 to-red-700",
    color: "text-rose-700",
    actions: [
      "دریافت کارت RWR فیزیکی از MA 35",
      "شروع رسمی کار در تاریخ توافق‌شده",
      "دریافت Sozialversicherungsnummer",
      "ثبت‌نام در اتحادیه کارگری (Arbeiterkammer)",
      "به‌روزرسانی وضعیت در Finanzamt و GIS",
    ],
    tips: [
      "پس از ۱۲ ماه کار، امکان درخواست Daueraufenthalt EU (اقامت دائم ۵ ساله) وجود دارد",
      "پس از ۶ سال اقامت، امکان درخواست پاسپورت اتریش (با شرایط زبان B1)",
      "از این لحظه، مالیات بر درآمد و بیمه اجتماعی شما به‌صورت خودکار توسط کارفرما پرداخت می‌شود",
    ],
  },
];

// ==========================================
// JOB FIELDS DATA
// ==========================================
const JOB_FIELDS: JobField[] = [
  {
    id: "it",
    name: "تکنولوژی اطلاعات و نرم‌افزار",
    demand: "high",
    avgSalary: "€۳,۵۰۰ - €۵,۵۰۰",
    salaryNumeric: 4500,
    growth: 92,
    icon: Laptop,
    gradient: "from-sky-600 to-blue-700",
    color: "text-sky-700",
    description:
      "بزرگ‌ترین بازار کار برای فارغ‌التحصیلان اتریش — از توسعه‌دهنده نرم‌افزار و مهندس داده تا متخصص امنیت سایبری و هوش مصنوعی. شرکت‌های بزرگی مانند Red Bull، Erste Bank و SAP Austria همیشه در حال استخدام متخصصان IT هستند.",
    topRoles: ["Software Developer", "Data Engineer", "Cloud Architect", "AI/ML Specialist"],
    topCompanies: ["Red Bull", "Erste Bank", "SAP Austria", "Bosch", "Dynatrace"],
    rwrEligible: true,
  },
  {
    id: "healthcare",
    name: "بهداشت، پرستاری و مراقبت",
    demand: "high",
    avgSalary: "€۳,۲۰۰ - €۴,۸۰۰",
    salaryNumeric: 4000,
    growth: 88,
    icon: Heart,
    gradient: "from-rose-600 to-red-700",
    color: "text-rose-700",
    description:
      "با توجه به پیری جمعیت اتریش، تقاضا برای کادر درمان و مراقبت از سالمندان بی‌نظیر است. از پزشکان و پرستاران تا ماما و فیزیوتراپیست — این حوزه جزو مشاغل فهرست کمبود نیرو (Mangelberufe) اتریش است و امکان دریافت RWR Card با شرایط آسان‌تر دارد.",
    topRoles: ["Registered Nurse", "Physician", "Physiotherapist", "Geriatric Care"],
    topCompanies: ["AKH Wien", "KAV", "Barmherzige Brüder", "Ordensklinikum", "VAMED"],
    rwrEligible: true,
  },
  {
    id: "engineering",
    name: "مهندسی و ساخت",
    demand: "high",
    avgSalary: "€۳,۸۰۰ - €۵,۸۰۰",
    salaryNumeric: 4800,
    growth: 78,
    icon: Building2,
    gradient: "from-emerald-600 to-teal-700",
    color: "text-emerald-700",
    description:
      "صنعت مهندسی اتریش یکی از قوی‌ترین اقتصادهای اروپا است. از مهندسی مکانیک و برق تا مهندسی عمران و شیمی — شرکت‌های بزرگ مانند Voestalpine، Andritz و Wienerberger در حال استخدام هستند.",
    topRoles: ["Mechanical Engineer", "Electrical Engineer", "Civil Engineer", "Project Manager"],
    topCompanies: ["Voestalpine", "Andritz", "Wienerberger", "OMV", "Siemens Austria"],
    rwrEligible: true,
  },
  {
    id: "finance",
    name: "مالی، بانکداری و حسابداری",
    demand: "medium",
    avgSalary: "€۳,۳۰۰ - €۵,۰۰۰",
    salaryNumeric: 4150,
    growth: 65,
    icon: CircleDollarSign,
    gradient: "from-violet-600 to-purple-700",
    color: "text-violet-700",
    description:
      "وین مرکز مالی اتریش و یکی از مهم‌ترین قطب‌های بانکداری در اروپا است. از بانکداری و مدیریت ریسک تا حسابداری و مالیات — نیاز به متخصصان مالی چندزبانه بالاست.",
    topRoles: ["Financial Analyst", "Risk Manager", "Accountant", "Tax Advisor"],
    topCompanies: ["Erste Bank", "Raiffeisen", "Bank Austria", "KPMG", "Deloitte"],
    rwrEligible: true,
  },
  {
    id: "legal",
    name: "حقوق، وکالت و مشاوره",
    demand: "medium",
    avgSalary: "€۳,۵۰۰ - €۵,۵۰۰",
    salaryNumeric: 4500,
    growth: 55,
    icon: Scale,
    gradient: "from-amber-500 to-orange-600",
    color: "text-amber-700",
    description:
      "حوزه حقوق در اتریش نیازمند مدرک اتریشی و تسلط آلمانی سطح C1 است. برای فارغ‌التحصیلان دانشگاه‌های حقوقی اتریشی که آلمانی‌زبان هستند، فرصت‌های فراوانی وجود دارد.",
    topRoles: ["Rechtsanwalt", "Notar", "Unternehmensjurist", "Compliance Officer"],
    topCompanies: ["Freshfields", "Wolf Theiss", "Schoenherr", "Dorda", "Cerha Hempel"],
    rwrEligible: false,
  },
  {
    id: "education",
    name: "آموزش، پژوهش و آکادمی",
    demand: "medium",
    avgSalary: "€۳,۰۰۰ - €۴,۵۰۰",
    salaryNumeric: 3750,
    growth: 60,
    icon: GraduationCap,
    gradient: "from-teal-600 to-cyan-700",
    color: "text-teal-700",
    description:
      "دانشگاه‌های اتریش و مراکز تحقیقاتی بین‌المللی (مانند IST Austria) در حال جذب پژوهشگران و اساتید هستند. امکان ادامه تحصیل در مقطع دکترا و کار در پروژه‌های تحقیقاتی بین‌المللی.",
    topRoles: ["Research Scientist", "University Lecturer", "Project Researcher", "Postdoc"],
    topCompanies: ["Universität Wien", "TU Wien", "IST Austria", "ÖAW", "MedUni Wien"],
    rwrEligible: true,
  },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "۱۲", label: "ماه فرصت جستجوی کار", icon: Clock },
  { value: "€۲,۸۵۰", label: "حداقل حقوق RWR ۲۰۲۶", icon: Euro },
  { value: "۸۵٪", label: "نرخ موفقیت با جستجوی فعال", icon: TrendingUp },
  { value: "۲۴", label: "ماه اعتبار RWR Card", icon: BadgeCheck },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "چقدر زمان برای پیدا کردن کار پس از فارغ‌التحصیلی دارم؟",
    a: "شما ۱۲ ماه اقامت قانونی برای جستجوی کار در اتریش دارید. این اقامت از روز تایید درخواست شروع می‌شود و تا انقضای آن باید جاب‌آفر معتبر و RWR Card دریافت کنید. در این ۱۲ ماه، می‌توانید آزادانه در اتریش بمانید، به دنبال کار بگردید، در مصاحبه‌ها شرکت کنید و حتی شغل‌های پاره‌وقت بپذیرید.",
  },
  {
    q: "آیا در طول اقامت جستجوی کار می‌توانم کار کنم؟",
    a: "بله، با محدودیت. اقامت جستجوی کار اجازه می‌دهد در طول ۱۲ ماه، شغل‌های موقت، پاره‌وقت یا حتی تمام‌وقت را بپذیرید (حداکثر ۲۰ ساعت در هفته). اگر شغل تمام‌وقت پیدا کردید، باید فوراً برای تبدیل اقامت جستجوی کار به RWR Card درخواست دهید.",
  },
  {
    q: "آیا اقامت جستجوی کار برای تمام فارغ‌التحصیلان قابل دریافت است؟",
    a: "بله، اما فقط برای فارغ‌التحصیلانی که مدرک خود را از دانشگاه معتبر اتریشی دریافت کرده‌اند. برای فارغ‌التحصیلان دانشگاه‌های غیر اتریشی، این اقامت قابل دریافت نیست. شرط دوم: درخواست باید قبل از انقضای اقامت دانشجویی فعلی ثبت شود.",
  },
  {
    q: "اگر در این ۱۲ ماه کار پیدا نکنم چه اتفاقی می‌افتد؟",
    a: "در این صورت باید اتریش را ترک کنید. مگر اینکه گزینه‌های جایگزین داشته باشید: ۱) ادامه تحصیل در مقطع بالاتر (دکترا) ۲) ازدواج با شهروند اتریشی یا مقیم دائم ۳) اخذ ویزای توریستی و جستجوی مجدد. توصیه می‌شود از همان روز اول برنامه‌ریزی جدی برای جستجوی کار داشته باشید.",
  },
  {
    q: "آیا اقامت جستجوی کار به اقامت دائم اتریش منجر می‌شود؟",
    a: "بله، اگر در طول آن موفق به دریافت RWR Card شوید. اقامت جستجوی کار خود به تنهایی به اقامت دائم منجر نمی‌شود، اما ۱۲ ماه آن در محاسبه ۵ سال اقامت برای دریافت Daueraufenthalt (اقامت دائم اتحادیه اروپا) به حساب می‌آید. پس از دریافت RWR Card، در صورت حفظ شغل و پرداخت مالیات، مسیر تا شهروندی اتریش باز می‌شود.",
  },
  {
    q: "برای دریافت RWR Card پس از فارغ‌التحصیلی، چه شرایطی لازم است؟",
    a: "شرایط کلیدی: ۱) داشتن مدرک تحصیلی اتریشی (لیسانس یا بالاتر) ۲) جاب‌آفر معتبر با حداقل حقوق €۲,۸۵۰ بروتو ماهانه (۲۰۲۶) ۳) شغل مرتبط با رشته تحصیلی ۴) تاییدیه AMS برای شروع پروسه ۵) اقامت قانونی فعلی در اتریش. برای مشاغل کمیاب اتریش (Mangelberufe) شرایط آسان‌تر است.",
  },
  {
    q: "آیا می‌توانم در طول اقامت جستجوی کار، شغل خود را در اتریش عوض کنم؟",
    a: "در طول اقامت جستجوی کار، اگر یک شغل موقت یا پاره‌وقت داشته باشید و شغل بهتری پیدا کنید، می‌توانید آزادانه عوض کنید. اما پس از دریافت RWR Card، تغییر شغل نیازمند تاییدیه جدید از AMS است. برای ۲۴ ماه اول RWR، تغییر شغل با تاییدیه رسمی امکان‌پذیر است.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const StudentGradRelocationGuide: React.FC = () => {
  const [activeTimeline, setActiveTimeline] = useState<TimelineStageId>("post-study");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeField, setActiveField] = useState<string>("it");
  const [demandFilter, setDemandFilter] = useState<string | null>(null);

  const activeTimelineData = useMemo(
    () => TIMELINE.find((t) => t.id === activeTimeline)!,
    [activeTimeline]
  );

  const activeFieldData = useMemo(
    () => JOB_FIELDS.find((f) => f.id === activeField)!,
    [activeField]
  );

  const filteredFields = useMemo(() => {
    if (!demandFilter) return JOB_FIELDS;
    return JOB_FIELDS.filter((f) => f.demand === demandFilter);
  }, [demandFilter]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("کپی شد!");
  };

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "راهنمای کامل اقامت جستجوی کار پس از فارغ‌التحصیلی در اتریش",
      description:
        "راهنمای گام‌به‌گام تبدیل اقامت دانشجویی به کارت RWR پس از فارغ‌التحصیلی از دانشگاه‌های اتریش — ۱۲ ماه فرصت جستجوی کار، دریافت Job Offer و درخواست RWR Card.",
      inLanguage: "fa-IR",
      totalTime: "P12M",
      step: TIMELINE.map((s) => ({
        "@type": "HowToStep",
        position: s.num,
        name: s.title,
        text: s.description,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "حوزه‌های شغلی برتر برای فارغ‌التحصیلان اتریش",
      itemListElement: JOB_FIELDS.map((f, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: f.name,
        description: `تقاضا: ${f.demand} — میانگین حقوق: ${f.avgSalary}`,
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
      "@type": "Article",
      headline: "اقامت پس از فارغ‌التحصیلی در اتریش — راهنمای ۱۲ ماه فرصت جستجوی کار",
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
  ];

  return (
    <GuideContainer
      title="اقامت پس از فارغ‌التحصیلی در اتریش"
      description="راهنمای کامل استفاده از فرصت ۱۲ ماهه اقامت برای فارغ‌التحصیلان دانشگاه‌های اتریش جهت جستجوی کار و دریافت کارت سرخ-سفید-سرخ (RWR Card)"
    >
      <SEO
        title="اقامت پس از فارغ‌التحصیلی اتریش ۲۰۲۶ | ۱۲ ماه فرصت جستجوی کار و RWR Card"
        description="راهنمای کامل اقامت جستجوی کار برای فارغ‌التحصیلان اتریش: ثبت درخواست، ۱۲ ماه فرصت، دریافت Job Offer و تبدیل به RWR Card. مراحل رسمی MA35 و AMS با نرخ‌های ۲۰۲۶."
        keywords="اقامت پس از فارغ‌التحصیلی اتریش, Jobsuchende Aufenthalt, RWR Card فارغ‌التحصیلان, 12 Monats Aufenthalt, MA35 دانشجویی, کار پس از تحصیل اتریش, Mangelberufe اتریش"
        type="guide"
        aiSummary="راهنمای جامع تبدیل اقامت دانشجویی به RWR Card در اتریش پس از فارغ‌التحصیلی. شامل ۵ مرحله رسمی، ۶ حوزه شغلی برتر، حداقل حقوق €۲,۸۵۰ بروتو و مسیر تا اقامت دائم."
        aiKeywords={["Austria post-study residence", "RWR Card graduates", "Job search visa Austria", "MA35 student to work permit"]}
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
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <img
              src={IMAGES.hero}
              alt="فارغ‌التحصیلی در دانشگاه اتریش"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#1e1512]/90 via-[#38100e]/80 to-[#9e142d]/60" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            🎓
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              راهنمای رسمی فارغ‌التحصیلان — سال ۲۰۲۶
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              بعد از فارغ‌التحصیلی، ۱۲ ماه فرصت طلایی برای ماندن در اتریش
            </h1>

            <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-6">
              فارغ‌التحصیلی پایان راه نیست — شروع مرحله‌ای جدید است.
              با <strong className="text-amber-300">اقامت جستجوی کار ۱۲ ماهه</strong>، می‌توانید
              در اتریش بمانید، شغل پیدا کنید و اقامت خود را به
              <strong className="text-amber-300"> RWR Card</strong> با حقوق حداقل
              <strong className="text-amber-300"> €۲,۸۵۰</strong> تبدیل کنید. این راهنما،
              تمام ۵ گام رسمی و ۶ حوزه شغلی برتر را به شما نشان می‌دهد.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>۵ گام رسمی MA35</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>قوانین ۲۰۲۶</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>تجربه فارغ‌التحصیلان ایرانی</span>
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
                    <div className="text-[9px] font-black text-rose-100/70 leading-tight">
                      {s.label}
                    </div>
                  </div>
                );
              })}
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Quote className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-[#c8102e] mb-1">
                ۸۵٪ فارغ‌التحصیلان موفق
              </div>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">
                <strong className="text-[#c8102e]">۸۵٪ فارغ‌التحصیلان دانشگاه‌های اتریش که این مسیر را به‌درستی طی می‌کنند، در طول ۱۲ ماه موفق به دریافت RWR Card می‌شوند.</strong> اما
                تنها شرط این موفقیت، شروع زودهنگام و پیگیری مستمر است. بیشترین شکست‌ها از
                <strong className="text-rose-700"> تاخیر در ثبت درخواست اقامت جستجوی کار</strong> و
                <strong className="text-rose-700"> نبود برنامه‌ریزی سیستماتیک</strong> ناشی می‌شود.
                خوشبختانه اتریش یکی از سخاوتمندترین سیستم‌های حمایت از فارغ‌التحصیلان را دارد.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* TIMELINE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#c8102e]" />
              ۵ گام رسمی از فارغ‌التحصیلی تا کارت RWR
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              روی هر گام کلیک کنید تا جزئیات، اقدامات و نکات کلیدی آن را ببینید
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mb-5 flex gap-2">
            {TIMELINE.map((t) => {
              const isActive = activeTimeline === t.id;
              const isCompleted = t.num < activeTimelineData.num;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTimeline(t.id)}
                  className="flex-1 group"
                >
                  <div className={`h-2 rounded-full transition-all ${
                    isActive ? `bg-gradient-to-r ${t.gradient}` :
                    isCompleted ? "bg-emerald-500" : "bg-stone-200"
                  }`} />
                  <div className={`text-[9px] font-black mt-1.5 transition-colors ${
                    isActive ? t.color : isCompleted ? "text-emerald-600" : "text-stone-400"
                  }`}>
                    گام {t.num}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active stage detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTimeline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-72 md:h-auto min-h-[420px] overflow-hidden">
                  <img
                    src={
                      activeTimeline === "post-study"
                        ? IMAGES.graduation
                        : activeTimeline === "search"
                        ? IMAGES.career
                        : activeTimeline === "offer"
                        ? IMAGES.interview
                        : activeTimeline === "rwr-application"
                        ? IMAGES.office
                        : IMAGES.vienna
                    }
                    alt={activeTimelineData.titleDe}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${activeTimelineData.gradient} opacity-45 mix-blend-multiply`} />
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black text-stone-800 shadow-md">
                    <Clock className="w-3 h-3 text-[#c8102e]" />
                    {activeTimelineData.duration}
                  </div>
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <span className={`text-lg font-black font-mono ${activeTimelineData.color}`}>
                      {activeTimelineData.num}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">
                    <div className="text-[9px] font-black text-white/80 mb-1">مرحله {activeTimelineData.num} از ۵</div>
                    <div className="text-sm font-black text-white leading-tight">
                      {activeTimelineData.title}
                    </div>
                    <div className="text-[10px] text-white/70 font-bold font-mono mt-0.5" dir="ltr">
                      {activeTimelineData.titleDe}
                    </div>
                  </div>
                </div>

                {/* Content panel */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-black text-stone-900 mb-3 leading-tight">
                    {activeTimelineData.title}
                  </h3>

                  <p className="text-xs text-stone-600 font-bold leading-relaxed mb-5">
                    {activeTimelineData.description}
                  </p>

                  {/* Actions */}
                  <div className="mb-4">
                    <div className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      اقدامات ضروری
                    </div>
                    <ul className="space-y-1.5">
                      {activeTimelineData.actions.map((a, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-[10px] text-stone-700 font-bold leading-relaxed">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tips */}
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 mb-3">
                    <div className="text-[10px] font-black text-amber-700 mb-2 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      نکات طلایی
                    </div>
                    <ul className="space-y-1.5">
                      {activeTimelineData.tips.map((t, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Star className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5 fill-current" />
                          <span className="text-[10px] text-amber-900 font-bold leading-relaxed">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warnings */}
                  {activeTimelineData.warnings && (
                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3">
                      <div className="text-[10px] font-black text-rose-700 mb-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        هشدارهای مهم
                      </div>
                      <ul className="space-y-1.5">
                        {activeTimelineData.warnings.map((w, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertCircle className="w-3 h-3 text-rose-600 flex-shrink-0 mt-0.5" />
                            <span className="text-[10px] text-rose-800 font-bold leading-relaxed">{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* JOB FIELDS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#c8102e]" />
              ۶ حوزه شغلی برتر برای فارغ‌التحصیلان در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              بر اساس آمار رسمی AMS و بازار کار سال ۲۰۲۶
            </p>
          </div>

          {/* Demand filter */}
          <div className="flex gap-2 flex-wrap mb-5">
            <Filter className="w-4 h-4 text-stone-500 mt-2" />
            {[
              { key: null, label: "همه حوزه‌ها", icon: Grid3x3 },
              { key: "high", label: "تقاضای بالا", icon: TrendingUp },
              { key: "medium", label: "تقاضای متوسط", icon: Target },
              { key: "low", label: "تقاضای کم", icon: Coffee },
            ].map((f) => {
              const Icon = f.icon;
              const isActive = demandFilter === f.key;
              return (
                <button
                  key={String(f.key)}
                  onClick={() => setDemandFilter(f.key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Field tabs */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-5">
            <AnimatePresence mode="popLayout">
              {filteredFields.map((f) => {
                const Icon = f.icon;
                const isActive = activeField === f.id;
                return (
                  <motion.button
                    key={f.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setActiveField(f.id)}
                    className={`relative overflow-hidden rounded-2xl border-2 p-3 text-center transition-all ${
                      isActive
                        ? "border-[#c8102e] shadow-lg shadow-rose-100"
                        : "border-stone-200 hover:border-stone-300 bg-white"
                    }`}
                  >
                    <div className={`w-9 h-9 mx-auto rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white shadow-md mb-2`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-[10px] font-black text-stone-900 leading-tight">{f.name}</div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Active field detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeField}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 md:p-8"
            >
              <div className="grid md:grid-cols-5 gap-6">
                {/* Left: Info */}
                <div className="md:col-span-3 space-y-5">
                  <div className="flex items-start gap-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeFieldData.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                      <activeFieldData.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-stone-900">
                        {activeFieldData.name}
                      </h3>
                      <div className={`inline-flex items-center gap-1.5 text-[10px] font-black mt-1 px-2.5 py-0.5 rounded-full ${
                        activeFieldData.demand === "high" ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : activeFieldData.demand === "medium" ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}>
                        <TrendingUp className="w-3 h-3" />
                        تقاضا: {activeFieldData.demand === "high" ? "بالا" : activeFieldData.demand === "medium" ? "متوسط" : "کم"}
                      </div>
                      {activeFieldData.rwrEligible ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black mt-1 ml-2 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                          <BadgeCheck className="w-3 h-3" />
                          واجد RWR Card
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black mt-1 ml-2 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                          <Info className="w-3 h-3" />
                          نیازمند مدرک اتریشی
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 font-bold leading-relaxed">
                    {activeFieldData.description}
                  </p>

                  {/* Top roles */}
                  <div>
                    <div className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <UserCheck className="w-3 h-3" />
                      برترین نقش‌های شغلی
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeFieldData.topRoles.map((r, i) => (
                        <span key={i} className="text-[10px] font-black text-stone-700 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full font-mono" dir="ltr">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top companies */}
                  <div>
                    <div className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      شرکت‌های برتر برای استخدام
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeFieldData.topCompanies.map((c, i) => (
                        <span key={i} className="text-[10px] font-black text-stone-700 bg-white border border-stone-200 px-2.5 py-1 rounded-full">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Stats */}
                <div className="md:col-span-2 space-y-4">
                  {/* Salary */}
                  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${activeFieldData.gradient} p-5 text-white`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative">
                      <Euro className="w-4 h-4 mb-2" />
                      <div className="text-[10px] font-black text-white/80 mb-1">
                        میانگین حقوق ماهانه (بروتو)
                      </div>
                      <div className="text-xl font-black font-mono leading-none" dir="ltr">
                        {activeFieldData.avgSalary}
                      </div>
                      <div className="text-[9px] text-white/70 font-bold mt-1">
                        برای فارغ‌التحصیلان تازه‌کار
                      </div>
                    </div>
                  </div>

                  {/* Growth */}
                  <div className="bg-white border border-stone-200 rounded-2xl p-4">
                    <div className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      رشد بازار ۵ ساله
                    </div>
                    <div className="text-3xl font-black font-mono text-emerald-600 mb-2" dir="ltr">
                      +{activeFieldData.growth}٪
                    </div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeFieldData.growth}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* RWR eligibility */}
                  <div className={`rounded-2xl p-4 border-2 ${
                    activeFieldData.rwrEligible
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-stone-50 border-stone-200"
                  }`}>
                    {activeFieldData.rwrEligible ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600 mb-1" />
                        <div className="text-[10px] font-black text-emerald-800">
                          واجد شرایط RWR Card
                        </div>
                        <p className="text-[9px] text-emerald-700 font-bold mt-1 leading-relaxed">
                          با جاب‌آفر حداقل €۲,۸۵۰ بروتو، امکان اخذ RWR Card پس از فارغ‌التحصیلی وجود دارد.
                        </p>
                      </>
                    ) : (
                      <>
                        <Info className="w-4 h-4 text-stone-500 mb-1" />
                        <div className="text-[10px] font-black text-stone-700">
                          نیازمند شرایط ویژه
                        </div>
                        <p className="text-[9px] text-stone-600 font-bold mt-1 leading-relaxed">
                          برای این حوزه، معمولاً نیاز به مدرک اتریشی و تسلط کامل آلمانی وجود دارد.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* INSIDER TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#c8102e]" />
              ۶ نکته طلایی برای موفقیت در ۱۲ ماه جستجوی کار
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              تجربه فارغ‌التحصیلان ایرانی که با موفقیت در اتریش ماندند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                icon: Timer,
                title: "از روز اول شروع کن",
                desc: "بلافاصله پس از دریافت اقامت جستجوی کار، فرآیند جستجو را شروع کنید. هر ماه تاخیر، ۸٪ شانس موفقیت را کاهش می‌دهد.",
                color: "from-[#c8102e] to-[#970d22]",
              },
              {
                icon: Laptop,
                title: "پروفایل LinkedIn قوی بساز",
                desc: "۸۵٪ شرکت‌های اتریشی از LinkedIn برای استخدام استفاده می‌کنند. پروفایل انگلیسی + آلمانی + نمونه‌کار داشته باشید.",
                color: "from-sky-600 to-blue-700",
              },
              {
                icon: Users,
                title: "شبکه‌سازی فعال",
                desc: "رویدادهای صنفی، Meetup، Alumni دانشگاه و همکاران سابق — ۷۰٪ فرصت‌ها از طریق شبکه‌سازی به دست می‌آید.",
                color: "from-emerald-600 to-teal-700",
              },
              {
                icon: BookOpen,
                title: "آلمانی را جدی بگیر",
                desc: "حتی سطح B1 در آلمانی، دامنه فرصت‌ها را دو برابر می‌کند. در طول ۱۲ ماه فرصت، دوره B1 را بگذرانید.",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: Target,
                title: "۱۵-۲۰ درخواست در هفته",
                desc: "برنامه‌ریزی سیستماتیک داشته باشید. هر شنبه، ۱۵-۲۰ درخواست هدفمند بفرستید و پیگیری جدی کنید.",
                color: "from-violet-600 to-purple-700",
              },
              {
                icon: Handshake,
                title: "مشاوره AMS و ÖH",
                desc: "دفتر AMS و ÖH دانشگاه رایگان مشاوره می‌دهند. قبل از قبولی، شغل پیشنهادی را با آن‌ها بررسی کنید.",
                color: "from-rose-600 to-red-700",
              },
            ].map((tip, i) => {
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
              <Globe className="w-5 h-5 text-[#c8102e]" />
              سه قاب از مسیر فارغ‌التحصیلی تا کار در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از لحظه فارغ‌التحصیلی تا شروع کار تمام‌وقت
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.graduation,
                title: "لحظه فارغ‌التحصیلی",
                subtitle: "پایان یک فصل",
                desc: "جشن فارغ‌التحصیلی از دانشگاه‌های معتبر اتریش، شروعی برای ثبت درخواست اقامت جستجوی کار است.",
                icon: GraduationCap,
                gradient: "from-[#c8102e] to-[#970d22]",
                stat: "گام ۱",
              },
              {
                img: IMAGES.career,
                title: "جستجوی فعال کار",
                subtitle: "۱۲ ماه فرصت طلایی",
                desc: "با برنامه‌ریزی سیستماتیک، LinkedIn قوی و شبکه‌سازی فعال، فرصت‌های فراوانی در انتظار شماست.",
                icon: Briefcase,
                gradient: "from-indigo-600 to-blue-700",
                stat: "۱۲ ماه",
              },
              {
                img: IMAGES.vienna,
                title: "کار در وین",
                subtitle: "شروع زندگی جدید",
                desc: "پس از دریافت RWR Card، زندگی جدید شما در وین با بیمه، حقوق مشخص و مسیر روشن تا اقامت دائم آغاز می‌شود.",
                icon: Rocket,
                gradient: "from-emerald-600 to-teal-700",
                stat: "۲۴ ماه",
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
              سوالات متداول درباره اقامت جستجوی کار
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های کوتاه به پرتکرارترین سوالات فارغ‌التحصیلان
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
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              مشاوره تخصصی فارغ‌التحصیلان
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              به‌تازگی فارغ‌التحصیل شده‌اید یا نزدیک به پایان هستید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه فارغ‌التحصیلان ایرانی در اتریش، می‌تواند
              در ثبت اقامت جستجوی کار، استراتژی جستجوی شغل، آماده‌سازی رزومه
              و دریافت RWR Card راهنمایی‌تان کند.
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
              اطلاعات این راهنما بر اساس قوانین رسمی سال ۲۰۲۶ اتریش (NAG، AuslBG،
              AMS-Richtlinien) تهیه شده است. مهلت‌ها، مبالغ و شرایط ممکن است
              توسط مراجع رسمی تغییر کنند. تصمیم نهایی در هر پرونده بر عهده
              MA 35 و AMS است. برای پرونده‌های خاص، همیشه با وکلای متخصص مهاجرت
              یا مشاوران رسمی ÖH و AMS مشورت کنید.
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

export default StudentGradRelocationGuide;