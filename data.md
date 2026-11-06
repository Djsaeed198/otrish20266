# Data.md — امنیت دادهها و دیتابیس

## 🎯 هدف
محافظت از دادههای کاربران در برابر دسترسی، تغییر یا حذف غیرمجاز.

## 1. دیتابیس
- استفاده از Prepared Statements / Parameterized Queries
- هرگز SQL خام با ورودی کاربر نسازید
- استفاده از ORM امن (Prisma, Sequelize, SQLAlchemy)
- کاربر دیتابیس با حداقل دسترسی (نه root)
- پسورد دیتابیس قوی و غیرقابل حدس

## 2. ورودیها (Input Validation)
- اعتبارسنجی همه ورودیها در Backend
- استفاده از کتابخانههای معتبر (Zod, Joi, Pydantic)
- Sanitize کردن HTML برای جلوگیری از XSS
- محدود کردن طول و نوع ورودی

## 3. خروجیها (Output Encoding)
- Escape کردن HTML قبل از نمایش
- استفاده از `textContent` به جای `innerHTML`
- Content-Security-Policy سختگیرانه
- Encode در context مناسب (HTML, JS, URL, CSS)

## 4. دادههای حساس
- رمزنگاری در حالت ذخیره (Encryption at Rest)
- رمزنگاری در انتقال (Encryption in Transit)
- عدم ذخیره اطلاعات کارت بانکی (استفاده از درگاه)
- ماسک کردن دادهها در لاگها (مثلاً ****1234)

## 5. GDPR / حریم خصوصی
- رضایت کاربر قبل از ذخیره کوکی
- حق حذف داده (Right to be Forgotten)
- حق دانلود دادهها (Data Portability)
- سیاست حریم خصوصی شفاف

## 6. File Uploads
- بررسی نوع فایل (MIME + Extension)
- محدودیت حجم فایل
- تغییر نام فایل به UUID
- ذخیره خارج از public directory
- اسکن آنتیویروس (ClamAV)
- هرگز فایلهای اجرایی (.php, .exe, .sh) را قبول نکنید

## 7. کوکیها
- HttpOnly برای کوکیهای حساس
- Secure flag (فقط HTTPS)
- SameSite=Strict یا Lax
- رمزنگاری محتوای کوکی مهم

## 8. CSRF Protection
- استفاده از CSRF Token
- Double Submit Cookie Pattern
- SameSite Cookies
- بررسی Origin/Referer

## 9. SQL Injection Prevention
```js
// ❌ اشتباه
db.query(`SELECT * FROM users WHERE id = ${id}`);

// ✅ درست
db.query('SELECT * FROM users WHERE id = ?', [id]);
```

## 10. NoSQL Injection
- Sanitize کردن `$` و `{` در ورودی
- استفاده از Schema Validation
- فعال کردن Authentication در MongoDB

## 11. Backup Data
- رمزنگاری فایلهای backup
- دسترسی محدود به backup
- تست بازیابی دورهای

## 12. Data Retention
- حذف دادههای غیرضروری بعد از مدت مشخص
- Anonymize کردن دادههای قدیمی
