import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  MessageCircle,
  Globe,
  Send,
  PhoneCall,
  ExternalLink,
  Heart,
  Sparkles,
  Award,
  Users,
  ShieldCheck,
  Clock,
  CheckCircle,
  Star,
  MessageSquare,
  Instagram,
  Facebook,
  Youtube,
  ChevronLeft,
  ChevronDown,
  Copy,
  Zap,
  Target,
  Handshake,
  Building2,
  Rocket,
  Info,
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

/* ============================================================
   Logo
   ============================================================ */
const OTRISH_LOGO = "/otrish_logo_1779961596526.png";

/* ============================================================
   Types
   ============================================================ */
interface ContactChannel {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  gradient: string;
  bg: string;
  text: string;
  badge: string;
  featured?: boolean;
}

interface ValueItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  text: string;
  color: string;
}

interface FAQEntry {
  q: string;
  a: string;
}

interface StatItem {
  value: string;
  label: string;
  icon: string;
}

interface SocialItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  handle: string;
  href: string;
  color: string;
}

/* ============================================================
   Data
   ============================================================ */
const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "telegram",
    title: "پشتیبانی تلگرام",
    subtitle: "پاسخگویی آنلاین و سریع",
    value: "@Otrish_neshin",
    href: "https://t.me/Otrish_neshin",
    icon: Send,
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-600",
    badge: "ارسال پیام",
    featured: true,
  },
  {
    id: "whatsapp-iran",
    title: "واتس‌اپ ایران",
    subtitle: "پاسخگویی از داخل ایران",
    value: "+98 930 622 9790",
    href: "https://wa.me/989306229790",
    icon: MessageCircle,
    gradient: "from-green-500 to-emerald-600",
    bg: "bg-green-50",
    text: "text-green-600",
    badge: "چت در واتس‌اپ",
  },
  {
    id: "whatsapp-eu",
    title: "واتس‌اپ اتریش",
    subtitle: "تماس مستقیم با دفتر وین",
    value: "00436889763256",
    href: "https://wa.me/436889763256",
    icon: PhoneCall,
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    badge: "ارتباط مستقیم",
    featured: true,
  },
  {
    id: "email",
    title: "ایمیل رسمی",
    subtitle: "برای مکاتبات اداری",
    value: "otrish.neshin@gmail.com",
    href: "mailto:otrish.neshin@gmail.com",
    icon: Mail,
    gradient: "from-[#c8102e] to-[#970d22]",
    bg: "bg-red-50",
    text: "text-[#c8102e]",
    badge: "ارسال ایمیل",
  },
];

const STATS: StatItem[] = [
  { value: "۱۰۰+", label: "ابزار کاربردی", icon: "🛠️" },
  { value: "۵۰K+", label: "کاربر فعال", icon: "👥" },
  { value: "۲۴/۷", label: "پشتیبانی", icon: "⏰" },
  { value: "۹۸٪", label: "رضایت کاربران", icon: "⭐" },
];

const VALUES: ValueItem[] = [
  {
    icon: ShieldCheck,
    title: "مستقل و بی‌طرف",
    text: "بدون وابستگی سیاسی یا اقتصادی. کاملاً داوطلبانه و رایگان.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Zap,
    title: "سریع و دقیق",
    text: "استفاده از آخرین تکنولوژی‌های وب و اطلاعات به‌روز.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Heart,
    title: "با عشق به هموطن",
    text: "هر خط کد با هدف کمک به راحتی زندگی هموطنان در اتریش.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: Users,
    title: "جامعه‌محور",
    text: "ساخته‌شده توسط و برای فارسی‌زبانان مقیم اتریش و اروپا.",
    color: "from-blue-500 to-indigo-600",
  },
];

