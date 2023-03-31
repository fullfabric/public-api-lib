import { pick } from 'lodash-es'

import url from '../utils/url'

/**
 * Fetches a Form from the API.
 *
 * @param {String} formId A Form ID
 * @param {String} [opts.baseUrl] The base URL for the API. Set if different
 *                                from the current location.
 * @returns {Object} The fetched form.
 */
export default async function getForm(formId, opts = {}) {
  const result = await fetch(
    url(`/api/forms/${formId}`, pick(opts, ['baseUrl'])),
    { credentials: 'include' }
  )

  return await result.json()
}
