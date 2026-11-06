import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from './SEO';
import {
  FileCheck, GraduationCap, Languages, Calculator,
  CheckCircle2, ChevronDown, ExternalLink, Building2, Scale,
  Clock, MapPin, Calendar, Info, ArrowLeft, Euro, Image as ImageIcon,
  BookOpen, TrendingUp, Users, Award, Briefcase, Banknote,
  Lightbulb, Target, Phone, MessageCircle,
} from 'lucide-react';

/* ============================================================
   ثابت‌های برند — اتریش‌نشین
   ============================================================ */
const BRAND = {
  name: 'اتریش‌نشین',
  nameEn: 'Otrish Neshin',
  origin: 'https://www.dia-co.ir',
  logo: 'https://www.dia-co.ir/logo.png',
  phone: '+98-21-91693955',
  telegram: 'https://t.me/diaco_holding',
  whatsapp: 'https://wa.me/436889763256',
} as const;

const CANONICAL_URL = `${BRAND.origin}/guides/accounting-career-austria`;

/* ============================================================
   Types
   ============================================================ */
interface GuideStep {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  duration: string;
  image: string;
  imageAlt: string;
  bullets: string[];
}

interface CourseItem {
  id: string;
  provider: string;
  title: string;
  duration: string;
  cost: string;
  level: string;
  image: string;
  imageAlt: string;
  url: string;
}

interface SalaryRow {
  role: string;
  entry: string;
  experienced: string;
  senior: string;
}

interface FAQEntry {
  q: string;
  a: string;
}

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

interface InternalLink {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

/* ============================================================
   تصویر Hero — بهینه‌شده برای LCP و Google Images
   ============================================================ */
const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
  srcset:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=75 800w, ' +
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=75 1200w, ' +
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80 1600w',
  alt: 'حسابداری حرفه‌ای در اتریش — میز کار حسابدار با لپ‌تاپ، اسناد مالی و ماشین‌حساب',
  width: 1600,
  height: 900,
};

/* ============================================================
   Data
   ============================================================ */
const STEPS: GuideStep[] = [
  {
    id: 'credentials',
    icon: FileCheck,
    title: 'معادل‌سازی مدارک تحصیلی',
    description:
      'ارزیابی و ارزشیابی مدارک دانشگاهی یا فنی‌حرفه‌ای از طریق مراکز رسمی مانند ENIC NARIC Austria برای کارفرمایان اتریشی.',
    duration: '۴ تا ۸ هفته',
    image:
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=75',
    imageAlt:
      'ارزیابی مدارک تحصیلی حسابداری در اتریش — اسناد رسمی و مهر تأیید روی میز',
    bullets: [
      'ترجمه رسمی و سوگند‌خورده مدارک',
      'تأیید سفارت اتریش در تهران',
      'ثبت درخواست در سامانه ENIC NARIC',
    ],
  },
  {
    id: 'courses',
    icon: GraduationCap,
    title: 'دوره‌های WIFI یا BFI',
    description:
      'گذراندن دوره‌های Buchhaltung و Bilanzbuchhaltung که توسط اتاق بازرگانی اتریش (WKO) یا مؤسسات BFI ارائه می‌شود.',
    duration: '۳ تا ۱۲ ماه',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=75',
    imageAlt:
      'دوره آموزشی حسابداری در اتریش — دانشجویان در کلاس درس با مدرس حرفه‌ای',
    bullets: [
      'گواهینامه Buchhalter (پایه)',
      'گواهینامه Bilanzbuchhalter (پیشرفته)',
      'آموزش عملی با نرم‌افزار BMD',
    ],
  },
  {
    id: 'language',
    icon: Languages,
    title: 'تسلط به زبان آلمانی',
    description:
      'نیاز به مدرک زبان حداقل سطح B2 برای درک اصطلاحات حقوقی، مالیاتی و نامه‌نگاری تجاری. برای Bilanzbuchhalter سطح C1 توصیه می‌شود.',
    duration: '۶ تا ۱۸ ماه',
    image:
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=75',
    imageAlt:
      'آموزش زبان آلمانی برای حسابداران — کتاب و دیکشنری تخصصی مالی و مالیاتی',
    bullets: [
      'مدرک ÖSD, Goethe یا Telc',
      'آشنایی با اصطلاحات Steuerrecht',
      'مکاتبه رسمی با Finanzamt',
    ],
  },
  {
    id: 'software',
    icon: Calculator,
    title: 'یادگیری نرم‌افزارهای تخصصی',
    description:
      'تسلط بر BMD، RZL، SAP و FinanzOnline که استاندارد صنعت حسابداری در اتریش هستند.',
    duration: '۲ تا ۴ ماه',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75',
    imageAlt:
      'نرم‌افزار حسابداری BMD و FinanzOnline روی صفحه لپ‌تاپ با نمودارهای مالی',
    bullets: [
      'BMD (پیشرو در بازار اتریش)',
      'RZL (برای دفاتر کوچک)',
      'SAP (برای شرکت‌های بزرگ)',
    ],
  },
];

