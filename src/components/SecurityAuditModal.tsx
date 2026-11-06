import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Download,
  Trash2,
  X,
  Filter,
  CheckCircle,
  AlertOctagon,
  Info,
  RefreshCw,
} from "lucide-react";
import {
  getSecurityLogs,
  clearSecurityLogs,
  subscribeToSecurityLogs,
  SecurityLogEntry,
} from "../utils/securityLogger";
import { toast } from "../utils/toast";

interface SecurityAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecurityAuditModal({ isOpen, onClose }: SecurityAuditModalProps) {
  const [logs, setLogs] = useState<SecurityLogEntry[]>([]);
  const [filterLevel, setFilterLevel] = useState<"ALL" | "ALERTS" | "AUTH">("ALL");

  useEffect(() => {
    if (isOpen) {
      setLogs(getSecurityLogs(100));
    }
  }, [isOpen]);

  useEffect(() => {
    const unsubscribe = subscribeToSecurityLogs((newEntry) => {
      setLogs((prev) => [newEntry, ...prev].slice(0, 100));
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const filteredLogs = logs.filter((log) => {
    if (filterLevel === "ALERTS") {
      return log.severity === "CRITICAL" || log.severity === "ERROR" || log.eventType === "UNAUTHORIZED_ACCESS";
    }
    if (filterLevel === "AUTH") {
      return log.eventType === "AUTH_SUCCESS" || log.eventType === "AUTH_FAILURE" || log.eventType === "LOGOUT";
    }
    return true;
  });

  const handleExport = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `security_audit_logs_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      toast.success("گزارش امنیتی با موفقیت دانلود شد 📁");
    } catch {
      toast.error("خطا در ایجاد خروجی JSON");
    }
  };

  const handleClear = () => {
    clearSecurityLogs();
    setLogs([]);
    toast.info("لاگ‌های امنیتی پاکسازی شدند.");
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md text-stone-900"
        dir="rtl"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-red-650 via-amber-400 to-emerald-500" />

          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900">
                  مرکز ثبت و پایش رویدادهای امنیتی (Security Audit Logs)
                </h3>
                <p className="text-[11px] text-stone-500 font-bold">
                  ثبت لحظه‌ای تلاش‌های ورود، دسترسی‌های غیرمجاز و انقضای نشست‌ها (مطابق security.md)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleExport}
                className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-black transition-all flex items-center gap-1 cursor-pointer"
                title="دانلود خروجی JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">خروجی JSON</span>
              </button>
              <button
                onClick={handleClear}
                className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#c8102e] text-xs font-black transition-all flex items-center gap-1 cursor-pointer"
                title="پاکسازی لاگ‌ها"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">پاکسازی</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors"
                title="بستن"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="px-5 py-2.5 bg-stone-50 border-b border-stone-150 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-black">
              <span className="text-stone-500 text-[11px] flex items-center gap-1">
                <Filter className="w-3 h-3" />
                فیلتر:
              </span>
              <button
                onClick={() => setFilterLevel("ALL")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all ${
                  filterLevel === "ALL"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-600 hover:bg-stone-200 border border-stone-200"
                }`}
              >
                همه رویدادها ({logs.length})
              </button>
              <button
                onClick={() => setFilterLevel("ALERTS")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all ${
                  filterLevel === "ALERTS"
                    ? "bg-[#c8102e] text-white shadow-xs"
                    : "bg-white text-rose-700 hover:bg-rose-50 border border-rose-200"
                }`}
              >
                هشدارهای امنیتی
              </button>
              <button
                onClick={() => setFilterLevel("AUTH")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all ${
                  filterLevel === "AUTH"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-white text-amber-800 hover:bg-amber-50 border border-amber-200"
                }`}
              >
                ورود و خروج‌ها
              </button>
            </div>

            <span className="text-[10px] text-stone-400 font-mono">
              حداکثر ۱۰۰ رویداد اخیر
            </span>
          </div>

          {/* Logs List */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-2">
            {filteredLogs.length === 0 ? (
              <div className="py-12 text-center text-stone-400 space-y-2">
                <ShieldCheck className="w-10 h-10 mx-auto text-emerald-500 opacity-80" />
                <p className="text-xs font-black text-stone-600">
                  هیچ رویداد امنیتی مشکوکی ثبت نشده است.
                </p>
                <p className="text-[10px]">سامانه در وضعیت امن و پایدار قرار دارد.</p>
              </div>
            ) : (
              filteredLogs.map((entry) => {
                const isCritical = entry.severity === "CRITICAL" || entry.severity === "ERROR";
                const isWarn = entry.severity === "WARN";
                const isAuth = entry.eventType.startsWith("AUTH_");

                return (
                  <div
                    key={entry.id}
                    className={`p-3 rounded-2xl border transition-all text-right flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      isCritical
                        ? "bg-rose-50/70 border-rose-200 hover:bg-rose-50"
                        : isWarn
                        ? "bg-amber-50/60 border-amber-200 hover:bg-amber-50"
                        : "bg-stone-50/80 border-stone-200/80 hover:bg-stone-100/70"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isCritical
                            ? "bg-red-650 text-white"
                            : isWarn
                            ? "bg-amber-500 text-white"
                            : "bg-emerald-600 text-white"
                        }`}
                      >
                        {isCritical ? (
                          <AlertOctagon className="w-4 h-4" />
                        ) : isWarn ? (
                          <AlertTriangle className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-stone-900">
                            {entry.action}
                          </span>
                          <span
                            className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded-md ${
                              isCritical
                                ? "bg-red-100 text-red-800"
                                : isWarn
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {entry.eventType}
                          </span>
                        </div>

                        {entry.userId && (
                          <div className="text-[10px] text-stone-500 font-mono">
                            کاربر: {entry.userId}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-stone-400 shrink-0 flex items-center gap-1 dir-ltr text-left">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{new Date(entry.timestamp).toLocaleTimeString("fa-IR")}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
