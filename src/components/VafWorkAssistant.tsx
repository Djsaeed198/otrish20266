import React, { useState } from 'react';
import { FileText, CheckCircle2, DownloadCloud, Sparkles } from 'lucide-react';

export default function VafWorkAssistant() {
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const departments = [
    { 
      t: 'درخواست‌های MA35', 
      d: 'فرم‌های تمدید اقامت، تاییدیه ملده، گواهی عدم سوء‌پیشینه کیفری به آلمانی پناه و الحاق خانواده.', 
      c: 'text-indigo-600 bg-indigo-50 border-indigo-100', 
      link: 'چک‌لیست اقامتی' 
    },
    { 
      t: 'بازگشت مالیات سالانه', 
      d: 'آموزش ثبت فرم L1 در FinanzOnline در اول هر سال جهت کسر فاکتور خریدهای لپ‌تاپ و کارآموزی.', 
      c: 'text-emerald-600 bg-emerald-50 border-emerald-100', 
      link: 'راهنمای فرم L1' 
    },
    { 
      t: 'فرآیندهای استعلام AMS', 
      d: 'معرفی رزومه‌ساز Europass منطبق با استاندارد ملی کاری اتریش و دریافت کمک‌هزینه بیکاری.', 
      c: 'text-amber-600 bg-amber-50 border-amber-100', 
      link: 'رزومه‌ساز AMS' 
    },
    { 
      t: 'خدمات رفاهی کودکان', 
      d: 'ثبت فرم مزایا خانواده (Familienbeihilfe) و دریافت شماره مشتری از دپارتمان مهدکودک MA10.', 
      c: 'text-purple-600 bg-purple-50 border-purple-100', 
      link: 'دریافت کمک‌هزینه' 
    }
  ];

  return (
    <section className="bg-indigo-50/40 border border-indigo-150/40 rounded-[32px] p-6 md:p-8 space-y-6 relative overflow-hidden" id="vaf-work-assistant-block">
      {toast && (
        <div className="absolute top-4 left-4 right-4 md:left-4 md:right-auto bg-stone-900 text-white text-xs font-black px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 justify-end animate-fade-in z-50">
          <span>{toast}</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-end gap-4 text-right">
        <div className="text-right space-y-1">
          <span className="bg-indigo-600 text-white text-[9px] font-black px-3 py-1 rounded-full inline-block mb-1.5 shadow-3xs">
            VAF SMART ASSISTANT
          </span>
          <h2 className="text-sm md:text-base font-black text-stone-850">دستیار هوشمند مستندات و فرم کاتالوگ VAF</h2>
          <p className="text-[11px] text-stone-500 font-bold leading-normal max-w-xl">
            ثبت و تکمیل فرم‌های رسمی ادارات اتریش می‌تواند سردرگم‌کننده باشد. ما چک‌لیست و توضیحات تصویری بخش‌های گوناگون را با الگوهای نمونه ترجمه شده برای تایید آماده کرده‌ایم.
          </p>
        </div>

        <span className="text-[10px] bg-white border border-indigo-200 text-indigo-800 px-3 py-1 rounded-xl font-bold shrink-0">
          ۴ دپارتمان آماده پایش 📁
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {departments.map((v, i) => (
          <div key={i} className="bg-white border border-stone-200/50 p-5 rounded-2.5xl flex flex-col justify-between hover:border-indigo-300 transition-all text-right shadow-3xs hover:-translate-y-0.5 duration-150">
            <div className="space-y-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black ${v.c}`}>
                {i + 1}
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-black text-stone-850">{v.t}</h3>
                <p className="text-[10px] text-stone-500 leading-relaxed font-semibold">{v.d}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-black">
              <button 
                type="button"
                onClick={() => {
                  showNotification(`مدارک و قالب ترجمه فارسی فرمهای دپارتمان ${v.t} الحاق و به بخش دانلودهای شما اضافه شد.`);
                }}
                className="text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer flex items-center gap-1.5 justify-end w-full"
              >
                <span>{v.link} ←</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