const COURSES: CourseItem[] = [
  {
    id: 'wifi-buchhalter',
    provider: 'WIFI Wien',
    title: 'Buchhalter Zertifikat',
    duration: '۶ ماه',
    cost: '€۲,۴۰۰',
    level: 'مقدماتی',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=75',
    imageAlt: 'دوره Buchhalter در WIFI وین — جلسه آموزشی حسابداری',
    url: 'https://www.wifi.at',
  },
  {
    id: 'bfi-bilanz',
    provider: 'BFI Wien',
    title: 'Bilanzbuchhalter',
    duration: '۱۲ ماه',
    cost: '€۳,۸۰۰',
    level: 'پیشرفته',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=75',
    imageAlt:
      'دوره Bilanzbuchhalter در BFI — آموزش ترازنامه و صورت‌های مالی اتریش',
    url: 'https://www.bfi.wien',
  },
  {
    id: 'wko-lohn',
    provider: 'WKO Akademie',
    title: 'Lohnverrechnung',
    duration: '۴ ماه',
    cost: '€۱,۹۰۰',
    level: 'تخصصی',
    image:
      'https://images.unsplash.com/photo-1554224311-beee415c201f?auto=format&fit=crop&w=600&q=75',
    imageAlt:
      'دوره حقوق و دستمزد Lohnverrechnung در اتاق بازرگانی اتریش WKO',
    url: 'https://www.wko.at',
  },
];

const SALARY: SalaryRow[] = [
  { role: 'Buchhalter', entry: '€۲,۴۰۰', experienced: '€۳,۲۰۰', senior: '€۴,۲۰۰' },
  { role: 'Bilanzbuchhalter', entry: '€۳,۱۰۰', experienced: '€۴,۲۰۰', senior: '€۵,۵۰۰' },
  { role: 'Lohnverrechner', entry: '€۲,۶۰۰', experienced: '€۳,۴۰۰', senior: '€۴,۵۰۰' },
  { role: 'Steuerassistent', entry: '€۲,۸۰۰', experienced: '€۳,۸۰۰', senior: '€۵,۰۰۰' },
];

const GALLERY: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=75',
    alt: 'اسناد مالی و گزارش‌های حسابداری استاندارد اتریش روی میز کار',
    caption: 'گزارش‌های مالی استاندارد اتریش',
    width: 600,
    height: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=75',
    alt: 'کار تیمی حسابداران در دفتر مدرن اتریش',
    caption: 'محیط کار دفتر حسابداری مدرن',
    width: 600,
    height: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=600&q=75',
    alt: 'تحلیل داده‌های مالی با نمودار و ماشین‌حساب برای بودجه‌بندی',
    caption: 'تحلیل داده‌های مالی و بودجه‌بندی',
    width: 600,
    height: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=75',
    alt: 'جلسه مشاوره مالی و مالیاتی در دفتر وین اتریش',
    caption: 'مشاوره تخصصی مالی و مالیاتی',
    width: 600,
    height: 400,
  },
];

