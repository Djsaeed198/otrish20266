import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText, Sparkles, CheckCircle2, ChevronDown, HelpCircle,
  Calculator, Coins, TrendingUp, AlertTriangle, BadgeCheck,
  Building2, Landmark, Clock, ShieldCheck, Send,
  MessageCircle, UserCheck, Briefcase, Laptop, CreditCard,
  Percent, Scale, Award, Info, Wallet, Calendar, Users,
  Star, Zap, FileCheck, Globe, Download, ArrowRight, ExternalLink
} from 'lucide-react';
import SEO from './SEO';

interface DeductionCategory {
  id: string;
  title: string;
  germanTitle: string;
  description: string;
  examples: string[];
  maxLimit?: string;
  icon: any;
}

const DEDUCTIONS: DeductionCategory[] = [
  {
    id: 'werbungskosten',
    title: 'هزینه‌های مرتبط با شغل',
    germanTitle: 'Werbungskosten',
    description: 'تمام هزینه‌هایی که شخصاً برای حفظ یا انجام کار خود متحمل شده‌اید و کارفرما پرداخت نکرده است.',
    examples: [
      'ابزار کار، لپ‌تاپ و تجهیزات کامپیوتری (Arbeitsmittel)',
      'دوره‌ها و کلاس‌های آموزشی و ارتقای مهارت (Fortbildungskosten)',
      'هزینه‌های اتاق کار خانگی بر اساس قوانین جدید (Homeoffice-Pauschale تا ۳۰۰ یورو)',
      'هزینه لباس کار تخصصی و ابزار ایمنی'
    ],
    maxLimit: 'حداقل ۱۳۲ یورو خودکار (Pauschale) یا مبالغ واقعی با فاکتور',
    icon: Laptop
  },
  {
    id: 'sonderausgaben',
    title: 'هزینه‌های ویژه و خیریه',
    germanTitle: 'Sonderausgaben',
    description: 'کمک‌های مالی به خیریه‌ها، مالیات کلیسا و برخی هزینه‌های بازسازی مسکن با استانداردهای بهره‌وری انرژی.',
    examples: [
      'کمک‌های خیریه به موسسات رسمی ثبت‌شده (Spenden) — ثبت خودکار با کد ملی',
      'مالیات کلیسایی قانونی (Kirchenbeitrag تا سقف ۶۰۰ یورو در سال)',
      'حق‌الوکاله یا هزینه‌های مشاوره مالیاتی رسمی (Steuerberatungskosten بدون سقف)'
    ],
    maxLimit: 'بر اساس نوع هزینه (معمولاً تا ۶۰۰ یورو برای کلیسا، بدون سقف برای مشاور)',
    icon: Landmark
  },
  {
    id: 'pendler',
    title: 'کمک‌هزینه ایاب و ذهاب',
    germanTitle: 'Pendlerpauschale & Pendlereuro',
    description: 'اگر فاصله محل سکونت تا محل کار بیش از ۲۰ کیلومتر باشد یا وسایل نقلیه عمومی غیرقابل استفاده باشند.',
    examples: [
      'پندلر کوچک (Kleines Pendlerpauschale): فاصله بیش از ۲۰ کیلومتر با امکان استفاده از حمل‌ونقل عمومی',
      'پندلر بزرگ (Großes Pendlerpauschale): حداقل ۲ کیلومتر فاصله با عدم امکان حمل‌ونقل عمومی',
      'یوروی ایاب و ذهاب (Pendlereuro): ۲ یورو کسر مستقیم به ازای هر کیلومتر رفت‌وبرگشت در سال'
    ],
    maxLimit: 'تا سقف ۳٬۶۷۲ یورو در سال کسر از درآمد مشمول مالیات',
    icon: Building2
  },
  {
    id: 'familie',
    title: 'پاداش و حمایت مالی از خانواده',
    germanTitle: 'Familienbonus Plus & Mehrkindzuschlag',
    description: 'تخفیف مستقیم از بدهی مالیاتی سالانه والدین شاغل به ازای هر فرزند دارای حق دریافت کمک‌هزینه Familienbeihilfe.',
    examples: [
      'فامیلی‌بنوس پلاس: تا ۲٬۰۰۰ یورو در سال به ازای هر فرزند زیر ۱۸ سال (کسر مستقیم از مالیات، نه درآمد)',
      'برای فرزندان بالای ۱۸ سال: تا ۷۰۰ یورو در سال در صورت دریافت فامیلی‌بایهیلفه',
      'کمک‌هزینه تک‌سرپرست / تک‌نان‌آور (Alleinverdiener- / Alleinerzieherabsetzbetrag)'
    ],
    maxLimit: 'تا ۲٬۰۰۰ یورو به ازای هر فرزند زیر ۱۸ سال به صورت کسر خالص از مالیات',
    icon: Users
  },
  {
    id: 'belastungen',
    title: 'هزینه‌های غیرمترقبه سنگین',
    germanTitle: 'Außergewöhnliche Belastungen',
    description: 'هزینه‌های سنگین درمانی، دندانپزشکی، عینک، معلولیت یا نگهداری از بستگان بیمار که تحت پوشش بیمه ÖGK نبوده است.',
    examples: [
      'هزینه‌های دندانپزشکی گران‌قیمت (ایمپلنت، ارتودنسی، پروتز)',
      'داروهای تجویزی پرهزینه، عینک طبی و سمعک',
      'هزینه‌های درمان ناباروری یا هزینه‌های آسایشگاه بستگان درجه یک'
    ],
    maxLimit: 'پس از کسر سهم خود شخص (Selbstbehalt بین ۶٪ تا ۱۲٪ درآمد سالانه)',
    icon: ShieldCheck
  }
];

