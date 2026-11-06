import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText, Sparkles, CheckCircle2, ChevronDown, HelpCircle,
  Calculator, Coins, TrendingUp, AlertTriangle, BadgeCheck,
  ArrowLeft, Building2, Landmark, Clock, ShieldCheck, Send,
  MessageCircle, UserCheck, Briefcase, Laptop, CreditCard,
  Percent, Scale, Award, Info, Wallet, Calendar, Users,
  Star, Zap, FileCheck, Globe, Landmark as BankIcon
} from 'lucide-react';
import SEO from './SEO';

/* ============================================================
   تصاویر ویژه — Unsplash (بهینه، رایگان، Lazy-load)
============================================================ */
const IMG_HERO =
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=80';
// اسناد مالی و ماشین‌حساب
const IMG_OFFICE =
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80';
// میز کار با لپ‌تاپ و اسناد
const IMG_VIENNA_TAX =
  'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1000&q=80';
// ساختمان اداری/مالی وین

/* ============================================================
   آمار کلیدی
============================================================ */
const STATS = [
  { icon: Users, v: '۶۰۰K+', l: 'فریلنسر فعال اتریش' },
  { icon: Clock, v: '۴-۸ هفته', l: 'مدت صدور Steuernummer' },
  { icon: Coins, v: '۰-۵۵٪', l: 'نرخ مالیات بر درآمد' },
  { icon: Percent, v: '۱۳٪', l: 'مالیات شرکتی (KÖSt)' },
];

/* ============================================================
   پله‌های مالیات بر درآمد اتریش (۲۰۲۴)
============================================================ */
const TAX_BRACKETS = [
  { from: 0, to: 11693, rate: 0, label: 'معاف از مالیات' },
  { from: 11693, to: 19134, rate: 20, label: 'پله اول' },
  { from: 19134, to: 32075, rate: 30, label: 'پله دوم' },
  { from: 32075, to: 62080, rate: 40, label: 'پله سوم' },
  { from: 62080, to: 93120, rate: 48, label: 'پله چهارم' },
  { from: 93120, to: 1000000, rate: 50, label: 'پله پنجم' },
  { from: 1000000, to: Infinity, rate: 55, label: 'پله ششم' },
];

/* ============================================================
   مدارک لازم برای ثبت‌نام
============================================================ */
const DOCUMENTS = [
  {
    icon: FileText,
    t: 'فرم F-Verfahren (Verf 1)',
    d: 'فرم اصلی ثبت‌نام مالیاتی که در پورتال FinanzOnline پر می‌شود.',
    required: true,
  },
  {
    icon: UserCheck,
    t: 'مدرک هویت و اقامت',
    d: 'پاسپورت، کارت اقامت (Aufenthaltstitel) و ثبت آدرس (Meldezettel).',
    required: true,
  },
  {
    icon: Briefcase,
    t: 'شرح فعالیت (Tätigkeitsbeschreibung)',
    d: 'توضیح دقیق نوع کار و خدمات فریلنسری که ارائه می‌دهید.',
    required: true,
  },
  {
    icon: Building2,
    t: 'آدرس کسب‌وکار',
    d: 'ثبت محل فعالیت — می‌تواند آدرس منزل باشد (Homeoffice).',
    required: true,
  },
  {
    icon: Landmark,
    t: 'شماره حساب بانکی (IBAN)',
    d: 'برای بازپرداخت مالیات یا واریز وجوه دولتی.',
    required: true,
  },
  {
    icon: FileCheck,
    t: 'مدرک تخصص (اختیاری)',
    d: 'مدارک تحصیلی یا گواهینامه‌های حرفه‌ای برای برخی مشاغل خاص.',
    required: false,
  },
];

