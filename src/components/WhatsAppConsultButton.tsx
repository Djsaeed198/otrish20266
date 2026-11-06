import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppConsultButton = () => {
  return (
    <a
      href="https://wa.me/436889763256"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
      title="ارتباط با مشاورین اتریش‌نشین"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="font-black text-sm hidden sm:inline">ارتباط با مشاورین</span>
    </a>
  );
};

export default WhatsAppConsultButton;
