import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Info, Home, Users, Coins, Calculator, CheckCircle2, XCircle,
  TrendingUp, ShieldCheck, Clock, MapPin, Sparkles, ArrowLeft,
  ChevronDown, Building2, Wallet, PiggyBank, BadgeCheck,
  AlertTriangle, FileText, Scale, Landmark, Star, HelpCircle
} from 'lucide-react';

/* ============================================================
   تصاویر ویژه (Unsplash - بهینه و رایگان)
============================================================ */
const IMG_HERO =
  'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80';
// وین - معماری اتریش
const IMG_VIENNA =
  'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1000&q=80';
// ساختمان مسکونی مدرن
const IMG_APARTMENT =
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80';

/* ============================================================
   داده‌های سئو - FAQ
============================================================ */
const FAQS = [
  {
    q: 'کمک‌هزینه مسکن شهرداری وین (Wohnbeihilfe) چیست؟',
    a: 'Wohnbeihilfe یک کمک‌هزینه ماهانه از سوی شهرداری وین (MA 50) است که بخشی از اجاره‌بهای مسکن را برای خانوارهای دارای درآمد محدود پرداخت می‌کند. هدف آن جلوگیری از فشار مالی اجاره بر خانواده‌های کم‌درآمد واجد شرایط است.',
  },
  {
    q: 'شرط سنوات اقامت برای دریافت Wohnbeihilfe چقدر است؟',
    a: 'برای دریافت کمک‌هزینه مسکن شهرداری وین، متقاضیان باید حداقل ۲ سال سابقه اقامت قانونی (ملده فعال) در اتریش داشته باشند. علاوه بر این، واحد مسکونی باید مجهز به ملده (Meldezettel) و مطابق استانداردهای MA 50 باشد.',
  },
  {
    q: 'حداکثر متراژ مجاز برای محاسبه Wohnbeihilfe چقدر است؟',
    a: 'بر اساس دستورالعمل MA 50، حداکثر متراژ قابل‌قبول برای محاسبه یارانه مسکن به این شرح است: ۱ نفر تا ۵۰ مترمربع، ۲ نفر تا ۷۰ مترمربع و ۳ نفر یا بیشتر تا ۸۰ مترمربع. متراژ مازاد در محاسبه لحاظ نمی‌شود.',
  },
  {
    q: 'آیا درآمد ناخالص یا خالص ملاک محاسبه است؟',
    a: 'ملاک محاسبه، مجموع درآمد خالص ماهانه (Nettoeinkommen) تمام اعضای خانوار است. درآمدهای ناخالص، کمک‌هزینه‌های دولتی معاف و برخی درآمدهای سرمایه‌ای با ضرایب خاص لحاظ می‌شوند.',
  },
  {
    q: 'Wohnbeihilfe چقدر طول می‌کشد تا تأیید شود؟',
    a: 'پس از ثبت درخواست آنلاین در پورتال MA 50، معمولاً بین ۴ تا ۸ هفته زمان برای بررسی و صدور تصمیم اولیه لازم است. در صورت نقص مدارک، این بازه طولانی‌تر می‌شود.',
  },
  {
    q: 'آیا با درآمد بالا می‌توان همچنان Wohnbeihilfe گرفت؟',
    a: 'خیر. سقف درآمد خانوار برای واجد شرایط بودن به تعداد اعضا بستگی دارد. به‌طور تقریبی، برای خانوار ۲ نفره سقف درآمد ناخالص ماهانه حدود ۲,۶۰۰ یورو و برای هر نفر اضافه حدود ۶۵۰ یورو اضافه می‌شود. فراتر از این، احتمال رد درخواست بالاست.',
  },
];

/* ============================================================
   سقف درآمد تقریبی MA 50 (برای جدول داینامیک)
============================================================ */
const INCOME_TABLE = [
  { members: '۱ نفر', netCeil: '~ ۱٬۳۰۰ €', size: '۵۰ m²', refRent: '~ ۴۲۵ €' },
  { members: '۲ نفر', netCeil: '~ ۲٬۶۰۰ €', size: '۷۰ m²', refRent: '~ ۵۹۵ €' },
  { members: '۳ نفر', netCeil: '~ ۳٬۲۵۰ €', size: '۸۰ m²', refRent: '~ ۶۸۰ €' },
  { members: '۴ نفر', netCeil: '~ ۳٬۹۰۰ €', size: '۸۰ m²', refRent: '~ ۶۸۰ €' },
];