/* ============================================================
   انواع ساختارهای قانونی کسب‌وکار
============================================================ */
const BUSINESS_TYPES = [
  {
    id: 'einzel',
    name: 'Einzelunternehmen',
    label: 'شرکت انفرادی',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    desc: 'رایج‌ترین فرم برای فریلنسرها. مسئولیت کامل شخصی، مالیات بر درآمد تصاعدی.',
    tax: 'مالیات تصاعدی ۰-۵۵٪',
    best: 'فریلنسر، مشاور، طراح',
  },
  {
    id: 'gmbh',
    name: 'GmbH',
    label: 'شرکت با مسئولیت محدود',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    desc: 'شخصیت حقوقی مستقل، مسئولیت محدود به سرمایه. نیاز به حداقل سرمایه ۳۵٬۰۰۰ یورو.',
    tax: 'مالیات شرکتی ۲۳-۲۵٪',
    best: 'استارتاپ، کسب‌وکار متوسط',
  },
  {
    id: 'og',
    name: 'OG (KG)',
    label: 'شرکت تضامنی',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    desc: 'مناسب برای ۲ تا ۵ شریک. مسئولیت مشترک، ثبت رسمی الزامی.',
    tax: 'مالیات تصاعدی شرکا',
    best: 'کسب‌وکار خانوادگی، شراکتی',
  },
  {
    id: 'newself',
    name: 'Neue Selbständige',
    label: 'خوداشتغال جدید',
    color: 'from-purple-500 to-fuchsia-600',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    desc: 'برای فعالیت‌های آموزشی، هنری، مشاوره‌ای و رسانه‌ای. ثبت در SVS.',
    tax: 'مالیات تصاعدی + SVS',
    best: 'مدرس، مربی، هنرمند، نویسنده',
  },
];

/* ============================================================
   مراحل ثبت‌نام مالیاتی
============================================================ */
const STEPS = [
  {
    icon: Laptop,
    t: 'دسترسی به FinanzOnline',
    d: 'ثبت‌نام آنلاین در پورتال رسمی FinanzOnline. برای این کار به Bürgerkarte یا Handysignatur نیاز است.',
  },
  {
    icon: FileText,
    t: 'تکمیل فرم F-Verfahren',
    d: 'پر کردن فرم Verf 1 با اطلاعات دقیق کسب‌وکار، نوع فعالیت و تاریخ شروع.',
  },
  {
    icon: Wallet,
    t: 'ارسال و انتظار',
    d: 'پس از ارسال، اداره مالیات (Finanzamt) بین ۴ تا ۸ هفته بررسی می‌کند.',
  },
  {
    icon: BadgeCheck,
    t: 'دریافت Steuernummer',
    d: 'شماره مالیاتی (Steuernummer) به آدرس شما ارسال می‌شود — معمولاً با Bescheid رسمی.',
  },
  {
    icon: Calculator,
    t: 'شروع گزارش‌دهی مالیاتی',
    d: 'از این پس باید اظهارنامه سالانه (Einkommensteuererklärung) ارائه دهید.',
  },
];

