import ApiError from '../api/ApiError'

export default async function checkResponse(
  response,
  { responseType = 'json' } = {}
) {
  if (response.ok) {
    if (response.status === 204) return null
    if (responseType === 'json') return await response.json()
    return response
  }

  const data = await response.json()
  throw new ApiError(response, data)
}
