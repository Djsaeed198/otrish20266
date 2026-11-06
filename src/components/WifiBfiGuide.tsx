import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap, Sparkles, CheckCircle2, ChevronDown, HelpCircle,
  Wallet, FileText, Users, Award, Clock, MapPin, Building2,
  BookOpen, Target, TrendingUp, ShieldCheck, ArrowLeft, Star,
  Laptop, Wrench, Languages, Briefcase, Heart, AlertTriangle,
  BadgeCheck, Landmark, HandCoins
} from 'lucide-react';
import SEO from './SEO';

/* ============================================================
   تصاویر ویژه — Unsplash (بهینه، رایگان، Lazy-load)
============================================================ */
const IMG_HERO =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80';
// دانشجویان در کلاس آموزشی
const IMG_WORKSHOP =
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80';
// جلسه آموزش حرفه‌ای
const IMG_VIENNA_EDU =
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80';
// فضای آموزشی مدرن

/* ============================================================
   داده‌ها
============================================================ */
const STATS = [
  { icon: GraduationCap, v: '۱۰۰۰+', l: 'دوره فعال WIFI & BFI' },
  { icon: HandCoins, v: 'تا ۱۰۰٪', l: 'پوشش شهریه توسط WAFF' },
  { icon: Users, v: '۵۰K+', l: 'شرکت‌کننده سالانه در وین' },
  { icon: Clock, v: '۳-۱۲ ماه', l: 'طول دوره‌های رایج' },
];

const PROVIDERS = [
  {
    id: 'wifi',
    name: 'WIFI (اقتصاد اتریش)',
    short: 'WIFI',
    color: 'from-red-600 to-rose-700',
    bg: 'bg-red-50',
    text: 'text-red-700',
    desc: 'بزرگ‌ترین مؤسسه آموزش حرفه‌ای اتریش، وابسته به اتاق بازرگانی (WKO). تمرکز روی مهارت‌های فنی، IT، مدیریت و کسب‌وکار.',
    tags: ['فنی‌وحرفه‌ای', 'IT و برنامه‌نویسی', 'مدیریت', 'زبان تخصصی'],
    link: 'https://www.wifi.at',
  },
  {
    id: 'bfi',
    name: 'BFI (مؤسسه آموزش کارگران)',
    short: 'BFI',
    color: 'from-blue-600 to-indigo-700',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    desc: 'مؤسسه آموزش حرفه‌ای وابسته به اتاق کارگران (AK). تمرکز روی آموزش‌های مقرون‌به‌صرفه، مهارت‌های شغلی و بازآموزی.',
    tags: ['بازآموزی شغلی', 'مهارت پایه', 'کامپیوتر', 'زبان آلمانی'],
    link: 'https://www.bfi.wien',
  },
  {
    id: 'waff',
    name: 'WAFF (صندوق حمایت کارکنان وین)',
    short: 'WAFF',
    color: 'from-emerald-600 to-teal-700',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    desc: 'نهاد تأمین فاند آموزشی کارکنان شهر وین. تا ۱۰۰٪ شهریه دوره‌های مصوب WIFI, BFI و سایر مؤسسات را پرداخت می‌کند.',
    tags: ['فاند آموزشی', 'تا ۱۰۰٪ شهریه', 'فقط ساکنان وین', 'بدون بازپرداخت'],
    link: 'https://www.waff.at',
  },
];

const CATEGORIES = [
  { icon: Laptop, t: 'IT و برنامه‌نویسی', d: 'Python, Web, Data Science, SAP, Netzwerktechnik', n: '۲۴۰+ دوره' },
  { icon: Wrench, t: 'فنی و صنعتی', d: 'برق، جوشکاری، مکانیک، اتوماسیون، ایمنی کار', n: '۳۲۰+ دوره' },
  { icon: Languages, t: 'زبان آلمانی و انگلیسی', d: 'A1 تا C2، Business German، ÖSD و Goethe', n: '۱۸۰+ دوره' },
  { icon: Briefcase, t: 'مدیریت و کسب‌وکار', d: 'MBA، Projektmanagement، Buchhaltung، Sales', n: '۲۱۰+ دوره' },
  { icon: Heart, t: 'سلامت و مراقبت', d: 'Pflege، Altenbetreuung، Erste Hilfe، Heimhilfe', n: '۹۵+ دوره' },
  { icon: Target, t: 'آماده‌سازی شغلی', d: 'رزومه، مصاحبه، مهارت نرم، کارآفرینی', n: '۷۰+ دوره' },
];

