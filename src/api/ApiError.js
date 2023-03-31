export default class ApiError extends Error {
  constructor(response, data) {
    super(
      data?.message ||
        data?.statusText ||
        response.statusText ||
        response.status.toString()
    )

    this.name = 'ApiError'
    this.data = data
    this.status = response.status
    this.statusText = response.statusText

    this.response = response
  }
}
