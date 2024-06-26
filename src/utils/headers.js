import { isEmpty } from 'lodash-es'

export default function headers(opts = {}) {
  if (isEmpty(opts)) {
    return null
  }

  return new Headers({
    'Accept-Language': `${opts.locale || 'en-GB'},en;q=0.5`
  })
}
