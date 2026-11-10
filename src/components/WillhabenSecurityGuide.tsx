import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield, Sparkles, CheckCircle2, XCircle, ChevronDown, HelpCircle,
  AlertTriangle, BadgeCheck, ArrowLeft, Star, MessageCircle, Send,
  Coins, Wallet, CreditCard, Building2, Phone, MapPin, Eye,
  Lock, AlertCircle, Siren, UserCheck, Package, Truck, FileText,
  Camera, Image as ImageIcon, Mail, Globe, Scale, TrendingUp,
  Users, Clock, Zap, Info, Landmark, Ban, Fingerprint, Key
} from "lucide-react";
import SEO from "./SEO";

/* ============================================================
   تصاویر ویژه — Unsplash
============================================================ */
const IMG_HERO =
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80";
// خرید آنلاین از موبایل
const IMG_PHONE =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80";
// کاربر در حال چت با فروشنده
const IMG_DELIVERY =
  "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80";
// بسته‌بندی و ارسال امن

/* ============================================================
   آمار کلیدی
============================================================ */
const STATS = [
  { icon: Users, v: "۴.۵M", l: "کاربر فعال ماهانه Willhaben" },
  { icon: Siren, v: "۳٬۰۰۰+", l: "پرونده کلاهبرداری سالانه" },
  { icon: Coins, v: "~۴۵۰€", l: "میانگین خسارت قربانیان" },
  { icon: Shield, v: "٪۹۵", l: "قابل پیشگیری با PayLivery" },
];

/* ============================================================
   ۸ کلاهبرداری رایج در Willhaben
============================================================ */
const SCAM_PATTERNS = [
  {
    icon: CreditCard,
    title: "درخواست پرداخت خارج از PayLivery",
    desc: "فروشنده می‌گوید «PayLivery کارمزد دارد، مستقیم به حساب من واریز کن». این کلاسیک‌ترین کلاهبرداری Willhaben است.",
    redFlags: [
      "اصرار روی واریز مستقیم بانکی",
      "بهانه کارمزد یا تأخیر PayLivery",
      "ارائه IBAN به‌جای لینک رسمی",
    ],
    danger: "critical",
  },
  {
    icon: Globe,
    title: "فروشنده خارج از اتریش",
    desc: "آگهی از خارج اتریش با قیمت بسیار پایین. کالا هرگز ارسال نمی‌شود یا کالای تقلبی ارسال می‌گردد.",
    redFlags: [
      "آدرس فروشنده در کشور دیگر",
      "ارسال فقط از طریق پست بین‌المللی",
      "قیمت ۵۰٪+ پایین‌تر از بازار",
    ],
    danger: "high",
  },
  {
    icon: Phone,
    title: "کلاهبرداری تلفنی (Vishing)",
    desc: "تماس تلفنی از طرف «بانک» یا «PayLivery» و درخواست کد تأیید SMS برای لغو تراکنش یا احراز هویت.",
    redFlags: [
      "تماس غیرمنتظره از بانک",
      "درخواست کد SMS (Tan-Code)",
      "عجله و تهدید لغو حساب",
    ],
    danger: "critical",
  },
  {
    icon: Package,
    title: "کالای تقلبی برند (Fälschung)",
    desc: "لباس، کیف یا ساعت برند معروف با قیمت وسوسه‌کننده. پس از دریافت، مشخص می‌شود جعلی است.",
    redFlags: [
      "قیمت زیر ۳۰٪ قیمت اصلی",
      "عدم ارائه فاکتور خرید",
      "عکس‌های گوگل‌شده (Search by image)",
    ],
    danger: "high",
  },
  {
    icon: Truck,
    title: "فروشنده «ارسال فوری» (Vorkasse)",
    desc: "فروشنده اصرار دارد قبل از ارسال، پول کامل واریز شود. پس از واریز، حساب کاربری حذف می‌شود.",
    redFlags: [
      "اصرار روی پیش‌پرداخت ۱۰۰٪",
      "فروشنده تازه‌وارد (بدون امتیاز)",
      "فشار زمانی برای تصمیم سریع",
    ],
    danger: "critical",
  },
  {
    icon: Fingerprint,
    title: "فیشینگ با لینک جعلی PayLivery",
    desc: "ارسال لینک به ظاهر PayLivery اما در واقع صفحه جعلی که اطلاعات بانکی شما را می‌دزدد.",
    redFlags: [
      "لینک با دامنه مشکوک (paylivery-wien.com)",
      "درخواست ورود مجدد به حساب",
      "URL بدون HTTPS یا با گواهی نامعتبر",
    ],
    danger: "critical",
  },
  {
    icon: Camera,
    title: "آگهی خودرو با قیمت غیرواقعی",
    desc: "خودرو با قیمت بسیار پایین و داستان احساسی (طلاق، مهاجرت، بیماری). درخواست پیش‌پرداخت برای بازدید.",
    redFlags: [
      "قیمت ۴۰٪+ پایین‌تر از بازار",
      "داستان احساسی و اورژانسی",
      "عدم امکان بازدید حضوری",
    ],
    danger: "high",
  },
  {
    icon: Building2,
    title: "کلاهبرداری اجاره مسکن",
    desc: "آگهی آپارتمان زیبا با قیمت مناسب. صاحبخانه «در خارج از کشور» است و درخواست ودیعه از راه دور می‌کند.",
    redFlags: [
      "صاحبخانه در خارج اتریش",
      "درخواست واریز بدون بازدید",
      "عجله برای بستن قرارداد",
    ],
    danger: "critical",
  },
];

