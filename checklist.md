# Checklist.md — چکلیست امنیتی قبل از انتشار

## ✅ قبل از Deploy

### پیکربندی پایه
- [ ] HTTPS فعال و اجباری
- [ ] ریدایرکت HTTP → HTTPS
- [ ] گواهی SSL معتبر
- [ ] Security Headers فعال
- [ ] CORS محدود به دامنههای مجاز

### احراز هویت
- [ ] پسوردها Hash شده (bcrypt/argon2)
- [ ] Rate Limit روی login
- [ ] 2FA برای ادمین
- [ ] Session مدیریت صحیح
- [ ] Token انقضا دارد
- [ ] Logout کامل

### دیتابیس
- [ ] Prepared Statements
- [ ] کاربر DB با حداقل دسترسی
- [ ] پسورد قوی
- [ ] Backup فعال
- [ ] Encryption at Rest

### ورودی/خروجی
- [ ] Validation همه ورودیها
- [ ] Sanitize HTML
- [ ] Escape خروجیها
- [ ] محدودیت حجم فایل

### Environment
- [ ] `.env` در `.gitignore`
- [ ] کلیدها در Secret Manager
- [ ] حالت Production (نه Debug)
- [ ] لاگ خطا در سرور

### فایلها
- [ ] `.git`, `.env`, `backup.sql` قابل دسترسی نیستند
- [ ] Directory listing غیرفعال
- [ ] حذف فایلهای تست

### Frontend
- [ ] CSP فعال
- [ ] بدون `innerHTML` ناامن
- [ ] Cookie با HttpOnly + Secure
- [ ] بدون کلید API در کلاینت

### API
- [ ] Rate Limiting
- [ ] Authentication روی همه endpoint
- [ ] Validation ورودی
- [ ] پیام خطای عمومی

### زیرساخت
- [ ] Firewall فعال
- [ ] فقط پورتهای لازم باز
- [ ] SSH با کلید (نه پسورد)
- [ ] Fail2Ban نصب
- [ ] بروزرسانی سیستم

### مانیتورینگ
- [ ] لاگ مرکزی
- [ ] هشدار برای فعالیت مشکوک
- [ ] Uptime Monitor
- [ ] Sentry/Error Tracking

## ✅ بعد از Deploy

- [ ] تست نفوذ (Penetration Test)
- [ ] اسکن با OWASP ZAP
- [ ] بررسی با Mozilla Observatory
- [ ] تست بازیابی Backup
- [ ] بررسی لاگها روزانه (هفته اول)
- [ ] بروزرسانی پکیجها
- [ ] بررسی CVE های جدید

## 🔄 دورهای (ماهانه)

- [ ] بروزرسانی dependencies
- [ ] تغییر پسوردهای ادمین
- [ ] بررسی دسترسیها
- [ ] تست Backup
- [ ] بررسی لاگهای امنیتی
- [ ] اسکن آسیبپذیری

## 🚨 در صورت حمله

1. **قطع دسترسی** — سایت را در حالت Maintenance ببرید
2. **حفظ شواهد** — لاگها را ذخیره کنید
3. **تحلیل** — نقطه نفوذ را پیدا کنید
4. **پاکسازی** — بدافزار/Backdoor را حذف کنید
5. **تغییر اعتبارها** — همه پسوردها و کلیدها
6. **اطلاعرسانی** — به کاربران و مقامات
7. **بازگردانی** — از Backup سالم
8. **گزارش** — post-mortem بنویسید

## 🛠 ابزارهای پیشنهادی

| ابزار | کاربرد |
|-------|--------|
| OWASP ZAP | تست نفوذ |
| Snyk | اسکن dependency |
| Cloudflare | DDoS + WAF |
| Sentry | Error tracking |
| Fail2Ban | بلاک IP مخرب |
| Uptime Robot | مانیتورینگ |
| HaveIBeenPwned | بررسی پسورد |