const STEPS = [
  {
    step: '۱',
    title: 'ورود به پورتال FinanzOnline با ID Austria',
    description: 'وارد سایت finanzonline.bmf.gv.at شوید. بهترین و امن‌ترین روش ورود، استفاده از هویت دیجیتال ID Austria است. در غیر این صورت با نام کاربری، شناسه شرکت و پین ورودی می‌توانید لاگین کنید.'
  },
  {
    step: '۲',
    title: 'انتخاب گزینه اظهارنامه مالیاتی (Arbeitnehmerveranlagung)',
    description: 'از منوی فرم‌ها، گزینه Antrag auf Arbeitnehmerveranlagung (فرم L1) را برای سال مالی مورد نظر انتخاب کنید. کارفرمای شما موظف است Lohnzettel سال قبل را تا پایان فوریه در سیستم ثبت کند.'
  },
  {
    step: '۳',
    title: 'تکمیل بخش‌های کسر مالیاتی (Abschreibungen)',
    description: 'هزینه‌های واقعی سال شامل ابزار کار (Werbungskosten)، کمک‌هزینه فرزند (Familienbonus Plus)، ایاب‌وذهاب (Pendlerrechner) و هزینه‌های پزشکی فاکتوردار را در فیلدهای مربوطه وارد نمایید.'
  },
  {
    step: '۴',
    title: 'محاسبه پیش‌نمایش استرداد (Vorberechnung)',
    description: 'قبل از ارسال نهایی، دکمه Vorberechnung را بزنید. سیستم در چند ثانیه به شما نشان می‌دهد که دقیقاً چقدر پول از دولت طلبکار می‌شوید یا اگر کسری دارد هشدار می‌دهد.'
  },
  {
    step: '۵',
    title: 'ارسال نهایی و واریز پول به حساب بانکی IBAN',
    description: 'فرم را تایید و ارسال کنید. ظرف ۲ تا ۶ هفته، برگه مالیاتی رسمی (Bescheid) صادر شده و مبلغ اضافه مستقیماً به شماره شبا (IBAN) حساب بانکی اتریش شما واریز می‌شود.'
  }
];

