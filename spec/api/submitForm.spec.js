import { waitForRequest } from '../support/server'

import submitForm from '../../src/api/submitForm'

describe('api.submitForm(formId)', () => {
  let pendingRequest

  beforeEach(() => {
    pendingRequest = waitForRequest('POST', '/api/forms/formId/submissions')
  })

  /**
   * TODO: This test is currently failing because of an issue with FormData in
   * msw. It should be fixed in the next major version:
   *
   * https://github.com/mswjs/msw/issues/1577
   * https://github.com/mswjs/msw/pull/1436
   */
  it.skip('creates a new submission for the given form and data', async () => {
    const formData = new FormData()
    formData.append('name', 'John Doe')
    const response = await submitForm('formId', formData)
    const request = await pendingRequest
    expect(request.body).toEqual({ name: 'John Doe' })
    expect(response.form).toBeDefined()
    expect(response.message).toBe('Thank you.')
  })

  /**
   * msw cannot read a FormData request body (see the TODO above), so these
   * stub fetch to assert on the URL the request is made to.
   */
  describe('request URL', () => {
    let oldFetch
    let requestedUrl

    beforeEach(() => {
      oldFetch = global.fetch

      global.fetch = async (url) => {
        requestedUrl = new URL(url)
        return { ok: true, json: async () => ({}) }
      }
    })

    afterEach(() => {
      global.fetch = oldFetch
    })

    it('appends the given query params', async () => {
      await submitForm('formId', new FormData(), {
        externalDomainToken: 'a-token',
        query: { utm_source: 'newsletter', utm_medium: 'email' }
      })

      const { searchParams } = requestedUrl

      expect(searchParams.get('external_domain_token')).toBe('a-token')
      expect(searchParams.get('utm_source')).toBe('newsletter')
      expect(searchParams.get('utm_medium')).toBe('email')
    })

    it('only sends the external domain token when no query params are given', async () => {
      await submitForm('formId', new FormData(), {
        externalDomainToken: 'a-token'
      })

      expect([...requestedUrl.searchParams]).toEqual([
        ['external_domain_token', 'a-token']
      ])
    })
  })
})
