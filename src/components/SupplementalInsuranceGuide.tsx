import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart, Sparkles, CheckCircle2, ChevronDown, HelpCircle,
  Calculator, Coins, ShieldCheck, ArrowLeft, Star, Stethoscope,
  Building2, Clock, Award, TrendingUp, AlertTriangle, BadgeCheck,
  Send, MessageCircle, Wallet, Percent, Users, Info, Zap,
  Eye, Baby, Activity, Pill, Syringe, Bed, Glasses, Microscope,
  Landmark, FileText, UserCheck, Sparkle, Crown
} from 'lucide-react';
import SEO from './SEO';
import { GuideContainer } from './GuideContainer';

/* ============================================================
   تصاویر ویژه — Unsplash (بهینه، رایگان، Lazy-load)
============================================================ */
const IMG_HERO =
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80';
// بیمارستان مدرن با اتاق‌های خصوصی
const IMG_DENTAL =
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80';
// مطب دندانپزشکی مدرن
const IMG_DOCTOR =
  'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1000&q=80';
// مشاوره پزشک متخصص

/* ============================================================
   آمار کلیدی
============================================================ */
const STATS = [
  { icon: Users, v: '۳۵٪', l: 'اتریشی‌ها بیمه تکمیلی دارند' },
  { icon: Coins, v: '۸۵-۱۵۰€', l: 'هزینه ماهانه تکمیلی' },
  { icon: Percent, v: '۱۵٪', l: 'پوشش دولتی ایمپلنت' },
  { icon: TrendingUp, v: '۷۰-۱۰۰٪', l: 'پوشش تکمیلی درمان' },
];

/* ============================================================
   سه نوع بیمه تکمیلی اصلی
============================================================ */
const INSURANCE_TYPES = [
  {
    id: 'spital',
    name: 'بیمه تکمیلی بیمارستانی',
    short: 'Spitalszusatz',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    price: '~۳۵-۷۰ €',
    desc: 'امکان انتخاب پزشک، اتاق خصوصی، زمان جراحی سریع‌تر در بیمارستان‌های خصوصی و دولتی.',
    features: [
      'اتاق تک‌نفره یا دو نفره',
      'انتخاب آزاد پزشک متخصص',
      'کوتاه شدن لیست انتظار جراحی',
      'دسترسی به Privatklinik',
    ],
    icon: Bed,
  },
  {
    id: 'zahn',
    name: 'بیمه تکمیلی دندانپزشکی',
    short: 'Zahnzusatz',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    price: '~۲۰-۴۵ €',
    desc: 'پوشش هزینه‌های سنگین دندانپزشکی: ایمپلنت، روکش، ارتودنسی و درمان ریشه.',
    features: [
      'پوشش ۷۰-۱۰۰٪ ایمپلنت',
      'ارتودنسی بزرگسالان و کودکان',
      'روکش، بریج، پروتز',
      'جرم‌گیری و جرم‌برداری',
    ],
    icon: Sparkle,
  },
  {
    id: 'ambulant',
    name: 'بیمه تکمیلی درمان سرپایی',
    short: 'Ambulant',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    price: '~۱۵-۳۵ €',
    desc: 'پوشش ویزیت پزشکان خصوصی، آزمایشگاه، تصویربرداری پیشرفته و پزشکان مکمل.',
    features: [
      'ویزیت پزشکان Wahlarzt',
      'MRI, CT, PET Scan',
      'طب سوزنی و هومیوپاتی',
      'روان‌درمانی و مشاوره',
    ],
    icon: Stethoscope,
  },
];

