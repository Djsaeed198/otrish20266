import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import SEO from './SEO';
import {
  FileCheck, Home, Receipt, AlertTriangle, Scale, Building2,
  CheckCircle2, ChevronDown, ExternalLink, Clock, MapPin, Calendar,
  Info, ArrowLeft, Euro, Image as ImageIcon, BookOpen, Target,
  Phone, MessageCircle, Lightbulb, ShieldCheck, Landmark, Gavel,
  TrendingUp, Users, Calculator, Snowflake, Flame, EyeOff,
} from 'lucide-react';

/* ============================================================
   Brand Constants — اتریش‌نشین
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

const CANONICAL_URL = `${BRAND.origin}/guides/betriebskosten-austria`;

/* ============================================================
   Types
   ============================================================ */
interface AccordionItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  shortAnswer: string;
  content: string;
  bullets: string[];
}

interface CostBreakdown {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  gradient: string;
  description: string;
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

interface StepItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  duration: string;
  image: string;
  imageAlt: string;
  bullets: string[];
}

/* ============================================================
   Hero Image — LCP Optimized
   ============================================================ */
const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80',
  srcset:
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=75 800w, ' +
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=75 1200w, ' +
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80 1600w',
  alt: 'فاکتور شارژ ساختمان Betriebskosten و اجاره‌نامه اتریش روی میز با ماشین‌حساب',
  width: 1600,
  height: 900,
};

/* ============================================================
   Data
   ============================================================ */
const COST_BREAKDOWN: CostBreakdown[] = [
  {
    id: 'cold',
    label: 'اجاره سرد',
    value: 100,
    suffix: '%',
    icon: Snowflake,
    gradient: 'from-sky-600 to-blue-800',
    description: 'پایه اجاره بدون هزینه‌های جانبی (Kaltmiete)',
  },
  {
    id: 'warm',
    label: 'اجاره گرم',
    value: 42,
    suffix: '٪+',
    icon: Flame,
    gradient: 'from-red-600 to-rose-800',
    description: 'شامل Betriebskosten + Heizung + Warmwasser',
  },
  {
    id: 'hidden',
    label: 'هزینه پنهان',
    value: 15,
    suffix: '٪',
    icon: EyeOff,
    gradient: 'from-amber-600 to-orange-800',
    description: 'اقلام قابل اعتراض در فاکتور سالانه',
  },
];

const ACCORDIONS: AccordionItem[] = [
  {
    id: 'kalt-warm',
    icon: Home,
    title: 'تفاوت اجاره سرد (Kaltmiete) و گرم (Warmmiete)',
    shortAnswer:
      'اجاره سرد فقط هزینه پایه ملک است و اجاره گرم شامل Betriebskosten، Heizkosten و Warmwasser می‌شود.',
    content:
      'اجاره سرد (Kaltmiete) تنها هزینه پایه ملک است و شامل هزینه‌های جانبی نمی‌شود. اجاره گرم (Warmmiete) شامل Betriebskosten، Heizkosten (هزینه گرمایش) و Warmwasser (آب گرم) است. در اتریش معمولاً ۲۵ تا ۴۰ درصد به اجاره سرد اضافه می‌گردد تا اجاره گرم محاسبه شود.',
    bullets: [
      'Kaltmiete = فقط اجاره پایه بدون هزینه جانبی',
      'Warmmiete = Kaltmiete + Betriebskosten + Heizung',
      'تفاوت معمول: ۲۵٪ تا ۴۰٪ اجاره سرد',
    ],
  },
  {
    id: 'jahresabrechnung',
    icon: Receipt,
    title: 'بررسی فاکتور سالانه شارژ (Jahresabrechnung)',
    shortAnswer:
      'موجر موظف است حداکثر تا ۳۰ ژوئن فاکتور سالانه شارژ را ارائه کند. حق اعتراض تا ۳ ماه وجود دارد.',
    content:
      'هر ساله موجر موظف است حداکثر تا ۳۰ ژوئن فاکتور سالانه شارژ (Jahresabrechnung) را ارائه کند. جزئیات باید بر اساس MRG (قانون اجاره اتریش) شفاف باشد. در صورت مغایرت، حق اعتراض تا ۳ ماه از تاریخ دریافت فاکتور وجود دارد.',
    bullets: [
      'مهلت ارائه: حداکثر ۳۰ ژوئن هر سال',
      'حق اعتراض: تا ۳ ماه پس از دریافت فاکتور',
      'مبنای قانونی: MRG § 21 Abs 3',
    ],
  },
  {
    id: 'hidden-costs',
    icon: AlertTriangle,
    title: 'هزینه‌های پنهان و قابل اعتراض',
    shortAnswer:
      'هزینه مدیریت، سود موجر و تعمیرات اساسی نباید در Betriebskosten بیایند.',
    content:
      'اقلامی مانند هزینه تعمیرات آسانسور، نظافت راهرو و مالیات زمین (Grundsteuer) قابل شارژ هستند. اما هزینه‌های مدیریت، سود موجر و تعمیرات اساسی نباید در Betriebskosten بیایند و مشمول اعتراض شما هستند.',
    bullets: [
      'قابل شارژ: نظافت راهرو، تعمیر آسانسور، Grundsteuer',
      'غیرقابل شارژ: سود موجر، هزینه مدیریت، تعمیرات اساسی',
      'اقلام مشکوک را با AK Wien بررسی کنید',
    ],
  },
  {
    id: 'tenant-rights',
    icon: ShieldCheck,
    title: 'حق شما به عنوان مستأجر در اتریش',
    shortAnswer:
      'طبق AK Wien و MRG می‌توانید درخواست شفاف‌سازی کنید و به Schlichtungsstelle شکایت کنید.',
    content:
      'طبق AK Wien و MRG، می‌توانید درخواست شفاف‌سازی کنید. در صورت تخلف می‌توانید به Schlichtungsstelle (مرکز داوری) یا Arbeiterkammer شکایت کنید. خدمات این مراکز برای مستأجران رایگان است.',
    bullets: [
      'Schlichtungsstelle: داوری رایگان برای اختلافات اجاره',
      'Arbeiterkammer (AK): مشاوره حقوقی رایگان',
      'Mietervereinigung: اتحادیه مستأجران اتریش',
    ],
  },
];

