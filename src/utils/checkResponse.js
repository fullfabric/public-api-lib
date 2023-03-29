import ApiError from '../api/ApiError'

export default async function checkResponse(response) {
  if (response.ok) {
    return await response.json()
  } else {
    const data = await response.json()
    throw new ApiError(response, data)
  }
}
