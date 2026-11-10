import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen, Clock, Tag, MapPin, Users, Star, Heart, Award, CheckCircle,
  ShieldCheck, Sparkles, Zap, TrendingUp, MessageCircle, Send, Handshake,
  AlertTriangle, XCircle,
  Info, HelpCircle, ChevronDown, ExternalLink, ArrowLeft, Filter,
  Grid3x3, List, X, RefreshCw, SlidersHorizontal, Search, Trophy, Target,
  Lightbulb, BarChart3, FileCheck, Briefcase, GraduationCap, Home,
  Building2, HeartHandshake, Landmark, Wallet, Euro, FileText,
  Baby, Mic, Microscope, CreditCard, Scale, Globe, Rocket, Crown,
  Gem, Flame, ThumbsUp, Calendar, Clock4, Gauge, Route, Compass,
  Flag, ChevronLeft, ChevronRight, Eye, Star as StarIcon, CheckSquare,
  Square, Printer, Download, Share2, Bookmark, UserCheck, Award as AwardIcon,
  TrendingUp as TrendingUpIcon, PieChart, Layers, Stamp, FileSignature,
  IdCard, ClipboardList, UserPlus, Plane, Ship, Train, Car, Hotel,
  Utensils, ShoppingBag, Coffee, PartyPopper, Music, Palette, Drama,
  GraduationCap as GradCap, BookMarked, PenTool, Camera, Film, Radio,
  Headphones, Podcast, Wifi, Signal, Battery, Sun, Moon, CloudRain,
  Wind, Droplets, TreePine, Flower2, Bird, Fish, Apple, Carrot,
  Cake, Pizza, Sandwich, Salad, Soup, IceCream, Wine, Beer, CupSoda,
  GlassWater, Flame as FlameIcon, Sparkle, Star as StarSolid,
  Heart as HeartSolid, Crown as CrownSolid, Gem as GemSolid,
  Rocket as RocketSolid, Trophy as TrophySolid, Medal, Award as AwardSolid,
  BadgeCheck, Verified, CheckCircle2, Circle, Dot, Ellipsis,
  ArrowUp, ArrowDown, ArrowUpRight, ArrowDownRight, MoveRight, MoveLeft,
  MoveUp, MoveDown, CornerUpRight, CornerDownRight, CornerUpLeft,
  CornerDownLeft, RotateCw, RotateCcw, Repeat, Shuffle, RefreshCcw,
  Power, PowerOff, Play, Pause, StopCircle, SkipBack, SkipForward,
  FastForward, Rewind, Volume2, VolumeX, Mic2, MicOff, Video, VideoOff,
  Image, ImageOff, Folder, FolderOpen, File, FilePlus, FileMinus,
  FileX, Files, Archive, Trash, Trash2, Edit, Edit2, Edit3,
  Pen, PenLine, Brush, Paintbrush, Palette as PaletteIcon, Droplet,
  Droplets as DropletsIcon, Waves, AudioLines, Music2,
  Music3, Music4, Disc, Disc2, Disc3, Radio as RadioIcon, SignalHigh,
  SignalLow, SignalMedium, Wifi as WifiIcon, WifiOff, Bluetooth,
  BluetoothOff, Usb, Plug, PlugZap, Plug2, PowerCircle,
  BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, Sun as SunIcon,
  Moon as MoonIcon, Cloud, CloudSun, CloudMoon, CloudLightning,
  CloudDrizzle, CloudSnow, CloudFog, CloudHail, CloudRainWind,
  Tornado, Snowflake, Thermometer, ThermometerSun,
  ThermometerSnowflake, Wind as WindIcon, Umbrella, UmbrellaOff
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// FEATURED IMAGES (Unsplash)
// ==========================================
const FEATURED_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    title: "جشن دریافت اقامت",
    caption: "لحظه‌ای که خانواده‌ها کارت اقامت خود را در دست می‌گیرند",
    icon: PartyPopper,
    tag: "جشن",
  },
  {
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    title: "مسیرهای متنوع مهاجرت",
    caption: "از RWR Card تا استارتاپ — هر خانواده مسیر منحصربه‌فرد خود را دارد",
    icon: Route,
    tag: "مسیرها",
  },
  {
    url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    title: "زندگی جدید در اتریش",
    caption: "از رویا تا واقعیت — خانواده‌هایی که زندگی خود را در اتریش ساخته‌اند",
    icon: Home,
    tag: "زندگی",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۲۰", label: "داستان موفقیت", icon: Trophy },
  { value: "۱۵+", label: "مسیر مهاجرتی", icon: Route },
  { value: "۵۰+", label: "نفر شامل خانواده", icon: Users },
  { value: "۹۸٪", label: "نرخ موفقیت", icon: BarChart3 },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "پرونده‌های واقعی", color: "text-emerald-600" },
  { icon: Zap, text: "مسیرهای متنوع", color: "text-amber-600" },
  { icon: Heart, text: "۱۰۰٪ محرمانه", color: "text-rose-600" },
  { icon: Award, text: "به‌روز ۲۰۲۶", color: "text-indigo-600" },
];

// ==========================================
// STORY CATEGORIES
// ==========================================
const STORY_CATEGORIES = [
  { id: "all", name: "همه داستان‌ها", icon: Grid3x3, color: "from-indigo-500 to-blue-600" },
  { id: "rwr", name: "RWR Card (کاری)", icon: Briefcase, color: "from-red-500 to-rose-600" },
  { id: "student", name: "تحصیلی", icon: GraduationCap, color: "from-amber-500 to-orange-600" },
  { id: "family", name: "پیوست خانواده", icon: Users, color: "from-pink-500 to-rose-600" },
  { id: "startup", name: "استارتاپ و خوداشتغالی", icon: Rocket, color: "from-indigo-500 to-purple-600" },
  { id: "special", name: "هنرمندی و پژوهش", icon: Palette, color: "from-purple-500 to-fuchsia-600" },
  { id: "permanent", name: "اقامت دائم و شهروندی", icon: Crown, color: "from-emerald-500 to-teal-600" },
];

// ==========================================
// ۲۰ داستان موفقیت (با داده‌های غنی)
// ==========================================
interface MigrationStory {
  id: number;
  title: string;
  excerpt: string;
  story: string;
  category: string;
  readTime: string;
  featured: boolean;
  familyName: string;
  members: number;
  route: string;
  city: string;
  year: string;
  duration: string;
  visaType: string;
  visaCardType: "rwr" | "student" | "family" | "startup" | "artist" | "researcher" | "bluecard" | "permanent" | "citizenship" | "jobseeker" | "ict" | "privatier";
  challenges: string[];
  tips: string[];
  color: string;
  icon: any;
  placeholderId: string;
}

