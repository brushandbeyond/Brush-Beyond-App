const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

if (process.argv.length !== 3 || process.argv[2] !== '--print-token') {
  console.log('Run locally only: node scripts/google-child-verification-token.js --print-token | pbcopy');
  console.log('This copies a five-minute, read-only Apple app-metadata token for the official Google verification form. Never paste it into chat or Git.');
} else {
  try {
    const keyPath = path.resolve(__dirname, '../.local-credentials/AuthKey_D3R6ZS86GL.p8');
    const permissions = fs.statSync(keyPath).mode & 0o777;
    if (permissions & 0o077) throw new Error('Unsafe file permissions');
    const privateKey = crypto.createPrivateKey(fs.readFileSync(keyPath));
    const issuedAt = Math.floor(Date.now() / 1000) - 10;
    const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
    const input = encode({ alg: 'ES256', kid: 'D3R6ZS86GL', typ: 'JWT' }) + '.' + encode({
      iss: '3e1fe9c5-32ef-471c-b063-3da2341ba457',
      iat: issuedAt,
      exp: issuedAt + 300,
      aud: 'appstoreconnect-v1',
      scope: [
        'GET /v1/apps',
        'GET /v1/apps?fields[apps]=name,bundleId',
        'GET /v1/apps/6832145033',
      ],
    });
    const signature = crypto.sign('sha256', Buffer.from(input), { key: privateKey, dsaEncoding: 'ieee-p1363' }).toString('base64url');
    process.stdout.write(input + '.' + signature);
  } catch {
    console.error('Could not generate token. Check the Developer key exists, has mode 600, and has not been revoked.');
    process.exitCode = 1;
  }
}