/* ============================================================
   ۸ خدمت پوشش‌داده‌شده توسط بیمه تکمیلی
============================================================ */
const COVERED_SERVICES = [
  { icon: Sparkle, t: 'ایمپلنت و کاشت دندان', d: 'پوشش ۷۰-۱۰۰٪ هزینه ایمپلنت که بیمه دولتی فقط ۱۵٪ می‌دهد.', weight: 'دندانپزشکی' },
  { icon: Glasses, t: 'عینک و لنز', d: 'هزینه عینک طبی، لنز تماسی و جراحی لیزیک چشم.', weight: 'چشم' },
  { icon: Baby, t: 'زایمان در بیمارستان خصوصی', d: 'تولد در اتاق خصوصی با پزشک منتخب خودتان.', weight: 'زنان' },
  { icon: Eye, t: 'جراحی لیزیک و آب مروارید', d: 'پوشش عمل‌های چشم که در بیمه دولتی محدود است.', weight: 'چشم' },
  { icon: Activity, t: 'فیزیوتراپی پیشرفته', d: 'جلسات بیشتر و تراپیست‌های منتخب بدون ارجاع پزشک.', weight: 'توان‌بخشی' },
  { icon: Pill, t: 'داروهای نوین و گران', d: 'داروهای خاص سرطان یا بیماری‌های نادر.', weight: 'دارو' },
  { icon: Microscope, t: 'چکاپ کامل سالانه', d: 'MRI و آزمایش‌های پیشرفته بدون انتظار طولانی.', weight: 'تشخیصی' },
  { icon: Syringe, t: 'واکسن‌های اختیاری', d: 'واکسن سفر، آنفلوآنزا، HPV و سایر موارد غیراجباری.', weight: 'پیشگیری' },
];

/* ============================================================
   مراحل انتخاب و خرید بیمه تکمیلی
============================================================ */
const STEPS = [
  {
    icon: FileText,
    t: 'تحلیل نیاز شخصی',
    d: 'بر اساس سن، وضعیت سلامت و سابقه خانوادگی، اولویت‌های شما مشخص می‌شود (دندان، چشم، بیمارستانی).',
  },
  {
    icon: Calculator,
    t: 'مقایسه شرکت‌ها',
    d: 'استفاده از سایت‌های مقایسه مثل durchblicker.at برای بررسی ۱۵+ شرکت بیمه اتریش.',
  },
  {
    icon: UserCheck,
    t: 'تکمیل Health Declaration',
    d: 'پاسخ دقیق به سوالات سلامت (Gesundheitsfragen) — دروغ یا کتمان، منجر به بطلان قرارداد می‌شود.',
  },
  {
    icon: Landmark,
    t: 'انتخاب فرانشیز (Selbstbehalt)',
    d: 'فرانشیز بالاتر = حق بیمه ماهانه کمتر. انتخاب بین ۰ تا ۵۰۰ یورو.',
  },
  {
    icon: BadgeCheck,
    t: 'فعال‌سازی و شروع پوشش',
    d: 'معمولاً ۱-۳ ماه انتظار برای شروع پوشش (Wartezeit) لازم است.',
  },
];

/* ============================================================
   مقایسه بیمه دولتی vs تکمیلی
============================================================ */
const COMPARISON = [
  { service: 'ویزیت پزشک عمومی (Hausarzt)', oegk: 'رایگان', zusatz: '—' },
  { service: 'ویزیت متخصص بدون ارجاع', oegk: 'محدود', zusatz: '۱۰۰٪ پوشش' },
  { service: 'اتاق خصوصی بیمارستان', oegk: '❌', zusatz: '✅' },
  { service: 'انتخاب آزاد پزشک جراح', oegk: '❌', zusatz: '✅' },
  { service: 'ایمپلنت دندانی', oegk: '~۱۵٪', zusatz: '۷۰-۱۰۰٪' },
  { service: 'ارتودنسی بزرگسالان', oegk: '❌', zusatz: '۵۰-۸۰٪' },
  { service: 'عینک و لنز', oegk: '~۲۰ €', zusatz: 'تا ۳۰۰ €' },
  { service: 'MRI و CT پیشرفته', oegk: 'با انتظار طولانی', zusatz: 'بدون انتظار' },
  { service: 'پزشکان Wahlarzt', oegk: 'پرداخت از جیب', zusatz: '۸۰٪ بازپرداخت' },
  { service: 'چکاپ کامل سالانه', oegk: 'پایه', zusatz: 'پیشرفته' },
];

