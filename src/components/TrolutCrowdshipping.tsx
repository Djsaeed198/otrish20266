import React, { useState, useEffect } from "react";
import { 
  Plane, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  TrendingUp, 
  DollarSign, 
  Search, 
  PlusCircle, 
  Compass, 
  Briefcase, 
  MapPin, 
  Clock, 
  Phone,
  Scale,
  Calendar,
  Layers,
  CheckCircle2,
  ChevronDown,
  Info
} from "lucide-react";
import { toast } from "../utils/toast";

interface Trip {
  id: string;
  traveler: string;
  source: string;
  destination: string;
  date: string;
  capacityKg: number;
  pricePerKgEur: number;
  contact: string;
  status: "available" | "full";
}

interface Shipment {
  id: string;
  sender: string;
  title: string;
  source: string;
  destination: string;
  deadlineDate: string;
  weightKg: number;
  budgetEur: number;
  category: "اسناد" | "هدیه" | "کالج الکترونیک" | "پوشاک" | "سایر";
  contact: string;
}

export default function TrolutCrowdshipping() {
  const [activeTab, setActiveTab] = useState<"overview" | "sender" | "traveler">("overview");
  
  // Custom states for Calculator
  const [calcSource, setCalcSource] = useState("وین (Wien)");
  const [calcDest, setCalcDest] = useState("تهران (Tehran)");
  const [calcWeight, setCalcWeight] = useState<number>(3);
  
  // Simulated database stored in state
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: "trip-1",
      traveler: "آرمین رضایی",
      source: "وین (Wien)",
      destination: "تهران (Tehran)",
      date: "۱۴۰۵/۰۳/۲۰",
      capacityKg: 8,
      pricePerKgEur: 15,
      contact: "+43 660 888 1234",
      status: "available"
    },
    {
      id: "trip-2",
      traveler: "سارا حسینی",
      source: "فرانکفورت (Frankfurt)",
      destination: "شیراز (Shiraz)",
      date: "۱۴۰۵/۰۳/۲۵",
      capacityKg: 5,
      pricePerKgEur: 18,
      contact: "+49 176 555 7788",
      status: "available"
    },
    {
      id: "trip-3",
      traveler: "بردیا محمدی",
      source: "مونیخ (Munich)",
      destination: "تهران (Tehran)",
      date: "۱۴۰۵/۰۴/۰۱",
      capacityKg: 12,
      pricePerKgEur: 14,
      contact: "+49 152 444 9900",
      status: "available"
    }
  ]);

  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: "ship-1",
      sender: "امید ناصری",
      title: "ترجمه رسمی مدارک تحصیلی دانشگاه فنی وین",
      source: "وین (Wien)",
      destination: "تهران (Tehran)",
      deadlineDate: "۱۴۰۵/۰۳/۱۸",
      weightKg: 0.5,
      budgetEur: 25,
      category: "اسناد",
      contact: "+43 676 111 2233"
    },
    {
      id: "ship-2",
      sender: "سحر مرادی",
      title: "قهوه فیلتر اتریشی و هدیه تولد به خانواده",
      source: "وین (Wien)",
      destination: "اصفهان (Isfahan)",
      deadlineDate: "۱۴۰۵/۰۳/۲۸",
      weightKg: 2,
      budgetEur: 45,
      category: "هدیه",
      contact: "+43 660 777 4455"
    }
  ]);

  // Search parameters
  const [searchQuery, setSearchQuery] = useState("");
  
  // Registering forms state
  const [newTripTraveler, setNewTripTraveler] = useState("");
  const [newTripSource, setNewTripSource] = useState("");
  const [newTripDest, setNewTripDest] = useState("");
  const [newTripCapacity, setNewTripCapacity] = useState("");
  const [newTripPrice, setNewTripPrice] = useState("");
  const [newTripContact, setNewTripContact] = useState("");

  const [newShipSender, setNewShipSender] = useState("");
  const [newShipTitle, setNewShipTitle] = useState("");
  const [newShipSource, setNewShipSource] = useState("");
  const [newShipDest, setNewShipDest] = useState("");
  const [newShipWeight, setNewShipWeight] = useState("");
  const [newShipBudget, setNewShipBudget] = useState("");
  const [newShipCategory, setNewShipCategory] = useState<any>("اسناد");
  const [newShipContact, setNewShipContact] = useState("");

  // CO2 Saving Calculation
  // General Airline cargo emits ~500g CO2 per km ton. 
  // Let's assume an average flight distance of 4000 km.
  // Traveling naturally saves roughly 2kg CO2 per kg shipped through crowdshipping.
  const co2SavedKg = (calcWeight * 2.1).toFixed(1);
  const potentialEarningsEur = (calcWeight * 15).toFixed(0);
  const standardPostalShippingEur = (calcWeight * 35).toFixed(0);
  const trolutShippingEur = (calcWeight * 14).toFixed(0);
  const moneySavedEur = (Number(standardPostalShippingEur) - Number(trolutShippingEur)).toFixed(0);

  const handleAddTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTripTraveler || !newTripSource || !newTripDest || !newTripCapacity || !newTripPrice || !newTripContact) {
      toast.error("لطفاً تمامی فیلدهای الزامی برای ثبت سفر را تکمیل کنید.");
      return;
    }
    const created: Trip = {
      id: `trip-${Date.now()}`,
      traveler: newTripTraveler,
      source: newTripSource,
      destination: newTripDest,
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString("fa-IR"),
      capacityKg: Math.abs(Number(newTripCapacity)),
      pricePerKgEur: Math.abs(Number(newTripPrice)),
      contact: newTripContact,
      status: "available"
    };
    setTrips([created, ...trips]);
    toast.success("برنامه سفر شما با موفقیت در اتریش‌نشین ثبت شد! مسافران به زودی منتظر بار شما خواهند بود.");
    
    // reset form
    setNewTripTraveler("");
    setNewTripSource("");
    setNewTripDest("");
    setNewTripCapacity("");
    setNewTripPrice("");
    setNewTripContact("");
  };

  const handleAddShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShipSender || !newShipTitle || !newShipSource || !newShipDest || !newShipWeight || !newShipBudget || !newShipContact) {
      toast.error("لطفاً همگی فیلدهای مورد نظر برای ثبت محموله را وارد نمایید.");
      return;
    }
    const created: Shipment = {
      id: `ship-${Date.now()}`,
      sender: newShipSender,
      title: newShipTitle,
      source: newShipSource,
      destination: newShipDest,
      deadlineDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString("fa-IR"),
      weightKg: Math.abs(Number(newShipWeight)),
      budgetEur: Math.abs(Number(newShipBudget)),
      category: newShipCategory,
      contact: newShipContact
    };
    setShipments([created, ...shipments]);
    toast.success("سفارش حمل بار شما ثبت شد! مسافران فعال مسیر با شما جهت تایید بسته تماس خواهند گرفت.");
    
    // reset form
    setNewShipSender("");
    setNewShipTitle("");
    setNewShipSource("");
    setNewShipDest("");
    setNewShipWeight("");
    setNewShipBudget("");
    setNewShipContact("");
  };

  return (
    <div className="bg-white border border-stone-200 rounded-[32px] overflow-hidden shadow-sm text-stone-900" dir="rtl" id="trolut-crowdshipping-section">
      {/* Visual Header Banner */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-teal-900 to-stone-900 text-white p-6 sm:p-8 overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl -ml-16 -mb-16"></div>

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
          <div className="space-y-3 max-w-xl text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black tracking-tight">
              <Sparkles className="w-3.5 h-3.5" />
              <span>پلتفرم ترانزیت اشتراکی هوشمند آلمان و اتریش</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              سامانه حمل‌ونقل چمدانی اتریش‌نشین
            </h2>
            <p className="text-xs text-stone-300 font-medium leading-relaxed">
              ارسال سریع‌تر و ارزان‌تر اسناد، کالا و هدایا از اروپا به ایران و بالعکس به کمک ظرفیت خالی مسافران هواپیما با تضمین بیمه و کاهش ۷۰ درصدی ردپای کربن در هوای جهان.
            </p>
          </div>

          <div className="flex bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 self-start md:self-auto shrink-0 z-20">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === "overview" ? "bg-white text-emerald-950 shadow-sm" : "text-white/80 hover:bg-white/5"
              }`}
            >
              📊 خانه و شبیه‌ساز
            </button>
            <button
              onClick={() => setActiveTab("sender")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === "sender" ? "bg-white text-emerald-950 shadow-sm" : "text-white/80 hover:bg-white/5"
              }`}
            >
              📦 من فرستنده‌ام (بار دارم)
            </button>
            <button
              onClick={() => setActiveTab("traveler")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === "traveler" ? "bg-white text-emerald-950 shadow-sm" : "text-white/80 hover:bg-white/5"
              }`}
            >
              ✈️ من مسافرم (چمدان خالی دارم)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Areas based on tabs */}
      <div className="p-6 space-y-8">
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            {/* Quick value cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-3 text-right group hover:border-emerald-500/30 transition-all">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <DollarSign className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-stone-900">ارزان‌تر از تمامی سرویس‌ها</h3>
                <p className="text-[11px] text-stone-550 leading-relaxed font-bold">
                  ارسال کالا و اسناد به کمک مسافر تا مابه‌التفاوت ۶۰٪ نسبت به هزینه‌های سنگین DHL یا پست استاندارد دولتی صرفه‌جویی مالی دارد.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-3 text-right group hover:border-emerald-500/30 transition-all">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                  <ShieldCheck className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-stone-900">بیمه مسافتی و امانت مطمئن</h3>
                <p className="text-[11px] text-stone-550 leading-relaxed font-bold">
                  تمام تراکنش‌ها دیجیتالی بوده و امکان انتخاب مسافران بر اساس امتیاز، واریز وجه امن و بیمه پایه بار بر روی اتریش‌نشین تضمین شده است.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-3 text-right group hover:border-emerald-500/30 transition-all">
                <div className="w-10 h-10 bg-lime-50 rounded-xl flex items-center justify-center text-lime-600">
                  <Leaf className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-stone-900">حمایت محیط زیستی با کاهش CO2</h3>
                <p className="text-[11px] text-stone-550 leading-relaxed font-bold">
                  مسافران در این مسیر سفر می‌کنند. با استفاده از فضای چمدان آن‌ها به جای پروازهای سنگین اختصاصی کارگو، تا ۷۰٪ به کاهش کربن کمک می‌کنیم.
                </p>
              </div>
            </div>

            {/* Simulated Live Route Calculator */}
            <div className="border border-stone-150 rounded-2.5xl p-6 bg-[#fcfcf9]">
              <div className="flex flex-col lg:flex-row items-stretch gap-6">
                {/* Inputs */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-sm sm:text-base font-black text-stone-950 flex items-center gap-2">
                    <TrendingUp className="w-4.5 h-4.5 text-emerald-600" />
                    <span>محاسبه‌گر شبیه‌ساز پس‌انداز و کارمزد حمل</span>
                  </h3>
                  <p className="text-[11px] text-stone-500 font-semibold">
                    مسیر، وزن مرسوله را مشخص کنید تا سیستم اتریش‌نشین پتانسیل کسب درآمد و میزان محافظت از کُره زمین را برآورد کند:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1 text-right">
                      <label className="text-[10px] text-stone-400 font-extrabold block">مبدأ ارسال</label>
                      <select 
                        value={calcSource} 
                        onChange={(e) => setCalcSource(e.target.value)}
                        className="w-full bg-white text-stone-800 p-2.5 rounded-xl border border-stone-250 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-600"
                      >
                        <option value="وین (Wien)">وین (Wien) 🇦🇹</option>
                        <option value="فرانکفورت (Frankfurt)">فرانکفورت (Frankfurt) 🇩🇪</option>
                        <option value="مونیخ (Munich)">مونیخ (Munich) 🇩🇪</option>
                        <option value="تهران (Tehran)">تهران (Tehran) 🇮🇷</option>
                      </select>
                    </div>

                    <div className="space-y-1 text-right">
                      <label className="text-[10px] text-stone-400 font-extrabold block">مقصد نهایی</label>
                      <select 
                        value={calcDest} 
                        onChange={(e) => setCalcDest(e.target.value)}
                        className="w-full bg-white text-stone-800 p-2.5 rounded-xl border border-stone-250 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-600"
                      >
                        <option value="تهران (Tehran)">تهران (Tehran) 🇮🇷</option>
                        <option value="شیراز (Shiraz)">شیراز (Shiraz) 🇮🇷</option>
                        <option value="اصفهان (Isfahan)">اصفهان (Isfahan) 🇮🇷</option>
                        <option value="وین (Wien)">وین (Wien) 🇦🇹</option>
                        <option value="فرانکفورت (Frankfurt)">فرانکفورت (Frankfurt) 🇩🇪</option>
                      </select>
                    </div>

                    <div className="space-y-1 text-right">
                      <label className="text-[10px] text-stone-400 font-extrabold block">وزن حدودی (کیلوگرم)</label>
                      <div className="relative">
                        <input 
                          type="number"
                          value={calcWeight}
                          onChange={(e) => setCalcWeight(Math.max(0.1, Number(e.target.value)))}
                          min="0.1" 
                          step="0.5"
                          className="w-full bg-white text-stone-800 p-2 py-2.5 pl-8 rounded-xl border border-stone-250 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-600 text-right"
                        />
                        <span className="absolute left-3 top-2.5 text-[10px] text-stone-400 font-mono">KG</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Outputs Block */}
                <div className="bg-emerald-950 text-white rounded-2xl p-5 w-full lg:w-80 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[9px] bg-emerald-500 text-white font-extrabold px-2.5 py-0.5 rounded-full inline-block">تحلیل مالی و اقلیمی فدرال</span>
                    
                    <div className="flex items-center justify-between border-b border-emerald-910/20 pb-2">
                      <span className="text-[11px] text-emerald-200 font-bold">درآمد تخمینی همسفر چمدان</span>
                      <span className="text-sm font-black text-emerald-300 font-mono">{potentialEarningsEur} €</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-emerald-910/20 pb-2">
                      <span className="text-[11px] text-emerald-200 font-bold">هزینه حدودی اتریش‌نشین</span>
                      <span className="text-sm font-black text-emerald-300 font-mono">{trolutShippingEur} €</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-emerald-910/20 pb-2">
                      <span className="text-[11px] text-emerald-200 font-bold">پست اکسپرس معمولی</span>
                      <span className="text-xs font-black text-stone-400 font-mono line-through">{standardPostalShippingEur} €</span>
                    </div>

                    <div className="flex items-center justify-between text-yellow-300">
                      <span className="text-[11px] font-black">پس‌انداز حاصله فرستنده</span>
                      <span className="text-sm font-black font-mono">{moneySavedEur} €</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-800 text-[10px] text-emerald-200 leading-normal font-bold">
                    <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>کاهش انتشار کربن دی‌اکسید معادل <strong className="text-white font-mono">{co2SavedKg} کیلوگرم</strong> در اتمسفر!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs quick call-out */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-gradient-to-l from-emerald-50 to-teal-50/20 border border-emerald-200/50 rounded-2xl">
              <div className="space-y-1 text-right">
                <h4 className="text-xs sm:text-sm font-black text-emerald-950">همین امروز با اتریش‌نشین مبادله چمدانی را تجربه کنید</h4>
                <p className="text-[11px] text-emerald-800 font-bold">فرم‌های مربوط به مسافران یا فرستندگان را در زبانه بالا پر کرده و لیست را همین الان بررسی کنید.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("sender")}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black shadow-xs transition-colors cursor-pointer"
                >
                  ثبت مرسوله باری
                </button>
                <button
                  onClick={() => setActiveTab("traveler")}
                  className="px-4 py-2 bg-white hover:bg-stone-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-black shadow-3xs transition-colors cursor-pointer"
                >
                  اعلام برنامه پرواز
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "sender" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Form list and creation */}
            <div className="lg:col-span-5 space-y-5 border-l border-stone-100 lg:pl-6">
              <div className="space-y-1 text-right">
                <h3 className="text-xs sm:text-sm font-black text-stone-900 flex items-center gap-1.5">
                  <PlusCircle className="w-4.5 h-4.5 text-emerald-600" />
                  <span>سپردن بار / ایجاد سفارش جدید در اتریش‌نشین</span>
                </h3>
                <p className="text-[10.5px] text-stone-400 font-semibold leading-relaxed">
                  اگر به دنبال مسافری مطمئن برای انتقال اسناد یا کادو بابت تولد به ایران هستید، فرم زیر را با اطلاعات واقعی پر کنید:
                </p>
              </div>

              <form onSubmit={handleAddShipment} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3 text-right">
                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-500 font-extrabold">نام شما (فرستنده)</label>
                    <input 
                      type="text"
                      required
                      placeholder="مثال: امید رحیمی" 
                      value={newShipSender}
                      onChange={(e) => setNewShipSender(e.target.value)}
                      className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-500 font-extrabold">کتگوری مرسوله</label>
                    <select
                      value={newShipCategory}
                      onChange={(e) => setNewShipCategory(e.target.value)}
                      className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-bold focus:outline-none"
                    >
                      <option value="اسناد">📜 اسناد / کاغذهای رسمی</option>
                      <option value="هدیه">🎁 هدیه / شکلات و سوغات</option>
                      <option value="کالج الکترونیک">💻 الکترونیک کوچک</option>
                      <option value="پوشاک">👕 پوشاک / وسایل شخصی</option>
                      <option value="سایر">📦 سایر موارد تفریحی</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <label className="text-[10px] text-stone-500 font-extrabold">عنوان کوتاه محموله</label>
                  <input 
                    type="text"
                    required
                    placeholder="مثال: ترجمه ملده و پاسپورت تایید شده وین" 
                    value={newShipTitle}
                    onChange={(e) => setNewShipTitle(e.target.value)}
                    className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-bold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-right">
                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-500 font-extrabold">شهر مبدا بارگیری</label>
                    <input 
                      type="text"
                      required
                      placeholder="مثال: وین (Wien)" 
                      value={newShipSource}
                      onChange={(e) => setNewShipSource(e.target.value)}
                      className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-bold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-500 font-extrabold">شهر مقصد تحویل</label>
                    <input 
                      type="text"
                      required
                      placeholder="مثال: تهران (Tehran)" 
                      value={newShipDest}
                      onChange={(e) => setNewShipDest(e.target.value)}
                      className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-bold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-right">
                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-500 font-extrabold">وزن مرسوله (کیلوگرم)</label>
                    <input 
                      type="number"
                      required
                      placeholder="مثال: 0.5" 
                      min="0.1"
                      step="0.1"
                      value={newShipWeight}
                      onChange={(e) => setNewShipWeight(e.target.value)}
                      className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-bold focus:outline-none text-right"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-500 font-extrabold">مبلغ پیشنهادی شما (یورو)</label>
                    <input 
                      type="number"
                      required
                      placeholder="مثال: 30" 
                      value={newShipBudget}
                      onChange={(e) => setNewShipBudget(e.target.value)}
                      className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-bold focus:outline-none text-right"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <label className="text-[10px] text-stone-500 font-extrabold">تلفن تلگرام یا واتساپ جهت هماهنگی</label>
                  <input 
                    type="tel"
                    required
                    placeholder="مثال: 43660124567+" 
                    value={newShipContact}
                    onChange={(e) => setNewShipContact(e.target.value)}
                    className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-mono font-bold focus:outline-none text-left"
                    dir="ltr"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black shadow-xs tracking-tight transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>ثبت سفارش مرسوله در شبکه فدرال</span>
                </button>
              </form>
            </div>

            {/* List of active requests from people who want to send things */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-right">
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-black text-stone-900">📦 مرسوله‌های ثبت شده منتظر انتقال</h3>
                  <p className="text-[10px] text-stone-400 font-semibold">اگر عازم ایران هستید، با قبول هر یک از مرسوله‌های زیر درآمدزایی کنید:</p>
                </div>
                
                <div className="relative w-full sm:w-48 self-start sm:self-auto">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجوی شهر یا وزن مرسوله..."
                    className="w-full bg-white text-stone-900 pr-8 pl-3 py-1.5 rounded-xl border border-stone-200 text-[10.5px] font-bold focus:outline-none"
                  />
                  <Search className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-stone-400" />
                </div>
              </div>

              <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-1">
                {(() => {
                  const filtered = shipments.filter(sh => {
                    const q = searchQuery.toLowerCase().trim();
                    if (!q) return true;
                    return sh.source.toLowerCase().includes(q) || 
                           sh.destination.toLowerCase().includes(q) ||
                           sh.title.toLowerCase().includes(q) ||
                           sh.category.toLowerCase().includes(q);
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-12 bg-stone-50 rounded-2xl border border-dashed border-stone-200 text-stone-400 text-xs font-black">
                        هیچ مرسوله فعالی هماهنگ با جستجوی شما پیدا نشد.
                      </div>
                    );
                  }

                  return filtered.map((sh) => (
                    <div key={sh.id} className="border border-stone-150 rounded-2xl bg-white p-4 space-y-3 hover:border-emerald-600/30 transition-all text-right">
                      <div className="flex items-center justify-between gap-2.5">
                        <span className="text-[9.5px] bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md font-black border border-amber-100">
                          {sh.category}
                        </span>
                        
                        <div className="text-stone-400 text-[10px] font-bold">
                          ثبت توسط: <span className="text-stone-800 font-extrabold">{sh.sender}</span>
                        </div>
                      </div>

                      <h4 className="text-xs sm:text-sm font-black text-stone-950 leading-relaxed">
                        {sh.title}
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold pt-2 border-t border-stone-100/60 pb-1">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-stone-400 block">مبدا</span>
                          <span className="text-stone-800 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            {sh.source}
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-stone-400 block">مقصد</span>
                          <span className="text-stone-800 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-red-650" />
                            {sh.destination}
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-stone-400 block">وزن حدودی</span>
                          <span className="text-teal-700 font-mono text-[11px]">{sh.weightKg} کیلوگرم</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-stone-400 block">کارمزد پیشنهادی</span>
                          <span className="text-emerald-700 font-extrabold font-mono text-[11px]">{sh.budgetEur} €</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 text-[10.5px]">
                        <span className="text-stone-405 font-medium flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          حداکثر مهلت یافتن مسافر: {sh.deadlineDate}
                        </span>

                        <a 
                          href={`tel:${sh.contact}`}
                          onClick={() => {
                            navigator.clipboard.writeText(sh.contact);
                            toast.success("شماره تماس مرسوله در حافظه کپی شد! در واتساپ یا تلگرام گفتگو را شروع کنید.");
                          }}
                          className="px-3 py-1.5 bg-stone-50 hover:bg-stone-100 hover:text-stone-950 text-stone-700 font-extrabold font-mono rounded-lg border border-stone-200 transition-colors text-center"
                        >
                          📱 تماس فوری: {sh.contact}
                        </a>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}

        {activeTab === "traveler" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Passenger creation */}
            <div className="lg:col-span-5 space-y-5 border-l border-stone-100 lg:pl-6">
              <div className="space-y-1 text-right">
                <h3 className="text-xs sm:text-sm font-black text-stone-900 flex items-center gap-1.5">
                  <Plane className="w-4.5 h-4.5 text-teal-600" />
                  <span>اعلام سفر و ظرفیت خالی چمدان</span>
                </h3>
                <p className="text-[10.5px] text-stone-400 font-semibold leading-relaxed">
                  اگر به زودی عازم اروپا یا عازم ایران هستید و در کوله‌پشتی خود جا دارید، با رعایت قوانین بین‌المللی گمرک، بار دیگران را قبول و کسب درآمد کنید:
                </p>
              </div>

              <form onSubmit={handleAddTrip} className="space-y-3.5">
                <div className="space-y-1 text-right">
                  <label className="text-[10px] text-stone-500 font-extrabold">نام و نام خانوادگی شما</label>
                  <input 
                    type="text"
                    required
                    placeholder="مثال: آرش علیزاده" 
                    value={newTripTraveler}
                    onChange={(e) => setNewTripTraveler(e.target.value)}
                    className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-bold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-right">
                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-500 font-extrabold">مبدا حرکت هوایی</label>
                    <input 
                      type="text"
                      required
                      placeholder="مثال: فرانکفورت (Frankfurt)" 
                      value={newTripSource}
                      onChange={(e) => setNewTripSource(e.target.value)}
                      className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-bold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-500 font-extrabold">فرودگاه مقصد تحویل</label>
                    <input 
                      type="text"
                      required
                      placeholder="مثال: تهران (Tehran)" 
                      value={newTripDest}
                      onChange={(e) => setNewTripDest(e.target.value)}
                      className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-bold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-right">
                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-500 font-extrabold">ظرفیت بارگیری آزاد (کیلوگرم)</label>
                    <input 
                      type="number"
                      required
                      placeholder="مثال: 5" 
                      min="1"
                      value={newTripCapacity}
                      onChange={(e) => setNewTripCapacity(e.target.value)}
                      className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-bold focus:outline-none text-right"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-500 font-extrabold">مبلغ درخواستی به ازای هر کیلو (یورو)</label>
                    <input 
                      type="number"
                      required
                      placeholder="مثال: 15" 
                      value={newTripPrice}
                      onChange={(e) => setNewTripPrice(e.target.value)}
                      className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-bold focus:outline-none text-right"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <label className="text-[10px] text-stone-500 font-extrabold">شماره موبایل ارتباطی در واتساپ و تلگرام</label>
                  <input 
                    type="tel"
                    required
                    placeholder="مثال: 436603332211+" 
                    value={newTripContact}
                    onChange={(e) => setNewTripContact(e.target.value)}
                    className="w-full bg-stone-50 text-stone-900 p-2.5 rounded-xl border border-stone-200 text-xs font-mono font-bold focus:outline-none text-left"
                    dir="ltr"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-teal-650 hover:bg-teal-700 text-white rounded-xl text-xs font-black shadow-xs tracking-tight transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plane className="w-4 h-4" />
                  <span>ثبت برنامه سفر در سرور عمومی اتریش‌نشین</span>
                </button>
              </form>
            </div>

            {/* List of trips from passengers */}
            <div className="lg:col-span-7 space-y-4 text-right">
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-black text-stone-900">✈️ همسفران پروازی فعال (ظرفیت بارگیری)</h3>
                <p className="text-[10.5px] text-stone-400 font-semibold">مسافران تایید شده در چند روز آینده با پتانسیل چمدان خالی:</p>
              </div>

              <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-1">
                {trips.map((tg) => (
                  <div key={tg.id} className="border border-stone-150 rounded-2xl bg-white p-4 space-y-3 hover:border-teal-500/30 transition-all text-right">
                    <div className="flex items-center justify-between gap-2.5 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-teal-50 text-teal-850 rounded-full flex items-center justify-center text-[10.5px] font-black">
                          {tg.traveler.slice(0, 1)}
                        </div>
                        <span className="text-xs font-extrabold text-stone-900">{tg.traveler}</span>
                      </div>
                      
                      <span className="text-[9px] bg-emerald-50 text-emerald-850 border border-emerald-100 rounded px-2 py-0.5 font-bold">
                        امتیاز مسافر تایید شده: ۵/۵
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold pt-2 border-t border-stone-100/60 pb-1">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-stone-400 block">شهر مبدأ سفر</span>
                        <span className="text-stone-850 flex items-center gap-1">
                          <Plane className="w-3 h-3 text-teal-600 block shrink-0" />
                          {tg.source}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-stone-400 block">مقصد ورود</span>
                        <span className="text-stone-850 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-650 block shrink-0" />
                          {tg.destination}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-stone-400 block">ظرفیت خالی</span>
                        <span className="text-teal-700 font-mono text-[11px]">{tg.capacityKg} کیلوگرم</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-stone-400 block">کرایه پیشنهادی</span>
                        <span className="text-emerald-700 font-extrabold font-mono text-[11px]">{tg.pricePerKgEur} € / کیلو</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 text-[10.5px]">
                      <span className="text-stone-405 font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        تاریخ حرکت هواپیما: {tg.date}
                      </span>

                      <a 
                        href={`tel:${tg.contact}`}
                        onClick={() => {
                          navigator.clipboard.writeText(tg.contact);
                          toast.success("اطلاعات ارتباطی مسافر اتریش‌نشین با موفقیت کپی شد.");
                        }}
                        className="px-3 py-1.5 bg-stone-50 hover:bg-stone-100 hover:text-stone-950 text-stone-700 font-extrabold font-mono rounded-lg border border-stone-200 transition-colors text-center"
                      >
                        📱 تماس فوری: {tg.contact}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Safety Legal Warning Box */}
      <div className="bg-stone-50 p-4 border-t border-stone-150 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-[10.5px] text-stone-550 leading-relaxed font-bold text-right">
        <Scale className="w-4 h-4 text-emerald-600 shrink-0 inline ml-1 sm:ml-0" />
        <p className="flex-1">
          <strong className="text-stone-900 font-extrabold">هشدار حقوقی و گمرکی اتریش‌نشین:</strong> مسافران گرامی موظفند پیش از تحویل بار، محتویات آن را حضوری با فرستنده بررسی نمایند تا فاقد اقلام غیرمجاز گمرک اتریش (فدرال MA) باشد. پلتفرم اتریش‌نشین صرفاً تسهیل‌کننده بومی ارتباط غیرانتفاعی همسفران است.
        </p>
      </div>
    </div>
  );
}
