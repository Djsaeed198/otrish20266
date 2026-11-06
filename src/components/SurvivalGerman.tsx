import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play, Pause, Volume2, BookOpen, Clock, Sparkles, CheckCircle2,
  HelpCircle, ChevronDown, ArrowLeft, Star, MessageCircle, Send,
  AlertTriangle, Award, TrendingUp, Users, GraduationCap, Mic,
  Headphones, Languages, Target, Zap, Coffee, MapPin, Flag,
  BadgeCheck, Landmark, Heart
} from "lucide-react";
import SEO from "./SEO";

/* ============================================================
   تصاویر ویژه — Unsplash
============================================================ */
const IMG_HERO =
  "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1400&q=80";
// وین - شهر با معماری و فرهنگ خاص
const IMG_CAFE =
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=80";
// کافه وین - فرهنگ قهوه‌خانه
const IMG_LEARNING =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80";
// یادگیری زبان - کلاس

/* ============================================================
   داده‌ها
============================================================ */
interface Phrase {
  german: string;
  phonetic: string;
  farsi: string;
  context: string;
}

interface Podcast {
  id: string;
  title: string;
  scenarioFarsi: string;
  duration: string;
  phrases: Phrase[];
}

interface Flashcard {
  id: string;
  german: string;
  phonetic: string;
  category: string;
  farsiTranslation: string;
  exampleGerman: string;
  exampleFarsi: string;
  description: string;
}

interface DictionaryTerm {
  word: string;
  hochdeutsch: string;
  translation: string;
  pronunciation: string;
  category: string;
  example: string;
  trivia: string;
  imageSeed: string;
}

const STATS = [
  { icon: Languages, v: "۲۲", l: "واژه اختصاصی اتریشی" },
  { icon: Headphones, v: "۹", l: "عبارت صوتی کابردی" },
  { icon: BookOpen, v: "۴", l: "فلش‌کارت اداری" },
  { icon: Award, v: "۱۰۰٪", l: "رایگان و داوطلبانه" },
];

const PODCAST_TRACKS: Podcast[] = [
  {
    id: "pod1",
    title: "خرید از سوپرمارکت‌های Spar و Billa",
    scenarioFarsi:
      "مکالمات متداول صوتی جهت تسویه فاکتورهای صندوق و درخواست کیسه خرید یا پرداخت کارتی.",
    duration: "۳:۱۰",
    phrases: [
      {
        german: "Wo kann ich das Olivenöl finden?",
        phonetic: "وو کان ایش داس اولیون‌اُول فیندن؟",
        farsi: "کجا می‌توانم روغن زیتون پیدا کنم؟",
        context: "آدرس کالا",
      },
      {
        german: "Brauchen Sie eine Tasche?",
        phonetic: "براوخن زی آینه تاشه؟",
        farsi: "کیسه خرید نیاز دارید؟",
        context: "خدمات صندوق",
      },
      {
        german: "Ich möchte mit Karte zahlen, bitte.",
        phonetic: "ایش موخته میت کارته چالن، بیته.",
        farsi: "مایلم با کارت اعتباری پرداخت کنم، لطفاً.",
        context: "تسویه حساب",
      },
    ],
  },
  {
    id: "pod2",
    title: "مراجعه حضوری به شهرداری (Meldezettel)",
    scenarioFarsi:
      "جملات لازم برای صحبت با مأمور شهرداری (Meldeamt) جهت ثبت رسمی آدرس منزل مسکونی.",
    duration: "۲:۴۵",
    phrases: [
      {
        german: "Ich möchte meinen neuen Wohnsitz anmelden.",
        phonetic: "ایش موخته ماینن نویین وون‌زیتس آن‌ملدن.",
        farsi: "من می‌خواهم آدرس مسکونی جدیدم را ثبت شهرداری کنم.",
        context: "آغاز کار",
      },
      {
        german: "Hier ist mein Meldezettel und Reisepass.",
        phonetic: "هیر ایست ماین ملدتستل اوند رایزه‌پاس.",
        farsi: "بفرمایید این برگه ملدتستل من و پاسپورت معتبرم است.",
        context: "ارائه مدرک",
      },
      {
        german: "Ist diese Bestätigung kostenlos?",
        phonetic: "ایست دیزه بش‌تِتی‌قونک کاستن‌لوس؟",
        farsi: "آیا این تاییدیه رایگان است؟",
        context: "سوال اداری",
      },
    ],
  },
  {
    id: "pod3",
    title: "مراجعه به پزشک عمومی و تمدید E-Card",
    scenarioFarsi:
      "شرح دردهای موضعی، درخواست وقت ویزیت و ارائه بیمه سلامت عمومی اتریش ÖGK.",
    duration: "۳:۲۰",
    phrases: [
      {
        german: "Ich habe einen Termin um zehn Uhr.",
        phonetic: "ایش هابه آینن ترمین اوم ذن اور.",
        farsi: "من ساعت ۱۰ وقت ملاقات با پزشک دارم.",
        context: "پذیرش درمانگاه",
      },
      {
        german: "Hier ist meine grüne E-Card.",
        phonetic: "هیر ایست ماینه قرونه اِ کارت.",
        farsi: "بفرمایید این کارت سبز E-Card من است.",
        context: "بیمه سلامت",
      },
      {
        german: "Ich brauche ein Rezept für dieses Medikament.",
        phonetic: "ایش براوخه آین رتسپت فور دیزه مدیکامنت.",
        farsi: "من برای این دارو احتیاج به نسخه دارم.",
        context: "داروخانه عمومی",
      },
    ],
  },
];