/* ============================================================
   چک‌لیست ۱۰ مرحله‌ای خرید امن
============================================================ */
const SAFETY_CHECKLIST = [
  { icon: Eye, t: "بررسی پروفایل فروشنده", d: "تاریخ عضویت، امتیاز (Bewertungen) و تعداد معاملات قبلی را ببینید." },
  { icon: ImageIcon, t: "تطبیق عکس با گوگل", d: "عکس آگهی را در Google Images جست‌وجو کنید — اگر در سایت‌های دیگر هم بود، مشکوک است." },
  { icon: Lock, t: "استفاده از PayLivery", d: "همیشه از سیستم پرداخت رسمی Willhaben استفاده کنید. هرگز خارج از پلتفرم." },
  { icon: MessageCircle, t: "چت فقط در Willhaben", d: "از انتقال مکالمه به WhatsApp یا Telegram خودداری کنید — مدرک از دست می‌رود." },
  { icon: MapPin, t: "بازدید حضوری", d: "برای کالاهای گران (خودرو، مبلمان) حتماً بازدید حضوری در مکان عمومی انجام دهید." },
  { icon: UserCheck, t: "احراز هویت فروشنده", d: "درخواست کارت شناسایی یا شماره تماس ثابت زمینی برای معاملات بزرگ." },
  { icon: FileText, t: "دریافت فاکتور رسمی", d: "برای کالاهای گران، فاکتور خرید با مشخصات کامل دریافت کنید." },
  { icon: Wallet, t: "پرداخت مرحله‌ای", d: "برای معاملات بزرگ، پیش‌پرداخت ۳۰٪ و مانده پس از تحویل — مگر با PayLivery." },
  { icon: AlertCircle, t: "گوش دادن به غریزه", d: "اگر چیزی «خیلی خوب به نظر می‌رسد که واقعی باشد»، معمولاً کلاهبرداری است." },
  { icon: Siren, t: "گزارش تخلف", d: "در صورت شک، آگهی را در Willhaben گزارش دهید و در صورت کلاهبرداری به پلیس (Polizei) اطلاع دهید." },
];

/* ============================================================
   مقایسه PayLivery با پرداخت مستقیم
============================================================ */
const COMPARISON = [
  { feature: "محافظت از خریدار در صورت عدم ارسال", paylivery: "✅ ۱۰۰٪", direct: "❌" },
  { feature: "بازپرداخت در صورت کالای تقلبی", paylivery: "✅ پشتیبانی", direct: "❌" },
  { feature: "نیاز به افشای اطلاعات بانکی", paylivery: "❌", direct: "✅ (خطرناک)" },
  { feature: "هزینه اضافی برای خریدار", paylivery: "۱-۳٪ کارمزد", direct: "رایگان" },
  { feature: "رسید رسمی و قابل پیگیری", paylivery: "✅", direct: "❌" },
  { feature: "امکان شکایت و بازگشت وجه", paylivery: "✅ رسمی", direct: "❌ غیرممکن" },
  { feature: "مدت زمان واریز به فروشنده", paylivery: "پس از تأیید دریافت", direct: "فوری" },
];

