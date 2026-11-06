import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GuideContainer } from '../GuideContainer';
import {
  Briefcase,
  GraduationCap,
  Wallet,
  BadgeCheck,
  Crown,
  Rocket,
  FileCheck,
  CheckCircle2,
  Clock,
  Euro,
  Gauge,
  X,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

/* ============================================================
   Types
   ============================================================ */
type Difficulty = 'آسان' | 'متوسط' | 'چالشی';

interface Visa {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
  duration: string;
  cost: string;
  difficulty: Difficulty;
  requirements: string[];
  highlights: string[];
  color: {
    bg: string;
    text: string;
    border: string;
    ring: string;
  };
}

/* ============================================================
   Data — ۶ مسیر مهاجرتی اصلی
   ============================================================ */
const VISAS: Visa[] = [
  {
    id: 'work',
    title: 'ویزای کار متخصصین',
    category: 'کاری',
    icon: Briefcase,
    desc: 'برای متخصصین با جاب‌آفر رسمی از کارفرمای اتریشی (RWR Card).',
    duration: '۲ تا ۴ ماه',
    cost: '€۱۶۰',
    difficulty: 'متوسط',
    requirements: [
      'قرارداد کاری امضاشده با کارفرمای اتریشی',
      'مدرک تحصیلی یا سابقه کار مرتبط',
      'گواهی عدم سوءپیشینه',
      'بیمه درمانی معتبر',
    ],
    highlights: [
      'امکان اخذ اقامت دائم پس از ۵ سال',
      'امکان الحاق خانواده از روز اول',
      'دسترسی کامل به بازار کار اروپا',
    ],
    color: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      ring: 'ring-blue-500/20',
    },
  },
  {
    id: 'study',
    title: 'ویزای تحصیلی',
    category: 'تحصیلی',
    icon: GraduationCap,
    desc: 'برای دانشجویان پذیرفته‌شده در دانشگاه‌ها یا مؤسسات آموزشی اتریش.',
    duration: '۱ تا ۳ ماه',
    cost: '€۱۲۰',
    difficulty: 'آسان',
    requirements: [
      'نامه پذیرش (Zulassungsbescheid) از دانشگاه',
      'گردش حساب بانکی (حداقل €۱۲,۰۰۰)',
      'مدرک زبان آلمانی یا انگلیسی',
      'بیمه دانشجویی',
    ],
    highlights: [
      'امکان کار پاره‌وقت ۲۰ ساعت در هفته',
      'تمدید سالانه تا پایان تحصیل',
      'امکان تبدیل به ویزای کار پس از فارغ‌التحصیلی',
    ],
    color: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      ring: 'ring-emerald-500/20',
    },
  },
  {
    id: 'financial',
    title: 'تمکن مالی (Quotenkontingent)',
    category: 'اقامت',
    icon: Wallet,
    desc: 'اقامت بدون نیاز به کارفرما بر اساس اثبات توان مالی برای تأمین معاش.',
    duration: '۶ تا ۱۲ ماه',
    cost: '€۲۰۰',
    difficulty: 'چالشی',
    requirements: [
      'اثبات تمکن مالی سالانه (حدود €۲۰,۰۰۰)',
      'مسکن اجاره‌ای در اتریش',
      'بیمه درمانی کامل',
      'گواهی عدم سوءپیشینه',
    ],
    highlights: [
      'استقلال کامل از کارفرما',
      'امکان تمدید سالانه',
      'مناسب برای فریلنسرها و سرمایه‌گذاران',
    ],
    color: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      ring: 'ring-amber-500/20',
    },
  },
  {
    id: 'rwc',
    title: 'کارت قرمز-سفید-قرمز',
    category: 'کاری',
    icon: BadgeCheck,
    desc: 'سیستم امتیازبندی اتریش برای جذب نیروی متخصص و کارگران ماهر.',
    duration: '۳ تا ۶ ماه',
    cost: '€۱۶۰',
    difficulty: 'متوسط',
    requirements: [
      'کسب حداقل ۷۰ امتیاز از معیارهای RWR',
      'مدرک تحصیلی یا مهارت حرفه‌ای',
      'سابقه کار مرتبط',
      'مدرک زبان آلمانی یا انگلیسی',
    ],
    highlights: [
      'مسیر سریع‌تر برای متخصصان',
      'امکان جستجوی کار از داخل کشور',
      'حضور ۱ ساله برای یافتن شغل',
    ],
    color: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      ring: 'ring-rose-500/20',
    },
  },
  {
    id: 'golden',
    title: 'گلدن ویزا (سرمایه‌گذاری)',
    category: 'سرمایه‌گذاری',
    icon: Crown,
    desc: 'اقامت اروپا از طریق سرمایه‌گذاری در ملک یا کسب‌وکار (یونان / اتریش).',
    duration: '۴ تا ۸ ماه',
    cost: '€۲۵۰,۰۰۰+',
    difficulty: 'متوسط',
    requirements: [
      'سرمایه‌گذاری حداقلی از €۲۵۰,۰۰۰ (بسته به کشور)',
      'منبع قانونی وجوه',
      'پاسپورت معتبر',
      'بیمه درمانی بین‌المللی',
    ],
    highlights: [
      'اقامت بدون نیاز به اقامت فیزیکی',
      'امکان تابعیت پس از ۵ تا ۷ سال',
      'دسترسی به کل منطقه شنگن',
    ],
    color: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-200',
      ring: 'ring-yellow-500/20',
    },
  },
  {
    id: 'startup',
    title: 'ویزای استارتاپ',
    category: 'کاری',
    icon: Rocket,
    desc: 'برای بنیان‌گذاران استارتاپ با ایده نوآورانه و برنامه کسب‌وکار.',
    duration: '۳ تا ۶ ماه',
    cost: '€۱۶۰',
    difficulty: 'چالشی',
    requirements: [
      'طرح کسب‌وکار دقیق و قابل ارزیابی',
      'حداقل سرمایه اولیه €۳۰,۰۰۰',
      'اثبات تخصص در حوزه استارتاپ',
      'ارزیابی توسط نهاد رسمی (AWS)',
    ],
    highlights: [
      'حمایت از اکوسیستم استارتاپی اتریش',
      'امکان جذب سرمایه‌گذار',
      'دسترسی به گرنت‌های دولتی',
    ],
    color: {
      bg: 'bg-violet-50',
      text: 'text-violet-700',
      border: 'border-violet-200',
      ring: 'ring-violet-500/20',
    },
  },
];