const STORIES_DATA: MigrationStory[] = [
  // ۱: RWR Card - مهندس نرم‌افزار
  {
    id: 1,
    title: "مسیر پرپیچ‌وخم دریافت RWR در وین",
    excerpt: "داستان واقعی ورود به اتریش با کارت قرمز-سفید-قرمز و چالش‌های اولیه در یافتن کار...",
    story: "خانواده رضایی پس از ۸ ماه پیگیری، موفق به دریافت RWR Card شدند. آقای رضایی به‌عنوان مهندس نرم‌افزار با ۷۰ امتیاز (سن ۲۸، مدرک ارشد، ۵ سال سابقه، آلمانی B1) توانست پیشنهاد شغلی از یک شرکت IT در وین دریافت کند. چالش اصلی، معادل‌سازی مدرک تحصیلی و اثبات سابقه کار بود که با کمک اتریش‌نشین حل شد.",
    category: "RWR Card",
    readTime: "۶ دقیقه",
    featured: true,
    familyName: "خانواده رضایی",
    members: 1,
    route: "RWR Card — نیروی کلیدی (Fachkräfte in Mangelberufen)",
    city: "وین",
    year: "۲۰۲۵",
    duration: "۸ ماه",
    visaType: "RWR Card",
    visaCardType: "rwr",
    challenges: ["معادل‌سازی مدرک از طریق ANABIN", "اثبات ۵ سال سابقه کار بیمه‌شده", "آلمانی B1 با مدرک ÖSD", "پیدا کردن کارفرمای واجد شرایط"],
    tips: ["حتماً قبل از درخواست، امتیاز خود را در پورتال رسمی RWR محاسبه کنید", "مدرک زبان آلمانی B1 حداقل الزام است", "سابقه کار باید با بیمه تأیید شود"],
    color: "from-red-500 to-rose-600",
    icon: Briefcase,
    placeholderId: "visa-card-1",
  },
  // ۲: RWR Card - پرستار
  {
    id: 2,
    title: "از پرستاری در تهران تا RWR Card اتریش",
    excerpt: "خانم محمدی با ۸ سال سابقه پرستاری و مدرک معادل‌سازی‌شده، در یک بیمارستان دولتی وین استخدام شد...",
    story: "خانم محمدی یکی از پرستاران با تجربه بیمارستان امام خمینی تهران بود. پس از معادل‌سازی مدرک پرستاری از طریق دانشگاه علوم پزشکی وین، توانست RWR Card دریافت کند. او اکنون در بیمارستان AKH وین مشغول به کار است و به‌عنوان یکی از پرستاران نمونه شناخته می‌شود.",
    category: "RWR Card",
    readTime: "۷ دقیقه",
    featured: false,
    familyName: "خانم محمدی",
    members: 2,
    route: "RWR Card — مشاغل کمبود (Mangelberufe)",
    city: "وین",
    year: "۲۰۲۵",
    duration: "۱۱ ماه",
    visaType: "RWR Card",
    visaCardType: "rwr",
    challenges: ["معادل‌سازی مدرک پرستاری", "آلمانی B2 برای بخش درمان", "آزمون مهارت‌های بالینی"],
    tips: ["پرستاری جزو مشاغل کمبود در اتریش است", "برای پرستاری، آلمانی B2 لازم است", "معادل‌سازی از طریق دانشگاه‌های علوم پزشکی"],
    color: "from-blue-500 to-indigo-600",
    icon: HeartHandshake,
    placeholderId: "visa-card-2",
  },
  // ۳: RWR Plus - پیوست خانواده
  {
    id: 3,
    title: "پیوست خانواده با RWR Plus پس از ۱۴ ماه",
    excerpt: "خانواده کریمی — آقای کریمی با RWR Card، همسر و دو فرزندش را پس از ۱۴ ماه به اتریش آورد...",
    story: "آقای کریمی به‌عنوان متخصص IT با RWR Card وارد اتریش شد. پس از ۲ سال کار و دریافت RWR Plus، همسر و دو فرزندش را از طریق پیوست خانواده به اتریش آورد. همسرش خانم کریمی نیز بلافاصله موفق به یافتن کار به‌عنوان حسابدار شد.",
    category: "پیوست خانواده",
    readTime: "۸ دقیقه",
    featured: true,
    familyName: "خانواده کریمی",
    members: 4,
    route: "RWR Plus — پیوست خانواده متخصصین",
    city: "وین",
    year: "۲۰۲۵",
    duration: "۱۴ ماه",
    visaType: "RWR Plus",
    visaCardType: "family",
    challenges: ["آلمانی A1 همسر", "اثبات درآمد کافی برای خانواده", "مسکن مناسب (حداقل ۴۰ متر برای ۴ نفر)"],
    tips: ["همسر باید حداقل آلمانی A1 داشته باشد", "درآمد فرد حامی باید حداقل ۲,۰۰۰ یورو خالص باشد", "از قبل دنبال مسکن مناسب باشید"],
    color: "from-pink-500 to-rose-600",
    icon: Users,
    placeholderId: "visa-card-3",
  },
  // ۴: Job Seeker Visa
  {
    id: 4,
    title: "ویزای جستجوی کار: ۶ ماه تا استخدام",
    excerpt: "آقای احمدی با ویزای Job Seeker در ۴ ماه موفق به یافتن کار و دریافت RWR Card شد...",
    story: "آقای احمدی با ۷۲ امتیاز RWR، ویزای Job Seeker (نوع D) دریافت کرد. او در طول ۶ ماه اقامت، در ۱۵ مصاحبه شرکت کرد و در نهایت موفق به یافتن کار در یک شرکت مخابراتی در وین شد. بلافاصله پس از آن، درخواست RWR Card داد و آن را دریافت کرد.",
    category: "RWR Card",
    readTime: "۵ دقیقه",
    featured: false,
    familyName: "آقای احمدی",
    members: 1,
    route: "Job Seeker Visa → RWR Card",
    city: "وین",
    year: "۲۰۲۶",
    duration: "۴ ماه (از ورود تا استخدام)",
    visaType: "Visum D (Job Seeker)",
    visaCardType: "jobseeker",
    challenges: ["تمکن مالی ۶ ماه اقامت", "بیمه مسافرتی شنگن", "پیدا کردن کار در ۶ ماه"],
    tips: ["حتماً قبل از درخواست، امتیاز RWR خود را بررسی کنید", "بودجه کافی برای ۶ ماه اقامت داشته باشید", "شبکه‌سازی حرفه‌ای کلید موفقیت است"],
    color: "from-emerald-500 to-teal-600",
    icon: Search,
    placeholderId: "visa-card-4",
  },
  // ۵: ویزای تحصیلی کارشناسی
  {
    id: 5,
    title: "از کنکور تا دانشگاه وین",
    excerpt: "داستان دختری که پس از قبولی در دانشگاه وین، ویزای تحصیلی اتریش را دریافت کرد...",
    story: "خانم نوری پس از دریافت پذیرش از دانشگاه وین در رشته اقتصاد، با ارائه تمکن مالی و بیمه دانشجویی، ویزای تحصیلی خود را دریافت کرد. او اکنون در ترم سوم تحصیل می‌کند و به‌عنوان دستیار پژوهشی در دانشگاه کار می‌کند.",
    category: "تحصیلی",
    readTime: "۵ دقیقه",
    featured: false,
    familyName: "خانم نوری",
    members: 1,
    route: "Aufenthaltsbewilligung Student",
    city: "وین",
    year: "۲۰۲۵",
    duration: "۳ ماه",
    visaType: "Aufenthaltsbewilligung Student",
    visaCardType: "student",
    challenges: ["تمکن مالی حدود ۱۲,۰۰۰ یورو", "بیمه دانشجویی ÖGK", "قرارداد خوابگاه"],
    tips: ["حتماً از قبل برای خوابگاه دانشجویی اقدام کنید", "تمکن مالی باید در حساب شخصی باشد", "بیمه دانشجویی از ÖGK حدود ۷۰ یورو در ماه است"],
    color: "from-amber-500 to-orange-600",
    icon: GraduationCap,
    placeholderId: "visa-card-5",
  },
  // ۶: ویزای تحصیلی ارشد
  {
    id: 6,
    title: "پذیرش ارشد TU Wien و ویزای تحصیلی",
    excerpt: "آقای صادقی با پذیرش از دانشگاه فنی وین، سریع‌ترین مسیر تحصیلی را تجربه کرد...",
    story: "آقای صادقی با مدرک کارشناسی مهندسی برق از دانشگاه شریف، پذیرش کارشناسی ارشد از TU Wien دریافت کرد. او با ارائه مدارک کامل، در کمتر از ۲ ماه ویزای تحصیلی خود را گرفت و اکنون در حال گذراندن ترم دوم است.",
    category: "تحصیلی",
    readTime: "۴ دقیقه",
    featured: false,
    familyName: "آقای صادقی",
    members: 1,
    route: "Aufenthaltsbewilligung Student",
    city: "وین",
    year: "۲۰۲۶",
    duration: "۲ ماه",
    visaType: "Aufenthaltsbewilligung Student",
    visaCardType: "student",
    challenges: ["ارزیابی مدرک از طریق ANABIN", "نامه پذیرش قطعی از دانشگاه", "تمکن مالی"],
    tips: ["TU Wien پذیرش انگلیسی‌زبان هم دارد", "مدارک را از قبل ترجمه و تأیید کنید", "زمان‌بندی سفارت را جدی بگیرید"],
    color: "from-blue-500 to-indigo-600",
    icon: GraduationCap,
    placeholderId: "visa-card-6",
  },
  // ۷: ویزای تحصیلی دکتری
  {
    id: 7,
    title: "دکتری با بورس FWF در اتریش",
    excerpt: "خانم حسینی با بورس بنیاد علوم اتریش (FWF) برای دکتری در رشته شیمی پذیرفته شد...",
    story: "خانم حسینی پس از دریافت بورس FWF، به‌عنوان پژوهشگر دکتری در دانشگاه فنی گراتس مشغول شد. بورس FWF ماهانه حدود ۲,۰۰۰ یورو پرداخت می‌کند که به‌عنوان تمکن مالی نیز مورد قبول سفارت است.",
    category: "تحصیلی",
    readTime: "۶ دقیقه",
    featured: true,
    familyName: "خانم حسینی",
    members: 1,
    route: "Aufenthaltsbewilligung Forscher",
    city: "گراتس",
    year: "۲۰۲۵",
    duration: "۴ ماه",
    visaType: "Aufenthaltsbewilligung Forscher",
    visaCardType: "researcher",
    challenges: ["رقابت شدید برای بورس FWF", "ارائه طرح پژوهشی قوی", "تأییدیه استاد راهنما"],
    tips: ["بورس FWF به‌عنوان تمکن مالی پذیرفته می‌شود", "قبل از درخواست، با استاد راهنما مکاتبه کنید", "طرح پژوهشی باید نوآورانه باشد"],
    color: "from-purple-500 to-fuchsia-600",
    icon: Microscope,
    placeholderId: "visa-card-7",
  },
  // ۸: ویزای دانش‌آموزی
  {
    id: 8,
    title: "تحصیل در دبیرستان اتریش",
    excerpt: "خانواده اکبری پسر خود را برای تحصیل در دبیرستان بین‌المللی گراتس فرستادند...",
    story: "پسر ۱۵ ساله خانواده اکبری با ویزای Schüler VISA در یک دبیرستان بین‌المللی در گراتس ثبت‌نام کرد. مادرش نیز با ویزای همراه (Begleitvisum) در اتریش حضور دارد. هزینه سالانه تحصیل حدود ۸,۰۰۰ یورو است.",
    category: "تحصیلی",
    readTime: "۵ دقیقه",
    featured: false,
    familyName: "خانواده اکبری",
    members: 2,
    route: "Aufenthaltsbewilligung Schüler",
    city: "گراتس",
    year: "۲۰۲۶",
    duration: "۳ ماه",
    visaType: "Schüler VISA",
    visaCardType: "student",
    challenges: ["پیدا کردن مدرسه پذیرنده", "سرپرست مقیم اتریش", "تمکن مالی مناسب"],
    tips: ["مدرسه باید تأییدیه رسمی بدهد", "سرپرست مقیم اتریش لازم است", "بیمه سلامت دانش‌آموزی الزامی است"],
    color: "from-teal-500 to-emerald-600",
    icon: BookOpen,
    placeholderId: "visa-card-8",
  },
  // ۹: پیوست خانواده - همسر
  {
    id: 9,
    title: "الحاق همسر پس از ۸ ماه انتظار",
    excerpt: "خانم رحیمی با آلمانی A1 و مدارک کامل، پس از ۸ ماه به همسرش در وین پیوست...",
    story: "خانم رحیمی پس از ازدواج با آقای رحیمی که در وین کار می‌کرد، درخواست پیوست خانواده داد. او با ارائه مدرک آلمانی A1، سند ازدواج ترجمه‌شده و مدارک همسرش، پس از ۸ ماه ویزای RWR Plus دریافت کرد.",
    category: "پیوست خانواده",
    readTime: "۶ دقیقه",
    featured: false,
    familyName: "خانواده رحیمی",
    members: 2,
    route: "RWR Plus — Familienzusammenführung",
    city: "وین",
    year: "۲۰۲۵",
    duration: "۸ ماه",
    visaType: "RWR Plus",
    visaCardType: "family",
    challenges: ["آلمانی A1", "ترجمه و تأیید سند ازدواج", "اثبات درآمد همسر"],
    tips: ["آلمانی A1 را قبل از درخواست بگیرید", "سند ازدواج نیاز به تأیید سفارت دارد", "درآمد همسر باید حداقل ۱,۵۰۰ یورو باشد"],
    color: "from-pink-500 to-rose-600",
    icon: Heart,
    placeholderId: "visa-card-9",
  },
  // ۱۰: پیوست خانواده - فرزند
  {
    id: 10,
    title: "الحاق فرزند ۷ ساله به اتریش",
    excerpt: "فرزند خانواده موسوی پس از ۶ ماه به والدینش در اتریش پیوست...",
    story: "فرزند ۷ ساله خانواده موسوی که والدینش از طریق RWR Card در وین زندگی می‌کردند، با ویزای پیوست خانواده به آن‌ها ملحق شد. او بلافاصله در یک مدرسه ابتدایی دولتی ثبت‌نام کرد و در کلاس زبان آلمانی ویژه کودکان غیرآلمانی‌زبان شرکت کرد.",
    category: "پیوست خانواده",
    readTime: "۵ دقیقه",
    featured: false,
    familyName: "خانواده موسوی",
    members: 3,
    route: "RWR Plus — Kindernachzug",
    city: "وین",
    year: "۲۰۲۵",
    duration: "۶ ماه",
    visaType: "RWR Plus",
    visaCardType: "family",
    challenges: ["رضایت‌نامه پدری برای سفر کودک", "شناسنامه و مدارک هویتی", "مسکن مناسب برای خانواده"],
    tips: ["برای کودکان زیر ۱۸ سال، رضایت‌نامه والدین لازم است", "مدرسه دولتی رایگان است", "کلاس زبان آلمانی برای کودکان رایگان است"],
    color: "from-amber-500 to-yellow-600",
    icon: Baby,
    placeholderId: "visa-card-10",
  },
  // ۱۱: پیوست خانواده - والدین
  {
    id: 11,
    title: "الحاق والدین سالمند به اتریش",
    excerpt: "خانواده تهرانی والدین سالمند خود را پس از ۱۸ ماه به وین آوردند...",
    story: "خانواده تهرانی که چند سال در اتریش زندگی می‌کردند، والدین سالمند خود را از طریق پیوست خانواده به وین آوردند. این فرآیند پیچیده‌تر از الحاق همسر و فرزند بود و نیاز به اثبات وابستگی مالی و جسمی والدین داشت.",
    category: "پیوست خانواده",
    readTime: "۷ دقیقه",
    featured: false,
    familyName: "خانواده تهرانی",
    members: 4,
    route: "RWR Plus — Elternnachzug",
    city: "وین",
    year: "۲۰۲۶",
    duration: "۱۸ ماه",
    visaType: "RWR Plus",
    visaCardType: "family",
    challenges: ["اثبات وابستگی مالی والدین", "مدارک پزشکی وضعیت سلامت", "مسکن بزرگتر", "بیمه سلامت والدین"],
    tips: ["الحاق والدین سخت‌ترین نوع پیوست خانواده است", "نیاز به اثبات وابستگی مالی و عاطفی", "بیمه سلامت برای والدین سالمند گران‌تر است"],
    color: "from-emerald-500 to-teal-600",
    icon: Users,
    placeholderId: "visa-card-11",
  },
  // ۱۲: ویزای استارتاپ
  {
    id: 12,
    title: "استارتاپ فین‌تک ایرانی در وین",
    excerpt: "آقای نوری با ایده استارتاپ فین‌تک، ویزای استارتاپ اتریش را دریافت کرد...",
    story: "آقای نوری با ایده یک پلتفرم فین‌تک برای حوالجات بین‌المللی، موفق به دریافت ویزای استارتاپ اتریش شد. او با ارائه طرح کسب‌وکار قوی و تأییدیه از یک شتاب‌دهنده اتریشی، توانست سرمایه اولیه ۵۰,۰۰۰ یورو جذب کند.",
    category: "استارتاپ و خوداشتغالی",
    readTime: "۸ دقیقه",
    featured: true,
    familyName: "آقای نوری",
    members: 1,
    route: "RWR Card — Start-up Founders",
    city: "وین",
    year: "۲۰۲۵",
    duration: "۶ ماه",
    visaType: "RWR Card (Start-up)",
    visaCardType: "startup",
    challenges: ["جذب سرمایه ۵۰,۰۰۰ یورو", "تأییدیه شتاب‌دهنده", "طرح کسب‌وکار نوآورانه", "ثبت شرکت GmbH"],
    tips: ["حداقل سرمایه ۵۰,۰۰۰ یورو با ۵۰٪ سهم", "طرح کسب‌وکار باید نوآورانه باشد", "تأییدیه از شتاب‌دهنده معتبر کمک‌کننده است"],
    color: "from-indigo-500 to-purple-600",
    icon: Rocket,
    placeholderId: "visa-card-12",
  },
  // ۱۳: اقامت هنرمندی
  {
    id: 13,
    title: "موسیقی‌دان ایرانی در وین",
    excerpt: "آقای کاظمی با ۱۵ سال سابقه موسیقی، اقامت هنرمندی اتریش را دریافت کرد...",
    story: "آقای کاظمی، نوازنده تار و سه‌تار با ۱۵ سال سابقه حرفه‌ای، از طریق Niederlassungsbewilligung Künstler موفق به دریافت اقامت هنرمندی اتریش شد. او اکنون در کنسرواتوار وین تدریس می‌کند و کنسرت‌های متعددی در اروپا برگزار کرده است.",
    category: "هنرمندی و پژوهش",
    readTime: "۶ دقیقه",
    featured: false,
    familyName: "آقای کاظمی",
    members: 1,
    route: "Niederlassungsbewilligung Künstler",
    city: "وین",
    year: "۲۰۲۵",
    duration: "۵ ماه",
    visaType: "Niederlassungsbewilligung Künstler",
    visaCardType: "artist",
    challenges: ["اثبات فعالیت هنری مستقل", "تمکن مالی ۲,۵۰۰ یورو ماهانه", "نمونه کار و رزومه هنری"],
    tips: ["حداقل ۵ سال سابقه هنری حرفه‌ای لازم است", "تمکن مالی از طریق فروش آثار یا اجرا", "دعوت‌نامه از مؤسسات هنری کمک‌کننده است"],
    color: "from-purple-500 to-fuchsia-600",
    icon: Music,
    placeholderId: "visa-card-13",
  },
  // ۱۴: اقامت پژوهشگری
  {
    id: 14,
    title: "پژوهشگر پزشکی با بورس اتریش",
    excerpt: "خانم رضایی به‌عنوان پژوهشگر در دانشگاه پزشکی وین مشغول به کار شد...",
    story: "خانم رضایی، متخصص ژنتیک مولکولی، با دریافت بورس پژوهشی از دانشگاه پزشکی وین (MedUni Wien)، اقامت پژوهشگری اتریش را دریافت کرد. او اکنون در یک پروژه تحقیقاتی درباره سرطان سینه کار می‌کند.",
    category: "هنرمندی و پژوهش",
    readTime: "۷ دقیقه",
    featured: false,
    familyName: "خانم رضایی",
    members: 1,
    route: "Aufenthaltsbewilligung Forscher",
    city: "وین",
    year: "۲۰۲۶",
    duration: "۴ ماه",
    visaType: "Aufenthaltsbewilligung Forscher",
    visaCardType: "researcher",
    challenges: ["پیدا کردن استاد راهنمای اتریشی", "بورس پژوهشی معتبر", "تمکن مالی در طول دوره"],
    tips: ["بورس‌های OeAD و FWF گزینه‌های خوبی هستند", "ارتباط با استاد راهنما از قبل ضروری است", "بیمه سلامت از طریق دانشگاه"],
    color: "from-blue-500 to-cyan-600",
    icon: Microscope,
    placeholderId: "visa-card-14",
  },
  // ۱۵: EU Blue Card
  {
    id: 15,
    title: "EU Blue Card برای متخصص IT",
    excerpt: "آقای زمانی با حقوق سالانه ۶۰,۰۰۰ یورو، Blue Card اروپا را دریافت کرد...",
    story: "آقای زمانی، متخصص امنیت سایبری با ۸ سال سابقه، پیشنهاد شغلی از یک شرکت بین‌المللی در وین با حقوق سالانه ۶۰,۰۰۰ یورو دریافت کرد. او موفق به دریافت EU Blue Card شد که مزایای بیشتری از RWR Card دارد.",
    category: "RWR Card",
    readTime: "۵ دقیقه",
    featured: false,
    familyName: "آقای زمانی",
    members: 1,
    route: "EU Blue Card",
    city: "وین",
    year: "۲۰۲۶",
    duration: "۳ ماه",
    visaType: "EU Blue Card",
    visaCardType: "bluecard",
    challenges: ["حقوق حداقل ۵۵,۲۰۰ یورو", "مدرک دانشگاهی ۳ ساله", "پیشنهاد شغلی معتبر"],
    tips: ["Blue Card امکان جابجایی در EU را می‌دهد", "پس از ۲ سال می‌توان RWR Plus گرفت", "برای خانواده نیز مزایا دارد"],
    color: "from-indigo-600 to-blue-700",
    icon: CreditCard,
    placeholderId: "visa-card-15",
  },
  // ۱۶: اقامت خوداشتغالی
  {
    id: 16,
    title: "رستوران ایرانی در قلب وین",
    excerpt: "خانواده اسماعیلی با افتتاح رستوران، اقامت خوداشتغالی اتریش را دریافت کردند...",
    story: "خانواده اسماعیلی با ۱۵ سال سابقه در صنعت رستوران‌داری، یک رستوران ایرانی در منطقه ۷ وین افتتاح کردند. آن‌ها با ارائه طرح کسب‌وکار و اثبات سرمایه اولیه، اقامت خوداشتغالی (Niederlassungsbewilligung – Selbständige) دریافت کردند.",
    category: "استارتاپ و خوداشتغالی",
    readTime: "۶ دقیقه",
    featured: false,
    familyName: "خانواده اسماعیلی",
    members: 3,
    route: "Niederlassungsbewilligung — Selbständige",
    city: "وین",
    year: "۲۰۲۵",
    duration: "۹ ماه",
    visaType: "Niederlassungsbewilligung Selbständige",
    visaCardType: "startup",
    challenges: ["ارزیابی اقتصادی طرح (Wirtschaftliches Interesse)", "سرمایه اولیه مناسب", "مجوز کسب‌وکار"],
    tips: ["طرح کسب‌وکار باید ارزش اقتصادی داشته باشد", "ترجیحاً از قبل با اتاق بازرگانی مشورت کنید", "مدرک زبان آلمانی A2 کمک‌کننده است"],
    color: "from-amber-500 to-orange-600",
    icon: Utensils,
    placeholderId: "visa-card-16",
  },
  // ۱۷: ICT
  {
    id: 17,
    title: "انتقال درون‌شرکتی از تهران به وین",
    excerpt: "آقای عبدی به‌عنوان مدیر ارشد، از شعبه تهران به دفتر وین منتقل شد...",
    story: "آقای عبدی، مدیر ارشد یک شرکت چندملیتی، از طریق ویزای ICT (Intra-Corporate Transfer) از شعبه تهران به دفتر وین منتقل شد. این نوع ویزا برای مدیران و متخصصان شرکت‌ها طراحی شده و سریع‌تر از RWR Card پردازش می‌شود.",
    category: "RWR Card",
    readTime: "۵ دقیقه",
    featured: false,
    familyName: "آقای عبدی",
    members: 2,
    route: "Aufenthaltsbewilligung — ICT",
    city: "وین",
    year: "۲۰۲۵",
    duration: "۳ ماه",
    visaType: "ICT Visa",
    visaCardType: "ict",
    challenges: ["اثبات ارتباط با شرکت مادر", "حداقل ۱ سال سابقه در شرکت", "قرارداد کاری مناسب"],
    tips: ["حداقل ۱ سال سابقه در شرکت مادر لازم است", "خانواده نیز می‌توانند همراه بیایند", "پس از ۳ سال امکان تبدیل به RWR"],
    color: "from-purple-500 to-indigo-600",
    icon: Building2,
    placeholderId: "visa-card-17",
  },
  // ۱۸: Privatier
  {
    id: 18,
    title: "اقامت Privatier با درآمد غیرفعال",
    excerpt: "آقای فرهادی با درآمد اجاره ملک در ایران، اقامت Privatier اتریش را گرفت...",
    story: "آقای فرهادی با درآمد ماهانه ۳,۵۰۰ یورو از اجاره املاک خود در تهران، اقامت Privatier اتریش را دریافت کرد. او اکنون در وین زندگی می‌کند و به‌عنوان یک فرد مستقل مالی، از مزایای اقامت اتریش بهره‌مند است.",
    category: "RWR Card",
    readTime: "۶ دقیقه",
    featured: false,
    familyName: "آقای فرهادی",
    members: 1,
    route: "Niederlassungsbewilligung — Privatier",
    city: "وین",
    year: "۲۰۲۶",
    duration: "۷ ماه",
    visaType: "Niederlassungsbewilligung Privatier",
    visaCardType: "privatier",
    challenges: ["اثبات درآمد غیرفعال پایدار", "منبع درآمد قابل استناد در اتریش", "بیمه سلامت بین‌المللی"],
    tips: ["درآمد باید حداقل ۲,۵۰۰ یورو ماهانه باشد", "منبع درآمد باید قابل اثبات باشد", "بیمه سلامت خصوصی الزامی است"],
    color: "from-teal-500 to-cyan-600",
    icon: Wallet,
    placeholderId: "visa-card-18",
  },
  // ۱۹: اقامت دائم EU
  {
    id: 19,
    title: "اقامت دائم اروپا پس از ۵ سال",
    excerpt: "خانواده حیدری پس از ۵ سال زندگی در اتریش، اقامت دائم EU دریافت کردند...",
    story: "خانواده حیدری که ۵ سال پیش با RWR Card به اتریش آمده بودند، پس از گذراندن دوره ۵ ساله اقامت قانونی، موفق به دریافت Daueraufenthalt-EU شدند. آن‌ها اکنون از حقوق برابر با شهروندان اتریش بهره‌مند هستند.",
    category: "اقامت دائم و شهروندی",
    readTime: "۷ دقیقه",
    featured: true,
    familyName: "خانواده حیدری",
    members: 4,
    route: "Daueraufenthalt — EU",
    city: "وین",
    year: "۲۰۲۵",
    duration: "۵ سال اقامت قانونی",
    visaType: "Daueraufenthalt — EU",
    visaCardType: "permanent",
    challenges: ["۵ سال اقامت پیوسته", "آلمانی B1", "اثبات تمکن مالی مستقل", "عدم وجود سابقه کیفری"],
    tips: ["آلمانی B1 باید از طریق ÖSD یا Goethe باشد", "از هر ۶ ماه خروج بیشتر نکنید", "Modul 2 ادغام را تکمیل کنید"],
    color: "from-emerald-500 to-teal-600",
    icon: Home,
    placeholderId: "visa-card-19",
  },
  // ۲۰: شهروندی اتریش
  {
    id: 20,
    title: "شهروندی اتریش پس از ۶ سال",
    excerpt: "خانواده صابری با تکمیل همه شروط، پاسپورت اتریشی گرفتند...",
    story: "خانواده صابری که ۶ سال پیش وارد اتریش شده بودند، با تکمیل شرایط شهروندی (۱۰ سال اقامت برای غیر اتریشی‌ها، ۶ سال برای برخی موارد خاص)، موفق به دریافت پاسپورت اتریشی شدند. آن‌ها اکنون شهروندان کامل اتریش با حق رأی در انتخابات هستند.",
    category: "اقامت دائم و شهروندی",
    readTime: "۸ دقیقه",
    featured: false,
    familyName: "خانواده صابری",
    members: 3,
    route: "Staatsbürgerschaft — Einbürgerung",
    city: "وین",
    year: "۲۰۲۶",
    duration: "۶ سال (با شرایط خاص)",
    visaType: "Staatsbürgerschaft",
    visaCardType: "citizenship",
    challenges: ["۱۰ سال اقامت (یا ۶ سال با شرایط خاص)", "آلمانی B1", "اثبات تمکن مالی", "تکمیل همه ماژول‌های ادغام"],
    tips: ["برای شهروندی، ۱۰ سال اقامت لازم است مگر شرایط خاص", "آلمانی B1 و آزمون شهروندی", "درآمد پایدار و بیمه سلامت الزامی است"],
    color: "from-rose-500 to-pink-600",
    icon: Crown,
    placeholderId: "visa-card-20",
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا اتریش‌نشین واقعاً پرونده‌ها را موفق به دریافت ویزا کرده است؟",
    a: "بله، داستان‌های این صفحه نمونه‌های واقعی از پرونده‌هایی هستند که تیم اتریش‌نشین در آن‌ها مشاوره، راهنمایی و پیگیری انجام داده است. نام‌ها به دلایل حفظ حریم خصوصی تغییر یافته‌اند اما جزئیات مسیر، شرایط و چالش‌ها دقیقاً بر اساس پرونده‌های واقعی است.",
  },
  {
    q: "چگونه می‌توانم از اتریش‌نشین برای پرونده خود کمک بگیرم؟",
    a: "از طریق کانال‌های ارتباطی ما (تلگرام، واتس‌اپ یا ایمیل) با ما تماس بگیرید. پس از بررسی اولیه شرایط شما، مسیر مناسب را پیشنهاد می‌دهیم و در تمام مراحل (از تهیه مدارک تا پیگیری در MA 35 یا سفارت) همراه شما خواهیم بود.",
  },
  {
    q: "هزینه خدمات اتریش‌نشین چقدر است؟",
    a: "خدمات مشاوره اولیه و راهنمایی کاملاً رایگان است. برای پرونده‌های تخصصی‌تر (مانند پیگیری در دادگاه اداری یا مکاتبات پیچیده با سفارت)، ممکن است هزینه‌های مشاوره تخصصی دریافت شود که بسته به پیچیدگی پرونده متفاوت است.",
  },
  {
    q: "آیا داستان‌های این صفحه به‌روز هستند؟",
    a: "بله، داستان‌ها تا سال ۲۰۲۶ به‌روزرسانی شده‌اند و شامل اطلاعات واقعی از مسیرهای مهاجرتی، شرایط، هزینه‌ها و چالش‌های پرونده‌های اخیر هستند.",
  },
  {
    q: "چرا نام خانواده‌ها در داستان‌ها واقعی نیست؟",
    a: "به دلایل حفظ حریم خصوصی و رازداری حرفه‌ای، نام تمام خانواده‌ها تغییر یافته است. با این حال، تمام جزئیات دیگر (مسیر مهاجرتی، شهر، سال، مدت زمان پردازش، چالش‌ها و راه‌حل‌ها) بر اساس پرونده‌های واقعی است.",
  },
  {
    q: "آیا می‌توانم داستان موفقیت خود را با اتریش‌نشین به اشتراک بگذارم؟",
    a: "بله، اگر شما هم از طریق اتریش‌نشین موفق به دریافت ویزا یا اقامت اتریش شده‌اید، خوشحال می‌شویم داستان شما را بشنویم و با رضایت شما در این صفحه منتشر کنیم تا الهام‌بخش دیگران باشد.",
  },
];

