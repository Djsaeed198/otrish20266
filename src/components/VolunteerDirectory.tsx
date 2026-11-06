import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart, Sparkles, Users, HandHeart, CheckCircle2, ChevronDown,
  HelpCircle, MapPin, Clock, Award, ShieldCheck, ArrowLeft, Star,
  GraduationCap, Stethoscope, Home, Languages, Leaf, Briefcase,
  AlertTriangle, BadgeCheck, Handshake, TrendingUp, Quote,
  Send, MessageCircle, Target, Zap, Coffee, Building2
} from 'lucide-react';
import SEO from './SEO';

/* ============================================================
   تصاویر ویژه — Unsplash (بهینه، رایگان، Lazy-load)
============================================================ */
const IMG_HERO =
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1400&q=80';
// داوطلبان در حال کمک به یکدیگر
const IMG_TEAM =
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80';
// کار تیمی داوطلبان
const IMG_HELP =
  'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1000&q=80';
// دست‌های کمک‌کننده و همدلی

/* ============================================================
   آمار اثرگذاری
============================================================ */
const STATS = [
  { icon: Users, v: '۱٬۲۰۰+', l: 'داوطلب فعال' },
  { icon: HandHeart, v: '۸۵+', l: 'خیریه همکار' },
  { icon: Clock, v: '۲۵K+', l: 'ساعت خدمت ماهانه' },
  { icon: Heart, v: '۳٬۵۰۰+', l: 'خانواده بهره‌مند' },
];

/* ============================================================
   دسته‌بندی فرصت‌ها
============================================================ */
const CATEGORIES = [
  { id: 'all', name: 'همه فرصت‌ها', icon: Sparkles, color: 'from-stone-500 to-stone-700' },
  { id: 'education', name: 'آموزش و تدریس', icon: GraduationCap, color: 'from-blue-500 to-indigo-600' },
  { id: 'health', name: 'سلامت و روان', icon: Stethoscope, color: 'from-emerald-500 to-teal-600' },
  { id: 'shelter', name: 'اسکان و مسکن', icon: Home, color: 'from-amber-500 to-orange-600' },
  { id: 'language', name: 'ترجمه و زبان', icon: Languages, color: 'from-purple-500 to-fuchsia-600' },
  { id: 'environment', name: 'محیط زیست', icon: Leaf, color: 'from-green-500 to-emerald-600' },
];

