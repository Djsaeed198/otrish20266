import React, { useState, useEffect } from 'react';
import { Calculator, Info, RefreshCw } from 'lucide-react';
import { trackEvent } from '../utils/tracker';

interface TaxBreakdown {
  grossAnnual: number;
  annualTax: number;
  annualSocialSecurity: number;
  netAnnual: number;
  netMonthly: number;
  effectiveTaxRate: number;
  baseBrackets: string;
}

export default function TaxCalculator() {
  const [salary, setSalary] = useState<string>('30000');
  const [autonomyType, setAutonomyType] = useState<'employee' | 'autonomo'>('employee');
  const [result, setResult] = useState<TaxBreakdown | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculateTaxes = async () => {
    setError(null);
    setLoading(true);
    // Track taxation trigger event
    trackEvent("tax_calculate", "interaction", { salary, autonomyType });
    try {
      const response = await fetch('/api/calculate-tax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salary, autonomyType })
      });
      if (!response.ok) throw new Error("مشکلی در محاسبه رخ داد.");
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("خطا در برقراری ارتباط با پورتال محاسبات.");
      simulateLocalCalculation();
    } finally {
      setLoading(false);
    }
  };

  const simulateLocalCalculation = () => {
    const gross = parseFloat(salary) || 0;
    const ssRate = autonomyType === 'autonomo' ? 0.175 : 0.1812;

    const socSec = gross * ssRate;
    const taxable = Math.max(0, gross - ssRate * gross);

    let tax = 0;
    // Austrian Tax simulation
    if (taxable > 99266) {
      tax = (taxable - 99266) * 0.50 + 26160;
    } else if (taxable > 66612) {
      tax = (taxable - 66612) * 0.48 + 10480;
    } else if (taxable > 34136) {
      tax = (taxable - 34136) * 0.40 + 4000;
    } else if (taxable > 20816) {
      tax = (taxable - 20816) * 0.30 + 1600;
    } else if (taxable > 12816) {
      tax = (taxable - 12816) * 0.20;
    }

    const net = gross - tax - socSec;
    setResult({
      grossAnnual: gross,
      annualTax: tax,
      annualSocialSecurity: socSec,
      netAnnual: net,
      netMonthly: net / 12,
      effectiveTaxRate: gross > 0 ? parseFloat(((tax / gross) * 100).toFixed(2)) : 0,
      baseBrackets: "مبنای محاسبات تخمینی کلاینت اتریش"
    });
  };

  useEffect(() => {
    calculateTaxes();
  }, [autonomyType]);

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm relative overflow-hidden text-right" id="tax-calculator">
      {/* Decorative Flag line on top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-red-650 via-white to-red-650"></div>

      <div className="flex items-center gap-3 mb-5 pt-1">
        <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-150 flex items-center justify-center text-lg shadow-2xs">
          🇦🇹
        </div>
        <div className="text-right">
          <h3 className="font-bold text-stone-850 text-lg">
            ماشین‌حساب حقوق (Brutto-Netto اتریش)
          </h3>
          <p className="text-xs text-stone-400 font-bold">
            تبدیل دستمزد ناخالص سالانه به دریافتی خالص پس از کسر بیمه و مالیات رسمی اتریش
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-5 bg-stone-50 rounded-xl p-5 border border-stone-150">
          <div className="text-right">
            <label className="text-xs font-bold text-stone-700 block mb-2">نوع قرارداد کاری</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAutonomyType('employee')}
                className={`py-3 px-4 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                  autonomyType === 'employee'
                    ? 'bg-red-600 border-red-700 text-white shadow-xs'
                    : 'bg-white border-stone-200 text-stone-650 hover:bg-stone-100'
                }`}
              >
                💼 کارمند (Angestellter)
              </button>
              <button
                type="button"
                onClick={() => setAutonomyType('autonomo')}
                className={`py-3 px-4 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                  autonomyType === 'autonomo'
                    ? 'bg-red-600 border-red-700 text-white shadow-xs'
                    : 'bg-white border-stone-200 text-stone-650 hover:bg-stone-100'
                }`}
              >
                🚀 خوداشتغال (Selbstständig)
              </button>
            </div>
          </div>

          <div className="text-right">
            <label className="text-xs font-black text-stone-75 block mb-2">کل حقوق ناخالص سالانه (یورو)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-sm">€</span>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="مثلاً ۳۰۰۰۰"
                className="w-full pl-8 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none font-mono text-left font-bold text-stone-850 focus:border-red-450"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={calculateTaxes}
            disabled={loading}
            className="w-full text-white py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98 transition-all bg-red-600 hover:bg-red-700"
            id="btn-calculate-tax"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
            <span>محاسبه مجدد مالیات</span>
          </button>
        </div>

        {/* Output values */}
        <div className="flex flex-col justify-between text-right">
          {result ? (
            <div className="space-y-4">
              <div className="bg-stone-50 border border-stone-150 rounded-xl p-4 flex items-center justify-between">
                <div className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg border shrink-0 bg-red-50/45 text-red-800 border-rose-100">
                  نرخ مالیات مؤثر: {result.effectiveTaxRate}%
                </div>
                <div>
                  <span className="text-xs text-stone-605 font-bold block mb-1">حقوق خالص ماهانه شما:</span>
                  <span className="text-2xl font-black font-mono text-red-750">
                    {Math.round(result.netMonthly).toLocaleString('fa-IR')}{' '}
                    <span className="text-xs font-sans font-bold">یورو / ماه</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-150">
                  <span className="text-[11px] text-stone-500 block mb-1">
                    مالیات سالانه (Steuern)
                  </span>
                  <span className="text-sm font-bold font-mono text-stone-800">
                    €{Math.round(result.annualTax).toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-150">
                  <span className="text-[11px] text-stone-500 block mb-1">
                    سهم تامین اجتماعی (SV)
                  </span>
                  <span className="text-sm font-bold font-mono text-stone-800">
                    €{Math.round(result.annualSocialSecurity).toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-150 col-span-2 flex justify-between items-center">
                  <span className="text-sm font-black font-mono text-emerald-700">
                    €{Math.round(result.netAnnual).toLocaleString()}
                  </span>
                  <span className="text-[11px] text-stone-550 font-bold">مجموع خالص سالانه دریافتی (Netto)</span>
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5 text-xs text-stone-800 leading-relaxed font-bold font-sans">
                <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <strong>توضیحات مالیاتی اتریش:</strong>
                  <p className="mt-0.5 text-[11px] font-medium leading-relaxed text-stone-605">
                    {autonomyType === 'autonomo'
                      ? "به عنوان خوداشتغال (Selbstständig) سهم تامین اجتماعی بر اساس پایه قانون بیمه SVS محاسبه گردید."
                      : "برای کارمند با فرض قرارداد استخدامی استاندارد و کسر ۱۸.۱۲٪ تامین اجتماعی اتریش (SV-Beitrag) از حقوق ناخالص محاسبه شد."}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 p-8">
              <Calculator className="w-12 h-12 stroke-1 mb-2 text-stone-300 animate-bounce" />
              <p className="text-xs font-bold">در حال پردازش محاسبات با دیتای رسمی...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
