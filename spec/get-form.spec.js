import getForm from '../src/get-form'

describe('api.getForm(formId)', () => {
  it('returns a list of countries', async () => {
    const form = await getForm()

    expect(form).toBeDefined()
    expect(form.schema).toBeDefined()
    expect(form.page).toBeDefined()
    expect(form.name).toBe('Brochure request')
  })
})
