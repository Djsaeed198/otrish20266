import React from 'react';
import { MessageCircle, PhoneCall, Sparkles } from 'lucide-react';

const WhatsAppConsultButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2.5" dir="rtl">
      {/* Diaco Emerald WhatsApp Action Pill */}
      <a
        href="https://wa.me/436889763256"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-gradient-to-r from-[#14b8a6] via-[#0d9488] to-[#0f766e] hover:from-[#2dd4bf] hover:to-[#0d9488] text-white px-4 py-3 rounded-full shadow-[0_10px_25px_rgba(20,184,166,0.45)] border border-teal-300/40 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95"
        title="مشاوره مستقیم با وکلای دیاکو"
        aria-label="مشاوره مستقیم در واتساپ"
      >
        {/* Pulsing online indicator */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200 border border-white" />
        </span>

        <MessageCircle className="w-5 h-5 text-white drop-shadow" />

        <div className="flex flex-col text-right pr-0.5">
          <span className="font-black text-xs text-white leading-tight flex items-center gap-1">
            <span>مشاوره فوری دیاکو</span>
            <Sparkles className="w-3 h-3 text-amber-300 inline" />
          </span>
          <span className="text-[9px] font-bold text-teal-100 hidden sm:inline">
            پاسخگویی آنلاین مشاوران اتریش
          </span>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppConsultButton;

