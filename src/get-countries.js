export default async function getCountries({ withCode } = {}) {
  let path = '/countries'
  if (withCode) path += '?with_code=true'

  const result = await fetch(path, { credentials: 'same-origin' })

  return await result.json()
}