const STEPS: StepItem[] = [
  {
    id: 'read-contract',
    icon: FileCheck,
    title: 'اجاره‌نامه را با دقت بخوانید',
    description:
      'پیش از امضا، تمام بندهای مربوط به Betriebskosten و مبلغ ماهانه را بررسی کنید.',
    duration: '۱ تا ۲ روز',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=75',
    imageAlt:
      'اجاره‌نامه اتریش و قلم روی میز — بررسی بندهای Betriebskosten پیش از امضا',
    bullets: [
      'مبلغ Kaltmiete و Betriebskosten جدا ذکر شده باشد',
      'شرط تمدید و اعتراض به فاکتور شفاف باشد',
      'شماره MRG ذکر شده باشد',
    ],
  },
  {
    id: 'register',
    icon: Building2,
    title: 'ثبت‌نام و دریافت نسخه رسمی',
    description:
      'پس از امضا، نسخه رسمی اجاره‌نامه را دریافت و نزد خود نگه دارید.',
    duration: '۳ تا ۵ روز',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=75',
    imageAlt:
      'ثبت و مهر رسمی اجاره‌نامه اتریش — مدرک قانونی برای پیگیری',
    bullets: [
      'کپی رنگی و مهرشده بگیرید',
      'در فایل شخصی نگهداری کنید',
      'برای Meldezettel استفاده کنید',
    ],
  },
  {
    id: 'review-yearly',
    icon: Receipt,
    title: 'فاکتور سالانه را بررسی کنید',
    description:
      'هر سال پس از دریافت Jahresabrechnung، تمام اقلام را با مبلغ پرداختی مقایسه کنید.',
    duration: '۲ تا ۳ هفته',
    image:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=75',
    imageAlt:
      'فاکتور شارژ سالانه Jahresabrechnung و ماشین‌حساب — بررسی دقیق اقلام',
    bullets: [
      'تاریخ فاکتور را بررسی کنید',
      'اقلام مشکوک را علامت بزنید',
      'در صورت نیاز به AK مراجعه کنید',
    ],
  },
  {
    id: 'object',
    icon: Gavel,
    title: 'در صورت لزوم اعتراض رسمی کنید',
    description:
      'ظرف ۳ ماه پس از دریافت فاکتور، اعتراض کتبی خود را ثبت کنید.',
    duration: '۱ تا ۳ ماه',
    image:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=75',
    imageAlt:
      'اعتراض کتبی به فاکتور شارژ — دادگاه و مرکز داوری Schlichtungsstelle اتریش',
    bullets: [
      'اعتراض به‌صورت کتبی و با پست سفارشی',
      'نگهداری کپی از تمام مکاتبات',
      'در صورت نیاز وکیل استخدام کنید',
    ],
  },
];

