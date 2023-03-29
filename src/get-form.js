export default async function getForm(formId) {
  const result = await fetch(`/api/forms/${formId}`, {
    credentials: 'same-origin'
  })

  return await result.json()
}
