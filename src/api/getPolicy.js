import assert from 'assert'

import url from '../utils/url'

const POLICY_TYPES = [
  'data_processing_consent',
  'privacy_policy',
  'marketing_policy'
]

/**
 * Fetches a published policy from the API.
 *
 * @param {String} policyType One of 'data_processing_consent',
 *                            'privacy_policy', or 'marketing_policy'.
 * @param {String} [opts.version] The API version to use, defaults to
 *                                '2021-04-13'.
 * @param {String} [opts.baseUrl] The base URL for the API. Set if different
 *                                from the current location.
 * @returns {Object} The policy, if any.
 */
export default async function getPolicy(policyType, opts = {}) {
  assert(
    POLICY_TYPES.includes(policyType),
    'policyType must be one of: ' + POLICY_TYPES.join(', ')
  )

  const version = opts.version || '2021-04-13'

  const result = await fetch(url(`/apis/policies/${policyType}`, opts), {
    credentials: 'omit',
    headers: {
      Accept: `application/json;version=${version}`
    }
  })

  return await result.json()
}
