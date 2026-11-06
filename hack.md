# Hack.md — حملات رایج و راههای دفاع

## 🎯 هدف
شناخت حملات رایج و جلوگیری از آنها.

## 1. XSS (Cross-Site Scripting)
**حمله:** تزریق JavaScript در سایت
**دفاع:**
- Escape کردن همه خروجیها
- استفاده از CSP
- کتابخانه DOMPurify برای HTML
- HttpOnly Cookies

## 2. SQL Injection
**حمله:** تزریق SQL در ورودی
**دفاع:**
- Prepared Statements
- ORM
- Validation ورودی
- WAF

## 3. CSRF (Cross-Site Request Forgery)
**حمله:** ارسال درخواست از سایت دیگر با session کاربر
**دفاع:**
- CSRF Token
- SameSite Cookies
- بررسی Origin Header

## 4. Clickjacking
**حمله:** قرار دادن سایت در iframe مخفی
**دفاع:**
- `X-Frame-Options: DENY`
- CSP `frame-ancestors 'none'`

## 5. Brute Force
**حمله:** تلاش مکرر برای حدس پسورد
**دفاع:**
- Rate Limiting
- CAPTCHA
- قفل حساب موقت
- 2FA

## 6. DDoS
**حمله:** سیل درخواستها
**دفاع:**
- Cloudflare / AWS Shield
- Rate Limiting
- CDN
- Load Balancer

## 7. Path Traversal
**حمله:** دسترسی به فایل خارج از دایرکتوری
**دفاع:**
- اعتبارسنجی نام فایل
- استفاده از path.resolve و بررسی prefix
- محدود کردن دسترسی فایلسیستم

## 8. SSRF (Server-Side Request Forgery)
**حمله:** سرور درخواست به منابع داخلی بزند
**دفاع:**
- Whitelist دامنهها
- بلاک IP های داخلی (169.254.x.x, 127.0.0.1)
- عدم پیروی از redirect

## 9. XXE (XML External Entity)
**حمله:** سوءاستفاده از XML Parser
**دفاع:**
- غیرفعال کردن External Entities
- استفاده از JSON به جای XML

## 10. Insecure Deserialization
**حمله:** اجرای کد از طریق دادههای سریالایز
**دفاع:**
- هرگز داده کاربر را deserialize نکنید
- استفاده از فرمتهای امن (JSON)

## 11. Supply Chain Attack
**حمله:** آلوده کردن پکیجها
**دفاع:**
- `npm audit` / `pip-audit`
- Lock file
- بررسی منبع پکیج
- Snyk یا Dependabot

## 12. Information Disclosure
**حمله:** افشای اطلاعات حساس
**دفاع:**
- حذف هدرهای افشاگر (X-Powered-By, Server)
- پیام خطای عمومی
- حذف فایلهای حساس (.env, .git)

## 13. Session Hijacking
**حمله:** دزدیدن session
**دفاع:**
- HTTPS اجباری
- HttpOnly Cookies
- Regenerate Session ID
- بایند کردن session به IP/User-Agent (با احتیاط)

## 14. Privilege Escalation
**حمله:** افزایش سطح دسترسی
**دفاع:**
- بررسی دسترسی در هر endpoint
- Least Privilege
- Audit logs

## 15. Zero-Day Attacks
**دفاع:**
- بروزرسانی سریع
- WAF
- مانیتورینگ مداوم
- Bug Bounty Program

## 🧪 ابزارهای تست
- OWASP ZAP
- Burp Suite
- Nmap
- Nikto
- SQLMap (فقط روی سایت خودتان!)