const FAQS: FAQEntry[] = [
  {
    q: "آیا خدمات اتریش‌نشین رایگان است؟",
    a: "بله، تمامی ابزارها، راهنماها و مقالات سایت اتریش‌نشین کاملاً رایگان هستند. مشاوره‌های تخصصی نیز با هدف کمک به هموطنان ارائه می‌شود.",
  },
  {
    q: "چطور می‌توانم با تیم اتریش‌نشین در تماس باشم؟",
    a: "از طریق تلگرام، واتس‌اپ (ایران یا اتریش) یا ایمیل رسمی. تیم ما معمولاً در کمتر از ۲۴ ساعت پاسخ می‌دهد.",
  },
  {
    q: "آیا اتریش‌نشین به سازمان خاصی وابسته است؟",
    a: "خیر، اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است که توسط گروهی از فارسی‌زبانان مقیم اتریش اداره می‌شود.",
  },
  {
    q: "چگونه می‌توانم در بهبود پلتفرم مشارکت کنم؟",
    a: "برای مشارکت، بازخورد، پیشنهاد محتوا یا حتی کمک فنی، از طریق کانال‌های ارتباطی با ما در تماس باشید. مشارکت شما ارزشمند است!",
  },
];

const SOCIALS: SocialItem[] = [
  {
    icon: Send,
    label: "تلگرام",
    handle: "@OTRISH_IRAN",
    href: "https://t.me/OTRISH_IRAN",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Instagram,
    label: "اینستاگرام",
    handle: "@otrish__iran",
    href: "https://instagram.com/otrish__iran",
    color: "from-pink-500 via-rose-500 to-purple-600",
  },
  {
    icon: Facebook,
    label: "فیسبوک",
    handle: "otrish.neshin",
    href: "https://www.facebook.com/otrish.neshin",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: Youtube,
    label: "یوتیوب",
    handle: "Otrish Neshin",
    href: "https://youtube.com",
    color: "from-red-500 to-rose-600",
  },
];

const SITE = {
  name: "اتریش‌نشین",
  nameEn: "Otrish Neshin",
  origin: "https://otrish-iran.ir",
  logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
  email: "otrish.neshin@gmail.com",
  phoneEu: "+436889763256",
} as const;

/* ============================================================
   Helpers
   ============================================================ */
