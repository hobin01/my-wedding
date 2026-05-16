// 정적 GitHub Pages용 클라이언트 복호화 런타임.
// #invite=... 값으로 encrypted/ 산출물 복호화를 시도하고, 실패하면 더미 CONFIG 를 유지합니다.
(function () {
  const PAYLOAD_URL = './encrypted/invite-data.enc.json';
  const AAD = 'my-wedding:v1';
  const blobUrls = [];

  function getInviteToken() {
    const hash = window.location.hash || '';
    if (!hash.startsWith('#')) return '';
    const params = new URLSearchParams(hash.slice(1));
    return params.get('invite') || '';
  }

  function base64UrlToBytes(value) {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  function concatBytes(a, b) {
    const out = new Uint8Array(a.byteLength + b.byteLength);
    out.set(a, 0);
    out.set(b, a.byteLength);
    return out;
  }

  async function deriveKey(token) {
    const material = new TextEncoder().encode(token);
    const digest = await crypto.subtle.digest('SHA-256', material);
    return crypto.subtle.importKey('raw', digest, { name: 'AES-GCM' }, false, ['decrypt']);
  }

  async function decryptObject(encrypted, key) {
    const iv = base64UrlToBytes(encrypted.iv);
    const ciphertext = base64UrlToBytes(encrypted.ciphertext);
    const tag = base64UrlToBytes(encrypted.tag);
    const combined = concatBytes(ciphertext, tag);
    const aad = new TextEncoder().encode(encrypted.aad || AAD);
    return crypto.subtle.decrypt({ name: 'AES-GCM', iv, additionalData: aad }, key, combined);
  }

  function rememberBlobUrl(url) {
    blobUrls.push(url);
    return url;
  }

  function replaceImageRefs(config, assetUrls) {
    const replace = (value) => assetUrls[value] || value;
    if (config.meta && config.meta.heroImage) config.meta.heroImage = replace(config.meta.heroImage);
    if (config.groom && config.groom.photo) config.groom.photo = replace(config.groom.photo);
    if (config.bride && config.bride.photo) config.bride.photo = replace(config.bride.photo);
    if (config.gallery && Array.isArray(config.gallery.files)) {
      config.gallery.files = config.gallery.files.map(replace);
    }
  }

  async function decryptAssets(config, key) {
    const encryptedAssets = config.encryptedAssets || {};
    const assetUrls = {};
    await Promise.all(Object.entries(encryptedAssets).map(async ([ref, meta]) => {
      const res = await fetch(meta.path, { cache: 'no-store' });
      if (!res.ok) throw new Error('asset fetch failed');
      const encrypted = await res.json();
      const bytes = await decryptObject(encrypted, key);
      const blob = new Blob([bytes], { type: meta.mimeType || encrypted.mimeType || 'application/octet-stream' });
      assetUrls[ref] = rememberBlobUrl(URL.createObjectURL(blob));
    }));
    replaceImageRefs(config, assetUrls);
    delete config.encryptedAssets;
  }

  async function applyEncryptedInvite() {
    const token = getInviteToken();
    if (!token) return { ok: false, reason: 'missing' };

    try {
      const key = await deriveKey(token);
      const res = await fetch(PAYLOAD_URL, { cache: 'no-store' });
      if (!res.ok) return { ok: false, reason: 'unavailable' };
      const encrypted = await res.json();
      const plaintext = await decryptObject(encrypted, key);
      const config = JSON.parse(new TextDecoder().decode(plaintext));
      await decryptAssets(config, key);
      window.CONFIG = config;
      window.__INVITE_DECRYPTED = true;
      return { ok: true };
    } catch (e) {
      window.__INVITE_DECRYPTED = false;
      return { ok: false, reason: 'decrypt-failed' };
    }
  }

  window.INVITE_CRYPTO = { applyEncryptedInvite, getInviteToken };
})();