const STEPS = [
  {
    icon: BookOpen,
    t: 'انتخاب دوره مناسب',
    d: 'دوره مورد نظر خود را در سایت WIFI یا BFI جست‌وجو کنید و از قرار گرفتن آن در لیست دوره‌های مورد تأیید WAFF مطمئن شوید.',
  },
  {
    icon: FileText,
    t: 'ثبت‌نام اولیه در مؤسسه',
    d: 'فرم Anmeldung را در WIFI یا BFI تکمیل کنید. مؤسسه به‌طور خودکار درخواست فاند شما را به WAFF ارسال می‌کند.',
  },
  {
    icon: Wallet,
    t: 'تکمیل درخواست WAFF',
    d: 'مدارک هویتی، اقامت، فیش حقوقی سه‌ماهه اخیر و قرارداد کار خود را در پورتال WAFF آپلود کنید.',
  },
  {
    icon: BadgeCheck,
    t: 'دریافت Bescheid',
    d: 'معمولاً بین ۳ تا ۶ هفته پس از ثبت، تأییدیه کتبی (Bescheid) دریافت می‌کنید.',
  },
  {
    icon: Award,
    t: 'پرداخت خودکار شهریه',
    d: 'شهریه مستقیماً توسط WAFF به مؤسسه پرداخت می‌شود یا پس از موفقیت در دوره به شما بازپرداخت می‌گردد.',
  },
];

const FAQS = [
  {
    q: 'WIFI و BFI چه تفاوتی با هم دارند؟',
    a: 'WIFI وابسته به اتاق بازرگانی اتریش (WKO) است و بر دوره‌های فنی، IT، مدیریت و مهارت‌های پیشرفته تمرکز دارد. BFI وابسته به اتاق کارگران (AK) است و روی بازآموزی شغلی، مهارت‌های پایه و دوره‌های مقرون‌به‌صرفه‌تر متمرکز است. هر دو دارای اعتبار رسمی و مورد تأیید WAFF هستند.',
  },
  {
    q: 'آیا اتباع خارجی هم می‌توانند از فاند WAFF استفاده کنند؟',
    a: 'بله. WAFF محدودیت ملیت ندارد، اما شرط اصلی سکونت در شهر وین و دارا بودن حداقل یک رابطه شغلی (Anstellung) در اتریش است. اتباع خارجی دارای اقامت قانونی و کار مجاز، واجد شرایط هستند.',
  },
  {
    q: 'WAFF تا چه مبلغی از شهریه دوره را پوشش می‌دهد؟',
    a: 'بسته به نوع دوره، میزان پوشش متفاوت است: برای دوره‌های کوتاه‌مدت تا ۱۰۰٪، برای دوره‌های بلندمدت معمولاً بین ۵۰٪ تا ۸۰٪ شهریه پرداخت می‌شود. سقف معمول سالانه هر نفر حدود ۳٬۰۰۰ یورو است.',
  },
  {
    q: 'آیا دوره‌های آنلاین هم مشمول فاند هستند؟',
    a: 'بله، به شرطی که مؤسسه ارائه‌دهنده در لیست مورد تأیید WAFF باشد و دوره به‌صورت رسمی دارای گواهی پایان معتبر باشد. دوره‌های آنلاین WIFI و BFI به‌طور معمول مورد قبول قرار می‌گیرند.',
  },
  {
    q: 'مدت زمان بررسی درخواست WAFF چقدر است؟',
    a: 'پس از ثبت کامل مدارک، بررسی و صدور Bescheid معمولاً بین ۳ تا ۶ هفته زمان می‌برد. در صورت نقص مدارک، این بازه طولانی‌تر می‌شود؛ پس بهتر است تمام مستندات را قبل از ثبت آماده کنید.',
  },
  {
    q: 'آیا می‌توان همزمان از چند دوره فاند گرفت؟',
    a: 'در یک بازه ۱۲ ماهه، امکان استفاده از فاند برای چند دوره وجود دارد، اما مجموع مبلغ پرداختی از سقف سالانه شما بیشتر نخواهد شد. برنامه‌ریزی برای اولویت‌بندی دوره‌های مهم‌تر توصیه می‌شود.',
  },
];

const WAFF_TABLE = [
  { type: 'دوره کوتاه‌مدت (تا ۳ ماه)', cover: 'تا ۱۰۰٪', note: 'معمولاً بدون سقف' },
  { type: 'دوره میان‌مدت (۳ تا ۶ ماه)', cover: '۶۰٪ - ۸۰٪', note: 'سقف ~۱٬۵۰۰ یورو' },
  { type: 'دوره بلندمدت (بیش از ۶ ماه)', cover: '۵۰٪ - ۷۰٪', note: 'سقف ~۳٬۰۰۰ یورو' },
  { type: 'آموزش تک‌جلسه یا ورکشاپ', cover: 'تا ۱۰۰٪', note: 'سقف ~۴۰۰ یورو' },
];

