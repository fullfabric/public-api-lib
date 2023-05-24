import { waitForRequest } from '../support/server'

import submitEventResponse from '../../src/api/submitEventResponse'

describe('api.submitEventResponse(eventId)', () => {
  let pendingRequest

  beforeEach(() => {
    pendingRequest = waitForRequest('POST', '/api/events/eventId/responses')
  })

  /**
   * TODO: This test is currently failing because of an issue with FormData in
   * msw. It should be fixed in the next major version:
   *
   * https://github.com/mswjs/msw/issues/1577
   * https://github.com/mswjs/msw/pull/1436
   */
  it.skip('creates a new response for the given event and data', async () => {
    const eventData = new FormData()
    eventData.append('name', 'John Doe')
    const response = await submitEventResponse('eventId', eventData)
    const request = await pendingRequest
    expect(request.body).toEqual({ name: 'John Doe' })
    expect(response.form).toBeDefined()
    expect(response.message).toBe('Thank you.')
  })
})
