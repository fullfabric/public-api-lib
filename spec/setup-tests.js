import 'whatwg-fetch'
import { TextEncoder } from 'util'
import { server } from './support/server'

beforeAll(() => {
  server.listen()

  if (typeof window.TextEncoder === 'undefined') {
    window.TextEncoder = TextEncoder
  }
})

afterEach(() => server.resetHandlers())
afterAll(() => server.close())