/* ============================================================
   سوالات متداول
============================================================ */
const FAQS = [
  {
    q: 'بیمه تکمیلی (Zusatzversicherung) دقیقاً چیست و چه تفاوتی با بیمه دولتی دارد؟',
    a: 'بیمه دولتی اتریش (ÖGK) خدمات پایه درمانی را پوشش می‌دهد: ویزیت پزشک عمومی، بیمارستان دولتی، داروهای اساسی. اما مواردی مثل انتخاب پزشک جراح، اتاق خصوصی، ایمپلنت دندانی، عینک و درمان‌های مکمل را پوشش نمی‌دهد. بیمه تکمیلی (Zusatzversicherung) که توسط شرکت‌های خصوصی مثل UNIQA, Allianz, Merkur ارائه می‌شود، این شکاف‌ها را پر می‌کند.',
  },
  {
    q: 'هزینه ماهانه بیمه تکمیلی در اتریش چقدر است؟',
    a: 'بسته به سن، وضعیت سلامت و نوع پوشش، هزینه ماهانه بین ۳۰ تا ۲۰۰ یورو متغیر است. برای فرد ۳۰ ساله سالم: بیمارستانی حدود ۳۵-۷۰ €، دندانپزشکی ۲۰-۴۵ €، سرپایی ۱۵-۳۵ €. اگر همه را با هم بگیرید، معمولاً تخفیف پکیجی (Paket) دریافت می‌کنید.',
  },
  {
    q: 'آیا بیمه تکمیلی برای افراد بالای ۵۰ سال گران است؟',
    a: 'بله، هزینه بیمه تکمیلی با سن به‌طور تصاعدی افزایش می‌یابد. برای فرد ۵۰ ساله، حق بیمه می‌تواند ۲ تا ۳ برابر فرد ۳۰ ساله باشد. همچنین برخی شرکت‌ها برای سنین بالای ۶۰ ممکن است پذیرش را رد کنند یا موارد خاص (Ausschluss) اعمال کنند. بهترین زمان برای خرید، زیر ۴۰ سالگی است.',
  },
  {
    q: 'دوره انتظار (Wartezeit) چقدر طول می‌کشد؟',
    a: 'بسته به نوع خدمت متفاوت است: ویزیت پزشک و آزمایش‌ها معمولاً ۱ ماه، درمان‌های عمومی ۳ ماه، زایمان و دندانپزشکی ۸-۱۲ ماه، و برخی درمان‌های خاص مثل ایمپلنت تا ۲۴ ماه. در این دوره، هزینه خدمات شما پوشش داده نمی‌شود. توصیه می‌شود بیمه را قبل از نیاز واقعی خریداری کنید.',
  },
  {
    q: 'آیا بیمه تکمیلی برای بیماری‌های پیش از قرارداد (Vorerkrankungen) پوشش دارد؟',
    a: 'به‌طور معمول خیر. اگر بیماری قبلی داشته باشید، بیمه آن را از پوشش خارج می‌کند (Ausschlussklausel) یا با حق بیمه بالاتر می‌پذیرد. در فرم Health Declaration باید صداقت کامل داشته باشید؛ کتمان بیماری منجر به بطلان کل قرارداد در زمان استفاده می‌شود.',
  },
  {
    q: 'آیا اتباع خارجی هم می‌توانند بیمه تکمیلی بگیرند؟',
    a: 'بله، محدودیت ملیت وجود ندارد. اما داشتن بیمه دولتی اتریش (ÖGK) به‌عنوان پیش‌نیاز اصلی و اقامت قانونی لازم است. افرادی که از طریق کارفرما بیمه دولتی دارند، می‌توانند به‌راحتی بیمه تکمیلی هم اضافه کنند.',
  },
  {
    q: 'آیا می‌توان بیمه تکمیلی را لغو کرد یا تغییر داد؟',
    a: 'بله، معمولاً پس از ۱ سال قرارداد، با اعلام کتبی ۳ ماه قبل از پایان سال، قابل لغو است. تغییر شرکت نیز ممکن است اما معایب دارد: از دست دادن دوره Wartezeit و «سن ورود» (Eintrittsalter). برای افرادی که بیمه‌شان مدتی فعال بوده، نگه داشتن همان بیمه به‌صرفه‌تر است.',
  },
];

