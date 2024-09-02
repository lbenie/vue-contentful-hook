import { ref } from 'vue'
import axios from 'axios'

type ContentfulOptions = {
  readonly spaceId: string
  readonly token: string
}

type ContentfulResponse<T> = {
  readonly data: Readonly<T>
  readonly errors: readonly string[]
}

/**
 * Executes a GraphQL query using the Contentful API.
 * @template T - The type of the response data.
 * @param {string} query - The GraphQL query you want to execute.
 * @param {ContentfulOptions} options - An object containing the spaceId and token.
 * @param {string} options.spaceId - The space ID.
 * @param {string} options.token - The access token.
 * @returns {object} - An object containing the response data, errors, and a loading state.
 * @property {T} data - The response data.
 * @property {string[]} errors - An array of error messages.
 * @property {boolean} isLoading - A boolean indicating if the request is still loading.
 */
export const useContentful = <T>(
  query: string,
  { spaceId, token }: ContentfulOptions,
) => {
  const data = ref<ContentfulResponse<T>['data']>()
  const errors = ref<ContentfulResponse<T>['errors']>()
  const isLoading = ref<boolean>(true)

  const URI = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`

  axios
    .post<ContentfulResponse<T>>(
      URI,
      { query },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    .then(({ data }) => data)
    .then(({ data: response, errors: contenfulErrors }) => {
      if (response) {
        data.value = response
      }

      if (contenfulErrors) {
        errors.value = contenfulErrors
      }
    })
    .catch((error: unknown) => {
      errors.value = [String(error)]
    })
    .finally(() => {
      isLoading.value = false
    })

  return { data, errors, isLoading } as const
}
