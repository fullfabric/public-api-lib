import assert from 'assert'
import { pick } from 'lodash-es'

import checkResponse from '../utils/checkResponse'
import getPageDigest from '../utils/getPageDigest'
import url from '../utils/url'

/**
 * Creates a submission to a Form via the API, returning it.
 *
 * @param {String} formId A Form ID
 * @param {FormData} formData The data to submit to the form.
 * @param {String} [opts.baseUrl] The base URL for the API. Set if different
 *                                from the current location.
 * @param {String} [opts.externalDomainToken] A token to include in the request
 *                                            if making it from a different
 *                                            domain than the instance's.
 * @returns {Object} The fetched form.
 */
export default async function submitForm(formId, formData, opts = {}) {
  assert.equal(typeof 'formId', 'string', 'formId must be a string')

  assert.ok(
    formData instanceof FormData,
    'formData must be provided and be a FormData instance'
  )

  const digest = await getPageDigest({ sourceType: 'form', sourceId: formId })

  const urlOpts = {
    ...pick(opts, ['baseUrl']),
    query: { external_domain_token: opts.externalDomainToken }
  }

  const response = await fetch(
    url(`/api/forms/${formId}/submissions`, urlOpts),
    {
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'X-FF-DIGEST': digest },
      body: formData
    }
  )

  return await checkResponse(response)
}
