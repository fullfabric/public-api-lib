import getForm from '../../src/api/getForm'

describe('api.getForm(formId)', () => {
  it('returns a list of countries', async () => {
    const form = await getForm('fake-id')

    expect(form).toBeDefined()
    expect(form.schema).toBeDefined()
    expect(form.page).toBeDefined()
    expect(form.name).toBe('Brochure request')
  })

  it('can return specific headers', async () => {
    const { data, headers } = await getForm('fake-id', {
      returnHeaders: ['Content-Type']
    })

    expect(data).toBeDefined()
    expect(data.name).toBe('Brochure request')

    expect(headers).toBeDefined()
    expect(headers['Content-Type']).toBe('application/json')
  })
})
