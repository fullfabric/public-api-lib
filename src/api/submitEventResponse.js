import assert from 'assert'
import { pick } from 'lodash-es'

import checkResponse from '../utils/checkResponse'
import getPageDigest from '../utils/getPageDigest'
import url from '../utils/url'

/**
 * Creates a submission to an Event via the API, returning it.
 *
 * @param {String} eventId An Event ID
 * @param {FormData} eventData The data to submit to the event.
 * @param {String} [opts.requestId] Customize the requestId used for anti-spam.
 * @param {String} [opts.baseUrl] The base URL for the API. Set if different
 *                                from the current location.
 * @param {String} [opts.externalDomainToken] A token to include in the request
 *                                            if making it from a different
 *                                            domain than the instance's.
 * @returns {Object} The fetched form.
 */
export default async function submitEventResponse(
  eventId,
  eventData,
  opts = {}
) {
  assert.equal(typeof eventId, 'string', 'eventId must be a string')

  assert.ok(
    eventData instanceof FormData,
    'eventData must be provided and be a FormData instance'
  )

  const digest = await getPageDigest({
    requestId: opts.requestId,
    sourceType: 'event',
    sourceId: eventId
  })

  const urlOpts = {
    ...pick(opts, ['baseUrl']),
    query: { external_domain_token: opts.externalDomainToken }
  }

  const response = await fetch(
    url(`/api/events/${eventId}/responses`, urlOpts),
    {
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'X-FF-DIGEST': digest },
      body: eventData
    }
  )

  return await checkResponse(response)
}