/* ============================================================
   کامپوننت اصلی
============================================================ */
const WifiBfiGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeProvider, setActiveProvider] = useState<'wifi' | 'bfi' | 'waff'>('wifi');

  /* ---------- Schema JSON-LD ---------- */
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'EducationalOrganization',
          name: 'WIFI Wien',
          alternateName: 'Wirtschaftsförderungsinstitut Wien',
          url: 'https://www.wifi.at',
          description:
            'بزرگ‌ترین مؤسسه آموزش حرفه‌ای اتریش وابسته به اتاق بازرگانی (WKO) با بیش از ۱۰۰۰ دوره فعال.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Wien',
            addressCountry: 'AT',
          },
        },
        {
          '@type': 'EducationalOrganization',
          name: 'BFI Wien',
          alternateName: 'Berufsförderungsinstitut Wien',
          url: 'https://www.bfi.wien',
          description:
            'مؤسسه آموزش حرفه‌ای وابسته به اتاق کارگران اتریش (AK) با تمرکز بر بازآموزی شغلی.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Wien',
            addressCountry: 'AT',
          },
        },
        {
          '@type': 'GovernmentOrganization',
          name: 'WAFF - Wiener ArbeitnehmerInnen Förderungsfonds',
          url: 'https://www.waff.at',
          description:
            'صندوق حمایت کارکنان شهر وین که تا ۱۰۰٪ شهریه دوره‌های آموزشی واجد شرایط را پرداخت می‌کند.',
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
          '@type': 'HowTo',
          name: 'نحوه دریافت فاند آموزشی WAFF برای دوره‌های WIFI و BFI',
          step: STEPS.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.t,
            text: s.d,
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://otrish-iran.ir' },
            { '@type': 'ListItem', position: 2, name: 'آموزش', item: 'https://otrish-iran.ir/education' },
            { '@type': 'ListItem', position: 3, name: 'WIFI و BFI' },
          ],
        },
      ],
    }),
    []
  );

  return (
    <>
      <SEO
        title="راهنمای کامل WIFI و BFI اتریش + فاند آموزشی WAFF | تا ۱۰۰٪ شهریه رایگان"
        description="راهنمای جامع دوره‌های WIFI و BFI اتریش و نحوه دریافت فاند آموزشی WAFF تا ۱۰۰٪ شهریه. شرایط، مدارک و مراحل ثبت‌نام برای فارسی‌زبانان مقیم وین."
        keywords="WIFI اتریش, BFI وین, WAFF فاند, آموزش رایگان اتریش, Bildungsförderung Wien, دوره فنی حرفه ای اتریش, فارسی زبانان وین, آموزش رایگان WAFF"
        schemaData={schema}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section
        dir="rtl"
        className="font-sans bg-gradient-to-b from-white via-blue-50/20 to-white py-10 md:py-16 space-y-12"
        id="wifi-bfi-guide"
      >
        {/* ==================== HERO ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[36px] border border-blue-200 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 md:p-12 space-y-5">
              <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-[10px] font-black px-3 py-1.5 border border-blue-100 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                WIFI · BFI · WAFF WIEN
              </span>

              <h1 className="font-black text-stone-900 text-2xl md:text-4xl leading-tight">
                <span className="text-[#c8102e]">تا ۱۰۰٪ شهریه‌ات را WAFF می‌پردازد</span> — آیا می‌دانید دوره‌های WIFI و BFI برای شما رایگان است؟
              </h1>

              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-bold">
                هر ساله صندوق <strong>WAFF</strong> شهر وین میلیون‌ها یورو برای آموزش حرفه‌ای کارکنان
                اختصاص می‌دهد؛ اما بسیاری از فارسی‌زبانان از این حق قانونی بی‌خبرند. با ثبت‌نام در دوره‌های
                <strong> WIFI</strong> یا <strong>BFI</strong>، می‌توانید شهریه خود را به‌طور کامل از
                شهرداری وین پس بگیرید. <span className="text-[#c8102e]">همین امروز مسیر رایگان شدن آموزشتان را شروع کنید.</span>
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: CheckCircle2, t: 'بدون محدودیت ملیت' },
                  { icon: Wallet, t: 'بدون بازپرداخت' },
                  { icon: ShieldCheck, t: 'مورد تأیید AK و WKO' },
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
                  href="https://www.waff.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  ورود به پورتال WAFF
                </a>
                <a
                  href="https://www.wifi.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-blue-300 text-stone-700 text-xs font-black px-5 py-3 rounded-2xl transition"
                >
                  <Building2 className="w-4 h-4" />
                  جست‌وجوی دوره در WIFI
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px]">
              <img
                src={IMG_HERO}
                alt="دانشجویان در کلاس آموزشی WIFI و BFI وین - دریافت فاند آموزشی WAFF اتریش"
                loading="lazy"
                width={1400}
                height={900}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/60 lg:to-white" />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-[10px] font-black text-stone-500 mb-0.5">سقف سالانه فاند WAFF</div>
                <div className="text-xl font-black text-[#c8102e]">۳٬۰۰۰ €</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==================== STATS BAR ==================== */}
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

        {/* ==================== معرفی سه نهاد ==================== */}
        <div>
          <div className="mb-5 text-center max-w-2xl mx-auto">
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Landmark className="w-5 h-5 text-[#c8102e]" />
              WIFI، BFI و WAFF — سه ضلع آموزش رایگان در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              تفاوت این سه نهاد کلیدی را بشناسید تا بهترین انتخاب را داشته باشید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {PROVIDERS.map((p) => {
              const isActive = activeProvider === p.id;
              return (
                <motion.button
                  key={p.id}
                  onClick={() => setActiveProvider(p.id as any)}
                  whileHover={{ y: -4 }}
                  className={`text-right rounded-3xl border-2 p-5 transition-all relative overflow-hidden ${
                    isActive
                      ? 'border-[#c8102e]/40 bg-white shadow-lg'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div
                    className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${p.color} opacity-[0.08] rounded-full`}
                  />
                  <div className="relative flex items-start gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center shrink-0 shadow-md`}
                    >
                      <span className="text-sm font-black">{p.short}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-stone-900">{p.name}</h3>
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`text-[10px] font-black ${p.text} hover:underline`}
                      >
                        {p.link.replace('https://', '')} ↗
                      </a>
                    </div>
                  </div>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed mb-3">
                    {p.desc}
                  </p>
                  <div className="relative flex flex-wrap gap-1.5">
                    {p.tags.map((t, i) => (
                      <span
                        key={i}
                        className={`text-[9px] font-black ${p.bg} ${p.text} px-2 py-1 rounded-full`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ==================== تصویر میانی + چرا WAFF؟ ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[300px]">
            <img
              src={IMG_WORKSHOP}
              alt="ورکشاپ آموزشی حرفه‌ای در وین - دوره‌های مورد تأیید WAFF برای فاند آموزشی"
              loading="lazy"
              width={1000}
              height={700}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 text-white">
              <div className="text-[10px] font-black opacity-80 mb-1">WAFF · WIEN</div>
              <div className="text-base font-black">سرمایه‌گذاری روی مهارت شما</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#c8102e]" />
              چرا WAFF بلیت طلایی شماست؟
            </h2>
            <p className="text-xs text-stone-600 font-bold leading-relaxed">
              WAFF (Wiener ArbeitnehmerInnen Förderungsfonds) یک صندوق حمایت از کارکنان است که توسط
              شهرداری وین و اتاق کارگران (AK Wien) تأمین می‌شود. این صندوق تا
              <strong> ۱۰۰٪ شهریه دوره‌های آموزشی</strong> شما را می‌پردازد — بدون اینکه لازم باشد مبلغ
              را بازگردانید. تنها شرط اصلی، سکونت در وین و داشتن رابطه شغلی فعال در اتریش است.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Wallet, t: 'بدون بازپرداخت', d: 'فاند بلاعوض و کاملاً رایگان.' },
                { icon: MapPin, t: 'فقط ساکنان وین', d: 'کافیست Hauptwohnsitz شما در وین ثبت باشد.' },
                { icon: Users, t: 'بدون محدودیت سنی', d: 'از ۱۸ سال تا هر سنی واجد شرایط هستید.' },
                { icon: Award, t: 'مدرک رسمی اتریش', d: 'گواهی‌نامه پایان دوره در کل اروپا معتبر است.' },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 flex items-start gap-3 hover:shadow-md transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-stone-900 mb-0.5">{b.t}</h4>
                    <p className="text-[10px] text-stone-500 font-bold leading-relaxed">{b.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== دسته‌بندی دوره‌ها ==================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#c8102e]" />
              محبوب‌ترین دسته‌های دوره‌ای برای فارسی‌زبانان
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              بیش از ۱۰۰۰ دوره فعال در ۶ حوزه تخصصی — انتخاب با شماست
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl border border-stone-200 p-5 hover:border-[#c8102e]/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition">
                    <c.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                    {c.n}
                  </span>
                </div>
                <h3 className="text-sm font-black text-stone-900 mb-1">{c.t}</h3>
                <p className="text-[11px] text-stone-500 font-bold leading-relaxed">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ==================== جدول پوشش WAFF ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 rounded-3xl p-6 md:p-8"
        >
          <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-600" />
                جدول پوشش شهریه توسط WAFF
              </h2>
              <p className="text-[11px] text-stone-600 font-bold mt-1">
                درصد پوشش بر اساس طول و نوع دوره — بروزرسانی ۱۴۰۴
              </p>
            </div>
            <span className="text-[10px] font-black bg-white text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200">
              WAFF Wien · 2025
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-emerald-100 bg-white">
            <table className="w-full text-right text-xs">
              <thead className="bg-emerald-50/70 text-emerald-900">
                <tr>
                  <th className="px-4 py-3 font-black">نوع دوره</th>
                  <th className="px-4 py-3 font-black">درصد پوشش</th>
                  <th className="px-4 py-3 font-black">توضیحات</th>
                </tr>
              </thead>
              <tbody>
                {WAFF_TABLE.map((r, i) => (
                  <tr key={i} className="border-t border-emerald-100 hover:bg-emerald-50/40 transition">
                    <td className="px-4 py-3 font-black text-stone-800">{r.type}</td>
                    <td className="px-4 py-3 font-black text-emerald-700">{r.cover}</td>
                    <td className="px-4 py-3 text-stone-600 font-bold">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ==================== مراحل HowTo ==================== */}
        <div>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <BadgeCheck className="w-5 h-5 text-[#c8102e]" />
              مسیر دریافت فاند آموزشی در ۵ گام
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از انتخاب دوره تا پرداخت کامل شهریه توسط WAFF
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {STEPS.map((s, i) => (
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
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="relative text-[12px] font-black text-stone-900 mb-1">{s.t}</h3>
                <p className="relative text-[10.5px] text-stone-500 font-bold leading-relaxed">
                  {s.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ==================== تصویر سوم + نکته ==================== */}
        <div className="relative rounded-3xl overflow-hidden min-h-[240px] md:min-h-[300px]">
          <img
            src={IMG_VIENNA_EDU}
            alt="فضای آموزشی مدرن WIFI Wien - دوره‌های مورد تأیید WAFF برای فارسی‌زبانان"
            loading="lazy"
            width={1000}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a1128]/90 via-[#0a1128]/65 to-transparent" />
          <div className="relative p-8 md:p-12 max-w-xl text-white">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full mb-4">
              <Star className="w-3.5 h-3.5 text-amber-300" />
              نکته مهم برای متقاضیان
            </span>
            <h3 className="text-xl md:text-2xl font-black mb-3 leading-snug">
              فاند را قبل از شروع دوره درخواست کنید
            </h3>
            <p className="text-xs md:text-sm text-stone-200 font-bold leading-relaxed">
              برای دریافت فاند WAFF، بهتر است درخواست خود را <strong>پیش از شروع دوره</strong> ثبت کنید.
              در حالت پرداخت پس از موفقیت، باید حتماً گواهی پایان دوره را ارائه دهید. دوره‌های با
              حضور فیزیکی و آنلاین هر دو مشمول هستند، اما دوره‌های زبان عمومی (غیر آکادمیک) معمولاً
              تأیید نمی‌شوند.
            </p>
          </div>
        </div>

        {/* ==================== FAQ ==================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره WIFI، BFI و WAFF
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های دقیق به پرتکرارترین پرسش‌های فارسی‌زبانان مقیم اتریش
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
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              همین امروز شروع کنید
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              مهارت جدید، شغل بهتر، شهریه رایگان
            </h2>
            <p className="text-sm text-stone-300 font-bold leading-relaxed">
              تیم اتریش‌نشین می‌تواند در انتخاب دوره مناسب، تکمیل مدارک WAFF و ثبت‌نام در WIFI یا BFI
              همراه شما باشد. برای مشاوره رایگان با ما تماس بگیرید.
            </p>
            <div className="flex gap-3 justify-center flex-wrap pt-1">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                مشاوره در واتس‌اپ
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-black text-xs px-6 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <GraduationCap className="w-4 h-4" />
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
              شرایط و درصد پوشش فاند WAFF ممکن است بسته به بودجه سالانه و نوع دوره تغییر کند. برای
              اطلاعات به‌روز، همیشه از پورتال رسمی <a href="https://www.waff.at" target="_blank" rel="noopener noreferrer" className="underline">waff.at</a> استفاده کنید.
              این راهنما جایگزین مشاوره رسمی WAFF نیست.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WifiBfiGuide;