/* ============================================================
   مراحل خرید امن
============================================================ */
const STEPS = [
  {
    icon: Eye,
    t: "ارزیابی آگهی",
    d: "قیمت، عکس و پروفایل فروشنده را با احتیاط بررسی کنید. به آگهی‌های «خیلی ارزان» شک کنید.",
  },
  {
    icon: MessageCircle,
    t: "ارتباط امن",
    d: "فقط از چت داخلی Willhaben استفاده کنید. اطلاعات شخصی کم بدهید.",
  },
  {
    icon: Lock,
    t: "پرداخت از PayLivery",
    d: "همیشه از سیستم امن Willhaben پرداخت کنید. اگر فروشنده مخالفت کرد، معامله را رها کنید.",
  },
  {
    icon: Truck,
    t: "پیگیری ارسال",
    d: "کد رهگیری ارسال را درخواست کنید. تا دریافت کالا، تراکنش را در PayLivery تأیید نکنید.",
  },
  {
    icon: Star,
    t: "ارزیابی فروشنده",
    d: "پس از دریافت کالا، تجربه خود را به اشتراک بگذارید تا جامعه فارسی‌زبان محافظت شود.",
  },
];

/* ============================================================
   سوالات متداول
============================================================ */
const FAQS = [
  {
    q: "PayLivery چیست و چطور کار می‌کند؟",
    a: "PayLivery سیستم پرداخت امن رسمی Willhaben است. خریدار مبلغ را به حساب واسط Willhaben واریز می‌کند، فروشنده کالا را ارسال می‌کند و پس از تأیید دریافت توسط خریدار، مبلغ به فروشنده آزاد می‌شود. این سیستم، دو طرف را از کلاهبرداری محافظت می‌کند. کارمزد آن ۱ تا ۳ درصد مبلغ معامله است.",
  },
  {
    q: "اگر فروشنده از پرداخت مستقیم اصرار داشت، چه کنم؟",
    a: "قاطعانه رد کنید. هیچ بهانه‌ای برای پرداخت خارج از PayLivery قابل قبول نیست. اگر فروشنده می‌گوید «PayLivery کارمزد دارد»، پیشنهاد دهید کارمزد را خودتان بپردازید — هرگز واریز مستقیم به حساب شخصی انجام ندهید. این کلاسیک‌ترین و پرهزینه‌ترین کلاهبرداری Willhaben است.",
  },
  {
    q: "اگر کالای تقلبی دریافت کردم، چه اقدامی کنم؟",
    a: "سه مرحله: ۱) در PayLivery تراکنش را تأیید نکنید و سریعاً اعتراض (Reklamation) ثبت کنید. ۲) به پشتیبانی Willhaben از طریق بخش Hilfe کتبی شکایت دهید. ۳) اگر مبلغ قابل توجه است (بالای ۵۰۰ یورو)، شکایت رسمی به Polizei اتریش (Anzeige) ثبت کنید. مدارک چت و عکس کالا را نگه دارید.",
  },
  {
    q: "چطور بفهمم فروشنده معتبر است؟",
    a: "پنج معیار کلیدی: ۱) تاریخ عضویت — حداقل ۶ ماه. ۲) امتیاز (Bewertungen) — بالای ۴ از ۵. ۳) تعداد معاملات قبلی — حداقل ۵ معامله موفق. ۴) پاسخ‌دهی سریع و محترمانه در چت. ۵) ارائه اطلاعات کامل در توضیحات آگهی. اگر هر یک از این معیارها ضعیف بود، احتیاط کنید.",
  },
  {
    q: "آیا در Willhaben می‌توان از PayPal استفاده کرد؟",
    a: "PayPal در Willhaben رسمیت ندارد و مورد توصیه نیست. دلیل: PayPal Friends & Family هیچ محافظتی ندارد و Only Goods & Services نیز ممکن است در اتریش قابل پیگیری نباشد. تنها PayLivery به‌عنوان سیستم رسمی Willhaben حمایت کامل قانونی و بازپرداخت ارائه می‌دهد.",
  },
  {
    q: "برای خرید خودرو از Willhaben چه نکات خاصی هست؟",
    a: "خودروهای Willhaben پرریسک‌ترین دسته هستند: ۱) فقط حضوری در مکان عمومی (نه آدرس خصوصی). ۲) بررسی شماره شاسی (VIN) با سیستم Ankaufstest. ۳) بررسی Pickerl معتبر (§57a). ۴) انتقال مالکیت رسمی در Zulassungsstelle. ۵) عدم پرداخت ودیعه قبل از بازدید فیزیکی. ۶) برای واردات، بررسی عدم وجود بدهی یا رهن (Pfand).",
  },
  {
    q: "چطور کلاهبرداری را به پلیس اتریش گزارش کنم؟",
    a: "شکایت را می‌توانید به سه روش ثبت کنید: ۱) حضوری در نزدیک‌ترین پلیس (Polizeiinspektion). ۲) آنلاین از طریق پورتال Polizei.gv.at. ۳) از طریق سامانه Anzeige در سایت Watchlist Internet اتریش. مدارک لازم: تمام چت‌ها، فیش پرداخت، عکس آگهی و اطلاعات فروشنده. برای فارسی‌زبانان، درخواست مترجم رسمی (Dolmetscher) رایگان است.",
  },
];

