import React from "react";
import { motion } from "motion/react";
import { Award, IdCard, Landmark, BookOpen, Building, ArrowUpRight } from "lucide-react";

const IMAGES = {
  viennaHero: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80",
  stephansdom: "https://images.unsplash.com/photo-1583687355032-89b902b7335f?auto=format&fit=crop&w=800&q=80",
  alps: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=800&q=80",
  parliament: "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=800&q=80",
  cafe: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
};

interface SuperAppQuickHeroStripProps {
  onSelectSegment: (segment: string) => void;
}

export default function SuperAppQuickHeroStrip({
  onSelectSegment,
}: SuperAppQuickHeroStripProps) {
  const items = [
    {
      img: IMAGES.viennaHero,
      label: "کارت قرمز-سفید-قرمز",
      sub: "محاسبه امتیاز اقامت کاری",
      segment: "rwr-calculator",
      icon: Award,
      gradient: "from-[#c8102e] to-[#970d22]",
    },
    {
      img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      label: "نمونه ویزاها",
      sub: "کارت اقامت و پذیرش",
      segment: "visa-samples",
      icon: IdCard,
      gradient: "from-purple-700 via-indigo-800 to-blue-900",
    },
    {
      img: IMAGES.parliament,
      label: "اداره اقامت MA35",
      sub: "پایش نوبت و تمدید پرونده",
      segment: "ma35",
      icon: Landmark,
      gradient: "from-indigo-600 to-blue-700",
    },
    {
      img: IMAGES.alps,
      label: "مدارک زبان",
      sub: "ÖSD، Goethe",
      segment: "german",
      icon: BookOpen,
      gradient: "from-emerald-600 to-teal-700",
    },
    {
      img: IMAGES.cafe,
      label: "مسکن وین",
      sub: "۲۳ منطقه",
      segment: "housesearch",
      icon: Building,
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  const getSegmentPath = (segment: string) => {
    const map: Record<string, string> = {
      "rwr-calculator": "/rwr-card",
      "visa-samples": "/visa-samples",
      "ma35": "/ma35",
      "german": "/german",
      "housesearch": "/wohnen"
    };
    return map[segment] || `/${segment}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 select-none"
      dir="rtl"
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={i}
            href={getSegmentPath(item.segment)}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                onSelectSegment(item.segment);
              }
            }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-2xl h-20 md:h-24 border border-stone-200 hover:border-stone-300 shadow-xs hover:shadow-lg transition-all text-right cursor-pointer block no-underline"
          >
            <img
              src={item.img}
              alt={item.label}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-75 mix-blend-multiply group-hover:opacity-85 transition-opacity`}
            />
            <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
              <Icon className="w-4 h-4 opacity-80" />
              <div className="text-right">
                <div className="text-xs font-black leading-tight">{item.label}</div>
                <div className="text-[9px] font-bold opacity-80">{item.sub}</div>
              </div>
            </div>
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