/* ============================================================
   فرصت‌های داوطلبانه
============================================================ */
const OPPORTUNITIES = [
  {
    id: 1,
    cat: 'education',
    title: 'تدریس رایگان ریاضی به دانش‌آموزان',
    org: 'کانون آموزشی مهر وین',
    location: 'وین، Favoriten',
    time: '۲ ساعت / هفته',
    tags: ['آنلاین', 'حضوری', 'دانش‌آموز'],
    urgent: true,
    desc: 'کمک به دانش‌آموزان فارسی‌زبان دوره متوسطه برای تقویت پایه ریاضی.',
  },
  {
    id: 2,
    cat: 'language',
    title: 'مترجم داوطلب فارسی-آلمانی',
    org: 'خانه ایرانیان وین',
    location: 'وین، Landstraße',
    time: 'انعطاف‌پذیر',
    tags: ['مترجمی', 'مدارک اداری', 'حضوری'],
    urgent: false,
    desc: 'همراهی فارسی‌زبانان تازه‌وارد در پر کردن فرم‌های اداری و مکاتبات.',
  },
  {
    id: 3,
    cat: 'shelter',
    title: 'میزبانی موقت از خانواده‌های تازه‌وارد',
    org: 'شبکه همدلی اتریش',
    location: 'سراسر اتریش',
    time: '۱ تا ۲ هفته',
    tags: ['اسکان موقت', 'خانواده', 'همدلی'],
    urgent: true,
    desc: 'در اختیار قرار دادن اتاق خالی برای خانواده‌های در حال جست‌وجوی مسکن.',
  },
  {
    id: 4,
    cat: 'health',
    title: 'مشاوره روان‌شناسی داوطلبانه',
    org: 'انجمن سلامت روان پارسیان',
    location: 'آنلاین',
    time: '۲ ساعت / هفته',
    tags: ['روان‌شناسی', 'آنلاین', 'فارغ‌التحصیل'],
    urgent: false,
    desc: 'ارائه جلسات مشاوره رایگان به فارسی‌زبانان با نیاز روانی حاد.',
  },
  {
    id: 5,
    cat: 'environment',
    title: 'پاکسازی پارک‌ها و محلات وین',
    org: 'گروه سبز وین',
    location: 'وین، Prater',
    time: 'یک‌بار در ماه',
    tags: ['محیط زیست', 'خانوادگی', 'ورزشی'],
    urgent: false,
    desc: 'کمک به نظافت فصلی پارک‌های عمومی با حضور داوطلبان و خانواده‌ها.',
  },
  {
    id: 6,
    cat: 'education',
    title: 'آموزش مهارت کامپیوتر به سالمندان',
    org: 'مرکز سالمندان پارسی',
    location: 'وین، Margareten',
    time: '۳ ساعت / هفته',
    tags: ['IT پایه', 'سالمندان', 'حضوری'],
    urgent: false,
    desc: 'آموزش کار با موبایل، ایمیل و برنامه‌های ضروری به بزرگسالان.',
  },
  {
    id: 7,
    cat: 'language',
    title: 'همراهی در امور اداری (Begleitung)',
    org: 'داوطلبان همراه امید',
    location: 'وین، سراسر شهر',
    time: 'انعطاف‌پذیر',
    tags: ['همراهی', 'MA 35', 'AMS'],
    urgent: true,
    desc: 'همراهی متقاضیان در مراجعه به ادارات و کمک به مکالمه آلمانی.',
  },
  {
    id: 8,
    cat: 'health',
    title: 'کمک به بانک غذا (Wiener Tafel)',
    org: 'Wiener Tafel اتریش',
    location: 'وین، Simmering',
    time: '۴ ساعت / هفته',
    tags: ['بانک غذا', 'فیزیکی', 'جمعی'],
    urgent: true,
    desc: 'جمع‌آوری، بسته‌بندی و توزیع مواد غذایی بین خانواده‌های نیازمند.',
  },
];

/* ============================================================
   ۵ گام داوطلب شدن
============================================================ */
const STEPS = [
  {
    icon: Target,
    t: 'کشف علاقه‌مندی',
    d: 'بررسی کنید که کدام زمینه (آموزش، سلامت، ترجمه، محیط زیست) با تخصص و زمان شما هم‌خوانی دارد.',
  },
  {
    icon: Building2,
    t: 'انتخاب سازمان داوطلب',
    d: 'از میان ۸۵ خیریه همکار، سازمانی را انتخاب کنید که مأموریتش با ارزش‌های شما هم‌راستا است.',
  },
  {
    icon: BadgeCheck,
    t: 'ثبت‌نام و احراز هویت',
    d: 'تکمیل فرم آنلاین و ارائه مدارک هویتی و اقامتی معتبر برای عضویت در تیم داوطلبان.',
  },
  {
    icon: Coffee,
    t: 'جلسه آشنایی (Onboarding)',
    d: 'شرکت در یک جلسه کوتاه آشنایی با تیم، قوانین و محیط فعالیت — معمولاً ۳۰ دقیقه‌ای.',
  },
  {
    icon: HandHeart,
    t: 'شروع فعالیت داوطلبانه',
    d: 'با هماهنگی تیم، فعالیت داوطلبانه‌ات را شروع کن و هر ماه اثرگذاری‌ات را ببین.',
  },
];

