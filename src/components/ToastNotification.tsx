import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { toast } from "../utils/toast";

interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

export default function ToastNotification() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe((event) => {
      setToasts((prev) => [...prev, { id: event.id, message: event.message, type: event.type }]);
      
      // Auto-remove after 4 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== event.id));
      }, 4000);
    });

    return unsubscribe;
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 min-w-[280px] max-w-sm pointer-events-none" dir="rtl">
      <AnimatePresence>
        {toasts.map((t) => {
          let bgClass = "bg-[#0c0d12]/95 border-stone-800 text-stone-100";
          let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;
          let accentBar = "bg-blue-500";

          if (t.type === "success") {
            bgClass = "bg-[#0a0d14]/95 border-emerald-950/40 text-stone-100 shadow-[0_8px_32px_rgba(16,185,129,0.08)]";
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
            accentBar = "bg-emerald-500";
          } else if (t.type === "error") {
            bgClass = "bg-[#140b0b]/95 border-rose-950/40 text-stone-100 shadow-[0_8px_32px_rgba(239,68,68,0.08)]";
            icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
            accentBar = "bg-rose-500";
          } else if (t.type === "warning") {
            bgClass = "bg-[#141008]/95 border-amber-950/40 text-stone-100 shadow-[0_8px_32px_rgba(245,158,11,0.08)]";
            icon = <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
            accentBar = "bg-amber-500";
          }

          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className={`pointer-events-auto flex items-stretch gap-3 border p-4 rounded-2.5xl backdrop-blur-md overflow-hidden relative shadow-lg ${bgClass}`}
            >
              {/* Left Accent Color bar (RTL - on the rightmost edge, but wait, under RTL, right border can be decorated instead) */}
              <div className={`absolute right-0 top-0 bottom-0 w-1 ${accentBar}`} />
              
              <div className="flex items-start gap-3 w-full pr-1">
                {icon}
                <div className="flex-1 text-right">
                  <p className="text-xs font-black leading-relaxed text-stone-100">{t.message}</p>
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  className="text-stone-500 hover:text-stone-300 transition-colors p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
