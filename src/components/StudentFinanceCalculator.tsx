import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap, Coins, Euro, Award, BookOpen, CheckCircle,
  Info, ChevronDown, Sparkles, Zap, Star, Users, PhoneCall,
  Send, Globe, Heart, Shield, Calculator, TrendingUp, Clock,
  MapPin, FileText, Wallet, Building2, Percent, Target,
  BarChart3, Quote, AlertCircle, Landmark, Lightbulb,
  PiggyBank, Banknote, Briefcase, BookMarked, Copy, Filter,
  Grid3x3, University, CircleDollarSign, HandCoins, BadgeCheck,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES — Student Austria themed
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
  library: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
  campus: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
  students: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  studying: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
  vienna: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// TYPES
// ==========================================
type ScholarshipCategory = "studienbeihilfe" | "selbsterhalter" | "merit" | "international" | "private";

type Scholarship = {
  id: string;
  name: string;
  nameDe: string;
  category: ScholarshipCategory;
  amount: string;
  amountNumeric: number;
  duration: string;
  eligibility: string;
  icon: any;
  gradient: string;
  color: string;
  description: string;
  requirements: string[];
  applicationDeadline: string;
  website: string;
  bestFor: string;
  recommended?: boolean;
  frequency: "monthly" | "semester" | "yearly" | "onetime";
};

