import getPolicy from '../../src/api/getPolicy'

describe('api.getPolicy(policyType, opts = {})', () => {
  it('fails if no type, or an invalid type is provided', async () => {
    await expect(() => getPolicy()).rejects.toThrow(/policyType must be one of/)
    await expect(() => getPolicy('foo')).rejects.toThrow(
      /policyType must be one of/
    )
  })

  it('can return the marketing policy', async () => {
    const policy = await getPolicy('marketing_policy')

    expect(policy).toBeDefined()
    expect(policy.id).toBeDefined()
    expect(policy.options).toHaveLength(5)
    expect(policy.name).toBe('Marketing policy')
  })

  it('can return the privacy policy', async () => {
    const policy = await getPolicy('privacy_policy')

    expect(policy).toBeDefined()
    expect(policy.id).toBeDefined()
    expect(policy.name).toBe('Privacy policy')
  })

  it('can return the data processing consent', async () => {
    const policy = await getPolicy('data_processing_consent')

    expect(policy).toBeDefined()
    expect(policy.id).toBeDefined()
    expect(policy.name).toBe('Data processing consent')
  })
})
