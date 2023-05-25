/**
 * Generates a digest for anti-spam purposes.
 *
 * This algorithm should match the backend's exactly, otherwise the requests
 * will be unauthorized.
 *
 * By default, each digest is unique to a page load. When there are multiple
 * submissions possible in the same page, e.g. via multiple forms, a source can
 * be passed to generate a digest unique to it.
 *
 * @param {String} [requestId] ID of the request, pass if originating from an API request.
 * @param {String} [sourceType] Type of source for the digest, should match backend.
 * @param {String} [sourceId] ID of source for the digest, should match backend.
 * @returns {String} The generated digest.
 */
export default async function getPageDigest({
  requestId,
  sourceType,
  sourceId
} = {}) {
  requestId ||= document.querySelector("meta[name='request-id']")?.content || ''

  // If there's no requestId, no point generating a digest, won't ever match
  // the backend. Same if we can't access the crypto API.
  if (!requestId || !crypto?.subtle?.digest) return null

  let digest = await makeDigest(`${navigator.userAgent}:${requestId}`)

  if (sourceType && sourceId) {
    const suffix = `${sourceType}:${sourceId}`
    digest += `:${await makeDigest(suffix)}`
  }

  return digest
}

async function makeDigest(str) {
  const message = new TextEncoder().encode(str)
  const digestRaw = await crypto.subtle.digest('SHA-256', message)

  return Array.from(new Uint8Array(digestRaw))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