// ==========================================
// SCHOLARSHIPS DATA
// ==========================================
const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "studienbeihilfe",
    name: "کمک‌هزینه تحصیلی فدرال",
    nameDe: "Studienbeihilfe",
    category: "studienbeihilfe",
    amount: "€۳۰۰ تا €۹۰۰",
    amountNumeric: 600,
    duration: "تا پایان دوره تحصیل",
    eligibility: "دانشجویان اتریشی، EU/EEA و اتباع کشورهای ثالث مقیم قانونی",
    icon: HandCoins,
    gradient: "from-[#c8102e] to-[#970d22]",
    color: "text-[#c8102e]",
    description:
      "مهم‌ترین کمک‌هزینه تحصیلی اتریش که توسط وزارت علوم فدرال پرداخت می‌شود. این کمک‌هزینه بر اساس درآمد خانواده محاسبه شده و دانشجویان کم‌درآمد تا ۹۰۰ یورو ماهانه دریافت می‌کنند. برای اتباع کشورهای ثالث (مانند ایران)، شرط اصلی داشتن اقامت قانونی و سکونت مستمر در اتریش است.",
    requirements: [
      "سکونت دائمی در اتریش (Meldezettel معتبر)",
      "ثبت‌نام در دانشگاه یا Fachhochschule معتبر",
      "عملکرد تحصیلی قابل قبول (حداقل ۱۴ ECTS در سال اول)",
      "سن زیر ۳۰ سال (برای کمک‌هزینه عادی)",
      "درآمد والدین زیر سقف مشخص (حدود €۲,۴۰۰ ماهانه)",
    ],
    applicationDeadline: "۱۵ سپتامبر (ترم زمستانی) و ۱۵ فوریه (ترم تابستانی)",
    website: "https://www.stipendium.at",
    bestFor: "دانشجویان کارشناسی کم‌درآمد زیر ۳۰ سال",
    recommended: true,
    frequency: "monthly",
  },
  {
    id: "selbsterhalterstipendium",
    name: "بورس خوداتکایی",
    nameDe: "Selbsterhalterstipendium",
    category: "selbsterhalter",
    amount: "€۶۵۰ تا €۱,۱۰۰",
    amountNumeric: 850,
    duration: "تا پایان دوره تحصیل (حداکثر ۶ سال)",
    eligibility: "دانشجویان بالای ۲۴ سال با حداقل ۴ سال سابقه کار",
    icon: Briefcase,
    gradient: "from-indigo-600 to-blue-700",
    color: "text-indigo-700",
    description:
      "برای بزرگسالانی که پس از چند سال کار، تصمیم به ادامه تحصیل می‌گیرند. این بورس یکی از سخاوتمندانه‌ترین کمک‌های آموزشی در اروپا است و به‌جای والدین، درآمد خود دانشجو مبنای محاسبه قرار می‌گیرد. اگر در ایران ۴ سال سابقه کار مستند دارید، می‌توانید واجد شرایط باشید.",
    requirements: [
      "حداقل ۲۴ سال سن در زمان شروع تحصیل",
      "حداقل ۴ سال (۴۸ ماه) سابقه کار مستند با بیمه",
      "عدم دریافت کمک‌هزینه فرزند بیش از سقف مشخص",
      "سکونت مستمر در اتریش (حداقل ۱ سال قبل از درخواست)",
      "شروع تحصیل در مقطع کارشناسی یا ارشد",
    ],
    applicationDeadline: "۱۵ سپتامبر و ۱۵ فوریه هر سال",
    website: "https://www.stipendium.at",
    bestFor: "مهاجران +۲۴ سال با سابقه کار قبلی که می‌خواهند تحصیل کنند",
    recommended: true,
    frequency: "monthly",
  },
  {
    id: "leistungsstipendium",
    name: "بورس عملکرد تحصیلی",
    nameDe: "Leistungsstipendium",
    category: "merit",
    amount: "€۷۵۰ تا €۱,۵۰۰",
    amountNumeric: 1125,
    duration: "سالانه (برای یک سال تحصیلی)",
    eligibility: "دانشجویان با عملکرد تحصیلی برجسته",
    icon: Award,
    gradient: "from-amber-500 to-orange-600",
    color: "text-amber-700",
    description:
      "پاداش مالی که دانشگاه‌های اتریش به دانشجویان برتر ترم پرداخت می‌کنند. ملاک انتخاب، معدل بالا (GPA) و پیشرفت تحصیلی است. برای کسب این بورس، معمولاً باید جزو ۵-۱۰٪ برتر دانشکده باشید. برخی دانشگاه‌ها امکان دریافت این بورس را به دانشجویان بین‌المللی نیز می‌دهند.",
    requirements: [
      "معدل بالای ۱.۵ (سیستم اتریشی، معادل A/B+)",
      "حداقل ۳۰ ECTS در دو ترم گذشته",
      "ثبت‌نام رسمی در دانشگاه اتریش",
      "عدم دریافت کمک‌هزینه همزمان مشابه",
      "پیشنهاد از سوی استاد یا دپارتمان (در برخی دانشگاه‌ها)",
    ],
    applicationDeadline: "متغیر — معمولاً در پایان ترم تابستانی",
    website: "https://www.univie.ac.at (وب‌سایت دانشگاه خود)",
    bestFor: "دانشجویان با معدل بالا",
    frequency: "yearly",
  },
  {
    id: "oead",
    name: "بورس OeAD بین‌المللی",
    nameDe: "OeAD Stipendium",
    category: "international",
    amount: "€۹۵۰ تا €۱,۲۰۰",
    amountNumeric: 1075,
    duration: "۱ تا ۳۶ ماه",
    eligibility: "دانشجویان بین‌المللی و پژوهشگران",
    icon: Globe,
    gradient: "from-emerald-600 to-teal-700",
    color: "text-emerald-700",
    description:
      "سازمان OeAD آژانس رسمی همکاری‌های بین‌المللی اتریش در حوزه آموزش است که بورس‌های متعددی برای دانشجویان کشورهای در حال توسعه ارائه می‌دهد. این بورس‌ها شامل کمک‌هزینه ماهانه، بیمه سلامت و هزینه سفر می‌شوند. برای دانشجویان ایرانی نیز امکان دریافت وجود دارد.",
    requirements: [
      "تابعیت کشور خارج از EU/EEA (شامل ایران)",
      "سن زیر ۳۵ سال (برای اکثر برنامه‌ها)",
      "مدرک زبان انگلیسی یا آلمانی معتبر",
      "پروپوزال پژوهشی یا طرح تحصیلی دقیق",
      "پذیرش یا دعوت‌نامه از دانشگاه اتریشی",
    ],
    applicationDeadline: "متغیر — بین دسامبر تا مارس برای اکثر برنامه‌ها",
    website: "https://oead.at",
    bestFor: "دانشجویان تحصیلات تکمیلی و پژوهشگران بین‌المللی",
    recommended: true,
    frequency: "monthly",
  },
  {
    id: "erasmus",
    name: "بورس اراسموس پلاس",
    nameDe: "Erasmus+ Stipendium",
    category: "international",
    amount: "€۲۵۰ تا €۵۰۰",
    amountNumeric: 375,
    duration: "۳ تا ۱۲ ماه (ترم خارج)",
    eligibility: "دانشجویان شاغل به تحصیل در دانشگاه‌های اروپایی",
    icon: BookMarked,
    gradient: "from-sky-600 to-blue-700",
    color: "text-sky-700",
    description:
      "بورس تبادل دانشجویی اروپا که به دانشجویان اتریشی و دانشجویان بین‌المللی مقیم اتریش امکان تحصیل در دانشگاه‌های سایر کشورهای اروپایی را می‌دهد. اگر در اتریش ثبت‌نام هستید، می‌توانید یک ترم از تحصیل خود را در اسپانیا، فرانسه یا آلمان بگذرانید و بورس بگیرید.",
    requirements: [
      "ثبت‌نام در دانشگاه اتریشی",
      "حداقل یک سال تحصیل در مقطع فعلی",
      "معدل قابل قبول",
      "پذیرش از دانشگاه مقصد اروپایی",
      "تایید از دفتر بین‌الملل دانشگاه",
    ],
    applicationDeadline: "معمولاً ژانویه تا مارس برای ترم پاییز",
    website: "https://erasmusplus.at",
    bestFor: "دانشجویان علاقمند به تجربه تحصیل در خارج",
    frequency: "monthly",
  },
  {
    id: "begabtenstipendium",
    name: "بورس استعدادهای درخشان",
    nameDe: "Begabtenstipendium",
    category: "merit",
    amount: "€۷۵۰ تا €۳,۰۰۰",
    amountNumeric: 1500,
    duration: "یک‌ساله (قابل تمدید)",
    eligibility: "دانشجویان نخبه با استعداد استثنایی",
    icon: BadgeCheck,
    gradient: "from-violet-600 to-purple-700",
    color: "text-violet-700",
    description:
      "بورس‌های ویژه‌ای که توسط بنیادهای خصوصی، شرکت‌ها یا دانشگاه‌ها به دانشجویان با استعداد استثنایی (در حوزه‌های هنری، علمی، ورزشی) اعطا می‌شود. این بورس‌ها معمولاً از طریق بنیاد «Stipendienstiftung» یا انجمن‌های تخصصی توزیع می‌شوند.",
    requirements: [
      "استعداد استثنایی در حوزه خاص (پژوهش، هنر، ورزش)",
      "مدارک مستند از موفقیت‌های قبلی (جوایز، مقالات، اجراها)",
      "توصیه‌نامه از متخصصان حوزه",
      "مصاحبه با کمیته انتخاب",
      "ثبت‌نام در دانشگاه اتریشی",
    ],
    applicationDeadline: "متغیر — بسته به بنیاد",
    website: "https://www.stipendien.at",
    bestFor: "دانشجویان نخبه با دستاوردهای استثنایی",
    frequency: "yearly",
  },
  {
    id: "würdigung",
    name: "بورس قدردانی ویژه",
    nameDe: "Würdigungsstipendium",
    category: "private",
    amount: "€۵۰۰ تا €۲,۰۰۰",
    amountNumeric: 1250,
    duration: "یک‌بار پرداخت",
    eligibility: "دانشجویان با دستاورد اجتماعی یا علمی خاص",
    icon: Heart,
    gradient: "from-rose-600 to-red-700",
    color: "text-rose-700",
    description:
      "بورس‌های یک‌باره‌ای که توسط بنیادها، شرکت‌ها، انجمن‌های خیریه یا شهرداری‌ها به دانشجویانی که در حوزه‌های اجتماعی، زیست‌محیطی، علمی یا فرهنگی دستاورد خاصی داشته‌اند اعطا می‌شود. مبلغ آن می‌تواند بین ۵۰۰ تا ۲۰۰۰ یورو باشد.",
    requirements: [
      "دستاورد اجتماعی، علمی یا فرهنگی مستند",
      "پروژه پیشنهادی برای آینده",
      "توصیه‌نامه از سازمان‌های مرتبط",
      "مصاحبه شخصی",
      "ثبت‌نام در دانشگاه اتریشی",
    ],
    applicationDeadline: "متغیر — اغلب در بهار",
    website: "https://www.grants.at",
    bestFor: "دانشجویان فعال در پروژه‌های اجتماعی و پژوهشی",
    frequency: "onetime",
  },
  {
    id: "wohnbeihilfe-student",
    name: "کمک‌هزینه مسکن دانشجویی",
    nameDe: "Studentische Wohnbeihilfe",
    category: "studienbeihilfe",
    amount: "€۱۰۰ تا €۳۰۰",
    amountNumeric: 200,
    duration: "سالانه قابل تمدید",
    eligibility: "دانشجویان دریافت‌کننده Studienbeihilfe",
    icon: Building2,
    gradient: "from-teal-600 to-cyan-700",
    color: "text-teal-700",
    description:
      "دانشجویانی که Studienbeihilfe دریافت می‌کنند، می‌توانند علاوه بر آن، کمک‌هزینه مسکن نیز درخواست کنند. این کمک‌هزینه برای جبران بخشی از هزینه اجاره خانه یا خوابگاه است و به‌طور خودکار با Studienbeihilfe بررسی می‌شود.",
    requirements: [
      "داشتن Studienbeihilfe فعال",
      "اجاره‌نامه رسمی یا اسکان خوابگاه",
      "Meldezettel به آدرس محل اجاره",
      "عدم مالکیت ملک شخصی",
    ],
    applicationDeadline: "همزمان با Studienbeihilfe",
    website: "https://www.stipendium.at",
    bestFor: "دانشجویان دریافت‌کننده Studienbeihilfe",
    frequency: "monthly",
  },
];

