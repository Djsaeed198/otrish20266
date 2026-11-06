import React, { useState, useEffect } from "react";
import {
  X, Sparkles, MapPin, Check, Globe, HelpCircle, Heart,
  ArrowLeft, Award, Users, ShieldCheck, Star, Zap, Compass,
  TrendingUp, FileText, Calculator, Briefcase, BookOpen, Car,
  Building2, Coffee, Landmark, Mountain, Train, Info, Quote,
  ChevronLeft, Rocket, Trophy, BadgeCheck, CakeSlice, GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackEvent } from "../utils/tracker";
import SEO from "./SEO";

// @ts-ignore
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// IMAGES — Austria / Vienna themed
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80",
  viennaNight: "https://images.unsplash.com/photo-1583687355032-89b902b7335f?auto=format&fit=crop&w=800&q=80",
  alps: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=800&q=80",
  coffee: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
  parliament: "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=800&q=80",
};

// ==========================================
// TYPES
// ==========================================
interface DetectedCountry {
  name: string;
  flag: string;
  code: string;
  city?: string;
  isp?: string;
  info: string;
}

// ==========================================
// QUICK STATS (trust badges inside welcome)
// ==========================================
const WELCOME_STATS = [
  { icon: Users, value: "۵۰K+", label: "کاربر فعال", color: "from-[#c8102e] to-[#970d22]" },
  { icon: FileText, value: "۶۰+", label: "سرویس تخصصی", color: "from-indigo-600 to-blue-700" },
  { icon: Star, value: "۴.۹", label: "امتیاز کاربران", color: "from-amber-500 to-orange-600" },
  { icon: ShieldCheck, value: "۱۰۰٪", label: "رایگان و مستقل", color: "from-emerald-600 to-teal-700" },
];