/* ============================================================
   کامپوننت اصلی
============================================================ */
const WillhabenSecurityGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /* ماشین‌حساب خطر آگهی */
  const [priceTooLow, setPriceTooLow] = useState<boolean>(false);
  const [newSeller, setNewSeller] = useState<boolean>(false);
  const [outsidePaylivery, setOutsidePaylivery] = useState<boolean>(false);
  const [foreignSeller, setForeignSeller] = useState<boolean>(false);
  const [urgencyPressure, setUrgencyPressure] = useState<boolean>(false);

  const scamRisk = useMemo(() => {
    let score = 0;
    if (priceTooLow) score += 25;
    if (newSeller) score += 20;
    if (outsidePaylivery) score += 30;
    if (foreignSeller) score += 15;
    if (urgencyPressure) score += 10;

    let level = "safe";
    let label = "کم‌خطر";
    let color = "emerald";
    let advice = "این آگهی نشانه‌های کلاسیک کلاهبرداری را ندارد. اما همیشه از PayLivery استفاده کنید.";

    if (score >= 70) {
      level = "critical";
      label = "خطر بسیار بالا — کلاهبرداری محتمل";
      color = "rose";
      advice = "به احتمال زیاد این یک کلاهبرداری است. معامله را رها کنید و آگهی را گزارش دهید.";
    } else if (score >= 45) {
      level = "high";
      label = "خطر بالا";
      color = "orange";
      advice = "چند علامت هشدار جدی وجود دارد. فقط با PayLivery معامله کنید و به هیچ وجه واریز مستقیم انجام ندهید.";
    } else if (score >= 20) {
      level = "medium";
      label = "خطر متوسط";
      color = "amber";
      advice = "احتیاط کنید. بازدید حضوری، بررسی دقیق فروشنده و استفاده از PayLivery ضروری است.";
    }

    return { score, level, label, color, advice };
  }, [priceTooLow, newSeller, outsidePaylivery, foreignSeller, urgencyPressure]);

  /* ---------- Schema JSON-LD ---------- */
  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HowTo",
          name: "نحوه خرید امن از Willhaben (اتریش) و پیشگیری از کلاهبرداری",
          description:
            "راهنمای گام‌به‌گام خرید امن از پلتفرم Willhaben در اتریش، با استفاده از PayLivery و شناسایی کلاهبرداری‌های رایج.",
          totalTime: "PT15M",
          step: STEPS.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.t,
            text: s.d,
          })),
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
          "@type": "ItemList",
          name: "کلاهبرداری‌های رایج در Willhaben",
          numberOfItems: SCAM_PATTERNS.length,
          itemListElement: SCAM_PATTERNS.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            description: s.desc,
          })),
        },
        {
          "@type": "WebPage",
          name: "راهنمای امنیت Willhaben",
          description:
            "راهنمای جامع خرید و فروش امن در Willhaben اتریش، شامل PayLivery، شناسایی کلاهبرداری و ماشین‌حساب خطر آگهی.",
          inLanguage: "fa-IR",
          audience: {
            "@type": "Audience",
            audienceType: "Persian-speaking residents in Austria",
          },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "خانه", item: "https://otrish-iran.ir" },
            { "@type": "ListItem", position: 2, name: "امنیت", item: "https://otrish-iran.ir/security" },
            { "@type": "ListItem", position: 3, name: "Willhaben" },
          ],
        },
      ],
    }),
    []
  );

  return (
    <>
      <SEO
        title="راهنمای امن خرید از Willhaben اتریش | PayLivery + شناسایی کلاهبرداری ۲۰۲۶"
        description="راهنمای جامع خرید امن از Willhaben در اتریش. PayLivery چطور کار می‌کند؟ ۸ کلاهبرداری رایج + چک‌لیست ۱۰ مرحله‌ای + ماشین‌حساب خطر آگهی. برای فارسی‌زبانان مقیم وین."
        keywords="Willhaben امن, PayLivery, کلاهبرداری Willhaben, خرید امن اتریش, Willhaben scam, ویلهابن فارسی, خرید آنلاین اتریش, Betrug Willhaben, امنیت خرید وین"
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
        id="willhaben-security-guide"
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
                <Shield className="w-3.5 h-3.5" />
                WILLHABEN · PAYLIVERY · SICHER KAUFEN
              </span>

              <h1 className="font-black text-stone-900 text-2xl md:text-4xl leading-tight">
                <span className="text-[#c8102e]">هر سال ۳٬۰۰۰+ پرونده کلاهبرداری Willhaben در وین</span> — آیا قربانی بعدی شما هستید؟
              </h1>

              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-bold">
                Willhaben بزرگ‌ترین بازار آنلاین اتریش با ۴.۵ میلیون کاربر است — و همین محبوبیت،
                آن را به میدان اصلی کلاهبرداران تبدیل کرده. از واریز مستقیم بانکی و
                <strong> فیشینگ PayLivery</strong> تا آگهی خودرو با داستان احساسی، کلاهبرداری‌ها
                هر روز پیچیده‌تر می‌شوند. <span className="text-[#c8102e]">در این راهنما، ۸ الگوی اصلی کلاهبرداری و راه‌های پیشگیری را می‌شناسید.</span>
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: CheckCircle2, t: "۱۰۰٪ رایگان" },
                  { icon: Lock, t: "بر پایه PayLivery" },
                  { icon: Shield, t: "۸ الگوی کلاهبرداری" },
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
                  href="#scam-calculator"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition-all"
                >
                  <Zap className="w-4 h-4" />
                  بررسی خطر آگهی
                </a>
                <a
                  href="https://www.willhaben.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-emerald-400 text-stone-700 text-xs font-black px-5 py-3 rounded-2xl transition"
                >
                  <Globe className="w-4 h-4" />
                  ورود به Willhaben
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px]">
              <img
                src={IMG_HERO}
                alt="خرید آنلاین امن از Willhaben اتریش با PayLivery - راهنمای فارسی‌زبانان"
                loading="lazy"
                width={1400}
                height={900}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/60 lg:to-white" />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-[10px] font-black text-stone-500 mb-0.5">میانگین خسارت</div>
                <div className="text-xl font-black text-[#c8102e]">~۴۵۰ €</div>
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

        {/* ==================== ماشین‌حساب خطر آگهی ==================== */}
        <motion.div
          id="scam-calculator"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-50 via-emerald-50/30 to-rose-50/30 border border-slate-200 rounded-3xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#c8102e]" />
                ماشین‌حساب خطر آگهی (Scam Risk)
              </h2>
              <p className="text-xs text-stone-600 font-bold leading-relaxed">
                با پاسخ به این ۵ سؤال، سطح خطر آگهی را تخمین بزنید. این ابزار بر پایه
                الگوهای واقعی کلاهبرداری در Willhaben طراحی شده است.
              </p>

              <div className="space-y-2.5">
                {[
                  { state: priceTooLow, set: setPriceTooLow, label: "قیمت آگهی بیش از ۴۰٪ پایین‌تر از بازار است", icon: Coins },
                  { state: newSeller, set: setNewSeller, label: "فروشنده تازه‌وارد است (کمتر از ۳ معامله)", icon: UserCheck },
                  { state: outsidePaylivery, set: setOutsidePaylivery, label: "فروشنده اصرار روی واریز مستقیم دارد", icon: CreditCard },
                  { state: foreignSeller, set: setForeignSeller, label: "آدرس یا شماره فروشنده خارج اتریش است", icon: Globe },
                  { state: urgencyPressure, set: setUrgencyPressure, label: "فروشنده فشار زمانی برای تصمیم سریع دارد", icon: Clock },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => item.set(!item.state)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-right transition-all ${
                        item.state
                          ? "bg-rose-50 border-rose-300 shadow-sm"
                          : "bg-white border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition ${
                          item.state
                            ? "bg-rose-500 text-white"
                            : "bg-stone-100 text-stone-500"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span
                        className={`text-[11px] font-bold flex-1 ${
                          item.state ? "text-rose-800" : "text-stone-700"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition ${
                          item.state
                            ? "bg-rose-500 border-rose-500"
                            : "border-stone-300"
                        }`}
                      >
                        {item.state && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scamRisk.level}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`rounded-2xl border-2 p-6 ${
                    scamRisk.color === "emerald"
                      ? "bg-emerald-50 border-emerald-200"
                      : scamRisk.color === "amber"
                      ? "bg-amber-50 border-amber-200"
                      : scamRisk.color === "orange"
                      ? "bg-orange-50 border-orange-200"
                      : "bg-rose-50 border-rose-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    {scamRisk.level === "safe" ? (
                      <Shield className="w-6 h-6 text-emerald-600" />
                    ) : scamRisk.level === "critical" ? (
                      <Siren className="w-6 h-6 text-rose-600" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-amber-600" />
                    )}
                    <span className="text-sm font-black text-stone-900">
                      {scamRisk.label}
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-stone-200 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black text-stone-500">
                        امتیاز خطر
                      </span>
                      <span
                        className={`text-3xl font-black ${
                          scamRisk.color === "emerald"
                            ? "text-emerald-600"
                            : scamRisk.color === "amber"
                            ? "text-amber-600"
                            : scamRisk.color === "orange"
                            ? "text-orange-600"
                            : "text-rose-600"
                        }`}
                      >
                        {scamRisk.score}
                      </span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${scamRisk.score}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          scamRisk.color === "emerald"
                            ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                            : scamRisk.color === "amber"
                            ? "bg-gradient-to-r from-amber-400 to-amber-600"
                            : scamRisk.color === "orange"
                            ? "bg-gradient-to-r from-orange-400 to-orange-600"
                            : "bg-gradient-to-r from-rose-400 to-rose-600"
                        }`}
                      />
                    </div>
                  </div>

                  <p className="text-[11px] font-bold text-stone-700 leading-relaxed">
                    {scamRisk.advice}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-200 text-[10px] font-bold text-stone-500 leading-relaxed">
                    <strong>یادآوری:</strong> این ابزار تخمینی است و جایگزین قضاوت شخصی یا
                    مشاوره حقوقی نیست. در صورت شک، همیشه با PayLivery معامله کنید.
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ==================== ۸ کلاهبرداری رایج ==================== */}
        <div>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <span className="inline-block text-[10px] bg-rose-100 text-rose-700 font-black px-3 py-1 rounded-full mb-2">
              <Siren className="w-3 h-3 inline ml-1" />
              BETRUGSMUSTER · ۲۰۲۶
            </span>
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#c8102e]" />
              ۸ کلاهبرداری رایج در Willhaben که باید بشناسید
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1 leading-relaxed">
              هر یک از این الگوها، ده‌ها پرونده موفق کلاهبرداری در اتریش ثبت کرده است
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCAM_PATTERNS.map((scam, i) => {
              const Icon = scam.icon;
              const isCritical = scam.danger === "critical";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className={`relative bg-white rounded-3xl border-2 p-5 overflow-hidden ${
                    isCritical
                      ? "border-rose-200 hover:border-rose-300"
                      : "border-amber-200 hover:border-amber-300"
                  } shadow-sm hover:shadow-lg transition-all`}
                >
                  {/* Danger badge */}
                  <span
                    className={`absolute top-3 left-3 text-[9px] font-black px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${
                      isCritical
                        ? "bg-gradient-to-r from-rose-500 to-red-600 text-white"
                        : "bg-gradient-to-r from-amber-400 to-orange-500 text-amber-950"
                    }`}
                  >
                    {isCritical ? <Siren className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    {isCritical ? "خطر بحرانی" : "خطر بالا"}
                  </span>

                  <div className="flex items-start gap-3 mb-3 pt-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-md ${
                        isCritical
                          ? "bg-gradient-to-br from-rose-500 to-red-600"
                          : "bg-gradient-to-br from-amber-500 to-orange-600"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-black text-stone-900 leading-snug mb-1">
                        {scam.title}
                      </h3>
                      <p className="text-[10.5px] text-stone-600 font-bold leading-relaxed">
                        {scam.desc}
                      </p>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-3 border border-stone-100">
                    <div className="text-[10px] font-black text-stone-700 mb-2 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-rose-500" />
                      علائم هشدار:
                    </div>
                    <ul className="space-y-1">
                      {scam.redFlags.map((flag, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-1.5 text-[10px] font-bold text-stone-600"
                        >
                          <XCircle className="w-3 h-3 text-rose-500 shrink-0 mt-0.5" />
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==================== تصویر + PayLivery ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[320px]">
            <img
              src={IMG_PHONE}
              alt="چت امن با فروشنده در Willhaben - استفاده از PayLivery برای خرید محافظت‌شده"
              loading="lazy"
              width={1000}
              height={700}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 text-white">
              <div className="text-[10px] font-black text-amber-300 mb-1">سامانه پرداخت امن (PayLivery)</div>
              <div className="text-base font-black">سیستم امن رسمی خرید و فروش Willhaben</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#c8102e]" />
              PayLivery — تنها راه پرداخت امن در Willhaben
            </h2>
            <p className="text-xs text-stone-600 font-bold leading-relaxed">
              PayLivery سیستم پرداخت امن رسمی Willhaben است که بین خریدار و فروشنده به‌عنوان
              واسط عمل می‌کند. خریدار مبلغ را به حساب Willhaben واریز می‌کند، فروشنده کالا را
              ارسال می‌کند و پس از <strong>تأیید دریافت کالا توسط خریدار</strong>، مبلغ به فروشنده آزاد می‌شود.
              کارمزد این سیستم ۱ تا ۳ درصد مبلغ معامله است که کاملاً ارزش امنیت را دارد.
            </p>

            <div className="space-y-3">
              {[
                {
                  n: 1,
                  t: "خریدار آگهی را انتخاب می‌کند",
                  d: "کالای مورد نظر را یافته و روی دکمه «Jetzt kaufen» می‌کند.",
                },
                {
                  n: 2,
                  t: "پرداخت به حساب واسط Willhaben",
                  d: "مبلغ از کارت بانکی شما کسر و در امان Willhaben نگه داشته می‌شود.",
                },
                {
                  n: 3,
                  t: "ارسال کالا توسط فروشنده",
                  d: "فروشنده کالا را با کد رهگیری ارسال می‌کند.",
                },
                {
                  n: 4,
                  t: "تأیید دریافت و آزادسازی مبلغ",
                  d: "پس از تأیید شما، مبلغ به حساب فروشنده منتقل می‌شود.",
                },
              ].map((step) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: step.n * 0.08 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 flex items-start gap-3 hover:shadow-md transition"
                >
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 font-black text-sm shadow">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-[12px] font-black text-stone-900 mb-0.5">
                      {step.t}
                    </h3>
                    <p className="text-[10.5px] text-stone-500 font-bold leading-relaxed">
                      {step.d}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== جدول مقایسه PayLivery vs Direct ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-blue-50/40 border border-emerald-200 rounded-3xl p-6 md:p-8"
        >
          <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-600" />
                PayLivery در برابر پرداخت مستقیم بانکی
              </h2>
              <p className="text-[11px] text-stone-600 font-bold mt-1">
                چرا همیشه باید PayLivery را انتخاب کنید؟
              </p>
            </div>
            <span className="text-[10px] font-black bg-white text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200">
              بروزرسانی ۲۰۲۶
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-emerald-100 bg-white">
            <table className="w-full text-right text-xs">
              <thead className="bg-emerald-50/70 text-emerald-900">
                <tr>
                  <th className="px-4 py-3 font-black">ویژگی</th>
                  <th className="px-4 py-3 font-black">
                    <span className="inline-flex items-center gap-1">
                      <Lock className="w-3 h-3" /> PayLivery
                    </span>
                  </th>
                  <th className="px-4 py-3 font-black">
                    <span className="inline-flex items-center gap-1">
                      <Ban className="w-3 h-3" /> پرداخت مستقیم
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((r, i) => (
                  <tr key={i} className="border-t border-emerald-100 hover:bg-emerald-50/40 transition">
                    <td className="px-4 py-3 font-black text-stone-800">{r.feature}</td>
                    <td className="px-4 py-3 font-black text-emerald-700">{r.paylivery}</td>
                    <td className="px-4 py-3 font-bold text-rose-600">{r.direct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ==================== چک‌لیست ۱۰ مرحله‌ای ==================== */}
        <div>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <span className="inline-block text-[10px] bg-emerald-100 text-emerald-700 font-black px-3 py-1 rounded-full mb-2">
              <CheckCircle2 className="w-3 h-3 inline ml-1" />
              SICHERHEITS-CHECKLISTE
            </span>
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <BadgeCheck className="w-5 h-5 text-[#c8102e]" />
              چک‌لیست ۱۰ مرحله‌ای خرید امن از Willhaben
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1 leading-relaxed">
              قبل از هر معامله، این ۱۰ مورد را یک‌بار مرور کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {SAFETY_CHECKLIST.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="relative bg-white rounded-3xl border border-stone-200 p-5 overflow-hidden group hover:border-emerald-300 hover:shadow-lg transition-all"
                >
                  <div className="absolute top-3 left-3 text-4xl font-black text-stone-100 select-none">
                    {i + 1}
                  </div>
                  <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="relative text-[11.5px] font-black text-stone-900 mb-1 leading-snug">
                    {c.t}
                  </h3>
                  <p className="relative text-[10px] text-stone-500 font-bold leading-relaxed">
                    {c.d}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==================== مراحل HowTo ==================== */}
        <div>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <Package className="w-5 h-5 text-[#c8102e]" />
              مسیر خرید امن در ۵ گام
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از ارزیابی آگهی تا دریافت کالا — همه چیز در Willhaben
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
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
                  <h3 className="relative text-[12px] font-black text-stone-900 mb-1">
                    {s.t}
                  </h3>
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
            src={IMG_DELIVERY}
            alt="ارسال امن بسته با کد رهگیری - PayLivery Willhaben اتریش"
            loading="lazy"
            width={1000}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a1128]/92 via-[#0a1128]/70 to-transparent" />
          <div className="relative p-8 md:p-12 max-w-xl text-white">
            <span className="inline-flex items-center gap-2 bg-rose-500/25 border border-rose-400/40 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full mb-4">
              <Siren className="w-3.5 h-3.5 text-rose-300" />
              هشدار طلایی
            </span>
            <h3 className="text-xl md:text-2xl font-black mb-3 leading-snug">
              هر بار که «واریز مستقیم» می‌کنید، ۴۵۰ یورو به کلاهبردار هدیه می‌دهید
            </h3>
            <p className="text-xs md:text-sm text-stone-200 font-bold leading-relaxed">
              آمار رسمی پلیس وین نشان می‌دهد <strong>٪۹۲ کلاهبرداری‌های Willhaben</strong> از طریق
              واریز مستقیم بانکی بدون PayLivery رخ می‌دهد. کلاهبرداران مهارت زیادی در متقاعد کردن
              قربانیان دارند — از داستان‌های احساسی تا پیشنهاد تخفیف ویژه. تنها راه محافظت،
              استفاده بی‌قید و شرط از PayLivery است.
            </p>
          </div>
        </div>

        {/* ==================== FAQ ==================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره امنیت Willhaben
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
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              همراه شما در خریدهای امن
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              قربانی کلاهبرداری شده‌اید؟ ما کمکتان می‌کنیم
            </h2>
            <p className="text-sm text-stone-300 font-bold leading-relaxed">
              تیم اتریش‌نشین می‌تواند در تنظیم شکایت رسمی به Polizei اتریش، مکاتبه با پشتیبانی
              Willhaben و بازیابی وجوه از طریق سیستم قضایی همراه شما باشد. برای مشاوره رایگان
              اولین قدم را بردارید.
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
              این راهنما بر پایه الگوهای گزارش‌شده کلاهبرداری و توصیه‌های رسمی Willhaben و پلیس
              اتریش تهیه شده اما جایگزین مشاوره حقوقی یا رسمی نیست. در صورت بروز کلاهبرداری،
              همیشه به پورتال رسمی <a href="https://www.polizei.gv.at" target="_blank" rel="noopener noreferrer" className="underline">polizei.gv.at</a> یا
              بخش Hilfe سایت Willhaben مراجعه کنید. برای پرونده‌های بزرگ، مشاوره با وکیل متخصص
              حقوق مصرف‌کننده (Konsumentenschutz) توصیه می‌شود.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WillhabenSecurityGuide;