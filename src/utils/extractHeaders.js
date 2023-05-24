import assert from 'assert'
import { castArray, toLower } from 'lodash-es'

export default function extractHeaders(response, headers) {
  assert.ok(
    typeof headers === 'string' || Array.isArray(headers),
    'headers must be an Array or a String'
  )

  return castArray(headers).reduce(
    (acc, header) => ({
      ...acc,
      [header]: response.headers.get(toLower(header))
    }),
    {}
  )
}