/* ============================================================
   سوالات متداول
============================================================ */
const FAQS = [
  {
    q: 'Steuernummer (کد مالیاتی) چیست و چه تفاوتی با UID دارد؟',
    a: 'Steuernummer یک شماره یکتای ۷ رقمی است که اداره مالیات اتریش (Finanzamt) به هر کسب‌وکار یا فرد خوداشتغال اختصاص می‌دهد و برای تمام تعاملات مالیاتی داخلی استفاده می‌شود. UID (Umsatzsteuer-Identifikationsnummer) یک شماره ۹ رقمی اروپایی (با پیشوند ATU) است که تنها در صورتی صادر می‌شود که کسب‌وکار شما معاملات بین‌المللی یا بالای ۴۵٬۰۰۰ یورو گردش سالانه داشته باشد.',
  },
  {
    q: 'چه زمانی باید برای Steuernummer اقدام کنم؟',
    a: 'به محض شروع فعالیت خوداشتغالی، باید ظرف یک ماه در FinanzOnline ثبت‌نام کنید. حتی اگر هنوز درآمدی کسب نکرده‌اید، شروع فعالیت باید اعلام شود. تأخیر در ثبت‌نام می‌تواند منجر به جریمه‌های تا ۱۰٪ از درآمد تخمینی یا بازداشت حساب بانکی شود.',
  },
  {
    q: 'حداقل گردش سالانه برای معافیت از مالیات چقدر است؟',
    a: 'در اتریش، درآمد سالانه تا ۱۱٬۶۹۳ یورو برای افراد معاف از مالیات بر درآمد است. تا ۳۵٬۰۰۰ یورو گردش سالانه، می‌توانید از طرح Kleinstunternehmer استفاده کنید که اجازه می‌دهد بدون پرداخت مالیات بر ارزش افزوده (USt) فعالیت کنید.',
  },
  {
    q: 'آیا برای فریلنسری در اتریش به مجوز خاصی نیاز است؟',
    a: 'بستگی به نوع فعالیت دارد. مشاغل «آزاد» (freie Gewerbe) مانند نویسندگی، ترجمه، طراحی گرافیک و مشاوره IT نیازی به مجوز ندارند. اما مشاغل «مقید» (reglementierte Gewerbe) مانند وکالت، پزشکی و مشاوره مالی نیازمند مجوز رسمی از اتاق بازرگانی (WKO) هستند.',
  },
  {
    q: 'مالیات بر درآمد اتریش چگونه محاسبه می‌شود؟',
    a: 'مالیات بر درآمد (Einkommensteuer) به‌صورت تصاعدی محاسبه می‌شود: تا ۱۱٬۶۹۳ یورو معاف، سپس به‌ترتیب ۲۰٪، ۳۰٪، ۴۰٪، ۴۸٪، ۵۰٪ و ۵۵٪ در پله‌های بالاتر. اما نکته مهم این است که فقط درآمد مازاد هر پله با نرخ آن پله مالیات‌بندی می‌شود، نه تمام درآمد.',
  },
  {
    q: 'آیا می‌توانم هزینه‌های کار را از مالیات کسر کنم؟',
    a: 'بله. تمام هزینه‌های مرتبط با کسب‌وکار (Betriebsausgaben) قابل کسر هستند: اجاره دفتر، اینترنت، لپ‌تاپ، نرم‌افزار، هزینه سفر، بیمه و حتی بخشی از اجاره منزل در صورت استفاده از Homeoffice. نگه داشتن فاکتور برای همه این هزینه‌ها الزامی است.',
  },
  {
    q: 'اگر مالیات پرداخت نکنم چه اتفاقی می‌افتد؟',
    a: 'در صورت عدم پرداخت مالیات یا تأخیر، اداره مالیات اتریش این اقدامات را انجام می‌دهد: ۱) جریمه تأخیر (Säumniszuschlag) حدود ۲٪، ۲) جریمه تخمین (Schätzungszuschlag) تا ۱۰٪، ۳) بازداشت حساب بانکی (Kontenpfändung)، ۴) در موارد شدید، پیگرد کیفری و مجازات حبس. توصیه می‌شود حتی در شرایط سخت مالی، با اداره مالیات مذاکره کنید.',
  },
];

/* ============================================================
   ماشین‌حساب مالیات
============================================================ */
function calcTax(income: number): { total: number; effective: number; brackets: { rate: number; taxable: number; tax: number }[] } {
  let remaining = income;
  let total = 0;
  const breakdown: { rate: number; taxable: number; tax: number }[] = [];

  for (const b of TAX_BRACKETS) {
    if (remaining <= 0) break;
    const range = b.to === Infinity ? remaining : b.to - b.from;
    const taxable = Math.min(remaining, range);
    const tax = (taxable * b.rate) / 100;
    if (taxable > 0) {
      breakdown.push({ rate: b.rate, taxable, tax });
      total += tax;
    }
    remaining -= taxable;
  }

  return {
    total,
    effective: income > 0 ? (total / income) * 100 : 0,
    brackets: breakdown,
  };
}

