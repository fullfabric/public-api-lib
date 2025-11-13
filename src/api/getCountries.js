import url from '../utils/url'
import headersUtil from '../utils/headers'

/**
 * Fetches country data from the backend to build Country dropdowns.
 *
 * By default, an array of 2-element arrays is returned (label + value):
 *
 *     [
 *       [
 *          "Afghanistan",
 *          "Afghanistan"
 *       ],
 *       [
 *         "Åland Islands",
 *         "Åland Islands"
 *       ],
 *       ...
 *      ]
 *
 * However, if the option `withCode` is set to `true`, an array of objects is
 * returned instead, which also includes the country's 2-letter code:
 *
 *     [
 *       {
 *         "label": "Afghanistan",
 *         "value": "Afghanistan",
 *         "code": "AF"
 *       },
 *       {
 *         "label": "Åland Islands",
 *         "value": "Åland Islands",
 *         "code": "AX"
 *       },
 *       ...
 *      ]
 *
 * @param {String} [opts.baseUrl] The base URL for the API. Set if different
 *                                from the current location.
 * @param {Boolean} [opts.withCode] Whether to include the country code in the response.
 * @returns {Array} An array of country data for dropdown options.
 */
export default async function getCountries({
  baseUrl = null,
  withCode = false,
  locale = null
} = {}) {
  const path = '/api/reference_data/countries'

  const query = withCode ? { with_code: true } : undefined
  const headers = locale ? headersUtil({ locale }) : undefined

  const result = await fetch(url(path, { baseUrl, query }), {
    credentials: 'omit',
    headers
  })

  return await result.json()
}