/* ============================================================
   داستان موفقیت
============================================================ */
const STORIES = [
  {
    name: 'مریم، ۳۴ ساله',
    role: 'داوطلب تدریس ریاضی',
    text: 'سه ساعت در هفته به سه دانش‌آموز درس می‌دهم. یکی از آن‌ها امسال در امتحان Matura قبول شد و این بزرگ‌ترین هدیه‌ای است که تا حالا گرفته‌ام.',
    icon: GraduationCap,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'علی، ۲۸ ساله',
    role: 'مترجم داوطلب',
    text: 'برای یک خانواده تازه‌وارد، پر کردن فرم MA 35 را در یک روز تمام کردیم. حسی که آن مادر داشت، ارزش تمام وقت من را داشت.',
    icon: Languages,
    color: 'from-purple-500 to-fuchsia-600',
  },
  {
    name: 'سارا، ۴۱ ساله',
    role: 'داوطلب بانک غذا',
    text: 'هر شنبه با تیم Wiener Tafel حدود ۲۰۰ بسته غذایی آماده می‌کنیم. حس تعلق به یک هدف بزرگ را هیچ‌جا تجربه نکرده بودم.',
    icon: Heart,
    color: 'from-rose-500 to-red-600',
  },
];

/* ============================================================
   سوالات متداول
============================================================ */
const FAQS = [
  {
    q: 'آیا داوطلب شدن در اتریش نیاز به اجازه رسمی دارد؟',
    a: 'خیر. برای فعالیت داوطلبانه در سازمان‌های مردم‌نهاد (NGO) مجوز خاصی لازم نیست. فقط باید دارای اقامت قانونی در اتریش و در برخی موارد گواهی عدم سوءپیشینه (Strafregisterbescheinigung) باشید. این گواهی از اداره پلیس به‌سادگی دریافت می‌شود.',
  },
  {
    q: 'آیا داوطلب شدن به رزومه شغلی کمک می‌کند؟',
    a: 'بله، به شدت. کارفرمایان اتریشی به تجربه داوطلبانه به‌عنوان نشانه مسئولیت‌پذیری، کار تیمی و تعهد اجتماعی نگاه می‌کنند. بسیاری از مدارس، دانشگاه‌ها و شرکت‌ها این تجربه را در ارزیابی رزومه مثبت لحاظ می‌کنند.',
  },
  {
    q: 'حداقل زمان مورد نیاز برای فعالیت داوطلبانه چقدر است؟',
    a: 'معمولاً بین ۲ تا ۴ ساعت در هفته یا یک‌بار در ماه. برخی فرصت‌ها انعطاف‌پذیر هستند و برخی نیازمند حضور منظم. هنگام انتخاب فرصت، به برچسب «انعطاف‌پذیر» یا «منظم» توجه کنید.',
  },
  {
    q: 'آیا برای خدمات داوطلبانه هزینه یا حقوقی پرداخت می‌شود؟',
    a: 'خدمات داوطلبانه به‌طور معمول بدون حقوق است، اما اکثر سازمان‌ها هزینه‌های رفت‌وآمد و بعضاً وعده غذایی را پوشش می‌دهند. برخی فرصت‌ها با مدرک معتبر بین‌المللی (مثل Zertifikat) همراه هستند که در رزومه ارزشمند است.',
  },
  {
    q: 'چطور می‌توانم مطمئن شوم خیریه معتبری است؟',
    a: 'سه معیار کلیدی: ۱) ثبت رسمی در سامانه Vereinsregister اتریش، ۲) گزارش شفاف مالی سالانه، ۳) حضور در لیست تأییدشده اتریش‌نشین. تمام ۸۵ خیریه معرفی‌شده در این پلتفرم بر اساس این معیارها بررسی شده‌اند.',
  },
  {
    q: 'آیا برای داوطلب شدن باید آلمانی بلد باشم؟',
    a: 'بستگی به نوع فرصت دارد. فرصت‌های مترجمی، همراهی در ادارات و داوطلبانی که با جامعه فارسی‌زبان کار می‌کنند، معمولاً نیازی به آلمانی پیشرفته ندارند. اما برای فرصت‌های مرتبط با سالمندان اتریشی یا خدمات عمومی، سطح B1 به بالا توصیه می‌شود.',
  },
];

