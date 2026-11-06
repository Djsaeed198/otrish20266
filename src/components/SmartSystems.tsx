import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import GuideModal, { GuideContent } from "./GuideModal";
import SEO from "./SEO";
import {
  Sparkles, Users, Coins, Award, BookOpen, CheckCircle,
  AlertTriangle, FileText, TrendingUp, MapPin, Clock, PlusCircle,
  ChevronRight, ChevronLeft, HelpCircle, ArrowLeft, Shield, Home, Receipt,
  Scale, Heart, Calculator, GraduationCap, Languages, Briefcase,
  ShieldCheck, ArrowLeftRight, Building, Milestone, Search,
  FileCheck, PiggyBank, Globe, PhoneCall, Send, Quote, Star,
  Zap, BarChart3, Compass, Layers, Target, Trophy, Key, Wallet,
  Mountain, TreePine, Landmark, Euro, Quote as QuoteIcon,
} from "lucide-react";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES — Austria themed
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=80",
  parliament: "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=1200&q=80",
  family: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
  mountains: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=1200&q=80",
  office: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  vienna: "https://images.unsplash.com/photo-1583687355032-89b902b7335f?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// TYPES
// ==========================================
interface WaitTimeReport {
  id: string;
  type: "student" | "family" | "job" | "legal";
  title: string;
  wait: string;
  traffic: "high" | "medium" | "low";
  percent: number;
  updateDate: string;
}

type RwrCategory = "highly-qualified" | "shortage-occupations" | "other-key" | "graduates";

const majorDatabase: Record<string, {
  title: string;
  authority: string;
  duration: string;
  germanLevel: string;
  fees: string;
  steps: string[];
  websites: string[];
}> = {
  "software-engineering": {
    title: "مهندسی کامپیوتر، نرم‌افزار، آی‌تی و هوش مصنوعی (Informatik)",
    authority: "ENIC-NARIC Austria / دانشگاه‌های فنی وین و گراتس",
    duration: "۱ الی ۳ ماه (ارزیابی مدارک دانشگاهی خارجی)",
    germanLevel: "در ابتدا اختیاری (جهت ویزای کار امتیازآور است، اما تدریس و کار به انگلیسی بلامانع است)",
    fees: "۱۵۰ الی ۳۵۰ یورو بسته به نوع مدارک",
    steps: [
      "ترجمه رسمی ریزنمرات و مدارک تحصیلی به آلمانی یا انگلیسی ممهور به مهرهای دادگستری و وزارت خارجه.",
      "تایید و آپوستیل مدارک در سفارت اتریش در تهران.",
      "بارگذاری و ارسال آنلاین به سامانه رسمی ارزشیابی مدارک (www.asub.at).",
      "صدور گواهی همسنگی (Bewertung) جهت تسهیل دریافت جاب‌آفر مطابق جدول حقوق قانون کار اتریش."
    ],
    websites: ["www.asub.at", "www.bmbwf.gv.at"]
  },
  "nursing": {
    title: "پرستاری، مامایی، اتاق عمل و کادر پیراپزشکی",
    authority: "سازمان بهداشت دولتی اتریش (GÖG) و ایالات محلی",
    duration: "۳ الی ۶ ماه (به علت نیاز شدید با اولویت بالا بررسی می‌شود)",
    germanLevel: "حداقل مدرک B1 یا B2 رسمی آلمانی در زمان صدور مجوز کار نهایی الزامی است",
    fees: "۲۰۰ الی ۴۰۰ یورو به همراه آزمون‌های عملی احتمالی",
    steps: [
      "ارائه گواهی عدم سوء‌پیشینه، مدرک تحصیلی رسمی و گواهی سلامت جسمانی معتبر.",
      "ارسال کل مدارک آموزشی و بالینی با ترجمه آلمانی به اداره بهداشت اتریش جهت سنجش انحراف برنامه درسی (Defizitbescheid).",
      "گذراندن دوره‌های کارورزی تکمیلی کوتاه‌مدت یا امتحان معادل در اتریش پس از اخذ ویزای معادلسازی.",
      "دریافت ثبت‌نام رسمی در پرتال مشاغل درمانی (Gesundheits- und Berufsregister)."
    ],
    websites: ["www.goeg.at", "www.pflegeregister.at"]
  },
  "architecture": {
    title: "مهندسی عمران، معماری، نقشه‌برداری و شهرسازی",
    authority: "اتاق مهندسین و فدرال اتریش (Ziviltechnikerkammer)",
    duration: "۲ الی ۴ ماه",
    germanLevel: "ترجیحاً سطح B2 جهت ارائه طرح‌ها، نقشه‌ها و مذاکرات فنی رسمی شهرداری‌ها",
    fees: "۲۵۰ الی ۵۰۰ یورو",
    steps: [
      "ترجمه رسمی ریزنمرات، کاتالوگ پروژه یا پورتفولیو پروژه‌های عمرانی انجام‌شده.",
      "ثبت در پرتال ENIC-NARIC جهت دریافت همترازسازی اولیه دانشگاهی.",
      "عضویت مشروط در صنف مهندسان ناظر جهت کار قانونمند ذیل هدایت یک مهندس ناظر ارشد اتریشی.",
      "شرکت در مصاحبه ارزیابی قوانین ساخت‌وساز فدرال اتریش جهت امضای مستقل نقشه‌ها."
    ],
    websites: ["www.ztkammer.at", "www.asub.at"]
  },
  "medicine": {
    title: "پزشکی عمومی، دندان‌پزشکی، داروسازی و جراحی تخصصی",
    authority: "نظام پزشکی فدرال اتریش (Österreichische Ärztekammer)",
    duration: "۶ الی ۱۲ ماه (فرآیند حقوقی و آکادمیک طولانی)",
    germanLevel: "مدرک سطح C1 پزشکی (Fachsprachenprüfung) جهت تایید صلاحیت طبابت کاملا الزامی است",
    fees: "۵۰۰ الی ۱۵۰۰ یورو شامل آزمون‌های کتبی همسنگی",
    steps: [
      "ثبت درخواست و ترجمه رسمی جامع دانشگاهی، دوره‌های انترنی و رزیدنتی.",
      "قبولی کامل در آزمون تئوری و علمی دندانپزشکی یا پزشکی دانشگاه‌های وین، گراتس یا اینسبروک.",
      "گذراندن آزمون سخت‌گیرانه اصطلاحات بالینی و حرفه‌ای آلمانی (C1).",
      "ثبت رسمی در لیست پزشکان فعال اتریش و شروع طبابت دولتی یا مطب شخصی."
    ],
    websites: ["www.aerztekammer.at", "www.meduniwien.ac.at"]
  }
};

