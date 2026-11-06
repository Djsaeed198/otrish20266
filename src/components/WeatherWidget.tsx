import React, { useState, useEffect } from 'react';
import { CloudSun } from 'lucide-react';

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => {
        setWeather(data.data || data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-[10px] text-stone-400">در حال بارگیری آب‌وهوا...</div>;

  return (
    <div className="bg-white border border-stone-200 p-3 px-4 rounded-[20px] flex items-center gap-4 transition-all hover:bg-stone-50 hover:border-amber-200 group shadow-xs">
      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shrink-0 group-hover:rotate-12 transition-transform">
        <CloudSun className="w-5.5 h-5.5" />
      </div>
      <div className="text-right">
        <span className="text-[9.5px] text-stone-400 font-black block">
          دما در ایالات اتریش:
        </span>
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-1">
            {weather.map((item: any, idx: number) => (
              <span key={idx} className="text-[10px] font-extrabold text-stone-800">
                {item.city}: {item.temp}°C
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