const SURVIVAL_FLASHCARDS: Flashcard[] = [
  {
    id: "fc1",
    german: "Meldezettel",
    phonetic: "ملدِتستل",
    category: "امور شهرداری و اسکان",
    farsiTranslation: "برگه تاییدیه ثبت آدرس مسکونی",
    exampleGerman: "Der Meldezettel ist für das Bankkonto erforderlich.",
    exampleFarsi:
      "داشتن برگه ثبت آدرس مسکونی جهت افتتاح حساب بانکی اتریش اجباری است.",
    description:
      "مهم‌ترین و پایه‌ای‌ترین سند اداری اتریش که ظرف ۳ روز پس از نقل مکان باید به شهرداری (Magistrat) محله تسلیم کنید.",
  },
  {
    id: "fc2",
    german: "Rot-Weiß-Rot - Karte",
    phonetic: "روت‌وایس‌روت کارته",
    category: "اقامت و ویزا",
    farsiTranslation: "کارت اقامت سرخ - سفید - سرخ اتریش",
    exampleGerman: "Meine RWR-Karte wurde für zwei Jahre bewilligt.",
    exampleFarsi: "کارت سرخ-سفید-سرخ من به مدت دو سال صادر (موافقت) شد.",
    description:
      "کارت اقامت فیزیکی موقت کاری اتریش برای متخصصین ماهر و حقوق‌های منطبق بر کاتالوگ Kollektivvertrag.",
  },
  {
    id: "fc3",
    german: "E-Card",
    phonetic: "اِ کارت",
    category: "بهداشت و درمان",
    farsiTranslation: "کارت درمانی بیمه سلامت اتریش",
    exampleGerman: "Bitte zeigen Sie Ihre E-Card am Empfang.",
    exampleFarsi: "لطفاً کارت سبز درمانی خود را به باجه پذیرش نشان دهید.",
    description:
      "کارت ملی هوشمند بیمه همگانی پیشگیری رسمی اتریش مجهز به عکس پرسنلی و کدهای تراکنش درمانی.",
  },
  {
    id: "fc4",
    german: "Grüß Gott",
    phonetic: "کرویس گات",
    category: "فرهنگ و رفتار",
    farsiTranslation: "سلام و روز خوش (رسمی و بومی اتریش)",
    exampleGerman: "Grüß Gott! Wie kann ich Ihnen heute helfen?",
    exampleFarsi: "سلام و روز خوش! چطور می‌توانم امروز کمکتان کنم؟",
    description:
      "مرسوم‌ترین کلمه احترام و سلام رسمی بومی اتریشی‌ها به ویژه در وین و ایالت‌های کوه آلپ بجای Guten Tag آلمانی معمولی.",
  },
];