// ==========================================
// FEATURE HIGHLIGHTS
// ==========================================
const FEATURE_HIGHLIGHTS = [
  { icon: Calculator, title: "محاسبه‌گر مالیات", desc: "Brutto-Netto ۲۰۲۶" },
  { icon: Award, title: "امتیاز RWR Card", desc: "سنجش فوری شانس" },
  { icon: Building2, title: "مسکن و وین", desc: "راهنمای ۲۳ منطقه" },
  { icon: Train, title: "حمل‌ونقل", desc: "Klimaticket و ÖBB" },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function WelcomeNotification() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [country, setCountry] = useState<DetectedCountry | null>(null);
  const [customCountryInput, setCustomCountryInput] = useState<string>("");
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Check if first-time visitor
    const hasBeenWelcomed = localStorage.getItem("otrishneshin_welcomed_v6");
    if (hasBeenWelcomed === "true") {
      setIsLoading(false);
      return;
    }

    // Delay appearance slightly for optimal aesthetic look
    const timer = setTimeout(async () => {
      setIsOpen(true);

      // Guess country locally first
      let guessedCountry: DetectedCountry = {
        name: "ایران",
        flag: "🇮🇷",
        code: "IR",
        info: "بر اساس منطقه زمانی سیستم فارسی‌زبان شما",
      };

      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (
        tz.includes("Vienna") ||
        tz.includes("Europe/Vienna") ||
        tz.includes("Europe/Berlin") ||
        tz.includes("Europe/Zurich")
      ) {
        guessedCountry = {
          name: "اتریش",
          flag: "🇦🇹",
          code: "AT",
          info: "جغرافیای فعال در کشور اتریش",
        };
      }

      // Try live geolocation discovery
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);

        const geoResponse = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          if (geoData.country_name) {
            let countryName = geoData.country_name;
            let flag = "🌍";
            let code = geoData.country;

            if (code === "IR") {
              countryName = "ایران";
              flag = "🇮🇷";
            } else if (code === "AT") {
              countryName = "اتریش";
              flag = "🇦🇹";
            } else if (code === "DE") {
              countryName = "آلمان";
              flag = "🇩🇪";
            }

            guessedCountry = {
              name: countryName,
              flag: flag,
              code: code,
              city: geoData.city,
              isp: geoData.org,
              info: `محاسبه برخط از طریق پروتکل آدرس IP شما (${geoData.ip})`,
            };
          }
        }
      } catch (err) {
        console.log("Welcome geolocation detection fallback:", err);
      }

      setCountry(guessedCountry);
      setIsLoading(false);

      trackEvent("welcome_popup_shown", "action", {
        estimatedCountry: guessedCountry.name,
        estimatedCode: guessedCountry.code,
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = (confirmedCountry?: string) => {
    const finalCountry = confirmedCountry || country?.name || "گمنام";
    localStorage.setItem("otrishneshin_welcomed_v6", "true");
    setIsOpen(false);

    trackEvent("welcome_popup_confirmed", "action", {
      confirmedCountry: finalCountry,
      finalCode: country?.code || "custom",
    });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCountryInput.trim()) return;

    const newCountry: DetectedCountry = {
      name: customCountryInput.trim(),
      flag: "📍",
      code: "CUSTOM",
      info: "تغییر یافته به صورت دستی توسط کلاینت",
    };
    setCountry(newCountry);
    setIsChanging(false);
    handleClose(newCountry.name);
  };

  if (isLoading || !isOpen) return null;

  // ==========================================
  // SEO SCHEMA (injected when welcome modal opens)
  // ==========================================
  const welcomeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "اتریش‌نشین",
      alternateName: "Otrish Neshin",
      url: "https://otrish-iran.ir",
      inLanguage: "fa-IR",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://otrish-iran.ir/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: {
          "@type": "ImageObject",
          url: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "اتریش‌نشین",
      alternateName: "Otrish Neshin",
      url: "https://otrish-iran.ir",
      logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
      description:
        "کانون مستقل همیاری فارسی‌زبانان مقیم اتریش — ۶۰+ سرویس رایگان مهاجرت، مالیات، مسکن، بیمه و خدمات اجتماعی.",
      sameAs: [
        "https://t.me/OTRISH_IRAN",
        "https://instagram.com/otrish__iran",
        "https://www.facebook.com/otrish.neshin",
      ],
      areaServed: {
        "@type": "Country",
        name: "Austria",
      },
      knowsLanguage: ["fa-IR", "de-AT", "en-US"],
    },
  ];

  return (
    <>
      {/* SEO inside modal for schema injection */}
      <SEO
        title="خوش آمدید | اتریش‌نشین — کانون همیاری فارسی‌زبانان اتریش"
        description="اتریش‌نشین: ۶۰+ سرویس رایگان مهاجرت، مالیات، مسکن، بیمه و خدمات اجتماعی برای فارسی‌زبانان مقیم اتریش."
        keywords="اتریش‌نشین, Otrish Neshin, خدمات اتریش, مهاجرت به اتریش, فارسی‌زبانان اتریش, RWR Card, MA35, مسکن وین"
        aiSummary="پلتفرم مستقل اتریش‌نشین با ۶۰+ سرویس تخصصی رایگان برای فارسی‌زبانان مقیم اتریش در حوزه‌های مهاجرت، مالیات، مسکن، بیمه و خدمات اجتماعی."
        aiKeywords={["Otrish Neshin", "Persian community Austria", "Austria immigration portal", "Vienna Persian services"]}
        schemaData={welcomeSchema}
      />

      <AnimatePresence>
        <div
          id="welcome-notification-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md"
        >
          <motion.div
            id="welcome-notification-card"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.55 }}
            className="w-full max-w-lg bg-white rounded-[28px] border border-stone-200 shadow-2xl overflow-hidden text-right leading-relaxed font-sans max-h-[95vh] flex flex-col"
            dir="rtl"
          >
            {/* ========================================== */}
            {/* HERO HEADER WITH IMAGE */}
            {/* ========================================== */}
            <div className="relative shrink-0">
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={IMAGES.hero}
                  alt="وین، اتریش"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#38100e]/95 via-[#9e142d]/70 to-[#9e142d]/40" />
              <div className="absolute top-8 right-8 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-8 -bottom-12 text-[140px] opacity-[0.08] pointer-events-none select-none">
                🇦🇹
              </div>

              {/* Content */}
              <div className="relative p-6 pb-8">
                {/* Close button */}
                <div className="absolute top-4 left-4">
                  <button
                    onClick={() => handleClose()}
                    className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-all flex items-center justify-center cursor-pointer text-white/90 hover:text-white border border-white/20"
                    aria-label="بستن"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Top badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 border border-white/25 backdrop-blur-sm rounded-full text-[10px] font-black text-white mb-4">
                  <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                  خوش آمدید — نسخه ۲۰۲۶
                </div>

                {/* Logo + Title */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shrink-0 border-2 border-white/50 overflow-hidden shadow-xl">
                    <img
                      src={otrishLogo}
                      alt="لوگوی اتریش‌نشین"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black text-rose-200/90 block">
                      درود و سلام هم‌زبانان عزیز
                    </span>
                    <h4 className="text-sm sm:text-base font-black tracking-tight mt-1 text-white leading-tight">
                      به جمع خانواده اتریش‌نشین خوش آمدید
                    </h4>
                    <span className="text-[10px] font-bold text-white/70 block mt-0.5">
                      کانون مستقل همیاری فارسی‌زبانان اتریش
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================== */}
            {/* SCROLLABLE CONTENT */}
            {/* ========================================== */}
            <div className="flex-1 overflow-y-auto">
              {/* Welcome message */}
              <div className="p-5 pb-3 space-y-4">
                <p className="text-xs text-stone-700 font-bold leading-relaxed">
                  با سپاس از انتخاب اپلیکیشن{" "}
                  <strong className="text-stone-900 font-black">«اتریش‌نشین»</strong>؛ بسیار
                  خرسندیم که در مسیر تجربه زندگی در اتریش، همراه شما هستیم. این اپلیکیشن با{" "}
                  <strong className="text-[#c8102e]">۶۰+ سرویس تخصصی</strong> طراحی
                  شده تا تمامی نیازهای شما را در یک پلتفرم یکپارچه پاسخ دهد.
                </p>

                {/* Trust stats bar */}
                <div className="grid grid-cols-4 gap-2">
                  {WELCOME_STATS.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={i}
                        className="bg-stone-50 border border-stone-200 rounded-xl p-2 text-center"
                      >
                        <div
                          className={`w-7 h-7 mx-auto rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-sm mb-1`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-[11px] font-black text-stone-900 font-mono" dir="ltr">
                          {s.value}
                        </div>
                        <div className="text-[8px] text-stone-500 font-bold leading-tight mt-0.5">
                          {s.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ========================================== */}
              {/* GEOLOCATION CARD */}
              {/* ========================================== */}
              <div className="px-5 space-y-4">
                <div className="bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-2xl p-4 space-y-3.5 relative overflow-hidden">
                  <div className="absolute -top-3 -left-3 w-16 h-16 bg-[#c8102e]/5 rounded-full blur-xl" />

                  <div className="flex items-center justify-between relative">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-black text-stone-500">
                      <Globe
                        className="w-4 h-4 text-emerald-500"
                        style={{ animation: "spin 8s linear infinite" }}
                      />
                      <span>سامانه ردیابی و خوش‌آمدگویی ملل</span>
                    </div>
                    <span className="text-[9.5px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      فعال و ایمن
                    </span>
                  </div>

                  {!isChanging ? (
                    <div className="flex items-center justify-between gap-4 animate-fade-in">
                      <div className="space-y-1">
                        <span className="text-[9.5px] text-stone-600 font-extrabold block">
                          کشور مبدا ورود شما به سیستم:
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl leading-none">
                            {country?.flag || "🌍"}
                          </span>
                          <span className="text-sm sm:text-base font-black text-stone-900">
                            {country?.name || "درحال ارزیابی..."}
                          </span>
                        </div>
                        <span className="text-[9.5px] text-stone-600 block font-bold leading-normal mt-1">
                          {country?.info}
                        </span>
                        {country?.city && (
                          <span className="text-[9.5px] text-[#c8102e] font-extrabold block mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            موقعیت: {country.city}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setIsChanging(true)}
                        className="p-1.5 px-3 bg-white border border-stone-200 hover:border-[#c8102e] hover:bg-rose-50 text-stone-600 hover:text-[#c8102e] rounded-xl transition-all font-black text-[10px] cursor-pointer shrink-0"
                      >
                        تغییر کشور
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCustomSubmit} className="space-y-2.5 animate-fade-in">
                      <label className="text-[10px] font-black text-stone-500 block">
                        کشور یا منطقه واقعی خود را وارد کنید:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customCountryInput}
                          onChange={(e) => setCustomCountryInput(e.target.value)}
                          placeholder="مثلا: تهران، اتریش، گراتس..."
                          className="flex-1 text-right p-2 rounded-xl border border-stone-200 text-xs font-bold focus:border-[#c8102e] focus:outline-none focus:ring-2 focus:ring-rose-100"
                          required
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-black hover:bg-stone-800 transition-all cursor-pointer"
                        >
                          تایید
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsChanging(false)}
                          className="px-3 bg-white border border-stone-200 text-stone-500 rounded-xl text-xs font-black hover:bg-stone-50 transition-all cursor-pointer"
                        >
                          لغو
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* ========================================== */}
              {/* FEATURE HIGHLIGHTS */}
              {/* ========================================== */}
              <div className="px-5 pt-4">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Zap className="w-3.5 h-3.5 text-[#c8102e]" />
                  <span className="text-[10px] font-black text-stone-500">
                    محبوب‌ترین سرویس‌های اتریش‌نشین
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {FEATURE_HIGHLIGHTS.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <div
                        key={i}
                        className="bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-xl p-2.5 flex items-center gap-2 hover:border-[#c8102e]/30 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-black text-stone-800 truncate">
                            {f.title}
                          </div>
                          <div className="text-[8.5px] text-stone-500 font-bold truncate">
                            {f.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ========================================== */}
              {/* 3-IMAGE MINI GALLERY */}
              {/* ========================================== */}
              <div className="px-5 pt-4">
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { img: IMAGES.viennaNight, label: "وین" },
                    { img: IMAGES.alps, label: "آلپ" },
                    { img: IMAGES.coffee, label: "کافه" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="relative h-16 rounded-xl overflow-hidden border border-stone-200 group cursor-pointer"
                    >
                      <img
                        src={item.img}
                        alt={item.label}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
                      <div className="absolute bottom-1 right-1.5 text-[9px] font-black text-white">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ========================================== */}
              {/* COMMUNITY MESSAGE */}
              {/* ========================================== */}
              <div className="px-5 pt-4 pb-4">
                <div className="flex gap-2.5 bg-gradient-to-br from-rose-50/40 to-amber-50/40 border border-rose-100 rounded-2xl p-3.5">
                  <Heart className="w-4 h-4 text-[#c8102e] shrink-0 mt-0.5 fill-red-500/10" />
                  <div className="text-[10.5px] text-stone-700 leading-relaxed font-bold">
                    <strong className="text-stone-900 block mb-0.5">
                      هدف ما: همبستگی فارسی‌زبانان در اتریش
                    </strong>
                    ارتقای سطح معیشتی، اطلاعاتی و همبستگی همه‌جانبه فارسی‌زبانان
                    و متخصصین، در راستای قوانین اتریش.
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================== */}
            {/* STICKY FOOTER CTA */}
            {/* ========================================== */}
            <div className="shrink-0 p-4 pt-3 bg-white border-t border-stone-200">
              <button
                onClick={() => handleClose()}
                className="group relative overflow-hidden w-full py-3 bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:shadow-lg shadow-red-500/20 text-white font-black rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-[13px]"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Check className="w-4 h-4 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">
                  سپاسگزارم، به دنیای اتریش‌نشین هدایت شوم
                </span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform relative z-10" />
              </button>

              {/* Small footnote */}
              <div className="flex items-center justify-center gap-3 mt-2.5 text-[9px] font-bold text-stone-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  امن و محرمانه
                </span>
                <span className="text-stone-300">•</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500" />
                  خدمات داوطلبانه
                </span>
                <span className="text-stone-300">•</span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-sky-500" />
                  بدون مرز
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
}