const GALLERY: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=75',
    alt: 'فاکتور شارژ ساختمان اتریش و اسناد مالی روی میز',
    caption: 'فاکتورهای شارژ سالانه',
    width: 600,
    height: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=75',
    alt: 'ساختمان آپارتمانی مدرن در وین اتریش با نمای کلاسیک',
    caption: 'آپارتمان‌های اجاره‌ای وین',
    width: 600,
    height: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=75',
    alt: 'کتاب قانون MRG و چکش قاضی — حق اعتراض مستأجر',
    caption: 'قانون اجاره اتریش (MRG)',
    width: 600,
    height: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=600&q=75',
    alt: 'محاسبه هزینه‌های جانبی با ماشین‌حساب و لپ‌تاپ',
    caption: 'محاسبه Betriebskosten',
    width: 600,
    height: 400,
  },
];

const FAQS: FAQEntry[] = [
  {
    q: 'Betriebskosten در اتریش شامل چه هزینه‌هایی است؟',
    a: 'Betriebskosten شامل هزینه‌های مشترک ساختمان مانند نظافت راهرو، تعمیر آسانسور، بیمه ساختمان، مالیات زمین (Grundsteuer)، هزینه آب و فاضلاب مشترک، و هزینه مدیریت ساختمان است. اقلام دقیق باید در اجاره‌نامه یا فاکتور سالانه ذکر شده باشند.',
  },
  {
    q: 'آیا می‌توانم به فاکتور Jahresabrechnung اعتراض کنم؟',
    a: 'بله. طبق MRG، شما تا ۳ ماه پس از دریافت فاکتور سالانه حق اعتراض دارید. اعتراض باید کتبی و با ذکر دلایل باشد. می‌توانید از مشاوره رایگان Arbeiterkammer (AK) یا Mietervereinigung استفاده کنید.',
  },
  {
    q: 'چگونه بفهمم Betriebskosten من منصفانه است؟',
    a: 'مبلغ Betriebskosten معمولاً بین ۲۵ تا ۴۰ درصد Kaltmiete است. اگر مبلغ بیشتر باشد، می‌توانید درخواست شفاف‌سازی کنید. مقایسه با آپارتمان‌های مشابه در همان منطقه نیز مفید است.',
  },
  {
    q: 'آیا هزینه مدیریت ساختمان قابل شارژ است؟',
    a: 'خیر. طبق MRG § 21، هزینه مدیریت (Verwaltungskosten) و سود موجر نباید در Betriebskosten بیایند. این اقلام را می‌توانید اعتراض کنید و در صورت نیاز به Schlichtungsstelle شکایت کنید.',
  },
  {
    q: 'Schlichtungsstelle چه کمکی می‌کند؟',
    a: 'Schlichtungsstelle یک مرکز داوری رسمی در اتریش است که اختلافات بین موجر و مستأجر را بررسی می‌کند. خدمات آن رایگان است و می‌تواند در کاهش هزینه‌های غیرقانونی Betriebskosten بسیار مؤثر باشد.',
  },
  {
    q: 'چقدر طول می‌کشد تا اعتراض من بررسی شود؟',
    a: 'بسته به پیچیدگی پرونده، بررسی از ۲ تا ۶ ماه طول می‌کشد. اگر از Schlichtungsstelle استفاده کنید، معمولاً سریع‌تر است. در موارد پیچیده، استخدام یک وکیل متخصص اجاره توصیه می‌شود.',
  },
];

