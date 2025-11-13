import getTimezones from '../../src/api/getTimezones'

describe('api.getTimezones(opts)', () => {
  it('returns a list of timezones', async () => {
    const timezones = await getTimezones()

    expect(timezones).toHaveLength(9)
    timezones.forEach((timezone) => {
      expect(typeof timezone.name).toBe('string')
      expect(typeof timezone.tzname).toBe('string')
      expect(typeof timezone.value).toBe('string')
      expect(typeof timezone.offset).toBe('number')
    })
  })
})