const FAQS = [
  {
    q: 'تا چند سال قبل می‌توانم مالیات پرداخت‌شده را پس بگیرم؟',
    a: 'طبق قوانین اتریش، شما می‌توانید تا ۵ سال گذشته اظهارنامه ارزیابی مالیاتی کارمندان (Arbeitnehmerveranlagung) را به صورت عطف به ماسبق ثبت کنید. به عنوان مثال در سال ۲۰۲۶ می‌توانید برای سال‌های ۲۰۲۱، ۲۰۲۲، ۲۰۲۳، ۲۰۲۴ و ۲۰۲۵ درخواست بازپرداخت دهید.'
  },
  {
    q: 'آیا ثبت FinanzOnline برای کارمندان اجباری است یا اختیاری؟',
    a: 'برای اکثر کارمندان عادی (تک‌شغله بدون درآمد جانبی) کاملاً اختیاری (Antragsveranlagung) است و هدف آن فقط پس گرفتن پول اضافه است. اما اگر در یک سال دو کارفرمای همزمان داشته‌اید یا حقوق بیکاری AMS با حقوق کاری تداخل داشته، ارائه اظهارنامه اجباری (Pflichtveranlagung) تا پایان سپتامبر سال بعد است.'
  },
  {
    q: 'میانگین مبلغی که افراد از اداره مالیات اتریش پس می‌گیرند چقدر است؟',
    a: 'طبق گزارش رسمی وزارت دارایی اتریش (BMF)، میانگین بازپرداخت مالیات برای کسانی که اظهارنامه اختیاری پر می‌کنند حدود ۵۰۰ تا ۹۵۰ یورو برای هر سال مالی است. والدینی که دارای فرزند هستند این رقم به بالای ۲٬۰۰۰ یورو در سال نیز می‌رسد.'
  },
  {
    q: 'آیا فاکتورها و رسیدها را باید در سیستم آپلود کنیم؟',
    a: 'خیر! در زمان پر کردن فرم آنلاین هیچ نیازی به آپلود فاکتورها نیست؛ فقط باید جمع مبالغ را بنویسید. با این حال موظف هستید فاکتورها و رسیدها را تا ۷ سال در منزل یا فایل دیجیتال نگهداری کنید زیرا اداره مالیات ممکن است به صورت تصادفی از شما استعلام مدارک (Belegnachreichung) کند.'
  },
  {
    q: 'اگر سیستم بگوید باید مالیات اضافه پرداخت کنم (Nachzahlung) چه اتفاقی می‌افتد؟',
    a: 'اگر اظهارنامه شما اختیاری بوده باشد و سیستم پس از ارسال اعلام کند بدهکار شده‌اید، می‌توانید ظرف یک ماه از تاریخ ابلاغ برگه مالیاتی، درخواست انصراف و پس گرفتن فرم (Zurücknahme des Antrages) ثبت کنید تا هیچ بدهی پرداخت نکنید!'
  }
];