async function safeCopy(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // fallback برای مرورگرهای قدیمی یا بستر غیر امن
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/* ============================================================
   Main Component
   ============================================================ */
export default function AboutContactNew() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  /* ---------- هندلر کپی ---------- */
  const handleCopy = useCallback(async (text: string) => {
    const ok = await safeCopy(text);
    if (ok) {
      setCopiedValue(text);
      toast.success("کپی شد!");
      window.setTimeout(() => setCopiedValue(null), 2000);
    } else {
      toast.error?.("کپی ناموفق بود");
    }
  }, []);

  /* ---------- Schema.org ---------- */
  const seoSchema = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.name,
        alternateName: SITE.nameEn,
        url: SITE.origin,
        logo: SITE.logo,
        description:
          "بزرگترین کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش. ارائه ابزارهای هوشمند، راهنماهای اداری و مشاوره تخصصی.",
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: SITE.email,
            availableLanguage: ["Persian", "German", "English"],
          },
          {
            "@type": "ContactPoint",
            contactType: "technical support",
            telephone: SITE.phoneEu,
          },
        ],
        sameAs: [
          "https://t.me/OTRISH_IRAN",
          "https://instagram.com/otrish__iran",
          "https://www.facebook.com/otrish.neshin",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: `تماس با ${SITE.name}`,
        url: `${SITE.origin}/contact`,
        inLanguage: "fa-IR",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
    []
  );

  /* ---------- سئوی داینامیک (DiacoSEO) ---------- */
  useEffect(() => {
    if (typeof window === "undefined" || !window.DiacoSEO) return;
    window.DiacoSEO.set({
      title: "درباره اتریش‌نشین و راه‌های تماس | پلتفرم مستقل فارسی‌زبانان اتریش",
      description:
        "با اتریش‌نشین، بزرگترین کانون همیاری فارسی‌زبانان مقیم اتریش آشنا شوید. راه‌های تماس مستقیم از طریق تلگرام، واتس‌اپ (ایران و اتریش) و ایمیل.",
      keywords:
        "تماس اتریش‌نشین, مشاوره اتریش, پشتیبانی فارسی زبانان اتریش, Otrish Neshin, درباره اتریش‌نشین, کانون ایرانیان وین",
      url: "/about-contact",
      image: `${SITE.origin}/og-about.jpg`,
      type: "website",
    });
  }, []);

  return (
    <>
      <SEO
        title="درباره اتریش‌نشین و راه‌های تماس | پلتفرم مستقل فارسی‌زبانان اتریش"
        description="با اتریش‌نشین، بزرگترین کانون همیاری فارسی‌زبانان مقیم اتریش آشنا شوید. راه‌های تماس مستقیم از طریق تلگرام، واتس‌اپ (ایران و اتریش) و ایمیل."
        keywords="تماس اتریش‌نشین, مشاوره اتریش, پشتیبانی فارسی زبانان اتریش, Otrish Neshin, درباره اتریش‌نشین, کانون ایرانیان وین"
        schemaData={seoSchema}
      />

      <div className="space-y-8 font-sans" dir="rtl">
        {/* ============================================
            HERO
           ============================================ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          aria-labelledby="about-hero-title"
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white"
          style={{
            background:
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none"
          >
            🇦🇹
          </div>
          <div
            aria-hidden="true"
            className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              whileHover={{ rotate: 6, scale: 1.05 }}
              className="flex-shrink-0"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-2 shadow-2xl">
                <img
                  src={OTRISH_LOGO}
                  alt="لوگوی اتریش‌نشین"
                  width={112}
                  height={112}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                همیار مستقل فارسی‌زبانان
              </div>

              <h1
                id="about-hero-title"
                className="text-2xl md:text-4xl font-black leading-tight mb-3"
              >
                درباره اتریش‌نشین
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                بزرگترین کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش که با هدف تسهیل مسیر
                مهاجرت، اقامت و زندگی در قلب اروپا شکل گرفته است. ما با ارائه ابزارهای نوین،
                مشاوره‌های تخصصی و بهره‌گیری از آخرین تکنولوژی‌ها، تلاش می‌کنیم دغدغه‌های
                هموطنانمان را در زمینه‌های اداری، مالیاتی، آموزشی و اجتماعی به حداقل برسانیم.
              </p>

              <ul className="flex items-center gap-3 mt-5 flex-wrap list-none p-0">
                {[
                  { icon: CheckCircle, text: "۱۰۰٪ رایگان" },
                  { icon: ShieldCheck, text: "کاملاً مستقل" },
                  { icon: Heart, text: "ساخته شده با عشق" },
                ].map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200"
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* ============================================
            STATS
           ============================================ */}
        <section
          aria-label="آمار کلی اتریش‌نشین"
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-1" aria-hidden="true">
                {s.icon}
              </div>
              <div className="text-xl font-black text-[#c8102e]">{s.value}</div>
              <div className="text-[10px] text-stone-500 font-bold mt-0.5">
                {s.label}
              </div>
            </motion.div>
          ))}
        </section>

        {/* ============================================
            CONTACT CHANNELS
           ============================================ */}
        <section aria-labelledby="contact-channels-title">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2
                id="contact-channels-title"
                className="text-lg font-black text-stone-900 flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5 text-[#c8102e]" aria-hidden="true" />
                راه‌های ارتباطی
              </h2>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                از هر کانالی که راحت‌ترید با ما در تماس باشید — پاسخگویی سریع
              </p>
            </div>
            <span className="text-[10px] font-black text-[#c8102e] bg-red-50 px-3 py-1 rounded-full hidden sm:inline-flex items-center gap-1">
              <span
                className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                aria-hidden="true"
              />
              آنلاین
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTACT_CHANNELS.map((c, i) => (
              <ContactCard
                key={c.id}
                channel={c}
                index={i}
                isCopied={copiedValue === c.value}
                onCopy={handleCopy}
              />
            ))}
          </div>
        </section>

        {/* ============================================
            OFFICIAL PORTALS
           ============================================ */}
        <motion.section
          aria-label="پورتال‌های رسمی"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Globe className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-black text-stone-900 mb-2">
                پورتال‌های رسمی اتریش‌نشین
              </h3>
              <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                برای دسترسی به تمامی ابزارها و خدمات، از پورتال‌های زیر استفاده کنید:
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.Otrish-Iran.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8102e]/50 focus-visible:ring-offset-2"
                >
                  <Rocket
                    className="w-4 h-4 group-hover:rotate-12 transition-transform"
                    aria-hidden="true"
                  />
                  Otrish-Iran.ir
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                </a>

                <a
                  href="https://Dia-co.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-indigo-300 text-stone-700 font-black text-xs px-5 py-3 rounded-2xl hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:ring-offset-2"
                >
                  <Building2
                    className="w-4 h-4 group-hover:rotate-12 transition-transform"
                    aria-hidden="true"
                  />
                  Dia-co.ir
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" aria-hidden="true" />
                </a>
              </div>

              <p className="text-[10px] text-stone-500 font-bold mt-3 flex items-center gap-1.5">
                <CheckCircle
                  className="w-3.5 h-3.5 text-emerald-500"
                  aria-hidden="true"
                />
                شبکه جامع خدمات مهاجرتی برای فارسی‌زبانان
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============================================
            VALUES
           ============================================ */}
        <section aria-labelledby="values-title">
          <div className="mb-5">
            <h2
              id="values-title"
              className="text-lg font-black text-stone-900 flex items-center gap-2"
            >
              <Award className="w-5 h-5 text-[#c8102e]" aria-hidden="true" />
              ارزش‌های ما
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              چهار اصل اساسی که هویت اتریش‌نشین را می‌سازند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border border-stone-200 p-6 relative overflow-hidden group"
                >
                  <div
                    aria-hidden="true"
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`}
                  />
                  <div
                    className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="relative font-black text-stone-900 text-sm mb-2">
                    {v.title}
                  </h3>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                    {v.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ============================================
            FAQ
           ============================================ */}
        <section
          aria-labelledby="faq-title"
          className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8"
        >
          <div className="mb-5">
            <h2
              id="faq-title"
              className="text-lg font-black text-stone-900 flex items-center gap-2"
            >
              <Info className="w-5 h-5 text-[#c8102e]" aria-hidden="true" />
              سوالات متداول
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های کوتاه به پرتکرارترین سوالات کاربران
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                index={i}
                panelId={`faq-panel-${i}`}
                buttonId={`faq-button-${i}`}
              />
            ))}
          </div>
        </section>

        {/* ============================================
            SOCIAL
           ============================================ */}
        <section
          aria-labelledby="social-title"
          className="bg-white rounded-3xl border border-stone-200 p-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div>
              <h3
                id="social-title"
                className="text-sm font-black text-stone-900 mb-1"
              >
                ما را در شبکه‌های اجتماعی دنبال کنید
              </h3>
              <p className="text-[10px] text-stone-500 font-bold">
                آخرین اخبار، ابزارهای جدید و راهنماهای کاربردی
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className="group flex items-center gap-3 bg-stone-50 hover:bg-white border border-stone-200 rounded-2xl p-3 transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8102e]/40 focus-visible:ring-offset-2"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-stone-800">
                      {social.label}
                    </div>
                    <div className="text-[9px] text-stone-500 font-bold truncate">
                      {social.handle}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* ============================================
            FINAL CTA
           ============================================ */}
        <motion.section
          aria-labelledby="cta-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
          />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              کنار شما در تمام مراحل
            </div>

            <h2 id="cta-title" className="text-2xl md:text-3xl font-black mb-3">
              آماده‌ایم تا کمکتان کنیم
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              چه در ابتدای مسیر مهاجرت باشید، چه سال‌ها در اتریش زندگی کنید، تیم اتریش‌نشین
              با ابزارها و مشاوره‌های تخصصی در کنارتان است. همین حالا پیام دهید!
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1128]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                شروع گفتگو در واتس‌اپ
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1128]"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                پشتیبانی تلگرام
              </a>
            </div>

            <ul className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap list-none p-0">
              <li className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                پاسخ در کمتر از ۲۴ ساعت
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                کاملاً محرمانه
              </li>
              <li className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" aria-hidden="true" />
                خدمات داوطلبانه
              </li>
            </ul>
          </div>
        </motion.section>

        {/* ============================================
            DISCLAIMER
           ============================================ */}
        <aside
          role="note"
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3"
        >
          <Info
            className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است که هیچ وابستگی به سازمان‌ها یا
              احزاب سیاسی ندارد. تمامی اطلاعات و ابزارهای ارائه‌شده صرفاً جنبه راهنمایی دارند و
              جایگزین مشاوره حقوقی یا اداری رسمی نمی‌شوند. برای تصمیم‌های نهایی، همیشه با
              منابع رسمی یا مشاوران واجد شرایط مشورت کنید.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

/* ============================================================
   ContactCard
   ============================================================ */
interface ContactCardProps {
  key?: React.Key;
  channel: ContactChannel;
  index: number;
  isCopied: boolean;
  onCopy: (text: string) => void;
}

function ContactCard({ channel, index, isCopied, onCopy }: ContactCardProps) {
  const Icon = channel.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className={`relative bg-white rounded-3xl border-2 p-5 transition-all overflow-hidden group ${
        channel.featured
          ? "border-[#c8102e]/20 hover:border-[#c8102e]/40 shadow-md hover:shadow-xl"
          : "border-stone-200 hover:border-stone-300"
      }`}
    >
      {channel.featured && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[9px] font-black px-3 py-1 rounded-br-2xl flex items-center gap-1 z-10">
          <Star className="w-3 h-3 fill-current" aria-hidden="true" />
          پیشنهادی
        </div>
      )}

      <div
        aria-hidden="true"
        className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${channel.gradient} opacity-[0.08] rounded-full group-hover:opacity-[0.15] transition-opacity`}
      />

      <div className="relative">
        <div
          className={`w-14 h-14 rounded-2xl ${channel.bg} ${channel.text} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform`}
        >
          <Icon size={26} aria-hidden="true" />
        </div>

        <h3 className="text-sm font-black text-stone-900 mb-0.5">
          {channel.title}
        </h3>
        <p className="text-[10px] text-stone-500 font-bold mb-3">
          {channel.subtitle}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <code
            className="flex-1 text-[10px] font-mono font-bold text-stone-600 bg-stone-50 border border-stone-100 rounded-lg px-2.5 py-1.5 truncate"
            dir="ltr"
          >
            {channel.value}
          </code>
          <button
            type="button"
            onClick={() => onCopy(channel.value)}
            aria-label={`کپی ${channel.title}`}
            className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8102e]/40"
          >
            {isCopied ? (
              <CheckCircle
                className="w-3.5 h-3.5 text-emerald-600"
                aria-hidden="true"
              />
            ) : (
              <Copy className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
            )}
          </button>
        </div>

        <a
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full bg-gradient-to-br ${channel.gradient} text-white font-black text-xs py-2.5 rounded-2xl shadow-md hover:scale-[1.02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2`}
        >
          <span>{channel.badge}</span>
          <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </motion.div>
  );
}

/* ============================================================
   FaqItem
   ============================================================ */
interface FaqItemProps {
  key?: React.Key;
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  panelId: string;
  buttonId: string;
}

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
  index,
  panelId,
  buttonId,
}: FaqItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl border transition-all overflow-hidden ${
        isOpen
          ? "border-[#c8102e]/30 bg-[#c8102e]/[0.02] shadow-md"
          : "border-stone-200"
      }`}
    >
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8102e]/30"
        >
          <span className="flex items-center gap-3 flex-1">
            <span
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all ${
                isOpen
                  ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white"
                  : "bg-stone-100 text-stone-500"
              }`}
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <span className="font-black text-xs text-stone-900 leading-snug">
              {q}
            </span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${
              isOpen ? "rotate-180 text-[#c8102e]" : ""
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
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pr-14 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}