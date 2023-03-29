export default async function getPageDigest() {
  const requestId = document.querySelector("meta[name='request-id']")?.content
  const fingerprint = navigator.webdriver ? '' : navigator.userAgent
  const message = new TextEncoder().encode(`${fingerprint}:${requestId}`)

  const digestRaw = await crypto?.subtle?.digest('SHA-256', message)

  return Array.from(new Uint8Array(digestRaw))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
