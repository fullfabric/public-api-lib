import checkResponse from '../../src/utils/checkResponse'

test('returns null when response status is 204', async () => {
  const response = {
    ok: true,
    status: 204,
    json: async () => {
      throw new Error()
    }
  }

  expect(await checkResponse(response)).toEqual(null)
})

test('returns response json if status is ok', async () => {
  const response = {
    ok: true,
    json: () => Promise.resolve({ payload: 'abc' })
  }

  expect(await checkResponse(response)).toEqual({ payload: 'abc' })
})

test('can return response blob when requested', async () => {
  const response = {
    ok: true,
    blob: () => Promise.resolve('blob')
  }

  await expect(
    checkResponse(response, { responseType: 'blob' })
  ).resolves.toEqual('blob')
})

test('can return raw response if requested', async () => {
  const response = { ok: true }

  await expect(
    checkResponse(response, { responseType: null })
  ).resolves.toEqual(response)
})

test('throws exception with error from json when status is not ok', async () => {
  const response = {
    ok: false,
    json: () => Promise.resolve({ error: 'e1', statusText: 'some error' })
  }

  await expect(checkResponse(response)).rejects.toThrow(
    expect.objectContaining({
      message: 'some error',
      data: { error: 'e1', statusText: 'some error' }
    })
  )
})
