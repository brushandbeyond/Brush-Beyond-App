const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const keyId = '2QG9Y44GS8';
const issuerId = '3e1fe9c5-32ef-471c-b063-3da2341ba457';
const appId = '6832145033';
const keyPath = process.env.ASC_PRIVATE_KEY_PATH || path.resolve(__dirname, '../.local-credentials/AuthKey_' + keyId + '.p8');

async function main() {
  if (!fs.existsSync(keyPath)) throw new Error('Private key not found. Copy the downloaded .p8 into .local-credentials, or set ASC_PRIVATE_KEY_PATH.');
  fs.chmodSync(keyPath, 0o600);
  const privateKey = crypto.createPrivateKey(fs.readFileSync(keyPath));
  if (privateKey.asymmetricKeyType !== 'ec' || privateKey.asymmetricKeyDetails?.namedCurve !== 'prime256v1') {
    throw new Error('Expected an Apple P-256 API private key.');
  }
  const issuedAt = Math.floor(Date.now() / 1000);
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const signingInput = encode({ alg: 'ES256', kid: keyId, typ: 'JWT' }) + '.' + encode({ iss: issuerId, iat: issuedAt, exp: issuedAt + 300, aud: 'appstoreconnect-v1' });
  const signature = crypto.sign('sha256', Buffer.from(signingInput), { key: privateKey, dsaEncoding: 'ieee-p1363' }).toString('base64url');
  const token = signingInput + '.' + signature;

  async function get(resource) {
    const response = await fetch('https://api.appstoreconnect.apple.com/v1/' + resource, {
      headers: { Authorization: 'Bearer ' + token },
      redirect: 'error',
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error('Apple API returned HTTP ' + response.status + '. Check API-key permissions and availability.');
    return response.json();
  }

  const app = await get('apps/' + appId);
  if (app.data?.attributes?.bundleId !== 'net.brushbeyond.app') throw new Error('Unexpected app identity.');
  console.log('Authenticated: ' + app.data.attributes.name + ' (' + app.data.attributes.bundleId + ')');
  const versions = await get('apps/' + appId + '/appStoreVersions?filter[platform]=IOS&limit=10');
  for (const version of versions.data || []) {
    console.log(JSON.stringify({ version: version.attributes.versionString, state: version.attributes.appStoreState, releaseType: version.attributes.releaseType }));
    const build = await get('appStoreVersions/' + version.id + '/build');
    console.log(JSON.stringify({ build: build.data?.attributes?.version || null, processingState: build.data?.attributes?.processingState || null }));
    const detail = await get('appStoreVersions/' + version.id + '?include=appStoreVersionLocalizations');
    for (const localization of (detail.included || []).filter((item) => item.type === 'appStoreVersionLocalizations')) {
      const screenshotSets = await get('appStoreVersionLocalizations/' + localization.id + '/appScreenshotSets?include=appScreenshots&fields[appScreenshots]=fileName,assetDeliveryState');
      const screenshots = new Map((screenshotSets.included || []).map((item) => [item.id, item]));
      for (const screenshotSet of screenshotSets.data || []) {
        for (const relationship of screenshotSet.relationships?.appScreenshots?.data || []) {
          const screenshot = screenshots.get(relationship.id);
          console.log(JSON.stringify({ locale: localization.attributes.locale, display: screenshotSet.attributes.screenshotDisplayType, screenshot: screenshot?.attributes?.fileName, state: screenshot?.attributes?.assetDeliveryState?.state, errors: screenshot?.attributes?.assetDeliveryState?.errors?.map((error) => error.code) || [] }));
        }
      }
    }
  }
  console.log('Read-only status check complete. No submission or account settings changed.');
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
