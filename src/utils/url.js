/**
 * Builds a full URL for making an API request.
 *
 * Can be configured to use a relative path, or an absolute URL.
 *
 * @param {String} path API path.
 * @param {String} [opts.baseUrl] Base URL to prefix to the path.
 * @param {Object} [opts.query] Optional query params to include in the request.
 * @returns {String} The built URL, or just the path if no baseUrl given.
 */
export default function url(path, { baseUrl, query } = {}) {
  const obj = new URL(baseUrl || window.location.href)
  obj.pathname = path
  if (query) obj.search = new URLSearchParams(query).toString()
  return obj.toString()
}