/* ============================================================
   کامپوننت اصلی
============================================================ */
const TaxRegistrationGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeType, setActiveType] = useState<string>('einzel');
  const [income, setIncome] = useState<string>('45000');

  const taxResult = useMemo(() => {
    const inc = parseFloat(income);
    if (isNaN(inc) || inc <= 0) return null;
    return { income: inc, ...calcTax(inc) };
  }, [income]);

  /* ---------- Schema JSON-LD ---------- */
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          name: 'نحوه ثبت‌نام مالیاتی (Steuernummer) در اتریش برای فریلنسرها',
          description:
            'راهنمای گام‌به‌گام ثبت‌نام مالیاتی در اتریش از طریق پورتال FinanzOnline و دریافت Steuernummer.',
          totalTime: 'P60D',
          estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: '0' },
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
          '@type': 'GovernmentService',
          name: 'FinanzOnline — پورتال رسمی مالیاتی اتریش',
          url: 'https://finanzonline.bmf.gv.at',
          serviceType: 'Tax Registration',
          provider: {
            '@type': 'GovernmentOrganization',
            name: 'Bundesministerium für Finanzen (BMF)',
            url: 'https://www.bmf.gv.at',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Wien',
              addressCountry: 'AT',
            },
          },
          areaServed: 'Austria',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://otrish-iran.ir' },
            { '@type': 'ListItem', position: 2, name: 'مالیات', item: 'https://otrish-iran.ir/tax' },
            { '@type': 'ListItem', position: 3, name: 'Steuernummer' },
          ],
        },
      ],
    }),
    []
  );

  return (
    <>
      <SEO
        title="راهنمای ثبت‌نام مالیاتی Steuernummer اتریش | FinanzOnline برای فریلنسرها"
        description="راهنمای کامل ثبت‌نام مالیاتی در اتریش (Steuernummer) از طریق FinanzOnline. مدارک، مراحل، نرخ مالیات، ساختارهای کسب‌وکار و ماشین‌حساب مالیات برای فارسی‌زبانان."
        keywords="Steuernummer اتریش, ثبت نام مالیاتی اتریش, FinanzOnline, مالیات فریلنسر اتریش, UID اتریش, مالیات خوداشتغال اتریش, Einzelunternehmen, Neue Selbständige"
        schemaData={schema}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section
        dir="rtl"
        className="font-sans bg-gradient-to-b from-white via-emerald-50/20 to-white py-10 md:py-16 space-y-12"
        id="tax-registration-guide"
      >
        {/* ==================== HERO ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[36px] border border-emerald-200 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 md:p-12 space-y-5">
              <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1.5 border border-emerald-100 rounded-full">
                <FileText className="w-3.5 h-3.5" />
                FINANZONLINE · BMF AUSTRIA
              </span>

              <h1 className="font-black text-stone-900 text-2xl md:text-4xl leading-tight">
                <span className="text-[#c8102e]">اگر Steuernummer نگیری، جریمه تا ۱۰٪ + بازداشت حساب</span> — راهنمای ثبت‌نام مالیاتی اتریش
              </h1>

              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-bold">
                شروع کار فریلنسری در اتریش بدون <strong>Steuernummer</strong> غیرقانونی است. اداره
                مالیات اتریش (Finanzamt) به‌طور خودکار فعالیت‌های ثبت‌نشده را شناسایی می‌کند و
                جریمه‌های سنگین اعمال می‌کند. <span className="text-[#c8102e]">در این راهنمای جامع، مسیر ثبت‌نام در FinanzOnline را در ۵ گام یاد می‌گیرید.</span>
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: CheckCircle2, t: 'رایگان و آنلاین' },
                  { icon: Clock, t: '۴ تا ۸ هفته' },
                  { icon: ShieldCheck, t: 'پورتال رسمی دولتی' },
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
                  href="#tax-calc"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  محاسبه مالیات تخمینی
                </a>
                <a
                  href="https://finanzonline.bmf.gv.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-emerald-400 text-stone-700 text-xs font-black px-5 py-3 rounded-2xl transition"
                >
                  <Globe className="w-4 h-4" />
                  ورود به FinanzOnline
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px]">
              <img
                src={IMG_HERO}
                alt="ماشین‌حساب و اسناد مالی برای ثبت‌نام Steuernummer در اتریش - FinanzOnline"
                loading="lazy"
                width={1400}
                height={900}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/60 lg:to-white" />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-[10px] font-black text-stone-500 mb-0.5">معافیت سالانه</div>
                <div className="text-xl font-black text-emerald-600">۱۱٬۶۹۳ €</div>
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

        {/* ==================== انتخاب نوع کسب‌وکار ==================== */}
        <div>
          <div className="mb-5 text-center max-w-2xl mx-auto">
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Briefcase className="w-5 h-5 text-[#c8102e]" />
              ساختار کسب‌وکار خود را انتخاب کنید
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              ۴ فرم اصلی قانونی در اتریش — هرکدام قوانین مالیاتی متفاوتی دارند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {BUSINESS_TYPES.map((b) => {
              const isActive = activeType === b.id;
              return (
                <motion.button
                  key={b.id}
                  onClick={() => setActiveType(b.id)}
                  whileHover={{ y: -4 }}
                  className={`text-right rounded-3xl border-2 p-5 transition-all relative overflow-hidden ${
                    isActive
                      ? 'border-emerald-400/60 bg-white shadow-lg'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div
                    className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${b.color} opacity-[0.08] rounded-full`}
                  />
                  <div className="relative flex items-start gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${b.color} text-white flex items-center justify-center shrink-0 shadow-md`}
                    >
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-stone-900">{b.label}</h3>
                      <span className={`text-[10px] font-black ${b.text}`}>{b.name}</span>
                    </div>
                  </div>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed mb-3">
                    {b.desc}
                  </p>
                  <div className="relative flex flex-col gap-1.5">
                    <div className={`text-[10px] font-black ${b.bg} ${b.text} px-2.5 py-1 rounded-full inline-block`}>
                      {b.tax}
                    </div>
                    <div className="text-[10px] font-bold text-stone-500">
                      مناسب برای: {b.best}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ==================== ماشین‌حساب مالیات ==================== */}
        <motion.div
          id="tax-calc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-blue-50/40 border border-emerald-200 rounded-3xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-600" />
                ماشین‌حساب مالیات بر درآمد ۲۰۲۴
              </h2>
              <p className="text-xs text-stone-600 font-bold leading-relaxed">
                درآمد سالانه خود را وارد کنید تا مالیات تخمینی و نرخ مؤثر مالیاتی را محاسبه کنید.
              </p>

              <label className="block text-[10px] font-black text-stone-700">
                درآمد سالانه (یورو):
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="45000"
                  className="w-full bg-white border border-stone-200 p-3 pr-10 rounded-xl text-sm font-mono text-left outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-400">
                  €
                </span>
              </div>
              <p className="text-[10px] text-stone-400 font-bold leading-relaxed">
                توجه: این محاسبه ساده‌شده است و مواردی مانند SVS، هزینه‌های کسب‌وکار و
                تخفیف‌های مالیاتی را لحاظ نمی‌کند.
              </p>
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {taxResult && (
                  <motion.div
                    key={taxResult.income}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-2xl p-4 border-2 border-emerald-200">
                        <div className="text-[10px] font-black text-stone-500 mb-1">
                          مالیات سالانه تخمینی
                        </div>
                        <div
                          className="text-2xl font-black text-emerald-700"
                          dir="ltr"
                        >
                          {Math.round(taxResult.total).toLocaleString('fa-IR')} €
                        </div>
                      </div>
                      <div className="bg-white rounded-2xl p-4 border-2 border-blue-200">
                        <div className="text-[10px] font-black text-stone-500 mb-1">
                          نرخ مؤثر مالیاتی
                        </div>
                        <div className="text-2xl font-black text-blue-700" dir="ltr">
                          {taxResult.effective.toFixed(1)}٪
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-stone-200">
                      <div className="text-[11px] font-black text-stone-700 mb-3">
                        تفکیک پله‌های مالیاتی:
                      </div>
                      <div className="space-y-2">
                        {taxResult.brackets.map((b, i) => (
                          <div key={i} className="flex items-center gap-3 text-[10.5px] font-bold">
                            <span className="w-12 text-stone-500">{b.rate}٪</span>
                            <div className="flex-1 bg-stone-100 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full transition-all"
                                style={{
                                  width: `${Math.min(100, (b.tax / taxResult.total) * 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-stone-700 font-black min-w-[80px] text-left" dir="ltr">
                              {Math.round(b.tax).toLocaleString('fa-IR')} €
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ==================== تصویر + مدارک ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[320px]">
            <img
              src={IMG_OFFICE}
              alt="میز کار فریلنسر با لپ‌تاپ و اسناد مالیاتی - ثبت نام Steuernummer اتریش"
              loading="lazy"
              width={1000}
              height={700}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 text-white">
              <div className="text-[10px] font-black opacity-80 mb-1">FINANZONLINE · 2024</div>
              <div className="text-base font-black">ثبت‌نام ۱۰۰٪ آنلاین</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#c8102e]" />
              مدارک لازم برای ثبت‌نام Steuernummer
            </h2>
            <p className="text-xs text-stone-600 font-bold leading-relaxed">
              آماده‌سازی این مدارک قبل از شروع، فرآیند ثبت‌نام را به کمتر از ۳۰ دقیقه کاهش می‌دهد:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DOCUMENTS.map((d, i) => {
                const Icon = d.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl border border-stone-200 p-4 flex items-start gap-3 hover:shadow-md transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-[11px] font-black text-stone-900">{d.t}</h4>
                        {d.required ? (
                          <span className="text-[8px] font-black bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded-full">
                            الزامی
                          </span>
                        ) : (
                          <span className="text-[8px] font-black bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-full">
                            اختیاری
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-stone-500 font-bold leading-relaxed">
                        {d.d}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==================== جدول پله‌های مالیاتی ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-50 via-blue-50/40 to-emerald-50/40 border border-slate-200 rounded-3xl p-6 md:p-8"
        >
          <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Percent className="w-5 h-5 text-[#c8102e]" />
                پله‌های مالیات بر درآمد اتریش (۲۰۲۴)
              </h2>
              <p className="text-[11px] text-stone-600 font-bold mt-1">
                سیستم مالیات تصاعدی اتریش — نرخ مؤثر همیشه کمتر از نرخ نهایی است
              </p>
            </div>
            <span className="text-[10px] font-black bg-white text-blue-700 px-3 py-1.5 rounded-full border border-blue-200">
              §33 EStG · 2024
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100 text-slate-800">
                <tr>
                  <th className="px-4 py-3 font-black">پله</th>
                  <th className="px-4 py-3 font-black">بازه درآمد (€)</th>
                  <th className="px-4 py-3 font-black">نرخ مالیات</th>
                  <th className="px-4 py-3 font-black">توضیحات</th>
                </tr>
              </thead>
              <tbody>
                {TAX_BRACKETS.map((b, i) => (
                  <tr key={i} className="border-t border-slate-100 hover:bg-slate-50/60 transition">
                    <td className="px-4 py-3 font-black text-stone-800">{i + 1}</td>
                    <td className="px-4 py-3 text-stone-600 font-bold" dir="ltr">
                      {b.from.toLocaleString('fa-IR')} — {b.to === Infinity ? '∞' : b.to.toLocaleString('fa-IR')}
                    </td>
                    <td className="px-4 py-3 font-black text-emerald-700">{b.rate}٪</td>
                    <td className="px-4 py-3 text-stone-600 font-bold">{b.label}</td>
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
              مسیر دریافت Steuernummer در ۵ گام
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از FinanzOnline تا اظهارنامه اولین سال مالیاتی
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
            src={IMG_VIENNA_TAX}
            alt="ساختمان اداره مالیات اتریش در وین - BMF Finanzamt Österreich"
            loading="lazy"
            width={1000}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a1128]/90 via-[#0a1128]/65 to-transparent" />
          <div className="relative p-8 md:p-12 max-w-xl text-white">
            <span className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/30 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full mb-4">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-300" />
              هشدار جدی
            </span>
            <h3 className="text-xl md:text-2xl font-black mb-3 leading-snug">
              عدم ثبت‌نام مالیاتی در اتریش جرم مالی است
            </h3>
            <p className="text-xs md:text-sm text-stone-200 font-bold leading-relaxed">
              اداره مالیات اتریش با سیستم‌های هوشمند، حساب‌های بانکی و درآمدهای ثبت‌نشده را
              ردیابی می‌کند. در صورت کشف فعالیت مالی ثبت‌نشده، جریمه‌های سنگین تا ۱۰٪ درآمد
              + بازداشت حساب اعمال می‌شود. حتی اگر درآمد شما پایین باشد، ثبت‌نام قانونی
              ضروری است. <strong>پیشگیری همیشه ارزان‌تر از درمان است.</strong>
            </p>
          </div>
        </div>

        {/* ==================== FAQ ==================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره Steuernummer
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ دقیق به پرتکرارترین پرسش‌های فارسی‌زبانان فریلنسر مقیم اتریش
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
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              کمک برای ثبت‌نام مالیاتی
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              نمی‌دانید از کجا شروع کنید؟ ما کنار شما هستیم
            </h2>
            <p className="text-sm text-stone-300 font-bold leading-relaxed">
              تیم اتریش‌نشین می‌تواند در پر کردن فرم F-Verfahren، انتخاب ساختار مناسب کسب‌وکار
              و ارتباط با Finanzamt همراه شما باشد. برای مشاوره رایگان اولین قدم را بردارید.
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
              این راهنما بر اساس قوانین مالیاتی جاری اتریش (§33 EStG, FinanzOnline) تهیه شده،
              اما جایگزین مشاوره رسمی مالیاتی (Steuerberater) یا مقامات ذی‌صلاح نیست. برای
              پرونده خاص خود، همیشه با یک مشاور مالیاتی مجاز یا پورتال رسمی{' '}
              <a href="https://www.bmf.gv.at" target="_blank" rel="noopener noreferrer" className="underline">
                bmf.gv.at
              </a>{' '}
              مشورت کنید.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TaxRegistrationGuide;