/* ============================================================
   کامپوننت اصلی
============================================================ */
const SupplementalInsuranceGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeType, setActiveType] = useState<string>('zahn');
  const [age, setAge] = useState<string>('35');
  const [familySize, setFamilySize] = useState<number>(1);

  /* ---------- ماشین‌حساب تخمینی ---------- */
  const savingsEstimate = useMemo(() => {
    const a = parseFloat(age);
    if (isNaN(a) || a < 18 || a > 80) return null;

    // تخمین هزینه ماهانه بر اساس سن
    let baseMonthly = 90;
    if (a < 30) baseMonthly = 70;
    else if (a < 40) baseMonthly = 90;
    else if (a < 50) baseMonthly = 130;
    else if (a < 60) baseMonthly = 180;
    else baseMonthly = 240;

    const monthlyPerPerson = baseMonthly;
    const totalMonthly = monthlyPerPerson * familySize;
    const yearlyPremium = totalMonthly * 12;

    // تخمین پس‌انداز سالانه از ایمپلنت و خدمات
    const potentialSavings = familySize * 1200; // تقریبی
    const netBenefit = potentialSavings - yearlyPremium;

    return {
      monthly: totalMonthly,
      yearly: yearlyPremium,
      savings: potentialSavings,
      net: netBenefit,
    };
  }, [age, familySize]);

  /* ---------- Schema JSON-LD ---------- */
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalBusiness',
          name: 'راهنمای بیمه تکمیلی درمانی اتریش',
          description:
            'راهنمای جامع بیمه تکمیلی (Zusatzversicherung) در اتریش شامل بیمارستانی، دندانپزشکی و درمان سرپایی.',
          areaServed: 'Austria',
          availableLanguage: ['fa', 'de', 'en'],
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
          name: 'نحوه انتخاب و خرید بیمه تکمیلی در اتریش',
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
            { '@type': 'ListItem', position: 2, name: 'بیمه', item: 'https://otrish-iran.ir/insurance' },
            { '@type': 'ListItem', position: 3, name: 'بیمه تکمیلی' },
          ],
        },
      ],
    }),
    []
  );

  return (
    <GuideContainer
      title="راهنمای بیمه تکمیلی اتریش"
      description="همه آنچه باید درباره Zusatzversicherung بدانید: از ایمپلنت دندان تا اتاق خصوصی بیمارستان — با ماشین‌حساب پس‌انداز و مقایسه بیمه دولتی و تکمیلی."
    >
      <SEO
        title="راهنمای کامل بیمه تکمیلی اتریش (Zusatzversicherung) ۲۰۲۵ | دندان، بیمارستان، Wahlarzt"
        description="راهنمای جامع بیمه تکمیلی درمانی در اتریش شامل بیمارستانی، دندانپزشکی، و درمان سرپایی. مقایسه با ÖGK، ماشین‌حساب پس‌انداز، هزینه‌ها و مراحل خرید."
        keywords="بیمه تکمیلی اتریش, Zusatzversicherung, بیمه دندانپزشکی اتریش, بیمه بیمارستانی وین, Wahlarzt بیمه, بیمه خصوصی اتریش, هزینه بیمه تکمیلی, UNIQA Allianz Merkur"
        schemaData={schema}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div
        dir="rtl"
        className="font-sans bg-gradient-to-b from-white via-blue-50/20 to-white py-8 space-y-12"
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
                <Crown className="w-3.5 h-3.5" />
                ZUSATZVERSICHERUNG · ÖGK · PRIVAT
              </span>

              <h1 className="font-black text-stone-900 text-2xl md:text-4xl leading-tight">
                <span className="text-[#c8102e]">۱۰٬۰۰۰ یورو هزینه ایمپلنت دندانی؟</span> بیمه دولتی فقط ۱۵٪ می‌دهد — بیمه تکمیلی تا ۱۰۰٪
              </h1>

              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-bold">
                بیمه دولتی اتریش (ÖGK) خدمات پایه را پوشش می‌دهد، اما برای <strong>ایمپلنت دندانی،
                اتاق خصوصی بیمارستان، انتخاب پزشک جراح و عینک طبی</strong> شما را تنها نمی‌گذارد.
                بیمه تکمیلی (Zusatzversicherung) این شکاف را پر می‌کند و دسترسی شما را به
                پزشکی مدرن تضمین می‌کند. <span className="text-[#c8102e]">در ۳ دقیقه بفهمید چه بیمه‌ای به‌صرفه شماست.</span>
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: CheckCircle2, t: 'بدون محدودیت ملیت' },
                  { icon: Wallet, t: 'از ۲۰ € ماهانه' },
                  { icon: ShieldCheck, t: 'بازپرداخت ۷۰-۱۰۰٪' },
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
                  href="#savings-calc"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  محاسبه پس‌انداز من
                </a>
                <a
                  href="https://www.durchblicker.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-blue-400 text-stone-700 text-xs font-black px-5 py-3 rounded-2xl transition"
                >
                  <Building2 className="w-4 h-4" />
                  مقایسه آنلاین بیمه‌ها
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px]">
              <img
                src={IMG_HERO}
                alt="بیمارستان مدرن در اتریش با اتاق‌های خصوصی - بیمه تکمیلی بیمارستانی Zusatzversicherung"
                loading="lazy"
                width={1400}
                height={900}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/60 lg:to-white" />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-[10px] font-black text-stone-500 mb-0.5">شکاف پوشش ÖGK برای دندان</div>
                <div className="text-xl font-black text-[#c8102e]">۸۵٪</div>
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

        {/* ==================== سه نوع بیمه تکمیلی ==================== */}
        <div>
          <div className="mb-5 text-center max-w-2xl mx-auto">
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#c8102e]" />
              ۳ نوع اصلی بیمه تکمیلی در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              هر کدام یک شکاف مشخص بیمه دولتی را پر می‌کند — می‌توانید ترکیبی از چند مورد را بگیرید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INSURANCE_TYPES.map((t) => {
              const isActive = activeType === t.id;
              const Icon = t.icon;
              return (
                <motion.button
                  key={t.id}
                  onClick={() => setActiveType(t.id)}
                  whileHover={{ y: -4 }}
                  className={`text-right rounded-3xl border-2 p-6 transition-all relative overflow-hidden ${
                    isActive
                      ? 'border-[#c8102e]/40 bg-white shadow-lg'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div
                    className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${t.color} opacity-[0.08] rounded-full`}
                  />
                  <div className="relative flex items-start gap-3 mb-3">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} text-white flex items-center justify-center shrink-0 shadow-md`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-stone-900 leading-snug">{t.name}</h3>
                      <span className={`text-[10px] font-black ${t.text}`}>{t.short}</span>
                    </div>
                  </div>

                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed mb-3">
                    {t.desc}
                  </p>

                  <div className={`relative inline-block text-[11px] font-black ${t.bg} ${t.text} px-3 py-1.5 rounded-full mb-3`}>
                    از {t.price} / ماه
                  </div>

                  <ul className="relative space-y-1.5">
                    {t.features.map((f, k) => (
                      <li
                        key={k}
                        className="flex items-center gap-1.5 text-[10.5px] font-bold text-stone-600"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ==================== ماشین‌حساب پس‌انداز ==================== */}
        <motion.div
          id="savings-calc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-emerald-50/40 border border-blue-200 rounded-3xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                ماشین‌حساب پس‌انداز سالانه
              </h2>
              <p className="text-xs text-stone-600 font-bold leading-relaxed">
                سن و تعداد اعضای خانواده خود را وارد کنید تا تخمینی از حق بیمه ماهانه و
                پس‌انداز بالقوه از خدمات درمانی را ببینید.
              </p>

              <div>
                <label className="block text-[10px] font-black text-stone-700 mb-1">
                  سن متقاضی اصلی:
                </label>
                <input
                  type="number"
                  min="18"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="مثلا: ۳۵"
                  className="w-full bg-white border border-stone-200 p-3 rounded-xl text-sm font-mono text-left outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-stone-700 mb-1">
                  تعداد افراد خانواده:
                </label>
                <select
                  value={familySize}
                  onChange={(e) => setFamilySize(Number(e.target.value))}
                  className="w-full bg-white border border-stone-200 p-3 rounded-xl text-xs outline-none cursor-pointer text-stone-800 focus:border-blue-500"
                >
                  <option value={1}>۱ نفر</option>
                  <option value={2}>۲ نفر</option>
                  <option value={3}>۳ نفر</option>
                  <option value={4}>۴ نفر یا بیشتر</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {savingsEstimate && (
                  <motion.div
                    key={`${age}-${familySize}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-2xl p-4 border-2 border-blue-200">
                        <div className="text-[10px] font-black text-stone-500 mb-1">
                          حق بیمه ماهانه (تخمینی)
                        </div>
                        <div className="text-2xl font-black text-blue-700" dir="ltr">
                          {savingsEstimate.monthly.toLocaleString('fa-IR')} €
                        </div>
                      </div>
                      <div className="bg-white rounded-2xl p-4 border-2 border-emerald-200">
                        <div className="text-[10px] font-black text-stone-500 mb-1">
                          پس‌انداز بالقوه سالانه
                        </div>
                        <div className="text-2xl font-black text-emerald-700" dir="ltr">
                          {savingsEstimate.savings.toLocaleString('fa-IR')} €
                        </div>
                      </div>
                    </div>

                    <div
                      className={`rounded-2xl p-4 border-2 ${
                        savingsEstimate.net > 0
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'bg-amber-50 border-amber-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {savingsEstimate.net > 0 ? (
                          <TrendingUp className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Info className="w-5 h-5 text-amber-600" />
                        )}
                        <span className="text-xs font-black text-stone-900">
                          {savingsEstimate.net > 0
                            ? 'صرفه اقتصادی مثبت'
                            : 'صرفه اقتصادی مشروط'}
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-stone-700 leading-relaxed">
                        {savingsEstimate.net > 0
                          ? `با استفاده از خدمات درمانی در طول سال، به‌طور تخمینی حدود ${Math.round(savingsEstimate.net).toLocaleString('fa-IR')} یورو صرفه‌جویی خالص خواهید داشت.`
                          : 'اگر در سال از خدمات کمتری استفاده کنید، ممکن است هزینه بیمه بیشتر از سود مستقیم باشد. اما ارزش اطمینان و آمادگی در شرایط اضطراری قابل اندازه‌گیری نیست.'}
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-stone-200">
                      <div className="text-[11px] font-black text-stone-700 mb-2">
                        یادآوری: این محاسبه صرفاً تخمینی است. برای برآورد دقیق از
                        پورتال‌های رسمی مثل{' '}
                        <a
                          href="https://www.durchblicker.at"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          durchblicker.at
                        </a>{' '}
                        استفاده کنید.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ==================== تصویر + خدمات پوشش‌داده‌شده ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[320px]">
            <img
              src={IMG_DENTAL}
              alt="مطب دندانپزشکی مدرن در اتریش - پوشش ایمپلنت و ارتودنسی با بیمه تکمیلی Zahnzusatz"
              loading="lazy"
              width={1000}
              height={700}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 text-white">
              <div className="text-[10px] font-black text-amber-300 mb-1">بیمه تکمیلی دندانپزشکی (Zahnzusatz)</div>
              <div className="text-base font-black">پوشش تا ۸۵٪ هزینه ایمپلنت</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-[#c8102e]" />
              ۸ خدمتی که بیمه دولتی پوشش نمی‌دهد (اما تکمیلی می‌دهد)
            </h2>
            <p className="text-xs text-stone-600 font-bold leading-relaxed">
              بیمه دولتی اتریش خدمات پایه را پوشش می‌دهد، اما این ۸ مورد جزء پرهزینه‌ترین شکاف‌ها هستند:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COVERED_SERVICES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl border border-stone-200 p-4 flex items-start gap-3 hover:shadow-md transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[11px] font-black text-stone-900">{s.t}</h4>
                        <span className="text-[9px] font-black bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                          {s.weight}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 font-bold leading-relaxed">{s.d}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==================== جدول مقایسه ÖGK vs تکمیلی ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-50 via-blue-50/40 to-emerald-50/40 border border-slate-200 rounded-3xl p-6 md:p-8"
        >
          <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#c8102e]" />
                مقایسه دقیق بیمه دولتی (ÖGK) و بیمه تکمیلی
              </h2>
              <p className="text-[11px] text-stone-600 font-bold mt-1">
                کدام خدمات در هر بیمه پوشش داده می‌شوند؟
              </p>
            </div>
            <span className="text-[10px] font-black bg-white text-blue-700 px-3 py-1.5 rounded-full border border-blue-200">
              بروزرسانی ۲۰۲۵
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100 text-slate-800">
                <tr>
                  <th className="px-4 py-3 font-black">خدمت پزشکی</th>
                  <th className="px-4 py-3 font-black">بیمه دولتی (ÖGK)</th>
                  <th className="px-4 py-3 font-black">بیمه تکمیلی</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((r, i) => (
                  <tr key={i} className="border-t border-slate-100 hover:bg-slate-50/60 transition">
                    <td className="px-4 py-3 font-black text-stone-800">{r.service}</td>
                    <td className="px-4 py-3 font-bold text-stone-600">{r.oegk}</td>
                    <td className="px-4 py-3 font-black text-emerald-700">{r.zusatz}</td>
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
              مسیر انتخاب و خرید بیمه تکمیلی در ۵ گام
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از تحلیل نیاز تا شروع پوشش — کمتر از ۲ هفته
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
            src={IMG_DOCTOR}
            alt="مشاوره پزشک متخصص در اتریش - اهمیت صداقت در Health Declaration برای بیمه تکمیلی"
            loading="lazy"
            width={1000}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a1128]/90 via-[#0a1128]/65 to-transparent" />
          <div className="relative p-8 md:p-12 max-w-xl text-white">
            <span className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/30 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full mb-4">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-300" />
              هشدار حقوقی
            </span>
            <h3 className="text-xl md:text-2xl font-black mb-3 leading-snug">
              دروغ در Health Declaration = بطلان کل قرارداد
            </h3>
            <p className="text-xs md:text-sm text-stone-200 font-bold leading-relaxed">
              یکی از رایج‌ترین اشتباهات مهاجران، مخفی کردن بیماری‌های قبلی در فرم سلامت است. بیمه‌ها
              هنگام بررسی ادعای خسارت، سوابق پزشکی شما را از طریق سیستم ÖGK استعلام می‌کنند.
              اگر تناقضی پیدا شود، <strong>کل قرارداد باطل و حق بیمه پرداختی بازگردانده نمی‌شود.</strong>{' '}
              صداقت کامل، ضامن امنیت شما در روز بحران است.
            </p>
          </div>
        </div>

        {/* ==================== FAQ ==================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره بیمه تکمیلی در اتریش
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
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              مشاوره رایگان بیمه
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              به کمک نیاز دارید؟ ما بیمه مناسب شما را پیدا می‌کنیم
            </h2>
            <p className="text-sm text-stone-300 font-bold leading-relaxed">
              تیم اتریش‌نشین می‌تواند در مقایسه بیمه‌های خصوصی، ترجمه اصطلاحات قرارداد و پر کردن
              فرم‌های آلمانی همراه شما باشد. برای مشاوره رایگان اولین قدم را بردارید.
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
              این راهنما بر اساس قوانین بیمه‌ای جاری اتریش (VAG 2016, ASVG) تهیه شده اما
              جایگزین مشاوره رسمی بیمه‌ای یا حقوقی نیست. شرایط دقیق هر بیمه‌نامه بسته به
              شرکت، سن و سابقه سلامت متفاوت است. همیشه شرایط عمومی بیمه (AGB) و
              استثنائات قرارداد خود را دقیق مطالعه کنید. برای اطلاعات رسمی:{' '}
              <a href="https://www.fma.gv.at" target="_blank" rel="noopener noreferrer" className="underline">
                fma.gv.at
              </a>
            </p>
          </div>
        </div>
      </div>
    </GuideContainer>
  );
};

export default SupplementalInsuranceGuide;