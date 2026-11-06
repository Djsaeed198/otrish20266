import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car, Sparkles, CheckCircle2, ChevronDown, HelpCircle, MapPin,
  Clock, ShieldCheck, ArrowLeft, Star, Wrench, Gauge, AlertTriangle,
  BadgeCheck, Calendar, Coins, FileText, Zap, Eye, Wind, Disc,
  Droplets, Cpu, Award, TrendingUp, Info, Calculator, Send, MessageCircle,
  Building2, Landmark, UserCheck, Siren
} from 'lucide-react';
import SEO from './SEO';

/* ============================================================
   تصاویر ویژه — Unsplash (بهینه، رایگان، Lazy-load)
============================================================ */
const IMG_HERO =
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80';
// خودرو در جاده - Pickerl
const IMG_GARAGE =
  'https://images.unsplash.com/photo-1632823471565-1ecdf5c6d7b3?auto=format&fit=crop&w=1000&q=80';
// گاراژ و مکانیک
const IMG_ENGINE =
  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=80';
// موتور و بازرسی فنی خودرو

/* ============================================================
   آمار کلیدی
============================================================ */
const STATS = [
  { icon: Car, v: '۲.۵M', l: 'خودرو در اتریش' },
  { icon: Coins, v: '۵۰-۱۲۰€', l: 'هزینه Pickerl' },
  { icon: Clock, v: '۳۰-۶۰', l: 'دقیقه زمان تست' },
  { icon: Siren, v: 'تا ۵٬۰۰۰€', l: 'جریمه عدم تمدید' },
];

/* ============================================================
   بازه‌های قانونی تمدید Pickerl (§57a)
============================================================ */
const TIMELINE = [
  {
    period: 'سال ۰ تا ۳',
    label: 'خودروی نو',
    note: 'بدون نیاز به Pickerl',
    color: 'from-emerald-500 to-green-600',
    icon: Star,
  },
  {
    period: 'سال ۳ تا ۵',
    label: 'اولین Pickerl',
    note: 'هر ۲ سال یک‌بار',
    color: 'from-blue-500 to-indigo-600',
    icon: Calendar,
  },
  {
    period: 'سال ۵ تا ۸',
    label: 'Pickerl دوره‌ای',
    note: 'هر ۲ سال یک‌بار',
    color: 'from-amber-500 to-orange-600',
    icon: Calendar,
  },
  {
    period: 'سال ۸ به بعد',
    label: 'Pickerl سالانه',
    note: 'هر ۱ سال یک‌بار',
    color: 'from-rose-500 to-red-600',
    icon: AlertTriangle,
  },
];

/* ============================================================
   چک‌لیست ۸ موردی بازرسی
============================================================ */
const CHECKLIST = [
  {
    icon: Disc,
    t: 'سیستم ترمز',
    d: 'دیسک، لنت، مایع ترمز و ABS/Airbag',
    weight: 'حیاتی',
  },
  {
    icon: Eye,
    t: 'روشنایی و چراغ‌ها',
    d: 'چراغ جلو، عقب، مه‌شکن، راهنما، ترمز',
    weight: 'حیاتی',
  },
  {
    icon: Wind,
    t: 'سیستم اگزوز',
    d: 'آلودگی هوا، صدا، سلامت کاتالیزور',
    weight: 'زیست‌محیطی',
  },
  {
    icon: Gauge,
    t: 'سیستم تعلیق و فرمان',
    d: 'کمک‌فنر، جعبه فرمان، تایرها',
    weight: 'ایمنی',
  },
  {
    icon: Droplets,
    t: 'مایعات و روغن',
    d: 'روغن موتور، مایع خنک‌کننده، مایع شیشه‌شور',
    weight: 'فنی',
  },
  {
    icon: Cpu,
    t: 'سیستم برقی',
    d: 'باتری، دینام، استارت، ECU',
    weight: 'فنی',
  },
  {
    icon: Wrench,
    t: 'بدنه و شاسی',
    d: 'زنگ‌زدگی، ترک، خوردگی اساسی',
    weight: 'ساختاری',
  },
  {
    icon: ShieldCheck,
    t: 'کمربند و ایربگ',
    d: 'سلامت کمربندها، سنسورها، چراغ هشدار',
    weight: 'حیاتی',
  },
];

