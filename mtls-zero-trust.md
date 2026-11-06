# Zero Trust Architecture & Mutual TLS (mTLS) Implementation Guide

## 🎯 مبنا و فلسفه معماری زیرو تراست (Zero Trust)
در معماری سنتی شبکه‌های شرکتی، شبکه داخلی (پشت فایروال) به صورت پیش‌فرض قابل اعتماد (Trusted) تلقی می‌شد. در مدل **Zero Trust** شعار اصلی این است:
> **«هیچ سرویسی را بدون تایید هویت نپذیر؛ همیشه و در هر ارتباط، هویت را به صورت رمزنگاری‌شده احراز کن.» (Never Trust, Always Verify)**

در این پروژه، تمامی ارتباطات سرویس به سرویس داخلی (Service-to-Service) از طریق **Mutual TLS (mTLS v1.3)** با گواهی‌های دیجیتال X.509 محافظت می‌شوند.

---

## 🏗️ ۱. توپولوژی و نحوه کارکرد mTLS
در TLS یک‌طرفه مرسوم، تنها کلاینت هویت سرور را بررسی می‌کند. اما در **Mutual TLS**:
1. **احراز هویت متقابل:** هم سرور و هم کلاینت (میکروسرویس مبدأ) گواهی معتبر صادرشده توسط مرکز صدور گواهی داخلی (Internal CA) را به یکدیگر ارائه می‌دهند.
2. **رمزنگاری کامل نقطه به نقطه:** ترافیک در سطح TLS 1.3 با الگوریتم‌های مدرن رمزنگاری (AEAD) محافظت می‌شود.
3. **جلوگیری از حملات Man-in-the-Middle (MitM) و شنود شبکه:** حتی اگر یک هکر به شبکه داخلی دسترسی یابد، به دلیل نداشتن کلید اختصاصی کلاینت، امکان جعل هویت یا ارسال درخواست به میکروسرویس‌های داخلی را نخواهد داشت.

```
+---------------------------+                      +---------------------------+
| Microservice A (Caller)   |                      | Microservice B (Receiver) |
| Client Cert + Private Key |                      | Server Cert + Private Key |
+-------------+-------------+                      +-------------+-------------+
              |                                                  |
              | 1. Client initiates TLS 1.3 Handshake            |
              |------------------------------------------------->|
              | 2. Server sends Server Certificate               |
              |<-------------------------------------------------|
              | 3. Client verifies Server Cert against Root CA   |
              | 4. Server requests Client Certificate (mTLS)     |
              |<-------------------------------------------------|
              | 5. Client sends signed Client Certificate        |
              |------------------------------------------------->|
              | 6. Server verifies Client Cert against Root CA   |
              |    (Extracts CN, Fingerprint, Organization)      |
              | 7. Secure, Encrypted Zero Trust Tunnel Active    |
              |<================================================>|
```

---

## 📁 ۲. ساختار کلیدها و گواهی‌ها (`certs/mtls/`)
- **`ca-cert.pem` / `ca-key.pem`:** مرجع صدور گواهی ریشه داخلی (`Otrish-Internal-Root-CA`).
- **`server-cert.pem` / `server-key.pem`:** گواهی سرور همراه با Subject Alternative Names (`localhost`, `127.0.0.1`, `*.internal.otrish.local`).
- **`client-cert.pem` / `client-key.pem`:** گواهی اختصاصی هویت میکروسرویس فراخواننده (`CN=otrish-worker-service`).
- کلیدهای خصوصی به صورت خودکار با مجوز سخت‌گیرانه `chmod 0600` نگهداری می‌شوند و هرگز در گیت کامیت نمی‌شوند.

---

## ⚙️ ۳. اسکریپت تولید و چرخش گواهی‌ها
جهت تولید گواهی‌های جدید یا چرخش دوره‌ای:
```bash
node scripts/generate-mtls-certs.mjs
```

---

## 🛡️ ۴. کدهای پیاده‌سازی‌شده در پروژه
1. **میان‌افزار سرور (`src/server/mtlsManager.ts`):**
   - تابع `enforceMtlsPeerAuth`: بررسی گواهی همتا، استخراج شناسه سرویس (`req.peerService`)، و رد درخواست‌های فاقد گواهی با کد `403 Forbidden`.
   - مسیرهای محافظت‌شده در سرور: `/internal/api/*`
2. **کلاینت فراخوانی امن (`callInternalMtlsService`):**
   - ایجاد `https.Agent` با گواهی کلاینت و CA جهت برقراری تماس امن با سایر میکروسرویس‌ها.
3. **اندپوینت بررسی وضعیت سلامت mTLS:**
   - روت عمومی `/api/security/mtls-status` وضعیت فعال بودن گواهی‌ها و انطباق با Zero Trust را گزارش می‌کند.

---

## 🧪 ۵. تست و راستی‌آزمایی با cURL

### الف) رد درخواست فاقد گواهی کلاینت (تأیید رفتار Zero Trust):
```bash
curl -k https://localhost:3000/internal/api/v1/status
# خروجی: 403 Forbidden — Peer certificate required for internal service route
```

### ب) درخواست موفق با گواهی دوجانبه mTLS:
```bash
curl --cacert certs/mtls/ca-cert.pem \
     --cert certs/mtls/client-cert.pem \
     --key certs/mtls/client-key.pem \
     https://localhost:3000/internal/api/v1/status
# خروجی: 200 OK — authenticatedPeer: { commonName: "otrish-worker-service", ... }
```
