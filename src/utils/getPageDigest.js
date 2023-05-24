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
 * @param {String} [sourceType] Type of source for the digest, should match backend.
 * @param {String} [sourceId] ID of source for the digest, should match backend.
 * @returns {String} The generated digest.
 */
export default async function getPageDigest({ sourceType, sourceId } = {}) {
  const requestId = document.querySelector("meta[name='request-id']")?.content
  const fingerprint = navigator.webdriver ? '' : navigator.userAgent

  let digest = `${fingerprint}:${requestId}`
  if (sourceType && sourceId) digest += `:${sourceType}:${sourceId}`

  const message = new TextEncoder().encode(digest)
  const digestRaw = await crypto?.subtle?.digest('SHA-256', message)

  return Array.from(new Uint8Array(digestRaw))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
