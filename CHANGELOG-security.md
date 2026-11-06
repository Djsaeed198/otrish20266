# CHANGELOG-security.md — تاریخچه اقدامات و ارتقاهای امنیتی

تمامی تغییرات، پچ‌ها و تمهیدات دفاعی پیاده‌سازی‌شده در سامانه به ترتیب تاریخ در این سند ثبت می‌شوند.

---

## [نسخه ۲.۴.۰] - ۲۰۲۶-۱۰-۰۸
### 🛡️ افزوده شده (Added):
- ماژول اختصاصی `securityLogger.ts` جهت ثبت رویدادهای `AUTH_SUCCESS`, `AUTH_FAILURE`, `UNAUTHORIZED_ACCESS`, `SESSION_EXPIRED`.
- سیستم احراز هویت رمزنگاری‌شده `cryptoAuth.ts` با استاندارد **PBKDF2-SHA256** و ۱۰۰,۰۰۰ دور هشینگ.
- ماژول Rate Limiting برای جلوگیری از حملات Brute Force (حداکثر ۵ تلاش در ۱۵ دقیقه).
- تایمر ۳۰ دقیقه‌ای انقضای نشست (Inactivity Timeout) با خروج امن خودکار.
- فایل استاندارد بین‌المللی افشای هماهنگ آسیب‌پذیری `/.well-known/security.txt` مطابق RFC 9116.
- هدرهای امنیتی چندلایه در سرور: HSTS، nosniff، SAMEORIGIN، Referrer-Policy، Permissions-Policy، X-XSS-Protection.
- اسناد مرجع امنیتی: `incident-response.md`, `ai-review.md`, `secrets-management.md`, `threat-model.md`.

### 🔒 اصلاح شده (Fixed):
- رفع آسیب‌پذیری احتمالی ارتقای دسترسی از طریق کوئری `?admin=true` یا مقدار خام در `localStorage`.
- سانسور خودکار رمزهای عبور و اطلاعات محرمانه در تمام لاگ‌های ثبت‌شده.
- مسدودسازی متدهای ناامن HTTP مانند `TRACE` و `TRACK` در سرور.
