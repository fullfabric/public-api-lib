import getPageDigest from '../../src/utils/getPageDigest'

describe('utils.getPageDigest(opts)', () => {
  let oldUserAgent

  beforeAll(() => {
    oldUserAgent = navigator.userAgent

    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value:
        'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/20.0.3'
    })
  })

  afterAll(() => {
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value: oldUserAgent
    })
  })

  describe('when no request-id meta element is available', () => {
    it('returns null', async () => {
      expect(await getPageDigest()).toBeNull()
    })

    it('can use a given requestId', async () => {
      expect(await getPageDigest({ requestId: '12345' })).toEqual(
        '7f1c12a5c58c6f29bcaeaf5c6382fef305660da38f2d0919deac9fc4a58705d4'
      )
    })
  })

  describe('when a request-id meta element is available', () => {
    beforeEach(() => {
      document.head.innerHTML = `
        <meta name="request-id" content="12345">
      `
    })

    it("uses the request-id meta element's content", async () => {
      expect(await getPageDigest()).toEqual(
        '7f1c12a5c58c6f29bcaeaf5c6382fef305660da38f2d0919deac9fc4a58705d4'
      )
    })

    it('can use a given requestId instead', async () => {
      expect(await getPageDigest({ requestId: '54321' })).toEqual(
        '0b3adfbef9370498eb8a03f99fba9e86a41b89d1beef6499646d20090db0739b'
      )
    })

    it("can suffix the digest with another digest of a source's type and ID", async () => {
      expect(
        await getPageDigest({ sourceType: 'form', sourceId: '12345' })
      ).toEqual(
        '7f1c12a5c58c6f29bcaeaf5c6382fef305660da38f2d0919deac9fc4a58705d4' +
          ':' +
          '0daba4f5e1a46e9e2be8bd4aac8651a020267a7da81690be4f093abe635b6aa1'
      )
    })
  })
})
