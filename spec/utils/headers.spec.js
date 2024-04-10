import headers from '../../src/utils/headers'

describe('utils.headers(opts)', () => {
  describe('no opts locale are set', () => {
    it('returns null', async () => {
      expect(await headers()).toBeNull()
    })
  })

  describe('opts locale are set', () => {
    it('returns locale in Accept-Language header', async () => {
      expect(await headers({ locale: 'es-ES' })).toEqual(
        new Headers({
          'Accept-Language': `es-ES,en;q=0.5`
        })
      )
    })
  })
})
