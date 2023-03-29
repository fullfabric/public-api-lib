import getCountries from '../../src/api/getCountries'

describe('api.getCountries(opts)', () => {
  it('returns a list of countries', async () => {
    const countries = await getCountries()

    expect(countries).toHaveLength(8)
    countries.forEach(([name, value]) => {
      expect(typeof name).toBe('string')
      expect(typeof value).toBe('string')
    })
  })
})
