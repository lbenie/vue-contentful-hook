import { ref } from "vue";

type ContentfulOptions = {
  readonly spaceId: string;
  readonly token: string;
};

type ContentfulResponse<T> = {
  readonly data: Readonly<Record<string, Readonly<T>>>;
  readonly errors: readonly string[];
};

export const useContentful = <T>(
  query: string,
  { spaceId, token }: ContentfulOptions
) => {
  const data = ref<Readonly<T>>();
  const errors = ref<readonly string[]>();
  const isLoading = ref<boolean>(true);

  const URI = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  fetch(URI, options)
    .then((response) => response.json() as Promise<ContentfulResponse<T>>)
    .then(({ data: response, errors: contenfulErrors }) => {
      isLoading.value = false;

      if (response) {
        data.value = response[Object.keys(response)[0]];
      }

      if (contenfulErrors) {
        errors.value = contenfulErrors;
      }
    })
    .catch((error: unknown) => {
      errors.value = [String(error)];
    });

  return { data, errors, isLoading } as const;
};