const CATEGORIES = ['همه', 'کاری', 'تحصیلی', 'اقامت', 'سرمایه‌گذاری'] as const;
type Category = (typeof CATEGORIES)[number];

/* ============================================================
   Difficulty badge helper
   ============================================================ */
const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  'آسان': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'متوسط': 'bg-amber-50 text-amber-700 border-amber-200',
  'چالشی': 'bg-rose-50 text-rose-700 border-rose-200',
};

/* ============================================================
   Component
   ============================================================ */
export const MigrationGuide: React.FC = () => {
  const [selectedVisa, setSelectedVisa] = useState<Visa | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('همه');
  const panelRef = useRef<HTMLDivElement>(null);

  /* ---------- فیلتر مسیرها ---------- */
  const filteredVisas = useMemo(() => {
    if (activeCategory === 'همه') return VISAS;
    return VISAS.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  /* ---------- سئوی داینامیک صفحه ---------- */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.DiacoSEO) return;

    window.DiacoSEO.set({
      title: 'راهنمای جامع مهاجرت به اتریش | اتریش‌نشین',
      description:
        'مقایسه ۶ مسیر مهاجرتی اتریش: ویزای کار، تحصیلی، تمکن مالی، کارت قرمز-سفید-قرمز، گلدن ویزا و استارتاپ. شرایط، مدارک و زمان‌بندی هر مسیر.',
      keywords:
        'ویزای کار اتریش, ویزای تحصیلی اتریش, تمکن مالی اتریش, کارت قرمز سفید قرمز, گلدن ویزا, ویزای استارتاپ اتریش, مهاجرت به اتریش',
      url: '/guides/migration-austria',
      image: 'https://www.dia-co.ir/og-migration-guide.jpg',
      type: 'article',
    });

    // JSON-LD اختصاصی صفحه
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'راهنمای جامع مهاجرت به اتریش',
      description: 'مقایسه ۶ مسیر مهاجرتی رسمی به اتریش',
      itemListElement: VISAS.map((visa, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: visa.title,
          serviceType: visa.category,
          description: visa.desc,
          provider: {
            '@type': 'Organization',
            name: 'اتریش‌نشین',
            url: 'https://www.dia-co.ir/',
          },
        },
      })),
    };

    window.DiacoSEO.set({ jsonLd });
  }, []);

  /* ---------- بستن پنل با Escape ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedVisa(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* ---------- اسکرول به پنل هنگام باز شدن ---------- */
  useEffect(() => {
    if (selectedVisa && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedVisa]);

  const handleSelect = useCallback((visa: Visa) => {
    setSelectedVisa((prev) => (prev?.id === visa.id ? null : visa));
  }, []);

  return (
    <GuideContainer
      title="راهنمای جامع مهاجرت به اتریش"
      description="انتخاب مسیر مناسب بر اساس شرایط شخصی و حرفه‌ای — ۶ مسیر رسمی با جزئیات کامل"
    >
      {/* ---------- فیلتر دسته‌بندی ---------- */}
      <div
        role="tablist"
        aria-label="فیلتر دسته‌بندی مسیرهای مهاجرتی"
        className="flex flex-wrap gap-2 mb-6"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                isActive
                  ? 'bg-[#0b2933] text-white border-[#0b2933] shadow-sm'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ---------- شبکه کارت‌ها ---------- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredVisas.map((visa) => {
            const Icon = visa.icon;
            const isSelected = selectedVisa?.id === visa.id;
            return (
              <motion.button
                key={visa.id}
                layout
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(visa)}
                aria-expanded={isSelected}
                aria-controls="visa-detail-panel"
                className={`group p-5 bg-white border rounded-2xl shadow-sm text-right transition-all ${
                  isSelected
                    ? `${visa.color.border} ring-2 ${visa.color.ring}`
                    : 'border-stone-100 hover:border-stone-200'
                }`}
              >
                {/* آیکون + دسته */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl grid place-items-center ${visa.color.bg} ${visa.color.text}`}
                  >
                    <Icon size={22} />
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${visa.color.bg} ${visa.color.text}`}
                  >
                    {visa.category}
                  </span>
                </div>

                {/* عنوان و توضیح */}
                <h3 className="font-bold text-base text-stone-900 mb-2 leading-snug">
                  {visa.title}
                </h3>
                <p className="text-stone-600 text-sm leading-7 mb-4 line-clamp-2">
                  {visa.desc}
                </p>

                {/* متادیتای سریع */}
                <div className="flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 pt-3">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={13} /> {visa.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Euro size={13} /> {visa.cost}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full border text-[11px] font-medium ${
                      DIFFICULTY_STYLE[visa.difficulty]
                    }`}
                  >
                    {visa.difficulty}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ---------- پنل جزئیات ---------- */}
      <AnimatePresence>
        {selectedVisa && (
          <motion.div
            id="visa-detail-panel"
            ref={panelRef}
            role="region"
            aria-label={`جزئیات ${selectedVisa.title}`}
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 overflow-hidden"
          >
            <div
              className={`p-6 md:p-8 rounded-2xl border ${selectedVisa.color.border} ${selectedVisa.color.bg}`}
            >
              {/* هدر پنل */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl grid place-items-center bg-white ${selectedVisa.color.text}`}
                  >
                    <selectedVisa.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">
                      {selectedVisa.title}
                    </h3>
                    <p className="text-sm text-stone-600 mt-0.5">
                      {selectedVisa.category} · {selectedVisa.duration}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVisa(null)}
                  aria-label="بستن جزئیات"
                  className="p-2 rounded-lg hover:bg-white/60 text-stone-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-stone-700 leading-8 mb-6">{selectedVisa.desc}</p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* مدارک مورد نیاز */}
                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2 text-stone-900">
                    <FileCheck size={18} className={selectedVisa.color.text} />
                    مدارک مورد نیاز
                  </h4>
                  <ul className="space-y-2">
                    {selectedVisa.requirements.map((req, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start gap-2 text-stone-700 text-sm leading-7"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-emerald-500 mt-1.5 shrink-0"
                        />
                        <span>{req}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* مزایا */}
                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2 text-stone-900">
                    <Sparkles size={18} className={selectedVisa.color.text} />
                    مزایای کلیدی
                  </h4>
                  <ul className="space-y-2">
                    {selectedVisa.highlights.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 + 0.1 }}
                        className="flex items-start gap-2 text-stone-700 text-sm leading-7"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-emerald-500 mt-1.5 shrink-0"
                        />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* متادیتای پنل */}
              <div className="mt-6 pt-5 border-t border-white/60 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-stone-500 mb-1">مدت پردازش</div>
                  <div className="font-bold text-stone-900 text-sm">
                    {selectedVisa.duration}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500 mb-1">هزینه تقریبی</div>
                  <div className="font-bold text-stone-900 text-sm">
                    {selectedVisa.cost}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500 mb-1">سطح دشواری</div>
                  <div className="font-bold text-stone-900 text-sm">
                    {selectedVisa.difficulty}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/assessment"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0b2933] text-white rounded-xl font-semibold text-sm hover:bg-[#082833] transition-colors"
                >
                  ارزیابی شانس این مسیر
                  <ArrowLeft size={16} />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-300 text-stone-700 rounded-xl font-semibold text-sm hover:border-stone-400 transition-colors"
                >
                  مشاوره با وکیل
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- CTA پایانی ---------- */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-l from-[#0b2933] to-[#082833] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg mb-1">
            مطمئن نیستید کدام مسیر برای شما مناسب است؟
          </h3>
          <p className="text-sm text-stone-300 leading-7">
            فرم ارزیابی رایگان را تکمیل کنید تا وکلای دیاکو مسیر بهینه را برای شما
            پیشنهاد دهند.
          </p>
        </div>
        <a
          href="/assessment"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#f5a623] text-[#082833] rounded-xl font-bold text-sm hover:bg-[#fbbf24] transition-colors shrink-0"
        >
          شروع ارزیابی رایگان
          <ArrowLeft size={16} />
        </a>
      </div>
    </GuideContainer>
  );
};

export default MigrationGuide;