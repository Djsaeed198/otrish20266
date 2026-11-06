import React, { useState, useEffect } from "react";
import { 
  Star, 
  Plus, 
  MessageSquare, 
  Building2, 
  ThumbsUp, 
  User, 
  ShieldCheck, 
  Compass, 
  BarChart,
  Award
} from "lucide-react";
import { toast } from "../utils/toast";

interface Review {
  id: string;
  category: "ma35" | "wiener_linien" | "oegk" | "erste_bank" | "embassy";
  author: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
  isAnonymous: boolean;
  likedByUser?: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  ma35: "اداره مهاجرت MA35 وین",
  wiener_linien: "حمل‌ونقل عمومی Wiener Linien",
  oegk: "بیمه سلامت فدرال ÖGK",
  erste_bank: "بانک ارسته (Erste Bank)",
  embassy: "سفارت اتریش در تهران"
};

const CATEGORY_ICONS: Record<string, string> = {
  ma35: "🏛️",
  wiener_linien: "🚇",
  oegk: "🩺",
  erste_bank: "💳",
  embassy: "🛂"
};

export default function ServiceRatingsPortal() {
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"ma35" | "wiener_linien" | "oegk" | "erste_bank" | "embassy">("ma35");
  const [authorName, setAuthorName] = useState("");
  const [ratingValue, setRatingValue] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Active filter
  const [activeFilter, setActiveFilter] = useState<"all" | "ma35" | "wiener_linien" | "oegk" | "erste_bank" | "embassy">("all");

  useEffect(() => {
    const saved = localStorage.getItem("austrian_service_reviews");
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      const initialReviews: Review[] = [
        {
          id: "rev-1",
          category: "erste_bank",
          author: "سامان راد",
          rating: 5,
          date: "۱۴۰۵/۰۲/۱۵",
          content: "کارت بانکی و نرم‌افزار George فوق‌العاده کاربردی هستند. افتتاح حساب دانشجویی کاملاً رایگان انجام شد و کارت نقدی بعد از ۵ روز به صندوق پستی من آمد.",
          likes: 24,
          isAnonymous: false
        },
        {
          id: "rev-2",
          category: "ma35",
          author: "ندا احمدی",
          rating: 2,
          date: "۱۴۰۵/۰۳/۰۲",
          content: "مدت زمان پاسخ‌گویی به پرونده تمدید اقامت من بیش از ۵ ماه طول کشید. هر چقدر تماس گرفتم جواب ندادند، در نهایت با فرستادن فرم شکایت رسمی (Säumnisbeschwerde) کارت من را صادر کردند. توصیه می‌کنم از قبل همه مدارک را کامل ببرید.",
          likes: 42,
          isAnonymous: true
        },
        {
          id: "rev-3",
          category: "wiener_linien",
          author: "پوریا علوی",
          rating: 5,
          date: "۱۴۰۵/۰۳/۱۰",
          content: "حمل و نقل وین بی‌نظیر است. کلیما تیکت سالانه یا بلیت دانشجوئی بسیار ارزان است و متروها راس زمان مکتوب در ایستگاه توقف می‌کنند. نظافت ایستگاه‌ها هم عالی است.",
          likes: 19,
          isAnonymous: false
        },
        {
          id: "rev-4",
          category: "oegk",
          author: "دکتر سپهر",
          rating: 4,
          date: "۱۴۰۵/۰۳/۱۸",
          content: "بیمه ÖGK تمام خدمات درمانی پزشکان دولتی (Kassenarzt) را به طور کامل پوشش می‌دهد. کارت الکترونیک درمان (E-Card) با عکس بلافاصله به آدرس پستی فرستاده شد. کیفیت پاسخگویی حضوری شعبه مرکزی منطقه ۱۰ هم مناسب بود.",
          likes: 11,
          isAnonymous: false
        }
      ];
      setReviews(initialReviews);
      localStorage.setItem("austrian_service_reviews", JSON.stringify(initialReviews));
    }
  }, []);

  const saveReviews = (updated: Review[]) => {
    setReviews(updated);
    localStorage.setItem("austrian_service_reviews", JSON.stringify(updated));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewContent.trim()) return;

    const newReview: Review = {
      id: "rev-" + Date.now(),
      category: selectedCategory,
      author: isAnonymous ? "کاربر ناشناس" : (authorName.trim() || "هموطن همراه"),
      rating: ratingValue,
      date: new Date().toLocaleDateString("fa-IR"),
      content: reviewContent.trim(),
      likes: 0,
      isAnonymous
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);

    // Reset Form
    setAuthorName("");
    setReviewContent("");
    setRatingValue(5);
    setIsAnonymous(false);
    setShowForm(false);
    toast.success("سپاسگزاریم! امتیاز و تجربه شما با موفقیت به دایرکتوری ملحق شد. ⭐");
  };

  const handleLikeReview = (id: string) => {
    const updated = reviews.map(rev => {
      if (rev.id === id) {
        const liked = !rev.likedByUser;
        return {
          ...rev,
          likedByUser: liked,
          likes: liked ? rev.likes + 1 : rev.likes - 1
        };
      }
      return rev;
    });
    saveReviews(updated);
  };

  // Filter logic
  const filteredReviews = activeFilter === "all" 
    ? reviews 
    : reviews.filter(r => r.category === activeFilter);

  // Stats calculation
  const calculateAverageRating = (cat: string) => {
    const catReviews = reviews.filter(r => r.category === cat);
    if (catReviews.length === 0) return 4.0;
    const sum = catReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / catReviews.length).toFixed(1);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm text-right font-sans relative" id="ratings-portal-app">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-l from-amber-500 via-rose-500 to-amber-600 rounded-t-3xl"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-stone-150 pb-5 mb-6 gap-4 flex-row-reverse">
        <div className="text-right">
          <div className="flex items-center gap-2.5 justify-end">
            <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">
              سامانه نظرسنجی و امتیازدهی مستقل به مراجع اتریش ⭐
            </h2>
            <div className="p-2 bg-amber-50 border border-amber-150 rounded-xl text-amber-600">
              <Award className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-stone-500 font-bold mt-1">
            پلتفرم مردمی و فاقد وابستگی برای پایش رضایتمندی از ادارات مهاجرتی (MA35)، سفارت، بیمه‌ها، سیستم حمل و نقل عمومی و بانک‌های اتریش.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-stone-900 hover:bg-stone-850 text-white text-xs font-black py-2.5 px-4 rounded-xl cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5 shrink-0 shadow-xs mr-auto sm:mr-0"
        >
          <Plus className="w-4 h-4" />
          <span>ثبت امتیاز و بررسی تجربه</span>
        </button>
      </div>

      {/* Stats Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          const avg = calculateAverageRating(key);
          return (
            <div 
              key={key} 
              onClick={() => setActiveFilter(key as any)}
              className={`p-3 rounded-2xl border text-center space-y-1.5 transition-all cursor-pointer ${
                activeFilter === key 
                  ? "bg-amber-500/10 border-amber-400 font-black" 
                  : "bg-stone-50/50 border-stone-200 hover:bg-stone-100/50"
              }`}
            >
              <span className="text-sm block">{CATEGORY_ICONS[key]}</span>
              <span className="text-[9px] text-stone-600 font-black block truncate" title={label}>{label}</span>
              <div className="flex items-center justify-center gap-1 text-[11px] font-mono font-black text-amber-700">
                <span>{avg}</span>
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Submit Form */}
      {showForm && (
        <form onSubmit={handleSubmitReview} className="bg-stone-50 border border-stone-200 rounded-[24px] p-6 mb-6 space-y-4 text-xs font-bold text-stone-750 text-right animate-fade-in">
          <div className="border-b border-stone-200 pb-2 flex justify-between items-center">
            <span className="text-[9px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-black">فرم همیاری</span>
            <h4 className="font-black text-stone-850">افزودن تجربه و امتیاز مستقل:</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="rating-category" className="block text-[10px] text-stone-500 font-bold mb-1">مرجع یا اداره مربوطه:</label>
              <select
                id="rating-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-stone-800 text-right outline-none cursor-pointer"
              >
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{CATEGORY_ICONS[key]} {label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="rating-name" className="block text-[10px] text-stone-500 font-bold mb-1">نام شما (یا بگذارید خالی بماند):</label>
              <input
                id="rating-name"
                type="text"
                disabled={isAnonymous}
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder={isAnonymous ? "در قالب ناشناس ثبت می‌شود" : "مثلاً آرش طاهری"}
                className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-stone-800 text-right outline-none disabled:bg-stone-150"
              />
            </div>

            <div>
              <label className="block text-[10px] text-stone-500 font-bold mb-1">امتیاز شما (از ۱ تا ۵ ستاره):</label>
              <div className="flex items-center gap-1.5 mt-2 justify-end">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingValue(star)}
                    className="p-0.5 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star className={`w-6 h-6 ${ratingValue >= star ? "fill-amber-500" : "text-stone-300"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="rating-content" className="block text-[10px] text-stone-500 font-bold mb-1">شرح دقیق تجربه و نکات سودمند برای همراهان:</label>
            <textarea
              id="rating-content"
              required
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="نحوه تعامل آفیسران، زمان معطلی پرونده، مبالغ هزینه‌ها و تجربیات گرانبهای خود را مستند کنید..."
              className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-stone-800 text-right outline-none h-24"
            />
          </div>

          <div className="flex items-center gap-2 justify-end">
            <label htmlFor="rating-anonymous" className="text-[10px] text-stone-500 font-bold cursor-pointer">ثبت به صورت ناشناس (بدون درج نام و آواتار)</label>
            <input
              id="rating-anonymous"
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => {
                setIsAnonymous(e.target.checked);
                if (e.target.checked) setAuthorName("");
              }}
              className="w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex gap-2 justify-end pt-1">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-stone-200 hover:bg-stone-250 text-stone-700 px-4 py-2 rounded-xl"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2 rounded-xl font-black"
            >
              ثبت نهایی و انتشار در پورتال
            </button>
          </div>
        </form>
      )}

      {/* Reviews Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Filter Options */}
        <div className="lg:col-span-3 space-y-2 text-right">
          <span className="text-[10px] text-stone-400 block font-bold mb-1">فیلتر بر اساس دسته:</span>
          <button
            onClick={() => setActiveFilter("all")}
            className={`w-full text-right p-3 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center justify-between ${
              activeFilter === "all" 
                ? "bg-stone-900 border-stone-950 text-white shadow-3xs" 
                : "bg-stone-50 border-stone-150 hover:bg-stone-100"
            }`}
          >
            <span className="font-mono">{reviews.length}</span>
            <span>نمایش همه مراجع</span>
          </button>

          {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
            const count = reviews.filter(r => r.category === key).length;
            return (
              <button
                key={key}
                onClick={() => setActiveFilter(key as any)}
                className={`w-full text-right p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                  activeFilter === key 
                    ? "bg-stone-900 border-stone-950 text-white shadow-3xs font-black" 
                    : "bg-stone-50 border-stone-150 hover:bg-stone-100 text-stone-600"
                }`}
              >
                <span className="font-mono">{count}</span>
                <span className="truncate max-w-44">{CATEGORY_ICONS[key]} {label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Reviews List */}
        <div className="lg:col-span-9 space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-white border border-stone-200 rounded-2xl p-4.5 space-y-3.5 hover:border-stone-300 transition-all text-right shadow-3xs"
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3.5 h-3.5 ${rev.rating >= s ? "fill-amber-500" : "text-stone-200"}`} />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-bold">
                      {CATEGORY_LABELS[rev.category]}
                    </span>
                    <span className="text-xs font-black text-stone-850">
                      {rev.isAnonymous ? "کاربر ناشناس 👤" : rev.author}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-stone-600 font-bold leading-relaxed">
                  {rev.content}
                </p>

                <div className="flex justify-between items-center pt-2.5 border-t border-stone-100 text-[10px] text-stone-400 font-bold">
                  <button
                    onClick={() => handleLikeReview(rev.id)}
                    className={`flex items-center gap-1 hover:text-stone-700 transition-colors ${rev.likedByUser ? "text-amber-600 font-black" : ""}`}
                  >
                    <span>{rev.likes}</span>
                    <ThumbsUp className="w-3.5 h-3.5 shrink-0" />
                    <span>مفید بود</span>
                  </button>
                  
                  <span>📅 انتشار در {rev.date}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-12 bg-stone-50 border border-stone-150 rounded-2xl text-stone-400 font-bold text-xs italic">
              هیچ امتیاز و تجربه‌ای برای این دسته ثبت نشده است. اولین نفری باشید که تجربه خود را منتشر می‌کند!
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
