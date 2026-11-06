/**
 * 🔐 Security Logger Module (src/utils/securityLogger.ts)
 * Compliant with security.md and auth.md specifications.
 * Tracks and audits sensitive activities (successful/failed logins, unauthorized access,
 * session timeouts, rate limits) without leaking credentials or PII.
 */

export type SecurityEventType =
  | "AUTH_SUCCESS"
  | "AUTH_FAILURE"
  | "LOGOUT"
  | "SESSION_EXPIRED"
  | "UNAUTHORIZED_ACCESS"
  | "RATE_LIMIT_EXCEEDED"
  | "SENSITIVE_ACTION"
  | "SECURITY_CONFIG_CHANGE";

export type SecuritySeverity = "INFO" | "WARN" | "ERROR" | "CRITICAL";

export interface SecurityLogEntry {
  id: string;
  timestamp: string;
  eventType: SecurityEventType;
  severity: SecuritySeverity;
  action: string;
  userId?: string;
  role?: string;
  details?: Record<string, any>;
  userAgent?: string;
  clientTime: number;
}

const STORAGE_KEY = "otrish_security_audit_logs_v1";
const MAX_LOGS_IN_MEMORY = 200;

// In-memory buffer for high-frequency audits
let memoryLogs: SecurityLogEntry[] = [];
const logSubscribers: Array<(entry: SecurityLogEntry) => void> = [];

// Initialize logs from sessionStorage on bootstrap
if (typeof window !== "undefined") {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      memoryLogs = JSON.parse(raw);
    }
  } catch {
    memoryLogs = [];
  }
}

/**
 * Sanitize details object to prevent logging raw passwords or tokens
 */
function sanitizeDetails(details?: Record<string, any>): Record<string, any> | undefined {
  if (!details) return undefined;
  const sanitized: Record<string, any> = {};
  const forbiddenKeys = ["password", "token", "secret", "apiKey", "refreshToken", "creditCard"];

  for (const [key, value] of Object.entries(details)) {
    if (forbiddenKeys.some((k) => key.toLowerCase().includes(k.toLowerCase()))) {
      sanitized[key] = "[REDACTED_FOR_SECURITY]";
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeDetails(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

/**
 * Core function to log a security event
 */
export function logSecurityEvent(
  params: Omit<SecurityLogEntry, "id" | "timestamp" | "clientTime" | "userAgent">
): SecurityLogEntry {
  const entry: SecurityLogEntry = {
    id: `sec_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    clientTime: Date.now(),
    eventType: params.eventType,
    severity: params.severity,
    action: params.action,
    userId: params.userId ? params.userId.replace(/[\r\n\t]/g, "").trim().slice(0, 80) : undefined,
    role: params.role,
    details: sanitizeDetails(params.details),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 150) : "unknown",
  };

  // Prepend to memory buffer
  memoryLogs = [entry, ...memoryLogs].slice(0, MAX_LOGS_IN_MEMORY);

  // Sync to sessionStorage
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(memoryLogs.slice(0, 50)));
    } catch {
      // Ignore quota errors
    }
  }

  // Notify active UI subscribers (e.g. Audit Viewer)
  logSubscribers.forEach((fn) => {
    try {
      fn(entry);
    } catch (e) {
      console.warn("Security log subscriber threw error", e);
    }
  });

  // Asynchronously dispatch to backend log sink
  if (typeof window !== "undefined") {
    fetch("/api/security/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    }).catch(() => {
      // Backend may be offline in dev, keep log in client memory
    });
  }

  // Output structured audit alert for developers in non-production
  if (process.env.NODE_ENV !== "production") {
    const color =
      entry.severity === "CRITICAL" || entry.severity === "ERROR"
        ? "color: #ef4444; font-weight: bold"
        : entry.severity === "WARN"
        ? "color: #f59e0b; font-weight: bold"
        : "color: #10b981; font-weight: bold";

    console.info(
      `%c[SECURITY AUDIT - ${entry.eventType}] ${entry.action}`,
      color,
      entry
    );
  }

  return entry;
}

/**
 * Log successful authentication
 */
export function logAuthSuccess(username: string, details?: Record<string, any>) {
  return logSecurityEvent({
    eventType: "AUTH_SUCCESS",
    severity: "INFO",
    action: `ورود موفق کاربر «${username}» به سامانه`,
    userId: username,
    role: details?.role || "admin",
    details,
  });
}

/**
 * Log failed authentication attempt
 */
export function logAuthFailure(username: string, reason: string, attemptCount = 1) {
  return logSecurityEvent({
    eventType: "AUTH_FAILURE",
    severity: attemptCount >= 3 ? "ERROR" : "WARN",
    action: `تلاش ناموفق برای ورود به حساب «${username}» (${reason})`,
    userId: username,
    details: { reason, attemptCount },
  });
}

/**
 * Log unauthorized access attempt to restricted pages/features
 */
export function logUnauthorizedAccess(resource: string, role?: string, details?: Record<string, any>) {
  return logSecurityEvent({
    eventType: "UNAUTHORIZED_ACCESS",
    severity: "ERROR",
    action: `تلاش برای دسترسی غیرمجاز به بخش حفاظت‌شده «${resource}»`,
    role: role || "guest",
    details: { resource, ...details },
  });
}

/**
 * Log automatic session termination due to inactivity (30 min per auth.md)
 */
export function logSessionExpired(username?: string) {
  return logSecurityEvent({
    eventType: "SESSION_EXPIRED",
    severity: "WARN",
    action: `انقضای خودکار نشست امنیتی به دلیل ۳۰ دقیقه عدم فعالیت`,
    userId: username,
  });
}

/**
 * Log logout event
 */
export function logLogout(username?: string) {
  return logSecurityEvent({
    eventType: "LOGOUT",
    severity: "INFO",
    action: `خروج امن از حساب کاربری`,
    userId: username,
  });
}

/**
 * Log rate limit trigger
 */
export function logRateLimitExceeded(action: string, identifier?: string) {
  return logSecurityEvent({
    eventType: "RATE_LIMIT_EXCEEDED",
    severity: "CRITICAL",
    action: `تخطی از سقف درخواست مجاز (Rate Limit) در عملیات «${action}»`,
    userId: identifier,
    details: { action, identifier },
  });
}

/**
 * Retrieve recent security logs
 */
export function getSecurityLogs(limit = 100): SecurityLogEntry[] {
  return memoryLogs.slice(0, limit);
}

/**
 * Clear in-memory & session logs (Admin only)
 */
export function clearSecurityLogs(): void {
  memoryLogs = [];
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Subscribe to new security events
 */
export function subscribeToSecurityLogs(callback: (entry: SecurityLogEntry) => void): () => void {
  logSubscribers.push(callback);
  return () => {
    const idx = logSubscribers.indexOf(callback);
    if (idx !== -1) logSubscribers.splice(idx, 1);
  };
}
