import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Layers,
  Mail,
  Check,
  RefreshCw,
  Database,
  Lock,
  User as UserIcon,
  HelpCircle,
  FileSpreadsheet,
  FolderOpen,
  UserPlus,
  Compass,
  FileCode,
  AlertTriangle,
  History,
  Trash,
  Key,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

interface GFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
}

interface GContact {
  name?: string;
  phone?: string;
  email?: string;
}

interface SyncLog {
  id: string;
  actionType: string;
  details: string;
  timestamp: string;
}

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/forms.body",
  "https://www.googleapis.com/auth/forms.responses.readonly",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/contacts",
  "https://www.googleapis.com/auth/spreadsheets"
];

export default function WorkspaceSync() {
  // Authentication & Session States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Manual configuration inputs
  const [inputAccessToken, setInputAccessToken] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");
  const [showConfigHelper, setShowConfigHelper] = useState<boolean>(false);

  // Active workspace tab
  const [activeTab, setActiveTab] = useState<"calendar" | "sheets" | "drive" | "gmail" | "contacts" | "forms" | "config">("calendar");
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([]);

  // Feedback notifications
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Loading States for individual API calls
  const [loadingCalendar, setLoadingCalendar] = useState<boolean>(false);
  const [loadingSheets, setLoadingSheets] = useState<boolean>(false);
  const [loadingDrive, setLoadingDrive] = useState<boolean>(false);
  const [loadingGmail, setLoadingGmail] = useState<boolean>(false);
  const [loadingContacts, setLoadingContacts] = useState<boolean>(false);
  const [loadingForms, setLoadingForms] = useState<boolean>(false);

  // Interactive Form Inputs
  const [calSummary, setCalSummary] = useState<string>("ملاقات تمدید اقامت MA 35 (کارت سرخ-سفید-سرخ)");
  const [calDateTime, setCalDateTime] = useState<string>("2026-06-15T09:00");
  
  const [gmailSubject, setGmailSubject] = useState<string>("چک‌لیست آماده‌سازی پرونده MA 35 اتریش‌نشین");
  const [gmailBody, setGmailBody] = useState<string>(
    "سلام،\n\nاین یک یادداشت حمایتی و چک‌لیست معتبر صادر شده از درگاه اتریش‌نشین است:\n- تأیید بوندس‌کانسلر (اتریش)\n- کپی برگه ملده معتبر شهرداری\n- فیش حقوقی ۳ ماه اخیر (یا مدرک تأمین مالی دانشجویی)\n- ترجمه به روز شناسنامه تأیید شده تهران.\n\nبا آرزوی موفقیت برای اتریش‌نشین‌های عزیز!"
  );

  const [contName, setContName] = useState<string>("مددکار رسمی اتریش‌نشین");
  const [contPhone, setContPhone] = useState<string>("+43 688 9763256");
  const [contEmail, setContEmail] = useState<string>("info@otrish-iran.ir");
  const [fetchedContacts, setFetchedContacts] = useState<GContact[]>([]);
  const [fetchedFiles, setFetchedFiles] = useState<GFile[]>([]);

  // Initialize and load state
  useEffect(() => {
    // 1. Check for Access Token in URL hash (from Redirect Flow)
    const hash = window.location.hash;
    let tokenToUse: string | null = null;

    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const urlToken = params.get("access_token");
      if (urlToken) {
        tokenToUse = urlToken;
        setAccessToken(urlToken);
        setIsAuthenticated(true);
        // Clean URL bar
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        setSuccessToast("🔐 ارتباط با موفقیت از طریق کلاینت OAuth برقرار شد!");
      }
    }

    // 2. Load cached credentials/logs and verify
    loadLocalLogs();
    const cachedToken = localStorage.getItem("g_workspace_access_token");
    const cachedUser = localStorage.getItem("g_workspace_user_profile");

    if (!tokenToUse && cachedToken) {
      tokenToUse = cachedToken;
      setAccessToken(cachedToken);
      setIsAuthenticated(true);
    }

    if (cachedUser) {
      try {
        setCurrentUser(JSON.parse(cachedUser));
      } catch (e) {
        // failed parses ignored safely
      }
    }

    // 3. Fallback check for user profile info if we have a token
    if (tokenToUse) {
      fetchUserInfo(tokenToUse);
    }

    // 4. Try retrieving default client ID if saved
    const savedClientId = localStorage.getItem("g_workspace_client_id");
    if (savedClientId) {
      setClientId(savedClientId);
    }
  }, []);

  const fetchUserInfo = async (token: string) => {
    try {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const profile = {
          displayName: data.name || data.email,
          email: data.email,
          photoURL: data.picture,
          uid: data.sub || "user_local_g"
        };
        setCurrentUser(profile);
        localStorage.setItem("g_workspace_user_profile", JSON.stringify(profile));
        localStorage.setItem("g_workspace_access_token", token);
        logToLocalLogs("دریافت پروفایل گوگل", `خوش‌آمدید ${profile.displayName} (${profile.email})`);
      }
    } catch (e) {
      console.warn("Could not retrieve real Google user details", e);
      if (!currentUser) {
        setCurrentUser({
          displayName: "کاربر گوگل ورک‌استیشن (درگاه کلاینت)",
          email: "workspace@otrish-iran.ir",
          uid: "user_local_g"
        });
      }
    }
  };

  // Local Storage Logs Engine
  const loadLocalLogs = () => {
    try {
      const stored = localStorage.getItem("workspace_sync_logs");
      if (stored) {
        setSyncLogs(JSON.parse(stored));
      } else {
        setSyncLogs([]);
      }
    } catch (e) {
      console.error("Local log engine fail:", e);
    }
  };

  const logToLocalLogs = (actionType: string, details: string) => {
    try {
      const docId = Math.random().toString(36).substring(2, 11);
      const newLog: SyncLog = {
        id: docId,
        actionType,
        details,
        timestamp: new Date().toISOString()
      };
      const stored = localStorage.getItem("workspace_sync_logs");
      const currentList: SyncLog[] = stored ? JSON.parse(stored) : [];
      const updatedList = [newLog, ...currentList].slice(0, 15);
      localStorage.setItem("workspace_sync_logs", JSON.stringify(updatedList));
      setSyncLogs(updatedList);
    } catch (e) {
      console.error("Logging failed:", e);
    }
  };

  const clearLocalLogs = () => {
    if (!window.confirm("آیا مایل هستید تمامی لاگ‌های ثبت شده در سیستم را پاک‌سازی کنید؟")) return;
    localStorage.removeItem("workspace_sync_logs");
    setSyncLogs([]);
    setSuccessToast("🗑️ تاریخچه عملکرد ابری با موفقیت پاکسازی شد.");
  };

  // Login handler using Direct Client-Side Google Token Flow or pasted access token
  const handleManualTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAccessToken.trim()) {
      setErrorToast("لطفاً توکن دسترسی معتبر را وارد نمایید.");
      return;
    }
    setErrorToast(null);
    setIsLoggingIn(true);
    
    // Simulate/attempt verification and load
    const token = inputAccessToken.trim();
    setAccessToken(token);
    setIsAuthenticated(true);
    localStorage.setItem("g_workspace_access_token", token);
    fetchUserInfo(token);
    setSuccessToast("🔐 توکن دسترسی گوگل شما به صورت امن ثبت و ذخیره شد!");
    logToLocalLogs("اتصال با توکن", "تنظیم دستی توکن کلاینت گوگل ورک‌استیشن");
    setIsLoggingIn(false);
    setInputAccessToken("");
  };

  const triggerGoogleOAuthRedirect = () => {
    if (!clientId.trim()) {
      setErrorToast("خطا: برای شروع ورود زنده به کلاینت‌آیدی (Google Client ID) معتبر نیاز است.");
      return;
    }
    setErrorToast(null);
    localStorage.setItem("g_workspace_client_id", clientId.trim());
    
    const redirectUri = window.location.origin;
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId.trim())}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(SCOPES.join(" "))}&prompt=consent&access_type=online`;
    
    // Save state helper so user returns back automatically
    window.location.href = authUrl;
  };

  const handleOAuthLogout = () => {
    if (!window.confirm("آیا مایل به قطع ارتباط و حذف کلیدهای گوگل از مرورگر خود هستید؟")) return;
    setAccessToken(null);
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("g_workspace_access_token");
    localStorage.removeItem("g_workspace_user_profile");
    setSuccessToast("📴 ارتباط پورتال با حساب ابری گوگل شما قطع و لایسنس‌های محلی حذف گردید.");
    logToLocalLogs("خروج امن", "حذف پایدار لایسنس‌های احراز هویت محلی گوگل");
  };

  // 1. Google Calendar API Connection
  const createCalendarEvent = async () => {
    if (!accessToken) {
      setErrorToast("خطا: توکن گوگل در دسترس نیست. لطفا دوباره خارج و وارد شوید.");
      return;
    }
    const confirmed = window.confirm(
      `آیا مایل هستید رویداد «${calSummary}» را برای تاریخ ${calDateTime.replace("T", " ")} در تقویم رسمی گوگل خود ثبت کنید؟`
    );
    if (!confirmed) return;

    setLoadingCalendar(true);
    setErrorToast(null);
    try {
      const startIso = new Date(calDateTime).toISOString();
      const endIso = new Date(new Date(calDateTime).getTime() + 60 * 60 * 1000).toISOString();

      const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          summary: calSummary,
          description: "ثبت شده خودکار از درگاه ملی و کانون هموطنان اتریش‌نشین (Otrish-Iran.ir)",
          start: { dateTime: startIso, timeZone: "Europe/Vienna" },
          end: { dateTime: endIso, timeZone: "Europe/Vienna" }
        })
      });

      if (!response.ok) {
        throw new Error(`خطای اختصاصی گوگل (${response.status}) - توکن شما احتمالاً منقضی است.`);
      }

      logToLocalLogs("تقویم گوگل (Calendar)", `ثبت وقت ملاقات: ${calSummary}`);
      setSuccessToast("📅 نوبت ملاقات شما با موفقیت در تقویم گوگل ثبت شد و هشدار برای موبایل صادر گردید!");
    } catch (e: any) {
      setErrorToast("خطا در ایجاد رویداد تقویم: " + e.message);
    } finally {
      setLoadingCalendar(false);
    }
  };

  // 2. Google Sheets API Connection
  const createBudgetSheet = async () => {
    if (!accessToken) return;
    const confirmed = window.confirm(
      "آیا مایل هستید یک Google Sheet جدید برای محاسبات بودجه و مخارج شهرهای اتریش در درایو اختصاصی خود ایجاد کنید؟"
    );
    if (!confirmed) return;

    setLoadingSheets(true);
    setErrorToast(null);
    try {
      const createResponse = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          properties: { title: "برآورد معیشت شهرهای اتریش - اتریش‌نشین" }
        })
      });

      if (!createResponse.ok) throw new Error("مشکل در احراز هویت قالب ایجاد یا محدودیت دسترسی شیت.");
      const sheetData = await createResponse.json();
      const spreadsheetId = sheetData.spreadsheetId;

      const writeResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:D6?valueInputOption=USER_ENTERED`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            range: "Sheet1!A1:D6",
            majorDimension: "ROWS",
            values: [
              ["دسته‌بندی معیشتی", "مورد مخارج", "مبلغ پایه (یورو)", "توضیح بومی و اتریشی"],
              ["محل سکونت", "متوسط ملده و اجاره سوئیت دانشجویی", "450", "اجاره‌های گراتس و اتریش مرزی مناسب‌ترند"],
              ["خرید اقلام بهداشتی و غذایی", "برآورد مصرف ماهیانه Hofer / Spar", "280", "خرید اقتصادی با تگ‌های هوشمند"],
              ["خدمات بیمه", "بیمه‌ ÖGK عمومی دانشجوئی و شغلی", "68", "مصوب ملی فاقد کسر دولا"],
              ["مجموعه خدمات تفریحی و اینترنت", "کارت شبکه و اینترنت خانگی اتریش", "45", "سیم‌کارت‌های درگاهی HoT"],
              ["جمع کلی تخمینی", "", "843", "سبد محاسبه پایه‌ای برای یک فرد"]
            ]
          })
        }
      );

      if (!writeResponse.ok) throw new Error("خطا در نوشتن یا نگاشت کل سطرها به سلول‌ها.");

      logToLocalLogs("گوگل شیت (Sheets)", "ایجاد کاربرگ بودجه اتریش‌نشین");
      setSuccessToast(
        `📊 فایل شیت مخارج با موفقیت در درایو شما ذخیره شد! نشانی فایل: ${sheetData.spreadsheetUrl || "https://drive.google.com"}`
      );
    } catch (e: any) {
      setErrorToast("خطا در صدور داده به شیت: " + e.message);
    } finally {
      setLoadingSheets(false);
    }
  };

  // 3. Google Drive API Connection
  const fetchDriveFiles = async () => {
    if (!accessToken) return;
    setLoadingDrive(true);
    setErrorToast(null);
    try {
      const response = await fetch(
        "https://www.googleapis.com/drive/v3/files?pageSize=10&fields=files(id,name,mimeType,webViewLink)&orderBy=createdTime%20desc",
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );
      if (!response.ok) throw new Error("دریافت پرونده‌ها از گوگل درایو ناموفق بود.");
      const data = await response.json();
      setFetchedFiles(data.files || []);
      logToLocalLogs("گوگل درایو (Drive)", "مشاهده و پایش لیست فایل‌های اخیر");
      setSuccessToast("📂 پرونده‌های ابری اخیر شما از گوگل درایو در جدول زیر بروزرسانی شد!");
    } catch (e: any) {
      setErrorToast("خطا در پایش درایو: " + e.message);
    } finally {
      setLoadingDrive(false);
    }
  };

  const uploadBackupToDrive = async () => {
    if (!accessToken) return;
    const confirmed = window.confirm(
      "آیا تمایل دارید فایل پشتیبان متنی چک لیست ملخص اقامت خود را روی گوگل درایو بارگذاری نمایید؟"
    );
    if (!confirmed) return;

    setLoadingDrive(true);
    setErrorToast(null);
    try {
      const fileContent = `پشتیبان جامع اتریش‌نشین:\nرویکرد وین - پایش نوبت VFS تهران\n\nتولید خلاصه با موفقیت انجام شد: ${new Date().toLocaleString()}`;
      
      const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain; charset=UTF-8"
        },
        body: fileContent
      });

      if (!response.ok) throw new Error("ثبت مستقیم متنی فایل درایو خطا داد.");

      logToLocalLogs("گوگل درایو (Drive)", "بارگذاری رونوشت متنی چک‌لیست اقامت");
      setSuccessToast("💾 فایل متنی پشتیبان با موفقیت در پوشه اصلی دیوایس گوگل درایو شما آپلود شد!");
      fetchDriveFiles();
    } catch (e: any) {
      setErrorToast("خطا در بارگذاری فایل: " + e.message);
    } finally {
      setLoadingDrive(false);
    }
  };

  // 4. Gmail API Connection
  const sendBackupEmail = async () => {
    if (!accessToken || !currentUser?.email) return;
    const confirmed = window.confirm(
      `آیا مایل هستید خلاصه چک لیست را به صورت یک پست الکترونیک رسمی از طریق جیمیل به آدرس شخص خودتان (${currentUser.email}) ارسال کنید؟`
    );
    if (!confirmed) return;

    setLoadingGmail(true);
    setErrorToast(null);
    try {
      const rawHeaders = [
        `to: ${currentUser.email}`,
        `from: ${currentUser.email}`,
        `subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(gmailSubject)))}?=`,
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "Content-Transfer-Encoding: 7bit",
        "",
        gmailBody
      ].join("\r\n");

      const encodedMail = btoa(unescape(encodeURIComponent(rawHeaders)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ raw: encodedMail })
      });

      if (!response.ok) throw new Error(`سیستم جیمیل خطای ${response.status} را بازگرداند`);

      logToLocalLogs("جیمیل (Gmail)", `ارسال ایمیل پشتیبان پیشرفته: ${gmailSubject}`);
      setSuccessToast(`📧 ایمیل حاوی موازین چک‌لیست با موفقیت به صندوق ورودی جیمیل شما (${currentUser.email}) ارسال گردید!`);
    } catch (e: any) {
      setErrorToast("خطا در ارسال ایمیل جیمیل: " + e.message);
    } finally {
      setLoadingGmail(false);
    }
  };

  // 5. People API Connection
  const createNewContact = async () => {
    if (!accessToken) return;
    const confirmed = window.confirm(
      `آیا مایل هستید همیار بومی «${contName}» را به لیست مخاطبین اصلی خود در گوگل اضافه نمایید؟`
    );
    if (!confirmed) return;

    setLoadingContacts(true);
    setErrorToast(null);
    try {
      const response = await fetch("https://people.googleapis.com/v1/people:createContact", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          names: [{ givenName: contName, familyName: "اتریش‌نشین" }],
          phoneNumbers: [{ value: contPhone, type: "work" }],
          emailAddresses: [{ value: contEmail, type: "work" }]
        })
      });

      if (!response.ok) throw new Error("ایجاد مخاطب در مخاطبین گوگل با شکست مواجه شد.");
      
      logToLocalLogs("مخاطبین گوگل (Contacts)", `ثبت مخاطب پشتیبان: ${contName}`);
      setSuccessToast(`👥 مخاطب «${contName}» با موفقیت به لیست گوگل کانتکت افزوده شد!`);
      fetchContactsList();
    } catch (e: any) {
      setErrorToast("خطا در درج مخاطب جدید: " + e.message);
    } finally {
      setLoadingContacts(false);
    }
  };

  const fetchContactsList = async () => {
    if (!accessToken) return;
    setLoadingContacts(true);
    setErrorToast(null);
    try {
      const response = await fetch(
        "https://people.googleapis.com/v1/people/me/connections?personFields=names,phoneNumbers,emailAddresses&pageSize=10",
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );
      if (!response.ok) throw new Error("پایش کانتکت لیست گوگل ریجکت شد.");
      const data = await response.json();
      
      const parsed: GContact[] = (data.connections || []).map((conn: any) => {
        const nameObj = conn.names?.[0];
        const phoneObj = conn.phoneNumbers?.[0];
        const emailObj = conn.emailAddresses?.[0];
        return {
          name: nameObj ? `${nameObj.givenName || ""} ${nameObj.familyName || ""}` : "بدون نام",
          phone: phoneObj ? phoneObj.value : "فاقد شماره تلفن",
          email: emailObj ? emailObj.value : "فاقد آدرس ایمیل"
        };
      });

      setFetchedContacts(parsed);
      logToLocalLogs("مخاطبین گوگل (Contacts)", "بررسی مخاطبین گوگل کانتکت");
      setSuccessToast("👥 اتصال موفقیت آمیز! لیست مخاطبان گوگل شما بازیابی و نمایش داده شد.");
    } catch (e: any) {
      setErrorToast("خطا در پایش مخاطبین: " + e.message);
    } finally {
      setLoadingContacts(false);
    }
  };

  // 6. Google Forms API Connection
  const createSurveyForm = async () => {
    if (!accessToken) return;
    const confirmed = window.confirm(
      "آیا می‌خواهید یک نمونه نظرسنجی جدید فیدبک شهروندی در حساب گوگل فرم (Google Forms) خود ثبت کنید؟"
    );
    if (!confirmed) return;

    setLoadingForms(true);
    setErrorToast(null);
    try {
      const response = await fetch("https://forms.googleapis.com/v1/forms", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          info: {
            title: "نظرسنجی خدمات داوطلبانه فارسی‌زبانان اتریش (اتریش‌نشین)",
            documentTitle: "نظرسنجی اتریش‌نشین"
          }
        })
      });

      if (!response.ok) throw new Error("ثبت قالب خام گوگل فرم ریجکت شد.");
      const data = await response.json();

      logToLocalLogs("گوگل فرم (Forms)", "ثبت نمونه سوالات ارزیابی فیدبک شیت کانون اتریش‌نشین");
      setSuccessToast(`📝 فرم ارزیابی گوگل فرم شما با موفقیت ایجاد گردید! نشانی فرم: ${data.responderUri || ""}`);
    } catch (e: any) {
      setErrorToast("خطا در ساخت فرم گوگل: " + e.message);
    } finally {
      setLoadingForms(false);
    }
  };

  return (
    <div id="google-workspace-sync-system" className="bg-white rounded-[32px] border border-stone-200 p-6 lg:p-8 shadow-sm overflow-hidden text-right font-sans relative space-y-8">
      
      {/* Red/White Top Accent */}
      <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-l from-red-650 via-white to-red-650 bg-red-600"></div>

      {/* Header section with real info */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-stone-100 pb-6 gap-6">
        <div className="space-y-1.5 text-center md:text-right w-full md:w-auto">
          <h3 className="font-black text-stone-900 text-lg flex items-center justify-center md:justify-start gap-2.5">
            <span className="bg-red-500 text-white rounded-xl p-1.5 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </span>
            <span>یکپارچه‌سازی ابری شش‌گانه گوگل ورک‌استیشن (OAuth کلاینت) 🌐</span>
          </h3>
          <p className="text-xs text-stone-500 font-bold max-w-2xl leading-relaxed">
            بدون وابستگی به کدهای جانبی سرور یا Firebase، به صورت مستقیم پرونده‌های اقامتی، کانتکت‌های شهرداری، تقویم VFS، بودجه معیشت و فرم‌های همفکری را مستقیماً از طریق توکن مرورگر خود مدیریت و بازخوانی کنید!
          </p>
        </div>

        {/* User login state */}
        <div className="shrink-0 flex items-center gap-2">
          {isAuthenticated ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-3.5 shadow-3xs hover:bg-emerald-100/60 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-black ring-2 ring-emerald-300">
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt="Google avatar" referrerPolicy="no-referrer" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
              </div>
              <div className="text-right bg-transparent">
                <span className="text-[10px] text-emerald-800 font-black block">اتصال امن مرورگر برقرار است</span>
                <span className="text-xs font-bold text-stone-800 block mt-0.5 max-w-[140px] truncate">{currentUser?.displayName || currentUser?.email}</span>
                <button
                  onClick={handleOAuthLogout}
                  className="text-[9.5px] font-black text-red-600 hover:text-red-800 transition-colors underline cursor-pointer mt-0.5 block"
                >
                  قطع ارتباط گوگل
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("config")}
                className="text-xs font-black py-2.5 px-4 bg-stone-50 hover:bg-stone-100 border border-stone-250 rounded-2xl text-stone-700 active:scale-98 transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Key className="w-4 h-4 text-stone-500" />
                <span>تنظیمات توکن / کلاینت</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Alerts Container */}
      {(errorToast || successToast) && (
        <div className="animate-slide-down space-y-2.5">
          {errorToast && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs font-black text-red-750 flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-650 shrink-0" />
              <span>{errorToast}</span>
            </div>
          )}
          {successToast && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs font-black text-emerald-850 flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successToast}</span>
            </div>
          )}
        </div>
      )}

      {/* Active Workspace Suite Body */}
      {isAuthenticated || activeTab === "config" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Vertical Control Tabs (Responsive) */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 border-b lg:border-b-0 border-stone-100">
            {[
              { id: "calendar", title: "📅 تقویم (Calendar)" },
              { id: "sheets", title: "📊 شیت مخارج (Sheets)" },
              { id: "drive", title: "📂 پوشه درایو (Drive)" },
              { id: "gmail", title: "📧 جیمیل (Gmail)" },
              { id: "contacts", title: "👥 مخاطبین (Contacts)" },
              { id: "forms", title: "📝 فرم‌ساز (Forms)" },
              { id: "config", title: "⚙️ لایسنس و کلیدها" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 lg:flex-initial text-right py-3.5 px-4 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center justify-between border ${
                  activeTab === tab.id
                    ? "bg-zinc-950 text-white border-zinc-950 shadow-sm"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  <span>{tab.title}</span>
                </span>
                <span className={`text-[9px] font-bold ${activeTab === tab.id ? "text-white/70" : "text-stone-400"}`}>
                  {tab.id.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          {/* Center Column: Configured Form details */}
          <div className="lg:col-span-6 bg-stone-50/50 border border-stone-200 rounded-3xl p-6 min-h-[420px] flex flex-col justify-between">
            <div>
              {/* TAB 1: GOOGLE CALENDAR */}
              {activeTab === "calendar" && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-stone-200/60 pb-3 flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2.5 py-1 rounded-md">Google Calendar API</span>
                    <h4 className="font-black text-sm text-stone-900">سرویس قرار ملاقات و یادآور</h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-bold">
                    یک قرار ملاقات با موازین کارت ملده، نهایی‌سازی وقت VFS در تهران، یا جلسه پشتیبانی اداری در تقویم خود تنظیم نمایید:
                  </p>

                  <div className="space-y-3.5 mt-2">
                    <div className="space-y-1 text-right">
                      <label className="text-[10px] text-stone-600 font-extrabold block">عنوان ملاقات شما:</label>
                      <input
                        type="text"
                        value={calSummary}
                        onChange={(e) => setCalSummary(e.target.value)}
                        className="w-full bg-white border border-stone-250 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-800 outline-none focus:border-red-500"
                        placeholder="ثبت یادآور تمدید کارت اقامت MA 35"
                      />
                    </div>
                    
                    <div className="space-y-1 text-right">
                      <label className="text-[10px] text-stone-600 font-extrabold block">تاریخ و ساعت نوبت اتریش:</label>
                      <input
                        type="datetime-local"
                        value={calDateTime}
                        onChange={(e) => setCalDateTime(e.target.value)}
                        className="w-full bg-white border border-stone-250 rounded-xl px-3 py-2.5 text-xs font-sans font-bold text-stone-800 outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={createCalendarEvent}
                    disabled={loadingCalendar}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    {loadingCalendar ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <CalendarIcon className="w-4 h-4" />
                    )}
                    <span>ثبت قرار قطعی در تقویم گوگل شما</span>
                  </button>
                </div>
              )}

              {/* TAB 2: GOOGLE SHEETS */}
              {activeTab === "sheets" && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-stone-200/60 pb-3 flex items-center justify-between">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-md">Google Sheets API</span>
                    <h4 className="font-black text-sm text-stone-900">محاسبات و صدور بودجه معیشت</h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-bold">
                    داده‌های محاسباتی بودجه بومی شهرهای شبیه‌سازی اتریش را در قالب یک شیت مجزا صادر کنید و فرمول‌های مالی زندگی خود را دقیق‌تر نگه دارید:
                  </p>

                  {/* Expense Preview Table */}
                  <div className="bg-white border rounded-xl overflow-hidden text-[10.5px]">
                    <div className="bg-stone-50 p-2 border-b font-black grid grid-cols-4 text-center">
                      <span>دسته‌بندی</span>
                      <span>سرفصل اصلی</span>
                      <span>میانگین هزینه</span>
                      <span>توضیحات</span>
                    </div>
                    <div className="p-2 grid grid-cols-4 text-center border-b font-bold text-stone-600">
                      <span>مسکن / ملده</span>
                      <span>حق تکثیر اجاره</span>
                      <span>۴۵۰ یورو</span>
                      <span>مخصوص گراتس</span>
                    </div>
                    <div className="p-2 grid grid-cols-4 text-center font-bold text-stone-600">
                      <span>خرید خانه</span>
                      <span>سوپرمارکت زنجیره</span>
                      <span>۲۸۰ یورو</span>
                      <span>تگ اقتصادی</span>
                    </div>
                  </div>

                  <button
                    onClick={createBudgetSheet}
                    disabled={loadingSheets}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    {loadingSheets ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <FileSpreadsheet className="w-4 h-4" />
                    )}
                    <span>ایجاد و ثبت جدول مخارج واقعی در گوگل‌شیت شما</span>
                  </button>
                </div>
              )}

              {/* TAB 3: GOOGLE DRIVE */}
              {activeTab === "drive" && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-stone-200/60 pb-3 flex items-center justify-between">
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-md">Google Drive API</span>
                    <h4 className="font-black text-sm text-stone-900">فضای ابری و پرونده بارگذاری پرونده‌ها</h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-bold">
                    ذخیره‌سازی به روز متون تفاهمنامه ملده اتریش‌نشین و پایش فایل‌های جاری بارگذاری شده در حساب گوگل درایو شخصی شما:
                  </p>

                  <div className="flex gap-2.5">
                    <button
                      onClick={fetchDriveFiles}
                      disabled={loadingDrive}
                      className="flex-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-black py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>پایش فایل‌های اخیر درایو</span>
                      <FolderOpen className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={uploadBackupToDrive}
                      disabled={loadingDrive}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>آپلود چک لیست متنی</span>
                      <Compass className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Live Files list in UI */}
                  {fetchedFiles.length > 0 ? (
                    <div className="bg-white border border-stone-200 rounded-xl p-3 space-y-2 mt-2 max-h-40 overflow-y-auto">
                      <span className="text-[9.5px] font-black text-stone-500 block mb-1">فایل‌های ابری یافت شده:</span>
                      {fetchedFiles.map((f) => (
                        <div key={f.id} className="flex items-center justify-between border-b pb-1.5 text-xs text-stone-700 last:border-0">
                          {f.webViewLink ? (
                            <a href={f.webViewLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline truncate max-w-[150px]">{f.name}</a>
                          ) : (
                            <span className="font-bold truncate max-w-[150px]">{f.name}</span>
                          )}
                          <span className="text-[9px] font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">{f.mimeType.split(".").pop()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-stone-100 rounded-xl p-4 text-center text-[10px] text-stone-400 font-bold">دکمه پایش را بزنید تا لیست پرونده‌ها بازیابی شود.</div>
                  )}
                </div>
              )}

              {/* TAB 4: GMAIL */}
              {activeTab === "gmail" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-stone-200/60 pb-3 flex items-center justify-between">
                    <span className="bg-red-100 text-red-850 text-[10px] font-black px-2.5 py-1 rounded-md">Gmail Notification API</span>
                    <h4 className="font-black text-sm text-stone-900">عضویت ایمیلی هشدارهای ملده و اقامت</h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-bold">
                    آخرین چک‌لیست معتبر مهاجرتی صادر شده با موازین اداره MA35 را در لایه امن جیمیل مستقیماً به صندوق ایمیل شخصی ارسال نمایید:
                  </p>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9.5px] text-stone-600 font-black block">عنوان یا سرفصل ایمیل شما:</label>
                      <input
                        type="text"
                        value={gmailSubject}
                        onChange={(e) => setGmailSubject(e.target.value)}
                        className="w-full bg-white border border-stone-250 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 outline-none"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[9.5px] text-stone-600 font-black block">متن و نگارش چک لیست:</label>
                      <textarea
                        value={gmailBody}
                        onChange={(e) => setGmailBody(e.target.value)}
                        rows={4}
                        className="w-full bg-white border border-stone-250 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 outline-none resize-none font-mono"
                      />
                    </div>
                  </div>

                  <button
                    onClick={sendBackupEmail}
                    disabled={loadingGmail}
                    className="w-full bg-red-650 hover:bg-red-750 text-white text-xs font-black py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    {loadingGmail ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                    <span>ارسال چک‌لیست رسمی همیار به جیمیل من</span>
                  </button>
                </div>
              )}

              {/* TAB 5: GOOGLE CONTACTS */}
              {activeTab === "contacts" && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-stone-200/60 pb-3 flex items-center justify-between">
                    <span className="bg-indigo-100 text-indigo-850 text-[10px] font-black px-2.5 py-1 rounded-md">People Contacts API</span>
                    <h4 className="font-black text-sm text-stone-900">دفترچه تلفن و مخاطبین خدمات اتریش</h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-bold">
                    لیست مخاطبین گوگل خود را بازیابی نمایید یا یک مددکار و مترجم رسمی اتریش‌نشین را به مخاطبان امن تلفن همراهتان تزریق کنید:
                  </p>

                  <div className="bg-white border border-stone-200 rounded-xl p-4.5 space-y-3.5">
                    <h5 className="text-[10px] text-indigo-700 font-black">فرم ایجاد مخاطب جدید:</h5>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <input
                          type="text"
                          value={contName}
                          onChange={(e) => setContName(e.target.value)}
                          placeholder="نام مخاطب"
                          className="w-full bg-stone-50 border border-stone-250 rounded-lg p-2 text-xs font-bold font-sans"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={contPhone}
                          onChange={(e) => setContPhone(e.target.value)}
                          placeholder="شماره اتریش"
                          className="w-full bg-stone-50 border border-stone-250 rounded-lg p-2 text-xs font-bold font-mono text-left"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          value={contEmail}
                          onChange={(e) => setContEmail(e.target.value)}
                          placeholder="پست وب"
                          className="w-full bg-stone-50 border border-stone-250 rounded-lg p-2 text-xs font-bold font-mono text-left"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={createNewContact}
                        disabled={loadingContacts}
                        className="flex-1 bg-indigo-650 hover:bg-indigo-700 text-white text-[10.5px] font-black py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>افزودن مخاطب جدید</span>
                      </button>
                      <button
                        onClick={fetchContactsList}
                        disabled={loadingContacts}
                        className="flex-1 bg-stone-900 hover:bg-stone-850 text-white text-[10.5px] font-black py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>بازیابی مخاطبین فعلی</span>
                      </button>
                    </div>
                  </div>

                  {fetchedContacts.length > 0 && (
                    <div className="bg-white border rounded-xl p-3 space-y-2 max-h-40 overflow-y-auto">
                      <span className="text-[9.5px] font-black text-stone-500 block">مخاطبین اخیر بازیابی شده:</span>
                      {fetchedContacts.map((c, i) => (
                        <div key={i} className="flex justify-between items-center border-b pb-1.5 last:border-0 text-[11px] text-stone-700 font-bold">
                          <span>{c.name}</span>
                          <span className="font-mono text-[10px] text-stone-400">{c.phone}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: GOOGLE FORMS */}
              {activeTab === "forms" && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-stone-200/60 pb-3 flex items-center justify-between">
                    <span className="bg-purple-100 text-purple-850 text-[10px] font-black px-2.5 py-1 rounded-md">Google Forms API</span>
                    <h4 className="font-black text-sm text-stone-900">سامانه تولید پرسش‌نامه های فکری بومی</h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-bold">
                    یک قالب نظرسنجی و دریافت دیدگاه‌های شهروندان فارسی‌زبان در اتریش بسازید تا همپای جابجایی‌ها فیدبک دریافت نمایید:
                  </p>

                  <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4.5 space-y-2">
                    <h5 className="text-[11px] text-purple-900 font-black">فرم ارزیابی ایجاد شونده شامل:</h5>
                    <p className="text-[10px] text-purple-800 leading-relaxed font-semibold">
                      - عنوان: "نظرسنجی خدمات داوطلبانه فارسی‌زبانان اتریش (اتریش‌نشین)"
                      <br />
                      - رضایت نوبت‌ها، راهنمایی ملده شهرداری و برنامه‌های MA 35
                    </p>
                  </div>

                  <button
                    onClick={createSurveyForm}
                    disabled={loadingForms}
                    className="w-full bg-purple-650 hover:bg-purple-750 text-white text-xs font-black py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    {loadingForms ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <FileCode className="w-4 h-4" />
                    )}
                    <span>ایجاد فرم پرسش‌نامه جدید در گوگل فرم</span>
                  </button>
                </div>
              )}

              {/* TAB 7: CONFIGURATION & KEYS */}
              {activeTab === "config" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-stone-200/60 pb-3 flex items-center justify-between">
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-md">OAuth & Direct Access Token</span>
                    <h4 className="font-black text-sm text-stone-900">تنظیمات لایسنس و کلیدهای دسترسی گوگل</h4>
                  </div>
                  
                  <p className="text-[11px] text-stone-500 leading-relaxed font-bold">
                    برای اینکه درخواست‌ها به طور مستقیم به سرورهای رسمی گوگل ارسال شوند، دو روش امن و بدون سرور جانبی در دسترس است:
                  </p>

                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/70 text-right space-y-3.5">
                    <div className="flex items-center gap-2 text-[11px] font-black text-amber-850">
                      <Key className="w-4 h-4 text-amber-700" />
                      <span>روش اول: ثبت دستی توکن دسترسی سریع (Access Token)</span>
                    </div>
                    
                    <form onSubmit={handleManualTokenSubmit} className="space-y-2">
                      <p className="text-[10px] text-stone-600 leading-relaxed font-semibold">
                        شما می‌توانید از طریق درگاه رسمی <a href="https://developers.google.com/oauthplayground" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline font-black inline-flex items-center gap-0.5">Google OAuth Playground <ExternalLink className="w-2.5 h-2.5" /></a> یک توکن موقت با دسترسی شش‌گانه برای حساب شخصی خود دریافت کرده و در باکس زیر پیست نمایید:
                      </p>
                      <div className="flex gap-2.5 items-center">
                        <input
                          type="password"
                          value={inputAccessToken}
                          onChange={(e) => setInputAccessToken(e.target.value)}
                          placeholder="ya29.a0Acv..."
                          className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono text-left outline-none text-stone-850 focus:border-amber-600"
                        />
                        <button
                          type="submit"
                          disabled={isLoggingIn}
                          className="bg-stone-900 hover:bg-stone-850 text-white text-[11px] font-black px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs"
                        >
                          ثبت و ذخیره توکن
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="bg-stone-100 rounded-2xl p-4 border border-stone-200 text-right space-y-3">
                    <div className="flex items-center gap-2 text-[11px] font-black text-stone-800">
                      <ShieldCheck className="w-4 h-4 text-stone-700" />
                      <span>روش دوم: اتصال خودکار بومی با Client ID گوگل</span>
                    </div>
                    
                    <p className="text-[10px] text-stone-600 leading-relaxed font-semibold">
                      اگر کلاینت‌آیدی معتبری در گوگل کنسول خود ساخته‌اید، آن را در زیر وارد کنید تا دکمه ورود امن گوگل مستقیماً هدایت‌گر احراز هویت شما باشد:
                    </p>

                    <div className="space-y-2">
                      <label className="text-[9.5px] text-stone-500 font-extrabold block">کلاینت‌آیدی گوگل شما:</label>
                      <div className="flex gap-2.5 items-center">
                        <input
                          type="text"
                          value={clientId}
                          onChange={(e) => setClientId(e.target.value)}
                          placeholder="12345678-xxxx.apps.googleusercontent.com"
                          className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono text-left outline-none text-stone-850 focus:border-red-550"
                        />
                        <button
                          onClick={triggerGoogleOAuthRedirect}
                          className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-black px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs"
                        >
                          ورود امن گوگل (Redirect)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Hint of cloud security */}
            <div className="border-t border-stone-200/50 pt-3.5 mt-5 flex items-center gap-2 text-[10px] text-stone-400 font-extrabold justify-end">
              <span>تمامی مبادلات اطلاعاتی به صورت مستقیم و با استاندارد SSL بدون هیچ سرور فرعی برقرار است.</span>
              <Lock className="w-3.5 h-3.5 text-stone-500" />
            </div>

          </div>

          {/* Right Column: Local Audit Sync Logs */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-zinc-900 text-white rounded-3xl p-5 border border-zinc-850 shadow-sm space-y-4.5">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <button
                  onClick={clearLocalLogs}
                  className="bg-zinc-800 hover:bg-red-800/80 p-1.5 rounded-lg text-zinc-400 hover:text-white transition-all cursor-pointer"
                  title="پاک‌سازی لاگ‌ها"
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
                <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                  <span>سینک مرورگر (LocalStorage)</span>
                  <History className="w-4 h-4 text-stone-450" />
                </h4>
              </div>
              
              <p className="text-[10.5px] text-zinc-400 leading-normal font-bold">
                تراکنش‌های فوق، به صورت ۱۰۰٪ امن و محلی بدون نیاز به دیتابیس‌های ابری Firestore ثبت و مدیریت می‌گردند:
              </p>

              {syncLogs.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {syncLogs.map((log) => (
                    <div key={log.id} className="bg-zinc-950/80 border border-zinc-805/80 p-3 rounded-xl text-right text-[10px] space-y-1 hover:border-red-500/30 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-zinc-500 font-mono">
                          {new Date(log.timestamp).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className="text-red-400 font-black">{log.actionType}</span>
                      </div>
                      <p className="text-stone-300 font-bold text-right pt-1">{log.details}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-zinc-500 text-[10px] font-black">
                  هیچ تراکنشی در این تب مرورگر ثبت نشده است. گزینه‌ای را ایجاد کنید تا لاگ فعال شود.
                </div>
              )}
            </div>
          </div>

        </div>
      ) : (
        <div className="border-2 border-dashed border-stone-200 rounded-[32px] p-12 text-center space-y-4 bg-stone-50/50">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-650 mx-auto text-xl shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-lg mx-auto">
            <h4 className="font-black text-stone-850 text-sm">پیوند ابری اتریش‌نشین آماده انتساب است</h4>
            <p className="text-xs text-stone-500 font-bold leading-relaxed">
              جهت ورود امن به خدمات گوگل و فعال شدن ثبت قرار ملاقات‌ها، مدیریت کاربرگ‌ها، پایش فایل‌ها و ارسال ایمیل بومی، لطفاً یکی از کلیدهای معتبر را مشخص یا پیوند دهید:
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab("config")}
              className="bg-stone-900 border border-stone-800 hover:bg-stone-850 px-6 py-3 rounded-2xl text-xs font-black text-white flex items-center gap-2.5 active:scale-98 transition-all cursor-pointer shadow-md"
            >
              <Key className="w-4 h-4 text-stone-400" />
              <span>پیکربندی هویت یا ثبت توکن گوگل</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