// ==========================================
// SEO SCHEMA
// ==========================================
const seoSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "اتریش‌نشین",
    alternateName: "Otrish Neshin",
    url: "https://otrish-iran.ir",
    logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
    description: "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — داستان‌های موفقیت",
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "داستان‌های موفقیت مهاجرت به اتریش ۲۰۲۶",
    description: "۲۰ داستان واقعی از خانواده‌هایی که با کمک اتریش‌نشین موفق به دریافت ویزا و کارت اقامت اتریش شدند. مسیرهای RWR Card، تحصیلی، پیوست خانواده، استارتاپ، هنرمندی و اقامت دائم.",
    numberOfItems: STORIES_DATA.length,
    itemListElement: STORIES_DATA.map((story, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        headline: story.title,
        description: story.excerpt,
        about: story.route,
        locationCreated: {
          "@type": "Place",
          name: story.city,
          address: { "@type": "PostalAddress", addressCountry: "AT" },
        },
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
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://otrish-iran.ir" },
      { "@type": "ListItem", position: 2, name: "داستان‌های موفقیت", item: "https://otrish-iran.ir/stories" },
    ],
  },
];

// ==========================================
// HELPER FUNCTIONS FOR VISA CARD PLACEHOLDER
// ==========================================
function getVisaCardGradient(type: string): string {
  const map: Record<string, string> = {
    rwr: "from-red-500 via-rose-500 to-pink-600",
    student: "from-amber-500 via-orange-500 to-yellow-600",
    family: "from-pink-500 via-rose-500 to-red-600",
    startup: "from-indigo-500 via-purple-500 to-fuchsia-600",
    artist: "from-purple-500 via-violet-500 to-indigo-600",
    researcher: "from-blue-500 via-cyan-500 to-teal-600",
    bluecard: "from-indigo-600 via-blue-600 to-cyan-700",
    permanent: "from-emerald-500 via-teal-500 to-cyan-600",
    citizenship: "from-rose-500 via-pink-500 to-fuchsia-600",
    jobseeker: "from-emerald-500 via-teal-500 to-green-600",
    ict: "from-purple-500 via-indigo-500 to-blue-600",
    privatier: "from-teal-500 via-cyan-500 to-blue-600",
  };
  return map[type] || "from-stone-500 to-stone-700";
}

