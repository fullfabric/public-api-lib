import url from '../utils/url'

export default async function getCascadingDropDownOptions(
  field,
  parentValue,
  queryOpts
) {
  let path = `/api/fields/sub_fields/${field.id}/options`

  const query = parentValue && { parent_value: parentValue }

  const results = await fetch(url(path, { ...queryOpts, query }), {
    credentials: 'omit'
  })
  return results.json()
}
