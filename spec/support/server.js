import { rest } from 'msw'
import { setupServer } from 'msw/node'

import countriesFixture from '../fixtures/countries.json'
import formFixture from '../fixtures/form.json'

const handlers = [
  rest.get('/countries', async (req, res, ctx) =>
    res(ctx.json(countriesFixture))
  ),
  rest.get('/api/forms/:formId', async (req, res, ctx) =>
    res(ctx.json(formFixture))
  )
]

const server = setupServer(...handlers)

export { server, rest }