/* ============================================================
   مزایای کلیدی
============================================================ */
const BENEFITS = [
  {
    icon: Wallet,
    title: 'پرداخت ماهانه مستقیم',
    desc: 'مبلغ یارانه به‌صورت ماهانه به حساب شما واریز می‌شود، نه به صاحبخانه.',
    color: 'from-emerald-500 to-green-600',
  },
  {
    icon: ShieldCheck,
    title: 'قانونی و تضمینی',
    desc: 'مبتنی بر قانون حمایت از مستأجران وین (Wiener Wohnbauförderung).',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: TrendingUp,
    title: 'قابل تمدید دائمی',
    desc: 'تا زمانی که شرایط درآمدی و سکونتی حفظ شود، قابل دریافت مستمر است.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Scale,
    title: 'بدون محدودیت ملّیت',
    desc: 'اتباع خارجی دارای اقامت قانونی نیز واجد شرایط دریافت هستند.',
    color: 'from-rose-500 to-red-600',
  },
];

/* ============================================================
   مراحل دریافت (HowTo)
============================================================ */
const STEPS = [
  { icon: FileText, t: 'تکمیل فرم آنلاین', d: 'ثبت درخواست در پورتال MA 50 شهرداری وین.' },
  { icon: Home, t: 'ارائه مدارک مسکن', d: 'قرارداد اجاره، Meldezettel، و مدرک متراژ.' },
  { icon: Coins, t: 'ارسال مدارک درآمدی', d: 'فیش حقوقی، اظهارنامه مالیاتی یا مدارک AMS.' },
  { icon: BadgeCheck, t: 'دریافت تصمیم (Bescheid)', d: 'بررسی ۴ تا ۸ هفته و واریز ماهانه یارانه.' },
];

