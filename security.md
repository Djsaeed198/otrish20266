# Security.md — اصول کلی امنیت سایت

## 🎯 هدف
محافظت از سایت، کاربران، دیتابیس و زیرساخت در برابر حملات رایج.

## 1. HTTPS و SSL
- همه صفحات باید از HTTPS استفاده کنند (Redirect اجباری از HTTP به HTTPS)
- گواهی SSL معتبر (Let's Encrypt یا Cloudflare)
- فعالسازی HSTS در هدرها
- استفاده از TLS 1.2 یا بالاتر

## 2. هدرهای امنیتی (Security Headers)
در فایل config سرور یا middleware تنظیم کنید:
- Content-Security-Policy (CSP)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Strict-Transport-Security
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy

## 3. رمزنگاری (Encryption)
- رمزنگاری دادههای حساس در دیتابیس (AES-256)
- Hash کردن پسوردها با bcrypt / argon2 (حداقل 12 round)
- رمزنگاری فایلهای env و کلیدها
- استفاده از Vault یا Secret Manager برای کلیدها

## 4. مدیریت خطاها
- هرگز Stack Trace یا پیام خطای دیتابیس به کاربر نشان ندهید
- صفحه خطای عمومی 404/500 بسازید
- لاگ خطاها فقط در سرور

## 5. CORS
- فقط دامنههای مجاز را allow کنید
- از `Access-Control-Allow-Origin: *` پرهیز کنید

## 6. Rate Limiting
- محدودیت درخواست برای login, register, API
- مثال: 5 درخواست در دقیقه برای لاگین
- استفاده از Redis برای ذخیره شمارنده

## 7. Backups
- پشتیبانگیری روزانه از دیتابیس
- ذخیره backup در سرور جداگانه
- تست بازیابی backup ماهانه

## 8. Monitoring & Logging
- لاگ تمام لاگینها (موفق و ناموفق)
- هشدار برای فعالیت مشکوک
- ابزارها: Sentry, Datadog, Grafana

## 9. بروزرسانی
- بروزرسانی هفتگی پکیجها (npm audit, pip-audit)
- رفع CVE های شناختهشده
- حذف پکیجهای استفاده نشده

## 10. Environment Variables
- هرگز کلیدها را در کد commit نکنید
- `.env` در `.gitignore` باشد
- از `.env.example` برای نمونه استفاده کنید
