# سوپراپلیکیشن اتریش‌نشین (Otrish Neshin) 🇦🇹 🇮🇷

سوپراپلیکیشن جامع، هوشمند و مستقل ایرانیان و فارسی‌زبانان مقیم اتریش.

---

## 🔐 مستندات امنیتی و استانداردهای پروژه

برای حفظ بالاترین سطح امنیت، پایداری داده‌ها، رعایت استانداردهای OWASP و پوشش تهدیدات کدهای تولیدشده توسط AI، مستندات مرجع زیر در پروژه پیاده‌سازی شده‌اند:

### اسناد پایه:
1. **[security.md](./security.md)** — اصول کلی امنیت سایت، HTTPS/SSL، هدرهای امنیتی، مانیتورینگ و متغیرهای محیطی.
2. **[auth.md](./auth.md)** — احراز هویت، هشینگ PBKDF2، مدیریت نشست‌ها و سیاست‌های کنترل دسترسی (RBAC).
3. **[data.md](./data.md)** — امنیت داده‌ها، دیتابیس، اعتبارسنجی ورودی‌ها، کوکی‌ها و رعایت GDPR.
4. **[hack.md](./hack.md)** — تحلیل حملات رایج (XSS, CSRF, Injection, DDoS, Clickjacking) و راهکارهای دفاعی چندلایه.
5. **[checklist.md](./checklist.md)** — چک‌لیست جامع امنیتی قبل و بعد از انتشار و سناریوهای واکنش به حوادث امنیتی.

### اسناد تکمیلی و اختصاصی:
6. **[incident-response.md](./incident-response.md)** — راهنمای واکنش به رخدادهای امنیتی (SOP)، مهار، پاکسازی و فهرست تماس اضطراری.
7. **[ai-review.md](./ai-review.md)** — چک‌لیست بازبینی کدهای هوش مصنوعی، مقابله با Slopsquatting و اعتبارسنجی پکیج‌ها.
8. **[secrets-management.md](./secrets-management.md)** — خط‌مشی مدیریت و چرخش دوره‌ای کلیدها (Key Rotation) و pre-commit hooks.
9. **[threat-model.md](./threat-model.md)** — مدل‌سازی جامع تهدیدات سامانه بر پایه چارچوب STRIDE.
10. **[CHANGELOG-security.md](./CHANGELOG-security.md)** — تاریخچه و لاگ اصلاحات و وصله‌های امنیتی سیستم.
11. **[.well-known/security.txt](./public/.well-known/security.txt)** — فایل استاندارد بین‌المللی ارتباط افشای هماهنگ آسیب‌پذیری (RFC 9116).
12. **[mtls-zero-trust.md](./mtls-zero-trust.md)** — معماری احراز هویت دوجانبه (mTLS v1.3) و اجرای خط‌مشی Zero Trust بین میکروسرویس‌ها.
13. **[.pre-commit-config.yaml](./.pre-commit-config.yaml) & [.gitleaks.toml](./.gitleaks.toml)** — اسکن خودکار هوک‌های گیت برای ممانعت از کامیت کلیدها و اسرار محرمانه (Gitleaks).

---

## 🛠 فناوری‌های استفاده‌شده
- **Frontend:** React, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Backend:** Node.js, Express, tsx
- **Database & Auth:** Firebase Firestore, Firebase Admin SDK
- **Zero Trust & Security:** Mutual TLS (mTLS v1.3), Gitleaks Pre-commit Hook, Security Headers, PBKDF2 Password Hashing
