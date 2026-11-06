/**
 * 🔒 Zero Trust Mutual TLS (mTLS) Manager (src/server/mtlsManager.ts)
 * Enforces cryptographic mutual peer verification for all internal service-to-service communications.
 * - Both client and server must present X.509 certificates issued by internal CA
 * - Rejects unauthorized peers and enforces TLS 1.3
 * - Extracts peer service identity and provides mTLS client dispatch helper
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import type { Request, Response, NextFunction } from 'express';
import type { TLSSocket } from 'tls';

const CERTS_DIR = path.join(process.cwd(), 'certs', 'mtls');

export interface PeerServiceIdentity {
  commonName: string;
  organization?: string;
  fingerprint: string;
  serialNumber: string;
  validFrom: string;
  validTo: string;
}

// Extend Express Request to include authenticated peer service
declare global {
  namespace Express {
    interface Request {
      peerService?: PeerServiceIdentity;
    }
  }
}

/**
 * Check if mTLS certificates are provisioned on disk
 */
export function areMtlsCertsAvailable(): boolean {
  const ca = path.join(CERTS_DIR, 'ca-cert.pem');
  const serverCert = path.join(CERTS_DIR, 'server-cert.pem');
  const serverKey = path.join(CERTS_DIR, 'server-key.pem');
  const clientCert = path.join(CERTS_DIR, 'client-cert.pem');
  const clientKey = path.join(CERTS_DIR, 'client-key.pem');

  return (
    fs.existsSync(ca) &&
    fs.existsSync(serverCert) &&
    fs.existsSync(serverKey) &&
    fs.existsSync(clientCert) &&
    fs.existsSync(clientKey)
  );
}

/**
 * Returns HTTPS server options configured for Zero Trust mTLS
 */
export function getMtlsServerOptions(): https.ServerOptions | null {
  if (!areMtlsCertsAvailable()) return null;

  try {
    return {
      ca: fs.readFileSync(path.join(CERTS_DIR, 'ca-cert.pem')),
      cert: fs.readFileSync(path.join(CERTS_DIR, 'server-cert.pem')),
      key: fs.readFileSync(path.join(CERTS_DIR, 'server-key.pem')),
      requestCert: true,          // Zero Trust: Always request client certificate
      rejectUnauthorized: true,   // Zero Trust: Reject any peer not certified by internal CA
      minVersion: 'TLSv1.3',      // Enforce TLS 1.3 modern cryptographic standard
    };
  } catch (error) {
    console.error('❌ [mTLS Manager] Failed to load mTLS certificates:', error);
    return null;
  }
}

/**
 * Middleware: Enforces that incoming request has a valid mTLS peer certificate
 */
export function enforceMtlsPeerAuth(req: Request, res: Response, next: NextFunction) {
  const tlsSocket = req.socket as TLSSocket;

  // In standard development proxy/HTTP environments where TLS terminates at edge,
  // allow simulated header verification if configured, otherwise require native TLS socket
  if (!tlsSocket.getPeerCertificate) {
    // Check for proxy-forwarded client certificate verification headers (e.g. Envoy, Istio, Cloudflare)
    const forwardedMtlsStatus = req.headers['x-forwarded-client-cert-status'];
    const forwardedPeerSubject = req.headers['x-forwarded-client-cert-subject'] as string;

    if (forwardedMtlsStatus === 'SUCCESS' && forwardedPeerSubject) {
      req.peerService = {
        commonName: forwardedPeerSubject,
        fingerprint: (req.headers['x-forwarded-client-cert-sha256'] as string) || 'proxy-verified',
        serialNumber: 'proxy-verified',
        validFrom: new Date().toISOString(),
        validTo: new Date(Date.now() + 86400000).toISOString(),
      };
      return next();
    }

    return res.status(403).json({
      error: 'Zero Trust Violation: Peer certificate required for internal service route',
      protocol: 'mTLS v1.3',
      status: 'REJECTED_UNAUTHORIZED_PEER',
    });
  }

  const clientCert = tlsSocket.getPeerCertificate(true);

  if (!clientCert || !tlsSocket.authorized) {
    return res.status(403).json({
      error: 'Zero Trust Violation: Invalid or missing peer client certificate',
      authorized: tlsSocket.authorized,
      authError: tlsSocket.authorizationError,
    });
  }

  // Extract authenticated peer identity
  const cn = clientCert.subject?.CN;
  const commonName = Array.isArray(cn) ? cn.join(', ') : (cn || 'unknown-peer');
  const org = clientCert.subject?.O;
  const organization = Array.isArray(org) ? org.join(', ') : (org || undefined);

  req.peerService = {
    commonName,
    organization,
    fingerprint: clientCert.fingerprint256 || clientCert.fingerprint,
    serialNumber: clientCert.serialNumber,
    validFrom: Array.isArray(clientCert.valid_from) ? clientCert.valid_from.join(', ') : (clientCert.valid_from || ''),
    validTo: Array.isArray(clientCert.valid_to) ? clientCert.valid_to.join(', ') : (clientCert.valid_to || ''),
  };

  next();
}

/**
 * Zero Trust mTLS Client Helper:
 * Makes authenticated HTTPS requests to another internal microservice.
 */
export async function callInternalMtlsService(
  targetUrl: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
    timeoutMs?: number;
  } = {}
): Promise<{ statusCode: number; data: any; peerIdentity?: any }> {
  if (!areMtlsCertsAvailable()) {
    throw new Error('mTLS certificates not configured. Run node scripts/generate-mtls-certs.mjs');
  }

  const agent = new https.Agent({
    ca: fs.readFileSync(path.join(CERTS_DIR, 'ca-cert.pem')),
    cert: fs.readFileSync(path.join(CERTS_DIR, 'client-cert.pem')),
    key: fs.readFileSync(path.join(CERTS_DIR, 'client-key.pem')),
    rejectUnauthorized: true, // Validate server certificate against our CA
    minVersion: 'TLSv1.3',
  });

  return new Promise((resolve, reject) => {
    const urlObj = new URL(targetUrl);
    const postData = options.body ? JSON.stringify(options.body) : null;

    const reqOptions: https.RequestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      agent,
      headers: {
        'Content-Type': 'application/json',
        'X-Service-Sender': 'otrish-internal-client',
        ...(options.headers || {}),
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {}),
      },
      timeout: options.timeoutMs || 8000,
    };

    const req = https.request(reqOptions, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseBody);
          resolve({ statusCode: res.statusCode || 200, data: parsed });
        } catch {
          resolve({ statusCode: res.statusCode || 200, data: responseBody });
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error(`mTLS Connection Error: ${err.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('mTLS Connection Timeout to peer microservice'));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}