// ==========================================
// CATEGORIES
// ==========================================
const CATEGORIES = [
  { id: "all", label: "همه بورس‌ها", icon: Grid3x3, color: "from-stone-600 to-stone-800", text: "text-stone-700" },
  { id: "studienbeihilfe", label: "کمک‌هزینه دولتی", icon: HandCoins, color: "from-[#c8102e] to-[#970d22]", text: "text-[#c8102e]" },
  { id: "selbsterhalter", label: "خوداتکایی", icon: Briefcase, color: "from-indigo-600 to-blue-700", text: "text-indigo-700" },
  { id: "merit", label: "عملکرد تحصیلی", icon: Award, color: "from-amber-500 to-orange-600", text: "text-amber-700" },
  { id: "international", label: "بین‌المللی", icon: Globe, color: "from-emerald-600 to-teal-700", text: "text-emerald-700" },
  { id: "private", label: "خصوصی و ویژه", icon: Heart, color: "from-rose-600 to-red-700", text: "text-rose-700" },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "€۹۰۰", label: "حداکثر Studienbeihilfe ماهانه", icon: HandCoins },
  { value: "€۱,۱۰۰", label: "حداکثر Selbsthalter ماهانه", icon: Briefcase },
  { value: "€۱۳,۰۰۰", label: "میانگین هزینه سالانه تحصیل", icon: Euro },
  { value: "۳۵+", label: "برنامه بورس مختلف", icon: Award },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا به عنوان دانشجوی ایرانی می‌توانم Studienbeihilfe دریافت کنم؟",
    a: "بله، اما با شرایط خاص. Studienbeihilfe برای اتباع کشورهای ثالث (شامل ایران) فقط در صورتی قابل دریافت است که ۵ سال سکونت مستمر در اتریش داشته باشید (یا والدین شما حداقل ۵ سال مقیم قانونی اتریش باشند). برای کسانی که تازه وارد شده‌اند، گزینه‌های دیگر مثل بورس‌های OeAD، Leistungsstipendium یا Selbsterhalterstipendium (در صورت داشتن سابقه کار) مناسب‌تر هستند.",
  },
  {
    q: "تفاوت Studienbeihilfe و Selbsterhalterstipendium چیست؟",
    a: "Studienbeihilfe به دانشجویان جوان زیر ۳۰ سال که از والدین حمایت مالی می‌شوند تعلق می‌گیرد و مبلغ آن بر اساس درآمد والدین محاسبه می‌شود. اما Selbsterhalterstipendium برای افراد بالای ۲۴ سال است که حداقل ۴ سال سابقه کار داشته‌اند و خودشان مخارج زندگی را تأمین می‌کنند. مبلغ Selbsterhalter بالاتر است (تا €۱,۱۰۰) و برای مهاجران شاغل که تصمیم به تحصیل می‌گیرند، گزینه بهتر محسوب می‌شود.",
  },
  {
    q: "چقدر طول می‌کشد تا Studienbeihilfe تصویب شود؟",
    a: "پس از ارسال درخواست کامل به Stipendienstelle، فرآیند بررسی معمولاً ۴ تا ۸ هفته طول می‌کشد. اگر درخواست شما در ابتدای ترم ارسال شود، ممکن است تا پایان ترم جواب بگیرید. کمک‌هزینه‌ها از تاریخ شروع ترم (نه تاریخ درخواست) قابل پرداخت هستند، بنابراین حتی اگر جواب دیرتر بیاید، مبلغ معوق را یک‌جا دریافت خواهید کرد.",
  },
  {
    q: "آیا می‌توانم همزمان از دو بورس استفاده کنم؟",
    a: "به‌طور کلی نمی‌توانید بیش از یک بورس مشابه و از یک منبع دولتی دریافت کنید. اما می‌توانید Studienbeihilfe دولتی را با بورس عملکرد تحصیلی (Leistungsstipendium) یا بورس‌های خصوصی ترکیب کنید. قوانین ترکیب بورس‌ها متفاوت است و باید از Stipendienstelle تأیید بگیرید.",
  },
  {
    q: "آیا دریافت بورس بر اقامت من تأثیر می‌گذارد؟",
    a: "دریافت Studienbeihilfe هیچ تأثیر منفی بر اقامت شما ندارد. حتی برخی بورس‌ها (مثل Selbsterhalterstipendium) می‌توانند به عنوان درآمد قابل قبول برای اثبات تمکن مالی به MA35 در تمدید اقامت ارائه شوند. اما برای درخواست اقامت اولیه در ایران، دریافت این کمک‌هزینه‌ها به عنوان درآمد معتبر شناخته نمی‌شود.",
  },
  {
    q: "پس از اتمام تحصیل، باید مبلغ بورس را بازگردانم؟",
    a: "خیر، کمک‌هزینه‌های تحصیلی اتریش (Studienbeihilfe و Selbsterhalterstipendium) که به‌صورت grant (اعطای بلاعوض) پرداخت می‌شوند، بازگشتی ندارند. برخلاف برخی کشورها که وام دانشجویی می‌دهند، سیستم اتریش بر پایه حمایت بلاواسطه است. اما اگر تحصیل خود را ناتمام رها کنید یا اطلاعات نادرست ارائه دهید، امکان پس‌گیری وجه وجود دارد.",
  },
  {
    q: "آیا کمک‌هزینه دوران تحصیل فرزندم در اتریش را می‌توانم دریافت کنم؟",
    a: "بله. اگر والدین شما در اتریش اقامت قانونی دارند، می‌توانید علاوه بر Familienbeihilfe (کمک‌هزینه فرزند — حدود €۱۳۰-۲۰۰ ماهانه)، Studienbeihilfe تحصیلی هم دریافت کنید. این دو مکمل یکدیگر هستند و یک خانواده ایرانی مقیم اتریش می‌تواند سالانه تا حدود €۱۵,۰۰۰ از حمایت‌های آموزشی دولت بهره‌مند شود.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const StudentFinanceCalculator: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeScholarship, setActiveScholarship] = useState<string>("studienbeihilfe");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Budget calculator states
  const [monthlyRent, setMonthlyRent] = useState<number>(450);
  const [monthlyFood, setMonthlyFood] = useState<number>(250);
  const [monthlyTransport, setMonthlyTransport] = useState<number>(30);
  const [monthlyInsurance, setMonthlyInsurance] = useState<number>(70);
  const [monthlyOther, setMonthlyOther] = useState<number>(150);
  const [currentScholarshipAmount, setCurrentScholarshipAmount] = useState<number>(600);

  const filteredScholarships = useMemo(() => {
    if (activeCategory === "all") return SCHOLARSHIPS;
    return SCHOLARSHIPS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const activeScholarshipData = useMemo(
    () => SCHOLARSHIPS.find((s) => s.id === activeScholarship)!,
    [activeScholarship]
  );

  // Budget calc
  const budgetResult = useMemo(() => {
    const totalExpenses = monthlyRent + monthlyFood + monthlyTransport + monthlyInsurance + monthlyOther;
    const gap = totalExpenses - currentScholarshipAmount;
    return {
      totalExpenses,
      gap,
      isCovered: currentScholarshipAmount >= totalExpenses,
      yearlyExpenses: totalExpenses * 12,
      yearlyScholarship: currentScholarshipAmount * 12,
    };
  }, [monthlyRent, monthlyFood, monthlyTransport, monthlyInsurance, monthlyOther, currentScholarshipAmount]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("لینک کپی شد!");
  };

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "محاسبه‌گر بورسیه و فاند دانشجویی اتریش",
      description:
        "ماشین‌حساب تعاملی برای بررسی بورس‌ها، کمک‌هزینه‌های تحصیلی و بودجه زندگی دانشجویی در اتریش بر اساس قوانین رسمی ۲۰۲۶.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      inLanguage: "fa-IR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "بورس‌ها و کمک‌هزینه‌های دانشجویی اتریش",
      itemListElement: SCHOLARSHIPS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${s.name} (${s.nameDe})`,
        description: s.description,
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
      headline: "راهنمای جامع بورسیه و فاند دانشجویی اتریش ۲۰۲۶",
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
      title="محاسبه‌گر بورسیه و فاند دانشجویی اتریش"
      description="ماشین‌حساب آنلاین بررسی بورس‌ها، کمک‌هزینه‌های تحصیلی و بودجه زندگی دانشجویی در اتریش — بر اساس قوانین رسمی ۲۰۲۶"
    >
      <SEO
        title="بورسیه و فاند دانشجویی اتریش ۲۰۲۶ | محاسبه‌گر آنلاین Studienbeihilfe"
        description="محاسبه‌گر آنلاین بورسیه دانشجویی اتریش: Studienbeihilfe، Selbsterhalterstipendium، OeAD و Leistungsstipendium. بررسی شرایط، مبالغ، مدارک و بودجه زندگی دانشجویی."
        keywords="بورسیه اتریش, Studienbeihilfe, Selbsterhalterstipendium, بورس دانشجویی اتریش, فاند تحصیلی وین, OeAD, بورس اراسموس, هزینه تحصیل اتریش, بودجه دانشجویی وین"
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
              alt="دانشجویان در دانشگاه اتریش"
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
              راهنمای رسمی بورسیه تحصیلی اتریش ۲۰۲۶
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              تحصیل در اتریش رایگان است — اگر بدانی چطور از بورس‌ها استفاده کنی
            </h1>

            <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-6">
              اتریش یکی از <strong className="text-amber-300">سخاوتمندترین سیستم‌های حمایت دانشجویی در اروپا</strong> را دارد.
              از <strong className="text-amber-300">Studienbeihilfe</strong> دولتی تا
              <strong className="text-amber-300"> Selbsterhalterstipendium</strong> (تا €۱,۱۰۰ ماهانه) و
              <strong className="text-amber-300"> بورس‌های بین‌المللی OeAD</strong> — در این راهنما،
              همه‌چیز درباره بورس‌های دانشجویی و بودجه زندگی در اتریش را یاد می‌گیرید.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>۸ برنامه بورس مختلف</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>نرخ‌های رسمی ۲۰۲۶</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>تجربه هزاران دانشجو</span>
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
                راز دانشجویان موفق ایرانی در اتریش
              </div>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">
                <strong className="text-[#c8102e]">۸۰٪ دانشجویان فارسی‌زبان مقیم اتریش، از حداقل یک نوع بورس استفاده می‌کنند.</strong> بورس‌های
                اتریش بر خلاف تصور عموم، فقط برای اتباع اروپایی نیستند. اتباع کشورهای ثالث (از جمله ایرانیان)
                در صورت داشتن اقامت قانونی و سکونت مستمر می‌توانند از بسیاری از این کمک‌هزینه‌ها بهره‌مند شوند.
                حتی اگر بورس کامل دریافت نکنید، ترکیب Studienbeihilfe + Leistungsstipendium + کمک‌هزینه
                مسکن می‌تواند ماهانه تا <strong className="text-amber-700">€۱,۵۰۰</strong> از هزینه‌های شما را پوشش دهد.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* SCHOLARSHIP SELECTOR */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#c8102e]" />
              ۸ بورس و کمک‌هزینه اصلی دانشجویی در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              روی هر کارت کلیک کنید تا جزئیات کامل را ببینید
            </p>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-5">
            <Filter className="w-4 h-4 text-stone-500 mt-2" />
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                    isActive
                      ? `bg-gradient-to-br ${c.color} text-white shadow-md`
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Scholarship tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
            <AnimatePresence mode="popLayout">
              {filteredScholarships.map((s) => {
                const Icon = s.icon;
                const isActive = activeScholarship === s.id;
                return (
                  <motion.button
                    key={s.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setActiveScholarship(s.id)}
                    className={`relative overflow-hidden rounded-2xl border-2 p-3 text-right transition-all ${
                      isActive
                        ? "border-[#c8102e] shadow-lg shadow-rose-100"
                        : "border-stone-200 hover:border-stone-300 bg-white"
                    }`}
                  >
                    {s.recommended && (
                      <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[8px] font-black px-2 py-0.5 rounded-br-xl flex items-center gap-0.5 z-10">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        پیشنهادی
                      </div>
                    )}
                    <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-md mb-2`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-[10.5px] font-black text-stone-900 leading-tight text-center">
                      {s.name}
                    </div>
                    <div className={`text-[10px] font-black mt-1 text-center font-mono ${isActive ? s.color : "text-stone-500"}`} dir="ltr">
                      {s.amount}
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Active scholarship detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScholarship}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white"
            >
              <div className="grid md:grid-cols-2">
                {/* Image panel */}
                <div className="relative h-72 md:h-auto min-h-[420px] overflow-hidden">
                  <img
                    src={
                      activeScholarshipData.category === "studienbeihilfe"
                        ? IMAGES.library
                        : activeScholarshipData.category === "selbsterhalter"
                        ? IMAGES.studying
                        : activeScholarshipData.category === "international"
                        ? IMAGES.campus
                        : activeScholarshipData.category === "merit"
                        ? IMAGES.students
                        : IMAGES.vienna
                    }
                    alt={activeScholarshipData.nameDe}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${activeScholarshipData.gradient} opacity-45 mix-blend-multiply`} />
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black text-stone-800 shadow-md">
                    <Euro className="w-3 h-3 text-[#c8102e]" />
                    {activeScholarshipData.amount} / {
                      activeScholarshipData.frequency === "monthly" ? "ماهانه" :
                      activeScholarshipData.frequency === "yearly" ? "سالانه" :
                      activeScholarshipData.frequency === "semester" ? "هر ترم" : "یک‌بار"
                    }
                  </div>
                  <div className="absolute bottom-3 right-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">
                    <div className="text-[9px] font-black text-white/80 mb-1">مبلغ تخمینی</div>
                    <div className="text-2xl font-black text-white leading-tight font-mono" dir="ltr">
                      {activeScholarshipData.amount}
                    </div>
                    <div className="text-[9px] text-white/70 font-bold mt-0.5">
                      {activeScholarshipData.duration}
                    </div>
                  </div>
                </div>

                {/* Content panel */}
                <div className="p-6 md:p-8">
                  <div className={`inline-flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-full bg-stone-100 ${activeScholarshipData.color} mb-3`}>
                    <Star className="w-3 h-3 fill-current" />
                    {activeScholarshipData.nameDe}
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-stone-900 mb-3 leading-tight">
                    {activeScholarshipData.name}
                  </h3>

                  <p className="text-xs text-stone-600 font-bold leading-relaxed mb-5">
                    {activeScholarshipData.description}
                  </p>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3">
                      <Clock className="w-4 h-4 text-stone-500 mb-1" />
                      <div className="text-[9px] text-stone-500 font-bold">مدت پرداخت</div>
                      <div className="text-[10px] font-black text-stone-800 leading-tight">
                        {activeScholarshipData.duration}
                      </div>
                    </div>
                    <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3">
                      <Target className="w-4 h-4 text-stone-500 mb-1" />
                      <div className="text-[9px] text-stone-500 font-bold">مناسب برای</div>
                      <div className="text-[10px] font-black text-stone-800 leading-tight">
                        {activeScholarshipData.bestFor}
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-4">
                    <div className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      پیش‌نیازها
                    </div>
                    <ul className="space-y-1.5">
                      {activeScholarshipData.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-[10px] text-stone-700 font-bold leading-relaxed">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deadline */}
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 mb-4 flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black text-amber-700 mb-0.5">
                        مهلت درخواست:
                      </div>
                      <div className="text-[10px] text-amber-800 font-bold leading-snug">
                        {activeScholarshipData.applicationDeadline}
                      </div>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex gap-2 flex-wrap">
                    <a
                      href={`https://${activeScholarshipData.website.replace(/^https?:\/\//, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 bg-gradient-to-br ${activeScholarshipData.gradient} text-white font-black text-xs px-4 py-2.5 rounded-2xl shadow-md hover:scale-105 transition-all`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      وب‌سایت رسمی
                    </a>
                    <button
                      onClick={() => handleCopy(activeScholarshipData.website)}
                      className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black text-xs px-4 py-2.5 rounded-2xl transition-all"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      کپی لینک
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* BUDGET CALCULATOR */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#c8102e]" />
              ماشین‌حساب بودجه ماهانه دانشجویی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              مخارج خود را محاسبه کنید و ببینید بورس شما چقدر پوشش می‌دهد
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-4">
            {/* Input panel */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-stone-200 p-6 space-y-4">
              {/* Rent */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-stone-700 flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#c8102e]" />
                    اجاره ماهانه (خوابگاه / خانه)
                  </span>
                  <span className="text-sm font-black text-[#c8102e] font-mono" dir="ltr">€{monthlyRent}</span>
                </label>
                <input
                  type="range" min="150" max="1200" step="25"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full accent-[#c8102e] h-1.5"
                />
              </div>

              {/* Food */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-stone-700 flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-[#c8102e]" />
                    خواربار و غذا
                  </span>
                  <span className="text-sm font-black text-[#c8102e] font-mono" dir="ltr">€{monthlyFood}</span>
                </label>
                <input
                  type="range" min="100" max="600" step="10"
                  value={monthlyFood}
                  onChange={(e) => setMonthlyFood(Number(e.target.value))}
                  className="w-full accent-[#c8102e] h-1.5"
                />
              </div>

              {/* Transport */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-stone-700 flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c8102e]" />
                    حمل‌ونقل (کارت دانشجویی)
                  </span>
                  <span className="text-sm font-black text-[#c8102e] font-mono" dir="ltr">€{monthlyTransport}</span>
                </label>
                <input
                  type="range" min="0" max="100" step="5"
                  value={monthlyTransport}
                  onChange={(e) => setMonthlyTransport(Number(e.target.value))}
                  className="w-full accent-[#c8102e] h-1.5"
                />
              </div>

              {/* Insurance */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-stone-700 flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#c8102e]" />
                    بیمه دانشجویی
                  </span>
                  <span className="text-sm font-black text-[#c8102e] font-mono" dir="ltr">€{monthlyInsurance}</span>
                </label>
                <input
                  type="range" min="0" max="150" step="5"
                  value={monthlyInsurance}
                  onChange={(e) => setMonthlyInsurance(Number(e.target.value))}
                  className="w-full accent-[#c8102e] h-1.5"
                />
              </div>

              {/* Other */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-stone-700 flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-[#c8102e]" />
                    سایر مخارج (کتاب، تفریح، لباس)
                  </span>
                  <span className="text-sm font-black text-[#c8102e] font-mono" dir="ltr">€{monthlyOther}</span>
                </label>
                <input
                  type="range" min="50" max="500" step="10"
                  value={monthlyOther}
                  onChange={(e) => setMonthlyOther(Number(e.target.value))}
                  className="w-full accent-[#c8102e] h-1.5"
                />
              </div>

              {/* Scholarship */}
              <div className="pt-4 border-t border-stone-200 space-y-1.5">
                <label className="text-[11px] font-black text-stone-700 flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <HandCoins className="w-3.5 h-3.5 text-emerald-600" />
                    مبلغ بورس ماهانه شما
                  </span>
                  <span className="text-sm font-black text-emerald-600 font-mono" dir="ltr">€{currentScholarshipAmount}</span>
                </label>
                <input
                  type="range" min="0" max="1100" step="50"
                  value={currentScholarshipAmount}
                  onChange={(e) => setCurrentScholarshipAmount(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5"
                />
              </div>
            </div>

            {/* Result panel */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${budgetResult.totalExpenses}-${currentScholarshipAmount}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`relative overflow-hidden rounded-3xl p-6 text-white ${
                    budgetResult.isCovered
                      ? "bg-gradient-to-br from-emerald-600 to-green-700"
                      : "bg-gradient-to-br from-[#1e1512] via-[#38100e] to-[#9e142d]"
                  }`}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 border border-white/25 rounded-full text-[9px] font-black backdrop-blur-sm mb-4">
                      {budgetResult.isCovered ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-emerald-300" />
                          بودجه تامین شده
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 text-amber-300" />
                          کمبود بودجه
                        </>
                      )}
                    </div>

                    <div className="text-[10px] font-black text-white/70 mb-1">
                      مخارج کل ماهانه
                    </div>
                    <div className="text-4xl md:text-5xl font-black leading-none mb-1 font-mono" dir="ltr">
                      €{budgetResult.totalExpenses}
                    </div>
                    <div className="text-[11px] font-bold text-white/60 mb-5">
                      {budgetResult.isCovered
                        ? `بورس شما ${(currentScholarshipAmount - budgetResult.totalExpenses).toLocaleString()} یورو مازاد دارد`
                        : `کمبود بودجه: €${budgetResult.gap.toLocaleString()}`}
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 mb-5 pt-4 border-t border-white/15">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white/70 flex items-center gap-1.5">
                          <Building2 className="w-3 h-3" />
                          اجاره
                        </span>
                        <span className="font-black font-mono" dir="ltr">€{monthlyRent}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white/70 flex items-center gap-1.5">
                          <Coins className="w-3 h-3" />
                          خواربار
                        </span>
                        <span className="font-black font-mono" dir="ltr">€{monthlyFood}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white/70 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          حمل‌ونقل
                        </span>
                        <span className="font-black font-mono" dir="ltr">€{monthlyTransport}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white/70 flex items-center gap-1.5">
                          <Shield className="w-3 h-3" />
                          بیمه
                        </span>
                        <span className="font-black font-mono" dir="ltr">€{monthlyInsurance}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white/70 flex items-center gap-1.5">
                          <Wallet className="w-3 h-3" />
                          سایر
                        </span>
                        <span className="font-black font-mono" dir="ltr">€{monthlyOther}</span>
                      </div>
                    </div>

                    {/* Yearly summary */}
                    <div className="bg-white/10 border border-white/15 rounded-2xl p-3">
                      <div className="text-[9px] font-black text-white/60 mb-1">
                        خلاصه سالانه
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-black text-white">
                        <span>مخارج:</span>
                        <span className="font-mono" dir="ltr">€{budgetResult.yearlyExpenses.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-black text-white mt-1">
                        <span>بورس:</span>
                        <span className="font-mono text-emerald-300" dir="ltr">€{budgetResult.yearlyScholarship.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* INSIDER TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#c8102e]" />
              ۶ نکته طلایی برای دریافت بورس در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              تجربه هزاران دانشجوی فارسی‌زبان برای موفقیت در دریافت بورس
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                icon: Clock,
                title: "زود درخواست بده",
                desc: "مهلت‌های بورس اتریش (۱۵ سپتامبر و ۱۵ فوریه) دقیق و بدون تمدید است. یک هفته قبل شروع کنید.",
                color: "from-[#c8102e] to-[#970d22]",
              },
              {
                icon: FileText,
                title: "مدارک را کامل آماده کن",
                desc: "مدارک ناقص شایع‌ترین دلیل رد درخواست است. تاکس اظهارنامه والدین، تاییدیه دانشگاه و Meldezettel ضروری‌اند.",
                color: "from-emerald-600 to-teal-700",
              },
              {
                icon: Target,
                title: "چند بورس را امتحان کن",
                desc: "همزمان برای Studienbeihilfe و Leistungsstipendium و بورس‌های خصوصی درخواست بده. ترکیب آنها قانونی است.",
                color: "from-indigo-600 to-blue-700",
              },
              {
                icon: Briefcase,
                title: "Selbsterhalter را جدی بگیر",
                desc: "اگر بالای ۲۴ سال و دارای سابقه کار در ایران هستی، این بورس (تا €۱,۱۰۰) بهترین گزینه است. مدارک بیمه ایران را ترجمه کن.",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: BookMarked,
                title: "عملکرد تحصیلی را نگه دار",
                desc: "برای تمدید Studienbeihilfe باید حداقل ۱۴ ECTS در سال اول و ۳۲ ECTS در سال‌های بعد کسب کنی.",
                color: "from-violet-600 to-purple-700",
              },
              {
                icon: Users,
                title: "مشاوره ÖH را جدی بگیر",
                desc: "دفتر ÖH دانشگاه شما مشاوره رایگان بورس دارد و می‌تواند پرونده‌ات را پیش از ارسال بررسی کند.",
                color: "from-sky-600 to-blue-700",
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
              زندگی دانشجویی در اتریش — سه قاب
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از کتابخانه‌های مدرن تا محوطه‌های دانشگاهی تاریخی
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.library,
                title: "کتابخانه‌های مدرن",
                subtitle: "فضای تحصیل بی‌نظیر",
                desc: "دانشگاه‌های وین دارای کتابخانه‌های مجهز و فضای مطالعه ۲۴ ساعته هستند — رایگان برای همه دانشجویان.",
                icon: BookOpen,
                gradient: "from-[#c8102e] to-[#970d22]",
                stat: "رایگان",
              },
              {
                img: IMAGES.campus,
                title: "محوطه‌های تاریخی",
                subtitle: "زیرساخت آموزشی مدرن",
                desc: "از Hauptuni وین تا دانشگاه‌های فنی و پزشکی، اتریش دارای زیرساخت آموزشی در سطح جهانی است.",
                icon: University,
                gradient: "from-indigo-600 to-blue-700",
                stat: "۲۲ دانشگاه",
              },
              {
                img: IMAGES.students,
                title: "کمک‌هزینه‌های گسترده",
                subtitle: "تا €۱,۵۰۰ ماهانه",
                desc: "با ترکیب چند بورس و کمک‌هزینه، دانشجویان مقیم اتریش می‌توانند هزینه‌های زندگی خود را تأمین کنند.",
                icon: HandCoins,
                gradient: "from-emerald-600 to-teal-700",
                stat: "۸ برنامه",
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
              سوالات متداول درباره بورسیه‌های دانشجویی اتریش
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
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              مشاوره تخصصی بورسیه تحصیلی
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              مطمئن نیستید کدام بورس برای شما مناسب است؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه زیسته و همکاری با دانشجویان ایرانی در اتریش،
              می‌تواند بر اساس سن، وضعیت اقامت، سابقه کار و رشته تحصیلی شما بهترین
              ترکیب بورسی را پیشنهاد دهد.
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
              مبالغ، شرایط و مهلت‌های بورس‌های اتریش بر اساس قوانین رسمی سال ۲۰۲۶
              تهیه شده است و ممکن است هر سال تغییر کند. تصمیم نهایی درباره اعطای
              بورس بر عهده Stipendienstelle (دفتر بورس) و دانشگاه‌های مربوطه است.
              برای اطلاعات قطعی، همیشه وب‌سایت رسمی stipendium.at یا oead.at را
              بررسی کنید.
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

export default StudentFinanceCalculator;