/* ============================================================
   کامپوننت اصلی
============================================================ */
export default function WohnbeihilfeBlockEnhanced() {
  const [houseSize, setHouseSize] = useState<string>('65');
  const [occupants, setOccupants] = useState<number>(2);
  const [householdIncome, setHouseholdIncome] = useState<string>('1800');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [wohnResult, setWohnResult] = useState<{
    eligible: boolean;
    amount: number;
    text: string;
  } | null>(null);

  const calculateWohnbeihilfe = (e: React.FormEvent) => {
    e.preventDefault();
    const size = parseFloat(houseSize);
    const income = parseFloat(householdIncome);
    if (isNaN(size) || isNaN(income)) return;

    const maxRepresentativeSize = occupants === 1 ? 50 : occupants === 2 ? 70 : 80;
    const sizeToUse = Math.min(size, maxRepresentativeSize);
    const referenceRent = sizeToUse * 8.5;
    const survivalRate = occupants * 650;

    let reasonableContribution = 0;
    if (income > survivalRate) {
      reasonableContribution = (income - survivalRate) * 0.35 + occupants * 150;
    } else {
      reasonableContribution = occupants * 120;
    }

    const estimatedSubsidy = Math.round(Math.max(0, referenceRent - reasonableContribution));

    if (estimatedSubsidy > 20 && income < occupants * 1300) {
      setWohnResult({
        eligible: true,
        amount: estimatedSubsidy,
        text: `تبریک! شما واجد شرایط دریافت تخمینی حدود ${estimatedSubsidy.toLocaleString('fa-IR')} یورو در ماه از شهرداری وین (MA 50) هستید.`,
      });
    } else {
      setWohnResult({
        eligible: false,
        amount: 0,
        text: 'متأسفانه بر اساس سقف درآمد یا نسبت متراژ به تعداد نفرات، در محدوده پرداخت یارانه مسکن شهرداری قرار ندارید.',
      });
    }
  };

  /* ---------- Schema JSON-LD ---------- */
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'ماشین‌حساب کمک‌هزینه مسکن شهرداری وین (Wohnbeihilfe)',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web',
          inLanguage: 'fa-IR',
          description:
            'محاسبه‌گر آنلاین صلاحیت دریافت Wohnbeihilfe (یارانه مسکن) شهرداری وین بر اساس متراژ، تعداد ساکنان و درآمد خالص.',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
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
          name: 'نحوه دریافت Wohnbeihilfe از شهرداری وین',
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
            { '@type': 'ListItem', position: 2, name: 'ابزارها', item: 'https://otrish-iran.ir/tools' },
            { '@type': 'ListItem', position: 3, name: 'Wohnbeihilfe' },
          ],
        },
      ],
    }),
    []
  );

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section
        dir="rtl"
        className="font-sans bg-gradient-to-b from-white via-rose-50/30 to-white py-10 md:py-16 space-y-12"
        id="wohnbeihilfe-block"
      >
        {/* ============ HERO ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[36px] border border-rose-200 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 md:p-12 space-y-5">
              <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-[10px] font-black px-3 py-1.5 border border-red-100 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                MUNICIPAL HOUSING AID · WIEN MA 50
              </span>

              <h1 className="font-black text-stone-900 text-2xl md:text-4xl leading-tight">
                تا <span className="text-[#c8102e]">۷۰۰ یورو در ماه</span> از اجاره‌بهایتان را شهرداری وین پرداخت می‌کند — آیا شما واجد شرایط هستید؟
              </h1>

              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-bold">
                هر ساله هزاران خانوار فارسی‌زبان مقیم وین، بدون اطلاع از حق قانونی خود، از دریافت
                کمکهزینه مسکن <strong>Wohnbeihilfe</strong> محروم می‌مانند. شهرداری وین (از طریق MA 50)
                بخش قابل‌توجهی از اجاره ماهیانه شما را پرداخت می‌کند — اگر بدانید چطور درخواست دهید.
                <span className="text-[#c8102e]"> همین حالا در ۳۰ ثانیه شانس خود را محاسبه کنید.</span>
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: CheckCircle2, t: '۱۰۰٪ رایگان' },
                  { icon: Clock, t: 'محاسبه آنی' },
                  { icon: ShieldCheck, t: 'بر پایه فرمول MA 50' },
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
            </div>

            <div className="lg:col-span-5 relative min-h-[260px]">
              <img
                src={IMG_HERO}
                alt="نمای شهری وین اتریش - ساختمان‌های مسکونی مجهز به ملده برای دریافت Wohnbeihilfe"
                loading="lazy"
                width={1200}
                height={800}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/40 lg:to-white" />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-[10px] font-black text-stone-500 mb-0.5">میانگین یارانه ماهانه</div>
                <div className="text-xl font-black text-[#c8102e]">۳۲۰ €</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============ STATS BAR ============ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Users, v: '٪۴۲', l: 'خانوار وین واجد شرایط' },
            { icon: Coins, v: '۳۲۰€', l: 'میانگین یارانه ماهانه' },
            { icon: Home, v: 'MA 50', l: 'مرجع رسمی صدور' },
            { icon: Clock, v: '۴-۸ هفته', l: 'زمان بررسی درخواست' },
          ].map((s, i) => (
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

        {/* ============ CALCULATOR + INFO ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* فرم ماشین‌حساب */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={calculateWohnbeihilfe}
            className="lg:col-span-7 bg-white border border-stone-200 p-6 md:p-8 rounded-[30px] grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-sm"
          >
            <div className="sm:col-span-2 flex items-center gap-2 pb-2 border-b border-stone-100">
              <Calculator className="w-5 h-5 text-[#c8102e]" />
              <h2 className="text-sm font-black text-stone-900">
                ماشین‌حساب هوشمند Wohnbeihilfe
              </h2>
            </div>

            <div>
              <label htmlFor="wh-size" className="text-[10px] font-black text-stone-600 block mb-1">
                متراژ مسکن (مترمربع - m²):
              </label>
              <input
                id="wh-size"
                type="number"
                required
                value={houseSize}
                onChange={(e) => setHouseSize(e.target.value)}
                placeholder="مثلا: ۶۵"
                className="w-full bg-stone-50 border border-stone-200 p-2.5 rounded-xl font-mono text-xs text-left text-stone-900 outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-red-100 transition"
              />
            </div>

            <div>
              <label htmlFor="wh-occupants" className="text-[10px] font-black text-stone-600 block mb-1">
                تعداد افراد ساکن مجهز به ملده:
              </label>
              <select
                id="wh-occupants"
                value={occupants}
                onChange={(e) => setOccupants(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 p-2.5 rounded-xl text-xs outline-none cursor-pointer text-stone-800 focus:border-[#c8102e]"
              >
                <option value={1}>۱ نفر</option>
                <option value={2}>۲ نفر</option>
                <option value={3}>۳ نفر یا بیشتر</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="wh-income" className="text-[10px] font-black text-stone-600 block mb-1">
                مجموع درآمد خالص ماهیانه متقاضیان (یورو):
              </label>
              <div className="relative">
                <input
                  id="wh-income"
                  type="number"
                  required
                  value={householdIncome}
                  onChange={(e) => setHouseholdIncome(e.target.value)}
                  placeholder="مثلا: ۱۸۰۰"
                  className="w-full bg-stone-50 border border-stone-200 p-2.5 pr-8 rounded-xl font-mono text-xs text-left text-stone-900 outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-red-100 transition"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                  €
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="sm:col-span-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:opacity-90 text-white text-xs font-black p-3.5 rounded-2xl cursor-pointer shadow-md hover:scale-[1.01] active:scale-98 transition-all inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              بررسی واجد شرایط بودن Wohnbeihilfe
            </button>

            <p className="sm:col-span-2 text-[10px] text-stone-400 font-bold leading-relaxed text-center">
              این محاسبه‌گر صرفاً جنبه تخمینی دارد و جایگزین تصمیم رسمی MA 50 نیست.
            </p>
          </motion.form>

          {/* کارت نتیجه + یادآوری */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white border border-stone-200 p-5 rounded-3xl flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h4 className="text-[11px] font-black text-stone-900">شرط سنوات اقامت</h4>
                <p className="text-[10.5px] text-stone-500 leading-relaxed font-bold">
                  برای دریافت این کمک‌هزینه در وین، حداقل <strong>۲ سال سابقه ملده فعال</strong> در اتریش لازم است.
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {wohnResult ? (
                <motion.div
                  key={wohnResult.eligible ? 'yes' : 'no'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex-1 p-6 rounded-3xl border-2 text-right space-y-3 ${
                    wohnResult.eligible
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-rose-50 border-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {wohnResult.eligible ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    )}
                    <h4
                      className={`text-sm font-black ${
                        wohnResult.eligible ? 'text-emerald-800' : 'text-rose-800'
                      }`}
                    >
                      {wohnResult.eligible ? 'شما واجد شرایط تخمینی هستید' : 'عدم تطابق با الگو'}
                    </h4>
                  </div>

                  {wohnResult.eligible && (
                    <div className="bg-white rounded-2xl border border-emerald-200 p-4">
                      <div className="text-[10px] font-black text-emerald-700 mb-1">
                        یارانه ماهانه تخمینی
                      </div>
                      <div className="text-3xl font-black text-emerald-700" dir="ltr">
                        {wohnResult.amount.toLocaleString('fa-IR')} €
                      </div>
                    </div>
                  )}

                  <p className="text-[11px] leading-relaxed font-bold text-stone-700">
                    {wohnResult.text}
                  </p>
                </motion.div>
              ) : (
                <div className="flex-1 p-6 bg-stone-50 border border-dashed border-stone-300 rounded-3xl text-center text-xs text-stone-400 font-bold italic flex items-center justify-center min-h-[160px]">
                  برای برآورد، فرم سمت راست را تکمیل و دکمه را فشار دهید.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ============ تصویر میانی + توضیح ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[280px]">
            <img
              src={IMG_VIENNA}
              alt="شهرداری وین اتریش - Rathaus Wien - مرجع پرداخت Wohnbeihilfe به فارسی‌زبانان"
              loading="lazy"
              width={1000}
              height={700}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 text-white">
              <div className="text-[10px] font-black opacity-80 mb-1">RATHAUS WIEN</div>
              <div className="text-base font-black">مرجع رسمی پرداخت یارانه مسکن</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#c8102e]" />
              Wohnbeihilfe دقیقاً چیست و چرا مهم است؟
            </h2>
            <p className="text-xs text-stone-600 font-bold leading-relaxed">
              Wohnbeihilfe یکی از سخاوتمندانه‌ترین برنامه‌های حمایت مسکن در اروپا است. برخلاف کمک‌هزینه‌های
              موقت، این یارانه به‌صورت <strong>ماهانه و مستمر</strong> به مستأجران واجد شرایط پرداخت می‌شود و
              می‌تواند بخش قابل‌توجهی از اجاره‌بهای بازار آزاد وین را پوشش دهد. بسیاری از فارسی‌زبانان
              به دلیل عدم آگاهی از شرایط دقیق، از این حق قانونی خود محروم می‌مانند.
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
                    <h4 className="text-[11px] font-black text-stone-900 mb-0.5">{b.title}</h4>
                    <p className="text-[10px] text-stone-500 font-bold leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ============ جدول سقف درآمد ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border border-indigo-200 rounded-3xl p-6 md:p-8"
        >
          <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-indigo-600" />
                جدول تقریبی سقف درآمد و یارانه MA 50
              </h2>
              <p className="text-[11px] text-stone-600 font-bold mt-1">
                اعداد زیر بر اساس میانگین فرمول‌های اجرایی سال ۲۰۲۴ است و صرفاً جنبه راهنما دارد.
              </p>
            </div>
            <span className="text-[10px] font-black bg-white text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-200">
              بروزرسانی: ۱۴۰۴
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-indigo-100 bg-white">
            <table className="w-full text-right text-xs">
              <thead className="bg-indigo-50/70 text-indigo-900">
                <tr>
                  <th className="px-4 py-3 font-black">تعداد نفرات</th>
                  <th className="px-4 py-3 font-black">سقف درآمد خالص ماهانه</th>
                  <th className="px-4 py-3 font-black">حداکثر متراژ مجاز</th>
                  <th className="px-4 py-3 font-black">سقف اجاره مرجع</th>
                </tr>
              </thead>
              <tbody>
                {INCOME_TABLE.map((r, i) => (
                  <tr
                    key={i}
                    className="border-t border-indigo-100 hover:bg-indigo-50/40 transition"
                  >
                    <td className="px-4 py-3 font-black text-stone-800">{r.members}</td>
                    <td className="px-4 py-3 text-stone-600 font-bold">{r.netCeil}</td>
                    <td className="px-4 py-3 text-stone-600 font-bold">{r.size}</td>
                    <td className="px-4 py-3 text-emerald-700 font-black">{r.refRent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ============ مراحل HowTo ============ */}
        <div>
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <h2 className="text-lg font-black text-stone-900 flex items-center justify-center gap-2">
              <BadgeCheck className="w-5 h-5 text-[#c8102e]" />
              مسیر دریافت Wohnbeihilfe در ۴ گام
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از ثبت درخواست تا واریز اولین یارانه — همه چیز شفاف و مرحله‌به‌مرحله
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative bg-white rounded-3xl border border-stone-200 p-6 overflow-hidden group"
              >
                <div className="absolute top-3 left-3 text-5xl font-black text-stone-100 select-none">
                  {i + 1}
                </div>
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="relative text-sm font-black text-stone-900 mb-1">{s.t}</h3>
                <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============ تصویر سوم: آپارتمان ============ */}
        <div className="relative rounded-3xl overflow-hidden min-h-[240px] md:min-h-[300px]">
          <img
            src={IMG_APARTMENT}
            alt="آپارتمان مدرن مجهز در وین مناسب برای دریافت کمکهزینه مسکن Wohnbeihilfe MA 50"
            loading="lazy"
            width={1000}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a1128]/85 via-[#0a1128]/60 to-transparent" />
          <div className="relative p-8 md:p-12 max-w-xl text-white">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full mb-4">
              <Star className="w-3.5 h-3.5 text-amber-300" />
              نکته طلایی
            </span>
            <h3 className="text-xl md:text-2xl font-black mb-3 leading-snug">
              ملده فعال، کلید طلایی شما برای دریافت یارانه مسکن است
            </h3>
            <p className="text-xs md:text-sm text-stone-200 font-bold leading-relaxed">
              بدون ثبت آدرس در سامانه ملده (Meldeamt) و حفظ تداوم ۲۴ ماهه آن، پرونده Wohnbeihilfe شما
              بدون بررسی رد می‌شود. اگر به‌تازگی به آدرس جدید نقل مکان کرده‌اید، هرچه سریع‌تر نسبت به
              ثبت ملده جدید اقدام کنید.
            </p>
          </div>
        </div>

        {/* ============ FAQ ============ */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره Wohnbeihilfe
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های دقیق به پرتکرارترین سوالات فارسی‌زبانان مقیم اتریش
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

        {/* ============ CTA پایانی ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] font-black px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              همین امروز اقدام کنید
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              هر ماه تعویق، یک ماه یارانه از دست رفته است
            </h2>
            <p className="text-sm text-stone-300 font-bold leading-relaxed">
              تیم اتریش‌نشین می‌تواند در تهیه مدارک، ترجمه رسمی و ثبت درخواست MA 50 همراه شما باشد.
              برای مشاوره رایگان اولین قدم را بردارید.
            </p>
            <div className="flex gap-3 justify-center flex-wrap pt-1">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                مشاوره در واتس‌اپ
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-black text-xs px-6 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <Building2 className="w-4 h-4" />
                پشتیبانی تلگرام
              </a>
            </div>
          </div>
        </motion.div>

        {/* ============ Disclaimer ============ */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              این محاسبه‌گر صرفاً یک ابزار تخمینی است و نتایج آن جایگزین تصمیم رسمی MA 50 یا مشاوره
              حقوقی نیست. برای بررسی دقیق پرونده خود، همیشه با کارشناسان مجاز یا پورتال رسمی شهرداری
              وین تماس بگیرید.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}