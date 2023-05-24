import 'whatwg-fetch'
import { TextEncoder } from 'util'
import crypto from 'crypto'

import { server } from './support/server'

// Not defined in JSDOM, polyfill it here:
Object.defineProperty(global.self, 'crypto', {
  value: {
    subtle: crypto.webcrypto.subtle
  }
})

beforeAll(() => {
  server.listen()

  if (typeof window.TextEncoder === 'undefined') {
    window.TextEncoder = TextEncoder
  }
})

afterEach(() => server.resetHandlers())
afterAll(() => server.close())
