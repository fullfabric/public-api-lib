import url from '../utils/url'

/**
 * Fetches timezones from the backend to build Timezone dropdowns.
 *
 * An array of objects with the following format is returned:
 *
 *     {
 *       "name": "(GMT-05:00) Bogota",
 *       "tzname": "America/Bogota",
 *       "value": "Bogota",
 *       "offset": -500
 *     }
 *
 * @param {*} opts
 * @returns
 */
export default async function getTimezones({ baseUrl = null } = {}) {
  const path = '/api/reference_data/timezones'

  const result = await fetch(url(path, { baseUrl }), {
    credentials: 'omit'
  })

  return await result.json()
}
