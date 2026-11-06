import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Lock,
  User,
  AlertTriangle,
  KeyRound,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  LogOut,
  Fingerprint,
} from "lucide-react";
import {
  authenticateUser,
  checkLoginRateLimit,
  UserSession,
  terminateSession,
} from "../utils/cryptoAuth";
import { toast } from "../utils/toast";

interface SecureAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSession: UserSession | null;
  onSessionChange: (session: UserSession | null) => void;
  targetProtectedAction?: string;
}

export default function SecureAuthModal({
  isOpen,
  onClose,
  activeSession,
  onSessionChange,
  targetProtectedAction,
}: SecureAuthModalProps) {
  const [username, setUsername] = useState("iranianaustria@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState<number | null>(null);

  // Check rate limit on open or username change
  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      const rl = checkLoginRateLimit(username.trim().toLowerCase());
      if (!rl.allowed && rl.retryAfterSec) {
        setLockoutRemaining(rl.retryAfterSec);
      } else {
        setLockoutRemaining(null);
      }
    }
  }, [isOpen, username]);

  // Lockout countdown timer
  useEffect(() => {
    if (!lockoutRemaining || lockoutRemaining <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (!prev || prev <= 1) return null;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemaining]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMessage("لطفاً نام کاربری و رمز عبور را وارد کنید.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await authenticateUser(username, password);

      if (result.success && result.session) {
        toast.success(`ورود امن با موفقیت انجام شد. خوش آمدید! 🔐`);
        onSessionChange(result.session);
        setPassword("");
        onClose();
      } else {
        setErrorMessage(result.error || "نام کاربری یا رمز عبور اشتباه است.");
        toast.error(result.error || "خطای اعتبارسنجی ورود");
      }
    } catch {
      setErrorMessage("خطای سیستمی در پردازش هش و اعتبارسنجی رخ داد.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    terminateSession(activeSession?.username, "manual");
    onSessionChange(null);
    toast.info("نشست امنیتی پایان یافت و خروج انجام شد.");
    onClose();
  };

  if (!isOpen) return null;

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
          className="relative w-full max-w-md bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Austrian Red Accent Header */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#c8102e] via-amber-400 to-[#c8102e]" />

          {/* Header */}
          <div className="p-5 sm:p-6 pb-4 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white flex items-center justify-center shadow-md shadow-red-650/20">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900">
                  {activeSession ? "مدیریت نشست امنیتی" : "ورود به بخش مدیریت و تنظیمات"}
                </h3>
                <p className="text-[11px] text-stone-500 font-bold">
                  {targetProtectedAction
                    ? `دسترسی به بخش «${targetProtectedAction}» نیازمند احراز هویت است.`
                    : "استاندارد امنیتی PBKDF2 و حفاظت چندلایه (auth.md)"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors"
              title="بستن پنجره"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6">
            {activeSession ? (
              /* Already Logged In State */
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-right">
                    <div className="text-xs font-black text-emerald-950">
                      شما با نقش «{activeSession.role}» وارد شده‌اید
                    </div>
                    <div className="text-[11px] text-emerald-800 font-mono">
                      {activeSession.username}
                    </div>
                    <div className="text-[10px] text-emerald-700">
                      نشست تا ۳۰ دقیقه پس از آخرین فعالیت فعال خواهد ماند.
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-black transition-all cursor-pointer"
                  >
                    ادامه کار در سامانه
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex-1 py-2.5 px-4 bg-red-650 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>خروج امن</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Login Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {lockoutRemaining ? (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs font-black text-red-700">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 animate-pulse" />
                    <span>
                      حساب موقتاً قفل است. لطفاً {lockoutRemaining} ثانیه صبر کنید.
                    </span>
                  </div>
                ) : null}

                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-black text-[#c8102e] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Username Input */}
                <div className="space-y-1 text-right">
                  <label className="text-[11px] font-black text-stone-700 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-stone-500" />
                    <span>نام کاربری یا ایمیل سازمانی</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin یا iranianaustria@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#c8102e] focus:bg-white rounded-xl text-xs font-bold text-stone-900 outline-none transition-all dir-ltr text-left"
                    disabled={isLoading || !!lockoutRemaining}
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-1 text-right">
                  <label className="text-[11px] font-black text-stone-700 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-stone-500" />
                    <span>رمز عبور مدیریت</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#c8102e] focus:bg-white rounded-xl text-xs font-mono font-bold text-stone-900 outline-none transition-all dir-ltr text-left pl-10"
                      disabled={isLoading || !!lockoutRemaining}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Security Hints / Standards */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1 text-[10px] text-stone-500 font-bold">
                  <div className="flex items-center gap-1 text-stone-700">
                    <KeyRound className="w-3 h-3 text-amber-600" />
                    <span>رمز عبور پیش‌فرض تست مدیر:</span>
                    <span className="font-mono text-stone-900 font-black mr-1 dir-ltr">
                      Admin@Otrish2026!
                    </span>
                  </div>
                  <div>• رمز عبور در کلاینت با PBKDF2 و ۱۰۰,۰۰۰ دور هش می‌شود.</div>
                  <div>• سقف تلاش: ۵ بار در ۱۵ دقیقه (قفل خودکار برای مقابله با Brute Force).</div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading || !!lockoutRemaining}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-[#c8102e] to-[#970d22] hover:from-[#b00e28] hover:to-[#820b1d] text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-red-650/20 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Fingerprint className="w-4 h-4" />
                  <span>{isLoading ? "در حال اعتبارسنجی امنیتی..." : "ورود امن به سامانه"}</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
