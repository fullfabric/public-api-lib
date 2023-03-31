import { matchRequestUrl, rest } from 'msw'
import { setupServer } from 'msw/node'

import countriesFixture from '../fixtures/countries.json'
import formFixture from '../fixtures/form.json'
import marketingPolicyFixture from '../fixtures/marketingPolicy.json'
import privacyPolicyFixture from '../fixtures/privacyPolicy.json'
import dataProcessingPolicyFixture from '../fixtures/dataProcessingPolicy.json'

const handlers = [
  rest.get('/countries', async (_req, res, ctx) =>
    res(ctx.json(countriesFixture))
  ),
  rest.get('/api/forms/:formId', async (_req, res, ctx) =>
    res(ctx.json(formFixture))
  ),
  rest.post('/api/forms/:formId/submissions', async (_req, res, ctx) => {
    return res(
      ctx.json({
        form: formFixture,
        message: formFixture.success_message
      })
    )
  }),
  rest.get('/apis/policies/:policyType', async (req, res, ctx) => {
    if (req.params.policyType === 'marketing_policy') {
      return res(ctx.json(marketingPolicyFixture))
    } else if (req.params.policyType === 'privacy_policy') {
      return res(ctx.json(privacyPolicyFixture))
    } else if (req.params.policyType === 'data_processing_consent') {
      return res(ctx.json(dataProcessingPolicyFixture))
    }
  })
]

const server = setupServer(...handlers)

// https://mswjs.io/docs/extensions/life-cycle-events#asserting-request-payload
function waitForRequest(method, url) {
  let requestId = ''

  return new Promise((resolve, reject) => {
    server.events.on('request:start', (req) => {
      const matchesMethod = req.method.toLowerCase() === method.toLowerCase()
      const matchesUrl = matchRequestUrl(req.url, url).matches

      if (matchesMethod && matchesUrl) {
        requestId = req.id
      }
    })

    server.events.on('request:match', (req) => {
      if (req.id === requestId) {
        resolve(req)
      }
    })

    server.events.on('request:unhandled', (req) => {
      if (req.id === requestId) {
        reject(
          new Error(`The ${req.method} ${req.url.href} request was unhandled.`)
        )
      }
    })
  })
}

export { server, rest, waitForRequest }