const DICTIONARY_TERMS: DictionaryTerm[] = [
  {
    word: "Sackerl",
    hochdeutsch: "Papiertüte / Plastiktüte",
    translation: "کیسه یا پلاستیک خرید رایج",
    pronunciation: "زاکِرل",
    category: "shopping",
    example: "Brauchen Sie ein Sackerl für Ihren Einkauf?",
    trivia:
      "در آلمان به کیسه خرید Tüte می‌گویند اما در سوپر‌های اتریش (Spar, Billa) هربار صندوقدار از شما Sackerl تقاضا خواهد کرد.",
    imageSeed: "shopping-bag",
  },
  {
    word: "Paradeiser",
    hochdeutsch: "Tomate",
    translation: "گوجه‌فرنگی",
    pronunciation: "پارادایسر",
    category: "food",
    example: "Ich kaufe ein Kilo Paradeiser auf dem Naschmarkt.",
    trivia:
      "این کلمه برگرفته از واژه بهشت (Paradies) است. در تمام برچسب‌های قیمتی تره‌بار اتریش به جای Tomate این واژه درج شده است.",
    imageSeed: "tomatoes",
  },
  {
    word: "Erdapfel",
    hochdeutsch: "Kartoffel",
    translation: "سیب‌زمینی",
    pronunciation: "اِردآپفل",
    category: "food",
    example: "Erdäpfelsalat ist eine typische österreichische Beilage.",
    trivia:
      "ترجمه تحت‌اللفظی آن «سیب روی زمین» است (شبیه به اصطلاح فرانسوی Pomme de terre). سالاد سیب‌زمینی اتریش شهرت جهانی دارد.",
    imageSeed: "potatoes",
  },
  {
    word: "Bim",
    hochdeutsch: "Straßenbahn",
    translation: "تراموا / قطار درون‌شهری روی ریل",
    pronunciation: "بیم",
    category: "transport",
    example: "Fährt diese Bim direkt zum Westbahnhof?",
    trivia:
      "یک کلمه مخفف شیرین و کاملاً اتریشی! به علت صدای مکرر بوق و زنگ قدیمی واگن‌ها (بیم-بیم) به این نام مشهور گشته است.",
    imageSeed: "tram",
  },
  {
    word: "Obers",
    hochdeutsch: "Sahne",
    translation: "خامه صبحانه یا آشپزی",
    pronunciation: "اُبرس",
    category: "food",
    example: "Ein Melange mit Schlagobers, bitte.",
    trivia:
      "اتریشی‌ها هیچ‌گاه کلمه Schlagsahne آلمانی را به کار نمی‌برند. در منوی کافه‌های وین همواره Schlagobers می‌بینید.",
    imageSeed: "whipped-cream",
  },
  {
    word: "Jänner",
    hochdeutsch: "Januar",
    translation: "ژانویه (اولین ماه سال میلادی)",
    pronunciation: "یِنِر",
    category: "calendar",
    example: "Der Kurs beginnt am ersten Jänner.",
    trivia:
      "تنها ماه سررسید میلادی که در حقوق رسمی و قراردادهای دولتی اتریش با آلمانی معیار کشور آلمان فرق داشته و کلمه‌ای اختصاصی است.",
    imageSeed: "january-calendar",
  },
  {
    word: "heuer",
    hochdeutsch: "dieses Jahr",
    translation: "امسال / در سال جاری",
    pronunciation: "هویا",
    category: "slang",
    example: "Wir haben heuer einen sehr milden Winter in Wien.",
    trivia:
      "کلمه‌ای پرکاربرد در جنوب آلمان و اتریش برای توصیف اتفاقات سال جاری که در بخش غربی آلمان کمتر شنیده می‌شود.",
    imageSeed: "this-year-calendar",
  },
  {
    word: "Servus",
    hochdeutsch: "Hallo / Tschüss",
    translation: "سلام و هم خداحافظ صمیمی",
    pronunciation: "سِرووس",
    category: "greeting",
    example: "Servus Michael! Wie geht es dir?",
    trivia:
      "برگرفته از واژه لاتین به کنایه از «در خدمت شما هستم». در تمام پاتوق‌ها و دیدارهای جوانان رواج درجه یک دارد.",
    imageSeed: "greeting-handshake",
  },
  {
    word: "leiwand",
    hochdeutsch: "toll / super",
    translation: "معرکه، باحال، عالی یا باکیفیت",
    pronunciation: "لای‌واند",
    category: "slang",
    example: "Das neue Klimaticket ist wirklich leiwand!",
    trivia:
      "اصطلاح چیره و اصیل لهجه وینی که برای نشان دادن نهایت رضایت و لذت عمیق از یک رویداد یا کالا از ته دل استفاده می‌شود.",
    imageSeed: "awesome-vienna",
  },
  {
    word: "Melange",
    hochdeutsch: "Kaffee mit Milch",
    translation: "قهوه‌ی سنتی وینی کف‌دار",
    pronunciation: "ملانش",
    category: "food",
    example: "Ich trinke gerne eine Wiener Melange im Café.",
    trivia:
      "نوشیدنی نمادین وین که مخلوطی از قهوه اسپرسو داغ و کف شیر غلیظ پرچرب است و نماد فرهنگ قهوه‌خانه‌نشینی اتریش است.",
    imageSeed: "melange-coffee",
  },
  {
    word: "Beisl",
    hochdeutsch: "Kneipe / Wirtshaus",
    translation: "مسافرخانه یا کافه سنتی کوچک",
    pronunciation: "بایزل",
    category: "places",
    example: "Am Abend gehen wir in ein gemütliches Wiener Beisl.",
    trivia:
      "اماکنی بومی و دنج که غذاهای محلی ارزان مانند اشنیتسل را همراه آبجو ارائه می‌دهند و بسیار صمیمی هستند.",
    imageSeed: "traditional-pub",
  },
  {
    word: "Semmel",
    hochdeutsch: "Brötchen",
    translation: "نان گرد کوچک",
    pronunciation: "زِمِل",
    category: "food",
    example: "Ich hätte gerne zwei Semmeln.",
    trivia: "پر مصرف‌ترین نان اتریش برای صبحانه و شام.",
    imageSeed: "bread-roll",
  },
  {
    word: "Jause",
    hochdeutsch: "Zwischenmahlzeit",
    translation: "میان‌وعده",
    pronunciation: "یاوزه",
    category: "food",
    example: "Es ist Zeit für eine kleine Jause.",
    trivia:
      "میان‌وعده‌ای که هر اتریشی معمولاً حدود ساعت ۱۰ صبح یا ۴ بعدازظهر می‌خورد.",
    imageSeed: "snack-time",
  },
  {
    word: "U-Bahn",
    hochdeutsch: "Untergrundbahn",
    translation: "مترو",
    pronunciation: "او-بان",
    category: "transport",
    example: "Die U-Bahn kommt in zwei Minuten.",
    trivia: "سریع‌ترین وسیله نقلیه عمومی در وین.",
    imageSeed: "metro-train",
  },
  {
    word: "Rathaus",
    hochdeutsch: "Stadthaus",
    translation: "شهرداری",
    pronunciation: "رات-هاوس",
    category: "places",
    example: "Das Rathaus von Wien ist prachtvoll.",
    trivia: "مرکز اصلی امور اداری شهر.",
    imageSeed: "city-hall-vienna",
  },
  {
    word: "Gemütlich",
    hochdeutsch: "behaglich",
    translation: "دنج و راحت",
    pronunciation: "گه-موت-لیش",
    category: "culture",
    example: "Es ist sehr gemütlich hier.",
    trivia: "حس رفاه و راحتی در یک محیط.",
    imageSeed: "cozy-atmosphere",
  },
  {
    word: "Passt",
    hochdeutsch: "Das ist in Ordnung",
    translation: "باشه / مناسبه",
    pronunciation: "پاست",
    category: "slang",
    example: "Passt, machen wir so.",
    trivia: "برای توافق و تأیید استفاده می‌شود.",
    imageSeed: "agreement-thumbsup",
  },
];