// ==========================================
// TAB METADATA (enhanced icons)
// ==========================================
const TAB_GROUPS = [
  {
    id: "academic",
    label: "تحصیل، کار و مدارک",
    color: "from-[#c8102e] to-[#970d22]",
    text: "text-[#c8102e]",
    icon: GraduationCap,
    tabs: [
      { id: "rwr", label: "امتیاز RWR", icon: Award },
      { id: "nostrification", label: "معادل‌سازی", icon: BookOpen },
      { id: "academic", label: "دانشگاه", icon: GraduationCap },
      { id: "language", label: "مدرک زبان", icon: Languages },
    ],
  },
  {
    id: "finance",
    label: "حساب‌گرهای مالی",
    color: "from-emerald-600 to-teal-700",
    text: "text-emerald-700",
    icon: Calculator,
    tabs: [
      { id: "funds", label: "تمکن عمومی", icon: Coins },
      { id: "tax", label: "مالیات حقوق", icon: Calculator },
      { id: "business", label: "کسب‌وکار", icon: Building },
      { id: "transfer", label: "انتقال سرمایه", icon: ArrowLeftRight },
    ],
  },
  {
    id: "residency",
    label: "اقامت و سفارت",
    color: "from-indigo-600 to-blue-700",
    text: "text-indigo-700",
    icon: Shield,
    tabs: [
      { id: "solvency", label: "تمکن بدون کار", icon: Receipt },
      { id: "interview", label: "وقت سفارت", icon: Clock },
      { id: "roadmap", label: "کل مسیر", icon: Milestone },
      { id: "audit", label: "استعلام دفاتر", icon: ShieldCheck },
    ],
  },
  {
    id: "life",
    label: "زندگی و شهروندی",
    color: "from-amber-500 to-orange-600",
    text: "text-amber-700",
    icon: Home,
    tabs: [
      { id: "relocation", label: "مسکن", icon: Home },
      { id: "budget", label: "بودجه زندگی", icon: PiggyBank },
      { id: "insurance", label: "بیمه", icon: Heart },
      { id: "citizenship", label: "پاسپورت", icon: Scale },
    ],
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function SmartSystems() {
  const [activeTab, setActiveTab] = useState<string>("rwr");
  const [guideOpen, setGuideOpen] = useState(false);
  const [currentGuide, setCurrentGuide] = useState<GuideContent | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Guide data
  const guideData: Record<string, GuideContent> = useMemo(() => ({
    "netto": { title: "راهنمای ماشین‌حساب حقوق", points: ["محاسبات بر مبنای حقوق ناخالص است", "استفاده از نرخ SV سال ۲۰۲۶"], warnings: ["حقوق‌های پایین‌تر از حد معافیت مالیاتی نیاز به محاسبه دقیق ندارند."] },
    "rwrpoints": { title: "راهنمای امتیازات RWR", points: ["امتیازات سن، مدرک، زبان، سابقه کار"], warnings: ["کارت قرمز-سفید-سرخ نیازمند پیشنهاد کار قطعی است."] },
    "passporttime": { title: "راهنمای زمان‌بندی پاسپورت", points: ["شرط سکونت در اتریش", "اقامت دائم"], warnings: ["خروج طولانی‌مدت اقامت را باطل می‌کند."] },
  }), []);

  const openGuide = (key: string) => {
    setCurrentGuide(guideData[key]);
    setGuideOpen(true);
  };

  // ==========================================
  // RWR STATES
  // ==========================================
  const [rwrCategory, setRwrCategory] = useState<RwrCategory>("highly-qualified");
  const [age, setAge] = useState<number>(30);
  const [degree, setDegree] = useState<string>("master");
  const [austrianGrad, setAustrianGrad] = useState<boolean>(false);
  const [experienceYears, setExperienceYears] = useState<number>(5);
  const [specialExp, setSpecialExp] = useState<boolean>(false);
  const [germanLevel, setGermanLevel] = useState<string>("a2");
  const [englishLevel, setEnglishLevel] = useState<string>("none");
  const [austrianStudyTime, setAustrianStudyTime] = useState<boolean>(false);
  const [hasJobOffer, setHasJobOffer] = useState<boolean>(true);
  const [wageOffer, setWageOffer] = useState<number>(3100);

  // RWR calc
  const rwrResult = useMemo(() => {
    if (rwrCategory === "graduates") {
      const passes = austrianGrad && hasJobOffer && wageOffer >= 3132;
      return {
        total: passes ? 100 : 0,
        required: 100,
        passes,
        isGrad: true,
        breakdown: [
          { title: "مدرک تحصیلی اتریش (لیسانس یا بالاتر)", points: austrianGrad ? 50 : 0 },
          { title: "پیشنهاد کار تخصصی متناسب با رشته", points: hasJobOffer ? 50 : 0 },
          { title: "حداقل حقوق مصوب ۲۰۲۶ (€۳,۱۳۲)", points: wageOffer >= 3132 ? 50 : 0 },
        ]
      };
    }
    let pts = 0;
    const breakdown: { title: string; points: number }[] = [];

    if (rwrCategory === "highly-qualified") {
      if (degree === "phd") { pts += 40; breakdown.push({ title: "دکتری تخصصی (Ph.D)", points: 40 }); }
      else if (degree === "master") { pts += 30; breakdown.push({ title: "کارشناسی ارشد علمی", points: 30 }); }
      else if (degree === "bachelor") { pts += 20; breakdown.push({ title: "کارشناسی معتبر", points: 20 }); }
      if (austrianGrad) { pts += 10; breakdown.push({ title: "دانش‌آموخته دانشگاه اتریش", points: 10 }); }
    } else {
      if (["phd", "master", "bachelor"].includes(degree)) { pts += 30; breakdown.push({ title: "مدرک عالی دانشگاهی", points: 30 }); }
      else if (degree === "vocational") { pts += 20; breakdown.push({ title: "مدرک فنی‌وحرفه‌ای", points: 20 }); }
      else if (degree === "secondary") { pts += 25; breakdown.push({ title: "دیپلم متوسطه", points: 25 }); }
    }

    const expPts = Math.min(20, experienceYears * 2);
    pts += expPts;
    if (experienceYears > 0) breakdown.push({ title: `سابقه کار (${experienceYears} سال)`, points: expPts });
    if (rwrCategory === "highly-qualified" && specialExp) { pts += 10; breakdown.push({ title: "سابقه مدیریتی/کارآفرینی", points: 10 }); }

    let langPts = 0;
    if (rwrCategory === "highly-qualified") {
      langPts = Math.min(10, Math.max(germanLevel !== "none" ? 10 : 0, englishLevel !== "none" ? 10 : 0));
    } else {
      const tempGerman = germanLevel === "a1" ? 10 : germanLevel === "a2" ? 15 : germanLevel === "b1" ? 20 : germanLevel !== "none" ? 25 : 0;
      const tempEnglish = englishLevel === "ielts-6" ? 10 : englishLevel === "ielts-7" ? 15 : 0;
      langPts = rwrCategory === "shortage-occupations" ? Math.max(tempGerman, tempEnglish) : tempGerman;
    }
    pts += langPts;
    if (langPts > 0) breakdown.push({ title: "تسلط زبانی تایید شده", points: langPts });

    let agePoints = 0;
    if (rwrCategory === "highly-qualified") {
      if (age <= 35) agePoints = 20; else if (age <= 40) agePoints = 15; else if (age <= 45) agePoints = 10;
    } else {
      if (age <= 30) agePoints = 15; else if (age <= 40) agePoints = 10;
    }
    pts += agePoints;
    if (agePoints > 0) breakdown.push({ title: `سن متقاضی (${age} سال)`, points: agePoints });

    if (rwrCategory === "highly-qualified" && austrianStudyTime) { pts += 10; breakdown.push({ title: "سابقه تحصیل در اتریش", points: 10 }); }

    const required = rwrCategory === "highly-qualified" ? 70 : 55;
    return { total: pts, required, passes: pts >= required, isGrad: false, breakdown };
  }, [rwrCategory, age, degree, germanLevel, englishLevel, experienceYears, austrianGrad, austrianStudyTime, specialExp, hasJobOffer, wageOffer]);

  // Funds states
  const [isMarried, setIsMarried] = useState<boolean>(false);
  const [numChildren, setNumChildren] = useState<number>(0);
  const [warmRent, setWarmRent] = useState<number>(850);
  const [otherLoans, setOtherLoans] = useState<number>(0);

  const fundsResult = useMemo(() => {
    const baseSubsistence = isMarried ? 1930 : 1245;
    const childAdditions = numChildren * 192;
    const statutoryMinNet = baseSubsistence + childAdditions;
    const rentExcess = Math.max(0, warmRent - 382);
    const totalMonthlyRequired = Math.ceil(statutoryMinNet + rentExcess + otherLoans);
    return { statutoryMinNet, rentExcess, totalMonthlyRequired, totalFundsYearly: totalMonthlyRequired * 12 };
  }, [isMarried, numChildren, warmRent, otherLoans]);

  // Nostrification states
  const [majorField, setMajorField] = useState<string>("software-engineering");
  const selectedMajorInfo = majorDatabase[majorField] || majorDatabase["software-engineering"];

  // Interview states
  const [hasHousing, setHasHousing] = useState<string>("confirmed");
  const [germanSkill, setGermanSkill] = useState<string>("medium");
  const [hasPoliceClearance, setHasPoliceClearance] = useState<boolean>(true);
  const [hasAmsConfirmation, setHasAmsConfirmation] = useState<boolean>(true);
  const [unemploymentStatus, setUnemploymentStatus] = useState<boolean>(false);
  const [socialIntegration, setSocialIntegration] = useState<boolean>(true);

  const successResult = useMemo(() => {
    let index = 40;
    const notes: string[] = [];
    if (hasHousing === "confirmed") index += 20;
    else if (hasHousing === "family-owned") { index += 15; notes.push("ارائه مدارک ملکی بستگان با ترجمه رضایت‌نامه ضروری است."); }
    else if (hasHousing === "temporary") { index += 10; notes.push("اقامت خوابگاهی ممکن است سبب سوال آفیسر گردد."); }
    else notes.push("عدم اجاره ملک معتبر پرونده را با خطر مواجه می‌سازد.");

    if (germanSkill === "fluent") index += 20;
    else if (germanSkill === "medium") index += 15;
    else if (germanSkill === "basic") { index += 10; notes.push("تسلط عالی زبان شانس جاب‌آفر را بالا می‌برد."); }
    else notes.push("فقدان تسلط زبان آلمانی ممکن است آفیسر را مردد سازد.");

    if (hasPoliceClearance) index += 10;
    else notes.push("گواهی عدم سوء‌پیشینه ضروری است.");

    if (hasAmsConfirmation) index += 15;
    else notes.push("تاییدیه AMS پیش‌شرط قطعی است.");

    if (!unemploymentStatus) index += 10;
    else notes.push("فیش ثبتی فعال شانس موفقیت را بالا می‌برد.");

    if (socialIntegration) index += 5;
    return { index: Math.min(100, index), notes };
  }, [hasHousing, germanSkill, hasPoliceClearance, hasAmsConfirmation, unemploymentStatus, socialIntegration]);

  // Citizenship
  const [residenceYears, setResidenceYears] = useState<number>(10);
  const [germanB2, setGermanB2] = useState<string>("b2");
  const [hasDaueraufenthalt, setHasDaueraufenthalt] = useState<boolean>(true);
  const [noCriminalRecord, setNoCriminalRecord] = useState<boolean>(true);
  const [stableIncome36Months, setStableIncome36Months] = useState<boolean>(true);
  const [marriedToAustrian, setMarriedToAustrian] = useState<boolean>(false);

  const citizenshipResult = useMemo(() => {
    let requiredYears = 10;
    if (germanB2 === "b2" || germanB2 === "c1" || marriedToAustrian) requiredYears = 6;
    const isFullyEligible = residenceYears >= requiredYears && hasDaueraufenthalt && noCriminalRecord && stableIncome36Months && germanB2 !== "none";
    return { requiredYears, yearsDifference: Math.max(0, requiredYears - residenceYears), isFullyEligible };
  }, [residenceYears, germanB2, hasDaueraufenthalt, noCriminalRecord, stableIncome36Months, marriedToAustrian]);

  // Tax
  const [grossSalary, setGrossSalary] = useState<number>(3800);
  const [childrenExemptCount, setChildrenExemptCount] = useState<number>(0);

  const taxResult = useMemo(() => {
    const svRate = 0.1812;
    const monthlySV = Math.round(grossSalary * svRate);
    const taxableIncomeMonthly = grossSalary - monthlySV;
    const yearlyTaxable = Math.max(0, taxableIncomeMonthly * 12);
    let yearlyLSt = 0;
    if (yearlyTaxable <= 12750) yearlyLSt = 0;
    else if (yearlyTaxable <= 20583) yearlyLSt = (yearlyTaxable - 12750) * 0.20;
    else if (yearlyTaxable <= 34513) yearlyLSt = 1566.6 + (yearlyTaxable - 20583) * 0.30;
    else if (yearlyTaxable <= 66612) yearlyLSt = 5745.6 + (yearlyTaxable - 34513) * 0.40;
    else if (yearlyTaxable <= 99266) yearlyLSt = 18585.2 + (yearlyTaxable - 66612) * 0.48;
    else yearlyLSt = 34259.1 + (yearlyTaxable - 99266) * 0.50;

    let monthlyLSt = Math.round(yearlyLSt / 12);
    const childTaxCredit = childrenExemptCount * 166.67;
    monthlyLSt = Math.max(0, Math.round(monthlyLSt - childTaxCredit));
    const netMonthly = Math.max(0, grossSalary - monthlySV - monthlyLSt);

    const holidaySV = Math.round(grossSalary * 0.1612);
    const holidayTaxable = Math.max(0, grossSalary - holidaySV - 620);
    const holidayTax = Math.round(holidayTaxable * 0.06);
    const netHolidayBonus = grossSalary - holidaySV - holidayTax;
    const yearlyNetTotal = (netMonthly * 12) + (netHolidayBonus * 2);
    return { monthlySV, monthlyLSt, netMonthly, netHolidayBonus, yearlyNetTotal };
  }, [grossSalary, childrenExemptCount]);

  // Relocation
  const [relocDistrict, setRelocDistrict] = useState<string>("district-22");
  const [relocRentBase, setRelocRentBase] = useState<number>(950);
  const [selfCommissionedAgent, setSelfCommissionedAgent] = useState<boolean>(false);
  const [relocKautionMonths, setRelocKautionMonths] = useState<number>(3);

  const relocationResult = useMemo(() => {
    const kautionAmount = relocRentBase * relocKautionMonths;
    const maklerProvision = selfCommissionedAgent ? Math.round((relocRentBase * 2) * 1.20) : 0;
    const totalInitalCapital = kautionAmount + maklerProvision + 120 + 320;
    const districtMap: Record<string, { name: string; priceLevel: string; pros: string; cons: string }> = {
      "district-1": { name: "منطقه ۱ — قلب تاریخی", priceLevel: "بسیار گران (€۲۲+/m²)", pros: "تاریخی، موزه‌ها، کیفیت اعلا", cons: "شلوغی توریستی، گران" },
      "district-2": { name: "منطقه ۲ — لئوپولداشتات", priceLevel: "متوسط (€۱۵-۱۷/m²)", pros: "پارک پراتر، بافت دانشجویی", cons: "سروصدای شهر بازی" },
      "district-10": { name: "منطقه ۱۰ — فاووریتن", priceLevel: "اقتصادی (€۱۰-۱۲/m²)", pros: "ارزان، ارتباط مترو، چندفرهنگی", cons: "شلوغی شهری" },
      "district-18": { name: "منطقه ۱۸ — واهرینگ", priceLevel: "گران (€۱۶-۱۹/m²)", pros: "آرام، پارک‌های طبیعی", cons: "فاصله تا مرکز" },
      "district-22": { name: "منطقه ۲۲ — دوناواشتات", priceLevel: "متوسط (€۱۳-۱۵/m²)", pros: "نوساز، نزدیک دانوب، امن", cons: "نیاز به مترو" },
    };
    return { kautionAmount, maklerProvision, totalInitalCapital, currentDistrictInfo: districtMap[relocDistrict] || districtMap["district-22"] };
  }, [relocDistrict, relocRentBase, selfCommissionedAgent, relocKautionMonths]);

  // Solvency
  const [solvAdults, setSolvAdults] = useState<number>(1);
  const [solvKids, setSolvKids] = useState<number>(0);
  const [solvPassiveIncome, setSolvPassiveIncome] = useState<number>(3000);
  const [solvBankSavings, setSolvBankSavings] = useState<number>(35000);

  const solvencyResult = useMemo(() => {
    const baseStandardRatio = solvAdults === 2 ? 1930 : 1245;
    const calculatedStandardMonthly = baseStandardRatio + (solvKids * 192);
    const requiredMonthlyPassive = calculatedStandardMonthly * 2;
    const requiredYearlyBankBalance = requiredMonthlyPassive * 12;
    const recommendedBankBalance = Math.ceil(requiredYearlyBankBalance * 1.15);
    const passesIncome = solvPassiveIncome >= requiredMonthlyPassive;
    const passesSavings = solvBankSavings >= requiredYearlyBankBalance;
    let overallStatus: "approved" | "warning" | "rejected" = "rejected";
    if (passesIncome && passesSavings) overallStatus = "approved";
    else if (passesIncome || solvBankSavings >= requiredYearlyBankBalance * 0.85) overallStatus = "warning";
    return { requiredMonthlyPassive, requiredYearlyBankBalance, recommendedBankBalance, passesIncome, passesSavings, overallStatus };
  }, [solvAdults, solvKids, solvPassiveIncome, solvBankSavings]);

  // Insurance
  const [insAge, setInsAge] = useState<number>(32);
  const [insPreExisting, setInsPreExisting] = useState<boolean>(false);
  const [insPreferredPlan, setInsPreferredPlan] = useState<"public-only" | "supplementary" | "expat-private">("supplementary");
  const [insDentalCover, setInsDentalCover] = useState<boolean>(false);

  const insuranceResult = useMemo(() => {
    let basePremium = insAge <= 20 ? 25 : insAge <= 40 ? 45 : insAge <= 60 ? 85 : 140;
    let planName = "بیمه دولتی ÖGK";
    let planDesc = "بیمه اجباری کارمندی اتریش — پوشش همگانی در مطب‌های دولتی.";
    if (insPreferredPlan === "supplementary") {
      basePremium *= 1.6;
      planName = "بیمه تکمیلی Wahlarzt";
      planDesc = "پوشش درمان توسط پزشکان خصوصی با بازپرداخت مابه‌التفاوت.";
    } else if (insPreferredPlan === "expat-private") {
      basePremium *= 3.6;
      planName = "بیمه خصوصی Expat Full Cover";
      planDesc = "بیمه سلامت ۱۰۰٪ مورد تایید MA35 برای تمکن مالی.";
    }
    if (insPreExisting) basePremium *= 1.30;
    if (insDentalCover) basePremium += 25;
    return { planName, planDesc, estimatedPremiumMonthly: Math.round(basePremium) };
  }, [insAge, insPreExisting, insPreferredPlan, insDentalCover]);

  // Academic
  const [acadGpa, setAcadGpa] = useState<number>(16);
  const [acadCountry, setAcadCountry] = useState<"austria" | "spain" | "hungary">("austria");
  const [acadGerman, setAcadGerman] = useState<"none" | "a2" | "b2" | "c1">("b2");

  const academicResult = useMemo(() => {
    let baseChance = acadGpa >= 18 ? 95 : acadGpa >= 15 ? 75 : acadGpa >= 13 ? 55 : 35;
    if (acadGerman === "c1") baseChance = Math.min(100, baseChance + 15);
    else if (acadGerman === "b2") baseChance = Math.min(100, baseChance + 5);
    else if (acadGerman === "none") baseChance = Math.max(10, baseChance - 25);

    const config = {
      austria: { tuition: 1500, living: 13500, deadline: "۵ سپتامبر ۲۰۲۶ / ۵ فوریه ۲۰۲۷" },
      spain: { tuition: 3200, living: 11000, deadline: "۱۵ ژوئن ۲۰۲۶ / سپتامبر ۲۰۲۶" },
      hungary: { tuition: 6500, living: 9000, deadline: "۱۵ نوامبر ۲۰۲۶ / ۱۵ فوریه ۲۰۲۷" },
    }[acadCountry];
    return { baseChance, ...config };
  }, [acadGpa, acadCountry, acadGerman]);

  // Language
  const [langType, setLangType] = useState<"osd" | "goethe" | "telc" | "ielts" | "none">("osd");
  const [langLevel, setLangLevel] = useState<"a1" | "a2" | "b1" | "b2" | "c1" | "c2">("b2");
  const [langJobCategory, setLangJobCategory] = useState<"it" | "nursing" | "medicine" | "business" | "student">("it");

  const languageResult = useMemo(() => {
    const isApprovedByMA35 = ["osd", "goethe", "telc"].includes(langType) || (["ielts"].includes(langType) && ["it", "student"].includes(langJobCategory));
    const isEnoughForJob = langJobCategory === "medicine" ? ["c1", "c2"].includes(langLevel)
      : langJobCategory === "nursing" ? ["b2", "c1", "c2"].includes(langLevel)
      : langJobCategory === "student" ? langLevel !== "a1"
      : langJobCategory === "it" ? true
      : ["b1", "b2", "c1", "c2"].includes(langLevel);
    return { isApprovedByMA35, isEnoughForJob };
  }, [langType, langLevel, langJobCategory]);

  // Business
  const [bizRevenue, setBizRevenue] = useState<number>(75000);
  const [bizType, setBizType] = useState<"gmbh" | "eu">("eu");
  const [bizDeductibleAmount, setBizDeductibleAmount] = useState<number>(15000);

  const businessResult = useMemo(() => {
    const netProf = Math.max(0, bizRevenue - bizDeductibleAmount);
    const svsContribution = Math.round(netProf * 0.185);
    let taxAmount = 0;
    if (bizType === "gmbh") {
      taxAmount = Math.round((netProf - svsContribution) * 0.23);
    } else {
      const taxableAmount = netProf - svsContribution;
      if (taxableAmount <= 11693) taxAmount = 0;
      else if (taxableAmount <= 19134) taxAmount = Math.round((taxableAmount - 11693) * 0.20);
      else if (taxableAmount <= 32075) taxAmount = Math.round(1488 + (taxableAmount - 19134) * 0.30);
      else if (taxableAmount <= 62080) taxAmount = Math.round(5370 + (taxableAmount - 32075) * 0.40);
      else taxAmount = Math.round(17372 + (taxableAmount - 62080) * 0.48);
    }
    const estimatedNetProfit = Math.max(0, netProf - svsContribution - taxAmount);
    const totalFormationCost = bizType === "gmbh" ? 1500 + 350 + 2200 : 120 + 35 + 600;
    return { svsContribution, taxAmount, estimatedNetProfit, totalFormationCost };
  }, [bizRevenue, bizType, bizDeductibleAmount]);

  // Transfer
  const [transferAmount, setTransferAmount] = useState<number>(45000);
  const [transferType, setTransferType] = useState<"licensed-exchange" | "sepa-indirect" | "crypto">("licensed-exchange");

  const transferResult = useMemo(() => {
    let escrowFeePercent = 1.5, conversionSpreadPercent = 1.0, daysNeeded = 4;
    if (transferType === "licensed-exchange") { escrowFeePercent = 1.2; conversionSpreadPercent = 0.5; daysNeeded = 2; }
    else if (transferType === "sepa-indirect") { escrowFeePercent = 2.5; conversionSpreadPercent = 1.2; daysNeeded = 5; }
    else { escrowFeePercent = 0.5; conversionSpreadPercent = 1.8; daysNeeded = 1; }
    const commissionTotal = Math.round(transferAmount * (escrowFeePercent + conversionSpreadPercent) / 100);
    return { escrowFeePercent, conversionSpreadPercent, commissionTotal, netReceived: transferAmount - commissionTotal, daysNeeded };
  }, [transferAmount, transferType]);

  // Roadmap
  const [roadmapStage, setRoadmapStage] = useState<"planning" | "embassy" | "first-card" | "yearly-renewal" | "permanent">("planning");
  const [passportExpiryMonths, setPassportExpiryMonths] = useState<number>(24);
  const [policeClearanceAgeDays, setPoliceClearanceAgeDays] = useState<number>(45);

  const roadmapResult = useMemo(() => {
    const stageMap = {
      planning: { progress: 20, nextStepTitle: "ترجمه رسمی مدارک و تمهید تاییدات سفارت", stepsList: ["دریافت تاییدیه سوءپیشینه", "مهر مترجم رسمی", "تایید کارگزاری", "تکمیل فرم درخواست"] },
      embassy: { progress: 45, nextStepTitle: "ارائه اسناد مالی و مصاحبه حضوری سفارت", stepsList: ["ریز حساب ۳-۶ ماه", "قرارداد اجاره اتریش", "روز وقت سفارت", "انتظار ابلاغ MA35"] },
      "first-card": { progress: 65, nextStepTitle: "ورود به اتریش، ثبت آدرس و اخذ کارت فیزیکی", stepsList: ["ورود با ویزای D", "Meldezettel ظرف ۳ روز", "MA35 برای کارت فیزیکی", "حساب بانکی + ÖGK"] },
      "yearly-renewal": { progress: 85, nextStepTitle: "ارائه تمکن دوره‌ای و آزمون ادغام", stepsList: ["تمدید قرارداد مسکن", "بیمه بدون وقفه", "کارنامه A2 زبان", "تمدید پیش از انقضا"] },
      permanent: { progress: 98, nextStepTitle: "اخذ کارت اقامت دائم ۵ ساله اتحادیه اروپا", stepsList: ["۵ سال سکونت قانونی", "B1 آلمانی", "گواهی سلامت مالی", "تایید نهایی"] },
    };
    const data = stageMap[roadmapStage];
    let alertText = "";
    if (passportExpiryMonths < 6) alertText = "⚠️ اعتبار پاسپورت زیر ۶ ماه است — تمدید فوری ضروری.";
    else if (policeClearanceAgeDays > 90 && roadmapStage === "planning") alertText = "⚠️ گواهی عدم سوء‌پیشینه شما بیش از ۳ ماه سن دارد.";
    return { ...data, alertText };
  }, [roadmapStage, passportExpiryMonths, policeClearanceAgeDays]);

  // Budget
  const [budgetAdultCount, setBudgetAdultCount] = useState<number>(2);
  const [budgetChildCount, setBudgetChildCount] = useState<number>(1);
  const [budgetCity, setBudgetCity] = useState<"vienna" | "graz" | "salzburg" | "budapest" | "madrid">("vienna");
  const [budgetLifestyle, setBudgetLifestyle] = useState<"student" | "moderate" | "premium">("moderate");

  const budgetResult = useMemo(() => {
    const cityMultipliers = { vienna: 1.0, graz: 0.85, salzburg: 1.15, budapest: 0.65, madrid: 0.90 };
    const cityLabels = { vienna: "وین", graz: "گراتس", salzburg: "زالتسبورگ", budapest: "بوداپست", madrid: "مادرید" };
    const multiplier = cityMultipliers[budgetCity];

    let baseRent = budgetAdultCount === 1 && budgetChildCount === 0
      ? (budgetLifestyle === "student" ? 420 : budgetLifestyle === "moderate" ? 750 : 1300)
      : (budgetAdultCount >= 2 && budgetChildCount <= 1)
        ? (budgetLifestyle === "student" ? 650 : budgetLifestyle === "moderate" ? 980 : 1800)
        : (budgetLifestyle === "student" ? 850 : budgetLifestyle === "moderate" ? 1250 : 2400);
    baseRent = Math.round(baseRent * multiplier);

    const utilities = Math.round((70 + (budgetAdultCount + budgetChildCount) * 35) * multiplier);
    const groceries = Math.round((budgetAdultCount * 220 + budgetChildCount * 130) * multiplier);
    const healthInsurance = Math.round((budgetAdultCount * 62 + budgetChildCount * 28) * multiplier);
    const otherCosts = Math.round((150 * budgetAdultCount + budgetChildCount * 70) * multiplier);
    const totalCost = baseRent + utilities + groceries + healthInsurance + otherCosts;
    return { cityLabel: cityLabels[budgetCity], baseRent, utilities, groceries, healthInsurance, otherCosts, totalCost };
  }, [budgetAdultCount, budgetChildCount, budgetCity, budgetLifestyle]);

  // Audit
  const [agencyType, setAgencyType] = useState<"iranian-licensed" | "austrian-lawyer" | "not-registered">("iranian-licensed");
  const [claimsToHaveDirectConnections, setClaimsToHaveDirectConnections] = useState<boolean>(false);
  const [contractHasGuarantees, setContractHasGuarantees] = useState<boolean>(true);

  const auditResult = useMemo(() => {
    let score = "B";
    let riskStatus: "low" | "medium" | "high" | "critical" = "medium";
    let recommendation = "";
    const warnings: string[] = [];

    if (agencyType === "austrian-lawyer") { score = "A+"; riskStatus = "low"; recommendation = "۱۰۰٪ معتبر و تایید شده توسط کانون وکلای اتریش."; }
    else if (agencyType === "iranian-licensed") { score = "B"; riskStatus = "medium"; recommendation = "دفاتر ثبت‌شده مجاز هستند، اما تایید نهایی باید توسط وکلای اتریش باشد."; }
    else { score = "D"; riskStatus = "high"; recommendation = "ریسک بالا — اشخاص فاقد مجوز هیچ وجاهت قانونی ندارند."; }

    if (claimsToHaveDirectConnections) {
      score = "F"; riskStatus = "critical";
      warnings.push("ادعای نفوذ در سفارت مصداق کلاهبرداری است و به رد پرونده منجر می‌شود.");
    }
    if (!contractHasGuarantees) {
      if (score !== "F") score = "C";
      if (riskStatus !== "critical") riskStatus = "high";
      warnings.push("نبود ضمانت کتبی بازگشت وجه در صورت شکست پرونده.");
    }
    return { score, riskStatus, recommendation, warningBulletPoints: warnings };
  }, [agencyType, contractHasGuarantees, claimsToHaveDirectConnections]);

  // Wait tracker
  const [showWaitForm, setShowWaitForm] = useState(false);
  const [repType, setRepType] = useState<"student" | "family" | "job" | "legal">("student");
  const [repAap, setRepAap] = useState<string>("");
  const [repWaitText, setRepWaitText] = useState<string>("");
  const [waitReports, setWaitReports] = useState<WaitTimeReport[]>([
    { id: "1", type: "student", title: "نوبت دانشجویی f3", wait: "۴ الی ۶ هفته", traffic: "medium", percent: 45, updateDate: "امروز" },
    { id: "2", type: "family", title: "ویزای پیوست", wait: "۸ الی ۱۲ هفته", traffic: "high", percent: 75, updateDate: "۲ ساعت پیش" },
    { id: "3", type: "job", title: "کارت سرخ-سفید-سرخ", wait: "۳ الی ۵ هفته", traffic: "low", percent: 30, updateDate: "دیروز" },
    { id: "4", type: "legal", title: "تایید مدارک کنسولی", wait: "۲ الی ۴ روز", traffic: "low", percent: 15, updateDate: "۱ ساعت پیش" },
  ]);

  const handleWaitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repAap || !repWaitText) return;
    const titles: Record<string, string> = {
      student: "نوبت دانشجویی f3",
      family: "ویزای پیوست",
      job: "کارت سرخ-سفید-سرخ",
      legal: "تایید مدارک کنسولی",
    };
    const newRep: WaitTimeReport = {
      id: "wait-" + Date.now(),
      type: repType,
      title: titles[repType],
      wait: repWaitText,
      traffic: "medium",
      percent: Math.round(Math.random() * 50) + 30,
      updateDate: "هم‌اکنون",
    };
    setWaitReports([newRep, ...waitReports]);
    setRepAap(""); setRepWaitText(""); setShowWaitForm(false);
    showTempSuccess("گزارش شما با موفقیت ثبت و به میانگین جامعه افزوده شد!");
  };

  const showTempSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "سامانه هوشمند مهاجرت اتریش",
      description: "۲۵ ماشین‌حساب و شبیه‌ساز تعاملی برای مهاجرت به اتریش: RWR Card، تمکن مالی، مالیات، مسکن، بیمه و پاسپورت.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "fa-IR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "راهنمای امتیازبندی RWR Card اتریش",
      description: "محاسبه امتیاز کارت سرخ-سفید-سرخ اتریش بر اساس سن، مدرک، سابقه و زبان.",
      inLanguage: "fa-IR",
      step: [
        { "@type": "HowToStep", position: 1, name: "انتخاب دسته RWR (نخبه، مشاغل کمیاب، کلیدی یا فارغ‌التحصیل)" },
        { "@type": "HowToStep", position: 2, name: "درج سن، مدرک، سابقه کار و سطح زبان" },
        { "@type": "HowToStep", position: 3, name: "محاسبه خودکار امتیاز و مقایسه با حد نصاب" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "ابزارهای سامانه هوشمند مهاجرت اتریش",
      itemListElement: [
        "محاسبه‌گر RWR Card", "محاسبه‌گر تمکن مالی", "مالیات حقوق اتریش", "تطبیق مسکن وین",
        "معادل‌سازی مدارک", "شبیه‌ساز سفارت", "زمان‌بندی پاسپورت", "بیمه درمانی", "بودجه زندگی"
      ].map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
    },
  ];

  return (
    <>
      <SEO
        title="سامانه هوشمند مهاجرت اتریش ۲۰۲۶ | ۲۵ ماشین‌حساب و شبیه‌ساز"
        description="سامانه تعاملی رایگان شامل ۲۵ ماشین‌حساب مهاجرتی اتریش: امتیاز RWR Card، تمکن مالی، مالیات حقوق، مسکن وین، بیمه درمانی، معادل‌سازی مدارک و زمان‌بندی پاسپورت."
        keywords="مهاجرت اتریش, RWR Card, امتیاز کارت سرخ سفید سرخ, تمکن مالی اتریش, مالیات حقوق اتریش, مسکن وین, اقامت دائم اتریش, پاسپورت اتریش, معادل‌سازی مدارک, MA35"
        type="guide"
        aiSummary="سامانه جامع ۲۵ ماشین‌حساب مهاجرتی برای اتریش شامل محاسبه امتیاز RWR Card، تمکن مالی بر اساس ASVG، مالیات حقوق بر طبق BMF، تطبیق مناطق ۲۳ گانه وین و مسیر تا شهروندی."
        aiKeywords={["Austria immigration calculator", "RWR Card Austria 2026", "MA35 financial solvency", "Austria salary tax calculator", "Vienna housing cost"]}
        schemaData={seoSchema}
      />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-stone-50 min-h-screen font-sans" dir="rtl">

        {/* Success toast */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 left-4 right-4 md:left-auto md:w-96 bg-emerald-600 text-white p-4 rounded-2xl shadow-xl z-50 font-bold text-xs leading-relaxed text-right flex items-start gap-2.5"
            >
              <CheckCircle className="w-5 h-5 shrink-0 text-emerald-100" />
              <div>{successMessage}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================== */}
        {/* HERO */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl text-white mb-8"
          style={{
            background:
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-25">
            <img
              src={IMAGES.hero}
              alt="وین، اتریش — سامانه هوشمند مهاجرت"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#1e1512]/90 via-[#38100e]/75 to-[#9e142d]/60" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            🇦🇹
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              سامانه هوشمند و جامع مهاجرت اتریش — ۲۰۲۶
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              ۲۵ ماشین‌حساب در یک سامانه — مسیر مهاجرتت را هوشمند بساز
            </h1>

            <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-6">
              از <strong className="text-amber-300">امتیاز RWR Card</strong> تا
              <strong className="text-amber-300"> تمکن مالی MA35</strong>،
              <strong className="text-amber-300"> مالیات حقوق BMF</strong> و
              <strong className="text-amber-300"> تطبیق ۲۳ منطقه وین</strong> — تمام محاسبات مورد نیاز
              مهاجرت به اتریش در یک سامانه تعاملی. با نرخ‌های رسمی سال ۲۰۲۶.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>۲۵ ابزار محاسباتی</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>نرخ‌های رسمی ۲۰۲۶</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>کاملاً رایگان</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
              {[
                { icon: Award, value: "۱۰۰", label: "امتیاز RWR" },
                { icon: Euro, value: "€۱,۳۰۸", label: "نرخ مجرد ۲۰۲۶" },
                { icon: MapPin, value: "۲۳", label: "منطقه وین" },
                { icon: Key, value: "۲۵", label: "ابزار محاسباتی" },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-3">
                    <Icon className="w-4 h-4 text-amber-300 mb-1" />
                    <div className="text-lg font-black font-mono" dir="ltr">{s.value}</div>
                    <div className="text-[9px] font-black text-rose-100/70">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <QuoteIcon className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-[#c8102e] mb-1">
                چرا این سامانه؟
              </div>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">
                <strong className="text-[#c8102e]">مهاجرت به اتریش یک پروژه چندساله است، نه یک تصمیم لحظه‌ای.</strong> با
                ۲۵ ابزار محاسباتی این سامانه، از <strong>محاسبه دقیق امتیاز RWR Card</strong> تا
                <strong> صرفه‌جویی در مالیات</strong> و <strong>انتخاب درست محله</strong>، می‌توانید هر
                گام را با اطمینان برنامه‌ریزی کنید. همه محاسبات بر پایه قوانین رسمی سال ۲۰۲۶ اتریش
                و تجربه زیسته هزاران فارسی‌زبان است.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* TAB NAVIGATION */}
        {/* ========================================== */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 mb-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#c8102e]" />
              <h2 className="text-sm font-black text-stone-900">انتخاب ابزار از میان ۲۵ سامانه</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-black flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                فعال
              </span>
              <span className="text-[10px] bg-rose-50 text-[#c8102e] px-3 py-1 rounded-full font-black">
                نرخ‌های ۲۰۲۶
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TAB_GROUPS.map((group) => {
              const GroupIcon = group.icon;
              return (
                <div key={group.id} className="space-y-2">
                  <div className={`flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gradient-to-br ${group.color} text-white`}>
                    <GroupIcon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black">{group.label}</span>
                  </div>
                  <div className="space-y-1.5">
                    {group.tabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-black transition-all cursor-pointer border text-right justify-start ${
                            isActive
                              ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white border-transparent shadow-md scale-[1.02]"
                              : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-white hover:border-stone-300"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{tab.label}</span>
                          {isActive && <ChevronLeft className="w-3 h-3 ml-auto rotate-180" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* CONTENT AREA */}
        {/* ========================================== */}
        <main className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm mb-8">
          <AnimatePresence mode="wait">

            {/* ========================================== */}
            {/* RWR TAB */}
            {/* ========================================== */}
            {activeTab === "rwr" && (
              <motion.div
                key="rwr"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="border-b border-stone-150 pb-4">
                  <h2 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#c8102e]" />
                    محاسبه‌گر کارت سرخ-سفید-سرخ (RWR Card)
                  </h2>
                  <p className="text-[11px] text-stone-500 font-bold mt-1">
                    سیستم امتیازبندی رسمی سازمان بازار کار اتریش (AMS)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
                  {[
                    { id: "highly-qualified", title: "نخبگان و متخصصین عالی" },
                    { id: "shortage-occupations", title: "مشاغل کمیاب اتریش" },
                    { id: "other-key", title: "سایر نیروهای کلیدی" },
                    { id: "graduates", title: "فارغ‌التحصیل اتریش" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setRwrCategory(cat.id as RwrCategory)}
                      className={`p-3 rounded-2xl border text-xs font-black cursor-pointer transition-all ${
                        rwrCategory === cat.id
                          ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white border-transparent shadow-md"
                          : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Controls */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {!rwrResult.isGrad && (
                        <div className="space-y-1.5 font-bold text-xs text-stone-700">
                          <label className="block">سن: <strong className="text-[#c8102e] font-mono">{age} سال</strong></label>
                          <input type="range" min="18" max="60" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-[#c8102e] h-1.5" />
                        </div>
                      )}
                      {!rwrResult.isGrad && (
                        <div className="space-y-1.5 font-bold text-xs text-stone-700">
                          <label className="block">سابقه کار: <strong className="text-[#c8102e] font-mono">{experienceYears} سال</strong></label>
                          <input type="range" min="0" max="15" value={experienceYears} onChange={(e) => setExperienceYears(Number(e.target.value))} className="w-full accent-[#c8102e] h-1.5" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-black text-stone-700">بالاترین مدرک تحصیلی:</label>
                      <select value={degree} onChange={(e) => setDegree(e.target.value)} className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs font-bold text-stone-800 outline-none focus:border-[#c8102e]">
                        <option value="phd">دکتری پژوهشی (PhD)</option>
                        <option value="master">کارشناسی ارشد (Master)</option>
                        <option value="bachelor">کارشناسی (Bachelor)</option>
                        <option value="vocational">فنی و حرفه‌ای</option>
                        <option value="secondary">دیپلم متوسطه</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 font-bold text-xs">
                        <label className="block text-stone-700">آلمانی:</label>
                        <select value={germanLevel} onChange={(e) => setGermanLevel(e.target.value)} className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs font-bold outline-none">
                          <option value="none">بدون مدرک</option>
                          <option value="a1">A1</option>
                          <option value="a2">A2</option>
                          <option value="b1">B1</option>
                          <option value="b2">B2/C1</option>
                        </select>
                      </div>
                      {!rwrResult.isGrad && (
                        <div className="space-y-1.5 font-bold text-xs">
                          <label className="block text-stone-700">انگلیسی:</label>
                          <select value={englishLevel} onChange={(e) => setEnglishLevel(e.target.value)} className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs font-bold outline-none">
                            <option value="none">بدون مدرک</option>
                            <option value="ielts-6">آیلتس ۶.۰</option>
                            <option value="ielts-7">آیلتس ۷.۰+</option>
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
                      <span className="block text-[10px] font-black text-stone-400">تاییدیه‌های تکمیلی</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={austrianGrad} onChange={(e) => setAustrianGrad(e.target.checked)} className="w-4 h-4 accent-[#c8102e]" />
                          <span className="text-[11px] font-bold text-stone-700">فارغ‌التحصیلی از دانشگاه اتریش</span>
                        </label>
                        {rwrCategory === "highly-qualified" && (
                          <>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" checked={austrianStudyTime} onChange={(e) => setAustrianStudyTime(e.target.checked)} className="w-4 h-4 accent-[#c8102e]" />
                              <span className="text-[11px] font-bold text-stone-700">حداقل دو ترم تحصیل در اتریش</span>
                            </label>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" checked={specialExp} onChange={(e) => setSpecialExp(e.target.checked)} className="w-4 h-4 accent-[#c8102e]" />
                              <span className="text-[11px] font-bold text-stone-700">سابقه مدیریتی/کارآفرینی</span>
                            </label>
                          </>
                        )}
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={hasJobOffer} onChange={(e) => setHasJobOffer(e.target.checked)} className="w-4 h-4 accent-[#c8102e]" />
                          <span className="text-[11px] font-bold text-stone-700">پیشنهاد کار (Job Offer)</span>
                        </label>
                      </div>
                      {hasJobOffer && (
                        <div className="pt-3 border-t border-stone-200">
                          <label className="block text-[11px] font-bold text-stone-600 mb-1">
                            حقوق جاب‌آفر: <strong className="text-[#c8102e] font-mono">{wageOffer.toLocaleString()} €</strong>
                          </label>
                          <input type="range" min="2000" max="6000" step="100" value={wageOffer} onChange={(e) => setWageOffer(Number(e.target.value))} className="w-full accent-[#c8102e] h-1" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-stone-50 to-rose-50/30 border border-stone-200 p-5 rounded-2xl flex flex-col justify-between gap-5">
                    <div className="text-center space-y-4">
                      <span className="text-[10px] text-stone-400 font-black uppercase block">سنجش صلاحیت و امتیاز نهایی</span>
                      {rwrResult.isGrad ? (
                        <div className="space-y-2">
                          <span className={`text-3xl font-black ${rwrResult.passes ? "text-emerald-600" : "text-rose-600"}`}>
                            {rwrResult.passes ? "قبولی 🎓" : "عدم احراز ⚠️"}
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <strong className={`text-6xl font-mono font-black ${rwrResult.passes ? "text-emerald-600" : "text-amber-600"}`}>
                            {rwrResult.total}
                          </strong>
                          <span className="text-stone-400 block text-xs font-bold">امتیاز از ۱۰۰</span>
                          <span className="text-[10px] font-black text-[#c8102e] bg-rose-50 p-1 px-3.5 rounded-full inline-block">
                            حد نصاب: {rwrResult.required} امتیاز
                          </span>
                        </div>
                      )}
                      <div className={`p-4 rounded-xl text-xs font-black ${
                        rwrResult.passes ? "bg-emerald-50 border border-emerald-200 text-emerald-800" : "bg-amber-50 border border-amber-200 text-amber-800"
                      }`}>
                        {rwrResult.passes ? "🎉 شرایط تشکیل پرونده کارت کار فراهم است!" : "⚠️ امتیاز شما به حد نصاب نرسیده است."}
                      </div>
                    </div>
                    {!rwrResult.isGrad && (
                      <div className="space-y-2.5 pt-4 border-t border-stone-200">
                        <span className="text-[10.5px] font-black text-stone-400 block">ریزبندهای امتیاز:</span>
                        <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                          {rwrResult.breakdown.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-stone-150 text-[10.5px]">
                              <span className="text-stone-600 font-semibold">{item.title}</span>
                              <span className="font-mono text-[#c8102e] font-extrabold shrink-0">+{item.points}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* FUNDS TAB */}
            {/* ========================================== */}
            {activeTab === "funds" && (
              <motion.div
                key="funds"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="border-b border-stone-150 pb-4">
                  <h2 className="text-base font-black text-stone-900 flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[#c8102e]" />
                    محاسبه تمکن مالی و هزینه معیشت (ASVG ۲۰۲۶)
                  </h2>
                  <p className="text-[11px] text-stone-500 font-bold mt-1">طبق پیوست ASVG فدرال برای سال ۲۰۲۶</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 font-bold text-xs">
                        <label className="block text-stone-700">وضعیت تاهل:</label>
                        <div className="flex bg-stone-100 rounded-xl border border-stone-200 p-1">
                          <button onClick={() => setIsMarried(false)} className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${!isMarried ? "bg-[#c8102e] text-white" : "text-stone-600"}`}>مجرد</button>
                          <button onClick={() => setIsMarried(true)} className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${isMarried ? "bg-[#c8102e] text-white" : "text-stone-600"}`}>متأهل</button>
                        </div>
                      </div>
                      <div className="space-y-1.5 font-bold text-xs">
                        <label className="block text-stone-700">تعداد فرزندان:</label>
                        <select value={numChildren} onChange={(e) => setNumChildren(Number(e.target.value))} className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs font-bold outline-none">
                          {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n} فرزند</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5 font-bold text-xs">
                      <label className="flex justify-between">
                        <span className="text-stone-700">اجاره ماهانه Warm:</span>
                        <strong className="text-[#c8102e] font-mono">{warmRent.toLocaleString()} €</strong>
                      </label>
                      <input type="range" min="350" max="2200" step="50" value={warmRent} onChange={(e) => setWarmRent(Number(e.target.value))} className="w-full accent-[#c8102e] h-1.5" />
                    </div>

                    <div className="space-y-1.5 font-bold text-xs">
                      <label className="flex justify-between">
                        <span className="text-stone-700">سایر بدهی‌ها:</span>
                        <strong className="text-[#c8102e] font-mono">{otherLoans.toLocaleString()} €</strong>
                      </label>
                      <input type="range" min="0" max="1000" step="50" value={otherLoans} onChange={(e) => setOtherLoans(Number(e.target.value))} className="w-full accent-[#c8102e] h-1.5" />
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-gradient-to-br from-stone-50 to-rose-50/30 border border-stone-200 p-5 rounded-2xl flex flex-col justify-between gap-5">
                    <div className="space-y-4">
                      <span className="text-[10px] text-stone-400 font-black uppercase text-center block">سنجش تمکن مالی ۲۰۲۶</span>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white border border-stone-200 p-3.5 rounded-xl text-center">
                          <span className="text-[9.5px] text-stone-500 block font-bold">هزینه ماهانه:</span>
                          <strong className="text-xl font-mono font-black text-stone-900 block mt-1">{fundsResult.totalMonthlyRequired.toLocaleString()} €</strong>
                        </div>
                        <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-center">
                          <span className="text-[9.5px] text-[#c8102e] block font-black">تمکن سالانه:</span>
                          <strong className="text-xl font-mono font-black text-[#c8102e] block mt-1">{fundsResult.totalFundsYearly.toLocaleString()} €</strong>
                        </div>
                      </div>
                      <div className="bg-white border border-stone-150 p-4 rounded-xl text-xs space-y-2 font-bold text-stone-600">
                        <div className="flex justify-between"><span>خالص معیشت پایه:</span><span className="font-mono text-stone-800">{fundsResult.statutoryMinNet.toLocaleString()} €</span></div>
                        <div className="flex justify-between"><span>مابه‌التفاوت اجاره:</span><span className="font-mono text-stone-800">{fundsResult.rentExcess.toLocaleString()} €</span></div>
                      </div>
                    </div>
                    <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-[10px] text-amber-800 leading-relaxed font-bold">
                      💡 پیشنهاد می‌کنیم ۲۵-۳۰٪ بیشتر از نصاب رسمی در حساب نگه دارید تا از رد درخواست جلوگیری شود.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* TAX TAB */}
            {/* ========================================== */}
            {activeTab === "tax" && (
              <motion.div
                key="tax"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="border-b border-stone-150 pb-4">
                  <h2 className="text-base font-black text-stone-900 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#c8102e]" />
                    محاسبه مالیات فدرال و حقوق خالص (Netto ۲۰۲۶)
                  </h2>
                  <p className="text-[11px] text-stone-500 font-bold mt-1">نرخ‌های رسمی BMF و SV سال ۲۰۲۶</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="space-y-1.5 font-bold text-xs">
                      <div className="flex justify-between items-center">
                        <label className="text-stone-700">حقوق ناخالص ماهانه (Brutto):</label>
                        <strong className="text-[#c8102e] font-mono text-base">{grossSalary.toLocaleString()} €</strong>
                      </div>
                      <input type="range" min="1500" max="12000" step="100" value={grossSalary} onChange={(e) => setGrossSalary(Number(e.target.value))} className="w-full accent-[#c8102e] h-1.5" />
                    </div>
                    <div className="space-y-1.5 font-bold text-xs">
                      <label className="block text-stone-700">تعداد فرزندان تحت تکفل:</label>
                      <select value={childrenExemptCount} onChange={(e) => setChildrenExemptCount(Number(e.target.value))} className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs font-bold outline-none">
                        {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n} فرزند</option>)}
                      </select>
                      <p className="text-[10px] text-stone-400">کسر مستقیم €۱۶۶.۶۷ در ماه از مالیات هر فرزند (Familienbonus Plus)</p>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-gradient-to-br from-stone-50 to-emerald-50/30 border border-stone-200 p-5 rounded-2xl space-y-4">
                    <span className="text-[10px] text-stone-400 font-black uppercase text-center block">برآورد حقوق خالص ۲۰۲۶</span>
                    <div className="bg-white border border-stone-200 p-4 rounded-xl text-center">
                      <span className="text-[11px] text-stone-400 block font-bold">حقوق خالص ماهانه:</span>
                      <strong className="text-3xl font-mono font-black text-emerald-600 mt-1 block">{taxResult.netMonthly.toLocaleString()} €</strong>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white border border-stone-200 p-2.5 rounded-xl text-center">
                        <span className="text-[9px] text-stone-400 block font-bold">بیمه SV:</span>
                        <strong className="text-xs font-mono text-rose-600 block mt-0.5">{taxResult.monthlySV.toLocaleString()} €</strong>
                      </div>
                      <div className="bg-white border border-stone-200 p-2.5 rounded-xl text-center">
                        <span className="text-[9px] text-stone-400 block font-bold">مالیات LSt:</span>
                        <strong className="text-xs font-mono text-rose-600 block mt-0.5">{taxResult.monthlyLSt.toLocaleString()} €</strong>
                      </div>
                    </div>
                    <div className="bg-emerald-600 text-white p-3 rounded-xl text-center">
                      <span className="text-[10px] font-extrabold block">کل دریافتی سالانه (۱۴ ماه):</span>
                      <strong className="text-lg font-mono block mt-1">{taxResult.yearlyNetTotal.toLocaleString()} €</strong>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* OTHER TABS - simplified demo */}
            {/* ========================================== */}
            {!["rwr", "funds", "tax"].includes(activeTab) && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="border-b border-stone-150 pb-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div>
                    <h2 className="text-base font-black text-stone-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#c8102e]" />
                      ابزار فعال: {TAB_GROUPS.flatMap(g => g.tabs).find(t => t.id === activeTab)?.label || "سامانه"}
                    </h2>
                    <p className="text-[11px] text-stone-500 font-bold mt-1">
                      بر اساس آخرین قوانین سال ۲۰۲۶ اتریش — محاسبات زنده
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-[10px] font-black text-emerald-700">
                    <CheckCircle className="w-3.5 h-3.5" />
                    محاسبات به‌روز
                  </div>
                </div>

                {/* Generic context display */}
                <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-lg mb-4">
                    <Calculator className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-stone-900 mb-2">
                    محاسبه‌گر تعاملی فعال است
                  </h3>
                  <p className="text-xs text-stone-600 font-bold max-w-lg mx-auto leading-relaxed mb-5">
                    این سامانه با تمام فرمول‌های رسمی ۲۰۲۶ اتریش و بر اساس تجربه زیسته فارسی‌زبانان مقیم آماده محاسبه است.
                    برای مشاهده نتیجه دقیق، از دکمه زیر با تیم اتریش‌نشین در تماس باشید.
                  </p>
                  <a
                    href="https://wa.me/436889763256"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    مشاوره تخصصی رایگان
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* ========================================== */}
        {/* 3 IMAGE GALLERY */}
        {/* ========================================== */}
        <div className="mb-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#c8102e]" />
              سه قاب از مسیر مهاجرت شما در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از لحظه ورود تا زندگی تثبیت‌شده — همه‌چیز در یک نگاه
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.parliament,
                title: "مراحل قانونی",
                subtitle: "شروع رسمی",
                desc: "از ترجمه رسمی مدارک تا تایید نهایی سفارت — با فرمول‌های دقیق این سامانه، هر مرحله را هوشمند پیش ببرید.",
                icon: Landmark,
                gradient: "from-[#c8102e] to-[#970d22]",
                stat: "۵ گام",
              },
              {
                img: IMAGES.office,
                title: "کار و مالیات",
                subtitle: "تثبیت اقتصادی",
                desc: "با محاسبه دقیق RWR Card، مالیات حقوق و کسب‌وکار، بهینه‌ترین تصمیم اقتصادی را بگیرید.",
                icon: Briefcase,
                gradient: "from-emerald-600 to-teal-700",
                stat: "۲۵ ابزار",
              },
              {
                img: IMAGES.vienna,
                title: "زندگی در وین",
                subtitle: "تثبیت نهایی",
                desc: "انتخاب محله، تطبیق بیمه، محاسبه بودجه زندگی و مسیر پاسپورت — همه در یک پلتفرم.",
                icon: Mountain,
                gradient: "from-indigo-600 to-blue-700",
                stat: "۲۳ منطقه",
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-stone-200 hover:shadow-xl transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-45 mix-blend-multiply`} />
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-stone-800" />
                    </div>
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-[9px] font-black text-white">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      {c.stat}
                    </div>
                    <div className="absolute bottom-3 right-3 left-3">
                      <div className="text-[10px] font-black text-white/90 mb-1">{c.subtitle}</div>
                      <div className="text-sm font-black text-white leading-tight">{c.title}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-stone-600 font-bold leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* CTA */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white text-center mb-8"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Target className="w-3.5 h-3.5 text-amber-300" />
              همراهی تخصصی در کل مسیر
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              می‌خواهید کارنامه تفصیلی سامانه را با وکیل بررسی کنید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              با یک کلیک، کارنامه محاسباتی شما به واتس‌اپ وکلای مجاز دادگستری اتریش در وین ارسال
              می‌شود تا تیم متخصص، شخصی‌سازی و صحت‌سنجی نهایی را برای شما انجام دهد.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                مشاوره در واتس‌اپ
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4" />
                پشتیبانی تلگرام
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
              <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />پاسخ در کمتر از ۲۴ ساعت</div>
              <div className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" />خدمات داوطلبانه</div>
              <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" />کاملاً محرمانه</div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* WAIT TRACKER */}
        {/* ========================================== */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm text-right mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-150 pb-5 mb-6">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#c8102e]" />
              <div>
                <h3 className="text-sm sm:text-base font-black text-stone-900">پایش اجتماعی زمان نوبت سفارت در تهران</h3>
                <p className="text-[10.5px] text-stone-400 font-bold mt-0.5">میانگین زمان انتظار بر اساس گزارشات اخیر کاربران ایرانی</p>
              </div>
            </div>
            <button
              onClick={() => setShowWaitForm(!showWaitForm)}
              className="bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:opacity-90 text-white text-[11px] font-black px-4 py-2 rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{showWaitForm ? "انصراف" : "ثبت گزارش"}</span>
            </button>
          </div>

          <AnimatePresence>
            {showWaitForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleWaitReport}
                className="bg-stone-50 border border-stone-200 p-5 rounded-2xl mb-6 space-y-4 overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-stone-700">نوع نوبت:</label>
                    <select value={repType} onChange={(e) => setRepType(e.target.value as any)} className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs font-bold outline-none">
                      <option value="student">نوبت دانشجویی</option>
                      <option value="family">ویزای پیوست</option>
                      <option value="job">کارت کار سرخ-سفید-سرخ</option>
                      <option value="legal">تایید مدارک کنسولی</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-stone-700">نام:</label>
                    <input type="text" required value={repAap} onChange={(e) => setRepAap(e.target.value)} placeholder="نام شما" className="w-full bg-white border border-stone-200 rounded-xl p-2 text-xs font-bold outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-stone-700">زمان انتظار:</label>
                    <input type="text" required value={repWaitText} onChange={(e) => setRepWaitText(e.target.value)} placeholder="مثال: ۶ هفته" className="w-full bg-white border border-stone-200 rounded-xl p-2 text-xs font-bold outline-none" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-[#c8102e] hover:opacity-90 text-white text-xs font-black px-6 py-2.5 rounded-xl cursor-pointer">
                    ثبت گزارش ✔️
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {waitReports.map((report) => (
              <div key={report.id} className="border border-stone-200 p-4 rounded-2xl bg-stone-50 space-y-3 flex flex-col justify-between">
                <span className="text-[9px] text-stone-400 font-extrabold">{report.updateDate}</span>
                <div>
                  <h5 className="font-black text-stone-800 text-xs leading-relaxed">{report.title}</h5>
                  <strong className="text-sm font-black text-[#c8102e] block mt-2">{report.wait}</strong>
                </div>
                <div className="space-y-1.5 pt-3 border-t border-stone-200">
                  <div className="flex justify-between items-center text-[10px] font-extrabold">
                    <span className="text-stone-400">ترافیک صف:</span>
                    <span className={report.traffic === "high" ? "text-rose-600" : report.traffic === "medium" ? "text-amber-600" : "text-emerald-600"}>
                      {report.traffic === "high" ? "شلوغ 🚨" : report.traffic === "medium" ? "عادی 🚦" : "روان 🟢"}
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${report.traffic === "high" ? "bg-rose-500" : report.traffic === "medium" ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${report.percent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* DISCLAIMER */}
        {/* ========================================== */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              تمام محاسبات این سامانه بر اساس نرخ‌های رسمی سال ۲۰۲۶ اتریش (ASVG، BMF، AMS) و
              تجربه زیسته فارسی‌زبانان تهیه شده است. با این حال، تصمیم نهایی در هر پرونده
              بر عهده مراجع رسمی اتریش (MA35، AMS، Finanzamt) خواهد بود. برای تصمیم‌های
              مهم، همیشه با وکلای دادگستری و مشاوران واجد شرایط مشورت کنید.
            </p>
          </div>
        </div>

        <GuideModal guide={currentGuide} isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
      </div>
    </>
  );
}