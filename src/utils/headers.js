export default function headers({ locale = null } = {}) {
  if (!locale) return null

  return new Headers({
    'Accept-Language': `${locale},en;q=0.5`
  })
}