const INTERNAL_LINKS: InternalLink[] = [
  {
    href: '/guides/100-days-austria',
    title: 'راهنمای ۱۰۰ روز اول در اتریش',
    description: 'چک‌لیست اقدامات قانونی پس از ورود',
    icon: Clock,
  },
  {
    href: '/guides/migration-austria',
    title: 'راهنمای جامع مهاجرت به اتریش',
    description: 'مقایسه ۶ مسیر رسمی مهاجرتی',
    icon: BookOpen,
  },
  {
    href: '/guides/financial-austria',
    title: 'تمکن مالی اتریش',
    description: 'اقامت بدون نیاز به کارفرما',
    icon: Landmark,
  },
  {
    href: '/guides/accounting-career-austria',
    title: 'حسابداری در اتریش',
    description: 'شغل و مدارک Buchhalter',
    icon: Calculator,
  },
  {
    href: '/assessment',
    title: 'ارزیابی رایگان شانس ویزا',
    description: 'سنجش هوشمند پرونده مهاجرتی',
    icon: Target,
  },
  {
    href: '/contact',
    title: 'مشاوره با وکلای مقیم وین',
    description: 'تماس مستقیم با تیم دیاکو',
    icon: Phone,
  },
];

const TOC = [
  { id: 'intro', label: 'Betriebskosten چیست؟' },
  { id: 'breakdown', label: 'تفکیک هزینه‌ها' },
  { id: 'steps', label: 'گام‌های عملی' },
  { id: 'rights', label: 'حقوق و نکات کلیدی' },
  { id: 'gallery', label: 'گالری تصاویر' },
  { id: 'faq', label: 'سوالات متداول' },
  { id: 'related', label: 'مطالب مرتبط' },
];

/* ============================================================
   Helpers — کانتر انیمیت با احترام به prefers-reduced-motion
   ============================================================ */
function useCounter(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (prefersReduced) {
      setValue(target);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * ease));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration, prefersReduced]);

  return { value, ref };
}

/* ============================================================
   Component
   ============================================================ */
