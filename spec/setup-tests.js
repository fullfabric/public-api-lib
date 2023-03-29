import 'whatwg-fetch'
import { server } from './support/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