/* ============================================================
   مراکز مجاز انجام Pickerl
============================================================ */
const CENTERS = [
  {
    id: 'oamtc',
    name: 'ÖAMTC',
    full: 'Österreichischer Automobil-, Motorrad- und Touring Club',
    color: 'from-yellow-500 to-amber-600',
    bg: 'bg-yellow-50',
    text: 'text-amber-700',
    desc: 'بزرگ‌ترین باشگاه خودرو اتریش با بیش از ۱۰۰ شعبه در سراسر کشور.',
    price: '~۴۹ € (اعضا)',
    pros: ['شعبه در همه ایالت‌ها', 'تخفیف ویژه اعضا', 'رزرو آنلاین'],
    link: 'https://www.oeamtc.at',
  },
  {
    id: 'arboe',
    name: 'ARBÖ',
    full: 'Auto-, Motor- und Radfahrerbund Österreichs',
    color: 'from-blue-600 to-indigo-700',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    desc: 'دومین باشگاه بزرگ خودرو اتریش با تمرکز بر خدمات سریع و مقرون‌به‌صرفه.',
    price: '~۵۲ € (اعضا)',
    pros: ['بدون نیاز به نوبت‌گیری طولانی', 'خدمات امداد جاده‌ای', 'شعب شهری'],
    link: 'https://www.arboe.at',
  },
  {
    id: 'werkstatt',
    name: 'تعمیرگاه‌های مجاز (Werkstatt)',
    full: 'Autorisierte KFZ-Werkstätten',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    desc: 'تعمیرگاه‌های دارای مجوز §57a که اغلب خدمات اضافی نیز ارائه می‌دهند.',
    price: '~۶۰-۱۲۰ €',
    pros: ['تعمیرات همراه با تست', 'مناسب برای سرویس کامل', 'برخی اوقات ارزان‌تر'],
    link: 'https://www.bmvit.gv.at',
  },
];

/* ============================================================
   مراحل انجام Pickerl
============================================================ */
const STEPS = [
  {
    icon: Calendar,
    t: 'بررسی تاریخ انقضا',
    d: 'تاریخ Pickerl روی برچسب (Plakette) نصب‌شده روی پلاک عقب نوشته شده است.',
  },
  {
    icon: Building2,
    t: 'انتخاب مرکز معتبر',
    d: 'از میان ÖAMTC، ARBÖ یا تعمیرگاه‌های مجاز §57a یکی را انتخاب کنید.',
  },
  {
    icon: FileText,
    t: 'رزرو نوبت آنلاین',
    d: 'رزرو تاریخ و ساعت از طریق سایت یا تماس تلفنی. در فصل بهار زودتر اقدام کنید.',
  },
  {
    icon: UserCheck,
    t: 'مراجعه با مدارک',
    d: 'کارت خودرو (Zulassungsschein)، گواهینامه و برچسب قدیمی را همراه داشته باشید.',
  },
  {
    icon: BadgeCheck,
    t: 'دریافت برچسب جدید',
    d: 'در صورت قبولی، Plakette جدید روی پلاک نصب می‌شود. در صورت رد، ۱ ماه فرصت تعمیر دارید.',
  },
];