const BetriebskostenGuide: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrollY, setScrollY] = useState(0);
  const prefersReduced = useReducedMotion();

  /* ---------- پارالاکس بهینه (فقط transform، با requestAnimationFrame) ---------- */
  useEffect(() => {
    if (prefersReduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [prefersReduced]);

  /* ---------- سئوی داینامیک ---------- */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.DiacoSEO) return;

    /* Title: ۵۵ کاراکتر | Description: ۱۵۸ کاراکتر */
    window.DiacoSEO.set({
      title: 'شارژ ساختمان Betriebskosten اتریش ۲۰۲۶ | راهنمای دیاکو',
      description:
        'راهنمای کامل Betriebskosten اتریش: تفاوت Kaltmiete و Warmmiete، بررسی Jahresabrechnung، هزینه‌های پنهان و حقوق مستأجر طبق MRG و AK Wien.',
      keywords:
        'Betriebskosten, اجاره سرد, اجاره گرم, Kaltmiete, Warmmiete, Jahresabrechnung, MRG, AK Wien, شارژ ساختمان اتریش, مستأجر اتریش, Schlichtungsstelle, Mietervereinigung',
      url: '/guides/betriebskosten-austria',
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
          name: 'شارژ ساختمان Betriebskosten اتریش ۲۰۲۶ | راهنمای دیاکو',
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
          headline: 'راهنمای شارژ ساختمان (Betriebskosten) در اتریش ۲۰۲۶',
          description:
            'راهنمای کامل Betriebskosten شامل تفاوت Kaltmiete و Warmmiete، بررسی Jahresabrechnung، هزینه‌های پنهان و حقوق قانونی مستأجر.',
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
          datePublished: '2025-01-20T08:00:00+03:30',
          dateModified: new Date().toISOString(),
          mainEntityOfPage: CANONICAL_URL,
          inLanguage: 'fa-IR',
          articleSection: 'زندگی در اتریش',
          keywords:
            'Betriebskosten, Kaltmiete, Warmmiete, Jahresabrechnung, MRG, AK Wien, مستأجر اتریش',
          about: [
            { '@type': 'Thing', name: 'Betriebskosten' },
            { '@type': 'Thing', name: 'اجاره در اتریش' },
            { '@type': 'Thing', name: 'MRG' },
            { '@type': 'Thing', name: 'حقوق مستأجر' },
          ],
        },
        {
          '@type': 'HowTo',
          '@id': `${CANONICAL_URL}#howto`,
          name: 'راهنمای گام‌به‌گام بررسی Betriebskosten در اتریش',
          description:
            'چهار گام عملی برای بررسی و اعتراض به فاکتور شارژ ساختمان.',
          image: HERO_IMAGE.src,
          totalTime: 'P3M',
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'EUR',
            value: '0',
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
              name: 'راهنمای زندگی در اتریش',
              item: `${BRAND.origin}/guides`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Betriebskosten',
              item: CANONICAL_URL,
            },
          ],
        },
        {
          '@type': 'ImageGallery',
          '@id': `${CANONICAL_URL}#gallery`,
          name: 'گالری تصاویر شارژ ساختمان در اتریش',
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

  /* ---------- کانترها ---------- */
  const warmCounter = useCounter(42);
  const coldCounter = useCounter(100);
  const hiddenCounter = useCounter(15);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-stone-50 via-red-50/20 to-stone-50 relative overflow-hidden"
      dir="rtl"
      itemScope
      itemType="https://schema.org/Article"
    >
      <SEO
        title="شارژ ساختمان Betriebskosten اتریش ۲۰۲۶ | راهنمای دیاکو"
        description="راهنمای کامل Betriebskosten اتریش: تفاوت Kaltmiete و Warmmiete، بررسی Jahresabrechnung، هزینه‌های پنهان و حقوق مستأجر طبق MRG و AK Wien."
        keywords="Betriebskosten, اجاره سرد, اجاره گرم, Kaltmiete, Warmmiete, Jahresabrechnung, MRG, AK Wien, شارژ ساختمان اتریش"
        canonical={CANONICAL_URL}
      />

      {/* پارالاکس تزئینی (بدون jank) */}
      {!prefersReduced && (
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-96 h-96 opacity-[0.04] pointer-events-none"
          style={{
            transform: `translate3d(0, ${scrollY * 0.15}px, 0)`,
            willChange: 'transform',
          }}
        >
          <div className="w-full h-1/3 bg-red-600" />
          <div className="w-full h-1/3 bg-white" />
          <div className="w-full h-1/3 bg-red-600" />
        </div>
      )}

      {/* ============================================================
          HERO — Featured Image + H1
         ============================================================ */}
      <header className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
        {/* Breadcrumb */}
        <nav aria-label="مسیر صفحه" className="mb-4">
          <ol className="flex items-center gap-2 text-[10px] font-bold text-stone-500 list-none p-0 m-0">
            <li>
              <a href="/" className="hover:text-red-700 transition-colors">
                خانه
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href="/guides" className="hover:text-red-700 transition-colors">
                راهنماها
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-stone-800">Betriebskosten</li>
          </ol>
        </nav>

        {/* Featured Image with Overlay H1 */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl mb-8 aspect-[16/9] bg-stone-200">
          <img
            src={HERO_IMAGE.src}
            srcSet={HERO_IMAGE.srcset}
            sizes="(max-width: 896px) 100vw, 896px"
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
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full mb-3">
              🇦🇹 Austria · Österreich
            </span>
            <h1
              id="guide-title"
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-2"
              itemProp="headline"
            >
              راهنمای شارژ ساختمان (Betriebskosten) در اتریش
            </h1>
            <p
              className="text-white/90 text-xs sm:text-sm leading-relaxed max-w-2xl"
              itemProp="description"
            >
              تفاوت Kaltmiete و Warmmiete، بررسی Jahresabrechnung،
              هزینه‌های پنهان و حقوق قانونی مستأجر طبق MRG و AK Wien
            </p>

            {/* Article meta */}
            <ul
              className="flex flex-wrap items-center gap-4 mt-4 text-[10px] font-bold text-white/80 list-none p-0 m-0"
              aria-label="اطلاعات مقاله"
            >
              <li className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <time dateTime="2025-01-20" itemProp="datePublished">
                  به‌روزرسانی: ۱۴۰۴
                </time>
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                زمان مطالعه: ۷ دقیقه
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                ویژه اتریش
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* ============================================================
          TOC — Sticky
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
              className="px-3 py-1.5 rounded-full text-[11px] font-bold text-stone-600 hover:bg-red-50 hover:text-red-700 transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ============================================================
          MAIN
         ============================================================ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-5">
        {/* ---------- Intro ---------- */}
        <section
          id="intro"
          aria-labelledby="intro-title"
          className="bg-white/80 backdrop-blur-sm border border-stone-200 rounded-2xl p-5 sm:p-8 shadow-sm hover:shadow-md hover:border-red-200 transition-all"
        >
          <h2
            id="intro-title"
            className="text-lg sm:text-xl font-black text-stone-900 mb-3 flex items-center gap-2"
          >
            <span
              className="w-2 h-6 bg-red-600 rounded-full"
              aria-hidden="true"
            />
            Betriebskosten چیست؟
          </h2>
          <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
            Betriebskosten یا هزینه‌های جانبی ساختمان، مبلغی است که مستأجر
            در اتریش علاوه بر اجاره پایه پرداخت می‌کند. این هزینه‌ها شامل
            خدمات مشترک ساختمان، نگهداری، بیمه و مالیات‌های مربوطه است.
            شناخت دقیق این اقلام به شما کمک می‌کند از پرداخت هزینه‌های
            غیرقانونی جلوگیری کنید.
          </p>
        </section>

        {/* ---------- Cost Breakdown — Animated Counters ---------- */}
        <section
          id="breakdown"
          aria-labelledby="breakdown-title"
          className="space-y-3"
        >
          <h2
            id="breakdown-title"
            className="text-lg sm:text-xl font-black text-stone-900 flex items-center gap-2"
          >
            <Calculator
              className="w-5 h-5 text-red-600"
              aria-hidden="true"
            />
            تفکیک هزینه‌های اجاره در اتریش
          </h2>
          <p className="text-stone-500 text-xs mb-4">
            نسبت‌های معمول در بازار اجاره اتریش (۲۰۲۶)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { ...COST_BREAKDOWN[0], ref: coldCounter.ref, value: coldCounter.value },
              { ...COST_BREAKDOWN[1], ref: warmCounter.ref, value: warmCounter.value },
              { ...COST_BREAKDOWN[2], ref: hiddenCounter.ref, value: hiddenCounter.value },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  ref={s.ref}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.gradient} p-4 sm:p-5 text-white shadow-lg hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon
                      className="w-5 h-5 opacity-90"
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-bold opacity-75">
                      {s.suffix}
                    </span>
                  </div>
                  <div
                    className="text-2xl sm:text-3xl font-black tabular-nums"
                    aria-label={`${s.label}: ${s.value}`}
                  >
                    {s.value}
                    <span className="text-base sm:text-lg opacity-75">
                      {s.suffix}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs mt-1.5 opacity-90 font-bold">
                    {s.label}
                  </div>
                  <p className="text-[10px] mt-1 opacity-75 leading-relaxed">
                    {s.description}
                  </p>
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/10 rounded-full"
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- Steps ---------- */}
        <section
          id="steps"
          aria-labelledby="steps-title"
          className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80"
        >
          <h2
            id="steps-title"
            className="text-lg sm:text-xl font-black text-stone-900 mb-1 flex items-center gap-2"
          >
            <span
              className="w-2 h-6 bg-red-600 rounded-full"
              aria-hidden="true"
            />
            گام‌های عملی برای بررسی Betriebskosten
          </h2>
          <p className="text-stone-500 text-xs mb-5">
            ۴ گام از امضای اجاره‌نامه تا اعتراض رسمی در صورت لزوم
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
                    <span className="absolute top-3 right-3 bg-white/95 text-red-700 text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                      گام {i + 1}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
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

        {/* ---------- Accordion (Rights & Tips) ---------- */}
        <section
          id="rights"
          aria-labelledby="rights-title"
          className="space-y-3"
        >
          <h2
            id="rights-title"
            className="text-lg sm:text-xl font-black text-stone-900 flex items-center gap-2"
          >
            <span
              className="w-2 h-6 bg-red-600 rounded-full"
              aria-hidden="true"
            />
            نکات کلیدی و حقوق شما
          </h2>
          <p className="text-stone-500 text-xs mb-4">
            ۴ موضوع اساسی که هر مستأجر باید بداند
          </p>

          {ACCORDIONS.map((item, idx) => {
            const Icon = item.icon;
            const isOpen = activeAccordion === idx;
            const panelId = `acc-panel-${item.id}`;
            const buttonId = `acc-button-${item.id}`;
            return (
              <div
                key={item.id}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-red-300 shadow-lg shadow-red-100/60'
                    : 'border-stone-200 hover:border-red-200'
                }`}
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setActiveAccordion(isOpen ? -1 : idx)
                    }
                    className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-right hover:bg-stone-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40"
                  >
                    <span className="flex items-center gap-3 flex-1">
                      <span
                        aria-hidden="true"
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-red-600 text-white'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="font-bold text-stone-800 text-sm sm:text-base">
                        {item.title}
                      </span>
                    </span>
                    <ChevronDown
                      className={`shrink-0 w-4 h-4 text-stone-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-red-600' : ''
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
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-stone-100 pt-4">
                        <p className="text-stone-700 text-sm leading-relaxed mb-3 font-medium">
                          {item.shortAnswer}
                        </p>
                        <p className="text-stone-600 text-[12px] leading-relaxed mb-3">
                          {item.content}
                        </p>
                        <ul className="space-y-1.5 list-none p-0 m-0">
                          {item.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-[11px] text-stone-600 leading-relaxed"
                            >
                              <CheckCircle2
                                className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </section>

        {/* ---------- Gallery ---------- */}
        <section
          id="gallery"
          aria-labelledby="gallery-title"
          className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80"
        >
          <h2
            id="gallery-title"
            className="text-lg sm:text-xl font-black text-stone-900 mb-1 flex items-center gap-2"
          >
            <ImageIcon className="w-5 h-5 text-red-600" aria-hidden="true" />
            گالری تصاویر
          </h2>
          <p className="text-stone-500 text-xs mb-5">
            تصاویر مرتبط با اجاره، شارژ ساختمان و حقوق مستأجر در اتریش
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

        {/* ---------- FAQ ---------- */}
        <section
          id="faq"
          aria-labelledby="faq-title"
          className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80"
        >
          <h2
            id="faq-title"
            className="text-lg sm:text-xl font-black text-stone-900 mb-1 flex items-center gap-2"
          >
            <Info className="w-5 h-5 text-red-600" aria-hidden="true" />
            سوالات متداول
          </h2>
          <p className="text-stone-500 text-xs mb-5">
            پاسخ‌های کوتاه به پرتکرارترین سوالات درباره Betriebskosten
          </p>

          <div className="space-y-2.5">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-red-300 bg-red-50/30 shadow-sm'
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
                      className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/30"
                    >
                      <span className="flex items-center gap-3 flex-1">
                        <span
                          aria-hidden="true"
                          className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black shrink-0 transition-all ${
                            isOpen
                              ? 'bg-gradient-to-br from-red-600 to-red-800 text-white'
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
                          isOpen ? 'rotate-180 text-red-600' : ''
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

        {/* ---------- Info Box — AK Wien / Mietervereinigung ---------- */}
        <section
          aria-labelledby="help-title"
          className="relative bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-6 sm:p-8 text-white overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-red-600/20 blur-2xl"
          />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div
                aria-hidden="true"
                className="w-8 h-8 rounded-lg overflow-hidden flex flex-col"
              >
                <div className="flex-1 bg-red-600" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-red-600" />
              </div>
              <h2 id="help-title" className="font-black text-lg">
                آیا فاکتور شارژ شما مشکوک است؟
              </h2>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed mb-4">
              در اتریش می‌توانید به‌صورت رایگان از مشاوره{' '}
              <span className="text-red-400 font-bold">
                Arbeiterkammer (AK)
              </span>{' '}
              و{' '}
              <span className="text-red-400 font-bold">
                Mietervereinigung
              </span>{' '}
              استفاده کنید. بررسی فاکتور سالانه حق قانونی شماست.
            </p>
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
              {[
                'MRG',
                'AK Wien',
                'Schlichtungsstelle',
                'Mietervereinigung',
              ].map((tag) => (
                <li key={tag}>
                  <span className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-red-600 hover:border-red-600 transition-colors cursor-default">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Internal Links ---------- */}
        <section
          id="related"
          aria-labelledby="related-title"
          className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80"
        >
          <h2
            id="related-title"
            className="text-lg sm:text-xl font-black text-stone-900 mb-1 flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-red-600" aria-hidden="true" />
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
                  className="group flex items-start gap-3 p-3.5 rounded-xl border border-stone-200 hover:border-red-400/50 hover:bg-red-50/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/30"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
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
                    className="w-4 h-4 text-stone-300 group-hover:text-red-600 shrink-0 mt-1 transition-colors"
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
                مشاوره تخصصی برای پرونده اجاره در اتریش
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed">
                وکلای مقیم وین دیاکو در بررسی فاکتور شارژ و حقوق مستأجر
                کنار شما هستند.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <a
                href="/assessment?utm_source=guide&utm_medium=betriebskosten&utm_campaign=legal"
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

        {/* ---------- Back Button ---------- */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            بازگشت به بخش خدمات و راهنماها
          </button>
        </div>
      </main>
    </div>
  );
};

export default BetriebskostenGuide;