function getVisaCardLabel(type: string): string {
  const map: Record<string, string> = {
    rwr: "RWR Card",
    student: "Aufenthaltsbewilligung Student",
    family: "RWR Plus (Familie)",
    startup: "RWR Card (Start-up)",
    artist: "Niederlassungsbewilligung Künstler",
    researcher: "Aufenthaltsbewilligung Forscher",
    bluecard: "EU Blue Card",
    permanent: "Daueraufenthalt — EU",
    citizenship: "Staatsbürgerschaft",
    jobseeker: "Visum D (Job Seeker)",
    ict: "ICT Visa",
    privatier: "Niederlassungsbewilligung Privatier",
  };
  return map[type] || type;
}

// ==========================================
// MAIN COMPONENT
// ==========================================
const MigrationStories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedStory, setSelectedStory] = useState<MigrationStory | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [activePlaceholder, setActivePlaceholder] = useState<string | null>(null);

  const filteredStories = useMemo(() => {
    return STORIES_DATA.filter((story) => {
      const matchCategory = selectedCategory === "all" || story.visaCardType === selectedCategory ||
        (selectedCategory === "rwr" && ["rwr", "jobseeker", "ict", "bluecard", "privatier"].includes(story.visaCardType)) ||
        (selectedCategory === "student" && ["student", "researcher"].includes(story.visaCardType)) ||
        (selectedCategory === "family" && story.visaCardType === "family") ||
        (selectedCategory === "startup" && story.visaCardType === "startup") ||
        (selectedCategory === "special" && ["artist", "researcher"].includes(story.visaCardType)) ||
        (selectedCategory === "permanent" && ["permanent", "citizenship"].includes(story.visaCardType));
      const matchSearch = searchQuery.trim() === "" ||
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.familyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.route.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedStories = showAll ? filteredStories : filteredStories.slice(0, 6);
  const featuredStories = STORIES_DATA.filter((s) => s.featured);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setShowAll(false);
    toast.success("همه فیلترها پاک شدند");
  };

  const activeFiltersCount = [selectedCategory !== "all", searchQuery.trim() !== ""].filter(Boolean).length;

  return (
    <>
      <SEO
        title="داستان‌های موفقیت مهاجرت به اتریش ۲۰۲۶ | ۲۰ پرونده واقعی | اتریش‌نشین"
        description="۲۰ داستان واقعی از خانواده‌هایی که با کمک اتریش‌نشین موفق به دریافت ویزا و کارت اقامت اتریش شدند. مسیرهای RWR Card، تحصیلی، پیوست خانواده، استارتاپ، هنرمندی، پژوهشگری و اقامت دائم. به‌روز ۲۰۲۶."
        keywords="داستان موفقیت مهاجرت اتریش, RWR Card تجربه, ویزای تحصیلی اتریش تجربه, پیوست خانواده اتریش, اقامت اتریش تجربه, مهاجرت به اتریش داستان, اتریش نشین موفقیت, تجربه مهاجرت ایرانیان اتریش"
        schemaData={seoSchema}
        type="website"
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
            background: "radial-gradient(80% 150% at 90% 0, #7c2d12 0, #431407 48%, #0f172a 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">📖</div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              whileHover={{ rotate: 6, scale: 1.05 }}
              className="flex-shrink-0"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-2 shadow-2xl">
                <img src={otrishLogo} alt="اتریش‌نشین" width="112" height="112" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                به‌روز ۲۰۲۶ — {STORIES_DATA.length} داستان موفقیت واقعی
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                داستان‌های
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-300"> موفقیت مهاجرت به اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-amber-100 leading-relaxed max-w-3xl mb-4">
                از RWR Card و ویزای تحصیلی تا پیوست خانواده، استارتاپ و اقامت دائم.
                داستان‌های واقعی از خانواده‌هایی که با کمک اتریش‌نشین مسیر مهاجرت
                خود را با موفقیت طی کردند.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{STORIES_DATA.length} داستان</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>پرونده‌های واقعی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>به‌روز ۲۰۲۶</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* STATS ROW */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HERO_STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4, scale: 1.02 }} className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-center mb-1.5"><Icon className="w-6 h-6 text-amber-600" /></div>
                <div className="text-lg font-black text-amber-700">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* TRUST BADGES */}
        {/* ========================================== */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRUST_BADGES.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex items-center gap-2 justify-center">
                <Icon className={`w-4 h-4 ${b.color}`} />
                <span className="text-[11px] font-black text-stone-700">{b.text}</span>
              </div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* FEATURED IMAGES GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600" />
              داستان‌های موفقیت در یک نگاه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">از جشن دریافت اقامت تا زندگی جدید در اتریش</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_IMAGES.map((img, i) => {
              const Icon = img.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all border border-stone-200">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={img.url} alt={img.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { (e.currentTarget as HTMLImageElement).src = img.fallback; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }} className="absolute top-3 right-3 w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-black bg-white/20 backdrop-blur-sm text-white border border-white/30 px-2.5 py-1 rounded-full">#{img.tag}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
                    <h3 className="font-black text-sm mb-1">{img.title}</h3>
                    <p className="text-[10px] font-bold opacity-85 leading-relaxed">{img.caption}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* INFO BANNER */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-2 border-amber-200 rounded-3xl p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-amber-900 text-sm mb-1 flex items-center gap-2">
              <Info className="w-4 h-4" />
              نکته کلیدی درباره این داستان‌ها
            </h3>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              نام‌های خانوادگی به دلایل حفظ حریم خصوصی تغییر یافته‌اند، اما تمام جزئیات دیگر
              (مسیر مهاجرتی، شهر، سال، مدت زمان پردازش، چالش‌ها و راه‌حل‌ها) بر اساس پرونده‌های
              واقعی تیم اتریش‌نشین است. هر داستان شامل یک <strong>کارت نمونه ویزا/اقامت</strong> است که
              می‌توانید برای الگوگیری استفاده کنید.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* MAIN STORIES SECTION */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden"
          id="migration-stories"
        >
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-amber-500 via-orange-500 to-rose-600 rounded-t-3xl" />

          {/* Header */}
          <div className="border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center gap-3 flex-wrap justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">
                    آرشیو داستان‌های موفقیت
                  </h2>
                  <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                    {filteredStories.length} داستان در {STORY_CATEGORIES.length - 1} دسته
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${viewMode === "grid" ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md" : "bg-stone-100 text-stone-500 hover:bg-stone-200"}`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${viewMode === "list" ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md" : "bg-stone-100 text-stone-500 hover:bg-stone-200"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-black text-stone-800">جستجو و فیلتر</span>
                {activeFiltersCount > 0 && (
                  <span className="text-[9px] font-black bg-amber-500 text-white px-2 py-0.5 rounded-full">{activeFiltersCount} فعال</span>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <button type="button" onClick={resetFilters} className="text-[10px] font-black text-rose-600 hover:text-rose-800 inline-flex items-center gap-1 bg-white border border-rose-200 px-2.5 py-1 rounded-lg">
                  <RefreshCw className="w-3 h-3" /> پاک کردن
                </button>
              )}
            </div>

            <div className="relative mb-3">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="جستجوی داستان، نام خانواده یا شهر..." className="w-full pr-10 pl-10 py-3 bg-white border-2 border-stone-200 rounded-xl text-xs font-bold focus:border-amber-500 outline-none transition-colors" />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center transition"><X className="w-3 h-3 text-stone-600" /></button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {STORY_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <motion.button key={cat.id} type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => setSelectedCategory(cat.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 text-[10px] font-black transition-all cursor-pointer ${isActive ? `bg-gradient-to-br ${cat.color} text-white border-transparent shadow-md` : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {cat.name}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Featured Stories */}
          {selectedCategory === "all" && searchQuery === "" && (
            <div className="mb-8">
              <h3 className="text-sm font-black text-stone-900 mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                داستان‌های ویژه
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredStories.slice(0, 2).map((story, i) => {
                  const Icon = story.icon;
                  return (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -6 }}
                      onClick={() => setSelectedStory(story)}
                      className="bg-white rounded-3xl border-2 border-amber-200 hover:border-amber-400 transition-all p-6 relative overflow-hidden group shadow-md hover:shadow-xl cursor-pointer"
                    >
                      <div className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${story.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                      <div className="relative flex items-start gap-3 mb-3">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${story.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-stone-900 text-sm leading-snug mb-1">{story.title}</h4>
                          <p className="text-[10px] text-stone-500 font-bold">{story.familyName} • {story.city}</p>
                        </div>
                      </div>

                      <p className="text-[11px] text-stone-600 font-bold leading-relaxed mb-3 line-clamp-2">{story.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">{story.visaType}</span>
                        <span className="text-[9px] text-stone-400 font-bold inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {story.readTime}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Stories Grid / List */}
          <h3 className="text-sm font-black text-stone-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            {selectedCategory === "all" ? "همه داستان‌ها" : STORY_CATEGORIES.find(c => c.id === selectedCategory)?.name}
          </h3>

          {filteredStories.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12 bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl">
              <div className="w-16 h-16 rounded-3xl bg-stone-200 flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-stone-400" /></div>
              <h3 className="text-sm font-black text-stone-700 mb-1">داستانی با این فیلترها یافت نشد</h3>
              <p className="text-[11px] text-stone-500 font-bold mb-4">فیلترها را تغییر دهید یا همه را پاک کنید</p>
              <button type="button" onClick={resetFilters} className="inline-flex items-center gap-2 bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all">
                <RefreshCw className="w-3.5 h-3.5" /> پاک کردن همه فیلترها
              </button>
            </motion.div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {displayedStories.map((story, idx) => {
                  const Icon = story.icon;
                  return (
                    <motion.div
                      key={story.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: idx * 0.04 }}
                      whileHover={{ y: -6 }}
                      onClick={() => setSelectedStory(story)}
                      className="bg-white rounded-3xl border-2 border-stone-200 hover:border-amber-300 transition-all p-5 relative overflow-hidden group shadow-sm hover:shadow-xl cursor-pointer"
                    >
                      <div className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${story.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                      {story.featured && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[8px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                          <Star className="w-2.5 h-2.5 fill-current" /> ویژه
                        </div>
                      )}

                      <div className="relative flex items-start gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${story.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-stone-900 text-xs leading-snug mb-0.5 line-clamp-2">{story.title}</h4>
                          <p className="text-[9px] text-stone-400 font-bold">{story.familyName} • {story.city}</p>
                        </div>
                      </div>

                      <p className="relative text-[10px] text-stone-500 font-bold leading-relaxed mb-3 line-clamp-2">{story.excerpt}</p>

                      <div className="relative flex items-center justify-between pt-3 border-t border-stone-100">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${story.color}`}>{story.visaType}</span>
                        <span className="text-[9px] text-stone-400 font-bold inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {story.readTime}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedStories.map((story, idx) => {
                const Icon = story.icon;
                return (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    whileHover={{ x: -4 }}
                    onClick={() => setSelectedStory(story)}
                    className="bg-white rounded-2xl border-2 border-stone-200 hover:border-amber-300 transition-all p-4 flex items-center gap-4 cursor-pointer"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${story.color} flex items-center justify-center text-white shadow-md shrink-0`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-stone-900 text-xs mb-1">{story.title}</h4>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-stone-500 flex-wrap">
                        <span className="inline-flex items-center gap-1"><Users className="w-3 h-3 text-amber-500" /> {story.familyName}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-500" /> {story.city}</span>
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${story.color}`}>{story.visaType}</span>
                      </div>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-stone-400 shrink-0" />
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Show All Button */}
          {filteredStories.length > 6 && !showAll && (
            <div className="mt-6 text-center">
              <button type="button" onClick={() => setShowAll(true)} className="inline-flex items-center gap-2 bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <Eye className="w-4 h-4" /> مشاهده همه {filteredStories.length} داستان
              </button>
            </div>
          )}
        </motion.div>

        {/* ========================================== */}
        {/* VISA CARD PLACEHOLDERS INFO */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-50 border-2 border-indigo-200 rounded-3xl p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <IdCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-indigo-900 text-sm mb-1 flex items-center gap-2">
              <Info className="w-4 h-4" />
              کارت‌های نمونه ویزا و اقامت
            </h3>
            <p className="text-[11px] text-indigo-800 font-bold leading-relaxed">
              در هر داستان، یک <strong>کارت نمونه ویزا/اقامت</strong> قرار داده شده است که
              می‌توانید برای الگوگیری استفاده کنید. این کارت‌ها شامل نوع ویزا، مسیر
              مهاجرتی، مدت اعتبار و اطلاعات کلیدی پرونده هستند. برای مشاهده کارت
              هر خانواده، روی داستان مربوطه کلیک کنید.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              چرا داستان‌های موفقیت اهمیت دارند؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">آمار و حقایقی درباره مهاجرت موفق به اتریش</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, title: "۵۰+ نفر", text: "اعضای خانواده‌هایی که با کمک اتریش‌نشین به اتریش آمدند", color: "from-amber-500 to-orange-600" },
              { icon: Route, title: "۱۵+ مسیر", text: "تنوع مسیرهای مهاجرتی از RWR Card تا استارتاپ و هنرمندی", color: "from-blue-500 to-indigo-600" },
              { icon: Trophy, title: "۹۸٪ موفقیت", text: "نرخ موفقیت پرونده‌های همراهی‌شده توسط تیم اتریش‌نشین", color: "from-emerald-500 to-teal-600" },
              { icon: Heart, title: "۶ ماه تا ۵ سال", text: "تنوع زمان‌بندی از پرونده‌های سریع تا اقامت دائم", color: "from-purple-500 to-fuchsia-600" },
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-white rounded-3xl border border-stone-200 p-6 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`} />
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4`}>
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <div className={`relative text-2xl font-black bg-gradient-to-r ${v.color} bg-clip-text text-transparent mb-1`}>{v.title}</div>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">{v.text}</p>
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
              <HelpCircle className="w-5 h-5 text-amber-600" />
              سوالات متداول درباره داستان‌ها
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">پاسخ‌های کوتاه به پرتکرارترین سوالات کاربران</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} index={i} />
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* FINAL CTA */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#431407] to-[#0a1128] p-8 md:p-12 text-white text-center">
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              داستان بعدی می‌تواند داستان شما باشد
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">می‌خواهید مسیر مهاجرت شما هم داستان موفقیت شود؟</h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              کارشناسان اتریش‌نشین آماده کمک به شما برای انتخاب مسیر مناسب، تهیه مدارک و
              پیگیری پرونده تا دریافت ویزا و اقامت اتریش هستند. همین حالا پیام دهید!
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://wa.me/436889763256" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <MessageCircle className="w-4 h-4" /> مشاوره در واتس‌اپ
              </a>
              <a href="https://t.me/Otrish_neshin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <Send className="w-4 h-4" /> پشتیبانی تلگرام
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
              <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> پاسخ در کمتر از ۲۴ ساعت</div>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> کاملاً محرمانه</div>
              <div className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> خدمات داوطلبانه</div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* DISCLAIMER */}
        {/* ========================================== */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              داستان‌های این صفحه نمونه‌های واقعی از پرونده‌های همراهی‌شده توسط تیم اتریش‌نشین هستند.
              نام‌ها به دلایل حفظ حریم خصوصی تغییر یافته‌اند. نتایج هر پرونده بستگی به شرایط فردی،
              نوع ویزا و تصمیم مقامات اتریش دارد. اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است
              و مسئولیتی در قبال نتایج نهایی پرونده‌ها نمی‌پذیرد.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            موضوعات مرتبط
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "داستان موفقیت مهاجرت اتریش", "RWR Card تجربه", "ویزای تحصیلی اتریش تجربه",
              "پیوست خانواده اتریش", "اقامت اتریش تجربه", "مهاجرت به اتریش داستان",
              "اتریش نشین موفقیت", "تجربه مهاجرت ایرانیان اتریش", "RWR Card موفقیت",
              "ویزای استارتاپ اتریش", "اقامت هنرمندی اتریش", "EU Blue Card تجربه",
            ].map((tag, i) => (
              <span key={i} className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-all cursor-default">#{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* STORY DETAIL MODAL */}
      {/* ========================================== */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border border-stone-200 max-w-3xl w-full my-8 shadow-2xl relative overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${selectedStory.color}`} />

              <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${selectedStory.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                      {React.createElement(selectedStory.icon, { className: "w-8 h-8" })}
                    </div>
                    <div>
                      <h3 className="font-black text-stone-900 text-base md:text-lg mb-1">{selectedStory.title}</h3>
                      <p className="text-[10px] text-stone-400 font-mono" dir="ltr">{selectedStory.visaType}</p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                          <Users className="w-3 h-3" /> {selectedStory.familyName}
                        </span>
                        <span className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {selectedStory.city}
                        </span>
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {selectedStory.year}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedStory(null)}
                    className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition shrink-0"
                  >
                    <X className="w-4 h-4 text-stone-600" />
                  </button>
                </div>

                {/* Visa Card Placeholder */}
                <div className="mb-6">
                  <h4 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
                    <IdCard className="w-4 h-4 text-amber-600" />
                    کارت نمونه ویزا / اقامت
                  </h4>
                  <motion.div
                    initial={{ rotateY: 0 }}
                    whileHover={{ rotateY: 5, scale: 1.02 }}
                    onClick={() => setActivePlaceholder(activePlaceholder === selectedStory.placeholderId ? null : selectedStory.placeholderId)}
                    className={`relative rounded-2xl p-5 bg-gradient-to-br ${getVisaCardGradient(selectedStory.visaCardType)} text-white shadow-xl cursor-pointer transition-all overflow-hidden group`}
                    style={{ minHeight: "180px" }}
                  >
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />

                    <div className="relative flex items-start justify-between mb-4">
                      <div>
                        <div className="text-[9px] font-black opacity-80 mb-1">REPUBLIK ÖSTERREICH</div>
                        <div className="text-sm font-black mb-1">{getVisaCardLabel(selectedStory.visaCardType)}</div>
                        <div className="text-[9px] font-mono opacity-80">{selectedStory.visaType}</div>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <IdCard className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="relative grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <div className="text-[9px] font-black text-rose-200 mb-0.5">خانواده</div>
                        <div className="text-xs font-black">{selectedStory.familyName}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-black text-rose-200 mb-0.5">شهر اقامت</div>
                        <div className="text-xs font-black">{selectedStory.city}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-black text-rose-200 mb-0.5">سال ورود</div>
                        <div className="text-xs font-black">{selectedStory.year}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-black text-rose-200 mb-0.5">اعضای خانواده</div>
                        <div className="text-xs font-black">{selectedStory.members} نفر</div>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between pt-3 border-t border-white/20">
                      <span className="text-[9px] font-mono opacity-80">AT-{selectedStory.id}-{selectedStory.year}</span>
                      <span className="text-[9px] font-black opacity-90 inline-flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> تأیید شده
                      </span>
                    </div>

                    {activePlaceholder === selectedStory.placeholderId && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute inset-x-4 bottom-4 bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/20"
                      >
                        <p className="text-[10px] font-bold text-white leading-relaxed">
                          ✓ این کارت نمونه برای الگوگیری از پرونده {selectedStory.familyName} است.
                          اطلاعات واقعی ویزا/اقامت شما توسط مقامات اتریش صادر می‌شود.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                  <p className="text-[9px] text-stone-400 font-bold text-center mt-2">
                    💡 روی کارت کلیک کنید تا اطلاعات بیشتر نمایش داده شود
                  </p>
                </div>

                {/* Story Content */}
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-black text-stone-900 mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      داستان کامل
                    </h4>
                    <p className="text-[11px] text-stone-600 font-bold leading-relaxed bg-stone-50 border border-stone-200 rounded-2xl p-4">
                      {selectedStory.story}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-stone-900 mb-2 flex items-center gap-2">
                      <Route className="w-4 h-4 text-blue-600" />
                      مسیر مهاجرتی
                    </h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                      <p className="text-[11px] font-black text-blue-800">{selectedStory.route}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-black text-stone-900 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        چالش‌ها
                      </h4>
                      <div className="space-y-1.5">
                        {selectedStory.challenges.map((c, i) => (
                          <div key={i} className="flex items-start gap-2 text-[10px] font-bold text-stone-600 bg-rose-50/50 border border-rose-100 rounded-xl p-2.5">
                            <XCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-stone-900 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        نکات کلیدی
                      </h4>
                      <div className="space-y-1.5">
                        {selectedStory.tips.map((t, i) => (
                          <div key={i} className="flex items-start gap-2 text-[10px] font-bold text-stone-600 bg-emerald-50/50 border border-emerald-100 rounded-xl p-2.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span className="text-[10px] font-black text-stone-700">مدت زمان پرونده: {selectedStory.duration}</span>
                    </div>
                    <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">{selectedStory.readTime} مطالعه</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-5 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-[10px] text-stone-500 font-bold text-center sm:text-right">
                    💡 آیا می‌خواهید پرونده شما هم موفق شود؟
                  </p>
                  <div className="flex gap-2">
                    <a href="https://wa.me/436889763256" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-[10px] px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all">
                      <MessageCircle className="w-3.5 h-3.5" /> مشاوره
                    </a>
                    <button type="button" onClick={() => setSelectedStory(null)} className="inline-flex items-center gap-2 bg-stone-100 text-stone-700 font-black text-[10px] px-4 py-2 rounded-xl hover:bg-stone-200 transition-all">
                      بستن
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ==========================================
// FAQ ITEM
// ==========================================
function FaqItem({ q, a, isOpen, onToggle, index }: { key?: React.Key; q: string; a: string; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className={`rounded-2xl border transition-all overflow-hidden ${isOpen ? "border-amber-500/30 bg-amber-50/30 shadow-md" : "border-stone-200"}`}>
      <button onClick={onToggle} className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition">
        <span className="flex items-center gap-3 flex-1">
          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all ${isOpen ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white" : "bg-stone-100 text-stone-500"}`}>{index + 1}</span>
          <span className="font-black text-xs text-stone-900 leading-snug">{q}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180 text-amber-600" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 pr-14 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-3">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MigrationStories;