const CATEGORIES = [
  { id: "all", name: "🌸 همه اصطلاحات", color: "from-stone-500 to-stone-700" },
  { id: "greeting", name: "👋 احوال‌پرسی", color: "from-blue-500 to-indigo-600" },
  { id: "food", name: "🍏 غذا و خوراک", color: "from-emerald-500 to-teal-600" },
  { id: "shopping", name: "🛒 خرید روزمره", color: "from-amber-500 to-orange-600" },
  { id: "transport", name: "🚇 ترابری", color: "from-purple-500 to-fuchsia-600" },
  { id: "slang", name: "💬 اصطلاحات خیابانی", color: "from-rose-500 to-red-600" },
  { id: "places", name: "📍 کافه و پاتوق", color: "from-cyan-500 to-blue-600" },
];

const FAQS = [
  {
    q: "آیا یادگیری آلمانی اتریشی (Österreichisches Deutsch) ضروری است؟",
    a: "بله، تا حدی. آلمانی معیار (Hochdeutsch) در همه جا فهمیده می‌شود، اما واژگان اختصاصی اتریشی مثل Sackerl, Paradeiser, Jänner در مکالمات روزمره، سوپرمارکت‌ها، کافه‌ها و ادارات رسمی به‌کار می‌رود. دانستن این واژگان، سرعت ادغام شما در جامعه اتریش را چند برابر می‌کند.",
  },
  {
    q: "تفاوت اصلی آلمانی اتریشی و آلمانی آلمان چیست؟",
    a: "سه تفاوت اصلی: ۱) واژگان: مثلاً اتریشی‌ها به گوجه Paradeiser، به سیب‌زمینی Erdapfel و به کیسه Sackerl می‌گویند. ۲) تلفظ: لحن نرم‌تر، حذف برخی صداها و کشش خاص. ۳) گرامر: برخی ساختارهای اداری و رسمی متفاوت (مثل Jänner به‌جای Januar). در مجموع، آلمانی اتریشی رسمی‌تر و مؤدبانه‌تر است.",
  },
  {
    q: "برای مصاحبه کاری در اتریش چه سطح آلمانی لازم است؟",
    a: "بسته به صنعت متفاوت است. برای مشاغل IT و مهندسی، سطح B1-B2 کافی است. برای پزشکی، پرستاری، وکالت، و آموزش، سطح C1-C2 الزامی است. برای مشاغل خدماتی مثل فروشندگی و رستوران، A2-B1 توصیه می‌شود. مدرک رسمی ÖSD یا Goethe معمولاً درخواست می‌شود.",
  },
  {
    q: "چگونه در وین تلفظ اتریشی را تمرین کنم؟",
    a: "چند راه کاربردی: ۱) تماشای ORF (تلویزیون رسمی اتریش) با زیرنویس آلمانی. ۲) شرکت در Stammtisch‌ها (جلسات محلی) و کافه‌های وینی. ۳) استفاده از اپلیکیشن‌های یادگیری با لهجه اتریشی مثل این پلتفرم. ۴) گوش دادن به رادیو Ö1 یا FM4. ۵) تکرار روزانه ۱۰ دقیقه با استفاده از دیکشنری صوتی این پلتفرم.",
  },
  {
    q: "آیا دوره‌های زبان در WIFI و BFI برای اتریش مفیدتر است؟",
    a: "بله، WIFI و BFI هر دو دوره‌های آلمانی با تمرکز بر لهجه اتریشی و واژگان اداری ارائه می‌دهند. مزیت بزرگ: این دوره‌ها مورد تأیید WAFF هستند و با فاند آموزشی، تا ۱۰۰٪ شهریه شما پرداخت می‌شود. برای اطلاعات بیشتر به راهنمای دوره‌های WIFI/BFI ما مراجعه کنید.",
  },
  {
    q: "مهم‌ترین واژه‌های آلمانی اتریشی برای هفته اول چیست؟",
    a: "پنج واژه حیاتی: ۱) Grüß Gott (سلام رسمی). ۲) Meldezettel (فرم ثبت آدرس). ۳) E-Card (کارت بیمه). ۴) Sackerl (کیسه خرید). ۵) Semmel (نان). یادگیری این پنج واژه، ۸۰٪ مکالمات روزمره هفته اول شما را پوشش می‌دهد.",
  },
];

