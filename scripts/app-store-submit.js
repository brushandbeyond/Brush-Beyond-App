// Submit iOS 1.0 for App Review, or release an approved version (manual release).
//
//   node scripts/app-store-submit.js                 # dry run: show state and what would happen
//   node scripts/app-store-submit.js submit --confirm
//   node scripts/app-store-submit.js release --confirm
//
// App Privacy has no public API: publish it in the App Store Connect web UI first,
// otherwise Apple rejects the submission and this script prints Apple's error.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const keyId = '2QG9Y44GS8';
const issuerId = '3e1fe9c5-32ef-471c-b063-3da2341ba457';
const appId = '6832145033';
const keyPath = process.env.ASC_PRIVATE_KEY_PATH || path.resolve(__dirname, '../.local-credentials/AuthKey_' + keyId + '.p8');

const [action = 'status', flag] = process.argv.slice(2);
const confirmed = flag === '--confirm';

function makeToken() {
  if (!fs.existsSync(keyPath)) throw new Error('Private key not found at ' + keyPath);
  fs.chmodSync(keyPath, 0o600);
  const privateKey = crypto.createPrivateKey(fs.readFileSync(keyPath));
  const now = Math.floor(Date.now() / 1000);
  const enc = (v) => Buffer.from(JSON.stringify(v)).toString('base64url');
  const input = enc({ alg: 'ES256', kid: keyId, typ: 'JWT' }) + '.' + enc({ iss: issuerId, iat: now, exp: now + 900, aud: 'appstoreconnect-v1' });
  return input + '.' + crypto.sign('sha256', Buffer.from(input), { key: privateKey, dsaEncoding: 'ieee-p1363' }).toString('base64url');
}

const token = makeToken();

async function api(method, resource, body) {
  const response = await fetch('https://api.appstoreconnect.apple.com/v1/' + resource, {
    method,
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify({ data: body }) : undefined,
    redirect: 'error',
    signal: AbortSignal.timeout(30000),
  });
  const text = await response.text();
  const json = text ? JSON.parse(text) : {};
  if (!response.ok) {
    const details = (json.errors || []).map((e) => `${e.code}: ${e.title}${e.detail ? ' — ' + e.detail : ''}`).join('\n  ');
    throw new Error(`${method} ${resource} → HTTP ${response.status}\n  ${details}`);
  }
  return json;
}

async function main() {
  const versions = await api('GET', `apps/${appId}/appStoreVersions?filter[platform]=IOS&limit=5`);
  const version = (versions.data || []).find((v) => v.attributes.versionString === '1.0');
  if (!version) throw new Error('iOS version 1.0 not found.');
  const state = version.attributes.appStoreState;
  console.log(`Version 1.0 state: ${state}`);

  const openSubs = await api('GET', `reviewSubmissions?filter[app]=${appId}&filter[platform]=IOS&limit=10`);
  for (const s of openSubs.data || []) console.log(`Review submission ${s.id}: ${s.attributes.state}`);

  if (action === 'submit') {
    if (state !== 'PREPARE_FOR_SUBMISSION' && state !== 'DEVELOPER_REJECTED' && state !== 'REJECTED') {
      throw new Error(`Cannot submit from state ${state}.`);
    }
    if (!confirmed) return console.log('Dry run: would create a review submission for 1.0 and submit it. Re-run with --confirm.');
    let sub = (openSubs.data || []).find((s) => s.attributes.state === 'READY_FOR_REVIEW');
    if (!sub) {
      sub = (await api('POST', 'reviewSubmissions', {
        type: 'reviewSubmissions',
        attributes: { platform: 'IOS' },
        relationships: { app: { data: { type: 'apps', id: appId } } },
      })).data;
      console.log(`Created review submission ${sub.id}`);
    }
    const items = await api('GET', `reviewSubmissions/${sub.id}/items`);
    if (!(items.data || []).length) {
      await api('POST', 'reviewSubmissionItems', {
        type: 'reviewSubmissionItems',
        relationships: {
          reviewSubmission: { data: { type: 'reviewSubmissions', id: sub.id } },
          appStoreVersion: { data: { type: 'appStoreVersions', id: version.id } },
        },
      });
      console.log('Added version 1.0 to the submission');
    }
    const done = await api('PATCH', `reviewSubmissions/${sub.id}`, { type: 'reviewSubmissions', id: sub.id, attributes: { submitted: true } });
    return console.log(`Submitted for review. Submission state: ${done.data.attributes.state}`);
  }

  if (action === 'release') {
    if (state !== 'PENDING_DEVELOPER_RELEASE') throw new Error(`Release needs PENDING_DEVELOPER_RELEASE (approved); current state is ${state}.`);
    if (!confirmed) return console.log('Dry run: would release 1.0 to the App Store. Re-run with --confirm.');
    await api('POST', 'appStoreVersionReleaseRequests', {
      type: 'appStoreVersionReleaseRequests',
      relationships: { appStoreVersion: { data: { type: 'appStoreVersions', id: version.id } } },
    });
    return console.log('Release requested. The app goes live once Apple finishes processing (can take up to 24h).');
  }

  console.log('Usage: node scripts/app-store-submit.js [submit|release] [--confirm]');
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