/* ============================================================
   مزایای داوطلب شدن
============================================================ */
const BENEFITS = [
  {
    icon: Heart,
    t: 'اثرگذاری واقعی',
    d: 'مستقیم و ملموس روی زندگی انسان‌ها اثر می‌گذارید.',
    color: 'from-rose-500 to-red-600',
  },
  {
    icon: TrendingUp,
    t: 'رشد مهارت‌های نرم',
    d: 'تقویت رهبری، ارتباط، حل مسئله و کار تیمی.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Users,
    t: 'شبکه‌سازی اجتماعی',
    d: 'آشنایی با افراد هم‌فکر و تیم‌های بین‌المللی.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Award,
    t: 'گواهی معتبر',
    d: 'مدرک Zertifikat برای رزومه و درخواست‌های شغلی.',
    color: 'from-emerald-500 to-green-600',
  },
];

/* ============================================================
   کامپوننت اصلی
============================================================ */
const VolunteerDirectory: React.FC = () => {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filtered = useMemo(
    () =>
      activeCat === 'all'
        ? OPPORTUNITIES
        : OPPORTUNITIES.filter((o) => o.cat === activeCat),
    [activeCat]
  );

  /* ---------- Schema JSON-LD ---------- */
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'NGO',
          name: 'اتریش‌نشین — کانون داوطلبان و نیکوکاری',
          alternateName: 'Otrish Neshin Volunteer Network',
          url: 'https://otrish-iran.ir',
          description:
            'بزرگ‌ترین شبکه مستقل داوطلبان و خیریه‌های فارسی‌زبان مقیم اتریش با ۸۵ سازمان همکار و ۱٬۲۰۰+ داوطلب فعال.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Wien',
            addressCountry: 'AT',
          },
          areaServed: 'Austria',
          knowsLanguage: ['fa', 'de', 'en'],
        },
        {
          '@type': 'ItemList',
          name: 'فرصت‌های داوطلبانه فعال در اتریش',
          numberOfItems: OPPORTUNITIES.length,
          itemListElement: OPPORTUNITIES.map((o, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'VolunteerAction',
              name: o.title,
              description: o.desc,
              location: { '@type': 'Place', name: o.location },
              organizer: { '@type': 'Organization', name: o.org },
            },
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
          '@type': 'HowTo',
          name: 'چگونه در اتریش داوطلب شویم',
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
            { '@type': 'ListItem', position: 2, name: 'جامعه', item: 'https://otrish-iran.ir/community' },
            { '@type': 'ListItem', position: 3, name: 'داوطلبان و نیکوکاری' },
          ],
        },
      ],
    }),
    []
  );

  return (
    <>
      <SEO
        title="داوطلب شدن در اتریش | ۸۵ فرصت داوطلبانه و خیریه برای فارسی‌زبانان"
        description="دایرکتوری جامع فرصت‌های داوطلبانه و خیریه در وین و اتریش. تدریس، ترجمه، سلامت، اسکان و محیط زیست — با راهنمای ثبت‌نام و شرایط داوطلب شدن."
        keywords="داوطلب شدن اتریش, کار خیریه وین, volunteer Austria, فرصت داوطلبانه وین, خیریه فارسی زبانان, NGO اتریش, Ehrenamt Wien"
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
        id="volunteer-directory"
      >
        {/* ==================== HERO ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[36px] border border-rose-200 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 md:p-12 space-y-5">
              <span className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 text-[10px] font-black px-3 py-1.5 border border-rose-100 rounded-full">
                <Heart className="w-3.5 h-3.5" />
                VOLUNTEER · EHRENAMT · WIEN
              </span>

              <h1 className="font-black text-stone-900 text-2xl md:text-4xl leading-tight">
                <span className="text-[#c8102e]">۳ ساعت از هفته‌ات</span> می‌تواند زندگی یک انسان را برای همیشه تغییر دهد
              </h1>

              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-bold">
                در وین، بیش از <strong>۸۵ سازمان خیریه و مردم‌نهاد</strong> به دنبال داوطلبان فارسی‌زبان
                هستند. از تدریس ریاضی و ترجمه مدارک تا کمک به بانک غذا و همراهی در ادارات — فرصت‌های
                داوطلبانه در انتظار مهارت و قلب شماست. <span className="text-[#c8102e]">همین امروز اولین قدم را بردارید.</span>
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: CheckCircle2, t: 'بدون نیاز به مجوز' },
                  { icon: Clock, t: 'ساعت انعطاف‌پذیر' },
                  { icon: Award, t: 'گواهی معتبر' },
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
                  href="#volunteer-list"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  دیدن فرصت‌های فعال
                </a>
                <a
                  href="https://wa.me/436889763256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-rose-300 text-stone-700 text-xs font-black px-5 py-3 rounded-2xl transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  مشاوره رایگان
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px]">
              <img
                src={IMG_HERO}
                alt="داوطلبان فارسی‌زبان در حال کمک به جامعه ایرانیان وین - فرصت‌های داوطلبانه و خیریه اتریش"
                loading="lazy"
                width={1400}
                height={900}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/60 lg:to-white" />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-[10px] font-black text-stone-500 mb-0.5">اثر متوسط ماهانه</div>
                <div className="text-xl font-black text-[#c8102e]">۳٬۵۰۰+ خانواده</div>
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

        {/* ==================== مزایا ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[300px]">
            <img
              src={IMG_TEAM}
              alt="کار تیمی داوطلبان در پروژه‌های خیریه وین - شبکه همدلی اتریش‌نشین"
              loading="lazy"
              width={1000}
              height={700}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 text-white">
              <div className="text-[10px] font-black opacity-80 mb-1">TOGETHER · WIEN</div>
              <div className="text-base font-black">تغییر با هم اتفاق می‌افتد</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HandHeart className="w-5 h-5 text-[#c8102e]" />
              چرا داوطلب شدن در اتریش ارزشمند است؟
            </h2>
            <p className="text-xs text-stone-600 font-bold leading-relaxed">
              داوطلب شدن فقط یک کار نیک نیست — یک سرمایه‌گذاری روی خودتان، جامعه‌تان و آینده‌تان در اتریش
              است. مطالعات دانشگاه وین نشان می‌دهد داوطلبان <strong>٪۳۸ سریع‌تر</strong> شغل مناسب پیدا
              می‌کنند و رضایت از زندگی بالاتری دارند.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 flex items-start gap-3 hover:shadow-md transition"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.color} text-white flex items-center justify-center shrink-0`}
                  >
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

        {/* ==================== دایرکتوری فرصت‌ها ==================== */}
        <div id="volunteer-list">
          <div className="mb-5 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c8102e]" />
                فرصت‌های داوطلبانه فعال
              </h2>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                {filtered.length} فرصت در دسته «{CATEGORIES.find((c) => c.id === activeCat)?.name}»
              </p>
            </div>
            <span className="text-[10px] font-black text-[#c8102e] bg-rose-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              بروزرسانی هفتگی
            </span>
          </div>

          {/* فیلتر دسته‌بندی */}
          <div className="flex flex-wrap gap-2 mb-5">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const isActive = activeCat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCat(c.id)}
                  className={`inline-flex items-center gap-2 text-[11px] font-black px-3.5 py-2 rounded-full transition-all ${
                    isActive
                      ? `bg-gradient-to-br ${c.color} text-white shadow-md scale-105`
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {c.name}
                </button>
              );
            })}
          </div>

          {/* گرید فرصت‌ها */}
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((o, i) => (
                <motion.article
                  key={o.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="relative bg-white rounded-3xl border border-stone-200 p-5 overflow-hidden group hover:shadow-lg hover:border-[#c8102e]/30 transition-all"
                >
                  {o.urgent && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-sm inline-flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-current" />
                      فوری
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center">
                      <HandHeart className="w-4.5 h-4.5" />
                    </span>
                    <span className="text-[10px] font-black text-stone-500">{o.org}</span>
                  </div>

                  <h3 className="text-sm font-black text-stone-900 mb-2 leading-snug min-h-[40px]">
                    {o.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-bold leading-relaxed mb-3 min-h-[48px]">
                    {o.desc}
                  </p>

                  <div className="space-y-1.5 mb-3 text-[10px] font-bold text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#c8102e]" />
                      {o.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#c8102e]" />
                      {o.time}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {o.tags.map((t, k) => (
                      <span
                        key={k}
                        className="text-[9px] font-black bg-stone-100 text-stone-600 px-2 py-1 rounded-full"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <a
                    href="https://wa.me/436889763256"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-[11px] font-black py-2.5 px-4 rounded-2xl hover:scale-[1.02] transition-all"
                  >
                    ثبت درخواست داوطلبی
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </a>
                </motion.article>
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* ==================== مراحل داوطلب شدن ==================== */}
        <div>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <BadgeCheck className="w-5 h-5 text-[#c8102e]" />
              مسیر داوطلب شدن در ۵ گام ساده
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از انتخاب علاقه‌مندی تا اولین روز فعالیت — کمتر از ۲ هفته
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

        {/* ==================== داستان‌های موفقیت ==================== */}
        <div>
          <div className="mb-5 text-center max-w-2xl mx-auto">
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Quote className="w-5 h-5 text-[#c8102e]" />
              صدای داوطلبان ما
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              روایت‌های واقعی از فارسی‌زبانانی که مسیر داوطلبی را انتخاب کردند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STORIES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="relative bg-white rounded-3xl border border-stone-200 p-6 overflow-hidden"
                >
                  <div
                    className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${s.color} opacity-[0.08] rounded-full`}
                  />
                  <div className="relative flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-stone-900">{s.name}</div>
                      <div className="text-[10px] font-bold text-stone-500">{s.role}</div>
                    </div>
                  </div>
                  <p className="relative text-[11px] text-stone-600 font-bold leading-relaxed">
                    <Quote className="w-4 h-4 text-stone-300 inline-block ml-1 -mt-1" />
                    {s.text}
                  </p>
                  <div className="mt-3 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className="w-3 h-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==================== تصویر سوم + نکته ==================== */}
        <div className="relative rounded-3xl overflow-hidden min-h-[240px] md:min-h-[300px]">
          <img
            src={IMG_HELP}
            alt="دست‌های کمک‌کننده داوطلبان در پروژه‌های عام‌المنفعه و خیریه وین"
            loading="lazy"
            width={1000}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a1128]/90 via-[#0a1128]/65 to-transparent" />
          <div className="relative p-8 md:p-12 max-w-xl text-white">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              اعتماد و امنیت
            </span>
            <h3 className="text-xl md:text-2xl font-black mb-3 leading-snug">
              همه خیریه‌های معرفی‌شده، مورد بررسی قرار گرفته‌اند
            </h3>
            <p className="text-xs md:text-sm text-stone-200 font-bold leading-relaxed">
              تیم اتریش‌نشین قبل از درج هر سازمان در این دایرکتوری، سه معیار را بررسی می‌کند:
              ثبت رسمی در <strong>Vereinsregister</strong>، شفافیت مالی سالانه و رضایت داوطلبان فعلی.
              هدف ما، حفاظت از وقت و اعتماد شماست.
            </p>
          </div>
        </div>

        {/* ==================== FAQ ==================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره داوطلبی در اتریش
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
          <div className="absolute top-0 left-10 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              عضویت در شبکه داوطلبان
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              امروز قلب‌ات را به کار بگیر، فردا تفاوت را ببین
            </h2>
            <p className="text-sm text-stone-300 font-bold leading-relaxed">
              به بیش از ۱٬۲۰۰ داوطلب فارسی‌زبان در اتریش بپیوند. تیم اتریش‌نشین در انتخاب فرصت
              مناسب، تکمیل فرم و ارتباط با خیریه‌ها در کنارتان است.
            </p>
            <div className="flex gap-3 justify-center flex-wrap pt-1">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                داوطلب شدن در واتس‌اپ
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-black text-xs px-6 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <Send className="w-4 h-4" />
                کانال تلگرام داوطلبان
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
              اتریش‌نشین یک پلتفرم مستقل و غیرانتفاعی است و هیچ وابستگی به سازمان یا حزب سیاسی ندارد.
              تمام فرصت‌های نمایش‌داده‌شده بر اساس بررسی مستقل انتخاب شده‌اند، اما مسئولیت نهایی
              همکاری با هر خیریه بر عهده کاربر است.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default VolunteerDirectory;