const FAQS: FAQEntry[] = [
  {
    q: 'آیا مدرک حسابداری ایران در اتریش معتبر است؟',
    a: 'مدرک حسابداری ایران نیازمند معادل‌سازی از طریق ENIC NARIC Austria است. معمولاً مدرک کارشناسی حسابداری معادل Bachelor اتریشی ارزیابی می‌شود، اما برای حرفه Bilanzbuchhalter نیاز به گذراندن دوره‌های تکمیلی و آزمون‌های WKO خواهید داشت.',
  },
  {
    q: 'حداقل سطح زبان آلمانی برای کار حسابداری در اتریش چقدر است؟',
    a: 'برای Buchhalter معمولی سطح B2 کافی است، اما برای Bilanzbuchhalter و موقعیت‌های ارشد، سطح C1 توصیه می‌شود. آزمون‌های ÖSD، Goethe یا Telc معتبر هستند.',
  },
  {
    q: 'چقدر طول می‌کشد تا در اتریش حسابدار شوم؟',
    a: 'مسیر کامل از صفر تا Bilanzbuchhalter معمولاً بین ۱۸ تا ۳۶ ماه طول می‌کشد. اگر مدرک حسابداری دارید، می‌توانید در ۱۲ تا ۱۸ ماه به موقعیت شغلی پایدار برسید.',
  },
  {
    q: 'آیا بدون مدرک رسمی هم می‌توان حسابدار شد؟',
    a: 'در اتریش برخی موقعیت‌های Buchhalter با گواهینامه‌های WIFI یا BFI قابل دسترسی است. اما برای Bilanzbuchhalter، مدرک رسمی WKO الزامی است.',
  },
  {
    q: 'پرتقاضاترین شهرهای اتریش برای حسابداران کدامند؟',
    a: 'وین (Wien) به‌عنوان پایتخت مالی اتریش، بزرگ‌ترین بازار کار حسابداری را دارد. پس از آن لینتس، گراتس و سالزبورگ بیشترین فرصت‌های شغلی را دارند.',
  },
];

const INTERNAL_LINKS: InternalLink[] = [
  {
    href: '/guides/100-days-austria',
    title: 'راهنمای ۱۰۰ روز اول در اتریش',
    description: 'چک‌لیست اقدامات قانونی پس از ورود به اتریش',
    icon: Clock,
  },
  {
    href: '/guides/migration-austria',
    title: 'راهنمای جامع مهاجرت به اتریش',
    description: 'مقایسه ۶ مسیر رسمی مهاجرتی',
    icon: BookOpen,
  },
  {
    href: '/guides/german-language',
    title: 'یادگیری زبان آلمانی',
    description: 'مسیر رسیدن به سطح B2 و C1',
    icon: Languages,
  },
  {
    href: '/assessment',
    title: 'ارزیابی رایگان شانس ویزا',
    description: 'سنجش هوشمند پرونده مهاجرتی شما',
    icon: Target,
  },
  {
    href: '/services/financial-austria',
    title: 'تمکن مالی اتریش',
    description: 'اقامت بدون نیاز به کارفرما',
    icon: Banknote,
  },
  {
    href: '/contact',
    title: 'مشاوره با وکلای مقیم وین',
    description: 'تماس مستقیم با تیم دیاکو',
    icon: Phone,
  },
];

const TOC = [
  { id: 'status', label: 'وضعیت بازار کار' },
  { id: 'steps', label: 'مراحل ورود به حرفه' },
  { id: 'courses', label: 'دوره‌های معتبر' },
  { id: 'salary', label: 'مقایسه حقوق' },
  { id: 'gallery', label: 'گالری تصاویر' },
  { id: 'legal', label: 'نکات قانونی' },
  { id: 'faq', label: 'سوالات متداول' },
  { id: 'related', label: 'مطالب مرتبط' },
];

/* ============================================================
   Component
   ============================================================ */
const AccountingCareerGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /* ---------- سئوی داینامیک ---------- */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.DiacoSEO) return;

    /* Title: ۵۸ کاراکتر | Description: ۱۵۷ کاراکتر */
    window.DiacoSEO.set({
      title: 'حسابداری در اتریش ۲۰۲۶ | راهنمای شغلی دیاکو',
      description:
        'راهنمای ورود به حرفه حسابداری در اتریش: معادل‌سازی مدارک، دوره‌های WIFI و BFI، مدرک Buchhalter و Bilanzbuchhalter، زبان B2 و مقایسه حقوق ۲۰۲۶.',
      keywords:
        'حسابداری در اتریش, Buchhalter, Bilanzbuchhalter, WIFI Wien, BFI Wien, کار حسابداری اتریش, حقوق حسابدار اتریش, FinanzOnline, BMD, مهاجرت شغلی اتریش',
      url: '/guides/accounting-career-austria',
      image: HERO_IMAGE.src,
      type: 'article',
    });

    /* ---------- Schema.org چندگانه ---------- */
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${BRAND.origin}/#organization`,
          name: BRAND.name,
          alternateName: BRAND.nameEn,
          url: BRAND.origin,
          logo: {
            '@type': 'ImageObject',
            url: BRAND.logo,
            width: 512,
            height: 512,
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: BRAND.phone,
            contactType: 'customer service',
            areaServed: ['IR', 'AT', 'DE', 'GR'],
            availableLanguage: ['Persian', 'English', 'German'],
          },
          sameAs: [BRAND.telegram],
        },
        {
          '@type': 'WebPage',
          '@id': CANONICAL_URL,
          url: CANONICAL_URL,
          name: 'حسابداری در اتریش ۲۰۲۶ | راهنمای شغلی دیاکو',
          inLanguage: 'fa-IR',
          isPartOf: {
            '@type': 'WebSite',
            '@id': `${BRAND.origin}/#website`,
            url: BRAND.origin,
            name: BRAND.name,
          },
        },
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای شغلی حسابداری و دفترداری در اتریش ۲۰۲۶',
          description:
            'مسیر کامل ورود به بازار کار حسابداری در اتریش از معادل‌سازی مدارک تا دریافت گواهینامه Bilanzbuchhalter و مقایسه حقوق.',
          image: {
            '@type': 'ImageObject',
            url: HERO_IMAGE.src,
            width: HERO_IMAGE.width,
            height: HERO_IMAGE.height,
            caption: HERO_IMAGE.alt,
          },
          author: {
            '@type': 'Organization',
            '@id': `${BRAND.origin}/#organization`,
            name: BRAND.name,
          },
          publisher: {
            '@type': 'Organization',
            '@id': `${BRAND.origin}/#organization`,
            name: BRAND.name,
            logo: {
              '@type': 'ImageObject',
              url: BRAND.logo,
            },
          },
          datePublished: '2025-01-15T08:00:00+03:30',
          dateModified: new Date().toISOString(),
          mainEntityOfPage: CANONICAL_URL,
          inLanguage: 'fa-IR',
          articleSection: 'راهنمای شغلی',
          keywords:
            'حسابداری اتریش, Buchhalter, Bilanzbuchhalter, WIFI Wien, BFI Wien',
          about: [
            { '@type': 'Thing', name: 'حسابداری' },
            { '@type': 'Thing', name: 'اتریش' },
            { '@type': 'Thing', name: 'Buchhalter' },
            { '@type': 'Thing', name: 'Bilanzbuchhalter' },
          ],
        },
        {
          '@type': 'HowTo',
          '@id': `${CANONICAL_URL}#howto`,
          name: 'راهنمای گام‌به‌گام ورود به حرفه حسابداری در اتریش',
          description:
            'چهار مرحله اصلی برای تبدیل شدن به حسابدار حرفه‌ای در اتریش.',
          image: HERO_IMAGE.src,
          totalTime: 'P18M',
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'EUR',
            value: '8000',
          },
          step: STEPS.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.title,
            text: s.description,
            image: {
              '@type': 'ImageObject',
              url: s.image,
              caption: s.imageAlt,
            },
            url: `${CANONICAL_URL}#${s.id}`,
          })),
        },
        {
          '@type': 'FAQPage',
          '@id': `${CANONICAL_URL}#faq`,
          mainEntity: FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${CANONICAL_URL}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'صفحه اصلی',
              item: BRAND.origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'راهنمای شغلی',
              item: `${BRAND.origin}/guides`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'حسابداری در اتریش',
              item: CANONICAL_URL,
            },
          ],
        },
        {
          '@type': 'ImageGallery',
          '@id': `${CANONICAL_URL}#gallery`,
          name: 'گالری تصاویر حرفه حسابداری در اتریش',
          image: GALLERY.map((g) => ({
            '@type': 'ImageObject',
            contentUrl: g.src,
            caption: g.caption,
            description: g.alt,
            width: g.width,
            height: g.height,
          })),
        },
      ],
    };

    window.DiacoSEO.set({ jsonLd });
  }, []);

  /* ---------- اسکرول نرم ---------- */
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-stone-50 pb-20 font-sans"
      dir="rtl"
      itemScope
      itemType="https://schema.org/Article"
    >
      <SEO
        title="حسابداری در اتریش ۲۰۲۶ | راهنمای شغلی دیاکو"
        description="راهنمای ورود به حرفه حسابداری در اتریش: معادل‌سازی مدارک، دوره‌های WIFI و BFI، مدرک Buchhalter و Bilanzbuchhalter، زبان B2 و مقایسه حقوق ۲۰۲۶."
        keywords="حسابداری در اتریش, Buchhalter, Bilanzbuchhalter, WIFI Wien, کار حسابداری اتریش"
        canonical={CANONICAL_URL}
      />

      {/* ============================================================
          HERO — با تصویر Featured
         ============================================================ */}
      <header
        className="relative overflow-hidden rounded-b-3xl shadow-lg"
        aria-labelledby="guide-title"
      >
        <img
          src={HERO_IMAGE.src}
          srcSet={HERO_IMAGE.srcset}
          sizes="100vw"
          alt={HERO_IMAGE.alt}
          width={HERO_IMAGE.width}
          height={HERO_IMAGE.height}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
          itemProp="image"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-l from-[#7f1010]/95 via-[#b91c1c]/92 to-[#b91c1c]/85"
        />

        <div className="relative text-white pt-6 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="مسیر صفحه" className="mb-3">
              <ol className="flex items-center gap-2 text-[10px] font-bold text-red-100/80 list-none p-0 m-0">
                <li>خانه</li>
                <li aria-hidden="true">/</li>
                <li>راهنمای شغلی</li>
                <li aria-hidden="true">/</li>
                <li className="text-white">حسابداری اتریش</li>
              </ol>
            </nav>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="inline-block bg-white/25 text-white text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                  💼 بازار کار و مشاغل تخصصی
                </span>

                <h1
                  id="guide-title"
                  className="text-2xl md:text-3xl font-black mt-3 tracking-tight leading-tight"
                  itemProp="headline"
                >
                  راهنمای شغلی حسابداری و دفترداری در اتریش
                </h1>

                <p
                  className="text-red-100 text-xs md:text-sm mt-2 leading-relaxed max-w-2xl"
                  itemProp="description"
                >
                  مسیر حرفه‌ای، مدارک معتبر (Buchhalter / Bilanzbuchhalter)،
                  دوره‌های WIFI و BFI و فرصت‌های درآمدی در بازار کار اتریش
                  ۲۰۲۶.
                </p>

                {/* Article metadata */}
                <ul
                  className="flex flex-wrap items-center gap-4 mt-4 text-[10px] font-bold text-red-100/90 list-none p-0"
                  aria-label="اطلاعات مقاله"
                >
                  <li className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    <time dateTime="2025-01-15" itemProp="datePublished">
                      به‌روزرسانی: ۱۴۰۴
                    </time>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    زمان مطالعه: ۸ دقیقه
                  </li>
                  <li className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    ویژه اتریش
                  </li>
                </ul>
              </div>

              <div
                aria-hidden="true"
                className="w-14 h-14 md:w-16 md:h-16 bg-white/15 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/20 shrink-0"
              >
                📊
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
          TOC — چسبان (Sticky)
         ============================================================ */}
      <nav
        aria-label="فهرست مطالب"
        className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm"
      >
        <div className="max-w-4xl mx-auto px-4 py-2.5 flex gap-2 overflow-x-auto">
          {TOC.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold text-stone-600 hover:bg-red-50 hover:text-[#b91c1c] transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b91c1c]/40"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ============================================================
          MAIN
         ============================================================ */}
      <main className="max-w-4xl mx-auto px-4 mt-6 space-y-5">
        {/* ---------- وضعیت بازار کار ---------- */}
        <section
          id="status"
          aria-labelledby="status-title"
          className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80 flex items-center justify-between gap-4 flex-wrap"
        >
          <div className="flex items-center gap-3 flex-1 min-w-[240px]">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg font-bold shrink-0">
              💡
            </div>
            <div>
              <h2
                id="status-title"
                className="text-stone-800 font-bold text-sm mb-0.5"
              >
                وضعیت بازار کار
              </h2>
              <p className="text-stone-500 text-xs leading-relaxed">
                تقاضای بالا برای حسابداران مسلط به قوانین مالیاتی اتریش
                (Österreichische Steuern)
              </p>
            </div>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 shrink-0">
            موقعیت عالی
          </span>
        </section>

        {/* ---------- مراحل ورود ---------- */}
        <section
          id="steps"
          aria-labelledby="steps-title"
          className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80"
        >
          <h2
            id="steps-title"
            className="text-stone-900 font-extrabold text-base mb-1 flex items-center gap-2"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#b91c1c]"
              aria-hidden="true"
            />
            مراحل اصلی ورود به حرفه حسابداری
          </h2>
          <p className="text-stone-500 text-xs mb-5">
            ۴ گام کلیدی از معادل‌سازی مدارک تا استخدام در بازار کار اتریش
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.id}
                  id={step.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.06 }}
                  className="group bg-stone-50 rounded-2xl border border-stone-100 hover:border-red-200 transition-all overflow-hidden"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-200">
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      width={800}
                      height={450}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                    />
                    <span className="absolute top-3 right-3 bg-white/95 text-[#b91c1c] text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                      مرحله {i + 1}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-[#b91c1c] flex items-center justify-center shrink-0">
                        <Icon size={16} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-800 text-sm leading-snug">
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-1 text-[10px] text-stone-500 font-bold mt-0.5">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {step.duration}
                        </div>
                      </div>
                    </div>

                    <p className="text-stone-600 text-[11px] leading-relaxed mb-3">
                      {step.description}
                    </p>

                    <ul className="space-y-1 list-none p-0 m-0">
                      {step.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-1.5 text-[10.5px] text-stone-600 leading-relaxed"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* ---------- دوره‌های معتبر ---------- */}
        <section
          id="courses"
          aria-labelledby="courses-title"
          className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80"
        >
          <h2
            id="courses-title"
            className="text-stone-900 font-extrabold text-base mb-1 flex items-center gap-2"
          >
            <GraduationCap className="w-5 h-5 text-[#b91c1c]" aria-hidden="true" />
            دوره‌های معتبر و پیشنهادی
          </h2>
          <p className="text-stone-500 text-xs mb-5">
            مؤسسات رسمی اتریش که گواهینامه‌های آن‌ها در بازار کار شناخته‌شده
            است
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COURSES.map((c) => (
              <article
                key={c.id}
                className="border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-red-200 transition-all bg-white flex flex-col"
              >
                <div className="aspect-[3/2] bg-stone-200 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.imageAlt}
                    width={600}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-[#b91c1c] bg-red-50 px-2 py-0.5 rounded-full">
                      {c.provider}
                    </span>
                    <span className="text-[10px] font-bold text-stone-500">
                      {c.level}
                    </span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm mb-3 leading-snug">
                    {c.title}
                  </h3>
                  <ul className="space-y-1 text-[11px] text-stone-600 mb-4 list-none p-0 m-0">
                    <li className="flex items-center gap-1.5">
                      <Clock
                        className="w-3 h-3 text-stone-400"
                        aria-hidden="true"
                      />
                      مدت: {c.duration}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Euro
                        className="w-3 h-3 text-stone-400"
                        aria-hidden="true"
                      />
                      هزینه: {c.cost}
                    </li>
                  </ul>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-auto inline-flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#b91c1c] hover:bg-red-50 py-2 rounded-lg transition"
                  >
                    اطلاعات بیشتر
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- مقایسه حقوق ---------- */}
        <section
          id="salary"
          aria-labelledby="salary-title"
          className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80"
        >
          <h2
            id="salary-title"
            className="text-stone-900 font-extrabold text-base mb-1 flex items-center gap-2"
          >
            <Banknote className="w-5 h-5 text-[#b91c1c]" aria-hidden="true" />
            مقایسه حقوق ماهانه در اتریش (۲۰۲۶)
          </h2>
          <p className="text-stone-500 text-xs mb-5">
            مبالغ ناخالص ماهانه (Brutto) بر اساس گزارش‌های WKO و StepStone
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-[11px] border-collapse">
              <caption className="sr-only">
                مقایسه حقوق نقش‌های حسابداری در اتریش سال ۲۰۲۶
              </caption>
              <thead>
                <tr className="bg-stone-50 text-stone-700">
                  <th scope="col" className="p-3 font-black rounded-r-lg">
                    نقش
                  </th>
                  <th scope="col" className="p-3 font-black">
                    شروع کار
                  </th>
                  <th scope="col" className="p-3 font-black">
                    با تجربه
                  </th>
                  <th scope="col" className="p-3 font-black rounded-l-lg">
                    ارشد
                  </th>
                </tr>
              </thead>
              <tbody>
                {SALARY.map((row) => (
                  <tr
                    key={row.role}
                    className="border-b border-stone-100 hover:bg-red-50/30 transition"
                  >
                    <th
                      scope="row"
                      className="p-3 font-bold text-stone-800 text-left"
                      dir="ltr"
                    >
                      {row.role}
                    </th>
                    <td className="p-3 text-stone-600">{row.entry}</td>
                    <td className="p-3 text-stone-600 font-bold">
                      {row.experienced}
                    </td>
                    <td className="p-3 text-emerald-700 font-black">
                      {row.senior}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------- گالری تصاویر ---------- */}
        <section
          id="gallery"
          aria-labelledby="gallery-title"
          className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80"
        >
          <h2
            id="gallery-title"
            className="text-stone-900 font-extrabold text-base mb-1 flex items-center gap-2"
          >
            <ImageIcon className="w-5 h-5 text-[#b91c1c]" aria-hidden="true" />
            گالری تصاویر حرفه حسابداری
          </h2>
          <p className="text-stone-500 text-xs mb-5">
            محیط کار، ابزارها و اسناد استاندارد حسابداری در اتریش
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {GALLERY.map((g, i) => (
              <motion.figure
                key={g.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="m-0 overflow-hidden rounded-2xl border border-stone-200 group bg-white"
              >
                <div className="aspect-[3/2] bg-stone-200 overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.alt}
                    width={g.width}
                    height={g.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <figcaption className="p-2 text-[9px] font-bold text-stone-500 text-center truncate">
                  {g.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* ---------- نکات قانونی ---------- */}
        <section
          id="legal"
          aria-labelledby="legal-title"
          className="bg-gradient-to-br from-stone-900 to-stone-800 text-white p-5 rounded-2xl shadow-md"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-0.5" aria-hidden="true">
              ⚖️
            </div>
            <div>
              <h2
                id="legal-title"
                className="font-bold text-sm mb-1 text-red-200 flex items-center gap-2"
              >
                <Scale className="w-4 h-4" aria-hidden="true" />
                نکات مهم قانونی مالیات و حسابداری
              </h2>
              <p className="text-stone-300 text-xs leading-relaxed mb-3">
                در اتریش، سیستم‌های حسابداری به شدت بر پایه نرم‌افزارهای رایج
                مانند BMD و FinanzOnline تنظیم می‌شوند. آشنایی عملی با این
                ابزارها شانس استخدام شما را تا حد زیادی افزایش می‌دهد.
              </p>
              <ul className="space-y-1.5 list-none p-0 m-0">
                {[
                  'ثبت‌نام اجباری در FinanzOnline برای همه حسابداران',
                  'رعایت استاندارد UGB برای شرکت‌های تجاری',
                  'الزام گزارش‌های فصلی مالیاتی (UVA)',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[11px] text-stone-200 leading-relaxed"
                  >
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section
          id="faq"
          aria-labelledby="faq-title"
          className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80"
        >
          <h2
            id="faq-title"
            className="text-stone-900 font-extrabold text-base mb-1 flex items-center gap-2"
          >
            <Info className="w-5 h-5 text-[#b91c1c]" aria-hidden="true" />
            سوالات متداول
          </h2>
          <p className="text-stone-500 text-xs mb-5">
            پاسخ‌های کوتاه به پرتکرارترین سوالات درباره حرفه حسابداری در اتریش
          </p>

          <div className="space-y-2.5">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              const panelId = `acc-faq-panel-${i}`;
              const buttonId = `acc-faq-button-${i}`;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-[#b91c1c]/30 bg-red-50/30 shadow-sm'
                      : 'border-stone-200'
                  }`}
                >
                  <h3 className="m-0">
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b91c1c]/30"
                    >
                      <span className="flex items-center gap-3 flex-1">
                        <span
                          aria-hidden="true"
                          className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black shrink-0 transition-all ${
                            isOpen
                              ? 'bg-gradient-to-br from-[#b91c1c] to-[#7f1010] text-white'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="font-bold text-xs text-stone-900 leading-snug">
                          {faq.q}
                        </span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#b91c1c]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pr-14 text-[11px] text-stone-600 font-medium leading-relaxed border-t border-stone-100 pt-3">
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

        {/* ---------- لینک‌های داخلی (Related Content) ---------- */}
        <section
          id="related"
          aria-labelledby="related-title"
          className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80"
        >
          <h2
            id="related-title"
            className="text-stone-900 font-extrabold text-base mb-1 flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-[#b91c1c]" aria-hidden="true" />
            مطالب مرتبط در دیاکو
          </h2>
          <p className="text-stone-500 text-xs mb-5">
            راهنماهای تکمیلی برای مسیر مهاجرت و زندگی در اتریش
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {INTERNAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-start gap-3 p-3.5 rounded-xl border border-stone-200 hover:border-[#b91c1c]/40 hover:bg-red-50/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b91c1c]/30"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-[#b91c1c] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-stone-800 text-xs leading-snug mb-0.5">
                      {link.title}
                    </h3>
                    <p className="text-[10px] text-stone-500 font-medium leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                  <ArrowLeft
                    className="w-4 h-4 text-stone-300 group-hover:text-[#b91c1c] shrink-0 mt-1 transition-colors"
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section
          aria-labelledby="cta-title"
          className="p-6 rounded-2xl bg-gradient-to-l from-[#0b2933] to-[#082833] text-white"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 id="cta-title" className="font-bold text-base mb-1">
                مشاوره تخصصی برای ورود به بازار کار حسابداری اتریش
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed">
                وکلای مقیم وین دیاکو مسیر شخصی‌سازی‌شده شما را طراحی می‌کنند.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <a
                href="/assessment?utm_source=guide&utm_medium=accounting&utm_campaign=career"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#f5a623] text-[#082833] rounded-xl font-bold text-xs hover:bg-[#fbbf24] transition shrink-0"
              >
                شروع ارزیابی رایگان
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={BRAND.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-bold text-xs hover:bg-white/20 transition shrink-0"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                گفتگو در تلگرام
              </a>
            </div>
          </div>
        </section>

        {/* ---------- بازگشت ---------- */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full bg-[#b91c1c] hover:bg-red-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            بازگشت به بخش خدمات و راهنماها
          </button>
        </div>
      </main>
    </div>
  );
};

export default AccountingCareerGuide;