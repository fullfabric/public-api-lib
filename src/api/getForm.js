import { pick } from 'lodash-es'

import url from '../utils/url'
import extractHeaders from '../utils/extractHeaders'

/**
 * Fetches a Form from the API.
 *
 * Can optionally return a subset of the response headers (useful for getting
 * a request ID for form submission).
 *
 * @param {String} formId A Form ID
 * @param {String} [opts.baseUrl] The base URL for the API. Set if different
 *                                from the current location.
 * @param {Array} [opts.returnHeaders] An array of header names to return.
 * @returns {Object} The fetched form or, if `opts.returnHeaders` is set, an
 *                   object with `data` and `headers` properties.
 */
export default async function getForm(formId, opts = {}) {
  const response = await fetch(
    url(`/api/forms/${formId}`, pick(opts, ['baseUrl'])),
    { credentials: 'include' }
  )

  const form = await response.json()

  if (Array.isArray(opts.returnHeaders)) {
    return {
      data: form,
      headers: extractHeaders(response, opts.returnHeaders)
    }
  }

  return form
}