/* ============================================================
   سوالات متداول
============================================================ */
const FAQS = [
  {
    q: 'Pickerl (§57a) چیست و چرا اهمیت دارد؟',
    a: 'Pickerl نام غیررسمی برچسب معاینه فنی خودرو در اتریش است که طبق قانون §57a KFG انجام می‌شود. این برچسب روی پلاک عقب خودرو نصب می‌شود و نشان می‌دهد خودرو از نظر ایمنی و زیست‌محیطی استانداردهای اتریش را رعایت می‌کند. رانندگی با Pickerl منقضی جریمه سنگین و حتی توقیف خودرو در پی دارد.',
  },
  {
    q: 'هزینه معاینه فنی (Pickerl) در اتریش چقدر است؟',
    a: 'هزینه Pickerl بسته به مرکز انتخابی متفاوت است: در ÖAMTC برای اعضا حدود ۴۹ یورو، در ARBÖ حدود ۵۲ یورو و در تعمیرگاه‌های مجاز بین ۶۰ تا ۱۲۰ یورو. تعمیرگاه‌ها ممکن است هزینه بازرسی اولیه را در صورت تعمیر رایگان کنند.',
  },
  {
    q: 'اگر Pickerl دیر شود چه اتفاقی می‌افتد؟',
    a: 'رانندگی با Pickerl منقضی در اتریش جرم محسوب می‌شود. جریمه نقدی از ۵۰ یورو شروع می‌شود و در موارد شدید تا ۵٬۰۰۰ یورو می‌رسد. پلیس می‌تواند پلاک خودرو را باز کند و خودرو را توقیف کند. بیمه نیز ممکن است در صورت تصادف از پرداخت خسارت امتناع کند.',
  },
  {
    q: 'چطور می‌توانم تاریخ انقضای Pickerl خود را بفهمم؟',
    a: 'روی برچسب Pickerl نصب‌شده روی پلاک عقب، ماه و سال انقضا با علامت‌گذاری مشخص شده است. حرف اول نام ماه (به آلمانی) و دو رقم سال روی برچسب حک می‌شود. برای مثال «H24» یعنی مارس ۲۰۲۴.',
  },
  {
    q: 'آیا خودروی نو نیاز به Pickerl دارد؟',
    a: 'خودروی نو (Neuauto) از تاریخ اولین ثبت (Erstzulassung) به مدت ۳ سال معاف از Pickerl است. در پایان سال سوم باید اولین Pickerl گرفته شود و سپس هر ۲ سال یک‌بار تا سال هشتم. از سال هشتم به بعد، Pickerl باید هر سال تمدید شود.',
  },
  {
    q: 'اگر خودرو در Pickerl رد شود چه باید کرد؟',
    a: 'در صورت رد شدن، شما یک ماه فرصت دارید تا مشکلات را برطرف کرده و مجدداً برای تست مراجعه کنید. در این مدت برچسب موقت (Nachprüfungsplakette) به شما داده می‌شود. پس از رفع نقص، تست تکمیلی معمولاً ارزان‌تر یا حتی رایگان است.',
  },
  {
    q: 'آیا با پلاک خارجی می‌توان در اتریش Pickerl گرفت؟',
    a: 'خودروهای با پلاک خارجی در اتریش معاف از Pickerl اتریشی هستند، اما باید معاینه فنی معتبر کشور مبدأ را داشته باشند. اگر بیش از یک سال در اتریش اقامت دارید، باید خودروی خود را به پلاک اتریشی منتقل کرده و Pickerl اتریشی بگیرید.',
  },
];

