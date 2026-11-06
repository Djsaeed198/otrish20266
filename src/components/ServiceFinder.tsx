import React, { useState } from 'react';
import { INITIAL_BUSINESSES, CITIES } from '../data';
import { CategoryType } from '../types';
import { Search, MapPin, Check, Copy, Star, Award } from 'lucide-react';
import InteractiveServiceMap from './InteractiveServiceMap';

interface ServiceFinderProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export default function ServiceFinder({
  selectedCity,
  setSelectedCity
}: ServiceFinderProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const cities = CITIES;

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredBusinesses = INITIAL_BUSINESSES.filter(b => {
    // City filter
    if (selectedCity !== 'all' && b.city !== selectedCity) return false;

    // Category filter
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = b.name.toLowerCase().includes(q);
      const matchDesc = b.description.toLowerCase().includes(q);
      const matchAddress = b.address.toLowerCase().includes(q);
      return matchName || matchDesc || matchAddress;
    }

    return true;
  });

  const austriaHotspots = [
    { city: 'vienna', name: 'وین (Vienna)', x: '85%', y: '33%', color: 'bg-red-500' },
    { city: 'graz', name: 'گراتس (Graz)', x: '72%', y: '65%', color: 'bg-emerald-500' },
    { city: 'linz', name: 'لینتس (Linz)', x: '58%', y: '28%', color: 'bg-blue-600' },
    { city: 'salzburg', name: 'سالزبورگ (Salzburg)', x: '40%', y: '45%', color: 'bg-amber-500' },
    { city: 'innsbruck', name: 'اینسبروک (Innsbruck)', x: '18%', y: '60%', color: 'bg-indigo-505' }
  ];

  const mapHotspots = austriaHotspots;

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm text-right animate-fade-in animate-duration-300" id="service-finder">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-150 flex items-center justify-center text-lg shadow-2xs">
          📍
        </div>
        <div>
          <h3 className="font-bold text-stone-850 text-lg">
            نقشه تفصیلی خدمات و فیلتر جغرافیایی اتریش
          </h3>
          <p className="text-xs text-stone-400 font-bold">
            پزشکان همکار بیمه ÖGK، وکلای معتبر RWR Karte، مترجمان قسم‌خورده دادگاه و صرافی‌های همکار اتریش
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Service Map Integration */}
        <div className="lg:col-span-12 xl:col-span-12 flex flex-col justify-between">
          <InteractiveServiceMap
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            filteredBusinesses={filteredBusinesses}
          />
        </div>

        {/* Directory Listings */}
        <div className="lg:col-span-12 xl:col-span-12 flex flex-col justify-between">
          <div>
            {/* Quick search input */}
            <div className="mb-4 relative">
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی پزشک، وکیل، مترجم دادگاه، صرافی یا نشانی اداری در اتریش..."
                className="w-full pr-10 pl-4 py-3 bg-stone-50 border border-stone-150 rounded-xl focus:outline-none text-xs text-stone-850 font-bold focus:border-red-400"
              />
            </div>

            {/* Quick Category filter tabs */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-black shrink-0 transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                    : 'bg-white border-stone-200 text-stone-605 hover:bg-stone-50'
                }`}
              >
                📱 همه خدمات
              </button>
              <button
                onClick={() => setSelectedCategory('lawyers_rwr')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-black shrink-0 transition-all cursor-pointer ${
                  selectedCategory === 'lawyers_rwr'
                    ? 'bg-indigo-700 border-indigo-700 text-white'
                    : 'bg-white border-stone-200 text-indigo-700 hover:bg-indigo-50/50'
                }`}
              >
                📜 وکلای نفوذی MA 35
              </button>
              <button
                onClick={() => setSelectedCategory('translators_sworn')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-black shrink-0 transition-all cursor-pointer ${
                  selectedCategory === 'translators_sworn'
                    ? 'bg-rose-700 border-rose-700 text-white'
                    : 'bg-white border-stone-200 text-rose-700 hover:bg-red-50/50'
                }`}
              >
                💼 مترجمان رسمی قسم‌خورده
              </button>
              <button
                onClick={() => setSelectedCategory('physicians')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-black shrink-0 transition-all cursor-pointer ${
                  selectedCategory === 'physicians'
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'bg-white border-stone-200 text-teal-750 hover:bg-stone-50'
                }`}
              >
                🩺 پزشکان همکار ÖGK
              </button>
              <button
                onClick={() => setSelectedCategory('legal')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-black shrink-0 transition-all cursor-pointer ${
                  selectedCategory === 'legal'
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-stone-200 text-blue-700 hover:bg-stone-50'
                }`}
              >
                ⚖️ وکلای پایه یک
              </button>
              <button
                onClick={() => setSelectedCategory('stores')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-black shrink-0 transition-all cursor-pointer ${
                  selectedCategory === 'stores'
                    ? 'bg-amber-600 border-amber-600 text-white'
                    : 'bg-white border-stone-200 text-amber-700 hover:bg-stone-50'
                }`}
              >
                🛒 فروشگاه‌ها
              </button>
            </div>

            {/* Results Grid List */}
            <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
              {/* --- SPECIAL VIEW: LAWYERS OVERLAY --- */}
              {selectedCategory === 'lawyers_rwr' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="bg-indigo-50 border border-indigo-200 text-indigo-950 p-4 rounded-xl leading-relaxed text-xs font-bold text-right">
                    <strong>⚠️ توجه حقوقی درگاه اتریش‌نشین:</strong>{' '}
                    اداره مهاجرت وین (MA 35) قانوناً موظف به صدور یا تمدید رای‌ها ظرف ۶ ماه می‌باشد. وکلای معتبر کانون اتریش در زیر معرفی شده‌اند که تخصص ویژه‌ای در ثبت لوایح تسریع در رسیدگی (Säumnisbeschwerde) دارند:
                  </div>

                  <div className="bg-white border border-stone-200 p-4 rounded-xl space-y-2 hover:border-indigo-400 transition-colors text-right">
                    <span className="text-[9px] bg-indigo-100 text-indigo-800 font-black px-2 py-0.5 rounded">
                      متخصص مبارزه با تاخیر MA 35
                    </span>
                    <h5 className="font-extrabold text-xs sm:text-sm text-stone-900">
                      دفتر توسعه وکالت بین‌الملل - دکتر مانی پناهی
                    </h5>
                    <div className="flex flex-col gap-1 text-[11px] text-stone-605 font-bold">
                      <span>📱 تلفن ارتباط فوری: <strong className="font-mono text-indigo-700">+43 676 999 5050</strong></span>
                      <span>📍 نشانی دفتر فیزیکی: <strong className="font-mono">Schottenring 16, 1010 Wien</strong></span>
                    </div>
                    <p className="text-[10px] text-stone-400 font-bold leading-normal">
                      حمایت همه‌جانبه در ارائه اظهارنامه تمکن مالی، کارت اقامت RWR، رفع نواقص بیمه دوجانبه در دادگاه اداری وین (LVwG).
                    </p>
                  </div>
                </div>
              )}

              {/* --- SPECIAL VIEW: CERTIFIED TRANSLATORS --- */}
              {selectedCategory === 'translators_sworn' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="bg-rose-50 border border-rose-200 text-rose-950 p-4 rounded-xl leading-relaxed text-xs font-bold text-right">
                    <strong>📜 مترجم تایید شده رسمی (Gerichtsdolmetscher):</strong>{' '}
                    ترجمه‌هایی معتبرند که توسط مترجمین ممهور کانون مترجمین اتریش مهر شوند. دیگر نیازی به تائیدات چندباره سفارت ایران نخواهید داشت.
                  </div>

                  <div className="bg-white border border-stone-200 p-4 rounded-xl space-y-2 hover:border-red-400 transition-colors text-right">
                    <span className="text-[9px] bg-red-100 text-red-800 font-black px-2 py-0.5 rounded">
                      مترجم رسمی دادگاه اتریش
                    </span>
                    <h5 className="font-extrabold text-xs sm:text-sm text-stone-900">
                      دفتر ترجمه رسمی دادگاه‌های اتریش - دکتر ناصر افشار
                    </h5>
                    <div className="flex flex-col gap-1 text-[11px] text-stone-605 font-bold">
                      <span>📱 تلفن ارتباط واتساپ: <strong className="font-mono text-red-700">+43 660 120 1200</strong></span>
                      <span>✉️ ایمیل پاسخگویی رسمی: <strong className="font-mono text-red-700 font-semibold">afshar.dolmetscher@gmail.com</strong></span>
                    </div>
                  </div>
                </div>
              )}

              {/* DEFAULT SENSOR GRID FLOW */}
              {selectedCategory !== 'lawyers_rwr' && selectedCategory !== 'translators_sworn' && (
                filteredBusinesses.length > 0 ? (
                  filteredBusinesses.map((b) => (
                     <div
                      key={b.id}
                      className={`p-4 rounded-xl border transition-all text-right ${
                        b.featured
                          ? 'bg-rose-50/20 border-red-200 shadow-xs'
                          : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center font-bold text-xs ${
                            b.category === 'physicians' ? 'bg-teal-100 text-teal-850 font-bold' :
                            b.category === 'legal' ? 'bg-blue-100 text-blue-800' :
                            b.category === 'translators' ? 'bg-violet-100 text-violet-850 font-bold' :
                            b.category === 'stores' ? 'bg-amber-100 text-amber-855 font-bold' : 'bg-red-100 text-red-800'
                          }`}>
                            {b.avatarLetter}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-stone-850 text-xs">{b.name}</h4>
                              {b.verified && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-md font-bold flex items-center gap-0.5 bg-sky-50 text-sky-850 border border-sky-100">
                                  ✓ تایید شده
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-stone-400 font-bold uppercase font-mono">
                              {b.category} • {b.city.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                          <span className="text-xs font-bold font-mono text-stone-700">{b.rating}</span>
                          <span className="text-[10px] text-stone-405 font-mono">({b.reviewCount})</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-stone-600 leading-relaxed mb-3 pr-11.5 font-bold">{b.description}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                        <div className="flex items-center gap-2 text-[10px] text-stone-500 font-bold pr-1.5">
                          <span>📍 {b.address}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyPhone(b.id, b.phone)}
                          className="text-[10px] px-3 py-1.5 bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-lg flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer font-extrabold font-mono shrink-0"
                        >
                          {copiedId === b.id ? (
                            <span className="text-emerald-700 font-sans">✓ کپی شد</span>
                          ) : (
                            <span>{b.phone}</span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-8 text-stone-400 text-xs font-bold bg-stone-50 rounded-xl border border-stone-100">
                    هیچ کسب‌وکار یا خدماتی با این فیلترها و عبارت جستجو در شهر انتخابی یافت نشد.
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-stone-50 border border-stone-150 rounded-xl text-[11px] text-stone-850 leading-relaxed font-bold">
            <Award className="w-4 h-4 shrink-0 inline ml-1 text-red-700" />
            <span>
              معرفی و ثبت مترجمان قسم‌خورده در پلتفرم اتریش‌نشین کاملاً رایگان است.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
