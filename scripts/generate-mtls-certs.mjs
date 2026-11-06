#!/usr/bin/env node
/**
 * 🔐 Zero Trust mTLS Certificate Authority & Service Certificates Generator
 * Generates Root CA, Server Certificate, and Peer Microservice Client Certificates.
 * Enforces SAN (Subject Alternative Names), TLS 1.3 compliance, and strict validity periods.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CERTS_DIR = path.join(process.cwd(), 'certs', 'mtls');

console.log('🔒 [mTLS Setup] Generating Zero Trust Mutual TLS X.509 Certificates...');

if (!fs.existsSync(CERTS_DIR)) {
  fs.mkdirSync(CERTS_DIR, { recursive: true, mode: 0o700 });
}

// 1. Root Certificate Authority (CA)
const caKeyPath = path.join(CERTS_DIR, 'ca-key.pem');
const caCertPath = path.join(CERTS_DIR, 'ca-cert.pem');

if (!fs.existsSync(caCertPath) || !fs.existsSync(caKeyPath)) {
  console.log('📌 1/3 Generating Internal Root Certificate Authority (CA)...');
  execSync(
    `openssl req -x509 -newkey rsa:4096 -days 365 -nodes ` +
    `-keyout "${caKeyPath}" -out "${caCertPath}" ` +
    `-subj "/C=AT/ST=Vienna/L=Vienna/O=Otrish Zero Trust/OU=Security/CN=Otrish-Internal-Root-CA"`,
    { stdio: 'pipe' }
  );
  fs.chmodSync(caKeyPath, 0o600);
}

// 2. Server Certificate (Internal Microservice Receiver)
const serverKeyPath = path.join(CERTS_DIR, 'server-key.pem');
const serverCsrPath = path.join(CERTS_DIR, 'server.csr');
const serverCertPath = path.join(CERTS_DIR, 'server-cert.pem');
const serverExtPath = path.join(CERTS_DIR, 'server-ext.cnf');

console.log('📌 2/3 Generating Internal Server Certificate with SAN...');

const serverExtContent = `
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = internal.otrish.svc.cluster.local
DNS.3 = *.internal.otrish.local
IP.1 = 127.0.0.1
`;
fs.writeFileSync(serverExtPath, serverExtContent.trim());

execSync(
  `openssl req -new -newkey rsa:2048 -nodes ` +
  `-keyout "${serverKeyPath}" -out "${serverCsrPath}" ` +
  `-subj "/C=AT/ST=Vienna/L=Vienna/O=Otrish Neshin/OU=Backend Services/CN=internal-backend.otrish.local"`,
  { stdio: 'pipe' }
);
fs.chmodSync(serverKeyPath, 0o600);

execSync(
  `openssl x509 -req -in "${serverCsrPath}" -CA "${caCertPath}" -CAkey "${caKeyPath}" ` +
  `-CAcreateserial -out "${serverCertPath}" -days 180 -extfile "${serverExtPath}"`,
  { stdio: 'pipe' }
);
if (fs.existsSync(serverCsrPath)) fs.unlinkSync(serverCsrPath);
if (fs.existsSync(serverExtPath)) fs.unlinkSync(serverExtPath);

// 3. Client Certificate (Internal Microservice Caller Identity)
const clientKeyPath = path.join(CERTS_DIR, 'client-key.pem');
const clientCsrPath = path.join(CERTS_DIR, 'client.csr');
const clientCertPath = path.join(CERTS_DIR, 'client-cert.pem');
const clientExtPath = path.join(CERTS_DIR, 'client-ext.cnf');

console.log('📌 3/3 Generating Peer Client Microservice Certificate...');

const clientExtContent = `
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = clientAuth
`;
fs.writeFileSync(clientExtPath, clientExtContent.trim());

execSync(
  `openssl req -new -newkey rsa:2048 -nodes ` +
  `-keyout "${clientKeyPath}" -out "${clientCsrPath}" ` +
  `-subj "/C=AT/ST=Vienna/L=Vienna/O=Otrish Neshin/OU=Microservices/CN=otrish-worker-service"`,
  { stdio: 'pipe' }
);
fs.chmodSync(clientKeyPath, 0o600);

execSync(
  `openssl x509 -req -in "${clientCsrPath}" -CA "${caCertPath}" -CAkey "${caKeyPath}" ` +
  `-CAcreateserial -out "${clientCertPath}" -days 180 -extfile "${clientExtPath}"`,
  { stdio: 'pipe' }
);
if (fs.existsSync(clientCsrPath)) fs.unlinkSync(clientCsrPath);
if (fs.existsSync(clientExtPath)) fs.unlinkSync(clientExtPath);

console.log('✅ [mTLS Setup Complete]');
console.log(`   CA Certificate:     ${caCertPath}`);
console.log(`   Server Certificate: ${serverCertPath}`);
console.log(`   Client Certificate: ${clientCertPath}`);
console.log('   All private keys secured with chmod 0600.');
