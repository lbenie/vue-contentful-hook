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
 *
 * @param query GraphQL query you want to execute
 * @param options An object containing the spaceId and token
 * @returns an object containing the data, errors and a loading state
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