/* ============================================================
   کامپوننت اصلی
============================================================ */
const VehicleInspectionGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lastInspection, setLastInspection] = useState<string>('2023-06');

  /* محاسبه تاریخ انقضا */
  const expiryInfo = useMemo(() => {
    if (!lastInspection) return null;
    const [year, month] = lastInspection.split('-').map(Number);
    const now = new Date();
    const monthsSince = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
    const years = monthsSince / 12;

    let intervalYears: number;
    let label: string;
    if (years < 3) {
      intervalYears = 3;
      label = 'خودروی نو (اولین Pickerl)';
    } else if (years < 8) {
      intervalYears = 2;
      label = 'Pickerl دوره‌ای (هر ۲ سال)';
    } else {
      intervalYears = 1;
      label = 'Pickerl سالانه (خودروی قدیمی)';
    }

    const expiry = new Date(year, month - 1 + intervalYears, 1);
    const isExpired = expiry < now;
    const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      expiry: expiry.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' }),
      isExpired,
      daysLeft,
      intervalYears,
      label,
    };
  }, [lastInspection]);

  /* ---------- Schema JSON-LD ---------- */
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          name: 'نحوه انجام معاینه فنی خودرو (Pickerl §57a) در اتریش',
          description:
            'راهنمای گام‌به‌گام دریافت معاینه فنی خودرو (Pickerl) در اتریش بر اساس قانون §57a KFG.',
          totalTime: 'PT45M',
          estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: '49-120' },
          step: STEPS.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.t,
            text: s.d,
          })),
        },
        {
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'AutoRepair',
          name: 'ÖAMTC',
          url: 'https://www.oeamtc.at',
          priceRange: '€€',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Wien',
            addressCountry: 'AT',
          },
        },
        {
          '@type': 'AutoRepair',
          name: 'ARBÖ',
          url: 'https://www.arboe.at',
          priceRange: '€€',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Wien',
            addressCountry: 'AT',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://otrish-iran.ir' },
            { '@type': 'ListItem', position: 2, name: 'خودرو', item: 'https://otrish-iran.ir/auto' },
            { '@type': 'ListItem', position: 3, name: 'Pickerl' },
          ],
        },
        {
          '@type': 'ItemList',
          name: 'موارد بازرسی‌شده در معاینه فنی Pickerl',
          numberOfItems: CHECKLIST.length,
          itemListElement: CHECKLIST.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.t,
            description: c.d,
          })),
        },
      ],
    }),
    []
  );

  return (
    <>
      <SEO
        title="راهنمای کامل معاینه فنی خودرو Pickerl اتریش | §57a KFG + هزینه و مراکز"
        description="راهنمای جامع معاینه فنی خودرو در اتریش (Pickerl §57a) شامل هزینه، بازه‌های قانونی تمدید، چک‌لیست ۸ موردی، مراکز مجاز ÖAMTC و ARBÖ و ماشین‌حساب تاریخ انقضا."
        keywords="Pickerl اتریش, معاینه فنی خودرو اتریش, §57a KFG, ÖAMTC Pickerl, ARBÖ معاینه فنی, هزینه Pickerl, Plakette اتریش, تمدید Pickerl"
        schemaData={schema}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section
        dir="rtl"
        className="font-sans bg-gradient-to-b from-white via-slate-50/40 to-white py-10 md:py-16 space-y-12"
        id="pickerl-guide"
      >
        {/* ==================== HERO ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[36px] border border-slate-200 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 md:p-12 space-y-5">
              <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 text-[10px] font-black px-3 py-1.5 border border-slate-200 rounded-full">
                <Car className="w-3.5 h-3.5" />
                §57a KFG · ÖAMTC · ARBÖ
              </span>

              <h1 className="font-black text-stone-900 text-2xl md:text-4xl leading-tight">
                <span className="text-[#c8102e]">Pickerl منقضی = جریمه تا ۵٬۰۰۰ یورو</span> — آیا می‌دانید چه زمانی باید تمدید کنید؟
              </h1>

              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-bold">
                معاینه فنی خودرو (Pickerl) در اتریش هر سال میلیون‌ها یورو جریمه برای رانندگان بی‌خبر
                به همراه دارد. قانون <strong>§57a KFG</strong> می‌گوید رانندگی با برچسب منقضی جرم
                است و پلیس می‌تواند پلاک خودرو را باز کند. <span className="text-[#c8102e]">در ۲ دقیقه یاد بگیرید چطور از این جریمه فرار کنید.</span>
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: CheckCircle2, t: 'راهنمای رسمی §57a' },
                  { icon: Coins, t: 'از ۴۹ € شروع' },
                  { icon: ShieldCheck, t: '۳۰ دقیقه تست' },
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
                  href="#expiry-calc"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  محاسبه تاریخ انقضا
                </a>
                <a
                  href="https://www.oeamtc.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-slate-400 text-stone-700 text-xs font-black px-5 py-3 rounded-2xl transition"
                >
                  <MapPin className="w-4 h-4" />
                  یافتن شعبه ÖAMTC
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px]">
              <img
                src={IMG_HERO}
                alt="خودروی سواری در جاده اتریش - معاینه فنی Pickerl و تمدید برچسب Plakette"
                loading="lazy"
                width={1400}
                height={900}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/60 lg:to-white" />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-[10px] font-black text-stone-500 mb-0.5">هزینه متوسط</div>
                <div className="text-xl font-black text-[#c8102e]">~ ۵۰ €</div>
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

        {/* ==================== ماشین‌حساب تاریخ انقضا ==================== */}
        <motion.div
          id="expiry-calc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-50 via-blue-50/40 to-emerald-50/40 border border-slate-200 rounded-3xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#c8102e]" />
                ماشین‌حساب تاریخ انقضای Pickerl
              </h2>
              <p className="text-xs text-stone-600 font-bold leading-relaxed">
                تاریخ آخرین معاینه فنی یا تاریخ ثبت اولیه خودرو را وارد کنید تا بازه بعدی و تاریخ
                انقضای Plakette محاسبه شود.
              </p>

              <label className="block text-[10px] font-black text-stone-700">
                تاریخ آخرین معاینه یا ثبت اولیه:
              </label>
              <input
                type="month"
                value={lastInspection}
                onChange={(e) => setLastInspection(e.target.value)}
                className="w-full bg-white border border-stone-200 p-3 rounded-xl text-xs font-mono text-left outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-red-100 transition"
              />
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {expiryInfo && (
                  <motion.div
                    key={expiryInfo.expiry}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`rounded-2xl border-2 p-5 ${
                      expiryInfo.isExpired
                        ? 'bg-rose-50 border-rose-200'
                        : expiryInfo.daysLeft < 60
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-emerald-50 border-emerald-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {expiryInfo.isExpired ? (
                        <AlertTriangle className="w-5 h-5 text-rose-600" />
                      ) : expiryInfo.daysLeft < 60 ? (
                        <Info className="w-5 h-5 text-amber-600" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      )}
                      <span className="text-sm font-black text-stone-900">
                        {expiryInfo.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-xl p-3 border border-stone-200">
                        <div className="text-[10px] font-black text-stone-500 mb-1">
                          تاریخ انقضا
                        </div>
                        <div className="text-sm font-black text-stone-900">
                          {expiryInfo.expiry}
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-stone-200">
                        <div className="text-[10px] font-black text-stone-500 mb-1">
                          {expiryInfo.isExpired ? 'منقضی شده' : 'باقی‌مانده'}
                        </div>
                        <div
                          className={`text-sm font-black ${
                            expiryInfo.isExpired ? 'text-rose-600' : 'text-emerald-600'
                          }`}
                        >
                          {expiryInfo.isExpired
                            ? `${Math.abs(expiryInfo.daysLeft)} روز گذشته`
                            : `${expiryInfo.daysLeft} روز`}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-[10.5px] font-bold text-stone-600 leading-relaxed">
                      {expiryInfo.isExpired
                        ? 'خودروی شما در وضعیت قانونی خطرناکی قرار دارد. همین امروز به یک مرکز Pickerl مراجعه کنید.'
                        : expiryInfo.daysLeft < 60
                        ? 'زمان تمدید نزدیک است. برای جلوگیری از شلوغی، همین حالا نوبت رزرو کنید.'
                        : 'شما در بازه قانونی هستید. برای یادآوری، ۶ هفته قبل از تاریخ انقضا نوبت بگیرید.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ==================== تایم‌لاین تمدید ==================== */}
        <div>
          <div className="mb-5 text-center max-w-2xl mx-auto">
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-[#c8102e]" />
              بازه‌های قانونی تمدید Pickerl بر اساس §57a
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              بر اساس سن خودرو، بازه تمدید متفاوت است — خودروی خود را در جدول زیر پیدا کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIMELINE.map((t, i) => {
              const Icon = t.icon;
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
                  <div
                    className={`absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-br ${t.color} opacity-[0.08] rounded-full`}
                  />
                  <div
                    className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${t.color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-black text-stone-500 mb-0.5">{t.period}</div>
                  <h3 className="text-sm font-black text-stone-900 mb-1">{t.label}</h3>
                  <span
                    className={`inline-block text-[10px] font-black px-2.5 py-1 rounded-full bg-stone-100 text-stone-700`}
                  >
                    {t.note}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==================== تصویر + چک‌لیست ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[320px]">
            <img
              src={IMG_GARAGE}
              alt="تعمیرگاه مجاز خودرو در اتریش - انجام معاینه فنی Pickerl توسط مکانیک متخصص"
              loading="lazy"
              width={1000}
              height={700}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 text-white">
              <div className="text-[10px] font-black opacity-80 mb-1">§57a · KFG</div>
              <div className="text-base font-black">بازرسی حرفه‌ای در ۳۰ دقیقه</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#c8102e]" />
              ۸ مورد اصلی بازرسی در معاینه فنی
            </h2>
            <p className="text-xs text-stone-600 font-bold leading-relaxed">
              در معاینه فنی Pickerl، تکنسین‌ها بیش از <strong>۱۵۰ مورد</strong> را بررسی می‌کنند.
              این ۸ بخش، مهم‌ترین دلایل رد شدن یا تأیید خودرو هستند:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CHECKLIST.map((c, i) => {
                const Icon = c.icon;
                const weightColor =
                  c.weight === 'حیاتی'
                    ? 'bg-rose-50 text-rose-700'
                    : c.weight === 'زیست‌محیطی'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700';
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl border border-stone-200 p-4 flex items-start gap-3 hover:shadow-md transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[11px] font-black text-stone-900">{c.t}</h4>
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-full ${weightColor}`}
                        >
                          {c.weight}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 font-bold leading-relaxed">
                        {c.d}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==================== مراکز مجاز ==================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#c8102e]" />
              سه مرکز اصلی انجام Pickerl در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              انتخاب شما بر اساس قیمت، دسترسی و خدمات — همه مجاز طبق قانون §57a
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CENTERS.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="relative bg-white rounded-3xl border border-stone-200 p-6 overflow-hidden group hover:border-slate-300 hover:shadow-lg transition-all"
              >
                <div
                  className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${c.color} opacity-[0.08] rounded-full`}
                />
                <div className="relative flex items-start gap-3 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center shrink-0 shadow-md`}
                  >
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-black text-stone-900">{c.name}</h3>
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[10px] font-black ${c.text} hover:underline`}
                    >
                      {c.link.replace('https://', '')} ↗
                    </a>
                  </div>
                </div>

                <p className="relative text-[10.5px] text-stone-500 font-bold leading-relaxed mb-3">
                  {c.full}
                </p>
                <p className="relative text-[11px] text-stone-600 font-bold leading-relaxed mb-3">
                  {c.desc}
                </p>

                <div className="relative flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-black ${c.text} ${c.bg} px-2.5 py-1 rounded-full`}>
                    {c.price}
                  </span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <ul className="relative space-y-1.5 mb-4">
                  {c.pros.map((p, k) => (
                    <li
                      key={k}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-stone-600"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ==================== مراحل HowTo ==================== */}
        <div>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <BadgeCheck className="w-5 h-5 text-[#c8102e]" />
              مسیر دریافت Pickerl در ۵ گام ساده
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از بررسی تاریخ تا نصب برچسب جدید — کمتر از یک روز کاری
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
                  <h3 className="relative text-[12px] font-black text-stone-900 mb-1">{s.t}</h3>
                  <p className="relative text-[10.5px] text-stone-500 font-bold leading-relaxed">
                    {s.d}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==================== تصویر سوم + هشدار ==================== */}
        <div className="relative rounded-3xl overflow-hidden min-h-[240px] md:min-h-[300px]">
          <img
            src={IMG_ENGINE}
            alt="موتور خودرو در حال بازرسی فنی Pickerl اتریش - چک‌لیست §57a KFG"
            loading="lazy"
            width={1000}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a1128]/90 via-[#0a1128]/65 to-transparent" />
          <div className="relative p-8 md:p-12 max-w-xl text-white">
            <span className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/30 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full mb-4">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-300" />
              هشدار قانونی
            </span>
            <h3 className="text-xl md:text-2xl font-black mb-3 leading-snug">
              بیمه در صورت تصادف با Pickerl منقضی، خسارت پرداخت نمی‌کند
            </h3>
            <p className="text-xs md:text-sm text-stone-200 font-bold leading-relaxed">
              یکی از جدی‌ترین عواقب Pickerl منقضی، بطلان پوشش بیمه شخص ثالث است. در صورت بروز
              تصادف، ممکن است شخصاً مسئول پرداخت تمام خسارات جانی و مالی شوید. این موضوع
              می‌تواند به ورشکستگی مالی منجر شود. <strong>پس هرگز این تاریخ را به تعویق نیندازید.</strong>
            </p>
          </div>
        </div>

        {/* ==================== FAQ ==================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره Pickerl
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
                      ? 'border-[#c8102e]/30 bg-[#c8102e]/[0.02] shadow-md'
                      : 'border-stone-200'
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
                            ? 'bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="font-black text-xs text-stone-900 leading-snug">{f.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#c8102e]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
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
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              کمک فوری برای Pickerl
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              کمک می‌خواهید برای Pickerl؟ ما همراه شما هستیم
            </h2>
            <p className="text-sm text-stone-300 font-bold leading-relaxed">
              تیم اتریش‌نشین می‌تواند در یافتن نزدیک‌ترین مرکز، رزرو نوبت و ترجمه مکالمات با
              تکنسین‌ها همراه شما باشد. همچنین اگر در تست رد شدید، ما مسیر رفع نقص را هموار می‌کنیم.
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
              این راهنما بر اساس قانون §57a KFG و رویه‌های جاری اتریش تهیه شده اما جایگزین مشاوره
              رسمی ÖAMTC، ARBÖ یا مقامات مربوطه نیست. برای اطلاعات به‌روز، همیشه از سایت رسمی
              مرکز انتخابی و وزارت حمل‌ونقل اتریش (<a href="https://www.bmk.gv.at" target="_blank" rel="noopener noreferrer" className="underline">bmk.gv.at</a>) استفاده کنید.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default VehicleInspectionGuide;