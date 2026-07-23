import ApiError from '../api/ApiError'

export default async function checkResponse(
  response,
  { responseType = 'json' } = {}
) {
  if (response.ok) {
    if (response.status === 204) return null
    if (responseType === 'json') return await response.json()
    if (responseType === 'blob') return await response.blob()
    return response
  }

  // Error responses can come from layers that don't emit the app's JSON shape
  // (nginx, Rack::Attack, the WAF, CloudFront). Tolerate a non-JSON body so the
  // caller gets a proper ApiError (with .status) instead of a thrown SyntaxError.
  const data = await response.json().catch(() => null)
  throw new ApiError(response, data)
}
