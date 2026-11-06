import React from "react";
import { Home, LayoutGrid, Search, Newspaper, Phone, Compass } from "lucide-react";

interface SuperAppMobileBottomNavProps {
  activeSegment: string;
  onSelectSegment: (segment: string) => void;
  onOpenSearch: () => void;
  onOpenNews: () => void;
  onOpenCategories: () => void;
}

export default function SuperAppMobileBottomNav({
  activeSegment,
  onSelectSegment,
  onOpenSearch,
  onOpenNews,
  onOpenCategories
}: SuperAppMobileBottomNavProps) {
  const isHome = activeSegment === "home";

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-2 py-1.5 flex items-center justify-around text-[10px] font-black" dir="rtl">
      
      {/* 1. Home */}
      <button
        onClick={() => onSelectSegment("home")}
        className={`flex flex-col items-center gap-1 p-1.5 px-3 rounded-2xl transition-all ${
          isHome ? "text-red-650 font-black" : "text-stone-500 hover:text-stone-800"
        }`}
      >
        <div className={`p-1 rounded-xl ${isHome ? "bg-red-50" : ""}`}>
          <Home className="w-5 h-5" />
        </div>
        <span>خانه</span>
      </button>

      {/* 2. Services / Categories */}
      <button
        onClick={onOpenCategories}
        className={`flex flex-col items-center gap-1 p-1.5 px-3 rounded-2xl transition-all ${
          !isHome && activeSegment !== "about" ? "text-red-650 font-black" : "text-stone-500 hover:text-stone-800"
        }`}
      >
        <div className={`p-1 rounded-xl ${!isHome && activeSegment !== "about" ? "bg-red-50" : ""}`}>
          <LayoutGrid className="w-5 h-5" />
        </div>
        <span>خدمات</span>
      </button>

      {/* 3. Search Center Button (Slightly elevated) */}
      <button
        onClick={onOpenSearch}
        className="flex flex-col items-center gap-1 -mt-4"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-650 to-rose-500 text-white flex items-center justify-center shadow-md shadow-red-500/30 active:scale-95 transition-transform border-2 border-white">
          <Search className="w-5 h-5" />
        </div>
        <span className="text-stone-700 font-black text-[9.5px]">جستجو</span>
      </button>

      {/* 4. Live News Archive */}
      <button
        onClick={onOpenNews}
        className="flex flex-col items-center gap-1 p-1.5 px-2.5 rounded-2xl text-stone-600 hover:text-stone-900 transition-all active:scale-95"
        title="مشاهده آرشیو جامع اخبار و مصوبات اتریش"
      >
        <div className="p-1 rounded-xl relative">
          <Newspaper className="w-5 h-5 text-amber-600" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        </div>
        <span className="text-[9.5px] font-black">آرشیو اخبار</span>
      </button>

      {/* 5. Contact / About */}
      <button
        onClick={() => onSelectSegment("about")}
        className={`flex flex-col items-center gap-1 p-1.5 px-3 rounded-2xl transition-all ${
          activeSegment === "about" ? "text-red-650 font-black" : "text-stone-500 hover:text-stone-800"
        }`}
      >
        <div className={`p-1 rounded-xl ${activeSegment === "about" ? "bg-red-50" : ""}`}>
          <Phone className="w-5 h-5" />
        </div>
        <span>تماس</span>
      </button>

    </div>
  );
}