/* ============================================================
   کامپوننت اصلی
============================================================ */
export default function SurvivalGerman() {
  const [activePodcast, setActivePodcast] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playProgress, setPlayProgress] = useState<number>(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /* Flashcards carousel */
  const [currentCardIdx, setCurrentCardIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const startSimulation = () => {
    if (progressRef.current) clearInterval(progressRef.current);
    const interval = setInterval(() => {
      setPlayProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 0;
        }
        return prev + 4;
      });
    }, 1000);
    progressRef.current = interval;
  };

  const handlePlayPodcast = (id: string) => {
    if (activePodcast === id) {
      if (isPlaying) {
        if (progressRef.current) clearInterval(progressRef.current);
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        startSimulation();
      }
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
      setActivePodcast(id);
      setIsPlaying(true);
      setPlayProgress(0);
      startSimulation();
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx((prev) => (prev + 1) % SURVIVAL_FLASHCARDS.length);
    }, 200);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx(
        (prev) =>
          (prev - 1 + SURVIVAL_FLASHCARDS.length) % SURVIVAL_FLASHCARDS.length
      );
    }, 200);
  };

  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-AT";
      utterance.rate = 0.85;
      const voices = window.speechSynthesis.getVoices();
      const atVoice = voices.find((v) => v.lang.toLowerCase().includes("at"));
      const deVoice = voices.find((v) => v.lang.toLowerCase().includes("de"));
      if (atVoice) utterance.voice = atVoice;
      else if (deVoice) utterance.voice = deVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentCard = SURVIVAL_FLASHCARDS[currentCardIdx];

  /* ---------- Schema JSON-LD ---------- */
  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          name: "آلمانی بقا برای فارسی‌زبانان اتریش — لهجه وینی (Österreichisches Deutsch)",
          description:
            "دوره رایگان آلمانی اتریشی با تمرکز بر واژگان اداری، مکالمات روزمره سوپرمارکت، شهرداری و پزشک همراه با تلفظ صوتی لهجه وین.",
          inLanguage: ["fa-IR", "de-AT"],
          provider: {
            "@type": "Organization",
            name: "اتریش‌نشین",
            url: "https://otrish-iran.ir",
          },
          educationalLevel: "Beginner to Intermediate",
          teaches: [
            "Österreichisches Deutsch",
            "اداری اتریش (Meldezettel, E-Card)",
            "مکالمات روزمره وینی",
            "لهجه و تلفظ de-AT",
          ],
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online",
            courseWorkload: "PT2H",
          },
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
          "@type": "HowTo",
          name: "نحوه یادگیری سریع آلمانی اتریشی در هفته اول",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "گوش دادن به پادکست‌های موقعیتی",
              text: "شروع با مکالمات سوپرمارکت، شهرداری و پزشک برای مواجهه سریع با واژگان کلیدی.",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "تمرین با فلش‌کارت‌های اداری",
              text: "حفظ ۴ سند کلیدی: Meldezettel, E-Card, RWR-Karte و Grüß Gott.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "مرور دیکشنری لهجه وینی",
              text: "یادگیری واژه‌های خاص اتریشی مثل Sackerl, Paradeiser, Beisl و Bim.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "تمرین تلفظ با صدای بومی",
              text: "استفاده از دکمه تلفظ صوتی با لهجه de-AT برای هر واژه.",
            },
          ],
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "خانه",
              item: "https://otrish-iran.ir",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "آموزش",
              item: "https://otrish-iran.ir/education",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "آلمانی بقا",
            },
          ],
        },
        {
          "@type": "LearningResource",
          name: "Survival German — آلمانی بقا برای اتریش",
          learningResourceType: "Interactive Course",
          inLanguage: ["fa", "de-AT"],
          isAccessibleForFree: true,
          educationalUse: "Self-Study",
        },
      ],
    }),
    []
  );

  return (
    <>
      <SEO
        title="آلمانی بقا اتریش | Survival German با لهجه وینی + دیکشنری Österreichisches Deutsch"
        description="یادگیری سریع آلمانی اتریشی با فلش‌کارت، پادکست صوتی و دیکشنری لهجه وینی. مناسب فارسی‌زبانان مقیم وین برای امور اداری، خرید و مکالمات روزمره."
        keywords="آلمانی اتریشی, Survival German, Österreichisches Deutsch, لهجه وینی, یادگیری آلمانی اتریش, واژگان اتریشی, Meldezettel, E-Card, Sackerl, Paradeiser, Grüß Gott, Wiener Dialekt"
        schemaData={schema}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section
        dir="rtl"
        className="font-sans bg-gradient-to-b from-white via-rose-50/20 to-white py-10 md:py-16 space-y-12"
        id="survival-german-module"
      >
        {/* ==================== HERO ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[36px] border border-rose-200 shadow-sm"
        >
          {/* پرچم اتریش به عنوان نوار تزئینی */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-l from-red-600 via-white to-red-600 z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 md:p-12 space-y-5">
              <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-[10px] font-black px-3 py-1.5 border border-red-100 rounded-full">
                <Flag className="w-3.5 h-3.5" />
                ÖSTERREICHISCHES DEUTSCH · DE-AT
              </span>

              <h1 className="font-black text-stone-900 text-2xl md:text-4xl leading-tight">
                <span className="text-[#c8102e]">بدون زبان، حتی با اقامت هم غریبی</span> — آلمانی بقا برای زندگی در اتریش
              </h1>

              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-bold">
                آلمانی که در آلمان یاد می‌گیرید، در سوپرمارکت‌های Spar و Billa وین کار نمی‌کند!
                اتریشی‌ها به <strong>گوجه Paradeiser</strong>، به <strong>سیب‌زمینی Erdapfel</strong> و
                به <strong>کیسه خرید Sackerl</strong> می‌گویند. در این دوره رایگان، ۲۲ واژه اختصاصی
                اتریشی، ۹ عبارت صوتی کابردی و ۴ سند اداری حیاتی را با <span className="text-[#c8102e]">تلفظ صوتی لهجه وین</span> یاد می‌گیرید.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: CheckCircle2, t: "۱۰۰٪ رایگان" },
                  { icon: Volume2, t: "تلفظ بومی de-AT" },
                  { icon: Award, t: "بر پایه فرهنگ وین" },
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
                  href="#flashcards-section"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  شروع با فلش‌کارت‌ها
                </a>
                <a
                  href="#dictionary-section"
                  className="inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-rose-400 text-stone-700 text-xs font-black px-5 py-3 rounded-2xl transition"
                >
                  <Languages className="w-4 h-4" />
                  دیکشنری لهجه وینی
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px]">
              <img
                src={IMG_HERO}
                alt="شهر وین اتریش - یادگیری لهجه وینی و آلمانی اتریشی برای فارسی‌زبانان"
                loading="lazy"
                width={1400}
                height={900}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/60 lg:to-white" />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-[10px] font-black text-stone-500 mb-0.5">واژه اختصاصی اتریشی</div>
                <div className="text-xl font-black text-[#c8102e]">۲۲ کلمه</div>
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

        {/* ==================== دو ستونه: فلش‌کارت + پادکست ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="flashcards-section">
          {/* === فلش‌کارت === */}
          <div className="lg:col-span-5 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-red-700 font-black bg-red-50 px-2.5 py-1 rounded inline-block">
                  ADMINISTRATIVE VOKABELN
                </span>
                <h2 className="font-black text-stone-900 text-base sm:text-lg">
                  فلش‌کارت‌های واژگان اداری اتریش
                </h2>
                <p className="text-xs text-stone-500 font-bold leading-relaxed">
                  ۴ واژه حیاتی که روزانه در Magistratها، کتب حقوقی و ادارات وین با آن‌ها سر و کار دارید. روی کارت کلیک کنید تا معنی، مثال و فکت تاریخی را ببینید.
                </p>
              </div>

              {/* 3D Flashcard */}
              <div
                className="w-full h-64 cursor-pointer select-none"
                style={{ perspective: "1000px" }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-full h-full"
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between text-white"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded shadow-sm">
                        {currentCard.category}
                      </span>
                      <BookOpen className="w-5 h-5 text-red-400" />
                    </div>

                    <div className="space-y-2 text-center">
                      <h3
                        className="text-2xl font-black tracking-wide text-amber-300 font-mono"
                        dir="ltr"
                      >
                        {currentCard.german}
                      </h3>
                      <p className="text-xs text-stone-300 font-bold">
                        تلفظ: {currentCard.phonetic}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(currentCard.german);
                        }}
                        className="inline-flex items-center gap-1 text-[10px] bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full text-white font-black transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        پخش تلفظ
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold">
                      <span>کلیک برای نمایش معنا 🔄</span>
                      <span>
                        کارت {currentCardIdx + 1} از {SURVIVAL_FLASHCARDS.length}
                      </span>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 bg-white border-2 border-red-200 rounded-2xl p-5 flex flex-col justify-between text-right"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2 border-b border-stone-100 pb-2">
                        <span className="text-[10px] bg-stone-100 text-stone-600 font-black px-2 py-0.5 rounded">
                          معنا و کاربرد اتریشی
                        </span>
                        <Star className="w-4 h-4 text-amber-500" />
                      </div>
                      <h3 className="font-black text-base text-[#c8102e] mb-2">
                        {currentCard.farsiTranslation}
                      </h3>
                      <p className="text-[11px] text-stone-600 leading-relaxed font-bold">
                        {currentCard.description}
                      </p>
                    </div>

                    <div
                      className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-left"
                      dir="ltr"
                    >
                      <p className="text-[11px] font-black font-mono text-stone-800 leading-normal">
                        <strong>Bsp:</strong> {currentCard.exampleGerman}
                      </p>
                      <p
                        className="text-[10.5px] font-bold text-stone-500 mt-1 text-right"
                        dir="rtl"
                      >
                        <strong>ترجمه:</strong> {currentCard.exampleFarsi}
                      </p>
                    </div>

                    <span className="text-[10px] text-stone-400 text-center font-bold">
                      برای برگشت کلیک کنید 🔄
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={prevCard}
                  className="bg-stone-100 hover:bg-stone-200 active:scale-95 transition-all text-xs font-black text-stone-700 px-4 py-2 rounded-xl cursor-pointer"
                >
                  ← کارت قبلی
                </button>
                <div className="flex gap-1">
                  {SURVIVAL_FLASHCARDS.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentCardIdx
                          ? "bg-[#c8102e] w-6"
                          : "bg-stone-300"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={nextCard}
                  className="bg-stone-900 hover:bg-stone-800 active:scale-95 transition-all text-xs font-black text-white px-4 py-2 rounded-xl cursor-pointer"
                >
                  کارت بعدی →
                </button>
              </div>
            </motion.div>
          </div>

          {/* === پادکست === */}
          <div className="lg:col-span-7 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-red-700 font-black bg-red-50 px-2.5 py-1 rounded inline-block">
                  SITUATIVE AUDIO-GUIDE
                </span>
                <h2 className="font-black text-stone-900 text-base sm:text-lg flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-[#c8102e]" />
                  پادکست‌های صوتی ۳ دقیقه‌ای اتریشی
                </h2>
                <p className="text-xs text-stone-500 font-bold leading-relaxed">
                  مکالمات واقعی که در سوپرمارکت، شهرداری و مطب پزشک با آن‌ها روبرو می‌شوید. هر پادکست ۳ عبارت کلیدی با تلفظ و ترجمه دارد.
                </p>
              </div>

              <div className="space-y-3.5">
                {PODCAST_TRACKS.map((track) => {
                  const isSelected = activePodcast === track.id;
                  const isCurrentPlaying = isSelected && isPlaying;
                  return (
                    <div
                      key={track.id}
                      className={`border rounded-2xl p-4 transition-all ${
                        isSelected
                          ? "bg-rose-50/40 border-red-300 shadow-md"
                          : "bg-white border-stone-200 hover:border-stone-300 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <button
                          onClick={() => handlePlayPodcast(track.id)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                            isCurrentPlaying
                              ? "bg-[#c8102e] text-white animate-pulse shadow-lg"
                              : "bg-stone-100 hover:bg-red-50 hover:text-red-600 text-stone-600"
                          }`}
                        >
                          {isCurrentPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </button>

                        <div className="flex-1 text-right">
                          <div className="flex items-center gap-1.5 justify-end flex-wrap">
                            <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                              {track.duration}
                              <Clock className="w-3 h-3" />
                            </span>
                            <h3 className="font-black text-xs text-stone-900">
                              {track.title}
                            </h3>
                          </div>
                          <p className="text-[11px] text-stone-500 font-bold mt-1 leading-relaxed">
                            {track.scenarioFarsi}
                          </p>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-3 border-t border-stone-200 space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-stone-200 h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className="bg-gradient-to-r from-[#c8102e] to-rose-600 h-full transition-all duration-300"
                                    style={{ width: `${playProgress}%` }}
                                  />
                                </div>
                                <span className="text-[9px] font-black text-stone-500 font-mono">
                                  {playProgress
                                    ? `${Math.round(playProgress)}%`
                                    : "۰:۰۰"}
                                </span>
                              </div>

                              <div className="space-y-3 pt-1">
                                <h4 className="text-[10px] font-black text-[#c8102e] bg-red-100/60 p-1.5 rounded inline-block">
                                  🎯 عبارات صوتی کلیدی این موقعیت:
                                </h4>
                                <div className="grid grid-cols-1 gap-2">
                                  {track.phrases.map((ph, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, y: 5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: idx * 0.05 }}
                                      className="bg-white border border-stone-200 p-3 rounded-xl space-y-1.5 text-right hover:border-red-200 transition"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="text-[9px] bg-stone-100 text-stone-600 font-black px-1.5 py-0.5 rounded-md">
                                          {ph.context}
                                        </span>
                                        <button
                                          onClick={() => handleSpeak(ph.german)}
                                          className="w-6 h-6 rounded-full bg-stone-100 hover:bg-red-50 hover:text-red-600 text-stone-500 flex items-center justify-center transition"
                                          title="پخش تلفظ"
                                        >
                                          <Volume2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                      <p
                                        className="text-xs font-black font-mono text-stone-800 text-left select-all"
                                        dir="ltr"
                                      >
                                        {ph.german}
                                      </p>
                                      <p className="text-[10px] font-bold text-[#c8102e]">
                                        تلفظ فارسی: {ph.phonetic}
                                      </p>
                                      <p className="text-[10.5px] font-bold text-stone-600">
                                        ترجمه: {ph.farsi}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ==================== تصویر میانی + فرهنگ قهوه‌خانه ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[320px]">
            <img
              src={IMG_CAFE}
              alt="کافه سنتی وینی و فرهنگ Melange - یادگیری آلمانی اتریشی در فضای واقعی"
              loading="lazy"
              width={1000}
              height={700}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 text-white">
              <div className="text-[10px] font-black opacity-80 mb-1">
                WIENER KAFFEEHAUS
              </div>
              <div className="text-base font-black">یادگیری در فضای واقعی وین</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[#c8102e]" />
              چرا آلمانی اتریشی با آلمانی آلمان متفاوت است؟
            </h2>
            <p className="text-xs text-stone-600 font-bold leading-relaxed">
              اتریش یک هویت فرهنگی مستقل دارد و این هویت در زبانشان منعکس است. کافه‌های وینی
              که یونسکو ثبت جهانی‌شان کرده، محل گفتن <strong>Melange</strong> نه "Kaffee mit Milch"
              است. یادگیری این تفاوت‌ها، شما را از یک توریست به یک ساکن واقعی تبدیل می‌کند.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  icon: Languages,
                  t: "واژگان اختصاصی اتریشی",
                  d: "Sackerl, Paradeiser, Erdapfel, Jänner, Beisl — واژه‌هایی که در آلمان متفاوت گفته می‌شوند.",
                },
                {
                  icon: Mic,
                  t: "تلفظ با لهجه وینی",
                  d: "کشش صداها، لحن نرم و حذف برخی صداها - کاملاً متفاوت با آلمانی معیار.",
                },
                {
                  icon: Coffee,
                  t: "فرهنگ قهوه‌خانه",
                  d: "Melange, Einspänner, Kleiner Brauner - نام‌های قهوه که فقط در اتریش معنی دارند.",
                },
                {
                  icon: Landmark,
                  t: "اداری و حقوقی",
                  d: "اصطلاحات خاص ادارات وین که در هیچ کتاب آلمانی آلمان پیدا نمی‌کنید.",
                },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 flex items-start gap-3 hover:shadow-md transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-black text-stone-900 mb-0.5">
                      {b.t}
                    </h3>
                    <p className="text-[10px] text-stone-500 font-bold leading-relaxed">
                      {b.d}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== دیکشنری گویش اتریشی ==================== */}
        <div id="dictionary-section">
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <span className="text-[10px] text-red-700 font-black bg-rose-100 px-2.5 py-1 rounded-full inline-block mb-2">
              ÖSTERREICHISCHES WÖRTERBUCH
            </span>
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Languages className="w-5 h-5 text-[#c8102e]" />
              دیکشنری گویش و لهجه اصیل اتریشی 🇦🇹
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1 leading-relaxed">
              واژگان، خوراکی‌ها، اصطلاحات عامیانه و ترابری وین که با زبان رسمی آلمان تفاوت دارند.
              روی آیکون 🔊 کلیک کنید تا تلفظ با لهجه وین (de-AT) را بشنوید.
            </p>
          </div>

          <DictionaryBlock onSpeak={handleSpeak} />
        </div>

        {/* ==================== تصویر سوم + نکته طلایی ==================== */}
        <div className="relative rounded-3xl overflow-hidden min-h-[240px] md:min-h-[300px]">
          <img
            src={IMG_LEARNING}
            alt="یادگیری زبان آلمانی اتریشی در گروه - کلاس‌های WIFI و BFI با فاند WAFF"
            loading="lazy"
            width={1000}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a1128]/90 via-[#0a1128]/65 to-transparent" />
          <div className="relative p-8 md:p-12 max-w-xl text-white">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              نکته طلایی برای یادگیری
            </span>
            <h3 className="text-xl md:text-2xl font-black mb-3 leading-snug">
              با فاند WAFF، دوره‌های زبان آلمانی WIFI و BFI رایگان می‌شود
            </h3>
            <p className="text-xs md:text-sm text-stone-200 font-bold leading-relaxed">
              صندوق حمایت <strong>WAFF</strong> شهر وین تا ۱۰۰٪ شهریه دوره‌های زبان آلمانی در
              <strong> WIFI</strong> و <strong>BFI</strong> را پرداخت می‌کند. با این پلتفرم،
              واژگان اتریشی را یاد بگیرید و سپس در کلاس رسمی، مدرک معتبر ÖSD یا Goethe دریافت کنید.
            </p>
          </div>
        </div>

        {/* ==================== FAQ ==================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره یادگیری آلمانی اتریشی
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
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full">
              <Heart className="w-3.5 h-3.5 text-amber-300" />
              همراه شما در یادگیری زبان
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              زبان، کلید ورود به جامعه اتریش است
            </h2>
            <p className="text-sm text-stone-300 font-bold leading-relaxed">
              تیم اتریش‌نشین می‌تواند شما را به دوره‌های مناسب زبان آلمانی در WIFI و BFI
              معرفی کند، در تکمیل درخواست فاند WAFF کمک کند و منابع یادگیری رایگان
              اختصاصی در اختیارتان قرار دهد.
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
                کانال تلگرام زبان
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
              این پلتفرم آموزشی رایگان است و صرفاً جنبه کمک‌آموزشی دارد. تلفظ‌های صوتی بر پایه
              صدای پیش‌فرض مرورگر شما پخش می‌شود و ممکن است دقیقاً با لهجه وینی یکسان نباشد.
              برای یادگیری رسمی، همیشه در دوره‌های معتبر مثل WIFI و BFI ثبت‌نام کنید.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   زیرکامپوننت دیکشنری
============================================================ */
function DictionaryBlock({ onSpeak }: { onSpeak: (text: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const filtered = useMemo(() => {
    return DICTIONARY_TERMS.filter((item) => {
      const matchesSearch =
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hochdeutsch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.translation.includes(searchQuery);
      const matchesCat =
        selectedCat === "all" || item.category === selectedCat;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCat]);

  return (
    <div className="space-y-4">
      {/* Search + Categories */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-5 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 جستجوی واژه اتریشی، معادل آلمانی یا معنای فارسی..."
            className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-red-100 font-bold transition"
          />
        </div>

        <div className="md:col-span-12 lg:col-span-7 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCat(tab.id)}
              className={`px-3 py-2 rounded-xl border text-[11px] font-black shrink-0 transition-all cursor-pointer ${
                selectedCat === tab.id
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
      <div className="text-[11px] font-bold text-stone-500 text-right">
        نمایش <span className="font-black text-[#c8102e]">{filtered.length}</span> واژه از{" "}
        {DICTIONARY_TERMS.length} واژه اتریشی
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((item, idx) => (
            <motion.div
              key={item.word}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between text-right space-y-3.5 shadow-sm hover:shadow-lg hover:border-red-200 transition-all"
            >
              {/* Decorative gradient background */}
              <div className="absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-br from-[#c8102e] to-[#970d22] opacity-[0.04] rounded-full" />

              <div className="relative space-y-3">
                {/* Word + Speak */}
                <div className="flex justify-between items-start">
                  <button
                    onClick={() => onSpeak(item.word)}
                    className="w-8 h-8 bg-red-50 hover:bg-red-100 text-[#c8102e] rounded-full flex items-center justify-center cursor-pointer transition shrink-0"
                    title="پخش تلفظ صوتی با گویش اتریش"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div className="text-right">
                    <h3
                      className="font-black text-stone-900 text-base font-mono leading-tight"
                      dir="ltr"
                    >
                      {item.word}
                    </h3>
                    <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                      تلفظ: {item.pronunciation}
                    </p>
                  </div>
                </div>

                {/* Hochdeutsch */}
                <div
                  className="text-[10px] text-stone-600 font-bold bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-100"
                  dir="ltr"
                >
                  DE: <span className="font-black text-stone-800">{item.hochdeutsch}</span>
                </div>

                {/* Translation */}
                <div className="p-3 bg-red-50/40 rounded-xl border border-red-100 text-right space-y-1">
                  <span className="text-[9px] text-[#c8102e] font-black inline-block">
                    معنی فارسی
                  </span>
                  <p className="text-xs font-black text-stone-900">
                    {item.translation}
                  </p>
                </div>

                {/* Example */}
                <div
                  className="text-left bg-stone-50 p-2.5 rounded-lg border border-stone-100"
                  dir="ltr"
                >
                  <p className="text-[11px] font-bold text-stone-700 italic">
                    "{item.example}"
                  </p>
                </div>

                {/* Trivia */}
                <p className="text-[10.5px] text-stone-600 leading-relaxed font-bold pt-2 border-t border-stone-100">
                  <span className="text-[#c8102e]">💡</span>{" "}
                  <strong>نکته بومی:</strong> {item.trivia}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center p-8 text-stone-400 text-xs font-bold bg-stone-50/50 border border-stone-200 rounded-2xl">
            واژه‌ای مطابق با فیلتر شما یافت نشد. عبارت دیگری وارد کنید.
          </div>
        )}
      </div>
    </div>
  );
}