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
})
