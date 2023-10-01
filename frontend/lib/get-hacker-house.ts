import { fetchAPI } from "./fetch-api"

export function getPageBySlug(slug: string, lang: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  const path = `/organization`
  const urlParamsObject = { filters: { slug }, locale: lang }
  const options = { headers: { Authorization: `Bearer ${token}` } }
  return fetchAPI(path, urlParamsObject, options)
}