export default function TaxReturnGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [estIncome, setEstIncome] = useState<number>(32000);
  const [hasChildren, setHasChildren] = useState<boolean>(true);
  const [numChildren, setNumChildren] = useState<number>(1);
  const [hasHomeoffice, setHasHomeoffice] = useState<boolean>(true);
  const [workExpenses, setWorkExpenses] = useState<number>(450);

  // Quick Refund Estimation Math
  const estimatedRefund = useMemo(() => {
    let refund = 150; // base potential
    if (hasHomeoffice) refund += 120;
    if (workExpenses > 132) {
      refund += Math.min(800, (workExpenses - 132) * 0.32);
    }
    if (hasChildren && numChildren > 0) {
      refund += numChildren * 1800; // Familienbonus Plus
    }
    return Math.round(refund);
  }, [hasChildren, numChildren, hasHomeoffice, workExpenses]);

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'نحوه دریافت استرداد مالیاتی در اتریش با FinanzOnline',
      description: 'راهنمای گام‌به‌گام پس گرفتن مالیات کارمندان و شاغلین اتریش از طریق سامانه دولتی فینانس آنلاین (Arbeitnehmerveranlagung)',
      step: STEPS.map((s, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: s.title,
        text: s.description
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a
        }
      }))
    }
  ];

  return (
    <div className="space-y-10 font-sans" dir="rtl">
      <SEO
        title="راهنمای استرداد مالیاتی FinanzOnline اتریش ۲۰۲۶ | استرداد مالیات کارمندان"
        description="آموزش گام‌به‌گام پس گرفتن مالیات‌های پرداختی اضافه از طریق سیستم FinanzOnline و فرم L1 در اتریش. پاداش فرزند، هزینه‌های کاری و محاسبه‌گر تخمین استرداد."
        keywords="FinanzOnline, اظهارنامه مالیاتی اتریش, استرداد مالیات, Arbeitnehmerveranlagung, Steuerausgleich, مالیات حقوق اتریش, فرم L1, Familienbonus Plus"
        schemaData={schemaData}
      />

      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-7 md:p-10 text-white bg-gradient-to-br from-emerald-800 via-stone-900 to-emerald-950 border border-emerald-700/40 shadow-xl"
      >
        <div className="absolute -left-10 -bottom-10 text-[200px] opacity-5 pointer-events-none select-none font-mono font-black">
          €
        </div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-black backdrop-blur-md text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>پورتال رسمی وزارت دارایی اتریش (BMF) · قوانین ۲۰۲۶</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black leading-tight text-white">
            راهنمای اظهارنامه و استرداد مالیاتی اتریش
            <br />
            <span className="text-emerald-300 text-xl md:text-3xl font-extrabold">
              (FinanzOnline & Arbeitnehmerveranlagung)
            </span>
          </h1>

          <p className="text-sm md:text-base text-stone-200 leading-relaxed max-w-2xl font-medium">
            هر ساله هزاران یورو از مالیات کسرشده از حقوق کارمندان و شاغلین در اتریش اضافه و قابل استرداد است. با ثبت رایگان فرم L1 در پورتال <span className="text-amber-300 font-bold font-mono">FinanzOnline</span>، می‌توانید مبالغ اضافه پرداخت‌شده تا ۵ سال گذشته را مستقیماً به حساب بانکی خود بازگردانید.
          </p>

          <div className="flex items-center gap-4 pt-2 flex-wrap text-xs text-emerald-100 font-bold">
            <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-xl border border-white/10">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>مهلت ثبت: تا ۵ سال عطف به ماسبق</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-xl border border-white/10">
              <Coins className="w-4 h-4 text-amber-300" />
              <span>میانگین استرداد: ۵۰۰ تا ۱٬۸۰۰ یورو</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>ورود امن با شناسه ID Austria</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Calculator Widget */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-stone-900">
                شبیه‌ساز تخمین استرداد مالیات سالانه اتریش
              </h2>
              <p className="text-xs text-stone-500 font-semibold mt-0.5">
                تخمین تقریبی مبلغی که با ثبت فاکتورها و شرایط خود از اداره مالیات پس می‌گیرید
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-l from-emerald-600 to-teal-700 text-white p-4 px-6 rounded-2xl text-center self-stretch md:self-auto shrink-0 shadow-md shadow-emerald-600/20">
            <span className="text-[10px] text-emerald-100 font-bold block mb-0.5">
              تخمین تقریبی برگشت پول:
            </span>
            <span className="text-2xl md:text-3xl font-black font-mono tracking-tight">
              ~{estimatedRefund.toLocaleString('fa-IR')} €
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 flex justify-between">
              <span>درآمد ناخالص تقریبی سالانه:</span>
              <span className="font-mono text-emerald-700">{estIncome.toLocaleString()} €</span>
            </label>
            <input
              type="range"
              min="15000"
              max="90000"
              step="1000"
              value={estIncome}
              onChange={(e) => setEstIncome(Number(e.target.value))}
              className="w-full accent-emerald-650 h-2 bg-stone-100 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-stone-400 block">
              بر اساس حقوق ناخالص سالانه (مجموع ۱۲ ماه یا ۱۴ حقوق)
            </span>
          </div>

          <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
            <label className="text-xs font-bold text-stone-800 block">
              فرزندان زیر ۱۸ سال (Familienbonus Plus):
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-600">
                <input
                  type="checkbox"
                  checked={hasChildren}
                  onChange={(e) => setHasChildren(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>دارای فرزند تحت تکفل</span>
              </label>
              {hasChildren && (
                <select
                  value={numChildren}
                  onChange={(e) => setNumChildren(Number(e.target.value))}
                  className="text-xs p-1.5 px-3 rounded-lg border border-stone-300 bg-white font-bold"
                >
                  <option value={1}>۱ فرزند</option>
                  <option value={2}>۲ فرزند</option>
                  <option value={3}>۳ فرزند یا بیشتر</option>
                </select>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-bold block">
              تا ۲٬۰۰۰ یورو کسر مستقیم مالیات به ازای هر فرزند!
            </span>
          </div>

          <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
            <label className="text-xs font-bold text-stone-800 block">
              دورکاری و ابزارهای مرتبط با شغل:
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-600">
              <input
                type="checkbox"
                checked={hasHomeoffice}
                onChange={(e) => setHasHomeoffice(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span>روزهای دورکاری (Homeoffice-Pauschale)</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-stone-500">فاکتورهای کاری:</span>
              <input
                type="number"
                value={workExpenses}
                onChange={(e) => setWorkExpenses(Number(e.target.value))}
                className="w-24 text-xs font-mono font-bold p-1 px-2 border border-stone-300 rounded-lg text-left"
                placeholder="450"
              />
              <span className="text-xs font-mono">€</span>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Guide */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-stone-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>مراحل ۵‌گانه ثبت اظهارنامه مالیاتی در FinanzOnline</span>
          </h2>
          <a
            href="https://finanzonline.bmf.gv.at"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
          >
            <span>ورود مستقیم به FinanzOnline</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="bg-white border border-stone-200/90 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-300 transition-all shadow-xs"
            >
              <div>
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm mb-3">
                  {s.step}
                </span>
                <h3 className="font-black text-stone-900 text-sm mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deductible Categories Details */}
      <section className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-xl font-black text-stone-900">
            چه هزینه‌هایی در اتریش از مالیات کسر و پس داده می‌شوند؟
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-1">
            مهم‌ترین سرفصل‌های قانونی کسر از درآمد مشمول مالیات طبق کتابچه رسمی Steuerbuch اتریش
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DEDUCTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white border border-stone-200 rounded-3xl p-6 hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-stone-900 text-base leading-snug">
                        {item.title}
                      </h3>
                      <span className="font-mono text-xs font-bold text-emerald-700">
                        {item.germanTitle}
                      </span>
                    </div>
                  </div>
                  {item.maxLimit && (
                    <span className="text-[10px] font-black bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full text-left">
                      {item.maxLimit}
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-stone-100">
                  <span className="text-[11px] font-bold text-stone-800 block">
                    نمونه‌های قابل ثبت فاکتور:
                  </span>
                  <ul className="space-y-1 text-xs text-stone-600">
                    {item.examples.map((ex, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <h2 className="text-xl font-black text-stone-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <span>پرسش‌های متداول درباره FinanzOnline و استرداد مالیات</span>
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-1">
            پاسخ به رایج‌ترین ابهامات فارسی‌زبانان و مقیمان اتریش درباره برگشت مالیات
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-stone-200/80 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-right flex items-center justify-between gap-3 bg-stone-50/50 hover:bg-stone-50 transition-colors font-black text-stone-850 text-sm"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
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
                      <div className="p-4 pt-2 text-xs text-stone-600 font-medium leading-relaxed bg-white border-t border-stone-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Helpful Official Links */}
      <section className="bg-emerald-50 border border-emerald-200/70 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <h3 className="font-black text-emerald-950 text-base">
            نیاز به راهنمایی بیشتر در ثبت فینانس آنلاین دارید؟
          </h3>
          <p className="text-xs text-emerald-800 font-medium">
            می‌توانید کتابچه راهنمای رسمی مالیات وزارت دارایی اتریش (BMF Steuerbuch) را به رایگان مطالعه کنید.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://www.bmf.gv.at/services/publikationen/das-steuerbuch.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 px-5 rounded-2xl bg-white border border-emerald-300 text-emerald-850 text-xs font-black flex items-center gap-2 hover:bg-emerald-100 transition-colors"
          >
            <span>دانلود کتابچه مالیاتی BMF</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          </a>
        </div>
      </section>
    </div>
  );
}
